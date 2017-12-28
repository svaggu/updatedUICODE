app.controller('applicantsListController', function($scope, $location, $rootScope, callService) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData, returnData;
	var user = localStorage.getItem('isCheckUser');
	var userRole = localStorage.getItem('userRole');

	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employer-home');
	}else if (userRole == 'recruiter' || userRole == 'recruiterAdmin') {
		accessData = angular.fromJson(window.localStorage['userObj']);
		returnData = angular.fromJson(window.localStorage['userDetailsObj']);

    $(".posted_jobs").addClass("active");
		$(".employer_dashboard").removeClass("active");
		$(".postajob").removeClass("active");
		$(".boolean_search").removeClass("active");
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

    if ($rootScope.toApplicantsList) {
      console.log($rootScope.toApplicantsList);
			// applicants list
      $scope.applicantsList = [];
      $rootScope.toApplicantsList.jobProfiles.forEach(function (element, i) {
        if (element.hasOwnProperty('jobApplicantDetails')) {
          $scope.applicantsList.push(element);
        }
      })
    }else {
      $location.path('/posted-jobs');
    }
	}else {
		$location.path('/');
	}

  // add to favourite
  $scope.addToFavourite = function (items) {
    console.log(items);

    // show loader
		$rootScope.showLoader();

    var body = {
      "jobseeker" : items.jobApplicantDetails.uuid,
      "status": "favourite",
			"resumeUuid": items.resume.resumeUuid
    };
    var addToFavServiceUrl = '/favourites/recruiter';
		var successMsg = 'Success';
		callService.callPostService(body, addToFavServiceUrl, successMsg, userRole).then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
        alert("Added to Favourites Successfully");
        // hide loader
				$rootScope.hideLoader();
        $location.path('/my-favourite');
			}
			else{
        alert(response.data.reason);
        // hide loader
				$rootScope.hideLoader();
			}
		}).catch (function (error){
			console.log(error);
      alert(error.data.reason);
      // hide loader
      $rootScope.hideLoader();
		});
  }

	// goto full resume details
	$scope.gotoGraphicalResume = function(items){
		$rootScope.toGraphicalResume = items;
		localStorage.setItem('setResumeId', items.resume.resumeUuid);
		$location.path('/view_resume');
	}
});
