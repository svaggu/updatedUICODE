app.controller('myVideoController', function($scope, $location, $rootScope, fileUploadService) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData = angular.fromJson(window.localStorage['userObj']);
	var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
	var user = localStorage.getItem('isCheckUser');
	$scope.videoLink = '';
	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employee-home');
	}else {
    $(".my_documents").addClass("active");
		$(".graphical_resume").removeClass("active");
		$(".emp_dashboard").removeClass("active");
		$(".myjobs").removeClass("active");
		$(".graphsume").removeClass("active");
		$(".detailed_resume").removeClass("active");

		$rootScope.userobj = accessData;
		$rootScope.returnData = returnData;
		$("#employeeheader").show();
		$("#signoutheader").show();
		$("#homeheader").hide();
		$("#employerheader").hide();
		$("#signinheader").hide();
		$("#footersection").hide();
		$(".hideclass").hide();

		if (accessData.userName == 'surya@snigdha.co.in') {
			$scope.videoLink = window.__env.apiUrl+'/jobumes/videos/1/surya.mp4';
		}else if (accessData.userName == 'pradeep.ragiphani007@gmail.com') {
			$scope.videoLink = window.__env.apiUrl+'/jobumes/videos/1/sample.mp4';
		}else {
			$scope.videoLink = 'https://www.youtube.com/embed/ggb9uhFV8NY';
		}

		$scope.uploadVideo = function(){
	     var file = $scope.myVideo;

	     console.log('file is ' );
	     console.dir(file);

			 if (file.name != "" || file.name != undefined) {
			 	$scope.profilePicPath = file.name;
			 }

			 if (file == '' || file == undefined) {
			 	alert("Please select a Video");
			}else {
				// show loader
				$rootScope.showLoader();

				var uploadUrl = window.__env.apiUrl+"/profiles/videos";
	 		 	var successMsg = 'Video Uploaded Successfully';
				fileUploadService.putFileUpload(file, uploadUrl, successMsg, 'jobseeker', '/my-video').then(function(response) {
					console.log(response);
					// hide loader
					$rootScope.hideLoader();
				});
			}
	  };
	}
});
