app.controller('profileViewsController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
    
    $scope.selectedIndex = -1;
$scope.selectthing = function(idx) {

    $scope.selectedIndex = idx;


}

$scope.showProfile=function(id){
    //alert(id);
    $("[id^='panel']").hide();
    $("#panel"+id).show();

	};
});
