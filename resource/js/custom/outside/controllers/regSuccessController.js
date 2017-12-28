app.controller("regSuccessController", function signupController($scope,$rootScope, $http,$location,$route,facebookService) {

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

    var user = localStorage.getItem('isCheckUser');
    if(user == "" || user == "empty" || user == undefined){
		$('.footer').css('display', 'none');
	} else {
        $location.path('/');
    }

    // goto Login
    $scope.gotoLogin = function () {
        $location.path('/employer-home');
    }

});
