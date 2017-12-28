admin.controller('emailTemplatesController', function($scope,$http,$location,$rootScope, callService) {
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
	  $('#emailTemplate').addClass('active');
    $('#jobBoard').removeClass('active');
    $('#dashboard').removeClass('active');
    $('#organisation').removeClass('active');
	  $('#eCommerce').removeClass('active');
	  $('#settings').removeClass('active');
	  $('#industryType').removeClass('active');
      $('#functionalArea').removeClass('active');

	  // show notification bar
	  $(".navbar-custom-menu").css('display', 'block');

		// count number of jobs & job applicants
		var emailTemplateService = window.__env.apiUrl+"/emailTemplates";
		var successMsg = 'Success';
		callService.callingService(emailTemplateService, successMsg, 'admin').then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
				$scope.templatesList = response.data;
			}else {
				$scope.templatesList = [];
			}
		}).catch (function (error){
			console.log(error);
			$scope.templatesList = [];
		});
  }

	// go to edit email template
	$scope.gotoEditEmailTemplate = function (items) {
		$rootScope.emailTemplateToEdit = items;
		$location.path('/edit-email-templates');
	}
});
