(function () {
    /**
     * @ngdoc service
     * @author Sandeep Parmar
     * @name roundingModule.service:AccessInfoService
     * @description     
     ** AccessInfoService is being used by AccessInfoController and AddEditAccessInfoController
     ** This will be used for all service calls for AccessInfo Screen
     * @property {object} selectedAccess local variable
     * @property {object} sharedData local variable
     */
    angular.module('roundingModule').factory('AccessInfoService', function ($rootScope, $timeout, ServiceConstants, RoundingService) {

        var selectedAccess = {};
        var sharedData = {};

        /**
         * @ngdoc function 
         * @name NewAccessModel
         * @methodOf roundingModule.service:AccessInfoService
         * @returns {object} new accessModel
         * @description       
         ** Initializes and returns new Access Model
         */
        function newAccessModel() {
            return {
                AccessStatus: "",
                AccessType: "",
                ActivateDate: "",
                BeltLine: "",
                DataState: 0,
                Extremity: "",
                InActiveDate: "",
                InActiveReason: "",
                IsIPE: false,
                IsInUseAtEnrollment: false,
                LastAccess: false,
                LastAccessReason: "",
                PatientUID: null,
                PlacedDate: "",
                Region: "",
                Side: "",
                Status: "",
                TermDate: "",
                TermReason: "",
                UID: 0,
                UserMessages: ""
            }
        }

        /**
          * @ngdoc function 
          * @name GetPatientAccessMgmt
          * @methodOf roundingModule.service:AccessInfoService
          * @param {Object} data { patientUID: $rootScope.Global.Objects.SelectedPatient.UID, IsIPE: false }
          * @param {function} callback $scope.onGetPatientAccessMgmtRetrieved      
          * @description       
          ** Calls GetPatientAccessMgmt api 'Clinical/GetPatienttAccessMgmt' using RoundingService 
          */
        function getPatientAccessMgmt(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPatientAccessMgmt, 'POST', 'JSON', data, callback);
        }

        /**
          * @ngdoc function 
          * @name SavePatientAccessMgmt
          * @methodOf roundingModule.service:AccessInfoService
          * @param {Object} data { patientUID: $rootScope.Global.Objects.SelectedPatient.UID, IsIPE: false }
          * @param {function} callback inline function       
          * @description       
          ** Calls SavePatientAccessMgmt api 'Clinical/SavePatientAccessMgmt' using RoundingService 
          */
        function savePatientAccessMgmt(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.SavePatientAccessMgmt, 'POST', 'JSON', data, callback, true);
        }

        /**
         * @ngdoc function 
         * @name SetSelectedAccess
         * @methodOf roundingModule.service:AccessInfoService
         * @param {Object} access selected access in screen
         * @description       
         ** Sets local variable selectedAccess
         */
        function setSelectedAccess(access) {
            selectedAccess = access;
        }

        /**
         * @ngdoc function 
         * @name GetSelectedAccess
         * @methodOf roundingModule.service:AccessInfoService
         * @returns {Object} selectedAccess 
         * @description       
         ** Returns local variable selectedAccess
         */
        function getSelectedAccess() {
            return selectedAccess;
        }

        /**
         * @ngdoc function 
         * @name SetSharedData
         * @methodOf roundingModule.service:AccessInfoService
         * @param {Object} shared shared data
         * @description       
         ** Sets local variable sharedData which needs to be shared between controllers
         */
        function setSharedData(shared) {
            sharedData = shared;
        }

        /**
         * @ngdoc function 
         * @name GetSharedData
         * @methodOf roundingModule.service:AccessInfoService
         * @returns {Object} shareddata
         * @description       
         ** Returns local variable sharedData which needs to be shared between controllers
         */
        function getSharedData() {
            return sharedData;
        }

        /**
         * @ngdoc function 
         * @name RefreshAccessInfo
         * @methodOf roundingModule.service:AccessInfoService
         * @description       
         ** Broadcasts refreshAccessInfo which will call $scope.showAccessInfo
         */
        function refreshAccessInfo() {
            $timeout(function () {
                $rootScope.$broadcast('refreshAccessInfo');
            }, 0, true);
        }

        return {
            GetPatientAccessMgmt: getPatientAccessMgmt,
            SavePatientAccessMgmt: savePatientAccessMgmt,
            NewAccessModel: newAccessModel,
            SetSelectedAccess: setSelectedAccess,
            GetSelectedAccess: getSelectedAccess,
            SetSharedData: setSharedData,
            GetSharedData: getSharedData,
            RefreshAccessInfo: refreshAccessInfo
        };
    });
}());

(function () {
    angular.module('roundingModule')
    .controller('AccessInfoController', function ($rootScope, $scope, $timeout, LookUp, LookupTypes, AccessInfoService, ExceptionService, CommonFunctions,
                                             CommonConstants, Status, CommonMessages)
        /**
        * @ngdoc controller
        * @name roundingModule.controller:AccessInfoController
        * @description 
        ** Main Controller for Access Info Screen (View Mode). 
        ** Add/Edit functionality is captured in {@link roundingModule.controller:AddEditAccessInfoController}
        ** {@link roundingModule.service:AccessInfoService}
        ** VersionOne Requirements - View Access - <a href="https://www13.v1host.com/DaVitaInc/Task.mvc/Summary?oidToken=Task%3A1373">TK-01066</a>

        * @property {object} $scope.model                            Model of AccessInfoController
        * @property {object} $scope.model.AccessData                 Property of $scope.model used for Access List
        * @property {object} $scope.model.AccessStatus               Property of $scope.model used for Access Status List
        * @property {object} $scope.model.LastItemUID                Property of $scope.model used for Last Item of AccessList 
        * @property {object} $scope.model.AccessDataCount            Property of $scope.model used to get the count of AccessData
        * @property {object} $scope.model.SharedData                 Property of $scope.model used for SharedData
        * @property {object} $scope.model.SharedData.ActiveCount     Property of $scope.model.SharedData used to get the count of Active Access
        * @property {object} $scope.model.SharedData.ActiveUID       Property of $scope.model.SharedData used for ActiveUID
        * @property {object} $scope.model.SharedData.InActiveUIDS    Property of $scope.model.SharedData used for InActiveUIDS list 
        * @property {object} $scope.model.SharedData.InActiveCount   Property of $scope.model.SharedData used to get the count of InActive Access
        */ 
    {
        $scope.$$listeners['refreshAccessInfo'] = [];
        $scope.model = {};
        $scope.model.AccessData = new kendo.data.DataSource({ data: [] });
        $scope.model.AccessStatus = CommonConstants.AccessStatus;
        $scope.model.LastItemUID = null;
        $scope.model.AccessDataCount = null;
        $scope.model.SharedData = {}
        $scope.model.SharedData.ActiveCount = 0,
        $scope.model.SharedData.ActiveUID = 0,
        $scope.model.SharedData.InActiveUIDS = [],
        $scope.model.SharedData.InActiveCount = 0,

        LookUp.GetLookUp(LookupTypes.AccessType);
        LookUp.GetLookUp(LookupTypes.AccessStatus);
        LookUp.GetLookUp(LookupTypes.AccessSide);
        LookUp.GetLookUp(LookupTypes.AccessRegion);
        LookUp.GetLookUp(LookupTypes.AccessBodyPart);
        LookUp.GetLookUp(LookupTypes.AccessInactiveReason);
        LookUp.GetLookUp(LookupTypes.AccessTermReason);
        LookUp.GetLookUp(LookupTypes.LastAccessReason);

        /**
        * @ngdoc function 
        * @name getLookupItem
        * @methodOf roundingModule.controller:AccessInfoController    
        * @param {string} lookupType type of lookup
        * @param {string} item lookup item(containing UID, Value, Text) for which lookup text needs be displayed
        * @returns {string} lookup item text
        * @description    
        * Gets lookup text based on value from Access Info view   
        */
        $scope.getLookupItem = function (lookupType, item) {
            return LookUp.GetValueByKey(lookupType, item).Text;
        }

        /**
        * @ngdoc event 
        * @name refreshAccessInfo
        * @eventOf roundingModule.controller:AccessInfoController       
        * @description       
        * Subscriber of refreshAccessInfo event which will call $scope.showAccessInfo()
        */
        $scope.$on('refreshAccessInfo', function () {
            $scope.showAccessInfo();
        });

        /**
        * @ngdoc function 
        * @name showAccessInfo
        * @methodOf roundingModule.controller:AccessInfoController       
        * @description     
        ** Calls AccessInfoService.GetPatientAccessMgmt
        ** Start point of the Access Info screen
        */
        $scope.showAccessInfo = function () {
            var accessRequest = {
                patientUID: $rootScope.Global.Objects.SelectedPatient.UID,
                IsIPE: false
            }

            CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
            if (LookUp.GetLookUp(LookupTypes.LastAccessReason) === undefined) {
                window.setTimeout(function () {
                    AccessInfoService.GetPatientAccessMgmt(accessRequest, $scope.onGetPatientAccessMgmtRetrieved);
                }, 2500);
            }
            else {
                AccessInfoService.GetPatientAccessMgmt(accessRequest, $scope.onGetPatientAccessMgmtRetrieved);
            }
        }

        /**
        * @ngdoc function 
        * @name onGetPatientAccessMgmtRetrieved
        * @methodOf roundingModule.controller:AccessInfoController 
        * @param {object} result returned by service 
        * @description     
        ** Callback function of AccessInfoService.GetPatientAccessMgmt
        ** Populates $scope.model.AccessData
        ** Updates count for Active/InActive Access, Sorts the result
        */
        $scope.onGetPatientAccessMgmtRetrieved = function (result) {
            try {
                if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                    if (result.data.length > 0) {

                        //sorting by date Desc
                        var sorted = result.data.sort(function (a, b) {
                            a = a.PlacedDate;
                            b = b.PlacedDate;
                            return a < b ? -1 : a > b ? 1 : 0;
                        });

                        sorted.reverse();
                        var accessInfo = [];
                        var isActiveRecordFound = false;
                        var activeAccessCount = 0;
                        var activeUID = 0;
                        var inActiveAccessCount = 0;
                        for (var i = 0; i < result.data.length; i++) {
                            if (sorted[i].AccessStatus === Status.AccessStatus.Active) {
                                activeAccessCount = activeAccessCount + 1;
                            }
                            else if (sorted[i].AccessStatus === Status.AccessStatus.InActive) {
                                $scope.model.SharedData.InActiveUIDS.push(sorted[i].UID);
                                inActiveAccessCount = inActiveAccessCount + 1;
                            }

                            if (sorted[i].AccessStatus === Status.AccessStatus.Active) {
                                isActiveRecordFound = true;
                                activeUID = sorted[i].UID;
                            }

                            if (isActiveRecordFound) {
                                if (sorted[i].AccessStatus === Status.AccessStatus.Active) {
                                    accessInfo[0] = sorted[i];
                                }
                                else {
                                    accessInfo[i] = sorted[i];
                                }
                            }
                            else {
                                accessInfo[i + 1] = sorted[i];
                            }
                        }

                        if (!isActiveRecordFound) {
                            accessInfo.splice(0, 1);
                        }

                        //assign to AccessData for UI
                        $scope.model.AccessData.data(accessInfo);

                        $scope.model.SharedData.ActiveCount = activeAccessCount;
                        $scope.model.SharedData.InActiveCount = inActiveAccessCount;
                        $scope.model.SharedData.ActiveUID = activeUID;

                        AccessInfoService.SetSharedData($scope.model.SharedData);

                        //CommonFunctions.CreateScroller("accessinfolistview"); 

                        $scope.model.AccessDataCount = accessInfo.length - 1;
                        if ($scope.model.AccessData._data[0].AccessStatus === Status.AccessStatus.Active) {
                            $($(".accessinfo-stepdetail-header")[0]).addClass("crd-header-blue");
                        }

                        $($(".accessinfo-stepdetail-row-top-left-upper")[0]).css({ "border": "0px" });
                        $($(".accessinfo-stepdetail-row-bottom-right")[$scope.model.AccessDataCount]).css({ "border-left": "none" });
                        $($(".accessinfo-stepdetail-row-top-left-lower")[$scope.model.AccessDataCount]).css({ "border": "none" });
                        $($(".accessinfo-stepdetail-row-top-right")[$scope.model.AccessDataCount]).css({ "border-bottom": "none" });
                        $scope.model.LastItemUID = $scope.model.AccessData._data[$scope.model.AccessDataCount].UID;
                    } else {
                        $scope.model.AccessData.data([]);
                        $scope.model.SharedData.ActiveCount = 0;
                        $scope.model.SharedData.ActiveUID = 0;
                        $scope.model.SharedData.InActiveUIDS = [];
                        $scope.model.SharedData.InActiveCount = 0;
                        AccessInfoService.SetSharedData($scope.model.SharedData);
                    }
                }

                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            } catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "AccessInfo";
                errExp.FunctionName = "onGetPatientAccessMgmtRetrieved";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
            }
        }

        /**
        * @ngdoc event 
        * @name onTopRowClicked
        * @eventOf roundingModule.controller:AccessInfoController
        * @param {object} dataItem item of $scope.model.AccessData
        * @description       
        ** ng-click event of top row in Access List from access info view
        ** Flips Access Info block and updates the styles for accessinfo steps
        */
        $scope.onTopRowClicked = function (dataItem) {
            //Flip all first
            $(".accessinfo-stepdetail-row-bottom").parent().removeClass("accessinfo-stepdetail-active");
            //remove borders from last one
            $($(".accessinfo-stepdetail-row-bottom-right")[$scope.model.AccessDataCount]).css({ "border-left": "none" });
            $($(".accessinfo-stepdetail-row-top-left-lower")[$scope.model.AccessDataCount]).css({ "border": "none" });
            $($(".accessinfo-stepdetail-row-top-right")[$scope.model.AccessDataCount]).css({ "border-bottom": "none" });

            if ($("#accessinfo-bottom-" + dataItem.UID).is(":visible")) {
                $("#accessinfo-bottom-" + dataItem.UID).hide();
                $("#accessinfo-stepdetail-row-bottom-right-" + dataItem.UID).removeClass("accessinfo-stepdetail-row-bottom-right-div");
                $("#accessinfo-bottom-" + dataItem.UID).parent().removeClass("accessinfo-stepdetail-inactive");
            } else {
                $(".accessinfo-stepdetail-row-bottom").hide();
                $("#accessinfo-bottom-" + dataItem.UID).show();
                $("#accessinfo-stepdetail-row-bottom-right-" + dataItem.UID).addClass("accessinfo-stepdetail-row-bottom-right-div")
                $("#accessinfo-bottom-" + dataItem.UID).parent().addClass('accessinfo-stepdetail-active');
                if ($scope.model.LastItemUID === dataItem.UID) {
                    $("#accessinfo-stepdetail-row-bottom-right-" + dataItem.UID).removeClass("accessinfo-stepdetail-row-bottom-right-div");
                    $($(".accessinfo-stepdetail-row-top-right")[$scope.model.AccessDataCount]).css({ "border-bottom": "2px solid rgb(218, 218, 218)" });
                    $($(".accessinfo-stepdetail-row-bottom-right")[$scope.model.AccessDataCount]).css({ "border-left": "2px solid rgb(218, 218, 218)" });
                    $($(".accessinfo-stepdetail-row-top-left-lower")[$scope.model.AccessDataCount]).css({ "border": "1px solid rgb(218, 218, 218)" });
                }
            }
        }

        /**
        * @ngdoc event 
        * @name onAccessAddClick
        * @eventOf roundingModule.controller:AccessInfoController
        * @description       
        ** k-on-tap event of Add Access button from access info view
        ** Initializes new access and resets boolean flags
        ** Calls AccessInfoService.SetSelectedAccess
        ** Opens add/edit accessinfo modal view
        */
        $scope.onAccessAddClick = function () {
            var newAccess = jQuery.extend({}, AccessInfoService.NewAccessModel());
            newAccess.IsAccessTypeDisabled = false;
            newAccess.IsAccessStatusDisabled = false;
            newAccess.IsLastAccessDisabled = true;
            var date = (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false);
            newAccess.PlacedDate = date;
            newAccess.ActivateDate = date;
            newAccess.InActiveDate = date;
            newAccess.TermDate = date;
            AccessInfoService.SetSelectedAccess(newAccess);

            $timeout(function () {
                $("#add-edit-accessinfo-modalview").kendoMobileModalView("open");
            }, 0, false);
        }

        /**
       * @ngdoc event 
       * @name onEditAccessDetailsClick
       * @eventOf roundingModule.controller:AccessInfoController
       * @param {object} dataItem item of $scope.model.AccessData 
       * @description       
       ** k-on-tap event of Edit Access button from access info view
       ** Resets boolean flags
       ** Calls AccessInfoService.SetSelectedAccess
       ** Opens add/edit accessinfo modal view
       */
        $scope.onEditAccessDetailsClick = function (dataItem) {

            var selectedAccess = jQuery.extend({}, dataItem);
            selectedAccess.IsAccessTypeDisabled = true;
            selectedAccess.IsAccessStatusDisabled = false;
            selectedAccess.IsLastAccessDisabled = true;
            AccessInfoService.SetSelectedAccess(selectedAccess);

            $timeout(function () {
                $("#add-edit-accessinfo-modalview").kendoMobileModalView("open");
            }, 0, false);
        }

        //start point of the screen
        //this method will be called first when controller loads
        $scope.showAccessInfo();
    }).controller('AddEditAccessInfoController', function ($rootScope, $scope, $timeout, AccessInfoService, ExceptionService, CommonFunctions,
                                                            CommonConstants, LookUp, CommonMessages, LookupTypes, Status)
        /**
            * @ngdoc controller
            * @name roundingModule.controller:AddEditAccessInfoController
            * @description 
            ** Controller for Add/Edit Access Info Screen 
            ** View functionality is captured in {@link roundingModule.controller:AccessInfoController}
            ** {@link roundingModule.service:AccessInfoService}
            ** VersionOne Requirements - Add/Edit Access - <a href="https://www13.v1host.com/DaVitaInc/Task.mvc/Summary?oidToken=Task%3A11719">TK-01193</a>
            
            * @property {object} $scope.model                            Model of AddEditAccessInfoController
            * @property {object} $scope.model.AccessTypesConfig          Property of $scope.model used for Access Type dropdown
            * @property {object} $scope.model.LastAccessReasonsConfig    Property of $scope.model used for Last Resort Reason dropdown
            * @property {object} $scope.model.AccessSidesConfig          Property of $scope.model used for Side dropdown 
            * @property {object} $scope.model.AccessRegionsConfig        Property of $scope.model used for Access Region dropdown
            * @property {object} $scope.model.AccessStatusConfig         Property of $scope.model used for Access Status dropdown
            * @property {object} dropDownAccessStatus                    Local variable   
            * @property {object} $scope.model.AccessExtremityConfig      Property of $scope.model used for Extremity dropdown
            * @property {object} $scope.model.AccessInactiveReasonConfig Property of $scope.model used for InActiveReasons dropdown 
            * @property {object} $scope.model.AccessTermReasonConfig     Property of $scope.model used for Termination Reason dropdown 
            * @property {object} $scope.model.SelectedAccess             Property of $scope.model used for Selected Access 
            * @property {object} $scope.model.SharedData                 Property of $scope.model.SharedData used for Shared Data 
            * @property {date} $scope.model.SelectedAccess.PlacedDate    Property of $scope.model.SelectedAccess used for Est.Placed Date on Access Details screen
            * @property {date} $scope.model.SelectedAccess.ActivateDate  Property of $scope.model.SelectedAccess used for Est.Date Activated on Access Details screen
            * @property {date} $scope.model.SelectedAccess.InActiveDate  Property of $scope.model.SelectedAccess used for Est.Date Inactivated on Access Details screen
            * @property {date} $scope.model.SelectedAccess.TermDate      Property of $scope.model.SelectedAccess used for Terminated Date on Access Details screen
            * @property {string} $scope.model.SelectedAccess.AccessType  Property of $scope.model.SelectedAccess used to select Access Type on Access Details screen
            * @property {string} $scope.model.SelectedAccess.AccessStatus Property of $scope.model.SelectedAccess used to select Access status on Access Details screen
            * @property {boolean} $scope.model.SelectedAccess.IsLastAccessDisabled  Property of $scope.model.SelectedAccess. If true will disable the Last Resort/Plan contradicted checkbox on Access Details screen 
            * @property {boolean} $scope.model.SelectedAccess.IsInUseAtEnrollment   Property of $scope.model.SelectedAccess. If true will disable the In Use At Enrollment checkbox.
            * @property {boolean} $scope.model.SelectedAccess.LastAccess    Property of $scope.model.SelectedAccess. If true will display the LAST RESORT/ PLAN CONTRAINDICATED checkbox.
            * @property {string} $scope.model.SelectedAccess.LastAccessReason   Property of $scope.model.SelectedAccess used to store value of the selected option from Last Resort Reason dropdown on Access Details screen. 
            * @property {string} $scope.model.SelectedAccess.Side       Property of $scope.model.SelectedAccess used to store value of the selected option from SIDE dropdown on Access Details screen
            * @property {string} $scope.model.SelectedAccess.Region     Property of $scope.model.SelectedAccess used to store value of the selected option from REGION dropdown on Access Details screen
            * @property {string} $scope.model.SelectedAccess.Extremity  Property of $scope.model.SelectedAccess used to store value of the selected option from EXTREMITY dropdown on Access Details screen
            * @property {string} $scope.model.SelectedAccess.InActiveReason Property of $scope.model.SelectedAccess used to store value of the selected option from IN-ACTIVE REASON dropdown on Access Details screen
            */
    {
        $scope.model = {};

        //k-options configs for combo boxes
        $scope.model.AccessTypesConfig = {
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.AccessType), "IsShownUI", true)
        };

        $scope.model.LastAccessReasonsConfig = {
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.LastAccessReason), "IsShownUI", true)
        };

        $scope.model.AccessSidesConfig = {
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.AccessSide), "IsShownUI", true)
        };

        $scope.model.AccessRegionsConfig = {
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.AccessRegion), "IsShownUI", true)
        }

        $scope.model.AccessStatusConfig = {
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.AccessStatus), "IsShownUI", true)
        }

        //refreshing dropdown data manually if it is removed *heck of angular data refresh*
        var dropDownAccessStatus = $("#modalview-access-add-accessstatus").data("kendoDropDownList");
        if (dropDownAccessStatus != undefined) {
            dropDownAccessStatus.setDataSource(CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.AccessStatus), "IsShownUI", true));
        }

        $scope.model.AccessExtremityConfig = {
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.AccessBodyPart), "IsShownUI", true)
        }

        $scope.model.AccessInactiveReasonConfig = {
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.AccessInactiveReason), "IsShownUI", true)
        }

        $scope.model.AccessTermReasonConfig = {
            dataTextField: "Text",
            dataValueField: "Value",
            dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.AccessTermReason), "IsShownUI", true)
        }

        //Get data whether for edit or add
        $scope.model.SelectedAccess = AccessInfoService.GetSelectedAccess();
        $scope.model.SharedData = AccessInfoService.GetSharedData();

        //Doing this so if user changes date then validation will be done against original date
        if ($scope.model.SelectedAccess.UID && $scope.model.SelectedAccess.UID != 0) {
            $scope.model.SelectedAccess.ValidateActivateDate = $scope.model.SelectedAccess.ActivateDate;
            $scope.model.SelectedAccess.ValidateInActivateDate = $scope.model.SelectedAccess.InActiveDate;
        }

        if ($scope.model.SelectedAccess.PlacedDate) {
            $scope.model.SelectedAccess.PlacedDate = CommonFunctions.DateFunctions.parseDate($scope.model.SelectedAccess.PlacedDate);
        }
        if ($scope.model.SelectedAccess.ActivateDate) {
            $scope.model.SelectedAccess.ActivateDate = CommonFunctions.DateFunctions.parseDate($scope.model.SelectedAccess.ActivateDate);
        }
        if ($scope.model.SelectedAccess.InActiveDate) {
            $scope.model.SelectedAccess.InActiveDate = CommonFunctions.DateFunctions.parseDate($scope.model.SelectedAccess.InActiveDate);
        }
        if ($scope.model.SelectedAccess.TermDate) {
            $scope.model.SelectedAccess.TermDate = CommonFunctions.DateFunctions.parseDate($scope.model.SelectedAccess.TermDate);
        }
        if ($scope.model.SelectedAccess.AccessType === "2") {
            $scope.model.SelectedAccess.IsLastAccessDisabled = false;
            $scope.onAccessTypeChange();
        }
        if ($scope.model.SelectedAccess.AccessStatus === Status.AccessStatus.Termed) {
            $scope.model.SelectedAccess.IsAccessStatusDisabled = true;
        }

        /**
        * @ngdoc function 
        * @name addEditAccessValidator
        * @methodOf roundingModule.controller:AddEditAccessInfoController
        * @description 
        * Creates custom validator using kendo validator using diffrent business rules for edit/add access modal view 
        */
        $timeout(function () {
        $scope.addEditAccessValidator = $("#add-edit-accessinfo-modalview").kendoValidator({
            rules: {
                statusrequired: function (input) {
                    if (input.is("[data-statusrequired-msg]")) {
                        return $.trim(input.val()) != "";
                    }
                    return true;
                },
                activestatusexists: function (input) {
                    if ($scope.model.SelectedAccess.AccessStatus === Status.AccessStatus.Active && input.is("[data-activestatusexists-msg]")) {
                        if ((($scope.model.SelectedAccess.UID != $scope.model.SharedData.ActiveUID) || $scope.model.SelectedAccess.UID === 0)
                                && $scope.model.SharedData.ActiveCount > 0) {
                            return false;
                        }
                    }
                    return true;
                },
                inactivestatusmorethanthree: function (input) {
                    if ($scope.model.SelectedAccess.AccessStatus === Status.AccessStatus.InActive && input.is("[data-inactivestatusmorethanthree-msg]")) {
                        var newInActiveUid = true;
                        $scope.model.SharedData.InActiveUIDS.forEach(function (uid) {
                            if ($scope.model.SelectedAccess.UID === uid) {
                                newInActiveUid = false;
                            }
                        });

                        if (newInActiveUid && $scope.model.SharedData.InActiveCount > 2) {
                            return false;
                        }
                    }
                    return true;
                },
                activatedtrequired: function (input) {
                    if ($scope.model.SelectedAccess.AccessStatus === Status.AccessStatus.Active && input.is("[data-activatedtrequired-msg]")) {
                        return kendo.parseDate($.trim(input.val()));
                    }
                    return true;
                },
                activatedtgreaterthantoday: function (input) {
                    if ($scope.model.SelectedAccess.AccessStatus === Status.AccessStatus.Active && input.is("[data-activatedtrequired-msg]")) {
                        var activatedDate = kendo.parseDate($.trim(input.val()));
                        if (activatedDate != null) {
                            activatedDate.setHours(0, 0, 0, 0);
                        }
                        var today = kendo.parseDate(CommonFunctions.DateFunctions.sysDate()).setHours(0, 0, 0, 0);

                        if (activatedDate != null && (activatedDate > today)) {
                            return false;
                        }
                    }
                    return true;
                },
                inactivatedtrequired: function (input) {
                    if ($scope.model.SelectedAccess.AccessStatus === Status.AccessStatus.InActive && input.is("[data-inactivatedtrequired-msg]")) {
                        return kendo.parseDate($.trim(input.val()));
                    }
                    return true;
                },
                inactivereasonrequired: function (input) {
                    if ($scope.model.SelectedAccess.AccessStatus === Status.AccessStatus.InActive && input.is("[data-inactivereasonrequired-msg]")) {
                        return $.trim(input.val()) != "";
                    }
                    return true;
                },
                activatedtlessthaninactivate: function (input) {
                    if ($scope.model.SelectedAccess.AccessStatus === Status.AccessStatus.Active && input.is("[data-activatedtlessthaninactivate-msg]")) {
                        var inactiveDate = kendo.parseDate($scope.model.SelectedAccess.ValidateInActivateDate);
                        if (inactiveDate != null) {
                            inactiveDate.setHours(0, 0, 0, 0);
                        }
                        var activatedDate = kendo.parseDate($.trim(input.val()));
                        if (activatedDate != null) {
                            activatedDate.setHours(0, 0, 0, 0);
                        }
                        if (activatedDate != null && inactiveDate != null && (activatedDate < inactiveDate)) {
                            return false;
                        }
                    }
                    return true;
                },
                inactivatedtlessthanactivate: function (input) {
                    if ($scope.model.SelectedAccess.AccessStatus === Status.AccessStatus.InActive && input.is("[data-inactivatedtlessthanactivate-msg]")) {
                        var activatedDate = kendo.parseDate($scope.model.SelectedAccess.ValidateActivateDate);
                        if (activatedDate != null) {
                            activatedDate.setHours(0, 0, 0, 0);
                        }
                        var inactiveDate = kendo.parseDate($.trim(input.val()));
                        if (inactiveDate != null) {
                            inactiveDate.setHours(0, 0, 0, 0);
                        }
                        if (inactiveDate != null && activatedDate != null && (inactiveDate < activatedDate)) {
                            return false;
                        }
                    }
                    return true;
                },
                placeddtlessthanactivate: function (input) {
                    if ($scope.model.SelectedAccess.AccessStatus === Status.AccessStatus.Active && input.is("[data-placeddtlessthanactivate-msg]")) {
                        var activatedDate = kendo.parseDate($scope.model.SelectedAccess.ActivateDate);
                        if (activatedDate != null) {
                            activatedDate.setHours(0, 0, 0, 0);
                        }
                        var placedDate = kendo.parseDate($.trim(input.val()));
                        if (placedDate != null) {
                            placedDate.setHours(0, 0, 0, 0);
                        }
                        if (placedDate != null && activatedDate != null && (placedDate > activatedDate)) {
                            return false;
                        }
                    }
                    return true;
                },
                placeddtlessthaninactivate: function (input) {
                    if ($scope.model.SelectedAccess.AccessStatus === Status.AccessStatus.InActive && input.is("[data-placeddtlessthaninactivate-msg]")) {
                        var inactivatedDate = kendo.parseDate($scope.model.SelectedAccess.InActiveDate);
                        if (placedDate != null) {
                            placedDate.setHours(0, 0, 0, 0);
                        }
                        var placedDate = kendo.parseDate($.trim(input.val()));
                        if (placedDate != null) {
                            placedDate.setHours(0, 0, 0, 0);
                        }
                        if (placedDate != null && inactivatedDate != null && (placedDate > inactivatedDate)) {
                            return false;
                        }
                    }
                    return true;
                },
                placeddtlessthanterm: function (input) {
                    if ($scope.model.SelectedAccess.AccessStatus === Status.AccessStatus.Termed && input.is("[data-placeddtlessthanterm-msg]")) {
                        var termedDate = kendo.parseDate($scope.model.SelectedAccess.TermDate);
                        if (termedDate != null) {
                            termedDate.setHours(0, 0, 0, 0);
                        }
                        var placedDate = kendo.parseDate($.trim(input.val()));
                        if (placedDate != null) {
                            placedDate.setHours(0, 0, 0, 0);
                        }
                        if (placedDate != null && termedDate != null && (placedDate > termedDate)) {
                            return false;
                        }
                    }
                    return true;
                },
                termeddtrequired: function (input) {
                    if ($scope.model.SelectedAccess.AccessStatus === Status.AccessStatus.Termed && input.is("[data-termeddtrequired-msg]")) {
                        return kendo.parseDate($.trim(input.val()));
                    }
                    return true;
                },
                termeddtlessthantoday: function (input) {
                    if ($scope.model.SelectedAccess.AccessStatus === Status.AccessStatus.Termed && input.is("[data-termeddtlessthantoday-msg]")) {
                        var termedDate = kendo.parseDate($.trim(input.val()));
                        if (termedDate != null) {
                            termedDate.setHours(0, 0, 0, 0);
                        }
                        var today = kendo.parseDate(CommonFunctions.DateFunctions.sysDate()).setHours(0, 0, 0, 0);
                        if (termedDate != null && (termedDate > today)) {
                            return false;
                        }
                    }
                    return true;
                },
                termedreasonrequired: function (input) {
                    if ($scope.model.SelectedAccess.AccessStatus === Status.AccessStatus.Termed && input.is("[data-termedreasonrequired-msg]")) {
                        return $.trim(input.val()) != "";
                    }
                    return true;
                },
                lastresortreasonrequired: function (input) {
                    if ($scope.model.SelectedAccess.LastAccess === true && input.is("[data-lastresortreasonrequired-msg]")) {
                        return $.trim(input.val()) != "";
                    }
                    return true;
                }
            },
            messages: {
                statusrequired: "Status cannot be empty",
                activestatusexists: "We already have an Active Access",
                inactivestatusmorethanthree: "Cannot add more than 3 Inactive Access for members",
                activatedtrequired: "Activated Date cannot be empty",
                activatedtgreaterthantoday: "Activated Date should be less than or equal to today's date",
                activatedtlessthaninactivate: "Activated Date cannot be less than previous In-Active Date",
                inactivatedtrequired: "In-Active Date cannot be empty",
                inactivereasonrequired: "In-Active Reason cannot be empty",
                inactivatedtlessthanactivate: "In-Active Date cannot be less than previous Activated Date",
                placeddtlessthanactivate: "Date placed should be less than or equal to Activated Date",
                placeddtlessthaninactivate: "Date placed should be less than or equal to In-Active Date",
                placeddtlessthanterm: "Date placed should be less than or equal to Term Date",
                termeddtrequired: "Term Date cannot be empty",
                termeddtlessthantoday: "Term Date should be less than or equal to today's date",
                termedreasonrequired: "Term Reason cannot be empty",
                lastresortreasonrequired: "Last Resort Reason cannot be empty"
            }
        }).data("kendoValidator");
    }, 0, false);
        /**
        * @ngdoc event 
        * @name onAddLastResortChange
        * @eventOf roundingModule.controller:AddEditAccessInfoController
        * @description       
        ** ng-change event of Add Last Resort dropdown from edit/add access modal view       
        ** resets $scope.model.SelectedAccess.LastAccessReason  
        */
        $scope.onAddLastResortChange = function () {
            if (!$scope.model.SelectedAccess.LastAccess) {
                $scope.model.SelectedAccess.LastAccessReason = "";
            }
        }

        /**
        * @ngdoc event 
        * @name onAccessTypeChange
        * @eventOf roundingModule.controller:AddEditAccessInfoController
        * @description       
        ** ng-change event of Access Type dropdown from edit/add access modal view         
        ** Changes data sources as per business rule, resets flags and status
        */
        $scope.onAccessTypeChange = function (e) {
            try {
                var dropDownAccessStatus = $("#modalview-access-add-accessstatus").data("kendoDropDownList");

                if (dropDownAccessStatus != undefined) {
                    if ($scope.model.SelectedAccess.AccessType === "2") {
                        $scope.model.SelectedAccess.IsLastAccessDisabled = false;
                        var raw = dropDownAccessStatus.dataSource.data();
                        for (var i = raw.length - 1; i >= 0; i--) {
                            if (raw[i].Value === "I") {
                                dropDownAccessStatus.dataSource.remove(raw[i]);
                            }
                        }
                        if ($scope.model.SelectedAccess.AccessStatus === "I") {
                            $scope.model.SelectedAccess.AccessStatus = "";
                        }
                    }
                    else {
                        $scope.model.SelectedAccess.IsLastAccessDisabled = true;
                        $scope.model.SelectedAccess.LastAccess = false;
                        $scope.model.SelectedAccess.LastAccessReason = null;
                        dropDownAccessStatus.setDataSource(CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.AccessStatus), "IsShownUI", true));
                    }
                }
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "AccessInfo";
                errExp.FunctionName = "onAddAccessTypeChange";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
            }
        }

        /**
        * @ngdoc event 
        * @name onCancelAccessDetailsClick
        * @eventOf roundingModule.controller:AddEditAccessInfoController
        * @description       
        ** k-on-tap event of Cancel button of edit/add access modal view 
        ** Calls AccessInfoService.NewAccessModel
        ** Hides valiation messages if any and closes the modal view
        */
        $scope.onCancelAccessDetailsClick = function () {
            $timeout(function () {
                $scope.model.SelectedAccess = AccessInfoService.NewAccessModel();
                AccessInfoService.SetSelectedAccess($scope.model.SelectedAccess);
                $("#add-edit-accessinfo-modalview").data("kendoValidator").hideMessages();
                $("#add-edit-accessinfo-modalview").data("kendoMobileModalView").close();
            }, 0, false);
        }

        /**
        * @ngdoc event 
        * @name onSaveAccessDetailsClick
        * @eventOf roundingModule.controller:AddEditAccessInfoController
        * @description       
        ** k-on-tap event of Save button of edit/add access modal view 
        ** Calls AccessInfoService.SavePatientAccessMgmt
        ** Saves Access plan
        ** Calls AccessInfoService.RefreshAccessInfo
        ** Calls $scope.onCancelAccessDetailsClick
        */
        $scope.onSaveAccessDetailsClick = function () {
            try {
                if ($scope.addEditAccessValidator.validate()) {
                    CommonFunctions.Blockui();

                    var ptAccessMgmt = {
                        UID: $scope.model.SelectedAccess.UID,
                        PatientUID: $rootScope.Global.Objects.SelectedPatient.UID,
                        AccessType: $scope.model.SelectedAccess.AccessType,
                        AccessStatus: $scope.model.SelectedAccess.AccessStatus,
                        PlacedDate: CommonFunctions.IsNotNullOrEmpty($scope.model.SelectedAccess.PlacedDate) ? (new Date($scope.model.SelectedAccess.PlacedDate)).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false) : null,
                        ActivateDate: $scope.model.SelectedAccess.AccessStatus === Status.AccessStatus.Active ? (new Date($scope.model.SelectedAccess.ActivateDate)).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false) : null,
                        TermDate: $scope.model.SelectedAccess.AccessStatus === Status.AccessStatus.Termed ? (new Date($scope.model.SelectedAccess.TermDate)).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false) : null,
                        InActiveDate: $scope.model.SelectedAccess.AccessStatus === Status.AccessStatus.InActive ? (new Date($scope.model.SelectedAccess.InActiveDate)).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false) : null,
                        InActiveReason: $scope.model.SelectedAccess.AccessStatus === Status.AccessStatus.InActive ? $scope.model.SelectedAccess.InActiveReason : null,
                        TermReason: $scope.model.SelectedAccess.AccessStatus === Status.AccessStatus.Termed ? $scope.model.SelectedAccess.TermReason : null,
                        LastAccess: $scope.model.SelectedAccess.LastAccess,
                        LastAccessReason: $scope.model.SelectedAccess.LastAccess === true ? $scope.model.SelectedAccess.LastAccessReason : null,
                        Side: $scope.model.SelectedAccess.Side,
                        Region: $scope.model.SelectedAccess.Region,
                        Extremity: $scope.model.SelectedAccess.Extremity,
                        IsIPE: $scope.model.SelectedAccess.IsIPE,
                        BeltLine: $scope.model.SelectedAccess.BeltLine,
                        IsInUseAtEnrollment: $scope.model.SelectedAccess.IsInUseAtEnrollment,
                        DataState: $scope.model.SelectedAccess.UID === 0 ? CommonConstants.DataState.Added : CommonConstants.DataState.Modified
                    }

                    AccessInfoService.SavePatientAccessMgmt($.param(ptAccessMgmt), function (result) {
                        if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                            CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.AccessInfoSaved);
                            AccessInfoService.RefreshAccessInfo();
                            $scope.onCancelAccessDetailsClick();
                        } else {
                            CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.AccessInfoFailed);
                        }
                    });
                }
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "AccessInfo";
                errExp.FunctionName = "onSaveAccessDetailsClick";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
            }
        }
    });
}());
