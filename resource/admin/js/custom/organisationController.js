admin.controller('organisationController', function($scope,$http,$location,$rootScope, callService) {
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
	  $('#organisation').addClass('active');
	  $('#dashboard').removeClass('active');
	  $('#jobBoard').removeClass('active');
	  $('#emailTemplate').removeClass('active');
	  $('#eCommerce').removeClass('active');
	  $('#settings').removeClass('active');
		$('#industryType').removeClass('active');
    $('#functionalArea').removeClass('active');

	  // show notification bar
	  $(".navbar-custom-menu").css('display', 'block');
	}

	$scope.organisation = {};
	$scope.organisation.name = '';
	$scope.organisation.email = '';
	$scope.organisation.password = '';
	$scope.organisation.phoneNumber = '';
	$scope.organisation.companyName = '';
	$scope.organisation.address = '';
	$scope.organisation.cityName = '';
	$scope.organisation.state = '';
	$scope.organisation.country = '';
	$scope.organisation.zipCode = '';

  $scope.addOrganisation = function() {
    if (($scope.organisation.name == '' || $scope.organisation.name == undefined) ||
				($scope.organisation.email == '' || $scope.organisation.email == undefined) ||
				($scope.organisation.password == '' || $scope.organisation.password == undefined) ||
				($scope.organisation.phoneNumber == '' || $scope.organisation.phoneNumber == undefined) ||
				($scope.organisation.companyName == '' || $scope.organisation.companyName == undefined) ||
        ($scope.organisation.address == '' || $scope.organisation.address == undefined) ||
        ($scope.organisation.cityName == '' || $scope.organisation.cityName == undefined) ||
				($scope.organisation.state == '' || $scope.organisation.state == undefined) ||
				($scope.organisation.country == '' || $scope.organisation.country == undefined) ||
        ($scope.organisation.zipCode == '' || $scope.organisation.zipCode == undefined)) {
      alert('Please enter all Details');
			callService.callingPostService(body, addOrgServiceUrl, successMsg, 'admin').then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					$scope.organisation.name = '';
		      $scope.organisation.email = '';
		      $scope.organisation.password = '';
		      $scope.organisation.phoneNumber = '';
		      $scope.organisation.companyName = '';
		      $scope.organisation.address = '';
		      $scope.organisation.cityName = '';
					$scope.organisation.state = '';
					$scope.organisation.country = '';
		      $scope.organisation.zipCode = '';
				}else {
					alert("Please insert all details");
				}
			}).catch (function (error){
				console.log(error);
				alert('Server Error in creating Organisation \n Please try after sometime')
			});
    }else {
			var body = {
				"name": $scope.organisation.companyName,
				"admin": $scope.organisation.name,
				"password": $scope.organisation.password,
				"logo": "",
				"role":"recruiterAdmin",
				"status": "active",
				"description": "",
				"address":{
					"line1": $scope.organisation.address,
					"line2":"",
					"city": $scope.organisation.cityName,
					"state": $scope.organisation.state,
					"country": $scope.organisation.country,
					"zip": $scope.organisation.zipCode,
					"googleMapsUri":""
				},
				"internet":[{
					"name":"",
					"url":""
				}],
				"email":[{
					"name": $scope.organisation.name,
					"id": $scope.organisation.email
				}],
				"phone":[{
					"name": $scope.organisation.name,
					"number": $scope.organisation.phoneNumber
				}],
				"socialProfile":[{
					"name":"",
					"url":""
				}]
			};			

			var addOrgServiceUrl = window.__env.apiUrl+"/organizations";
			var successMsg = 'Success';

			callService.callingPostService(body, addOrgServiceUrl, successMsg, 'admin').then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					alert("Organisation Added Successfully");
					// window.location.reload();

					$location.path('/admin-dashboard');
					
					$scope.organisation.name = '';
		      $scope.organisation.email = '';
		      $scope.organisation.password = '';
		      $scope.organisation.phoneNumber = '';
		      $scope.organisation.companyName = '';
		      $scope.organisation.address = '';
		      $scope.organisation.cityName = '';
					$scope.organisation.state = '';
					$scope.organisation.country = '';
		      $scope.organisation.zipCode = '';
				}else {
					alert("Please insert all details");
				}
			}).catch (function (error){
				console.log(error);
				// alert('Server Error in creating Organisation \n Please try after sometime')
				alert(error.data.reason);
			});
    }
  }

});
