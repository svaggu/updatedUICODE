admin.controller('manageInvoicesController', function($scope,$http,$location,$rootScope) {
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
	  $('#eCommerce').addClass('active');
    $('#jobBoard').removeClass('active');
    $('#dashboard').removeClass('active');
    $('#organisation').removeClass('active');
    $('#emailTemplate').removeClass('active');
	  $('#settings').removeClass('active');
		$('#industryType').removeClass('active');
    $('#functionalArea').removeClass('active');

	  // show notification bar
	  $(".navbar-custom-menu").css('display', 'block');
  }
});
