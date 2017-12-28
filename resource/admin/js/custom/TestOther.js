	// create the controller and inject Angular's $scope
	app.controller('mainController', function($scope) { 
		// create a message to display in our view
		//$scope.message = 'Everyone come and see how good I look!';
		
	});
	
	app.controller('contentController', function($scope) {
		//$scope.message = 'Look! I am an about page.';
	});
	
	app.controller('myjobsController', function($scope) {
		//$scope.message = 'Look! I am an about page.';
	});

	app.controller('graphsumeController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});
	
	app.controller('detailed_resumeController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});
	
	app.controller('upload_resumesController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});
	
	app.controller('my_documentsController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});
	
	app.controller('edit_profileController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});

	app.controller('profile_completenessController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});
	
	app.controller('downloadsController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});


	app.controller('profileviewsController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});
	
	app.controller('client_schedulesController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});
	
	app.controller('flagController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});


	app.controller('postajobController', function($scope) {
		//$scope.message = 'Look! I am an about page.';
	});

	app.controller('boolean_searchController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});
	
	app.controller('favourite_candidateController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});
	
	app.controller('saved_searchController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});
	
	app.controller('flagsController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});
	
	app.controller('posted_job_listController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});
	
	app.controller('contactController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});
	
	app.controller('aboutController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});
	
	app.controller('forgotpasswordController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});
	
	app.controller('termsController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});
	
	app.controller('getdemoController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});
	
	app.controller('searchresultsController', function($scope) {
		//$scope.message = 'Contact us! JK. This is just a demo.';
	});	

	
	app.controller('MyController', function ($scope) 
	{ 
		//This will hide the DIV by default.
		$scope.matchedjobs = true;
		$scope.appliedJobs = false;
		$scope.search_jobs = false;
		
		$scope.getMyMatchedJobs = function () 
		{
			//If DIV is visible it will be hidden and vice versa.
			//$scope.IsVisible = $scope.IsVisible ? false : true;
			$scope.matchedjobs = true;
			$scope.appliedJobs = false;
			$scope.search_jobs = false;
		}
		
		$scope.getAppliedJobs = function () 
		{
			//If DIV is visible it will be hidden and vice versa.
			//$scope.IsVisible = $scope.IsVisible ? false : true;
			$scope.appliedJobs = true;
			$scope.matchedjobs = false;
			$scope.search_jobs = false;
		}
		
		$scope.gotoTab3 = function () 
		{
			//If DIV is visible it will be hidden and vice versa.
			//$scope.IsVisible = $scope.IsVisible ? false : true;
			$scope.search_jobs = true;
			$scope.appliedJobs = false;
			$scope.matchedjobs = false;
		}
	});
	