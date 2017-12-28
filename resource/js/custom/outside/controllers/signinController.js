app.controller('signinController',function($scope,$http,$location,$rootScope, facebookService){

	var user = localStorage.getItem('isCheckUser');
	var role = localStorage.getItem('userRole');
	var accessData = window.localStorage['userObj'];
	if(user == "" || user == "empty" || user == undefined){
		// $location.path('/employee-home');
		$scope.empShow = "display: none";
		$("#employeeheader").hide();
		$("#signoutheader").hide();
		$("#homeheader").show();
		$("#employerheader").hide();
		$("#signinheader").show();
		$("#footersection").show();
		$(".hideclass").show();
	}else {
		// $rootScope.returnData = accessData;
		// console.log($rootScope.returnData);
		if (role == "employee") {
			$("#employeeheader").show();
			$("#signoutheader").show();
			$("#homeheader").hide();
			$("#employerheader").hide();
			$("#signinheader").hide();
			$("#footersection").hide();
			$(".hideclass").hide();
		}else if(role == "employer") {
			$("#employeeheader").hide();
			$("#signoutheader").show();
			$("#homeheader").hide();
			$("#employerheader").show();
			$("#signinheader").hide();
			$("#footersection").hide();
			$(".hideclass").hide();
		}
	}

	// captcha code starts here
	$scope.checkform1 = function () {
		var why = "";
		
		if($scope.txtInput1 == "" || $scope.txtInput1 == undefined || $scope.txtInput1 == null){
			why += "- Security code should not be empty.\n";
		}
		if($scope.txtInput1 != ""){
			if($scope.ValidCaptcha1($scope.txtInput1) == false){
				why += "- Security code did not match.\n";
			}
		}
		if(why != ""){
			alert(why);
			return false;
		}
	}

	//Generates the captcha function
/*
	var a = Math.ceil(Math.random() * 9)+ '';
	var b = Math.ceil(Math.random() * 9)+ '';
	var c = Math.ceil(Math.random() * 9)+ '';
	var d = Math.ceil(Math.random() * 9)+ '';
	var e = Math.ceil(Math.random() * 9)+ '';

	var code = a + b + c + d + e;
	document.getElementById("txtCaptcha1").value = code;
	document.getElementById("txtCaptchaDiv1").innerHTML = code;

	document.getElementById("txtCaptcha2").value = code;
	document.getElementById("txtCaptchaDiv2").innerHTML = code;
	
	// Validate the Entered input aganist the generated security code function
	$scope.ValidCaptcha1 = function (){
		var str1 = $scope.removeSpaces1(document.getElementById('txtCaptcha1').value);
		var str2 = $scope.removeSpaces1(document.getElementById('txtInput1').value);

		// if employer
		var str3 = $scope.removeSpaces1(document.getElementById('txtCaptcha2').value);
		var str4 = $scope.removeSpaces1(document.getElementById('txtInput2').value);
		if (str1 == str2){
			$scope.msgFromCaptcha1 = "success";
			return true;
		} else if (str3 == str4) {
			$scope.msgFromCaptcha1 = "success";
			return true;
		}else{
			return false;
		}
	}


	$scope.removeSpaces1 = function (string){
		return string.split(' ').join('');
	}
*/


	$scope.validateSignIn=function(){
	// alert("validatesignin");
		if($scope.userName && $scope.pass){
			// alert("Valid");
			$scope.checkform1();
			if ($scope.msgFromCaptcha1 == "success") {
				// show loader
				$rootScope.showLoader();

				var valuesToBasic = 'Basic ' + btoa($scope.userName + ':' + $scope.pass);
				// console.log(valuesToBasic);

				var userobj = {};
				userobj.userName = $scope.userName;
				userobj.pass = $scope.pass;
				// var res = $http.get(window.__env.apiUrl+'/login', userobj);
				var res = $http({
					method: 'GET',
					url: window.__env.apiUrl+'/login',
					headers: {
						'Authorization': valuesToBasic,
						'role' : 'jobseeker'
					}
				});

				res.success(function(data, status, headers, config) {
					console.log(data);
					$rootScope.userobj = userobj;
					$rootScope.returnData = data;
					if(status === 200){
						window.localStorage['userObj'] = angular.toJson(userobj);
						window.localStorage['userDetailsObj'] = angular.toJson(data);
						localStorage.setItem('isCheckUser', $rootScope.returnData[0].profile.uuid);
						// localStorage.setItem('userRole', 'jobseeker');
						localStorage.setItem('userRole', $rootScope.returnData[1].role.name);
						// if(data.data=='valid'){
						$("#employeeheader").show();
						$("#signoutheader").show();
						$("#homeheader").hide();
						$("#employerheader").hide();
						$("#signinheader").hide();
						$("#footersection").hide();
						$(".hideclass").hide();
						// $location.path('/');

						// hide loader
						$rootScope.hideLoader();

						// get user default profile details
      					// $rootScope.getDefaultProfile();

						window.location.reload();
						// }
						// else{
						// 	$scope.userName='';
						// 	$scope.pass='';
						// 	$scope.myform.$setPristine();
						// 	alert('user name and password is invalid');
						// }
					}else {
						alert('Please check Login Credentials');
						// hide loader
						$rootScope.hideLoader();
					}

				});
				res.error(function(data, status, headers, config) {
						console.log(data);
						alert("Server Error! Please check Login Credentials");
						// hide loader
						$rootScope.hideLoader();
				});
			}
		}else {
			alert("Please enter Login Credentials");
			// hide loader
			$rootScope.hideLoader();
		}

	};

	// recruiter login
	$scope.validateRecSignIn=function(){
	// alert("validatesignin");
		if($scope.userName && $scope.pass){
			// alert("Valid");

			$scope.checkform1();
			if ($scope.msgFromCaptcha1 == "success") {
				// show loader
				$rootScope.showLoader();

				var valuesToBasic = 'Basic ' + btoa($scope.userName + ':' + $scope.pass);
				// console.log(valuesToBasic);

				var userobj = {};
				userobj.userName = $scope.userName;
				userobj.pass = $scope.pass;
				// var res = $http.get(window.__env.apiUrl+'/login', userobj);
				var res = $http({
					method: 'GET',
					url: window.__env.apiUrl+'/login',
					headers: {
						'Authorization': valuesToBasic,
						'role': 'recruiter'
					}
				});

				res.success(function(data, status, headers, config) {
					console.log(data);
					$rootScope.userobj = userobj;
					$rootScope.returnData = data;
					if(status === 200){
						window.localStorage['userObj'] = angular.toJson(userobj);
						window.localStorage['userDetailsObj'] = angular.toJson(data);
						localStorage.setItem('isCheckUser', $rootScope.returnData[0].profile.uuid);
						// localStorage.setItem('userRole', 'recruiter');
						localStorage.setItem('userRole', $rootScope.returnData[1].role.name);
						// if(data.data=='valid'){
						$("#employerheader").show();
						$("#signoutheader").show();
						$("#homeheader").hide();
						$("#employeeheader").hide();
						$("#signinheader").hide();
						$("#footersection").hide();
						$(".hideclass").hide();
						// $location.path('/');

						// hide loader
						$rootScope.hideLoader();

						// get user default profile details
      					// $rootScope.getDefaultProfile();

						window.location.reload();
						// }
						// else{
						// 	$scope.userName='';
						// 	$scope.pass='';
						// 	$scope.myform.$setPristine();
						// 	alert('user name and password is invalid');
						// }
					}else {
						alert('Please check Login Credentials');
						// hide loader
						$rootScope.hideLoader();
					}

				});
				res.error(function(data, status, headers, config) {
						console.log(data);
						alert("Server Error! Please check Login Credentials");
						// hide loader
						$rootScope.hideLoader();
				});
			}
		}else {
			alert("Please enter Login Credentials");
			// hide loader
			$rootScope.hideLoader();
		}
	}

	$scope.callLoginService = function(body){

		// show loader
		$rootScope.showLoader();

		var userobj = {};
		userobj.userName = body.email;
		userobj.pass = "";
		// var res = $http.get('http://13.126.83.252:9060/login', userobj);
		var res = $http({
			method: 'GET',
			url: window.__env.apiUrl+'/login',
			headers: {
				'source': body.socialProfiles[0].socialNetworkName,
				'user': body.email,
				'role': 'jobseeker'
			}
		});

		res.success(function(data, status, headers, config) {
			console.log(data);
			$rootScope.userobj = userobj;
			$rootScope.returnData = data;
			if(status === 200){
				window.localStorage['userObj'] = angular.toJson(userobj);
				window.localStorage['userDetailsObj'] = angular.toJson(data);
				localStorage.setItem('isCheckUser', $rootScope.returnData[0].profile.uuid);
				// localStorage.setItem('userRole', 'jobseeker');
				localStorage.setItem('userRole', $rootScope.returnData[1].role.name);
				// if(data.data=='valid'){
				$("#employeeheader").show();
				$("#signoutheader").show();
				$("#homeheader").hide();
				$("#employerheader").hide();
				$("#signinheader").hide();
				$("#footersection").hide();
				$(".hideclass").hide();

				// hide loader
				$rootScope.hideLoader();

				// get user default profile details
      			$rootScope.getDefaultProfile();

				$location.path('/employee-dashboard');
				// }
				// else{
				// 	$scope.userName='';
				// 	$scope.pass='';
				// 	$scope.myform.$setPristine();
				// 	alert('user name and password is invalid');
				// }
			}else {
				alert('Please check Login Credentials');
				// hide loader
				$rootScope.hideLoader();
			}

		});
		res.error(function(data, status, headers, config) {
				console.log(data);
				alert("Server Error! Please check Login Credentials");
				// hide loader
				$rootScope.hideLoader();
		});
	}

	$scope.myFacebookLogin = function() {
		FB.login(function(){
			//to share a post with text in message: ''
			// FB.api('/me/feed', 'post', {message: 'Hello, world!'});
			facebookService.getMyDetails()
				.then(function(response) {
					console.log(response);
					//for profile picture "http://graph.facebook.com/"+response.id+"/picture";
					// console.log("http://graph.facebook.com/"+response.id+"/picture");
					//  to get accessToken
					 var accessToken = FB.getAuthResponse();
					 console.log(accessToken);

					var socialProfiles = [];
					socialProfiles.push({
	          socialNetworkName: "facebook",
						email: response.email,
	          details: accessToken,
	        });
					var body = {
						"username": response.email,
	          "role": $scope.role,
	          "firstName": response.first_name,
	          "middleName": response.middle_name,
	          "lastName": response.last_name,
						"gender": response.gender,
	          "email": response.email,
	          "phoneNumber": "",
	          "socialProfiles" : socialProfiles
					}
					$scope.callLoginService(body);
				}
			);
		// }, {scope: 'email, publish_actions, user_likes',
		}, {scope: 'email, publish_actions',
	return_scopes: true});
	}

	$scope.logoutFb = function(){
		FB.logout(function(response) {
			// user is now logged out
		});
	}

	// gmail signin stars here
	// google plus signin
	// This flag we use to show or hide the button in our HTML.
    $scope.signedIn = false;

    // Here we do the authentication processing and error handling.
    // Note that authResult is a JSON object.
    $scope.processAuth = function(authResult) {
        // Do a check if authentication has been successful.
        if(authResult['access_token']) {
            // Successful sign in.
            $scope.signedIn = true;
						console.log("sign in success");
						$scope.authResult = authResult;
						console.log(authResult);
						$scope.getUserInfo();
            //     ...
            // Do some work [1].
            //     ...
        } else if(authResult['error']) {
            // Error while signing in.
            $scope.signedIn = false;
						console.log("sign in failed");
						console.log(authResult);
            // Report error.
        }
    };

    // When callback is received, we need to process authentication.
    $scope.signInCallback = function(authResult) {
        $scope.$apply(function() {
            $scope.processAuth(authResult);
        });
    };

    // Render the sign in button.
    $scope.renderSignInButton = function(role) {
			$scope.userRole = role;
			console.log(role);
			// gapi.client.setApiKey('AIzaSyBb7hkKtWbPIrivd925jdJWKesi4A5Ej10');
	    // gapi.client.load('plus', 'vl' , function() {});

				// for job seeker based on span id
        gapi.signin.render('signInButton',
            {
                'callback': $scope.signInCallback, // Function handling the callback.
                'clientid': '1081467653510-scbqdl91cqomgv4r2q1pl8h363poc7pi.apps.googleusercontent.com', // CLIENT_ID from developer console which has been explained earlier.
                'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
                                                                                  // as their explanation is available in Google+ API Documentation.
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                'cookiepolicy': 'single_host_origin',
								'approvalprompt': 'force',
								'immediate': false
            }
        );

				// for recruiter based on span id
				gapi.signin.render('signInButton2',
            {
                'callback': $scope.signInCallback, // Function handling the callback.
                'clientid': '1081467653510-scbqdl91cqomgv4r2q1pl8h363poc7pi.apps.googleusercontent.com', // CLIENT_ID from developer console which has been explained earlier.
                'requestvisibleactions': 'http://schemas.google.com/AddActivity', // Visible actions, scope and cookie policy wont be described now,
                                                                                  // as their explanation is available in Google+ API Documentation.
                'scope': 'https://www.googleapis.com/auth/plus.login https://www.googleapis.com/auth/userinfo.email',
                'cookiepolicy': 'single_host_origin',
								'approvalprompt': 'force',
								'immediate': false
            }
        );
    }

    // Start function in this example only renders the sign in button.
    $scope.start = function() {
        $scope.renderSignInButton();
    };

		// Process user info.
		// userInfo is a JSON object.
		$scope.processUserInfo = function(userInfo) {
			console.log(userInfo);
		    // You can check user info for domain.
		    if(userInfo['domain'] == 'mycompanydomain.com') {
		        // Hello colleague!
		    }

				var socialProfiles = [];
				socialProfiles.push({
					socialNetworkName: "googleplus",
					email: userInfo.emails[0].value,
					details: $scope.authResult,
				});
				var body = {
					"username": userInfo.emails[0].value,
					"role": $scope.role,
					"firstName": userInfo.name.givenName,
					"middleName": "",
					"lastName": userInfo.name.familyName,
					"gender": userInfo.gender,
					"email": userInfo.emails[0].value,
					"phoneNumber": "",
					"socialProfiles" : socialProfiles
				}
				$scope.callLoginService(body);

		    // Or use his email address to send e-mails to his primary e-mail address.
		    // sendEMail(userInfo['emails'][0]['value']);
		}

		// When callback is received, process user info.
		$scope.userInfoCallback = function(userInfo) {
		    $scope.$apply(function() {
		        $scope.processUserInfo(userInfo);
		    });
		};

		// Request user info.
		$scope.getUserInfo = function() {
		    gapi.client.request(
		        {
		            'path':'/plus/v1/people/me',
		            'method':'GET',
		            'callback': $scope.userInfoCallback
		        }
		    );
		};

		// to signout
		// gapi.auth.signOut();

		// recruiter facebook
	$scope.myFacebookLoginRec = function() {
			FB.login(function(){
				//to share a post with text in message: ''
				// FB.api('/me/feed', 'post', {message: 'Hello, world!'});
				facebookService.getMyDetails()
					.then(function(response) {
						console.log(response);
						//for profile picture "http://graph.facebook.com/"+response.id+"/picture";
						// console.log("http://graph.facebook.com/"+response.id+"/picture");
						//  to get accessToken
						 var accessToken = FB.getAuthResponse();
						 console.log(accessToken);

						var socialProfiles = [];
						socialProfiles.push({
		          socialNetworkName: "facebook",
							email: response.email,
		          details: accessToken,
		        });
						var body = {
							"username": response.email,
		          "role": $scope.role,
		          "firstName": response.first_name,
		          "middleName": response.middle_name,
		          "lastName": response.last_name,
							"gender": response.gender,
		          "email": response.email,
		          "phoneNumber": "",
		          "socialProfiles" : socialProfiles
						}
						$scope.callLoginService(body);
					}
				);
			// }, {scope: 'email, publish_actions, user_likes',
			}, {scope: 'email, publish_actions',
		return_scopes: true});
		}

})
