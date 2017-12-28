admin.controller('jobAlertController', function($scope,$http,$location,$rootScope,callService) {
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
	  $('#jobBoard').addClass('active');
    $('#dashboard').removeClass('active');
    $('#organisation').removeClass('active');
	  $('#emailTemplate').removeClass('active');
	  $('#eCommerce').removeClass('active');
	  $('#settings').removeClass('active');
	  $('#industryType').removeClass('active');
      $('#functionalArea').removeClass('active');

	  // show notification bar
	  $(".navbar-custom-menu").css('display', 'block');

	  var days = "total";
		// to get job alert
		var getJobAlertService = window.__env.apiUrl+"/admin/jobAlerts?period=" + days + "&moreInfo=true";
		var successMsg = 'Success';
		callService.callingService(getJobAlertService, successMsg, 'admin').then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
				$scope.jobAlertsCount = response.data.alertsCount;
				$scope.jobAlertsList = response.data.details;
			}else {
				$scope.jobAlertsCount = 'No';
				$scope.jobAlertsList = [];
			}
		}).catch (function (error){
			console.log(error);
			$scope.jobAlertsCount = 'No';
			$scope.jobAlertsList = [];
		});
  }
});
