app.controller('savedSearchController', function($scope, $location, $rootScope, callService) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData, returnData;
	var user = localStorage.getItem('isCheckUser');
	var userRole = localStorage.getItem('userRole');

	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employer-home');
	}else if (userRole == 'recruiter' || userRole == 'recruiterAdmin') {
		accessData = angular.fromJson(window.localStorage['userObj']);
		returnData = angular.fromJson(window.localStorage['userDetailsObj']);

		$(".saved_search").addClass("active");
		$(".posted_jobs").removeClass("active");
		$(".postajob").removeClass("active");
		$(".boolean_search").removeClass("active");
		$(".my_favorites").removeClass("active");
		$(".employer_dashboard").removeClass("active");

		$rootScope.userobj = accessData;
		$rootScope.returnData = returnData;
		$("#employeeheader").hide();
		$("#signoutheader").show();
		$("#homeheader").hide();
		$("#employerheader").show();
		$("#signinheader").hide();
		$("#footersection").hide();
		$(".hideclass").hide();

		$scope.savedSearchResults = [];

		// get saved search results
		var getSavedSearchService = '/searchKeywords';
		var successMsg = 'Success';
		callService.callGetService(getSavedSearchService, successMsg, userRole).then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
				$scope.savedSearchResults = response.data;
			}
			else{
				
			}
		}).catch (function (error){
			console.log(error);
			alert(error.data);
		});

	}else {
		$location.path('/');
	}

	// goto boolean search with the selected keyword (previous search)
	$scope.gotoBooleanSearch = function (items) {
		$rootScope.setSearchKeyword = items.keyword;
		$rootScope.pageToTop();
		$location.path('/boolean-search');
	}
});
