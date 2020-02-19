//search-committee-applicants.controller.js


angular.module("SearchCommitteeApp")
    .controller("SearchCommitteeApplicantsController", ["$scope", "$http",
        function SearchCommitteeApplicantsController($scope, $http) {
            $scope.applicants =[];

            //Defalut to showing all applicants
            $scope.ApplicantStatus = -1;

            //When the parent signals the status has changed read it.
            $scope.$on("ApplicantStatusChangeEvent", function(e) {
                $scope.ApplicantStatus = $scope.$parent.ApplicantStatus;
                $scope.loadAllApplicants();
            });

            $scope.loadAllApplicants = function loadAllApplicants() {
                var myInfo = {"ApplicantStatus": $scope.ApplicantStatus};
                var request = {
                    method: "POST",
                    url: "./php/search-committee_getApplicants.php",
                    data: Object.toparams(myInfo),                                  //urlencode parameters
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
                };

                $http(request)
                    .then (function (result) {
                            $scope.applicants = result.data;
                            convertDatesInArrayToHtml($scope.applicants);
                        },
                        function () {
                            alert("Error Loading Applicants");
                        })
                ;
            };

            //the options for the select
            $scope.statusOptions =[
                {statusID:"0", description:"Applicant"},
                {statusID:"1", description:"Candidate"},
                {statusID:"2", description:"Selected"},
                {statusID:"3", description:"Deadpool"}
            ];

            //
            $scope.changeStatus = function changeStatus(applicant)
            {
                applicant.ApplicantStatus = applicant.tempStatus;

                //TODO: Issue an update post request to update Applicant table
            };


            $scope.loadAllApplicants();


        }
    ]);
