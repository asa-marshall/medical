angular.module('myApplicant')
    .controller('ApplicantFormController', ['$scope', '$http', '$window', '$filter',
        function ApplicantFormController($scope, $http, $window, $filter) {

            $scope.templateRecord = {
                "FormID": "",
                "FormName": "",
                "FormText": "",
            };

            $scope.ID_Field = "FormID";
            $scope.phpURL_get = "./php/applicant-forms_getForms.php";
            $scope.phpURL_create = "./php/applicant-forms_createForm.php";
            $scope.phpURL_delete = "./php/applicant-forms_deleteForm.php";
            $scope.phpURL_update = "./php/applicant-forms_updateForm.php";
            $scope.formFields = [];

            var self = $scope;

            $scope.dataList = [];
            $scope.editMode = false;
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

                var loc = $scope.selectedIndex;

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
                }
            };
            $scope.cancelEdits = function cancelEdits() {
                $scope.editMode = false;
                //restore to backup versions
                $scope.dataList[$scope.selectedIndex] = $scope.backupRecord;
                $scope.getData();
            };
            $scope.deleteRecord = function deleteRecord() {

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

            //created does not insert the record into db. It just adds an object to the array
            $scope.createRecord = function createRecord() {
                $scope.dataList.push(angular.copy($scope.templateRecord));
                $scope.selectedIndex = $scope.dataList.length - 1;
                $scope.selectForm($scope.selectedIndex);
                $scope.editMode = true;
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
                    $scope.selectedIndex = index;
                }
            };
            $scope.init = function init() {
                $scope.getData();
                $scope.loadFormFields();
                $scope.formPreview = angular.copy($scope.templateRecord);
            };
            $scope.init();
        }
    ]);


