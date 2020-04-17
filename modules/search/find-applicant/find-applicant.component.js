/* Selecting Applicants will store data in local_storage  temp_applicants and temp_selectedIDs
 */
angular.module("search.findApplicant")
    .component("findApplicant", {
            //url is relative to position of index.html that uses it
            templateUrl:"modules/search/find-applicant/find-applicant.view.html",
            controller:
                ["$scope", "filterFilter", "$window", "$http", "$filter",
                    function FindApplicantController($scope, filterFilter, $window, $http, $filter) {

                        this.dataList = [];
                        this.filteredList = this.dataList;
                        this.selectedIDs = [];
                        this.selectedList = [];
                        this.checkall_list = false;

                        //defaults for search form
                        this.search = {
                            PersonFN:"",
                            PersonLN:"",
                            PCity: "",
                            PCounty:"",
                            ApplicantStatus: "",
                            ApplicantDocuments: "",
                            ApplicantID:"",
                            PSite: "",
                            PRegion: "",
                            DocDesc: "",
                        };

                        this.options_ApplicantStatus = [];
                        this.options_ApplicantDocuments = [];
                        this.options_Regions = [];
                        this.options_Sites = [];

                        this.getApplicantStatusDescription = function getApplicantStatusDescription(id) {
                            var description = "";
                            for(var i =0; i< this.options_ApplicantStatus.length; i++){
                                if (id == this.options_ApplicantStatus[i].AutoID) {
                                    description = this.options_ApplicantStatus[i].ApplicantStatus;
                                }
                            }
                            return description;
                        };

                        //changing the check to false will remove it from the list
                        //so always just check the first elemement in the list.
                        this.clearSelected = function clearSelected() {
                            var index = 0;
                            while (this.selectedList.length > 0) {
                                var person = this.selectedList[0];
                                this.setCheck(person, false);
                                this.applySelectFilter();
                                this.checkall_list = false;
                            }
                        };

                        this.loadData = function loadData() {

                            console.log(this.search.ApplicantDocuments);
                            console.log('1212');
                            var sendData = this.search;
                            //remove each null property
                            for (property in sendData) {
                                if (sendData.hasOwnProperty(property)) {
                                    if ((sendData[property] == null) || (sendData[property] === "")) {
                                        delete sendData[property];
                                    }
                                }
                            }
                            var request = {
                                method: "POST",
                                url: "./php/search-find-applicant_getApplicants.php",
                                data: Object.toparams(sendData),                                  //urlencode parameters
                                headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
                            };
                            var self = this;  //needed for callback
                            $http(request)
                                .then(function (result) {
                                        self.dataList = result.data;
                                        alert(self.dataList.length + " records.");

                                        self.filteredList = self.dataList;
                                        self.clearSelected();
                                    },
                                    function () {
                                        alert("Error Loading Applicants");
                                    })
                            ;
                        };
                        this.loadSearchLookups = function loadSearchLookups() {
                            //Load Applicant Status
                            var request = {
                                method: "POST",
                                url: "./php/search-find-applicant_getApplicantStatusLkp.php",
                                headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
                            };
                            var self = this;
                            $http(request)
                                .then(function (result) {

                                        self.options_ApplicantStatus = result.data;
                                    },
                                    function () {
                                        alert("Error Loading lookup Fields");
                                    })
                            ;

                            //Load Applicant Documents
                            var request = {
                                method: "POST",
                                url: "./php/search-committee_getAllApplicationFiles.php",
                                headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
                            };
                            var self = this;
                            $http(request)
                                .then(function (result) {

                                        self.options_ApplicantDocuments = result.data;
                                    },
                                    function () {
                                        alert("Error Loading Document Fields");
                                    })
                            ;

                            //Load Regions
                            var request = {
                                method: "POST",
                                url: "./php/search-committee_getRegionsLkp.php",
                                headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
                            };
                            var self = this;
                            $http(request)
                                .then(function (result) {

                                        self.options_Regions = result.data;
                                    },
                                    function () {
                                        alert("Error Loading Regions");
                                    })
                            ;

                            //Load Sites
                            var request = {
                                method: "POST",
                                url: "./php/search-committee_getSitesLkp.php",
                                headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
                            };
                            var self = this;
                            $http(request)
                                .then(function (result) {

                                        self.options_Sites = result.data;
                                    },
                                    function () {
                                        alert("Error Loading Regions");
                                    })
                            ;

                        };
                        this.applySelectFilter = function applySelectFilter() {
                            this.selectedList = filterFilter(this.dataList, {"check": true});
                        };
                        this.applyFilter = function applyFilter() {
                            this.filteredList = filterFilter(this.dataList, this.filterName);
                        };
                        this.getStyle = function getStyle(row) {
                            if (row.check) {
                                return "alert-warning";
                            }
                            else {
                                return "";
                            }
                        };
                        this.setCheck = function setCheck(row, checkValue) {
                            row.check = checkValue;
                            this.applySelectFilter();

                            if (!row.check) {
                                //remove this row from list
                                this.removeSelectedID(row.ApplicantID);
                            }
                            else {
                                // add this item to the list
                                this.addSelectedID(row.ApplicantID);
                            }
                        };
                        this.toggleCheck = function toggleCheck(row) {
                            this.setCheck(row, !row.check);
                        };
                        this.toggleCheckAllList = function toggleCheckAllList() {
                            var index;
                            this.checkall_list = !this.checkall_list;

                            index = 0;
                            for (index = 0; index < this.filteredList.length; index++) {
                                this.setCheck(this.filteredList[index], this.checkall_list);
                            }
                        };
                        this.addSelectedID = function addSelectedID(id){
                            if (this.selectedIDs.indexOf(id) === -1) {
                                this.selectedIDs.push(id);
                            }
                            $window.localStorage.setItem("temp_selectedIDs", JSON.stringify(this.selectedIDs));
                            $window.localStorage.setItem("temp_applicants", JSON.stringify(this.selectedList));
                        };
                        this.removeSelectedID = function removeSelectedID(id){
                            var foundIndex = this.selectedIDs.indexOf(id);
                            if (foundIndex !== -1) {
                                this.selectedIDs.splice(foundIndex, 1);
                            }
                            $window.localStorage.setItem("temp_selectedIDs", JSON.stringify(this.selectedIDs));
                            $window.localStorage.setItem("temp_applicants", JSON.stringify(this.selectedList));
                        };


                        this.init = function init() {
                            this.loadSearchLookups();
                        };
                        this.init();
                    }
                ]
        }
    );
