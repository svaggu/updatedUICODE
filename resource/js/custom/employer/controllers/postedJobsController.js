app.controller('postedJobsController', function($scope, $location, $rootScope, $http, callService,$uibModal, $log, $document) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData, returnData;
	var user = localStorage.getItem('isCheckUser');
	var userRole = localStorage.getItem('userRole');

	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employer-home');
	}else if (userRole == 'recruiter' || userRole == 'recruiterAdmin') {
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

		$scope.showList = false;
		$scope.showEmptyMsg = true;

		// show loader
		$rootScope.showLoader();

		// to get all posted jobs
		var getRecPostedJobsServiceUrl = '/jobs/byRecruiter';
		var successMsg = 'Success';
		callService.callGetService(getRecPostedJobsServiceUrl, successMsg, userRole).then(function(response) {
			console.log(response);
			$scope.srt = function(desc,key) {
				console.log(key);
				return function(a,b){
				return desc ? ~~(key ? a[key]<b[key] : a < b) 
							: ~~(key ? a[key] > b[key] : a > b);
				};
			}
			response.data.sort($scope.srt(null,'jobDetails.timestamp'));
			if (response.status >= 200 || response.status < 300) {
				$rootScope.getJobsByPostedUser = [];
				$rootScope.getApplicants = [];
				$rootScope.getActiveJobs = [];
				$rootScope.getHoldJobs = [];
				$rootScope.getClosedJobs = [];
				$rootScope.getInactiveJobs = [];
				$rootScope.getNoOfApplicants;
				// hide loader
				$rootScope.hideLoader();
				response.data.forEach(function(element) {
					if (element.jobDetails.hasOwnProperty('updateParsedJson')) {
						// console.log(element.updateParsedJson.JobData.JobProfile[0]);
						// $rootScope.getJobsByPostedUser.push(element.jobDetails.updateParsedJson.JobData);
						$rootScope.getJobsByPostedUser.push(element);
						$scope.showList = true;
						$scope.showEmptyMsg = false;
					} else {
						if (element.jobDetails.hasOwnProperty('parsedJson')) {
							// console.log(element.parsedJson.JobData.JobProfile[0]);
							// $rootScope.getJobsByPostedUser.push(element.jobDetails.parsedJson.JobData);
							$rootScope.getJobsByPostedUser.push(element);
							$scope.showList = true;
							$scope.showEmptyMsg = false;
						}
					}

					// for job status
					$scope.statusAllArr = [];
					$scope.statusActiveJobArr = [];
					$scope.statusInactiveArr = [];
					$scope.statusHoldArr = [];
					$scope.statusClosedArr = [];

					// posted jobs status
					$rootScope.getJobsByPostedUser.forEach(function(element) {
						$scope.statusAllArr.push(element.jobDetails.status);
					}, this);

					if (element.jobDetails.status == 'active') {
						$rootScope.getActiveJobs.push(element);
						console.log($rootScope.getActiveJobs);
						// posted jobs status
						$rootScope.getActiveJobs.forEach(function(element) {
							$scope.statusActiveJobArr.push(element.jobDetails.status);
						}, this);
					} else if (element.jobDetails.status == 'hold') {
						$rootScope.getHoldJobs.push(element);
						// posted jobs status
						$rootScope.getHoldJobs.forEach(function(element) {
							$scope.statusHoldArr.push(element.jobDetails.status);
						}, this);
					} else if (element.jobDetails.status == 'closed') {
						$rootScope.getClosedJobs.push(element);
						// posted jobs status
						$rootScope.getClosedJobs.forEach(function(element) {
							$scope.statusClosedArr.push(element.jobDetails.status);
						}, this);
					} else if (element.jobDetails.status == 'inactive') {
						$rootScope.getInactiveJobs.push(element);
						// posted jobs status
						$rootScope.getInactiveJobs.forEach(function(element) {
							$scope.statusInactiveArr.push(element.jobDetails.status);
						}, this);
					} else {

					}

					// assign number of active, hold, closed, inactive jobs
					$rootScope.getActiveNo = $rootScope.getActiveJobs.length;
					$rootScope.getHoldNo = $rootScope.getHoldJobs.length;
					$rootScope.getClosedNo = $rootScope.getClosedJobs.length;
					$rootScope.getInactiveNo = $rootScope.getInactiveJobs.length;

					// // array to show the applicant count for a signle job
					$scope.noOfSingleJobApplicants = [];
					response.data.forEach(function (element, i) {
						if (element.jobProfiles.length > 0) {
							$scope.noOfSingleJobApplicants.push(element.jobProfiles[element.jobProfiles.length - 1].applicantsCount);
						}else {
							$scope.noOfSingleJobApplicants.push('0');
						}
					})
					// console.log($scope.noOfSingleJobApplicants);
				})
				console.log($rootScope.getJobsByPostedUser);
			}
			else{
				$scope.showList = false;
				$scope.showEmptyMsg = true;
				// hide loader
				$rootScope.hideLoader();
			}
		}).catch (function (error){
			console.log(error);
			$scope.showList = false;
			$scope.showEmptyMsg = true;
			// hide loader
			$rootScope.hideLoader();
		});

		// go to edit posted jobs
		$scope.gotoEditPostedJob = function(items) {
			// console.log(items);
			localStorage.setItem('setJobIdToEdit', items.jobDetails.uuid);
			$rootScope.editJobDeatils = items;
			// console.log($rootScope.editJobDeatils);
			$location.path('/edit-posted-job');
		}
	}else {
		$location.path('/');
	}

	// goto Edit Page With Note
	$scope.gotoEditPageWithNote = function (items) {
		// alert("notes");
		$rootScope.focusNotesField = "true";
		$scope.gotoEditPostedJob(items);
	}

	// go to signle job page
	$scope.gotoJobDetail = function (items) {
		// console.log(items);
		$rootScope.pageToTop();
		$rootScope.singleJobDetails = items.jobDetails;
		localStorage.setItem('setJobIdToEdit', items.jobDetails.uuid);
		$location.path('/single-job-status');
	}

	// change job to hold or active or inactive or closed
	$scope.changeJobStatus = function (items, i, fromArrType,status) {
		console.log(items);
        
		var statusToSend;
		if (fromArrType == 'fromAll') {
            $scope.statusAllArr[i]=status;
			statusToSend = $scope.statusAllArr[i];
		} else if (fromArrType == 'fromActive') {
            $scope.statusActiveJobArr[i]=status;
			statusToSend = $scope.statusActiveJobArr[i];
		} else if (fromArrType == 'fromHold') {
            $scope.statusHoldArr[i]=status;
			statusToSend = $scope.statusHoldArr[i];
		} else if (fromArrType == 'fromClosed') {
            $scope.statusClosedArr[i]=status;
			statusToSend = $scope.statusClosedArr[i];
		} else {

		}

		// show loader
		$rootScope.showLoader();
		
		var body = {
			"uuid": items.jobDetails.uuid, // jobUuid
			"status" : statusToSend
		};
		// console.log(body);
		var changeJobStatusServiceUrl = '/jobs/status';
		var successMsg = 'Success';
		callService.callPutService(body, changeJobStatusServiceUrl, successMsg, userRole).then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
				alert("Status Changed Successfully");
				$rootScope.pageToTop();
				window.location.reload();
				// hide loader
				$rootScope.hideLoader();
			}
			else{
				// hide loader
				$rootScope.hideLoader();
			}
		}).catch (function (error){
			console.log(error);
			// hide loader
			$rootScope.hideLoader();
		});
	}

	// goto Applicants List
	$scope.gotoApplicantsList = function (items, noOfSingleJobApplicants) {
		// console.log(items);
		if (noOfSingleJobApplicants > 0) {
			$rootScope.toApplicantsList = items;
			$location.path('/applicants_list');
		}else {
			alert("No applicants applied for this Job");
		}
	}
});

