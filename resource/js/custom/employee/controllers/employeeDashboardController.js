app.controller('employeeDashboardController', function($scope, $location, $rootScope, $http) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData = angular.fromJson(window.localStorage['userObj']);
	var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
	var user = localStorage.getItem('isCheckUser');
	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employee-home');
	}else {
		$(".emp_dashboard").addClass("active");
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
	}

	$scope.data = {
	  "url": "http://13.126.83.252:9058/jobumes/resumes/Arun.docx",
	  "name" : "Aru CV 1"
	}

	$scope.uploadFileLink = function(){
		var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);
		if($scope.resumeLink){
			// show loader
			$rootScope.showLoader();
			var res = $http({
				method: 'POST',
				url: window.__env.apiUrl+'/resumes',
				headers: {
					'Authorization': valuesToBasic,
					'Content-Type' : 'multipart/form-data request',
					'role' : 'jobseeker'
				}
				// ,
				// data: $scope.data
			});

			res.success(function(data, status, headers, config) {
				console.log(data);
				if (status >= 200 || status < 300) {
					alert("File Uploaded Successfully");

					// hide loader
					$rootScope.hideLoader();
				}else {
					alert("Please check the File link");
					// hide loader
					$rootScope.hideLoader();
				}
			})
			res.error(function(data, status, headers, config) {
					console.log(data);
					alert("Server Error!");
					// hide loader
					$rootScope.hideLoader();
			});
		}else {
			alert("Please give a URL of a file");
			// hide loader
			$rootScope.hideLoader();
		}
	}
});
