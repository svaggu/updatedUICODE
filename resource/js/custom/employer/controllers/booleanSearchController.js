app.controller('booleanSearchController', function($scope, $location, $rootScope, $http, callService) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData, returnData;
	var user = localStorage.getItem('isCheckUser');
	var userRole = localStorage.getItem('userRole');

	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employer-home');
	}else if (userRole == 'recruiter' || userRole == 'recruiterAdmin') {
		accessData = angular.fromJson(window.localStorage['userObj']);
		returnData = angular.fromJson(window.localStorage['userDetailsObj']);

		$(".boolean_search").addClass("active");
		$(".posted_jobs").removeClass("active");
		$(".postajob").removeClass("active");
		$(".employer_dashboard").removeClass("active");
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

		// get saved search results
		var getSavedSearchService = '/searchKeywords';
		var successMsg = 'Success';
		callService.callGetService(getSavedSearchService, successMsg, userRole).then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
				$scope.savedSearchResults = response.data;
				// by default, set no to saved search 
				$scope.saveSearchExists = 'no';
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

	// save searched text
	$scope.saveSearchedText = function (keyword) {
		var saveSearchService = '/searchKeywords';
		var successMsg = 'Success';
		var body = {
			"keyword" : keyword
		};
		callService.callPostService(body, saveSearchService, successMsg, userRole).then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
				
			}
			else{
				// alert("Error in retrieving Jobs");
			}
		}).catch (function (error){
			console.log(error);
			// alert("Server error in retrieving Jobs");
		});
	}

	// search resumes based on skills
	$scope.getResumesBySearch = function () {
		if ($scope.searchSkill) {
			// show loader
			$rootScope.showLoader();

			var body = {
				"search": $scope.searchSkill
			}

			var searchProfileServiceUrl = '/resumes/search';
			var successMsg = 'Success';
			callService.callPostService(body, searchProfileServiceUrl, successMsg, userRole).then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					$scope.searchedResumesList = response.data;

					// check whether search keyword exists
					$scope.savedSearchResults.forEach(function(element) {
						if (element.keyword == $scope.searchSkill) {
							$scope.saveSearchExists = 'yes';
						}
					}, this);
					// save the search results, if they not exists
					if ( $scope.saveSearchExists != 'yes' ) {
						// console.log($rootScope.setSearchKeyword);
						$scope.saveSearchedText($scope.searchSkill);
					}
					// hide loader
					$rootScope.hideLoader();
					// by default, set no to saved search 
					$scope.saveSearchExists = 'no';
					$rootScope.setSearchKeyword = undefined;
				}
				else{
					alert("No Results Found");
					// hide loader
					$rootScope.hideLoader();
					// by default, set no to saved search 
					$scope.saveSearchExists = 'no';
				}
			}).catch (function (error){
				console.log(error);
				alert("No Results Found");
				// hide loader
				$rootScope.hideLoader();
				// by default, set no to saved search 
				$scope.saveSearchExists = 'no';
			});
		}else {
			alert("Please enter any text");
		}
	}

	// if, redirected from saved search, then apply keyword and get result
	if ($rootScope.setSearchKeyword) {
		$scope.searchSkill = $rootScope.setSearchKeyword;
		$scope.getResumesBySearch();
	}

	// add resume to favourite
	$scope.addToFavourite = function (items) {
		console.log(items);
	}

	// goto full resume details
	$scope.gotoGraphicalResume = function(items){
		$rootScope.toGraphicalResume = items;
		localStorage.setItem('setResumeId', items.uuid);
		$location.path('/view_resume');
	}
});
