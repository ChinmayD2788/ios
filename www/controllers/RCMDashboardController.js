/**
* @fileOverview RCMDashboard Documentation
* @author Chinmay Dhavale
* @version 1.0
*/

(function () {
	/**
	* @ngdoc service
	* @name roundingModule.service:RCMDashboardService
	* @description
	* Used by RCMDashboardController, RCMDashboardSortController & RCMDashboardFilterController
	* @param {function} $timeout AngularJS timeout function
	* @param {object} $rootScope Global scope object
	* @param {constant} ServiceConstants Service based constants from Constants.js 
	* @param {service} RoundingService Service calls to the API
    * @property {object} rcmDashboardSortType Sort type value
    * @property {object} rcmDashboardFilterType Filter type value
    * @property {array} filterList List of filter values
	*/
    angular.module('roundingModule').factory('RCMDashboardService', function ($timeout, $rootScope, ServiceConstants, RoundingService) {
        var rcmDashboardSortType = {};
        var rcmDashboardFilterType = {};
        var filterList = [];

		/**
		* @ngdoc function
		* @name getWorklist
		* @methodOf roundingModule.service:RCMDashboardService
		* @description 
		** API Call: worklist/getworklist
		** Function is used to retrieve list of patients from the API
		* @param {object} data Contains UserID of the current user
		* @param {function} callBack $scope.onGetWorklistRetrived function to retrieve patient's list for RCM role
		*/
        function getWorklist(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetWorkList, 'GET', 'JSON', data, callBack);
        }

		/**
		* @ngdoc function
		* @name setRCMDashboardSortType
		* @methodOf roundingModule.service:RCMDashboardService
        * @description
        ** Function is used to set the sort type so as to perform sorting of patients based on the value retrieved
        ** This function is broadcasted globally
        * @param {object} sorttype Object containing value to perform sorting
		*/
        function setRCMDashboardSortType(sorttype) {
            rcmDashboardSortType = sorttype;
            $timeout(function () {
                $rootScope.$broadcast('setRCMDashboardSortType', { "sorttype": sorttype });
            }, 0, false);
        }

		/**
		* @ngdoc function
		* @name getRCMDashboardSortType
		* @methodOf roundingModule.service:RCMDashboardService
        * @description
        * Function used to get values for sorting 
        * @returns {object} rcmDashboardSortType Returns objects containing value based on which sorting would take place
		*/
        function getRCMDashboardSortType() {
            return rcmDashboardSortType;
        }

		/**
		* @ngdoc function
		* @name setFilterList
		* @methodOf roundingModule.service:RCMDashboardService
        * @description
        * This function contains retrieves values based on which filteration is performed
        * @param {array} filterlist Array of objects containing values based on which filteration would take place
		*/
        function setFilterList(filterlist) {
            filterList = filterlist;
        }

		/**
		* @ngdoc function
		* @name getFilterList
		* @methodOf roundingModule.service:RCMDashboardService
        * @description
        * Returns array of objects containing values for filtering patients
        * @returns {array} filterList Returns array to objects to determine criteria for filteration of patients
		*/
        function getFilterList() {
            return filterList;
        }

		/**
		* @ngdoc function
		* @name setRCMDashboardFilterType
		* @methodOf roundingModule.service:RCMDashboardService
        * @description
        ** To set type of filter based on the selection from the Filter pop up
        ** This function is broadcasted globally
        * @param {object} filtertype Selected filter type on tap
		*/
        function setRCMDashboardFilterType(filtertype) {
            rcmDashboardFilterType = filtertype;
            $timeout(function () {
                $rootScope.$broadcast('setRCMDashboardFilterType', { "filtertype": filtertype });
            }, 0, false);
        }
		
		/**
		* @ngdoc function
		* @name getRCMDashboardFilterType
		* @methodOf roundingModule.service:RCMDashboardService
        * @description
        * Returns value for type of the filter selected
        * @returns {object} rcmDashboardFilterType Returns object containing Type of filter to be applied
		*/
        function getRCMDashboardFilterType() {
            return rcmDashboardFilterType;
        }

        return {
            GetWorklist: getWorklist,
            SetRCMDashboardSortType: setRCMDashboardSortType,
            GetRCMDashboardSortType: getRCMDashboardSortType,
            SetRCMDashboardFilterType: setRCMDashboardFilterType,
            GetRCMDashboardFilterType: getRCMDashboardFilterType,
            SetFilterList: setFilterList,
            GetFilterList: getFilterList
        };
    });
}());

(function () {
	/**
	* @ngdoc controller
	* @name roundingModule.controller:RCMDashboardController
	* @description
	** Main Controller for RCM Dashboard Screen
    ** Filter functionality is captured in {@link roundingModule.controller:RCMDashboardFilterController}
    ** Sort functionality is captured in {@link roundingModule.controller:RCMDashboardSortController}
    ** {@link roundingModule.service:RCMDashboardService}
    ** VersionOne Requirements - Home Screen/Worklist - Patient Details - <a href="https://www13.v1host.com/DaVitaInc/Task.mvc/Summary?oidToken=Task%3A186708">TK-19119</a>
    ** Supress Ability to switch roster - <a href="https://www13.v1host.com/DaVitaInc/Task.mvc/Summary?oidToken=Task%3A185673">TK-19065</a>
	* @property {object} $scope.model Model to store data for RCM Dashboard
	* @property {kendo.data.DataSource} $scope.model.WorkListData  Data source for worklist
	* @property {kendo.data.DataSource} $scope.model.CopyWorkListData Create a copy of work list data
	* @property {kendo.data.DataSource} $scope.model.MetricListData Data source for metric list
	* @property {kendo.data.DataSource} $scope.model.FilterListData Data source for filter list
	* @property {object} $scope.model.RCMDashboardSort Store patient data for sorting
	* @property {object} $scope.model.RCMDashboardFilter Store patient data for filtering
	*/
    angular.module('roundingModule')
        .controller('RCMDashboardController', function ($scope, $rootScope, $timeout, RCMDashboardService, ExceptionService, 
                                                        CommonMessages, CommonFunctions, RouteConstants, CommonConstants, Status, RCMDashboardConstants) {
            $scope.model = {};
            $scope.model.WorkListData = new kendo.data.DataSource({ data: [] });
            $scope.model.CopyWorkListData = new kendo.data.DataSource({ data: [] });
            $scope.model.MetricListData = new kendo.data.DataSource({ data: [] });   
            $scope.model.FilterListData = new kendo.data.DataSource({ data: [] });         
            $scope.model.RCMDashboardSort = { "Text": "Patient Name", "Dir": "asc", "Value": "LastName" };
            $scope.model.RCMDashboardFilter = { };
            
            $rootScope.Global.Objects.ShowOpenPatients = true;

            /**
            * @ngdoc event 
            * @name setRCMDashboardSortType
            * @eventOf roundingModule.controller:RCMDashboardController           
            * @description                
            ** Subscriber of setRCMDashboardSortType broadcasts
            ** Sorts worklist's patients list
            */
            $scope.$on('setRCMDashboardSortType', function(event, arg) {                 
                $timeout(function() {                     
                    $scope.model.RCMDashboardSort = arg.sorttype;   
                    
                    if ($scope.model.RCMDashboardSort) {
                        if ($scope.model.RCMDashboardSort.Value !== "") {                                                                 
                            $scope.model.WorkListData.sort([
                                                               { field: $scope.model.RCMDashboardSort.Value, dir: $scope.model.RCMDashboardSort.Dir }, 
                                                               { field: "LastName", dir: "asc" }
                                                           ]);                                                   
                            $scope.model.WorkListData.data($scope.model.WorkListData.view());                             
                        }   
                      
                        CommonFunctions.ResetScroller("rcmdb-listview");                       
                    } 
                }, 0, true);              
            });
            
            /**
            * @ngdoc event 
            * @name setRCMDashboardFilterType
            * @eventOf roundingModule.controller:RCMDashboardController           
            * @description                
            ** Subscriber of setRCMDashboardFilterType broadcasts
            ** Filters worklist's patients list
            */
            $scope.$on('setRCMDashboardFilterType', function(event, arg) {                 
                $timeout(function() {                     
                    $scope.model.RCMDashboardFilter = arg.filtertype;   
                    if ($scope.model.RCMDashboardFilter) {
                        if ($scope.model.RCMDashboardFilter.Name !== "") {                                                              
                            switch ($scope.model.RCMDashboardFilter.Name) {
                                case RCMDashboardConstants.RCMDashboardFilter.AllMyPatients:
                                    $scope.model.CopyWorkListData.filter({});
                                    break;
                                case RCMDashboardConstants.RCMDashboardFilter.NewAdmits:
                                    $scope.model.CopyWorkListData.filter({ field: "IsNewAdmit", operator: "eq", value: true });
                                    break;
                                case RCMDashboardConstants.RCMDashboardFilter.ReadmitHigh:
                                    $scope.model.CopyWorkListData.filter({ field: "ReadmitCategory", operator: "eq", value: 0 });
                                    break;
                                case RCMDashboardConstants.RCMDashboardFilter.ReadmitMed:
                                    $scope.model.CopyWorkListData.filter({ field: "ReadmitCategory", operator: "eq", value: 1 });
                                    break;
                                case RCMDashboardConstants.RCMDashboardFilter.ReadmitLow:
                                    $scope.model.CopyWorkListData.filter({ field: "ReadmitCategory", operator: "eq", value: 2 });
                                    break;
                                case RCMDashboardConstants.RCMDashboardFilter.NewPlacements:
                                    $scope.model.CopyWorkListData.filter({ field: "isNewPlacement", operator: "eq", value: true });
                                    break;
                                case RCMDashboardConstants.RCMDashboardFilter.ActiveCVC:
                                    $scope.model.CopyWorkListData.filter({ field: "ActiveAccess", operator: "eq", value: CommonConstants.AccessType.Catheter });
                                    //updated in angular rewrite as ActiveAccess value is Text now instead of number
                                    break;
                                case RCMDashboardConstants.RCMDashboardFilter.RecentlyDischarged:
                                    $scope.model.CopyWorkListData.filter({ field: "DischargeDate", operator: "neq", value: null });
                                    break;
                                default:
                            } 
                            $scope.model.WorkListData.data($scope.model.CopyWorkListData.view());                           
                        }   
                      
                        CommonFunctions.ResetScroller("rcmdb-listview");                       
                    } 
                }, 0, true);              
            });

			/**
			* @ngdoc function
			* @name onGetWorklistRetrived
			* @methodOf roundingModule.controller:RCMDashboardController
			* @description
			* Call back function for GetWorkList service call
			* @param {object} result
			* Contains Filter list, metric list and program detail data
			*/          
            $scope.onGetWorklistRetrived = function(result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data && result.data.ProgramDetail && result.data.MetricList) {                                                                             
                        if (result.data.MetricList.length > 0) {
                            $scope.model.MetricListData.data(result.data.MetricList);                            
                        }         

                        if (result.data.FilterList.length > 0) {
                            $scope.model.FilterListData.data(result.data.FilterList);
                            RCMDashboardService.SetFilterList(result.data.FilterList);
                            RCMDashboardService.SetRCMDashboardFilterType(result.data.FilterList[0]);
                        }
                        
                        if (result.data.ProgramDetail.length > 0) {
                            $scope.model.WorkListData.data(result.data.ProgramDetail);
                            $scope.model.CopyWorkListData.data(result.data.ProgramDetail);
                            RCMDashboardService.SetRCMDashboardSortType($scope.model.RCMDashboardSort);                             
                        }
                           
                        CommonFunctions.CreateScroller("rcmdb-listview"); 

                        //scroller for rcmdashboard-patients-view is added for each patient block when text is too long. Since the common function is creating scroller based on ID, can't use it here
                        var scrollerptview = $(".rcmdashboard-patients-view").data("kendoMobileScroller");
                        if (scrollerptview === null || scrollerptview === undefined) {
                            $(".rcmdashboard-patients-view").kendoMobileScroller();
                        } 
                        else {
                            scrollerptview.reset();
                        }
                    } 
                }

                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "RCMDashboardController";
                    errExp.FunctionName = "onGetWorklistRetrived";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
                CommonFunctions.UnblockKendoView("rcm-bottom-pane");                       
            }

			/**
			* @ngdoc event
			* @name onTap
			* @eventOf roundingModule.controller:RCMDashboardController
            * @description
            * Gets called when the user taps on any patient from the My Worklist screen
            * @param {object} patient Details of the selected patient
			*/
            $scope.onTap = function(patient) {
				CommonFunctions.Blockui();  
				var patientFound = CommonFunctions.GetPatientFromPresaveList(patient.UID);
				if(patientFound){
				   CommonFunctions.NavigatetoSelectedPatient(patientFound);
				} 
                else {
					if(!($rootScope.Global.Contacts.StopToOpenPatient())) {
						$rootScope.Global.Objects.SelectedPatient.Name = patient.LastName + ', ' + patient.FirstName,
						$rootScope.Global.Objects.SelectedPatient.UID = patient.UID,
						$rootScope.Global.Objects.SelectedPatient.ID = patient.ID						
											
						CommonFunctions.CreatePreSaveContact();
					}	
			    }

                CommonFunctions.Unblockui(); 
			}
			
			/**
			* @ngdoc function
			* @name show
			* @methodOf roundingModule.controller:RCMDashboardController
			* @description
			* Start point of the screen
			*/            
            $scope.show = function() {
                $scope.LoggedInUser = $rootScope.Global.Objects.LoggedInUser;
                CommonFunctions.BlockKendoView("rcm-bottom-pane", CommonMessages.BusyMessages.LoadingWorklist);
                RCMDashboardService.GetWorklist({ UID: $rootScope.Global.Objects.CurrentUser.UID }, $scope.onGetWorklistRetrived);  
            }
        
            $scope.show();
        })
		
		/**
		* @ngdoc controller
		* @name roundingModule.controller:RCMDashboardSortController
		* @description
		** Controller for RCMDashboard sort popover controller
		** VersionOne Requirements - Filter and sort patient list - <a href="https://www13.v1host.com/DaVitaInc/Task.mvc/Summary?oidToken=Task%3A226707">TK-21706</a>
        * @param {object} $scope Scope object
		* @param {service} RCMDashboardService Service Call
		* @param {service} ExceptionService service to handle error logs
		* @param {constants} RCMDashboardConstants RCMDashboard screen based constants
		* @param {functions} CommonFunctions Commonly used functions
		* @property {array} $scope.model.SortList Array of objects containing values for sorting
        * @property {object} $scope.model.RCMDashboardSortType Store Sort value after selection from sort list popover
		*/
        .controller('RCMDashboardSortController', function ($scope, RCMDashboardService, ExceptionService, 
                                                             RCMDashboardConstants, CommonFunctions) {
            $scope.model = {};
            $scope.model.SortList = [
                { "Text": RCMDashboardConstants.RCMDashboardSortTypeText.PatientNameText, "Dir": "asc", "Value": "LastName" }, 
                { "Text": RCMDashboardConstants.RCMDashboardSortTypeText.PatientTypeText, "Dir": "asc", "Value": "PatientAdmitType" },                                       
                { "Text": RCMDashboardConstants.RCMDashboardSortTypeText.AdmitDateText, "Dir": "asc", "Value": "AdmitDate" }, 
                { "Text": RCMDashboardConstants.RCMDashboardSortTypeText.DischargeDateText, "Dir": "asc", "Value": "DischargeDate" }, 
                { "Text": RCMDashboardConstants.RCMDashboardSortTypeText.UnitText, "Dir": "asc", "Value": "Unit" }, 
                { "Text": RCMDashboardConstants.RCMDashboardSortTypeText.RoomNumberText, "Dir": "asc", "Value": "RoomNumber" }, 
                { "Text": RCMDashboardConstants.RCMDashboardSortTypeText.HospitalText, "Dir": "asc", "Value": "Facility"}
            ]
                       
            //preselected value from previous selection
            $scope.model.RCMDashboardSortType = RCMDashboardService.GetRCMDashboardSortType();      
            
			/**
			* @ngdoc event
			* @name onSortClick
			* @eventOf roundingModule.controller:RCMDashboardSortController
            * @description
            ** Gets called when the user selects any option on sort list popover
            * @param {object} dataItem Contains data  of the selected option for sort 
			*/
            $scope.onSortClick = function (dataItem) {
                try {		                                 
                    $scope.model.RCMDashboardSortType = jQuery.extend({}, dataItem);
                    RCMDashboardService.SetRCMDashboardSortType($scope.model.RCMDashboardSortType); 
                    $("#popover-rcmdashboard-sortlist").data("kendoMobilePopOver").close();
                }		 
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "RCMDashboardSortController";
                    errExp.FunctionName = "onSortClick";
                    errExp.StackTrace = printStackTrace({ e: ex});
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }
        })
		/**
		* @ngdoc controller
		* @name roundingModule.controller:RCMDashboardFilterController
		* @description
		** Controller for Filter pop over on RCM Dashboard screen
        ** VersionOne Requirements - Filter and sort patient list - <a href="https://www13.v1host.com/DaVitaInc/Task.mvc/Summary?oidToken=Task%3A226707">TK-21706</a>
		* @param {object} $scope Scope object
		* @param {service} RCMDashboardService Service Call
		* @param {service} ExceptionService Service for error handling
		* @param {function} CommonFunctions Commonly used functions
		* @property {object} $scope.model.FilterList Array of objects containing values for filtering
        * @property {object} $scope.model.RCMDashboardFilterType Store filter values after selection from filter popover
		*/
        .controller('RCMDashboardFilterController', function ($scope, RCMDashboardService, ExceptionService, CommonFunctions) {
            $scope.model = {};
            $scope.model.FilterList = RCMDashboardService.GetFilterList();
             
            //preselected value from previous selection
            $scope.model.RCMDashboardFilterType = RCMDashboardService.GetRCMDashboardFilterType();      
             
			/**
			* @ngdoc event
			* @name onFilterClick
			* @eventOf roundingModule.controller:RCMDashboardFilterController
            * @description
            * Gets called when the user selects any option on  filter list popover
            * @param {object} dataItem Contains data  of the selected option for filtering
			*/
            $scope.onFilterClick = function (dataItem) {
                try {		                                 
                    $scope.model.RCMDashboardFilterType = jQuery.extend({}, dataItem);
                    RCMDashboardService.SetRCMDashboardFilterType($scope.model.RCMDashboardFilterType); 
                    $("#popover-rcmdashboard-filterlist").data("kendoMobilePopOver").close();
                }		 
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "RCMDashboardFilterController";
                    errExp.FunctionName = "onSortClick";
                    errExp.StackTrace = printStackTrace({ e: ex});
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }
        });
}());