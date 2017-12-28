app.controller("signupController", function signupController($scope,$rootScope, $http,$location,$route,facebookService) {

	var signUpCls = localStorage.getItem('signUpActive');
	if (signUpCls == 'jobSeeker') {
		$("#employee_signup_tab").addClass("active");
		$("#employer_signup_tab").removeClass("active");
		$("#employee_signup_page").css('display', 'block');
		$("#employer_signup_page").css('display', 'none');
	}else if (signUpCls == 'recruiter') {
		$("#employer_signup_tab").addClass("active");
		$("#employee_signup_tab").removeClass("active");
		$("#employee_signup_page").css('display', 'none');
		$("#employer_signup_page").css('display', 'block');
	}else {
		$("#employee_signup_tab").addClass("active");
		$("#employer_signup_tab").removeClass("active");
		$("#employee_signup_page").css('display', 'block');
		$("#employer_signup_page").css('display', 'none');
	}

	// captcha code starts here
	$scope.checkform2 = function () {
		var why = "";
		
		if($scope.txtInput2 == "" || $scope.txtInput2 == undefined || $scope.txtInput2 == null){
			why += "- Security code should not be empty.\n";
		}
		if($scope.txtInput2 != ""){
			if($scope.ValidCaptcha2($scope.txtInput2) == false){
				why += "- Security code did not match.\n";
			}
		}
		if(why != ""){
			alert(why);
			return false;
		}
	}

	//Generates the captcha function
/*	var a = Math.ceil(Math.random() * 9)+ '';
	var b = Math.ceil(Math.random() * 9)+ '';
	var c = Math.ceil(Math.random() * 9)+ '';
	var d = Math.ceil(Math.random() * 9)+ '';
	var e = Math.ceil(Math.random() * 9)+ '';

	var code = a + b + c + d + e;
	document.getElementById("txtCaptcha3").value = code;
	document.getElementById("txtCaptchaDiv3").innerHTML = code;

	document.getElementById("txtCaptcha4").value = code;
	document.getElementById("txtCaptchaDiv4").innerHTML = code;
	
	// Validate the Entered input aganist the generated security code function
	$scope.ValidCaptcha2 = function (){
		var str1 = $scope.removeSpaces2(document.getElementById('txtCaptcha3').value);
		var str2 = $scope.removeSpaces2(document.getElementById('txtInput3').value);

		// if employer
		var str3 = $scope.removeSpaces2(document.getElementById('txtCaptcha4').value);
		var str4 = $scope.removeSpaces2(document.getElementById('txtInput4').value);
		if (str1 == str2){
			$scope.msgFromCaptcha3 = "success";
			return true;
		} else if (str3 == str4) {
			$scope.msgFromCaptcha3 = "success";
			return true;
		}else{
			return false;
		}
	}

	// Remove the spaces from the entered and generated code
	$scope.removeSpaces2 = function (string){
		return string.split(' ').join('');
	}*/
	// captcha code ends here

	// to get roles
	var res = $http({
		method: 'GET',
		url: window.__env.apiUrl+'/roles'
	});
	res.success(function(data, status, headers, config) {
		if((status >= 200 || status < 300)){
			// console.log(data);
			$scope.getRoles = data;
		}
		else{
			$scope.loginMessage =  status;
			alert("Error in retrieving Roles");
		}

	});
	res.error(function(data, status, headers, config) {
			console.log(data);
			alert("Server error in retrieving Roles");
	});

		// register a user
	$scope.signUpUser = function() {
		// job-seeker role uuid
		// $scope.role = "e7c5f5f2-d2e1-4ae6-bf66-bff67bef90b1";
		$scope.role = "jobseeker";
		if (!$scope.iAgree) {
			alert("Please accept the Terms");
		}else if($scope.userName && $scope.password && $scope.mobile && $scope.iAgree){

/*			$scope.checkform2();*/
			if (true) {
				var body = {
					"username": $scope.userName,
					"password": $scope.password,
					"role": $scope.role,
					// "firstName": response.first_name,
					// "middleName": response.middle_name,
					// "lastName": response.last_name,
					"email": $scope.userName,
					"phoneNumber": $scope.mobile
				}
				// alert("success");
				$scope.callRegService(body);
			}
	  }
	  else{
		  $scope.loginMessage = "Please enter your User Name / Password";
		  alert("Please enter all fields");
	  }
	};

	// registration through facebook
	$scope.myFacebookRegistration = function () {
		// job-seeker role uuid
		// $scope.role = "e7c5f5f2-d2e1-4ae6-bf66-bff67bef90b1";
		$scope.role = "jobseeker";
		FB.login(function(){
			//to share a post with text in message: ''
			// FB.api('/me/feed', 'post', {message: 'Hello, world!'});
			facebookService.getMyDetails()
				.then(function(response) {
					console.log(response);
					//for profile picture "http://graph.facebook.com/"+response.id+"/picture";
					// console.log("http://graph.facebook.com/"+response.id+"/picture");

					// old service
					// var body = {
					//  "username": response.email,
					//  "role": $scope.role,
					//  "status":"new user",
					//  "socialNetwork":"facebook",
					//  "details":{
					// 	 "id": response.id,
					// 	 "firstName": response.first_name,
					// 	 "middleName": response.middle_name,
					// 	 "lastName": response.last_name,
					// 	 "gender": response.gender,
					// 	 "email": response.email,
					// 	 "profilePicPath": "http://graph.facebook.com/"+response.id+"/picture"
					//  }
					// }

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
					$scope.callRegService(body);
				}
			);
		// }, {scope: 'email, publish_actions, user_likes',
		}, {scope: 'email, publish_actions',
		return_scopes: true});
	}

	// register a recruiter
$scope.signUpRecruiter = function() {
	// job recruiter role uuid
	// $scope.role = "1a6decf9-86c7-47ae-9776-24ed7ece6462";
	$scope.role = "recruiter";
	if (!$scope.iAgreeRec) {
		alert("Please accept the Terms");
	}else if($scope.userNameRec && $scope.passwordRec && $scope.mobileRec && $scope.iAgreeRec){

/*		$scope.checkform2();*/
		if (true) {
			var body = {
				"username": $scope.userNameRec,
				"password": $scope.passwordRec,
				"role": $scope.role,
				// "firstName": response.first_name,
				// "middleName": response.middle_name,
				// "lastName": response.last_name,
				"email": $scope.userNameRec,
				"phoneNumber": $scope.mobileRec
			}
			// alert("success");
			$scope.callRegService(body);
		}
	}
	else{
		$scope.loginMessage = "Please enter your User Name / Password";
		alert("Please enter all fields");
	}
};

// registration through facebook
$scope.myFacebookRegistrationRec = function () {
	// job recruiter role uuid
	// $scope.role = "1a6decf9-86c7-47ae-9776-24ed7ece6462";
	$scope.role = "recruiter";
	FB.login(function(){
			//to share a post with text in message: ''
			// FB.api('/me/feed', 'post', {message: 'Hello, world!'});
			facebookService.getMyDetails()
				.then(function(response) {
					console.log(response);
					//for profile picture "http://graph.facebook.com/"+response.id+"/picture";
					// console.log("http://graph.facebook.com/"+response.id+"/picture");

					// old service
					// var body = {
					//  "username": response.email,
					//  "role": $scope.role,
					//  "status":"new user",
					//  "socialNetwork":"facebook",
					//  "details":{
					// 	 "id": response.id,
					// 	 "firstName": response.first_name,
					// 	 "middleName": response.middle_name,
					// 	 "lastName": response.last_name,
					// 	 "gender": response.gender,
					// 	 "email": response.email,
					// 	 "profilePicPath": "http://graph.facebook.com/"+response.id+"/picture"
					//  }
					// }

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
					$scope.callRegService(body);
				}
			);
		// }, {scope: 'email, publish_actions, user_likes',
		}, {scope: 'email, publish_actions',
		return_scopes: true});
	}

	$scope.callRegService = function(body) {
		// show loader
		$rootScope.showLoader();

		var res = $http({
			method: 'POST',
			url: window.__env.apiUrl+'/signup',
			// url: 'http://13.126.83.252:9060/users',
			// headers: {'Authorization': valuesToBasic},
			data: body
		});

		res.success(function(data, status, headers, config) {
			if((status >= 200 || status < 300)){
				$scope.isRegistered = true;
				 $scope.loginMessage = '';
				//  alert("Registered Succesfully");
				 // hide loader
				 $rootScope.hideLoader();

				 // if jobseeker registers - login and redirect to resume upload
				if ($scope.role == 'jobseeker') {
					alert("Registered Succesfully");

					// show loader
					$rootScope.showLoader();
					// alert("Valid");

					var valuesToBasic = 'Basic ' + btoa($scope.userName + ':' + $scope.password);
					// console.log(valuesToBasic);

					var userobj = {};
					userobj.userName = $scope.userName;
					userobj.pass = $scope.password;
					// var res = $http.get('http://13.126.83.252:9060/login', userobj);
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

							// hide loader
							$rootScope.hideLoader();

							$location.path('/register');
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

				 // Making the fields empty
					$scope.userName='';
					$scope.password='';
					$scope.mobile = '';
					$scope.iAgree = '';

					$scope.userNameRec='';
					$scope.passwordRec='';
					$scope.mobileRec = '';
					$scope.iAgreeRec = '';
					if ($scope.role == 'recruiter') {
						$scope.role = '';
						// $location.path('/employer-home');
						$location.path('/registration-success');
						// $rootScope.pageRefresh();
					}else {
						// $scope.role = '';
						// $location.path('/employee-home');
						// $rootScope.pageRefresh();
					}
				//  window.location.reload();
			}
			else{
				$scope.loginMessage =  status;
				alert("Error in Registering");
				// hide loader
				$rootScope.hideLoader();
			}

		});
		res.error(function(data, status, headers, config) {
				console.log(data);
				if (status == 400 && data.reason == "Username already Exists..!!") {
					alert(data.reason);

					// hide loader
					$rootScope.hideLoader();
				}else {
					alert("Server error - " + data.reason);

					// hide loader
					$rootScope.hideLoader();
				}
		});
	}

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
      /*  gapi.signin.render('signInButton',
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
        );*/

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
			// job-seeker role uuid
			if ($scope.userRole == 'jobSeeker') {
				// $scope.role = "e7c5f5f2-d2e1-4ae6-bf66-bff67bef90b1";
				$scope.role = "jobseeker";
			}
			if ($scope.userRole == 'jobRecruiter') {
				// $scope.role = "1a6decf9-86c7-47ae-9776-24ed7ece6462";
				$scope.role = "recruiter";
			}

			console.log(userInfo);
		    // You can check user info for domain.
		    if(userInfo['domain'] == 'mycompanydomain.com') {
		        // Hello colleague!
		    }

				// old service
				// var body = {
				//  "username": userInfo.emails[0].value,
				//  "role": $scope.role,
				//  "status":"new user",
				//  "socialNetwork":"googleplus",
				//  "details":{
				// 	 "id": userInfo.id,
				// 	 "firstName": userInfo.name.givenName,
				// 	 "middleName": "",
				// 	 "lastName": userInfo.name.familyName,
				// 	 "gender": userInfo.gender,
				// 	 "email": userInfo.emails[0].value,
				// 	 "profilePicPath": userInfo.image.url
				//  }
				// }


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
				$scope.callRegService(body);

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

});
