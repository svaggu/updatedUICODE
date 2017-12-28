app.controller('advance-searchController', function($scope,$http,$location,$rootScope, callService) {
		//$scope.message = 'Contact us! JK. This is just a demo.';

$scope.search={};
$scope.booleanSearch=function(search){

alert(search.sameKeyWord);
alert(search.allWord);
    alert(search.excatPharse);
alert(search.noneOfTheWords);
        alert(search.jobTitle);
alert(search.companyName)
    var body = {
        "oneWord": $scope.search.sameKeyWord,
        "allWords": $scope.search.allWord,
        "excatPharse":$scope.search.excatPharse,
        "noneOfTheWords":$scope.search.noneOfTheWords,
        "jobTitle":$scope.search.jobTitle,
        "jobTitle":$scope.search.companyName
            };			

			var addadvanceSearchUrl = "http://192.168.1.2:9060/resumes/booleanSearch";
			var successMsg = 'Success';
    

			callService.callingPostService(body, addadvanceSearchUrl, successMsg, 'app').then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					alert("Type Added Successfully");
					// window.location.reload();
                   // $scope.getIndustryTypes();
					
				}else {
					alert("Please insert all details");
				}
			}).catch (function (error){
				console.log(error);
				// alert('Server Error in creating Organisation \n Please try after sometime')
				alert(error.data.reason);
			});
	};
});
