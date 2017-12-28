	app.controller("searchResultsController", function($scope, $filter,$http, $location, $rootScope, callService) {

		$rootScope.showAllJobs = [];
		$scope.pageSize = 5;
		$scope.currentPages = 1;
		$scope.totalItems = 5;
		$scope.ItemsPerPage = 5;
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

		// show loader
		$rootScope.showLoader();

		// to get all posted jobs
		var getAllJobsServiceUrl = '/jobs';
		var successMsg = 'Success';
		callService.callGetService(getAllJobsServiceUrl, successMsg, userRole).then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
				// console.log(data);
				$rootScope.showAllJobs = [];
				$rootScope.showAllJobs = response.data;
				console.log($rootScope.showAllJobs);
				$scope.totalItems = $rootScope.showAllJobs.length;
				// data.forEach(function(element) {
				// 	if (element.parsedJson.JobData.JobProfile[0] != '') {
				// 		// console.log(element.parsedJson.JobData.JobProfile[0]);
				// 		$rootScope.getAllJobs.push(element);
				// 	}
				// })

				// for pagination
				$scope.fromArray = 0;
				$scope.toArray = 5;
				$scope.activeMenu = 1;		// for active class
				$rootScope.currPageNo = 1;		// to specify the page is in first page
				var arrLen = $rootScope.showAllJobs.length;
				var calcLength = arrLen / 10;
				console.log(calcLength);
				var finalLen = (calcLength.toString()).substr(0,1);
				$scope.finalLen = parseInt(finalLen) + 1;
				console.log($scope.finalLen);
				var first;
				var obj1;
				$scope.pageNumbers = [];
				// $scope.pageNumbers.push(first);
				for (var i=0; i<$scope.finalLen; i++) {
					first = i;
					$scope.pageNumbers.push(first + 1);
				}
				console.log($scope.pageNumbers);
				$scope.firstPage = $scope.pageNumbers[0];
				$scope.lastPage = $scope.pageNumbers[$scope.pageNumbers.length - 1];

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
		}).catch (function (error){
			console.log(error);
			// alert("Server error in retrieving Jobs");
			// hide and show list & empty message
			$scope.showEmptyMsg = true;
			$scope.showJobsList = false;

			// hide loader
			$rootScope.hideLoader();
		});

		// sort
		$scope.sort = function(keyname){
        $scope.sortKey = keyname;   //set the sortKey to the param passed
        $scope.reverse = !$scope.reverse; //if true make it false and vice versa
    }

	// for pagination on clicking page number
	$scope.changePage = function (items) {

		$rootScope.currPageNo = items;
		if (items == 1) {
			$scope.fromArray = 0;
		}else {
			$scope.fromArray = (items-1) * 10;
		}
		$scope.activeMenu = items;		// for active class
		console.log($scope.fromArray);
	}

	// for pagination on clicking next
	$scope.nextPage = function () {
		if ($rootScope.currPageNo == $scope.lastPage) {
			console.log("this is the last page");
		}else {
			$scope.changePage($rootScope.currPageNo + 1);
		}
	}

	// for pagination on clicking previous
	$scope.previousPage = function () {
		if ($rootScope.currPageNo == $scope.firstPage) {
			console.log("this is the first page");
		}else {
			$scope.changePage($rootScope.currPageNo - 1);
		}
	}

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

			var saveJobServiceUrl = '/profiles/jobs';
			var successMsg = 'Success';
			callService.callPostService(body, saveJobServiceUrl, successMsg, userRole).then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					alert('Job Saved Successfully');
					$rootScope.myJobsTabClass = 'savedJobs';

					// hide loader
					$rootScope.hideLoader();

					$location.path('/my-jobs');
				}
				else{
					// alert("Error in retrieving Jobs");
					$scope.showList = false;
					$scope.showEmptyMsg = true;

					// hide loader
					$rootScope.hideLoader();
				}
			}).catch (function (error){
				console.log(error);
				// alert("Server error in retrieving Jobs");
					$scope.showList = false;
					$scope.showEmptyMsg = true;

					// hide loader
					$rootScope.hideLoader();
			});
		}
	}

	// create job alert
	$scope.createJobAlert = function() {

		if ($scope.alertTitle && $scope.alertEmail) {
			// show loader
			$rootScope.showLoader();

			var body = {
				"title": $scope.alertTitle,
				"email": $scope.alertEmail
			};

			var createAlertServiceUrl = '/profiles/jobs/createAlert';
			var successMsg = 'Success';
			callService.callPostService(body, createAlertServiceUrl, successMsg, userRole).then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					alert('Alert Created Successfully');

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
		} else { 
			alert("Please enter all fields");
		}
	}

	// goto Single Job Detail
	$scope.gotoSingleJobDetails = function(items) {
		// console.log(items);
		$rootScope.pageToTop();
		$rootScope.singleJobDetails = items;
		localStorage.setItem('setJobIdToEdit', items.uuid);
		$location.path('/single-job-detail');
	}
});
