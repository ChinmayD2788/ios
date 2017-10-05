/**
* @fileOverview My Patients Documentation
* @version 1.0
*/

(function () {
    /**
       * @ngdoc service
       * @name roundingModule.service:MyPatientsService
       * @description 
       ** MyPatientsService service is used by following controllers
       ** MyPatientsController
       ** MyPatientsDialysisCenterController
       ** MyPatientsSortlistController
       ** MyPatientsFilterController
       */
    angular.module('roundingModule').factory('MyPatientsService', function ($rootScope, $timeout, ServiceConstants, RoundingService) {

        /**
         * @ngdoc method
         * @name getPatients
         * @methodOf roundingModule.service:MyPatientsService
         * @description
         ** Makes a service call to "User/GetPatients".
         ** Used to get the list of patients for "My Patients" screen.
         * @param {object} data 
         * Contains "capellaUserUid" to retrived data from capella database
         * @param {string} method
         * Method: GET/POST.
         * @param {object} dataType
         * DataType of the return object.
         * @param {callBack} callBack
         * $scope.onGetPatientsRetrived.
         * @return {object}
         * List of Patients along with their details
         */
        function getPatients(data, method, dataType, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPatients, method, dataType, data, callBack);
        }

        /**
         * @ngdoc method
         * @name searchPatient
         * @methodOf roundingModule.service:MyPatientsService
         * @description 
         ** Makes a service call to "User/SearchPatient"
         ** This service method will be used to search patient.
         * @param {object} data 
         * Contains "capellaUserUid" and searchFilter to retrive data from capella database
         * @param {string} method
         * Method: GET/POST.
         * @param {object} dataType
         * DataType of the return object.
         * @param {callBack} callBack
         * $scope.onSearchPatientRetrieved.
         * @returns {object}
         * returns searched patient/s
         */
        function searchPatient(data, method, dataType, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.SearchPatient, method, dataType, data, callBack);
        }

        /**
         * @ngdoc method
         * @name getActionItems
         * @methodOf roundingModule.service:MyPatientsService
         * @description 
         ** This service method is used to get all alerts.
         * @param {object} data 
         * Contains capellaUserUid,datafilter(Alerts) EndDate and StartDate.  
         * @param {string} method
         * Method: GET/POST.
         * @param {object} dataType
         * DataType of the object, example:JSON 
         * @param {object} callBack
         * $scope.onGetActionItemsRetrieved in "AlertsController".
         * @returns {object}
         * list of ActionItems
         */
        function getActionItems(data, method, dataType, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetActionItems, method, dataType, data, callBack);
        }

        /**
         * @ngdoc method
         * @name updateAlert
         * @methodOf roundingModule.service:MyPatientsService
         * @description 
         ** This service method is used to update the alerts.
         * @param {data} data
         * Contains UID and CategoryCode (example AlbuminLessThan3_5) 
         * @param {string} method
         * Method: GET/POST.
         * @param {object} dataType
         * DataType of the object, example:JSON 
         * @param {callback} callBack
         * $scope.onUpdateAlertCompleted in "AlertsController"
         * @returns {string} string
         * Return true
         */
        function updateAlert(data, method, dataType, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.UpdateAlert, method, dataType, data, callBack);
        }

        /**
         * @ngdoc method
         * @name resetMyPatientsList
         * @methodOf roundingModule.service:MyPatientsService
         * @description 
         ** This service method is used to broadcast filter "resetMyPatientsList" which will be used in other controllers, Eg: MyPatientsSortlistController,alerts etc. 
         */
        function resetMyPatientsList(filter) {
            $rootScope.$broadcast('resetMyPatientsList', { "filter": filter });
        }

        /**
         * @ngdoc method
         * @name onDialysisCenterFilter
         * @methodOf roundingModule.service:MyPatientsService
         * @description 
         ** This service method is used for broadcast "onDialysisCenterFilter" for MyPatientsDialysisCenterController. It passes filter dialysis centername as parameter.
         */
        function onDialysisCenterFilter(filter) {
            $rootScope.$broadcast('onDialysisCenterFilter', { "filter": filter });
        }

        /**
         * @ngdoc method
         * @name MyPatientsService.onAddlFilterClick
         * @methodOf roundingModule.service:MyPatientsService
         * @description 
         ** This service method is used for broadcast onAddlFilterClick for controller(MyPatientsFilterController) .
         ** It passes data parameter(add filter name and checkbox value true or false).
         */
        function onAddlFilterClick(data) {
            $rootScope.$broadcast('onAddlFilterClick', { "filter": data });
        }

        /**
         * @ngdoc method
         * @name onSwitchRosterEvent
         * @methodOf roundingModule.service:MyPatientsService
         * @description 
         ** This service method is used to broadcast "SwitchRosterEvent". 
         */
        function onSwitchRosterEvent() {
            $timeout(function () {
                $rootScope.$broadcast('SwitchRosterEvent');
            }, 0, false);
        }

        /**
         * @ngdoc method
         * @name searchFilter
         * @methodOf roundingModule.service:MyPatientsService
         * @description 
         ** This service method is used to broadcast "onSearchPatients". 
         */
        function searchFilter(searchval) {
            $timeout(function () {
                $rootScope.$broadcast('onSearchPatients', { "filter": searchval });
            }, 0, false);
        }

        return {
            GetPatients: getPatients,            
            ResetMyPatientsList: resetMyPatientsList,            
            OnDialysisCenterFilter: onDialysisCenterFilter,            
            OnAddlFilterClick: onAddlFilterClick,            
            SearchPatient: searchPatient,            
            SearchFilter: searchFilter,            
            OnSwitchRosterEvent: onSwitchRosterEvent,            
            GetActionItems: getActionItems,            
            UpdateAlert: updateAlert
        };
    });
}());

(function () {
    angular.module('roundingModule')
        /**
		 * @ngdoc controller
		 * @name roundingModule.controller:MyPatientsController
		 * @description
		 ** Controller for My Patients screen.
         ** VersionOne Requirements - View Access - <a href="https://www13.v1host.com/DaVitaInc/Task.mvc/Summary?oidToken=Task%3A328561">TK-28503</a>
         * @property {boolean} $scope.IsSwitchRoster - will be used to show or hide Alerts.Intialized from global variable $rootScope.Global.Objects.LoggedInUser.
         * @property {boolean} $scope.LoggedInUser - set value of current login user from global variable $rootScope.Global.Objects.IsUserSwitched.
         * @property {boolean} $scope.ConsiderAlertFooter - To set up alerts at footer.
         * @property {boolean} $scope.IsErrorMsg - IsErrorMsg boolen property come along with error ErrorMessage property only show errormessage if this property will true .
         * @property {string}  $scope.ErrorMessage - dispaly error message for search patient.
         * @property {boolean} $scope.IsDataAvailable - will set true when model for mypatient will be filled..
         * @property {kendo.data.DataSource} roundingModule.MyPatientsController.model -  Intializing model with new Rounding.Models.MyPatients(); .
         * @property {kendo.data.DataSource} $scope.SearchSelectedPatient -  Data source will be set after Searched Selected patient. 
         * @property {kendo.data.DataSource} $scope.model.Patients -  filled patients list with patientschedule it will call patientSchedule(result.data) to set model
         * @property {kendo.data.DataSource} $scope.model.AllPatients  - filled patients back up copy to use everytime after set the filter or sort operation.
         * @property {array} $scope.model.PatientVM - array containing searched patient details.
         * @property {string} $scope.model.LastSortedBy - String value containing parameter on which last sorting of patients was performed.
         * @property {string} $scope.model.SelectDialysisCenter - Selection of dialysis center.
		 */
        .controller('MyPatientsController', function ($rootScope, $scope, $timeout, $filter, LookUp, LookupTypes, MyPatientsService, 
                                                      ExceptionService, CommonFunctions, RouteConstants, Status, MyPatientsConstants, CommonMessages, CommonConstants, PhoneTypeConstants) {
            var offSwitchRosterEvent;
                       
            $scope.model = new Rounding.Models.MyPatients();                        
            $scope.IsSwitchRoster = $rootScope.Global.Objects.IsUserSwitched;
            $scope.LoggedInUser = $rootScope.Global.Objects.LoggedInUser;

            //For showing or hiding Alerts
            $scope.ConsiderAlertFooter = false;

            $scope.SwitchedUserName = $rootScope.Global.Objects.IsUserSwitched ? ($rootScope.Global.Objects.CurrentUser.FirstName + " " + $rootScope.Global.Objects.CurrentUser.LastName) : "";            
            /* Search patients datamodel and Search window visibility variable */            
            $scope.ErrorMessage = "";        
            $scope.IsDataAvailable = false;
            $scope.IsErrorMsg = false;
            $scope.SearchSelectedPatient = null;

            $scope.$$listeners['onSearchPatients'] = [];
            $scope.$$listeners['SwitchRosterEvent'] = [];
            $scope.$$listeners['resetMyPatientsList'] = [];
			
            LookUp.GetLookUp(LookupTypes.PtStatus);
        
            $scope.$on('resetMyPatientsList', function (event, arg) {                                                     
                $scope.onSortClick(arg.filter);
            });

            $scope.$on('onSearchPatients', function (event, arg) {                                                     
                MyPatientsService.SearchPatient({ searchFilter: arg.filter, capellaUserUid: $rootScope.Global.Objects.CurrentUser.UID }, 'GET', 'JSON', $scope.onSearchPatientRetrieved);
            });
            

            /**
             * @ngdoc method 
             * @name onSearchPatientRetrieved
             * @methodOf roundingModule.controller:MyPatientsController
             * @description
             ** Service based call back function which returns search patients data
             * @param {object} result
             * result dataset of WebApi call MyPatientsService.SearchPatient.
             */
            $scope.onSearchPatientRetrieved = function(result) {
                try {
                    $scope.SearchSelectedPatient = null;

                    if (result.data) {
                        if (result.resultstatus === Status.ServiceCallStatus.Success && result.data.PatientsVM !== null && result.data.PatientsVM.length > 0) {
                            $scope.IsDataAvailable = true; 

                            $('#searchpatients-modalview').data('kendoMobileModalView').scroller.reset();

                            $scope.model.PatientVM = searchPatientVM(result.data.PatientsVM);

                            var searchpatientSource = new kendo.data.DataSource({
                                                                                    data: result.data.PatientsVM,
                                                                                    schema: {
                                    model: {
                                                                                                fields: {
                                                    ID: { type: 'number' },
                                                    DOB: { type: 'date' }
                                                }
                                                                                            }
                                }
                                                                                });

                            var tempgrid = $("#searchpatients-grid").data("kendoGrid");
                            if (tempgrid) {
                                tempgrid.destroy();
                                $("#searchpatients-grid").html("");
                            }

                            $("#searchpatients-grid").kendoGrid({                                                                    
                                                                    dataSource:null,
                                                                    sortable: true,
                                                                    scrollable: true,
                                                                    selectable: "row",
                                                                    height:500,
                                                                    change: function (e) {
                                                                        $scope.SearchSelectedPatient = e.sender.dataItem(this.select())                            
                                                                    },
                                                                    columns: [{
                                                                                field: "ID",
                                                                                title: "Member ID",
                                                                                width: 80
                                                                            },{
                                                                                field: "Name",
                                                                                title: "Name",
                                                                                template: "#=Name#"
                                                                            },{
                                                                                field: "DOB",
                                                                                title: "DOB",
                                                                                template: function(dataItem) {
                                                                                    return CommonFunctions.DateFunctions.dateFormat(dataItem.DOB, 'mm-dd-yyyy');
                                                                                },
                                                                                width: 80

                                                                            }, {
                                                                                field: "FormatedPhone",
                                                                                title: "Home Phone",                            
                                                                                sortable: {
                                                                                            compare: function (a, b) {
                                                                                                return getPhoneNumber(a.Phones) === getPhoneNumber(b.Phones) ? 0 : (getPhoneNumber(a.Phones) > getPhoneNumber(b.Phones)) ? 1 : -1;
                                                                                            }
                                                                                        },
                                                                                width:100
                                                                            },{
                                                                                field: "Payor",
                                                                                title: "Payor",
                                                                                template: '#=Payor#',
                                                                                width: 130
                                                                            },{
                                                                                field: "VHNName",
                                                                                title: "Assigned VHN",
                                                                                template: '#=VHNName#'
                                                                            }, {
                                                                                field: "FormatedEligibilityStatus",
                                                                                title: "Status"                          
                            
                                                                            }
                                ]
                                                                });

                            if (result.data.Message !== null) {                        
                                $scope.IsErrorMsg = true; 
                                $scope.ErrorMessage = result.data.Message;  
                            } 
                            else {
                                $scope.IsErrorMsg = false;                    
                            }

                            var grid = $("#searchpatients-grid").data("kendoGrid");
                            grid.setDataSource(searchpatientSource);                   
                            grid.clearSelection();
                            grid.select($("#searchpatients-grid").find("tr:eq(1)")[0]);
                            grid.bind("dataBound", griddataBound);
                            $("#searchpatients-grid").show();
                            $("#mypts-search-no-data").hide();   
                            $("#redirec-to-pat-div").show();                
                        } 
                        else {   
                            $scope.IsDataAvailable = false;                  
                            if (result.data.Message!== null) {                        
                                $scope.IsErrorMsg = true; 
                                $scope.ErrorMessage = result.data.Message;  
                            }
                            else {
                                $scope.IsErrorMsg = false; 
                            }
                      
                            $("#mypts-search-no-data").show();  
                            $("#searchpatients-grid").hide();
                            $("#redirec-to-pat-div").hide();                      
                        }

                        $timeout(function() {            
                            $("#searchpatients-modalview").kendoMobileModalView("open");          
                        }, 0, false);   
                    }
                    CommonFunctions.UnblockKendoView("mypts-listview-container");                   
                } 
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "SearchPatientController";
                    errExp.FunctionName = "onSearchPatientRetrieved";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
             * @ngdoc method 
             * @name searchPatientVM
             * @methodOf roundingModule.controller:MyPatientsController
             * @description
             ** Sub-function call to extend JSON's property "FormatedDOB","FormatedPhone" in the patients model from "onSearchPatientRetrieved" call back
             * @param {object} data
             * data-(WebApi call MyPatientsService.SearchPatient) .
             */
            searchPatientVM = function(data) {   
                angular.forEach(data, function(item, value) { 
                    if (item.DOB !== null || item.DOB !== "" || item.DOB !== undefined) {  
                        $.extend(item, {"FormatedDOB":CommonFunctions.DateFunctions.dateFormat((item.DOB), 'mm-dd-yyyy')});                                                               
                    }
                    else {
                        $.extend(item, {"FormatedDOB" : ""});
                    }
                    angular.forEach(item.Phones, function(val, itm) {                                       
                        if (val.Type === MyPatientsConstants.Sig.Low) {  
                            if (val.PhoneNumber.length > 0) {                                                                     
                                $.extend(item, {"FormatedPhone":CommonFunctions.FormatPhoneNumber(val.PhoneNumber)});
                            }
                            else {
                                $.extend(item, {"FormatedPhone":""});
                            }
                        }
                        else {
                            $.extend(item, {"FormatedPhone":""});
                        }
                    });

                    if (LookUp.GetValueByKey(LookupTypes.PtStatus, item.EligibilityStatus) !== null) {
                        if (item.EligibilityStatus.length > 0) {
                            $.extend(item, {"FormatedEligibilityStatus" : LookUp.GetValueByKey(LookupTypes.PtStatus, item.EligibilityStatus).Text });
                        }
                        else {
                            $.extend(item, {"FormatedEligibilityStatus" : ""});  
                        }
                    } 
                    else {
                        $.extend(item, {"FormatedEligibilityStatus" : ""});
                    }
                });                           
                   
                return data;
            }      

            /**
             * @ngdoc event 
             * @name griddataBound
             * @eventOf roundingModule.controller:MyPatientsController
             * @description
             ** Grid.griddataBound event called to bind data with #searchpatients-grid 
             * @param {object} e
             * Event parameter e contains property and subevents of grid.
             */
            function griddataBound(e) {
                try {
                    var grid = $("#searchpatients-grid").data("kendoGrid");
                    grid.clearSelection();
                    grid.select($("#searchpatients-grid").find("tr:eq(1)")[0]);
                    $scope.SearchSelectedPatient = e.sender.dataItem(this.select());
                } 
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "SearchPatientController";
                    errExp.FunctionName = "griddataBound";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }     

            /**
             * @ngdoc event 
             * @name searchPatient
             * @eventOf roundingModule.controller:MyPatientsController
             * @description
             ** AngularJS ng-click event. Calls "MyPatientsService.SearchFilter". 
             ** Search the patient entered in the "searchText"
             ** returned result will be displayed in new window.              
             */
            $scope.searchPatient = function () {
                $("#mypts-searchText").focus().blur();
                CommonFunctions.BlockKendoView("mypts-listview-container", CommonMessages.BusyMessages.LoadingMyPatients);
                MyPatientsService.SearchFilter($("#mypts-searchText").val());            
            }

            /**
             * @ngdoc event 
             * @name closeSearchModalDialog
             * @eventOf roundingModule.controller:MyPatientsController
             * @description
             ** ng-click event of Search Modal window to close the "Patient Search Result" screen.
             */
            $scope.closeSearchModalDialog = function() {
                $("#searchpatients-modalview").data("kendoMobileModalView").close();  
                $("#mypts-searchText").val('');         
            }

            /**
             * @ngdoc event 
             * @name redirectToPatientChart
             * @eventOf roundingModule.controller:MyPatientsController
             * @description
             ** AngularJS ng-click will be fired when the users taps on "Ok" button on "Patient Search Result" screen.              
             **  It redirects user to patient chart screen and will take either the name or memberid as parameter. 
             ** It first searches for the patient in Open Patients list, if found it navigates to patient chart or
             * else will call createpresavecontact method.
             */
            $scope.redirectToPatientChart = function() {
                $("#mypts-searchText").val(''); 
                if ($scope.SearchSelectedPatient !== null) {
				    var patientFound = CommonFunctions.GetPatientFromPresaveList($scope.SearchSelectedPatient.UID);
					if(patientFound){
						CommonFunctions.NavigatetoSelectedPatient(patientFound);
					} else {
						if(!($rootScope.Global.Contacts.StopToOpenPatient())) {
							$rootScope.Global.Objects.SelectedPatient = $scope.SearchSelectedPatient;        
							CommonFunctions.CreatePreSaveContact();
							$("#searchpatients-modalview").data("kendoMobileModalView").close();
							kendo.mobile.application.navigate(RouteConstants.PatientChart);
						}
					}
                } 
                else {
                    $("#searchpatients-modalview").data("kendoMobileModalView").close();                    
                }    
            }
            
            /**
             * @ngdoc method 
             * @name onGetPatientsRetrived
             * @methodOf roundingModule.controller:MyPatientsController
             * @description               
             ** Service based callback function which returns all patients.It will set 2 models 
             * $scope.model.Patients = patientSchedule(result.data) and 
             * $scope.model.AllPatients = $scope.model.Patients ,
             * which will be used throughout the view for all search/filter/sort operations.             
             * @param {object} result
             * Array containing details of all the patients .
             */
            $scope.onGetPatientsRetrived = function (result) {                
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {   
                        var colors = ['RED', 'YELLOW', 'GREEN', 'NONE'];
                        result.data.sort(function (a, b) {
                            var indexA = $.inArray(a.Indicators.Color.toString().toUpperCase(), colors);
                            var indexB = $.inArray(b.Indicators.Color.toString().toUpperCase(), colors);
                            return (indexA < indexB) ? -1 : (indexA > indexB) ? 1 : 0;
                        });

                        var flags = [], output = [], l = result.data.length, i;

                        var newObj = {
                            DialysisCenter: MyPatientsConstants.MyPatientTexts.AllPatients 
                        };

                        for (i = 0; i < l; i++) {
                            if (result.data[i].DialysisCenter !== null && result.data[i].DialysisCenter !== "") {
                                if (flags[result.data[i].DialysisCenter])
                                    continue;
                                flags[result.data[i].DialysisCenter] = true;
                                output.push(result.data[i]);
                            }
                        }

                        var sortedDC = output.sort(function (a, b) {
                            var textA = a.DialysisCenter.toUpperCase();
                            var textB = b.DialysisCenter.toUpperCase();
                            return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
                        });

                        sortedDC.splice(0, 0, newObj);

                        if (output !== null) {
                            $scope.model.DialysisCenters = sortedDC;
                        }
                    
                        $scope.model.Patients = patientSchedule(result.data);  
                        $scope.model.AllPatients = $scope.model.Patients;
                        CommonFunctions.CreateScroller("mypts-listview-container");                                                                                                          
                    }
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "MyPatients";
                    errExp.FunctionName = "onGetPatientsRetrived";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
                CommonFunctions.UnblockKendoView("mypts-bottom-pane");
            }
             
            /**
             * @ngdoc method 
             * @name patientSchedule
             * @methodOf roundingModule.controller:MyPatientsController
             * @description
             ** Patient's dialysis scheduled to be displayed. 
             * @param {object} data
             * return/yield (of WebApi call MyPatientsService.GetPatients).
             */
            patientSchedule = function(data) {     
                angular.forEach(data, function(item, value) {  
                    var ss = "";                                          
                    angular.forEach(item.Schedule, function(value, key) {    
                        if (key === "Shift" && value !== null) {
                            ss += value + "/";
                        }
                    });
                    angular.forEach(item.Schedule, function(value, key) {
                        if (key === MyPatientsConstants.Schedule.SchedIsMon && value) {
                            ss += "M";
                        }
                        if (key === MyPatientsConstants.Schedule.SchedIsTue && value) {
                            ss += "T";
                        }
                        if (key === MyPatientsConstants.Schedule.SchedIsWed && value) {
                            ss += "W";
                        }
                        if (key === MyPatientsConstants.Schedule.SchedIsThu && value) {
                            ss += "TH";
                        }
                        if (key === MyPatientsConstants.Schedule.SchedIsFri && value) {
                            ss += "F";
                        }
                        if (key === MyPatientsConstants.Schedule.SchedIsSat && value) {
                            ss += "SA";
                        }
                        if (key === MyPatientsConstants.Schedule.SchedIsSun && value) {
                            ss += "SU";                            
                        }                                                                 
                    });                 
                    $.extend(item, {"ptSchedule":ss});  
                });
                return data;
            }

            /**
             * @ngdoc event 
             * @name setIndicatorColor
             * @eventOf roundingModule.controller:MyPatientsController
             * @description
             ** Will be used to set the color for the patient on "My Patients" screen as left side pillar(red, green,ember etc). 
             ** Makes use of "SetIndicatorColor" common function.
             * @param {string} indicator
             * Color set for the selected patient
             * @returns {string} Returns color as a HEX value.
             */
            $scope.setIndicatorColor = function(indicator) {          
                return CommonFunctions.SetIndicatorColor(indicator);
            }

            var DELAY = 700, clicks = 0, timer = null;

            /**
             * @ngdoc event 
             * @name ontap
             * @eventOf roundingModule.controller:MyPatientsController
             * @description
             ** k-on-click event gets fired when user taps on any patient on Mypatients screen.
             ** Calls function "openPatients" to navigate to Patient Chart.
             * @param {object} patient
             * patient - parameter/object is coming from $scope of the listview click.
             */
            $scope.ontap = function (patient) {
                clicks++;  //count clicks
                if (clicks === 1) {
                    timer = setTimeout(function () {                        
                        openPatients(patient);   //perfom single click action
                    }, DELAY);
                } else {
                    clearTimeout(timer);    //prevent single-click action                    
                    clicks = 0;             //after action performed, reset counter                    
                    openPatients(patient);  //perfom double click action //If business doesn't want open patient on double click then comment this call.
                }                                 
			}  
            

            /**
             * @ngdoc event 
             * @name openPatients
             * @eventOf roundingModule.controller:MyPatientsController
             * @description
             ** Navigate to "Patient Chart" screen for the selected Patient.
             * @param {object} patient
             * selected patient from "My Patients" screen.
             */
            function openPatients(patient) {
                CommonFunctions.Blockui();
                var patientFound = CommonFunctions.GetPatientFromPresaveList(patient.UID);
				var isPatientFound = patientFound? true : false;
                if (isPatientFound) {
                    CommonFunctions.NavigatetoSelectedPatient(patientFound, false);
				}
                else {
                    if (patient.UID !== $rootScope.Global.Objects.SelectedPatient.UID && !($rootScope.Global.Contacts.StopToOpenPatient())) {
                        $rootScope.Global.Objects.SelectedPatient = patient;
                        offSwitchRosterEvent();
                        CommonFunctions.CreatePreSaveContact();
                    }
                }
                CommonFunctions.Unblockui();
            }

            /**
             * @ngdoc event 
             * @name onSortClick
             * @eventOf roundingModule.controller:MyPatientsController
             * @description
             ** Angular JS ng-click event will call for sort patients on the base of incoming value selected from filterpopover controller checkbox.
             * @param {string} val
             * Parameter either one(shift,sig,schedule)
             */
            $scope.onSortClick = function(val) {
                try {
                    var li = val;  
                    var sigOrder = ['H', 'M', 'L'];
                    var shiftOrder = ['1', '2', '3', '4', 'C', 'H', 'P'];

                    var unsortedPatients = $scope.model.Patients;

                    if (unsortedPatients !== null && unsortedPatients !== undefined) {
                        if (li === MyPatientsConstants.Sortorder.Sig && $scope.model.LastSortedBy !== MyPatientsConstants.Sortorder.Sig) {
                            unsortedPatients.sort(function (a, b) {
                                var indexA = $.inArray(a.SIG !== null ? a.SIG.toString().toUpperCase() : '', sigOrder);
                                var indexB = $.inArray(b.SIG !== null ? b.SIG.toString().toUpperCase() : '', sigOrder);
                                return (indexA < indexB) ? -1 : (indexA > indexB) ? 1 : 0;
                            });
                            $scope.model.LastSortedBy = MyPatientsConstants.Sortorder.Sig;
                            $scope.model.patients = unsortedPatients; 
                        } 
                        else if (li === MyPatientsConstants.Sortorder.Shift && $scope.model.LastSortedBy !== MyPatientsConstants.Sortorder.Shift) {

                            //Commented for ROUND-180 :  PROD- Sort functionality for "Shift

                            //unsortedPatients.sort(function (a, b) {
                            //    var indexA = $.inArray(a.Schedule.Shift !== null ? a.Schedule.Shift.toString().toUpperCase() : '', shiftOrder);
                            //    var indexB = $.inArray(b.Schedule.Shift !== null ? b.Schedule.Shift.toString().toUpperCase() : '', shiftOrder);
                            //    return (indexA < indexB) ? -1 : (indexA > indexB) ? 1 : 0;
                            //});

                            var sortShift = { "ShiftTemp": '' };
                            unsortedPatients.forEach(function (patient) {
                                $.extend(patient, sortShift);
                            });

                            unsortedPatients.forEach(function (patient) {

                                if (patient.Schedule.Shift) {
                                    if (patient.Schedule.Shift === MyPatientsConstants.Shift.Shift1st) {
                                        patient.ShiftTemp = patient.ShiftTemp + "1";
                                    }
                                    if (patient.Schedule.Shift === MyPatientsConstants.Shift.Shift2nd) {
                                        patient.ShiftTemp = patient.ShiftTemp + "2";
                                    }
                                    if (patient.Schedule.Shift === MyPatientsConstants.Shift.Shift3rd) {
                                        patient.ShiftTemp = patient.ShiftTemp + "3";
                                    }
                                    if (patient.Schedule.Shift === MyPatientsConstants.Shift.Shift4th) {
                                        patient.ShiftTemp = patient.ShiftTemp + "4";
                                    }
                                    if (patient.Schedule.Shift === MyPatientsConstants.Shift.Shift5th) {
                                        patient.ShiftTemp = patient.ShiftTemp + "5";
                                    }
                                    if (patient.Schedule.Shift === MyPatientsConstants.Shift.CenterNocturnal) {
                                        patient.ShiftTemp = patient.ShiftTemp + "a";
                                    }
                                    if (patient.Schedule.Shift === MyPatientsConstants.Shift.HomeHemo) {
                                        patient.ShiftTemp = patient.ShiftTemp + "b";
                                    }
                                    if (patient.Schedule.Shift === MyPatientsConstants.Shift.HomePD) {
                                        patient.ShiftTemp = patient.ShiftTemp + "c";
                                    }
                                }

                                if (patient.Schedule.SchedIsSun === true) {
                                    patient.ShiftTemp = "a";
                                }
                                if (patient.Schedule.SchedIsMon === true) {
                                    patient.ShiftTemp = patient.ShiftTemp + "b";
                                }
                                if (patient.Schedule.SchedIsTue === true) {
                                    patient.ShiftTemp = patient.ShiftTemp + "c";
                                }

                                if (patient.Schedule.SchedIsWed === true) {
                                    patient.ShiftTemp = patient.ShiftTemp + "d";
                                }

                                if (patient.Schedule.SchedIsThu === true) {
                                    patient.ShiftTemp = patient.ShiftTemp + "e";
                                }
                                if (patient.Schedule.SchedIsFri === true) {
                                    patient.ShiftTemp = patient.ShiftTemp + "f";
                                }
                                if (patient.Schedule.SchedIsSat === true) {
                                    patient.ShiftTemp = patient.ShiftTemp + "g";
                                }
                            });

                            unsortedPatients.sort(compareShift);

                            $scope.model.LastSortedBy = MyPatientsConstants.Sortorder.Shift;

                            $scope.model.Patients = unsortedPatients;
                        } 
                        else if (li === MyPatientsConstants.Sortorder.Schedule && $scope.model.LastSortedBy !== MyPatientsConstants.Sortorder.Schedule) {
                            var sortSchedule = { "ScheduleTemp": '' };
                            unsortedPatients.forEach(function (patient) {
                                $.extend(patient, sortSchedule);
                            });

                            unsortedPatients.forEach(function (patient) {
                                if (patient.Schedule.SchedIsSun === true) {
                                    patient.ScheduleTemp = "a";
                                }
                                if (patient.Schedule.SchedIsMon === true) {
                                    patient.ScheduleTemp = patient.ScheduleTemp + "b";
                                }
                                if (patient.Schedule.SchedIsTue === true) {
                                    patient.ScheduleTemp = patient.ScheduleTemp + "c";
                                }

                                if (patient.Schedule.SchedIsWed === true) {
                                    patient.ScheduleTemp = patient.ScheduleTemp + "d";
                                }

                                if (patient.Schedule.SchedIsThu === true) {
                                    patient.ScheduleTemp = patient.ScheduleTemp + "e";
                                }
                                if (patient.Schedule.SchedIsFri === true) {
                                    patient.ScheduleTemp = patient.ScheduleTemp + "f";
                                }
                                if (patient.Schedule.SchedIsSat === true) {
                                    patient.ScheduleTemp = patient.ScheduleTemp + "g";
                                }

                                if (patient.Schedule.Shift !== null) {
                                    if (patient.Schedule.Shift === MyPatientsConstants.Shift.Shift1st) {
                                        patient.ScheduleTemp = patient.ScheduleTemp + "a";
                                    }
                                    if (patient.Schedule.Shift === MyPatientsConstants.Shift.Shift2nd) {
                                        patient.ScheduleTemp = patient.ScheduleTemp + "b";
                                    }
                                    if (patient.Schedule.Shift === MyPatientsConstants.Shift.Shift3rd) {
                                        patient.ScheduleTemp = patient.ScheduleTemp + "c";
                                    }
                                    if (patient.Schedule.Shift === MyPatientsConstants.Shift.Shift4th) {
                                        patient.ScheduleTemp = patient.ScheduleTemp + "d";
                                    }
                                    if (patient.Schedule.Shift === MyPatientsConstants.Shift.Shift5th) {
                                        patient.ScheduleTemp = patient.ScheduleTemp + "e";
                                    }
                                    if (patient.Schedule.Shift === MyPatientsConstants.Shift.CenterNocturnal) {
                                        patient.ScheduleTemp = patient.ScheduleTemp + "f";
                                    }
                                    if (patient.Schedule.Shift === MyPatientsConstants.Shift.HomeHemo) {
                                        patient.ScheduleTemp = patient.ScheduleTemp + "g";
                                    }
                                    if (patient.Schedule.Shift === MyPatientsConstants.Shift.HomePD) {
                                        patient.ScheduleTemp = patient.ScheduleTemp + "h";
                                    }
                                }
                            });

                            unsortedPatients.sort(compare);
                            $scope.model.LastSortedBy = MyPatientsConstants.Sortorder.Schedule;                              
                            $scope.model.Patients = unsortedPatients;
                        }
                        else if (li === MyPatientsConstants.Sortorder.LastName && $scope.model.LastSortedBy !== MyPatientsConstants.Sortorder.LastName) {
                            unsortedPatients.sort(function (a, b) {
                                var indexA = a.Name.toUpperCase();
                                var indexB = b.Name.toUpperCase();
                                return (indexA < indexB) ? -1 : (indexA > indexB) ? 1 : 0;
                            });
                            $scope.model.LastSortedBy = MyPatientsConstants.Sortorder.LastName;
                            $scope.model.patients = unsortedPatients; 
                        }
                        else if (li === MyPatientsConstants.Sortorder.DialysisCenter && $scope.model.LastSortedBy !== MyPatientsConstants.Sortorder.DialysisCenter) {
                            unsortedPatients.sort(function (a, b) {
                                var indexA = a.DialysisCenter.toUpperCase();
                                var indexB = b.DialysisCenter.toUpperCase();
                                return (indexA < indexB) ? -1 : (indexA > indexB) ? 1 : 0;
                            });
                            $scope.model.LastSortedBy = MyPatientsConstants.Sortorder.DialysisCenter;
                            $scope.model.patients = unsortedPatients; 
                        } 
                    }
          
                    $scope.model.Patients = unsortedPatients;
                    CommonFunctions.CreateScroller("mypts-listview-container");                                        
                } 
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "MyPatients";
                    errExp.FunctionName = "onSortClick";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
             * @ngdoc method 
             * @name compare
             * @methodOf roundingModule.controller:MyPatientsController
             * @description
             ** As the name suggests, this function is used to compare two object/values for schedule.
             ** Used for sorting purpose, It is part of sub-function call for grid.              
             * @param {object} a
             * a - an object .
             * @param {object} b
             * b- an object. 
             */
            compare = function(a, b) {
                if (a.ScheduleTemp < b.ScheduleTemp)
                    return -1;
                if (a.ScheduleTemp > b.ScheduleTemp)
                    return 1;
                return 0;
            }

            /**
             * @ngdoc method 
             * @name compareShift
             * @methodOf roundingModule.controller:MyPatientsController
             * @description
             ** As the name suggests, this function is used to compare two object/values for Shift (Shifts sorted starting with 1 then 2 and so on).
             ** Used for sorting purpose, It is part of sub-function call for grid.              
             * @param {object} a
             * a - an object .
             * @param {object} b
             * b- an object. 
             */
            compareShift = function (a, b) {
                if (a.ShiftTemp < b.ShiftTemp)
                    return -1;
                if (a.ShiftTemp > b.ShiftTemp)
                    return 1;
                return 0;
            }

            /**
             * @ngdoc function
             * @name getPhoneNumber
             * @methodOf roundingModule.controller:MyPatientsController
             * @description
             ** Returns formated phone numbers. It is one of the sub-function.
             * @param {array} phones
             * Array containing phone details  Eg: PhoneNumber, StartDate, IsPrimary etc.
             * @returns {string} phonenumber
             * Phone number in a string format.
             */
            getPhoneNumber = function (phones) {
                var phonenumber = "-";
                for (var i = 0; i < phones.length; i++) {
                    if (phones[i] !== null && phones[i].Type === PhoneTypeConstants.Landline) {
                        phonenumber = CommonFunctions.FormatPhoneNumber(phones[i].PhoneNumber);
                        break;
                    }
                }
                return phonenumber;
            }

            /**
             * @ngdoc event 
             * @name clearSelectedFilter
             * @eventOf roundingModule.controller:MyPatientsController
             * @description
             ** AngularJS ng-click event.It will reset all checkboxes(filters).              
             */
            $scope.clearSelectedFilter = function () {
                $("#mypts-popover-sortlist input:radio").prop("checked", false);
                $("#mypts-filter-options-details-left input:checkbox").prop("checked", false);
                $("#mypts-filter-options-details-center-left input:checkbox").prop("checked", false);
                $("#mypts-filter-options-details-center input:checkbox").prop("checked", false);
                $("#mypts-filter-options-details-center-right input:checkbox").prop("checked", false);
                $("#mypts-filter-options-details-right input:checkbox").prop("checked", false);
                $("#mypts-filter-options-details-bottom input:checkbox").prop("checked", false);
            }           


            /**
             * @ngdoc event 
             * @name onDialysisCenterFilter
             * @eventOf roundingModule.controller:MyPatientsController
             * @description
             ** Subscribed event handler for "MyPatientsDialysisCenterController" broadcasted event "onDialysisCenterFilter" used when when dialysis center is filtered.
             * @param {object} event
             * The object contain event related methods and properties.
             * @param {object} arg
             * The object contain dialysiscenter name.
             */
            $scope.$on('onDialysisCenterFilter', function(event, arg) {
                try {
                    var filter = arg.filter;

                    $scope.model.Patients = [null];             

                    var selectedRow = filter;

                    $("#mypts-filter-box-id-btn").html(selectedRow + "<span class='icon-searchfilter km-text'></span>");

                    $scope.model.SelectDialysisCenter = filter;           

                    var output = [];
                    $scope.model.SelectedStatusCategory = ''
                    $scope.model.SelectedFlagCategory = ''
                    $scope.model.SelectedSigCategory = '';
                    $scope.model.SelectedShiftCategory = '';
                    $scope.model.SelectedScheduleCategory = '';
                    if ($scope.model.SelectDialysisCenter === MyPatientsConstants.MyPatientTexts.AllPatients) {                
                        $scope.model.Patients = $scope.model.AllPatients;  
                    } 
                    else {
                        $scope.model.AllPatients.forEach(function (patient) {
                            if (patient.DialysisCenter === $scope.model.SelectDialysisCenter) {
                                output.push(patient)
                            }
                        });
                
                        $scope.model.Patients = output;
                    }
                    CommonFunctions.CreateScroller("mypts-listview-container");                                      
                } 
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "MyPatients";
                    errExp.FunctionName = "onDialysisCenterFilterClick";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            });


            /**
             * @ngdoc event 
             * @name onAddlFilterClick
             * @eventOf roundingModule.controller:MyPatientsController
             * @description
             ** Subscribed event handler for "MyPatientsFilterController" broadcasted event "onAddlFilterClick" used when user clicks on one of the filters.                
             * @param {object} event
             * The object contain event related methods and properties.
             * @param {object} arg
             * The object contain list of filters.
             */
            $scope.$on('onAddlFilterClick', function(event, arg) {             
                try {
                    var filter = arg.filter;
                    var output = [];
                        
                    if ($scope.model.SelectDialysisCenter !== null) {
                        if ($scope.model.SelectDialysisCenter === MyPatientsConstants.MyPatientTexts.AllPatients) {
                            $scope.model.Patients = $scope.model.AllPatients;
                        }
                        else {
                            $scope.model.AllPatients.forEach(function (patient) {
                                if (patient.DialysisCenter === $scope.model.SelectDialysisCenter) {
                                    output.push(patient)
                                }
                            });                    
                            $scope.model.Patients = output;  
                        }
                    }
                    
                    var statusFilter = [];

                    if (filter.length > 0) {
                        filter.forEach(function (patientFilter) {
                            if (patientFilter === MyPatientsConstants.Filters.Enrolled || patientFilter === MyPatientsConstants.Filters.Engaged || patientFilter === MyPatientsConstants.Filters.Assessed || patientFilter === MyPatientsConstants.Filters.Transferred || patientFilter === MyPatientsConstants.Filters.Managed) {
                                statusFilter.push(patientFilter);
                            }
                        });
                        var flagMvpFilter = [];
                        filter.forEach(function (patientFilter) {
                            if (patientFilter === MyPatientsConstants.Filters.MVP) {
                                flagMvpFilter.push(patientFilter);
                            }
                        });

                        var flagReadmitFilter = [];
                        filter.forEach(function (patientFilter) {
                            if (patientFilter === MyPatientsConstants.Filters.Readmit) {
                                flagReadmitFilter.push(patientFilter);
                            }
                        });

                        var sigFilter = [];
                        filter.forEach(function (patientFilter) {
                            if (patientFilter === MyPatientsConstants.Filters.SigHigh || patientFilter === MyPatientsConstants.Filters.SigMedium || patientFilter === MyPatientsConstants.Filters.SigLow)
                                sigFilter.push(patientFilter);
                        });

                        var shiftScheduleFilter = [];
                        filter.forEach(function (patientFilter) {
                            if (patientFilter === MyPatientsConstants.Filters.One || patientFilter === MyPatientsConstants.Filters.Two || patientFilter === MyPatientsConstants.Filters.Three || patientFilter === MyPatientsConstants.Filters.Four
                                || patientFilter === MyPatientsConstants.Filters.Five || patientFilter === MyPatientsConstants.Filters.C || patientFilter === MyPatientsConstants.Filters.H || patientFilter === MyPatientsConstants.Filters.P)

                                shiftScheduleFilter.push(patientFilter);
                        });
                        var scheduleFilter = [];
                        filter.forEach(function (patientFilter) {
                            if (patientFilter === MyPatientsConstants.Filters.Mon || patientFilter === MyPatientsConstants.Filters.Tue || patientFilter === MyPatientsConstants.Filters.Wed || patientFilter === MyPatientsConstants.Filters.Thu || patientFilter === MyPatientsConstants.Filters.Fri
                                || patientFilter === MyPatientsConstants.Filters.Sat || patientFilter === MyPatientsConstants.Filters.Sun)

                                scheduleFilter.push(patientFilter);
                        });

                        var statusFilteredPatient = [];
                        var flagReadmitFilteredPatient = [];
                        var flagMvpFilteredPatient = [];
                        var sigFilteredPatient = [];
                        var schFilteredPatient = [];
                        var schedulefilteredPatient = [];
                        $scope.model.SelectedStatusCategory = '';
                        $scope.model.SelectedFlagCategory = '';
                        $scope.model.SelectedSigCategory = '';
                        $scope.model.SelectedShiftCategory = '';
                        $scope.model.SelectedScheduleCategory = '';
                        $scope.model.Patients.forEach(function (patient) {
                            if (statusFilter.length > 0) {
                                for (i = 0; i < statusFilter.length; i++) {
                                    if (patient.EligibilityStatus.toString().toUpperCase() === MyPatientsConstants.EligibilityStatus.Enrolled && statusFilter[i] === MyPatientsConstants.Filters.Enrolled) {
                                        statusFilteredPatient.push(patient);
                                    }
                                    if (patient.EligibilityStatus.toString().toUpperCase() === MyPatientsConstants.EligibilityStatus.Engaged && statusFilter[i] === MyPatientsConstants.Filters.Engaged) {
                                        statusFilteredPatient.push(patient);
                                    }
                                    if (patient.IsTransfered === true && statusFilter[i] === MyPatientsConstants.Filters.Transferred) {
                                        statusFilteredPatient.push(patient);
                                    }
                                    if (patient.EligibilityStatus.toString().toUpperCase() === MyPatientsConstants.EligibilityStatus.Assessed && statusFilter[i] === MyPatientsConstants.Filters.Assessed) {
                                        statusFilteredPatient.push(patient);
                                    }
                                     if (patient.EligibilityStatus.toString().toUpperCase() === MyPatientsConstants.EligibilityStatus.Managed && statusFilter[i] === MyPatientsConstants.Filters.Managed) {
                                        statusFilteredPatient.push(patient);
                                    }
                                }
                            }

                            if (flagMvpFilter.length > 0) {
                                for (i = 0; i < flagMvpFilter.length; i++) {
                                    if (patient.IsFrequentFlier !== null && patient.IsFrequentFlier === true && flagMvpFilter[i] === MyPatientsConstants.Filters.MVP) {
                                        flagMvpFilteredPatient.push(patient);
                                    }
                                }
                            }

                            if (flagReadmitFilter.length > 0) {
                                for (i = 0; i < flagReadmitFilter.length; i++) {
                                    if (patient.IsReadmit !== null && patient.IsReadmit === true && flagReadmitFilter[i] === MyPatientsConstants.Filters.Readmit) {
                                        flagReadmitFilteredPatient.push(patient);
                                    }
                                }
                            }

                            if (sigFilter.length > 0) {
                                for (i = 0; i < sigFilter.length; i++) {
                                    if (patient.SIG !== null && patient.SIG.toString().toUpperCase() === MyPatientsConstants.Sig.Medium && sigFilter[i] === MyPatientsConstants.Filters.SigMedium) {
                                        sigFilteredPatient.push(patient);
                                    }
                                    if (patient.SIG !== null && patient.SIG.toString().toUpperCase() === MyPatientsConstants.Sig.High && sigFilter[i] === MyPatientsConstants.Filters.SigHigh) {
                                        sigFilteredPatient.push(patient);
                                    }
                                    if (patient.SIG !== null && patient.SIG.toString().toUpperCase() === MyPatientsConstants.Sig.Low && sigFilter[i] === MyPatientsConstants.Filters.SigLow) {
                                        sigFilteredPatient.push(patient);
                                    }
                                }
                            }

                            if (shiftScheduleFilter.length > 0) {
                                for (i = 0; i < shiftScheduleFilter.length; i++) {
                                    if (patient.Schedule.Shift !== null && patient.Schedule.Shift === MyPatientsConstants.Shift.Shift1st && shiftScheduleFilter[i] === MyPatientsConstants.Shift.Shift1st) {
                                        schFilteredPatient.push(patient);
                                    }
                                    if (patient.Schedule.Shift !== null && patient.Schedule.Shift === MyPatientsConstants.Shift.Shift2nd && shiftScheduleFilter[i] === MyPatientsConstants.Shift.Shift2nd) {
                                        schFilteredPatient.push(patient);
                                    }
                                    if (patient.Schedule.Shift !== null && patient.Schedule.Shift === MyPatientsConstants.Shift.Shift3rd && shiftScheduleFilter[i] === MyPatientsConstants.Shift.Shift3rd) {
                                        schFilteredPatient.push(patient);
                                    }
                                    if (patient.Schedule.Shift !== null && patient.Schedule.Shift === MyPatientsConstants.Shift.Shift4th && shiftScheduleFilter[i] === MyPatientsConstants.Shift.Shift4th) {
                                        schFilteredPatient.push(patient);
                                    }
                                    if (patient.Schedule.Shift !== null && patient.Schedule.Shift === MyPatientsConstants.Shift.Shift5th && shiftScheduleFilter[i] === MyPatientsConstants.Shift.Shift5th) {
                                        schFilteredPatient.push(patient);
                                    }
                                    if (patient.Schedule.Shift !== null && patient.Schedule.Shift === MyPatientsConstants.Shift.CenterNocturnal && shiftScheduleFilter[i] === MyPatientsConstants.Shift.CenterNocturnal) {
                                        schFilteredPatient.push(patient);
                                    }
                                    if (patient.Schedule.Shift !== null && patient.Schedule.Shift === MyPatientsConstants.Shift.HomeHemo && shiftScheduleFilter[i] === MyPatientsConstants.Shift.HomeHemo) {
                                        schFilteredPatient.push(patient);
                                    }
                                    if (patient.Schedule.Shift !== null && patient.Schedule.Shift === MyPatientsConstants.Shift.HomePD && shiftScheduleFilter[i] === MyPatientsConstants.Shift.HomePD) {
                                        schFilteredPatient.push(patient);
                                    }
                                }
                            }

                            if (scheduleFilter.length > 0) {
                                for (i = 0; i < scheduleFilter.length; i++) {
                                    if (patient.Schedule.SchedIsMon === true && scheduleFilter[i] === MyPatientsConstants.Filters.Mon) {
                                        schedulefilteredPatient.push(patient);
                                    }
                                    if (patient.Schedule.SchedIsTue === true && scheduleFilter[i] === MyPatientsConstants.Filters.Tue) {
                                        schedulefilteredPatient.push(patient);
                                    }
                                    if (patient.Schedule.SchedIsWed === true && scheduleFilter[i] === MyPatientsConstants.Filters.Wed) {
                                        schedulefilteredPatient.push(patient);
                                    }
                                    if (patient.Schedule.SchedIsThu === true && scheduleFilter[i] === MyPatientsConstants.Filters.Thu) {
                                        schedulefilteredPatient.push(patient);
                                    }
                                    if (patient.Schedule.SchedIsFri === true && scheduleFilter[i] === MyPatientsConstants.Filters.Fri) {
                                        schedulefilteredPatient.push(patient);
                                    }
                                    if (patient.Schedule.SchedIsSat === true && scheduleFilter[i] === MyPatientsConstants.Filters.Sat) {
                                        schedulefilteredPatient.push(patient);
                                    }

                                    if (patient.Schedule.SchedIsSun === true && scheduleFilter[i] === MyPatientsConstants.Filters.Sun) {
                                        schedulefilteredPatient.push(patient);
                                    }
                                }
                            }
                        });

                        var finalFilteredPatient = [];
                        if (statusFilter.length > 0) {
                            $scope.model.SelectedStatusCategory = statusFilter.toString().replace(/,/g, ", ");
                            statusFilteredPatient = getDistinct(statusFilteredPatient);
                            finalFilteredPatient.push(statusFilteredPatient);
                        }

                        if (flagMvpFilter !== null && flagMvpFilter.length > 0) {
                            $scope.model.SelectedFlagCategory = flagMvpFilter.toString().replace(/,/g, ", ");
                            finalFilteredPatient.push(flagMvpFilteredPatient);
                        }

                        if (flagReadmitFilter !== null && flagReadmitFilter.length > 0) {                    
                            $scope.model.SelectedFlagCategory = $scope.model.SelectedFlagCategory.length > 0 ? $scope.model.SelectedFlagCategory + ", " + flagReadmitFilter.toString().replace(/,/g, ", ") : flagReadmitFilter.toString().replace(/,/g, ", ");
                            finalFilteredPatient.push(flagReadmitFilteredPatient);
                        }

                        if (sigFilter !== null && sigFilter.length > 0) {
                            var currentSig = [];
                            for (i = 0; i < sigFilter.length; i++) {
                                    if (sigFilter[i] === MyPatientsConstants.Filters.SigMedium) {
                                        currentSig.push(MyPatientsConstants.FilterLabel.Medium);
                                    }
                                    if (sigFilter[i] === MyPatientsConstants.Filters.SigHigh) {
                                        currentSig.push(MyPatientsConstants.FilterLabel.High);
                                    }
                                    if (sigFilter[i] === MyPatientsConstants.Filters.SigLow) {
                                        currentSig.push(MyPatientsConstants.FilterLabel.Low);
                                    }
                                }
                            $scope.model.SelectedSigCategory = currentSig.toString().replace(/,/g, ", ");
                            sigFilteredPatient = getDistinct(sigFilteredPatient);
                            finalFilteredPatient.push(sigFilteredPatient);
                        }

                        if (shiftScheduleFilter !== null && shiftScheduleFilter.length > 0) {
                            var currentShift = [];
                             for (i = 0; i < shiftScheduleFilter.length; i++) {
                                    if (shiftScheduleFilter[i] === MyPatientsConstants.Shift.Shift1st) {
                                        currentShift.push(MyPatientsConstants.FilterLabel.Shift1st);
                                    }
                                    if (shiftScheduleFilter[i] === MyPatientsConstants.Shift.Shift2nd) {
                                        currentShift.push(MyPatientsConstants.FilterLabel.Shift2nd);
                                    }
                                    if (shiftScheduleFilter[i] === MyPatientsConstants.Shift.Shift3rd) {
                                        currentShift.push(MyPatientsConstants.FilterLabel.Shift3rd);
                                    }
                                    if (shiftScheduleFilter[i] === MyPatientsConstants.Shift.Shift4th) {
                                        currentShift.push(MyPatientsConstants.FilterLabel.Shift4th);
                                    }
                                    if (shiftScheduleFilter[i] === MyPatientsConstants.Shift.Shift5th) {
                                        currentShift.push(MyPatientsConstants.FilterLabel.Shift5th);
                                    }
                                    if (shiftScheduleFilter[i] === MyPatientsConstants.Shift.CenterNocturnal) {
                                        currentShift.push(MyPatientsConstants.FilterLabel.CenterNocturnal);
                                    }
                                    if (shiftScheduleFilter[i] === MyPatientsConstants.Shift.HomeHemo) {
                                        currentShift.push(MyPatientsConstants.FilterLabel.HomeHemo);
                                    }
                                    if (shiftScheduleFilter[i] === MyPatientsConstants.Shift.HomePD) {
                                        currentShift.push(MyPatientsConstants.FilterLabel.HomePD);
                                    }
                             }
                            $scope.model.SelectedShiftCategory = currentShift.toString().replace(/,/g, ", ");
                            schFilteredPatient = getDistinct(schFilteredPatient);
                            finalFilteredPatient.push(schFilteredPatient);
                        }

                        if (scheduleFilter !== null && scheduleFilter.length > 0) {
                            $scope.model.SelectedScheduleCategory = scheduleFilter.toString().replace(/,/g, ", ");
                            schedulefilteredPatient = getDistinct(schedulefilteredPatient);
                            finalFilteredPatient.push(schedulefilteredPatient);
                        }

                        if (finalFilteredPatient !== null && finalFilteredPatient.length > 0) {
                            var result = finalFilteredPatient.shift().reduce(function (res, v) {
                                if (res.indexOf(v) === -1 && finalFilteredPatient.every(function (a) {
                                    return a.indexOf(v) !== -1;
                                }))
                                    res.push(v);
                                return res;
                            }, []);
                    
                            $scope.model.Patients = result;
                        }
                        
                        CommonFunctions.CreateScroller("mypts-listview-container");                                            
                    }
                } 
                catch (ex) { 
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "MyPatients";
                    errExp.FunctionName = "onAddlFilterClick";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            });

            /**
             * @ngdoc method 
             * @name getDistinct
             * @methodOf roundingModule.controller:MyPatientsController
             * @description
             ** Returns the distinct id's.                
             * @param {object} array
             * passed array object 
             */
            getDistinct = function(array) {
                var flags = [], output = [], l = array.length, i;
                for (i = 0; i < l; i++) {
                    if (flags[array[i].ID])
                        continue;
                    flags[array[i].ID] = true;
                    output.push(array[i]);
                }
                return output;
            }
              
            /**
             * @ngdoc event 
             * @name offSwitchRosterEvent
             * @eventOf roundingModule.controller:MyPatientsController
             * @description
             ** Subscribed event used to switch roster. It will check first boolean global variable <b><i>$rootScope.Global.Objects.IsUserSwitched</i></b> true then set the first and last name .
             */
            offSwitchRosterEvent = $scope.$on('SwitchRosterEvent', function() {        
                if ($rootScope.Global.Objects.IsUserSwitched) {                    
                    $scope.SwitchedUserName = $rootScope.Global.Objects.CurrentUser.FirstName + " " + $rootScope.Global.Objects.CurrentUser.LastName;
                    $scope.IsSwitchRoster = $rootScope.Global.Objects.IsUserSwitched;
                }
                else {
                    $scope.SwitchedUserName = "";
                    $scope.IsSwitchRoster = false;
                    $rootScope.Global.Objects.CurrentUser = $rootScope.Global.Objects.LoggedInUser;               
                }                                                                
                $scope.show();                      
            });
        

            /**
             * @ngdoc event 
             * @name show
             * @eventOf roundingModule.controller:MyPatientsController
             * @description
             ** This event call very first time and every call when controller loads.
             * It will set some of the default values like action filters and call "GetPatients" and "GetActionItems" 
             * service calls               
             * MyPatientsService.GetPatients  .
             */
            $scope.show = function() {  
                $("#mypts-popover-sortlist input:radio").prop("checked", false);
                $("#mypts-filter-box-id-btn").html('Filter Patients...' + "<span class='icon-searchfilter km-text'></span>");
                
               // CommonFunctions.BlockKendoView("mypts-listview-container", CommonMessages.BusyMessages.LoadingMyPatients);                

                CommonFunctions.BlockKendoView("mypts-bottom-pane", CommonMessages.BusyMessages.LoadingMyPatients);

                

                MyPatientsService.GetPatients({ capellaUserUid: $rootScope.Global.Objects.CurrentUser.UID }, 'GET', 'JSON', $scope.onGetPatientsRetrived);             
                               
            }            

            $scope.show();           
        })
         /**
		 * @ngdoc controller
		 * @name roundingModule.controller:MyPatientsDialysisCenterController
		 * @description
		 ** Controller for My Patient Dialysis Center.
		 */
        .controller('MyPatientsDialysisCenterController', function ($scope, MyPatientsService, ExceptionService, CommonFunctions) {

            /**
             * @ngdoc event 
             * @name onDialysisCenterFilterClick
             * @eventOf roundingModule.controller:MyPatientsDialysisCenterController
             * @description
             ** Calls service function "OnDialysisCenterFilter" from "MyPatientService" .            
             ** Broadcasted globally to be used by MyPatientsController.
             */
            $scope.onDialysisCenterFilterClick = function (val) {
                try {
                    MyPatientsService.OnDialysisCenterFilter(val);
                    CommonFunctions.CreateScroller("mypts-listview-container");                    
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "MyPatients";
                    errExp.FunctionName = "onDialysisCenterFilterClick";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }
        })

        /**
		 * @ngdoc controller
		 * @name roundingModule.controller:MyPatientsSortlistController
		 * @description
		 ** Controllers for My Patients Sorting list
		 */
        .controller('MyPatientsSortlistController', function ($scope, MyPatientsService, ExceptionService, CommonFunctions) {

            /**
             * @ngdoc event 
             * @name onSortClick
             * @eventOf roundingModule.controller:MyPatientsSortlistController
             * @description
             ** onsortclick event triggers "MyPatientsService.ResetMyPatientsList" to reset all patients list.
             * @param {object} val
             * parameter/object coming from $scope of the listview click. (shift,or sig etc.)
             */
            $scope.onSortClick = function (val) {
                try {
                    MyPatientsService.ResetMyPatientsList(val);              
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "MyPatients";
                    errExp.FunctionName = "onSortClick";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }        
        })
         /**
		 * @ngdoc controller
		 * @name roundingModule.controller:MyPatientsFilterController
		 * @description
		 ** Controller for MyPatients filter function .
         * @property {object} $scope.model.PatientFilter - Details of the filtered patients. 
		 */
        .controller('MyPatientsFilterController', function ($scope, MyPatientsService, ExceptionService, CommonFunctions) {
            $scope.model = {};

            $scope.model.PatientFilter = [];



            /**
             * @ngdoc event 
             * @name onAddlFilterClick
             * @eventOf roundingModule.controller:MyPatientsFilterController
             * @description
             ** Calls service function "OnAddlFilterClick" from "MyPatientService" .            
             ** Broadcasted globally to be used by MyPatientsController.
             ** Gets called when user clicks on one of the filter(check box).
             * @param {object} e
             * The object contain event related methods and properties.               
             */
            $scope.onAddlFilterClick = function (e) {
                try {
                    if (e.currentTarget.checked) {
                        if ($.inArray(e.currentTarget.value, $scope.model.PatientFilter) <= -1) {
                            $scope.model.PatientFilter.push(e.currentTarget.value);
                        }
                    }
                    else {
                        if ($.inArray(e.currentTarget.value, $scope.model.PatientFilter) > -1) {
                            $scope.model.PatientFilter.splice($.inArray(e.currentTarget.value, $scope.model.PatientFilter), 1);
                        }
                    }

                    MyPatientsService.OnAddlFilterClick($scope.model.PatientFilter);
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "MyPatients";
                    errExp.FunctionName = "onAddlFilterClick";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
            * @ngdoc event 
            * @name onClosePopOverClick
            * @eventOf roundingModule.controller:MyPatientsFilterController
            * @description       
            ** ng-click event of close button in contacts filter popover
            ** Changes UI behaviour
            */
             $scope.onClosePopOverClick = function () {
                 $("#FilterPopOverOption").data("kendoMobilePopOver").close();
                 $("#FilterPopOver").data("kendoMobilePopOver").close();
             }
        });
}());