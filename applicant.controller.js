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

            $scope.documents = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        }

    ]);

