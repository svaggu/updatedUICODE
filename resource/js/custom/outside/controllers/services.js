localStorage.setItem('mainUrl', window.__env.apiUrl);

//for fb login
window.fbAsyncInit = function() {
  FB.init({
    appId      : '567085660166390',
    xfbml      : true,
    version    : 'v2.8'
  });
  FB.AppEvents.logPageView();
};

(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
 }(document, 'script', 'facebook-jssdk'));

 (function() {
      var po = document.createElement('script'); po.type = 'text/javascript'; po.async = true;
      po.src = 'https://apis.google.com/js/client:plusone.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(po, s);
  })();

 // ...
 app.factory('facebookService', function($q) {
     return {
         getMyDetails: function() {
             var deferred = $q.defer();
             FB.api('/me', {
                 fields: 'id,first_name,last_name,middle_name,gender,email'
             }, function(response) {
                 if (!response || response.error) {
                     deferred.reject('Error occured');
                 } else {
                     deferred.resolve(response);
                 }
             });
            //  to get accessToken
            //  var accessToken = FB.getAuthResponse();
            //  console.log(accessToken);
             return deferred.promise;
         }
     }
 });

 app.factory('callService', function($http, $location, $rootScope) {

   $rootScope.mainUrl = localStorage.getItem('mainUrl');

   var callService = {
     callGetService : function(serviceUrl, successMsg, jobRole){

       var accessData, returnData, userRole, valuesToBasic;
       var user = localStorage.getItem('isCheckUser');

       if (user != 'empty') {
         accessData = angular.fromJson(window.localStorage['userObj']);
         returnData = angular.fromJson(window.localStorage['userDetailsObj']);
         userRole = localStorage.getItem('userRole');
         //  user details
         valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);
       }else {
        //  user details
        // valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);
       }

       return $http.get( $rootScope.mainUrl + serviceUrl, {
         headers: {
           'Authorization': valuesToBasic,
           'Content-Type' : 'application/json',
           'role' : userRole
         }
       })

       .success(function(){
         // alert(successMsg);
         // $location.path(redirectTo);
       })

       .error(function(){
         // alert("Error Occured");
       });

     },

     callPostService : function(body, serviceUrl, successMsg, jobRole){

       var accessData = angular.fromJson(window.localStorage['userObj']);
       var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
       var user = localStorage.getItem('isCheckUser');
       var userRole = localStorage.getItem('userRole');

      //  user details
       var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);

       return $http.post($rootScope.mainUrl + serviceUrl, body, {
         headers: {
           'Authorization': valuesToBasic,
           'Content-Type' : 'application/json',
           'role' : userRole
         }
       })

       .success(function(){
         // alert(successMsg);
         // $location.path(redirectTo);
       })

       .error(function(){
         // alert("Error Occured");
       });

     },

    //  put service
    callPutService : function(body, serviceUrl, successMsg, jobRole){

      var accessData = angular.fromJson(window.localStorage['userObj']);
      var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
      var user = localStorage.getItem('isCheckUser');
      var userRole = localStorage.getItem('userRole');

     //  user details
      var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);

      return $http.put($rootScope.mainUrl + serviceUrl, body, {
        headers: {
          'Authorization': valuesToBasic,
          'Content-Type' : 'application/json',
          'role' : userRole
        }
      })

      .success(function(){
        // alert(successMsg);
        // $location.path(redirectTo);
      })

      .error(function(){
        // alert("Error Occured");
      });

    }
   }
   return callService;
 });

 app.directive('fileModel', ['$parse', function ($parse) {
 	return {
 		 restrict: 'A',
 		 link: function(scope, element, attrs) {
 				var model = $parse(attrs.fileModel);
 				var modelSetter = model.assign;

 				element.bind('change', function(){
 					 scope.$apply(function(){
 							modelSetter(scope, element[0].files[0]);
 					 });
 				});
 		 }
 	};
 }]);

 app.factory('fileUploadService', function($http, $location) {
   var accessData = angular.fromJson(window.localStorage['userObj']);
   var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
   var user = localStorage.getItem('isCheckUser');

   var fileUploadService = {
     uploadFileToUrl : function(file, uploadUrl, successMsg, jobRole, redirectTo){
       // console.log(uploadUrl + ", " +successMsg );
    	// 	uploadUrl = 'http://13.126.83.252:9060/resumes';
      console.log(accessData);
    		 var fd = new FormData();
    		 fd.append('file', file);
    		//  user details
    		 var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);

    		 return $http.post(uploadUrl, fd, {
    				transformRequest: angular.identity,
    				headers: {
    					'Authorization': valuesToBasic,
    					'Content-Type' : undefined,
              'role' : jobRole
    				}
    		 })

    		 .success(function(){
    			 alert(successMsg);
           $location.path(redirectTo);
    		 })

    		 .error(function(){
    			 alert("Error Occured");
    		 });

    	},

      // put file upload
      putFileUpload : function(file, uploadUrl, successMsg, jobRole, redirectTo){
        // console.log(uploadUrl + ", " +successMsg );
     	// 	uploadUrl = 'http://13.126.83.252:9060/resumes';
       console.log(accessData);
     		 var fd = new FormData();
     		 fd.append('file', file);
     		//  user details
     		 var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);

     		 return $http.put(uploadUrl, fd, {
     				transformRequest: angular.identity,
     				headers: {
     					'Authorization': valuesToBasic,
     					'Content-Type' : undefined,
               'role' : jobRole
     				}
     		 })

     		 .success(function(){
     			 alert(successMsg);
            $location.path(redirectTo);
     		 })

     		 .error(function(){
     			 alert("Error Occured");
     		 });

     	}
   }
   return fileUploadService;
 });

 app.service('putFileUpload', ['$http', function ($http) {

  var accessData = angular.fromJson(window.localStorage['userObj']);
 	var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
 	var user = localStorage.getItem('isCheckUser');

 	this.uploadFileToUrl = function(file, uploadUrl, successMsg){
    // console.log(uploadUrl + ", " +successMsg );
 	// 	uploadUrl = 'http://13.126.83.252:9060/resumes';
 		 var fd = new FormData();
 		 fd.append('file', file);
 		//  user details
 		 var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);

 		 $http.put(uploadUrl, fd, {
 				transformRequest: angular.identity,
 				headers: {
 					'Authorization': valuesToBasic,
 					'Content-Type' : undefined
 				}
 		 })

 		 .success(function(){
 			 alert(successMsg);
 		 })

 		 .error(function(){
 			 alert("Error Occured");
 		 });
 	}
 }]);

// for pagination
app.filter('startFrom', function() {
  return function(data, start){
    start = 0 + start;
    return data.slice(start);
  }
});
