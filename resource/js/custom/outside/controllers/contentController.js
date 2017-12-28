app.controller("contentController", ['$scope', '$http', '$location', '$rootScope','callService', function($scope, $http, $location, $rootScope, callService) {

	// show loader
	$rootScope.showLoader();

	// to signup page
	$rootScope.gotoSeekerSignup = function(value) {
		localStorage.setItem('signUpActive', value);
		$location.path('/signup')
	};

	// hide save job button -- if recruiter logged in
	$rootScope.checkUser = true;

	// hide and show list & empty message
	$scope.showEmptyMsg = true;
	$scope.showJobsList = false;


	var user = localStorage.getItem('isCheckUser');
	var userRole = localStorage.getItem('userRole');
	console.log(userRole);

	if (userRole != 'empty' || userRole != '' || user != 'empty' || user != '') {
		var accessData = angular.fromJson(window.localStorage['userObj']);
		var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
	}

	// if recruiter -- hide save button and show respective header
	if (userRole == 'recruiter'  || userRole == 'recruiterAdmin') {
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

		// to hide save button in jobs list
		$rootScope.checkUser = false;
	}

	// if jobSeeker -- show save button and show respective header
	if (userRole == 'jobseeker') {
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

		// to show save button in jobs list
		$rootScope.checkUser = true;
	}

	// var valuesToBasic = 'Basic ' + btoa('surya@snigdha.co.in' + ':' + 'password');

	// to get all posted jobs
	var res = $http({
		method: 'GET',
		url: window.__env.apiUrl+'/jobs'
		// ,
		// headers: {'Authorization': valuesToBasic}
	});
	res.success(function(data, status, headers, config) {
		if((status >= 200 || status < 300)){
			console.log(data);
			$rootScope.getAllJobs = [];
			data.forEach(function(element) {
			// 	if (element.parsedJson.JobData.JobProfile[0] != '') {
			// 		// console.log(element.parsedJson.JobData.JobProfile[0]);
					$rootScope.getAllJobs.push(element);
			// 	}
			})
			// var arrLength;
			// if (data.length > 10) {
			// 	arrLength = 10;
			// }else {
			// 	arrLength = data.length;
			// }
			// for (var i = 0; i < arrLength; i++) {
			// 	$rootScope.getAllJobs.push(data[i]);
			// }
			// hide and show list & empty message
			$scope.showEmptyMsg = false;
			$scope.showJobsList = true;
			// console.log($rootScope.getAllJobs);

			// hide loader
			$rootScope.hideLoader();
		}
		else{
			// alert("Error in retrieving Jobs");
			// hide and show list & empty message
			$scope.showEmptyMsg = true;
			$scope.showJobsList = false;
			// hide loader
			$rootScope.hideLoader();
		}

	});
	res.error(function(data, status, headers, config) {
			console.log(data);
			// alert("Server error in retrieving Jobs");
			// hide and show list & empty message
			$scope.showEmptyMsg = true;
			$scope.showJobsList = false;

			// hide loader
			$rootScope.hideLoader();
	});

	// save job
	$scope.saveJob = function(items) {
		console.log(items);

		if (user == 'empty' || user == undefined || userRole == 'empty' || userRole == undefined) {
			$location.path('/employee-home');
		}else {
			// show loader
			$rootScope.showLoader();

			var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);

			var body = {
				"job": items.uuid,
				"status" : "saved"
			};

			var res = $http({
				method: 'POST',
				url: 'http://13.126.83.252:9060/profiles/jobs',
				headers: {
					'Authorization': valuesToBasic,
					'Content-Type' : 'application/json',
					'role': 'jobseeker'
				},
				data: body
			});
			res.success(function(data, status, headers, config) {
				if((status >= 200 || status < 300)){
					console.log(data);
					alert('Job Saved Successfully');
					$rootScope.myJobsTabClass = 'savedJobs';
					$location.path('/my-jobs');

					// hide loader
					$rootScope.hideLoader();
				}
				else{
					// alert("Error in retrieving Jobs");
					$scope.showList = false;
					$scope.showEmptyMsg = true;
					// hide loader
					$rootScope.hideLoader();
				}

			});
			res.error(function(data, status, headers, config) {
					console.log(data);
					// alert("Server error in retrieving Jobs");
					$scope.showList = false;
					$scope.showEmptyMsg = true;
					// hide loader
					$rootScope.hideLoader();
			});
		}
	}

	// goto Single Job Detail
	$scope.gotoSingleJobDetails = function (items) {
		// console.log(items);
		$rootScope.pageToTop();
		$rootScope.singleJobDetails = items;
		localStorage.setItem('setJobIdToEdit', items.uuid);
		$location.path('/single-job-detail');
	}

	// goto search results page -- list all jobs
	$scope.searchResultsPage = function () {
		$rootScope.pageToTop();
		$location.path('/search-results');
	}

}]);
