app.controller('postedJobListController', function($scope, $location) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData, returnData;
	var user = localStorage.getItem('isCheckUser');
	var userRole = localStorage.getItem('userRole');

	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employer-home');
	}else if (userRole == 'recruiter' || userRole == 'recruiterAdmin') {
		accessData = angular.fromJson(window.localStorage['userObj']);
		returnData = angular.fromJson(window.localStorage['userDetailsObj']);
	}else {
		$location.path('/');
	}
});
