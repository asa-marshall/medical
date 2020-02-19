//Result - stores the ApplicantID in localStorage and issues reloadEvent passing ApplicantID
angular.module("search.findApplicant")
    .component("findApplicantPanel", {
            //url is relative to position of index.html that uses it
            templateUrl: "modules/search/find-applicant/find-applicant-panel.view.html",
            controller:
                ["$scope", "$window", "$rootScope", "$filter",
                    function FindApplicantPanelController($scope, $window, $rootScope, $filter) {

                        this.applicants = [];
                        this.names = [];
                        this.chosenApplicant = {};
                        $scope.applicantNames = [];

                        this.saveSelection = function saveSelection() {
                            //load data stored in temp location
                            this.applicants = JSON.parse($window.localStorage.getItem("temp_applicants"));
                            var i;
                            var applicant;
                            if (this.applicants == null) {
                                this.applicants =[];
                            }

                            //format data for display
                            for (i=0; i< this.applicants.length; i++) {
                                applicant = this.applicants[i];
                                //Store fullname
                                this.applicants[i].fullName = applicant.PersonLN + applicant.PersonGenQual + ", " + applicant.PersonFN;

                                //Calculate Age
                                var age = 0;
                                var curentDate = new Date();
                                var birthdate = convertToHtmlDate(applicant.PDOB);
                                if (isNaN(birthdate.getTime())) {
                                    // date is not valid
                                    age = 0;
                                }
                                else {
                                    var diff = curentDate - birthdate; // This is the difference in milliseconds
                                    age = Math.floor(diff / 31557600000); // Divide by 1000*60*60*24*365.25
                                }
                                this.applicants[i].displayPDOB = applicant.PDOB.split(" ")[0] + " (age: " + age + ")";
                            };

                            //Sort
                            this.applicants = $filter('orderBy')(this.applicants, 'fullName');

                            //Save
                            $window.localStorage.setItem("applicants", JSON.stringify(this.applicants));
                            var selectedIDs = JSON.parse($window.localStorage.getItem("temp_selectedIDs"));
                            $window.localStorage.setItem("selectedIDs", JSON.stringify(selectedIDs));

                        };

                        this.selectApplicant = function selectApplicant(index) {
                            $window.localStorage.setItem("ApplicantID", this.applicants[index].ApplicantID);
                            $window.localStorage.setItem("chosenApplicantIndex", index);
                            this.chosenApplicant = this.applicants[index];
                            this.chosenApplicantIndex = index;

                            //Important:  broadcasts to all that have $rootScope to reload ApplicantID
                            //Requests $rootScope to broadcast event to children - who will catch this with an $on
                            //source: http://www.binaryintellect.net/articles/5d8be0b6-e294-457e-82b0-ba7cc10cae0e.aspx
                            $rootScope.$broadcast("reloadApplicantIDEvent", this.applicants[index].ApplicantID);
                        };

                        this.getStyle = function getStyle(index) {
                            if (index === this.chosenApplicantIndex) {
                                return "alert-warning";
                            }
                            else {
                                return "";
                            }
                        };

                        this.init = function init() {
                            this.applicants = JSON.parse($window.localStorage.getItem("applicants"));
                            if (this.applicants == null) {
                                this.applicants = [];
                            }

                            //Selects the first element in list
                            if (this.applicants.length > 0) {
                                this.applicantSelectionError = false;
                                this.selectApplicant(0);
                            }
                            else {
                                this.applicantSelectionError = true;
                                this.chosenApplicantIndex = -1;
                                this.chosenApplicant = {};
                                $window.localStorage.setItem("chosenApplicantIndex", this.chosenApplicantIndex);
                            }
                        };

                        this.init();

                        //findApplicant modal has been closed so reload
                        $("#findApplicantModal").on("hidden.bs.modal", function () {
                            window.location.reload();
                        });

                    }
                ]
        }
    );
