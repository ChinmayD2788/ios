/// <reference path="LogoutPopoverController.js" />
(function () {
    /**
     * @ngdoc service 
     * @name roundingModule.service:PathwaysTabService
     * @description       
     ** PathwaysTabService is being used by PathwaysTabController
     ** This will be used for all service calls for Pathways
     * @param {object} ServiceConstants Common Constants
     * @param {function} RoundingService Common Function
     */
    angular.module('roundingModule').factory('PathwaysTabService', function (ServiceConstants, RoundingService) {
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:PathwaysTabService
         * @name getPatientSurveyDetails
         * @description
         ** Calls GetPatientSurveyDetails api 'Pathways/GetPatientSurveyDetails' using RoundingService       
         * @param {object} data Data: Patient survey detail filter    
         * @param {function} callBack $scope.onGetPatientSurveyDetailsRetrieved
         */
        function getPatientSurveyDetails(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPatientSurveyDetails, 'POST', 'JSON', data, callBack);
        }

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:PathwaysTabService
         * @name getPathwayHeaderData
         * @description
         ** Calls GetPathwayHeaderData api 'Patient/GetPathwayHeaderData' using RoundingService  
         ** Retrieves header items from service      
         * @param {object} data Data: Pathwaytype and PatientUID        
         * @param {function} callBack $scope.onGetPathwayHeaderDataRetrieved 
         */
        function getPathwayHeaderData(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPathwayHeaderData, 'POST', 'JSON', data, callBack);
        }

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:PathwaysTabService
         * @name getSurveyHeaderData
         * @description
         ** Calls GetPathwayHeaderData api 'Patient/GetSurveyHeaderData' using RoundingService  
         ** Retrieves header items from service      
         * @param {object} data Data: Pathwaytype and PatientUID        
         * @param {function} callBack $scope.onGetPathwayHeaderDataRetrieved 
         */
        function getSurveyHeaderData(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetSurveyHeaderData, 'POST', 'JSON', data, callBack, true);
        }

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:PathwaysTabService
         * @name getSurveyHeaderData
         * @description
         ** Calls GetPathwayHeaderData api 'Patient/GetSurveyHeaderData' using RoundingService  
         ** Retrieves header items from service      
         * @param {object} data Data: Pathwaytype and PatientUID        
         * @param {function} callBack $scope.onGetPathwayHeaderDataRetrieved 
         */
        function getImmunizationsHistoryData(data, callBack) {            
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPatientImmunization, 'POST', 'JSON', data, callBack, true);
        }

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:PathwaysTabService
         * @name getSurveyDetails
         * @description
         ** Calls GetSurveyDetails api 'Pathways/GetSurveyDetails' using RoundingService 
         ** Retrieves survey detail from service
         * @param {object} data Data: Survey detail filter  
         * @param {function} callBack $scope.onGetSurveyDetailsRetrieved      
         */
        function getSurveyDetails(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetSurveyDetails, 'POST', 'JSON', data, callBack);
        }

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:PathwaysTabService
         * @name getPrePopulatedResponse
         * @description
         ** Calls GetPrePopulatedResponse api 'Patient/GetPrePopulatedResponse' using RoundingService 
         ** Retrieve prePopulated response of the survey question from service
         * @param {object} data Data: PatientUID and QuestionUID  
         * @param {function} callBack $scope.onGetPrePopulatedResponseRetrieved     
         */
        function getPrePopulatedResponse(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPrePopulatedResponse, 'POST', 'JSON', data, callBack);
        }

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:PathwaysTabService
         * @name saveSurveyDetails
         * @description
         ** Calls SaveSurveyDetails api 'Pathways/SaveSurveyDetails' using RoundingService
         ** Saves survey details   
         * @param {object} data Data: Pathway survey response to be saved        
         * @param {string} callBack $scope.onSaveSurveyDetailsCompleted     
         */
        function saveSurveyDetails(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.SaveSurveyDetails, 'POST', 'JSON', data, callBack);
        }

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:PathwaysTabService
         * @name addPtDiabScreening
         * @description
         ** Calls AddPtDiabScreening api 'Patient/AddPtDiabScreening' using RoundingService
         ** Saves diabetic screening      
         * @param {object} data Data: Diabetic screening survey detail      
         * @param {string} callBack  $scope.onAddPtDiabScreeningCompleted    
         */
        function addPtDiabScreening(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.AddPtDiabScreening, 'POST', 'JSON', data, callBack);
        }

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:PathwaysTabService
         * @name addPtImmunization
         * @description
         ** Calls AddPtDiabScreening api 'Patient/addPtImmunization' using RoundingService
         ** Saves diabetic screening      
         * @param {object} data Data: Immunization Shots information detail with may or may not suvery detail      
         * @param {string} callBack  $scope.onAddPtImmunizationCompleted    
         */
        function addPtImmunization(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.AddPtImmunization, 'POST', 'JSON', data, callBack);
        }
        
        function addPatientGoal(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.AddPatientGoal, 'POST', 'JSON', $.param(data), callBack, true);
        }

        function updatePatientGoal(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.UpdatePatientGoal, 'POST', 'JSON', $.param(data), callBack, true);
        }

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:PathwaysTabService
         * @name SetPatientCarePlan
         * @description
         ** Calls AddPtDiabScreening api 'Patient/addPtImmunization' using RoundingService
         ** Saves diabetic screening      
         * @param {object} data Data: Immunization Shots information detail with may or may not suvery detail      
         * @param {string} callBack  $scope.onAddPtImmunizationCompleted    
         */
        var patiencareObj;
        function setPatientCarePlanObj(obj) {
            patiencareObj = obj;
        }

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:PathwaysTabService
         * @name SetPatientCarePlan
         * @description
         ** Calls AddPtDiabScreening api 'Patient/addPtImmunization' using RoundingService
         ** Saves diabetic screening      
         * @param {object} data Data: Immunization Shots information detail with may or may not suvery detail      
         * @param {string} callBack  $scope.onAddPtImmunizationCompleted    
         */

        function getPatientCarePlanObj() {
            return patiencareObj;
        }

        return {
            GetPatientSurveyDetails: getPatientSurveyDetails,
            GetSurveyDetails: getSurveyDetails,
            GetPathwayHeaderData: getPathwayHeaderData,
            GetPrePopulatedResponse: getPrePopulatedResponse,
            SaveSurveyDetails: saveSurveyDetails,
            AddPtDiabScreening: addPtDiabScreening,
            AddPtImmunization: addPtImmunization,
            GetSurveyHeaderData: getSurveyHeaderData,
            GetImmunizationsHistoryData: getImmunizationsHistoryData,
            SetPatientCarePlanObj: setPatientCarePlanObj,
            GetPatientCarePlanObj:getPatientCarePlanObj,
            AddPatientGoal: addPatientGoal,
            UpdatePatientGoal: updatePatientGoal
        }
    });
}());

(function () {
    /**
     * @ngdoc controller
     * @name roundingModule.controller:PathwaysTabController
     * @description
     * Controller for VHN Pathways
     * @property {object} $scope.model model of PathwaysTabController
     * @property {object} $scope.model.SurveyDetails property of $scope.model used for SurveyDetails
     * @property {object} $scope.model.CopySurveyDetails property of $scope.model used for CopySurveyDetails
     * @property {object} $scope.Buttons property of $scope used for Buttons
     * @property {object} $scope.DropDowns property of $scope used for DropDowns
     * @property {string} $scope.model.RadioOption property of $scope.model used for RadioOption
     * @property {string} $scope.model.SurveyType property of $scope.model used for SurveyType
     * @property {string} $scope.SelectedSurveyType Selected survey type, default value null
     * @property {string} $scope.ContactNoteText Contact note text, default value ""
     * @property {boolean} $scope.IsSurveydetailsCommentsVisible Boolean value to make survey comments visible, default value true
     * @property {boolean} $scope.IsSurveydetailsCommentCheckBoxDisabled Boolean value to make survey comments checkbox disable, default value true
     * @property {boolean} $scope.IsSurveydetailsCommentDisabled Boolean value to make survey comments disable, default value true
     * @property {boolean} $scope.IsPathwaysTab Boolean value for pathways tab, default value false
     */
    angular.module('roundingModule')
        .controller('PathwaysTabController', function ($rootScope, $scope, PathwaysTabService, ExceptionService, CommonFunctions, LookUp,
                                                       LookupTypes, CommonMessages, ScreenConstants, ScreeningsSurveyTypes, PatientPathwaysTabService,
                                                       DiabetesScreeningType, CommonConstants, PatientCarePlanService, RouteConstants, RoleTypeConstants,
                                                       DiabetesScreeningResult, ImmnunizationType, ContactConstants, Status, $timeout, ScreenHeaderConstant, AbnormalitiesConstants) {
            $scope.model = {
                SurveyDetails: [],
                CopySurveyDetails: null,
                RadioOption: "",
                CurrentScreen: "",
                SurveyType: ""
            };

            $scope.model.SurveyDetails = new kendo.data.DataSource({ data: [] });
            $scope.model.CopySurveyDetails = new kendo.data.DataSource({ data: [] });
            $scope.model.RadioOption = "";
           
            if ($rootScope.Global.Listeners.SavePathwaysListener) {
                $rootScope.Global.Listeners.SavePathwaysListener();
            }

            $rootScope.Global.Listeners.SavePathwaysListener = $scope.$on('savePathways', function () {
                $scope.savePathways();
            });

            if ($rootScope.Global.Listeners.ShowPathwayListener) {
                $rootScope.Global.Listeners.ShowPathwayListener();
            }

            $rootScope.Global.Listeners.ShowPathwayListener = $scope.$on('showPathway', function () {
                $scope.showPathway();
            });

            if ($rootScope.Global.Objects.SelectedPatient.IsESCOMarket) {
                $scope.isESCOPatient = true;
            } else {
                $scope.isESCOPatient = false;
            }
            $scope.MaxDate = new Date();
            $scope.MaxDate.setHours(23, 59, 59, 0);

            $scope.IsFocusScriptDisabled = false;

            PathwaysTabService.SurveyDetail = null;
            $scope.IsSurveydetailsCommentsVisible = true;
            $scope.IsSurveydetailsCommentCheckBoxDisabled = true;
            $scope.IsSurveydetailsCommentDisabled = true;
            $scope.SelectedSurveyType = null;
            $scope.IsPathwaysTab = false;
            $scope.IsImmunization = false;
            $scope.VHNVerificationTaskDisabled = true;
            $scope.Buttons = { "AddButtonVisible": false, "PostponeButtonVisible": false, "SaveButtonVisible": false, "CancelButtonVisible": false };
            LookUp.GetLookUp(LookupTypes.SurveyType);
            LookUp.GetLookUp(LookupTypes.ScreeningResult);
            LookUp.GetLookUp(LookupTypes.ScreeningRefusalReason);
            LookUp.GetLookUp(LookupTypes.ScreeningDirection);
            LookUp.GetLookupDisplay(LookupTypes.SensoryFootExamResult,"DisplayOrder");
            LookUp.GetLookupDisplay(LookupTypes.PulseFootExamResult,"DisplayOrder");

            //Load the lookups
            LookUp.GetLookUp(LookupTypes.MenuOfAction);
            LookUp.GetLookUp(LookupTypes.GoalStatus);
            LookUp.GetLookUp(LookupTypes.GoalImportanceLevel);
            LookUp.GetLookUp(LookupTypes.GoalConfidenceLevel);

            var lookupRequest = {
                "parentLookupType": LookupTypes.DiabeticScreening,
                "childLookupType": LookupTypes.FootDeformities,
                "isNoCache": false
            }
            LookUp.GetParentChildLookUp(lookupRequest);

            lookupRequest = {
                "parentLookupType": LookupTypes.DiabeticScreening,
                "childLookupType": LookupTypes.EyeAnamolies,
                "isNoCache": false
            }
            LookUp.GetParentChildLookUp(lookupRequest);

            var lookupRequest = {
                "parentLookupType": LookupTypes.ImmunizationType,
                "childLookupType": LookupTypes.ImmunizationBrandName,
                "isNoCache": false
            }

            LookUp.GetParentChildLookUp(lookupRequest);

            $scope.BrandNameOther = {
                Visible: false
            };
            $rootScope.tempActiveCaraData = {};
            $scope.model.SurveyType = "";
            $scope.ContactNoteText = "";
            $scope.SelectedSurveyType = "";

            $scope.ImmunizationDD = {};
            $scope.GivenDD = {};
            $scope.BrandnameDD = {};
            $scope.Immunization = {}
            $scope.ReasonNotGiven = {};

            $scope.ImmunizationDD.Visible = false;
            $scope.ImmunizationDD.SelectedType = null;
            $scope.ImmunizationDD.Results = [];
            $scope.ImmunizationDD.SelectedResult = null;
            $scope.ImmunizationDD.bIsGivenNo = true;
            $scope.Immunization.SelectedDate = null;

            $scope.BrandnameDD.ResultsVisible = false;
            $scope.BrandnameDD.Results = [];
            $scope.BrandnameDD.SelectedResult = null;

            $scope.ReasonNotGiven.Reasons = [];
            $scope.ReasonNotGiven.SelectedReason = null;

            $scope.IsMedicalCnd = {};
            $scope.IsMedicalCnd.Visible = false;

            $scope.BrandnameDD.IsDisabled = true;
            $rootScope.IsCarePlanCameFirstTime = 0;
            if (!$rootScope.ParentChild) {
                $rootScope.ParentChild = {};
            } else {
                if ($rootScope.ParentChild.CarePlanTopic) {
                    $rootScope.ParentChild.CarePlanTopic.SelectedTopic = $rootScope.ParentChild.CarePlanTopic.Topics[0];
                    $rootScope.ParentChild.CarePlanTopic.bIsGivenNo = true;
                }

                if ($rootScope.ParentChild.Importance) {
                    $rootScope.ParentChild.Importance.SelectedLevel = $rootScope.ParentChild.Importance.Level[0];
                }

                if ($rootScope.ParentChild.ClinicalRelevance) {
                    $rootScope.ParentChild.ClinicalRelevance.SelectedText = null;
                }

                if ($rootScope.ParentChild.GoalConfidenceLevel) {
                    $rootScope.ParentChild.GoalConfidenceLevel.SelectedLevel = $rootScope.ParentChild.GoalConfidenceLevel.Source[0];
                }

                if ($rootScope.ParentChild.GoalStatus) {
                    $rootScope.ParentChild.GoalStatus.SelectedStatus = $rootScope.ParentChild.GoalStatus.Source[0];
                }

                 if ($rootScope.ParentChild.Priority) {
                    $rootScope.ParentChild.Priority.SelectedPriority = $rootScope.ParentChild.Priority.Source[0];
                }

                $rootScope.ParentChild.Careplanname = "";
                $rootScope.ParentChild.BehavioralPlan = "";
                $rootScope.ParentChild.EngagementGoal = "";
                if ($rootScope.ParentChild.BarrierOption) {
                    $.each($rootScope.ParentChild.BarrierOption, function (key, barrier) {
                        barrier.Value = false;
                    });
                }
            }

            $scope.Date = {};
            $scope.IsEditCarelan = false;
            $scope.IsPatientCarePlan = false;

            $scope.addEditActivecareplanValidator = {};

            /**
             * @ngdoc function 
             * @name getSurveyDetails
             * @methodOf roundingModule.controller:PathwaysTabController           
             * @description       
             ** Calls PathwaysTabService.GetSurveyDetails
             */
            $scope.getSurveyDetails = function () {
                try {
                    var SurveyDetailFilter = { SurveyTypeCode: $scope.model.SurveyType, PatientUID: $rootScope.Global.Objects.SelectedPatient.UID, HarUID: '', NoOfSurveys: 0 }
                    PathwaysTabService.GetSurveyDetails(SurveyDetailFilter, $scope.onGetSurveyDetailsRetrieved);
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "PathwaysTab";
                    errExp.FunctionName = "getSurveyDetails";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            $scope.DropDowns = {
                Visible: false,
                Types: new kendo.data.DataSource({ data: []}),
                SelectedType: null,
                Results: [],
                SelectedResult: null,
                ResultsVisible: false,

                Modes: [],
                SelectedMode: null,
                ModesVisible: false,

                SensoryOptions: [],
                SelectedSensoryLeftFoot: null,
                SelectedSensoryRightFoot: null,
                PulseOptions: [],
                SelectedPulseLeftFoot: null,
                SelectedPulseRightFoot: null,        
                SensoryPulseVisible: false,
                
                ResultsChild: new kendo.data.DataSource({ data: [] }),
                SelectedResultChildLabel: "",
                ResultsChildVisible: false,
                ResultsChildListVisible: false,
                SelectedDate: null,
                IsOtherAbnormalitySelected: false,
                OtherAbnormalityText : null
            }

            $scope.abnormalityChecked = function (dataItem) {
                if (dataItem && dataItem.Value === AbnormalitiesConstants.Other) {
                    $scope.DropDowns.OtherAbnormalityText = null;
                    if (dataItem.IsChecked) {
                        $scope.DropDowns.IsOtherAbnormalitySelected = true;
                    }
                    else {
                        $scope.DropDowns.IsOtherAbnormalitySelected = false;
                    }
                }
                
            };

            /**
             * @ngdoc event 
             * @name onResultChange
             * @eventOf roundingModule.controller:PathwaysTabController  
             * @description       
             ** ng-chnage event of select result
             ** Populates drop downs based on business rules
             ** Changes UI for diabetic screening 
             */
            $scope.onResultChange = function () {
                if ($scope.DropDowns.SelectedResult) {
                    $scope.DropDowns.IsOtherAbnormalitySelected = false;
                    $scope.DropDowns.OtherAbnormalityText = null;
                    if ($scope.DropDowns.SelectedResult.Value === DiabetesScreeningResult.Abnormal) {
                        $scope.DropDowns.SelectedResultChildLabel = "Abnormalities";
                        $scope.populateResultChildDropDown();
                    } else if ($scope.DropDowns.SelectedResult.Value === DiabetesScreeningResult.PatientRefused) {
                        $scope.DropDowns.SelectedResultChildLabel = "Refused Reasons";
                        $scope.populateResultChildDropDown();
                    } else {
                        $scope.DropDowns.SelectedResultChildLabel = "";
                        $scope.DropDowns.ResultsChildVisible = false;
                        $scope.DropDowns.ResultsChild = new kendo.data.DataSource({
                            data: []
                        });
                    }
                }

                if ($scope.BrandnameDD.SelectedResult) {
                    if ($scope.BrandnameDD.SelectedResult.Value === "OTH") {
                        $scope.BrandNameOther.Visible = true;
                    } else {
                        $scope.BrandNameOther.Visible = false;
                    }
                }

                if ($scope.ImmunizationDD.SelectedOption) {
                    if ($scope.ImmunizationDD.SelectedOption.Text === "No") {
                        $scope.ImmunizationDD.bIsGivenNo = false;
                    } else {
                        $scope.ReasonNotGiven.SelectedReason = $scope.ReasonNotGiven.Reasons[0];
                        $scope.ImmunizationDD.bIsGivenNo = true;
                    }
                }

                if ($scope.ImmunizationDD.Types) {
                    if ($scope.ImmunizationDD.SelectedType.Text !== "No") {
                        //    $scope.ImmunizationDD.bIsGivenNo = false;
                    } else {
                        //  $scope.ReasonNotGiven.SelectedReason = $scope.ReasonNotGiven.Reasons[0];
                        //  $scope.ImmunizationDD.bIsGivenNo = true;
                    }
                }

                if ($scope.ReasonNotGiven.Reasons) {
                    if ($scope.ReasonNotGiven.SelectedReason && $scope.ReasonNotGiven.SelectedReason.Value === "MC") {
                        $scope.IsMedicalCnd.Visible = true;
                    } else {
                        $scope.IsMedicalCnd.Visible = false;
                    }
                }

                //enable save button .
                if ((($scope.ImmunizationDD.bIsGivenNo) && $scope.ImmunizationDD.SelectedType &&
                     ($scope.ImmunizationDD.SelectedType.Value === ImmnunizationType.HepatitisB || $scope.ImmunizationDD.SelectedType.Value === ImmnunizationType.TetanusDiphtheriaBooster))
                    || ($scope.model.SurveyDetails && $scope.model.SurveyDetails.data() && $scope.model.SurveyDetails.data().length > 0 && $scope.Buttons.SaveButtonVisible)) {
                    $scope.Buttons.SaveButtonVisible = true;
                } else if ((!$scope.ImmunizationDD.bIsGivenNo) && $scope.ImmunizationDD.SelectedType && ($scope.ImmunizationDD.SelectedType.Value === ImmnunizationType.HepatitisB
                                                                                                         || $scope.ImmunizationDD.SelectedType.Value === ImmnunizationType.TetanusDiphtheriaBooster) && ($scope.ReasonNotGiven.SelectedReason.Value !== "")) {
                    $scope.Buttons.SaveButtonVisible = true;
                } else if ($scope.model.SurveyDetails && $scope.model.SurveyDetails.data() && $scope.model.SurveyDetails.data().length > 0 && $scope.Buttons.SaveButtonVisible) {
                    $scope.Buttons.SaveButtonVisible = true;
                } else if ($scope.model.SurveyDetails && $scope.model.SurveyDetails.data() && $scope.model.SurveyDetails.data().length === 0 && (($scope.DropDowns && $scope.DropDowns.SelectedResult) && ($scope.DropDowns.SelectedResult.Value) !== null)) {
                    $scope.Buttons.SaveButtonVisible = true;
                } else {
                    $scope.Buttons.SaveButtonVisible = false;
                }

                //hide all error messages
                if ($("#ptchart-pthwy-content").data("kendoValidator")) {
                    $("#ptchart-pthwy-content").data("kendoValidator").hideMessages();
                }

                if ($scope.DropDowns && $scope.DropDowns.SelectedType && $scope.DropDowns.SelectedType.Value === DiabetesScreeningType.NPFootCheck &&
                    $scope.DropDowns.SelectedResult && ($scope.DropDowns.SelectedResult.Value === DiabetesScreeningResult.Abnormal || $scope.DropDowns.SelectedResult.Value === DiabetesScreeningResult.PatientRefused)) {
                    window.setTimeout(function () {
                        var hgt = $rootScope.Global.Objects.DeviceHeight - ($("#ptchart-pthwy-surveyheaders").height() + 130);
                        $("#ptchart-pthwy-surveydetails").css({
                             "height": hgt.toString() + "px", "min-height": "235px"
                        });
                    }, 1500);
                }
                else {
                    window.setTimeout(function () {
                        var hgt = $rootScope.Global.Objects.DeviceHeight - ($("#ptchart-pthwy-surveyheaders").height() + 130);
                        $("#ptchart-pthwy-surveydetails").css({
                            "height": hgt.toString() + "px"
                        });
                    }, 1500);
                }
            }

            /**
             * @ngdoc function
             * @name $scope.populateResultChildDropDown
             * @methodOf roundingModule.controller:PathwaysTabController
             * @description 
             ** Changes UI for diabetic screening
             ** Populates child lookpups using selected result dropdown value
             */
            $scope.populateResultChildDropDown = function () {
                var isChecked = {
                    "IsChecked": false
                }
                var parentschilds = null;
                var lookupRequest = null;
                if ($scope.DropDowns.SelectedResult && $scope.DropDowns.SelectedResult.Value === DiabetesScreeningResult.Abnormal) {
                    if ($("#ptchart-dbts-scrn-dd-types").data("kendoDropDownList").select() !== 0) {
                        var resultsChild = [];
                        if ($scope.DropDowns.SelectedType.Value === DiabetesScreeningType.AnnualDiabetecFootExam
                            || $scope.DropDowns.SelectedType.Value === DiabetesScreeningType.VHNFootCheck || $scope.DropDowns.SelectedType.Value === DiabetesScreeningType.NPFootCheck) {
                            //get populated lookup
                            lookupRequest = {
                                "parentLookupType": LookupTypes.DiabeticScreening,
                                "childLookupType": LookupTypes.FootDeformities,
                                "isNoCache": false
                            }

                            parentschilds = LookUp.GetParentChildLookUp(lookupRequest);

                            $.each(parentschilds.ParentLookup.LookupItems, function (key, parent) {
                                if (parent.UID && parent.IsShownUI && parent.Value === $scope.DropDowns.SelectedType.Value) {
                                    $.each(parentschilds.ChildLookup.LookupItems, function (key, child) {
                                        if (child.IsShownUI && child.ParentLookupItemUID === parent.UID) {
                                            resultsChild.push(child);
                                        }
                                    });
                                }
                            });
                        } else if ($scope.DropDowns.SelectedType.Value === DiabetesScreeningType.DiabetecRetinalExam) {
                            //get populated lookup
                            lookupRequest = {
                                "parentLookupType": LookupTypes.DiabeticScreening,
                                "childLookupType": LookupTypes.EyeAnamolies,
                                "isNoCache": false
                            }
                            parentschilds = LookUp.GetParentChildLookUp(lookupRequest);

                            $.each(parentschilds.ParentLookup.LookupItems, function (key, parent) {
                                if (parent.UID && parent.IsShownUI && parent.Value === $scope.DropDowns.SelectedType.Value) {
                                    $.each(parentschilds.ChildLookup.LookupItems, function (key, child) {
                                        if (child.ParentLookupItemUID === parent.UID && child.IsShownUI) {
                                            resultsChild.push(child);
                                        }
                                    });
                                }
                            });
                        }

                        var filteredResultsChilds = []
                        $.each(resultsChild, function (key1, resultChild) {
                            if (resultChild.IsShownUI && resultChild.Value !== "") {
                                $.extend(resultChild, isChecked);
                                filteredResultsChilds.push(resultChild);
                            }
                        });

                        if (filteredResultsChilds.length !== 0) {
                            $scope.DropDowns.ResultsChild = new kendo.data.DataSource({
                                                                                          data: filteredResultsChilds
                                                                                      });
                            $scope.DropDowns.ResultsChildVisible = true;
                        } else {
                            $scope.DropDowns.ResultsChild = new kendo.data.DataSource({
                                                                                          data: []
                                                                                      });
                            $scope.DropDowns.ResultsChildVisible = false;
                        }
                    }
                } else if ($scope.DropDowns.SelectedResult && $scope.DropDowns.SelectedResult.Value === DiabetesScreeningResult.PatientRefused) {
                    $scope.DropDowns.SelectedResultChildLabel = "Refused Reasons";
                    $scope.DropDowns.ResultsChildVisible = true;

                    //get populated Screening Refusal Reason
                    var refusalReasons = LookUp.GetLookUp(LookupTypes.ScreeningRefusalReason);
                    var filteredrefusalReasons = []

                    $.each(refusalReasons, function (key1, refusalreason) {
                        if (refusalreason.IsShownUI && refusalreason.Value !== "") {
                            $.extend(refusalreason, isChecked);
                            filteredrefusalReasons.push(refusalreason);
                        }
                    });

                    if (filteredrefusalReasons.length !== 0) {
                        $scope.DropDowns.ResultsChild = new kendo.data.DataSource({
                                                                                      data: filteredrefusalReasons
                                                                                  });
                        $scope.DropDowns.ResultsChildVisible = true;
                    } else {
                        $scope.DropDowns.ResultsChild = new kendo.data.DataSource({
                                                                                      data: []
                                                                                  });
                        $scope.DropDowns.ResultsChildVisible = false;
                    }
                } else if ($scope.ImmunizationDD.Types)   //&& $scope.ImmunizationDD.SelectedType.Value === ImmnunizationType.HepatitisB) {
                {
                    var lookupRequest = {
                        "parentLookupType": LookupTypes.ImmunizationType,
                        "childLookupType": LookupTypes.ImmunizationBrandName,
                        "isNoCache": false
                    }

                    parentschilds = LookUp.GetParentChildLookUp(lookupRequest);

                    var resultsChild = [];

                    if ($scope.ImmunizationDD.SelectedType.Value !== ImmnunizationType.TetanusDiphtheriaBooster &&
                        $scope.ImmunizationDD.SelectedType.Value !== ImmnunizationType.HepatitisB) {
                        resultsChild.push({
                                              "IsShownUI": "True",
                                              "ParentLookUpItemUID": null,
                                              "Text": "Select a value",
                                              "Value": ""
                                          })
                    }

                    // $scope.BrandnameDD.Results = resultsChild;
                    // $scope.BrandnameDD.SelectedResult = $scope.BrandnameDD.Results[0];

                    $.each(parentschilds.ParentLookup.LookupItems, function (key, parent) {
                        if (parent.UID && parent.IsShownUI && parent.Value === $scope.ImmunizationDD.SelectedType.Value) {
                            $.each(parentschilds.ChildLookup.LookupItems, function (key, child) {
                                if (child.ParentLookupItemUID === parent.UID && child.IsShownUI) {
                                    resultsChild.push(child);
                                }
                            });
                        }
                    });

                    $scope.BrandnameDD.Results = resultsChild;
                    $scope.BrandnameDD.SelectedResult = $scope.BrandnameDD.Results[0];
                }
            }

            /**
             * @ngdoc function
             * @name $scope.populateDropDowns
             * @methodOf roundingModule.controller:PathwaysTabController
             * @description 
             ** Changes UI for diabetic screening
             ** Populates drop downs with filtered types and results collections
             */
            $scope.populateDropDowns = function () {
                //get populated lookup
                var lookupRequest = {
                    "parentLookupType": LookupTypes.DiabeticScreening,
                    "childLookupType": LookupTypes.FootDeformities,
                    "isNoCache": false
                }
                var types = LookUp.GetParentChildLookUp(lookupRequest);
                var filteredTypes = []
                $.each(types.ParentLookup.LookupItems, function (key1, type) {
                    if (type.IsShownUI) {
                        if (type.Value === DiabetesScreeningType.NPFootCheck) {
                            if ($scope.isESCOPatient && $rootScope.Global.Objects.CurrentUser.CurrentRole === RoleTypeConstants.NP) {
                                filteredTypes.push(type);
                            }
                        }
                        else {
                            filteredTypes.push(type);
                        }
                    }
                });
               

                $scope.DropDowns.Types = filteredTypes;
                $scope.DropDowns.SelectedType = $scope.DropDowns.Types[0];

                //get populated results
                var results = LookUp.GetLookUp(LookupTypes.ScreeningResult);
                var filteredResults = []
                $.each(results, function (key1, result) {
                    if (result.IsShownUI) {
                        filteredResults.push(result);
                    }
                });

                $scope.DropDowns.Results = filteredResults;
                $scope.DropDowns.SelectedResult = $scope.DropDowns.Results[0];

                //get populated modes
                var sensoryOptions = LookUp.GetLookupDisplay(LookupTypes.SensoryFootExamResult,"DisplayOrder");
                var filteredSensoryOptions = []
                $.each(sensoryOptions, function (key1, sensory) {
                    if (sensory.IsShownUI) {
                        filteredSensoryOptions.push(sensory);
                    }
                });

                $scope.DropDowns.SensoryOptions = filteredSensoryOptions;
                $scope.DropDowns.SelectedSensoryLeftFoot = $scope.DropDowns.SensoryOptions && $scope.DropDowns.SensoryOptions.length > 0 ? $scope.DropDowns.SensoryOptions[0] : null;
                $scope.DropDowns.SelectedSensoryRightFoot = $scope.DropDowns.SensoryOptions && $scope.DropDowns.SensoryOptions.length > 0 ? $scope.DropDowns.SensoryOptions[0] : null;

                //get populated modes
                var pulseOptions = LookUp.GetLookupDisplay(LookupTypes.PulseFootExamResult,"DisplayOrder");
                var filteredPulseOptions = []
                $.each(pulseOptions, function (key1, pulse) {
                    if (pulse.IsShownUI) {
                        filteredPulseOptions.push(pulse);
                    }
                });

                $scope.DropDowns.PulseOptions = filteredPulseOptions;
                $scope.DropDowns.SelectedPulseLeftFoot = $scope.DropDowns.PulseOptions && $scope.DropDowns.PulseOptions.length > 0 ? $scope.DropDowns.PulseOptions[0] : null;
                $scope.DropDowns.SelectedPulseRightFoot = $scope.DropDowns.PulseOptions && $scope.DropDowns.PulseOptions.length > 0 ? $scope.DropDowns.PulseOptions[0] : null;

                //get populated modes
                var modes = LookUp.GetLookUp(LookupTypes.ScreeningDirection);
                var filteredModes = []
                $.each(modes, function (key1, mode) {
                    if (mode.IsShownUI) {
                        filteredModes.push(mode);
                    }
                });

                $scope.DropDowns.Modes = filteredModes;
                $scope.DropDowns.SelectedMode = $scope.DropDowns.Modes[0];
            }

            /**
             * @ngdoc event 
             * @name onTypeChange
             * @eventOf roundingModule.controller:PathwaysTabController  
             * @description       
             ** ng-change event of select type 
             ** Changes UI for diabetic screening
             ** Display result dropdown based on selected type value     
             */
            $scope.onTypeChange = function () {
                $scope.DropDowns.SelectedResult = null;
                $scope.DropDowns.SelectedMode = null;
                $scope.DropDowns.ResultsChildVisible = false;
                $scope.DropDowns.SensoryPulseVisible = false;
                $scope.DropDowns.IsOtherAbnormalitySelected = false;
                $scope.DropDowns.OtherAbnormalityText = null;
                PathwaysTabService.SurveyDetail = null;

                if (!$scope.DropDowns.SelectedType || $scope.DropDowns.SelectedType.Value === "") {
                    $scope.DropDowns.ResultsVisible = false;
                    $scope.DropDowns.ResultsChildVisible = false;
                    $scope.DropDowns.ResultsChild = [];
                } else {
                    $scope.DropDowns.ResultsVisible = true;
                    $scope.populateResultChildDropDown();
                    $scope.DropDowns.SelectedResult = $scope.DropDowns.Results[0];
                    $scope.DropDowns.SelectedSensoryLeftFoot = $scope.DropDowns.SensoryOptions && $scope.DropDowns.SensoryOptions.length > 0 ? $scope.DropDowns.SensoryOptions[0] : null;
                    $scope.DropDowns.SelectedSensoryRightFoot =$scope.DropDowns.SensoryOptions && $scope.DropDowns.SensoryOptions.length > 0 ? $scope.DropDowns.SensoryOptions[0] : null;
                    $scope.DropDowns.SelectedPulseLeftFoot = $scope.DropDowns.PulseOptions && $scope.DropDowns.PulseOptions.length > 0 ? $scope.DropDowns.PulseOptions[0] : null;
                    $scope.DropDowns.SelectedPulseRightFoot = $scope.DropDowns.PulseOptions && $scope.DropDowns.PulseOptions.length > 0 ? $scope.DropDowns.PulseOptions[0] : null;
                }

                if ($scope.DropDowns.SelectedType.Value === DiabetesScreeningType.VHNFootCheck) {
                    $scope.DropDowns.ModesVisible = true;
                    $scope.model.SurveyType = ScreeningsSurveyTypes.DMFootcarePathway;
                    $scope.getSurveyDetails();
                    $scope.IsSurveydetailsCommentsVisible = true;
                    $scope.DropDowns.SelectedMode = $scope.DropDowns.Modes[0];
                } else if ($scope.DropDowns.SelectedType.Value === DiabetesScreeningType.DiabetecRetinalExam) {
                    $scope.DropDowns.ModesVisible = false;
                    $scope.model.SurveyType = ScreeningsSurveyTypes.DMEyeExamPathway;
                    $scope.getSurveyDetails();
                    $scope.IsSurveydetailsCommentsVisible = true;
                } else if ($scope.DropDowns.SelectedType.Value === DiabetesScreeningType.NPFootCheck) {
                    $scope.DropDowns.ModesVisible = false;
                    $scope.DropDowns.SensoryPulseVisible = true;
                    $scope.model.SurveyType = ScreeningsSurveyTypes.DMFootcarePathway;
                    $scope.getSurveyDetails();
                    $scope.IsSurveydetailsCommentsVisible = true;
                    /*window.setTimeout(function () {
                        var hgt = $rootScope.Global.Objects.DeviceHeight - ($("#ptchart-pthwy-surveyheaders").height() + 130);
                        $("#ptchart-pthwy-surveydetails").css({
                            "height": hgt.toString() + "px"
                        });
                    }, 1500);*/
                } else {
                    $scope.DropDowns.ModesVisible = false;
                    $scope.model.SurveyDetails = new kendo.data.DataSource({
                        data: []
                    });
                    $scope.IsSurveydetailsCommentsVisible = false;
                    $scope.Buttons.SaveButtonVisible = false;
                }

                CommonFunctions.UICanceled();
                //hide all error messages
                if ($("#ptchart-pthwy-content").data("kendoValidator")) {
                    $("#ptchart-pthwy-content").data("kendoValidator").hideMessages();
                }
            }

            /**
             * @ngdoc event 
             * @name onImmunizationTypeChange
             * @eventOf roundingModule.controller:PathwaysTabController  
             * @description       
             ** ng-change event of select type 
             ** Changes UI for Immnuization type change
             ** Display result dropdown based on selected type value     
             */
            $scope.onImmunizationTypeChange = function () {
                PathwaysTabService.SurveyDetail = null;
                ResetImmunizationControls();
                if (!$scope.model.SurveyDetails) {
                    $scope.model.SurveyDetails = new kendo.data.DataSource({
                                                                               data: []
                                                                           });
                }

                if (!$scope.model.CopySurveyDetails) {
                    $scope.model.CopySurveyDetails = new kendo.data.DataSource({
                                                                                   data: []
                                                                               });
                }

                /* defect: ROUND-92 */
                if ($scope.ImmunizationDD.SelectedType.Value) {
                    $scope.BrandnameDD.IsDisabled = false;
                } else {
                    $scope.BrandnameDD.IsDisabled = true;
                }

                switch ($scope.ImmunizationDD.SelectedType.Value) {
                    case ImmnunizationType.H1N1FluVaccine:
                        $scope.model.SurveyDetails = null;
                        $scope.model.CopySurveyDetails = null;
                        $scope.IsFocusScriptDisabled = true
                        $scope.IsSurveydetailsCommentsVisible = false;
                        $scope.IsSurveydetailsCommentCheckBoxDisabled = false;
                        $scope.IsSurveydetailsCommentDisabled = false;

                        $scope.populateResultChildDropDown();
                        break;
                    case ImmnunizationType.TetanusDiphtheriaBooster:
                        $scope.model.SurveyDetails = null;
                        $scope.model.CopySurveyDetails = null
                        $scope.IsFocusScriptDisabled = true;
                        $scope.IsSurveydetailsCommentsVisible = false;
                        $scope.IsSurveydetailsCommentCheckBoxDisabled = false;
                        $scope.IsSurveydetailsCommentDisabled = false;
                        $scope.Buttons.SaveButtonVisible = true;
                        $scope.populateResultChildDropDown();
                        break;
                    case ImmnunizationType.InfluenzaVaccine:   //"FLU":
                        $scope.VHNVerificationTaskDisabled = $rootScope.Global.Objects.SelectedPatient.IsESCOMarket ? false: true;
                        $scope.populateResultChildDropDown();
                        $scope.model.SurveyType = ScreeningsSurveyTypes.FluPathway;

                        $scope.getSurveyDetails();
                        $scope.IsFocusScriptDisabled = false;
                        break;
                    case ImmnunizationType.PneumococcalVaccine:  //"PNEU":
                        $scope.VHNVerificationTaskDisabled = $rootScope.Global.Objects.SelectedPatient.IsESCOMarket ? false: true;
                        $scope.populateResultChildDropDown();
                        $scope.model.SurveyType = ScreeningsSurveyTypes.PneuPathway;
                        $scope.getSurveyDetails();
                        $scope.IsFocusScriptDisabled = false;
                        break;
                    case ImmnunizationType.HepatitisB:       //"HEPB":

                        $scope.IsSurveydetailsCommentsVisible = false;
                        $scope.IsSurveydetailsCommentCheckBoxDisabled = false;
                        $scope.IsSurveydetailsCommentDisabled = false;

                        $scope.model.SurveyDetails = null;
                        $scope.model.CopySurveyDetails = null
                        // $scope.GivenDD.SelectedResult = 
                        $scope.populateResultChildDropDown();
                        $scope.IsFocusScriptDisabled = true
                        $scope.Buttons.SaveButtonVisible = true;
                        break;
                    default:
                        $scope.IsSurveydetailsCommentsVisible = false;
                        $scope.IsSurveydetailsCommentCheckBoxDisabled = false;
                        $scope.IsSurveydetailsCommentDisabled = false;
                        $scope.IsFocusScriptDisabled = true;
                        $scope.model.SurveyDetails = null;
                        $scope.model.CopySurveyDetails = null;
                        $scope.Buttons.SaveButtonVisible = false;
                }

                //if ($scope.DropDowns.SelectedType.Value) {
                //    $scope.DropDowns.ModesVisible = true;
                //    $scope.model.SurveyType = ScreeningsSurveyTypes.DMFootcarePathway;
                //    $scope.getSurveyDetails();
                //    $scope.IsSurveydetailsCommentsVisible = true;
                //    $scope.DropDowns.SelectedMode = $scope.DropDowns.Modes[0];
                //} else if ($scope.DropDowns.SelectedType.Value === DiabetesScreeningType.DiabetecRetinalExam) {
                //    $scope.DropDowns.ModesVisible = false;
                //    $scope.model.SurveyType = ScreeningsSurveyTypes.DMEyeExamPathway;
                //    $scope.getSurveyDetails();
                //    $scope.IsSurveydetailsCommentsVisible = true;
                //} else {
                //    $scope.DropDowns.ModesVisible = false;
                //    $scope.model.SurveyDetails = new kendo.data.DataSource({ data: [] });
                //    $scope.IsSurveydetailsCommentsVisible = false;
                //    $scope.Buttons.SaveButtonVisible = false;
                //}

                CommonFunctions.UICanceled();
                //hide all error messages
                if ($("#ptchart-pthwy-content").data("kendoValidator")) {
                    $("#ptchart-pthwy-content").data("kendoValidator").hideMessages();
                }
            }

            /**
             * @ngdoc function
             * @name openLink
             * @methodOf roundingModule.controller:PathwaysTabController.
             * @description 
             ** Opens a link for kindney smart.
             */
            $scope.openLink = function (link) {
                $timeout(function () {
                    var mywin = window.open(link, '_blank', 'location=yes')
                }, 0, true);
            }

            /**
             * @ngdoc function
             * @name $scope.setSurveyType
             * @methodOf roundingModule.controller:PathwaysTabController
             * @description 
             * Sets survey type based on selected menu item of Patient Chart
             */
            $scope.setSurveyType = function () {
                try {
                    $scope.model.SurveyType = null;
                    if ($rootScope.Global.Objects.SelectedPathwayScreeningMenu &&
                        $rootScope.Global.Objects.SelectedPathwayScreeningMenu === ScreenConstants.DiabetesTab) {
                        $scope.model.SurveyType = ScreenConstants.DiabetesTab;
                    } else if ($rootScope.Global.Objects.SelectedPathwayScreeningMenu && $rootScope.Global.Objects.SelectedPathwayScreeningMenu === ScreenConstants.ImmunizationsTab) {
                        $scope.model.SurveyType = ScreenConstants.ImmunizationsTab;
                        $scope.PathwayScreenTitle = ScreenHeaderConstant.PathwayScreenTitle;
                    } else {
                        $scope.model.SurveyType = CommonFunctions.GetSurveyType();
                        $scope.model.IsESRDTreatmentOptionsScreening = $scope.model.SurveyType === ScreeningsSurveyTypes.ESRDPATHWAY;
                        //switch ($rootScope.Global.Objects.SelectedPathwayMenu) {
                        //    case ScreenConstants.MOAACP:
                        //        $scope.model.SurveyType = ScreeningsSurveyTypes.ADPathway;
                        //        break;
                        //    case ScreenConstants.MOAFluidManagement:
                        //    case ScreenConstants.FluidManagementTab:
                        //        $scope.model.SurveyType = ScreeningsSurveyTypes.FluidManagementPathway;
                        //        break;
                        //    case ScreenConstants.MOAInfectionManagement:
                        //        $scope.model.SurveyType = ScreeningsSurveyTypes.InfectionPathway;
                        //        break;
                        //    case ScreenConstants.DiabetesTab:   
                        //    case ScreenConstants.MOADiabetes:                             
                        //        $scope.model.SurveyType = ScreeningsSurveyTypes.DMBloodSugarMgmtPathway;
                        //        break;                                                           
                        //    case ScreenConstants.MOAHospitalization:
                        //    case ScreenConstants.HospitalizationTab:
                        //        $scope.model.SurveyType = ScreeningsSurveyTypes.HospitalizationPathway;
                        //        break;
                        //    case ScreenConstants.ESRDTreatmentOptions:
                        //        $scope.model.SurveyType = ScreeningsSurveyTypes.ESRDPATHWAY;
                        //        break;
                        //    case ScreenConstants.CaregiverAssessment:
                        //        $scope.model.SurveyType = ScreeningsSurveyTypes.GeneralAssessmentPathway;
                        //        break;
                        //    case ScreenConstants.NutritionPathway:
                        //        $scope.model.SurveyType = ScreeningsSurveyTypes.NutritionPathway;
                        //        break;
                        //    default:
                        //        break;
                        //}
                    }
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "PathwaysTab";
                    errExp.FunctionName = "SetSurveyType";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
             * @ngdoc function
             * @name onAddPtDiabScreeningCompleted
             * @methodOf roundingModule.controller:PathwaysTabController
             * @description             
             ** Service based call back function of AddPtDiabScreening Service call 
             ** Calls showPathway after successfully adding diabetic screening
             * @param {object} result returned result data of WebApi call
             */
            $scope.onAddPtDiabScreeningCompleted = function (result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        CommonFunctions.UICanceled();
                        CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.ScreeningSaved);
                        // stay on the current screen
                        $rootScope.Global.Objects.SelectedPathwayScreeningMenu = ScreenConstants.DiabetesTab;
                        $scope.showPathway();

                        //Update Contact Notes if Succeed                       
                        $scope.updateContactNote();
                    }
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "PathwaysTab";
                    errExp.FunctionName = "onAddPtDiabScreeningCompleted";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            }

            /**
             * @ngdoc function
             * @name onAddPtImmunizationCompleted
             * @methodOf roundingModule.controller:PathwaysTabController
             * @description             
             ** Service based call back function of onAddPtImmunizationCompleted Service call 
             ** Calls showPathway after successfully adding Immnunization Shot information for patient
             * @param {object} result returned result data of WebApi call
             */
            $scope.onAddPtImmunizationCompleted = function (result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        CommonFunctions.UICanceled();
                        CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.ScreeningSaved);
                        // stay on the current screen
                        $rootScope.Global.Objects.SelectedPathwayScreeningMenu = ScreenConstants.ImmunizationsTab;

                        if ($scope.BrandNameOther.Visible) {
                            $("#immu-other").val('');
                            $scope.BrandNameOther.Visible = false;
                        }

                        if ($scope.IsMedicalCnd.Visible) {
                            $("#immu-reason-not-given-mc").val('');
                            $scope.IsMedicalCnd.Visible = false;
                        }

                        if ($scope.ImmunizationDD.Visible && $rootScope.Global.Objects.SelectedPatient.IsESCOMarket) {
                            $("#ptchart-pthwy-comments-cust").val('');
                        }

                        $scope.showPathway();

                        //Update Contact Notes if Succeed                       
                        $scope.updateContactNote();
                    }
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "PathwaysTab";
                    errExp.FunctionName = "onAddPtImmunizationCompleted";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            }

            /**
             * @ngdoc function
             * @name onSaveSurveyDetailsCompleted
             * @methodOf roundingModule.controller:PathwaysTabController
             * @description             
             ** Service based call back function of SaveSurveyDetails Service call
             ** Calls $scope.getPathwayHeaderData and $scope.getPatientSurveyDetails after successfully saving survey detail
             * @param {object} result
             * return result data of WebApi call.
             */
            $scope.onSaveSurveyDetailsCompleted = function (result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        if ($scope.SelectedSurveyType !== ScreenConstants.DiabetesTab) {
                            CommonFunctions.UICanceled();
                            CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.PathwaySaved);
                            $scope.getPathwayHeaderData();
                            $scope.getPatientSurveyDetails();

                            //Update Contact Notes if Succeed                         
                            $scope.updateContactNote();
                        }
                    }
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "PathwaysTab";
                    errExp.FunctionName = "onSaveSurveyDetailsCompleted";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            }

            /**
            * @ngdoc function
            * @name updateContactNote
            * @methodOf roundingModule.controller:PathwaysTabController
            * @description             
            ** This method updates the contact note in presave contact with pathway verbiage - All Pathways, diabetic & Immunization screenings
            */
            $scope.updateContactNote = function () {
                if ($scope.ContactNoteText !== "") {
                    $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[0].ContactNotes[0].NoteDetail = $scope.ContactNoteText;

                    var preSaveContactIndex = CommonFunctions.GetIndexForPreSaveContact();
                    if (preSaveContactIndex >= 0) {
                        $rootScope.Global.Contacts.PreSaveContactList[preSaveContactIndex].PtContacts.PtContacts[0].ContactNotes[0].NoteDetail = $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[0].ContactNotes[0].NoteDetail;
                        CommonFunctions.SaveSeletectedPreSaveContact($rootScope.Global.Contacts.PreSaveContact);
                    }
                }
            }

            /**
             * @ngdoc function
             * @name IsRequiredProp
             * @methodOf roundingModule.controller:PathwaysTabController
             * @description             
             ** requireProp Call
             * @param {object} chkname
             * return result data of WebApi call.
             */
            IsRequiredProp = function (chkname) {
                var nameUID = chkname.split("-")[1];

                if ($scope.model.SurveyDetails.data().length > 0) {
                    $scope.model.SurveyDetails.data()[0].QuestionGroups[0].Questions.forEach(function (question) {
                        if (question.IsQuestionVisible) {
                            question.Options.forEach(function (option) {
                                if (option.IsSelected) {
                                    if (option.UID === parseInt(nameUID)) {
                                        return option.FreeFormTemplate.IsRequired;
                                    }
                                }
                            }
                                );
                        }
                    }
                        );
                }
            }

            /**
             * @ngdoc function
             * @name onGetClinicalRelevanceCompleted
             * @methodOf roundingModule.controller:PathwaysTabController
             * @description             
             **onGetClinicalRelevanceCompleted Call retrun list of all clicnicalReleveance 
             * look up to bindwith clicnical relevance dropdown
             * @param {object} result
             * return result data of WebApi call.
             */
            $scope.onGetClinicalRelevanceCompleted = function (result) {
                try {
                    if (result) {
                        if (result.data) {
                            if (result.data.length > 1) {
                                $scope.ClinicalRelevance.Source = result.data;
                                $.each(result.data, function (key1, val) {
                                    if (val.Code === clinicalItems.ClinicalRelevance) {
                                        $scope.ClinicalRelevance.SelectedText = val;
                                    }
                                });
                            }
                        }
                    }
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "PatientCarePlan";
                    errExp.FunctionName = "onGetClinicalRelevanceCompleted";
                    errExp.StackTrace = printStackTrace({
                                                            e: ex
                                                        });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
             * @ngdoc function
             * @name onAddPatientGoalSaveSuccessfully
             * @methodOf roundingModule.controller:PathwaysTabController
             * @description             
             ** Service based call back function of SavePathway Service call
             ** Calls $scope.onAddPatientGoalSaveSuccessfully after successfully saving survey detail and goaldat
             * @param {object} result
             * return result data of WebApi call.
             */
            $scope.onAddPatientGoalSaveSuccessfully = function(result) {
                try {  
                    if (result) {
                        CommonFunctions.UICanceled();                        
                        if (result.data) {                            
                            CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.CarePlanSaved);
                            $("#add-patientcareplan-modalview").kendoMobileModalView("close");
                            CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
                            $rootScope.$broadcast('getPatientGoals');
                            $rootScope.$broadcast('refreshMetricsCount');
                            $rootScope.onCarePlanUIChanged = false;
                            $rootScope.IsCarePlanCameFirstTime = 0;
                            $scope.addUpdateMemberCarePlanContact(angular.copy(result.data), $rootScope.Global.Objects.SelectedPatient);
                        } else {
                            CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.CarePlanFailed);
                        }
                    }
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "PathwaysTab";
                    errExp.FunctionName = "onAddPatientGoalSaveSuccessfully";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            }
            /**
            * @ngdoc function
            * @name onUpdatePatientGoalSaveSuccessfully
            * @methodOf roundingModule.controller:PathwaysTabController
            * @description             
            ** Service based call back function of SavePathway Service call
            ** Calls $scope.onUpdatePatientGoalSaveSuccessfully after successfully saving survey detail and goaldat
            * @param {object} result
            * return result data of WebApi call.
            */
            $scope.onUpdatePatientGoalSaveSuccessfully = function (result) {
                try {
                    if (result) {                       
                        CommonFunctions.UICanceled();                       
                        if (result.data) {
                            CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.CarePlanUpdateSaved);
                            PatientCarePlanService.SetSelectedEditActiveCarePlan(null);
                            $rootScope.$broadcast('getPatientGoals');
                            $rootScope.$broadcast('refreshMetricsCount');
                            $("#add-patientcareplan-modalview").data("kendoMobileModalView").close();
                            $rootScope.onCarePlanUIChanged = false;
                            $rootScope.IsCarePlanCameFirstTime = 0;
                            $scope.addUpdateMemberCarePlanContact(angular.copy(result.data), $rootScope.Global.Objects.SelectedPatient);
                        } else {
                            CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.CarePlanUpdateFailed);
                        }                        
                                                                                               
                    }
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "PathwaysTab";
                    errExp.FunctionName = "onUpdatePatientGoalSaveSuccessfully";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            }

            /**
             * @ngdoc function 
             * @name addEditActivecareplanValidator
             * @eventOf roundingModule.controller:PathwaysTabController  
             * @description       
             ** it is a kendovalidator 
             ** 
             */        
          
            $timeout(function () {
                $scope.addEditActivecareplanValidator = $("#add-edit-activecareplan-modalview-"+$scope.IsEditCarelan).kendoValidator({
                    rules: {                    
                        goalstatusrequired: function(input) {
                            if ($rootScope.ParentChild.GoalStatus.SelectedStatus.Value === "" && input.is("[data-goalstatusrequired-msg]")) {  
                                setTimeout(function() {
                                    $("#active-care-plan-scrn-span-msg").show();  
                                }, 500);
                                return false;
                            } else {                            
                                setTimeout(function () {
                                    $("#active-care-plan-scrn-span-msg").hide();
                                }, 500);
                                return true;
                            }
                        },
                        goalstatusnotstartorinprg:function(input) {
                            if ($rootScope.ParentChild.GoalStatus.SelectedStatus.Value && ( $scope.IsEditCarelan == false ) ) {
                                if ($rootScope.ParentChild.GoalStatus.SelectedStatus.Value !== "I" &&
                                    $rootScope.ParentChild.GoalStatus.SelectedStatus.Value !== "N" &&
                                    input.is("[data-goalstatusnotstartorinprg-msg]")) {
                                    setTimeout(function () {
                                        $("#active-care-plan-scrn-span-msg").show();
                                           /* CommonFunctions.OpenAlertBox('Alert', [{ message: CommonMessages.Alert.GoalStatusInProgressOrNotStarted }], null); */                                       
                                        }, 500);
                                    return false;
                                } else {
                                    setTimeout(function () {
                                        $("#active-care-plan-scrn-span-msg").hide();
                            }, 500)
                                    return true;
                                }
                            } else {
                                return true;
                            }
                        },
                        completedatelesser: function (input) {
                            var completedDate = CommonFunctions.DateFunctions.dateFormat($scope.Date.CompletedDate, "mm/dd/yyyy", false);
                            if (completedDate) {
                                if ((new Date($scope.Date.StartDate) > new Date($scope.Date.CompletedDate)) && input.is("[data-completedtlessthancreatedate-msg]")) {
                                    /*CommonFunctions.OpenAlertBox('Alert', [{ message: "Completed date should be less than create date" }], null);*/
                                    return false;
                                }
                            }
                        
                            return true;
                        },                                          
                        duedatelesser: function (input) {
                           var startDate = CommonFunctions.DateFunctions.dateFormat($scope.Date.StartDate, "mm/dd/yyyy", false);
                           var dueDate = CommonFunctions.DateFunctions.dateFormat($scope.Date.DueDate, "mm/dd/yyyy", false);

                           if (dueDate) {
                                if ((new Date(startDate) > new Date(dueDate)) && input.is("[data-duedtlessthancreatedate-msg]")) {
                                   /* CommonFunctions.OpenAlertBox('Alert', [{ message: "Duedate should be less than start date" }], null);*/
                                    return false;
                                }
                            }
                            return true;
                        }
                    },
                    messages:
                    {
                        barrierrequired: "Please select a Barrier",    
                        completedatelesser: "Completed date should be less than create date",
                        duedatelesser: "Duedate should be less than start date",
                        goalstatusrequired: "required",
                        goalstatusnotstartorinprg: "Goal Status should be In Progress or Not Started"
                    }
                }).data("kendoValidator");
            }, 0, false);

            /**
             * @ngdoc function 
             * @name validatebarrier
             * @eventOf roundingModule.controller:PathwaysTabController  
             * @description       
             ** validating at least select one barrier 
             ** at the time of Saving goals and survey detail      
             */

            $scope.IsBarrierSelected = true;

            validatebarrier = function () {
                $scope.IsBarrierSelected = false;
                var length = $rootScope.ParentChild.BarrierOption.length;
                for (var i = 0; i < length ; i++) {
                    if ($rootScope.ParentChild.BarrierOption[i].Value) {
                        $scope.IsBarrierSelected = true;
                        break;
                    }
                }
                return $scope.IsBarrierSelected;
                  
            }
            validateSurveyResponse = function (responseQuestions) {
                var status = 0, noOfAns = 0;
                var length = responseQuestions.length;
                for (var i = 0; i < length; i++) {
                    if (responseQuestions[i]['UID']) {
                        noOfAns = noOfAns +1;
                    }
                }
                if (noOfAns == 3) {
                    status = 1;
                }
                return status;
           }
            /**
             * @ngdoc event 
             * @name savePathways
             * @eventOf roundingModule.controller:PathwaysTabController  
             * @description       
             ** ng-click event of save button
             ** Saves the survey detail      
             */
            $scope.savePathways = function () {
                try {
                    if ($scope.pathwaysValidator.validate()) {
                        //custom logic for ignoring hidden messages
                        var isValid = true;
                        $('input[type="text"]').each(function () {
                            if (!$(this).is(':hidden')) {
                                if (($.trim($(this).val()) === '') && $(this).hasClass('required')) {
                                    isValid = false;
                                }
                            }
                        });

                        if (!$scope.IsPathwaysTab) {
                            if ($scope.DropDowns.ResultsVisible) {
                                if ($scope.DropDowns.SelectedResult.Value === null || $scope.DropDowns.SelectedResult.Value === "") {
                                    isValid = false;
                                }
                            }
                            if ($scope.DropDowns.ModesVisible) {
                                if ($scope.DropDowns.SelectedMode === null || $scope.DropDowns.SelectedMode.Value === "") {
                                    isValid = false;
                                }
                            }

                            var abnormalitiesFound = false;
                            if ($scope.DropDowns.ResultsChild) {
                                if ($scope.DropDowns.SelectedResultChildLabel === "Abnormalities") {
                                    $scope.DropDowns.ResultsChild.data().forEach(function (item) {
                                        if (item.IsChecked) {
                                            abnormalitiesFound = true;
                                        }
                                    });
                                    if (!abnormalitiesFound) {
                                        CommonFunctions.DisplayAlertMessage(CommonMessages.Alert.AbnormalitiesRequired);
                                        isValid = false;
                                    }
                                }
                            }
                        }                            

                        if ($scope.IsImmunization) {
                            if ($scope.BrandnameDD.SelectedResult.Value === null || $scope.BrandnameDD.SelectedResult.Value === "") {
                                isValid = false;
                            }

                            if ($scope.BrandNameOther.Visible && $("#immu-other").val().length === 0) {
                                isValid = false;
                            }

                            if ($scope.IsMedicalCnd.Visible && $("#immu-reason-not-given-mc").val().length === 0) {
                                isValid = false;
                            }
                        }

                        if ($scope.model.SurveyType === ScreenConstants.CarePlanGoal) {
                            var clinicalItems = PatientCarePlanService.GetSelectedEditActiveCarePlan();
                            // $scope.model.EditObj =PathwaysTabService.GetPatientCarePlanObj();
                            if (clinicalItems) {
                                $scope.IsEditCarelan = true;
                            } else {
                                $scope.IsEditCarelan = false;
                            }
                            if ($scope.IsEditCarelan == false) {
                                var toggleDataStatus = validatebarrier();
                                var formDataStatus = $("#add-edit-activecareplan-modalview-false").kendoValidator().data("kendoValidator").validate();
                                if (toggleDataStatus && formDataStatus) {
                                    isValid = true;
                                } else {
                                    isValid = false;
                                }
                                
                                if ($rootScope.ParentChild.GoalStatus.SelectedStatus.Value !== "I" && $rootScope.ParentChild.GoalStatus.SelectedStatus.Value !== "N") {
                                    CommonFunctions.DisplayAlertMessage("Goal Status should be In Progress OR Not Started");
                                    isValid = false;
                                }
                            } else {
                                var toggleDataStatus = validatebarrier();
                                var validator = $("#add-edit-activecareplan-modalview-true").kendoValidator().data("kendoValidator");

                                var manualFormValidationStatus = 0;
                                if (validator.validateInput($("#active-care-plan-dd-importance")) &&
                                     validator.validateInput($("#active-care-plan-dd-confidence-level")) &&
                                     validator.validateInput($("#active-care-plan-scrn-dd-status")) &&
                                     validator.validateInput($("#active-care-plan-scrn-dd-Clinical-Relavance")) &&
                                         validator.validateInput($("#careplannametxt")) &&
                                         validator.validateInput($("#activecareplan-behavior")) &&
                                         validator.validateInput($("#active-care-plan-scrn-duedate-dtpicker"))

                                            ) {
                                    if ($rootScope.ParentChild.GoalStatus.SelectedStatus.Value !== "I" && $rootScope.ParentChild.GoalStatus.SelectedStatus.Value !== "N") {
                                        if (validator.validateInput($("#ptchart-dbts-scrn-dtpicker-completeddate"))) {
                                            manualFormValidationStatus = 1;
                                        } else {
                                            manualFormValidationStatus = 0;
                                        }
                                    } else {
                                        manualFormValidationStatus = 1;
                                    }

                                }


                                if (toggleDataStatus && manualFormValidationStatus) {
                                    isValid = true;
                                } else {
                                    isValid = false;
                                }
                            }
                            if (!isValid) {
                                $rootScope.$broadcast('carePlanDislayErrorMessages', { "Barrier": $scope.IsBarrierSelected });
                            }

                            if ($rootScope.ParentChild.GoalStatus.SelectedStatus.Value == 'I' || $rootScope.ParentChild.GoalStatus.SelectedStatus.Value == 'N') {
                                $scope.Date.CompletedDate = null;
                            }
                        }

                        isValid = $scope.dateValidations(isValid);

                        if (isValid) {
                            CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
                            var patient = $rootScope.Global.Objects.SelectedPatient;
                            var responseQuestions = new kendo.data.ObservableArray([]);
                            //For Contact Recap Screen 
                            var ContactNoteDetail = new kendo.data.ObservableArray([]);
                            //add first line as
                            if ($scope.IsPathwaysTab) {
                                ContactNoteDetail.push(LookUp.GetValueByKey(LookupTypes.SurveyType, $scope.model.SurveyType).Text + " Completed at : " + (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.ampm, false) + "\n");
                            } else if ($scope.IsImmunization) {
                                if (!$scope.model.SurveyDetails) {
                                    $scope.model.SurveyDetails = new kendo.data.DataSource({
                                        data: []
                                    });
                                }
                                if (!$scope.model.CopySurveyDetails) {
                                    $scope.model.CopySurveyDetails = new kendo.data.DataSource({
                                        data: []
                                    });
                                }
                                if ($scope.ImmunizationDD.SelectedType.Value !== ImmnunizationType.TetanusDiphtheriaBooster && $scope.ImmunizationDD.SelectedType.Value !== ImmnunizationType.HepatitisB) {
                                    if ($scope.ImmunizationDD.SelectedType.Value === ImmnunizationType.InfluenzaVaccine) {
                                        ContactNoteDetail.push("Flu Immunization Pathway Completed at : " + (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.ampm, false) + "\n");
                                    } else if ($scope.ImmunizationDD.SelectedType.Value === ImmnunizationType.PneumococcalVaccine) {
                                        ContactNoteDetail.push("Pneumonia Immunization Pathway Completed at : " + (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.ampm, false) + "\n");
                                    }
                                }
                            } else {
                               ContactNoteDetail.push("Diabetes Screening" + " Completed at : " + (new Date($scope.DropDowns.SelectedDate)).format(CommonFunctions.DateFunctions.dateFormat.masks.ampm, false) + "\n");
                            }
                            if ($scope.model.SurveyDetails.data().length > 0) {
                                $scope.model.SurveyDetails.data()[0].QuestionGroups[0].Questions.forEach(function (question) {
                                    if (question.IsQuestionVisible) {
                                        var responseQuestion = {};
                                        var Question = {};
                                        if ($scope.model.SurveyType === ScreenConstants.CarePlanGoal) {
                                            responseQuestion = { "QuestionUID": question.UID, "ProviderText": question.Text };
                                        } else {
                                            responseQuestion = { "QuestionUID": question.UID, "Responses": new kendo.data.ObservableArray([]) };
                                        }
                                        var tempNote = "";
                                        var multipleFlag = false;
                                        question.Responses = [];
                                        question.Options.forEach(function (option) {
                                            if (option.IsSelected) {
                                                if ($scope.model.SurveyType === ScreenConstants.CarePlanGoal) {
                                                    $.extend(responseQuestion, { "UID": option.UID, "FreeFormResponse": option.FreeFormResponse });
                                                } else {
                                                    responseQuestion.Responses.push({
                                                        "OptionUID": option.UID, "FreeFormResponse": option.FreeFormResponse
                                                    });
                                                }

                                                //Contact Recap Start
                                                if ($scope.model.SurveyType !== "CAREPLANGOAL" && option.ProviderText !== null && option.ProviderText !== "") {
                                                    var split = option.ProviderText.split(":");
                                                    if (split.length > 1) {
                                                        if (question.IsMultiple) {
                                                            if (!multipleFlag) {
                                                                tempNote = split[0] + " : ";
                                                                if (option.Description === "Other") {
                                                                    if (option.FreeFormResponse)
                                                                        tempNote = tempNote + option.Description + "(" + option.FreeFormResponse.toString() + ") ";
                                                                } else {
                                                                    tempNote = tempNote + (option.Description === null ? "" : option.Description);
                                                                }
                                                                multipleFlag = true;
                                                            } else {
                                                                if (option.Description === "Other") {
                                                                    tempNote = option.FreeFormResponse ? tempNote + ", " + option.Description + "(" + option.FreeFormResponse.toString() + ") " : tempNote + ", " + option.Description;
                                                                } else {
                                                                    tempNote = tempNote + ", " + (option.Description === null ? "" : option.Description);
                                                                }
                                                            }
                                                        } else {
                                                            if (option.FreeFormResponse !== null && option.FreeFormResponse !== "") {
                                                                if (option.Description === "Other") {
                                                                    ContactNoteDetail.push("* " + split[0] + " : " + option.Description + "(" + option.FreeFormResponse.toString() + ") " + "\n");
                                                                } else {
                                                                    ContactNoteDetail.push("* " + split[0] + " : " + (option.FreeFormTemplate.PreText === null ? "" : option.FreeFormTemplate.PreText) + " " + option.FreeFormResponse.toString() + " " + (option.FreeFormTemplate.PostText === null ? "" : option.FreeFormTemplate.PostText) + "\n");
                                                                }
                                                            } else {
                                                                ContactNoteDetail.push("* " + split[0] + " : " + (option.Description === null ? "" : option.Description) + "\n");
                                                            }
                                                        }
                                                    } else {
                                                        if (option.FreeFormResponse !== null && option.FreeFormResponse !== "") {
                                                            if (option.ProviderText.indexOf("{0}") > -1) {
                                                                ContactNoteDetail.push("* " + (option.ProviderText === null ? "" : option.ProviderText.replace("{0}", "")) + " : " + (option.Description === null ? "" : option.Description) + "(" + (option.FreeFormTemplate.PreText === null ? "" : option.FreeFormTemplate.PreText) + " " + option.FreeFormResponse.toString() + " " + (option.FreeFormTemplate.PostText === null ? "" : option.FreeFormTemplate.PostText) + ")" + "\n");
                                                            } else {
                                                                ContactNoteDetail.push("* " + (option.ProviderText === null ? "" : option.ProviderText) + " : " + (option.Description === null ? "" : option.Description) + "(" + (option.FreeFormTemplate.PreText === null ? "" : option.FreeFormTemplate.PreText) + " " + option.FreeFormResponse.toString() + " " + (option.FreeFormTemplate.PostText === null ? "" : option.FreeFormTemplate.PostText) + ")" + "\n");
                                                            }
                                                        } else {
                                                            if (option.ProviderText !== null) {
                                                                if (option.ProviderText.indexOf("{0}") > -1) {
                                                                    var res = option.ProviderText.replace("{0}", option.Description);
                                                                    ContactNoteDetail.push("* " + res + "\n");
                                                                } else {
                                                                    ContactNoteDetail.push("* " + (option.ProviderText === null ? "" : option.ProviderText) + "\n");
                                                                }
                                                            }
                                                        }
                                                    }
                                                }
                                                //Contact Recap End
                                                //This is added as Service is expecting the option as Responses
                                                if ($scope.IsImmunization) {
                                                    question.Responses.push(option);
                                                }
                                            }
                                        });

                                        //Contact Recap
                                        if (tempNote !== "") {
                                            ContactNoteDetail.push("* " + tempNote + "\n");
                                        }

                                        if ($scope.model.SurveyType !== ScreenConstants.CarePlanGoal) {
                                            if (responseQuestion.Responses.length > 0) {
                                                responseQuestions.push(responseQuestion)
                                            }
                                        }
                                        if ($scope.model.SurveyType === ScreenConstants.CarePlanGoal) {
                                            responseQuestions.push(responseQuestion);
                                        }
                                    }
                                });
                            }

                            //For Contact Recap Screen ContactNoteDetail
                            if ($scope.model.SurveyDetails.data().length > 0 && $scope.model.SurveyDetails.data()[0] !== null && $scope.model.SurveyDetails.data()[0].SurveyComments !== null && $scope.model.SurveyDetails.data()[0].SurveyComments !== "") {
                                ContactNoteDetail.push("\n" + "Comments : " + $scope.model.SurveyDetails.data()[0].SurveyComments + "\n");
                            }
                            if (ContactNoteDetail !== null) {
                                var contactnote = ""
                                ContactNoteDetail.forEach(function (note) {
                                    contactnote = contactnote + note;
                                });

                                if ($rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[0].ContactNotes[0].NoteDetail === ContactConstants.DefaultNote.NoteDetail) {
                                    tempNote = contactnote;
                                } else {
                                    if ($rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[0].ContactNotes[0].NoteDetail === "")
                                        tempNote = contactnote;
                                    else 
                                        tempNote = $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[0].ContactNotes[0].NoteDetail + "\n" + "\n" + contactnote;
                                }

                                $scope.ContactNoteText = ""; //Update before new
                                $scope.ContactNoteText = tempNote;
                            }

                            var surveyResponse = ""; // *** MR 01/11/2016

                            if ($scope.model.SurveyType === ScreenConstants.CarePlanGoal) {
                                var Survey = "";

                                var dataObj = {};


                                if ($scope.IsEditCarelan) {
                                    dataObj = $scope.formattingUpdateDataFormat(responseQuestions, clinicalItems);
                                } else {
                                    dataObj = $scope.formattingAddDataFormat(responseQuestions, clinicalItems);
                                }

                                if ($scope.IsEditCarelan) {
                                    var surveyResponseFlag = validateSurveyResponse(responseQuestions);
                                    if (surveyResponseFlag) {
                                        CommonFunctions.Blockui();
                                        PathwaysTabService.UpdatePatientGoal(dataObj, $scope.onUpdatePatientGoalSaveSuccessfully);
                                    } else {
                                        CommonFunctions.OpenAlertBox('Alert', [{
                                            message: "Please select responses and freeform for all questions"
                                     }], null);
                                    }
                                } else {
                                    var surveyResponseFlag = validateSurveyResponse(responseQuestions);
                                    if (surveyResponseFlag) {
                                        CommonFunctions.Blockui();
                                        PathwaysTabService.AddPatientGoal(dataObj, $scope.onAddPatientGoalSaveSuccessfully);
                                    } else {
                                        CommonFunctions.OpenAlertBox('Alert', [{
                                            message: "Please select responses and freeform for all questions"
                                        }], null);
                                    }
                                }
                            } else if ($scope.IsPathwaysTab) {
                                surveyResponse = {
                                    PatientUID: patient.UID,
                                    DataState: CommonConstants.DataState.Added,
                                    MemSurveyUID: $scope.model.SurveyDetails.data()[0].UID,
                                    SurveyTypeCode: $scope.model.SurveyDetails.data()[0].SurveyTypeCode,
                                    SurveyUID: $scope.model.SurveyDetails.data()[0].SurveyUID,
                                    SurveyComments: $scope.model.SurveyDetails.data()[0].SurveyComments,
                                    IncludePatientCommentYesNo: $scope.model.SurveyDetails.data()[0].IncludePatientCommentYesNo,
                                    IncludeProviderCommentYesNo: $scope.model.SurveyDetails.data()[0].IncludeProviderCommentYesNo,
                                    ResponseQuestions: responseQuestions.toJSON(),
                                    StartDate: $scope.model.SurveyDetails.data()[0].UID === 0 ? (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false) : $scope.model.SurveyDetails.data()[0].StartDate,
                                    CompletedDate: (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                                    SurveyStatus: "C"
                                };

                                PathwaysTabService.SaveSurveyDetails(surveyResponse, $scope.onSaveSurveyDetailsCompleted);
                            } else if ($scope.IsImmunization) {
                                var sameData = [];

                                if ($scope.ImmunizationDD.SelectedType && $scope.ImmunizationDD.SelectedType.Value) {
                                    if ($scope.checkDuplicateImmunization) {
                                        sameData = $scope.checkDuplicateImmunization.filter(function (e) {
                                            e.date = CommonFunctions.DateFunctions.dateFormat(e.Date, "mm/dd/yyyy");
                                            tempDate = CommonFunctions.DateFunctions.dateFormat($scope.Immunization.SelectedDate, "mm/dd/yyyy");
                                            return e.ImmunizationCode === $scope.ImmunizationDD.SelectedType.Value && e.date === tempDate;
                                        });
                                    }

                                    if (sameData.length > 0) {
                                        CommonFunctions.OpenAlertBox('Alert', [{
                                            message: CommonMessages.Alert.ImmunizationSameDateInvalid
                                        }
                                        ], null);
                                        CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
                                    } else {
                                        if ($scope.ImmunizationDD.SelectedType.Value !== ImmnunizationType.TetanusDiphtheriaBooster && $scope.ImmunizationDD.SelectedType.Value !== ImmnunizationType.HepatitisB) {
                                            ContactNoteDetail.push("* " + tempNote + "\n");
                                        }
                                        var ptImmunization = "";
                                        if ($scope.model.SurveyDetails.data().length > 0 && $scope.IsImmunization) {
                                            surveyResponse = {
                                                PatientUID: patient.UID,
                                                HARUID: 0,
                                                Level: "",
                                                DataState: CommonConstants.DataState.Added,
                                                MemSurveyUID: 0,
                                                SurveyTypeCode: $scope.model.SurveyDetails.data()[0].SurveyTypeCode,
                                                SurveyUID: $scope.model.SurveyDetails.data()[0].SurveyUID,
                                                SurveyComments: $scope.model.SurveyDetails.data()[0].SurveyComments,
                                                IncludePatientCommentYesNo: $scope.model.SurveyDetails.data()[0].IncludePatientCommentYesNo,
                                                IncludeProviderCommentYesNo: $scope.model.SurveyDetails.data()[0].IncludeProviderCommentYesNo,
                                                QuestionGroups: $scope.model.SurveyDetails.data()[0].QuestionGroups.toJSON(),
                                                Score: "",
                                                StartDate: (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                                                CompletedDate: (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                                                SurveyStatusCode: CommonConstants.StatusCode.Completed,
                                                SurveysStatus: "C"
                                            };
                                        }

                                        ptImmunization = {
                                            PatientUID: patient.UID,
                                            DataState: CommonConstants.DataState.Added,
                                            ImmunizationCode: $scope.ImmunizationDD.SelectedType.Value,
                                            IsGiven: $scope.ImmunizationDD.SelectedOption.Value,
                                            Date: ($scope.Immunization.SelectedDate).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                                            RefuseReasonCode: !$scope.ImmunizationDD.SelectedOption.Value ? $scope.ReasonNotGiven.SelectedReason.Value : "",
                                            BrandName: $scope.BrandnameDD.SelectedResult.Value,
                                            BrandNameDetail: $scope.BrandNameOther.Visible ? $("#immu-other").val() : "",
                                            MedContradication: $scope.IsMedicalCnd.Visible ? $("#immu-reason-not-given-mc").val() : "",
                                            Pathway: surveyResponse,
                                            VHAVerificatioNotes: $rootScope.Global.Objects.SelectedPatient.IsESCOMarket ? $("#ptchart-pthwy-comments-cust").val() : "",
                                            Source: $rootScope.Global.Objects.CurrentUser.CurrentRole
                                        };
                                        CommonFunctions.BlockKendoView("ptchart-splitview-main-pan", CommonMessages.BusyMessages.SavingImmunization);
                                        PathwaysTabService.AddPtImmunization(ptImmunization, $scope.onAddPtImmunizationCompleted);
                                    }
                                }
                            } else {
                                //for Diabetes Screening
                                if ($scope.model.SurveyDetails.data().length > 0) {
                                    surveyResponse = {
                                        PatientUID: patient.UID,
                                        DataState: CommonConstants.DataState.Added,
                                        MemSurveyUID: 0,
                                        SurveyTypeCode: $scope.model.SurveyDetails.data()[0].SurveyTypeCode,
                                        SurveyUID: $scope.model.SurveyDetails.data()[0].SurveyUID,
                                        SurveyComments: $scope.model.SurveyDetails.data()[0].SurveyComments,
                                        IncludePatientCommentYesNo: $scope.model.SurveyDetails.data()[0].IncludePatientCommentYesNo,
                                        IncludeProviderCommentYesNo: $scope.model.SurveyDetails.data()[0].IncludeProviderCommentYesNo,
                                        ResponseQuestions: responseQuestions.toJSON(),
                                        StartDate: ($scope.DropDowns.SelectedDate).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                                        CompletedDate: ($scope.DropDowns.SelectedDate).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                                        SurveyStatus: "C"
                                    };
                                }

                                var tempabnormalities = []
                                var temprefusalReasonCode = []

                                if ($scope.DropDowns.ResultsChild !== []) {
                                    if ($scope.DropDowns.SelectedResultChildLabel === "Abnormalities") {
                                        $scope.DropDowns.ResultsChild.data().forEach(function (item) {
                                            if (item.IsChecked) {
                                                tempabnormalities.push({ 'Code': item.Value, 'FreeFormText': item.Value.toUpperCase() === AbnormalitiesConstants.Other ? $scope.DropDowns.OtherAbnormalityText : null } );
                                            }
                                        });
                                    } else if ($scope.DropDowns.SelectedResultChildLabel === "Refused Reasons") {
                                        $scope.DropDowns.ResultsChild.data().forEach(function (item) {
                                            if (item.IsChecked) {
                                                temprefusalReasonCode.push(item.Value);
                                            }
                                        });
                                    }
                                }

                                var ptDiabScreeningVm = {
                                    PatientUID: $rootScope.Global.Objects.SelectedPatient.UID,
                                    DataState: CommonConstants.DataState.Added,
                                    SequenceNumber: 0,
                                    DiabeticScreeningCode: $scope.DropDowns.SelectedType.Value,
                                    Date: ($scope.DropDowns.SelectedDate).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                                    ResultCode: $scope.DropDowns.SelectedResult.Value,
                                    DiabeticScreeningDesc: "",
                                    DirectionCode: $scope.DropDowns.SelectedMode && $scope.DropDowns.SelectedMode.Value ? $scope.DropDowns.SelectedMode.Value : "",
                                    AbnormalitiesVM: tempabnormalities,
                                    Survey: surveyResponse,
                                    RefusalReasonCode: temprefusalReasonCode,
                                    SensoryLeftFoot: $scope.DropDowns.SelectedSensoryLeftFoot && $scope.DropDowns.SelectedSensoryLeftFoot.Value ? $scope.DropDowns.SelectedSensoryLeftFoot.Value : '',
                                    SensoryRightFoot: $scope.DropDowns.SelectedSensoryRightFoot && $scope.DropDowns.SelectedSensoryRightFoot.Value ? $scope.DropDowns.SelectedSensoryRightFoot.Value : '',
                                    PulseLeftFoot: $scope.DropDowns.SelectedPulseLeftFoot && $scope.DropDowns.SelectedPulseLeftFoot.Value ? $scope.DropDowns.SelectedPulseLeftFoot.Value : '',
                                    PulseRightFoot: $scope.DropDowns.SelectedPulseRightFoot && $scope.DropDowns.SelectedPulseRightFoot.Value ? $scope.DropDowns.SelectedPulseRightFoot.Value : ''
                                }
                                PathwaysTabService.AddPtDiabScreening(ptDiabScreeningVm, $scope.onAddPtDiabScreeningCompleted);
                            }
                        }
                    }
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "PathwaysTab";
                    errExp.FunctionName = "savePathways";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                    CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
                }
            };
           
             /**
             * @ngdoc function
             * @name addUpdateMemberCarePlanContact
             * @methodOf roundingModule.controller:PathwaysTabController
             * @description             
             ** Add/Update contact on adding/updating patient care plan record
             */
            $scope.addUpdateMemberCarePlanContact = function (dataObj, patient) {
                /// patient care plan Contact recap changes 
                if ($rootScope.Global.Contacts.PreSaveContact) {
                    var memberCarePlanContactNoteDetail = new kendo.data.ObservableArray([]);
                    var goalStartDate = dataObj.StartDate ? CommonFunctions.DateFunctions.dateFormat(CommonFunctions.DateFunctions.parseDate(dataObj.StartDate), "mm/dd/yyyy", false) : dataObj.StartDate;
                    var goalReviewDate = dataObj.ReviewDate ? CommonFunctions.DateFunctions.dateFormat(CommonFunctions.DateFunctions.parseDate(dataObj.ReviewDate), "mm/dd/yyyy", false) : "";
                    memberCarePlanContactNoteDetail.push("Goal Start Date: " + goalStartDate + "\t Review Date: " + goalReviewDate + "\n\n");
                    memberCarePlanContactNoteDetail.push(dataObj.CarePlanTopic + ":\t" + dataObj.ClinicalRelevanceDisplayText + ":\t" + dataObj.GoalName + ":\t\t" + "      Importance - " + $rootScope.ParentChild.Importance.SelectedLevel.Text + "\t\tConfidence - " + $rootScope.ParentChild.GoalConfidenceLevel.SelectedLevel.Text);
                    if ($rootScope.ParentChild.Priority.SelectedPriority && $rootScope.ParentChild.Priority.SelectedPriority.Value) {
                        memberCarePlanContactNoteDetail.push("\t\Priority - " + $rootScope.ParentChild.Priority.SelectedPriority.Text + "\n\n");
                    }
                    else {
                         memberCarePlanContactNoteDetail.push("\n\n");
                    }

                    memberCarePlanContactNoteDetail.push("Behavioral Goals: " + dataObj.BehavioralPlan + "\n\n");

                    /*Survey Questions Starts*/
                    if (dataObj.Survey && dataObj.Survey != null && dataObj.Survey.SurveyTypeCode === "CAREPLANGOAL" && dataObj.Survey.SurveyResponses !== null && dataObj.Survey.SurveyResponses) {

                        $scope.model.SurveyDetails.data().forEach(function (survey) {
                            survey.QuestionGroups.forEach(function (qnGroup) {
                                qnGroup.Questions.forEach(function (qn) {
                                    qn.Options.forEach(function (option) {
                                        if (option.IsSelected) {
                                            var freeFormText = "";
                                            if (dataObj.Survey && dataObj.Survey.SurveyResponses) {
                                                dataObj.Survey.SurveyResponses.forEach(function (response) {
                                                    if (response.UID === option.UID && response.FreeFormResponse) {
                                                        freeFormText = " - " + response.FreeFormResponse;
                                                    }
                                                });
                                            }
                                            memberCarePlanContactNoteDetail.push(option.ProviderText.replace("{0}", "") + freeFormText + "\n");
                                        }
                                    });
                                });
                            });
                        });
                    }
                    /*Survey Questions Ends*/

                    memberCarePlanContactNoteDetail.push("\nBarriers - ");
                    if ($rootScope.ParentChild.BarrierOption) {
                        var barrierOptionLength = $rootScope.ParentChild.BarrierOption.length;
                        for (var i = 0; i < barrierOptionLength ; i++) {
                            if ($rootScope.ParentChild.BarrierOption[i].Value === true) {
                                if ($rootScope.ParentChild.BarrierOption[i].Id === "HasOtherBarries") {
                                    if ($rootScope.ParentChild.OtherBarrierNotes && $rootScope.ParentChild.OtherBarrierNotes !== "") {
                                        memberCarePlanContactNoteDetail.push($rootScope.ParentChild.BarrierOption[i].Text + " (" + $rootScope.ParentChild.OtherBarrierNotes + "), ");
                                    }
                                    else {
                                        memberCarePlanContactNoteDetail.push($rootScope.ParentChild.BarrierOption[i].Text + ", ");
                                    }
                                }
                                else {
                                    memberCarePlanContactNoteDetail.push($rootScope.ParentChild.BarrierOption[i].Text + ", ");
                                }
                            }
                        }
                    }
                    if (memberCarePlanContactNoteDetail !== null) {
                        var carePlanContactnote = "";
                        memberCarePlanContactNoteDetail.forEach(function (note) {
                            carePlanContactnote = carePlanContactnote + note;
                        });
                        carePlanContactnote = carePlanContactnote.substr(0, carePlanContactnote.lastIndexOf(","));
                    }
                    var memerCarePlanContact = null;
                    if ($rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts && $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts.length > 0) {
                        $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts.forEach(function (preSaveContact) {
                            if (preSaveContact && preSaveContact.ContactReason === ContactConstants.Reason.MEMBER_CARE_PLAN) {
                                memerCarePlanContact = preSaveContact;
                            }
                        });
                    }
                    if (!memerCarePlanContact) {
                        var contact = {
                            UID: 0,
                            PatientUID: patient.UID,
                            PatientParameter: $rootScope.Global.Objects.IsRCMPRL ? "Rounding-RCMPRL" : "Rounding-VHN",
                            PatientName: patient.Name,
                            PatientID: patient.ID,
                            IsDefaultContact: false,
                            ContactDate: (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                            InternalTeam: ContactConstants.InternalTeam.REGISTERED_NURSE,
                            ExternalTeam: ContactConstants.ExternalTeam.PATIENT,
                            ContactMethod: ContactConstants.Methods.IN_PERSON,
                            ContactLocation: ContactConstants.Location.DIALYSIS_CENTER,
                            Resolution: ContactConstants.Resolution.COMPLETED,
                            Direction: ContactConstants.Direction.NOT_APPLICABLE,
                            EngagementBeginScale: ContactConstants.EngagementScore.NOT_ASSESSED,
                            EngagementEndScale: ContactConstants.EngagementScore.NOT_ASSESSED,
                            ContactReason: ContactConstants.Reason.MEMBER_CARE_PLAN,
                            PreSaveUID: 0,
                            ContactNotes: [{
                                ContactUID: 0,
                                ContactNoteUID: 0,
                                DataState: CommonConstants.DataState.Added,
                                NoteDate: (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                                NoteDetail: carePlanContactnote,
                                TagsString: "",
                                Tags: [ContactConstants.TagsValue.PatientCarePlan]
                            }
                            ],
                            CreatedBy: $rootScope.Global.Objects.LoggedInUser.UID,
                            ContactTime: (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoTime, false),
                            UserMessages: null,
                            DataState: CommonConstants.DataState.Added
                        };
                        if ($rootScope.Global.Contacts.PreSaveContact.PtContacts && $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts) {
                            $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts.push(contact);
                            var preSaveContactIndex = CommonFunctions.GetIndexForPreSaveContact();
                            if (preSaveContactIndex >= 0) {
                                $rootScope.Global.Contacts.PreSaveContactList[preSaveContactIndex].PtContacts.PtContacts.push(contact);
                            }
                        }
                    } else {
                        memerCarePlanContact.DataState = CommonConstants.DataState.Modified;
                        memerCarePlanContact.ContactNotes[0].DataState = CommonConstants.DataState.Modified;
                        memerCarePlanContact.ContactNotes[0].NoteDetail = memerCarePlanContact.ContactNotes[0].NoteDetail && memerCarePlanContact.ContactNotes[0].NoteDetail.length > 0 ? memerCarePlanContact.ContactNotes[0].NoteDetail + "\n\n" + carePlanContactnote : carePlanContactnote;
                        $rootScope.Global.Contacts.PreSaveContactList.forEach(function (preSaveContact) {
                            if (preSaveContact && preSaveContact.UID === $rootScope.Global.Contacts.PreSaveContact.UID) {
                                if (preSaveContact.PtContacts.PtContacts && preSaveContact.PtContacts.PtContacts.length > 0) {
                                    preSaveContact.PtContacts.PtContacts.forEach(function (updatedPreSaveContact) {
                                        if (updatedPreSaveContact && updatedPreSaveContact.ContactReason === ContactConstants.Reason.MEMBER_CARE_PLAN) {
                                            updatedPreSaveContact.DataState = CommonConstants.DataState.Modified;
                                            updatedPreSaveContact.ContactNotes[0].DataState = CommonConstants.DataState.Modified;
                                            updatedPreSaveContact.ContactNotes[0].NoteDetail = memerCarePlanContact.ContactNotes[0].NoteDetail;
                                        }
                                    });
                                }
                            }
                        });
                    }
                    CommonFunctions.UpdatePreSaveContactList();
                }
            };

            $scope.formattingUpdateDataFormat = function (responseQuestions, clinicalItems) {
                var ClinicalRelevance = "";
                var ClinicalRelavanceScorecard = "";
                if ($rootScope.ParentChild.ClinicalRelevance.SelectedText.Type == CommonConstants.ClinicalRelevanceType.SC) {
                    ClinicalRelavanceScorecard = $rootScope.ParentChild.ClinicalRelevance.SelectedText.Code;
                } else if ($rootScope.ParentChild.ClinicalRelevance.SelectedText.Text) {
                    ClinicalRelevance = $rootScope.ParentChild.ClinicalRelevance.SelectedText.Code;
                }

                var BarrierOptionLength = $rootScope.ParentChild.BarrierOption.length;
                var HasEquipmentIssue = false,
                    HasKnowledgeDeficit = false,
                    HasPhysicalLimitation = false,
                    HasPoorHabitsPractices = false,
                    HasPsychologicalIssue = false,
                    HasSocioEconomicIssue = false,
                    HasSupport = false,
                    HasOtherBarries = false,
                    NoBarrier = false;

                for (var i = 0; i < BarrierOptionLength ; i++) {
                    if ($rootScope.ParentChild.BarrierOption[i].Id == 'HasPoorHabitsPractices') {
                        HasPoorHabitsPractices = $rootScope.ParentChild.BarrierOption[i].Value;
                    } else if ($rootScope.ParentChild.BarrierOption[i].Id == 'HasKnowledgeDeficit') {
                        HasKnowledgeDeficit = $rootScope.ParentChild.BarrierOption[i].Value;
                    } else if ($rootScope.ParentChild.BarrierOption[i].Id == 'HasEquipmentIssue') {
                        HasEquipmentIssue = $rootScope.ParentChild.BarrierOption[i].Value;
                    } else if ($rootScope.ParentChild.BarrierOption[i].Id == 'HasSocioEconomicIssue') {
                        HasSocioEconomicIssue = $rootScope.ParentChild.BarrierOption[i].Value;
                    } else if ($rootScope.ParentChild.BarrierOption[i].Id == 'HasPhysicalLimitation') {
                        HasPhysicalLimitation = $rootScope.ParentChild.BarrierOption[i].Value;
                    } else if ($rootScope.ParentChild.BarrierOption[i].Id == 'HasPsychologicalIssue') {
                        HasPsychologicalIssue = $rootScope.ParentChild.BarrierOption[i].Value;
                    } else if ($rootScope.ParentChild.BarrierOption[i].Id == 'HasSupport') {
                        HasSupport = $rootScope.ParentChild.BarrierOption[i].Value;
                    } else if ($rootScope.ParentChild.BarrierOption[i].Id == 'NoBarrier') {
                        NoBarrier = $rootScope.ParentChild.BarrierOption[i].Value;
                    } else if ($rootScope.ParentChild.BarrierOption[i].Id == 'HasOtherBarries') {
                        HasOtherBarries = $rootScope.ParentChild.BarrierOption[i].Value;
                    }
                }
                var Survey = {
                    SurveyUID: $scope.model.SurveyDetails.data()[0].SurveyUID,
                    SurveyTypeCode: $scope.model.SurveyDetails.data()[0].SurveyTypeCode,
                    CompletedDate: (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                    SurveyStatusCode: CommonConstants.StatusCode.Completed,
                    SurveyResponses: responseQuestions.toJSON(),
                    UID: $scope.model.SurveyDetails.data()[0].UID,
                    DataState: ($scope.IsEditCarelan) ? CommonConstants.DataState.Modified : CommonConstants.DataState.Added
                };
                if ($rootScope.ParentChild.GoalStatus.SelectedStatus.Value == 'I' || $rootScope.ParentChild.GoalStatus.SelectedStatus.Value == 'N') {
                    var completedDate = null;
                } else {
                    var completedDate = CommonFunctions.DateFunctions.dateFormat($scope.Date.CompletedDate, "mm/dd/yyyy");
                }
                var dataObj = {
                    PatientUID: $rootScope.Global.Objects.SelectedPatient.UID,
                        StartDate: CommonFunctions.DateFunctions.dateFormat($scope.Date.StartDate, "mm/dd/yyyy", false),
                        DueDate: CommonFunctions.DateFunctions.dateFormat($scope.Date.DueDate, "mm/dd/yyyy", false),
                        ReviewDate: $scope.Date.ReviewDate ? CommonFunctions.DateFunctions.dateFormat($scope.Date.ReviewDate, "mm/dd/yyyy", false) : null,
                    CompleteDate: completedDate,
                    CreateDate: (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),

                    CarePlanTopic: $rootScope.ParentChild.CarePlanTopic.SelectedTopic.Value,
                    ImportanceLevel: $rootScope.ParentChild.Importance.SelectedLevel.Value,
                    OverallConfidenceLevel: $rootScope.ParentChild.GoalConfidenceLevel.SelectedLevel.Value,
                    GoalStatus: $rootScope.ParentChild.GoalStatus.SelectedStatus.Value,
                    ClinicalRelevance: ClinicalRelevance,
                    Priority: $rootScope.ParentChild.Priority.SelectedPriority.Value,
                    ClinicalRelavanceScorecard: ClinicalRelavanceScorecard,
                    GoalName: $rootScope.ParentChild.Careplanname,
                    BehavioralPlan: $rootScope.ParentChild.BehavioralPlan,
                    EngagementGoal: $rootScope.ParentChild.EngagementGoal,
                    //CarePlans: null,
                    ClinicalRelevanceDisplayText: $rootScope.ParentChild.ClinicalRelevance.SelectedText.Text,

                    DataState: ($scope.IsEditCarelan) ? CommonConstants.DataState.Modified : CommonConstants.DataState.Added,
                    HasEquipmentIssue: HasEquipmentIssue,
                    HasKnowledgeDeficit: HasKnowledgeDeficit,
                    HasPhysicalLimitation: HasPhysicalLimitation,
                    HasPoorHabitsPractices: HasPoorHabitsPractices,
                    HasPsychologicalIssue: HasPsychologicalIssue,
                    HasSocioEconomicIssue: HasSocioEconomicIssue,
                    HasSupport: HasSupport,
                    HasOtherBarries: HasOtherBarries,
                    NoBarrier: NoBarrier,
                    //OtherBarrierNotes: ($("#HasOtherBarries").data("kendoMobileSwitch").check()) ? $scope.OtherBarrierNotes:,
                    OtherBarrierNotes: (HasOtherBarries) ? $rootScope.ParentChild.OtherBarrierNotes : null,
                    UID: ($scope.IsEditCarelan) ? clinicalItems.UID : $scope.model.SurveyDetails.data()[0].UID,
                    Survey: Survey
                };
                return dataObj;
            };
            $scope.formattingAddDataFormat = function (responseQuestions, clinicalItems) {
                var ClinicalRelevance = "";
                var ClinicalRelavanceScorecard = "";
                if ($rootScope.ParentChild.ClinicalRelevance.SelectedText && $rootScope.ParentChild.ClinicalRelevance.SelectedText.Type == CommonConstants.ClinicalRelevanceType.SC) {
                    ClinicalRelavanceScorecard = $rootScope.ParentChild.ClinicalRelevance.SelectedText.Code;
                } else if ($rootScope.ParentChild.ClinicalRelevance.SelectedText && $rootScope.ParentChild.ClinicalRelevance.SelectedText.Text) {
                    ClinicalRelevance = $rootScope.ParentChild.ClinicalRelevance.SelectedText.Code;
                }

                var BarrierOptionLength = $rootScope.ParentChild.BarrierOption.length;
                var HasEquipmentIssue = false,
                    HasKnowledgeDeficit = false,
                    HasPhysicalLimitation = false,
                    HasPoorHabitsPractices = false,
                    HasPsychologicalIssue = false,
                    HasSocioEconomicIssue = false,
                    HasSupport = false,
                    HasOtherBarries = false,
                    NoBarrier = false;

                for (var i = 0; i < BarrierOptionLength ; i++) {
                    if ($rootScope.ParentChild.BarrierOption[i].Id == 'HasPoorHabitsPractices') {
                        HasPoorHabitsPractices = $rootScope.ParentChild.BarrierOption[i].Value;
                    } else if ($rootScope.ParentChild.BarrierOption[i].Id == 'HasKnowledgeDeficit') {
                        HasKnowledgeDeficit = $rootScope.ParentChild.BarrierOption[i].Value;
                    } else if ($rootScope.ParentChild.BarrierOption[i].Id == 'HasEquipmentIssue') {
                        HasEquipmentIssue = $rootScope.ParentChild.BarrierOption[i].Value;
                    } else if ($rootScope.ParentChild.BarrierOption[i].Id == 'HasSocioEconomicIssue') {
                        HasSocioEconomicIssue = $rootScope.ParentChild.BarrierOption[i].Value;
                    } else if ($rootScope.ParentChild.BarrierOption[i].Id == 'HasPhysicalLimitation') {
                        HasPhysicalLimitation = $rootScope.ParentChild.BarrierOption[i].Value;
                    } else if ($rootScope.ParentChild.BarrierOption[i].Id == 'HasPsychologicalIssue') {
                        HasPsychologicalIssue = $rootScope.ParentChild.BarrierOption[i].Value;
                    } else if ($rootScope.ParentChild.BarrierOption[i].Id == 'HasSupport') {
                        HasSupport = $rootScope.ParentChild.BarrierOption[i].Value;
                    } else if ($rootScope.ParentChild.BarrierOption[i].Id == 'NoBarrier') {
                        NoBarrier = $rootScope.ParentChild.BarrierOption[i].Value;
                    } else if ($rootScope.ParentChild.BarrierOption[i].Id == 'HasOtherBarries') {
                        HasOtherBarries = $rootScope.ParentChild.BarrierOption[i].Value;
                    }
                }
               var Survey = {
                    SurveyUID: $scope.model.SurveyDetails.data()[0].SurveyUID,
                    SurveyTypeCode: $scope.model.SurveyDetails.data()[0].SurveyTypeCode,
                    CompletedDate: (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                    SurveyStatusCode: CommonConstants.StatusCode.Completed,
                    SurveyResponses: responseQuestions.toJSON(),
                    //UID: $scope.model.SurveyDetails.data()[0].UID,
                    DataState: ($scope.IsEditCarelan) ? CommonConstants.DataState.Modified : CommonConstants.DataState.Added
                };


               var dataObj = {

                    PatientUID: $rootScope.Global.Objects.SelectedPatient.UID,

                    StartDate: CommonFunctions.DateFunctions.dateFormat($scope.Date.StartDate, "mm/dd/yyyy", false),
                    DueDate: CommonFunctions.DateFunctions.dateFormat($scope.Date.DueDate, "mm/dd/yyyy", false),
                   ReviewDate: $scope.Date.ReviewDate ? CommonFunctions.DateFunctions.dateFormat($scope.Date.ReviewDate, "mm/dd/yyyy", false) : null,
                    //CompletedDate: $scope.Date.CompletedDate,
                    CreateDate: (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),

                    CarePlanTopic: $rootScope.ParentChild.CarePlanTopic.SelectedTopic.Value,
                    ImportanceLevel: $rootScope.ParentChild.Importance.SelectedLevel.Value,
                    OverallConfidenceLevel: $rootScope.ParentChild.GoalConfidenceLevel.SelectedLevel.Value,
                    GoalStatus: $rootScope.ParentChild.GoalStatus.SelectedStatus.Value,
                    ClinicalRelevance: ClinicalRelevance,
                    Priority: $rootScope.ParentChild.Priority.SelectedPriority.Value,
                    ClinicalRelavanceScorecard: ClinicalRelavanceScorecard,
                    GoalName: $rootScope.ParentChild.Careplanname,
                    BehavioralPlan: $rootScope.ParentChild.BehavioralPlan,
                    EngagementGoal: $rootScope.ParentChild.EngagementGoal,
                    CarePlans: [],
                    ClinicalRelevanceDisplayText: $rootScope.ParentChild.ClinicalRelevance.SelectedText ? $rootScope.ParentChild.ClinicalRelevance.SelectedText.Text : "",
                    DataState: ($scope.IsEditCarelan) ? CommonConstants.DataState.Modified : CommonConstants.DataState.Added,
                    HasEquipmentIssue: HasEquipmentIssue,
                    HasKnowledgeDeficit: HasKnowledgeDeficit,
                    HasPhysicalLimitation: HasPhysicalLimitation,
                    HasPoorHabitsPractices: HasPoorHabitsPractices,
                    HasPsychologicalIssue: HasPsychologicalIssue,
                    HasSocioEconomicIssue: HasSocioEconomicIssue,
                    HasSupport: HasSupport,
                    HasOtherBarries: HasOtherBarries,
                    NoBarrier: NoBarrier,
                    //OtherBarrierNotes: ($("#HasOtherBarries").data("kendoMobileSwitch").check()) ? $scope.OtherBarrierNotes:,
                    OtherBarrierNotes: (HasOtherBarries) ? $rootScope.ParentChild.OtherBarrierNotes : null,
                    Survey: Survey
               };
               return dataObj;
            };

            $scope.dateValidations = function (isValid) {
                var isDateValid = isValid;
                var dateValidationMessage = "";
                $('input[type="text"]').each(function () {
                    if (!$(this).is(':hidden')) {

                        if (($.trim($(this).val()) !== "") && ($(this).is("[data-datevalid-pathwayTab]"))) {

                                var pretext = $(this).data("pretext") ? $(this).data("pretext") : "Date";

                                if (!kendo.parseDate($(this).val())) {
                                    isDateValid = false;
                                    dateValidationMessage = dateValidationMessage + ("Please enter valid " + pretext + ".") + "\n";
                                    return;
                                }

                                if ($scope.model.SurveyType === ScreeningsSurveyTypes.ADPathway && $(this).data("pretext")) {
                                    var todayDate = new Date();
                                    var pathwayMinDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 6);
                                    var pathwayMaxDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
                                    var selectedDate = kendo.parseDate($(this).val());
                                    if ($(this).data("pretext") === ScreenHeaderConstant.ADPathwayFieldName.EffectiveDate) {
                                        if (selectedDate > pathwayMaxDate) {
                                            isDateValid = false;
                                            dateValidationMessage = dateValidationMessage + (pretext + " can not be in future.") + "\n";
                                        }
                                    } else if ($(this).data("pretext") === ScreenHeaderConstant.ADPathwayFieldName.DiscussionDate) {
                                        if (selectedDate > pathwayMaxDate) {
                                            isDateValid = false;
                                            dateValidationMessage = dateValidationMessage + (pretext + " can not be in future") + "\n";
                                        }
                                        if (selectedDate < pathwayMinDate) {
                                            isDateValid = false;
                                            dateValidationMessage = dateValidationMessage + (pretext + " should be within past 7 days from today's date.") + "\n";
                                        }
                                    }
                                }
                            }
                        }                    
                });

                if (!isDateValid && dateValidationMessage)
                    CommonFunctions.DisplayAlertMessage(dateValidationMessage);

                return isDateValid;
            }

            /**
             * @ngdoc event 
             * @name postponePathways
             * @eventOf roundingModule.controller:PathwaysTabController  
             * @description       
             ** ng-click event of postpone button
             ** Postpones the survey detail changes
             */
            $scope.postponePathways = function () {
                try {
                    if ($scope.pathwaysValidator.validate()) {
                        var isValid = true;
                        $('input[type="text"]').each(function () {
                            if (!$(this).is(':hidden')) {
                                if (($.trim($(this).val()) === '') && $(this).hasClass('required')) {
                                    isValid = false;
                                }
                            }
                        });

                        isValid = $scope.dateValidations(isValid);

                        if (isValid) {
                            CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
                            var patient = $rootScope.Global.Objects.SelectedPatient;
                            var responseQuestions = new kendo.data.ObservableArray([]);
                            $scope.model.SurveyDetails.data()[0].QuestionGroups[0].Questions.forEach(function (question) {
                                if (question.IsQuestionVisible) {
                                    var responseQuestion = {
                                        "QuestionUID": question.UID, "Responses": new kendo.data.ObservableArray([])
                                    }
                                    question.Options.forEach(function (option) {
                                        if (option.IsSelected) {
                                            responseQuestion.Responses.push({
                                                                                "OptionUID": option.UID, "FreeFormResponse": option.FreeFormResponse
                                                                            });
                                        }
                                    });

                                    if (responseQuestion.Responses.length > 0) {
                                        responseQuestions.push(responseQuestion)
                                    }
                                }
                            });

                            var surveyResponse = {
                                PatientUID: patient.UID,
                                DataState: CommonConstants.DataState.Modified,
                                MemSurveyUID: $scope.model.SurveyDetails.data()[0].UID,
                                SurveyTypeCode: $scope.model.SurveyDetails.data()[0].SurveyTypeCode,
                                SurveyUID: $scope.model.SurveyDetails.data()[0].SurveyUID,
                                SurveyComments: $scope.model.SurveyDetails.data()[0].SurveyComments,
                                IncludePatientCommentYesNo: $scope.model.SurveyDetails.data()[0].IncludePatientCommentYesNo,
                                IncludeProviderCommentYesNo: $scope.model.SurveyDetails.data()[0].IncludeProviderCommentYesNo,
                                ResponseQuestions: responseQuestions.toJSON(),
                                StartDate: $scope.model.SurveyDetails.data()[0].UID === 0 ? (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false): $scope.model.SurveyDetails.data()[0].StartDate,
                                CompletedDate: null,
                                SurveyStatus: "P"
                            };

                            PathwaysTabService.SaveSurveyDetails(surveyResponse, $scope.onSaveSurveyDetailsCompleted);
                        }
                    }
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "PathwaysTab";
                    errExp.FunctionName = "postponePathways";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
             * @ngdoc event 
             * @name cancelPathways
             * @eventOf roundingModule.controller:PathwaysTabController  
             * @description       
             ** ng-click event of cancel button
             ** Cancels the survey detail changes      
             */
            $scope.cancelPathways = function () {
                try {
                    if ($scope.model.SurveyDetails) {
                        $scope.model.SurveyDetails.data().forEach(function (surveyDetail) {
                            delete surveyDetail["$$hashKey"];
                            surveyDetail.QuestionGroups.forEach(function (questionGroup) {
                                delete questionGroup["$$hashKey"];
                                questionGroup.Questions.forEach(function (question) {
                                    delete question["$$hashKey"];
                                    question.Options.forEach(function (option) {
                                        delete option["$$hashKey"];
                                    });
                                });
                            });
                        });
                        var tempViewModel = JSON.stringify($scope.model.SurveyDetails.data());
                    }

                    //if (tempViewModel !== $scope.model.CopySurveyDetails)
                    if (($scope.model.CopySurveyDetails && tempViewModel && !angular.equals(tempViewModel, $scope.model.CopySurveyDetails)) || ($scope.IsImmunization && ImmunizationHasChanges())) {
                        CommonFunctions.OpenCustomConfirmBox('Confirm', CommonMessages.Alert.ChangesLost, "Yes,No", function (data) {
                            if (data !== undefined && data.returnValue !== undefined) {
                                if (data.returnValue) {
                                    if ($scope.IsPathwaysTab) {
                                        $scope.getPathwayHeaderData();
                                        $scope.getPatientSurveyDetails();
                                    } else {
                                        if ($scope.SelectedSurveyType === ScreenConstants.DiabetesTab) {
                                            // stay on the current screen
                                            $rootScope.Global.Objects.SelectedPathwayScreeningMenu = ScreenConstants.DiabetesTab;
                                        } else if ($scope.SelectedSurveyType === ScreenConstants.ImmunizationsTab) {
                                            $rootScope.Global.Objects.SelectedPathwayScreeningMenu = ScreenConstants.ImmunizationsTab;
                                        }
                                        $scope.showPathway();
                                    }
                                }
                            }
                        });
                    } else {
                        if ($scope.IsPathwaysTab) {
                            $scope.getPathwayHeaderData();
                            $scope.getPatientSurveyDetails();
                        } else {
                            if ($scope.SelectedSurveyType === ScreenConstants.DiabetesTab) {
                                // stay on the current screen
                                $rootScope.Global.Objects.SelectedPathwayScreeningMenu = ScreenConstants.DiabetesTab;
                            } else if ($scope.SelectedSurveyType === ScreenConstants.ImmunizationsTab) {
                                $rootScope.Global.Objects.SelectedPathwayScreeningMenu = ScreenConstants.ImmunizationsTab;
                            }
                            $scope.showPathway();
                        }
                    }
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "PathwaysTab";
                    errExp.FunctionName = "cancelPathways";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
             * @ngdoc event 
             * @name surveyCommentsBlur
             * @eventOf roundingModule.controller:PathwaysTabController  
             * @description       
             ** ng-blur event of survey comment text area
             */
            $scope.surveyCommentsBlur = function () {
                try {
                    if ($scope.model.SurveyDetails && $scope.model.SurveyDetails.data()[0]
                        && $scope.model.SurveyDetails.data()[0].SurveyComments === "") {
                        $scope.IsSurveydetailsCommentCheckBoxDisabled = true;
                        $scope.model.SurveyDetails.data()[0].IncludePatientCommentYesNo = false;
                        $scope.model.SurveyDetails.data()[0].IncludeProviderCommentYesNo = false;
                    } else {
                        $scope.IsSurveydetailsCommentCheckBoxDisabled = false;
                    }

                    $scope.HasChanges();
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "PathwaysTab";
                    errExp.FunctionName = "surveyCommentsBlur";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
             * @ngdoc event 
             * @name addPathways
             * @eventOf roundingModule.controller:PathwaysTabController  
             * @description       
             ** ng-click event of add button
             ** Displays the blank survey detail     
             */
            $scope.addPathways = function () {
                try {
                    //hide all error messages
                    if ($("#ptchart-pthwy-content").data("kendoValidator")) {
                        $("#ptchart-pthwy-content").data("kendoValidator").hideMessages();
                    }

                    $("#ptchart-pthwy-patient-comment").attr("disabled", true);
                    $("#ptchart-pthwy-provider-comment").attr("disabled", true);
                    $scope.getSurveyDetails();
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "PathwaysTab";
                    errExp.FunctionName = "addPathways";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
             * @ngdoc function
             * @name onGetPrePopulatedResponseRetrieved
             * @methodOf roundingModule.controller:PathwaysTabController
             * @description             
             ** Service based call back function of GetPrePopulatedResponse Service call 
             ** Sets the prepopulated response and if required make the same service call for next question
             * @param {object} result returned result data of WebApi call
             */
            $scope.onGetPrePopulatedResponseRetrieved = function (result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        $scope.model.SurveyDetails.data().forEach(function (surveyDetail) {
                            surveyDetail.QuestionGroups.forEach(function (questionGroup) {
                                questionGroup.Questions.forEach(function (question) {
                                    question.Options.forEach(function (option) {
                                        if (parseInt(result.data) === option.UID) {
                                            option.IsSelected = true;

                                            //set the button group
                                            if (!question.IsMultiple) {
                                                option.SelectedIndex = option.OptionOrder;
                                                question.SelectedIndex = option.OptionOrder;
                                                // call the change handler method manually
                                                $scope.onGroupRadioChecked(option.QuestionUID, option.UID, option.OptionOrder);
                                            }
                                        }
                                    });
                                });
                            });
                        });
                    }
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "PathwaysTab";
                    errExp.FunctionName = "onGetPrePopulatedResponseRetrieved";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            }

            /**
             * @ngdoc function 
             * @name getPrepopulatedResponse
             * @methodOf roundingModule.controller:PathwaysTabController           
             * @description       
             ** Calls PathwaysTabService.GetPrePopulatedResponse
             */
            $scope.getPrepopulatedResponse = function (questionUID) {
                try {
                    CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
                    PathwaysTabService.GetPrePopulatedResponse({ PatientUID: $rootScope.Global.Objects.SelectedPatient.UID, QuestionUID: questionUID }, $scope.onGetPrePopulatedResponseRetrieved);
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "PathwaysTab";
                    errExp.FunctionName = "getPrepopulatedResponse";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
             * @ngdoc event 
             * @name onGroupRadioChecked
             * @eventOf roundingModule.controller:PathwaysTabController  
             * @description       
             ** ng-change event of input type radio 
             ** Display survey question and/or pre-populated option based on response     
             */
            $scope.onGroupRadioChecked = function (questionUID, uid, optionOrder) {
                try {
                    var questionOrder = 0;
                    var questionDisplayOrder = 0;
                    var isEndOfSurvey = false;
                    $scope.model.SurveyDetails.data().forEach(function (surveyDetail) {
                        surveyDetail.QuestionGroups.forEach(function (questionGroup) {
                            questionGroup.Questions.forEach(function (question) {
                                if (question.UID === parseInt(questionUID)) {
                                    questionOrder = question.Order;
                                    questionDisplayOrder = question.DisplayOrder;
                                }
                            });
                        });
                    });

                    var skip = false;
                    var skipToQuestionUID = null;

                    //reset everything for skipquestion logic
                    $scope.model.SurveyDetails.data().forEach(function (surveyDetail) {
                        surveyDetail.QuestionGroups.forEach(function (questionGroup) {
                            questionGroup.Questions.forEach(function (question) {
                                if (questionOrder == 1 && ScreenConstants.CarePlanGoal && !$scope.model.RadioClickTrigger) {
                                    question.Options.forEach(function (option) {
                                        option.FreeFormResponse = null;
                                        option.IsSelected = false;
                                    });
                                }

                                if (question.Order > questionOrder) {

                                    if ($scope.model.SurveyType === ScreenConstants.CarePlanGoal) {
                                        question.IsQuestionVisible = true;
                                    } else {
                                        question.IsQuestionVisible = false;
                                    }
                                    if (!$scope.model.RadioClickTrigger) {
                                        question.Options.forEach(function (option) {
                                            option.IsSelected = false;
                                            option.IsOptionDisabled = false;
                                            option.FreeFormResponse = null;

                                            $("#" + option.UID + "-" + option.OptionOrder).prop('checked', false);
                                        });

                                        //Clear all selections
                                        if (!question.IsMultiple) {
                                            question.SelectedIndex = -1;
                                        }
                                    }
                                }
                            });
                        });
                    });

                    var anyQuestionVisibled = false;

                    $scope.model.SurveyDetails.data().forEach(function (surveyDetail) {
                        surveyDetail.QuestionGroups.forEach(function (questionGroup) {
                            questionGroup.Questions.forEach(function (question) {
                                //Hide-Show DisplayText                                
                                if (question.UID === questionUID) {
                                    question.Options.forEach(function (option) {
                                        if (parseInt(uid) === option.UID && parseInt(optionOrder) === option.OptionOrder) {
                                            option.IsSelected = true;
                                            option.SelectedIndex = option.OptionOrder;
                                            if (option.FreeFormTemplate && option.FreeFormTemplate.DataTypeCode === "DATE")
                                                option.FreeFormResponse = null;

                                            question.SelectedIndex = option.OptionOrder;

                                            //Have to fire manually as angular was not updating after first time load
                                            $("#" + option.UID + '-' + option.OptionOrder).prop('checked', true);
                                            $("#question-" + question.UID + "-" + question.Order).removeClass("ng-hide");
                                            if (option.SkipToQuestionUID !== null) {
                                                skip = true;
                                                skipToQuestionUID = option.SkipToQuestionUID;
                                            }
                                            if (option.IsEndOfSurvey) {
                                                isEndOfSurvey = true;
                                            }
                                        } else {
                                            option.IsSelected = false;
                                        }
                                    });
                                }
                                if (!isEndOfSurvey) {
                                    //Show SkiptoQuestionUID
                                    if (skip && question.UID === skipToQuestionUID) {
                                        if (question.CanBePrepopulated) {
                                            $scope.getPrepopulatedResponse(question.UID);
                                        }
                                        question.DisplayOrder = questionDisplayOrder + 1;
                                        question.IsQuestionVisible = true;
                                        skip = false;
                                        skipToQuestionUID = null;
                                        anyQuestionVisibled = true;
                                    }

                                    if (questionOrder + 1 === question.Order && skip === false) {
                                        if (question.CanBePrepopulated) {
                                            $scope.getPrepopulatedResponse(question.UID);
                                        }
                                        question.DisplayOrder = questionDisplayOrder + 1;
                                        question.IsQuestionVisible = true;
                                        anyQuestionVisibled = true;
                                    }
                                }
                                if (question.IsQuestionVisible) {
                                    $("#question-" + question.UID + "-" + question.Order).removeClass("ng-hide");
                                    if (question.UID === questionUID) {
                                        question.Options.forEach(function (option) {
                                            if (parseInt(uid) === option.UID && parseInt(optionOrder) === option.OptionOrder && option.IsSelected) {
                                                if (!option.FreeFormTemplate.HasFreeForm && ($scope.SelectedSurveyType !== ScreenConstants.ImmunizationsTab)) {
                                                    window.setTimeout(function () {
                                                        scrollToNextQuestion();
                                                    }, 100);
                                                }
                                            }
                                        });
                                    }
                                } else {
                                    $("#question-" + question.UID + "-" + question.Order).addClass("ng-hide");
                                }
                            });
                        });
                    });

                    if (!anyQuestionVisibled || isEndOfSurvey) {
                        $scope.Buttons.SaveButtonVisible = true;
                        if ($scope.IsPathwaysTab) {
                            $scope.Buttons.PostponeButtonVisible = true;
                        }
                    } else {
                        $scope.Buttons.SaveButtonVisible = false;
                        if ($scope.IsPathwaysTab) {
                            $scope.Buttons.PostponeButtonVisible = true;
                        } else {
                            $scope.Buttons.PostponeButtonVisible = false;
                        }
                    }
                    if (!$scope.model.RadioClickTrigger) {
                        CommonFunctions.UIChanged();
                    }
                    if ($scope.model.SurveyType === ScreenConstants.CarePlanGoal) {
                        var clinicalItems = PatientCarePlanService.GetSelectedEditActiveCarePlan();
                        if (clinicalItems) {
                            $scope.IsEditCarelan = true;
                        } else {
                            $scope.IsEditCarelan = false;
                        }
                        if ($scope.IsEditCarelan == true ){
                            if ($rootScope.IsCarePlanCameFirstTime < 3 ) {
                                $rootScope.IsCarePlanCameFirstTime++;
                            } else {
                                $scope.onCarePlanSurveyUIChangedFunction();
                            }
                        } else {
                            $scope.onCarePlanSurveyUIChangedFunction();
                        }
                    }
                } catch (ex) {
           var errExp = { };
           errExp.Exception = ex;
           errExp.ModuleName = "PathwaysTab";
           errExp.FunctionName = "onGroupRadioChecked";
           errExp.StackTrace = printStackTrace({
                    e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
             * @ngdoc function 
             * @name scrollToNextQuestion
             * @function of roundingModule.controller:PathwaysTabController  
             * @description                    
             ** Scroller will move automatically to next question and at the end we can able to ee comment box wihout using s
             ** manual scrolling ...
             */
            scrollToNextQuestion = function () {
                if ($("#pathwaysList").height() + $("#ptchart-pthwy-surveydetails-comments").height() > $("#ptchart-pthwy-surveydetails").height()) {
                    var scroller = $("#ptchart-pthwy-surveydetails").data("kendoMobileScroller");
                    if (!scroller) {
                        $("#ptchart-pthwy-surveydetails").kendoMobileScroller();
                    }
                    var moveto = ($("#pathwaysList").height() + $("#ptchart-pthwy-surveydetails-comments").height()) - $("#ptchart-pthwy-surveydetails").height();
                    scroller.scrollTo(0, -(Math.abs(moveto) + 20));
                }
            }

            /**
             * @ngdoc event 
             * @name onSwitchChange
             * @eventOf roundingModule.controller:PathwaysTabController  
             * @description       
             ** k-on-change event of kendo mobile swtich 
             ** Display survey question and/or pre-populated option based on response    
             */
            $scope.onSwitchChange = function (e) {
                try {
                    var senderul = $(e.sender.element).attr('id');
                    var res = senderul.split("-");
                    var isChecked = false;
                    var i = 0;

                    $(".question-options-" + res[3] + "-" + res[5]).children().each(function (value) {
                        if ($(this).hasClass("km-switch-on")) {
                            isChecked = true;
                            i++;
                        }
                    });

                    var skip = false;
                    var skipToQuestionUID = null;
                    var completed = false;

                    $scope.model.SurveyDetails.data().forEach(function (surveyDetail) {
                        surveyDetail.QuestionGroups.forEach(function (questionGroup) {
                            questionGroup.Questions.forEach(function (question) {
                                if (question.UID === parseInt(res[3])) {
                                    question.Options.forEach(function (option) {
                                        if (option.UID === parseInt(res[4])) {
                                            if (option.IsSelected) {
                                                if (option.SkipToQuestionUID !== null) {
                                                    skip = true;
                                                    skipToQuestionUID = option.SkipToQuestionUID;
                                                } else if (option.SkipToQuestionUID === null) {
                                                    skip = false;
                                                    skipToQuestionUID = null;
                                                }
                                                completed = true;
                                            } else {
                                                completed = false;
                                            }
                                        } else if (!completed && option.IsSelected) {
                                            if (option.SkipToQuestionUID !== null) {
                                                skip = true;
                                                skipToQuestionUID = option.SkipToQuestionUID;
                                            } else if (option.SkipToQuestionUID === null) {
                                                skip = false;
                                                skipToQuestionUID = null;
                                            }
                                            completed = true;
                                        }
                                    });
                                }

                                if (question.Order > parseInt(res[5])) {                                                                       
                                    question.IsQuestionVisible = false;                                    
                                    question.SelectedIndex = -1;
                                    anyButtonGroupVisible = false;
                                    question.Options.forEach(function (option) {
                                        option.IsSelected = false;
                                        $("#" + option.UID + "-" + option.OptionOrder).attr('checked', false);
                                    });

                                    if (question.IsQuestionVisible) {
                                        $("#question-" + question.UID + "-" + question.Order).removeClass("ng-hide");
                                    } else {
                                        $("#question-" + question.UID + "-" + question.Order).addClass("ng-hide");
                                    }
                                }                                                               
                            });
                        });
                    });

                    var anyButtonGroupVisible = false;
                    var displayOrder;
                    if (isChecked) {
                        $scope.model.SurveyDetails.data().forEach(function (surveyDetail) {
                            surveyDetail.QuestionGroups.forEach(function (questionGroup) {
                                questionGroup.Questions.forEach(function (question) {
                                    if (parseInt(res[5]) === question.Order) {
                                        displayOrder = question.DisplayOrder;
                                    }

                                    if (skip && question.UID === skipToQuestionUID) {
                                        question.DisplayOrder = displayOrder + 1;
                                        question.IsQuestionVisible = true;
                                        if (question.SelectedIndex === -1) {
                                            anyButtonGroupVisible = true;
                                        } else {
                                            anyButtonGroupVisible = false;
                                        }

                                        if (question.CanBePrepopulated) {
                                            $scope.getPrepopulatedResponse(question.UID);
                                        }
                                    }
                                    if (!skip) {
                                        if (parseInt(res[5]) + 1 === question.Order) {
                                            question.DisplayOrder = displayOrder + 1;
                                            question.IsQuestionVisible = true;
                                            if (question.SelectedIndex === -1) {
                                                anyButtonGroupVisible = true;
                                            } else {
                                                anyButtonGroupVisible = false;
                                            }

                                            if (question.CanBePrepopulated) {
                                                $scope.getPrepopulatedResponse(question.UID);
                                            }
                                        }
                                    }
                                    if (question.IsQuestionVisible) {
                                        $("#question-" + question.UID + "-" + question.Order).removeClass("ng-hide");
                                        /* code has been disable for defect D-04209 */
                                        //if (question.UID === parseInt(res[3])) {
                                        //    question.Options.forEach(function (option) {
                                        //        if (parseInt(res[4]) === option.UID && /*parseInt(res[5]) === option.OptionOrder &&*/ option.IsSelected) {
                                        //            if (!option.FreeFormTemplate.HasFreeForm) {
                                        //                window.setTimeout(function () {
                                        //                    scrollToNextQuestion();
                                        //                }, 100);
                                        //            }
                                        //        } 
                                        //    });
                                        //}
                                    } else {
                                        $("#question-" + question.UID + "-" + question.Order).addClass("ng-hide");
                                    }
                                });
                            });
                        });
                    }
                    if (i === 0 || anyButtonGroupVisible) {
                        $scope.Buttons.SaveButtonVisible = false;
                        if ($scope.IsPathwaysTab && anyButtonGroupVisible) {
                            $scope.Buttons.PostponeButtonVisible = true;
                        } else {
                            $scope.Buttons.PostponeButtonVisible = res[5]!== "1";  //*** MR for first question only.
                        }
                    } else {
                        $scope.Buttons.SaveButtonVisible = true;
                        $scope.Buttons.PostponeButtonVisible = false;
                    }

                    CommonFunctions.UIChanged();
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "Pathways";
                    errExp.FunctionName = "onSwitchChange";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
             * @ngdoc function 
             * @name bindSurveyDetails
             * @methodOf roundingModule.controller:PathwaysTabController  
             * @description       
             ** Set survey details properties   
             ** Set default values for pathway
             */
            $scope.bindSurveyDetails = function (surveyDetails, survey) {
                try {
                    var visibility = {
                        "IsQuestionVisible": false
                    }
                    var isOptionDisabled = {
                        "IsOptionDisabled": false
                    }
                    var isRadioGroupDisabled = {
                        "IsRadioGroupDisabled": false
                    }
                    var displayOrder = {
                        "DisplayOrder": 0
                    }
                    var questionOrder = {
                        "QuestionOrder": 0
                    }
                    var selectedIndex = {
                        "SelectedIndex": 0
                    };
                    var switchOption = {
                        "SwitchOption": false
                    };

                    $.each(surveyDetails, function (key1, surveyDetail) {
                        if (surveyDetail.SurveyComments === null) {
                            surveyDetail.SurveyComments = ""
                        }

                        if (surveyDetail.SurveyStatusCode === "Completed") {
                            isOptionDisabled.IsOptionDisabled = true;
                            isRadioGroupDisabled.IsRadioGroupDisabled = true;
                            $scope.IsSurveydetailsCommentDisabled = true;
                            $scope.IsSurveydetailsCommentCheckBoxDisabled = true;

                            $scope.Buttons.SaveButtonVisible = false;
                            $scope.Buttons.PostponeButtonVisible = false;
                            if ($scope.IsPathwaysTab) {
                                $scope.Buttons.AddButtonVisible = true;
                            } else {
                                $scope.Buttons.AddButtonVisible = false;
                            }
                            $scope.Buttons.CancelButtonVisible = false;
                        } else if (surveyDetail.SurveyStatusCode === "Pending") {
                            $scope.Buttons.SaveButtonVisible = false;
                            if (ScreenConstants.CarePlanGoal === surveyDetail.SurveyTypeCode) {
                                $scope.Buttons.PostponeButtonVisible = false;
                            } else {
                                $scope.Buttons.PostponeButtonVisible = true;
                            }

                            $scope.Buttons.AddButtonVisible = false;
                            $scope.Buttons.CancelButtonVisible = true;
                            $scope.IsSurveydetailsCommentDisabled = false;
                            if (surveyDetail.SurveyComments === "") {
                                $scope.IsSurveydetailsCommentCheckBoxDisabled = true;
                            }
                        }

                        if (surveyDetail.QuestionGroups !== null) {
                            $.each(surveyDetail.QuestionGroups, function (key2, questionGroup) {
                                if (questionGroup !== null) {
                                    var wasLastQuestionVisible = false;
                                    var skipToQuestionUID = 0;
                                    var endOfSurvey = false;
                                    $.each(questionGroup.Questions, function (key3, question) {
                                        if (question !== null) {
                                            if (!question.IsMultiple) {
                                                $.extend(question, isRadioGroupDisabled);
                                            }

                                            questionOrder.QuestionOrder = question.Order; //Set QuestionOrder at Option level to display for skip logic
                                            $.each(question.Options, function (key4, option) {
                                                switchOption.SwitchOption = false;
                                                if (option.IsSelected) {
                                                    if (option.SkipToQuestionUID !== null) {
                                                        skipToQuestionUID = option.SkipToQuestionUID;
                                                    }
                                                    question.SelectedIndex = option.OptionOrder; //set index manually
                                                    selectedIndex.SelectedIndex = option.OptionOrder;
                                                    switchOption.SwitchOption = true;
                                                    $.extend(option, selectedIndex);
                                                    if (option.IsEndOfSurvey) {
                                                        endOfSurvey = true;
                                                        if (surveyDetail.SurveyStatusCode === "Pending") {
                                                            $scope.Buttons.SaveButtonVisible = true;
                                                        }
                                                    }
                                                }

                                                $.extend(option, isOptionDisabled);
                                                $.extend(option, questionOrder);
                                                $.extend(option, switchOption);
                                            });

                                            if (survey === "prepop") {
                                                //Show-hide questions based on how they were saved.                                       
                                                if (question.SelectedIndex < 0 && skipToQuestionUID !== question.UID) {
                                                    if (skipToQuestionUID !== 0) {
                                                        visibility.IsQuestionVisible = false;
                                                    } else if (wasLastQuestionVisible) {
                                                        visibility.IsQuestionVisible = true;
                                                        wasLastQuestionVisible = false;
                                                        displayOrder.DisplayOrder++;
                                                        skipToQuestionUID = 0;
                                                    } else {
                                                        visibility.IsQuestionVisible = false;
                                                    }
                                                } else if (question.SelectedIndex > 0 && skipToQuestionUID === question.UID) {
                                                    visibility.IsQuestionVisible = true;
                                                    wasLastQuestionVisible = true;
                                                    displayOrder.DisplayOrder++;
                                                    skipToQuestionUID = 0;
                                                    if (endOfSurvey) {
                                                        wasLastQuestionVisible = false;
                                                    }
                                                } else {
                                                    visibility.IsQuestionVisible = true;
                                                    wasLastQuestionVisible = true;
                                                    displayOrder.DisplayOrder++;
                                                    if (skipToQuestionUID === question.UID) {
                                                        skipToQuestionUID = 0;
                                                        wasLastQuestionVisible = false;
                                                    }
                                                    if (endOfSurvey) {
                                                        wasLastQuestionVisible = false;
                                                    }
                                                }
                                            } else if (survey === "add") {
                                                // Only show first question while add survey
                                                if (key3 === 0) {
                                                    visibility.IsQuestionVisible = true;
                                                } else {
                                                    visibility.IsQuestionVisible = false;
                                                }
                                                displayOrder.DisplayOrder++;
                                            }

                                            //If with answer of last question pathway was postponed then show the save button visible
                                            if (questionGroup.Questions.length - 1 === key3) {
                                                if (visibility.IsQuestionVisible && question.SelectedIndex > 0 && isRadioGroupDisabled.IsRadioGroupDisabled === false) {
                                                    $scope.Buttons.SaveButtonVisible = true;
                                                }
                                            }

                                            $.extend(question, displayOrder);
                                            $.extend(question, visibility);
                                        }
                                    });
                                }
                            });
                        }
                    });

                    $scope.model.SurveyDetails.data(surveyDetails);

                    if (surveyDetails.length === 0) {
                        $scope.IsSurveydetailsCommentsVisible = false;
                    } else {
                        $scope.IsSurveydetailsCommentsVisible = true;
                    }

                    //Set dynamic height due to scrollbar issue
                    window.setTimeout(function () {
                        var hgt = $rootScope.Global.Objects.DeviceHeight - ($("#ptchart-pthwy-surveyheaders").height() + 130);
                        $("#ptchart-pthwy-surveydetails").css({ "height": hgt.toString() + "px" });

                        
                        CommonFunctions.CreateScroller("ptchart-pthwy-surveydetails");
                        
                    }, 1000);
                 
                    //hide all error messages for previously loaded
                    if ($("#ptchart-pthwy-content").data("kendoValidator") !== undefined) {
                        $("#ptchart-pthwy-content").data("kendoValidator").hideMessages();
                    }

                    $scope.model.CopySurveyDetails = JSON.stringify($scope.model.SurveyDetails.data());
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "PathwaysTab";
                    errExp.FunctionName = "bindSurveyDetails";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
             * @ngdoc function
             * @name onGetPatientSurveyDetailsRetrieved
             * @methodOf roundingModule.controller:PathwaysTabController
             * @description             
             ** Service based call back function of GetPatientSurveyDetails Service call 
             ** Calls $scope.bindSurveyDetails if patient survey detail is found
             ** Calls $scope.getSurveyDetails if patient survey detail is not found 
             * @param {object} result returned result data of WebApi call
             */
            $scope.onGetPatientSurveyDetailsRetrieved = function (result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data
                        && result.data.SurveyDetails && result.data.SurveyDetails.length > 0) {
                        $scope.model.SurveyDetails.data([]);
                        $scope.PathwayScreenTitle = result.data.SurveyDetails[0].SurveyName.toUpperCase();
                        $scope.PatientPathwayScreenTitle = result.data.SurveyDetails[0].SurveyName.toUpperCase();
                        PathwaysTabService.SurveyDetail = result.data.SurveyDetails[0];
                        $scope.bindSurveyDetails(result.data.SurveyDetails, "prepop"); //prepop flag for created survey
                        CommonFunctions.CreateScroller("ptchart-pthwy-surveydetails");
                        CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
                    } else {
                        //if PatientSurveyDetails don't have any pending/completed survey then call the survey details to have just survey questions
                        var surveytype = $scope.SelectedSurveyType;
                        $scope.model.SurveyType = surveytype;
                        $scope.getSurveyDetails();
                    }
                    CommonFunctions.UICanceled();
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "Pathway";
                    errExp.FunctionName = "onGetPatientSurveyDetailsRetrieved";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
             * @ngdoc function
             * @name onGetSurveyDetailsRetrieved
             * @methodOf roundingModule.controller:PathwaysTabController
             * @description             
             ** Service based call back function of GetSurveyDetails Service call 
             ** Calls $scope.bindSurveyDetails
             ** Starts the chain of getPrepopulatedResponse 
             * @param {object} result returned result data of WebApi call
             */
            $scope.onGetSurveyDetailsRetrieved = function (result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data && result.data.SurveyDetails) {
                        //bind the data
                        $scope.model.SurveyDetails.data([]);
                        if (result.data.SurveyDetails.length > 0) {
                            if ($scope.SelectedSurveyType === ScreenConstants.DiabetesTab) {
                                $scope.PathwayScreenTitle = "Diabetes Screening";
                            } else if ($scope.SelectedSurveyType === ScreenConstants.ImmunizationsTab) {
                                /// We have already set this value in survery type function when ImmunizationTab set but because
                                /// we don't want dynamic screen name we have keep this value 
                                //$scope.PathwayScreenTitle = ScreenHeaderConstant.PathwayScreenTitle;
                            } else {
                                $scope.PathwayScreenTitle = result.data.SurveyDetails[0].SurveyName.toUpperCase();
                            }
                            PathwaysTabService.SurveyDetail = result.data.SurveyDetails[0];
                            $scope.bindSurveyDetails(result.data.SurveyDetails, "add"); // add flag for new survey

                            if ($scope.model.SurveyType === ScreenConstants.CarePlanGoal) {
                                $scope.IsSurveydetailsCommentsVisible = false;
                                $("#ptchart-pthwy-comments").attr("disabled", true);
                                $("#ptchart-pthwy-comments").attr("Visible", false);
                                $scope.IsFocusScriptDisabled = true;
                                //$scope.Buttons.SaveButtonVisible = true;
                                $scope.Buttons.CancelButtonVisible = true;
                                $scope.Buttons.PostponeButtonVisible = false;
                                if ($scope.model.EditObj) {
                                    $scope.PathwayScreenTitle = "";                                    
                                    $scope.setPatientCarePlanPrepopulatedResponse();                                   
                                } else {
                                    $scope.PathwayScreenTitle = "";
                                    $rootScope.ParentChildOrginalData = angular.copy($rootScope.ParentChild);
                                    var queLen = $scope.model.SurveyDetails.data()[0].QuestionGroups[0].Questions.length;
                                    for (var queCtr = 0; queCtr < queLen; queCtr++) {
                                        selectedOptUID = null;
                                        $scope.model.SurveyDetails.data()[0].QuestionGroups[0].Questions[queCtr].IsQuestionVisible = true;  
                                    }
                                    
                                }                              
                            } else {
                                $scope.IsSurveydetailsCommentsVisible = true;
                                $("#ptchart-pthwy-comments").attr("disabled", false);

                                $scope.Buttons.SaveButtonVisible = false;
                                $scope.Buttons.PostponeButtonVisible = false;
                                $scope.Buttons.AddButtonVisible = false;
                                //start the chain of prepopulated
                                if ($scope.model.SurveyDetails.data()[0].QuestionGroups[0].Questions[0].CanBePrepopulated) {
                                    $scope.getPrepopulatedResponse($scope.model.SurveyDetails.data()[0].QuestionGroups[0].Questions[0].UID);
                                }

                                //Work around timer for Canceled if there is Prepopulated response
                                window.setTimeout(function () {
                                    CommonFunctions.UICanceled();
                                }, 2500);
                            }
                            
                        }
                    }
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "PathwaysTab";
                    errExp.FunctionName = "onGetSurveyDetailsRetrieved";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            }

            /**
             * @ngdoc function
             * @name onGetImmunizationHeaderDataRetrieved
             * @methodOf roundingModule.controller:PathwaysTabController
             * @description             
             * Service based call back function of onGetImmunizationHeaderDataRetrieved Service call 
             * @param {object} result returned result data of WebApi call
             */

            $scope.onGetImmunizationHeaderDataRetrieved = function (result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        if (result.data.length > 0) {
                            var len = result.data.length;
                            $scope.HeaderItems = [];
                            for (var i = 0; i < len; i++) {
                                var headerDisplayValue = {
                                    "HeaderDisplayValue": ""
                                }
                                $.each(result.data[i].HeaderItems, function (key1, headerItem) {
                                    if (headerItem.Name === "FIReasonNotGiven" || headerItem.Name === "PIReasonNotGiven") {
                                        headerItem.DisplayInUI = false;
                                    }

                                    if (result.data[i].DataItems && result.data[i].DataItems.length > 0 && result.data[i].DataItems[0].Data) {
                                        headerDisplayValue.HeaderDisplayValue = result.data[i].DataItems[0].Data[headerItem.UID];
                                    }

                                    if (headerItem.Name === "InfluenzaDate" || headerItem.Name === "PnemoccalDate") {
                                        if (CommonFunctions.IsNotNullOrEmpty(headerItem.HeaderDisplayValue)) {
                                            headerItem.HeaderDisplayValue = CommonFunctions.DateFunctions.dateFormat(headerItem.HeaderDisplayValue, "mm/dd/yyyy");
                                        }
                                    }

                                    $.extend(headerItem, headerDisplayValue);
                                    $scope.HeaderItems.push(headerItem);
                                });
                            }
                        }
                    }
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "Pathway";
                    errExp.FunctionName = "onGetPathwayHeaderDataRetrieved";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            }

            /**
             * @ngdoc function
             * @name onGetPathwayHeaderDataRetrieved
             * @methodOf roundingModule.controller:PathwaysTabController
             * @description             
             * Service based call back function of GetPathwayHeaderData Service call 
             * @param {object} result returned result data of WebApi call
             */
            $scope.onGetPathwayHeaderDataRetrieved = function (result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        if (result.data.length > 0) {
                            if (result.data[0].HeaderItems) {
                                var headerDisplayValue = {
                                    "HeaderDisplayValue": ""
                                }
                                $.each(result.data[0].HeaderItems, function (key1, headerItem) {
                                    headerDisplayValue.HeaderDisplayValue = result.data[0].DataItems[0].Data[headerItem.UID];
                                    $.extend(headerItem, headerDisplayValue);
                                });
                                $scope.HeaderItems = result.data[0].HeaderItems;
                            }
                        }
                    }
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "Pathway";
                    errExp.FunctionName = "onGetPathwayHeaderDataRetrieved";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            }

            /**
             * @ngdoc function 
             * @name getPathwayHeaderData
             * @methodOf roundingModule.controller:PathwaysTabController           
             * @description       
             ** Calls PathwaysTabService.GetPathwayHeaderData
             ** Populates Pathway Headers Data
             */
            $scope.getPathwayHeaderData = function () {
                try {
                    var pathwayHeaderRequest = null;
                    if ($scope.IsPathwaysTab) {
                        pathwayHeaderRequest = {
                            "PathwayType": [$scope.model.SurveyType],
                            PatientUid: $rootScope.Global.Objects.SelectedPatient.UID
                        }
                        PathwaysTabService.GetPathwayHeaderData(pathwayHeaderRequest, $scope.onGetPathwayHeaderDataRetrieved);
                    } else if ($scope.IsImmunization) {
                        /*
                        pathwayHeaderRequest = {
                        "PathwayType": [ScreeningsSurveyTypes.FluPathway, ScreeningsSurveyTypes.PneuPathway],
                        PatientUid: $rootScope.Global.Objects.SelectedPatient.UID
                        }
                        PathwaysTabService.GetPathwayHeaderData(pathwayHeaderRequest, $scope.onGetImmunizationHeaderDataRetrieved);
                        */
                        pathwayHeaderRequest = {
                            'Types': [ScreeningsSurveyTypes.FluPathway, ScreeningsSurveyTypes.PneuPathway],
                            'PatientUID': $rootScope.Global.Objects.SelectedPatient.UID
                        }
                        PathwaysTabService.GetSurveyHeaderData($.param(pathwayHeaderRequest), $scope.onGetImmunizationHeaderDataRetrieved);

                        var optionsData = {
                            'PatientUID': $rootScope.Global.Objects.SelectedPatient.UID,
                            'noOfRecords': 50
                        };

                        //Round:98 Histroy will be used to get the Imunization type and the date both value.which can help to validate same date validation. 
                        PathwaysTabService.GetImmunizationsHistoryData($.param(optionsData), $scope.getImmunizationsHistoryDataRetrived);
                    } else {
                        pathwayHeaderRequest = {
                            "PathwayType": [ScreeningsSurveyTypes.DMFootcarePathway, ScreeningsSurveyTypes.DMEyeExamPathway],
                            PatientUid: $rootScope.Global.Objects.SelectedPatient.UID
                        }
                        PathwaysTabService.GetPathwayHeaderData(pathwayHeaderRequest, $scope.onGetPathwayHeaderDataRetrieved);
                    }
                } catch (ex) {
                    var errExp = { };
                    errExp.Exception = ex;
                    errExp.ModuleName = "PathwaysTab";
                    errExp.FunctionName = "getPathwayHeaderData";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
             * @ngdoc function 
             * @name getPatientSurveyDetails
             * @methodOf roundingModule.controller:PathwaysTabController           
             * @description       
             ** Calls PathwaysTabService.getImmunizationsHistoryDataRetrived
             * Return list of immunization history 
             */

            $scope.getImmunizationsHistoryDataRetrived = function (result) {
                if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                    if (result.data.length > 0) {
                        $scope.checkDuplicateImmunization = angular.copy(result.data);
                    }
                }
            }

            /**
             * @ngdoc function 
             * @name getPatientSurveyDetails
             * @methodOf roundingModule.controller:PathwaysTabController           
             * @description       
             ** Calls PathwaysTabService.GetPatientSurveyDetails
             */
            $scope.getPatientSurveyDetails = function () {
                var patientSurveyDetailFilter = { SurveyTypeCode: $scope.model.SurveyType, PatientUID: $rootScope.Global.Objects.SelectedPatient.UID, NoOfSurveys: 1 }
                PathwaysTabService.GetPatientSurveyDetails(patientSurveyDetailFilter, $scope.onGetPatientSurveyDetailsRetrieved);
            }

            /**
             * @ngdoc function 
             * @name $scope.HasChanges
             * @methodOf roundingModule.controller:PathwaysTabController           
             * @description       
             ** Find any changes on pathway survery detail
             */
            $scope.HasChanges = function () {
                var tempViewModel = JSON.stringify($scope.model.SurveyDetails.data());
                if (tempViewModel !== $scope.model.CopySurveyDetails) {
                    CommonFunctions.UIChanged();
                } else {
                    CommonFunctions.UICanceled();
                }
            }

            /**
             * @ngdoc function 
             * @name ImmunizationHasChanges
             * @methodOf roundingModule.controller:PathwaysTabController           
             * @description       
             ** Find any changes on Immunization screen controls
             */
            ImmunizationHasChanges = function () {
                if (($scope.ImmunizationDD.SelectedType && $scope.ImmunizationDD.SelectedType.Value !== "") ||
                    ($scope.ImmunizationDD.SelectedOption && $scope.ImmunizationDD.SelectedOption.Text !== "Yes") ||
                    ($scope.Immunization.SelectedDate).format(CommonFunctions.DateFunctions.dateFormat.masks.shortDate, false) !== (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.shortDate, false) ||
                    ($scope.BrandnameDD.SelectedResult && $scope.BrandnameDD.SelectedResult.Value !== "") ||
                    ($scope.ReasonNotGiven.SelectedReason && $scope.ReasonNotGiven.SelectedReason.Value !== "")) {
                    return true;
                } else {
                    return false;
                }
            }

            /**
             * @ngdoc function 
             * @name ResetImmunizationControls
             * @methodOf roundingModule.controller:PathwaysTabController           
             * @description       
             ** Reset immunization screen controls
             */
            ResetImmunizationControls = function () {
                if ($scope.ImmunizationDD && $scope.ImmunizationDD.GivenOptions && $scope.ImmunizationDD.GivenOptions.length > 0) {
                    $scope.ImmunizationDD.SelectedOption = $scope.ImmunizationDD.GivenOptions[0];
                }
                $scope.BrandnameDD.Results = [];
                $scope.BrandnameDD.Results.push({
                                                    "IsShownUI": "True",
                                                    "ParentLookUpItemUID": null,
                                                    "Text": "Select a value",
                                                    "Value": ""
                                                });
                $scope.BrandnameDD.SelectedResult = $scope.BrandnameDD.Results[0];
                if ($scope.BrandnameDD && $scope.BrandnameDD.Results && $scope.BrandnameDD.Results.length > 0) {
                    $scope.BrandnameDD.SelectedResult = $scope.BrandnameDD.Results[0];
                }
                if ($scope.ReasonNotGiven && $scope.ReasonNotGiven.Reasons && $scope.ReasonNotGiven.Reasons.length > 0) {
                    $scope.ReasonNotGiven.SelectedReason = $scope.ReasonNotGiven.Reasons[0];
                }
                $scope.ImmunizationDD.bIsGivenNo = true;
                $scope.BrandnameDD.IsDisabled = true;
                $scope.Immunization.SelectedDate = new Date();
                $scope.VHNVerificationTaskDisabled = true;
                if ($scope.BrandNameOther.Visible) {
                    $("#immu-other").val('');
                    $scope.BrandNameOther.Visible = false;
                }

                if ($scope.IsMedicalCnd.Visible) {
                    $("#immu-reason-not-given-mc").val('');
                    $scope.IsMedicalCnd.Visible = false;
                }

                if ($scope.ImmunizationDD.Visible && $rootScope.Global.Objects.SelectedPatient.IsESCOMarket) {
                    $("#ptchart-pthwy-comments-cust").val('');
                }
            }

            /**
             * @ngdoc function 
             * @name $scope.populateDDImmunizationType
             * @methodOf roundingModule.controller:PathwaysTabController           
             * @description       
             ** load lookups for parentchild for immnubization
             */
            $scope.populateDDImmunizationType = function () {
                $scope.ImmunizationDD.GivenOptions = [{
                        Text: 'Yes', Value: true
                    },{
                        Text: 'No', Value: false
                    }
                ];
                $scope.ImmunizationDD.SelectedOption = $scope.ImmunizationDD.GivenOptions[0];

                //get populated results for ImmunizationType
                var results = LookUp.GetLookUp(LookupTypes.ImmunizationType);
                var filteredTypes = []
                $.each(results, function (key1, result) {
                    if (result.IsShownUI) {
                        filteredTypes.push(result);
                    }
                });

                $scope.ImmunizationDD.Types = filteredTypes;
                $scope.ImmunizationDD.SelectedType = $scope.ImmunizationDD.Types[0];

                var resultsChild = [];

                resultsChild.push({
                                      "IsShownUI": "True",
                                      "ParentLookUpItemUID": null,
                                      "Text": "Select a value",
                                      "Value": ""
                                  });

                $scope.BrandnameDD.Results = resultsChild;
                $scope.BrandnameDD.SelectedResult = $scope.BrandnameDD.Results[0];

                //get populated modes
                var modes = LookUp.GetLookUp(LookupTypes.ImmunizationReasonNotGiven);
                var filteredModes = []
                $.each(modes, function (key1, mode) {
                    if (mode.IsShownUI) {
                        filteredModes.push(mode);
                    }
                });

                $scope.ReasonNotGiven.Reasons = filteredModes;
                $scope.ReasonNotGiven.SelectedReason = $scope.ReasonNotGiven.Reasons[0];
            }
            /**
            * @ngdoc function 
            * @name getPrepopulatedResponse
            * @methodOf roundingModule.controller:PathwaysTabController           
            * @description       
            ** Calls PathwaysTabService.GetPrePopulatedResponse
            */
            $scope.setPatientCarePlanPrepopulatedResponse = function () {

                var surLen = $scope.model.EditObj.Survey.SurveyResponses.length;
                $.each($scope.model.SurveyDetails.data()[0].QuestionGroups[0].Questions, function (key, question) {
                    for (var surCtr = 0; surCtr < surLen; surCtr++) {
                        var surveyResponses = $scope.model.EditObj.Survey.SurveyResponses[surCtr];
                        if (question.UID === surveyResponses.QuestionUID) {
                            selectedOptUID = surveyResponses.UID;
                            selectedOptFreeFormResponse = surveyResponses.FreeFormResponse;
                            break;
                        }
                    }

                    $.each(question.Options, function (key, option) {
                        if (selectedOptUID === option.UID) {
                            option.IsSelected = true;
                            question.IsQuestionVisible = true;
                            option.SelectedIndex = option.OptionOrder;
                            option.FreeFormResponse = selectedOptFreeFormResponse;
                            question.Responses = [];
                            question.Responses.push(option);
                            if (option.FreeFormTemplate.HasFreeForm === true) {
                                option.FreeFormTemplate.ShowFreeFormControl = true;
                            } else {
                                option.FreeFormTemplate.ShowFreeFormControl = false;
                            }
                        } else {
                            option.FreeFormTemplate.ShowFreeFormControl = false;
                            option.FreeFormResponse = '';
                        }
                        if (option.IsSelected) {                           
                            question.SelectedIndex = option.OptionOrder;
                        }
                    });
                });

                $scope.model.SurveyDetails.data()[0].UID = $scope.model.EditObj.Survey.MemSurveyUID;
                
                $timeout(function () {
                    $scope.model.RadioClickTrigger = true;
                    $.each($scope.model.SurveyDetails.data()[0].QuestionGroups[0].Questions, function (key, question) {                        
                        $("#" + 'question-' + question.UID + '-' + question.Order).removeClass('ng-hide');
                        $.each(question.Options, function (key, option) {
                            if (option.IsSelected) {
                                $("#" + option.UID + '-' + option.OptionOrder).prop('checked', true).trigger("click");
                                $("#" + 'FreeFormTemplate-' + option.UID).removeClass('ng-hide');
                                $("#" + 'FreeFormTemplate-' + option.UID).val(option.FreeFormResponse);
                            }
                        });
                    });
                    $scope.model.RadioClickTrigger = false;
                }, 500);                          
            };

            /**
             * @ngdoc function 
             * @name $scope.showPathway
             * @methodOf roundingModule.controller:PathwaysTabController           
             * @description       
             ** Calls Survey Details or Patient's Survey Details to display pathway
             */
            $scope.showPathway = function () {
                $scope.pathwaysBusyMessage = {
                    Message: "", Loaded: true
                };
                CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
                $scope.HeaderItems = [];
                $scope.model.SurveyDetails = new kendo.data.DataSource({ data : [] });
                $scope.setSurveyType();
                $rootScope.Global.Objects.SelectedPathwayScreeningMenu = null;

                if ($scope.model.SurveyType === ScreenConstants.DiabetesTab) {
                    CommonFunctions.CreateScroller("ptchart-dbts-scrn-dd-selectedresult-list");

                    $scope.DropDowns.Visible = true;
                    $scope.IsPathwaysTab = false;
                    $scope.PathwayScreenTitle = "Diabetes Screening";
                    $scope.SelectedSurveyType = ScreenConstants.DiabetesTab;
                    $scope.getPathwayHeaderData();
                    $scope.Buttons.PostponeButtonVisible = false;
                    $scope.Buttons.AddButtonVisible = false;
                    $scope.Buttons.SaveButtonVisible = false;
                    $scope.Buttons.CancelButtonVisible = true;
                    $scope.DropDowns.SelectedType = null;
                    $scope.DropDowns.Results = [];
                    $scope.DropDowns.SelectedResult = null;
                    $scope.DropDowns.ResultsVisible = false;
                    $scope.DropDowns.ResultsChild = [];
                    $scope.DropDowns.ResultsChildVisible = false;
                    $scope.DropDowns.IsOtherAbnormalitySelected = false;
                    $scope.DropDowns.OtherAbnormalityText = null;
                    $scope.DropDowns.SensoryOptions = [];
                    $scope.DropDowns.PulseOptions = [];
                    $scope.DropDowns.SensoryPulseVisible = false;
                    $scope.DropDowns.SaveButtonVisible = false;
                    $scope.DropDowns.Modes = [];
                    $scope.DropDowns.ModesVisible = false;
                    $scope.IsSurveydetailsCommentsVisible = false;
                    $scope.DropDowns.SelectedDate = new Date();
                    //hide all error messages for previously loaded
                    if ($("#ptchart-pthwy-content").data("kendoValidator") !== undefined) {
                        $("#ptchart-pthwy-content").data("kendoValidator").hideMessages();
                    }
                    CommonFunctions.UICanceled();
                    //Populate Drop Downs //When firstime lookup load during application lifetime there will be service call delay

                    if (LookUp.GetLookUp(LookupTypes.DiabeticScreening) === undefined) {
                        window.setTimeout(function () {
                            $scope.populateDropDowns();
                        }, 2500);
                    } else {
                        $scope.populateDropDowns();
                    }

                    window.setTimeout(function () {
                        var hgt = $rootScope.Global.Objects.DeviceHeight - ($("#ptchart-pthwy-surveyheaders").height() + 130);
                        $("#ptchart-pthwy-surveydetails").css({
                                                                  "height": hgt.toString() + "px", "min-height": "344px"
                                                              });
                    }, 2500);

                    $scope.model.CopySurveyDetails = JSON.stringify($scope.model.SurveyDetails.data());
                } else if ($scope.model.SurveyType === ScreenConstants.ImmunizationsTab) {
                    LookUp.GetLookUp(LookupTypes.ImmunizationType);
                    LookUp.GetLookUp(LookupTypes.ImmunizationBrandName);
                    LookUp.GetLookUp(LookupTypes.ImmunizationReasonNotGiven);

                    $scope.IsPathwaysTab = false;
                    $scope.IsImmunization = true;
                    $scope.VHNVerificationTaskDisabled = true;

                    $scope.IsFocusScriptDisabled = true;

                    if ($rootScope.Global.Objects.SelectedPatient.IsESCOMarket) {
                        $("#ptchart-pthwy-comments-cust").val('');
                    }

                    // $scope.ptchartpthwycomments.Visible = true;

                    CommonFunctions.CreateScroller("ptchart-dbts-scrn-dd-selectedresult-list");

                    //$scope.PathwayScreenTitle = "Diabetes Screening";
                    $scope.SelectedSurveyType = ScreenConstants.ImmunizationsTab;
                    $scope.getPathwayHeaderData();
                    $scope.Buttons.PostponeButtonVisible = false;
                    $scope.Buttons.AddButtonVisible = false;
                    $scope.Buttons.SaveButtonVisible = false;
                    $scope.Buttons.CancelButtonVisible = true;

                    $scope.ImmunizationDD.Visible = true;
                    $scope.ImmunizationDD.SelectedType = null;
                    $scope.ImmunizationDD.Results = [];
                    $scope.ImmunizationDD.SelectedResult = null;
                    $scope.ImmunizationDD.bIsGivenNo = true;

                    $scope.GivenDD.ResultsVisible = true;

                    $scope.GivenDD.Results = [];
                    $scope.GivenDD.SelectedResult = null;

                    $scope.BrandnameDD.IsDisabled = true;

                    $scope.BrandnameDD.Modes = [];
                    $scope.BrandnameDD.ResultsVisible = true;
                    $scope.IsSurveydetailsCommentsVisible = false;
                    $scope.Immunization.SelectedDate = new Date();
                    $("#immu-other").val('');
                    $scope.BrandNameOther.Visible = false;
                    $("#immu-reason-not-given-mc").val('');
                    $scope.IsMedicalCnd.Visible = false;

                    //hide all error messages for previously loaded
                    if ($("#ptchart-pthwy-content").data("kendoValidator") !== undefined) {
                        $("#ptchart-pthwy-content").data("kendoValidator").hideMessages();
                    }
                    CommonFunctions.UICanceled();

                    //Populate Drop Downs //When firstime lookup load during application lifetime there will be service call delay                                   

                    if (!(LookUp.GetLookUp(LookupTypes.ImmunizationType))) {
                        window.setTimeout(function () {
                            $scope.populateDDImmunizationType();
                        }, 2500);
                    } else {
                        $scope.populateDDImmunizationType();
                    }
                    $scope.model.CopySurveyDetails = JSON.stringify($scope.model.SurveyDetails.data());
                } else if ($scope.model.SurveyType === ScreenConstants.CarePlanGoal) {
                    $scope.IsPathwaysTab = false;
                    window.setTimeout(function () {
                        var hgt = $rootScope.Global.Objects.DeviceHeight - ($("#ptchart-pthwy-surveyheaders").height() + 130);
                        $("#ptchart-pthwy-surveydetails").css({
                                                                  "height": hgt.toString() + "px", "min-height": "235px"
                                                              });
                    }, 2500);

                    $scope.IsFocusScriptDisabled = true;
                    // $scope.Buttons.SaveButtonVisible = true;
                    $scope.Buttons.CancelButtonVisible = true;
                    $scope.IsPatientCarePlan = true;
                    $scope.PathwayScreenTitle = "";
                    $scope.SelectedSurveyType = $scope.model.SurveyType;
                    
                    $scope.model.EditObj = PatientCarePlanService.GetSelectedEditActiveCarePlan();

                    if ($scope.model.EditObj) {
                        var SurveyDetailFilter = { SurveyTypeCode: $scope.model.SurveyType, PatientUID: $rootScope.Global.Objects.SelectedPatient.UID, HarUID: '', NoOfSurveys: 0 }                        
                        PathwaysTabService.GetSurveyDetails(SurveyDetailFilter, $scope.onGetSurveyDetailsRetrieved);                      
                    } else {
                        $timeout(function () {
                            $rootScope.$broadcast('showEditPatientCarePlan');
                        }, 100, false);
                        $timeout(function () {
                            $scope.addPathways();
                        }, 100, false);
                    }
                    
                    $scope.DropDowns.Visible = false;
                } else {
                    window.setTimeout(function () {
                        var hgt = $rootScope.Global.Objects.DeviceHeight - ($("#ptchart-pthwy-surveyheaders").height() + 130);
                        $("#ptchart-pthwy-surveydetails").css({
                                                                  "height": hgt.toString() + "px", "min-height": "435px"
                                                              });
                    }, 2500);

                    $scope.PathwayScreenTitle = "";
                    $scope.SelectedSurveyType = $scope.model.SurveyType;
                    $scope.IsPathwaysTab = true;
                    $scope.getPatientSurveyDetails();
                    $scope.getPathwayHeaderData();
                    $scope.DropDowns.Visible = false;
                }
            }
            $scope.showPathway();
        })
        .controller('PathwayPopoverController', function ($rootScope, $scope, $timeout, PathwaysTabService, ExceptionService, AppConstants, ScreenConstants,
                                                          CommonConstants, CommonFunctions, RouteConstants) {
            /**
             * @ngdoc controller
             * @name roundingModule.controller:PathwayPopoverController
             * @description 
             ** Child controller of PathwaysTabController
             ** This will be called on click event of pathway focus or care script
             * @property {object} $scope.model - model of PathwayPopoverController
             * @property {string} $scope.model.PathwaysFocus - property of $scope.model used for PathwaysFocus
             * @property {string} $scope.model.CareScript - property of $scope.model used for CareScript 
             */
            $scope.model = {};
            $scope.model.PathwaysFocus = "";
            $scope.model.CareScript = "";

            if (PathwaysTabService.SurveyDetail) {
                $scope.model.PathwaysFocus = PathwaysTabService.SurveyDetail.Tooltip;
                $scope.model.CareScript = PathwaysTabService.SurveyDetail.Description;
            } else {
                $("#ptchart-pthwy-focus-popover").data("kendoMobilePopOver").close();
                $("#ptchart-pthwy-carescript-popover").data("kendoMobilePopOver").close();
            }
        });
}());