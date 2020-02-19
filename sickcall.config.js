//sickcall.config.js

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

angular.module('mainApp')
    .controller('SickCallController', ['$scope', '$http',
        function SickCallController($scope, $http) {

            //TODO Can these go outised constructor asn regular fiel
            $scope.toggleCards = function toggleCards() {
                $(".collapse").collapse("toggle");

            };
            $scope.collapseCards = function collapseCards() {
                $(".collapse").collapse("hide");

            };
            $scope.showCards = function showCards() {
                $(".collapse").collapse("show");

            };

            $scope.medSickCalls = [
                {
                    "MedSickCallID": "580",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2017-11-16 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Miscellaneous",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": null,
                    "SickCallDiagnosis": null,
                    "SickCallMedicine": null,
                    "SickCallReason": "Having Sharp chest pain, knee right locking, and headach",
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": null,
                    "BP": null,
                    "Pulse": null,
                    "Respirations": null,
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]
                },
                {
                    "MedSickCallID": "581",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2017-11-16 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Miscellaneous",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": "2017-11-16 00:00:00",
                    "SickCallDiagnosis": null,
                    "SickCallMedicine": "Motrin 400mg given xl-Icepack applied to right knee swelling, educated candidate, ace bandage applie",
                    "SickCallReason": "Having sharp chest pain, right knee locking , and headache",
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": " 978",
                    "BP": "12062",
                    "Pulse": null,
                    "Respirations": null,
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

                },
                {
                    "MedSickCallID": "582",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2017-11-21 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Miscellaneous",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": "2017-11-21 00:00:00",
                    "SickCallDiagnosis": null,
                    "SickCallMedicine": "Give throat spray 10mL grawl then swallow, cough drops, 02 200mg IBU, and muscle rub",
                    "SickCallReason": "Heachache, Sore throat, neck pain and back pain",
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": " 978",
                    "BP": "12062",
                    "Pulse": "88",
                    "Respirations": "18",
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

                },
                {
                    "MedSickCallID": "679",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2017-11-24 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Miscellaneous",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": "2017-11-24 00:00:00",
                    "SickCallDiagnosis": null,
                    "SickCallMedicine": "IBU 800MG X1 dose",
                    "SickCallReason": "Sharp ankle pain like someone is stabbing it etc.",
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": null,
                    "BP": null,
                    "Pulse": null,
                    "Respirations": null,
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

                },
                {
                    "MedSickCallID": "700",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2017-11-27 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Miscellaneous",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": "2017-11-27 00:00:00",
                    "SickCallDiagnosis": null,
                    "SickCallMedicine": "Given 02 200mg IBU an encourged to push fluids",
                    "SickCallReason": "Headache being lightheaded feeling dizzy",
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": null,
                    "BP": null,
                    "Pulse": null,
                    "Respirations": null,
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

                },
                {
                    "MedSickCallID": "749",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2017-12-05 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Miscellaneous",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": "2017-12-05 00:00:00",
                    "SickCallDiagnosis": null,
                    "SickCallMedicine": "Given 02 220mg Naproxen; Advised to do heat threaphy; move arm",
                    "SickCallReason": "left side pain",
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": null,
                    "BP": null,
                    "Pulse": null,
                    "Respirations": null,
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

                },
                {
                    "MedSickCallID": "777",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2017-12-07 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Miscellaneous",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": "2017-12-07 00:00:00",
                    "SickCallDiagnosis": null,
                    "SickCallMedicine": "IBU 400MG for pain- Muscle Rub to l shoulder. Advised of lotion for dryness. Refer to nurse for pers",
                    "SickCallReason": null,
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": null,
                    "BP": null,
                    "Pulse": null,
                    "Respirations": null,
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

                },
                {
                    "MedSickCallID": "807",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2017-12-12 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Miscellaneous",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": "2017-12-12 00:00:00",
                    "SickCallDiagnosis": null,
                    "SickCallMedicine": "Given ear wax removal drops for 5 mins and clean left ear. will do for 3 days",
                    "SickCallReason": "Left ear ache",
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": null,
                    "BP": null,
                    "Pulse": null,
                    "Respirations": null,
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

                },
                {
                    "MedSickCallID": "849",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2017-12-20 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Miscellaneous",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": "2017-12-20 00:00:00",
                    "SickCallDiagnosis": null,
                    "SickCallMedicine": "ear checked small pimple in ear, advised to take pain med as needed",
                    "SickCallReason": "bump in ear",
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": null,
                    "BP": null,
                    "Pulse": null,
                    "Respirations": null,
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

                },
                {
                    "MedSickCallID": "873",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2018-01-03 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Miscellaneous",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": "2018-01-03 00:00:00",
                    "SickCallDiagnosis": null,
                    "SickCallMedicine": "tighten eyeglasses",
                    "SickCallReason": "eyeglasses",
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": null,
                    "BP": null,
                    "Pulse": null,
                    "Respirations": null,
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

                },
                {
                    "MedSickCallID": "885",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2018-01-05 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Miscellaneous",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": "2018-01-05 00:00:00",
                    "SickCallDiagnosis": null,
                    "SickCallMedicine": "Naproxen 220mg x 2 given for pain; Cloraseptic spray 10mL, Anti itch cream to both arms",
                    "SickCallReason": "chest pain, headache,",
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": null,
                    "BP": null,
                    "Pulse": null,
                    "Respirations": null,
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

                },
                {
                    "MedSickCallID": "899",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2018-01-08 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Miscellaneous",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": "2018-01-08 00:00:00",
                    "SickCallDiagnosis": null,
                    "SickCallMedicine": "Cold relief tablets x 2, Ice and muscle rub",
                    "SickCallReason": "chest pain knee hurts sore throat",
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": null,
                    "BP": null,
                    "Pulse": null,
                    "Respirations": null,
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

                },
                {
                    "MedSickCallID": "1028",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2018-01-26 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Miscellaneous",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": "2018-01-26 00:00:00",
                    "SickCallDiagnosis": null,
                    "SickCallMedicine": "Mylanta 30mL- heat therapy to left shoulder. Advised Ibuprofen or tylenol as needed for pain",
                    "SickCallReason": "shoulder pain",
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": null,
                    "BP": null,
                    "Pulse": null,
                    "Respirations": null,
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

                },
                {
                    "MedSickCallID": "1036",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2018-01-29 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Miscellaneous",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": "2018-01-29 00:00:00",
                    "SickCallDiagnosis": "02 sat 98%",
                    "SickCallMedicine": "Ice therapy as needed for pain. Ibuprofen 400mg for pain",
                    "SickCallReason": "C\/o ankle pain, chest pain, hard to breathe",
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": null,
                    "BP": null,
                    "Pulse": null,
                    "Respirations": null,
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

                },
                {
                    "MedSickCallID": "1043",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2018-01-30 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Miscellaneous",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": "2018-01-30 00:00:00",
                    "SickCallDiagnosis": null,
                    "SickCallMedicine": "Mylanta 30mL (2) Tums. (2) tylenol 500mg",
                    "SickCallReason": "chest hurts",
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": null,
                    "BP": null,
                    "Pulse": null,
                    "Respirations": null,
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

                },
                {
                    "MedSickCallID": "1069",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2018-01-31 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Miscellaneous",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": "2018-01-31 00:00:00",
                    "SickCallDiagnosis": null,
                    "SickCallMedicine": "F\/u with MD 02\/01\/18",
                    "SickCallReason": "chest pain",
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": null,
                    "BP": null,
                    "Pulse": null,
                    "Respirations": null,
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

                },
                {"MedSickCallID":"8","fkClassDetailID":"138","SickCallDate":"2017-05-12 00:00:00","WasPassIssued":"0","SickCallType":"Miscellaneous","WasDoctorVisit":"1","DoctorVisitDate":"2017-05-12 00:00:00","SickCallDiagnosis":"ER Visit","SickCallMedicine":null,"SickCallReason":"Left shoulder pain","SickCallHeight":null,"SickCallWeight":null,"Temperature":null,"BP":null,"Pulse":null,"Respirations":null,"fkSOAPNoteID":null},
                {
                    "MedSickCallID": "1172",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2018-02-13 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Headache",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": "2018-02-13 00:00:00",
                    "SickCallDiagnosis": null,
                    "SickCallMedicine": "mylanta 15ml, 02 pain off",
                    "SickCallReason": "c\/o migraine headache, stomach pain",
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": null,
                    "BP": null,
                    "Pulse": null,
                    "Respirations": null,
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

                },
                {
                    "MedSickCallID": "1220",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2018-02-26 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Miscellaneous",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": "2018-02-26 00:00:00",
                    "SickCallDiagnosis": null,
                    "SickCallMedicine": "zofran 4mg",
                    "SickCallReason": "c\/o vomiting and dizziness",
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": null,
                    "BP": null,
                    "Pulse": null,
                    "Respirations": null,
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

                },
                {
                    "MedSickCallID": "1243",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2018-02-28 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Headache",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": "2018-02-28 00:00:00",
                    "SickCallDiagnosis": null,
                    "SickCallMedicine": "02 pain off given",
                    "SickCallReason": "c\/o of headache",
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": null,
                    "BP": null,
                    "Pulse": null,
                    "Respirations": null,
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

                },
                {
                    "MedSickCallID": "1283",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2018-03-09 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Miscellaneous",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": "2018-03-09 00:00:00",
                    "SickCallDiagnosis": null,
                    "SickCallMedicine": "Allergy relief  given, 5 sprays of throat spray, cough syrup and prilosec given for heartburn",
                    "SickCallReason": "sore throat, chest pain",
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": null,
                    "BP": null,
                    "Pulse": null,
                    "Respirations": null,
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

                },
                {"MedSickCallID":"864","fkClassDetailID":"333","SickCallDate":"2017-12-22 00:00:00","WasPassIssued":"1","SickCallType":"Miscellaneous","WasDoctorVisit":"0","DoctorVisitDate":"2017-12-22 00:00:00","SickCallDiagnosis":"knee inflammation","SickCallMedicine":"ice therapy x20min, naproxen 440mg, wrap given for support and comfort, keep right knee elevated whi","SickCallReason":"right knee pain and swelling","SickCallHeight":null,"SickCallWeight":null,"Temperature":null,"BP":null,"Pulse":null,"Respirations":null,"fkSOAPNoteID":null},
                {
                    "MedSickCallID": "1291",
                    "fkClassDetailID": "314",
                    "SickCallDate": "2018-03-12 00:00:00",
                    "WasPassIssued": "0",
                    "SickCallType": "Miscellaneous",
                    "WasDoctorVisit": "0",
                    "DoctorVisitDate": "2018-03-12 00:00:00",
                    "SickCallDiagnosis": null,
                    "SickCallMedicine": "PRN IBU 400mg",
                    "SickCallReason": "HERE I AM!s",
                    "SickCallHeight": null,
                    "SickCallWeight": null,
                    "Temperature": null,
                    "BP": null,
                    "Pulse": null,
                    "Respirations": null,
                    "fkSOAPNoteID": null,
                    "MedSickCallRestrictions": [
                        {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2019-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"apple pearer shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                        {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2030-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"testing 2 or shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

                }
            ];

            $scope.detailView =      {
                "MedSickCallID": "1291",
                "fkClassDetailID": "314",
                "SickCallDate": "2018-03-12 00:00:00",
                "WasPassIssued": "0",
                "SickCallType": "Miscellaneous",
                "WasDoctorVisit": "0",
                "DoctorVisitDate": "2018-03-12 00:00:00",
                "SickCallDiagnosis": null,
                "SickCallMedicine": "PRN IBU 400mg",
                "SickCallReason": "chest hurts",
                "SickCallHeight": null,
                "SickCallWeight": null,
                "Temperature": null,
                "BP": null,
                "Pulse": null,
                "Respirations": null,
                "fkSOAPNoteID": null,
                "MedSickCallRestrictions": [
                    {"MedSickCallRestrictionID":"1","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"No ravor shave; clipper shave only; clean affected areas with witch hazel and or seabreeze; follow up in 1 week"},
                    {"MedSickCallRestrictionID":"3","fkMedSickCallID":"580","fkMedRestrictionTypeAutoID":"5","RestrictionStartDate":"2017-11-20 00:00:00","RestrictionEndDate":"2017-11-27 00:00:00","RestrictionNote":"Clipper shave X 1 week no ravor shave; advised cand to clean clippers before and after; clean with witch hazel and seabreeze after shaving"}]

            };

            $scope.showDetailViewMode = false;
            $scope.isSickCallRestriction = function isSickCallRestriction(key)
            {
                console.log("comparing"+key);
              return (key==='MedSickCallRestrictions');
            };

            $scope.viewMedSickCallDetails = function viewMedSickCallDetails(index)
            {
                $scope.detailView =$scope.medSickCalls[index];
                $scope.showDetailViewMode = true;
            };

            $scope.loadMedSickCalls = function loadMedSickCalls() {

                //TODO - you need to get fkClassDetailID

                //convert all dates from sql format to html date format
                convertDatesInArrayToHtml($scope.medSickCalls);
            };



            $scope.loadMedSickCalls();

            $scope.editMedSickCalls = false;

            $scope.getCardStyle = function getCardStyle(editMode) {
                if (editMode) {
                    return "alert-warning";
                }
                return "";
            };
        }
    ]);
