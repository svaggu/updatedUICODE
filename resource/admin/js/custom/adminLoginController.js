admin.controller('adminLoginController', function($scope,$http,$location,$rootScope) {
	//$scope.message = 'Contact us! JK. This is just a demo.';

  // hide menu items
  $("#login-sidebar-menu").css('display', 'block');
  $("#sidebar-menu").css('display', 'none');

  // hide notification bar
  $(".navbar-custom-menu").css('display', 'none');

	// to signup page
	$scope.gotoSeekerSignup = function(value) {
		localStorage.setItem('signUpActive', value);
		$location.path('/signup')
	}

  $scope.adminSignIn1 = function(){
    if($scope.userName == 'admin@rg.com' && $scope.pass == 'admin'){
      $location.path('/admin-dashboard');
    }else {
      alert('Please check Login Credentials');
    }
  }

	// signin validation
	$scope.adminSignIn = function(){
	// alert("validatesignin");
		if($scope.userName && $scope.pass){
				// alert("Valid");
			var valuesToBasic = 'Basic ' + btoa($scope.userName + ':' + $scope.pass);
			// console.log(valuesToBasic);

			var userobj = {};
			userobj.userName = $scope.userName;
			userobj.pass = $scope.pass;
			// var res = $http.get('http://13.126.83.252:9060/login', userobj);
			var res = $http({
				method: 'GET',
				url: window.__env.apiUrl+'/login',
				headers: {
					'Authorization': valuesToBasic,
					'role' : 'admin'
				}
			});

			res.success(function(data, status, headers, config) {
				console.log(data);
				$rootScope.userobj = userobj;
				$rootScope.returnData = data;
				if(status === 200){
					window.localStorage['userObj'] = angular.toJson(userobj);
					window.localStorage['userDetailsObj'] = angular.toJson(data);
					localStorage.setItem('isCheckUser', $rootScope.returnData.uuid);
					localStorage.setItem('userRole', 'admin');
					// if(data.data=='valid'){
					$location.path('/admin-dashboard');
					// }
					// else{
					// 	$scope.userName='';
					// 	$scope.pass='';
					// 	$scope.myform.$setPristine();
					// 	alert('user name and password is invalid');
					// }
				}else {
					alert('Please check Login Credentials');
				}

			});
			res.error(function(data, status, headers, config) {
					console.log(data);
					alert("Server Error! Please check Login Credentials");
			});


		}else {
			alert("Please enter Login Credentials");
		}

	};
});
