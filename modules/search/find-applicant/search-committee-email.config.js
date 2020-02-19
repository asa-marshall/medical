//search-committee.email.config.js


angular.module("SearchCommitteeApp")
    .controller("SearchCommitteeEmailController", ["$scope", "filterFilter", "$window", "$http", "$filter",
        function SearchCommitteeEmailController($scope, filterFilter, $window, $http, $filter) {

            //Initailly show all applicants (0:Applicant, 1:Candidate, 2:Deadpool, 3:Selected)
            $scope.dataList = [];
            $scope.forms = [{
                "FormID": "2",
                "FormName": "Rejected",
                "FormText": "We regret to inform you that you have not been accepted, {lastname}.        "
            }, {
                "FormID": "18",
                "FormName": "CallBack",
                "FormText": "Please call back, {lastname}.\n        \n        \n        "
            }, {"FormID": "31", "FormName": "Empty", "FormText": ""}, {
                "FormID": "32",
                "FormName": "accepted",
                "FormText": "Dear {salutation} {firstname} {lastname},\r\n\r\nCongratulations!  You have been accepted into the Youth Challenge Academy.  Please contact me at 912-555-1234.\r\n\r\nSincerely,\r\nMr. James Doe\r\n"
            }, {
                "FormID": "33",
                "FormName": "MissingDocuments",
                "FormText": "Dear {PSalutation} {firstname} {lastname},\r\n\r\nYour application is not complete.  PLease submit all of the documents to me by the due date.\r\n\r\nMrs. Jane Doe"
            }];

            $scope.filteredList = [];
            $scope.selectedIDs = [];
            $scope.selectedList = [];

            $scope.formletter = [{
                "FormID": "2",
                "FormName": "Rejected",
                "FormText": "We regret to inform you that you have not been accepted, {lastname}.        "
            }];
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
            $scope.genderOptions = [
                {statusID: "E", description: "Everyone"},
                {statusID: "F", description: "Female"},
                {statusID: "M", description: "Male"}
            ];

            //defaults for search form
            $scope.SearchApplicantStatus = "0";

            //Set begin date 6 months before current date
            $scope.SearchBeginPersonAddedDate = new Date();
            $scope.SearchBeginPersonAddedDate.setMonth($scope.SearchBeginPersonAddedDate.getMonth() - 6);
            $scope.SearchEndPersonAddedDate = new Date();
            $scope.SearchPCounty = "";
            $scope.SearchPCity = "";
            $scope.SearchPGender = "E";

            //default for mail
            $scope.emailSubject = "";


            $scope.checkall_email = true;
            $scope.checkall_guard = true;
            $scope.checkall_list = false;

            $scope.applySelectFilter = function applySelectFilter() {
                $scope.selectedList = filterFilter($scope.dataList, {"check": true});

            };
            $scope.applyFilter = function applyFilter() {
                $scope.filteredList = filterFilter($scope.dataList, $scope.filterName);

            };
            $scope.clearSelected = function clearSelected() {
                var index = 0;
                while ($scope.selectedList.length > 0) {
                    var person = $scope.selectedList[0];
                    $scope.setCheck(person, false);
                    $scope.applySelectFilter();
                    $scope.checkall_list = false;
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
            $scope.loadSelectedIDs = function loadSelectedIDs(){
                //read localStorage for selectedIDs - use that to initalize datalist
                $scope.selectedIDs = JSON.parse(localStorage.getItem("selectedIDs"));

                //select emails in list
                var sendData = {};
                sendData.selectedIDs = JSON.stringify($scope.selectedIDs);

                var request = {
                    method: "POST",
                    url: "./php/search-committee_getSelectedEmails.php",
                    data: Object.toparams(sendData),                                  //urlencode parameters
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
                };

                $http(request)
                    .then(function (result) {
                            $scope.dataList = result.data;
                            convertDatesInArrayToHtml($scope.dataList);

                            //select each element in dataList
                            var i;
                            for(i=0; i<$scope.dataList.length;i++) {
                                $scope.dataList[i].check=true;
                                $scope.setCheck($scope.dataList[i],true);
                            }
                            $scope.filteredList = $scope.dataList;
                            $scope.applySelectFilter();
                        },
                        function () {
                            alert("Error Loading Selected Applicants");
                        })
                ;

            };

            $scope.init = function init(){
                $scope.loadFormFields();
                $scope.loadForms();
                $scope.loadSelectedIDs();
            };

            $scope.init();

            $scope.loadApplicants = function loadApplicants() {
                var sendData = {};
                sendData.ApplicantStatus = $scope.SearchApplicantStatus;
                sendData.BeginPersonAddedDate = convertToSqlDate($scope.SearchBeginPersonAddedDate);
                sendData.EndPersonAddedDate = convertToSqlDate($scope.SearchEndPersonAddedDate);
                sendData.PCounty = $scope.SearchPCounty;
                sendData.PCity = $scope.SearchPCity;

                if ($scope.SearchPGender !== "E") {
                    sendData.PGender = $scope.SearchPGender;
                }

                var request = {
                    method: "POST",
                    url: "./php/search-committee_getEmails.php",
                    data: Object.toparams(sendData),                                  //urlencode parameters
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
                };

                $http(request)
                    .then(function (result) {
                            $scope.dataList = result.data;
                            alert($scope.dataList.length + "record(s) found.");

                            convertDatesInArrayToHtml($scope.dataList);
                            $scope.filteredList = $scope.dataList;

                            $scope.clearSelected();
                        },
                        function () {
                            alert("Error Loading Applicants");
                        })
                ;
            };

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
                mailObj.cc = $scope.getGuardiansEmails(applicant);
                mailObj.subject = $scope.emailSubject;

                var body = $scope.formpreview;

                //merge letter
                body = $scope.mailMerge(body, applicant);

                //body = body.split("{lastname}").join(row["PersonLN"]);
                //body = body.split("{firstname}").join(row["PersonFN"]);

                mailObj.body = body;
                var str = "mailto:" + $scope.getApplicantsEmails(applicant) + "?" + Object.toparams(mailObj);

                $window.open(str);
            };
            $scope.sendBcc = function sendBcc() {
                var index = 0;
                var list = [];

                if ($scope.selectedList.length === 0) {
                    alert("You must select a applicant to to email.");
                }
                else {
                    for (index = 0; index < $scope.selectedList.length; index++) {
                        var person = $scope.selectedList[index];
                        if ($scope.getGuardiansEmails(person).length > 0) {
                            list.push($scope.getGuardiansEmails(person));
                        }
                        if ($scope.getApplicantsEmails(person).length > 0) {
                            list.push($scope.getApplicantsEmails(person));
                        }
                    }

                    var bcc = list.join();
                    var mailObj = {};
                    mailObj.bcc = bcc;
                    mailObj.subject = $scope.emailSubject;
                    mailObj.body = $scope.formpreview;
                    var str = "mailto:?" + Object.toparams(mailObj);
                    $window.open(str);
                }

            };
            $scope.sendTo = function sendTo() {
                var index = 0;
                if ($scope.selectedList.length === 0) {
                    alert("You must select a applicant to to email.");
                }
                else {
                    for (index = 0; index < $scope.selectedList.length; index++) {
                        $scope.sendIndivdualEmail($scope.selectedList[index]);
                    }
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
                    var index = 0;
                    for (index = 0; index < row.guardians[i].emails.length; index++) {
                        if (row.guardians[i].emails[index].guardCheck) {
                            if (list !== "") {
                                list += ",";
                            }

                            list += row.guardians[i].emails[index].ContactInfo;
                        }
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





            $scope.getStyle = function getStyle(row) {
                if (row.check) {
                    return "alert-warning";
                }
                else {
                    return "";
                }
            };

            $scope.toggleCheck = function toggleCheck(row) {
                $scope.setCheck(row,!row.check);


            };

            $scope.preview = function preview() {
                if ($scope.selectedIDs.length === 0) {
                    alert("You must select a applicant to preview");
                }
                else {
                    // get the content of the formpreview and show a popup modal wih text in it.

                }

            };

            $scope.setCheck = function setCheck(row, checkValue) {
                row.check = checkValue;
                $scope.applySelectFilter();
                var i = 0;
                var index;

                if (!row.check) {
                    //remove this row from list
                    $scope.removeSelectedID(row.ApplicantID);



                    //deselect all emails & guardians
                    i = 0;
                    for (i = 0; i < row.email.length; i++) {
                        row.email[i].emailCheck = false;
                    }
                    for (i = 0; i < row.guardians.length; i++) {
                         index = 0;
                        for (index = 0; index < row.guardians[i].emails.length; index++) {
                            row.guardians[i].emails[index].guardCheck = false;
                        }
                    }
                }
                else {
                    // add this item to the list
                   $scope.addSelectedID(row.ApplicantID);

                    //set the email according to the checkall_email and checkall_guard values
                    i = 0;
                    for (i = 0; i < row.email.length; i++) {
                        row.email[i].emailCheck = $scope.checkall_email;
                    }
                    for (i = 0; i < row.guardians.length; i++) {
                         index = 0;
                        for (index = 0; index < row.guardians[i].emails.length; index++) {
                            row.guardians[i].emails[index].guardCheck = $scope.checkall_guard;
                        }
                    }
                }
            };

            $scope.toggleCheckAllEmail = function toggleCheckAllEmail() {
                $scope.checkall_email = !$scope.checkall_email;
            };
            $scope.toggleCheckAllGuard = function toggleCheckAllGuard() {
                $scope.checkall_guard = !$scope.checkall_guard;
            };
            $scope.toggleCheckAllList = function toggleCheckAllList() {
                var index;
                $scope.checkall_list = !$scope.checkall_list;

                    index = 0;
                    for (index = 0; index < $scope.filteredList.length; index++) {
                        $scope.setCheck($scope.filteredList[index], $scope.checkall_list);
                    }
            };

           $scope.removeSelectedID = function removeSelectedID(id){
               var foundIndex = $scope.selectedIDs.indexOf(id);
               if (foundIndex !== -1) {
                   $scope.selectedIDs.splice(foundIndex, 1);
               }
               localStorage.setItem("selectedIDs",JSON.stringify($scope.selectedIDs));
           };
            $scope.addSelectedID = function addSelectedID(id){

                if ($scope.selectedIDs.indexOf(id) === -1) {
                    $scope.selectedIDs.push(id);
                }
                localStorage.setItem("selectedIDs",JSON.stringify($scope.selectedIDs));
            }


        }
    ]);
