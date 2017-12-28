app.controller('singleJobDetailStatusController', function($scope, $location, $rootScope, $http, callService) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData, returnData;
	var user = localStorage.getItem('isCheckUser');
  var userRole = localStorage.getItem('userRole');
	var lsEditJobDetails = localStorage.getItem('setJobIdToEdit');
	if(user == "" || user == "empty" || user == undefined){
		// $location.path('/employee-home');
	}else if (lsEditJobDetails == undefined || lsEditJobDetails == "" || lsEditJobDetails == "null") {
		$location.path('/posted-jobs');
	}else {
    accessData = angular.fromJson(window.localStorage['userObj']);
  	returnData = angular.fromJson(window.localStorage['userDetailsObj']);

		// hide job status button
		$scope.ifNotRec = false;

		// get a single job detail
		var getSingleJobServiceUrl = '/jobs/' + lsEditJobDetails;
		var successMsg = 'Success';
		callService.callGetService(getSingleJobServiceUrl, successMsg, userRole).then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
				
				$rootScope.singleJobDetails = response.data;
				console.log($rootScope.singleJobDetails);

				$scope.uuid = $rootScope.singleJobDetails.uuid;
      	if ($rootScope.singleJobDetails.hasOwnProperty('updateParsedJson')) {
      				$scope.jobDetails = $rootScope.singleJobDetails.updateParsedJson.JobData;
				} else {
					$scope.jobDetails = $rootScope.singleJobDetails.parsedJson.JobData;
				}

				// hide loader
				$rootScope.hideLoader();
			}
			else{
				// alert("Error in retrieving Jobs");
				// hide loader
				$rootScope.hideLoader();
			}
		}).catch (function (error){
			console.log(error);
			alert(error.data);
			// hide loader
			$rootScope.hideLoader();
		});

    // if recruiter -- hide save button and show respective header
		if (userRole == 'recruiter'  || userRole == 'recruiterAdmin') {
			// disable apply now button
			$rootScope.checkUser = false;

			$(".employer_dashboard").removeClass("active");
			$(".posted_jobs").removeClass("active");
			$(".postajob").removeClass("active");
			$(".boolean_search").removeClass("active");
			$(".my_favorites").removeClass("active");
			$(".saved_search").removeClass("active");

			$("#signoutheader").css("right", "2%");
			$("#signoutheader").css("position", "absolute");

			$rootScope.userobj = accessData;
			$rootScope.returnData = returnData;
			$("#employeeheader").hide();
			$("#signoutheader").show();
			$("#homeheader").hide();
			$("#employerheader").show();
			$("#signinheader").hide();
			$("#footersection").hide();
			$(".hideclass").hide();

			// show job status button
			$scope.ifNotRec = true;
		}

		// if jobSeeker -- show save button and show respective header
		console.log(userRole);
		if (userRole == 'jobseeker') {
			$location.path('/single-job-detail');
			// enable apply now button
			$rootScope.checkUser = true;

			$(".emp_dashboard").removeClass("active");
			$(".myprofiles").removeClass("active");
			$(".myjobs").removeClass("active");
			$(".graphsume").removeClass("active");
			$(".detailed_resume").removeClass("active");
			$(".my_documents").removeClass("active");

			$rootScope.userobj = accessData;
			$rootScope.returnData = returnData;
			$("#employeeheader").show();
			$("#signoutheader").show();
			$("#homeheader").hide();
			$("#employerheader").hide();
			$("#signinheader").hide();
			$("#footersection").hide();
			$(".hideclass").hide();
			
			// hide job status button
			$scope.ifNotRec = false;
		}
  }

	// change job to hold or active or inactive or closed
	$scope.changeJobStatus = function (uuid) {
		if ($scope.jobStatus) {
			console.log(uuid);
			// show loader
			$rootScope.showLoader();

			var body = {
				"uuid": uuid, // jobUuid
				"status" : $scope.jobStatus
			};
			console.log(body);
			var changeJobStatusServiceUrl = '/jobs/status';
			var successMsg = 'Success';
			callService.callPutService(body, changeJobStatusServiceUrl, successMsg, userRole).then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					alert("Status Changed Successfully");
					// hide loader
					$rootScope.hideLoader();
					$location.path('/posted-jobs')
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
			alert('Please select any Status');
		}
	}
});
