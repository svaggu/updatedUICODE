app.controller('editPostedJobController', function($scope, $location, $rootScope, $http, callService) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData, returnData;
	var user = localStorage.getItem('isCheckUser');
	var userRole = localStorage.getItem('userRole');

	var lsEditJobDetails = localStorage.getItem('setJobIdToEdit');

	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employer-home');
	}else if (userRole == 'admin' || userRole == 'jobseeker') {
		$location.path('/')
	}else if (lsEditJobDetails == undefined || lsEditJobDetails == "" || lsEditJobDetails == "null") {
		$location.path('/posted-jobs');
	}else if (userRole == 'recruiter' || userRole == 'recruiterAdmin') {
		// show loader
		$rootScope.showLoader();

		if ($rootScope.focusNotesField && $rootScope.focusNotesField == 'true') {
			$("#lessfields").show();
      		$("#morefields").hide();
        	$("#postajob").toggle();
			var notesHL = document.getElementById('notesField');
			notesHL.focus();
		}

		accessData = angular.fromJson(window.localStorage['userObj']);
		returnData = angular.fromJson(window.localStorage['userDetailsObj']);

		$(".posted_jobs").addClass("active");
		$(".employer_dashboard").removeClass("active");
		$(".postajob").removeClass("active");
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

		// get a single job detail
		var getSingleJobServiceUrl = '/jobs/' + lsEditJobDetails;
		var successMsg = 'Success';
		callService.callGetService(getSingleJobServiceUrl, successMsg, userRole).then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
				
				$rootScope.editJobDeatils = response.data;
				console.log($rootScope.editJobDeatils);

				$scope.jobObj = $rootScope.editJobDeatils;

				if (!($scope.jobObj.hasOwnProperty('updateParsedJson'))) {
					$scope.jobObj.updateParsedJson = $scope.jobObj.parsedJson;
					console.log($scope.jobObj.updateParsedJson);
				}
				$scope.editJobs = {};
				$scope.editJobs.uuid = $scope.jobObj.uuid;
				$scope.editJobs.title = $scope.jobObj.updateParsedJson.JobData.JobProfile[0];
				$scope.editJobs.description = $scope.jobObj.updateParsedJson.JobData.JobDescription[0];
				$scope.editJobs.companyName = $scope.jobObj.updateParsedJson.JobData.Organization[0];
				$scope.editJobs.email = $scope.jobObj.updateParsedJson.JobData.ContactEmail[0];
				$scope.editJobs.numberOfVacanies = $scope.jobObj.updateParsedJson.JobData.NoOfOpenings[0];
				$scope.editJobs.keyword = '';

				$scope.editJobs.skillsArr = $scope.jobObj.updateParsedJson.JobData.Skills[0];
				$scope.editJobs.jobType = $scope.jobObj.updateParsedJson.JobData.JobType[0];
				$scope.editJobs.location = $scope.jobObj.updateParsedJson.JobData.Location[0];
				$scope.editJobs.salaryOffered = $scope.jobObj.updateParsedJson.JobData.SalaryOffered[0];
				$scope.editJobs.qualifications = $scope.jobObj.updateParsedJson.JobData.Qualifications[0];

				// status
				$scope.jobStatus = $scope.jobObj.status;

				if ($scope.jobObj.updateParsedJson.JobData.hasOwnProperty('Qualifications')) {
					$scope.editJobs.jobRequirements = $scope.jobObj.updateParsedJson.JobData.Qualifications[0];
				}
				if ($scope.jobObj.updateParsedJson.JobData.hasOwnProperty('IndustryType')) {
					$scope.editJobs.industryType = $scope.jobObj.updateParsedJson.JobData.IndustryTypeName;
				}
				if ($scope.jobObj.updateParsedJson.JobData.hasOwnProperty('FunctionalArea')) {
					$scope.editJobs.functionalArea = $scope.jobObj.updateParsedJson.JobData.FunctionalArea[0];
				}
				if ($scope.jobObj.updateParsedJson.JobData.hasOwnProperty('HotCool')) {
					$scope.editJobs.hotCool = $scope.jobObj.updateParsedJson.JobData.HotCool[0];
				}
				if ($scope.jobObj.updateParsedJson.JobData.hasOwnProperty('Notes')) {
					$scope.editJobs.notes = $scope.jobObj.updateParsedJson.JobData.Notes;
				}

				// if exists - functional area and industry type
				if ($scope.jobObj.updateParsedJson.JobData.hasOwnProperty('FunctionalAreaName')) {
					$scope.editJobs.functionalAreaName = $scope.jobObj.updateParsedJson.JobData.FunctionalAreaName;
					$scope.editJobs.functionalArea = $scope.jobObj.updateParsedJson.JobData.FunctionalArea;
				}
				
				$scope.editJobs.country = '';
				$scope.editJobs.state = '';
				$scope.editJobs.city = '';

				// hide loader
				$rootScope.hideLoader();
			}
			else{
				// alert("Error in retrieving Jobs");
				// hide loader
				$rootScope.hideLoader();
			}
		}).catch (function (error){
			console.log(error);
			alert(error.data);
			// hide loader
			$rootScope.hideLoader();
		});

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

	// change job to hold or active or inactive or closed
	$scope.changeJobStatus = function (uuid) {
		if ($scope.jobStatus) {
			console.log(uuid);
			// show loader
			$rootScope.showLoader();

			var body = {
				"uuid": uuid, // jobUuid
				"status" : $scope.jobStatus
			};
			console.log(body);
			var changeJobStatusServiceUrl = '/jobs/status';
			var successMsg = 'Success';
			callService.callPutService(body, changeJobStatusServiceUrl, successMsg, userRole).then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					// alert("Status Changed Successfully");
					// hide loader
					$rootScope.hideLoader();
					$location.path('/posted-jobs')
				}
				else{
					// hide loader
					$rootScope.hideLoader();
					alert("Error in changing Job Status");
				}
			}).catch (function (error){
				console.log(error);
				// hide loader
				$rootScope.hideLoader();
				alert("Error in changing Job Status");
			});
		}else {
			alert('Please select any Status');
		}
	}

	// edit job details
	$scope.editJob = function () {

		if ($scope.editJobs.title && $scope.editJobs.companyName && $scope.editJobs.email) {
			// show loader
			$rootScope.showLoader();

			$scope.changeJobStatus($scope.editJobs.uuid);

			var body = {
				"JobProfile": [ $scope.editJobs.title ],
				"Organization": [ $scope.editJobs.companyName ],
				"ContactEmail": [ $scope.editJobs.email ],
				"JobDescription":[ $scope.editJobs.description ],
				"NoOfOpenings":[ $scope.editJobs.numberOfVacanies ],
				"IndustryType": $scope.editJobs.industryType,
				"FunctionalArea": $scope.editJobs.functionalArea,
				"Skills": [{"Skill": $scope.editJobs.skillsArr}],
				"JobType" : [$scope.editJobs.jobType],
				"SalaryOffered": [$scope.editJobs.salaryOffered],
				"Qualifications": [$scope.editJobs.qualifications],
				"HotCool": [$scope.editJobs.hotCool],
				"Notes": $scope.editJobs.notes
			};

			var editJobServiceUrl = '/jobs/editJob/' + $scope.editJobs.uuid;
			var successMsg = 'Success';
			callService.callPutService(body, editJobServiceUrl, successMsg, userRole).then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					alert("Job details edited Successfully");
					// hide loader
					$rootScope.hideLoader();

					$location.path('/posted-jobs');
				}
				else{
					// hide loader
					$rootScope.hideLoader();
				}
			}).catch (function (error){
				console.log(error);
				alert(error.data);
				// hide loader
				$rootScope.hideLoader();
			});
		} else {
			alert("Please enter all mandatory(*) Fields");
		}
	}
});
