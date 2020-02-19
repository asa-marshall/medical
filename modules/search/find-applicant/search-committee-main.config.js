//search-committee.config.js

Object.toparams = function ObjecttoParams(obj) {
    var p = [];
    for (var key in obj) {
        p.push(key + "=" + encodeURIComponent(obj[key]));
    }

    return p.join("&");
};


// Converts a htmlDate formated as "Tuesday Jan 15 2019"
// into an sqlDate  year-mm-dd
function convertToSqlDate(htmlDate) {

    if (htmlDate === null) {
        return "0000-00-00";
    }

    //Split htmldate
    var dateArray = htmlDate.toString().split(" ");

    var month;
    if (dateArray[1] === "Jan") {
        month = "01";
    }
    else if (dateArray[1] === "Feb") {
        month = "02";
    }
    else if (dateArray[1] === "Mar") {
        month = "03";
    }
    else if (dateArray[1] === "Apr") {
        month = "04";
    }
    else if (dateArray[1] === "May") {
        month = "05";
    }
    else if (dateArray[1] === "Jun") {
        month = "06";
    }
    else if (dateArray[1] === "Jul") {
        month = "07";
    }
    else if (dateArray[1] === "Aug") {
        month = "08";
    }
    else if (dateArray[1] === "Sep") {
        month = "09";
    }
    else if (dateArray[1] === "Oct") {
        month = "10";
    }
    else if (dateArray[1] === "Nov") {
        month = "11";
    }
    else {
        month = "12";
    }

    var sqlDate = dateArray[3] + '-' + month + '-' + dateArray[2];
    return sqlDate;
}

// Converts a htmlDate formated as "Tuesday Jan 15 2019"
// into an sqlDateTime  year-mm-dd 00:00:00
function convertToSqlDateTime(htmlDate) {

    if (htmlDate === null) {
        return "0000-00-00";
    }

    //Split htmldate
    var dateArray = htmlDate.toString().split(" ");

    var sqlDate = convertToSqlDate(htmlDate)+ " " + dateArray[4];

    return sqlDate;
}

// Converts a sqlDate formatted as "year-mm-dd 00:00"
// into an htmlDate formated as "Tuesday Jan 15 2019"
function convertToHtmlDate(sqlDate) {

    if (sqlDate === null) {
        return new Date("");
    }

    var tempDate = sqlDate.split(" ")[0]; //year-mm-dd
    var htmlDate = new Date("");

    if (tempDate !== "0000-00-00") {

        htmlDate = new Date(tempDate + "T00:00:00");
    }
    return htmlDate;
}

// Converts a sqlDate formatted as "year-mm-dd 00:00"
// into an htmlDate -- maintain the same time.
function convertToHtmlDateTime(sqlDate) {

    if (sqlDate === null) {
        return new Date("");
    }

    var tempDate = sqlDate.split(" ")[0]; //year-mm-dd
    var tempTime = sqlDate.split(" ")[1]; //00:00:00
    var htmlDate = new Date("");

    if (tempDate !== "0000-00-00") {

        htmlDate = new Date(tempDate + "T"+tempTime);
    }
    return htmlDate;
}
function convertDatesInArrayToHtml(myArray) {
    var index = 0;
    while (index < myArray.length) {
        convertDatesInObjectToHtml(myArray[index]);
        index++;
    }
}

function convertDatesInArrayToSql(myArray) {
    var index = 0;
    while (index < myArray.length) {
        convertDatesInObjectToSql(myArray[index]);
        index++;
    }
}

function convertDatesInObjectToSql(myObject) {

    if ((myObject != null) && (typeof myObject === "object")) {
        for (var fieldName in myObject) {
            //Check to see if property name contains Date
            if (fieldName.indexOf("Date") !== -1) {
                if (myObject[fieldName] !== null) {//IF DATE IS NOT NULL
                    myObject[fieldName] = convertToSqlDate(myObject[fieldName]);
                }
                else {
                    myObject[fieldName] = "";
                }
            }
        }
    }
}

function convertDatesInObjectToHtml(myObject) {
    if ((myObject != null) && (typeof myObject === "object")) {
        for (var fieldName in myObject) {
            //Check to see if property name contains Date
            console.log(fieldName);
            // if (fieldName.includes("Date")) {
            if (fieldName.indexOf("Date") !== -1) {
                if (myObject[fieldName] !== null) {//IF DATE IS NOT NULL
                    myObject[fieldName] = convertToHtmlDate(myObject[fieldName]);
                }
                else {
                    myObject[fieldName] = "";
                }
            }
        }
    }
}

function resetAllFields(obj) {
    for (var fieldName in obj) {

        obj[fieldName] = "";
    }

}

angular.module("SearchCommitteeApp")
    .config(["$routeProvider", "$locationProvider",
        function($routeProvider){
            $routeProvider
                .when("/viewAll",   { templateUrl: "./search-committee-applicants.view.html"})
                .otherwise({redirectTo: "/viewAll"})
            ;
        }]);


angular.module("SearchCommitteeApp")
    .controller("SearchCommitteeController", ["$scope","filterFilter", "$window","$http",
        function SearchCommitteeController($scope, filterFilter, $window, $http) {

        //Initailly show all applicants (0:Applicant, 1:Candidate, 2:Deadpool, 3:Selected)
            $scope.emails=[{"ApplicantID":"5","fkPersonID":"2249","PSalutation":"","PersonFN":"Greg","PersonLN":"Gregson","PersonGenQual":"","email":[{"ContactInfo":"gregson@mail.com","IsPreferred":"1"}]},{"ApplicantID":"6","fkPersonID":"2250","PSalutation":"","PersonFN":"Charlie","PersonLN":"Donald","PersonGenQual":"","email":[{"ContactInfo":"donald@mail.com","IsPreferred":"1"}]},{"ApplicantID":"7","fkPersonID":"2251","PSalutation":"","PersonFN":"Beth","PersonLN":"Bertha","PersonGenQual":"","email":[{"ContactInfo":"bertha@mail.com","IsPreferred":"1"}]},{"ApplicantID":"8","fkPersonID":"2252","PSalutation":"","PersonFN":"Peter","PersonLN":"Porker","PersonGenQual":"","email":[{"ContactInfo":"porker@mail.com","IsPreferred":"1"}]},{"ApplicantID":"9","fkPersonID":"2253","PSalutation":"","PersonFN":"Hans","PersonLN":"Wermhat","PersonGenQual":"","email":[{"ContactInfo":"wermhat@mail.com","IsPreferred":"1"}]},{"ApplicantID":"10","fkPersonID":"2254","PSalutation":"","PersonFN":"Samuel","PersonLN":"Johnson","PersonGenQual":"","email":[{"ContactInfo":"johnson@mail.com","IsPreferred":"1"}]},{"ApplicantID":"11","fkPersonID":"2255","PSalutation":"","PersonFN":"Marlo","PersonLN":"Private","PersonGenQual":"","email":[{"ContactInfo":"private@mail.com","IsPreferred":"1"}]},{"ApplicantID":"12","fkPersonID":"2263","PSalutation":"","PersonFN":"For Dr","PersonLN":"Phelps","PersonGenQual":"","email":[{"ContactInfo":"phelps@mail.com","IsPreferred":"0"}]},{"ApplicantID":"21","fkPersonID":"2265","PSalutation":"","PersonFN":"George","PersonLN":"Zellner","PersonGenQual":"","email":[{"ContactInfo":"gita.phelps@gmail.com","IsPreferred":"1"}]},{"ApplicantID":"22","fkPersonID":"2266","PSalutation":"","PersonFN":"Brian","PersonLN":"Williams","PersonGenQual":"","email":[]},{"ApplicantID":"23","fkPersonID":"2267","PSalutation":"","PersonFN":"Fred","PersonLN":"Flintstone","PersonGenQual":"","email":[{"ContactInfo":"fredcontact@email.com","IsPreferred":"0"}]},{"ApplicantID":"24","fkPersonID":"2268","PSalutation":"","PersonFN":"Jane","PersonLN":"Jones","PersonGenQual":"","email":[]}];
$scope.emails = [{"ApplicantID":"23","fkPersonID":"2267","PSalutation":"","PersonFN":"Fred","PersonLN":"Flintstone","PersonGenQual":"","email":[{"ContactInfo":"fredcontact@email.com","IsPreferred":"0"}],"guardians":[{"GuardianName":"Ms. Betty Rubble","emails":[{"ContactInfo":"work@mail.com","IsPreferred":"1"}]},{"GuardianName":"Mr. Barney Rubble","emails":[{"ContactInfo":"home@mail.com","IsPreferred":"0"}]}]}];
$scope.emails = [{"ApplicantID":"23","fkPersonID":"2267","PSalutation":"","PersonFN":"Fred","PersonLN":"Flintstone","PersonGenQual":"","email":[{"ContactInfo":"fredcontact@email.com","IsPreferred":"0"}],"guardians":[{"GuardianName":"Ms. Betty Rubble","emails":[{"ContactInfo":"work@mail.com","IsPreferred":"1"},{"ContactInfo":"nilla@wafers.com","IsPreferred":null},{"ContactInfo":"chicken@yahoo.com","IsPreferred":"1"}]},{"GuardianName":"Mr. Barney Rubble","emails":[{"ContactInfo":"home@mail.com","IsPreferred":"0"}]}]}];
$scope.emails = [{"ApplicantID":"5","fkPersonID":"2249","PSalutation":"","PersonFN":"Greg","PersonLN":"Gregson","PersonGenQual":"","email":[{"ContactInfo":"gregson@mail.com","IsPreferred":"1"}],"guardians":[]},{"ApplicantID":"6","fkPersonID":"2250","PSalutation":"","PersonFN":"Charlie","PersonLN":"Donald","PersonGenQual":"","email":[{"ContactInfo":"donald@mail.com","IsPreferred":"1"}],"guardians":[]},{"ApplicantID":"7","fkPersonID":"2251","PSalutation":"","PersonFN":"Beth","PersonLN":"Bertha","PersonGenQual":"","email":[{"ContactInfo":"bertha@mail.com","IsPreferred":"1"}],"guardians":[]},{"ApplicantID":"8","fkPersonID":"2252","PSalutation":"","PersonFN":"Peter","PersonLN":"Porker","PersonGenQual":"","email":[{"ContactInfo":"porker@mail.com","IsPreferred":"1"}],"guardians":[]},{"ApplicantID":"9","fkPersonID":"2253","PSalutation":"","PersonFN":"Hans","PersonLN":"Wermhat","PersonGenQual":"","email":[{"ContactInfo":"wermhat@mail.com","IsPreferred":"1"}],"guardians":[]},{"ApplicantID":"10","fkPersonID":"2254","PSalutation":"","PersonFN":"Samuel","PersonLN":"Johnson","PersonGenQual":"","email":[{"ContactInfo":"johnson@mail.com","IsPreferred":"1"}],"guardians":[]},{"ApplicantID":"11","fkPersonID":"2255","PSalutation":"","PersonFN":"Marlo","PersonLN":"Private","PersonGenQual":"","email":[{"ContactInfo":"private@mail.com","IsPreferred":"1"}],"guardians":[]},{"ApplicantID":"12","fkPersonID":"2263","PSalutation":"","PersonFN":"For Dr","PersonLN":"Phelps","PersonGenQual":"","email":[{"ContactInfo":"phelps@mail.com","IsPreferred":"0"}],"guardians":[]},{"ApplicantID":"21","fkPersonID":"2265","PSalutation":"","PersonFN":"George","PersonLN":"Zellner","PersonGenQual":"","email":[{"ContactInfo":"gita.phelps@gmail.com","IsPreferred":"1"}],"guardians":[]},{"ApplicantID":"22","fkPersonID":"2266","PSalutation":"","PersonFN":"Brian","PersonLN":"Williams","PersonGenQual":"","email":[],"guardians":[]},{"ApplicantID":"23","fkPersonID":"2267","PSalutation":"","PersonFN":"Fred","PersonLN":"Flintstone","PersonGenQual":"","email":[{"ContactInfo":"fredcontact@email.com","IsPreferred":"0"}],"guardians":[{"GuardianName":"Ms. Betty Rubble","emails":[{"ContactInfo":"work@mail.com","IsPreferred":"1"},{"ContactInfo":"nilla@wafers.com","IsPreferred":null},{"ContactInfo":"chicken@yahoo.com","IsPreferred":"1"}]},{"GuardianName":"Mr. Barney Rubble","emails":[{"ContactInfo":"home@mail.com","IsPreferred":"0"}]}]},{"ApplicantID":"24","fkPersonID":"2268","PSalutation":"","PersonFN":"Jane","PersonLN":"Jones","PersonGenQual":"","email":[],"guardians":[]}];
$scope.chosen = [];
$scope.formletter = [{"FormID":"2","FormName":"Rejected","FormText":"We regret to inform you that you have not been accepted, {lastname}.        "}];
$scope.selectedForm="";
$scope.forms=[{"FormID":"2","FormName":"Rejected","FormText":"We regret to inform you that you have not been accepted, {lastname}.        "},{"FormID":"18","FormName":"CallBack","FormText":"Please call back, {lastname}.\n        \n        \n        "},{"FormID":"31","FormName":"Empty","FormText":""},{"FormID":"32","FormName":"accepted","FormText":"Dear {salutation} {firstname} {lastname},\r\n\r\nCongratulations!  You have been accepted into the Youth Challenge Academy.  Please contact me at 912-555-1234.\r\n\r\nSincerely,\r\nMr. James Doe\r\n"},{"FormID":"33","FormName":"MissingDocuments","FormText":"Dear {PSalutation} {firstname} {lastname},\r\n\r\nYour application is not complete.  PLease submit all of the documents to me by the due date.\r\n\r\nMrs. Jane Doe"}];
$scope.formpreview ="";

            //the options for the select
            $scope.statusOptions =[
                {statusID:"0", description:"Applicant"},
                {statusID:"1", description:"Candidate"},
                {statusID:"2", description:"Selected"},
                {statusID:"3", description:"Deadpool"}
            ];
            $scope.genderOptions=[
            {statusID:"E", description:"Everyone"},
            {statusID:"F", description:"Female"},
            {statusID:"M", description:"Male"}
        ];

            $scope.SearchApplicantStatus="0";
            //$scope.filterName = 'flint';

            $scope.selectedApplicants = [];
            //          $scope.selectedApplicants = filterFilter($scope.emails, {"PersonLN": $scope.filterName});
            /*$scope.selectedApplicants = filterFilter($scope.emails,
                function(person) {
                return (person.PersonLN.indexOf($scope.filterName)!== -1);
            });
            */

//Get current date
            $scope.SearchBeginPersonAddedDate = new Date();
            $scope.SearchBeginPersonAddedDate.setMonth($scope.SearchBeginPersonAddedDate.getMonth()-6);
            $scope.SearchEndPersonAddedDate = new Date();
            $scope.checkall_email = true;
            $scope.checkall_guard= true;
            $scope.checkall_list= false;
            $scope.applicantStatus = -1;
            $scope.SearchPCounty="";
            $scope.SearchPCity="";
            $scope.SearchPGender="E";
            $scope.emailSubject="";

            $scope.clearSelected = function clearSelected()
            {
                var index =0;
                while ($scope.chosen.length > 0){
                    var person = $scope.getPersonObj($scope.chosen[0]);
                    alert("clearing "+ person.PersonFN);
                    $scope.setCheck(person, false);
                    $scope.applySelectFilter();
                    /*person.check = false;;

                    var i=0;
                    for(i=0; i< person.email.length; i++) {
                        person.email[i].emailCheck = false;
                    }
                    for(i=0; i< person.guardians.length; i++) {
                        var gindex = 0;
                        for(gindex=0; gindex < person.guardians[i].emails.length; gindex++){
                            person.guardians[i].emails[gindex].guardCheck = false;
                        }
                    }
                    */

                  }
                  $scope.chosen =[];

            };
$scope.loadApplicants = function loadApplicants() {
    var sendData ={};
    sendData.ApplicantStatus = $scope.SearchApplicantStatus;
    sendData.BeginPersonAddedDate = convertToSqlDate($scope.SearchBeginPersonAddedDate);
    sendData.EndPersonAddedDate = convertToSqlDate($scope.SearchEndPersonAddedDate);
    sendData.PCounty = $scope.SearchPCounty;

    sendData.PCity = $scope.SearchPCity;

    if($scope.SearchPGender!=="E"){
         sendData.PGender = $scope.SearchPGender;
}

    var request = {
                    method: "POST",
                    url: "./php/search-committee_getEmails.php",
                    data: Object.toparams(sendData),                                  //urlencode parameters
                    headers: {"Content-Type": "application/x-www-form-urlencoded"}  //POST is urlencoded!
                };

                $http(request)
                    .then (function (result) {
                            $scope.emails = result.data;
                            alert($scope.emails.length + "record(s) found.")


                            //$scope.emails = [{"ApplicantID":"22","fkPersonID":"2266","PSalutation":"","PersonFN":"Brian","PersonLN":"Williams","PersonGenQual":"","email":[],"guardians":[]},{"ApplicantID":"23","fkPersonID":"2267","PSalutation":"","PersonFN":"Fred","PersonLN":"Flintstone","PersonGenQual":"","email":[{"ContactInfo":"fredcontact@email.com","IsPreferred":"0"}],"guardians":[{"GuardianName":"Ms. Betty Rubble","emails":[{"ContactInfo":"work@mail.com","IsPreferred":"1"},{"ContactInfo":"nilla@wafers.com","IsPreferred":null},{"ContactInfo":"chicken@yahoo.com","IsPreferred":"1"}]},{"GuardianName":"Mr. Barney Rubble","emails":[{"ContactInfo":"home@mail.com","IsPreferred":"0"}]}]},{"ApplicantID":"24","fkPersonID":"2268","PSalutation":"","PersonFN":"Jane","PersonLN":"Jones","PersonGenQual":"","email":[],"guardians":[]}];
                            convertDatesInArrayToHtml($scope.emails);
                            $scope.selectedApplicants = $scope.emails;
                            //$scope.chosen=[];
                            $scope.clearSelected();
                        },
                        function () {
                            alert("Error Loading Applicants");
                        })
                ;
            };

$scope.sendEmail = function sendEmail() {
    var mailObj ={};
    //mailObj.mailto= "toList@gmail.com";
    mailObj.cc= "ccList@gmail.com";
    mailObj.subject="FYI:Subject";
    mailObj.bcc="gita.phelps@gmail.com";
    mailObj.body="body of text";
    var str ="mailto:"+"toList@gmail.com?"+Object.toparams(mailObj);
    alert(str);
    $window.open(str);
    //window.open("mailto:test@emxample.com?subject=subject&body=body");
    //$window.open("mailto:"+ emailId + "?subject=" + subject+"&body="+message,"_self");
    //<a href="mailto:email@example.com?cc=secondemail@example.com, anotheremail@example.com, &bcc=lastemail@example.com&subject=Mail from our Website&body=Some body text here">Send Email</a>
};
$scope.sendIndivdualEmail = function sendIndivdualEmail(row) {
                var mailObj ={};
                //mailObj.mailto= "toList@gmail.com";
                mailObj.cc= $scope.getGuardiansEmails(row);
                mailObj.subject= $scope.emailSubject;

                var body =$scope.formpreview;

                //merge letter
    body = body.split("{lastname}").join(row["PersonLN"]);
    body = body.split("{firstname}").join(row["PersonFN"]);

                mailObj.body=body;
                var str ="mailto:"+$scope.getApplicantsEmails(row)+"?"+Object.toparams(mailObj);
               // alert(str);
                $window.open(str);
              };

$scope.sendBcc = function sendBcc() {
                var index =0;
                var list =[];

    if ($scope.chosen.length === 0) {
        alert("You must select a applicant to to email.");
    }
    else {
        for (index = 0; index < $scope.chosen.length; index++) {
            var person = $scope.getPersonObj($scope.chosen[index]);
            if ($scope.getGuardiansEmails(person).length > 0) {
                list.push($scope.getGuardiansEmails(person));
            }
            if ($scope.getApplicantsEmails(person).length > 0) {
                list.push($scope.getApplicantsEmails(person));
            }
        }

        var bcc = list.join();
        var mailObj = {};
        mailObj.bcc = bcc;
        mailObj.subject = $scope.emailSubject;
        mailObj.body = $scope.formpreview;
        var str = "mailto:?" + Object.toparams(mailObj);
        // alert(str);
        $window.open(str);
    }

            };

$scope.sendTo = function sendTo() {
    var index = 0;
    if ($scope.chosen.length === 0) {
        alert("You must select a applicant to to email.");
    }
    else {
        for (index = 0; index < $scope.chosen.length; index++) {
            $scope.sendIndivdualEmail($scope.getPersonObj($scope.chosen[index]));
        }
    }
};

$scope.getSelectedEmails = function getSelectedEmails(){
    var toList = "";
    var ccList = "";
    var index;
    for (index =0; index <$scope.chosen.length; index++){
        toList = $scope.getApplicantsEmails($scope.getPersonObj($scope.chosen[index]));
        ccList = $scope.getGuardiansEmails($scope.getPersonObj($scope.chosen[index]));
    }
};

$scope.getApplicantsEmails = function getApplicantsEmails(row){

    var list="";
    var i;
    for(i=0; i< row.email.length; i++) {
        if(list !=="") {
            list += ",";
        }
        if (row.email[i].emailCheck){
            list += row.email[i].ContactInfo;
        }
    }
    return list;
};

$scope.getGuardiansEmails = function getGuardiansEmails(row){
    var i;
    var list="";
    for(i=0; i< row.guardians.length; i++) {
        var index = 0;
        for(index=0; index < row.guardians[i].emails.length; index++){
            if(row.guardians[i].emails[index].guardCheck){
                if(list !=="") {
                    list += ",";
                }

                list +=row.guardians[i].emails[index].ContactInfo;
            }
        }
    }
    return list;
};

$scope.setForm = function setForm(option) {
    var i=0;
    for (i=0; i< $scope.forms.length; i++) {
        if ($scope.forms[i].FormID === option) {
            $scope.formpreview = $scope.forms[i].FormText;
        }
    }

};

$scope.getPreview = function getPreview(applicantID) {
    var index = 0;
   // $scope.formpreview  = $scope.formletter[0].FormText;
    for (index =0; index< $scope.emails.length; index++) {
        if($scope.emails[index].ApplicantID === applicantID)
        {
          var lastname = $scope.emails[index].PersonLN;
          var firstname = $scope.emails[index].PersonFN;
          //  var newStr = myStr.replace(/,/g, '-');
           // mystring = mystring.split(',').join(newchar);
          // $scope.formpreview = $scope.formpreview.split("{lastname}").join(lastname);
          // $scope.formpreview = $scope.formpreview.split("{firstname}").join(firstname);

        }
    }
    return"";

};

            $scope.getPersonObj = function getPersonObj(applicantID) {
                var index = 0;
                for (index = 0; index < $scope.emails.length; index++) {
                    if ($scope.emails[index].ApplicantID === applicantID) {
                        return $scope.emails[index];
                    }
                }
                return null;
            };
            $scope.getPerson = function getPerson(applicantID){
                var index = 0;
                for (index =0; index< $scope.emails.length; index++)
                {
                    if($scope.emails[index].ApplicantID === applicantID)
                    {
                        return $scope.emails[index].PersonLN + ", " +$scope.emails[index].PersonFN;
                    }
                }
                return"";

            };

            $scope.chosenList =[];
            $scope.applySelectFilter = function  applySelectFilter(){
                $scope.chosenList = filterFilter($scope.emails, {"check":true});

            };

            $scope.applyFilter  = function applyFilter() {
                //seaches only by last name
            //    $scope.selectedApplicants = filterFilter($scope.emails, {"PersonLN": $scope.filterName});
                //searches anywhere in table
                $scope.selectedApplicants = filterFilter($scope.emails, $scope.filterName);

            };

            $scope.getStyle = function getStyle(row) {
                if (row.check) {
                    return "alert-warning";
                }
                else {
                    return "";
                }
            };
            $scope.toggleCheck = function toggleCheck(row) {
                row.check = !row.check;
                $scope.applySelectFilter();
                var i =0;

                if(!row.check)
                {
                    //remove this row from list
                    var foundIndex = $scope.chosen.indexOf(row.ApplicantID);
                    if(foundIndex !== -1) {
                        $scope.chosen.splice(foundIndex, 1);
                    }

                    //deselect all emails & guardians
                    i=0;
                    for(i=0; i< row.email.length; i++) {
                        row.email[i].emailCheck = false;
                    }
                    for(i=0; i< row.guardians.length; i++) {
                        var index = 0;
                        for(index=0; index < row.guardians[i].emails.length; index++){
                        row.guardians[i].emails[index].guardCheck = false;
                        }
                    }
                }
                else{
                    // add this item to the list
                    if( $scope.chosen.indexOf(row.ApplicantID)===-1){
                    $scope.chosen.push(row.ApplicantID);
                        $scope.getPreview(row.ApplicantID);
                    }

                    //set the email according to the checkall_email and checkall_guard values
                    i=0;
                    for(i=0; i< row.email.length; i++) {
                        row.email[i].emailCheck = $scope.checkall_email;
                    }
                    for(i=0; i< row.guardians.length; i++) {
                        var index = 0;
                        for(index=0; index < row.guardians[i].emails.length; index++){
                            row.guardians[i].emails[index].guardCheck = $scope.checkall_guard;
                        }
                    }
                }
            };

            $scope.preview = function preview() {
                if ($scope.chosen.length === 0) {
                    alert("You must select a applicant to preview");
                }
                else {
                    // get the content of the formpreview and show a popup modal wih text in it.

                }

            };

            $scope.setCheck = function setCheck(row, checkValue) {
                row.check = checkValue;
                var i =0;

                if(!row.check)
                {
                    //remove this row from list
                    var foundIndex = $scope.chosen.indexOf(row.ApplicantID);
                    if(foundIndex !== -1) {
                        $scope.chosen.splice(foundIndex, 1);
                    }

                    //deselect all emails & guardians
                    i=0;
                    for(i=0; i< row.email.length; i++) {
                        row.email[i].emailCheck = false;
                    }
                    for(i=0; i< row.guardians.length; i++) {
                        var index = 0;
                        for(index=0; index < row.guardians[i].emails.length; index++){
                            row.guardians[i].emails[index].guardCheck = false;
                        }
                    }
                }
                else{
                    // add this item to the list
                    if( $scope.chosen.indexOf(row.ApplicantID)===-1){
                        $scope.chosen.push(row.ApplicantID);
                        $scope.getPreview(row.ApplicantID);
                    }

                    //set the email according to the checkall_email and checkall_guard values
                    i=0;
                    for(i=0; i< row.email.length; i++) {
                        row.email[i].emailCheck = $scope.checkall_email;
                    }
                    for(i=0; i< row.guardians.length; i++) {
                        var index = 0;
                        for(index=0; index < row.guardians[i].emails.length; index++){
                            row.guardians[i].emails[index].guardCheck = $scope.checkall_guard;
                        }
                    }
                }
            };
            $scope.toggleCheckAllEmail = function toggleCheckAllEmail() {
              $scope.checkall_email = !$scope.checkall_email;
            };
            $scope.toggleCheckAllGuard = function toggleCheckAllGuard() {
                $scope.checkall_guard = !$scope.checkall_guard;
            };

            $scope.toggleCheckAllList = function toggleCheckAllList() {
                var index;
                if($scope.checkall_list === true) {
                    $scope.checkall_list = false;

                     index =0;
                    for (index=0; index< $scope.selectedApplicants.length; index++){
                        $scope.setCheck($scope.selectedApplicants[index],false);
                    }
                }
                else{
                    $scope.checkall_list = true;
                     index =0;
                    for (index=0; index< $scope.selectedApplicants.length; index++){
                        $scope.setCheck($scope.selectedApplicants[index],true);
                    }
                }
            };

            //Issue a request to child to change the Application Status
        $scope.setShowApplicant = function setShowApplicant(status) {
                $scope.ApplicantStatus=status;
                $scope.$broadcast ("ApplicantStatusChangeEvent");
        };


        }
    ]);
