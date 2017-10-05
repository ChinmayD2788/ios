(function () {
    /**
     * @ngdoc service
     * @author Sandeep Parmar
     * @name roundingModule.service:MyTasksService
     * @description     
     ** MyTaskService is being used by MyTasksController, AddNewTaskController and CompleteTaskController
     ** This will be used for all service calls for My Tasks Screen
     * @property {array} completetaskdata local variable
     */
    angular.module('roundingModule').factory('MyTasksService', function ($rootScope, ServiceConstants, RoundingService, $timeout) {
        var completetaskdata = [];

        /**
         * @ngdoc function 
         * @name AddTask
         * @methodOf roundingModule.service:MyTasksService
         * @param {Object} data taskToBeAdded
         * @param {function} callBack $scope.onCreateNewTaskCompleted
         * @description       
         ** AddTask Calls api 'Patient/AddTask' using RoundingService
         */
        function addTask(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.AddTask, 'POST', 'JSON', data, callBack);
        }

        /**
         * @ngdoc function 
         * @name GetActionItems
         * @methodOf roundingModule.service:MyTasksService
         * @param {Object} data actionItemFilter
         * @param {function} callBack $scope.onGetActionItemsRetrieved        
         * @description       
         ** GetActionItems Calls api 'User/GetActionItems' using RoundingService
         */
        function getActionItems(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetActionItems, 'POST', 'JSON', data, callBack);
        }

        /**
         * @ngdoc function 
         * @name SaveTaskDelegation
         * @methodOf roundingModule.service:MyTasksService
         * @param {Object} data taskToBeDelegated
         * @param {function} callBack $scope.onSaveTaskDelegationRetrieved      
         * @description       
         ** SaveTaskDelegation Calls api 'User/SaveTaskDelegation' using RoundingService 
         */
        function saveTaskDelegation(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.SaveTaskDelegation, 'POST', 'JSON', data, callBack);
        }

        /**
         * @ngdoc function 
         * @name UpdateTask
         * @methodOf roundingModule.service:MyTasksService
         * @param {Object} data tasksToBeUpdated
         * @param {function} callBack $scope.onUpdateTaskCompleted      
         * @description       
         ** UpdateTask Calls api 'Patient/UpdateTask' using RoundingService 
         */
        function updateTask(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.UpdateTask, 'POST', 'JSON', data, callBack, true);
        }

        /**
         * @ngdoc function 
         * @name SetCompleteTaskData
         * @methodOf roundingModule.service:MyTasksService
         * @param {Object} value completetaskdata         
         * @description       
         ** sets local variable completetaskdata from value
         */
        function setCompleteTaskData(value) {
            completetaskdata = value;
        }

        /**
         * @ngdoc function 
         * @name GetCompleteTaskData
         * @methodOf roundingModule.service:MyTasksService
         * @returns {Object} completetaskdata          
         * @description       
         ** returns local variable completetaskdata
         */
        function getCompleteTaskData() {
            return completetaskdata;
        }

        /**
         * @ngdoc function 
         * @name RefreshActionItems
         * @methodOf roundingModule.service:MyTasksService           
         * @description       
         ** Broadcasts refreshActionItems
         */
        function refreshActionItems() {
            $timeout(function () {
                $rootScope.$broadcast('refreshActionItems');
            }, 0, false);
        }

        return {
            AddTask: addTask,
            GetActionItems: getActionItems,
            SaveTaskDelegation: saveTaskDelegation,
            UpdateTask: updateTask,
            SetCompleteTaskData: setCompleteTaskData,
            GetCompleteTaskData: getCompleteTaskData,
            RefreshActionItems: refreshActionItems
        };
    });
}());

(function () {
    angular.module('roundingModule')
        .controller('MyTasksController', function ($rootScope, $scope, $timeout, LookUp, LookupTypes, MyTasksService, PatientChartService, ExceptionService, CommonFunctions,
            PtDetailFilterConstants, CommonConstants, ScreenConstants, Status, CommonMessages, RouteConstants, AddTaskConstants)
            /**
            * @ngdoc controller
            * @name roundingModule.controller:MyTasksController
            * @description 
            ** Main Controller for My Tasks Screen 
            
            * @property {object} $scope.MyTaskmodel                           model of MyTasksController
            * @property {kendo.data.DataSource} $scope.MyTaskmodel.Taskslist  property of $scope.MyTaskmodel used for tasks listview
            */ {
            $scope.$$listeners['refreshActionItems'] = [];

            //Load the lookups
            LookUp.GetLookUp(LookupTypes.AssociationType);
            LookUp.GetLookUp(LookupTypes.FollowupTasks);

            $scope.MyTaskmodel = {}
            $scope.MyTaskmodel.Taskslist = new kendo.data.DataSource({ data: [] });
            //  $scope.IsVisibleDueDatePnl = true;
            $scope.taskTobedlgt = {};
            
            
            /**
             * @ngdoc event 
             * @name refreshActionItems
             * @eventOf roundingModule.controller:MyTasksController           
             * @description       
             ** subscriber of refreshActionItems broadcast event which will call getActionItems()
             */
            $scope.$on('refreshActionItems', function () {
                $timeout(function () {
                    $scope.getActionItems();
                }, 0, false);
            });

            /**
             * @ngdoc function 
             * @name showMyTasks
             * @methodOf roundingModule.controller:MyTasksController           
             * @description    
             ** Calls getActionItems which will return Tasks
             ** Also calls getPatientDetails once tasks are retrieved       
             */
            $scope.showMyTasks = function () {
                $timeout(function () {
                    if ($rootScope.Global.Objects.SelectedPatient) {
                        CommonFunctions.BlockKendoView("ptchart-ptdetails-container", CommonMessages.BusyMessages.LoadingPtDetails); 
                        if (LookUp.GetLookUp(LookupTypes.FollowupTasks) === undefined) {
                            window.setTimeout(function () {
                                $scope.getActionItems();
                            }, 2500);
                        } else {
                            $scope.getActionItems();
                        }
                    }

                    $timeout(function () {
                        $rootScope.$broadcast('getPatientDetails');
                    }, 0, false);
                }, 100, true);
            }

            /**
             * @ngdoc function 
             * @name getActionItems
             * @methodOf roundingModule.controller:MyTasksController           
             * @description       
             ** Calls MyTasksService.GetActionItems.
             */
            $scope.getActionItems = function () {
                try {
                    CommonFunctions.BlockKendoView("ptchart-mytasks", CommonMessages.BusyMessages.LoadingTasks);
                    var now = new Date();
                    var daysinpast = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14);
                    var daysinfuture = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());
                    if ($rootScope.Global.Objects.ClientConfig != null && $rootScope.Global.Objects.ClientConfig != undefined) {
                        daysinpast = new Date(now.getFullYear(), now.getMonth(), now.getDate() - $rootScope.Global.Objects.ClientConfig.ActionItemsDaysPast);
                        daysinfuture = new Date(now.getFullYear(), now.getMonth(), now.getDate() + $rootScope.Global.Objects.ClientConfig.ActionItemsDaysFuture);
                    }

                    var actionItemFilter = {
                        CapellaUserUID: $rootScope.Global.Objects.CurrentUser.UID,
                        PtUID: $rootScope.Global.Objects.SelectedPatient.UID,
                        DataFilter: [
                            CommonConstants.ActionItemType.Tasks,
                            CommonConstants.ActionItemType.Alerts,
                            CommonConstants.ActionItemType.DevicesTasks,
                            CommonConstants.ActionItemType.DevicesAlerts
                        ],
                        StartDate: daysinpast.format("mm/dd/yy"),
                        EndDate: daysinfuture.format("mm/dd/yy")
                    };

                    MyTasksService.GetActionItems(actionItemFilter, $scope.onGetActionItemsRetrieved);
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "MyTasks";
                    errExp.FunctionName = "getActionItems";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
             * @ngdoc callback                
             * @name onGetActionItemsRetrieved
             * @methodOf roundingModule.controller:MyTasksController   
             * @param {object} result returned by MyTasksService.GetActionItems call
             * @description       
             ** Callback function of MyTasksService.GetActionItems
             */
            $scope.onGetActionItemsRetrieved = function (result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        $timeout(function () {
                            
                            $scope.MyTaskmodel.Taskslist.data(result.data);
                            CommonFunctions.CreateScroller("ptchart-mytasks");
                            CommonFunctions.UnblockKendoView("ptchart-mytasks");
                        }, 0, false);
                    } else {
                        CommonFunctions.UnblockKendoView("ptchart-mytasks");
                    }
                }
                catch (ex) {
                    CommonFunctions.UnblockKendoView("ptchart-mytasks");
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "MyTasks";
                    errExp.FunctionName = "onGetActionItemsRetrieved";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
             * @ngdoc event 
             * @name completeTask
             * @eventOf roundingModule.controller:MyTasksController  
             * @param {object} dataItem item of $scope.MyTaskmodel.Taskslist
             * @description       
             ** ng-click event of completeTask from view 
             ** Sets complete task data task by calling MyTasksService.SetCompleteTaskData and Opens Complete task modal view 
             ** Also navigates to any screen based on dataItem         
             */
            $scope.completeTask = function (dataItem) {
                v = { "view": { "params": { "Screen": "", "UID": "" } } };

                var menus = $rootScope.Global.Objects.Menus;
                var directed = false;
                var isModalWindow = false;
                var categoryCode = dataItem.CategoryCode.toUpperCase();

                $.each(LookUp.GetLookUp(LookupTypes.FollowupTasks), function (key, item) {
                    if (item.Value.toUpperCase() === categoryCode && categoryCode !== AddTaskConstants.INITIALHRA && categoryCode !== AddTaskConstants.ANNUALHRA) {
                        isModalWindow = true;
                        return false;
                    }
                });

                if (isModalWindow) {
                    MyTasksService.SetCompleteTaskData(dataItem);
                    $timeout(function () {
                        $("#modalview-completetask").kendoMobileModalView("open");
                    }, 0, false);
                }
                else if (dataItem.NavigateTo && dataItem.NavigateToTab) {
                    $.each(menus, function (key, menu) {
                        if (menu.Screen === ScreenConstants.PathwayScreening && directed === false) {
                            if (menu.SubMenus != null) {
                                $.each(menu.SubMenus, function (key, submenu) {
                                    if (dataItem.NavigateTo === submenu.Screen && submenu.Tabs === null) {
                                        directed = $scope.NavigateToScreen(v, submenu);
                                        return false;
                                    }
                                    else if (submenu.Tabs) {
                                        $.each(submenu.Tabs, function (key, tab) {
                                            if (dataItem.NavigateToTab === tab.Screen && tab.Tabs === null) {
                                                directed = $scope.NavigateToScreen(v, tab);
                                                return false;
                                            }
                                        });
                                    }
                                });
                            }
                        }
                        else if (!directed && menu.SubMenus) {
                            $.each(menu.SubMenus, function (key, submenu) {
                                if (dataItem.NavigateTo === submenu.Screen) {
                                    if (submenu.Tabs) {
                                        $.each(submenu.Tabs, function (key, tab) {
                                            if (dataItem.NavigateToTab === tab.Screen && tab.Tabs === null) {
                                                directed = $scope.NavigateToScreen(v, tab);
                                                return false;
                                            }
                                        });
                                    }

                                    if (!directed) {
                                        directed = $scope.NavigateToScreen(v, submenu);
                                        return false;
                                    }
                                }
                            });
                        }
                    });

                    if (!directed) {
                        v = { "view": { "params": { "Screen": "", "UID": "" } } };
                        $.each(menus, function (key, menu) {
                            if (menu && menu.SubMenus) {
                                $.each(menu.SubMenus, function (key, submenu) {
                                    if (submenu && submenu.Tabs) {
                                        $.each(submenu.Tabs, function (key, tab) {
                                            if (directed === false && submenu.Screen === ScreenConstants.PathwayScreening && dataItem.NavigateTo === tab.Screen && tab.Tabs === null) {
                                                directed = $scope.NavigateToScreen(v, tab);
                                                return false;
                                            }
                                            else if (directed === false && dataItem.ScreeningType === tab.ScreeningType && tab.Tabs === null) {
                                                directed = $scope.NavigateToScreen(v, tab);
                                                return false;
                                            }
                                        });
                                    }
                                });
                            }
                        });
                    }
                }
            }

            /**
             * @ngdoc event 
             * @name navigateToScreen
             * @eventOf roundingModule.controller:MyTasksController  
             * @param {object} view
             * @description       
             ** refactored function from $scope.completeTask - navigates to any screen based on selected task
             */

            $scope.NavigateToScreen = function (v, navigateToScreen) {
                if (v && v.view && v.view.params && navigateToScreen) {
                    v.view.params.Screen = navigateToScreen.Screen;
                    v.view.params.UID = navigateToScreen.UID;
                    $timeout(function () {
                        PatientChartService.SetSubmenu(v);
                        PatientChartService.LoadTabs();
                    }, 0, false);
                    return true;
                }
                else {
                    return false;
                }    
            }


            /**
             * @ngdoc event 
             * @name openDelegateToPopOver
             * @eventOf roundingModule.controller:MyTasksController  
             * @param {object} dataItem item of $scope.MyTaskmodel.Taskslist
             * @description       
             ** ng-click event of delegateTask from view
             ** item set to $scope.taskTobedlgt task will used when user click on one of the role type 
             * it will help to set up input parameters for ServiceAPI.
             */
            $scope.openDelegateToPopOver = function (dataItem)
            {
                $scope.taskTobedlgt = dataItem;
            }
            
            /**
             * @ngdoc event 
             * @name delegateTask
             * @eventOf roundingModule.controller:MyTasksController  
             * @param {object} dataItem item of $scope.MyTaskmodel.Taskslist
             * @description       
             ** ng-click event of delegateTask from view
             ** Delegates task by calling MyTasksService.SaveTaskDelegation
             */
            $scope.delegateTask = function (role) {                                    
                try {                   
                    if ($scope.taskTobedlgt != null) {

                        var taskToBeDelegated = {
                            UID: $scope.taskTobedlgt.UID,
                            PatientUID: $scope.taskTobedlgt.PatientUID,
                            DelegatorUID: $scope.taskTobedlgt.UserUID,
                            CategoryCode: $scope.taskTobedlgt.CategoryCode,
                            DelegateDate: new Date().format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                            DataState: CommonConstants.DataState.Added,
                            DelegateRole: role
                        }
                        $("#RolePopOver").data("kendoMobilePopOver").close();
                        MyTasksService.SaveTaskDelegation(taskToBeDelegated, $scope.onSaveTaskDelegationRetrieved);
                        
                    }
                    $scope.taskTobedlgt = {};
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "MyTasks";
                    errExp.FunctionName = "delegateTask";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
             * @ngdoc callback                
             * @name onSaveTaskDelegationRetrieved
             * @methodOf roundingModule.controller:MyTasksController   
             * @param {object} result returned by MyTasksService.SaveTaskDelegation call
             * @description       
             ** Callback function of MyTasksService.SaveTaskDelegation
             */
            $scope.onSaveTaskDelegationRetrieved = function (result) {
                if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                    CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.TaskDelegated);
                    $scope.getActionItems();
                }
            }

            /**
             * @ngdoc function                
             * @name showMyTasks
             * @methodOf roundingModule.controller:MyTasksController   
             * @description       
             ** This function will be called first when MyTasksController loads
             */
            $scope.showMyTasks();
        })
        .controller('AddNewTaskController', function ($rootScope, $scope, $timeout, LookUp, LookupTypes, MyTasksService, CommonFunctions, CommonMessages,
                                                      CommonConstants, Status, AddTaskConstants)
            /**
            * @ngdoc controller
            * @name roundingModule.controller:AddNewTaskController
            * @description 
            ** Child controller of MyTaskController
            ** This will be called on click event of Add New Task button

             * @property {object} $scope.MyTaskmodel                       model of AddNewTaskController
             * @property {string} $scope.MyTaskmodel.PatientName           property of model of AddNewTaskController
             * @property {string} $scope.MyTaskmodel.Task                  property of model of AddNewTaskController
             * @property {string} $scope.MyTaskmodel.TaskDescription       property of model of AddNewTaskController
             * @property {date} $scope.MyTaskmodel.DueDate                 property of model of AddNewTaskController
             * @property {date} $scope.MyTaskmodel.MinDueDate              property of model of AddNewTaskController
             * @property {bool} $scope.MyTaskmodel.AddNewTaskVisible       property of model of AddNewTaskController
             * @property {bool} $scope.MyTaskmodel.SelectTaskTypeVisible   property of model of AddNewTaskController
             * @property {bool} $scope.MyTaskmodel.SelectDueDateVisible    property of model of AddNewTaskController
             * @property {array} $scope.MyTaskmodel.TaskTypes              property of model of AddNewTaskController
            */ {
            $scope.MyTaskmodel.PatientName = $rootScope.Global.Objects.SelectedPatient.Name;
            $scope.MyTaskmodel.Task = "";
            $scope.MyTaskmodel.TaskDescription = "";
            $scope.MyTaskmodel.DueDate = $('.k-footer a').attr('title');
            $scope.MyTaskmodel.MinDueDate = new Date();
            $scope.MyTaskmodel.AddNewTaskVisible = true;
            $scope.MyTaskmodel.SelectTaskTypeVisible = false;
            $scope.MyTaskmodel.SelectDueDateVisible = false;
            $scope.MyTaskmodel.TaskTypes = [];
            $scope.IsVisibleDueDatePnl = true;
            /**
             * @ngdoc function 
             * @name followupTasks
             * @methodOf roundingModule.controller:AddNewTaskController           
             * @description              
             ** Filters lookup of FollowupTask for the CurrentRole which is using angular.forEach
             */
            angular.forEach(LookUp.GetLookUp(LookupTypes.FollowupTasks), function (value, key) {
                if (value.AdditionalInfo) {
                    var userRole = value.AdditionalInfo;
                    userRole = userRole.split(',');
                    userRole = userRole[0];

                    if (userRole === $rootScope.Global.Objects.CurrentUser.CurrentRole) {
                        $scope.MyTaskmodel.TaskTypes.push(value);
                    }
                }
            });

            /**
             * @ngdoc event 
             * @name selectTaskType
             * @eventOf roundingModule.controller:AddNewTaskController  
             * @description       
             ** ng-click event of Task Type textbox
             ** Changes UI behaviour      
             */
            $scope.selectTaskType = function () {
                $scope.MyTaskmodel.AddNewTaskVisible = false;
                $scope.MyTaskmodel.SelectTaskTypeVisible = true;
                $timeout(function () {
                    $('#addtask-task-type').blur();
                }, 0, false);
            }

            /**
             * @ngdoc event 
             * @name selectDueDate
             * @eventOf roundingModule.controller:AddNewTaskController  
             * @description       
             ** ng-click event of Due Date textbox
             ** Changes UI behaviour      
             */
            $scope.selectDueDate = function () {
                $scope.MyTaskmodel.AddNewTaskVisible = false;
                $scope.MyTaskmodel.SelectDueDateVisible = true;
            }


            annualHRASelected = function () {
                var duedate = null;
                if ($scope.MyTaskmodel.Task === AddTaskConstants.TaskType) {
                    return duedate;
                } else {
                    return (new Date($scope.MyTaskmodel.DueDate)).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false);
                }
            }




            /**
             * @ngdoc event 
             * @name createNewTask
             * @eventOf roundingModule.controller:AddNewTaskController  
             * @description       
             ** ng-click event of Create button
             ** Creates new task by calling MyTasksService.AddTask            
             */
            $scope.createNewTask = function () {
                try {

                    if ($scope.MyTaskmodel.Task === AddTaskConstants.TaskType) {

                        CommonFunctions.Blockui();
                        var catcode = "";
                        angular.forEach(LookUp.GetLookUp(LookupTypes.FollowupTasks), function (item, key) {
                            if (item.Text === $scope.MyTaskmodel.Task) {
                                catcode = item.Value;
                            }
                        });

                        var taskToBeAdded = {
                            UserUID: parseInt($rootScope.Global.Objects.CurrentUser.UID),
                            PatientUID: parseInt($rootScope.Global.Objects.SelectedPatient.UID),
                            Description: null,
                            CategoryCode: catcode,
                            CategoryDescription: $scope.MyTaskmodel.Task,
                            DueDate: null,
                            DataState: CommonConstants.DataState.Added
                        }

                        MyTasksService.AddTask(taskToBeAdded, $scope.onCreateNewTaskCompleted);

                    } else {

                        if ($scope.addTaskValidator.validate()) {
                            CommonFunctions.Blockui();
                            var catcode = "";
                            angular.forEach(LookUp.GetLookUp(LookupTypes.FollowupTasks), function (item, key) {
                                if (item.Text === $scope.MyTaskmodel.Task) {
                                    catcode = item.Value;
                                }
                            });

                            var taskToBeAdded = {
                                UserUID: parseInt($rootScope.Global.Objects.CurrentUser.UID),
                                PatientUID: parseInt($rootScope.Global.Objects.SelectedPatient.UID),
                                Description: $scope.MyTaskmodel.TaskDescription,
                                CategoryCode: catcode,
                                CategoryDescription: $scope.MyTaskmodel.Task,
                                DueDate: (new Date($scope.MyTaskmodel.DueDate)).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                                DataState: CommonConstants.DataState.Added
                            }

                            MyTasksService.AddTask(taskToBeAdded, $scope.onCreateNewTaskCompleted);
                        }
                    }


                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "MyTasks";
                    errExp.FunctionName = "createNewTask";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
             * @ngdoc callback                
             * @name onCreateNewTaskCompleted
             * @methodOf roundingModule.controller:AddNewTaskController   
             * @param {object} result returned by MyTasksService.AddTask call
             * @description       
             ** Callback function of MyTasksService.AddTask 
             ** Calls MyTasksService.RefreshActionItems to broadcast refreshActionItems
             */
            $scope.onCreateNewTaskCompleted = function (result) {
                $scope.closeModalViewAddNewTask();
                if (result.resultstatus === Status.ServiceCallStatus.Success) {
                    CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.NewTaskAdded);
                    MyTasksService.RefreshActionItems();
                } else {
                    CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.NewTaskAddingFailed);
                }
            }

            /**
             * @ngdoc event 
             * @name createNewTask
             * @eventOf roundingModule.controller:AddNewTaskController  
             * @description       
             ** ng-click event of Back button on Add New Task modal view 
             ** Changes UI behaviour           
             */
            $scope.goToAddTaskType = function () {
                if ($scope.MyTaskmodel.SelectTaskTypeVisible) {
                    if ($scope.MyTaskmodel.Task != "") {
                        $("#modalview-add-newtask").data("kendoValidator").hideMessages();
                    }

                    $scope.MyTaskmodel.SelectTaskTypeVisible = false;

                    if ($scope.MyTaskmodel.Task === AddTaskConstants.TaskType) {
                        $scope.IsVisibleDueDatePnl = false;
                    } else {
                        $scope.IsVisibleDueDatePnl = true;
                    }
                }
                if ($scope.MyTaskmodel.SelectDueDateVisible) {
                    $scope.MyTaskmodel.SelectDueDateVisible = false;
                    $scope.MyTaskmodel.DueDate = $('#newtask-duedate-calendar_cell_selected a').attr('title');
                }
                $scope.MyTaskmodel.AddNewTaskVisible = true;
            }

            /**
             * @ngdoc event 
             * @name closeModalViewAddNewTask
             * @eventOf roundingModule.controller:AddNewTaskController  
             * @description       
             ** ng-click event of cancel button on Add New Task modal view 
             ** Changes UI behaviour
             ** Closes the modal view for add new task
             */
            $scope.closeModalViewAddNewTask = function () {
                $scope.IsVisibleDueDatePnl = true;
                $("#modalview-add-newtask").data("kendoValidator").hideMessages();
                $("#modalview-add-newtask").data("kendoMobileModalView").close();
            }
        })
        .controller('CompleteTaskController', function ($rootScope, $scope, MyTasksService, ExceptionService, CommonFunctions, CommonConstants,
                                                        CommonMessages, Status, AddTaskConstants)
            /**
              * @ngdoc controller
              * @name roundingModule.controller:CompleteTaskController
              * @description 
              ** Child controller of MyTaskController
              ** This will be called on click event of Complete Task button
              * @property {object} $scope.MyTaskmodel - model of AddNewTaskController. 
              */ {
            $scope.MyTaskmodel = MyTasksService.GetCompleteTaskData();

            /**
             * @ngdoc event 
             * @name closeModalViewCompleteTask
             * @eventOf roundingModule.controller:CompleteTaskController  
             * @description       
             ** ng-click event of Cancel button on Complete Task modal view
             ** Changes UI behaviour
             ** Closes the modal view for complete task
             */
            $scope.closeModalViewCompleteTask = function () {
                $scope.MyTaskmodel.Comments = null;
                $scope.IsVisibleDueDatePnl = true;
                MyTasksService.SetCompleteTaskData($scope.MyTaskmodel);
                $("#modalview-completetask").kendoMobileModalView("close");
            }






            IsAnnualHRASelected = function () {
                var duedate = null;
                if ($scope.MyTaskmodel.Task === AddTaskConstants.TaskType) {
                    return duedate;
                } else {
                    return $scope.MyTaskmodel.DueDate;
                }
            }


            /**
             * @ngdoc event 
             * @name completeNewTask
             * @eventOf roundingModule.controller:CompleteTaskController  
             * @description       
             ** ng-click event of Save button on Complete Task modal view
             ** Completes task by calling MyTasksService.UpdateTask 
             */

            $scope.completeNewTask = function () {
                try {
                    CommonFunctions.Blockui();
                    var tasksToBeUpdated = new kendo.data.ObservableArray([]);

                    var actionitem = {
                        UID: $scope.MyTaskmodel.UID,
                        UserUID: $scope.MyTaskmodel.UserUID,
                        PatientUID: $scope.MyTaskmodel.PatientUID,
                        PatientName: $scope.MyTaskmodel.PatientName,
                        DueDate: $scope.MyTaskmodel.DueDate /*IsAnnualHRASelected()*/,
                        NavigateTo: $scope.MyTaskmodel.NavigateTo,
                        Type: $scope.MyTaskmodel.Type,
                        CategoryCode: $scope.MyTaskmodel.CategoryCode,
                        CategoryDescription: $scope.MyTaskmodel.CategoryDescription,
                        CompletedDate: (new Date().format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false)),
                        Priority: $scope.MyTaskmodel.Priority,
                        TaskStatus: CommonConstants.StatusCode.Completed,
                        ScoreCardStatus: $scope.MyTaskmodel.ScoreCardStatus,
                        MenuOfActionType: $scope.MyTaskmodel.MenuOfActionType,
                        CreateDate: $scope.MyTaskmodel.CreateDate,
                        Group: $scope.MyTaskmodel.Group,
                        TaskCloseYN: $scope.MyTaskmodel.TaskCloseYN,
                        TaskOpenYN: $scope.MyTaskmodel.TaskOpenYN,
                        Comments: $scope.MyTaskmodel.Comments,
                        NavigateToTab: $scope.MyTaskmodel.NavigateToTab,
                        DataState: CommonConstants.DataState.Modified
                    };

                    tasksToBeUpdated.push(actionitem);

                    MyTasksService.UpdateTask($.param({ '': tasksToBeUpdated.toJSON() }), $scope.onUpdateTaskCompleted);
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "MyTasks";
                    errExp.FunctionName = "completeNewTask";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
             * @ngdoc callback                
             * @name onUpdateTaskCompleted
             * @methodOf roundingModule.controller:CompleteTaskController   
             * @param {object} result returned by MyTasksService.UpdateTask call
             * @description       
             ** Callback function of MyTasksService.UpdateTask
             ** Calls MyTasksService.RefreshActionItems to broadcast refreshActionItems
             ** Calls MyTasksService.SetCompleteTaskData
             */
            $scope.onUpdateTaskCompleted = function (result) {
                MyTasksService.SetCompleteTaskData([]);

                $("#modalview-completetask").kendoMobileModalView("close");

                if (result.resultstatus === Status.ServiceCallStatus.Success) {
                    CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.TaskCompleted);
                    MyTasksService.RefreshActionItems();
                } else {
                    CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.TaskCompletedFailed);
                }
            }
        });
}());