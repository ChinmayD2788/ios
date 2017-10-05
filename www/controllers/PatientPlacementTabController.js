/**
* @ngdoc service
* @author Mikhail Rakhunov
* @name roundingModule.service:PatientPlacementTabService
* @description 
* @version : 1.0
*/
(function () {
    /**
    * @ngdoc service 
    * @name roundingModule.service:PatientPlacementTabService
    * @description       
    ** PatientPlacementTabService is being used by PatientPlacementTabController
    ** This will be used for all service calls for the Placement Screen
    * @param {object} ServiceConstants
    * Common Constants
    * @param {function} RoundingService
    * Common Function
    */
    angular.module('roundingModule').factory('PatientPlacementTabService', function (ServiceConstants, RoundingService) {
        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientPlacementTabService
        * @name getPlacementProvider
        * @description
        * Retrieve the placement Provider data from service
        * @param {function} ServiceConstants.GetPtContacts
        * ServicePoint.
        * @param {object} $.param(data)
        * Request object
        * @param {string} method
        * Method: POST
        * @param {object} dataType
        * DataType: JSON
        * @param {string} callBack function name
        * Name is "$scope.onGetPlacementProviderRetrieved"
        * @returns {object}
        *  The Placement Provider data
        */

        function getPlacementProvider(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPlacementsProvider, 'POST', 'JSON', $.param(data), callBack, true);
        }
        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientPlacementTabService
        * @name getPlacements
        * @description
        * Retrieve the placements data from service
        * @param {function} ServiceConstants.GetPtContacts
        * ServicePoint.
        * @param {object} data
        * Request object
        * @param {string} method
        * Method: GET
        * @param {object} dataType
        * DataType: JSON
        * @param {string} callBack function name
        * Name is "onGetPlacementsRetrieved"
        * @returns {object}
        *  The Placements data
        */
        function getPlacements(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPlacements, 'GET', 'JSON', data, callBack);
        }
        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientPlacementTabService
        * @name savePlacements
        * @description
        * Send a Save Placements data request to service
        * @param {function} ServiceConstants.SavePlacements
        * ServicePoint
        * @param {string} method
        * Method: POST
        * @param {object} dataType
        * DataType: JSON
        * @param {object} callBack as function argument directly
        *no name"
        * @returns {object}
        *  The result object with status property
        */
        function savePlacements(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.SavePlacements, 'POST', 'JSON', $.param(data), callBack, true);
        }
        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientPlacementTabService
        * @name savePlacementsSelection
        * @description
        * Send a Save Placement Selection data request to service
        * @param {function} ServiceConstants.SavePlacementsSelection
        * ServicePoint.
        * @param {string} method
        * Method: POST
        * @param {string} dataType
        * DataType: JSON.
        * @param {object} $.param(data)
        * Request object.
        * @param {string} callBack function name
        * Name is "$scope.onSavePlacementsSelectionRetrieved"
        * @returns {object}
        *  The result object with status property
        */
        function savePlacementsSelection(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.SavePlacementsSelection, 'POST', 'JSON', $.param(data), callBack, true);
        }
        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientPlacementTabService
        * @name sendFaxAndUpdatePlacementStatus
        * @description
        * Send a Send Fax and Update Placement Status request to service
        * @param {function} ServiceConstants.SendFaxAndUpdatePlacementStatus
        * ServicePoint.
        * @param {string} method
        * Method: POST
        * @param {string} dataType
        * DataType: JSON
        * @param {object} $.param(data)
        * Request object
        * @param {object} callBack as function argument directly
        *no name"
        * @returns {object}
        *  The result object with status property
        */
        function sendFaxAndUpdatePlacementStatus(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.SendFaxAndUpdatePlacementStatus, 'POST', 'JSON', $.param(data), callBack, true);
        }
        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientPlacementTabService
        * @name savePlacementsDetails
        * @description
        * Send a Send Fax and Update Placement Status request to service
        * @param {function} ServiceConstants.SavePlacementDetails
        * ServicePoint
        * @param {string} method
        * Method: POST
        * @param {string} dataType
        * DataType: JSON
        * @param {object} $.param(data)
        * Request object
        * @param {object} callBack as function argument directly
        *no name"
        * @returns {object}
        *  The result object with status property
        */
        function savePlacementsDetails(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.SavePlacementDetails, 'POST', 'JSON', $.param(data), callBack, true);
        }

        return {
            GetPlacementProvider: getPlacementProvider,
            GetPlacements: getPlacements,
            SavePlacements: savePlacements,
            SavePlacementsSelection: savePlacementsSelection,
            SendFaxAndUpdatePlacementStatus: sendFaxAndUpdatePlacementStatus,
            SavePlacementsDetails: savePlacementsDetails
        };
    });
} ());

(function () {
    /**
    * @ngdoc controller
    * @name roundingModule.controller:PatientPlacementTabController
    * @description
    * Controller for  the the Placement Screen
    ** {@link roundingModule.service:PatientPlacementTabService}
    ** VersionOne Requirements -  <a href="https://www13.v1host.com/DaVitaInc/Task.mvc/Summary?oidToken=Task%3A244757">TK-22974</a> AND <a href="https://www13.v1host.com/DaVitaInc/Task.mvc/Summary?oidToken=Task%3A261756">TK-25014</a>
    * @property {object} $scope.SelectedAddress
    * Selected address (Address1, Address2, City, State, Zip) based on which placement screen is loaded. Default value is null
    * @property {string} SelectedAddressText
    * Contains $scope.SelectedAddress in a comma seperated string. Default value is empty string ''
    * @property {integer} $scope.Radius
    * Contains the radius selected from slider. Default value: PlacementConstants.MIN_SELECTED_RADIUS which is 5, max = 100
    * @property {object} $scope.PlcmtMapPatientDetails
    * Contains default radius and the address.
    * @property {boolean} $scope.NoActiveAdmissionRecord
    * Displays map/placement details if there false, If true will display text "No Active Admission"
    * @property {object} $scope.SelPlacementCriteria
    * Sets the current placement criteria from recent selection. Will display DC list and map based on the selected criteria
    * @property {object} GetPlacementsData
    * Contains placement data for the selected admission. It will all the search criterias containg list of DCs or refusal reasons 
    * @property {boolean} $scope.IsPlacementRequired
    * If true, will display the map and the address textbox, If false will display refusalreason
    * @property {string} $scope.PlacementNotRequiredReasonCode
    * Displays refusalreason (lookup value) for placement
    * @property {string} PlacementNotRequiredReasonCodeText
    * Displays refusalreason (lookup text) for placement
    * @property {boolean} $scope.ShowButtons
    * Hides/Displays Recent, Modify SEARCH , SAVE SEARCH, NEW, Edit and Save Selection buttons on top-right section
    * @property {boolean} $scope.ShowSaveSelection
    * Hides/Displays ShowSaveSelection button along with $scope.ShowButtons = true      
    * @property {boolean} $scope.IsNewSearch
    * Displays the listview containing DC list for new search       
    * @property {boolean} $scope.ShowNew
    * Hides/Displays NEW button along with $scope.ShowButtons = true
    * @property {boolean} $scope.ShowEdit
    * Hides/Displays EDIT button along with $scope.ShowButtons = true
    * @property {boolean} $scope.ShowRecentView
    * Displays pop-over containg all previous placement criterias when user clicks on Recent button
    * @property {boolean} $scope.ShowRecent
    * Hides/Displays RECENT button along with $scope.ShowButtons = true
    * @property {boolean} $scope.ShowSaveSearch
    * Hides/Displays SAVE SEARCH button along with $scope.ShowButtons = true
    * @property {boolean} $scope.ShowModifySearch
    * Hides/Displays MODIFY SEARCH button along with $scope.ShowButtons = true   
    * @property {boolean} $scope.ShowSignature
    * Hides/Displays SignaturePad
    * @property {array} $scope.PlacementCriteriasList
    * Contains list of all placement criterias returned from GetPlacements API.     
    * @property {object} $scope.GetPlacementProviderData
    * Contains data returned from GetPlacementProvider API
    * @property {object} $scope.SelectedDC
    * Contains max of 2 DC selected from DC list.These 2 DC will be displayed on fax modal view.
    * @property {boolean}  $scope.ShowMapAddressArea
    * Displays map and address area along with the DC list
    * @property {boolean}  $scope.ShowEditArea
    * Displays address edit section to allow user to edit current the search and update the criteria
    * @property {boolean}  $scope.MapAreaDisabled
    * Disables/grays out the map for edit, recent and other functionality
    * @property {object} $scope.SelDCForApproveDecline
    * Contains the selected DC which was approved/declined      
    * @property {object} $scope.SelectedDCIndexForFax
    * Contains the index of the DC selected from the fax modal-view
    * @property {object} $scope.FaxReportType
    * Contains the report type which user selects from fax modal-view (ClinicalReport, QAReport, SBARReport) 
    * @property {string} $scope.Faxnum
    * Contains the fax number from the fax modal-view
    * @property {boolean} $scope.SelectFacilityValidationVisible
    * Displays kendo validator for "required" field for "Reason patient chose facility"
    * @property {boolean} $scope.SelectDeclineReasonValidationVisible
    * Displays kendo validator for "required" field for "Reason For Decline"
    * @property {boolean} $scope.ShowNoDCFoundMsg
    * Displays a message "No DC found" when there is no matching DC within the search criteria
    * @property {boolean} $scope.SaveButtonVisible
    * Hides/Displays SAVE button on fax modal-view 
    * @property {object} $scope.DateProviderApprovedPatientConfig
    * Default values min: new Date(), max: new Date(), value: new Date()    
    */
    angular.module('roundingModule').controller('PatientPlacementTabController', function ($scope, $rootScope, $sce, $http, $timeout, LookUp, CommonConstants,
                                                                                           LookupTypes, Status, ServiceConstants, ThirdPartyService, RoundingService, PlacementConstants, PatientPlacementTabService,
                                                                                           ExceptionService, CommonFunctions, CommonMessages, Configuration, FaxRequestType, FaxSubRequestType, FaxAutomationConstants) {
        LookUp.GetLookUp(LookupTypes.State);
        LookUp.GetLookUp(LookupTypes.PlacementNotRequiredReason);
        LookUp.GetLookUp(LookupTypes.ProviderDeclinedReason);
        LookUp.GetLookUp(LookupTypes.PtChoseFacilityReason);
        LookUp.GetLookUp(LookupTypes.PlacementDelayReason);

        $scope.SelectedAddress = null;
        $scope.SelectedAddressText = '';
        $scope.Radius = PlacementConstants.MIN_SELECTED_RADIUS;
        $scope.PlcmtMapPatientDetails = null;
        $scope.IsTextQuery = false;
        $scope.NoActiveAdmissionRecord = false;
        $scope.SelPlacementCriteria = null;
        $scope.GetPlacementsData = null;

        $scope.IsPlacementRequired = false;
        $scope.PlacementNotRequiredReasonCode = ""
        $scope.PlacementNotRequiredReasonCodeText = "";
        $scope.ShowButtons = false;
        $scope.ShowSaveSelection = false;
        $scope.IsNewSearch = false;
        $scope.ShowNew = false;
        $scope.ShowEdit = false;
        $scope.ShowRecentView = false;
        $scope.ShowRecent = false;
        $scope.ShowSaveSearch = false;
        $scope.ShowModifySearch = false;
        $scope.ShowSignature = false;
        $scope.PlacementCriteriasList = [];
        $scope.GetPlacementProviderData = null;
        $scope.SelectedDC = null;
        $scope.ShowMapAddressArea = false;
        $scope.ShowEditArea = false;
        $scope.MapAreaDisabled = false;
        $scope.SelDCForApproveDecline = null;
        $scope.SelectedDCIndexForFax = null;
        $scope.FaxReportType = null;
        $scope.Faxnum = '';
        $scope.SelectFacilityValidationVisible = false;
        $scope.SelectDeclineReasonValidationVisible = false;
        $scope.ReasonPtChoseFacilityLookup = [];
        $scope.PlacementDelayReasonLookup = [];
        $scope.ProviderDeclinedReasonLookup = [];
        $scope.StateLookup = [];
        $scope.PlacementNotRequiredLookup = [];
        $scope.ShowNoDCFoundMsg = false;
        $scope.SaveButtonVisible = false;
        $scope.DateProviderApprovedPatientConfig = {
            min: new Date(),
            max: new Date(),
            value: new Date()
        };
        $scope.ApproveDeclineCounter = 0;
        $scope.ApproveDeclineCountTobeCompared = 0;

        /**
        * @ngdoc method
        * @name returnDate
        * @methodOf roundingModule.controller:PatientPlacementTabController
        * @description
        * Converts string date format to Date object.
        * @returns {object} Date
        * Capella format date
        */
        var returnDate = function (stringDateToCheck) {
            if (!stringDateToCheck) {
                return (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false);
            } else {
                return new Date(stringDateToCheck).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false);
            }
        }
        /**
        * @ngdoc method
        * @name $scope.show 
        * @methodOf roundingModule.controller:PatientPlacementTabController
        * @description
        * Used to load/relaod placement tab upon navigation.
        */
        $scope.show = function () {

            try {
                if ($rootScope.Global.Objects.SelectedPatient.Admission === null || $rootScope.Global.Objects.SelectedPatient.Admission === undefined) {
                    $scope.NoActiveAdmissionRecord = true;
                }
                else {
                    $scope.NoActiveAdmissionRecord = false;
                    $scope.SelectedAddress = $rootScope.Global.Objects.SelectedPatient.Address;
                    $scope.SelectedAddressText = getCommaSeperatedAddress($scope.SelectedAddress);

                    $scope.ShowMapAddressArea = false;
                    $scope.PlacementNotRequiredLookup = LookUp.GetLookUp(LookupTypes.PlacementNotRequiredReason);

                    //SignaturePad items
                    $(".sigPad").signaturePad({ drawOnly: true, lineTop: 110, lineMargin: 5, validateFields: true, errorMessageDraw: "Please sign the document" });

                    var signButton = $("#plcmnt-clearselection-button").data("kendoMobileButton");
                    if (signButton !== undefined) {
                        signButton.destroy();
                    }
                    $("#plcmnt-clearselection-button").kendoMobileButton({
                        click: $scope.clearSignaturePadSelection,
                        align: "left"
                    });

                    signButton = $("#plcmnt-confirmselection-button").data("kendoMobileButton");
                    if (signButton !== undefined) {
                        signButton.destroy();
                    }
                    $("#plcmnt-confirmselection-button").kendoMobileButton({
                        click: $scope.confirmSignaturePadSelection,
                        align: "right"
                    });

                    $scope.StateLookup = {
                        dataTextField: "Text",
                        dataValueField: "Value",
                        dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.State), "IsShownUI", true)
                    };

                    $scope.PlcmtMapPatientDetails = {
                        MaxRadius: $scope.Radius,
                        Address: {
                            Address1: '1320 Johnson Dr',
                            City: 'Buffalo Grove',
                            County: '',
                            StateCode: 'IL',
                            Zip: '60089',
                            Longitude: '',
                            Latitude: ''
                        }
                    };

                    getPlacements();

                    var hgt = $rootScope.Global.Objects.DeviceHeight - 150;
                    $("#plcmnt-dc-listview-container").css({ "height": hgt.toString() + "px" });
                    $("#plcmnt-map").css({ "height": hgt.toString() + "px" });
                    return true;
                }
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "Placement";
                errExp.FunctionName = "show";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                return false;
            }
        }
        /**
        * @ngdoc method
        * @name getPlacements 
        * @methodOf roundingModule.controller:PatientPlacementTabController
        * @description
        * Calls GetPlacements API to load already saved placement information
        */
        getPlacements = function () {
            CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
            var getPlacementsparam = { harUID: $rootScope.Global.Objects.SelectedPatient.Admission ? $rootScope.Global.Objects.SelectedPatient.Admission.UID : null, ptUID: $rootScope.Global.Objects.SelectedPatient.UID };
            PatientPlacementTabService.GetPlacements(getPlacementsparam, onGetPlacementsRetrieved);
        }

        /**
        * @ngdoc method
        * @name onGetPlacementsRetrieved 
        * @methodOf roundingModule.controller:PatientPlacementTabController
        * @description
        * callBack to get Placements data from API
        */
        onGetPlacementsRetrieved = function (resdata) {
            try {
                if (resdata.resultstatus === Status.ServiceCallStatus.Success && resdata.data && resdata.data.Placements) {
                    if (resdata.data.Placements.length > 0) {
                        var indexProperty = { "Index": 0 }
                        var selected = { "Selected": false }
                        var selectedVisible = { "SelectedVisible": false }
                        var approveddeclinedcount = 0;
                        var choosencount = 0;

                        $scope.GetPlacementsData = resdata.data;
                        $scope.PlacementCriteriasList = [];
                        if (resdata.data.Placements[0].PlacementNotRequiredReasonCode) {
                            $scope.IsPlacementRequired = true;
                            $scope.PlacementNotRequiredReasonCode = resdata.data.Placements[0].PlacementNotRequiredReasonCode;
                            $scope.PlacementNotRequiredReasonCodeText = LookUp.GetValueByKey(LookupTypes.PlacementNotRequiredReason, resdata.data.Placements[0].PlacementNotRequiredReasonCode).Text;
                        } else if (resdata.data.Placements[0].PlacementCrietrias && resdata.data.Placements[0].PlacementCrietrias.length > 0) {
                            $scope.SelPlacementCriteria = resdata.data.Placements[0].PlacementCrietrias[0];
                            $scope.Radius = $scope.SelPlacementCriteria.SearchRadius;
                            $($scope.GetPlacementsData.Placements[0].PlacementCrietrias).each(function (key, data) {
                                if (key === 0) {
                                    $.extend(data, { SelectedPlacement: data.UID });
                                } else {
                                    $.extend(data, { SelectedPlacement: "" });
                                }

                                var j = 1;
                                $(data.PlacementDetails).each(function (mainindex, detail) {
                                    $.extend(detail, indexProperty);
                                    $.extend(detail, selected);
                                    $.extend(detail, selectedVisible);

                                    detail.Index = j;
                                });
                            });

                            $scope.LastPlacementSaveDatetime = CommonFunctions.DateFunctions.dateFormat(CommonFunctions.DateFunctions.parseDate($scope.SelPlacementCriteria.Date), "mm/dd/yy h:MM TT") + " PST";

                            $scope.IsPlacementRequired = false;
                            $scope.ShowMapAddressArea = true;
                            $scope.PlacementCriteriasList = $scope.SelPlacementCriteria.PlacementDetails;
                            $scope.ShowButtons = true;
                            $scope.ShowSaveSearch = false;
                            var i = 1;

                            //logic for hiding and showing buttons of approved, declined, select etc. 
                            $($scope.PlacementCriteriasList).each(function (mainindex, data) {
                                if (data.Status === PlacementConstants.APPROVED_BY_FACILITY_STATUS
                                    || data.Status === PlacementConstants.DECLINED_BY_FACILITY_STATUS
                                    || data.Status === PlacementConstants.FAX_SENT_TO_PROVIDER_STATUS
                                    || data.Status === PlacementConstants.CHOSEN_BY_PATIENT_STATUS) {
                                    approveddeclinedcount++;
                                }

                                if (!data.DateProviderApprovedPatient && !data.ProviderDeclinedPatientDate
                                    && data.Status !== PlacementConstants.PRESENTED_TO_PATIENT_STATUS) {
                                    choosencount++;
                                }
                            });

                            $($scope.PlacementCriteriasList).each(function (mainindex, data) {
                                if (approveddeclinedcount >= 1) {
                                    selectedVisible.SelectedVisible = false;
                                } else if (data.Status === PlacementConstants.APPROVED_BY_FACILITY_STATUS
                                           || data.Status === PlacementConstants.DECLINED_BY_FACILITY_STATUS
                                           || data.Status === PlacementConstants.FAX_SENT_TO_PROVIDER_STATUS
                                           || data.Status === PlacementConstants.CHOSEN_BY_PATIENT_STATUS) {
                                    selectedVisible.SelectedVisible = false;
                                    selected.Selected = true;
                                } else {
                                    selectedVisible.SelectedVisible = true;
                                }

                                $.extend(data, indexProperty);
                                $.extend(data, selected);
                                $.extend(data, selectedVisible);
                                $.extend(data, { "IsDeclineClicked": false });
                                $.extend(data, { "IsApproveClicked": false });

                                data.Index = i;
                                i = i + 1;
                                $(data.Provider.ProviderAddress).each(function (index, dataaddress) {
                                    if (dataaddress.IsPrimary) {
                                        $.extend(data, { 'latlng': [dataaddress.Latitude, dataaddress.Longitude] });
                                    }
                                });
                            });
                            $scope.SelectedAddress = $scope.SelPlacementCriteria.Address;
                            $scope.SelectedAddressText = getCommaSeperatedAddress($scope.SelectedAddress);
                            $scope.showMap(true);

                            $timeout(function () {
                                if (approveddeclinedcount <= 2 && choosencount !== 0) {
                                    $scope.ShowNew = false;
                                    $scope.ShowRecent = false;
                                } else {
                                    $scope.ShowNew = true;
                                    $scope.ShowRecent = true;
                                }
                                $scope.ShowSaveSearch = false;
                                $scope.ShowSaveSelection = false;
                                $scope.ShowEdit = false;
                                $scope.IsNewSearch = false;
                                $scope.ShowModifySearch = false;
                                $scope.NoActiveAdmissionRecord = false;
                                $scope.ApproveDeclineCounter = 0;
                                $scope.ApproveDeclineCountTobeCompared = choosencount;
                                CommonFunctions.CreateScroller("plcmnt-dc-listview-container");
                            }, 1000, true);
                        }


                    } else {
                        $scope.IsPlacementRequired = true;
                        $scope.ShowMapAddressArea = false;
                    }
                    CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
                }
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "Placement";
                errExp.FunctionName = "onGetPlacementsRetrieved";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            }
        }
        /**
        * @ngdoc event
        * @name $scope.changePlacementCriteria 
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** ng-click event of input type radio
        ** Changes the selected placement criteria from the dataItem and displays map corresponding to the criteria
        * @param {object} dataItem
        * Requested $scope properties changes
        */
        $scope.changePlacementCriteria = function (dataItem) {
            $scope.PlacementCriteriasList = dataItem.PlacementDetails;
            $scope.SelectedAddress = dataItem.Address;
            $scope.SelectedAddressText = getCommaSeperatedAddress($scope.SelectedAddress);
            $scope.showMap(true);
            CommonFunctions.CreateScroller("plcmnt-dc-listview-container");
        }
        /**
        * @ngdoc event
        * @name $scope.savePlacementsData 
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** k-on-tap event of kendo mobile save search button
        ** Calls SavePlacementsAPI to save the data
        */
        $scope.savePlacementsData = function () {
            try {
                CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
                var placementDetails = [];
                for (var i = 0, len = $scope.DCListPvdInfo.length; i < len; i++) {
                    for (var j = 0, lenc = $scope.DCListPvdInfo[i].ProviderAddress.length; j < lenc; j++) {
                        placementDetails.push({
                            DataState: CommonConstants.DataState.Added,
                            Provider: $scope.DCListPvdInfo[i],
                            Status: PlacementConstants.PRESENTED_TO_PATIENT_STATUS,
                            ProviderDetail: {
                                DataState: CommonConstants.DataState.Added,
                                ProviderUID: $scope.DCListPvdInfo[i].UID,
                                Distance: $scope.DCListPvdInfo[i].ProviderAddress[j].Distance,
                                AddressUID: $scope.DCListPvdInfo[i].ProviderAddress[j].UID
                            }
                        });
                    }
                }

                var uid = 0;
                if ($scope.GetPlacementsData && $scope.GetPlacementsData.Placements && $scope.GetPlacementsData.Placements[0]) {
                    uid = $scope.GetPlacementsData.Placements[0].UID;
                }

                var name = 'In ' + $scope.Radius + ' Mi Near ' + ($scope.GetPlacementProviderData.Address.Zip === null ? $scope.GetPlacementProviderData.Address.City + ', ' + $scope.GetPlacementProviderData.Address.StateCode : $scope.GetPlacementProviderData.Address.Zip) + '; On ' + (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + new Date().getFullYear();
                var savePlacementsParam = {
                    UID: uid,
                    DataState: uid === 0 ? CommonConstants.DataState.Added : CommonConstants.DataState.Modified,
                    PatientUID: $rootScope.Global.Objects.SelectedPatient.UID,
                    Date: (new Date()).toJSONLocal(),
                    HARUID: $rootScope.Global.Objects.SelectedPatient.Admission ? $rootScope.Global.Objects.SelectedPatient.Admission.UID : null,
                    IsPlacementRequired: true,
                    PlacementCrietrias: [{
                        DataState: CommonConstants.DataState.Added,
                        Date: (new Date()).toJSONLocal(),
                        Name: name,
                        SearchRadius: $scope.Radius,
                        Address: $scope.GetPlacementProviderData.Address,
                        PlacementDetails: placementDetails
                    }
                    ]
                };

                PatientPlacementTabService.SavePlacements(savePlacementsParam, function (resdata) {
                    if (resdata.resultstatus === Status.ServiceCallStatus.Success) {
                        onGetPlacementsRetrieved(resdata);
                    }
                    CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
                });
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "Placement";
                errExp.FunctionName = "savePlacementsData";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            }
        }
        /**
        * @ngdoc event
        * @name $scope.openPlacementNotReqdModal 
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        * Opens the Placement Not Required modal window
        */
        $scope.openPlacementNotReqdModal = function () {
            $("#plcmnt-notreqd-modalview").data("kendoMobileModalView").open();
        }

        /**
        * @ngdoc event
        * @name $scope.closePlacementNotReqdModal 
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** ng-click event of kendo mobile Cancel button
        ** Closing the Placement Not Required modal window
        */
        $scope.closePlacementNotReqdModal = function () {
            $("#plcmnt-notreqd-modalview").data("kendoMobileModalView").close();
        }

        /**
        * @ngdoc event
        * @name $scope.plcmntNotReqdSelected 
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** ng-click event of input type radio
        ** Assigning value to $scope.PlacementNotRequiredReasonCode variable.
        * @param {object} dataItem
        * assigning dataItem.Value (string) 
        */
        $scope.plcmntNotReqdSelected = function (dataItem) {
            $scope.PlacementNotRequiredReasonCode = dataItem.Value;
        }
        /**
        * @ngdoc event
        * @name $scope.savePlacementNotReqd 
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** ng-click event of kendo mobile save button
        ** Calls SavePlacements API to send the placement not required details.
        */
        $scope.savePlacementNotReqd = function () {
            try {
                CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
                var placementData = {
                    DataState: $scope.GetPlacementsData && $scope.GetPlacementsData.Placements && $scope.GetPlacementsData.Placements[0].UID > 0 ? CommonConstants.DataState.Modified : CommonConstants.DataState.Added,
                    UID: $scope.GetPlacementsData && $scope.GetPlacementsData.Placements && $scope.GetPlacementsData.Placements[0].UID > 0 ? $scope.GetPlacementsData.Placements[0].UID : 0,
                    PatientUID: $rootScope.Global.Objects.SelectedPatient.UID,
                    Date: (new Date()).toJSONLocal(),
                    IsPlacementRequired: $scope.PlacementNotRequiredReasonCode === "" ? true : false,
                    PlacementNotRequiredReasonCode: $scope.PlacementNotRequiredReasonCode,
                    HARUID: $rootScope.Global.Objects.SelectedPatient.Admission.UID
                }

                PatientPlacementTabService.SavePlacements(placementData, function (resdata) {
                    if (resdata.resultstatus === Status.ServiceCallStatus.Success && resdata.data) {
                        $scope.IsPlacementRequired = true;
                        $scope.GetPlacementsData = resdata.data;
                        $scope.PlacementNotRequiredReasonCode = resdata.data.Placements[0].PlacementNotRequiredReasonCode;
                        $scope.PlacementNotRequiredReasonCodeText = LookUp.GetValueByKey(LookupTypes.PlacementNotRequiredReason, resdata.data.Placements[0].PlacementNotRequiredReasonCode).Text;
                        $scope.closePlacementNotReqdModal();
                    }
                    CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
                });
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "Placement";
                errExp.FunctionName = "savePlacementNotReqd";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            }
        }
        //placement not required ends

        /**
        * @ngdoc event
        * @name $scope.faxSendManually 
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** k-on-tap event of kendo mobile save button
        ** Called when FaxSentManually checkbox is selected and calls SavePlacementsDetails API passing the last fax sent date
        */
        $scope.faxSendManually = function () {
            try {
                if ($scope.modalFaxDateValidator.validate()) {
                    CommonFunctions.Blockui();
                    var isSuccess = false;
                    for (var i = 0; i < $scope.SelectedDC.length; i++) {
                        var selectedDC = $scope.SelectedDC[i];

                        if (!selectedDC.CheckBoxChecked) {
                            continue;
                        }

                        var lastFaxSentDate = returnDate(selectedDC.LastFaxSentDate);
                        var datePtChoseProvider = returnDate(selectedDC.DatePtChoseProvider);
                        var request = {
                            UID: selectedDC.UID,
                            LastFaxSentDate: lastFaxSentDate,
                            DatePtChoseProvider: datePtChoseProvider,
                            IsFaxSentManually: true,
                            Status: PlacementConstants.FAX_SENT_TO_PROVIDER_STATUS,
                            ProviderDetail: {
                                ProviderUID: selectedDC.Provider.UID,
                                Distance: selectedDC.Provider.ProviderDistance,
                                AddressUID: selectedDC.Provider.ProviderAddress[0].UID
                            }
                        };

                        PatientPlacementTabService.SavePlacementsDetails(request, function (result) {
                            if (result.resultstatus === Status.ServiceCallStatus.Success) {
                                isSuccess = true;
                            }
                        });
                    }
                    if (isSuccess) {
                        CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.PlacementApproveSaved);
                    }
                    CommonFunctions.Unblockui();
                    $scope.closePlacementSelection();
                }
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "Placement";
                errExp.FunctionName = "faxSendManually";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                CommonFunctions.Unblockui();
            }
        };

        /**
        * @ngdoc event
        * @name $scope.faxPreview 
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @param {integer} index 
        * Selected index for Fax
        * @param {string} reportType 
        * Fax report type
        * @description 
        ** k-on-tap event of kendo preview button
        ** Gets the fax number from primary provider address and renders the pdf view 
        */
        $scope.faxPreview = function (index, reportType) {
            try {
                if (reportType === "") {
                    return;
                }
                CommonFunctions.Blockui();
                $scope.SelectedDCIndexForFax = index;
                var providerVal = CommonFunctions.Find($scope.SelectedDC[index].Provider.ProviderAddress, "IsPrimary", true);

                $scope.FaxReportType = reportType;

                if (providerVal.length > 0) {
                    if (providerVal[0].Phones.length > 0) {
                        var faxval = CommonFunctions.Find(providerVal[0].Phones, "Type", "F");
                        $scope.Faxnum = faxval.length > 0 ? CommonFunctions.StripAlphaChars(faxval[0].PhoneNumber) : "";
                    }
                }

                var url = Configuration.GetServiceUrl() + ServiceConstants.GetReportDocument + '?reportType=' + $scope.FaxReportType +
                          '&SecureToken=' + $rootScope.Global.Objects.SessionDetails.Token +
                          '&patientUID=' + $rootScope.Global.Objects.SelectedPatient.UID +
                          '&harUid=' + $rootScope.Global.Objects.SelectedPatient.Admission.UID + '&pr=Y' +
                          '&UserId=' + $rootScope.Global.Objects.CurrentUser.UID + '&faxNo=' + $scope.Faxnum +
                          '&faxAttention=' + $scope.SelectedDC[index].Provider.Name;

                $("#fax-pdf-holder").html("");
                $scope.renderPDF(url, document.getElementById('fax-pdf-holder'));
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "Placement";
                errExp.FunctionName = "faxPreview";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                CommonFunctions.Unblockui();
            }
        }

        /**
        * @ngdoc method
        * @name $scope.renderPDF 
        * @methodOf roundingModule.controller:PatientPlacementTabController
        * @param {string} url 
        * PDF url
        * @param {object} canvasContainer 
        * Canvas handler 
        * @param {object} options 
        * Canvas options 
        * @description
        * Renders pdf document to HTML5 Canvas. Displays reports in modal-view
        */
        
        $scope.renderPDF = function (url, canvasContainer, options) {
            var options = options || { scale: 1.2 };

            function renderPage(page) {
                var viewport = page.getViewport(options.scale);
                var canvas = document.createElement('canvas');
                var ctx = canvas.getContext('2d');
                var renderContext = {
                    canvasContext: ctx,
                    viewport: viewport
                };

                canvas.height = viewport.height;
                canvas.width = viewport.width - 1;
                $(canvas).addClass('fax-preview-canvas');
                canvasContainer.appendChild(canvas);

                page.render(renderContext).promise.then(function () {
                    $("#plcmnt-modal-selection").data("kendoMobileModalView").close();
                    $("#faxpreview-modalview").data("kendoMobileModalView").open();
                    CommonFunctions.Unblockui();
                });
            }

            function renderPages(pdfDoc) {
                for (var num = 1; num <= pdfDoc.numPages; num++)
                    pdfDoc.getPage(num).then(renderPage);
            }

            PDFJS.disableWorker = true;
            PDFJS.getDocument(url).then(renderPages);
        }

        /**
        * @ngdoc event
        * @name $scope.sendFax 
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @param {object} e 
        * DOM event object
        * @description
        ** k-on-openPlacementNotReqdModal event of kendo mobile send fax button
        ** Calls the SendFaxAndUpdatePlacementStatus API to send fax request and update the status of placement.
        */
        $scope.sendFax = function (e) {
            try {
                CommonFunctions.Blockui();
                var selectedDC = $scope.SelectedDC[$scope.SelectedDCIndexForFax];
                var subRequestType = FaxSubRequestType.ClinicalDocument;

                if ($scope.FaxReportType === ServiceConstants.ClinicalReport) {
                    subRequestType = FaxSubRequestType.ClinicalDocument;
                } else if ($scope.FaxReportType === ServiceConstants.QAReport) {
                    subRequestType = FaxSubRequestType.QAReport;
                } else if ($scope.FaxReportType === ServiceConstants.SBARReport) {
                    subRequestType = FaxSubRequestType.SBARReport;
                }

                var request = {
                    placementDetailsData: {
                        UID: selectedDC.UID,
                        LastFaxSentDate: returnDate(selectedDC.LastFaxSentDate),
                        DatePtChoseProvider: returnDate(selectedDC.DatePtChoseProvider),
                        IsFaxSentManually: false,
                        Status: PlacementConstants.FAX_SENT_TO_PROVIDER_STATUS,
                        ProviderDetail: {
                            ProviderUID: selectedDC.Provider.UID,
                            Distance: selectedDC.Provider.ProviderDistance,
                            AddressUID: selectedDC.Provider.ProviderAddress[0].UID
                        }
                    },
                    PatientUID: $rootScope.Global.Objects.SelectedPatient.UID,
                    HarUID: $rootScope.Global.Objects.SelectedPatient.Admission.UID,
                    Type: $scope.FaxReportType,
                    OutBoundFaxData: {
                        OutboundFaxRequest: {
                            PatientUID: $rootScope.Global.Objects.SelectedPatient.UID,
                            RequestDate: (new Date()).toJSONLocal(),
                            RequestType: FaxRequestType.Report,
                            SubRequestType: subRequestType,
                            FaxNumber: $scope.Faxnum,
                            FaxAddressedTo: selectedDC.Provider.Name
                        },
                        Mode: FaxAutomationConstants.FaxRequestPreview,
                        ProviderUID: selectedDC.Provider.UID
                    }
                };

                PatientPlacementTabService.SendFaxAndUpdatePlacementStatus(request, function (result) {
                    if (result.resultstatus === Status.ServiceCallStatus.Success) {
                        CommonFunctions.DisplayAlertMessage(CommonMessages.BusyMessages.PlacementFaxSent);
                        selectedDC.LastFaxSentDate = result.data.PtPlacementDetail[0].LastFaxSentDate;
                        selectedDC.Status = result.data.PtPlacementDetail[0].Status;
                        $scope.closeFaxPreviewWindow();
                    }
                    CommonFunctions.Unblockui();
                });
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "PlacementTab";
                errExp.FunctionName = "sendFax";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                CommonFunctions.Unblockui();
            }
        }

        /**
        * @ngdoc event
        * @name $scope.closeFaxPreviewWindow 
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description 
        ** k-on-tap event of kendo mobile Cancel button
        ** Closing the Fax Preview Window.
        */
        $scope.closeFaxPreviewWindow = function () {
            $("#faxpreview-modalview").data("kendoMobileModalView").close();
            $("#plcmnt-modal-selection").data("kendoMobileModalView").open();
        }
        
        /**
        * @ngdoc method
        * @name getCommaSeperatedAddress
        * @methodOf roundingModule.controller:PatientPlacementTabController
        * @description
        * Returns the full address separated by comma.
        * @param {object} address
        * address object
        * @returns {string} newAddress 
        */
        getCommaSeperatedAddress = function (address) {
            var newAddress = '';
            if (address) {
                newAddress = (CommonFunctions.IsNotNullOrEmpty(address.Address1) ? (address.Address1 + ", ") : "") +
                             (CommonFunctions.IsNotNullOrEmpty(address.Address2) ? (address.Address2 + ", ") : "") +
                             (CommonFunctions.IsNotNullOrEmpty(address.City) ? (address.City + ", ") : "") +
                             (CommonFunctions.IsNotNullOrEmpty(address.StateCode) ? (address.StateCode + " ") : "") +
                             (CommonFunctions.IsNotNullOrEmpty(address.Zip) ? (address.Zip + " ") : "");
            }
            return newAddress;
        }

        /**
        * @ngdoc event
        * @name $scope.searchDCfromAddress
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** ng-click event of kendo mobile search button
        ** searching for DC from Address
        * @param {object} address
        *  address object
        */
        $scope.searchDCfromAddress = function () {
            $scope.IsTextQuery = true;
            $scope.getLatLanValByAddress($scope.SelectedAddressText, true);
        }


        /**
        * @ngdoc method
        * @name $scope.getLatLanValByAddress
        * @methodOf roundingModule.controller:PatientPlacementTabController
        * @description
        *  This function is used to get coordinates using bing API
        * @param {object} selectedAddress
        *  address object
        * @param {boolean} flag
        *  This argument is not using now
        */
        $scope.getLatLanValByAddress = function (selectedAddress, flag) {
            try {
                CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
                ThirdPartyService.BingService(selectedAddress, $scope.IsTextQuery, $scope.bingDataRetrieved, 'json', "GET", 0);
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = CommonMessages.Alert.BingMapService + "," + ex.message;
                errExp.ModuleName = "Placement";
                errExp.FunctionName = "getLatLanValByAddress";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            }
        }

        /**
        * @ngdoc method
        * @name $scope.bingDataRetrieved
        * @methodOf roundingModule.controller:PatientPlacementTabController
        * @description
        *  This function is used to get coordinates using BING API
        * @param {object} resdata
        *  Result object
	
        */
        $scope.bingDataRetrieved = function (resdata) {
            if (resdata.resultstatus === Status.ServiceCallStatus.Success) {
                $scope.NewAddress = resdata.data.resources[0];

                updateAddressValue($scope.NewAddress);
                $scope.SelectedAddress.Latitude = $scope.PlcmtMapPatientDetails.Address.Latitude;
                $scope.SelectedAddress.Longitude = $scope.PlcmtMapPatientDetails.Address.Longitude;

                $scope.updateAddress($scope.NewAddress);
                $scope.IsAddressValidated = true;
            } else if (resdata.resultstatus === Status.ServiceCallStatus.Error && resdata.errormessage === PlacementConstants.MapError.MoreAddress) {
                $timeout(function () {
                    $scope.NewAddress = resdata.data;

                    if ($scope.IsTextQuery === true) {
                        $scope.OldAddress = [{
                            MaxRadius: "",
                            Address: {
                                Address1: resdata.searchaddress,
                                City: "",
                                StateCode: "",
                                Zip: "",
                                Longitude: "",
                                Latitude: "",
                                Radius: ""
                            }
                        }
                        ];
                    }
                    $scope.plcmtViewAddressValidation();
                }, 1000, true);
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            } else if (resdata.resultstatus === Status.ServiceCallStatus.Error && resdata.errormessage === PlacementConstants.MapError.NoZipCode) {
                $scope.NewAddress = resdata.data.resources[0];
                updateAddressValue($scope.NewAddress);
                $scope.IsAddressValidated = false;
                $scope.ShowButtons = false;
                CommonFunctions.OpenAlertBox('Alert', [{ message: CommonMessages.Alert.MapSearchProblem}], null);
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            } else {
                $scope.ShowButtons = false;
                CommonFunctions.OpenAlertBox('Alert', [{ message: CommonMessages.Alert.MapSearchProblem}], null);
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            }
        }

        /**
        * @ngdoc method
        * @name onGetPlacementProviderRetrieved
        * @methodOf roundingModule.controller:PatientPlacementTabController
        * @description
        * Callback for GetPlacementProvider API
        * @param {object} resdata
        * Result object
        */
        $scope.onGetPlacementProviderRetrieved = function (resdata) {
            try {
                if (resdata.resultstatus === Status.ServiceCallStatus.Success) {
                    $("#plcmnt-dclist-map-container").fadeTo("slow", 100);
                    $scope.DCListPvdInfo = resdata.data.Provider;
                    $scope.GetPlacementProviderData = resdata.data;
                    $scope.DCListPvdInfo.sort(function (a, b) {
                        return a.ProviderAddress[0].Distance - b.ProviderAddress[0].Distance
                    });

                    var i = 1;
                    var indexProperty = { "Index": 0 }
                    $($scope.DCListPvdInfo).each(function (mainindex, data) {
                        $.extend(data, indexProperty);
                        data.Index = i;
                        i = i + 1;
                        $(data.ProviderAddress).each(function (index, dataaddress) {
                            if (dataaddress.IsPrimary) {
                                $.extend(data, { 'latlng': [dataaddress.Latitude, dataaddress.Longitude] });
                            }
                        });
                    });

                    if ($scope.DCListPvdInfo.length === 0) {
                        $scope.ShowNoDCFoundMsg = true;
                        $scope.ShowSaveSearch = false;

                    } else {
                        $scope.ShowNoDCFoundMsg = false;
                        $scope.ShowSaveSearch = true;
                    }

                    $scope.ShowNew = false;
                    $scope.showMap(false);
                    $scope.IsPlacementRequired = false;
                    $scope.ShowMapAddressArea = true;
                    $scope.IsNewSearch = true;
                    $scope.ShowEditArea = false;
                    $scope.MapAreaDisabled = false;
                    $scope.ShowButtons = true;
                    $scope.ShowModifySearch = true;
                    CommonFunctions.CreateScroller("plcmnt-dc-listview-container");
                }
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "Placement";
                errExp.FunctionName = "onGetplacementproviderdata";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            }
        }


        /**
        * @ngdoc event
        * @name $scope.cancelEdit
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        * k-on-tap event of kendo mobile Cancel button. 
        ** Resets the buttons and the map
        * @param {object} dataItem
        * Placement object (This argument is not using in the view)
        */

        $scope.cancelEdit = function (dataItem) {
            $scope.ShowEditArea = false;
            $scope.MapAreaDisabled = false;
            $scope.ShowButtons = true;
            $("#plcmnt-dclist-map-container").fadeTo("slow", 100);
        }

        /**
        * @ngdoc event
        * @name  $scope.searchDCfromNewAddress
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** k-on-tap event of kendo mobile search button
        ** This function is triggered when the user clicks Search button
        */
        $scope.searchDCfromNewAddress = function () {
            $scope.IsTextQuery = false;
            $scope.Radius = parseInt($('.k-draghandle').attr('aria-valuenow'));
            $scope.getLatLanValByAddress($scope.SelectedAddress, false);
        }

        /**
        * @ngdoc event
        * @name $scope.showRecent
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** k-on-tap event of kendo mobile recent button
        ** This function is triggered when the user clicks Recent button
        */
        $scope.showRecent = function () {
            if ($scope.ShowRecentView === true) {
                $scope.ShowRecentView = false;
                $scope.MapAreaDisabled = false;
                $("#plcmnt-dclist-map-container").fadeTo("slow", 100);
            } else {
                $scope.ShowRecentView = true;
                $scope.MapAreaDisabled = true;
                $("#plcmnt-dclist-map-container").fadeTo("slow", 0.15);
            }
        }
        /**
        * @ngdoc event
        * @name $scope.showEdit
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** k-on-tap event of kendo  mobile button
        ** This function is triggered when the user clicks Modify SEARCH  or NEW or EDIT buttons
        * @param {object} dataItem
        *  Placement object. (This argument is not using in the view)
        */
        $scope.showEdit = function (dataItem) {
            $("#plcmnt-dclist-map-container").fadeTo("slow", 0.15);
            $scope.ShowButtons = false;
            $(".masked-zip").mask("99999");
            $scope.ShowEditArea = true;
            $scope.MapAreaDisabled = true;
            $scope.ShowRecentView = false;
            if ($scope.Radius === PlacementConstants.MIN_SELECTED_RADIUS) {
                $('.k-slider-selection').css('width', '0px');
                $('.k-draghandle').attr('aria-valuenow', $scope.Radius);
                $('.k-draghandle').attr('aria-valuetext', $scope.Radius);
                $('.k-draghandle').css('left', '-9px');
            }
        }
        /**
        * @ngdoc event
        * @name $scope.selectPlacement
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        * k-on-tap event of kendo mobile select placement button
        * @param {object} dataItem
        *  Placement object (This argument is not using in the view)
        */
        $scope.selectPlacement = function (dataItem) {
            var selectedCount = 0;
            if (!$scope.SelectedDC) {
                $scope.SelectedDC = [];
            }

            $($scope.PlacementCriteriasList).each(function (mainindex, data) {
                if (data.Selected) {
                    selectedCount++;
                }
            });

            $($scope.PlacementCriteriasList).each(function (mainindex, data) {
                if (data.UID === dataItem.UID) {
                    if (!data.Selected) {
                        if (selectedCount >= 2) {
                            CommonFunctions.OpenAlertBox('Alert', [{ message: CommonMessages.Alert.DialysisCenterSelection}], null);
                        } else {
                            data.Selected = true;
                            data.BackColor = "#B0CFEA";
                            $scope.SelectedDC.push(data);
                        }
                    } else {
                        data.Selected = false;
                        data.BackColor = "";
                        $scope.SelectedDC.pop(data);
                    }
                }
            });

            selectedCount = 0;
            $($scope.PlacementCriteriasList).each(function (mainindex, data) {
                if (data.Selected) {
                    selectedCount++;
                }
            });

            if (selectedCount > 0) {
                $scope.ShowSaveSelection = true;
            } else {
                $scope.ShowSaveSelection = false;
                $scope.ShowSignature = false;
                $scope.SelectedDC = null;
                $('#plcmnt-signature-slideup').removeClass("signature-slide-up").addClass("signature-slide-down");
            }

            var plcmntCriteriaListview = $('#plcmnt-criteria-listview').data('kendoMobileListView');
            plcmntCriteriaListview.dataSource.read();
            plcmntCriteriaListview.refresh();

            $($scope.PlacementCriteriasList).each(function (index, data) {
                if (data.Selected) {
                    $($('.plcmnt-provider-address')[data.Index - 1]).css('background-color', "#B0CFEA");
                }
            });

        }

        /**
        * @ngdoc event
        * @name $scope.saveSelection
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** k-on-tap event of kendo mobile save selection button
        ** This function is triggered when the user clicks Save Selection button
        */
        $scope.saveSelection = function () {
            var signPad = $('.sigPad').signaturePad();
            if (signPad !== null && signPad !== undefined) {
                signPad.clearCanvas();
            }
            $scope.ShowSignature = true;
            $('#plcmnt-signature-slideup').removeClass("signature-slide-down").addClass("signature-slide-up");
        }

        /**
        * @ngdoc event
        * @name $scope.clearSignaturePadSelection
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        * Clears the sign from Signature Pad
        */
        $scope.clearSignaturePadSelection = function () {
            var signPad = $('.sigPad').signaturePad();
            if (signPad !== null && signPad !== undefined) {
                signPad.clearCanvas();
            }
        }

        /**
        * @ngdoc event
        * @name $scope.confirmSignaturePadSelection
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        **  Click event of kendo mobile confirm button
        **  Captures the signature image from Signarute Pad and calls the SavePlacementsSelection API to save the data 
        */
        $scope.confirmSignaturePadSelection = function () {
            try {
                var signPad = $('.sigPad').signaturePad();
                if (signPad !== null && signPad !== undefined) {
                    if (signPad.validateForm()) {
                        var sign = signPad.getSignatureImage();
                        var placementRequest = {
                            ptPlacementDetails: [],
                            PatientSignature: sign,
                            SearchCriteriaUID: $scope.SelPlacementCriteria.UID,
                            PatientUID: $rootScope.Global.Objects.SelectedPatient.UID,
                            PatientSearchAddress: {
                                Address1: $scope.SelPlacementCriteria.Address.Address1,
                                Address2: $scope.SelPlacementCriteria.Address.Address2,
                                City: $scope.SelPlacementCriteria.Address.City,
                                StateCode: $scope.SelPlacementCriteria.Address.StateCode,
                                Zip: $scope.SelPlacementCriteria.Address.Zip
                            }
                        };

                        var seldcmsg = "Are you sure you want to chose ";
                        var selectedLength = $scope.SelectedDC.length;

                        if (selectedLength === 1) {
                            seldcmsg = seldcmsg + $scope.SelectedDC[0].Provider.Name + " ?";
                        } else {
                            seldcmsg = seldcmsg + $scope.SelectedDC[0].Provider.Name + " and " + $scope.SelectedDC[1].Provider.Name + " ?";
                        }

                        for (var y = 0; y < selectedLength; y++) {
                            $.extend($scope.SelectedDC[y], { SelectedReportType: "" });

                            var reports = $.map(CommonConstants.ReportConstants, function (value, key) {
                                return value;
                            });

                            $.extend($scope.SelectedDC[y], { ReportConstants: reports });
                            $.extend($scope.SelectedDC[y], { ReportTexts: ['Clinical Documents', 'QA Documents', 'SBAR Report', 'Send Fax Manually'] });
                            $.extend($scope.SelectedDC[y], { CheckBoxChecked: false });
                        }

                        $scope.IsSaveButtonVisible = function () {
                            if (!$scope.SelectedDC) {
                                return false;
                            }

                            if (!($scope.SelectedDC) || $scope.SelectedDC.length === 0) {
                                $scope.SaveButtonVisible = false;
                            } else if ($scope.SelectedDC.length === 1) {
                                $scope.SaveButtonVisible = $scope.SelectedDC[0].CheckBoxChecked;
                            } else {
                                var isButtonVisible = ($scope.SelectedDC[0].CheckBoxChecked || $scope.SelectedDC[1].CheckBoxChecked) ? true : false;
                                $scope.SaveButtonVisible = isButtonVisible;
                            }
                            return $scope.SaveButtonVisible;
                        }

                        CommonFunctions.OpenConfirmBox(CommonMessages.Alert.ConfirmMessage, seldcmsg, function (data) {
                            if ((data === undefined || data.returnValue === undefined) || ((!$scope.SelectedDC) || $scope.SelectedDC.length < 1)) {
                                alert("Unable to get placement selected");
                                return false;
                            }

                            if (data.returnValue) {
                                $scope.ModalBuildAddress1 = function (indx) {
                                    var addr = $scope.SelectedDC[indx].Provider.ProviderAddress[0].Address2 ? ($scope.SelectedDC[indx].Provider.ProviderAddress[0].Address2 + " ") : "";
                                    addr += $scope.SelectedDC[indx].Provider.ProviderAddress[0].Address1;
                                    return addr;
                                }

                                $scope.ModalBuildAddress2 = function (indx) {
                                    var addr2 = $scope.SelectedDC[indx].Provider.ProviderAddress[0].City + ", " + $scope.SelectedDC[indx].Provider.ProviderAddress[0].StateCode +
                                                " " + $scope.SelectedDC[indx].Provider.ProviderAddress[0].Zip
                                    return addr2;
                                }

                                for (var i = 0; i < $scope.SelectedDC.length; i++) {
                                    if ($scope.SelectedDC[i].Status === PlacementConstants.PRESENTED_TO_PATIENT_STATUS && $scope.SelectedDC[i].DatePtChoseProvider === null) {
                                        placementRequest.ptPlacementDetails.push({
                                            UID: $scope.SelectedDC[i].UID,
                                            DatePtChoseProvider: (new Date()).toJSONLocal(),
                                            Status: PlacementConstants.CHOSEN_BY_PATIENT_STATUS,
                                            ProviderDetail: {
                                                ProviderUID: $scope.SelectedDC[i].Provider.UID,
                                                AddressUID: $scope.SelectedDC[i].Provider.ProviderAddress[0].UID,
                                                Distance: $scope.SelectedDC[i].Provider.ProviderDistance
                                            }
                                        });
                                    }
                                }

                                CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
                                PatientPlacementTabService.SavePlacementsSelection(placementRequest, $scope.onSavePlacementsSelectionRetrieved);
                            } else {
                                $scope.clearSignaturePadSelection();
                            }
                            //}
                        });
                    }
                }
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "Placement";
                errExp.FunctionName = "confirmSignaturePadSelection";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
            }
        }

        /**
        * @ngdoc method
        * @name $scope.onSavePlacementsSelectionRetrieved
        * @methodOf roundingModule.controller:PatientPlacementTabController
        * @description
        * Callback method for SavePlacementsSelection API 
        */
        $scope.onSavePlacementsSelectionRetrieved = function (resdata) {
            CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            try {
                if (resdata.resultstatus === Status.ServiceCallStatus.Success) {
                    if ((!$scope.SelectedDC) || $scope.SelectedDC.length < 1) {
                        alert("Unable to get placement selected");
                        return false;
                    }
                    CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.PlacementSelectedMessage);
                    $scope.ShowSignature = false;
                    $('#plcmnt-signature-slideup').removeClass("signature-slide-up").addClass("signature-slide-down");
                    $("#plcmnt-modal-selection").data("kendoMobileModalView").open();

                    $scope.modalFaxDateValidator = $("#plcmnt-modal-selection").kendoValidator({
                        rules: {
                            daterequired: function (input) { //validation if required                        
                                if (input.is("[data-daterequired-msg]")) {
                                    return $.trim(input.val()) !== "";
                                }
                                return true;
                            },
                            datevalid: function (input) {  //if input date is not valid
                                if ($.trim(input.val()) !== "") {
                                    if (input.is("[data-datevalid-msg]")) {
                                        return kendo.parseDate($.trim(input.val()));
                                    }
                                }
                                return true;
                            },
                            datetoday: function (input) {  //if input date is not valid
                                if ($.trim(input.val()) !== "") {
                                    if (input.is("[data-datetoday-msg]")) {
                                        var d = new Date();
                                        return d.toDateString() === kendo.parseDate($.trim(input.val())).toDateString();
                                    }
                                }
                                return true;
                            }
                        },
                        messages: {
                            daterequired: "Fax Date is required",
                            datevalid: "Please enter a valid Fax date",
                            datetoday: "Fax date should be Today date only"
                        }
                    }).data("kendoValidator");
                }
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "Placement";
                errExp.FunctionName = "onSavePlacementsSelectionRetrieved";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
            }
        }
        /**
        * @ngdoc event
        * @name $scope.closePlacementSelection
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** k-on-tap event of kendo mobile cancel button
        **  Closes the Placement Selection modal view and refreshes the placements
        * @param {boolean} isCancelModal
        * using to clear or not  $scope.SelectedDC array   
        */
        $scope.closePlacementSelection = function (isCancelModal) {
            $("#plcmnt-modal-selection").data("kendoMobileModalView").close();
            if (!isCancelModal) {
                $scope.SelectedDC = [];
                getPlacements();
            } else {
                var refreshPlacements = false
                $($scope.SelectedDC).each(function (key1, item) {
                    if (item.LastFaxSentDate) {
                        refreshPlacements = true;
                    }
                });
                if (refreshPlacements) {
                    getPlacements();
                }
            }
        };
        /**
        * @ngdoc event
        * @name $scope.approvedDCSelection
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** ng-click event of kendo mobile Approve button
        ** Displays additional fields required for DC approval.
        * @param {object} dataItem
        * Placement object   
        */

        $scope.approvedDCSelection = function (dataItem) {
            $scope.SelDCForApproveDecline = dataItem;
            dataItem.IsApproveClicked = true;
            dataItem.IsDeclineClicked = false;
            $scope.ReasonPtChoseFacilityLookup = CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.PtChoseFacilityReason), CommonConstants.IsShownUI, true);
            $scope.PlacementDelayReasonLookup = CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.PlacementDelayReason), CommonConstants.IsShownUI, true);

            $timeout(function () {
                $scope.approveValidator = $("#" + dataItem.Provider.UID.toString() + '-' + dataItem.Provider.ID.toString()).kendoValidator({
                    rules: {
                        daterequired: function (input) { //validation if required                        
                            if (input.is("[data-daterequired-msg]")) {
                                return $.trim(input.val()) !== "";
                            }
                            return true;
                        },
                        datevalid: function (input) {  //if input date is not valid
                            if ($.trim(input.val()) !== "") {
                                if (input.is("[data-datevalid-msg]")) {
                                    return kendo.parseDate($.trim(input.val()));
                                }
                            }
                            return true;
                        },
                        datetoday: function (input) {  //if input date is not valid
                            if ($.trim(input.val()) !== "") {
                                if (input.is("[data-datetoday-msg]")) {
                                    var d = new Date();
                                    return d.toDateString() === kendo.parseDate($.trim(input.val())).toDateString();
                                }
                            }
                            return true;
                        },
                        transientProviderDate: function (input) {
                            if (dataItem.IsTransientProvider && input.is("[data-transientProviderDate-msg]")) {
                                return $.trim(input.val()) !== "";
                            }
                            return true;
                        },
                        transientProviderEndDateGreater: function (input) {
                            if (dataItem.IsTransientProvider && input.is("[data-transientProviderEndDateGreater-msg]")) {
                                if (dataItem.TransientProviderStartDate && dataItem.TransientProviderEndDate) {
                                    var transientProviderStartDate = kendo.parseDate($.trim(dataItem.TransientProviderStartDate));
                                    if (transientProviderStartDate !== null) {
                                        transientProviderStartDate.setHours(0, 0, 0, 0);
                                    }
                                    var transientProviderEndDate = kendo.parseDate($.trim(dataItem.TransientProviderEndDate));
                                    if (transientProviderEndDate !== null) {
                                        transientProviderEndDate.setHours(0, 0, 0, 0);
                                    }

                                    return transientProviderStartDate.getTime() <= transientProviderEndDate.getTime();
                                }
                            }
                            return true;
                        },
                        startDateGreater: function (input) {
                            if (dataItem.IsTransientProvider && input.is("[data-startDateGreater-msg]")) {
                                if (dataItem.DateProviderApprovedPatient && dataItem.TransientProviderStartDate) {
                                    var dateProviderApprovedPatient = kendo.parseDate($.trim(dataItem.DateProviderApprovedPatient));
                                    if (dateProviderApprovedPatient !== null) {
                                        dateProviderApprovedPatient.setHours(0, 0, 0, 0);
                                    }
                                    var transientProviderStartDate = kendo.parseDate($.trim(dataItem.TransientProviderStartDate));
                                    if (transientProviderStartDate !== null) {
                                        transientProviderStartDate.setHours(0, 0, 0, 0);
                                    }

                                    return transientProviderStartDate.getTime() >= dateProviderApprovedPatient.getTime();
                                }
                            }
                            return true;
                        },
                        endDateGreater: function (input) {
                            if (dataItem.IsTransientProvider && input.is("[data-endDateGreater-msg]")) {
                                if (dataItem.DateProviderApprovedPatient && dataItem.TransientProviderEndDate) {
                                    var dateProviderApprovedPatient = kendo.parseDate($.trim(dataItem.DateProviderApprovedPatient));
                                    if (dateProviderApprovedPatient !== null) {
                                        dateProviderApprovedPatient.setHours(0, 0, 0, 0);
                                    }
                                    var transientProviderEndDate = kendo.parseDate($.trim(dataItem.TransientProviderEndDate));
                                    if (transientProviderEndDate !== null) {
                                        transientProviderEndDate.setHours(0, 0, 0, 0);
                                    }

                                    return transientProviderEndDate.getTime() >= dateProviderApprovedPatient.getTime();
                                }
                            }
                            return true;
                        }
                    },
                    messages: {
                        daterequired: "required",
                        datevalid: "date is not valid",
                        datetoday: "date should be only today",
                        transientProviderDate: "required",
                        transientProviderEndDateGreater: "please enter Transient End Date greater than Transient Start Date",
                        startDateGreater: "please enter Transient Start Date greater than or equal to Patient Approve Date",
                        endDateGreater: "please enter Transient End Date greater than or equal to Patient Approve Date"
                    }
                }).data("kendoValidator");
            }, 0, true);
        }
        /**
        * @ngdoc event
        * @name $scope.cancelApprovedDC
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** ng-click event of kendo mobile Cancel button.  
        ** Hides the additional fields which are displayed when user clicks on approve
        * @param {object} dataItem
        * Placement object   
        */
        $scope.cancelApprovedDC = function (dataItem) {
            dataItem.IsDeclineClicked = false;
            dataItem.IsApproveClicked = false;
            $scope.SelDCForApproveDecline = null;
            dataItem.DateProviderApprovedPatient = null
            dataItem.ProviderDeclinedPatientDate = null;
            dataItem.PtChoseFacilityReason = null;
            dataItem.IsTransientProvider = false;
            dataItem.TransientProviderStartDate = null;
            dataItem.TransientProviderEndDate = null;
            dataItem.HasPlacementDelay = false;
            dataItem.PlacementDelayReasonCode = null;
            $scope.SelectFacilityValidationVisible = false;
        }


        /**
        * @ngdoc event
        * @name $scope.ptChoseFacilityOk
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** ng-click event of kendo mobile ok button
        ** Saves data for patient chose facility and closes the modal-view
        * @param {object} dataItem
        * Placement object   
        */
        
        $scope.ptChoseFacilityOk = function (dataItem) {
            $scope.SelectFacilityValidationVisible = $scope.SelDCForApproveDecline.PtChoseFacilityReason ? false : true;
            $("#plcmnt-reason-ptchosefacility-modalview").data("kendoMobileModalView").close();
        }

        /**
        * @ngdoc event
        * @name $scope.ptChoseFacilityCancel
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** ng-click event of kendo mobile cancel button
        ** Closes the modal-view for patient chose facility  
        * @param {object} dataItem
        * Placement object   
        */

        $scope.ptChoseFacilityCancel = function (dataItem) {
            $scope.SelDCForApproveDecline.PtChoseFacilityReason = null;
            $scope.SelectFacilityValidationVisible = $scope.SelDCForApproveDecline.PtChoseFacilityReason ? false : true;
            $("#plcmnt-reason-ptchosefacility-modalview").data("kendoMobileModalView").close();
        }
        
        /**
        * @ngdoc event
        * @name $scope.placementDelayYesChosen
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** ng-click event of input type radio
        ** Opens the modal-view for delay reason in placement  
        * @param {object} dataItem
        * Placement object   
        */
        
        $scope.placementDelayYesChosen = function () {
            $("#plcmnt-reason-delay-modalview").data("kendoMobileModalView").open();
        }

        /**
        * @ngdoc event
        * @name $scope.placementDelayReasonCancel
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** ng-click event of kendo mobile cancel button
        ** Closes placement delay modal-view
        * @param {object} dataItem
        * Placement object   
        */
        $scope.placementDelayReasonCancel = function (dataItem) {
            $scope.SelDCForApproveDecline.PlacementDelayReasonCode = null;
            $scope.SelDCForApproveDecline.HasPlacementDelay = false;
            $("#plcmnt-reason-delay-modalview").data("kendoMobileModalView").close();
        }

        /**
        * @ngdoc event
        * @name $scope.placementDelayReasonOk
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** ng-click event of kendo mobile ok button
        ** Saves data for placement delay reason and closes the modal-view  
        * @param {object} dataItem
        * using to clear or not  $scope.SelectedDC array   
        */
        $scope.placementDelayReasonOk = function (dataItem) {
            if ($scope.SelDCForApproveDecline.PlacementDelayReasonCode === "") {
                $scope.SelDCForApproveDecline.HasPlacementDelay = false;
            }

            $("#plcmnt-reason-delay-modalview").data("kendoMobileModalView").close();
        }
       

        /**
        * @ngdoc event
        * @name $scope.saveApprovedDC
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** ng-click event of kendo mobile save button
        ** Validates all the required fields and calls the SavePlacementDetails API to save the Approved DC  
        * @param {object} dataItem
        * Placement object   
        */
        $scope.saveApprovedDC = function (dataItem) {
            try {
                //run the validation manually
                $scope.SelectFacilityValidationVisible = $scope.SelDCForApproveDecline.PtChoseFacilityReason ? false : true;

                if ($scope.approveValidator.validate() && !$scope.SelectFacilityValidationVisible) {
                    CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
                    var request = {
                        UID: dataItem.UID,
                        LastFaxSentDate: dataItem.LastFaxSentDate,
                        DatePtChoseProvider: dataItem.DatePtChoseProvider,
                        DateProviderApprovedPatient: returnDate(dataItem.DateProviderApprovedPatient),
                        PtChoseFacilityReason: dataItem.PtChoseFacilityReason === null ? null : dataItem.PtChoseFacilityReason,
                        HasPlacementDelay: dataItem.HasPlacementDelay,
                        PlacementDelayReasonCode: dataItem.HasPlacementDelay ? (dataItem.PlacementDelayReasonCode === null ? null : dataItem.PlacementDelayReasonCode) : null,
                        IsTransientProvider: dataItem.IsTransientProvider,
                        TransientProviderStartDate: returnDate(dataItem.TransientProviderStartDate),
                        TransientProviderEndDate: returnDate(dataItem.TransientProviderEndDate),
                        Status: PlacementConstants.APPROVED_BY_FACILITY_STATUS,
                        ProviderDetail: {
                            ProviderUID: dataItem.Provider.UID,
                            Distance: dataItem.Provider.ProviderDistance,
                            AddressUID: dataItem.Provider.ProviderAddress[0].UID
                        }
                    };

                    savePlacementDetails(dataItem, request);
                }
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "Placement";
                errExp.FunctionName = "saveApprovedDC";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            }
        }

        /**
        * @ngdoc event
        * @name $scope.declineDCSelection
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** ng-click event of kendo mobile decline button
        **  Validates all required fields for declined DC
        * @param {object} dataItem
        * Placement object   
        */
        $scope.declineDCSelection = function (dataItem) {
            $scope.SelDCForApproveDecline = dataItem;
            dataItem.IsDeclineClicked = true;
            dataItem.IsApproveClicked = false;
            $scope.ProviderDeclinedReasonLookup = CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.ProviderDeclinedReason), CommonConstants.IsShownUI, true);

            $timeout(function () {
                $scope.declineValidator = $("#" + dataItem.Provider.UID.toString() + '-' + dataItem.Provider.ID.toString()).kendoValidator({
                    rules: {
                        daterequired: function (input) { //validation if required                        
                            if (input.is("[data-daterequired-msg]")) {
                                return $.trim(input.val()) !== "";
                            }
                            return true;
                        },
                        datevalid: function (input) {  //if input date is not valid
                            if ($.trim(input.val()) !== "") {
                                if (input.is("[data-datevalid-msg]")) {
                                    return kendo.parseDate($.trim(input.val()));
                                }
                            }
                            return true;
                        },
                        datetoday: function (input) {  //if input date is not valid
                            if ($.trim(input.val()) !== "") {
                                if (input.is("[data-datetoday-msg]")) {
                                    var d = new Date();
                                    return d.toDateString() === kendo.parseDate($.trim(input.val())).toDateString();
                                }
                            }
                            return true;
                        }
                    },
                    messages: {
                        daterequired: "required",
                        datevalid: "date is not valid",
                        datetoday: "date should be only today"
                    }
                }).data("kendoValidator");
            }, 0, true);
        }

        /**
        * @ngdoc event
        * @name $scope.placementDeclineReasonOk
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** ng-click event of kendo mobile ok button
        ** Saves provider declined patient reason in scope variable and closes the modal-view
        * @param {object} dataItem
        * Placement object   
        */
        $scope.placementDeclineReasonOk = function (dataItem) {
            $scope.SelectDeclineReasonValidationVisible = $scope.SelDCForApproveDecline.ProviderDeclinedPatientReasonCode ? false : true;
            $("#plcmnt-decline-reason-modalview").data("kendoMobileModalView").close();
        }
        /**
        * @ngdoc event
        * @name $scope.placementDeclineReasonCancel
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** ng-click event of kendo mobile cancel button
        ** Closes the reason provider declined patient modal-view
        * @param {object} dataItem
        * Placement object   
        */
        $scope.placementDeclineReasonCancel = function (dataItem) {
            $scope.SelDCForApproveDecline.ProviderDeclinedPatientReasonCode = null;
            $scope.SelectDeclineReasonValidationVisible = $scope.SelDCForApproveDecline.ProviderDeclinedPatientReasonCode ? false : true;
            $("#plcmnt-decline-reason-modalview").data("kendoMobileModalView").close();
        }
        /**
        * @ngdoc event
        * @name $scope.cancelDeclinedDC
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** ng-click event of kendo mobile cancel button
        ** Resets/Cancels the dataItem object for Declined DC
        * @param {object} dataItem
        * Placement object   
        */
        $scope.cancelDeclinedDC = function (dataItem) {
            dataItem.IsDeclineClicked = false;
            dataItem.IsApproveClicked = false;
            $scope.SelDCForApproveDecline = null;
            dataItem.ProviderDeclinedPatientDate = null
            dataItem.ProviderDeclinedPatientReasonCode = null;
            $scope.SelectDeclineReasonValidationVisible = false;
        }

        /**
        * @ngdoc event
        * @name $scope.saveDeclinedDC
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** ng-click of kendo mobile save button
        ** Validates Declined DC data and calls the SavePlacementDetails API to save the data
        * @param {object} dataItem
        * Placement object   
        */
        $scope.saveDeclinedDC = function (dataItem) {
            try {
                $scope.SelectDeclineReasonValidationVisible = $scope.SelDCForApproveDecline.ProviderDeclinedPatientReasonCode ? false : true;

                if ($scope.declineValidator.validate() && !$scope.SelectDeclineReasonValidationVisible) {
                    CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
                    var request = {
                        UID: dataItem.UID,
                        LastFaxSentDate: dataItem.LastFaxSentDate,
                        DatePtChoseProvider: dataItem.DatePtChoseProvider,
                        ProviderDeclinedPatientDate: returnDate(dataItem.ProviderDeclinedPatientDate),
                        ProviderDeclinedPatientReasonCode: dataItem.ProviderDeclinedPatientReasonCode === null ? null : dataItem.ProviderDeclinedPatientReasonCode,
                        Status: PlacementConstants.DECLINED_BY_FACILITY_STATUS,
                        ProviderDetail: {
                            ProviderUID: dataItem.Provider.UID,
                            Distance: dataItem.Provider.ProviderDistance,
                            AddressUID: dataItem.Provider.ProviderAddress[0].UID
                        }
                    };

                    savePlacementDetails(dataItem, request);
                }
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "Placement";
                errExp.FunctionName = "saveDeclinedDC";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            }
        }
        /**
        * @ngdoc method
        * @name $scope.savePlacementDetails
        * @methodOf roundingModule.controller:PatientPlacementTabController
        * @description
        * Calls SavePlacementsDetails API to save the placement data
        * @param {object} dataItem
        * Placement object 
        * @param {object} request
        * Request object 		
        */
        function savePlacementDetails(dataItem, request) {
            PatientPlacementTabService.SavePlacementsDetails(request, function (result) {
                if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                    if (request.Status === PlacementConstants.DECLINED_BY_FACILITY_STATUS) {
                        CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.PlacementDeclineSaved);
                    } else {
                        CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.PlacementApproveSaved);
                    }
                    //Update the current record and record from recent placements list
                    $timeout(function () {
                        dataItem.Status = result.data.PtPlacementDetail[0].Status;

                        $($scope.GetPlacementsData.Placements[0].PlacementCrietrias).each(function (key, data) {
                            if (data.SelectedPlacement !== "") {
                                $(data.PlacementDetails).each(function (key1, item) {
                                    if (item.UID === result.data.PtPlacementDetail[0].UID) {
                                        item = result.data.PtPlacementDetail[0];
                                    }
                                });
                            }
                        });
                    }, 100, true);

                    $scope.ApproveDeclineCounter++;
                    if ($scope.ApproveDeclineCounter === $scope.ApproveDeclineCountTobeCompared) {
                        getPlacements();
                    }
                }

                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            });
        }
        /**
        * @ngdoc method
        * @name $scope.showMap
        * @methodOf roundingModule.controller:PatientPlacementTabController
        * @description
        * Displays the Map
        * @param {boolean} isPlacementCriteria
        * This flag that indicated that isPlacementCriteria initialized or not 		
        */
        $scope.showMap = function (isPlacementCriteria) {
            var mapDataString;

            if (isPlacementCriteria === undefined) {
                mapDataString = $scope.PlacementCriteriasList && $scope.PlacementCriteriasList.length > 0 ? JSON.stringify($scope.PlacementCriteriasList) : JSON.stringify($scope.DCListPvdInfo);
            } else {
                mapDataString = isPlacementCriteria ? JSON.stringify($scope.PlacementCriteriasList) : JSON.stringify($scope.DCListPvdInfo);
            }

            var mapData = JSON.parse(mapDataString);
            var homeMarker = JSON.stringify(mapData[0]);
            homeMarker = homeMarker ? JSON.parse(homeMarker) : JSON.parse('{}');
            homeMarker.Name = "Home";

            var homeLatitude = '0';
            var homeLongitude = '0';
            if (($scope.SelPlacementCriteria) && ($scope.SelPlacementCriteria.Address)) {
                homeLatitude = ($scope.SelPlacementCriteria.Address.Latitude) ? $scope.SelPlacementCriteria.Address.Latitude : '0';
                homeLongitude = ($scope.SelPlacementCriteria.Address.Longitude) ? $scope.SelPlacementCriteria.Address.Longitude : '0';
            }


            homeMarker.Latlng = [homeLatitude, homeLongitude];

            var markerShape = mapData.length > 0 ? "plcmnt-marker" : "icon-addressbar-pin";
            mapData[mapData.length] = homeMarker;

            $timeout(function () {
                $("#plcmnt-map").kendoMap({
                    center: [homeLatitude, homeLongitude],
                    zoom: 12,
                    layerDefaults: {
                        marker: {
                            shape: markerShape,
                            tooltip: {
                                autoHide: false,
                                showOn: "click",
                                content: function (e) {
                                    var selectedMarker = e.sender.marker;
                                    if ((e.sender.marker.dataItem.name) && e.sender.marker.dataItem.name === "Home") {
                                        e.sender.marker.tooltip.destroy();
                                        return;
                                    }
                                    if (isPlacementCriteria) {
                                        return displayMarkerToolTip(selectedMarker, selectedMarker.dataItem.Provider.ProviderAddress, isPlacementCriteria);
                                    } else {
                                        return displayMarkerToolTip(selectedMarker, selectedMarker.dataItem.ProviderAddress, isPlacementCriteria);
                                    }
                                }
                            }
                        }
                    },
                    layers: [{
                        type: "tile",
                        urlTemplate: "http://#= subdomain #.tile2.opencyclemap.org/transport/#= zoom #/#= x #/#= y #.png",
                        subdomains: ["a", "b", "c"],
                        attribution: "© <a href='http://osm.org/copyright'>OpenStreetMap contributors</a>." +
                                                                       "Tiles courtesy of <a href='http://www.opencyclemap.org/'>Andy Allan</a>"
                    }, {
                        type: "marker",
                        dataSource: mapData,
                        locationField: "latlng",
                        titleField: "Name"
                    }
                    ]
                });

                if (mapData.length > 1) {
                    var mrk = $('.k-marker-plcmnt-marker[title="Home"]');
                    $(mrk).removeClass('k-marker-plcmnt-marker');
                    $(mrk).addClass('k-marker-icon-addressbar-pin');

                    $.each($('.k-marker-plcmnt-marker'), function (i) {
                        if ($(this).attr('title') !== 'Home') {
                            $(this).text(i + 1);
                        }
                    });
                }

                $scope.ShowButtons = true;
                $scope.ShowRecent = true;
            }, 0, false);
        }

        var oldIndx = -1;
        var firstTimeSelected = true;
        var originalBackgroundColor = null;

        $scope.selectMarker = function (locationId) {
            if (firstTimeSelected) {
                originalBackgroundColor = $('.k-marker-plcmnt-marker').css('background-color');
                firstTimeSelected = false;
            }
            var selectedIndx = parseInt(locationId) - 1;
            var map = $("#plcmnt-map").data("kendoMap");
            var marker = map.layers[1].items[selectedIndx];

            if (marker.location()) {
                map.center(marker.location());
            }
            if (marker.tooltip) {
                marker.tooltip.show();
            }

            if (oldIndx > -1 && oldIndx !== selectedIndx) {
                $($('.k-marker-plcmnt-marker')[oldIndx]).css('background-color', originalBackgroundColor);
            }
            $($('.k-marker-plcmnt-marker')[selectedIndx]).css('background-color', 'orange');
            oldIndx = selectedIndx;
        };

        /**
        * @ngdoc method
        * @name $scope.displayMarkerToolTip
        * @methodOf roundingModule.controller:PatientPlacementTabController
        * @description
        * This function displays Marker ToolTip
        * @param {object} selectedMarker
        * Selected Marker object
        * @param {object} addresses
        * Addresses object
        * @returns {string} tooltip div.html
        *  The result object with status property
        */
        function displayMarkerToolTip(selectedMarker, addresses, isProvider) {

            var address1, address2, city, state, zip;
            $(addresses).each(function (index, dataaddress) {
                if (dataaddress.IsPrimary) {
                    address1 = dataaddress.Address1;
                    address2 = dataaddress.Address2;
                    city = dataaddress.City;
                    state = dataaddress.StateCode;
                    state = dataaddress.StateCode;
                    zip = dataaddress.Zip;
                }
            });

            var providerName = isProvider ? selectedMarker.dataItem.Provider.Name : selectedMarker.dataItem.Name;

            var toolTipHtml = "";
            toolTipHtml = "<div class='crd-pthway-screening-label'>" + providerName + "</div><div class='plsmnt-marker-content'>Provider located at</div><div class='plsmnt-marker-content'>" + address1 + "";
            if (address2 !== null) {
                toolTipHtml = toolTipHtml + ", " + address2;
            }
            return toolTipHtml + "</div><div class='plsmnt-marker-content'>" + city + ", " + state + " " + zip + "</div>";

        }

        /**
        * @ngdoc method
        * @name updateAddressValue
        * @methodOf roundingModule.controller:PatientPlacementTabController
        * @description
        * Upadtes the address
        * @param {object} thisclickedItem
        * clicked object
        */
        updateAddressValue = function (thisclickedItem) {
            try {
                $scope.PlcmtMapPatientDetails.Address.Address1 = CommonFunctions.ObjectPropertyExist(thisclickedItem.address, "addressLine");
                $scope.PlcmtMapPatientDetails.Address.StateCode = CommonFunctions.ObjectPropertyExist(thisclickedItem.address, "adminDistrict");
                $scope.PlcmtMapPatientDetails.Address.County = CommonFunctions.ObjectPropertyExist(thisclickedItem.address, "adminDistrict2")

                $scope.PlcmtMapPatientDetails.Address.City = CommonFunctions.ObjectPropertyExist(thisclickedItem.address, "locality");
                $scope.PlcmtMapPatientDetails.Address.Zip = CommonFunctions.ObjectPropertyExist(thisclickedItem.address, "postalCode");
                $scope.PlcmtMapPatientDetails.Address.Latitude = thisclickedItem.point.coordinates[0];
                $scope.PlcmtMapPatientDetails.Address.Longitude = thisclickedItem.point.coordinates[1];
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "Placement";
                errExp.FunctionName = "updateAddressValue";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
            }
        }

        /**
        * @ngdoc method
        * @name $scope.plcmtViewAddressValidation
        * @methodOf roundingModule.controller:PatientPlacementTabController
        * @description
        * Opens the modal-view for address validation
        */
        $scope.plcmtViewAddressValidation = function () {
            $("#plcmnt-addressvalidation-modalview").data("kendoMobileModalView").open();
        }

        /**
        * @ngdoc event
        * @name $scope.closeModalViewcAddressValidation
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** k-on-tap event of kendo mobile cancel button
        ** Closing the modal-view for address  validation
        */
        $scope.closeModalViewcAddressValidation = function () {
            $("#plcmnt-addressvalidation-modalview").data("kendoMobileModalView").close();
        }

        /**
        * @ngdoc event
        * @name $scope.updateAddress
        * @eventOf roundingModule.controller:PatientPlacementTabController
        * @description
        ** ng-click event of input type radio
        ** Updates the address value entered by the user and calls the GetPlacementProvider API to load DC list based on new address
        * @param {object} dataItem
        * Placement object 
        * @param {object} request
        * Request object 		
        */
        $scope.updateAddress = function (dataItem) {
            try {
                updateAddressValue(dataItem);
                $scope.IsAddressValidated = true;
                $scope.SelectedAddress = $scope.PlcmtMapPatientDetails.Address;
                $scope.SelectedAddressText = getCommaSeperatedAddress($scope.PlcmtMapPatientDetails.Address);
                $scope.PlcmtMapPatientDetails.MaxRadius = $scope.Radius;
                $("#plcmnt-addressvalidation-modalview").data("kendoMobileModalView").close();
                PatientPlacementTabService.GetPlacementProvider($scope.PlcmtMapPatientDetails, $scope.onGetPlacementProviderRetrieved);
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "Placement";
                errExp.FunctionName = "updateAddress";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
            }
        }


        // start point of placement tab view
        $timeout(function () {
            if ($scope.show()) {
                var scrollerWrap = $('#patientPlacementTab-view').find('div[data-role="content"]');
                $(scrollerWrap).data("kendoMobileScroller").disable();
            }
        }, 0);
    });
} ());