app.controller('editProfileController',['$scope', '$location', '$rootScope', '$http', 'fileUploadService','callService',
			function($scope, $location, $rootScope, $http, fileUploadService,callService) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData, returnData;
	var user = localStorage.getItem('isCheckUser');
	var userRole = localStorage.getItem('userRole');

	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employee-home');
	}else {
		accessData = angular.fromJson(window.localStorage['userObj']);
		returnData = angular.fromJson(window.localStorage['userDetailsObj']);

		var resumeId = localStorage.getItem('setResumeId');
		if (resumeId == undefined) {
			$location.path('/myprofiles');
		}else {
			console.log($rootScope.resumeDetailsToEdit);

			// show loader
			$rootScope.showLoader();
            $scope.list1=[];
  $scope.list2=[];

    // Generate initial model
    for (var i = 1; i <= 3; ++i) {
      $scope.list1.push({ label: "Item A" + i });
      $scope.list2.push({ label: "Item B" + i });
    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function (model) {
      $scope.modelAsJson = angular.toJson(model, true);
    }, true);

			$scope.list1 = {title: 'AngularJS - Drag Me'};
  			$scope.list2 = {};

			// get a single resume on uuid
			var getResumeServiceUrl = '/resumes/' + resumeId;
			var successMsg = 'Success';
			callService.callGetService(getResumeServiceUrl, successMsg, userRole).then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					$scope.resumesDetails = response.data;
					$scope.assignValues();
					// hide loader
					$rootScope.hideLoader();
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
		}

		$(".graphical_resume").addClass("active");
		$(".graphsume").removeClass("active");
		$(".emp_dashboard").removeClass("active");
		$(".myjobs").removeClass("active");
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

		$scope.profilePicPath = "http://13.126.83.252:9058/jobumes/resource/css/img/default_user.png";
		// click file button
		$('#OpenImgUpload').click(function(){
			 $('#imgupload').trigger('click');
		});

		// assign values with variables
		$scope.assignValues = function() {

			$scope.receivedResumeDetails = $scope.resumesDetails[0].updateParsedJson.ResumeParserData;

			$scope.jobProfile = $scope.receivedResumeDetails.JobProfile;

			$scope.personalDetails = {};
			$scope.personalDetails.resumeTitle = $scope.receivedResumeDetails.Objectives;
			$scope.personalDetails.expInYears = '';
			$scope.personalDetails.expInMonths = '';
			$scope.personalDetails.currentCTC = '';
			$scope.personalDetails.currentCTCThousand = '';
			$scope.personalDetails.expectedCTC = '';
			$scope.personalDetails.expectedCTCThousand = '';
			$scope.personalDetails.noticePeriod = '';
			$scope.personalDetails.mobility = '';
			$scope.personalDetails.currentLocation = $scope.receivedResumeDetails.CurrentLocation;
			$scope.personalDetails.preferredLoc = $scope.receivedResumeDetails.PreferredLocation;
			$scope.personalDetails.resumeTitle = '';
			$scope.personalDetails.industry = '';
			$scope.personalDetails.functionalArea = '';
			$scope.personalDetails.role = '';
			$scope.personalDetails.dobInDay = '';
			$scope.personalDetails.dobInMonth = '';
			$scope.personalDetails.dobInYear = '';
			$scope.personalDetails.gender = $scope.receivedResumeDetails.Gender;
			$scope.personalDetails.keySkills = $scope.receivedResumeDetails.Skills;
			$scope.personalDetails.experience = $scope.receivedResumeDetails.Experience;
			$scope.personalDetails.executiveSummary = $scope.receivedResumeDetails.ExecutiveSummary;

			$scope.personalDetails2 = {};
			$scope.personalDetails2.fullName = $scope.receivedResumeDetails.FullName;
			$scope.personalDetails2.firstName = $scope.receivedResumeDetails.FirstName;
			$scope.personalDetails2.lastName = $scope.receivedResumeDetails.LastName;
			$scope.personalDetails2.email = $scope.receivedResumeDetails.Email;
			$scope.personalDetails2.contactNumber = $scope.receivedResumeDetails.Phone;
			$scope.personalDetails2.address = $scope.receivedResumeDetails.FormattedAddress;
			$scope.personalDetails2.resumeTitle = $scope.receivedResumeDetails.ExecutiveSummary;

			$scope.educationDetailsArr = $scope.receivedResumeDetails.SegregatedQualification.EducationSplit;

			// show delete button of education detail, when 2 or more
			// check if the array exists and execute
			if (Array.isArray($scope.educationDetailsArr) == true) {
				if($scope.educationDetailsArr.length > 1) {
					document.getElementById('deleteEducation').style.display = 'block';
				}
			}

			$scope.educationDetails = {};

			// onchange click on education details
			$scope.gotoEditEduDetails = function(item) {
				// $scope.itemEdu = item;
				// console.log(item);
				$scope.indexEdu = $scope.educationDetailsArr.indexOf(item);
				console.log($scope.educationDetailsArr);
				// $scope.onCngeEduDetails();
				console.log($scope.indexEdu);

				// set id from array position
				$scope.educationDetails.id = $scope.indexEdu;
				$scope.educationDetails.degree = item.Degree;
				$scope.educationDetails.completedYear = item.EndDate;
				$scope.educationDetails.university = item.Institution.Name;
				if (item.Aggregate != null) {
					if (item.Aggregate.hasOwnProperty('Value')) {
						$scope.educationDetails.percentage = item.Aggregate.Value;
					}
				}
				if (item.hasOwnProperty('Others')) {
					$scope.educationDetails.specialization = item.Others.Specialization;
					$scope.educationDetails.courseType = item.Others.CourseType;
				}
			}
			
			var tempObjEd;

			// on change of education details
			$scope.onCngeEduDetails = function (id) {
				// $scope.indexEdu = $scope.educationDetailsArr.indexOf($scope.itemEdu);
				// $scope.educationDetailsArr.splice($scope.indexEdu, 1);
				// tempObjEd = {
				// 	"Aggregate": {
				// 		"MeasureType": "Percentage",
				// 		"Value": $scope.educationDetails.percentage
				// 	},
				// 	"EndDate": $scope.educationDetails.completedYear,
				// 	"StartDate": "",
				// 	"Others": {
				// 		"Specialization": $scope.educationDetails.specialization,
				// 		"CourseType": $scope.educationDetails.courseType
				// 	},
				// 	"Degree": $scope.educationDetails.degree,
				// 	"Institution": {
				// 		"Country": "India",
				// 		"State": "Telangana",
				// 		"City": "Hyderabad",
				// 		"Type": "University",
				// 		"Name": $scope.educationDetails.university
				// 	}
				// }
				// $scope.educationDetailsArr.push(tempObjEd);

				$scope.educationDetailsArr[id].Degree = $scope.educationDetails.degree;
				$scope.educationDetailsArr[id].EndDate = $scope.educationDetails.completedYear;
				if ($scope.educationDetailsArr[id].hasOwnProperty('Aggregate')) {
					$scope.educationDetailsArr[id].Aggregate.Value = $scope.educationDetails.percentage;
				}
				if ($scope.educationDetailsArr[id].hasOwnProperty('Others')) {
					$scope.educationDetailsArr[id].Others.Specialization = $scope.educationDetails.specialization;
					$scope.educationDetailsArr[id].Others.CourseType = $scope.educationDetails.courseType;
				}
				if ($scope.educationDetailsArr[id].hasOwnProperty('Institution')) {
					$scope.educationDetailsArr[id].Institution.Name = $scope.educationDetails.university;
				}
				console.log($scope.educationDetailsArr);
			}

			// add new educational qualification
			$scope.addNewQualification = function () {
				$scope.educationDetails.degree = "New Qualification";
				$scope.educationDetails.completedYear = "";
				$scope.educationDetails.percentage = "";
				$scope.educationDetails.university = "";
				$scope.educationDetails.specialization = "";
				$scope.educationDetails.courseType = "";

				tempObjEd = {
					"Aggregate": {
						"MeasureType": "Percentage",
						"Value": ""
					},
					"EndDate": "",
					"StartDate": "",
					"Others": {
						"Specialization": "",
						"CourseType": ""
					},
					"Degree": $scope.educationDetails.degree,
					"Institution": {
						"Country": "India",
						"State": "Telangana",
						"City": "Hyderabad",
						"Type": "University",
						"Name": ""
					}
				}
				// $scope.educationDetailsArr.push(tempObjEd);
				$scope.educationDetailsArr.splice(0, 0, tempObjEd);

				// to set the items from education history's array - last element
				// $scope.itemEdu = $scope.educationDetailsArr.length - 1;
				// $scope.itemEdu = $scope.educationDetailsArr[0];

				// to set the index of id
				$scope.indexEdu = $scope.educationDetailsArr.indexOf(tempObjEd);
				$scope.educationDetails.id  = $scope.indexEdu;
			}

			// console.log($scope.educationDetailsArr.findIndex(x => x.Degree=="B TECH"));
			
			$scope.educationDetails.degree = '';
			$scope.educationDetails.completedYear = '';
			$scope.educationDetails.percentage = '';

			// check if the array exists and execute
			if (Array.isArray($scope.educationDetailsArr) == true) {
				if ($scope.educationDetailsArr.length > 0) {
					$scope.gotoEditEduDetails($scope.educationDetailsArr[0], 0);
					// $scope.educationDetails.degree = $scope.educationDetailsArr[0].Degree;
					// $scope.educationDetails.completedYear = $scope.educationDetailsArr[0].EndDate;
				
					// if ($scope.educationDetailsArr[0].Aggregate != null ||
					// 		$scope.educationDetailsArr[0].Aggregate != undefined) {
					// 	$scope.educationDetails.percentage = $scope.educationDetailsArr[0].Aggregate.Value;
					// }
				
				}
			}
			$scope.educationDetails.specialization = '';
			$scope.educationDetails.university = '';
			$scope.educationDetails.courseType = '';

			

			$scope.primaryskill = {};
			$scope.primaryskill.skillName = [];
			$scope.primaryskill.skillExp = [];
			$scope.primaryskill.year = [];
			$scope.primaryskill.skillRating = [];
			$scope.primaryskill.skillStatus = [];

			$scope.repeatSkillSets = $scope.receivedResumeDetails.SkillKeywords.SkillSet;
			$scope.repeatSkillSets.forEach(function(element, i) {
				$scope.primaryskill.skillName.push(element.Skill);
				$scope.primaryskill.skillExp.push(element.ExperienceInMonths);
				$scope.primaryskill.year.push(element.LastUsed);

				// for rating
				if (element.hasOwnProperty('Others')) {
					$scope.primaryskill.skillRating.push(element.Others.Rating);
				}else {
					$scope.primaryskill.skillRating.push("");
				}

				// for skill status - Active, Inactive
				if (element.hasOwnProperty('Others')) {
					$scope.primaryskill.skillStatus.push(element.Others.SkillStatus);
				}else {
					$scope.primaryskill.skillStatus.push("");
				}
			})

			// add new skill
			$scope.addNewSkills = function () {
				var tempAddSkill = {
					"ExperienceInMonths": "0",
					"LastUsed": "",
					"Evidence": "",
					"FormattedName": "",
					"Alias": "",
					"Type": "",
					"Skill": "",
					"Others":{
						"Rating": "",
						" SkillStatus": "active"
					}
				}
				$scope.primaryskill.skillName.push("");
				$scope.primaryskill.skillExp.push("");
				$scope.primaryskill.year.push("");
				$scope.primaryskill.skillRating.push("");
				$scope.primaryskill.skillStatus.push("");

				// push into array, to increase in ng-repeat
				$scope.repeatSkillSets.push(tempAddSkill);
				console.log($scope.repeatSkillSets);
			}

			$scope.saveSkills = function() {
				console.log($scope.primaryskill.skillName);
			}

			$scope.removePrimaryskill = function(id) {
                alert(id);
				console.log(id);
				// $scope.repeatSkillSets.splice(id, 1);
				// console.log($scope.repeatSkillSets);
				// $scope.primaryskill.skillName = [];
				// $scope.primaryskill.skillExp = [];
				// $scope.primaryskill.year = [];
				// $scope.repeatSkillSets.forEach(function(element, i) {
				// 	$scope.primaryskill.skillName.push(element.Skill);
				// 	$scope.primaryskill.skillExp.push(element.ExperienceInMonths);
				// 	$scope.primaryskill.year.push(element.LastUsed);
				// })
				
				$scope.primaryskill.skillStatus[id] = "inactive";
				//$scope.list1[id] = "inactive";
				console.log($scope.primaryskill.skillStatus);
				$("#skillsdetails").hide().fadeIn('fast');
			}

			// click checkbox to edit
			// $('#editAnchorBtn').click(function(){
			// 	console.log("clicked");
			// 	 $('#editTextBox').trigger('click');
			// });

			$scope.empBeanArr = $scope.receivedResumeDetails.SegregatedExperience.WorkHistory;
			
			// show delete button of history detail, when 2 or more
			// check if the array exists and execute
			if (Array.isArray($scope.empBeanArr) == true) {
				if($scope.empBeanArr.length > 1) {
					document.getElementById('deleteExperience').style.display = 'block';
				}
			}

			$scope.empBean = {};

			// $scope.empBean.employerName = '';
			// $scope.empBean.status = '';
			// $scope.empBean.designation = '';
			// $scope.empBean.startMonth = '';
			// $scope.empBean.startYear = '';
			// $scope.empBean.endMonth = '';
			// $scope.empBean.endYear = '';

			// onchange click on employment history
			$scope.gotoEditHistoryDetails = function(item) {
				$scope.itemWorkHis = item;
				console.log(item);
				$scope.indexWorkHis = $scope.empBeanArr.indexOf(item);
				console.log($scope.empBeanArr);
				// $scope.onCngeWorkHisDetails();
				console.log($scope.indexWorkHis);
				// console.log(item);

				// set id from array position
				$scope.empBean.id = $scope.indexWorkHis;
				$scope.empBean.employerName = item.Employer;
				$scope.empBean.status = item.EmployerStatus;
				if (item.hasOwnProperty('JobProfile')) {
					$scope.empBean.designation = item.JobProfile.Title;
				}
				// $scope.empBean.startMonth = '';
				// $scope.empBean.startYear = '';
				// $scope.empBean.endMonth = '';
				// $scope.empBean.endYear = '';
			}
			// check if the array exists and execute
			if (Array.isArray($scope.empBeanArr) == true) {
				if ($scope.empBeanArr.length > 0) {
					$scope.gotoEditHistoryDetails($scope.empBeanArr[0]);
				}
			}

			var tempObjWorkHis;

			// on change of employ work history details
			$scope.onCngeWorkHisDetails = function (id) {
				// $scope.indexWorkHis = $scope.empBeanArr.indexOf($scope.itemWorkHis);
				// $scope.empBeanArr.splice($scope.indexWorkHis, 1);
				// tempObjWorkHis = {
				// 	"Projects": [
				// 		{
				// 		"TeamSize": "",
				// 		"ProjectName": "",
				// 		"UsedSkills": ""
				// 		}
				// 	],
				// 	"JobDescription": "",
				// 	"EndDate": "",
				// 	"StartDate": "",
				// 	"JobPeriod": "",
				// 	"JobLocation": {
				// 		"IsoCountry": "",
				// 		"EmployerCountry": "",
				// 		"EmployerState": "",
				// 		"EmployerCity": ""
				// 	},
				// 	"JobProfile": {
				// 		"RelatedSkills": "",
				// 		"Alias": "",
				// 		"FormattedName": $scope.empBean.designation,
				// 		"Title": $scope.empBean.designation
				// 	},
				// 	"Employer": $scope.empBean.employerName,
				// 	"EmployerStatus": $scope.empBean.status
				// }
				// $scope.empBeanArr.push(tempObjWorkHis);

				$scope.empBeanArr[id].Employer = $scope.empBean.employerName;
				$scope.empBeanArr[id].EmployerStatus = $scope.empBean.status;
				if ($scope.empBeanArr[id].hasOwnProperty('JobProfile')) {
					$scope.empBeanArr[id].JobProfile.FormattedName = $scope.empBean.designation;
					$scope.empBeanArr[id].JobProfile.Title = $scope.empBean.designation;
				}

				console.log($scope.empBeanArr);
			}

			// add new work history
			$scope.addNewWorkHistory = function () {
				$scope.empBean.employerName = "New History";
				$scope.empBean.status = '';
				$scope.empBean.designation = "";
				// $scope.empBean.startMonth = '';
				// $scope.empBean.startYear = '';
				// $scope.empBean.endMonth = '';
				// $scope.empBean.endYear = '';

				tempObjWorkHis = {
					"Projects": [
						{
						"TeamSize": "",
						"ProjectName": "",
						"UsedSkills": ""
						}
					],
					"JobDescription": "",
					"EndDate": "",
					"StartDate": "",
					"JobPeriod": "",
					"JobLocation": {
						"IsoCountry": "",
						"EmployerCountry": "",
						"EmployerState": "",
						"EmployerCity": ""
					},
					"JobProfile": {
						"RelatedSkills": "",
						"Alias": "",
						"FormattedName": $scope.empBean.designation,
						"Title": $scope.empBean.designation
					},
					"Employer": $scope.empBean.employerName,
					"EmployerStatus": $scope.empBean.status
				}
				// $scope.empBeanArr.push(tempObjWorkHis);
				$scope.empBeanArr.splice(0, 0, tempObjWorkHis);

				// to set the items of work history's last element
				// $scope.itemWorkHis = $scope.empBeanArr.length - 1;
				$scope.itemWorkHis = $scope.empBeanArr[0];

				// to set the index of id
				$scope.indexWorkHis = $scope.empBeanArr.indexOf(tempObjWorkHis);
				$scope.empBean.id  = $scope.indexWorkHis;
			}

			$scope.language = {};
			$scope.language.languageName = $scope.receivedResumeDetails.LanguageKnown;
			$scope.language.read = '';
			$scope.language.write = '';
			$scope.language.speak = '';

			$scope.certificationArr = $scope.receivedResumeDetails.Certification;
			$scope.certification = {};

			// show delete button of history detail, when 2 or more
			if(Array.isArray($scope.certification) == true) {
				if($scope.certificationArr.length > 1) {
					document.getElementById('deleteCertiicate').style.display = 'block';
				}
			}

			$scope.certification.certificationName = '';
			$scope.certification.certifiedOn = '';
			$scope.certification.certifiedSummary = '';

			// onchange click on certification details
			$scope.gotoEditCertificationDetails = function(item) {
				$scope.itemCerDet = item;
				console.log(item);
				$scope.indexCerDet = $scope.certificationArr.indexOf(item);
				console.log($scope.certificationArr);
				// $scope.onCngeWorkHisDetails();
				console.log($scope.indexCerDet);
				// console.log(item);

				// set id from array position
				$scope.certification.id = $scope.indexCerDet;
				$scope.certification.certificationName = item.certificationName;
				$scope.certification.certifiedOn = item.certifiedOn;
				$scope.certification.certifiedSummary = item.certifiedSummary;
			}
			if(Array.isArray($scope.certificationArr) == true) {
				if ($scope.certificationArr.length > 0) {
					console.log("if");
					$scope.gotoEditCertificationDetails($scope.certificationArr[0]);
				}
			}

			var tempObjWorkHis;

			// on change of employ work history details
			$scope.onCngeCertifications = function (id) {

				$scope.certificationArr[id].certificationName = $scope.certification.certificationName;
				$scope.certificationArr[id].certifiedOn = $scope.certification.certifiedOn;
				$scope.certificationArr[id].certifiedSummary = $scope.certification.certifiedSummary;

				console.log($scope.certificationArr);
			}

			// add new work history
			$scope.addNewCertification = function () {
				$scope.certification.certificationName = "New Certification";
				$scope.certification.certifiedOn = '';
				$scope.certification.certifiedSummary = "";

				tempObjCer = {
					"certificationName" : $scope.certification.certificationName,
					"certifiedOn" : $scope.certification.certifiedOn,
					"certifiedSummary" : $scope.certification.certifiedSummary
				}
				// $scope.certificationArr.push(tempObjCer);
				if(Array.isArray($scope.certificationArr) == true) {
					if ($scope.certificationArr.length > 0) {
						$scope.certificationArr.splice(0, 0, tempObjCer);
					}
				} else {
					$scope.certificationArr = [];
					$scope.certificationArr.push(tempObjCer);
				}

				// to set the items of work history's last element
				// $scope.itemCerDet = $scope.certificationArr.length - 1;
				$scope.itemCerDet = $scope.certificationArr[0];

				// to set the index of id
				$scope.indexCerDet = $scope.certificationArr.indexOf(tempObjCer);
				$scope.certification.id  = $scope.indexCerDet;
			}

			$scope.achievement = {};
			$scope.achievement.achievementName = $scope.receivedResumeDetails.Achievements;
		}

		$scope.uploadProfilePic = function(){
	     var file = $scope.profilePic;

	     console.log('file is ' );
	     console.dir(file);

			 if (file.name != "" || file.name != undefined) {
			 	$scope.profilePicPath = file.name;
			 }

			 if (file == '' || file == undefined) {
			 	alert("Please select an Image");
			}else {
				// show loader
				$rootScope.showLoader();
				var uploadUrl = window.__env.apiUrl+"/profiles/images";
	 		 	var successMsg = 'Image Uploaded Successfully';
				fileUploadService.putFileUpload(file, uploadUrl, successMsg, 'jobseeker', '/edit_profile').then(function(response) {
					console.log(response);
					// hide loader
					$rootScope.hideLoader();
				});
			}
	  };

	}

		/** holds tabs, we will perform repeat on this **/
		$scope.tabs = [{
			id:1,
			content:'This is a default tab on load'
		}]

		$scope.languagetabs = [{
			id:1,
			content:'This is a default tab on load'
		}]

		$scope.experiencetabs = [{
			id:1,
			content:'This is a default tab on load'
		}]

		$scope.certificatetabs = [{
			id:1,
			content:'This is a default tab on load'
		}]

		$scope.counter = 1;

		/** Function to add a new tab **/
		$scope.addTab = function(){
			$scope.counter++;
			$scope.tabs.push({id:$scope.counter,content:'Any Content'});
			$scope.selectedTab = $scope.tabs.length - 1; //set the newly added tab active.
			document.getElementById('deleteEducation').style.display = 'block';

			// to add new qualification
			$scope.addNewQualification();
		}

		/** Function to delete a tab **/
		$scope.deleteTab = function(index, value)
		{
			if($scope.tabs.length == 2)
			{
				document.getElementById('deleteEducation').style.display = 'none';
			}

			$scope.tabs.splice(index,1); //remove the object from the array based on index

			var delIdEdu = $scope.educationDetailsArr.findIndex(x => x.Degree==value);
			$scope.educationDetailsArr.splice(delIdEdu, 1);

			$scope.educationDetails.degree = "";
			$scope.educationDetails.completedYear = "";
			$scope.educationDetails.university = "";
			$scope.educationDetails.percentage = "";
			$scope.educationDetails.specialization = "";
			$scope.educationDetails.courseType = "";

			// hide delete button of education detail, when only 1
			if($scope.educationDetailsArr.length <= 1) {
				document.getElementById('deleteEducation').style.display = 'none';
			}
		}

		$scope.selectedTab = 0; //set selected tab to the 1st by default.

		/** Function to set selectedTab **/
		$scope.selectTab = function(index){
			$scope.selectedTab = index;
		}

		$scope.selectedLanguageTab = 0; //set selected tab to the 1st by default.


		$scope.Langcounter = 1;
		/** Function to set selectedTab **/
		$scope.selectLanguageTab = function(index){
			$scope.selectedLanguageTab = index;
		}

		$scope.addLanguageTab = function(){
			$scope.Langcounter++;
			$scope.languagetabs.push({id:$scope.Langcounter,content:'Any Content'});
			$scope.selectedLanguageTab = $scope.languagetabs.length - 1; //set the newly added tab active.
			document.getElementById('deleteLanguage').style.display = 'block';
		}


		$scope.deleteLanguageTab = function(index){
			if($scope.languagetabs.length == 2)
			{
				document.getElementById('deleteLanguage').style.display = 'none';
			}
			$scope.languagetabs.splice(index,1); //remove the object from the array based on index
		}

		$scope.selectedExperienceTab = 0; //set selected tab to the 1st by default.


		/** Function to set selectedTab **/
		$scope.Expcounter = 1;

		$scope.selectExperienceTab = function(index){
			$scope.selectedExperienceTab = index;
		}

		$scope.addExperienceTab = function(){
			$scope.Expcounter++;
			$scope.experiencetabs.push({id:$scope.Expcounter,content:'Any Content'});
			$scope.selectedExpereienceTab = $scope.experiencetabs.length - 1; //set the newly added tab active.
			document.getElementById('deleteExperience').style.display = 'block';

			// to add experience or work history
			$scope.addNewWorkHistory();
		}


		$scope.deleteExperienceTab = function(index, value){
			if($scope.experiencetabs.length == 2)
			{
				document.getElementById('deleteExperience').style.display = 'none';
			}
			$scope.experiencetabs.splice(index,1); //remove the object from the array based on index
			var delIdHis = $scope.empBeanArr.findIndex(x => x.Employer==value);
			$scope.empBeanArr.splice(delIdHis, 1);

			$scope.empBean = {};

			$scope.empBean.employerName = '';
			$scope.empBean.status = '';
			$scope.empBean.designation = '';
			$scope.empBean.startMonth = '';
			$scope.empBean.startYear = '';
			$scope.empBean.endMonth = '';
			$scope.empBean.endYear = '';

			// hide delete button of history detail, when only 1
			if($scope.empBeanArr.length <= 1) {
				document.getElementById('deleteExperience').style.display = 'none';
			}
		}

		$scope.Certcounter = 1;

		$scope.selectCertificateTab = function(index){
			$scope.selectedCertificateTab = index;
		}

		$scope.addCertificateTab = function(){
			$scope.Certcounter++;
			$scope.certificatetabs.push({id:$scope.Certcounter,content:'Any Content'});
			$scope.selectedCertificateTab = $scope.certificatetabs.length - 1; //set the newly added tab active.
			document.getElementById('deleteCertiicate').style.display = 'block';

			// to add experience or work history
			$scope.addNewCertification();
		}


		$scope.deleteCertificateTab = function(index, value){
			if($scope.certificatetabs.length == 2)
			{
				document.getElementById('deleteCertiicate').style.display = 'none';
			}
			$scope.certificatetabs.splice(index,1); //remove the object from the array based on index

			var delIdCer = $scope.certificationArr.findIndex(x => x.certificationName==value);
			$scope.certificationArr.splice(delIdCer, 1);

			$scope.certification = {};

			$scope.certification.certificationName = '';
			$scope.certification.certifiedOn = '';
			$scope.certification.certifiedSummary = '';

			// hide delete button of history detail, when only 1
			if($scope.certificationArr.length <= 1) {
				document.getElementById('deleteCertiicate').style.display = 'none';
			}
		}

	$scope.editProfileDetails = function () {

		if ($scope.personalDetails2.firstName && $scope.personalDetails2.lastName && 
			$scope.personalDetails2.contactNumber && $scope.jobProfile) {

			// show loader
			$rootScope.showLoader();

			// var delIdEdu, delIdHis;
			// // delete if degree name is empty
			// $scope.educationDetailsArr.forEach(function(element) {
			// 	if (element.Degree == null || element.Degree == "" || element.Degree == undefined) {
			// 		delIdEdu = $scope.educationDetailsArr.findIndex(x => x.Degree=="" || null || undefined);
			// 		$scope.educationDetailsArr.splice(delIdEdu, 1);
			// 	}
			// }, this);

			// // delete if work history title is empty
			// $scope.empBeanArr.forEach(function(element) {
			// 	if (element.Employer == null || element.Employer == "" || element.Employer == undefined) {
			// 		delIdHis = $scope.empBeanArr.findIndex(x => x.Employer=="" || null || undefined);
			// 		$scope.empBeanArr.splice(delIdHis, 1);
			// 	}
			// }, this);
			
			// to assign and send values in skills array
			var obj1, skillsArr = [];
			$scope.repeatSkillSets.forEach(function(element, i) {
				obj1 = {
					"ExperienceInMonths": $scope.primaryskill.skillExp[i],
					"LastUsed": $scope.primaryskill.year[i],
					"Evidence": "SkillSection",
					"FormattedName": "",
					"Alias": "",
					"Type": "BehaviorSkill",
					"Skill": $scope.primaryskill.skillName[i],
					"Others": {
						"Rating": $scope.primaryskill.skillRating[i],
						"SkillStatus": $scope.primaryskill.skillStatus[i]
					}
				};
				skillsArr.push(obj1);
			})
			var body = {
				"firstName": $scope.personalDetails2.firstName,
				"lastName": $scope.personalDetails2.lastName,
				"Achievements": $scope.achievement,
				"Certification": $scope.certificationArr,
				"TitleName": "",
				"JobProfile": $scope.jobProfile, 
				"Email": $scope.personalDetails2.email,
				"Phone": $scope.personalDetails2.contactNumber,
				"FormattedAddress": $scope.personalDetails2.address,
				"ExecutiveSummary": $scope.personalDetails2.resumeTitle,
				"CurrentEmployer":"",
				"WorkHistory": $scope.empBeanArr, // please add EmployerStatus as current/previous along with old data
				"SkillSet": skillsArr, // add others object -- {Rating:3,SkillStatus:"active"} - SkillStatus will change to inactive when u remove
				"EducationSplit": $scope.educationDetailsArr // add others object -- {Specialization : "",CourseType: "regular"} -- coursetypes - regular/correspondence
			};
			console.log(body);

			var editResumeServiceUrl = '/resumes/editResume/' + $scope.resumesDetails[0].uuid;
			var successMsg = 'Success';
			callService.callPutService(body, editResumeServiceUrl, successMsg, userRole).then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					alert("Profile edited Successfully");
					// hide loader
					$rootScope.hideLoader();

					// get user default profile details
        			$rootScope.getDefaultProfile();

					$location.path('/myprofiles');
					// window.location.reload();
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
		} else {
			alert("Please fill all mandatory(*) fields");
		}
	}

	// goto preview resume
	$scope.previewResume = function () {

		var skillsArr = [];
		$scope.repeatSkillSets.forEach(function(element, i) {
			obj1 = {
				"ExperienceInMonths": $scope.primaryskill.skillExp[i],
				"LastUsed": $scope.primaryskill.year[i],
				"Evidence": "SkillSection",
				"FormattedName": "",
				"Alias": "",
				"Type": "BehaviorSkill",
				"Skill": $scope.primaryskill.skillName[i],
				"Others": {
					"Rating": $scope.primaryskill.skillRating[i],
					"SkillStatus": $scope.primaryskill.skillStatus[i]
				}
			};
			skillsArr.push(obj1);
		})

		$rootScope.detailsToPreview = {
			"firstName": $scope.personalDetails2.firstName,
			"lastName": $scope.personalDetails2.lastName,
			"Achievements": $scope.achievement,
			"Certification": $scope.certificationArr,
			"TitleName": "",
			"JobProfile": $scope.jobProfile, 
			"Email": $scope.personalDetails2.email,
			"Phone": $scope.personalDetails2.contactNumber,
			"FormattedAddress": $scope.personalDetails2.address,
			"ExecutiveSummary": $scope.personalDetails2.resumeTitle,
			"CurrentEmployer":"",
			"WorkHistory": $scope.empBeanArr, // please add EmployerStatus as current/previous along with old data
			"SkillSet": skillsArr, // add others object -- {Rating:3,SkillStatus:"active"} - SkillStatus will change to inactive when u remove
			"EducationSplit": $scope.educationDetailsArr // add others object -- {Specialization : "",CourseType: "regular"} -- coursetypes - regular/correspondence
		};
		$rootScope.pageToTop();
		$location.path('/detailed-resume');
	}
    
    
    
$scope.list1=[];
  $scope.list2=[];

    // Generate initial model
    for (var i = 1; i <= 1; ++i) {
      $scope.list1.push({ label: "Item A" + i });
      $scope.list2.push({ label: "Item B" + i });
    }

    // Model to JSON for demo purpose
    $scope.$watch('models', function (model) {
      $scope.modelAsJson = angular.toJson(model, true);
    }, true); 
                
                /*Remove SKills*/
                
               $scope.removeSkillName=function(data){
                    alert($scope.list1);  
                };
                
                
                
}]);


