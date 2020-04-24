angular.module('myApplicant')
    .controller('ApplicantController', ['$scope', '$http', '$rootScope', '$window',
        function ApplicantController($scope, $http, $rootScope, $window) {

            //read the localStorage an get the current applicant
            $scope.init = function init() {
                $scope.ApplicantID = $window.localStorage.getItem("temp_applicants"); //"ApplicantID"
                $scope.applicantIDError = ($scope.ApplicantID == null || $scope.ApplicantID === -1);
            };

            //Receives an reloadApplicantIDEvent from  the "search"-panel-component
            //when a new applicant has been sected.
            //source: http://www.binaryintellect.net/articles/5d8be0b6-e294-457e-82b0-ba7cc10cae0e.aspx
            $scope.$on("reloadApplicantIDEvent", function (evt, data) {
                $scope.init();
            });

            $scope.init();


            $scope.applicants = [];
            $scope.applicants = JSON.parse($window.localStorage.getItem("temp_applicants"));

            var request = {
                method: "get",
                url: './php/search-committee_getApplicationFiles.php',
                dataType: "json",
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            };

            $scope.documents = [];

            $http(request)
                .then(function (result) {
                    $scope.documents = result.data;
                }, function () {
                    alert("Error deleting records");
                });

            var request = {
                method: "get",
                url: './php/search-committee_getRequiredApplicationFiles.php',
                dataType: "json",
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            };

            $scope.requiredDocuments = [];

            $http(request)
                .then(function (result) {
                    $scope.requiredDocuments = result.data;
                }, function () {
                    alert("Error deleting records");
                });

            var request = {
                method: "get",
                url: './php/search-committee_getAppDocs.php',
                dataType: "json",
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            };

            $scope.completedDocuments = [];

            $http(request)
                .then(function (result) {
                    $scope.completedDocuments = result.data;
                }, function () {
                    alert("Error Finding App Docs");
                });
            // let total = 0;

             //check document given with the completed documents and applicantID, if completed box becomes green with a checkmark
            $scope.checkCompletedDocuments = function checkCompletedDocument(applicantID, doc) {
                angular.forEach($scope.completedDocuments, function (compdocument) {
                    if (applicantID === compdocument.fkApplicantID && doc === compdocument.fkApplicationFileID) {
                        document.getElementById(applicantID + " " + doc).innerHTML = "&#10003";
                        document.getElementById(applicantID + " " + doc).parentElement.className = "green";
                    }
                });
            };
             $scope.checkRequired = function checkRequired(applicantID) {
                var ok = false;

                angular.forEach($scope.completedDocuments, function (compdocument) {

                    if (applicantID === compdocument.fkApplicantID && compdocument.fkApplicationFileID === '8') {
                      ok =true;
                    }
                    if (applicantID === compdocument.fkApplicantID && compdocument.fkApplicationFileID === '11' && ok) {
                        
                        document.getElementById(applicantID).innerHTML = "&#10003";
                        document.getElementById(applicantID).parentElement.className = "green";
                    }

                });
            };
            var request = {
                method: "get",
                url: './php/search-committee_getSitesLkp.php',
                datatype: "json",
                headers: {"Content-Type": "application/x-www-form-urlencoded"}
            };

            $scope.sites = [];

            $http(request)
                .then(function (result) {
                    $scope.sites = result.data;
                }, function () {
                    alert("Error Finding Sites");
                });

            $scope.getSiteName = function getSiteName(ApplicantID, fkSiteId){
                angular.forEach($scope.sites, function(site) {
                    if(fkSiteId === site.SiteID){
                        document.getElementById(ApplicantID + " site").innerHTML = site.SiteName;
                    }

                });
            };

              //check document given with the completed documents and applicantID, if completed box becomes green with a checkmark
            $scope.checkCompletedRequirements = function checkCompletedRequirements(applicantID, doc) {
                angular.forEach($scope.completedDocuments, function (compdocument) {
                    if (applicantID == compdocument.fkApplicantID && doc.AutoID == compdocument.fkApplicationFileID) {
                        return 1;
                    } else
                        return 0;
                });
            };

            $scope.filterApplicants = function filterApplicants() {
                $window.localStorage.setItem("reset_table", $window.localStorage.getItem("temp_applicants"));
                var temp = [];
                angular.forEach($scope.applicants, function (app){
                    if (app.check)
                        temp.push(app);
                });
                $window.localStorage.setItem("temp_applicants", JSON.stringify(temp));
                location.reload();
            };

            $scope.resetTable = function resetTable() {
                var reset = JSON.parse($window.localStorage.getItem("reset_table"));
                $window.localStorage.setItem("temp_applicants", JSON.stringify(reset));
                location.reload();
            };

            $scope.filterAllCheck = true;

            $scope.filterAll = function filterAll() {
                if (!$scope.filterAllCheck) {
                    angular.forEach($scope.applicants, function (app){
                    app.check = true;
                    });
                } else {
                    angular.forEach($scope.applicants, function (app){
                    app.check = false;
                    });
                }
            };



        }

    ]);

