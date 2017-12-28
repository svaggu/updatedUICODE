app.controller('employerDashboardController', function($scope, $location, $rootScope, $http, callService) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData, returnData;
	var user = localStorage.getItem('isCheckUser');
	var userRole = localStorage.getItem('userRole');

	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employer-home');
	}else if (userRole == 'recruiter' || userRole == 'recruiterAdmin') {
		accessData = angular.fromJson(window.localStorage['userObj']);
		returnData = angular.fromJson(window.localStorage['userDetailsObj']);

		$(".employer_dashboard").addClass("active");
		$(".posted_jobs").removeClass("active");
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

		// show loader
		$rootScope.showLoader();

		// to check the number of posted jobs
		var getRecPostedJobsServiceUrl = '/jobs/byRecruiter';
		var successMsg = 'Success';
		callService.callGetService(getRecPostedJobsServiceUrl, successMsg, userRole).then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
				$rootScope.getJobsByPostedUser = [];
				$rootScope.getApplicants = [];
				$rootScope.getActiveJobs = [];
				$rootScope.getNoOfApplicants;
				// hide loader
				$rootScope.hideLoader();
				var len;
				response.data.forEach(function(element) {
					if (element.jobDetails.hasOwnProperty('parsedJson')) {
						$rootScope.getJobsByPostedUser.push(element.jobDetails.parsedJson.JobData);
						if (element.jobProfiles.length > 0) {
							len = element.jobProfiles.length;
							$rootScope.getApplicants.push(element.jobProfiles[len - 1].applicantsCount);
						}
						if (element.jobDetails.status == 'active') {
							$rootScope.getActiveJobs.push(element);
						}
						// console.log($rootScope.getNoOfApplicants);
					}
					// $scope.noOfJobsPosted = $rootScope.getJobsByPostedUser.length;
				})
				if ($rootScope.getJobsByPostedUser.length > 0) {
					$scope.noOfJobsPosted = $rootScope.getJobsByPostedUser.length;
					$rootScope.getNoOfApplicants = 0;
					$rootScope.getApplicants.forEach(function(element) {
						$rootScope.getNoOfApplicants = $rootScope.getNoOfApplicants + element;
					})
					// assign number of active jobs
					$rootScope.getActiveNo = $rootScope.getActiveJobs.length;
				}else {
					$scope.noOfJobsPosted = '00';
					$rootScope.getNoOfApplicants = '00';
					$rootScope.getActiveNo = '00';
				}
				console.log($scope.noOfJobsPosted);
				console.log($rootScope.getNoOfApplicants);
				// console.log($rootScope.getJobsByPostedUser);
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
	}else {
		$location.path('/');
	}
});
