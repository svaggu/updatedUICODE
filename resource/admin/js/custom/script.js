var admin = angular.module('jobumesAdmin', ['ngRoute',]);

admin.run(["$rootScope", "$window", "$location" , function($rootScope, $window, $location) {
  // localStorage.setItem('isCheckUser', 'empty');
    $rootScope.signOut = function(){
      $window.localStorage.clear();
      // window.localStorage['userObj'] = angular.toJson({'userName': '', 'pass': ''});
      // window.localStorage['userDetailsObj'] = angular.toJson({});
      localStorage.setItem('isCheckUser', 'empty');
      localStorage.setItem('userRole', 'empty');
      $location.path('/');
      window.location.reload();
    }

    // page refresh
    $rootScope.pageRefresh = function() {
      $location.path('/');
      window.location.reload();
    }
}]);

  // configure our routes
  admin.config(function($routeProvider)
  {
    $routeProvider

    .when('/', {
      templateUrl :'resource/admin/pages/content/admin-login.html',
      controller  : 'adminLoginController'
    })

    .when('/admin-dashboard', {
      templateUrl :'resource/admin/pages/content/content.html',
      controller  : 'adminDashboardController'
    })

    .when('/admin', {
      templateUrl :'resource/admin/index.html',
      controller  : 'adminController'
    })

    .when('/organisation', {
      templateUrl :'resource/admin/pages/content/organisation.html',
      controller  : 'organisationController'
    })

    .when('/industry-type', {
      templateUrl :'resource/admin/pages/content/industryType.html',
      controller  : 'industryTypeController'
    })

    .when('/functional-area', {
      templateUrl :'resource/admin/pages/content/functionalArea.html',
      controller  : 'functionalAreaController'
    })

    .when('/manage-jobs', {
      templateUrl :'resource/admin/pages/content/manage-jobs.html',
      controller  : 'manageJobsController'
    })
    .when('/manage-resumes', {
      templateUrl :'resource/admin/pages/content/manage-resumes.html',
      controller  : 'manageResumesController'
    })

    .when('/manage-employer', {
      templateUrl :'resource/admin/pages/content/manage-employer.html',
      controller  : 'manageEmployerController'
    })

    .when('/manage-jobseeker', {
      templateUrl :'resource/admin/pages/content/manage-jobseeker.html',
      controller  : 'manageJobseekerController'
    })

    .when('/job-alert', {
      templateUrl :'resource/admin/pages/content/job-alert.html',
      controller  : 'jobAlertController'
    })

    .when('/manage-invoices', {
      templateUrl :'resource/admin/pages/content/manage-invoices.html',
      controller  : 'manageInvoicesController'
    })

    .when('/employer-products', {
      templateUrl :'resource/admin/pages/content/employer-products.html',
      controller  : 'employerProductsController'
    })

    .when('/jobseeker-products', {
      templateUrl :'resource/admin/pages/content/jobseeker-products.html',
      controller  : 'jobseekerProductsController'
    })

    .when('/discounts', {
      templateUrl :'resource/admin/pages/content/discounts.html',
      controller  : 'discountsController'
    })

    .when('/payment-gatway', {
      templateUrl :'resource/admin/pages/content/payment-gateway.html',
      controller  : 'paymentGatewayController'
    })

    .when('/email-templates', {
      templateUrl :'resource/admin/pages/content/email-templates.html',
      controller  : 'emailTemplatesController'
    })

     .when('/system-settings', {
      templateUrl :'resource/admin/pages/content/system-settings.html',
      controller  : 'systemSettingsController'
    })

    .when('/site-admin', {
      templateUrl :'resource/admin/pages/content/site-admin.html',
      controller  : 'siteAdminController'
    })

    .when('/edit-admin', {
      templateUrl :'resource/admin/pages/content/edit-admin.html',
      controller  : 'siteAdminController'
    })

    .when('/add-admin', {
      templateUrl :'resource/admin/pages/content/add-admin.html',
      controller  : 'siteAdminController'
    })

    .when('/add-product', {
      templateUrl :'resource/admin/pages/content/add-product.html',
      controller  : 'siteAdminController'
    })

    .when('/add-discount', {
      templateUrl :'resource/admin/pages/content/add-discount.html',
      controller  : 'siteAdminController'
    })

    .when('/add-email-templates', {
      templateUrl :'resource/admin/pages/content/add-email-templates.html',
      controller  : 'addEmailTemplateController'
    })

    .when('/edit-email-templates', {
      templateUrl :'resource/admin/pages/content/edit-email-templates.html',
      controller  : 'editEmailTemplateController'
    })

    .when('/edit-employer', {
      templateUrl :'resource/admin/pages/content/edit-employer.html',
      controller  : 'editEmployerController'
    })

    .when('/edit-jobseeker', {
      templateUrl :'resource/admin/pages/content/edit-jobseeker.html',
      controller  : 'editJobseekerController'
    })

    .when('/add-jobseeker', {
      templateUrl :'resource/admin/pages/content/add-jobseeker.html',
      controller  : 'addJobseekerController'
    })

    .when('/add-employer', {
      templateUrl :'resource/admin/pages/content/add-employer.html',
      controller  : 'addEmployerController'
    })

    .when('/add-new-job', {
      templateUrl :'resource/admin/pages/content/add-new-job.html',
      controller  : 'addNewJobController'
    })

    .when('/add-new-resume', {
      templateUrl :'resource/admin/pages/content/add-new-resume.html',
      controller  : 'addNewResumeController'
    })

    .when('/edit-resume', {
      templateUrl :'resource/admin/pages/content/edit-resume.html',
      controller  : 'editResumeController'
    })

    .when('/edit-job', {
      templateUrl :'resource/admin/pages/content/edit-job.html',
      controller  : 'editJobsController'
    })

    .when('/manage-employer-products', {
      templateUrl :'resource/admin/pages/content/manage-employer-products.html',
      controller  : 'manageEmployerProductsController'
    })

    .when('/manage-jobseeker-products', {
      templateUrl :'resource/admin/pages/content/manage-jobseeker-products.html',
      controller  : 'manageJobseekerProductsController'
    })

    .when('/import-jobs', {
      templateUrl :'resource/admin/pages/content/import-jobs.html',
      controller  : 'importJobsController'
    })

    .when('/export-jobs', {
      templateUrl :'resource/admin/pages/content/export-jobs.html',
      controller  : 'exportJobsController'
    })

    .when('/import-resumes', {
      templateUrl :'resource/admin/pages/content/import-resumes.html',
      controller  : 'importResumesController'
    })

    .when('/export-resumes', {
      templateUrl :'resource/admin/pages/content/export-resumes.html',
      controller  : 'exportResumesController'
    })

    .when('/import-jobseeker', {
      templateUrl :'resource/admin/pages/content/import-jobseeker.html',
      controller  : 'importJobseekerController'
    })

    .when('/export-jobseeker', {
      templateUrl :'resource/admin/pages/content/export-jobseeker.html',
      controller  : 'exportJobseekerController'
    })

    .when('/import-employer', {
      templateUrl :'resource/admin/pages/content/import-employer.html',
      controller  : 'importEmployerController'
    })

    .when('/export-employer', {
      templateUrl :'resource/admin/pages/content/export-employer.html',
      controller  : 'exportEmployerController'
    })

    // Outside Route and Controller end
    .when('/404page', {
        templateUrl :'resource/admin/pages/content/404_error.html',
        controller  : '404Controller'
      })
  });


admin.factory('callService', function($http, $location) {

  var callService = {
    callingService : function(serviceUrl, successMsg, jobRole){

      var accessData = angular.fromJson(window.localStorage['userObj']);
      var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
      var user = localStorage.getItem('isCheckUser');

    //  console.log(accessData);
     //  user details
      var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);

      return $http.get(serviceUrl, {
        headers: {
          'Authorization': valuesToBasic,
          'Content-Type' : 'application/json',
          'role' : 'admin'
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

    callingPostService : function(body, serviceUrl, successMsg, jobRole){

      var accessData = angular.fromJson(window.localStorage['userObj']);
      var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
      var user = localStorage.getItem('isCheckUser');

     console.log(accessData);
     //  user details
      var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);

      return $http.post(serviceUrl, body, {
        headers: {
          'Authorization': valuesToBasic,
          'role' : 'admin'
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

    callingPutService : function(body, serviceUrl, successMsg, jobRole){

      var accessData = angular.fromJson(window.localStorage['userObj']);
      var returnData = angular.fromJson(window.localStorage['userDetailsObj']);
      var user = localStorage.getItem('isCheckUser');

     console.log(accessData);
     //  user details
      var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);

      return $http.put(serviceUrl, body, {
        headers: {
          'Authorization': valuesToBasic,
          'role' : 'admin'
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
