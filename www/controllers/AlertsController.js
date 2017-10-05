(function () {
   /**
   * @ngdoc service
   * @name  roundingModule.service:AlertsService
   * @description 
   * Service Name: AlertsService        
   */

    angular.module('roundingModule').factory('AlertsService', function ($rootScope, $timeout, ServiceConstants, RoundingService) {
      /**
        * @ngdoc method
        * @name AlertsService.getActionItems
        * @methodOf roundingModule.service:AlertsService
        * @description This service method will use to get all alerts.
        * @param {object} data 
        * Contain capellaUserUid,datafilter(Alerts) EndDate and StartDate  
        * @param {string} method
        * Method: GET/POST.
        * @param {object} dataType
        * DataType of the object example .JSON 
        * @param {object} callBack
        * $scope.onGetActionItemsRetrieved.
        * @returns {object}
        * list of ActionItems
        */
        function getActionItems(data, method, dataType, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetActionItems, method, dataType, data, callBack);
        }
      /**
        * @ngdoc method
        * @name MyPatientsService.updateAlert
        * @methodOf roundingModule.service:AlertsService
        * @description This service method will update the alert
        * @param {data} data
        *  Contains UID and CategoryCode(example AlbuminLessThan3_5) 
        * @param {string} method
        * Method: GET/POST.
        * @param {object} dataType
        * DataType of the object example .JSON 
        * @param {callback} callBack
        * $scope.onUpdateAlertCompleted
        * @returns {string} string
        * Return true
        */
        function updateAlert(data, method, dataType, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.UpdateAlert, method, dataType, data, callBack);
        }       

        return {                     
            GetActionItems: getActionItems,
            UpdateAlert: updateAlert
        };
    });
}());

(function () {
    angular.module('roundingModule')    //Alerts Controller for Alerts Footer in all Screens    
        /**
		 * @ngdoc controller
		 * @name roundingModule.controller:AlertsController
		 * @description
		 * Controller Name: AlertsController
         * @property {boolean} $scope.AlertsModel.ActionItemsShow - Show All Actionitems after update alerts.
         * @property {int} $scope.AlertsModel.Total - Total is set on the base of result.data.length after onGetActionItemsRetrieved .         
         * @property {boolean} $scope.AlertsModel.MoreThanFivePatients - open all five patients this value will set to true.
         * @property {kendo.data.DataSource} $scope.AlertsModel.PatientAlerts - Intializing model PatientAlerts .
         * @property {kendo.data.DataSource} $scope.AlertsModel.SelectedRow - selected row for patient will hold entire object for selected patient.         
		 */
        .controller('AlertsController', function ($scope, $rootScope, $timeout, AlertsService, ExceptionService, CommonFunctions, CommonConstants,
                                                  $filter, CommonMessages, Status, RouteConstants) {
            $scope.AlertsModel = {};            
            $scope.AlertsModel.PatientAlerts = new kendo.data.DataSource({ data: [] });
            $scope.AlertsModel.Total = 0;            
            $scope.AlertsModel.ActionItemsShow = false;
            $scope.AlertsModel.MoreThanFivePatients = false;
            $scope.AlertsModel.SelectedRow = {};

            $scope.$$listeners['changeAlertsShowFlag'] = [];
            
            $scope.$on('changeAlertsShowFlag', function () {
                $timeout(function () {
                    $scope.AlertsModel.ActionItemsShow = false;
                }, 0, false);
            });

            
           /**
            * @ngdoc function
            * @name getAlerts
            * @methodOf roundingModule.controller:AlertsController
            * @description             
            * get action items of Type Alert 
            */            
            $scope.getAlerts = function () {
                var actionItemFilter = {
                    CapellaUserUID: $rootScope.Global.Objects.CurrentUser.UID,
                    DataFilter: [CommonConstants.ActionItemType.Alerts],
                    StartDate: $filter('date')(new Date(), "MM/dd/yyyy"),
                    EndDate: $filter('date')(new Date(), "MM/dd/yyyy")
                };
                AlertsService.GetActionItems(actionItemFilter, 'POST', 'JSON', $scope.onGetActionItemsRetrieved);
            }
            

            /**
            * @ngdoc function
            * @name onGetActionItemsRetrieved
            * @methodOf roundingModule.controller:AlertsController
            * @description             
            * service based call back function of GetActionItems Service call 
            * @param {object} result
            * return result data of WebApi call.
            */
            //call back function of GetActionItems Service call
            $scope.onGetActionItemsRetrieved = function (result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {                        
                        $scope.AlertsModel.PatientAlerts.data(result.data);
                        $scope.AlertsModel.PatientAlerts.sort({ field: "DueDate", dir: "desc" });
                        $scope.AlertsModel.Total = result.data.length > 0 ? result.data.length : 0;                        
                        $scope.AlertsGridOptions = {
                            dataSource: $scope.AlertsModel.PatientAlerts,
                            selectable: "row",                               
                            height: 220,
                            scrollable: {
                                virtual: true
                            },                                                      
                            change: function (e) {
                                onAlertSelected(e.sender.dataItem(this.select()));
                            },
                            columns: [{
                                        field: "DueDate", type: "date", width: "15px",
                                        template: "<span class='date-cell-color'>{{ dataItem.DueDate | date:'MMM-dd' }}</span>"                                            
                                    },
                                    { field: "PatientName", width: "25px", type: "string" },
                                    { field: "Description", width: "25px", type: "string" }
                               ]
                        };
                        
                        $timeout(function () {                         
                            $("#alerts-grid .k-grid-header").css('display', 'none');
                        }, 100, false);
                    } else {
                        $scope.AlertsGridOptions = {};
                        $scope.AlertsModel.PatientAlerts = new kendo.data.DataSource({ data: [] })
                        $scope.AlertsModel.Total = 0;                        
                        $timeout(function () {
                            $("#alerts-grid .k-grid-header").css('display', 'none');
                        }, 100, false);
                    }

                    if ($rootScope.Global.Contacts.PreSaveContactList && $rootScope.Global.Contacts.PreSaveContactList.length >= 5) {
                        $scope.AlertsModel.MoreThanFivePatients = true;
                    } else {
                        $scope.AlertsModel.MoreThanFivePatients = false;
                    }                    
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Alerts";
                    errExp.FunctionName = "onGetActionItemsRetrieved";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }
            
         /**
           * @ngdoc function
           * @name onUpdateAlertCompleted
           * @methodOf roundingModule.controller:AlertsController
           * @description             
           * service based call back function of UpdateAlert Service call 
           * @param {object} result
           * return result data of WebApi call.
           */
            //call back function of UpdateAlert service call
            $scope.onUpdateAlertCompleted = function (result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        //Refresh data of datagrid after update alert is successful 
                        //avoiding service call by removing selected alert from datasource
                        $scope.AlertsModel.PatientAlerts.remove($scope.AlertsModel.SelectedRow);
                        $scope.AlertsModel.Total = $scope.AlertsModel.PatientAlerts._total > 0 ? $scope.AlertsModel.PatientAlerts._total : 0;
                        $scope.actionItemsShowClick();

                        //If Open Patient are not more than five than update the selected patient in Global      
                        if (!$scope.AlertsModel.MoreThanFivePatients) {
                            CommonFunctions.UpdateSelectedPatient($scope.AlertsModel.SelectedRow);
                        }

                        var patientFound = CommonFunctions.GetPatientFromPresaveList($scope.AlertsModel.SelectedRow.PatientUID);
                        ////If Selected Patient already in Open Patients List then update the selected patient in Global and go to 
                        ////Contact Recap
                        if (patientFound) {
                            var selectedPatient = {
                                PatientName: patientFound.PtContacts.PtContacts[0].PatientName,
                                PatientUID: patientFound.PtContacts.PtContacts[0].PatientUID,
                                ID: patientFound.PtContacts.PtContacts[0].PatientID
                            }
                            
                            CommonFunctions.UpdateSelectedPatient(selectedPatient);
                            kendo.mobile.application.navigate(RouteConstants.ContactRecap);
                            return;
                        }
                      
                        if (!$scope.AlertsModel.MoreThanFivePatients) {
                            CommonFunctions.CreatePreSaveContact();
                        }                        
                    }
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Alerts";
                    errExp.FunctionName = "onUpdateAlertCompleted";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }
            
            /**
           * @ngdoc function
           * @name onAlertSelected
           * @methodOf roundingModule.controller:AlertsController
           * @description             
           * Alert selected from Grid showing message confirm whether user wants to acknowledge 
           * @param {object} selectedRow
           * selectedrow contain patient information.
           */
            //Alert selected event
            onAlertSelected = function (selectedRow) {
                try {
                    //set the selected Patient locally for use in other functions                          
                    $scope.AlertsModel.SelectedRow = selectedRow;
                    //If there are 5 or more patients in opened show alert message
                    if ($scope.AlertsModel.MoreThanFivePatients) {
                        CommonFunctions.DisplayAlertMessage(CommonMessages.Alert.MaxNumberOfPatientMessage, onAlertSelectionAcknowledge);
                    }
                    else {
                        onAlertSelectionAcknowledge();
                    }                                     
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Alerts";
                    errExp.FunctionName = "onAlertSelected";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }
            
         /**
           * @ngdoc function
           * @name onAlertSelectionAcknowledge
           * @methodOf roundingModule.controller:AlertsController
           * @description             
           * After showing above message confirm whether user wants to acknowledge,set the selected Patient locally   
           * @param {object} result
           * set patient.
           */
            onAlertSelectionAcknowledge = function () {
                //after showing above message confirm whether user wants to acknowledge
                CommonFunctions.OpenCustomConfirmBox('Confirm', CommonMessages.Alert.PatientAlertAcknowledge, "Yes,No", function (data) {
                    if (data && data.returnValue) {
                        //set the selected Patient locally                                                 
                        var actionItemAlert = { UID: $scope.AlertsModel.SelectedRow.UID, CategoryCode: $scope.AlertsModel.SelectedRow.CategoryCode };
                        AlertsService.UpdateAlert(actionItemAlert, 'POST', 'JSON', $scope.onUpdateAlertCompleted);
                    }
                });
            }
            
            /**
            * @ngdoc event
            * @name actionItemsShowClick
            * @eventOf roundingModule.controller:AlertsController
            * @description 
            * Animation for Alerts Show/hide alerts slide updown 
            */
            
            $scope.actionItemsShowClick = function () {
                try {
                    if ($scope.AlertsModel.Total === 0 && !$scope.AlertsModel.ActionItemsShow) {
                        return;
                    }

                    if ($scope.AlertsModel.ActionItemsShow === false) {
                        $(".actionitems-view").removeClass("alerts-slide-down").addClass("alerts-slide-up");
                        $scope.AlertsModel.ActionItemsShow = true;
                    } else {
                        $(".actionitems-view").removeClass("alerts-slide-up").addClass("alerts-slide-down");
                        $scope.AlertsModel.ActionItemsShow = false;
                    }
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Alerts";
                    errExp.FunctionName = "actionItemsShowClick";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }
          /**
            * @ngdoc event
            * @name $scope.$watch
            * @eventOf roundingModule.controller:AlertsController
            * @description 
            * Tracking changes of Alerts Total.helpful when contact postponed from contact recap screen.This $watch update total count of Alert. 
            */
            
            $scope.$watch("AlertsModel.Total", function () {
                //whether to show Alert Footer if Alert Count is Zero(PatientChart, ContactRecap)
                if ($scope.$parent.ConsiderAlertFooter) {
                    $rootScope.Global.Objects.ShowAlerts = $scope.AlertsModel.Total != 0;
                } else {
                    $rootScope.Global.Objects.ShowAlerts = true;
                }
            });
            
            //start point of the alerts
            $scope.getAlerts();
        });
}());