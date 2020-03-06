angular.module('myApplicant')
    .controller('ApplicantController', ['$scope', '$http', '$rootScope', '$window',
        function ApplicantController($scope, $http, $rootScope, $window) {

            //read the localStorage an get the current applicant
            $scope.init = function init() {
                $scope.ApplicantID = $window.localStorage.getItem("ApplicantID");
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

            $scope.checkCompletedDocuments = function checkCompletedDocument(applicantID, doc) {
                angular.forEach($scope.completedDocuments, function (compdocument) {
                    if (applicantID === compdocument.fkApplicantID && doc === compdocument.fkApplicationFileID) {
                        document.getElementById(applicantID + " " + doc).innerHTML = "&#10003";
                        document.getElementById(applicantID + " " + doc).parentElement.className = "green";
                    }
                });
            }
        }

    ]);

