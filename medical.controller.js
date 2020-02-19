

angular.module('medical')
    .controller('MedicalController', ['$scope', '$http','$rootScope','$window',
        function MedicalController($scope, $http, $rootScope, $window) {

            $scope.ClassDetailID = $window.localStorage.getItem("ClassDetailID");
            $scope.classDetailIDError = true;



            $scope.medInsurance =[
                {"MedInsuranceID":"18","fkClassDetailID":"22","InsuranceType":"Medical","PolicyNumber":"716315172","PolicyHolderName":"Christian B. Edwards","PolicyHolderSSN":null,"PolicyHolderRelationship":"Other","GroupNumber":null,"PolicyExpDate":"2017-06-05","PrimaryHCP":null,"CopayInfo":null,"InsCoName":"Amerigroup RealSolution","InsCoAddress":null,"InsCoAddress2":null,"InsCoCity":null,"InsCoState":null,"InsCoZip":null,"InsCoPhone":null,"InsCoFax":null},
                {"MedInsuranceID":"7","fkClassDetailID":"83","InsuranceType":"Medical","PolicyNumber":"IDW222236639","PolicyHolderName":null,"PolicyHolderSSN":null,"PolicyHolderRelationship":null,"GroupNumber":"689689-010-00701","PolicyExpDate":null,"PrimaryHCP":null,"CopayInfo":null,"InsCoName":"AETNA","InsCoAddress":"PO BOX 14079","InsCoAddress2":null,"InsCoCity":"LEXINGTON","InsCoState":"KY","InsCoZip":"40512","InsCoPhone":"8888023862","InsCoFax":null},
                {"MedInsuranceID":"9","fkClassDetailID":"84","InsuranceType":null,"PolicyNumber":"urr045611723691","PolicyHolderName":null,"PolicyHolderSSN":null,"PolicyHolderRelationship":null,"GroupNumber":null,"PolicyExpDate":null,"PrimaryHCP":null,"CopayInfo":null,"InsCoName":"BCBS OF SC","InsCoAddress":"PO BOX 100300","InsCoAddress2":null,"InsCoCity":"COLUMBIA","InsCoState":"SC","InsCoZip":"29202","InsCoPhone":"8003256596","InsCoFax":null}
            ];


            $scope.collapseCards = function collapseCards() {
                $(".collapse").collapse("hide");

            };
            $scope.showCards = function showCards() {
                $(".collapse").collapse("show");
            };


            $scope.getCardStyle = function getCardStyle(editMode) {
                if (editMode) {
                    return "alert-warning";
                }
                return "";
            };
            $scope.init = function init() {
                $scope.fkClassDetailID = $window.localStorage.getItem("ClassDetailID");
                $scope.classDetailIDError = ($scope.fkClassDetailID==null || $scope.fkClassDetailID=== -1);
            };

            // receives an reloadClassDetailEvent from  the find-cadet=panel-component
            //broadcast event to children - who will catch this with an $emit
            //source: http://www.binaryintellect.net/articles/5d8be0b6-e294-457e-82b0-ba7cc10cae0e.aspx
            $scope.$on("reloadClassDetailIDEvent",function (evt, data){
                //the data is the class detail ID
                $scope.init();
            });

            $scope.init();

        }

    ]);
