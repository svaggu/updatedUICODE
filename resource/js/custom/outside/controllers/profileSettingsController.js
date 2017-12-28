app.controller('profileSettingsController', function($scope, $location, $rootScope, $http, callService, fileUploadService) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData, returnData;
	var user = localStorage.getItem('isCheckUser');
	var userRole = localStorage.getItem('userRole');

	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employee-home');
	}else {
		accessData = angular.fromJson(window.localStorage['userObj']);
		returnData = angular.fromJson(window.localStorage['userDetailsObj']);
		// if recruiter -- hide save button and show respective header
		if (userRole == 'recruiter' || userRole == 'recruiterAdmin') {
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

			// default resume - check if exists
			if ($rootScope.defaultResume != undefined) {
				$scope.defaultResumeId = $rootScope.defaultResume;
			}
		}

		// to get resume details
		$scope.getResumeDetails = function() {

			// show loader
			$rootScope.showLoader();

			// get resumes list of job Seeker when he login
			var getResumesServiceUrl = "/resumes";
			var successMsg = 'Success';
			callService.callGetService(getResumesServiceUrl, successMsg, userRole).then(function(response) {
				console.log(response);
				$scope.hideGraph = false;
				$scope.showNoGraph = false;

				if (response.status >= 200 || response.status < 300) {
					$scope.coverLetterArr = [];
					$scope.profileDetails = [];

					var coverLetterArr = [];
					var profileDetails = [];

					// to cover letters array
					response.data.resumes.forEach(function(element) {
						if(element.coverLetter != "") {
							coverLetterArr.push(element.coverLetter);
						}
					}, this);

					$scope.coverLetterArr = coverLetterArr;
					$scope.profileDetails = profileDetails;
					console.log($scope.coverLetterArr);
					$scope.resumesList = response.data;
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

		// to get job alerts
		$scope.getJobAlerts = function() {

			// show loader
			$rootScope.showLoader();

			// get resumes list of job Seeker when he login
			var getJobAlertsServiceUrl = "/profiles/jobs/createAlert";
			var successMsg = 'Success';
			callService.callGetService(getJobAlertsServiceUrl, successMsg, userRole).then(function(response) {
				console.log(response);

				if (response.status >= 200 || response.status < 300) {
					$scope.alertsList = response.data;
					// hide loader
					$rootScope.hideLoader();
				}else {
					$scope.alertsList = [];
					// hide loader
					$rootScope.hideLoader();
				}
			}).catch (function (error){
				console.log(error);
				$scope.alertsList = [];
				// hide loader
				$rootScope.hideLoader();
			});
		}

		// get profile details
		var getProfileDetailsServiceUrl = '/profiles/viewProfile';
		var successMsg = 'Success';
		callService.callGetService(getProfileDetailsServiceUrl, successMsg, userRole).then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
				$rootScope.getProfileDetails = response.data;
				$rootScope.getProfileDetailsToEdit = response.data;
				if ($rootScope.getProfileDetails.organization) {
					// get Organisation details
					$scope.getOrganisationDetails();
				}
			}
			else{
				// alert("Error in retrieving Jobs");

			}
		}).catch (function (error){
			console.log(error);
			// alert("Server error in retrieving Jobs");

		});

		// get Organisation details
		$scope.getOrganisationDetails = function () {

			var getOrgDetailsServiceUrl = '/organizations/profiles';
			var successMsg = 'Success';
			callService.callGetService(getOrgDetailsServiceUrl, successMsg, userRole).then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					$rootScope.getOrgDetails = response.data.organizations[0];
					$rootScope.getOrgDetailsToEdit = response.data.organizations[0];
					$rootScope.addressToEdit = response.data.organizations[0].address;
				}
				else{
					// alert("Error in retrieving Jobs");

				}
			}).catch (function (error){
				console.log(error);
				// alert("Server error in retrieving Jobs");

			});
		}

		// get cover letters
		$scope.getCoverLetter = function () {
			var getCoverLetterService = '/coverLetters';
			var successMsg = 'Success';
			callService.callGetService(getCoverLetterService, successMsg, userRole).then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					$scope.coverLetterArr2 = response.data;
				}
				else{
					$scope.coverLetterArr2 = [];
				}
			}).catch (function (error){
				console.log(error);
				alert(error.data.reason);
				$scope.coverLetterArr2 = [];
			});
		}


		// check and assign profile-settings menu
		if (userRole == 'jobseeker') {
			$scope.getResumeDetails();
			$scope.getJobAlerts();
			$scope.getCoverLetter();
			// tabs id's
			$("#profileJSkId").css("display", "block");
			$("#editUserProfileId").css("display", "block");
			$("#alertsId").css("display", "block");
			$("#coverLettersId").css("display", "block");
			$("#settingsId").css("display", "block");

			$("#profileRecId").css("display", "none");
			$("#editProfileRAdmId").css("display", "none");
			$("#usersRAdmId").css("display", "none");

			// add active to css class
			$("#profileJSkId").addClass("active");
			$("#profileDataId").addClass("active");

			// data - tabs id
			// $("#profileDataId").css("display", "block");
			// $("#alertsDataId").css("display", "block");
			// $("#coverLettersDataId").css("display", "block");
			// $("#settingsDataId").css("display", "block");
			//
			// $("#profileRecDataId").css("display", "none");
			// $("#editProfileDataId").css("display", "none");
		}else if (userRole == 'recruiter') {
			// tab id's
			$("#profileRecId").css("display", "block");
			$("#editUserProfileId").css("display", "block");
			$("#settingsId").css("display", "block");

			$("#profileJSkId").css("display", "none");
			$("#editProfileRAdmId").css("display", "none");
			$("#usersRAdmId").css("display", "none");
			$("#alertsId").css("display", "none");
			$("#coverLettersId").css("display", "none");

			// add active to css class
			$("#profileRecId").addClass("active");
			$("#profileRecDataId").addClass("active");

			// data - tabs id
			// $("#profileRecDataId").css("display", "block");
			// $("#settingsDataId").css("display", "block");
			//
			// $("#editProfileDataId").css("display", "none");
			// $("#profileDataId").css("display", "none");
			// $("#alertsDataId").css("display", "none");
			// $("#coverLettersDataId").css("display", "none");

			// get Organisation details
			$scope.getOrganisationDetails();
		}else if (userRole == 'recruiterAdmin') {
			// tab id's
			$("#profileRecId").css("display", "block");
			$("#editProfileRAdmId").css("display", "block");
			$("#usersRAdmId").css("display", "block");
			$("#settingsId").css("display", "block");

			$("#profileJSkId").css("display", "none");
			$("#editUserProfileId").css("display", "none");
			$("#alertsId").css("display", "none");
			$("#coverLettersId").css("display", "none");

			// add active to css class
			$("#profileRecId").addClass("active");
			$("#profileRecDataId").addClass("active");

			// data - tabs id
			// $("#profileRecDataId").css("display", "block");
			// $("#editProfileDataId").css("display", "block");
			// $("#settingsDataId").css("display", "block");
			//
			// $("#profileDataId").css("display", "none");
			// $("#alertsDataId").css("display", "none");
			// $("#coverLettersDataId").css("display", "none");

			// get Organisation details
			// $scope.getOrganisationDetails();
		}
	}

	$scope.gotoEditResume = function(items){
		$rootScope.pageToTop();
		$rootScope.resumeDetailsToEdit = items;
		localStorage.setItem('setResumeId', items.uuid);
		$location.path('/edit_profile');
	}

	$scope.gotoGraphicalResume = function(items){
		$rootScope.pageToTop();
		$rootScope.toGraphicalResume = items;
		localStorage.setItem('setResumeId', items.uuid);
		$location.path('/view_resume');
	}

	// goto Single Job Detail
	$scope.gotoSingleJobDetails = function(items) {
		// console.log(items);
		$rootScope.pageToTop();
		$rootScope.singleJobDetails = items;
		$location.path('/single-job-detail');
	}

	//change Password
	$scope.changePwd = function(){
		// alert("pwd");
		if (!$scope.currPassword) {
			alert('Please enter Current Password');
		} else if ($scope.currPassword == accessData.pass) {
			if($scope.newPassword && $scope.reTypePassword) {
				if ($scope.newPassword == $scope.reTypePassword) {
					// show loader
					$rootScope.showLoader();
					// var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);

					var body = {
						"username": accessData.userName,
						"password": $scope.newPassword
					};

					var changePwdServiceUrl = '/profiles';
					var successMsg = 'Success';
					callService.callPutService(body, changePwdServiceUrl, successMsg, userRole).then(function(response) {
						console.log(response);
						if (response.status >= 200 || response.status < 300) {
							alert("Password Changed Successfully.. ! You will be logged out of the session");
							// hide loader
							$rootScope.hideLoader();
							$rootScope.signOut();
						}
						else{
							alert("Server Error");
							// hide loader
							$rootScope.hideLoader();
						}
					}).catch (function (error){
						console.log(error);
						alert("Server Error");
						// hide loader
						$rootScope.hideLoader();
					});
				}else {
					alert("New Password and Confirm Password Should be same");
				}
			}else {
				alert("Please enter all fields");
			}
		}else {
			alert('Warning! You have entered wrong Password');
		}
	}

	// edit profile
	$rootScope.editProfile = function () {
		if ($rootScope.getProfileDetailsToEdit.firstName || $rootScope.getProfileDetailsToEdit.lastName ||
				$rootScope.getProfileDetailsToEdit.email || $rootScope.getProfileDetailsToEdit.phoneNumber) {

			// show loader
			$rootScope.showLoader();

			var body = {
				"username": accessData.userName,
				"firstName": $rootScope.getProfileDetailsToEdit.firstName,
				"middleName": $rootScope.getProfileDetailsToEdit.middleName,
				"lastName": $rootScope.getProfileDetailsToEdit.lastName,
				"email": $rootScope.getProfileDetailsToEdit.email,
				"phoneNumber": $rootScope.getProfileDetailsToEdit.phoneNumber
			};

			var editProfileServiceUrl = '/profiles/editProfile';
			var successMsg = 'Success';
			callService.callPutService(body, editProfileServiceUrl, successMsg, userRole).then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					alert("Profile Updated Successfully");
					if (userRole == 'recruiterAdmin') {
						// hide loader
						$rootScope.hideLoader();
						$rootScope.editOrganisation();
					}else {
						window.location.reload();
						// hide loader
						$rootScope.hideLoader();
					}
				}
				else{
					// alert("Error in retrieving Jobs");

				}
			}).catch (function (error){
				console.log(error);
				// alert("Server error in retrieving Jobs");
				// hide loader
				$rootScope.hideLoader();
			});
		}else {
			alert("Please fill all Details");
		}
	}

	// edit organization
	$rootScope.editOrganisation = function () {
		if ($rootScope.getOrgDetailsToEdit.name || $rootScope.addressToEdit.line1 ||
				$rootScope.getOrgDetailsToEdit.phone[0].number || $rootScope.addressToEdit.city ||
				$rootScope.addressToEdit.state || $rootScope.addressToEdit.country ||
				$rootScope.addressToEdit.zip) {

				// show loader
				$rootScope.showLoader();

				var address = {
					"line1" : $rootScope.addressToEdit.line1,
					"city" : $rootScope.addressToEdit.city,
					"state" : $rootScope.addressToEdit.state,
					"country" : $rootScope.addressToEdit.country,
					"zip" : $rootScope.addressToEdit.zip,
				};

			var body = {
				"orgUuid": $rootScope.getOrgDetails.uuid,
				"name": $rootScope.getOrgDetailsToEdit.name,
				"status": "active",
				"description": "",
				"address":{
					"line1": $rootScope.addressToEdit.line1,
					"line2": "",
					"city": address.city,
					"state": address.state,
					"country": address.country,
					"zip": address.zip,
					"googleMapsUri": ""
				},
				"phone":[{
					"name": "",
					"number": $rootScope.getOrgDetailsToEdit.phone[0].number
				}]
			}

			var editProfileServiceUrl = '/organizations';
			var successMsg = 'Success';
			callService.callPutService(body, editProfileServiceUrl, successMsg, userRole).then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					alert("Organisation Updated Successfully");
					// hide loader
					$rootScope.hideLoader();
					window.location.reload();
				}
				else{
					// alert("Error in retrieving Jobs");
					// hide loader
					$rootScope.hideLoader();
				}
			}).catch (function (error){
				console.log(error);
				// alert("Server error in retrieving Jobs");
				// hide loader
				$rootScope.hideLoader();
			});
		}else {
			alert("Please fill all Details");
		}
	}

	// add user
	$scope.addRecruiter = function() {
		if ($scope.addUser.firstName || $scope.addUser.lastName || $scope.addUser.email ||
				$scope.addUser.password || $scope.addUser.phoneNumber) {

			// show loader
			$rootScope.showLoader();

			var body = {
				"firstName": $scope.addUser.firstName,
        		"lastName": $scope.addUser.lastName,
				"password": $scope.addUser.password,
				"role": "recruiter",
				"email": $scope.addUser.email,
				"phone": $scope.addUser.phoneNumber,
				"socialProfile":""
			};

			var addRecruiterServiceUrl = '/organizations/recruiter';
			var successMsg = 'Success';
			callService.callPostService(body, addRecruiterServiceUrl, successMsg, userRole).then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					alert("Recruiter Added Successfully");
					// hide loader
					$rootScope.hideLoader();
					window.location.reload();
				}
				else{
					alert(response.data.reason);
					// hide loader
					$rootScope.hideLoader();
				}
			}).catch (function (error){
				console.log(error);
				alert(error.data.reason);
				// hide loader
				$rootScope.hideLoader();
			});
		}else {
			alert("Please insert All fields");
		}
	}

	$scope.editCoverLetter = {};
	// to show cover letter data in cover letters tab
	$scope.toDisplayCoverLetter = function (item) {
		$scope.displayCoverLetter = item;
		$scope.editCoverLetter.uuid = item.uuid;
		$scope.editCoverLetter.coverLetterTitle = item.title;
		$scope.editCoverLetter.coverLetterData = item.description;
	}

	// to show data in cover letter 
	$scope.toCoverLetter = function (data) {
		$scope.uuid = data.uuid;
		$scope.coverLetterData = data.coverLetter;
	}

	// add cover letter
	$scope.addCoverLetter = function () {
		if($scope.coverLetterTitle && $scope.coverLetterData) {

			// show loader
			$rootScope.showLoader();

			var body = {
				"resume": $rootScope.defaultResume.uuid,
				"profile": $rootScope.defaultResume.profile,
				"title": $scope.coverLetterTitle,
				"description": $scope.coverLetterData
			};
			var addCoverLetterService = '/coverLetters';
			var successMsg = 'Success';
			callService.callPostService(body, addCoverLetterService, successMsg, userRole).then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					alert("Cover Letter added Successfully");
					// window.location.reload();
					$scope.getCoverLetter();
					// hide loader
					$rootScope.hideLoader();
				}
				else{
					alert(response.data.reason);
					// hide loader
					$rootScope.hideLoader();
				}
			}).catch (function (error){
				console.log(error);
				// hide loader
				$rootScope.hideLoader();
				alert(error.data.reason);
			});
		}else {
			alert('Please insert any Data');
		}
	}

	// edit cover letter
	$scope.editCoverLetter = function () {
		if($scope.editCoverLetter.coverLetterTitle && $scope.editCoverLetter.coverLetterData) {

			// show loader
			$rootScope.showLoader();

			var body = {
				"resume": $rootScope.defaultResume.uuid,
				"profile": $rootScope.defaultResume.profile,
				"title": $scope.editCoverLetter.coverLetterTitle,
				"description": $scope.editCoverLetter.coverLetterData
			};
			var editCoverLetterService = '/coverLetters/' + $scope.editCoverLetter.uuid;
			var successMsg = 'Success';
			callService.callPutService(body, editCoverLetterService, successMsg, userRole).then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					alert("Cover Letter edited Successfully");
					// window.location.reload();
					$scope.getCoverLetter();
					// hide loader
					$rootScope.hideLoader();
				}
				else{
					alert(response.data.reason);
					// hide loader
					$rootScope.hideLoader();
				}
			}).catch (function (error){
				console.log(error);
				// hide loader
				$rootScope.hideLoader();
				alert(error.data.reason);
			});
		}else {
			alert('Please insert any Data');
		}
	}

	// set default resume
	$scope.setDefaultResume = function (items) {

		// show loader
		$rootScope.showLoader();

		var body = {};
		console.log(items.uuid);
		var defaultProfileUrl = '/profiles/defaultResume/' + items.uuid;
		var successMsg = 'Success';
		callService.callPutService(body, defaultProfileUrl, successMsg, userRole).then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
				alert("Default Profile is set Successfully");
				// hide loader
				$rootScope.hideLoader();
			}
			else{
				// hide loader
				$rootScope.hideLoader();
			}
		}).catch (function (error){
			console.log(error);
			alert(error.data);
			// hide loader
			$rootScope.hideLoader();
		});
	}

	// delete resume
	$scope.deleteResume = function (items) {
		console.log(items);
		// show loader
		$rootScope.showLoader();

		var body = {};
		console.log(items.uuid);
		var defaultProfileUrl = '/resumes/delete/' + items.uuid;
		var successMsg = 'Success';
		callService.callPutService(body, defaultProfileUrl, successMsg, userRole).then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
				alert("Resume Deleted Successfully");
				// page scroll to top
				$rootScope.pageToTop();
				// to refresh list of resumes
				$scope.getResumeDetails();
				// hide loader
				$rootScope.hideLoader();
			}
			else{
				// hide loader
				$rootScope.hideLoader();
			}
		}).catch (function (error){
			console.log(error);
			alert(error.data);
			// hide loader
			$rootScope.hideLoader();
		});
	}

	// click file upload button
	// $('#OpenResumeUpload').click(function(){
	// 	$('#resumeupload').trigger('click');
	// });

	$scope.openFileSelect = function (items) {
		// console.log("open file");
		// $('#resumeupload').trigger('click');
		// alert("Please upload a new Resume \n It will be replaced in a short time");
		var txt;
		var r = confirm("Please upload a new Resume, the selected resume will replaced. \n Note: This can't be undone");
		if (r == true) {
			txt = "You pressed OK!";
			$rootScope.delReplaceResume = items;
			$rootScope.pageToTop();
			$location.path('/register');
		} else {
			txt = "You pressed Cancel!";
		}
	}

	// $("#resumeupload").change(function(){
	// 	// alert("The text has been changed.");
	// 	$scope.uploadFile();
	// });

	$scope.uploadFile = function(){
		var file = $scope.myFileReplace;

		console.log('file is ' );
		console.dir(file);

	
		if (file == '' || file == undefined) {
			alert("Please select a File");
		}else if ($rootScope.allResumes.length >= 5) {
			alert("Warning ! You can upload only 5 Resumes..");
		}else {
			// show loader
			// $rootScope.showLoader();
			// var uploadUrl = window.__env.apiUrl+"/resumes";
			// var successMsg = 'Resume Uploaded Successfully';
			// fileUploadService.uploadFileToUrl(file, uploadUrl, successMsg, 'jobseeker', '/myprofiles').then(function(response) {
			// 	console.log(response);
			// 	// set uploaded resume id to setResumeId-local storage
			// 	localStorage.setItem('setResumeId', response.data.uuid);
			// 	$location.path('/edit_profile');
			// 	// hide loader
			// 	$rootScope.hideLoader();
			// })
			// .catch(error => {
			// 	console.log(error);
			// 	alert(error.data.reason);
			// 	// hide loader
			// 	$rootScope.hideLoader();
			// });
		}
	};
});
