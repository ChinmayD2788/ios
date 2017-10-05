(function () {
    /**
     * @ngdoc service 
     * @name roundingModule.service:PatientCareService
     * @description       
     ** PatientCareService is being used by PatientCarePan 
     ** This will be used for all service calls for PatientCarePan
     * @param {object} ServiceConstants Common Constants
     * @param {function} RoundingService Common Function
     */
    angular.module('roundingModule').factory('PatientCarePlanService', function (ServiceConstants, RoundingService) {
        //Patient/GetPatientGoals
        //Patient/AddPatientGoal
        //Patient/GetSurveyDetails
        var clinicalObj;
        /**
         * @ngdoc function
         * @name getPatientGoals
         * @methodOf roundingModule.service:PatientCarePlanService
         * @description
         ** Service Call.
         ** API : Demographics/GetPatientDetails.
         ** Gets called when the user taps on ACTIVE CARE PLAN button for ACTIVE CARE PLAN left menu.
         */

        function getPatientGoals(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPatientGoals, 'POST', 'JSON', $.param(data), callBack, true);
        }

        /**
         * @ngdoc function
         * @name getPatientDetails
         * @methodOf roundingModule.service:PatientCarePlanService
         * @description
         ** Service Call.
         ** API : GetPatientsGoals
         ** Gets called when the user taps on ACTIVE CARE PLAN button for ACTIVE CARE PLAN left menu.
         */
        function addPatientGoal(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPatientGoals, 'POST', 'JSON', data, callBack);
        }

        function getClinicalRelevance(data, callBacK) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetClinicalRelevance, 'POST', 'JSON', $.param(data), callBacK, true);
        }

        function setClinicalRelevanceObj(Clinicalobj) {
            clinicalObj = Clinicalobj;
        }

        function getClinicalRelevanceObj() {
            return clinicalObj;
        }

        var dataItem = null;
        function setSelectedEditActiveCarePlan(data) {
            dataItem = data
        }

        function getSelectedEditActiveCarePlan() {
            return dataItem;
        }

        return {
            GetPatientGoals: getPatientGoals,
            AddPatientGoal: addPatientGoal,
            GetClinicalRelevance: getClinicalRelevance,
            SetClinicalRelevanceObj: setClinicalRelevanceObj,
            GetClinicalRelevanceObj: getClinicalRelevanceObj,
            SetSelectedEditActiveCarePlan: setSelectedEditActiveCarePlan,
            GetSelectedEditActiveCarePlan: getSelectedEditActiveCarePlan
        };
    });
}());

(function () {
    angular.module('roundingModule').controller('PatientCarePlanController', function ($rootScope, $scope, $timeout, LookUp, LookupTypes, PatientCarePlanService, ExceptionService, CommonFunctions,
                                                                                       Status, CommonMessages, RouteConstants, CommonConstants, PathwaysTabService, PatientCarePlanConstants, GoalsPriority) {
        //Load the lookups
        LookUp.GetLookUp(LookupTypes.MenuOfAction);
        LookUp.GetLookUp(LookupTypes.GoalStatus);
        LookUp.GetLookUp(LookupTypes.GoalImportanceLevel);
        LookUp.GetLookUp(LookupTypes.GoalConfidenceLevel);

        $scope.model = {};
        $scope.IsEdit = false;
        $scope.model.ActiveCarePlanList = new kendo.data.DataSource({ data: [] });
        $scope.model.noDataVisible = false;
        var data = {
            'PatientUid': $rootScope.Global.Objects.SelectedPatient.UID,
            'ReturnSurvey': true
        };
        $rootScope.onCarePlanUIChanged = false;
        $scope.Barrier = {
            "PoorHabit": "Poor Habit/Practices",
            "Knowledgedeficit": "Knowledge deficit",
            "Equipmentissue": "Equipment issue",
            "Psychological": "Psychological",
            "Socioeconomic": "Socioeconomic",
            "PhysicalLimitation": "PhysicalLimitation",
            "Nosupportsystem": "Nosupportsystem",
            "NoBarriers": "NoBarriers"
        };

        if ($rootScope.Global.Listeners.ShowEditPatientCarePlan) {
            $rootScope.Global.Listeners.ShowEditPatientCarePlan();
        }

        $rootScope.Global.Listeners.ShowEditPatientCarePlan = $scope.$on('showEditPatientCarePlan', function () {
            $scope.populatedropdowns();
        });

        if ($rootScope.Global.Listeners.CarePlanDislayErrorMessagesListener) {
            $rootScope.Global.Listeners.CarePlanDislayErrorMessagesListener();
        }

        $rootScope.Global.Listeners.CarePlanDislayErrorMessagesListener = $scope.$on('carePlanDislayErrorMessages', function (e,arg) {
            $scope.carePlanDislayErrorMessages(arg);
        });
        
        /**
         * @ngdoc function 
         * @name setdatecontrols
         * @methodOf roundingModule.controller:PatientCarePlanController
         * @description    
         ** load all dropdown control and other controls from lookups   
         */
        $scope.Date.StartDate = null;
        $scope.Date.DueDate = null;
        $scope.Date.ReviewDate = null;
        $scope.Date.CompletedDate = null;
        $scope.Date.CreateDate = null;
        $rootScope.DateOrginalData = [];
        $rootScope.ParentChildOrginalData = [];
        $rootScope.DateTempData = [];

        $scope.setdatecontrols = function () {
            $scope.Date.StartDate = (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false);

            var dueDate = new Date();
            dueDate.setDate(dueDate.getDate() + 30);

            $scope.Date.DueDate = dueDate.format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false);
            $scope.Date.ReviewDate = null;
            $rootScope.DateOrginalData = angular.copy($scope.Date);
            $rootScope.DateTempData = angular.copy($scope.Date);
        };

        var todayDate = new Date();

        $scope.model.screeningMinDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 6);
        $scope.model.screeningMaxDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());

        var disableDates = function () {
            if ($(".x-added").length > 0) {
                removeDisableDates();
            }

            $(".enabledDay").each(function (i, el) {
                for (var i = 0; i < $scope.model.prevSurveyDates.length; i++) {
                    var disabledate = ($scope.model.prevSurveyDates[i]).slice(0, 10);
                    var tdate = new Date(($(el).parent()).attr('title'));
                    var curr_date = ("0" + (tdate.getDate())).slice(-2);
                    var curr_month = ("0" + (tdate.getMonth() + 1)).slice(-2);
                    var curr_year = tdate.getFullYear();
                    var dtpkdate = curr_year + "-" + curr_month + "-" + curr_date;
                    if (dtpkdate === disabledate) {
                        $(el).addClass('x-added'); //**** MR mark for future remove it
                        $(el).attr('data-num', $(el).text()); //**** MR store date
                        $(el).attr('data-parentDate', $(el).parent().attr('data-value')); //**** MR store parent date
                        $(el).attr('data-parentTitle', $(el).parent().attr('title')); //**** MR store parent title
                        $(el).html("X");
                        $(el).removeClass("enabledDay").addClass("disabledDay");
                    }
                }
            });

            $(".disabledDay").parent().removeClass("k-link"); //removing this class makes the day unselectable
            $(".disabledDay").parent().removeAttr("href"); //this removes the hyperlink styling
            $(".disabledDay").parent().removeAttr("title");
            $(".disabledDay").parent().removeAttr("data-value");
        },
        removeDisableDates = function () {
            $(".x-added").each(function (i, el) {
                $(el).html($(el).attr('data-num'));
                $(el).removeClass("disabledDay").addClass("enabledDay");
                $(el).parent().attr('data-value', $(el).attr('data-parentDate'));
                $(el).parent().attr('title', $(el).attr('data-parentTitle'));
            });
            $(".x-added").removeAttr("data-num");
            $(".x-added").removeAttr("data-parentDate");
            $(".x-added").removeAttr("data-parentTitle");

            $(".x-added").parent().addClass("k-link");
            $(".x-added").parent().attr("href", "#");
            $(".x-added").removeClass("x-added");
        },
        resetParentChild = function () {
            if (!$rootScope.ParentChild) {
                $rootScope.ParentChild = {};
            }
            $rootScope.ParentChild.CarePlanTopic = {};
            $rootScope.ParentChild.CarePlanTopic.Visible = false;
            $rootScope.ParentChild.CarePlanTopic.SelectedTopic = null;
            $rootScope.ParentChild.CarePlanTopic.Topics = [];
            $rootScope.ParentChild.CarePlanTopic.bIsGivenNo = true;

            $rootScope.ParentChild.Importance = {};
            $rootScope.ParentChild.Importance.SelectedLevel = null;
            $rootScope.ParentChild.Importance.Level = [];

            $rootScope.ParentChild.ClinicalRelevance = {};
            $rootScope.ParentChild.ClinicalRelevance.SelectedText = null;
            $rootScope.ParentChild.ClinicalRelevance.Source = null;

            $rootScope.ParentChild.GoalConfidenceLevel = {};
            $rootScope.ParentChild.GoalConfidenceLevel.SelectedLevel = null;
            $rootScope.ParentChild.GoalConfidenceLevel.Source = null;

            $rootScope.ParentChild.GoalStatus = {};
            $rootScope.ParentChild.GoalStatus.SelectedStatus = null;
            $rootScope.ParentChild.GoalStatus.Source = null;

             $rootScope.ParentChild.Priority = {};
            $rootScope.ParentChild.Priority.SelectedPriority = null;
            $rootScope.ParentChild.Priority.Source = null;

            $scope.HasOtherBarries = false;
        };

        /**
         * @ngdoc function
         * @name $scope.bindScreeningDatePicker
         * @methodOf roundingModule.controller:AllScreeningsController
         * @description 
         ** Populate date picker control with pre-defined values.
         ** Sets datepicker's min/max values.
         ** Handles change and/or open event.
         */

        $scope.model.screeningDate = "";

        $scope.bindScreeningDatePicker = function () {
            try {
                $scope.monthPickerConfig = {
                    min: new Date($scope.model.screeningMinDate),
                    max: new Date($scope.model.screeningMaxDate)                   
                };
            } catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "AllScreenings";
                errExp.FunctionName = "bindScreeningDatePicker";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
            }
        };

        /**
         * @ngdoc function 
         * @name populatedropdowns
         * @methodOf roundingModule.controller:PatientCarePlanController
         * @description    
         ** load all dropdown control and other controls from lookups   
         */
        $scope.populatedropdowns = function () {
            $timeout(function () {
                var editObj = PatientCarePlanService.GetSelectedEditActiveCarePlan();
                if (editObj) {
                    $scope.Date.StartDate = angular.copy(CommonFunctions.DateFunctions.dateFormat(CommonFunctions.DateFunctions.parseDate(editObj.StartDate), "mm/dd/yyyy", false));
                    $scope.Date.DueDate = angular.copy(CommonFunctions.DateFunctions.dateFormat(CommonFunctions.DateFunctions.parseDate(editObj.DueDate), "mm/dd/yyyy", false));
                    $scope.Date.ReviewDate = editObj.ReviewDate ? angular.copy(CommonFunctions.DateFunctions.dateFormat(CommonFunctions.DateFunctions.parseDate(editObj.ReviewDate), "mm/dd/yyyy", false)) : null;

                    if (editObj.GoalStatus == 'I' || editObj.GoalStatus == 'N') {
                        $scope.Date.CompletedDate = null;
                    } else {
                        $scope.Date.CompletedDate = CommonFunctions.DateFunctions.dateFormat(editObj.CompletedDate, "mm/dd/yyyy");
                    }                 
                    $scope.IsEdit = true;
                    $scope.extensionsCnt = editObj.GoalDueDateHistory.length;
                    $scope.reviewCnt = editObj.GoalReviewDateHistory.length;
                    $scope.GoalDueDateHistory = editObj.GoalDueDateHistory;
                    $scope.GoalReviewDateHistory = editObj.GoalReviewDateHistory;

                    $rootScope.DateOrginalData = angular.copy($scope.Date);
                    $rootScope.DateTempData = angular.copy($scope.Date);

                } else {
                    $scope.Date.CompletedDate = null;//new Date(0, 0, 0);
                    $scope.setdatecontrols();
                    $scope.IsEdit = false;
                }
                $scope.IsBarrierSelected = true;
                if ($scope.IsEdit) {
                    // dataItem.IsAdd = false;
                    //  dataItem.DataState = CommonConstants.DataState.Modified;
                    $rootScope.ParentChild.BarrierOption = [{
                        Text: 'Poor Habit/Practices',
                        Value: editObj.HasPoorHabitsPractices,
                        Id: 'HasPoorHabitsPractices'
                    }, {
                        Text: 'Knowledge deficit',
                        Value: editObj.HasKnowledgeDeficit,
                        Id: 'HasKnowledgeDeficit'
                    }, {
                        Text: 'Equipment issue',
                        Value: editObj.HasEquipmentIssue,
                        Id: 'HasEquipmentIssue'
                    }, {
                        Text: 'Psychological',
                        Value: editObj.HasPsychologicalIssue,
                        Id: 'HasPsychologicalIssue'
                    }, {
                        Text: 'Socioeconomic',
                        Value: editObj.HasSocioEconomicIssue,
                        Id: 'HasSocioEconomicIssue'
                    }, {
                        Text: 'Physical Limitation',
                        Value: editObj.HasPhysicalLimitation,
                        Id: 'HasPhysicalLimitation'
                    }, {
                        Text: 'No Support System',
                        Value: editObj.HasSupport,
                        Id: 'HasSupport'

                    }, {
                        Text: 'No Barriers',
                        Value: editObj.NoBarrier,
                        Id: 'NoBarrier'
                    }, {
                        Text: 'Other',
                        Value: editObj.HasOtherBarries,
                        Id: 'HasOtherBarries'
                    }
                    ];
                    $rootScope.ParentChild.OtherBarrierNotes = angular.copy(editObj.OtherBarrierNotes);
                } else {
                    $rootScope.ParentChild.BarrierOption = [{
                        Text: 'Poor Habit/Practices',
                        Value: false,
                        Id: 'HasPoorHabitsPractices'
                    }, {
                        Text: 'Knowledge deficit',
                        Value: false,
                        Id: 'HasKnowledgeDeficit'
                    }, {
                        Text: 'Equipment issue',
                        Value: false,
                        Id: 'HasEquipmentIssue'
                    }, {
                        Text: 'Psychological',
                        Value: false,
                        Id: 'HasPsychologicalIssue'
                    }, {
                        Text: 'Socioeconomic',
                        Value: false,
                        Id: 'HasSocioEconomicIssue'
                    }, {
                        Text: 'Physical Limitation',
                        Value: false,
                        Id: 'HasPhysicalLimitation'
                    }, {
                        Text: 'No Support System',
                        Value: false,
                        Id: 'HasSupport'

                    }, {
                        Text: 'No Barriers',
                        Value: false,
                        Id: 'NoBarrier'
                    }, {
                        Text: 'Other',
                        Value: false,
                        Id: 'HasOtherBarries'
                    }
                    ];

                    $scope.HasOtherBarries = false;
                    $rootScope.ParentChild.OtherBarrierNotes = "";
                }

                if (!$rootScope.ParentChild.CarePlanTopic) {
                    $rootScope.ParentChild.CarePlanTopic = {};
                    $rootScope.ParentChild.CarePlanTopic.Visible = false;
                    $rootScope.ParentChild.CarePlanTopic.Topics = [];
                    $rootScope.ParentChild.CarePlanTopic.SelectedTopic = null;
                    $rootScope.ParentChild.CarePlanTopic.bIsGivenNo = true;

                    $rootScope.ParentChild.Importance = {};
                    $rootScope.ParentChild.Importance.Level = [];
                    $rootScope.ParentChild.Importance.SelectedLevel = null;

                    $rootScope.ParentChild.ClinicalRelevance = {};
                    $rootScope.ParentChild.ClinicalRelevance.Source = null;
                    $rootScope.ParentChild.ClinicalRelevance.SelectedText = null;

                    $rootScope.ParentChild.GoalConfidenceLevel = {};
                    $rootScope.ParentChild.GoalConfidenceLevel.Source = null;
                    $rootScope.ParentChild.GoalConfidenceLevel.SelectedLevel = null;

                    $rootScope.ParentChild.GoalStatus = {};
                    $rootScope.ParentChild.GoalStatus.Source = null;
                    $rootScope.ParentChild.GoalStatus.SelectedStatus = null;

                    $rootScope.ParentChild.Priority = {};
                    $rootScope.ParentChild.Priority.SelectedPriority = null;
                    $rootScope.ParentChild.Priority.Source = null;
                }

                if ($scope.IsEdit == false) {
                    $rootScope.ParentChild.ClinicalRelevance.SelectedText = null;
                    $rootScope.ParentChild.ClinicalRelevance.Source = [];
                    $("#active-care-plan-scrn-dd-Clinical-Relavance").kendoDropDownList({
                        dataSource: $rootScope.ParentChild.ClinicalRelevance.Source,
                        dataTextField: "Text",
                        dataValueField: "Code",
                        template: kendo.template($("#template").html()),
                        valueTemplate: kendo.template($("#template").html()),
                        index: "-1"
                    });
                    
                    $rootScope.ParentChild.Careplanname = "";
                    $rootScope.ParentChild.BehavioralPlan = "";
                    $rootScope.ParentChild.EngagementGoal = "";
                }

                if ($rootScope.ParentChild && $rootScope.ParentChild.CarePlanTopic) {
                    $rootScope.ParentChild.CarePlanTopic.Topics = new kendo.data.DataSource({ data: [] });
                }

                var results = LookUp.GetLookUp(LookupTypes.MenuOfAction);
                var filteredResults = [];
                //**** Menu of Action Dropdown values ****//
                angular.forEach(results, function (MenuofActionValues) {
                    if (MenuofActionValues.IsShownUI) {
                        filteredResults.push(MenuofActionValues);
                    }
                });

                if (filteredResults.length !== 0) {
                    $rootScope.ParentChild.CarePlanTopic.Topics = filteredResults;
                    if ($scope.IsEdit) {
                        $.each($rootScope.ParentChild.CarePlanTopic.Topics, function (key, result) {
                            if (result) {
                                if (result.Value === editObj.CarePlanTopic) {
                                    $rootScope.ParentChild.CarePlanTopic.SelectedTopic = result;
                                }
                            }
                        });
                    } else {
                        $timeout(function () {
                            $rootScope.ParentChild.CarePlanTopic.SelectedTopic = $rootScope.ParentChild.CarePlanTopic.Topics[0];
                        }, 0);
                    }
                } else {
                    $rootScope.ParentChild.CarePlanTopic.Topics = [];
                }

                if ($scope.IsEdit) {
                    var careplandata = {
                        'PatientUID': $rootScope.Global.Objects.SelectedPatient.UID,
                        'CarePlanTopic': editObj.CarePlanTopic
                    };
                    PatientCarePlanService.GetClinicalRelevance(careplandata, $scope.onGetClinicalRelevanceCompleted);

                    $rootScope.ParentChild.Careplanname = editObj.GoalName;
                    $rootScope.ParentChild.BehavioralPlan = editObj.BehavioralPlan;
                    $rootScope.ParentChild.EngagementGoal = editObj.EngagementGoal;

                    if (editObj.HasOtherBarries) {
                        $scope.HasOtherBarries = true;
                    } else {
                        $scope.HasOtherBarries = false;
                    }
                }

                //fill Goal Importantce level ----------------
                //**** Goal Importance Look up Values ****//
                results = LookUp.GetLookUp(LookupTypes.GoalImportanceLevel);
                filteredResults = [];
                angular.forEach(results, function (GoalImportanceLevelValues) {
                    if (GoalImportanceLevelValues.IsShownUI) {
                        filteredResults.push(GoalImportanceLevelValues);
                    }
                });

                if (filteredResults.length !== 0) {
                    $rootScope.ParentChild.Importance.Level = filteredResults;
                    if ($scope.IsEdit) {
                        $.each($rootScope.ParentChild.Importance.Level, function (key, result) {
                            if (result) {
                                if (editObj.ImportanceLevel.toString() === result.Value) {
                                    $rootScope.ParentChild.Importance.SelectedLevel = result;
                                }
                            }
                        });
                    } else {
                        $rootScope.ParentChild.Importance.SelectedLevel = $rootScope.ParentChild.Importance.Level[0];
                    }
                } else {
                    $rootScope.ParentChild.Importance.Level = [];
                }

                // Goal confidence level---
                results = LookUp.GetLookUp(LookupTypes.GoalConfidenceLevel);
                filteredResults = [];
                angular.forEach(results, function (GoalConfidenceLevelValues) {
                    if (GoalConfidenceLevelValues.IsShownUI) {
                        filteredResults.push(GoalConfidenceLevelValues);
                    }
                });

                if (filteredResults.length !== 0) {
                    $rootScope.ParentChild.GoalConfidenceLevel.Source = filteredResults //new kendo.data.DataSource({ data: filteredResults });
                    if ($scope.IsEdit) {
                        $.each($rootScope.ParentChild.GoalConfidenceLevel.Source, function (key, result) {
                            if (result) {
                                if (editObj.OverallConfidenceLevel.toString() === result.Value) {
                                    $rootScope.ParentChild.GoalConfidenceLevel.SelectedLevel = result;
                                }
                            }
                        });
                    } else {
                        $timeout(function () {
                            if(angular.isDefined($rootScope.ParentChild.GoalConfidenceLevel.Source[0])){
                                $rootScope.ParentChild.GoalConfidenceLevel.SelectedLevel = $rootScope.ParentChild.GoalConfidenceLevel.Source[0];
                                $rootScope.ParentChildOrginalData = angular.copy($rootScope.ParentChild);
                            }
                        }, 0);
                    }
                } else {
                    $rootScope.ParentChild.GoalConfidenceLevel.Source = [];
                }

                results = LookUp.GetLookUp(LookupTypes.GoalStatus);
                filteredResults = [];
                //Filter Results for Goal Status
                angular.forEach(results, function (goalStatusValues) {
                    if (goalStatusValues.IsShownUI) {
                        filteredResults.push(goalStatusValues);
                    }
                });

                if (filteredResults.length !== 0) {
                    $rootScope.ParentChild.GoalStatus.Source = filteredResults;
                    if ($scope.IsEdit) {
                        $.each($rootScope.ParentChild.GoalStatus.Source, function (key, result) {
                            if (result) {
                                if (editObj.GoalStatus.toString() === result.Value) {
                                    $rootScope.ParentChild.GoalStatus.SelectedStatus = result;
                                }
                            }
                        });
                    } else {
                        $rootScope.ParentChild.GoalStatus.SelectedStatus = $rootScope.ParentChild.GoalStatus.Source[0];
                    }
                } else {
                    $rootScope.ParentChild.GoalStatus.Source = [];
                }

                results = [];
                results.push({ 'Text': "Select a Value", 'Value': null, 'IsShownUI' : true });
                for (var goalPriorityProp in GoalsPriority) {
                    results.push(GoalsPriority[goalPriorityProp]);
                }

                if (filteredResults.length !== 0) {
                    $rootScope.ParentChild.Priority.Source = results;
                    $rootScope.ParentChild.Priority.SelectedPriority = $rootScope.ParentChild.Priority.Source[0];
                    if ($scope.IsEdit) {
                        $.each($rootScope.ParentChild.Priority.Source, function (key, result) {
                            if (result) {
                                if (editObj.Priority && editObj.Priority.toString().toUpperCase() === result.Value) {
                                    $rootScope.ParentChild.Priority.SelectedPriority = result;
                                }
                            }
                        });
                    }
                } else {
                    $rootScope.ParentChild.Priority.Source = [];
                }
                $rootScope.ParentChildOrginalData = angular.copy($rootScope.ParentChild);
            }, 0, true);
        };

        /**
         * @ngdoc event 
         * @name onGetClinicalRelevanceCompleted
         * @eventOf roundingModule.controller:PatineCarePlanController
         * @param 
         * @description 
         ** callback function for  GetClinicalRelevance  
         ** filled the $rootScope.ParentChild.ClinicalRelevance.Source datasource and set the $rootScope.ParentChild.ClinicalRelevance.SelectedText
         ** text 
         */

        $scope.onGetClinicalRelevanceCompleted = function (result) {
            try {
                if (result) {
                    var clinicalItems = PatientCarePlanService.GetSelectedEditActiveCarePlan();  //PatientCarePlanService.GetClinicalRelevanceObj();

                    if (result.data) {
                        if (result.data.length > 0) {

                            var ClinicalRelevances = [],
                                defaultClinicalRelevance = {
                                    Code: '',
                                    Text: 'Select a value',
                                    Color:2
                                };

                            ClinicalRelevances.push(defaultClinicalRelevance);

                            angular.forEach(result.data, function (item) {
                                ClinicalRelevances.push(item);
                            });
                            $rootScope.ParentChild.ClinicalRelevance.Source = ClinicalRelevances;

                           if ($rootScope.ParentChild.ClinicalRelevance.Source) {
                                var len = $rootScope.ParentChild.ClinicalRelevance.Source.length;
                                for (var countItem = 0; countItem < len; countItem++) {
                                    $rootScope.ParentChild.ClinicalRelevance.Source[countItem].ClinicalRelevanceToColor = 'ClinicalRelevance' +
                                        PatientCarePlanConstants.ClinicalRelevanceItemColor[$rootScope.ParentChild.ClinicalRelevance.Source[countItem].Color];
                                }
                            }

                            $("#active-care-plan-scrn-dd-Clinical-Relavance").kendoDropDownList({
                                dataSource: $rootScope.ParentChild.ClinicalRelevance.Source,
                                dataTextField: "Text",
                                dataValueField: "Code",
                                template: kendo.template($("#template").html()),
                                valueTemplate: kendo.template($("#template").html()),
                                index: 0,
                                select: function (e) {
                                    $rootScope.ParentChild.ClinicalRelevance.SelectedText = this.dataItem(e.item);
                                }
                            });
                          
                            $rootScope.ParentChild.ClinicalRelevance.SelectedText = $rootScope.ParentChild.ClinicalRelevance.Source[0];
                          
                            if ($scope.IsEdit) {
                                var mapStatus = false;
                                $.each(result.data, function (key1, val) {
                                    if (val.Type === CommonConstants.ClinicalRelevanceType.SC) {
                                        if (val.Text === clinicalItems.ClinicalRelevance) {
                                            $rootScope.ParentChild.ClinicalRelevance.SelectedText = val;
                                            mapStatus = true;
                                            $("#active-care-plan-scrn-dd-Clinical-Relavance").data("kendoDropDownList").value(val.Code);
                                        }
                                    } else if (val.Type === CommonConstants.ClinicalRelevanceType.CLI) {
                                        if (val.Code === clinicalItems.ClinicalRelevance) {
                                            $rootScope.ParentChild.ClinicalRelevance.SelectedText = val;
                                            mapStatus = true;
                                            $("#active-care-plan-scrn-dd-Clinical-Relavance").data("kendoDropDownList").value(val.Code);
                                        }
                                    }
                                });
                                if (mapStatus == false) {
                                    var otherItem = {
                                        Code: clinicalItems.ClinicalRelevance,
                                        Text: clinicalItems.ClinicalRelevance
                                    };
                                    $rootScope.ParentChild.ClinicalRelevance.Source.push(otherItem);
                                    $rootScope.ParentChild.ClinicalRelevance.SelectedText = otherItem;
                                    $("#active-care-plan-scrn-dd-Clinical-Relavance").data("kendoDropDownList").dataSource.add(otherItem);
                                    $("#active-care-plan-scrn-dd-Clinical-Relavance").data("kendoDropDownList").value(otherItem.Code);
                                }
                                $rootScope.ParentChildOrginalData.ClinicalRelevance = angular.copy($rootScope.ParentChild.ClinicalRelevance);
                            }
                        } else {
                            $rootScope.ParentChild.ClinicalRelevance.SelectedText = null;
                            $rootScope.ParentChild.ClinicalRelevance.Source = [];
                        }
                    }
                }
            } catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "PatientCarePlan";
                errExp.FunctionName = "onGetClinicalRelevanceCompleted";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
            }
        };

        $scope.onClinicalRelevanceClicked = function () {
            $('#active-care-plan-scrn-dd-Clinical-Relavance').data("kendoDropDownList").open();
        };

        /**
         * @ngdoc event 
         * @name onCarePlanTopicChange
         * @eventOf roundingModule.controller:PatineCarePlanController
         * @param 
         * @description 
         ** to set the value in the clinical relevance text it will get value   
         ** onCarePlanTopicChange and respective value for clinicalrelevance dropdown will be filled.
         ** 
         */
        $scope.onCarePlanTopicChange = function (topic) {
            var careplandata = {
                'PatientUID': $rootScope.Global.Objects.SelectedPatient.UID,
                'CarePlanTopic': topic.Value
            };
            PatientCarePlanService.GetClinicalRelevance(careplandata, $scope.onGetClinicalRelevanceCompleted);
        };
       
        $rootScope.onCarePlanSurveyUIChangedFunction = function () {
            $rootScope.onCarePlanUIChanged = true;
        };
        $rootScope.onCarePlanDateValChangedFunction = function () {
            $rootScope.DateTempData = $scope.Date;
        };
        /**
         * @ngdoc event 
         * @name onClinicalRelavanceChange
         * @eventOf roundingModule.controller:ActiveCareplanDisplayList  
         * @description              
         ** get the selected ClinicalRelavance and set the text clinicalrelavance text    
         */

        $scope.onClinicalRelavanceChange = function (item) {
            $rootScope.ParentChild.ClinicalRelevance.SelectedText = item;
        };

        /**
          * @ngdoc event 
          * @name onClinicalRelavanceChange
          * @eventOf roundingModule.controller:ActiveCareplanDisplayList  
          * @description              
          ** get the selected ClinicalRelavance and set the text clinicalrelavance text    
          */

        $scope.onStatusChange = function (item) {
            if (item.Value === '' || item.Value === 'I' || item.Value === 'N') {
                $scope.Date.CompletedDate = new Date(0, 0, 0);
                $(".active-careplan-completed-date").find("span.k-tooltip-validation").hide();
            }
            $rootScope.ParentChild.GoalStatus.SelectedStatus = item;
            };

        $scope.onConfidenceLevelChange = function (item) {
            $rootScope.ParentChild.GoalConfidenceLevel.SelectedLevel = item;
            if ($rootScope.ParentChild.GoalStatus.SelectedStatus.Value === '' || $rootScope.ParentChild.GoalStatus.SelectedStatus.Value === 'I' || $rootScope.ParentChild.GoalStatus.SelectedStatus.Value === 'N') {
                $scope.Date.CompletedDate = null;
            }
        };

        $scope.onPriorityChange = function (item) {
             $rootScope.ParentChild.Priority.SelectedPriority = item;
        };
        /**
         * @ngdoc event 
         * @name onSwitchChange
         * @eventOf roundingModule.controller:ActiveCareplanDisplayList  
         * @description       
         ** k-on-change event of kendo mobile swtich 
         ** Display survey question and/or pre-populated option based on response    
         */
        $scope.onSwitchChange = function (optionId) {
            try {
                var isEditStatus = $scope.IsEdit;

                var length = $rootScope.ParentChild.BarrierOption.length;
                if (optionId == "NoBarrier") {
                    for (var i = 0; i < length ; i++) {
                        if ($rootScope.ParentChild.BarrierOption[i].Id != 'NoBarrier') {
                            $rootScope.ParentChild.BarrierOption[i].Value = false;
                            }
                            }
                    $scope.HasOtherBarries = false;
                    $rootScope.ParentChild.OtherBarrierNotes = null;
                    } else {
                    for (var i = 0; i < length ; i++) {
                        if ($rootScope.ParentChild.BarrierOption[i].Id == 'NoBarrier') {
                            $rootScope.ParentChild.BarrierOption[i].Value = false;
                        }
                            }
                            }

                if (optionId === "HasOtherBarries") {
                    if ($rootScope.ParentChild.BarrierOption[8].Value) {
                        $scope.HasOtherBarries = true;
         } else {
                        $scope.HasOtherBarries = false;
                    }
                    $rootScope.ParentChild.OtherBarrierNotes = null;
                    }
                        //$scope.IsBarrierSelected = false;
                for (var i = 0; i < length ; i++) {
                    if ($rootScope.ParentChild.BarrierOption[i].Value) {
                        $scope.IsBarrierSelected = true;
                        break;
                    }
                    }
                    } catch (ex) {
                        var errExp = {};
                        errExp.Exception = ex;
                        errExp.ModuleName = "ActiveCareplanDisplayList";
                errExp.FunctionName = "onSwitchChange";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
            }
            };

        $scope.onEditSwitchChange = function (option) {
            try {
                if (option) {
                    $scope.IsBarrierSelected = false;
                    } else {
                    $scope.IsBarrierSelected = true;
        }
        } catch (ex) {
            var errExp = {};
            errExp.Exception = ex;
            errExp.ModuleName = "ActiveCareplanDisplayList";
                errExp.FunctionName = "onSwitchChange";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
    }
    };

        /**
         * @ngdoc event 
         * @name onUpdatedPtGoalCompleted
         * @eventOf roundingModule.controller:PatineCarePlanController
         * @param 
         * @description 
         **          
         */
        $scope.onUpdatedPtGoalCompleted = function (data) {
            try {
                if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                    CommonFunctions.UICanceled();
                    CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.CarePlanSaved);
                }
            } catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "PathwaysTab";
                errExp.FunctionName = "onUpdatedPtGoalCompleted";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
    }
            CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
    };

        /**
        * @ngdoc function 
        * @name $scope.carePlanDislayErrorMessages
        * @methodOf roundingModule.controller:PatineCarePlanController           
        * @description       
        ** Calls care plan display error messages on save
        */
        $scope.carePlanDislayErrorMessages = function (arg) {
            if (arg) {
                $scope.IsBarrierSelected = arg.Barrier;
            }
        };

        resetParentChild();
        $scope.bindScreeningDatePicker();
        $scope.populatedropdowns();        
    });    
}());