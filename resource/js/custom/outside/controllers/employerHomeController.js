app.controller('employerHomeController', function($scope,$http,$location,$rootScope,facebookService) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	// to signup page
	$scope.gotoSeekerSignup = function(value) {
		localStorage.setItem('signUpActive', value);
		$location.path('/signup')
	}

	$(".postJobsSI").addClass("active");
	$(".applyJobsSI").removeClass("active");
	$(".productsSI").removeClass("active");
	$(".pricingSI").removeClass("active");
	$(".getdemo").removeClass("active");
	$(".signin").removeClass("active");
/*
	// captcha code starts here
	$scope.checkform = function () {
		var why = "";
		
		if($scope.txtInput == "" || $scope.txtInput == undefined || $scope.txtInput == null){
			why += "- Security code should not be empty.\n";
		}
		if($scope.txtInput != ""){
			if($scope.ValidCaptcha($scope.txtInput) == false){
				why += "- Security code did not match.\n";
			}
		}
		if(why != ""){
			alert(why);
			return false;
		}
	}

	//Generates the captcha function
	var a = Math.ceil(Math.random() * 9)+ '';
	var b = Math.ceil(Math.random() * 9)+ '';
	var c = Math.ceil(Math.random() * 9)+ '';
	var d = Math.ceil(Math.random() * 9)+ '';
	var e = Math.ceil(Math.random() * 9)+ '';

	var code = a + b + c + d + e;
	document.getElementById("txtCaptcha").value = code;
	document.getElementById("txtCaptchaDiv").innerHTML = code;
	
	// Validate the Entered input aganist the generated security code function
	$scope.ValidCaptcha = function (){
		var str1 = $scope.removeSpaces(document.getElementById('txtCaptcha').value);
		var str2 = $scope.removeSpaces(document.getElementById('txtInput').value);
		if (str1 == str2){
			$scope.msgFromCaptcha = "success";
			return true;
		}else{
			return false;
		}
	}

	// Remove the spaces from the entered and generated code
	$scope.removeSpaces = function (string){
		return string.split(' ').join('');
	}
	// captcha code ends here*/

		// signin validation
		$scope.validatesignin = function(){
		//	alert("validate Sign in: ");

			if($scope.userName && $scope.pass){
				// alert("Valid");

				/*$scope.checkform();
				if ($scope.msgFromCaptcha == "success")*/
                
				if (true) {
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
							localStorage.setItem('isCheckUser', $rootScope.returnData.uuid);
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

							// hide loader
							$rootScope.hideLoader();

							// get user default profile details
      						$rootScope.getDefaultProfile();

							$location.path('/employer-dashboard');
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
							alert("Please check Login Credentials");
							// hide loader
							$rootScope.hideLoader();
					});
				}
			}else {
				alert("Please give Login Credentials");
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
			// var res = $http.get(window.__env.apiUrl+'/login', userobj);
			var res = $http({
				method: 'GET',
				url: window.__env.apiUrl+'/login',
				headers: {
					'source': body.socialProfiles[0].socialNetworkName,
					'user': body.email,
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

					// hide loader
					$rootScope.hideLoader();

					// get user default profile details
      				$rootScope.getDefaultProfile();

					$location.path('/employer-dashboard');
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
});
