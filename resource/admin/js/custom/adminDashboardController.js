admin.controller('adminDashboardController', function($scope,$http,$location,$rootScope,callService) {
	//$scope.message = 'Contact us! JK. This is just a demo.';

	var accessData, returnData;
	var user = localStorage.getItem('isCheckUser');
	if(user == "" || user == "empty" || user == undefined){
		$location.path('/');
	}else {
		accessData = angular.fromJson(window.localStorage['userObj']);
		returnData = angular.fromJson(window.localStorage['userDetailsObj']);
  	// show menu items
	  $("#login-sidebar-menu").css('display', 'none');
	  $("#sidebar-menu").css('display', 'block');

		// adding active class for active item in list
	  $('#dashboard').addClass('active');
	  $('#organisation').removeClass('active');
	  $('#jobBoard').removeClass('active');
	  $('#emailTemplate').removeClass('active');
	  $('#eCommerce').removeClass('active');
	  $('#settings').removeClass('active');
	  $('#industryType').removeClass('active');
      $('#functionalArea').removeClass('active');

	  // show notification bar
	  $(".navbar-custom-menu").css('display', 'block');

		$rootScope.userobj = accessData;
		$rootScope.returnData = returnData;

		$scope.getCount = function(days) {

			// store value of button in localStorage
			localStorage.setItem('daysBtn', days);

			if (days == 1) {
				$('#todayBtn').addClass('active');
				$('#sevenDaysBtn').removeClass('active');
			  $('#thirtyDaysBtn').removeClass('active');
				$('#totalDaysBtn').removeClass('active');
			}else if (days == 7) {
				$('#sevenDaysBtn').addClass('active');
				$('#todayBtn').removeClass('active');
			  $('#thirtyDaysBtn').removeClass('active');
				$('#totalDaysBtn').removeClass('active');
			}else if (days == 30) {
			  $('#thirtyDaysBtn').addClass('active');
				$('#todayBtn').removeClass('active');
				$('#sevenDaysBtn').removeClass('active');
				$('#totalDaysBtn').removeClass('active');
			}else if (days == 'total') {
				$('#totalDaysBtn').addClass('active');
				$('#thirtyDaysBtn').removeClass('active');
				$('#todayBtn').removeClass('active');
				$('#sevenDaysBtn').removeClass('active');
			}else {
				$('#sevenDaysBtn').addClass('active');
				$('#todayBtn').removeClass('active');
			  $('#thirtyDaysBtn').removeClass('active');
				$('#totalDaysBtn').removeClass('active');
			}

			// count number of jobs & job applicants
			var countJobsService = window.__env.apiUrl+"/admin/jobs?period=" + days + "&moreInfo=true";
			var successMsg = 'Success';
			callService.callingService(countJobsService, successMsg, 'admin').then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					$scope.jobsCount = response.data.jobsCount;
					$scope.jobApplicantsCount = 0;
					response.data.details.forEach(function(element) {
						$scope.jobApplicantsCount = $scope.jobApplicantsCount + element.jobApplicantsCount;
					}, this);
				}else {
					$scope.jobsCount = '00';
					$scope.jobApplicantsCount = '00';
				}
			}).catch (function (error){
				console.log(error);
				$scope.jobsCount = '00';
				$scope.jobApplicantsCount = '00';
			});

			// count recruiters - employers
			var countRecruitersService = window.__env.apiUrl+"/admin/recruiters?period=" + days + "&moreInfo=false";
			var successMsg2 = 'Success';
			callService.callingService(countRecruitersService, successMsg2, 'admin').then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					$scope.recruitersCount = response.data.profilesCount;
				}else {
					$scope.recruitersCount = '00';
				}
			}).catch (function (error){
				console.log(error);
				$scope.recruitersCount = '00';
			});

			// count jobSeeker
			var countJobSeekerService = window.__env.apiUrl+"/admin/jobSeekers?period=" + days + "&moreInfo=false";
			var successMsg3 = 'Success';
			callService.callingService(countJobSeekerService, successMsg3, 'admin').then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					$scope.jobSeekersCount = response.data.profilesCount;
				}else {
					$scope.jobSeekersCount = '00';
				}
			}).catch (function (error){
				console.log(error);
				$scope.jobSeekersCount = '00';
			});

			// count jobAlerts
			var jobAlertsService = window.__env.apiUrl+"/admin/jobAlerts?period=" + days + "&moreInfo=false";
			var successMsg5 = 'Success';
			callService.callingService(jobAlertsService, successMsg5, 'admin').then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					$scope.jobAlertsCount = response.data.alertsCount;
				}else {
					$scope.jobAlertsCount = '00';
				}
			}).catch (function (error){
				console.log(error);
				$scope.jobAlertsCount = '00';
			});
		}

		$scope.getCount('total');
	}

	// goto ManageJobs
	$scope.gotoManageJobs = function() {
		$location.path('/manage-jobs');
	}

	// goto employer list
	$scope.gotoEmployerList = function() {
		$location.path('/manage-employer');
	}

	// goto jobseeker list
	$scope.gotoJobSeekerList = function() {
		$location.path('/manage-jobseeker');
	}

	// goto JobAlerts list
	$scope.gotoJobAlerts = function() {
		$location.path('/job-alert');
	}

});
