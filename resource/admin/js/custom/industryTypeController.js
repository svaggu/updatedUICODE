admin.controller('industryTypeController', function($scope,$http,$location,$rootScope, callService) {
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
	  $('#industryType').addClass('active');
      $('#functionalArea').removeClass('active');
      $('#organisation').removeClass('active');
	  $('#dashboard').removeClass('active');
	  $('#jobBoard').removeClass('active');
	  $('#emailTemplate').removeClass('active');
	  $('#eCommerce').removeClass('active');
	  $('#settings').removeClass('active');

	  // show notification bar
	  $(".navbar-custom-menu").css('display', 'block');
	}

    // get industry types
    $scope.getIndustryTypes = function () {
        var getIndustryTypesUrl = window.__env.apiUrl+'/industryTypes';
        var successMsg = 'Success';
        callService.callingService(getIndustryTypesUrl, successMsg, 'admin').then(function(response) {
            console.log(response);
            if (response.status >= 200 || response.status < 300) {
                $scope.industryTypesList = response.data;
            }
            else{
                // alert("Error in retrieving Jobs");
                $scope.industryTypesList = [];
            }
        }).catch (function (error){
            console.log(error);
            $scope.industryTypesList = [];
        });
    }

    $scope.getIndustryTypes();

	$scope.industryType = {};
	$scope.industryType.name = '';

  $scope.addIndustryType = function() {
    if ($scope.industryType.name == '' || $scope.industryType.name == undefined) {
      alert('Please enter all Details');
    }else {
			var body = {
                "name": $scope.industryType.name
            };			

			var addIndustryTypeUrl = window.__env.apiUrl+"/industryTypes";
			var successMsg = 'Success';

			callService.callingPostService(body, addIndustryTypeUrl, successMsg, 'admin').then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					alert("Type Added Successfully");
					// window.location.reload();
                    $scope.getIndustryTypes();
					
				}else {
					alert("Please insert all details");
				}
			}).catch (function (error){
				console.log(error);
				// alert('Server Error in creating Organisation \n Please try after sometime')
				alert(error.data.reason);
			});
    }
  }

});
