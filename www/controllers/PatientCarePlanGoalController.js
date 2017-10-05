(function () {
    /**
     * @ngdoc service
     * @author VJ
     * @name roundingModule.service:PatientCarePlanGoalService
     * @description     
     * PatientCarePlanGoalService is being used by PatientCarePlanGoalController
     * This will be used for all service calls for Patient Care Plan Goals
     * @param {object} ServiceConstants
     * Common Constants.
     * @param {function} RoundingService
     * Common Function.
     */	
	angular.module('roundingModule').factory('PatientCarePlanGoalService', function (ServiceConstants, RoundingService) {
	   /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientCarePlanGoalService
        * @name GetPatientGoalsDetails
        * @description
        * Retrieve Patient care plan goals detail from service
        * @param {function} ServiceConstants.GetPatientGoalsDetails
        * ServicePoint.
        * @param {object} data
        * Data: Patient care plan goals detail filter
        * @param {string} method
        * Method: POST
        * @param {object} dataType
        * DataType: JSON.
        * @param {string} callBack getPatientGoalsDetailsData
        * @returns {object}
        * Patient care plan goals detail.
        */
	    function GetPatientGoalsDetails(data, method, dataType, callBack) {
	        RoundingService.ServiceCallWithParams(ServiceConstants.GetPatientGoals, method, dataType, data, callBack, true);
	    }

		return {
		    GetPatientGoalsDetails: GetPatientGoalsDetails
		}
	});
}());

(function () {

  /**
   * @ngdoc controller
   * @name roundingModule.controller:PatientCarePlanGoalController
   * @description
   * Controller for Patient care plan goals
   * @property {string} $scope.NoDataAvailable - If true, No data available message will be displayed based on active patient care plan data , otherwise false.
   * @property {string} $scope.NoData - If $scope.NoDataAvailable true, Message will be displayed , otherwise no message.
   * @property {object} FilterActiveCarePlan - local variable , Used for filtering the active patient care plan data.
   * @property {object} ActiveCarePlanDateSortAsc - local variable , Used for sorting the active patient care plan data.
   * @property {object} GetActiveCarePlan - local variable , Used to get the active patient care plan data.
   * @property {string} setCarePlanTopicSelected - local variable , Sets the care plan topic selected text.
   * @property {string} setGoalStatusSelected - local variable , Sets the goal status selected text.
   * @property {string} setGoalImportanceLevelSelected - local variable , Sets the importance level selected text.
   * @property {string} setGoalConfidenceLevelSelected - local variable , Sets the confidence level selected text.
   * @property {object} setCarePlanModel - local variable , Model of patient care plan.
   */
	angular.module('roundingModule')
        .controller('PatientCarePlanGoalController', function ($rootScope, $scope, $filter, $timeout, LookUp, LookupTypes, PatientCarePlanGoalService, CommonConstants,
                            Status, ExceptionService, CommonFunctions, CommonMessages, ScreenConstants, GoalsPriority) {

            $scope.NoDataAvailable = false;
            $scope.NoData = CommonMessages.NoDataAvailable;

            LookUp.GetLookUp(LookupTypes.MenuOfAction);
            LookUp.GetLookUp(LookupTypes.GoalStatus);
            LookUp.GetLookUp(LookupTypes.GoalImportanceLevel);
            LookUp.GetLookUp(LookupTypes.GoalConfidenceLevel);

            var FilterActiveCarePlan = function (data) {
                return data.GoalStatus === CommonConstants.GoalStatusCode.Inprogress || data.GoalStatus === CommonConstants.GoalStatusCode.NotStarted;
            },
            ActiveCarePlanDateSortAsc = function (date1, date2) {
                if (date1.DueDate < date2.DueDate) return -1;
                if (date1.DueDate > date2.DueDate) return 1;
                return 0;
            },
            GetActiveCarePlan = function (ptGoals) {
                if (ptGoals) {
                    ptGoals = ptGoals.filter(FilterActiveCarePlan).sort(ActiveCarePlanDateSortAsc);
                }
                return ptGoals;
            }, 
            setCarePlanTopicSelected = function (TopicCode) {
                var CarePlanTopicText = '';
                if (TopicCode) {
                    CarePlanTopicText = LookUp.GetValueByKey(LookupTypes.MenuOfAction, TopicCode).Text;
                }
                return CarePlanTopicText;
            }, 
            setGoalStatusSelected = function (GoalStatusCode) {
                var GoalStatusText = '';
                if (GoalStatusCode) {
                    GoalStatusText = LookUp.GetValueByKey(LookupTypes.GoalStatus, GoalStatusCode).Text;
                }
                return GoalStatusText;
            },
            setGoalImportanceLevelSelected = function (GoalImportanceCode) {
                var GoalImportanceText = '';
                if (GoalImportanceCode) {
                    GoalImportanceText = LookUp.GetValueByKey(LookupTypes.GoalImportanceLevel, GoalImportanceCode.toString()).Text;
                }
                return GoalImportanceText;
            },
            setGoalConfidenceLevelSelected = function (GoalConfidenceCode) {
                var GoalConfidenceText = '';
                if (GoalConfidenceCode ) {
                    GoalConfidenceText = LookUp.GetValueByKey(LookupTypes.GoalConfidenceLevel, GoalConfidenceCode.toString()).Text;
                }
                return GoalConfidenceText;
            },
            getPriorityText = function (goalPriority) {
                var priority = '';
                if (goalPriority) {
                    if (goalPriority.toUpperCase() === GoalsPriority.High.Value) {
                        return GoalsPriority.High.Text;
                    }
                    else if (goalPriority.toUpperCase() === GoalsPriority.Medium.Value) {
                        return GoalsPriority.Medium.Text;
                    }
                    else if (goalPriority.toUpperCase() === GoalsPriority.Low.Value) {
                        return GoalsPriority.Low.Text;
                    }
                }
                return priority;

            },
            setCarePlanModel = function (data) {
                var activeCarePlanModel = [];
                if (data && data.length > 0 ) {                    
                    var ptGoals = data;
                    for (var count = 0; count < ptGoals.length; count++) {
                        if (ptGoals[count].GoalStatus)
                            ptGoals[count].GoalStatusText = setGoalStatusSelected(ptGoals[count].GoalStatus);
                        else
                            ptGoals[count].GoalStatusText = "";
            
                        ptGoals[count].CarePlanTopicText = setCarePlanTopicSelected(ptGoals[count].CarePlanTopic);
                        ptGoals[count].GoalImportanceLevelText = setGoalImportanceLevelSelected(ptGoals[count].ImportanceLevel);
                        ptGoals[count].GoalConfidenceLevelText = setGoalConfidenceLevelSelected(ptGoals[count].OverallConfidenceLevel);
                        ptGoals[count].GoalPriorityText = getPriorityText(ptGoals[count].Priority);
                        ptGoals[count].StartDate = CommonFunctions.DateFunctions.dateFormat(ptGoals[count].StartDate, "mm/dd/yyyy");
                        ptGoals[count].DueDate = ptGoals[count].DueDate ? $filter('date')(ptGoals[count].DueDate, "MM/dd/yyyy") : "";
                        ptGoals[count].ReviewDate = ptGoals[count].ReviewDate ? $filter('date')(ptGoals[count].ReviewDate, "MM/dd/yyyy") : "";
                    }
                    activeCarePlanModel = GetActiveCarePlan(ptGoals);
                }
                return activeCarePlanModel;
            };

            /**
            * @ngdoc function 
            * @name getPatientGoals
            * @methodOf roundingModule.controller:PatientCarePlanGoalController  
            * @description       
            * Get Patient Care Plan Goals details properties.
            */            
            $scope.getPatientGoals = function () {
                 var goalsDetailFilter = $.param({ 'PatientUid': $rootScope.Global.Objects.SelectedPatient.UID,'ReturnSurvey': true });
                
                $timeout(function () {
                    PatientCarePlanGoalService.GetPatientGoalsDetails(goalsDetailFilter, 'POST', 'JSON', $scope.getPatientGoalsDetailsData);
                }, 0, false);
            };

            /**
            * @ngdoc function
            * @name getPatientGoalsDetailsData
            * @methodOf roundingModule.controller:PatientCarePlanGoalController
            * @description             
            ** Service based call back function of GetPatientGoalsDetails Service call.
            ** Calls setCarePlanModel.
            * @param {object} result
            * return result data of WebApi call.
            */
            $scope.getPatientGoalsDetailsData = function (result) {
                try {
                    $scope.NoDataAvailable = true;
        			if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
        			    $scope.PatientCarePlanModel = setCarePlanModel(result.data);
                        if ($scope.PatientCarePlanModel.length > 0) {
                            $scope.NoDataAvailable = false;
        			    }else{
        			        $scope.NoDataAvailable = true;
        			    }
						var scroller = $("#patient-care-plan-goal-scroller").data("kendoMobileScroller");
						if (scroller) {
						    scroller.reset();
						}
        			} else {
        			    $scope.NoDataAvailable = true;
        			}
				} catch (ex) {
        			var errExp = {};
        			errExp.Exception = ex;
        			errExp.ModuleName = "Patient Care Plan";
        			errExp.FunctionName = "getPatientGoalsDetails";
        			errExp.StackTrace = printStackTrace({ e: ex });
        			ExceptionService.LogException(Rounding.Common.HandleException(errExp));
				}

				$timeout(function () {				   
					CommonFunctions.UICanceled();
					CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
				}, 0, false);	
            };

            CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
            $scope.getPatientGoals();

        });

}());