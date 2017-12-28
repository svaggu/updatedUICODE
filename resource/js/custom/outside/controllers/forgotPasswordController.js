app.controller('forgotPasswordController', function($scope,$http,$location,$rootScope, callService) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	$(".applyJobsSI").removeClass("active");
	$(".postJobsSI").removeClass("active");
	$(".productsSI").removeClass("active");
	$(".pricingSI").removeClass("active");
	$(".getdemo").removeClass("active");
	$(".signin").removeClass("active");

	// forgot password
	$scope.forgotPasswordFn = function () {
		if ($scope.forgotPassword) {
			// show loader
			$rootScope.showLoader();
			var editProfileServiceUrl = '/profiles/forgotPassword/' + $scope.forgotPassword;
			var res = $http({
				method: 'GET',
				url: $rootScope.mainUrl + editProfileServiceUrl
			});

			res.success(function(data, status, headers, config) {
				console.log(data);
				if(status === 200){
					alert("Mail has been sent to your Email Id.");
					// hide loader
					$rootScope.hideLoader();
					$location.path('/');
				}else {
					alert('Please check Email Id');
					// hide loader
					$rootScope.hideLoader();
				}

			});
			res.error(function(data, status, headers, config) {
				console.log(data);
				alert("Please check Email Id");
				// hide loader
				$rootScope.hideLoader();
			});
		} else {
			alert("Please enter Email Id");
		}
	}
});