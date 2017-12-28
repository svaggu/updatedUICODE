admin.controller('functionalAreaController', function($scope,$http,$location,$rootScope, callService) {
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
      $('#functionalArea').addClass('active');
      $('#industryType').removeClass('active');
	  $('#organisation').removeClass('active');
	  $('#dashboard').removeClass('active');
	  $('#jobBoard').removeClass('active');
	  $('#emailTemplate').removeClass('active');
	  $('#eCommerce').removeClass('active');
	  $('#settings').removeClass('active');

	  // show notification bar
	  $(".navbar-custom-menu").css('display', 'block');
	}

    // get functional areas
    $scope.getFunctionalArea = function () {
        var getFunctionalAreasUrl = window.__env.apiUrl+'/functionalAreas';
        var successMsg = 'Success';
        callService.callingService(getFunctionalAreasUrl, successMsg, 'admin').then(function(response) {
            console.log(response);
            if (response.status >= 200 || response.status < 300) {
                $scope.functionalAreasList = response.data;
            }
            else{
                // alert("Error in retrieving Jobs");
                $scope.functionalAreasList = [];
            }
        }).catch (function (error){
            console.log(error);
            $scope.functionalAreasList = [];
        });
    }

    $scope.getFunctionalArea();

	$scope.functionalArea = {};
	$scope.functionalArea.name = '';

  $scope.addFunctionalArea = function() {
    if ($scope.functionalArea.name == '' || $scope.functionalArea.name == undefined) {
      alert('Please enter all Details');
    }else {
        var body = {
            "name":"FunctionalArea1"
        };			

        var addOrgServiceUrl = window.__env.apiUrl+"/functionalAreas";
        var successMsg = 'Success';

        callService.callingPostService(body, addOrgServiceUrl, successMsg, 'admin').then(function(response) {
            console.log(response);
            if (response.status >= 200 || response.status < 300) {
                alert("Added Successfully");
                $scope.functionalArea.name = '';
                $scope.getFunctionalArea();
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
