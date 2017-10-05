(function () {
    /**
     * @ngdoc service
     * @author Mikhail Rakhunov
     * @name roundingModule.service:MedicationsService
     * @description     
     ** MedicationsService is being used by MedicationsController, AllergyFilterController, MedicationFilterController, MedicationMenuController, MedsReviewDateController and AddMedicationController
     ** This will be used for all service calls for Medication Screen
     * @property {string} selectedAllergyFilter     local variable, default value 'All'
     * @property {string} selectedMedicationFilter  local variable, default value 'All'
     * @property {date} screeningDate               local variable, default value ''
     * @property {array} surveyDetails              local variable, default value []
     * @property {date} lastMedReviewDate           local variable, default value ''
     * @property {date} lastComorbidReviewDate      local variable, default value ''
     * @property {json} selectedMedication          local variable, default value {}
     * @property {json} medicationsList             local variable, default value {}
     */
    angular.module('roundingModule').factory('ComorbidsService', function ($rootScope, $timeout, ServiceConstants, RoundingService, Status,
                                                                           CommonConstants, CommonFunctions) {
        /**
         * @ngdoc function 
         * @name GetPatientComorbids
         * @methodOf roundingModule.service:ComorbidsService
         * @param {Object} data { patientUID: $rootScope.Global.Objects.SelectedPatient.UID, IsIpe: false or true }
         * @param {function} callback $scope.onPatientMedicationRetrieved      
         * @description       
         ** Calls GetPatientComorbids api 'Clinical/GetPatientComorbids' using RoundingService 
         */
        var selectedComorbid = {};
        var surveyDetails = [];
        var lastComorbidReviewDate = "";

        function getPatientComorbids(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPatientComorbids, 'POST', 'JSON', data, callback, true);
        }

        function getProviderAssociations(data, method, dataType, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetProviderAssociations, method, dataType, data, callBack, true);
        }

        function savePtComorbids(data, callBack) {
            var optionsData = [];
            optionsData.push(data);
            RoundingService.ServiceCallWithParams(ServiceConstants.SavePtComorbids, 'POST', 'JSON', optionsData, callBack);
        }

        function setSelectedComorbid(comorbid) {
            selectedComorbid = comorbid;
        }

        /**
         * @ngdoc function 
         * @name GetSelectedComorbid
         * @methodOf roundingModule.service:ComorbidsService
         * @returns {Object} selectedComorbid 
         * @description       
         ** Returns local variable selectedComorbid
         */
        function getSelectedComorbid() {
            return selectedComorbid;
        }

        /**
         * @ngdoc function 
         * @name GetSurveyDetails
         * @methodOf roundingModule.service:ComorbidsService
         * @param {Object} data { PatientUID: $rootScope.Global.Objects.SelectedPatient.UID, HarUID: '', SurveyTypeCode: "ComorbidReview", NoOfSurveys: 1 }
         * @param {function} callback ComorbidsService.SetIntMedicationSurvey    
         * @description       
         ** Calls GetSurveyDetails api 'Pathways/GetSurveyDetails' using RoundingService   
         */
        function getSurveyDetails(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetSurveyDetails, 'POST', 'JSON', data, callback);
        }

        /**
         * @ngdoc function 
         * @name SaveSurveyDetails
         * @methodOf roundingModule.service:ComorbidsService
         * @param {Object} data surveyResponse
         * @param {function} callback inline function    
         * @description       
         ** Calls SaveSurveyDetails api 'Patient/AddPatientSurvey' using RoundingService   
         */
        function saveSurveyDetails(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.AddPatientSurvey, 'POST', 'JSON', data, callback);
        }

        /**
         * @ngdoc function 
         * @name getComorbidReviewDate
         * @methodOf roundingModule.service:ComorbidsService
         * @param {Object} data surveyResponse
         * @param {function} callback inline function    
         * @description       
         ** Calls SaveSurveyDetails api 'Pathways/SaveSurveyDetails' using RoundingService   
         */
        function getComorbidReviewDate(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetComorbidReviews, 'POST', 'JSON', data, callback);
        }

        /**
         * @ngdoc function 
         * @name setIntComorbidSurvey
         * @methodOf roundingModule.service:ComorbidsService
         * @param {object} result result returned by service
         * @description       
         ** Sets screeningDate    
         */
        function setIntComorbidSurvey(result) {
            if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                surveyDetails = result.data.SurveyDetails[0];
            }
        }

        /**
         * @ngdoc function 
         * @name getIntComorbidSurvey
         * @methodOf roundingModule.service:ComorbidsService
         * @returns {object} surveyDetails local variable
         * @description       
         ** Sets screeningDate    
         */
        function getIntComorbidSurvey() {
            return surveyDetails;
        }

        /**
         * @ngdoc function 
         * @name setLastComorbidReviewDate
         * @methodOf roundingModule.service:ComorbidsService
         * @param {object} date med review date
         * @description       
         ** Sets lastComorbidReviewDate   
         ** Broadcasts onLastComorbidReviewDateRetrieved
         */
        function setLastComorbidReviewDate(date) {
            lastComorbidReviewDate = date;
            $rootScope.$broadcast('onLastComorbidReviewDateRetrieved', { "date": date });
        }

        /**
         * @ngdoc function 
         * @name GetLastMedReviewDate
         * @methodOf roundingModule.service:ComorbidsService
         * @returns {Object} local variable lastComorbidReviewDate
         * @description       
         ** returns lastComorbidReviewDate    
         */
        function getLastComorbidReviewDate() {
            return lastComorbidReviewDate;
        }

        function refreshComorbidsCount() {
            $rootScope.$broadcast('refreshMetricsCount');
        }

        return {
            GetPatientComorbids: getPatientComorbids,
            GetProviderAssociations: getProviderAssociations,
            SavePtComorbids: savePtComorbids,
            SetSelectedComorbid: setSelectedComorbid,
            GetSelectedComorbid: getSelectedComorbid,
            GetSurveyDetails: getSurveyDetails,
            SaveSurveyDetails: saveSurveyDetails,
            SetIntComorbidSurvey: setIntComorbidSurvey,
            GetIntComorbidSurvey: getIntComorbidSurvey,
            SetLastComorbidReviewDate: setLastComorbidReviewDate,
            GetLastComorbidReviewDate: getLastComorbidReviewDate,
            GetComorbidReviewDate: getComorbidReviewDate,
            RefreshComorbidsCount: refreshComorbidsCount,
        };
    });
}());
/**
 * @ngdoc controller
 * @name roundingModule.controller:ComorbidsController
 * @description
 * Controller for Comorbid Functionality.
 * @property {object} $scope.model                       model of MedsReviewDateController
 * @property {date} $scope.model.MaxAddReviewDate        property of $scope.model used for max review date   
 * @property {date} $scope.model.MinAddReviewDate        property of $scope.model used for min review date           
 * @property {date} $scope.model.AddReviewDate           property of $scope.model used for meds review date           
 * @property {bool} $scope.model.LastReviewDateShow      property of $scope.model used for Last Review Date Show flag filter           
 */

(function () {
    angular.module('roundingModule')
           .controller('ComorbidsController', function ($rootScope, $scope, $timeout, $filter, LookUp, LookupTypes, ComorbidsService, PatientDetailsService, ExceptionService, CommonFunctions,
                                                        CommonConstants, Status, CommonMessages) {
               var comorbidParentChildLookup = {
                   "parentLookupType": LookupTypes.Comorbid,
                   "childLookupType": LookupTypes.ComorbidDetail,
                   "isNoCache": false
               };
               LookUp.GetParentChildLookUp(comorbidParentChildLookup);

               var ComorbidGroupParentChildlookup = {
                   "parentLookupType": LookupTypes.ComorbidGroup,
                   "childLookupType": LookupTypes.Comorbid,
                   "isNoCache": false
               };

               LookUp.GetParentChildLookUp(ComorbidGroupParentChildlookup);

               LookUp.GetLookUp(LookupTypes.Comorbid);
               LookUp.GetLookUp(LookupTypes.ComorbidGroup);
               LookUp.GetLookUp(LookupTypes.ComorbidDetail);
               LookUp.GetLookUp(LookupTypes.AssociationType);

               $scope.model = {};
               $scope.model.MaxAddReviewDate = new Date();
               $scope.model.MaxAddReviewDate.setHours(23, 59, 59, 0);
               $scope.model.MinAddReviewDate = new Date();
               $scope.model.MinAddReviewDate.setDate($scope.model.MaxAddReviewDate.getDate() - 6);
               $scope.model.MinAddReviewDate.setHours(0, 0, 0, 0);
               $scope.model.AddReviewDate = "";
               $scope.model.LastReviewDateShow = true;
               $scope.model.Comorbids = new kendo.data.DataSource({ data: [] });
               $scope.model.SelectedComorbid = ComorbidsService.GetSelectedComorbid();
               $scope.model.LastReviewDate = null;
               $scope.model.LastReviewDateVisible = false;


               $scope.MaxDate = new Date();
               $scope.MaxDate.setHours(23, 59, 59, 0);

               $scope.DateOptions = {
                   format: "MM/dd/yyyy",
                   max: $scope.MaxDate
               }

               $scope.model.comorbidsLoaded = false;
               $scope.model.providersLoaded = false;

               $scope.model.Providers = [];
               $scope.model.IsAddingComorbid = false;
               $scope.model.IsEditingComorbid = false;

               $scope.IsSNPESCOMarket = $rootScope.Global.Objects.SelectedPatient.IsSNPESCOMarket || false;

               $scope.getPatientComorbidsDetails = function () {
                   CommonFunctions.BlockKendoView("ptchart-splitview-main-pan", CommonMessages.BusyMessages.LoadingComorbids);
                   var data = $.param({ '': $rootScope.Global.Objects.SelectedPatient.UID });
                   ComorbidsService.GetPatientComorbids(data, $scope.onPatientComorbidsRetrieved);
               };

               $scope.onPatientComorbidsRetrieved = function (result) {
                   CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
                   try {
                       if (result.resultstatus === Status.ServiceCallStatus.Success && result.data && result.data.length > 0) {
                           var allComorbids = [];

                           angular.forEach(result.data, function (selComorbid) {
                               if (selComorbid.Status === Status.AccessStatus.Active) {
                                   $.extend(selComorbid, { ProviderName: selComorbid.MPAUID ? "" : "NOT ASSIGNED" });
                                   $.extend(selComorbid, { ComorbidCodeText: selComorbid.ComorbidCode ? $scope.getLookupItem("Comorbid", selComorbid.ComorbidCode) : " " });
                                   $.extend(selComorbid, { ComorbidGroupCodeText: selComorbid.ComorbidGroupCode ? $scope.getLookupItem("ComorbidGroup", selComorbid.ComorbidGroupCode) : " " });
                                   $.extend(selComorbid, { ComorbidDetailCodeText: selComorbid.ComorbidDetailCode ? $scope.getLookupItem("ComorbidDetail", selComorbid.ComorbidDetailCode) : " " });

                                   allComorbids.push(selComorbid);
                               }
                           });

                           $scope.model.Comorbids.data($filter('orderBy')(allComorbids, 'ReportedDate', true));

                           CommonFunctions.CreateScroller("comorbids-scroller");
                       }
                       $scope.model.comorbidsLoaded = true;
                       $scope.setDropDownData();
                   }

                   catch (ex) {
                       var errExp = {};
                       errExp.Exception = ex;
                       errExp.ModuleName = "Comorbids";
                       errExp.FunctionName = "onPatientComorbidsRetrieved";
                       errExp.StackTrace = printStackTrace({ e: ex });
                       ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                   }

                   CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
               };

               $scope.expandComorbidDetails = function (dataItem) {
                   if ($scope.currentDataItemUID === dataItem.UID) {
                       if ($("#comorbids-details-" + dataItem.UID).is(":visible")) {
                           $("#comorbids-details-" + dataItem.UID).hide();
                           $("#comorbids-details-" + dataItem.UID).parent().parent().addClass('comorbids-details-inactive').removeClass('comorbids-details-active');
                       }
                       else {
                           $("#comorbids-details-" + dataItem.UID).show();
                           $("#comorbids-details-" + dataItem.UID).parent().parent().addClass('comorbids-details-active').removeClass('comorbids-details-inactive');
                       }
                   }
                   else {
                       if ($scope.currentDataItemUID !== null) {
                           $("#comorbids-details-" + $scope.currentDataItemUID).hide();
                           $("#comorbids-details-" + $scope.currentDataItemUID).parent().parent().addClass('comorbids-details-inactive').removeClass('comorbids-details-active');
                       }
                       $("#comorbids-details-" + dataItem.UID).show();
                       $("#comorbids-details-" + dataItem.UID).parent().parent().addClass('comorbids-details-active').removeClass('comorbids-details-inactive');
                       $scope.currentDataItemUID = dataItem.UID;
                   }
               };

               $scope.getProviderAssociations = function () {
                   CommonFunctions.BlockKendoView("ptchart-splitview-main-pan", CommonMessages.BusyMessages.LoadingComorbids);
                   var data = $.param({ '': $rootScope.Global.Objects.SelectedPatient.UID });
                   ComorbidsService.GetProviderAssociations(data, 'POST', 'JSON', $scope.onGetProviderAssociationsRetrieved);
               };

               $scope.onGetProviderAssociationsRetrieved = function (result) {
                   CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
                   try {
                       if (result.resultstatus === Status.ServiceCallStatus.Success && result.data && result.data.length > 0) {

                           var providers = result.data;
                           $scope.model.Providers = [];

                           providers.splice(0, 0, {
                               "ProviderInfo": {
                                   "UID": null,
                                   "Name": "Select a value"
                               },
                               "AssociationType": null,
                               "UID": null
                           });

                           angular.forEach(providers, function (selPvd) {
                               if (selPvd.AssociationType !== "DC") {
                                   $.extend(selPvd, { ProviderName: "" });
                                   if (selPvd.AssociationType) {
                                       selPvd.ProviderName = $scope.getLookupItem(LookupTypes.AssociationType, selPvd.AssociationType) + " : " + selPvd.ProviderInfo.Name;
                                   }
                                   else {
                                       selPvd.ProviderName = selPvd.ProviderInfo.Name;
                                   }
                                   $scope.model.Providers.push(selPvd);
                               }
                           });
                       }
                       $scope.model.providersLoaded = true;
                       $scope.setDropDownData();
                   }
                   catch (ex) {
                       var errExp = {};
                       errExp.Exception = ex;
                       errExp.ModuleName = "Comorbids";
                       errExp.FunctionName = "onGetProviderAssociationsRetrieved";
                       errExp.StackTrace = printStackTrace({ e: ex });
                       ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                   }
                   finally {
                       $timeout(function () {
                           CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
                       }, 0, false);
                   }
               };

               $scope.setDropDownData = function () {
                   if ($scope.model.providersLoaded && $scope.model.comorbidsLoaded) {
                       angular.forEach($scope.model.Comorbids.data(), function (selComorbid) {
                           angular.forEach($scope.model.Providers, function (selPvd) {
                               if (selComorbid.MPAUID && selComorbid.MPAUID === selPvd.UID) {
                                   selComorbid.ProviderName = selPvd.ProviderName;
                                   return;
                               }
                           });
                       });

                       $scope.model.providersLoaded = false;
                       $scope.model.comorbidsLoaded = false;

                       $scope.model.ComorbidTypes = LookUp.GetParentChildLookupData(comorbidParentChildLookup);
                       $scope.model.ComorbidGroups = LookUp.GetParentChildLookUp(ComorbidGroupParentChildlookup);
                   }
               };

               $scope.comorbidTypeChanged = function () {
                   if ($scope.model.SelectedComorbid.ComorbidCode && $scope.model.SelectedComorbid.ComorbidCode.Value) {
                       $scope.model.SelectedComorbid.ComorbidDetailCode = "";
                       var parentLookupUID = null;
                       if ($scope.model.ComorbidGroups && $scope.model.ComorbidGroups.ChildLookup && $scope.model.ComorbidGroups.ChildLookup.LookupItems) {
                           angular.forEach($scope.model.ComorbidGroups.ChildLookup.LookupItems, function (child) {
                               if (child.Value === $scope.model.SelectedComorbid.ComorbidCode.Value && child.IsShownUI) {
                                   parentLookupUID = child.ParentLookupItemUID;
                                   return;
                               }
                           });

                           if (parentLookupUID && $scope.model.ComorbidGroups.ParentLookup && $scope.model.ComorbidGroups.ParentLookup.LookupItems) {
                               angular.forEach($scope.model.ComorbidGroups.ParentLookup.LookupItems, function (parent) {
                                   if (parent.UID === parentLookupUID) {
                                       $scope.model.SelectedComorbid.ComorbidGroupCodeText = parent.Text;
                                       $scope.model.SelectedComorbid.ComorbidGroupCode = parent.Value;
                                       return;
                                   }
                               });
                           }
                       }
                   }


                   if ($scope.$$childHead.addComorbidValidator) {
                       $scope.$$childHead.addComorbidValidator.validate();
                   }
               };

               $scope.showDeactivate = function (item) {
                   if (item.ComorbidCode === CommonConstants.ComorbidTypes.CKD || item.ComorbidCode === CommonConstants.ComorbidTypes.ESRD || item.ComorbidCode === CommonConstants.ComorbidTypes.TRANS || item.ComorbidCode === CommonConstants.ComorbidTypes.DT1 || item.ComorbidCode === CommonConstants.ComorbidTypes.DT2) {
                       return false;
                   }
                   else {
                       return true;
                   }
               };

               $scope.deactivateComorbid = function (item) {
                   CommonFunctions.Blockui();
                   $timeout(function () {
                       CommonFunctions.OpenCustomConfirmBox(CommonMessages.Alert.ConfirmMessage, CommonMessages.Alert.DeactivateComorbid, "Yes,No", function (data) {
                           if (data && data.returnValue) {
                               CommonFunctions.Blockui();

                               var sendData = {
                                   'DataState': CommonConstants.DataState.Modified,
                                   'MPAUID': item.MPAUID,
                                   'PatientUID': item.PatientUID,
                                   'ComorbidCode': item.ComorbidCode,
                                   'UID': item.UID,
                                   'ComorbidGroupCode': item.ComorbidGroupCode,
                                   'ComorbidDetailCode': item.ComorbidDetailCode,
                                   'ReportedDate': $filter('date')(item.ReportedDate, "MM/dd/yyyy"),
                                   'Status': 'I',
                                   'ResolveDate': $filter('date')(new Date(), "MM/dd/yyyy"),
                                   'OnSetDate': item.OnSetDate
                               };

                               ComorbidsService.SavePtComorbids(sendData, function (result) {
                                   CommonFunctions.Unblockui();
                                   if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                                       CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.ComorbidSaved);
                                       $scope.getPatientComorbidsDetails();
                                       $scope.getProviderAssociations();
                                       ComorbidsService.RefreshComorbidsCount();
                                   }
                               });
                           }
                           CommonFunctions.Unblockui();
                       });
                   }, 50, true);
               };

               $scope.getLookupItem = function (lookupType, item) {
                   return LookUp.GetValueByKey(lookupType, item).Text;
               };

               $scope.onAddEditComorbid = function (dataItem) {
                   if (!dataItem) {
                       var comorbidToBeAddeed = {
                           'DataState': CommonConstants.DataState.Added,
                           'MPAUID': null,
                           'PatientUID': $rootScope.Global.Objects.SelectedPatient.UID,
                           'ComorbidCode': "",
                           'UID': 0,
                           'ComorbidGroupCode': "",
                           'ComorbidDetailCode': "",
                           'ReportedDate': new Date(),
                           'Status': 'A',
                           'ResolveDate': new Date()
                       };
                       $scope.model.SelectedComorbid = comorbidToBeAddeed;

                       $scope.model.IsAddingComorbid = true;
                       $scope.model.IsEditingComorbid = false;
                   }
                   else {
                       $scope.model.IsEditingComorbid = true
                       $scope.model.IsAddingComorbid = false;

                       $scope.model.SelectedComorbid = angular.copy(dataItem);

                       var selComorbidType = null;
                       if (dataItem.ComorbidCode && $scope.model.ComorbidTypes && $scope.model.ComorbidTypes.length > 0) {
                           angular.forEach($scope.model.ComorbidTypes, function (lookupitem) {
                               if (lookupitem.Value === dataItem.ComorbidCode) {
                                   selComorbidType = lookupitem;
                                   return;
                               }
                           });
                       }

                       if (selComorbidType) {
                           $scope.model.SelectedComorbid.ComorbidCode = {
                               "Children": selComorbidType.Children,
                               "ParentLookUpItemUID": "",
                               "Text": selComorbidType.Text,
                               "Value": selComorbidType.Value,
                               "ToolTip": selComorbidType.ToolTip
                           };
                       }
                       else {
                           $scope.model.SelectedComorbid.ComorbidCode = {
                               "Children": [],
                               "ParentLookUpItemUID": "",
                               "Text": "",
                               "Value": dataItem.ComorbidCode,
                               "ToolTip": ""
                           };
                       }

                       $scope.comorbidTypeChanged();
                   }

                   if ($scope.$$childHead.addComorbidValidator) {
                       $scope.$$childHead.addComorbidValidator.hideMessages();
                   }

                   $timeout(function () {
                       $("#add-edit-comorbid-modalview").data("kendoMobileModalView").open();
                   }, 0, false);
               };

               $scope.onSavePtComorbid = function () {
                   if ($scope.model.SelectedComorbid && $scope.$$childHead.addComorbidValidator && $scope.$$childHead.addComorbidValidator.validate()) {

                       var datePicker = $("#comorbid-reporteddatepicker");
                       if (datePicker) {
                           $scope.model.SelectedComorbid.ReportedDate = datePicker.val();
                       }

                       var transdatePicker = $("#comorbid-transplantdatepicker");
                       if (transdatePicker) {
                           $scope.model.SelectedComorbid.OnSetDate = transdatePicker.val();
                       }

                       var sendData = {
                           'DataState': $scope.model.SelectedComorbid.UID === 0 ? CommonConstants.DataState.Added : CommonConstants.DataState.Modified,
                           'MPAUID': $scope.model.SelectedComorbid.MPAUID,
                           'PatientUID': $scope.model.SelectedComorbid.PatientUID,
                           'ComorbidCode': $scope.model.SelectedComorbid.ComorbidCode ? $scope.model.SelectedComorbid.ComorbidCode.Value : '',
                           'UID': $scope.model.SelectedComorbid.UID,
                           'ComorbidGroupCode': $scope.model.SelectedComorbid.ComorbidGroupCode,
                           'ComorbidDetailCode': $scope.model.SelectedComorbid.ComorbidDetailCode,
                           'ReportedDate': $filter('date')($scope.model.SelectedComorbid.ReportedDate, "MM/dd/yyyy"),
                           'Status': $scope.model.SelectedComorbid.Status,
                           'ResolveDate': $filter('date')($scope.model.SelectedComorbid.ResolveDate, "MM/dd/yyyy"),
                           'OnSetDate': $filter('date')($scope.model.SelectedComorbid.OnSetDate, "MM/dd/yyyy")
                       };

                       CommonFunctions.Blockui();
                       ComorbidsService.SavePtComorbids(sendData, function (result) {
                           CommonFunctions.Unblockui();
                           if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                               $("#add-edit-comorbid-modalview").data("kendoMobileModalView").close();
                               CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.ComorbidSaved);
                               if ($scope.model.IsAddingComorbid) {
                                   ComorbidsService.RefreshComorbidsCount();
                               }
                               $scope.model.IsAddingComorbid = false;
                               $scope.model.IsEditingComorbid = false;
                               $scope.getPatientComorbidsDetails();
                               $scope.getProviderAssociations();
                           }
                           else {
                               $scope.model.SelectedComorbid.ReportedDate = new Date();
                               if (sendData.ComorbidCode === CommonConstants.ComorbidTypes.TRANS || sendData.ComorbidCode === CommonConstants.ComorbidTypes.BMT) {
                                   $scope.model.SelectedComorbid.OnSetDate = new Date();
                               }
                           }
                       });
                   }
               };

               $scope.getPatientComorbidsDetails();

               $scope.getProviderAssociations();

               $scope.onCancelComorbidDetailsClick = function () {
                   $("#add-edit-comorbid-modalview").data("kendoMobileModalView").close();
                   $scope.model.IsAddingComorbid = false;
                   $scope.model.IsEditingComorbid = false;
               };

               /**
                * @ngdoc event 
                * @name onComorbidAddReviewClick
                * @eventOf roundingModule.controller:ComorbidsController
                * @param {string} menu menu item
                * @description 
                * ng-click event of Add Review
                */
               $scope.onComorbidAddReviewClick = function () {
                   try {
                       $timeout(function () {
                           $("#comorbid-reviewdate-modalview").kendoMobileModalView("open");
                       }, 0, false);
                   }
                   catch (ex) {
                       var errExp = {};
                       errExp.Exception = ex;
                       errExp.ModuleName = "Comorbids";
                       errExp.FunctionName = "onComorbidAddReviewClick";
                       errExp.StackTrace = printStackTrace({ e: ex });
                       ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                   }
               };

               /**
                * @ngdoc function 
                * @name getSurvey
                * @methodOf roundingModule.controller:ComorbidsController
                * @description       
                ** Calls ComorbidsService.GetSurveyDetails
                ** Changes UI behaviour  
                */
               $scope.getSurvey = function () {
                   try {
                       window.setTimeout(function () {
                           ComorbidsService.GetSurveyDetails({
                               PatientUID: $rootScope.Global.Objects.SelectedPatient.UID,
                               HarUID: '',
                               SurveyTypeCode: "ComorbidReview",
                               NoOfSurveys: 1
                           }, ComorbidsService.SetIntComorbidSurvey);
                           $scope.getLastComorbidReviewDateData();
                       }, 200);
                   }
                   catch (ex) {
                       var errExp = {};
                       errExp.Exception = ex;
                       errExp.ModuleName = "Medications";
                       errExp.FunctionName = "getSurvey";
                       errExp.StackTrace = printStackTrace({ e: ex });
                       ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                   }
               }
               /**
                * @ngdoc function 
                * @name getLastComorbidReviewDateData
                * @methodOf roundingModule.controller:ComorbidsController
                * @description       
                * Calls ComorbidsService.GetMedReviewDate
                ** Changes UI behaviour
                */
               $scope.getLastComorbidReviewDateData = function () {
                   try {
                       ComorbidsService.GetComorbidReviewDate($rootScope.Global.Objects.SelectedPatient.UID, function (result) {
                           if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                               if (result.data.length > 0) {
                                   ComorbidsService.SetLastComorbidReviewDate(result.data[0].ReviewDate);
                                   $scope.model.LastReviewDateShow = true;
                               }
                               else {
                                   $scope.model.LastReviewDateShow = false;
                               }
                           }
                       });
                   }
                   catch (ex) {
                       var errExp = {};
                       errExp.Exception = ex;
                       errExp.ModuleName = "Comorbids";
                       errExp.FunctionName = "getLastComorbidReviewDate";
                       errExp.StackTrace = printStackTrace({ e: ex });
                       ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                   }
               }

               /**
                * @ngdoc event 
                * @name onCreateMedsReviewClick
                * @eventOf roundingModule.controller:MedsReviewDateController
                * @description 
                ** k-on-tap event of Save button of MedsReview modal view
                ** Saves medication review date
                ** Calls ComorbidsService.GetIntMedicationSurvey
                ** Calls ComorbidsService.SaveSurveyDetails
                ** Closes modal view  
                */
               $scope.onCreateComorbidReviewClick = function () {
                   try {
                       if ($("#comorbid-review-calendar").data("kendoCalendar").value()) {
                           CommonFunctions.Blockui();
                           var survey = ComorbidsService.GetIntComorbidSurvey();

                           $scope.model.AddReviewDate = (new Date($("#comorbid-review-calendar").data("kendoCalendar").value())).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false);

                           var responseQuestions = [];
                           if (survey) {
                               var question = survey.QuestionGroups[0].Questions[0];
                               responseQuestions.push({ QuestionUID: question.UID, Responses: [{ OptionUID: question.Options[0].UID, FreeFormResponse: "" }] });
                           }
                           var surveyResponse = {
                               PatientUID: $rootScope.Global.Objects.SelectedPatient.UID,
                               SurveyTypeCode: survey.SurveyTypeCode,
                               SurveyUID: survey.SurveyUID,
                               ResponseQuestions: responseQuestions,
                               CompletedDate: (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                               SurveyStatus: "C",
                               StartDate: $scope.model.AddReviewDate,
                               MemSurveyUID: 0,
                               HARUID: 0,
                               Score: null,
                               Level: null,
                               SurveyComments: '',
                               RefusalReasonCode: "",
                               IncludePatientCommentYesNo: false,
                               IncludeProviderCommentYesNo: false,
                               DataState: 'Added',
                               ResponseQuestions: responseQuestions
                           };

                           ComorbidsService.SaveSurveyDetails(surveyResponse, function (result) {
                               if (result.resultstatus === Status.ServiceCallStatus.Success) {
                                   if ($scope.model.AddReviewDate) {
                                       $scope.model.LastReviewDateShow = true;
                                   }
                                   if (ComorbidsService.GetLastComorbidReviewDate() === "" || new Date($scope.model.AddReviewDate) > new Date(ComorbidsService.GetLastComorbidReviewDate())) {
                                       ComorbidsService.SetLastComorbidReviewDate($scope.model.AddReviewDate);
                                   }
                                   $scope.onCancelComorbidReviewClick();
                                   CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.ComorbidReviewCreated);
                               }
                               else {
                                   CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.ComorbidReviewCreateFailed);
                               }
                           });

                           CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
                           $scope.onCancelComorbidReviewClick();
                       }
                   }
                   catch (ex) {
                       var errExp = {};
                       errExp.Exception = ex;
                       errExp.ModuleName = "Comorbids";
                       errExp.FunctionName = "onCreateMedsReviewClick(onSaveSurveyDetails)";
                       errExp.StackTrace = printStackTrace({ e: ex });
                       ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                   }
               }

               /**
                * @ngdoc event 
                * @name onLastComorbidReviewDateRetrieved
                * @eventOf roundingModule.controller:ComorbidsController
                * @param {string} e event data
                * @param {string} arg arg with filter data
                * @description       
                ** subscriber of onLastComorbidReviewDateRetrieved broadcast event which will set $scope.model.LastReviewDate 
                ** Changes UI behaviour  
                */
               $scope.$on('onLastComorbidReviewDateRetrieved', function (e, arg) {
                   $timeout(function () {
                       $scope.model.LastReviewDate = arg.date;
                   }, 0, true);
               });

               /**
                * @ngdoc event 
                * @name onCancelMedsReviewClick
                * @eventOf roundingModule.controller:MedsReviewDateController
                * @description 
                ** k-on-tap event of Cancel Button of MedsReview Modal View
                ** Closes modal view  
                */
               $scope.onCancelComorbidReviewClick = function () {
                   CommonFunctions.Blockui();
                   $timeout(function () {
                       $("#comorbid-review-calendar").data("kendoCalendar").value("");
                       $("#comorbid-reviewdate-modalview").data("kendoMobileModalView").close();
                       CommonFunctions.Unblockui();
                   }, 50, true);
               };

               if ($scope.IsSNPESCOMarket == true) {
                   $scope.getSurvey();
               }
           });
}());