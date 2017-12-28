app.controller('singleJobDetailController', function($scope, $location, $rootScope, $http, callService) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData, returnData;
	var user = localStorage.getItem('isCheckUser');
  	var userRole = localStorage.getItem('userRole');
	var lsEditJobDetails = localStorage.getItem('setJobIdToEdit');

	$rootScope.checkUser = true;

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

	if(user == "" || user == "empty" || user == undefined){
		// $location.path('/employee-home');
	}else if (lsEditJobDetails == undefined || lsEditJobDetails == "" || lsEditJobDetails == "null") {
		$location.path('/');
	}else {
    accessData = angular.fromJson(window.localStorage['userObj']);
  	returnData = angular.fromJson(window.localStorage['userDetailsObj']);

		// hide job status button
		$scope.ifNotRec = false;

		// get resumes
		$scope.getResumeDetails = function() {

			if (user == "" || user == "empty" || user == undefined) {

			}else {
				// show loader
				$rootScope.showLoader();

				$scope.coverLetterArr = [];
				$scope.profileDetails = [];

				var coverLetterArr = [];
				var profileDetails = [];

				var getResumeServiceUrl = '/resumes';
				var successMsg = 'Success';
				callService.callGetService(getResumeServiceUrl, successMsg, userRole).then(function(response) {
					console.log(response);
					if (response.status >= 200 || response.status < 300) {
						response.data.resumes.forEach(function(element){
							coverLetterArr.push(element.coverletter);
							profileDetails.push(element);
						})
						$scope.coverLetterArr = coverLetterArr;
						$scope.profileDetails = profileDetails;
						// console.log($scope.coverLetterArr);
						$scope.resumesList = response.data;
						// $scope.defaultResume = data.resumes[0];
						// console.log(data.resumes[0]);

						// hide loader
						$rootScope.hideLoader();
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
		}

		// get cover letters
		$scope.getCoverLetter = function () {
			var getCoverLetterService = '/coverLetters';
			var successMsg = 'Success';
			callService.callGetService(getCoverLetterService, successMsg, userRole).then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					$scope.coverLetterArr2 = response.data;
				}
				else{
					$scope.coverLetterArr2 = [];
				}
			}).catch (function (error){
				console.log(error);
				alert(error.data.reason);
				$scope.coverLetterArr2 = [];
			});
		}

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
		}

		// if jobSeeker -- show save button and show respective header
		console.log(userRole);
		if (userRole == 'jobseeker') {
			console.log('entered');
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

			// to get resumes List
			$scope.getResumeDetails();
			// get cover letters
			$scope.getCoverLetter();
			// hide job status button
			$scope.ifNotRec = false;
		}
  }

	// apply job
	$scope.applyJob = function() {

		if (user == "" || user == "empty" || user == undefined) {
			// $location.path('/employee-home');
			// window.location.reload();
			$("#myBtn").click();
			$("#employer_signin_tab").css('display', 'none');
		}else if (!$scope.resumeId) {
			alert('Please select Resume');
		} else if (user == 'empty' || user == undefined || userRole == 'empty' || userRole == undefined) {
			$location.path('/employee-home');
		}else {

			// show loader
			$rootScope.showLoader();

			var body = {
				"job": $rootScope.singleJobDetails.uuid,
				"status": "applied",
				"resume": $scope.resumeId
			};

			var applyJobServiceUrl = '/profiles/jobs';
			var successMsg = 'Success';
			callService.callPostService(body, applyJobServiceUrl, successMsg, userRole).then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					alert('Job Applied Successfully');
					$rootScope.myJobsTabClass = 'appliedJobs';
					// hide loader
					$rootScope.hideLoader();

					$location.path('/my-jobs');
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
	}

	// change job to hold or active or inactive or closed
	$scope.changeJobStatus = function (uuid) {
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
});
