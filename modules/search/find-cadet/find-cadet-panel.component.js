//Result - stores the ClassDetailID in localStorage and issues reloadEvent passing ClassDetailID
angular.module("search.findCadet")
    .component("findCadetPanel", {
        //url is relative to position of index.html that uses it
        templateUrl:"modules/search/find-cadet/find-cadet-panel.view.html",
        controller:
            ["$scope", "$window", "$rootScope", "$filter",
        function FindCadetPanelController($scope,$window, $rootScope, $filter) {

        this.cadets = [];
        this.cadetNames = [];
        this.chosenCadet= {};
        $scope.cadetNames = [];

        this.saveSelection = function saveSelection() {
            //load data stored in temp location
            this.cadets = JSON.parse($window.localStorage.getItem("temp_cadets"));
            var i;
            var cadet;
            if (this.cadets == null) {
                this.cadets =[];
            }

            //format data for display
            for (i=0; i< this.cadets.length; i++) {
                cadet = this.cadets[i];
                //Store fullname
                this.cadets[i].fullName = cadet.PersonLN + cadet.PersonGenQual + ", " + cadet.PersonFN;

                //Calculate Age
                var age = 0;
                var curentDate = new Date();
                var birthdate = convertToHtmlDate(cadet.PDOB);
                if (isNaN(birthdate.getTime())) {
                    // date is not valid
                    age = 0;
                }
                else {
                    var diff = curentDate - birthdate; // This is the difference in milliseconds
                    age = Math.floor(diff / 31557600000); // Divide by 1000*60*60*24*365.25
                }
                this.cadets[i].displayPDOB = this.cadets[i].PDOB.split(" ")[0] + " (age: " + age + ")";

                //store photo
                if (cadet.CadetImage == null || cadet.CadetImage === "") {
                    cadet.CadetImage = "./images/workInProgress.jpeg"
                }
            };

            //Sort
            this.cadets = $filter('orderBy')(this.cadets, 'fullName');

            //Save
            $window.localStorage.setItem("cadets", JSON.stringify(this.cadets));
            var selectedIDs = JSON.parse($window.localStorage.getItem("temp_selectedIDs"));
            $window.localStorage.setItem("selectedIDs", JSON.stringify(selectedIDs));

        };

            this.selectCadet = function selectCadet(index) {
                $window.localStorage.setItem("ClassDetailID", this.cadets[index].ClassDetailID);
                $window.localStorage.setItem("chosenCadetIndex", index);
                this.chosenCadet = this.cadets[index];
                this.chosenCadetIndex = index;

                //Important:  broadcasts to all that have $rootScope to reload ClassDetilaID
                //Requests $rootScope to broadcast event to children - who will catch this with an $on
                //source: http://www.binaryintellect.net/articles/5d8be0b6-e294-457e-82b0-ba7cc10cae0e.aspx
                $rootScope.$broadcast("reloadClassDetailIDEvent", this.cadets[index].ClassDetailID);
            };

            this.getStyle = function getStyle(index) {
                if (index === this.chosenCadetIndex) {
                    return "alert-warning";
                }
                else {
                    return "";
                }
            };

            this.init = function init() {
                this.cadets = JSON.parse($window.localStorage.getItem("cadets"));
                if (this.cadets == null) {
                    this.cadets = [];
                }

                //Selects the first element in list
                if (this.cadets.length > 0) {
                    this.cadetSelectionError = false;
                    this.selectCadet(0);
                }
                else {
                    this.cadetSelectionError = true;
                    this.chosenCadetIndex = -1;
                    this.chosenCadet = {};
                    $window.localStorage.setItem("chosenCadetIndex", this.chosenCadetIndex);
                }
            };

            this.init();

            //findCadet modal has been closed so reload
            $("#findCadetModal").on("hidden.bs.modal", function () {
                window.location.reload();
            });

          /*        //select the correct index
                  this.chosenCadetIndex = JSON.parse($window.localStorage.getItem("chosenCadetIndex"));

                //if chosenCadetNumber = -1 then set it to the first item on the list otherwise make
                // the first cadet the one chosen
                this.cadetSelectionError = false;
                  if (( this.chosenCadetIndex==null || this.chosenCadetIndex === -1) || (this.chosenCadetIndex >= this.cadets.length)){
                      if(this.cadets.length>0)
                      {
                          this.selectCadet(0);
                      }
                      else{
                          //invalid chosenIndex
                          this.chosenCadetIndex=null;
                          $window.localStorage.removeItem("chosenCadetIndex");
                          $window.localStorage.removeItem("ClassDetailID");
                          this.cadetSelectionError = true;
                      }
                  }
                  else {
                      this.selectCadet(this.chosenCadetIndex);
                  }
                  $scope.cadetNames = this.cadetNames;
            };
            */


            //this.loadCadetsToView();




            /*   this.loadCadetsToView = function loadCadetsToView() {
                     this.cadets = JSON.parse($window.localStorage.getItem("cadets"));
                     var curentDate = new Date();

                     if (this.cadets ==null){
                         this.cadets =[];
                     }
                     for( var i=0; i< this.cadets.length; i++) {
                         var cadet = this.cadets[i];
                         this.cadetNames.push(cadet.PersonFN + " " + cadet.PersonLN + cadet.PersonGenQual + "(" + cadet.AcademyID + ")");

                         //calculate age
                         cadet.birthdate = convertToHtmlDate(cadet.PDOB);
                         var diff = curentDate - cadet.birthdate; // This is the difference in milliseconds
                         cadet.age = Math.floor(diff / 31557600000); // Divide by 1000*60*60*24*365.25

                         //store photo
                         if (cadet.CadetImage == null || cadet.CadetImage === "") {
                             cadet.CadetImage = "./images/workInProgress.jpeg"
                         }
               }
               */
        }
    ]}
    );
