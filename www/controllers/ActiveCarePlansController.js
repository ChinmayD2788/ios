(function () {
    /**
   * @ngdoc controller
   * @name roundingModule.controller:ActiveCarePlanDisplayListController
   * @description
   ** Controller for Active Care Plans
   */    
    angular.module('roundingModule').controller('ActiveCarePlansController', function ($rootScope, $scope, $timeout, $filter, LookUp, LookupTypes, PatientCarePlanService, ExceptionService, CommonFunctions,
                                                           Status, CommonMessages, RouteConstants, CommonConstants, PathwaysTabService) {
            //Load the lookups
            LookUp.GetLookUp(LookupTypes.MenuOfAction);
            LookUp.GetLookUp(LookupTypes.GoalStatus);
            LookUp.GetLookUp(LookupTypes.GoalImportanceLevel);
            LookUp.GetLookUp(LookupTypes.GoalConfidenceLevel);

            $scope.model = {};            
            $scope.model.ActiveCarePlanList = new kendo.data.DataSource({ data: [] });
           
            $scope.model.noDataVisible = false;
            var data = {
                'PatientUid': $rootScope.Global.Objects.SelectedPatient.UID,
                'ReturnSurvey': true
            };            

            $scope.CarePlanTopic = {};
            $scope.CarePlanTopic.Visible = false;
            $scope.CarePlanTopic.Topics = [];
            $scope.CarePlanTopic.SelectedTopic = null;
            $scope.CarePlanTopic.bIsGivenNo = true;

            $scope.Importance = {};
            $scope.Importance.Level = [];
            $scope.Importance.SelectedLevel = null;

            $scope.ClinicalRelevance = {};
            $scope.ClinicalRelevance.Source = null;
            $scope.ClinicalRelevance.SelectedText = null;

            $scope.GoalConfidenceLevel = {};
            $scope.GoalConfidenceLevel.Source = null;
            $scope.GoalConfidenceLevel.SelectedLevel = null;

            $scope.GoalStatus = {};
            $scope.GoalStatus.Source = null;
            $scope.GoalStatus.SelectedStatus = null;
            $scope.IsEdit = true;
            
            if ($rootScope.Global.Listeners.GetPatientGoalsListener) {
                $rootScope.Global.Listeners.GetPatientGoalsListener();
            }

            $rootScope.Global.Listeners.GetPatientGoalsListener = $scope.$on('getPatientGoals', function () {
                getPatientGoals();
            });

            var getPatientGoals = function () {
                PatientCarePlanService.GetPatientGoals(data, $scope.onGetPatientGoalsCompleted);
            };

            /**
             * @ngdoc event 
             * @name onGetPatientGoalsCompleted
             * @eventOf roundingModule.controller:PatientCareController
             * @param {object} data contains all goal details
             * @description 
             ** it will populate entire list for Active Care Plan 
             */

            $scope.onGetPatientGoalsCompleted = function (result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        var data = result.data;
                        if (data.length > 0) {
                            for (var cnt = 0; cnt < data.length; cnt++) {
                                if (data[cnt].GoalStatus) {
                                    var GoalStatusText = LookUp.GetValueByKey(LookupTypes.GoalStatus, data[cnt].GoalStatus);
                                    $.extend(data[cnt], { "GoalStatusText": GoalStatusText.Text });
                                }

                                $.extend(data[cnt], { "CarePlanTopicText": LookUp.GetValueByKey(LookupTypes.MenuOfAction, data[cnt].CarePlanTopic).Text });
                                //data[cnt].DueDate = CommonFunctions.DateFunctions.dateFormat(data[cnt].DueDate, "mm/dd/yyyy");

                                $.extend(data[cnt], { "OverDue": (data[cnt].DueDate && new Date($filter('date')(data[cnt].DueDate, "MM/dd/yyyy")) <= new Date($filter('date')(new Date(), "MM/dd/yyyy"))) ? true : false });

                                //data[cnt].StartDate = CommonFunctions.DateFunctions.dateFormat(data[cnt].StartDate, "mm/dd/yyyy");

                                $.extend(data[cnt], { "GoalImportanceLevelText": LookUp.GetValueByKey(LookupTypes.GoalImportanceLevel, (data[cnt].ImportanceLevel).toString() + "").Text });

                                $.extend(data[cnt], { "GoalConfidenceLevelText": LookUp.GetValueByKey(LookupTypes.GoalConfidenceLevel, (data[cnt].OverallConfidenceLevel).toString() + "").Text });

                                var GoalDueDateHistoryData = data[cnt].GoalDueDateHistory || [];
                                var GoalDueDateHistoryDataLength = GoalDueDateHistoryData.length;

                                //for (var k = 0; k < GoalDueDateHistoryDataLength; k++) {
                                //    GoalDueDateHistoryData[k]['PreviousDueDate'] = CommonFunctions.DateFunctions.dateFormat(GoalDueDateHistoryData[k]['PreviousDueDate'], "mm/dd/yyyy");
                                //    GoalDueDateHistoryData[k]['UpdatedDate'] = CommonFunctions.DateFunctions.dateFormat(GoalDueDateHistoryData[k]['UpdatedDate'], "mm/dd/yyyy");
                                //}
                                data[cnt].GoalDueDateHistory = GoalDueDateHistoryData;
                                data[cnt].CarePlanExtnCnt = GoalDueDateHistoryDataLength;

                                var GoalReviewDateHistoryData = data[cnt].GoalReviewDateHistory || [];
                                var GoalReviewDateHistoryDataLength = GoalReviewDateHistoryData.length;
                                data[cnt].GoalReviewDateHistory = GoalReviewDateHistoryData;
                                data[cnt].CarePlanReviewCnt = GoalReviewDateHistoryDataLength;

                                CommonFunctions.CreateScroller("activecareplan-list-scrolls");

                            }
                        } else {
                            $scope.model.noDataVisible = false;
                        }

                        $scope.model.ActiveCarePlanList.data(data);
                    }
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "PatientCarePlan";
                    errExp.FunctionName = "GetPatientGoalsCompleted";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            }

            /**
             * @ngdoc event 
             * @name showFullMedication
             * @eventOf roundingModule.controller:MedicationsController
             * @param {object} dataItem item of $scope.model.Medications list
             * @description 
             ** ng-click event of showFullMedication div from medications view
             ** Show hide medication            
             ** Changes UI behaviour            
             */
            $scope.showFullActivePlan = function (dataItem) {
                if ($scope.model.ActiveCarePlanList && $scope.model.ActiveCarePlanList.data()) {
                    var activeCarePlanListLen = $scope.model.ActiveCarePlanList.data().length;
                    if (activeCarePlanListLen > 0) {
                        for (var cnt = 0; cnt < activeCarePlanListLen; cnt++) {
                            if ($scope.model.ActiveCarePlanList.data()[cnt].UID !== dataItem.UID) {
                                if ($("#activecareplan-details-" + $scope.model.ActiveCarePlanList.data()[cnt].UID).is(":visible")) {
                                    $("#activecareplan-details-" + $scope.model.ActiveCarePlanList.data()[cnt].UID).hide();
                                    $("#activecareplan-details-" + $scope.model.ActiveCarePlanList.data()[cnt].UID).parent().addClass('med-details-inactive').removeClass('med-details-active');
                                }
                            }
                        }
                    }
                }

                if ($("#activecareplan-details-" + dataItem.UID).is(":visible")) {
                    $("#activecareplan-details-" + dataItem.UID).hide();
                    $("#activecareplan-details-" + dataItem.UID).parent().addClass('med-details-inactive').removeClass('med-details-active');
                } else {                    
                    $("#activecareplan-details-" + dataItem.UID).show();
                    $("#activecareplan-details-" + dataItem.UID).parent().addClass('med-details-active').removeClass('med-details-inactive');
                }
            };

            /**
             * @ngdoc event 
             * @name onActiveCarePlanEditClick
             * @eventOf roundingModule.controller:PatineCarePlanController
             * @param {object} dataItem item of model.ActiveCarePlanList.data
             * @description 
             ** k-on-tap event of Edit Entry from Active Care Plan list view
             ** Prepares MultipleSwitch, LookUp Data etc and opens Edit Active medication ModalView  
             ** 
             */
            $scope.onActiveCarePlanEditClick = function (dataItem) {
                PatientCarePlanService.SetSelectedEditActiveCarePlan(dataItem);
                $timeout(function () {
                    $("#add-patientcareplan-modalview").kendoMobileModalView("open");
                    CommonFunctions.Blockui();
                    $timeout(function () {
                        $rootScope.$broadcast('showPathway');
                    }, 500, false);

                    $timeout(function () {
                        $rootScope.$broadcast('showEditPatientCarePlan');
                        CommonFunctions.Unblockui();
                    }, 500, false);
                }, 500, false);
            };

            $scope.onAccessAddClick = function (dataItem) {                
                $timeout(function () {
                    $("#add-patientcareplan-modalview").kendoMobileModalView("open");
                    CommonFunctions.Blockui();
                    $timeout(function () {
                        $rootScope.$broadcast('showPathway');
                        CommonFunctions.Unblockui();
                    }, 500, false);
                }, 500, false);
            };

            /**
             * @ngdoc function 
             * @name getLookupItem
             * @methodOf roundingModule.controller:PatientCarePlanController    
             * @param {string} lookupType type of lookup
             * @param {string} item lookup item whose text needs to get
             * @returns {string} lookup item text
             * @description    
             ** Gets call from Medications view for lookup text based on value   
             */
            $scope.getLookupItem = function (lookupType, item) {
                return LookUp.GetValueByKey(lookupType, item).Text;
            };

            getPatientGoals();
    }).controller('EditCarePlanController', function ($rootScope, $scope, $timeout, LookUp, LookupTypes, PatientCarePlanService, ExceptionService, CommonFunctions,
                                                           Status, CommonMessages, RouteConstants, CommonConstants, PathwaysTabService) {

        $scope.model = {};
         $rootScope.IsCarePlanCameFirstTime = 0;
        if (PatientCarePlanService.GetSelectedEditActiveCarePlan()) {
            $scope.model.CarePlanTitle = "Care Plan Details";
        } else {
            $scope.model.CarePlanTitle = "New Care Plan";
        }

        var hasPatientCarePlanChanges = function () {
            var isModified = false;
            var startDate = CommonFunctions.DateFunctions.dateFormat($rootScope.DateTempData.StartDate, "mm/dd/yyyy", false);
            var startDateOrg = CommonFunctions.DateFunctions.dateFormat($rootScope.DateOrginalData.StartDate, "mm/dd/yyyy", false);

            var dueDate = CommonFunctions.DateFunctions.dateFormat($rootScope.DateTempData.DueDate, "mm/dd/yyyy", false);
            var dueDateOrg = CommonFunctions.DateFunctions.dateFormat($rootScope.DateOrginalData.DueDate, "mm/dd/yyyy", false);

            var reviewDate = CommonFunctions.DateFunctions.dateFormat($rootScope.DateTempData.ReviewDate, "mm/dd/yyyy", false);
            var reviewDateOrg = CommonFunctions.DateFunctions.dateFormat($rootScope.DateOrginalData.ReviewDate, "mm/dd/yyyy", false);

            var completedDate = CommonFunctions.DateFunctions.dateFormat($rootScope.DateTempData.CompletedDate, "mm/dd/yyyy", false);
            var completedDateOrg = CommonFunctions.DateFunctions.dateFormat($rootScope.DateOrginalData.CompletedDate, "mm/dd/yyyy", false);

            var startDateChangeStatus = !angular.equals(startDate, startDateOrg);
            var dueDateChangeStatus = !angular.equals(dueDate, dueDateOrg);
            var reviewDateChangeStatus = !angular.equals(reviewDate, reviewDateOrg);
            var completedChangeStatus = !angular.equals(completedDate, completedDateOrg);

            $rootScope.ParentChild.Careplanname = (!$rootScope.ParentChild.Careplanname) ? "" : $rootScope.ParentChild.Careplanname;
            $rootScope.ParentChildOrginalData.Careplanname = (!$rootScope.ParentChildOrginalData.Careplanname) ? "" : $rootScope.ParentChildOrginalData.Careplanname;

            $rootScope.ParentChild.BehavioralPlan = (!$rootScope.ParentChild.BehavioralPlan) ? "" : $rootScope.ParentChild.BehavioralPlan;
            $rootScope.ParentChildOrginalData.BehavioralPlan = (!$rootScope.ParentChildOrginalData.BehavioralPlan) ? "" : $rootScope.ParentChildOrginalData.BehavioralPlan;

            $rootScope.ParentChild.EngagementGoal = ($rootScope.ParentChild.EngagementGoal == null) ? "" : $rootScope.ParentChild.EngagementGoal;
            $rootScope.ParentChildOrginalData.EngagementGoal = ($rootScope.ParentChildOrginalData.EngagementGoal == null) ? "" : $rootScope.ParentChildOrginalData.EngagementGoal;

            $rootScope.ParentChild.OtherBarrierNotes = ($rootScope.ParentChild.OtherBarrierNotes == null) ? "" : $rootScope.ParentChild.OtherBarrierNotes;
            $rootScope.ParentChildOrginalData.OtherBarrierNotes = ($rootScope.ParentChildOrginalData.OtherBarrierNotes == null) ? "" : $rootScope.ParentChildOrginalData.OtherBarrierNotes;

            var importanceChangeStatus = !angular.equals($rootScope.ParentChild.Importance.SelectedLevel.Value, $rootScope.ParentChildOrginalData.Importance.SelectedLevel.Value);
            var confidenceChangeStatus = !angular.equals($rootScope.ParentChild.GoalConfidenceLevel.SelectedLevel.Value, $rootScope.ParentChildOrginalData.GoalConfidenceLevel.SelectedLevel.Value);
            var goalSelectedStatus = !angular.equals($rootScope.ParentChild.GoalStatus.SelectedStatus.Value, $rootScope.ParentChildOrginalData.GoalStatus.SelectedStatus.Value);
            var goalSelectedPriority = !angular.equals($rootScope.ParentChild.Priority.SelectedPriority.Value, $rootScope.ParentChildOrginalData.Priority.SelectedPriority.Value);
            var carePlanNameChangeStatus = !angular.equals($rootScope.ParentChild.Careplanname, $rootScope.ParentChildOrginalData.Careplanname);
            var behavioralChangeStatus = !angular.equals($rootScope.ParentChild.BehavioralPlan, $rootScope.ParentChildOrginalData.BehavioralPlan);
            var engagementChangeStatus = !angular.equals($rootScope.ParentChild.EngagementGoal, $rootScope.ParentChildOrginalData.EngagementGoal);
            var barrierNotesChangeStatus = false;

            var length = $rootScope.ParentChild.BarrierOption.length;
            for (var i = 0; i < length ; i++) {
                if ($rootScope.ParentChild.BarrierOption[i].Value != $rootScope.ParentChildOrginalData.BarrierOption[i].Value) {
                    barrierNotesChangeStatus = true;
                    break;
                }
            }
            if (barrierNotesChangeStatus == false) {
                barrierNotesChangeStatus = !angular.equals($rootScope.ParentChild.OtherBarrierNotes, $rootScope.ParentChildOrginalData.OtherBarrierNotes)
            }
            var carePlanChangeStatus = !angular.equals($rootScope.ParentChild.CarePlanTopic.SelectedTopic.Value, $rootScope.ParentChildOrginalData.CarePlanTopic.SelectedTopic.Value);
            //var clinicalStatus = !angular.equals($rootScope.ParentChild.ClinicalRelevance.SelectedText.Value, $rootScope.ParentChildOrginalData.ClinicalRelevance.SelectedText.Value);

            if (startDateChangeStatus || dueDateChangeStatus || reviewDateChangeStatus || completedChangeStatus || carePlanChangeStatus || carePlanNameChangeStatus || importanceChangeStatus || confidenceChangeStatus || goalSelectedStatus || behavioralChangeStatus || engagementChangeStatus || barrierNotesChangeStatus || $rootScope.onCarePlanUIChanged || goalSelectedPriority) {
                isModified = true;
            }
            return isModified;
        };
        /**
        * @ngdoc event 
        * @name onCancelAddCarePlanClick
        * @eventOf roundingModule.controller:PatineCarePlanController
        * @param 
        * @description 
        ** k-on-tap Cancle PatientCarePlan
        ** 
        ** 
        */
        $scope.onCancelAddCarePlanClick = function () {
            $timeout(function () {
                var isModified = hasPatientCarePlanChanges();
                if (isModified) {
                    CommonFunctions.OpenCustomConfirmBox(CommonMessages.Alert.ConfirmMessage, CommonMessages.Alert.ChangesLost, "Yes,No", function (data) {
                        if (data !== undefined && data.returnValue !== undefined) {
                            if (data.returnValue) {
                                $timeout(function () {
                                    $("#add-patientcareplan-modalview").kendoMobileModalView("close");
                                    CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
                                    PatientCarePlanService.SetSelectedEditActiveCarePlan(null);
                                    CommonFunctions.UICanceled();
                                    $rootScope.onCarePlanUIChanged = false;
                                    $rootScope.IsCarePlanCameFirstTime = 0;
                                });
                            }
                        }
                    });
                } else {
                    $("#add-patientcareplan-modalview").kendoMobileModalView("close");
                    CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
                    PatientCarePlanService.SetSelectedEditActiveCarePlan(null);

                }
            }, 100, false);
        };

        /**
             * @ngdoc event 
             * @name onSaveAddCarePlanClick
             * @eventOf roundingModule.controller:PatineCarePlanController
             * @param 
             * @description 
             ** k-on-tap Update the PatientCarePlan
             ** 
             ** 
             */
        $scope.onSaveAddCarePlanClick = function () {
             $timeout(function () {
                var isModified = hasPatientCarePlanChanges();
                if (isModified) {
                    $rootScope.$broadcast('savePathways');
                } else {
                    if (PatientCarePlanService.GetSelectedEditActiveCarePlan() ) {
                     CommonFunctions.OpenAlertBox('Alert', [{ message: CommonMessages.Alert.NoChangesFound }], null);
                    } else {
                        $rootScope.$broadcast('savePathways');
                    }                    
                }
            }, 100, false);
            //$rootScope.$broadcast('savePathways');
        };
    });
}());