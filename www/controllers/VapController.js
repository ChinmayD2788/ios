(function () {
    /**
     * @ngdoc service
     * @author Sandeep Parmar
     * @name roundingModule.service:VapService
     * @description     
     ** VapService is being used by VapController, EditVapStepController, NewVapPlanController and StopVapPlanController
     ** This will be used for all service calls for VAP (Vascular Access Plan) Screen
     * @property {object} selectedStep local variable
     * @property {object} copyVapStepDetails local variable
     * @property {object} copyActivateVapStepDetails local variable
     */
    angular.module('roundingModule').factory('VapService', function ($rootScope, $timeout, ServiceConstants, RoundingService, Status, CommonConstants) {

        var selectedStep = {};
        var copyVapStepDetails = null;
        var copyActivateVapStepDetails = null;

        /**
         * @ngdoc function 
         * @name GetVapStepDetails
         * @methodOf roundingModule.service:VapService
         * @param {Object} data { "patientUID": $rootScope.Global.Objects.SelectedPatient.UID, "permanentAccess": self.model.DesiredPermanentAccess }
         * @param {function} callback inline function     
         * @description       
         ** Calls GetVapStepDetails api 'Clinical/GetVapStepDetails' using RoundingService 
         */
        function getVapStepDetails(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetVapStepDetails, 'POST', 'JSON', data, callback);
        }

        /**
         * @ngdoc function 
         * @name GetPatientVascularAccessPlan
         * @methodOf roundingModule.service:VapService
         * @param {Object} data $.param({ '' : $rootScope.Global.Objects.SelectedPatient.UID })
         * @param {function} callback $scope.onPatientVascularAccessPlanRetrieved     
         * @description       
         ** Calls GetPatientVascularAccessPlan api 'Clinical/GetPatientVascularAccessPlan' using RoundingService 
         */
        function getPatientVascularAccessPlan(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPatientVascularAccessPlan, 'POST', 'JSON', data, callback, true);
        }

        /**
         * @ngdoc function 
         * @name SavePatientVascularAccess
         * @methodOf roundingModule.service:VapService
         * @param {Object} data access data to be saved
         * @param {function} callback inline function     
         * @description       
         ** Calls SavePatientVascularAccess api 'Clinical/SavePatientVascularAccess' using RoundingService 
         */
        function savePatientVascularAccess(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.SavePatientVascularAccess, 'POST', 'JSON', data, callback);
        }

        /**
         * @ngdoc function 
         * @name getSelectedStep
         * @methodOf roundingModule.service:VapService
         * @returns {Object} selectedStep local variable selectedStep
         * @description       
         ** Returns local variable selectedStep
         */
        function getSelectedStep() {
            return selectedStep;
        }

        /**
         * @ngdoc function 
         * @name SetSelectedAccess
         * @methodOf roundingModule.service:VapService
         * @param {Object} step selected step in screen
         * @description       
         ** Sets local variable selectedStep
         */
        function setSelectedStep(step) {
            selectedStep = step;
        }

        /**
         * @ngdoc function 
         * @name GetCopyVapStepDetails
         * @methodOf roundingModule.service:VapService
         * @returns {Object} copyVapStepDetails local variable copyVapStepDetails
         * @description       
         ** Returns local variable copyVapStepDetails
         */
        function getCopyVapStepDetails() {
            return copyVapStepDetails;
        }

        /**
         * @ngdoc function 
         * @name SetCopyVapStepDetails
         * @methodOf roundingModule.service:VapService
         * @param {Object} vapStepDetails vap step details in screen
         * @description       
         ** Sets local variable copyVapStepDetails
         */
        function setCopyVapStepDetails(vapStepDetails) {
            copyVapStepDetails = vapStepDetails;
        }

        /**
         * @ngdoc function 
         * @name GetCopyActivateVapStepDetails
         * @methodOf roundingModule.service:VapService
         * @returns {Object} copyActivateVapStepDetails local variable copyActivateVapStepDetails
         * @description       
         ** Returns local variable copyActivateVapStepDetails
         */
        function getCopyActivateVapStepDetails() {
            return copyActivateVapStepDetails;
        }

        /**
        * @ngdoc function 
        * @name SetCopyActivateVapStepDetails
        * @methodOf roundingModule.service:VapService
        * @param {Object} activateVapStepDetails activate vap step details in screen
        * @description       
        ** Sets local variable copyActivateVapStepDetails
        */
        function setCopyActivateVapStepDetails(activateVapStepDetails) {
            copyActivateVapStepDetails = activateVapStepDetails;
        }

        /**
       * @ngdoc function 
       * @name RefreshVap
       * @methodOf roundingModule.service:VapService
       * @description       
       ** Broadcasts refreshVap
       */
        function refreshVap() {
            $rootScope.$broadcast('refreshVap');
        }

        return {
            GetVapStepDetails: getVapStepDetails,
            GetPatientVascularAccessPlan: getPatientVascularAccessPlan,
            SavePatientVascularAccess: savePatientVascularAccess,
            GetSelectedStep: getSelectedStep,
            SetSelectedStep: setSelectedStep,
            GetCopyVapStepDetails: getCopyVapStepDetails,
            SetCopyVapStepDetails: setCopyVapStepDetails,
            GetCopyActivateVapStepDetails: getCopyActivateVapStepDetails,
            SetCopyActivateVapStepDetails: setCopyActivateVapStepDetails,
            RefreshVap: refreshVap
        };
    });
}());

(function () {
    angular.module('roundingModule')
        .controller('VapController', function ($rootScope, $scope, $timeout, VapService, AppConstants, LookUp, LookupTypes, ExceptionService,
                                               CommonFunctions, CommonConstants, Status, CommonMessages)
            /**
            * @ngdoc controller
            * @name roundingModule.controller:VapController
            * @description 
            ** Main Controller for VAP (Vascular Access Plan) Screen 
                           
            * @property {object} $scope.model                            model of VapController
            * @property {object} $scope.model.VapStepDetails             property of $scope.model used for Vap Step Details List
            * @property {object} $scope.model.CopyVapStepDetails         property of $scope.model used for Copy Vap Step Details List
            * @property {object} $scope.model.LastItemUID                property of $scope.model used for Last Item of Vap Step Details List
            * @property {object} $scope.model.VapDataCount               property of $scope.model used for count of VapData
            * @property {object} $scope.model.ActiveVapStepDetail        property of $scope.model used for Active Vap Step Detail            
            */ {
            $scope.model = {};
            $scope.$$listeners['refreshVap'] = [];

            //for local uses  
            $scope.model.VapStepDetails = [];
            $scope.model.CopyVapStepDetails = [];
            $scope.model.VapDataCount = 0;
            $scope.model.LastItemUID = 0;

            //binded in html
            $scope.model.ActiveVapStepDetail = {
                StepDetails: new kendo.data.DataSource({ data: [] }),
                FormatedStartDate: "",
                PermanentAccessType: "",
                CurrentStep: ""
            };

            //Lookup calls
            LookUp.GetLookUp(LookupTypes.AccessType);
            LookUp.GetLookUp(LookupTypes.RefusalReason);
            LookUp.GetLookUp(LookupTypes.DelayReason);
            LookUp.GetLookUp(LookupTypes.AccessSide);
            LookUp.GetLookUp(LookupTypes.AccessRegion);
            LookUp.GetLookUp(LookupTypes.AccessBodyPart);
            LookUp.GetLookUp(LookupTypes.StopReason);

            /**
            * @ngdoc function 
            * @name getLookupItem
            * @methodOf roundingModule.controller:VapController    
            * @param {string} lookupType type of lookup
            * @param {string} item lookup item whose text needs to get
            * @returns {string} lookup item text
            * @description    
            ** Gets call from VAP view for lookup text based on value   
            */
            $scope.getLookupItem = function (lookupType, item) {
                return LookUp.GetValueByKey(lookupType, item).Text;
            }

            /**
            * @ngdoc event 
            * @name refreshVap
            * @eventOf roundingModule.controller:VapController       
            * @description       
            ** subscriber of refreshVap broadcast event which will call $scope.showVap()
            */
            $scope.$on('refreshVap', function () {
                $scope.showVap();
            });

            /**
            * @ngdoc function 
            * @name showVap
            * @methodOf roundingModule.controller:VapController            
            * @description    
            ** Calls VapService.GetPatientVascularAccessPlan
            ** Start point of the VAP screen
            */
            $scope.showVap = function () {
                try {
                    CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
                    if (LookUp.GetLookUp(LookupTypes.StopReason) === undefined) {
                        window.setTimeout(function () {
                            VapService.GetPatientVascularAccessPlan($.param({ '': $rootScope.Global.Objects.SelectedPatient.UID }), $scope.onPatientVascularAccessPlanRetrieved);
                        }, 2500);
                    }
                    else {
                        VapService.GetPatientVascularAccessPlan($.param({ '': $rootScope.Global.Objects.SelectedPatient.UID }), $scope.onPatientVascularAccessPlanRetrieved);
                    }
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Vap";
                    errExp.FunctionName = "showVap";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
            * @ngdoc function 
            * @name onPatientVascularAccessPlanRetrieved
            * @methodOf roundingModule.controller:VapController 
            * @param {object} result returned by service 
            * @description     
            ** Callback function of AccessInfoService.GetPatientVascularAccessPlan
            ** Populates $scope.model.ActiveVapStepDetail 
            ** Populates $scope.model.ActiveVapStepDetail.StepDetails         
            ** Calls VapService.SetCopyVapStepDetails
            ** Calls VapService.SetCopyActivateVapStepDetails
            ** Changes UI Behavior
            */
            $scope.onPatientVascularAccessPlanRetrieved = function (result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        $scope.model.VapStepDetails = result.data;
                        $scope.model.CopyVapStepDetails = result.data;
                        $scope.model.ActiveVapStepDetail.StepDetails = new kendo.data.DataSource({ data: [] });

                        //set in service for save
                        VapService.SetCopyVapStepDetails($scope.model.CopyVapStepDetails);

                        //Extended Properties for View
                        var currentOrder = 0;
                        var circle = { CircleImage: "" }
                        var formatedStartDate = { FormatedStartDate: "" }
                        var accessType = { PermanentAccessType: "" }
                        var isSideRegionVisible = { IsSideRegionVisible: false }
                        var refuseDate = { RefuseDate: null }
                        var isCompleteDateEnabled = { CompleteDateEnabled: true }
                        var refusalReason = { RefusalReason: null }
                        var refusalReasonCode = { RefusalReasonCode: null }
                        var hasAgreed = { HasAgreed: "" }

                        $.each($scope.model.VapStepDetails, function (key, vapStepDetail) {
                            //if Vap is not stopped
                            if (!CommonFunctions.IsNotNullOrEmpty(vapStepDetail.StopDate)) {
                                $.each(vapStepDetail.StepDetails, function (key1, stp) {
                                    //Consider the VAP which is not completed                      
                                    if (stp.IsLast && (!CommonFunctions.IsNotNullOrEmpty(stp.CompleteDate))) {
                                        if (vapStepDetail.PermanentAccess) {
                                            accessType.PermanentAccessType = LookUp.GetValueByKey(LookupTypes.AccessType, vapStepDetail.PermanentAccess).Text;
                                        }
                                        if (vapStepDetail.StartDate) {
                                            formatedStartDate.FormatedStartDate = CommonFunctions.DateFunctions.dateFormat(CommonFunctions.DateFunctions.parseDate(vapStepDetail.StartDate), "mm/dd/yy", false);
                                        }

                                        $.extend(vapStepDetail, accessType);
                                        $.extend(vapStepDetail, formatedStartDate);
                                        //Loop through all stepdetails of the same vapStepDetail if Laststep is not completed
                                        $.each(vapStepDetail.StepDetails, function (key2, stepDetail) {
                                            //RefuseDate, AgreedDate Logic
                                            if (stepDetail.StepCode === CommonConstants.StepCode.PatientAcceptance) {
                                                $.extend(stepDetail, refuseDate);
                                                $.extend(stepDetail, refusalReason);
                                                $.extend(stepDetail, refusalReasonCode);
                                                $.extend(stepDetail, hasAgreed);
                                                if (stepDetail.PtAcceptances.length > 0) {
                                                    var tempArray = stepDetail.PtAcceptances;

                                                    tempArray = tempArray.sort(function (a, b) {
                                                        return (a.UID - b.UID);
                                                    });

                                                    stepDetail.PtAcceptances = tempArray;
                                                    //for all patient Acceptances
                                                    $.each(stepDetail.PtAcceptances, function (key3, ptAcceptance) {
                                                        if (!stepDetail.HasAgreed) {
                                                            //if agreed then populate AgreeDate
                                                            if (ptAcceptance.HasAgreed) {
                                                                stepDetail.AgreeDate = ptAcceptance.Date;
                                                                stepDetail.RefuseDate = null;
                                                                stepDetail.RefusalReason = null;
                                                                stepDetail.RefusalReasonCode = null;
                                                                stepDetail.HasAgreed = true;
                                                            } //or populate RefuseDate
                                                            else {
                                                                stepDetail.AgreeDate = null;
                                                                stepDetail.HasAgreed = false;
                                                                stepDetail.RefuseDate = ptAcceptance.Date;
                                                                stepDetail.RefusalReason = LookUp.GetValueByKey(LookupTypes.RefusalReason, ptAcceptance.RefusalReasonCode).Text;
                                                                stepDetail.RefusalReasonCode = ptAcceptance.RefusalReasonCode.trim();
                                                            }
                                                        }
                                                    });
                                                }
                                            }
                                            //if surgical step code then show side,region,extremity
                                            if (CommonConstants.StepCode.SurgicalStepCodes.indexOf(stepDetail.StepCode) > -1) {
                                                isSideRegionVisible.IsSideRegionVisible = true;
                                                //if (stepDetail.Side) {
                                                //    stepDetail.Side = LookUp.GetValueByKey(LookupTypes.AccessSide, stepDetail.Side).Text;
                                                //}
                                                //if (stepDetail.Region) {
                                                //    stepDetail.Region = LookUp.GetValueByKey(LookupTypes.AccessRegion, stepDetail.Region).Text;
                                                //}
                                                //if (stepDetail.Extremity) {
                                                //    stepDetail.Extremity = LookUp.GetValueByKey(LookupTypes.AccessBodyPart, stepDetail.Extremity).Text;
                                                //}
                                            }
                                            else {
                                                isSideRegionVisible.IsSideRegionVisible = false;
                                            }

                                            if (stepDetail.IsCurrent) {
                                                circle.CircleImage = CommonConstants.CircleImage.Orange;
                                                currentOrder = stepDetail.Order;
                                                var currentStep = { "CurrentStep": stepDetail.StepDescription };
                                                $.extend(vapStepDetail, currentStep);
                                            }
                                            else {
                                                if (stepDetail.CompleteDate != null) {
                                                    circle.CircleImage = CommonConstants.CircleImage.Green;
                                                }
                                                else if (stepDetail.Order > currentOrder) {
                                                    circle.CircleImage = CommonConstants.CircleImage.Red;
                                                }
                                            }

                                            //updating delayReason to show in view mode instead of code
                                            if (stepDetail.DelayReason) {
                                                stepDetail.DelayReason = LookUp.GetValueByKey(LookupTypes.DelayReason, stepDetail.DelayReason).Text;
                                            }
                                            $.extend(stepDetail, isCompleteDateEnabled);
                                            $.extend(stepDetail, circle);
                                            $.extend(stepDetail, isSideRegionVisible);
                                        });

                                        VapService.SetCopyActivateVapStepDetails(vapStepDetail);
                                        $scope.model.ActiveVapStepDetail.StepDetails.data(vapStepDetail.StepDetails);
                                        $scope.model.ActiveVapStepDetail.StartDate = vapStepDetail.FormatedStartDate;
                                        $scope.model.ActiveVapStepDetail.PermanentAccessType = vapStepDetail.PermanentAccessType;
                                        $scope.model.ActiveVapStepDetail.CurrentStep = vapStepDetail.CurrentStep;
                                    }
                                });
                            }
                        });

                        if ($scope.model.ActiveVapStepDetail.StepDetails != null && $scope.model.ActiveVapStepDetail.StepDetails._data.length > 0) {
                            $scope.model.StopPlanVisible = true;
                            $scope.model.VapDataCount = $scope.model.ActiveVapStepDetail.StepDetails._data.length - 1;
                            $scope.model.LastItemUID = $scope.model.ActiveVapStepDetail.StepDetails._data[$scope.model.VapDataCount].UID;
                            $timeout(function () {
                                $($(".vap-stepdetail-row-top-left-upper")[0]).css({ "border": "none" });
                                $($(".vap-stepdetail-row-bottom-right")[$scope.model.VapDataCount]).css({ "border-left": "none" });
                                $($(".vap-stepdetail-row-top-left-lower")[$scope.model.VapDataCount]).css({ "border": "none" });
                                $($(".vap-stepdetail-row-top-right")[$scope.model.VapDataCount]).css({ "border-bottom": "none" });
                            }, 100, false);
                        }
                        else {
                            $scope.model.VapDataCount = 0;
                            $scope.model.LastItemUID = 0;
                            $scope.model.StopPlanVisible = false;
                            $scope.model.ActiveVapStepDetail.StepDetails = new kendo.data.DataSource({ data: [] });
                            $scope.model.ActiveVapStepDetail.StartDate = "";
                            $scope.model.ActiveVapStepDetail.PermanentAccessType = "";
                            $scope.model.ActiveVapStepDetail.CurrentStep = "";
                        }
                    }

                    CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Vap";
                    errExp.FunctionName = "onPatientVascularAccessPlanRetrieved";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
            * @ngdoc function 
            * @name getLookupItem
            * @methodOf roundingModule.controller:VapController    
            * @param {string} lookupType type of lookup
            * @param {string} item lookup item(containing UID, Value, Text) for which lookup text needs be displayed
            * @returns {string} lookup item text
            * @description    
            * Gets lookup text based on value from VAP view   
            */
            $scope.getLookupItem = function (lookupType, item) {
                return LookUp.GetValueByKey(lookupType, item).Text;
            }

            /**
            * @ngdoc event 
            * @name onTopRowClicked
            * @eventOf roundingModule.controller:VapController 
            * @param {object} dataItem item of $scope.model.ActiveVapStepDetail.StepDetails 
            * @description     
            ** ng-click event of top row of VAP Step detail block
            ** Flips bottom row of VAP Step detail block         
            ** Changes UI Behavior
            */
            $scope.onTopRowClicked = function (dataItem) {
                //Flip all first
                $(".vap-stepdetail-row-bottom").parent().removeClass("vap-stepdetail-active");

                //remove borders from last one
                $($(".vap-stepdetail-row-top-right")[$scope.model.VapDataCount]).css({ "border-bottom": "none" });
                $($(".vap-stepdetail-row-bottom-right")[$scope.model.VapDataCount]).css({ "border-left": "none" });
                $($(".vap-stepdetail-row-top-left-lower")[$scope.model.VapDataCount]).css({ "border": "none" });

                if ($("#vap-bottom-" + dataItem.UID).is(":visible")) {
                    $("#vap-bottom-" + dataItem.UID).hide();
                    $("#vap-stepdetail-row-bottom-right-" + dataItem.UID).removeClass("vap-stepdetail-row-bottom-right-div");
                    $("#vap-bottom-" + dataItem.UID).parent().removeClass("vap-stepdetail-inactive");
                } else {
                    $(".vap-stepdetail-row-bottom").hide();
                    $("#vap-bottom-" + dataItem.UID).show();
                    $("#vap-stepdetail-row-bottom-right-" + dataItem.UID).addClass("vap-stepdetail-row-bottom-right-div")
                    $("#vap-bottom-" + dataItem.UID).parent().addClass('vap-stepdetail-active');
                    if ($scope.model.LastItemUID === dataItem.UID) {
                        $("#vap-stepdetail-row-bottom-right-" + dataItem.UID).removeClass("vap-stepdetail-row-bottom-right-div");
                        $($(".vap-stepdetail-row-top-right")[$scope.model.VapDataCount]).css({ "border-bottom": "2px solid rgb(218, 218, 218)" });
                        $($(".vap-stepdetail-row-bottom-right")[$scope.model.VapDataCount]).css({ "border-left": "2px solid rgb(218, 218, 218)" });
                        $($(".vap-stepdetail-row-top-left-lower")[$scope.model.VapDataCount]).css({ "border": "1px solid rgb(218, 218, 218)" });
                    }
                }
            }

            /**
            * @ngdoc event 
            * @name onEditVapStepClick
            * @eventOf roundingModule.controller:VapController 
            * @param {object} dataItem item of $scope.model.ActiveVapStepDetail.StepDetails 
            * @description     
            ** k-on-tap event of Edit Step button on Vap Step
            ** Calls VapService.SetSelectedStep         
            ** Opens Edit Vap Step Modal view
            */
            $scope.onEditVapStepClick = function (dataItem) {
                var selectedStep = jQuery.extend({}, dataItem);

                VapService.SetSelectedStep(selectedStep);

                $timeout(function () {
                    $("#edit-vapstep-modalview").kendoMobileModalView("open");
                }, 0, false);
            }

            /**
            * @ngdoc event 
            * @name onNewPlanClicked
            * @eventOf roundingModule.controller:VapController 
            * @description     
            ** k-on-tap event of NEW PLAN button on Vap Screen
            ** Opens New Vap Step Modal view
            */
            $scope.onNewPlanClicked = function () {
                $timeout(function () {
                    $("#new-vapplan-modalview").kendoMobileModalView("open");
                }, 0, false);
            }

            /**
            * @ngdoc event 
            * @name onStopPlanClicked
            * @eventOf roundingModule.controller:VapController 
            * @description     
            ** k-on-tap event of STOP PLAN button on Vap Screen
            ** Opens Stop Vap Step Modal view
            */
            $scope.onStopPlanClicked = function () {
                $timeout(function () {
                    $("#stop-vapplan-modalview").kendoMobileModalView("open");
                }, 0, false);
            }

            //Start point of the Vap screen
            $scope.showVap();
        }).controller('EditVapStepController', function ($rootScope, $scope, $timeout, VapService, AppConstants, LookUp, LookupTypes, ExceptionService,
                                            CommonFunctions, CommonConstants, Status, CommonMessages)
            /**
            * @ngdoc controller
            * @name roundingModule.controller:EditVapStepController
            * @description 
            ** Controller for Edit Vap Step Modal View
            ** Child Controller for VAP (Vascular Access Plan) Screen 
                               
            * @property {object} $scope.model                            model of EditVapStepController
            * @property {object} $scope.model.IsFirstStep                property of $scope.model used for Is First Step flag
            * @property {object} $scope.CopyVapStepDetails               property of $scope.model used for Copy Vap Step Details List
            * @property {object} $scope.model.Maxdate                    property of $scope.model used for Maxdate
            * @property {object} $scope.model.Mindate                    property of $scope.model used for Mindate
            * @property {object} $scope.model.AgreeDateConfig            property of $scope.model used for Agreed Date datepicker            
            * @property {object} $scope.model.RefuseDateConfig           property of $scope.model used for Refused Date datepicker              
            * @property {object} $scope.model.ApptDateConfig             property of $scope.model used for Appointment Date datepicker
            * @property {object} $scope.model.CompleteDateConfig         property of $scope.model used for Complete Date datepicker
            * @property {object} $scope.model.RefusedReasonsConfig       property of $scope.model used for Refused Reasons dropdown
            * @property {object} $scope.model.AccessSidesConfig          property of $scope.model used for Access Side dropdown
            * @property {object} $scope.model.AccessRegionsConfig        property of $scope.model used for Access Region dropdown            
            * @property {object} $scope.model.ExtremitiesConfig          property of $scope.model used for Extremity dropdown            
            * @property {object} $scope.model.DelayReasonsConfig         property of $scope.model used for Delay Reason dropdown            
            * @property {object} $scope.model.Step                       property of $scope.model used for Vap Step            
            */ {
            $scope.model = {};
            $scope.model.IsFirstStep = null;
            $scope.CopyVapStepDetails = VapService.GetCopyVapStepDetails();
            $scope.model.Maxdate = new Date();
            $scope.model.Maxdate.setHours(23, 59, 59, 0);

            $scope.model.AgreeDateConfig = {
                max: $scope.model.Maxdate,
                format: "MM/dd/yyyy"
            };

            $scope.model.RefuseDateConfig = {
                max: $scope.model.Maxdate,
                format: "MM/dd/yyyy"
            };

            $scope.model.Mindate = new Date();
            $scope.model.Mindate.setDate($scope.model.Maxdate.getDate() - 59);
            $scope.model.Mindate.setHours(0, 0, 0, 0);

            $scope.model.ApptDateConfig = {
                min: $scope.model.Mindate,
                format: "MM/dd/yyyy"
            };

            $scope.model.CompleteDateConfig = {
                min: $scope.model.Mindate,
                max: $scope.model.Maxdate,
                format: "MM/dd/yyyy"
            };

            $scope.model.RefusedReasonsConfig = {
                dataTextField: "Text",
                dataValueField: "Value",
                dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.RefusalReason), "IsShownUI", true)
            }

            $scope.model.AccessSidesConfig = {
                dataTextField: "Text",
                dataValueField: "Value",
                dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.AccessSide), "IsShownUI", true)
            }

            $scope.model.AccessRegionsConfig = {
                dataTextField: "Text",
                dataValueField: "Value",
                dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.AccessRegion), "IsShownUI", true)
            }

            $scope.model.ExtremitiesConfig = {
                dataTextField: "Text",
                dataValueField: "Value",
                dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.AccessBodyPart), "IsShownUI", true)
            }

            $scope.model.DelayReasonsConfig = {
                dataTextField: "Text",
                dataValueField: "Value",
                dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.DelayReason), "IsShownUI", true)
            }

            $scope.model.Step = VapService.GetSelectedStep();

            if (!$scope.model.Step.Side) {
                $scope.model.Step.Side = $scope.model.AccessSidesConfig.dataSource[0].dataValueField;
            }

            if (!$scope.model.Step.Region) {
                $scope.model.Step.Region = $scope.model.AccessRegionsConfig.dataSource[0].dataValueField;
            }
            
            if (!$scope.model.Step.Extremity) {
                $scope.model.Step.Extremity = $scope.model.ExtremitiesConfig.dataSource[0].dataValueField;
            }
            
            $scope.model.Step.DelayReason = $scope.model.DelayReasonsConfig.dataSource[0];
            $scope.model.Step.RefusalReasonCode = $scope.model.RefusedReasonsConfig.dataSource[0];

            if ($scope.model.Step.StepCode === CommonConstants.StepCode.PatientAcceptance) {
                $scope.model.IsFirstStep = true;
                $scope.model.Step.HasAgreed = "true";

                if ($scope.model.Step.AgreeDate) {
                    $scope.model.Step.AgreeDate = CommonFunctions.DateFunctions.parseDate($scope.model.Step.AgreeDate);
                    $scope.model.Step.HasAgreed = "true";
                }
                if ($scope.model.Step.RefuseDate) {
                    $scope.model.Step.RefuseDate = CommonFunctions.DateFunctions.parseDate($scope.model.Step.RefuseDate);
                    $scope.model.Step.HasAgreed = "false";
                }

                $("#edit-vapstep-modalview").css({ "height": "370px" });
                $("#edit-vapstep-modalview").parent().css({ "height": "370px" });

                /**
                * @ngdoc function 
                * @name vapValidator
                * @methodOf roundingModule.controller:EditVapStepController
                * @description 
                ** Creates custom validator using kendo validator
                ** For first step of edit vap steps modal view
                */
                $timeout(function () {
                    $scope.vapValidator = $("#edit-vapstep-firststep").kendoValidator({
                        rules: {
                            datevalid: function (input) {  //if input date is not valid
                                if ($.trim(input.val()) != "") {
                                    if (input.is("[data-datevalid-msg]")) {
                                        return kendo.parseDate($.trim(input.val()));
                                    }
                                }
                                return true;
                            }
                        },
                        messages: {
                            datevalid: "date is not valid"
                        }
                    }).data("kendoValidator");
                }, 0, false);
            }
            else {
                $scope.model.IsFirstStep = false;
                var isDelayReasonVisible = { IsDelayReasonVisible: false }
                var isSideRegionVisible = { IsSideRegionVisible: false }
                $.extend($scope.model.Step, isDelayReasonVisible);
                $.extend($scope.model.Step, isSideRegionVisible);
                $scope.model.Step.IsDelayReasonVisible = CommonConstants.StepCode.Stepcodes.indexOf($scope.model.Step.StepCode) > -1 ? true : false;
                $scope.model.Step.IsSideRegionVisible = CommonConstants.StepCode.SurgicalStepCodes.indexOf($scope.model.Step.StepCode) > -1 ? true : false;
                if ($scope.model.Step.IsSideRegionVisible) {
                    $("#edit-vapstep-modalview").css({ "height": "625px" });
                    $("#edit-vapstep-modalview").parent().css({ "height": "583px" });
                }
                else {
                    $("#edit-vapstep-modalview").css({ "height": "440px" });
                    $("#edit-vapstep-modalview").parent().css({ "height": "440px" });
                }

                /**
                * @ngdoc function 
                * @name vapValidator
                * @methodOf roundingModule.controller:EditVapStepController
                * @description 
                ** Creates custom validator using kendo validator using different business rules
                ** For rest of steps of edit vap steps modal view
                */
                $timeout(function () {
                    $scope.vapValidator = $("#edit-vapstep-reststep").kendoValidator({
                        rules: {
                            apptdaterequired: function (input) { //required if IsSkipped unchecked                     
                                if (input.is("[data-apptdaterequired-msg]")) {
                                    if ($scope.model.Step.IsSkipped)
                                    { return true; }
                                    return $.trim(input.val()) !== "";
                                }
                                return true;
                            },
                            daterequired: function (input) { //validation if required                        
                                if (input.is("[data-daterequired-msg]")) {
                                    return $.trim(input.val()) !== "";
                                }
                                return true;
                            },
                            datevalid: function (input) {  //if input date is not valid
                                if ($.trim(input.val()) != "") {
                                    if (input.is("[data-datevalid-msg]")) {
                                        return kendo.parseDate($.trim(input.val()));
                                    }
                                }
                                return true;
                            },
                            completedategreaterthantoday: function (input) {  //if input date is not valid
                                if ($.trim(input.val()) != "") {
                                    if (input.is("[data-completedategreaterthantoday-msg]") && kendo.parseDate($.trim(input.val()))) {
                                        if ($scope.model.Step.CompleteDate) {
                                            var todaydate = kendo.parseDate(CommonFunctions.DateFunctions.sysDate()).setHours(0, 0, 0, 0);
                                            var completedate = kendo.parseDate($.trim(input.val())).setHours(0, 0, 0, 0);
                                            if (completedate != null && (completedate > todaydate)) {
                                                return false;
                                            }
                                        }
                                    }
                                }
                                return true;
                            },
                            completedatelessthanprior: function (input) {  //if complete date is less than prior step complete date
                                if ($.trim(input.val()) != "") {
                                    var isValid = true;
                                    if (input.is("[data-completedatelessthanprior-msg]") && kendo.parseDate($.trim(input.val()))) {
                                        //Complete date less than prior step complete date validation
                                        $.each($scope.CopyVapStepDetails, function (key1, vapStepDetail) {
                                            $.each(vapStepDetail.StepDetails, function (key2, stepDetail) {
                                                if (vapStepDetail.UID === VapService.GetCopyActivateVapStepDetails().UID) {
                                                    if (stepDetail.Order < $scope.model.Step.Order) {
                                                        if (stepDetail.CompleteDate) {
                                                            var priorstepcompletedate = kendo.parseDate(stepDetail.CompleteDate).setHours(0, 0, 0, 0);
                                                            var currentcompletedate = kendo.parseDate($.trim(input.val())).setHours(0, 0, 0, 0);

                                                            if (currentcompletedate != null && priorstepcompletedate != null && (currentcompletedate < priorstepcompletedate)) {
                                                                isValid = false;
                                                            }
                                                        }
                                                    }
                                                }
                                            });
                                        });

                                        return isValid;
                                    }
                                }
                                return true;
                            },
                            delayreasonrequired: function (input) {  //delay reason is required if complete date is less than anticipated date
                                if ($.trim(input.val()) === "" && input.is("[data-delayreasonrequired-msg]")) {
                                    if ($scope.model.Step.AnticipatedDate && $scope.model.Step.CompleteDate) {
                                        var anticipatedate = kendo.parseDate($scope.model.Step.AnticipatedDate).setHours(0, 0, 0, 0);
                                        var completedate = kendo.parseDate($scope.model.Step.CompleteDate).setHours(0, 0, 0, 0);

                                        if (completedate != null && anticipatedate != null && (completedate > anticipatedate)) {
                                            return false;
                                        }
                                    }
                                }
                                return true;
                            },
                        },
                        messages: {
                            apptdaterequired: "required",
                            daterequired: "required",
                            datevalid: "date is not valid",
                            completedategreaterthantoday: "Complete Date cannot be greater than current date",
                            completedatelessthanprior: "Complete Date can not be less than any prior step Complete Date",
                            delayreasonrequired: "Delay Reason required when Complete Date is greater than Anticipated Date"
                        }
                    }).data("kendoValidator");
                }, 0, false);
            }

            /**
            * @ngdoc event 
            * @name onHasAgreedChange
            * @eventOf roundingModule.controller:EditVapStepController
            * @description       
            ** ng-change event of Agreed radio button edit vap step modal view     
            ** Changes UI behaviour
            */
            $scope.onHasAgreedChange = function () {
                $scope.vapValidator.hideMessages();
                if ($scope.model.Step.HasAgreed === "true") {
                    $scope.model.Step.RefuseDate = null;
                    $scope.model.Step.RefusalReasonCode = "";
                }
                else {
                    $scope.model.Step.AgreeDate = null;
                }
            }

            /**
            * @ngdoc event 
            * @name onIsSkippedChange
            * @eventOf roundingModule.controller:EditVapStepController
            * @description       
            ** ng-change event of Skip step check box from edit vap step modal view        
            ** Changes UI behaviour
            */
            $scope.onIsSkippedChange = function () {
                $scope.vapValidator.hideMessages();
                if ($scope.model.Step.IsSkipped) {
                    $scope.model.Step.CompleteDate = new Date();
                }
            }

            /**
            * @ngdoc event 
            * @name onCancelVapStepClick
            * @eventOf roundingModule.controller:EditVapStepController
            * @description       
            ** k-on-tap event of Cancel Button from edit vap step modal view    
            ** Closes edit vap step modal view
            */
            $scope.onCancelVapStepClick = function () {
                $scope.vapValidator.hideMessages();
                $("#edit-vapstep-modalview").kendoMobileModalView("close");
            }

            /**
            * @ngdoc event 
            * @name onSaveVapStepClick
            * @eventOf roundingModule.controller:EditVapStepController
            * @description       
            ** k-on-tap event of Save Button from edit vap step modal view    
            ** Calls VapService.GetCopyVapStepDetails
            ** Calls VapService.SavePatientVascularAccess
            ** Changes UI behaviour
            */
            $scope.onSaveVapStepClick = function () {
                try {
                    var uid = 0;
                    var stepUID = 0;
                    var newPtAcceptance = {};
                    var isAdditionalQuestionsNeeded = false;
                    var promptMessage = "";
                    if ($scope.vapValidator.validate()) {
                        CommonFunctions.Blockui();
                        if ($scope.model.Step.StepCode === CommonConstants.StepCode.PatientAcceptance) {

                            newPtAcceptance = {
                                DataState: CommonConstants.DataState.Added,
                                //HKP: 3/29/2016 : Commenting for LogError for invalid date function:{"ModuleName":"Vap","FunctionName":"onSaveVapStepClick","StackTrace":["{anonymous}() (m.)$scope.onSaveVapStepClick@http://localhost/CRD/controllers/VapController.js:833:213","{anonymous}()@http://localhost/CRD/libraries/angular.min.js:200:64","{anonymous}()@http://localhost/CRD/libraries/kendo.angular.min.js:9:12031","{anonymous}() (m.)$eval@http://localhost/CRD/libraries/angular.min.js:126:250","{anonymous}() (m.)$apply@http://localhost/CRD/libraries/angular.min.js:126:476","_@http://localhost/CRD/libraries/kendo.angular.min.js:9:6210",".<anonymous>@http://localhost/CRD/libraries/kendo.angular.min.js:9:12016","i.extend.trigger@http://localhost/CRD/libraries/kendo.all.min.js:9:6451","n.extend._triggerTouch@http://localhost/CRD/libraries/kendo.all.min.js:51:11805","n.extend._tap@http://localhost/CRD/libraries/kendo.all.min.js:51:12048"],"ErrorName":"TypeError","ErrorMesage":"$scope.model.Step.RefuseDate.format is not a function","LoggedInUserUID":"920"}
                                //Date: $scope.model.Step.HasAgreed === "true" ? $scope.model.Step.AgreeDate.format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false) : $scope.model.Step.RefuseDate.format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                                Date: $scope.model.Step.HasAgreed === "true" ? $scope.model.Step.AgreeDate : $scope.model.Step.RefuseDate,
                                HasAgreed: $scope.model.Step.HasAgreed === "true" ? true : false,
                                RefusalReasonCode: $scope.model.Step.RefusalReasonCode,
                                Number: 0,
                                Status: 0,
                                UID: 0,
                                UserMessages: null
                            }
                            $scope.CopyVapStepDetails = VapService.GetCopyVapStepDetails();

                            $.each($scope.CopyVapStepDetails, function (key1, vapStepDetail) {
                                $.each(vapStepDetail.StepDetails, function (key2, stepDetail) {
                                    if (stepDetail.UID === $scope.model.Step.UID) {
                                        uid = vapStepDetail.UID;

                                        if (stepDetail.StepCode === CommonConstants.StepCode.PatientAcceptance) {
                                            stepDetail.Note = $scope.model.Step.Note;
                                            stepDetail.PtAcceptances.push(newPtAcceptance);
                                            stepDetail.AgreeDate = $scope.model.Step.HasAgreed === "true" ? $scope.model.Step.AgreeDate.format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false) : null;
                                            stepDetail.CompleteDate = $scope.model.Step.HasAgreed === "true" ? $scope.model.Step.AgreeDate.format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false) : null;
                                            if (vapStepDetail.UID > 0) {
                                                vapStepDetail.DataState = CommonConstants.DataState.Modified;
                                            }
                                            else {
                                                vapStepDetail.DataState = CommonConstants.DataState.Added;
                                            }
                                        }
                                    }
                                });
                            });
                        }
                        else //rest steps
                        {
                            $scope.CopyVapStepDetails = VapService.GetCopyVapStepDetails();
                            $.each($scope.CopyVapStepDetails, function (key1, vapStepDetail) {
                                $.each(vapStepDetail.StepDetails, function (key2, stepDetail) {
                                    if (stepDetail.UID === $scope.model.Step.UID) {
                                        uid = vapStepDetail.UID;

                                        if (stepDetail.StepCode === $scope.model.Step.StepCode) {
                                            stepDetail.SchedDate = CommonFunctions.IsNotNullOrEmpty($scope.model.Step.SchedDate) ? $scope.model.Step.SchedDate.format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false) : null;
                                            stepDetail.IsSkipped = $scope.model.Step.IsSkipped;
                                            stepDetail.CompleteDate = $scope.model.Step.CompleteDate.format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false);

                                            stepDetail.DelayReason = $scope.model.Step.DelayReason;
                                            stepDetail.DelayReasonOther = $scope.model.Step.DelayReason === 'C14' ? $scope.model.Step.DelayReasonOther : null;
                                            stepDetail.Note = $scope.model.Step.Note;
                                            if ($scope.model.Step.IsSideRegionVisible) {
                                                stepDetail.Side = $scope.model.Step.Side;
                                                stepDetail.Region = $scope.model.Step.Region;
                                                stepDetail.Extremity = $scope.model.Step.Extremity;
                                                stepDetail.BeltLine = $scope.model.Step.BeltLine;
                                            }
                                            else {
                                                stepDetail.Side = null;
                                                stepDetail.Region = null;
                                                stepDetail.Extremity = null;
                                            }

                                            if (vapStepDetail.UID > 0) {
                                                vapStepDetail.DataState = CommonConstants.DataState.Modified;
                                            }
                                            else {
                                                vapStepDetail.DataState = CommonConstants.DataState.Added;
                                            }
                                        }

                                        if (stepDetail.ShouldPrompt) {
                                            isAdditionalQuestionsNeeded = true;
                                            stepUID = stepDetail.UID;
                                            promptMessage = stepDetail.PromptMessage;
                                        }
                                    }
                                });
                            });
                        }

                        if (isAdditionalQuestionsNeeded) {
                            CommonFunctions.OpenCustomConfirmBox("Access Management", promptMessage, "Yes,No", function (data) {
                                if (data && data.returnValue) {                                    
                                    saveVap(isAdditionalQuestionsNeeded, uid, stepUID);
                                } else {
                                    isAdditionalQuestionsNeeded = false;
                                    saveVap(isAdditionalQuestionsNeeded, uid, stepUID);
                                }
                            });
                        }
                        else {
                            saveVap(isAdditionalQuestionsNeeded, uid, stepUID);
                        }
                    }
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Vap";
                    errExp.FunctionName = "onSaveVapStepClick";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            var saveVap = function (isAdditionalQuestionsNeeded, uid, stepUID) {
                var tempsavedata = [];
                $.each($scope.CopyVapStepDetails, function (key, vapStepDetail) {
                    if (vapStepDetail.UID === uid) {
                        tempsavedata = vapStepDetail;
                        if (isAdditionalQuestionsNeeded) {
                            $.each(tempsavedata.StepDetails, function (key2, stepDetail) {
                                if (stepDetail.UID === stepUID && stepDetail.ShouldPrompt) {
                                    stepDetail.PromptResponse = true;
                                }
                            })
                        }
                    }
                });

                VapService.SavePatientVascularAccess(tempsavedata, function (result) {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.StepSaved);
                        VapService.RefreshVap();
                        $scope.onCancelVapStepClick();
                    } else {
                        CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.StepFailed);
                    }
                });
            };
        }).controller('NewVapPlanController', function ($rootScope, $scope, $timeout, VapService, ExceptionService, CommonFunctions,
                                                        CommonConstants, LookUp, CommonMessages, LookupTypes, Status)
            /**
            * @ngdoc controller
            * @name roundingModule.controller:NewVapPlanController
            * @description 
            ** Controller for New Vap Plan Modal View
            ** Child Controller for VAP (Vascular Access Plan) Screen 
                           
            * @property {object} $scope.model                            model of NewVapPlanController
            * @property {object} $scope.model.DesiredPermanentAccess     property of $scope.model used for Desired Permanent Access dropdown
            * @property {kendo.data.DataSource} $scope.model.VapSteps    property of $scope.model used for Vap Steps List
            * @property {object} $scope.model.SelectedStepOrder          property of $scope.model used for Selected Step Order
            * @property {date} $scope.model.Maxdate                      property of $scope.model used for Max Date
            * @property {date} $scope.model.Mindate                      property of $scope.model used for Min Date    
            * @property {object} $scope.model.PlanStartDateConfig        property of $scope.model used for Plan Start Date datepicker
            * @property {date} $scope.model.PlanStartDate                property of $scope.model used for Plan Start Date
            * @property {kendo.data.DataSource} $scope.model.AccessTypes property of $scope.model used for Access Type dropdown
            */
        {
            $scope.model = {};
            $scope.model.DesiredPermanentAccess = null;
            $scope.model.VapSteps = null;
            $scope.model.SelectedStepOrder = null;

            $scope.model.Maxdate = new Date();
            $scope.model.Maxdate.setHours(23, 59, 59, 0);
            $scope.model.Mindate = new Date();
            $scope.model.Mindate.setDate($scope.model.Maxdate.getDate() - 6);
            $scope.model.Mindate.setHours(0, 0, 0, 0);

            $scope.model.PlanStartDateConfig = {
                min: $scope.model.Mindate,
                max: $scope.model.Maxdate,
                format: "MM/dd/yyyy"
            };

            $scope.model.PlanStartDate = new Date();

            $scope.model.AccessTypes = CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.AccessType), "IsShownUI", true);

            $scope.model.VAPAccessTypes = [];
            
            angular.forEach($scope.model.AccessTypes, function (acsTypes, key) {
                if (acsTypes.Text !== "Catheter") {
                    $scope.model.VAPAccessTypes.push(acsTypes);
                }
            });
                        
            /**
            * @ngdoc event 
            * @name onVapItemSelected
            * @eventOf roundingModule.controller:NewVapPlanController
            * @param {object} dataItem item of VapSteps
            * @description       
            ** ng-click event of step selection from new plan modal view       
            ** Changes UI behaviour
            */
            $scope.onVapItemSelected = function (dataItem) {
                $(".vap-new-plan-vapsteps-divone").parent().parent().removeClass("vap-new-plan-step-selected");
                $("#newplan-step-" + dataItem.Order).parent().addClass("vap-new-plan-step-selected");
                $scope.model.SelectedStepOrder = dataItem.Order;
            }

            /**
            * @ngdoc function 
            * @name newPlanValidator
            * @methodOf roundingModule.controller:NewVapPlanController
            * @description 
            ** Creates custom validator using kendo validator using different business rules for new plan modal view
            */
            $timeout(function () {
                $scope.newPlanValidator = $("#new-vapplan-modalview").kendoValidator({
                    rules: {
                        datevalid: function (input) {  //if input date is not valid
                            if ($.trim(input.val()) != "" && input.is("[data-datevalid-msg]")) {
                                return kendo.parseDate($.trim(input.val()));
                            }
                            return true;
                        }
                    },
                    messages: {
                        datevalid: "date is not valid"
                    }
                }).data("kendoValidator");
            }, 0, false);

            /**
            * @ngdoc event 
            * @name onAccessTypeChanged
            * @eventOf roundingModule.controller:NewVapPlanController
            * @description       
            ** ng-change event of access type change from new plan modal view     
            ** Calls VapService.GetVapStepDetails
            ** Changes UI behaviour
            */
            $scope.onAccessTypeChanged = function () {
                try {
                    if ($scope.model.DesiredPermanentAccess != null) {
                        var vAPStepRequest = {
                            "patientUID": $rootScope.Global.Objects.SelectedPatient.UID,
                            "permanentAccess": $scope.model.DesiredPermanentAccess
                        }

                        VapService.GetVapStepDetails(vAPStepRequest, function (result) {
                            if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                                i = 1;
                                $.each(result.data, function (key, item) {
                                    item.CustomOrder = i;
                                    i++;
                                });

                                $scope.model.VapSteps = CommonFunctions.Find(result.data, "ShowInUI", true);
                                if ($scope.model.VapSteps && $scope.model.VapSteps.length > 0) {
                                    $timeout(function () {
                                        $("#newplan-step-" + $scope.model.VapSteps[0].Order).parent().addClass("vap-new-plan-step-selected");
                                        $scope.model.SelectedStepOrder = $scope.model.VapSteps[0].Order;
                                    }, 100, false);
                                }
                            } else {
                                $scope.model.VapSteps = [];
                            }
                        });
                    }
                    else {
                        $scope.model.VapSteps = [];
                    }
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Vap";
                    errExp.FunctionName = "onAccessTypeChanged";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
           * @ngdoc event 
           * @name onOkNewVapPlanClick
           * @eventOf roundingModule.controller:NewVapPlanController           
           * @description      
           ** k-on-tap event of Ok Button of new plan modal view     
           ** Saves Patient Vascular Access Plan
           ** Calls VapService.SavePatientVascularAccess
           ** Calls VapService.RefreshVap
           ** Changes UI behaviour
           */
            $scope.onOkNewVapPlanClick = function () {
                try {
                    if ($scope.newPlanValidator.validate()) {
                        CommonFunctions.Blockui();
                        var tempVapSteps = [];
                        $.each($scope.model.VapSteps, function (key, step) {
                            if (step.Order >= $scope.model.SelectedStepOrder) {

                                if (step.Order === $scope.model.SelectedStepOrder) {
                                    step.CreateDate = $scope.model.PlanStartDate.format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false);
                                    step.IsCurrent = true;
                                    step.IsFirst = true;
                                }
                                if (step.Order === $scope.model.VapSteps.length) {
                                    step.IsLast = true;
                                }

                                tempVapSteps.push(step);
                            }
                        });

                        var accessPlan = {
                            UID: 0,
                            PatientUID: $rootScope.Global.Objects.SelectedPatient.UID,
                            DataState: CommonConstants.DataState.Added,
                            AccessPlan: CommonConstants.AccessPlan.CVC1,
                            PermanentAccess: $scope.model.DesiredPermanentAccess,
                            StartDate: $scope.model.PlanStartDate.format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                            StopDate: null,
                            StopReason: null,
                            StepDetails: tempVapSteps,
                            DiseaseState: null,
                            VapStep: null,
                            StopReasonOther: null
                        }

                        VapService.SavePatientVascularAccess(accessPlan, function (result) {
                            if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                                CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.PlanCreated);
                                VapService.RefreshVap();
                                $scope.onCancelNewVapPlanClick();
                            } else {
                                CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.PlanCreateFailed);
                            }
                        });
                    }
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Vap";
                    errExp.FunctionName = "onOkNewVapPlanClick";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
            * @ngdoc event 
            * @name onCancelNewVapPlanClick
            * @eventOf roundingModule.controller:NewVapPlanController
            * @description       
            ** k-on-tap event of Cancel Button of new plan modal view     
            ** Cancels Patient Vascular Access Plan
            ** Closes new plan modal view
            ** Changes UI behaviour
            */
            $scope.onCancelNewVapPlanClick = function () {
                $scope.newPlanValidator.hideMessages();
                $("#new-vapplan-modalview").kendoMobileModalView("close");
            }
        }).controller('StopVapPlanController', function ($rootScope, $scope, $timeout, VapService, ExceptionService, CommonFunctions,
                                                        CommonConstants, LookUp, CommonMessages, LookupTypes, Status)
        /**
        * @ngdoc controller
        * @name roundingModule.controller:StopVapPlanController
        * @description 
        ** Controller for Stop Vap Plan Modal View
        ** Child Controller for VAP (Vascular Access Plan) Screen 
                               
        * @property {object} $scope.model                                   model of StopVapPlanController
        * @property {date} $scope.model.PlanStopDate                        property of $scope.model used for VAP Stop date
        * @property {string} $scope.model.StopReason                        property of $scope.model used for VAP Steps List
        * @property {string} $scope.model.StopReasonOther                   property of $scope.model used for Selected Step Order
        * @property {object} $scope.CopyVapStepDetails                      property of $scope used for local copy of VAP Step Details
        * @property {object} $scope.ActivateVapStepDetails                  property of $scope used for Active Vap Step Detail     
        * @property {kendo.data.DataSource} $scope.model.StopReasons        property of $scope.model used for Stop Reason dropdown        
        */
        {            
            $scope.model = {};
            $scope.model.PlanStopDate = new Date();
            $scope.model.StopReason = null,
            $scope.model.StopReasonOther = null,
            $scope.CopyVapStepDetails = VapService.GetCopyVapStepDetails();
            $scope.ActivateVapStepDetails = VapService.GetCopyActivateVapStepDetails();
            $scope.model.StopReasonsConfig = {
                dataTextField: "Text",
                dataValueField: "Value",
                dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.StopReason), "IsShownUI", true)
            }
            //$scope.model.StopReasons = CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.StopReason), "IsShownUI", true);

            /**
            * @ngdoc function 
            * @name stopPlanValidator
            * @methodOf roundingModule.controller:StopVapPlanController
            * @description 
            ** Creates custom validator using kendo validator using diffrent business rules for stop vap plan modal view 
            */
            $timeout(function () {
                $scope.stopPlanValidator = $("#stop-vapplan-modalview").kendoValidator({
                    rules: {
                        datevalid: function (input) {  //if input date is not valid
                            if ($.trim(input.val()) != "" && input.is("[data-datevalid-msg]")) {
                                return kendo.parseDate($.trim(input.val()));
                            }
                            return true;
                        }
                    },
                    messages: {
                        datevalid: "date is not valid"
                    }
                }).data("kendoValidator");
            }, 0, false);

            /**
            * @ngdoc event 
            * @name onStopVapPlanClick
            * @eventOf roundingModule.controller:StopVapPlanController            
            * @description       
            ** k-on-tap event of Stop Button of stop vap plan modal view  
            ** Stops Current Vap Plan
            ** Calls VapService.SavePatientVascularAccess 
            ** Calls VapService.RefreshVap
            ** Changes UI behaviour
            */
            $scope.onStopVapPlanClick = function () {
                try {
                    if ($scope.stopPlanValidator.validate()) {
                        CommonFunctions.Blockui();
                        var tempsavedata = [];

                        $.each($scope.CopyVapStepDetails, function (key, vapStepDetail) {
                            if (vapStepDetail.UID === $scope.ActivateVapStepDetails.UID) {
                                tempsavedata = vapStepDetail;
                            }
                        });

                        if (tempsavedata != []) {
                            tempsavedata.StopDate = new Date($scope.model.PlanStopDate).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                            tempsavedata.StopReason = $scope.model.StopReason,
                            tempsavedata.StopReasonOther = $scope.model.StopReason === "OT" ? $scope.model.StopReasonOther : null;
                            tempsavedata.DataState = CommonConstants.DataState.Modified,

                            VapService.SavePatientVascularAccess(tempsavedata, function (result) {
                                if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                                    CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.PlanStopped);
                                    VapService.RefreshVap();
                                    $scope.onCancelStopVapPlanClick();
                                } else {
                                    CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.PlanStopfailed);
                                }
                            });
                        }
                    }
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Vap";
                    errExp.FunctionName = "onStopVapPlanClick";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
            * @ngdoc event 
            * @name onCancelStopVapPlanClick
            * @eventOf roundingModule.controller:StopVapPlanController
            * @description       
            ** k-on-tap event of Cancel Button of stop vap plan modal view              
            ** Closes stop vap plan modal view
            ** Changes UI behaviour
            */
            $scope.onCancelStopVapPlanClick = function () {
                $scope.stopPlanValidator.hideMessages();
                $("#stop-vapplan-modalview").kendoMobileModalView("close");
            }
        });
}());