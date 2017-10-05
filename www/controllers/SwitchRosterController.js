/**
* @fileOverview Switch Roster documentation
* @author Amit Mistry
* @version 1.0
*/
(function () {
    /**
      * @ngdoc service
      * @name roundingModule.service:TeamUsersService
      * @description 
      ** TeamUsersService is used by SwitchRosterController       
      */
    angular.module('roundingModule').factory('TeamUsersService', function (ServiceConstants, RoundingService) {
        /**
        * @ngdoc method
        * @name AlertsService.getTeamUsers
        * @methodOf roundingModule.service:TeamUsersService
        * @description 
        ** This service method will be used to get all Teamuser Members from same role.
        * @param {object} data 
        * Contain capellaUserUid as input parameter for WebApi
        * @param {string} method
        * Method: GET/POST.
        * @param {object} dataType
        * DataType of the object example .JSON 
        * @param {object} callBack
        * $scope.onGetTeamUsersRetrieved.
        * @returns {object}
        * list of All Active members from same role
        */
        function getTeamUsers(data, method, dataType, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetTeamUsers, method, dataType, data, callBack);
        }        

        return {
            GetTeamUsers: getTeamUsers
        };
    });
}());

(function () {
    angular.module('roundingModule')
        /**
		 * @ngdoc controller
		 * @name roundingModule.controller:SwitchRosterController
		 * @description
		 ** Controller for Switch Roster View.
         * @property {kendo.data.DataSource} $scope.model              Intializing model .
         * @property {kendo.data.DataSource} $scope.model.SelectedUser Selected user details.        
		 */
        .controller('SwitchRosterController', function ($rootScope, $scope, $timeout, ExceptionService, CommonFunctions, TeamUsersService, 
                                                        Status, MyPatientsService) {
            
            $scope.model = {};        
            $scope.model.SelectedUser = null; 
                                   
            $("#switchroster-modalview").blur(function() {
                if ($(document.activeElement).closest(".k-window").length == 0) {                    
                    $("#switchroster-modalview").kendoMobileModalView("close");
                }
            });
            
            /**
             * @ngdoc event 
             * @name onUserSeleted
             * @eventOf roundingModule.controller:SwitchRosterController
             * @description
             ** AngularJS ng-click event called when user taps on any of the patients from Switch Roster screen.
             ** Selected member will be passed as a parameter.
             * @param {object} selUser
             * Details of the selected user.User will be set in model( as impersonate).
             */
            onUserSeleted = function (selUser) {
                try {
                    if (selUser) {
                        $scope.model.SelectedUser = selUser;
                    }
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "SwitchRosterController";
                    errExp.FunctionName = "onUserSeleted";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }
        
            /**
             * @ngdoc method 
             * @name onGetTeamUsersRetrieved
             * @methodOf roundingModule.controller:SwitchRosterController
             * @description
             ** method of roundingModule.MyPatientsController.onGetTeamUsersRetrieved
             ** service based call back function which returns list of members under VHN role.
             * @param {object} result
             * Details of list of VHN nurses.
             */
            $scope.onGetTeamUsersRetrieved = function(result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        var tempgrid = $("#switchroster-grid").data("kendoGrid");
                        if (tempgrid) {
                            tempgrid.destroy();
                            $("#switchroster-grid").html("");
                        }
                        $("#switchroster-grid").kendoGrid({
                            dataSource: new kendo.data.DataSource({
                                data: result.data
                            }),
                            sortable: true,
                            scrollable: true,
                            height: 450,
                            selectable: "row",
                            change: function (e) {
                                onUserSeleted(e.sender.dataItem(this.select()));
                            },
                            columns:[{
                                        field: "FirstName",
                                        title: "Name",                        
                                        template: function(dataItem) {
                                            return ((dataItem.FirstName + " " + dataItem.LastName)) ;
                                        }
                                    },{
                                        field: "DefaultRole",
                                        title: "Role",
                                        template: "#=DefaultRole#",
                                        width: "65px"
                                    }]
                        });
                        var scroller = $("#switchroster-grid").data("kendoMobileScroller");
                        if (!scroller) {
                            $("#switchroster-grid").kendoMobileScroller();
                        }
                    }
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "SwitchRoster";
                    errExp.FunctionName = "onGetTeamUsersRetrieved";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }
            
            /**
             * @ngdoc event 
             * @name switchRoster
             * @eventOf roundingModule.controller:SwitchRosterController
             * @description
             ** AngularJS ng-click event: When user tap on "Switch Roster" button under logout button screen and click switchroster option this event will be fired .
             ** Makes a service call to function "GetTeamUsers" from "TeamUserService" service.
             ** Display list of nurses under VHN role.
             */
            $scope.switchRoster = function() { 
                TeamUsersService.GetTeamUsers({ capellaUserUid: $rootScope.Global.Objects.CurrentUser.UID }, 'GET', 'JSON', $scope.onGetTeamUsersRetrieved);        
                
                $timeout(function() {            
                    $("#switchroster-modalview").data("kendoMobileModalView").open();          
                }, 0, false);
                
                $("#logOutPopOverMypts").data("kendoMobilePopOver").close();                         
            }
        
            /**
             * @ngdoc event 
             * @name onSwitchRoster
             * @eventOf roundingModule.controller:SwitchRosterController
             * @description
             ** AngularJS ng-click event: Will be fired when the user selects a name from the list of VHN nurses on the Switch Roster screen.
             ** Subscribes globally broadcasted "OnSwitchRosterEvent" from "MyPatientsService" service.
             */
            $scope.onSwitchRoster = function() {
                try {
                    if ($scope.model.SelectedUser) {
                        $rootScope.Global.Objects.SwitchedUser = $scope.model.SelectedUser;
                        $rootScope.Global.Objects.CurrentUser = $rootScope.Global.Objects.SwitchedUser;
                        $rootScope.Global.Objects.IsUserSwitched = true;
                        $scope.model.SelectedUser = null;
                        $("#switchroster-modalview").data("kendoMobileModalView").close();
                        MyPatientsService.OnSwitchRosterEvent();
                    }
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "SwitchRoster";
                    errExp.FunctionName = "onSwitchRoster";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }    
            }

            /**
             * @ngdoc event 
             * @name onMyRoster
             * @eventOf roundingModule.controller:SwitchRosterController
             * @description
             ** AngularJS event: Will be fired when the user taps of "My Roster" button on Switch Roster screen.
             ** Once fired, this event will take the user back to its current roster.
             ** Subscribes globally broadcasted "OnSwitchRosterEvent" from "MyPatientsService" service. 
             */
            $scope.onMyRoster = function() {
                try {    
                    $rootScope.Global.Objects.SwitchedUser = null;
                    $rootScope.Global.Objects.CurrentUser = $rootScope.Global.Objects.LoggedInUser;
                    $rootScope.Global.Objects.IsUserSwitched = false;
                    $scope.model.SelectedUser = null;
                    $("#switchroster-modalview").data("kendoMobileModalView").close();
                    MyPatientsService.OnSwitchRosterEvent();
                } 
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "MyPatients";
                    errExp.FunctionName = "onMyRoster";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }
        });
}());