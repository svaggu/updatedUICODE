app.controller('detailedResumeController', function($scope, $location, $rootScope, $http, fileUploadService,callService) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
	var accessData, returnData;
	var user = localStorage.getItem('isCheckUser');
	var userRole = localStorage.getItem('userRole');

	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employee-home');
	}else {
		accessData = angular.fromJson(window.localStorage['userObj']);
		returnData = angular.fromJson(window.localStorage['userDetailsObj']);

		if ($rootScope.detailsToPreview) {
			console.log($rootScope.detailsToPreview);

			// skills based on experience
			var skillsArr = $rootScope.detailsToPreview.SkillSet;
			$scope.primarySkills = [];
			$scope.secSkills = [];
			// console.log(skillsArr);
			skillsArr.sort(function(a, b) {
				return parseFloat(a.ExperienceInMonths) - parseFloat(b.ExperienceInMonths);
			});
			var revSkillArr = skillsArr.reverse();
			$scope.higherExperience = revSkillArr[0].ExperienceInMonths;
			revSkillArr.forEach(function (element, i) {
				if (element.ExperienceInMonths > 5) {
					$scope.primarySkills.push(element);
				} else {
					$scope.secSkills.push(element);
				}
			})
		} else {
			$rootScope.pageToTop();
			$location.path('/edit_profile');
		}
	}

});