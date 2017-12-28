admin.controller('siteAdminController', function($scope,$http,$location,$rootScope) {
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
	  $('#settings').addClass('active');
    $('#dashboard').removeClass('active');
    $('#organisation').removeClass('active');
    $('#jobBoard').removeClass('active');
    $('#emailTemplate').removeClass('active');
    $('#eCommerce').removeClass('active');
		$('#industryType').removeClass('active');
    $('#functionalArea').removeClass('active');

	  // show notification bar
	  $(".navbar-custom-menu").css('display', 'block');

		$scope.returnData = returnData;
  }
});
