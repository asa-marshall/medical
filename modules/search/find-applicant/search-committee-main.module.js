
angular.module("SearchCommitteeApp",[
    "ngRoute"
]);


var myApp = angular.module("SearchCommitteeApp");



angular.module("SearchCommitteeApp")
    .config(["$routeProvider", "$locationProvider",
        function($routeProvider){
            $routeProvider
                .when("/viewAll",   { templateUrl: "./search-committee-applicants.view.html"})
                .otherwise({redirectTo: "/viewAll"})
            ;
        }]);
