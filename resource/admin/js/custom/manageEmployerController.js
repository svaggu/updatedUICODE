admin.controller('manageEmployerController', function($scope,$http,$location,$rootScope,callService) {
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

		// count number and list of employers - recruiters
		var days = localStorage.getItem('daysBtn');

		if (days) {

		}else {
			days = 7;
		}
		// var employerService = window.__env.apiUrl+"/admin/recruiters?period=" + days + "&moreInfo=true";
		var employerService = window.__env.apiUrl+"/admin/recruiters?period=total&moreInfo=true";
		var successMsg = 'Success';
		callService.callingService(employerService, successMsg, 'admin').then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
				$scope.recruitersCount = response.data.profilesCount;
				$scope.recruitersList = response.data.details;
			}else {
				$scope.recruitersCount = 'No';
				$scope.recruitersList = [];
			}
		}).catch (function (error){
			console.log(error);
			$scope.recruitersCount = 'No';
			$scope.recruitersList = [];
		});
  }
});
