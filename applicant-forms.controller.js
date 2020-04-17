var myApplicant = angular.module('myApplicant',[]);

myApplicant.controller('ApplicantFormController', ['$scope', '$http', '$window', '$filter',
    function ApplicantFormController($scope, $http, $window, $filter) {

        $scope.templateRecord = {
            "FormID": "",
            "FormName": "",
            "FormText": "",
        };

        $scope.templateRecord2 = {
            "SourceFileName": "",
            "Note": "",
            "Path": "",
        };

        $scope.ID_Field = "FormID";
        $scope.phpURL_get = "./php/applicant-forms_getForms.php";
        $scope.phpURL_create = "./php/applicant-forms_createForm.php";
        $scope.phpURL_delete = "./php/applicant-forms_deleteForm.php";
        $scope.phpURL_update = "./php/applicant-forms_updateForm.php";
        $scope.formFields = [];

        var self = $scope;

        $scope.dataList = [];
        $scope.dataList2=[];
        $scope.editMode = false;
        $scope.attachMode = false;

        $scope.formPreview = {};
        $scope.findID = function findID(id, array) {
            var i = 0;
            var found = -1;
            for (i = 0; i < array.length; i++) {

                //if (array[i].MedImmunizationID === id) {
                if (array[i][$scope.ID_Field] === id) {
                    found = i;
                }
            }
            return found;
        };
        $scope.getData = function getData() {
            var request = {
                method: "POST",
                url: $scope.phpURL_get,
                headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
            };
            var self = $scope;  //needed for callback
            $http(request)
                .then(function (result) {
                        $scope.dataList2 = result.data;
                        //Sort
                        $scope.dataList2 = $filter('orderBy')($scope.dataList2, 'FormName');

                        $scope.formPreview = angular.copy($scope.templateRecord);
                        $scope.selectedIndex = -1;
                    },
                    function () {
                        $scope.dataList = [];

                        alert("Error Loading Data");
                    })
        };

        $scope.getData = function getData() {
            var request = {
                method: "POST",
                url: $scope.phpURL_get,
                headers: { "Content-Type": "application/x-www-form-urlencoded" }  //POST is urlencoded!
            };
            var self = $scope;  //needed for callback
            $http(request)
                .then(function (result) {
                        $scope.dataList = result.data;
                        //Sort
                        $scope.dataList = $filter('orderBy')($scope.dataList, 'FormName');

                        $scope.formPreview = angular.copy($scope.templateRecord);
                        $scope.selectedIndex = -1;
                    },
                    function () {
                        $scope.dataList = [];

                        alert("Error Loading Data");
                    })
        };

        $scope.saveEdits = function saveEdits() {
            $scope.editMode = false;
            $scope.attachMode = false;
            var loc = $scope.selectedIndex;
            // console.log(loc);
            //Check If Adding -- there will not be a FormID
            if ($scope.dataList[loc][$scope.ID_Field] === "") {
                var post = angular.copy($scope.dataList[loc]);

                delete post[$scope.ID_Field];
                var request = {
                    method: "POST",
                    url: this.phpURL_create,
                    data: Object.toparams(post),                                  //urlencode parameters
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
                };
                var self = this;  //needed for callback
                $http(request)
                    .then(function (result) {
                            //alert("added record: ");
                            $scope.getData();
                        },
                        function () {
                            alert("Error adding record");
                        })
            }

            //Check Update -- Check to see if any changes have been made
            else {
                var hasChanges = !angular.equals($scope.backupRecord, $scope.dataList[loc]);
                if (hasChanges) {
                    var post = angular.copy($scope.dataList[loc]);

                    var request = {
                        method: "POST",
                        url: $scope.phpURL_update,
                        data: Object.toparams(post),                                  //urlencode parameters
                        headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
                    };
                    $http(request)
                        .then(function (result) {
                                // alert("updated " + result);
                                $scope.getData();
                            },
                            function () {
                                alert("Error updating");
                            })
                }
            }
        };



        $scope.loadFormFields = function loadFormFields() {
            var request = {
                method: "POST",
                url: "./php/search-committee_getFormFields.php",
                headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
            };
            $http(request)
                .then(function (result) {
                        $scope.formFields = result.data;
                    },
                    function () {
                        alert("Error Loading Form Fields");
                    })
        };
        $scope.enableEdits = function enableEdits() {
            if ($scope.selectedIndex === -1) {
                alert("First select a form to edit.")
            }
            else {
                $scope.editMode = true;

                //create backup
                $scope.backupRecord = angular.copy($scope.dataList[$scope.selectedIndex]);
                console.log($scope.backupRecord);
            }
        };

        $scope.cancelEdits = function cancelEdits() {
            $scope.editMode = false;
            $scope.attachMode = false;

            //restore to backup versions
            $scope.dataList[$scope.selectedIndex] = $scope.backupRecord;
            $scope.getData();
        };
        $scope.deleteRecord = function deleteRecord() {
            $scope.attachMode = false;

            //Check if you are not deleting a record hasnt been inserted into db
            if ($scope.dataList[$scope.selectedIndex][$scope.ID_Field] !== "") {
                post = {};
                post[$scope.ID_Field] = $scope.dataList[$scope.selectedIndex][$scope.ID_Field];
                var request = {
                    method: "POST",
                    url: $scope.phpURL_delete,
                    data: Object.toparams(post),                                  //urlencode parameters
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
                };

                $http(request)
                    .then(function (result) {
                            $scope.getData();

                        },
                        function () {
                            alert("Error deleted");
                        })
            }
            //clear form
            $scope.formPreview = angular.copy($scope.templateRecord);
            $scope.selectedIndex = -1;
            $scope.editMode = false;

        };

        // created does not insert the record into db. It just adds an object to the array
        $scope.createRecord = function createRecord() {

            $scope.dataList.push(angular.copy($scope.templateRecord));
            $scope.selectedIndex = $scope.dataList.length - 1;
            $scope.selectForm($scope.selectedIndex);
            $scope.editMode = true;

            console.log("hi");

        };

        $scope.createAttach = function createAttach(){

            $scope.attachMode = true;
        };
        //This style is needed to indicate the user is in edit mode
        $scope.getCardStyle = function getCardStyle() {
            if ($scope.editMode) {
                return "alert-warning";
            }
            return "";
        };

        //This style is used to highlight the form name that is selected
        $scope.getStyle = function getStyle(index) {
            if ($scope.selectedIndex === index) {
                return "alert-warning";
            }
            return "";
        };
        //ng-disabled does not work on an row.  You will
        //need to check to see if not in edit mode before you change form
        $scope.selectForm = function selectForm(index) {
            if (!$scope.editMode) {


                $scope.formPreview = $scope.dataList[index];

                $scope.loadForms1();

                $scope.selectedIndex = index;

            }

        };



        $scope.init = function init() {
            $scope.getData();
            $scope.loadFormFields();
            $scope.formPreview = angular.copy($scope.templateRecord);
        };
        $scope.init();

        /////////////////////////form Attachment
        $scope.list = [];

        $http({
            method: "POST",
            url: "./php/form-attachment_getForm.php",
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }).then(function (result) {
                $scope.list = result.data;
            },
            function () {
                alert("Error getting records");
            });

        console.log($scope.formPreview);
        $scope.loadForms1 = function loadForms1() {


            var post = {};
            post.fkFormID =$scope.formPreview.FormID;

            $http({
                method: "POST",
                url: "./php/form-attachment_getForm.php",
                data: Object.toparams(post),
                headers: { "Content-Type": "application/x-www-form-urlencoded" }
            }).then(function (result) {
                    $scope.list = result.data;
                },
                function () {
                    alert("Error getting records");
                });
        };




        //===============Insert Form=================================
        $scope.insertForms = function insertForms(SourceFileName, Note) {
            var form_data = new FormData();
            angular.forEach($scope.files, function(file){
                form_data.append('file', file);
            });
            // var f = document.getElementById('file').value;
            // console.log(f);
            // var post = {};

            if($scope.formPreview.FormID ==""){
                console.log("HILO");
                form_data.append("fkFormID", $scope.selectedIndex);
                // post.fkFormID = $scope.selectedIndex;
            }else{
                console.log("HI");
                form_data.append("fkFormID", $scope.formPreview.FormID);
                // post.fkFormID = $scope.formPreview.FormID;
            }

            form_data.append("SourceFileName", SourceFileName);
            form_data.append("Note", Note);
            // post.Note = Note;
            // post.FilePath = f;

            $http.post('./php/form-attachment_createForm.php', form_data,

                {
                    transformRequest: angular.identity,
                    headers: {'Content-type': undefined, 'Process-Data': false}
                }
            ).then(function(result){

                    alert("record updated");
                    $scope.loadForms1();
                    $scope.clearForms();
                },
                function(){
                    alert("Error inserting records");
                }, 1000);

        };

        //================Delete Form=================================
        $scope.deleteForms = function deleteForms(form) {
            var result = confirm("Want to delete?");
            if(result){

                var post = {};

                post.FormAttachmentID = form.FormAttachmentID;
                post.SourceFileName = form.SourceFileName;

                console.log(form.SourceFileName);
                $http({
                    method: "POST",
                    url:"./php/form-attachment_deleteForm.php",
                    data: Object.toparams(post),
                    headers:{"Content-Type":"application/x-www-form-urlencoded"}
                }).then(function(result){
                        $scope.loadForms1();
                    },
                    function(){
                        alert("Error deleting records");
                    });
            }
        };

//===============Update Form=================================
        $scope.updateMode = false;
        $scope.forID = false;

        $scope.disPlay = function disPlay(form){
            $scope.updateMode = true;
            $scope.SourceFileName = form.SourceFileName;
            $scope.Note = form.Note;
            console.log(form.FilePath);
            $scope.FilePath = form.FilePath;
            $scope.FormAttachmentID = form.FormAttachmentID;
        }

        $scope.updateForms = function(FormAttachmentID, SourceFileName, Note){
            var form_data = new FormData();
            angular.forEach($scope.files, function(file){
                form_data.append('file', file);
            });
            form_data.append('FormAttachmentID', FormAttachmentID);
            form_data.append("SourceFileName", SourceFileName);
            form_data.append("Note", Note);
            form_data.append("fkFormID", $scope.formPreview.FormID);
            // console.log(form)
            $http.post('./php/form-attachment_updateForm.php', form_data,
                {
                    transformRequest: angular.identity,
                    headers: {'Content-type': undefined, 'Process-Data': false}
                }
            ).success(function(result){
                alert(response);
                // $scope.clearForms();
            });
        }
        $scope.clearForms = function(){
            $scope.SourceFileName = "";
            $scope.Note = "";
            $scope.FilePath = "";
        }


    }

/////////////////////////// UPLOAD FILE PART/////////////////////////////////



]);




myApplicant.directive("fileInput", function ($parse) {
    return {
        link: function ($scope, element, attrs) {
            element.on("change", function (event) {
                var files = event.target.files;
                console.log(files[0].name);
                $parse(attrs.fileInput).assign($scope, element[0].files);
                $scope.$apply();
            });
        }
    }
})
