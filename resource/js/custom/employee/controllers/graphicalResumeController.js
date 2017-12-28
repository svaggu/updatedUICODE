app.controller('graphicalResumeController',['$scope', '$location', '$rootScope', '$http','callService',
			function($scope, $location, $rootScope, $http,callService) {
	//$scope.message = 'Contact us! JK. This is just a demo.';
            $scope.dataValue=[];
            //    $scope.$on('$routeChangeSuccess', function () {
                $scope.graphdataload=function() {
                   //alert($scope.dataValue);
 //alert($scope.graphResume);
    var map = AmCharts.makeChart( "chartdiv", {
  "type": "map",
  "theme": "light",
  "colorSteps": 3,

  "dataProvider": {
    "map": "usaLow",
    "areas": [ {
      "id": $scope.dataValue,
      "value": 4447100
    }]
  },

  "areasSettings": {
    "autoZoom": false
  },

 
  "export": {
    "enabled": false
  }

} );
};
	var accessData, returnData;
	var user = localStorage.getItem('isCheckUser');
	var userRole = localStorage.getItem('userRole');

	if(user == "" || user == "empty" || user == undefined){
		$location.path('/employee-home');
	}else {
		accessData = angular.fromJson(window.localStorage['userObj']);
		returnData = angular.fromJson(window.localStorage['userDetailsObj']);

		var resumeId = localStorage.getItem('setResumeId');
		if (resumeId == undefined) {
			$location.path('/myprofiles');
		}else {

			// for jobseeker
			if (userRole == 'jobseeker') {
			$(".myprofiles").addClass("active");
			$(".graphsume").removeClass("active");
			$(".emp_dashboard").removeClass("active");
			$(".myjobs").removeClass("active");
			$(".detailed_resume").removeClass("active");
			$(".my_documents").removeClass("active");

			$rootScope.userobj = accessData;
			$rootScope.returnData = returnData;
			$("#employeeheader").show();
			$("#signoutheader").show();
			$("#homeheader").hide();
			$("#employerheader").hide();
			$("#signinheader").hide();
			$("#footersection").hide();
			$(".hideclass").hide();
		} 

		// for recruter and recruiterAdmin
		if (userRole == 'recruiter'  || userRole == 'recruiterAdmin') {
			$(".boolean_search").addClass("active");
			$(".posted_jobs").removeClass("active");
			$(".employer_dashboard").removeClass("active");
			$(".postajob").removeClass("active");
			$(".my_favorites").removeClass("active");
			$(".saved_search").removeClass("active");

			$rootScope.userobj = accessData;
			$rootScope.returnData = returnData;
			$("#employeeheader").hide();
			$("#signoutheader").show();
			$("#homeheader").hide();
			$("#employerheader").show();
			$("#signinheader").hide();
			$("#footersection").hide();
			$(".hideclass").hide();
		}

			console.log($rootScope.toGraphicalResume);

			// show loader
			$rootScope.showLoader();

			// get a single resume on uuid
			var getResumeServiceUrl = '/resumes/' + resumeId;
			var successMsg = 'Success';
			callService.callGetService(getResumeServiceUrl, successMsg, userRole).then(function(response) {
				console.log(response);
				if (response.status >= 200 || response.status < 300) {
					$scope.resumesDetails = response.data;
					$scope.getResumeDetails();
					// hide loader
					$rootScope.hideLoader();
				}
				else{
					// hide loader
					$rootScope.hideLoader();
				}
			}).catch (function (error){
				console.log(error);
				// hide loader
				$rootScope.hideLoader();
			});

			$scope.hideGraph = false;
			$scope.showNoGraph = false;
		}

		$scope.getResumeDetails = function() {

			// show loader
			$rootScope.showLoader();

				var valuesToBasic = 'Basic ' + btoa(accessData.userName + ':' + accessData.pass);

				// var res = $http({
				// 	method: 'GET',
				// 	url: window.__env.apiUrl+'/resumes',
				// 	headers: {'Authorization': valuesToBasic},
				// });

				$scope.hideGraph = false;
				$scope.showNoGraph = false;

				// res.success(function(data, status, headers, config) {
				// 	console.log(data);
					// if(status >= 200 || status <300){
					if(resumeId && $scope.resumesDetails.length != 0){
						// data.resumes.forEach(function(element){
						// 	coverLetterArr.push(element.details.ResumeParserData.Coverletter);
						// 	profileDetails.push(element);
						// })
						// $scope.coverLetterArr = coverLetterArr;
						// $scope.profileDetails = profileDetails;
						if ($scope.resumesDetails[0].hasOwnProperty('updateParsedJson')) {
							$scope.graphResume = $scope.resumesDetails[0].updateParsedJson.ResumeParserData;
						} else {
							$scope.graphResume = $scope.resumesDetails[0].parsedJson.ResumeParserData;
						}
						console.log($scope.graphResume);
                        //alert($scope.graphResume.SegregatedExperience.WorkHistory[0].JobLocation.EmployerCity);
						// skills based on experience
						var skillsArr = $scope.graphResume.SkillKeywords.SkillSet;
						$scope.skillsArrToGoal = [];
						// console.log(skillsArr);
						skillsArr.sort(function(a, b) {
						    return parseFloat(a.ExperienceInMonths) - parseFloat(b.ExperienceInMonths);
						});
						var revSkillArr = skillsArr.reverse();
						$scope.higherExperience = revSkillArr[0].ExperienceInMonths;
						revSkillArr.forEach(function (element, i) {
							if (element.ExperienceInMonths > 0) {
								$scope.skillsArrToGoal.push(element);
								// if ($scope.skillsArrToGoal.length < 1) {
								// 	$scope.skillsArrToGoal.push(element);
								// }else {
								// 	$scope.skillsArrToGoal.forEach(function(element2) {
								// 		if (element2.Evidence == element.Evidence) {
								// 			$scope.skillsArrToGoal.push(element);
								// 		}
								// 	})
								// }
							}
						})

						// for education and graph data of job experience  

						var arrEdu = $scope.graphResume.SegregatedExperience.WorkHistory;
                       // alert(arrEdu);
                        var datagraphdata={};
                        for(var i=0;i<arrEdu.length;i++){
                            //datagraphdata.id=arrEdu[i].JobLocation.EmployerState;
                            //$scope.datagraph[i]="US-AL";
                           // $scope.datagraph="US-AK";
                            //datagraphdata.value="4447100";
                            //$scope.datagraph.push(datagraphdata);
                              $scope.datalist=
                                  {
                                  "id": arrEdu[i].JobLocation.EmployerState,
                                  "value": 4447100 
                              } 
                             //alert($scope.datalist.id);
                             //alert(arrEdu[i].JobLocation.EmployerState);
                            $scope.dataValue.push($scope.datalist);
                        }
                            $scope.graphdataload();
                        
						var eduSplitArr = [];
						var objEdu = {};
		/*	var startDate, endDate;*/
						arrEdu.forEach(function(element, i){
							if (element.StartDate == null || element.StartDate == undefined ||
									element.EndDate == null || element.EndDate == undefined) {
								$scope.hideGraph = false;
								$scope.showNoGraph = true;
							}else {
								$scope.hideGraph = true;
								$scope.showNoGraph = false;
								objEdu = {};
								$scope.convertDate = function(dateTo) {
									var dateRet;
									var parts = dateTo.split('/');
									var datejson = {
									  "year": parts[2],
									  "month":parts[1], "day": parts[0]
									}
									// console.log(datejson);
									dateRet = datejson.month + '/' + datejson.day + '/' + datejson.year;
									// console.log(dateRet);
									return dateRet;
								}
								startDate = $scope.convertDate(element.StartDate);
								endDate = $scope.convertDate(element.EndDate);
								var empAdd = element.Employer +'<br>'+ element.JobPeriod;
								objEdu = {"id": i+1, "content": empAdd, "start": startDate, "end": endDate,title: empAdd };
								eduSplitArr.push(objEdu);
								// console.log(objEdu);
							}
						});

						// DOM element where the Timeline will be attached
					  var container = document.getElementById('visualization');

					  // Create a DataSet (allows two way data-binding)
						var items = new vis.DataSet(eduSplitArr);
						// console.log(items);

					  // Configuration for the Timeline
					var options = {
           align:'center',
         autoResize:true,
                        zoomable :true,
                        showTooltips:true,  
            moveable:false,
            stack:true,
            selectable: true,
            zoomable: true,
            zoomKey:'ctrlKey'
        };

					  // Create a Timeline
                        

					  var timeline = new vis.Timeline(container, items, options);
 var timelineTooltips = new vis.Timeline(document.getElementById('tooltips'),
      items, options
  );

  // Follow options
  var follow_options = {
    tooltip: {
      followMouse: true
    }
  };

  var timelineFollow = new vis.Timeline(document.getElementById('tooltips-follow'),
      items, follow_options);

  // Cap options
  var cap_options = {
    tooltip: {
      followMouse: true,
      overflowMethod: 'cap'
    }
  }

  var timelineCap = new vis.Timeline(document.getElementById('tooltips-cap'),
      items, cap_options);

  // Hide options
  var hide_options = {
    showTooltips: false
  }

  var timelineHide = new vis.Timeline(document.getElementById('tooltips-hide'),
      items, hide_options);
						// console.log(eduSplitArr);

						// hide loader
						$rootScope.hideLoader();
					}else {
						if (userRole == 'jobseeker') {
							$location.path('/myprofiles');
						}else {
							alert("No Resume Uploaded");
							$location.path('/posted-jobs');
						}

						// hide loader
						$rootScope.hideLoader();
					}

				// });
				// res.error(function(data, status, headers, config) {
				// 		console.log(data);
				// 		alert("Server Error");
				// });
		}
	}

	$scope.gotoEditResume = function(items){
		$rootScope.resumeDetailsToEdit = items;
		localStorage.setItem('setResumeId', resumeId);
		$location.path('/edit_profile');
	}

	// add to favourite
  $scope.addToFavourite = function () {
    // console.log(items);

    // show loader
		$rootScope.showLoader();

		var body = {
			"jobseeker" : $scope.resumesDetails[0].profile,
			"status": "favourite",
			"resumeUuid": $scope.resumesDetails[0].uuid
		};
		var addToFavServiceUrl = '/favourites/recruiter';
		var successMsg = 'Success';
		callService.callPostService(body, addToFavServiceUrl, successMsg, userRole).then(function(response) {
			console.log(response);
			if (response.status >= 200 || response.status < 300) {
        alert("Added to Favourites Successfully");
        // hide loader
				$rootScope.hideLoader();
        $location.path('/my-favourite');
			}
			else{
        alert(response.data.reason);
        // hide loader
				$rootScope.hideLoader();
			}
		}).catch (function (error){
			console.log(error);
			alert(error.data.reason);
			// hide loader
			$rootScope.hideLoader();
		});
  }
  
  

}]);
