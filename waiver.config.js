//waiver.config.js

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
    .controller('WaiverController', ['$scope', '$http',
        function WaiverController($scope, $http) {


            $scope.medWaivers = [
                {"MedWaiverID":"3","fkClassDetailID":"80","WaiverAddedDate":"2019-12-12","fkMedSickCallRestrictionID":null,"WaiverType":null,"WaiverStartDate":"2019-01-12","WaiverEndDate":"2019-02-12","WaiverDescription":"broken leg","MedFiles":[{"MedFileAttachmentID":"11","DateUploaded":"2020-01-31","DocumentID":"3","DocumentType":"MedicalWaiver","SourceFileName":"1302_StringBuilderActivity.pdf","FilePath":"waiverFiles\/php8daslr_921302_StringBuilderActivity.pdf"},{"MedFileAttachmentID":"12","DateUploaded":"2020-01-31","DocumentID":"3","DocumentType":"MedicalWaiver","SourceFileName":"GaTech_Imposters.pdf","FilePath":"waiverFiles\/phpvgcv7b_92GaTech_Imposters.pdf"}]},
                {"MedWaiverID":"4","fkClassDetailID":"80","WaiverAddedDate":"2019-11-12","fkMedSickCallRestrictionID":"123","WaiverType":null,"WaiverStartDate":"2019-01-16","WaiverEndDate":"2019-03-12","WaiverDescription":"no pt", "MedFiles":[{"MedFileAttachmentID":"3","DateUploaded":"2020-01-31","DocumentID":"4","DocumentType":"MedicalWaiver","SourceFileName":"gp_sample.controller.js","FilePath":"waiverFiles\/phpjsb4xb_92gp_sample.controller.js"},{"MedFileAttachmentID":"10","DateUploaded":"2020-01-31","DocumentID":"4","DocumentType":"MedicalWaiver","SourceFileName":"CopiedHomework2014.pdf","FilePath":"waiverFiles\/phpq0jxef_92CopiedHomework2014.pdf"}]}
                ];
            $scope.showSickCall = false;

            $scope.waiverFilter="";

            $scope.loadMedWaivers = function loadMedWaivers() {

                //TODO - you need to get fkClassDetailID

                //convert all dates from sql format to html date format
                convertDatesInArrayToHtml($scope.medWaivers);
            };



            $scope.loadMedWaivers();

            $scope.editMedWaivers = false;

            $scope.viewMedSickCallDetails = function viewMedSickCallDetails(index)
            {
                alert("viewing sickcall "+index);
                $scope.showDeatilViewMode=true;
            };

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


            //TODO you must declare a waiverFiles folder
             //Upload File - Specify ApplicantID, PATH and File
            $scope.uploadFile =  function() {
                var currDirectory='waiverFiles';
                $scope.ClassDetailID ="92";

                var myFile = document.querySelector("#myFile");
                var formData = new FormData();
                formData.append("ClassDetailID",$scope.ClassDetailID);
                formData.append("directory",currDirectory);
                formData.append("fileType","MedicalWaiver");
                formData.append("file", myFile.files[0]);
                for (var key of formData.keys()) {
                    console.log(key);
                }
                var task = $http({
                    method: 'POST',
                    url: './php/med_fileUpload.php',
                    data: formData,
                    transformRequest: angular.identity,
                    headers: {'Content-Type': undefined}
                });
                task.then(
                    //success
                    function (result) {
                        if (result.data === "1") {

                        alert("File Uploaded!");
                        }
                        else
                        {
                            alert("Error Uploading File");
                        }

                        //Clear the name from the "Choose File" input element
                        var myFile = document.querySelector('#myFile');
                        myFile.value = "";
                    },
                    //error
                    function (result) {
                        alert("Error Uploading File: " + JSON.stringify(result));
                    }
                );
            };

/*
            //resource:
            //http://jaliyaudagedara.blogspot.com/2016/05/angularjs-download-files-by-sending.html
            $scope.downloadFile = function (name) {

                //alert("Downloading:" + name);
                $http({
                    method: 'GET',
                    url: './php/app_fileDownload.php',
                    params: { file: name ,directory:'mentorFiles' },
                    responseType: 'arraybuffer'
                }).success(function (data, status, headers) {
                    headers = headers();

                    var filename = headers['x-filename'];

                    //There is no x-filename field in the value returned.  I was able to use content-disposition
                    //content-disposition: "attachment; filename=sample.pdf"
                    filename=  headers['content-disposition'].split("=")[1];

                    var contentType = headers['content-type'];

                    var linkElement = document.createElement('a');
                    try {
                        var blob = new Blob([data], { type: contentType });
                        var url = window.URL.createObjectURL(blob);

                        linkElement.setAttribute('href', url);
                        linkElement.setAttribute("download", filename);

                        var clickEvent = new MouseEvent("click", {
                            "view": window,
                            "bubbles": true,
                            "cancelable": false
                        });
                        linkElement.dispatchEvent(clickEvent);
                    } catch (ex) {
                        console.log(ex);
                    }
                }).error(function (data) {
                    console.log(data);
                });
            };


            $scope.app = {AppID: $scope.ApplicantID};
            var taskListFile = $http({
                method: 'POST',
                url: './php/app_fileList.php',
                data: Object.toparams($scope.app),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}

            });
            taskListFile.then(
                //Will use this statement once we have applicant ID functioning fully
                //var applicantID = $scope.applicantID
                function(result){

                    $scope.fileList = result.data.data;
                },
                function(result){
                    alert("Failure");
                }
                */
        }
    ]);
