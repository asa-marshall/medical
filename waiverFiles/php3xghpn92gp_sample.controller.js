//sample.controller.js
'use strict';


angular.module('sampleApp').controller( 'sampleController', function($scope, $http)
    {
        $scope.navigation =
            [ { href:"#personal", title:"Personal Information", id:"personal", sectionInfo:"Personal Information Menu",
                options:
                    [ {title:"Change My Password", subtitle:" Description for changing password ", href:""},
                        {title:"User Groups (view only)", subtitle:"Description about My User Groups ", href:""},
                        {title:"Personal Information (view only", subtitle:"My personal information", href:""}
                        ]
            },
                { href:"#admin", title:"Admin", id:"admin", sectionInfo:"Administation Menu",
                    options:
                        [ {title:"Users", subtitle:"CRUD (Add new users, modify existing users, deactivate users -- does not delete ures ", href:""},
                            {title:"Classes ", subtitle:"CRUD (Add new classes, modify existing classes, delete classes -- only delete if class has not started ", href:""},
                            {title:"Site ", subtitle:"Contains listt- UPdate Site INformation, Modify Site DropDown Menus, Assign Company Staff ", href:""},
                            {title:"Students", subtitle:"Contains LIst - List Applicants, Cadets or Graduates, Change APplicatnt to Caset, Change Cadet to graduate", href:""}
                        ]
                },
                { href:"#cadre", title:"Cadre", id:"cadre", sectionInfo:"Cadre Menu",
                    options:
                        [ {title:"Cad1 ", subtitle:" ", href:""},
                            {title:"Cad2 ", subtitle:" ", href:""},
                            {title:" Cad3", subtitle:" ", href:""},
                            {title:"Cad4 ", subtitle:" ", href:""},
                            {title:"Cad5 ", subtitle:" ", href:""}
                        ]
                },
                { href:"#website", title:"Website Manager", id:"website", sectionInfo:"Website Manager Menu",
                    options:
                        [ {title:" Site Setup", subtitle:" ", href:""},
                            {title:"Core Components ", subtitle:" ", href:""},
                            {title:"Website Drop Down Menus ", subtitle:" ", href:""},
                            {title:" User Groups", subtitle:" ", href:""}
                        ]
                }
            ];

        $scope.users =
            [  { login: "jadams@gordon", fName:"James", lName: "Adams" },
                { login: "jradcliff@gordon", fName:"James", lName: "Cooper" },
                { login: "jDixon@gordon", fName:"James", lName: "Dixon" }

            ];


        $scope.students = [
            {id: '1', name: "andy", age:15, major:'CSCI', show:'1', dob:'2017-01-31'},
            {id: '2', name: "ace", age:20, major:'CSCI', show:'0', dob:'2017-11-1'},
            {id: '3', name: "arty", age:25, major:'CSCI', show:'1', dob:'2017-01-31'},
            {id: '4', name: "anne", age:30, major:'CSCI', show:'0', dob:'2017-01-31'},
            {id: '5', name: "brad", age:15, major:'MATH', show:'1', dob:'2017-01-31'},
            {id: '6', name: "brian", age:20, major:'MATH', show:'0', dob:'2017-01-31'},
            {id: '7', name: "billy", age:25, major:'MATH', show:'1', dob:'2017-01-31'},
            {id: '8', name: "ben", age:30, major:'MATH', show:'0', dob:'2017-01-31'}
        ];

        $scope.students = [
            {id: '1', name: "andy", age:15, major:'CSCI', show:'1'},
            {id: '2', name: "ace", age:20, major:'CSCI', show:'0'},
            {id: '3', name: "arty", age:25, major:'CSCI', show:'1'}
        ];
        $scope.ageStyle = function ageStyle(age) {
            if (age < 25)
                return "alert-danger";
            else
                return "alert-success";
        };
        $scope.addStudent = function addStudent(param)
        {
            //Get a copy of the form data object
            var stud = angular.copy(param);

            //add additional values to object
           stud.age=55;
           stud.show='1';
           stud.dob='2019-02-15';

           //add to array
           $scope.students.push(stud);
        };

        $scope.dbStudents = [];

        $scope.storeStudent = function storeStudent() {
            var stud = $scope.students[$scope.students.length - 1];

            //show all properties
            alert("last Student: " + JSON.stringify(stud));

            //remove properties not found in the 4320Students database
            delete stud.dob;
            delete stud.show;
            delete stud.$$hashKey;

            alert("These are the parameters we will send to php file: " + JSON.stringify(stud));

            $http({
                method: 'POST',
                url: "./sampleBAD.php",    //.sampleBETTER;
                data: Object.toparams(stud),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            }).then(
                //SUCCESS
                function (result) {
                    $scope.dbStudents = result.data.data;
                },
                //ERROR
                function (result) {
                    alert("Error" + JSON.stringify(result));
                });
        };

        //set initial flags
        $scope.editMode = false;
        $scope.createMode=false;
        $scope.deleteList =[];

        $scope.makeEditable = function makeEditable(){
            $scope.editMode = true;
            $scope.createMode = false;

            //create a backup of data.
            $scope.backup = angular.copy($scope.students);
        };
        $scope.saveUpdate = function saveUpdate(){
           $scope.editMode = false;

           //TODO FOR each record on deleteList send POST request -- DELETE

           //TODO Send POST request to server with modified data -- UPDATE

            //clear deleteList
            $scope.deleteList=[];
        };
        $scope.cancelUpdate = function cancelUpdate(){
            $scope.editMode = false;

            //reset deleteList;
            $scope.deleteList =[];

            //restore data to original values stored in backup
            $scope.students = angular.copy($scope.backup);
        };

        $scope.deleteStudent = function deleteStudent(index) {
            //keep track of id of deleted students
            $scope.deleteList.push($scope.students[index].id);

            //cut student[index] from the array
            $scope.students.splice(index, 1);
        };



        $scope.makeCreatable = function makeCreatable() {
            //clear any existing values in newStud
            $scope.newStud ={name:"", age:"", show:""};

            //set flags to show input fields
            $scope.createMode = true;
            $scope.editMode = false;
        };

        $scope.saveCreate = function saveCreate(){
            $scope.createMode = false;

            //add new item to students array
            $scope.students.push(angular.copy($scope.newStud));

            //TODO send  POST request to server with new data. -- INSERT INTO;
        };
        $scope.cancelCreate = function cancelCreate(){
            $scope.createMode = false;
        };

        $scope.optionsArray=[
            {description:"red", id: 100, tag:"A"},
            {description:"green", id: 200, tag: "B"},
            {description:"blue", id: 300, tag:"C"},
            ];

        $scope.doSomething = function doSomething(sel)
        {   //uses parameter: sel
            //sel = {description: "green", id: 200, tag: "B"}
            $scope.result1 =  sel.tag;

            //uses the $scope variable: scopeName
            $scope.result2 = $scope.scopeName.description;
        }



    });
Object.toparams = function ObjecttoParams(obj) {
    var p = [];
    for (var key in obj) {
        p.push(key + '=' + encodeURIComponent(obj[key]));
    }
    return p.join('&');
};
