app.controller('registerController', function($scope, $location, $rootScope, $http, fileUploadService, callService) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData = angular.fromJson(window.localStorage['userObj']);
	var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
	var user = localStorage.getItem('isCheckUser');
	var userRole = localStorage.getItem('userRole');

	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employee-home');
	}else {
		$(".myprofiles").addClass("active");
		$(".emp_dashboard").removeClass("active");
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

		// to get resume details
		$scope.getResumeDetails = function() {

			// show loader
			$rootScope.showLoader();

			// get resumes list of job Seeker when he login
			var getResumesServiceUrl = "/resumes";
			var successMsg = 'Success';
			callService.callGetService(getResumesServiceUrl, successMsg, userRole).then(function(response) {
				console.log(response);

				if (response.status >= 200 || response.status < 300) {
					$scope.resumesList = response.data.resumes;
					$rootScope.allResumes = $scope.resumesList;
					// hide loader
					$rootScope.hideLoader();
				}else {
					// alert('Server Error');
					// hide loader
					$rootScope.hideLoader();
				}
			}).catch (function (error){
				console.log(error);
				// alert("Server error in retrieving Jobs");
				// hide loader
				$rootScope.hideLoader();
			});
		}

		// check if resumes list exists
		if ($rootScope.allResumes == undefined || $rootScope.allResumes == null || $rootScope.allResumes == "") {
			$scope.getResumeDetails();
		}

	}
	$scope.uploadFile = function(){
     var file = $scope.myFile;

     console.log('file is ' );
     console.dir(file);

	
	if (file == '' || file == undefined) {
		alert("Please select a File");
	}else if ($rootScope.allResumes.length >= 5) {
		alert("Warning ! You can upload only 5 Resumes..");
	}else {
		// show loader
		$rootScope.showLoader();
		var uploadUrl = window.__env.apiUrl+"/resumes";
		var successMsg = 'Resume Uploaded Successfully';
		fileUploadService.uploadFileToUrl(file, uploadUrl, successMsg, 'jobseeker', '/myprofiles').then(function(response) {
			console.log(response);

			// delete resume if replace seleted
			if ($rootScope.delReplaceResume) {
				var items = $rootScope.delReplaceResume;
				var body = {};
				console.log(items.uuid);
				var defaultProfileUrl = '/resumes/delete/' + items.uuid;
				var successMsg = 'Success';
				callService.callPutService(body, defaultProfileUrl, successMsg, userRole).then(function(response) {
					console.log(response);
					if (response.status >= 200 || response.status < 300) {
						// alert("Resume Deleted Successfully");
						// page scroll to top
						$rootScope.pageToTop();
						window.location.reload();
						// hide loader
						$rootScope.hideLoader();
					}
					else{
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

			// set uploaded resume id to setResumeId-local storage
			localStorage.setItem('setResumeId', response.data.uuid);
			$location.path('/edit_profile');
			// hide loader
			$rootScope.hideLoader();
		});
	}
  };
	});
