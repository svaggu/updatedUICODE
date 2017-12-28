admin.controller('editEmailTemplateController', function($scope,$http,$location,$rootScope, callService) {
	//$scope.message = 'Contact us! JK. This is just a demo.';

	var accessData, returnData;
	var user = localStorage.getItem('isCheckUser');
	if(user == "" || user == "empty" || user == undefined){
		$location.path('/');
	}else {
		accessData = angular.fromJson(window.localStorage['userObj']);
		returnData = angular.fromJson(window.localStorage['userDetailsObj']);
  	// show menu items
	  $("#login-sidebar-menu").css('display', 'none');
	  $("#sidebar-menu").css('display', 'block');

		// adding active class for active item in list
	  $('#emailTemplate').addClass('active');
    $('#jobBoard').removeClass('active');
    $('#dashboard').removeClass('active');
    $('#organisation').removeClass('active');
	  $('#eCommerce').removeClass('active');
	  $('#settings').removeClass('active');
	  $('#industryType').removeClass('active');
      $('#functionalArea').removeClass('active');

	  // show notification bar
	  $(".navbar-custom-menu").css('display', 'block');

	if($rootScope.emailTemplateToEdit) {
        console.log($rootScope.emailTemplateToEdit);
    }else {
        $location.path('/email-templates');
    }
  }

    // edit email template
    $scope.editEmailTemplate = function () {
        if ($rootScope.emailTemplateToEdit.title || $rootScope.emailTemplateToEdit.subject ||
            $rootScope.emailTemplateToEdit.text) {

            var body = {
                "uuid": $rootScope.emailTemplateToEdit.uuid,
                "title": $rootScope.emailTemplateToEdit.title,
                "subject": $rootScope.emailTemplateToEdit.subject,
                "status":"active",
                "text": $rootScope.emailTemplateToEdit.text
            };
            
            var editTemplateServiceUrl = window.__env.apiUrl+'/emailTemplates';
			var successMsg = 'Success';
			callService.callingPutService(body, editTemplateServiceUrl, successMsg, "admin").then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					alert("Edited Successfully");
                    $location.path('/email-templates');
				}
				else{

				}
			}).catch (function (error){
				console.log(error);
			});
        }else {
            alert("Please insert all Details");
        }
    }

});
