app.controller('myJobsController', function($scope, $location, $rootScope, $http, callService) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData, returnData;
	var user = localStorage.getItem('isCheckUser');
	var userRole = localStorage.getItem('userRole');

	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employee-home');
	}else {
		// show loader
		$rootScope.showLoader();

		accessData = angular.fromJson(window.localStorage['userObj']);
		returnData = angular.fromJson(window.localStorage['userDetailsObj']);

		$(".myjobs").addClass("active");
		$(".myprofiles").removeClass("active");
		$(".emp_dashboard").removeClass("active");
		$(".graphsume").removeClass("active");
		$(".detailed_resume").removeClass("active");
		$(".my_documents").removeClass("active");

		$("#employeeheader").show();
		$("#signoutheader").show();
		$("#homeheader").hide();
		$("#employerheader").hide();
		$("#signinheader").hide();
		$("#footersection").hide();
		$(".hideclass").hide();

		$rootScope.userobj = accessData;
		$rootScope.returnData = returnData;

		// for making active tab in my jobs
		if ($rootScope.myJobsTabClass == 'savedJobs') {
			// for making menu item active
	    $("#savedJobsInMenu").addClass("active");
			
			$("#recommendedJobsInMenu").removeClass("active");
			$("#appliedJobsInMenu").removeClass("active");

			// for showing active tabs
			$("#savedJobsId").addClass("active");
			$("#searchJobId").removeClass("active");
			$("#recommendedJobsId").removeClass("active");
	    $("#appliedJobsId").removeClass("active");
		} else if ($rootScope.myJobsTabClass == 'appliedJobs') {
			// for making menu item active
			$("#appliedJobsInMenu").addClass("active");
			
			$("#recommendedJobsInMenu").removeClass("active");
	    $("#savedJobsInMenu").removeClass("active");

			// for showing active tabs
	    $("#appliedJobsId").addClass("active");
			$("#savedJobsId").removeClass("active");
			
			$("#recommendedJobsId").removeClass("active");
		} else {
			// for making menu item active
			
			$("#recommendedJobsInMenu").removeClass("active");
			$("#appliedJobsInMenu").removeClass("active");
	    $("#savedJobsInMenu").removeClass("active");

			// for showing active tabs
			
			$("#savedJobsId").removeClass("active");
			$("#recommendedJobsId").removeClass("active");
	    $("#appliedJobsId").removeClass("active");
		}

		// show loader
		$rootScope.showLoader();

		// get feedbacks
		var getFeedbacksServiceUrl = '/feedbacks';
		var successMsg = 'Success';
		callService.callGetService(getFeedbacksServiceUrl, successMsg, userRole).then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
				$scope.getFeedbacks = response.data;
				// hide loader
				$rootScope.hideLoader();
			}
			else{
				// alert("Error in retrieving Feedbacks");
				// hide loader
				$rootScope.hideLoader();
			}
		}).catch (function (error){
			console.log(error);
			// alert("Server Error in Retriving Feedbacks");
			// hide loader
			$rootScope.hideLoader();
		});

		// to get user saved jobs
		$scope.showSavedJobsList = false;
		$scope.showAppliedJobsList = false;
		$scope.showSavedEmptyMsg = true;
		$scope.showAppliedEmptyMsg = true;

		// get saved and applied jobs
		var getJobsServiceUrl = "/profiles/jobs";
		var successMsg = 'Success';
		callService.callGetService(getJobsServiceUrl, successMsg, userRole).then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
				$scope.savedJobs = [];
				$scope.appliedJobs = [];
				response.data.forEach(function(element, i) {
					// push into savedJobs array
					if (element.savedOn && !element.appliedOn) {
						$scope.savedJobs.push(element);
					}
					// push into appliedJobs array
					if (element.appliedOn) {
						$scope.appliedJobs.push(element);
					}
				})
				// show savedJobs list & hide empty msg
				if ($scope.savedJobs.length > 0) {
					$scope.showSavedJobsList = true;
					$scope.showSavedEmptyMsg = false;
				}
				// show savedJobs list & hide empty msg
				if ($scope.appliedJobs.length > 0) {
					$scope.showAppliedJobsList = true;
					$scope.showAppliedEmptyMsg = false;
				}
				// hide loader
				$rootScope.hideLoader();
			}
			else{
				// alert("Error in retrieving Jobs");
				$scope.showSavedJobsList = false;
				$scope.showAppliedJobsList = false;
				$scope.showSavedEmptyMsg = true;
				$scope.showAppliedEmptyMsg = true;
				// hide loader
				$rootScope.hideLoader();
			}
		}).catch (function (error){
			console.log(error);
			// alert("Server error in retrieving Jobs");
			$scope.showSavedJobsList = false;
			$scope.showAppliedJobsList = false;
			$scope.showSavedEmptyMsg = true;
			$scope.showAppliedEmptyMsg = true;

			// hide loader
			$rootScope.hideLoader();
		});
	}

	// goto Single Job Detail
	$scope.gotoSingleJobDetails = function(items) {
		// console.log(items);
		$rootScope.pageToTop();
		$rootScope.singleJobDetails = items;
		localStorage.setItem('setJobIdToEdit', items.jobDetails.uuid);
		$location.path('/single-job-detail');
	}

	$scope.feedback = {};
	$scope.feedback.thinkingtocommentfor = "";
	$scope.feedback.relationship = "";
	$scope.feedback.name = "";
	$scope.feedback.emailid = "";
	$scope.feedback.subject = "";
	$scope.feedback.comment = "";

	$scope.postFeedBack = function() {

		if ($scope.feedback.thinkingtocommentfor && $scope.feedback.relationship && $scope.feedback.name &&
				$scope.feedback.emailid && $scope.feedback.subject && $scope.feedback.comment) {

			// show loader
			$rootScope.showLoader();
			var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);
			var body = {
				"thinkingtocommentfor" : $scope.feedback.thinkingtocommentfor,
				"relationship" : $scope.feedback.relationship,
				"name" : $scope.feedback.name,
				"emailid" : $scope.feedback.emailid,
				"subject" : $scope.feedback.subject,
				"comment" : $scope.feedback.comment
			};

			var res = $http({
				method: 'POST',
				url: window.__env.apiUrl+' /feedbacks',
				headers: {
					'Authorization': valuesToBasic,
					'role' : 'jobseeker'
				},
				data: $scope.feedback
			});

			res.success(function(data, status, headers, config) {
				console.log(data);
				if(status >= 200 || status <300){
					alert("Feedback posted Succesfully");
					$scope.feedback = {};
					$scope.feedback.thinkingtocommentfor = "";
					$scope.feedback.relationship = "";
					$scope.feedback.name = "";
					$scope.feedback.emailid = "";
					$scope.feedback.subject = "";
					$scope.feedback.comment = "";

					// hide loader
					$rootScope.hideLoader();
				}else {
					alert('Server Error');
					// hide loader
					$rootScope.hideLoader();
				}

			});
			res.error(function(data, status, headers, config) {
					console.log(data);
					alert("Server Error");
					// hide loader
					$rootScope.hideLoader();
			});
		}else {
			alert("Please enter all Fields");
			// hide loader
			$rootScope.hideLoader();
		}
	}

	// hard coded array for recommended jobs
	$scope.recommendedJobs = [
		{
			"title" : "AngularJS Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"description" : "3+ Years of Experience",
			"postedOn" : "Jan 12, 2017"
		},{
			"title" : "AngularJS Developer",
			"location" : "Bangalore",
			"company" : "Snigdha Technosoft",
			"description" : "2+ Years of Experience",
			"postedOn" : "Jan 14, 2017"
		},{
			"title" : "ExtJs Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"description" : "2+ Years of Experience",
			"postedOn" : "Jan 15, 2017"
		},{
			"title" : "Springs Developer",
			"location" : "Chennai",
			"company" : "Snigdha Technosoft",
			"description" : "4+ Years of Experience",
			"postedOn" : "Jan 16, 2017"
		},{
			"title" : "Java Developer",
			"location" : "Bangalore",
			"company" : "Snigdha Technosoft",
			"description" : "1+ Years of Experience",
			"postedOn" : "Jan 12, 2017"
		},{
			"title" : "Javascript Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"description" : "1+ Years of Experience",
			"postedOn" : "Jan 18, 2017"
		},{
			"title" : "Manual Tester",
			"location" : "Chennai",
			"company" : "Snigdha Technosoft",
			"description" : "2+ Years of Experience",
			"postedOn" : "Jan 19, 2017"
		},{
			"title" : "Web Designer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"description" : "2+ Years of Experience",
			"postedOn" : "Jan 12, 2017"
		},{
			"title" : "PHP Developer",
			"location" : "Chennai",
			"company" : "Snigdha Technosoft",
			"description" : "3+ Years of Experience",
			"postedOn" : "Jan 20, 2017"
		},{
			"title" : ".net Developer",
			"location" : "Bangalore",
			"company" : "Snigdha Technosoft",
			"description" : "3+ Years of Experience",
			"postedOn" : "Jan 12, 2017"
		},{
			"title" : "NodeJS Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"description" : "2+ Years of Experience",
			"postedOn" : "Jan 12, 2017"
		},{
			"title" : "Angular 2 Developer",
			"location" : "Chennai",
			"company" : "Snigdha Technosoft",
			"description" : "1+ Years of Experience",
			"postedOn" : "Jan 12, 2017"
		},{
			"title" : "Ionic 2 Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"description" : "2+ Years of Experience",
			"postedOn" : "Jan 16, 2017",
			"description" : "2.5+ years of experience"
		},{
			"title" : "Ionic Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"description" : "2+ Years of Experience",
			"postedOn" : "Jan 12, 2017"
		},{
			"title" : "Springs Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"description" : "3+ Years of Experience",
			"postedOn" : "Jan 16, 2017"
		}
	];

	// hardcoded array for Saved jobs
	// $scope.savedJobs = [
	// 	{
	// 		"title" : "Springs Developer",
	// 		"location" : "Chennai",
	// 		"company" : "Snigdha Technosoft",
	// 		"postedOn" : "Jan 16, 2017"
	// 	},{
	// 		"title" : "Java Developer",
	// 		"location" : "Bangalore",
	// 		"company" : "Snigdha Technosoft",
	// 		"postedOn" : "Jan 12, 2017"
	// 	},{
	// 		"title" : "AngularJS Developer",
	// 		"location" : "Hyderabad",
	// 		"company" : "Snigdha Technosoft",
	// 		"postedOn" : "Jan 12, 2017"
	// 	},{
	// 		"title" : "AngularJS Developer",
	// 		"location" : "Bangalore",
	// 		"company" : "Snigdha Technosoft",
	// 		"postedOn" : "Jan 14, 2017"
	// 	},{
	// 		"title" : "ExtJs Developer",
	// 		"location" : "Hyderabad",
	// 		"company" : "Snigdha Technosoft",
	// 		"postedOn" : "Jan 15, 2017"
	// 	},{
	// 		"title" : "Angular 2 Developer",
	// 		"location" : "Chennai",
	// 		"company" : "Snigdha Technosoft",
	// 		"postedOn" : "Jan 12, 2017"
	// 	},{
	// 		"title" : "Ionic 2 Developer",
	// 		"location" : "Hyderabad",
	// 		"company" : "Snigdha Technosoft",
	// 		"postedOn" : "Jan 16, 2017",
	// 		"description" : "2.5+ years of experience"
	// 	},{
	// 		"title" : "Ionic Developer",
	// 		"location" : "Hyderabad",
	// 		"company" : "Snigdha Technosoft",
	// 		"postedOn" : "Jan 12, 2017"
	// 	},{
	// 		"title" : "Javascript Developer",
	// 		"location" : "Hyderabad",
	// 		"company" : "Snigdha Technosoft",
	// 		"postedOn" : "Jan 18, 2017"
	// 	}
	// ];

	// hardcoded array for applied Jobs
	$scope.appliedJobs = [
		{
			"title" : "Springs Developer",
			"location" : "Chennai",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 16, 2017",
			"description" : "3+ years of experience"
		},{
			"title" : "Java Developer",
			"location" : "Bangalore",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 12, 2017",
			"description" : "Urgent requirement for 4+ years of experience"
		},{
			"title" : "Angular 2 Developer",
			"location" : "Chennai",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 12, 2017",
			"description" : "3+ years of experience"
		},{
			"title" : "AngularJS Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 12, 2017",
			"description" : "Urgent requirement for 1+ years of experience"
		},{
			"title" : "AngularJS Developer",
			"location" : "Bangalore",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 14, 2017",
			"description" : "2+ years of experience"
		},{
			"title" : "Ionic 2 Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 16, 2017",
			"description" : "2.5+ years of experience"
		},{
			"title" : "Ionic Developer",
			"location" : "Hyderabad",
			"company" : "Snigdha Technosoft",
			"postedOn" : "Jan 12, 2017",
			"description" : "2.5+ years of experience"
		}
	];
});
