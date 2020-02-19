angular.module('myApplicant')
    .controller('ApplicantEmailController', ['$scope', '$http', '$rootScope', '$window',
        function ApplicantEmailController($scope, $http, $rootScope, $window) {

            $scope.dataList=[];
            $scope.checkall_email=true;
            $scope.checkall_guard=true;
            $scope.formFields=[];

            //read the localStorage an get the current applicant
            $scope.init = function init() {
                $scope.ApplicantID = $window.localStorage.getItem("ApplicantID");
                $scope.applicantIDError = ($scope.ApplicantID == null || $scope.ApplicantID === -1);
                if (!$scope.applicantIDError){

                    $scope.loadFormFields();
                    $scope.loadForms();
                }


            };
            $scope.toggleCheckAllEmail = function toggleCheckAllEmail(){
                for( var i=0; i< $scope.dataList.length; i++){
                    for(e=0;e<$scope.dataList[i].email.length; e++)
                        $scope.dataList[i].email[e].emailCheck=!($scope.checkall_email);
                }
            };
            $scope.toggleCheckAllGuard = function toggleCheckAllGuard(){
                for( var i=0; i< $scope.dataList.length; i++){

                    for(g=0;g<$scope.dataList[i].guardians.length; g++)
                        $scope.dataList[i].guardians[g].guardCheck=!($scope.checkall_guard);
                }
            };
            $scope.loadData = function loadData(){
                var selectedIDs=[];
                var applicants = JSON.parse($window.localStorage.getItem("applicants"));
                for( var i=0; i< applicants.length; i++){

                    selectedIDs.push(applicants[i].ApplicantID);
                }
                var post ={};
                //use join to convert array into string
                post.selectedIDs = selectedIDs.join(",");

                var columnNames=[];
                for( i=0; i< $scope.formFields.length; i++)
                {
                    columnNames.push($scope.formFields[i].ColumnName);
                }
                post.columnNames = columnNames.join(", ");

                var request = {
                    method: "POST",
                    data: Object.toparams(post),
                    url: "./php/search-committee_getEmails.php",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
                };
                var self = this;  //needed for callback
                $http(request)
                    .then(function (result){
                            $scope.dataList= result.data;
                        for( var i=0; i< $scope.dataList.length; i++){
                            $scope.dataList[i].check=true;

                            for(e=0;e<$scope.dataList[i].email.length; e++)
                                $scope.dataList[i].email[e].emailCheck=true;
                            for(g=0;g<$scope.dataList[i].guardians.length; g++)
                                $scope.dataList[i].guardians[g].guardCheck=true;
                        }
                        },
                        function () {
                            alert("Error Loading  emails");
                        })
            };



            //Receives an reloadApplicantIDEvent from  the "search"-panel-component
            //when a new applicant has been sected.
            //source: http://www.binaryintellect.net/articles/5d8be0b6-e294-457e-82b0-ba7cc10cae0e.aspx
            $scope.$on("reloadApplicantIDEvent", function (evt, data) {

                $scope.init();
            });


            $scope.mailMerge = function mailMerge(formletter, applicant){
                var i;
                var MergeField;
                var ColumnName;
                for(i=0; i< $scope.formFields.length; i++)
                {
                    MergeField = $scope.formFields[i].MergeField;
                    ColumnName = $scope.formFields[i].ColumnName;
                    formletter = formletter.split(MergeField).join(applicant[ColumnName]);
                }
                return formletter;
            };
            $scope.sendIndivdualEmail = function sendIndivdualEmail(applicant) {
                var mailObj = {};
                mailObj.cc = $scope.getApplicantsEmails(applicant);

                mailObj.subject = $scope.emailSubject;

                var body = $scope.formpreview;

                //merge letter
                body = $scope.mailMerge(body, applicant);


                mailObj.body = body;
                var str = "mailto:" + $scope.getGuardiansEmails(applicant) + "?" + Object.toparams(mailObj);

                $window.open(str);
            };
            $scope.sendBcc = function sendBcc() {
                var index = 0;
                var list = [];

                if ($scope.dataList.length === 0) {
                    alert("You must select a applicant to to email.");
                }
                else {
                    for (index = 0; index < $scope.dataList.length; index++) {
                        var person = $scope.dataList[index];
                        if ($scope.getGuardiansEmails(person).length > 0) {
                            list.push($scope.getGuardiansEmails(person));
                        }
                        if ($scope.getApplicantsEmails(person).length > 0) {
                            list.push($scope.getApplicantsEmails(person));
                        }
                    }

                    var bcc = list.join();
                    if (list.length > 0) {

                        var mailObj = {};
                        mailObj.bcc = bcc;
                        mailObj.subject = $scope.emailSubject;
                        mailObj.body = $scope.formpreview;
                        var str = "mailto:?" + Object.toparams(mailObj);
                        $window.open(str);
                    }
                    else{
                        alert("no email addresses selected.")
                    }
                }

            };
            $scope.sendTo = function sendTo() {
                var index = 0;
                var emailCount=0;
                if ($scope.dataList.length === 0) {
                    alert("You must select a applicant to to email.");
                }
                else {
                    for (index = 0; index < $scope.dataList.length; index++) {

                        var applicant = $scope.dataList[index];
                        var emails = $scope.getApplicantsEmails(applicant)+
                            $scope.getGuardiansEmails(applicant);
                        if(emails.length >0) {
                            emailCount++;

                            $scope.sendIndivdualEmail($scope.dataList[index]);
                        }
                    }
                }
                if (emailCount==0){
                    alert('No email addresses selected');
                }
            };

            $scope.getApplicantsEmails = function getApplicantsEmails(row) {

                var list = "";
                var i;
                for (i = 0; i < row.email.length; i++) {
                    if (list !== "") {
                        list += ",";
                    }
                    if (row.email[i].emailCheck) {
                        list += row.email[i].ContactInfo;
                    }
                }
                return list;
            };
            $scope.getGuardiansEmails = function getGuardiansEmails(row) {
                var i;
                var list = "";
                for (i = 0; i < row.guardians.length; i++) {
                        if (row.guardians[i].guardCheck) {
                            if (list !== "") {
                                list += ",";
                            }

                            list += row.guardians[i].ContactInfo;
                        }
                }
                return list;
            };

            $scope.setForm = function setForm(option) {
                var i = 0;
                for (i = 0; i < $scope.forms.length; i++) {
                    if ($scope.forms[i].FormID === option) {
                        $scope.formpreview = $scope.forms[i].FormText;
                    }
                }

            };

            //open the pop-up modal with the text
            $scope.getPreview = function getPreview(applicant) {
                var index = 0;
                $scope.formletter  = $scope.formpreview;
                $scope.formletter = $scope.mailMerge($scope.formletter, applicant);
                document.querySelector('#previewButton').click();

            };
            $scope.forms = [];
            $scope.formletter = [];
            $scope.selectedForm = "";
            $scope.formpreview = "";
            $scope.formFields=[];

            //the options for the select - pulldown menus
            $scope.statusOptions = [
                {statusID: "0", description: "Applicant"},
                {statusID: "1", description: "Candidate"},
                {statusID: "2", description: "Selected"},
                {statusID: "3", description: "Deadpool"}
            ];

                       //default for mail
            $scope.emailSubject = "";

            $scope.loadFormFields = function loadFormFields() {
                var request = {
                    method: "POST",
                    url: "./php/search-committee_getFormFields.php",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
                };
                $http(request)
                    .then(function (result) {
                            $scope.formFields = result.data;

                            //load data after getting the formFields
                            $scope.loadData();
                        },
                        function () {
                            alert("Error Loading Form Fields");
                        })
                ;
            };
            $scope.loadForms = function loadForms() {
                var request = {
                    method: "POST",
                    url: "./php/search-committee_getApplicantForms.php",
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
                };
                $http(request)
                    .then(function (result) {
                            $scope.forms = result.data;
                        },
                        function () {
                            alert("Error Loading Form Fields");
                        })
                ;
            };

            $scope.init();

        }

    ]);
