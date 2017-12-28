app.controller('myFavouriteController', function($scope, $location, $rootScope, callService) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData, returnData;
	var user = localStorage.getItem('isCheckUser');
	var userRole = localStorage.getItem('userRole');

	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employer-home');
	}else if (userRole == 'recruiter' || userRole == 'recruiterAdmin') {
		// show loader
		$rootScope.showLoader();

		accessData = angular.fromJson(window.localStorage['userObj']);
		returnData = angular.fromJson(window.localStorage['userDetailsObj']);

		$(".my_favorites").addClass("active");
		$(".posted_jobs").removeClass("active");
		$(".postajob").removeClass("active");
		$(".boolean_search").removeClass("active");
		$(".employer_dashboard").removeClass("active");
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

		// get favourites list
		var getFavServiceUrl = '/favourites/recruiter';
		var successMsg = 'Success';
		callService.callGetService(getFavServiceUrl, successMsg, userRole).then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
				// hide loader
				$rootScope.hideLoader();
				$scope.favList = response.data;
				// $scope.favList = [];
				// response.data.forEach(function (element) {
				// 	$scope.favList.push(element.jobApplicantDetails);
				// });
			}
			else{
				// hide loader
				$rootScope.hideLoader();
			}
		}).catch (function (error){
			console.log(error);
			// hide loader
			$rootScope.hideLoader();
		});
	}else {
		$location.path('/');
	}

	// remove favourite
	$scope.removeFromFavourite = function (items) {
    console.log(items);

		// show loader
		$rootScope.showLoader();

		var body = {
		"jobseeker" : items.uuid,
		"status": "non-favourite"
		};
		var addToFavServiceUrl = '/favourites/recruiter';
		var successMsg = 'Success';
		callService.callPutService(body, addToFavServiceUrl, successMsg, userRole).then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
				alert("Removed from Favourites Successfully");
				// hide loader
				$rootScope.hideLoader();
				window.location.reload();
			}
			else{
				// hide loader
				$rootScope.hideLoader();
			}
		}).catch (function (error){
			console.log(error);
			// hide loader
			$rootScope.hideLoader();
		});
  }

  // goto full resume details
	$scope.gotoGraphicalResume = function(items){
		$rootScope.toGraphicalResume = items;
		localStorage.setItem('setResumeId', items.resumeDetails.resumeUuid);
		$location.path('/view_resume');
	}
});
