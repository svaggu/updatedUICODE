app.controller('postaJobController', function($scope, $location, $rootScope, fileUploadService, callService) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData, returnData;
	var user = localStorage.getItem('isCheckUser');
	var userRole = localStorage.getItem('userRole');

	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employer-home');
	}else if (userRole == 'recruiter' || userRole == 'recruiterAdmin') {
		accessData = angular.fromJson(window.localStorage['userObj']);
		returnData = angular.fromJson(window.localStorage['userDetailsObj']);

		$(".postajob").addClass("active");
		$(".posted_jobs").removeClass("active");
		$(".employer_dashboard").removeClass("active");
		$(".boolean_search").removeClass("active");
		$(".my_favorites").removeClass("active");
		$(".saved_search").removeClass("active");

		$rootScope.userobj = accessData;
		$rootScope.returnData = returnData;
		$("#employeeheader").hide();
		$("#signoutheader").show();
		$("#homeheader").hide();
		$("#employerheader").show();
		$("#signinheader").hide();
		$("#footersection").hide();
		$(".hideclass").hide();

		// get industry types
		var getIndustryTypesUrl = '/industryTypes';
		var successMsg = 'Success';
		callService.callGetService(getIndustryTypesUrl, successMsg, userRole).then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
				$scope.industryTypeList = response.data;
			}
			else{
				$scope.industryTypeList = [];
			}
		}).catch (function (error){
			console.log(error);
			$scope.industryTypeList = [];
			alert(error.data);	
		});

		// get industry types
		var getFunctionalAreasUrl = '/functionalAreas';
		var successMsg = 'Success';
		callService.callGetService(getFunctionalAreasUrl, successMsg, userRole).then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
				$scope.functionalAreaList = response.data;
			}
			else{
				$scope.functionalAreaList = [];
			}
		}).catch (function (error){
			console.log(error);
			alert(error.data);	
			$scope.functionalAreaList = [];
		});

	}else {
		$location.path('/');
	}

	$scope.uploadJobDesFile = function(){
     var file = $scope.jobDesFile;

     console.log('file is ' );
     console.dir(file);

		 if (file == '' || file == undefined) {
		 	alert("Please select a File");
		}else {
			// show loader
			$rootScope.showLoader();
			var uploadUrl = window.__env.apiUrl+"/jobs";
 		 	var successMsg = 'Job Details Posted Successfully';
			fileUploadService.uploadFileToUrl(file, uploadUrl, successMsg, 'recruiter', '/posted-jobs').then(function(response) {
				console.log(response);
				// hide loader
				$rootScope.hideLoader();
			});
		}
  };

	$scope.postJob = {};
	$scope.postJob.title = "";
	$scope.postJob.description = "";
	$scope.postJob.companyName = "";
	$scope.postJob.email = "";
	$scope.postJob.keyword = "";
	$scope.postJob.skills = "";
	$scope.postJob.jobRequirements = "";
	$scope.postJob.numberOfVacanies = "";
	$scope.postJob.industryType = "";
	$scope.postJob.functionalArea = "";
	$scope.postJob.country = "";
	$scope.postJob.city = "";
	$scope.postJob.share = "";

	var textFile = null,
  makeTextFile = function (text) {
    var data = new Blob([text], {type: 'text/plain'});

    // If we are replacing a previously generated file we need to
    // manually revoke the object URL to avoid memory leaks.
    if (textFile !== null) {
      window.URL.revokeObjectURL(textFile);
    }

    textFile = window.URL.createObjectURL(data);

		// var uploadUrl = "http://13.126.83.252:9060/jobs";
		// var successMsg = 'Job Details Posted Successfully';
		// fileUpload.uploadFileToUrl(textFile, uploadUrl, successMsg);

    return textFile;
  };



	$scope.postJobFn = function() {
		console.log($scope.postJob);
		if ($scope.postJob.title && $scope.postJob.description && $scope.postJob.companyName && $scope.postJob.email &&
				$scope.postJob.keyword && $scope.postJob.skills && $scope.postJob.jobRequirements && $scope.postJob.numberOfVacanies &&
				$scope.postJob.industryType && $scope.postJob.functionalArea && $scope.postJob.country && $scope.postJob.city ) {

			makeTextFile($scope.postJob);
			var fileNameUp = returnData.firstName + new Date().getTime() + '.txt';
			console.log(fileNameUp);
			// var home = System.getProperty("user.home");
			var anchor = angular.element('<a/>');
			// anchor.attr({
			// 	href: 'data:attachment/csv;charset=utf-8,' + encodeURI($scope.postJob.title),
      //   target: '_blank',
      //   download: fileNameUp
     // 	})[0].click();
			// var uploadUrl = "http://13.126.83.252:9060/jobs";
			// var successMsg = 'Job Details Posted Successfully';
			// fileUpload.uploadFileToUrl("C:/Users/Pradeep/Downloads/" + fileNameUp, uploadUrl, successMsg);

			var formData = new FormData();
			var blob = new Blob([$scope.postJob.title], {type: 'plain/text'});
			formData.append('file', blob, "readme.txt");

			var xhr = new XMLHttpRequest();
	    xhr.open("POST", window.__env.apiUrl+"/jobs", true);
	    xhr.setRequestHeader("Content-type", "multipart/form-data; boundary=----WebKitFormBoundarykTbyItDjjYH5NAZB");
	    xhr.onreadystatechange = function ()
	    {
	        if (xhr.readyState == 4 && xhr.status == 200)
	            alert("File uploaded!");
	    }
	    xhr.send(formData);
		}else {
			alert('Please enter All Fields');
		}
	}

});
