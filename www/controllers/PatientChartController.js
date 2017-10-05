(function () {
    /**
    * @ngdoc service 
    * @author Amit Mistry
    * @name roundingModule.service:PatientChartService
    * @description       
    ** PatientChartService is being used by PatientChartHeaderController,PatientChartPathwayController,PatientChartMenuController
    ** <p>VersionOne Requirements - <a href="https://www13.v1host.com/DaVitaInc/Task.mvc/Summary?oidToken=Task%3A328784">TK-28510</a></p>
    * @param {object} ServiceConstants
    * Common Constants.
    * @param {function} RoundingService
    * Common Function.
    * @param {object} $rootScope
    * AngularJS global scope object 
    * @param {function} $timeout
    * AngularJS timeout function
    * @property {array} scrMenu - to store menu details. 
    * @property {object} pathwayParam - to store pathways details.
    * @property {object} subMenu -  to store submenu details.
    * @property {object} mao - local variable
    * @property {number} patientUid - Patient's UID
    * @property {boolean} menuClick - local variable to change flag.
    */
    angular.module('roundingModule').factory('PatientChartService', function ($rootScope, RoundingService, ServiceConstants, $timeout) {
        var scrMenu = [];
        var pathwayParam = null;
        var subMenu = null;
        var mao = null;
        var patientUid = null;
        var menuClick = false;

        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientChartService
        * @name setMenuClick
        * @description
        ** Set menuClick with changeflag
        * @param {function} PatientChartService.setMenuClick
        * ServicePoint.
        * @param {object} 
        * changeflag Set flage value for menuclick         
        */
        function setMenuClick(changeflag) {
            menuClick = changeflag;
        }

        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientChartService
        * @name getMenuClick
        * @description
        ** Retrieve menu
        * @return {object} 
        * menuClick menuClickObject
        */
        function getMenuClick() {
            return menuClick;
        }

        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientChartService
        * @name setPatientUid
        * @description
        ** Set patient Uid with newObj                
        * @param {number} newObj
        *  Patient's UID
        */
        function setPatientUid(newObj) {
            patientUid = newObj;
        }

        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientChartService
        * @name getPatientUid
        * @description
        ** Set menuClick with changeflage         
        * @return {number} patientUid
        * Patient's UID returned.                  
        */
        function getPatientUid() {
            return patientUid;
        }

        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientChartService
        * @name setMoa
        * @description
        ** Set mao with newObj 
        * @param {object}
        * newObj fro Moa
        */
        function setMoa(newObj) {
            mao = newObj;
        }

        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientChartService
        * @name getMao
        * @description
        ** return mao Object        
        */
        function getMao() {
            return mao;
        }

        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientChartService
        * @name addScrMenu
        * @description
        ** Set screen menus        
        * @param {array} newObj 
        * Array of objects containing screen details.
        */
        function addScrMenu(newObj) {
            scrMenu = newObj;
        }

        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientChartService
        * @name getScrMenu
        * @description
        ** Retrieved source menu object        
        * @return {object} srcMenu
        * Array of objects containing screen details.
        */
        function getScrMenu() {
            return scrMenu;
        }

        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientChartService
        * @name setPathwayParam
        * @description
        ** Set pathways 
        * @param {object} newObj      
        * Pathway details.
        */
        function setPathwayParam(newObj) {
            pathwayParam = newObj;
        }

        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientChartService
        * @name getPathwayParam
        * @description
        ** Returns selected Pathway's details        
        * @returns {object} pathwayParam
        * returns Pathway details
        */
        function getPathwayParam() {
            return pathwayParam;
        }

        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientChartService
        * @name setSubmenu
        * @description
        ** Set submenus of selected menu     
        * @return {array} newObj
        * Array of objects containins submenu details.
        */
        function setSubmenu(newObj) {
            subMenu = newObj;
        }

        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientChartService
        * @name getSubmenu
        * @description
        ** Retrieve Submenu.       
        * @return {object} subemnu
        * return submenu details
        */
        function getSubmenu() {
            return subMenu;
        }

        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientChartService
        * @name doInit
        * @description
        ** Broadcasts "PtChartInit" event on global scope.
        */
        function doInit() {
            $timeout(function() {
                $rootScope.$broadcast('PtChartInit');
            }, 0, false);
        }

        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientChartService
        * @name loadPathway
        * @description
        ** Broadcasts "LoadPathway" event on global scope to load Pathways.     
        */
        function loadPathway() {
            $timeout(function() {
                $rootScope.$broadcast('LoadPathway');
            }, 0, false);
        }

        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientChartService
        * @name loadTabs
        * @description
        ** Broadcasts "LoadTabs" event on global scope to load tabs.        
        */
        function loadTabs() {
            $timeout(function() {
                $rootScope.$broadcast('LoadTabs');
            }, 0, false);
        }

        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientChartService
        * @name getPtClinicalMetric
        * @description
        ** Retrieve Patient's Clinical Metric data..
        * @param {object} params 
        * contains PatientUid          
        * @param {string} method
        * Method: POST
        * @param {object} dataType
        * DataType: JSON.
        * @param {function} callBack 
        * $scope.onGetPtClinicalMetricRetrieved
        * @returns {object}
        * Clinical metric for patient.
        */
        function getPtClinicalMetric(params, method, dataType, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPtClinicalMetric, method, dataType, params, callBack);
        }

        /**
        * @ngdoc method
        * @methodOf roundingModule.service:PatientChartService
        * @name getMoa
        * @description
        ** Retrieve menu of Action items.
        ** Service call to "Utility/GetMoa"
        ** Gets called when the user taps on "PtChart" button on "Contact Recap" Screen
        * @param {object} params
        * Contains properties such as AppCode, PatientUID, etc        
        * @param {string} method
        * Method: POST
        * @param {object} dataType
        * DataType: JSON.
        * @param {function} callBack 
        * $scope.onGetMoaRetrieved
        * @returns {object}
        * retrun array of Action Items(Menus).
        */
        function getMoa(params, method, dataType, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetMoa, method, dataType, params, callBack);
        }

        return {
            SetMenuClick:setMenuClick,
            GetMenuClick:getMenuClick,
            GetPtClinicalMetric: getPtClinicalMetric,
            GetMoa: getMoa,
            AddScrMenu: addScrMenu,
            GetScrMenu: getScrMenu,
            DoInit: doInit,
            LoadPathway: loadPathway,
            SetPathwayParam: setPathwayParam,
            GetPathwayParam: getPathwayParam,
            SetSubmenu: setSubmenu,
            GetSubmenu: getSubmenu,
            LoadTabs: loadTabs,
            SetPatientUid: setPatientUid,
            GetPatientUid: getPatientUid,
            SetMoa: setMoa,
            GetMao: getMao
        }
    });
}());

(function () {
    angular.module('roundingModule')
        /** 
         * @ngdoc controller
         * @name roundingModule.controller:PatientChartHeaderController
         * @description 
         ** Controller for Patient Chart header section   
         * @property {object} $scope.model - Patient chart header model intialized.
         * @property {string} $scope.LoggedInUser - Set current logged in user firstname lastname from global variable.
         * @property {object} $scope.model.Patient - Selected Patient .    
         */
        .controller('PatientChartHeaderController', function ($rootScope, $scope, $timeout, PatientChartService, ExceptionService, AppConstants, ScreenConstants,
                                                              CommonConstants, CommonFunctions, RouteConstants) {

            $scope.model = new Rounding.Models.PatientChartHeader();

            $scope.model.LoggedInUser = $rootScope.Global.Objects.LoggedInUser;
            $scope.model.Patient = $rootScope.Global.Objects.SelectedPatient;

            /**
             * @ngdoc event
             * @name ptChartButtonClick
             * @eventOf roundingModule.controller:PatientChartHeaderController
             * @description 
             ** AngularJS ng-click event  to take current user to the selected patient's "Patient Chart" screen
             ** Calls "PatientChartService.DoInit" function using "CommonFunctions.CheckUIChange"
             */
            $scope.ptChartButtonClick = function () {
                CommonFunctions.CheckUIChange(function () {
                    PatientChartService.DoInit();
                }, null);
            }

            /**
             * @ngdoc event
             * @name home
             * @eventOf roundingModule.controller:PatientChartHeaderController
             * @description 
             ** Angular JS ng-click event to navigate to "My Worklist" screen for RCM or "Patient Chart" for VHN.
             ** Calls "OnHomeClick" Common function.
             */
            $scope.home = function () {
                CommonFunctions.OnHomeClick();
            };
        })

        /** 
         * @ngdoc controller
         * @name roundingModule.controller:PatientChartPathwayController
         * @description 
         * Controller for Patient Chart Pathway    
         * @property {object} $scope.model - Patient chart pathway model intialized.
         * @property {string} $scope.model.PathwayScreeningMenu. - load sub menu data from "PatientChartService.GetScrMenu".
         */
        .controller('PatientChartPathwayController', function ($rootScope, $scope, $timeout, PatientChartService, ExceptionService, AppConstants, ScreenConstants,
                                                               CommonConstants, CommonFunctions, RouteConstants) {

            $scope.model = new Rounding.Models.PtChartPathwayMenu();
            $scope.model.PathwayScreeningMenu.SubMenus.data(PatientChartService.GetScrMenu());

            /**
              * @ngdoc event
              * @name pathwayTabClick
              * @eventOf roundingModule.controller:PatientChartPathwayController
              * @description 
              ** pathwayTabClick event on pathway tab take current user selected pathway type
              * it will call  set Screen and UID patameter from click and call 
              * call PatientChartService.SetPathwayParam and PatientChartService.LoadPathway;
              * @param {object} e
              * Object containing screen details eg: Home Safety Screening
              */
            $scope.pathwayTabClick = function (e) {
                CommonFunctions.CheckUIChange(function () {
                    var submenu = (e.target[0].id).split("-");
                    v = { "view": { "params": { "Screen": submenu[1], "UID": submenu[0]}} };
                    PatientChartService.SetPathwayParam(v);
                    PatientChartService.LoadPathway();
                    var popover = e.sender.element.closest('[data-role=popover]').data('kendoMobilePopOver');
                    popover.close();
                }, null);
            }
        })


        /**
         * @ngdoc controller
         * @name roundingModule.controller:PatientChartMenuController
         * @description 
         ** Controller for Patient Chart Menus.
         * @property {object} $scope.model - Patientchart menu intialized.  
         * @property {boolean} $scope.ConsiderAlertFooter - Set to true if any alerts are present.
         */
        .controller('PatientChartMenuController', function ($rootScope, $scope, $timeout, PatientChartService, ExceptionService, AppConstants, ScreenConstants,
                                                            CommonConstants, CommonFunctions, Status, RouteConstants, LookUp, LookupTypes, ContactConstants, PtDetailFilterConstants, RCMPathwaysScreen) {

            $scope.model = new Rounding.Models.PatientChartMenu();
            $scope.$$listeners['PtChartInit'] = [];
            $scope.$$listeners['LoadPathway'] = [];
            $scope.$$listeners['LoadTabs'] = [];

            $scope.$$listeners['refreshMetricsCount'] = [];
            
            $scope.refreshMetricsCount = false;

            LookUp.GetLookUp(LookupTypes.Tags);

            $scope.$on('PtChartInit', function () {
                $timeout(function() {
                    $scope.show();
                }, 0, false);
            });

            $scope.$on('refreshMetricsCount', function () {
                $scope.refreshMetricsCount = true;
                $timeout(function () {
                    var patientUid = $rootScope.Global.Objects.SelectedPatient.UID;
                    CommonFunctions.BlockKendoView("ptchart-main-splitview");
                    PatientChartService.GetPtClinicalMetric({ patientUid: patientUid }, 'GET', 'JSON', $scope.onGetPtClinicalMetricRetrieved);
                }, 0, false);
            });

            /**
             * @ngdoc event
             * @name show
             * @eventOf roundingModule.controller:PatientChartMenuController
             * @description 
             ** Start point of the screen.
             ** Will call whenever "PatientChartMenuController" loads. It will call "PatientChartService.GetPtClinicalMetric "
             * "PatientChartService.SetPatientUid" and "PatientChartService.GetMoa"           
             */
            $scope.show = function () {
                $("#ptchart-view-submenus-list").css({ "display": "inline" });
                $("#ptchart-view-tab-subtabs-list").css({ "display": "none" });
                $("#ptchart-view-tabs-list").css({ "display": "none" });
                $("#ptChartHeader").css({ "visibility": "hidden" });


                var listview = $("#ptchart-view-menus-submenus").data("kendoMobileListView");
                if (listview) {
                    listview.scroller().reset(); //reset the scroller
                }

                
                var patientUid = $rootScope.Global.Objects.SelectedPatient.UID;
                CommonFunctions.BlockKendoView("ptchart-main-splitview");
                PatientChartService.GetPtClinicalMetric({ patientUid: patientUid }, 'GET', 'JSON', $scope.onGetPtClinicalMetricRetrieved);

                var moaRequest = { PatientUid: patientUid, PayorCode: "", AppCode: AppConstants.AppCode.Rounding };
                if (patientUid != PatientChartService.GetPatientUid()) {
                    PatientChartService.SetPatientUid(patientUid);
                    PatientChartService.GetMoa(moaRequest, 'POST', 'JSON', $scope.onGetMoaRetrieved);
                }
                if (!$rootScope.Global.Objects.SelectedPatient.IsFrequentFlier) {
                    $("#ptchart-mvp").css({ "visibility": "hidden" });
                }

                //For showing or hiding Alerts
                $scope.ConsiderAlertFooter = true;
            };

            /**
             * @ngdoc event
             * @name navigateToPaneView
             * @eventOf roundingModule.controller:PatientChartMenuController
             * @description 
             ** NavigateToPaneView is sub-function call of "showDetailView" and  "showpathway" 
             ** Called when switching menus/view
             * @param {string} switchView
             * String containing URL of the view to navigate to.
             */
            $scope.navigateToPaneView = function (switchView) {
                var pane = $("#ptchart-splitview-main-pan").data("kendoMobilePane");
                
                if ($("#ptchart-splitview-main-pan").data("kendoMobilePane").view().id === switchView) {
                    $rootScope.Global.Objects.ReloadPage = switchView;
                    $timeout(function() {
                        pane.navigate("views/Reload.html");
                    }, 0, false);
                }
                else {
                    $timeout(function() {
                        pane.navigate(switchView);
                    }, 0, false);
                }
                $(".actionitems-view").removeClass("alerts-slide-down").removeClass("alerts-slide-up");
                $(".openpatients-view").removeClass("alerts-slide-down").removeClass("alerts-slide-up");

                $timeout(function () {
                    $rootScope.$broadcast('changeOpenPatientsShowFlag');
                    $rootScope.$broadcast('changeAlertsShowFlag');
                }, 0, false);
            }

            /**
              * @ngdoc event
              * @name showpathway
              * @eventOf roundingModule.controller:PatientChartMenuController
              * @description 
              ** Showpathway is called from multiple controllers ie "PathwayTabController" & "PatientChartController". 
              ** First call "PatientChartService.GetPathwayParam" to get the screen name, set the secreen name to $rootScope.Global.Objects.SelectedPathwayMenu
              * on the basis of screen name it will either load the detailview or navigate to the screen.
              */
            $scope.showpathway = function () {
                var e = PatientChartService.GetPathwayParam();
                //var uid = parseInt(e.view.params.UID);
                var screen = e.view.params.Screen;
                $rootScope.Global.Objects.SelectedPathwayMenu = screen;

                $("#ptchart-view-menus-submenus li").removeClass("submenu-tab-selected-background");
                $("#ptchart-view-menus-tabs li").removeClass("submenu-tab-selected-background");
                $("#ptchart-view-submenus-list").css({ "display": "inline" });
                $("#ptchart-view-tabs-list").css({ "display": "none" });

                if (screen === ScreenConstants.DiabetesTab || screen === ScreenConstants.MOADiabetes || screen === ScreenConstants.DepressionScreeningTab || screen === ScreenConstants.MOAFluidManagement || screen === ScreenConstants.MOAHospitalization) {
                    var subview = null;
                    var navtext = "";
                    $scope.model.PatientChartMenu.SubMenus.data().forEach(function (value) {
                        if ((screen === ScreenConstants.DiabetesTab || screen === ScreenConstants.MOADiabetes) && value.Text === "Diabetes") {
                            $scope.model.PatientChartMenu.Tabs.data(value.Tabs);
                            navtext = value.Text;
                            $scope.model.PatientChartMenu.Tabs.data().forEach(function (tabvalue) {
                                if (tabvalue.Screen === ScreenConstants.DiabetesTab && screen === ScreenConstants.DiabetesTab) {
                                    $rootScope.Global.Objects.SelectedPathwayScreeningMenu = screen;
                                    subview = { "view": {"params": {"Screen": ScreenConstants.DiabetesTab,"UID": tabvalue.UID }}};
                                }

                                if (tabvalue.Screen === ScreenConstants.PathwaysTab && screen === ScreenConstants.MOADiabetes) {
                                    $rootScope.Global.Objects.SelectedPathwayMenu = screen;
                                    subview = { "view": {"params": {"Screen": ScreenConstants.PathwaysTab,"UID": tabvalue.UID }}};
                                }
                            });
                        }
                        else if (screen === ScreenConstants.DepressionScreeningTab && value.Text === "Depression") {
                            $scope.model.PatientChartMenu.Tabs.data(value.Tabs);
                            navtext = value.Text;
                            $scope.model.PatientChartMenu.Tabs.data().forEach(function (tabvalue) {
                                if (tabvalue.Screen === ScreenConstants.DepressionScreeningTab && screen === ScreenConstants.DepressionScreeningTab) {
                                    subview = { "view": {"params": {"Screen": tabvalue.Screen,"UID": tabvalue.UID }}};
                                }
                            });
                        }
                        else if (screen === ScreenConstants.MOAFluidManagement && value.Text === "Fluid") {
                            $scope.model.PatientChartMenu.Tabs.data(value.Tabs);
                            navtext = value.Text;
                            $scope.model.PatientChartMenu.Tabs.data().forEach(function (tabvalue) {
                                if (tabvalue.Screen === ScreenConstants.PathwaysTab && screen === ScreenConstants.MOAFluidManagement) {
                                    subview = { "view": {"params": {"Screen": tabvalue.Screen,"UID": tabvalue.UID }}};
                                }
                            });
                        }
                        else if (screen === ScreenConstants.MOAHospitalization && value.Text === ScreenConstants.Hospitalizations) {
                            $scope.model.PatientChartMenu.Tabs.data(value.Tabs);
                            navtext = value.Text;
                            if (value.Tabs !== null) {
                                $scope.model.PatientChartMenu.Tabs.data().forEach(function (tabvalue) {
                                    if (tabvalue.Screen === ScreenConstants.PathwaysTab && screen === ScreenConstants.MOAHospitalization) {
                                        subview = { "view": {"params": {"Screen": tabvalue.Screen,"UID": tabvalue.UID }}};
                                    }
                                });
                            }
                            else {
                                subview = { "view": {"params": {"Screen": ScreenConstants.PathwaysTab,"UID": null }}};
                            }
                        }
                    });
                    $rootScope.Global.Objects.CRDSelectedMenu = subview.view.params;
                    $scope.showDetailView(subview);
                    $("#ptchart-view-submenus-list").css({ "display": "none" });
                    $("#ptchart-view-tabs-list").css({ "display": "inline" });
                    $("#ptChartHeader").css({ "visibility": "hidden" });
                    $("#selectedMenuText").text(navtext);
                    $("#ptChartHeader").css({ "visibility": "visible" });
                }
                else {
                    $rootScope.Global.Objects.CRDSelectedMenu = e.view.params;

                    if (screen === ScreenConstants.MOAACP || screen === ScreenConstants.MOAInfectionManagement) {
                        screen = ScreenConstants.PathwaysTab;
                    }
                    $("#ptChartHeader").css({ "visibility": "hidden" });

                    $scope.navigateToPaneView(RouteConstants[screen]);
                }
            }

            /**
            * @ngdoc event
            * @name LoadPathway
            * @eventOf roundingModule.controller:PatientChartMenuController
            * @description
            ** Subscribed event broadcasted from "PatientChartService".
            */
            $scope.$on('LoadPathway', function() {
                $scope.showpathway();
            });


            /**
              * @ngdoc event
              * @name showDetailView
              * @eventOf roundingModule.controller:PatientChartMenuController
              * @description 
              ** loads the final view in right pane of split view based on tab selected in the left pane  .
              * @param {object} e
              * Object containing screen details Eg: screen name , UID etc. to navigate to on tap. 
              */
            $scope.showDetailView = function (e) {
                try {
                    CommonFunctions.CheckUIChange(function () {
                        var uid = parseInt(e.view.params.UID);
                        var screen = e.view.params.Screen;
                        var screen1 = e.view.params.Screen;
                        $rootScope.Global.Objects.CRDSelectedMenu = e.view.params;

                        $("#ptchart-view-menus-submenus li").css({ "background": "white" });
                        $("#" + uid + "-" + screen).closest('li').addClass("submenu-tab-selected-background");

                        $("#ptchart-view-menus-tabs li").css({ "background": "white" });
                        $("#" + uid + "-" + screen).closest('li').addClass("submenu-tab-selected-background");

                        $scope.addTag(screen);

                        var delay = 500;//1 seconds
                        if (screen === ScreenConstants.DiabetesTab || screen === ScreenConstants.ImmunizationsTab) {
                            $rootScope.Global.Objects.SelectedPathwayScreeningMenu = screen;
                            setTimeout(function(){
                                $("#ptchart-view-menus-tabs li").css({ "background": "white" });
                                $("#" + uid + "-" + screen1).closest('li').addClass("submenu-tab-selected-background");
                            },delay);
                            screen = ScreenConstants.PathwaysTab;
                        }
                        else if (screen === ScreenConstants.MOAACP ||
                                 screen === ScreenConstants.MOAFluidManagement ||
                                 screen === ScreenConstants.MOAInfectionManagement ||
                                 screen === ScreenConstants.MOAHospitalization ||
                                 screen === ScreenConstants.MOADiabetes ||
                                 screen === ScreenConstants.ESRDTreatmentOptions ||
                                 screen === ScreenConstants.CaregiverAssessment ||
                                 screen === ScreenConstants.NutritionPathway ||
								 screen === ScreenConstants.MOATransplant ||
								 screen === ScreenConstants.SmokingCessation 
                            ) {
                            $rootScope.Global.Objects.SelectedPathwayMenu = screen;
                            setTimeout(function () {
                                $("#ptchart-view-menus-tabs li").css({ "background": "white" });
                                $("#" + uid + "-" + screen1).closest('li').addClass("submenu-tab-selected-background");
                            }, delay);
                            screen = ScreenConstants.PathwaysTab;
                        }
                        else{
                            setTimeout(function(){
                                $("#ptchart-view-menus-tabs li").css({ "background": "white" });
                                $("#" + uid + "-" + screen).closest('li').addClass("submenu-tab-selected-background");
                            },delay);
                        }

                        $scope.navigateToPaneView(RouteConstants[screen]);
                        CommonFunctions.UICanceled();
                    }, null);
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "PatientChart";
                    errExp.FunctionName = "ShowDetailView";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }


            $scope.$on('LoadTabs', function() {
                $timeout(function() {
                    $scope.loadTabs(PatientChartService.GetSubmenu());
                }, 0, false);
            });

            /**
             * @ngdoc event
             * @name loadTabs
             * @eventOf roundingModule.controller:PatientChartMenuController
             * @description 
             ** loads tabs from model PatientChartMenu  
             * @param {object} e
             * Object containing screen details. Eg: screen name , UID etc.
             */
            $scope.loadTabs = function (e) {
                try {
                    var uid = parseInt(e.view.params.UID);
                    var screen = e.view.params.Screen;
                    $rootScope.Global.Objects.SelectedPathwayMenu = screen;
                    $scope.model.PatientChartMenu.SubMenus.data().forEach(function (value) {
                        if (value.UID === uid) {                            
                            if (value.Tabs != null) {
                                $scope.model.PatientChartMenu.Tabs.data(value.Tabs);

                                //Load the first tab view of the selected submenu                
                                var subview = {
                                    "view": {
                                        "params": {
                                            "Screen": $scope.model.PatientChartMenu.Tabs.data()[0].Screen,
                                            "UID": $scope.model.PatientChartMenu.Tabs.data()[0].UID
                                        }
                                    }
                                };
                                $("#ptchart-view-submenus-list").css({ "display": "none" });
                                $("#ptchart-view-tabs-list").css({ "display": "inline" });
                                $("#ptchart-view-menus-submenus li").css({ "background": "white" });

                                var tabslistview = $("#ptchart-view-menus-tabs").data("kendoMobileListView");
                                if (tabslistview) {
                                    tabslistview.scroller().reset();
                                }

                                $("#ptchart-view-menus-tabs li").removeClass("submenu-tab-selected-background");

                                $scope.showDetailView(subview);
                            }
                            else {
                                $scope.showDetailView(e);
                            }

                            //selected background
                            //Hide-Show SubMenu-Tabs

                            $("#ptChartHeader").css({ "visibility": "hidden" });
                            if (value.Tabs != null && value.Tabs.length > 0) {
                                $("#selectedMenuText").text(value.Text);
                                $("#ptChartHeader").css({ "visibility": "visible" });
                            }
                        } else if (value.Tabs) {
                            value.Tabs.forEach(function (tab) {
                                if (tab.UID === uid) {
                                    $scope.model.PatientChartMenu.Tabs.data(value.Tabs);

                                    var subview = {
                                        "view": {
                                            "params": {
                                                "Screen": tab.Screen,
                                                "UID": tab.UID
                                            }
                                        }
                                    };
                                    $("#ptchart-view-submenus-list").css({ "display": "none" });
                                    $("#ptchart-view-tabs-list").css({ "display": "inline" });
                                    $("#ptchart-view-menus-submenus li").css({ "background": "white" });

                                    $("#ptchart-view-menus-tabs li").removeClass("submenu-tab-selected-background");

                                    $scope.showDetailView(subview);

                                    $("#ptChartHeader").css({ "visibility": "hidden" });
                                    if (value.Tabs != null && value.Tabs.length > 0) {
                                        $("#selectedMenuText").text(value.Text);
                                        $("#ptChartHeader").css({ "visibility": "visible" });
                                    }
                                }
                            });
                        }
                    });
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "PatientChart";
                    errExp.FunctionName = "loadTabs";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
             * @ngdoc event
             * @name loadSubTabs
             * @eventOf roundingModule.controller:PatientChartMenuController
             * @description 
             ** load Sub menu tabs in the left pane
             * @param {object} e
             * Submenu tab details
             */
            $scope.loadSubTabs = function (e) {
                try {
					$timeout(function() {
                    	CommonFunctions.CheckUIChange(function () {
							var  v = { "view": { "params": { "Screen": e.dataItem.Screen, "UID": e.dataItem.UID}} };

							$(e.item).siblings().each(function (key, value) {
								var a = $(this).find("a");
								$(a).closest('li').removeClass("submenu-tab-selected-background");
							});

							$("#ptchart-view-menus-tabs li").css({ "background": "white" });
							$scope.showDetailView(v);
						}, null);
					}, 100, false);
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "PatientChart";
                    errExp.FunctionName = "loadSubTabs";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            //loads the final view in right pane of split view based on tab selected
            //ng-click event

            /**
              * @ngdoc event
              * @name subMenuClick
              * @eventOf roundingModule.controller:PatientChartMenuController
              * @description 
              ** Loads main screen for sub menu
              * @param {object} e
              * Contain { "Screen": e.dataItem.Screen, "UID": e.dataItem.UID}
              */
            $scope.subMenuClick = function(e) {
                CommonFunctions.CheckUIChange(function () {
                    $(e.item).siblings().each(function (key, value) {
                        var a = $(this).find("a");
                        $(a).closest('li').removeClass("submenu-tab-selected-background");
                    });

                    var v = { "view": { "params": { "Screen": e.dataItem.Screen, "UID": e.dataItem.UID}} };

                    $scope.loadTabs(v);
                }, null);
            }

            /**
             * @ngdoc event
             * @name addTag
             * @eventOf roundingModule.controller:PatientChartMenuController
             * @description 
             ** "addTag" handles the addTag call whenever user opens new screen.
             * @param {string} screen
             * Screen name the user taps on to be displayed 
             */
            $scope.addTag = function(screen) {
                var tag = null;
                switch (screen) {
                    case ScreenConstants.MOAAccess:
                    case ScreenConstants.AccessTab:
                    case ScreenConstants.ShiftNSchedule:
                    case ScreenConstants.AccessInfo:
                    case ScreenConstants.VAP:
                        tag = LookUp.GetValueByKey(LookupTypes.Tags, ContactConstants.TagsValue.Access);
                        break;
                    case ScreenConstants.ADLScreening:
                        tag = LookUp.GetValueByKey(LookupTypes.Tags, ContactConstants.TagsValue.ADL);
                        break;
                    case ScreenConstants.HomeSafetyScreening:
                        tag = LookUp.GetValueByKey(LookupTypes.Tags, ContactConstants.TagsValue.HomeSafetyScreening);
                        break;
                    case ScreenConstants.PainAssessment:
                        tag = LookUp.GetValueByKey(LookupTypes.Tags, ContactConstants.TagsValue.PainAssessment);
                        break;
					 case ScreenConstants.PatientAssessment:
                        tag = LookUp.GetValueByKey(LookupTypes.Tags, ContactConstants.TagsValue.PatientAssessment);
                        break;	
                    case ScreenConstants.Labs:
                        tag = LookUp.GetValueByKey(LookupTypes.Tags, ContactConstants.TagsValue.Labs);
                        break;
                    case ScreenConstants.MOADepression:
                    case ScreenConstants.DepressionScreeningTab:
                        tag = LookUp.GetValueByKey(LookupTypes.Tags, ContactConstants.TagsValue.DepressionScreening);
                        break;
                    case ScreenConstants.MOAHealthMaintenance:
                        tag = LookUp.GetValueByKey(LookupTypes.Tags, ContactConstants.TagsValue.HealthMaintenance);
                        break;
                    case ScreenConstants.HospitalizationTab:
                        tag = LookUp.GetValueByKey(LookupTypes.Tags, ContactConstants.TagsValue.Hospitalizations);
                        break;
                    case ScreenConstants.MOAMedication:
                    case ScreenConstants.MedicationsTab:
                        tag = LookUp.GetValueByKey(LookupTypes.Tags, ContactConstants.TagsValue.Medications);
                        break;
                    case ScreenConstants.MOATransplant:
                    //case ScreenConstants.TransplantEvaluationTab:
                        tag = LookUp.GetValueByKey(LookupTypes.Tags, ContactConstants.TagsValue.TransplantEvaluation);
                        break;
                    case ScreenConstants.FluidManagementTab:
                        tag = LookUp.GetValueByKey(LookupTypes.Tags, ContactConstants.TagsValue.FluidManagement);
                        break;
                    case ScreenConstants.MOAACP:
                        tag = LookUp.GetValueByKey(LookupTypes.Tags, ContactConstants.TagsValue.AdvanceCarePlanning);
                        break;
                    case ScreenConstants.DiabetesTab:
                        tag = LookUp.GetValueByKey(LookupTypes.Tags, ContactConstants.TagsValue.Diabetes);
                        break;
                    case ScreenConstants.PathwaysTab:
                    case RCMPathwaysScreen.RCMAccessCareTab:
                    case RCMPathwaysScreen.RCMDiabetesMgmtTab:
                    case RCMPathwaysScreen.RCMDietTab:
                    case RCMPathwaysScreen.RCMFluidMgmtTab:
                    case RCMPathwaysScreen.RCMMedicationManagementTab:
                    case RCMPathwaysScreen.RCMTreatmentRegimenTab:
                    case ScreenConstants.MOAInfectionManagement:
                    case ScreenConstants.CaregiverAssessment:
                    case ScreenConstants.ESRDTreatmentOptions:
                    case ScreenConstants.NutritionPathway:
                    case ScreenConstants.MOADiabetes:
                    case ScreenConstants.MOAHospitalization:
                    case ScreenConstants.MOAFluidManagement:
                    case ScreenConstants.MOATransplant:
					case ScreenConstants.SmokingCessation:
                        tag = LookUp.GetValueByKey(LookupTypes.Tags, ContactConstants.TagsValue.PTH);
                        break;
                    case ScreenConstants.PAMSurvey:
                        tag = LookUp.GetValueByKey(LookupTypes.Tags, ContactConstants.TagsValue.PAMSurvey);
                        break;
                    case ScreenConstants.CognitiveScreening:
                        tag = LookUp.GetValueByKey(LookupTypes.Tags, ContactConstants.TagsValue.CognitiveScreening);
                        break;
                    case ScreenConstants.FallRiskAssessment:
                        tag = LookUp.GetValueByKey(LookupTypes.Tags, ContactConstants.TagsValue.FallRiskAssessment);
                        break;
					case ScreenConstants.MOAImmunizations:
                    case ScreenConstants.ImmunizationsTab:
                        tag = LookUp.GetValueByKey(LookupTypes.Tags, ContactConstants.TagsValue.Immunizations);
                        break;
                    default:
                        tag = LookUp.GetValueByKey(LookupTypes.Tags, ContactConstants.TagsValue.PatientInfo);
                }
                if ($rootScope.Global.Contacts && $rootScope.Global.Contacts.PreSaveContact && $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[0].ContactNotes[0].Tags !== null && $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[0].ContactNotes[0].Tags !== undefined) {
                    var matchingTag = jQuery.grep($rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[0].ContactNotes[0].Tags, function(tagValue) {
                        return tagValue === tag.Value;
                    });

                    if (matchingTag.length === 0) {
                        $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[0].ContactNotes[0].Tags.push(tag.Value);
                    }

                }
            }

            //callback

            /**
             * @ngdoc function
             * @name onGetPtClinicalMetricRetrieved
             * @methodOf roundingModule.controller:PatientChartMenuController
             * @description 
             ** Call back function onGetPtClinicalMetricRetrieved to retrieve patients clinical metric details.
             * @param {object} result
             * Web API call return data 
             */
            $scope.onGetPtClinicalMetricRetrieved = function (result) {

                //Added Timeout to fix the issue of menu not loading * Sandeep 12/03/2014 *
                $timeout(function() {
                    var menus = $rootScope.Global.Objects.Menus;
                    var metrics = { "MetricItems": null };
                    var liarrowclass = { "LiClass": null };
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        try {
                            if (menus != null) {
                                //Get all SubMenus for Patient Chart
                                $.each(menus, function (key, value) {
                                    if (value.SubMenus !== null) {
                                        $.each(value.SubMenus, function (key, value1) {
                                            var frontColor = { "FrontColor": null };
                                            var metricshtml = { "MetricsHtml": null };
                                            $.extend(value1, metrics);
                                            $.extend(value1, frontColor);
                                            if (value1.Tabs !== null) {
                                                liarrowclass.LiClass = "'show km-listview-link ptchart-menutext'";
                                                $.extend(value1, liarrowclass);
                                            }
                                            else {
                                                liarrowclass.LiClass = "'hide km-listview-link ptchart-menutext'";
                                                $.extend(value1, liarrowclass);
                                            }

                                            // $.extend(value1, liclass);
                                            $.each(result.data, function (key2, value2) {
                                                frontColor.FrontColor = null;
                                                metricshtml.MetricsHtml = "";
                                                if (value2 !== null && value2.MetricItems !== null && value2.MetricItems !== undefined) {
                                                    $.each(value2.MetricItems, function (key2, metricitem) {
                                                        if (metricitem.Color === CommonConstants.TextColor.Red) {
                                                            frontColor.FrontColor = CommonConstants.MenuMetricItemsColor.Red;
                                                        }
                                                        else if (metricitem.Color === CommonConstants.TextColor.Green) {
                                                            frontColor.FrontColor = CommonConstants.MenuMetricItemsColor.Green;
                                                        }
                                                        else if (metricitem.Color === CommonConstants.TextColor.Yellow || metricitem.Color === CommonConstants.TextColor.Orange) {
                                                            metricitem.Color = CommonConstants.MenuMetricItemsColor.Orange;
                                                            frontColor.FrontColor = CommonConstants.MenuMetricItemsColor.Orange;
                                                        }
                                                        if (metricitem.Value === null) {
                                                            metricitem.Value = "";
                                                        }
                                                        else {
                                                            //Check if the string contains contains ':'
                                                            if (value2.Name === 'PatientCarePlan') {
                                                                if (metricitem.Value.indexOf(':') > -1) {
                                                                    var replacedString = metricitem.Value.replace(/:/g, '');
                                                                    $scope.activeCarePlanCount = parseInt(replacedString);
                                                                } else {
                                                                    $scope.activeCarePlanCount = parseInt(metricitem.Value);
                                                                }
                                                            }                                                            
                                                            if (metricitem.Value.charAt(0) != ":" && metricitem.Value != "") {
                                                                metricitem.Value = ":" + metricitem.Value;
                                                            }
                                                        }
                                                        metricshtml.MetricsHtml = metricshtml.MetricsHtml + "<span class='metrics'>" + metricitem.DisplayText + metricitem.Value + "</span>";
                                                    });
                                                }

                                                /* Added for task: 20899 Admissions: RCM/PRL: Display clinical metrics for Admissions menu */
                                                if((CommonFunctions.IsNotNullOrEmpty(value1["Text"])) && (CommonFunctions.IsNotNullOrEmpty(value2["Name"])))
                                                {
                                                    // #### Remove White Spaces to match the if Conidition below. Implemented for Patient Care Plan  #### //
                                                    var demoText = value1["Text"],
                                                        updatedText = demoText.replace(/ /g, '');

                                                    if ((updatedText.toUpperCase() === value2["Name"].toUpperCase()) || (value1["Text"] === PtDetailFilterConstants.Admission && value2["Name"] === ScreenConstants.Hospitalizations)) {
                                                        $.extend(value1, value2);
                                                        $.extend(value1, frontColor);
                                                        $.extend(value1, metricshtml);
                                                    }
                                                }
                                            });
                                        });
                                    }

                                    if (value["Screen"] === ScreenConstants.PatientInfo) {
                                        $scope.model.PatientChartMenu.SubMenus.data(value.SubMenus);
                                    }
                                    else if (value["Screen"] === ScreenConstants.PathwayScreening) {
                                        $scope.model.PathwayScreeningMenu.SubMenus.data(value.SubMenus);

                                        PatientChartService.AddScrMenu(value.SubMenus);

                                        //Button Text
                                        $("#ptchart-pathway-screening-span").text(value.Text);
                                    }
                                });

                            }

                            if ($scope.model.PathwayScreeningMenu != null && $scope.model.PathwayScreeningMenu.SubMenus !=null && $scope.model.PathwayScreeningMenu.SubMenus.length > 0) {
                                //Dynamic height of Pathway/Screening Menu based on number of tabs 
                                var pathwayTabsHeight = ($scope.model.PathwayScreeningMenu.SubMenus.length * 41.63);
                                $("#ptchart-view-pathway-screening-tabs").css("height", pathwayTabsHeight + "px");
                            }

                            if (!$scope.refreshMetricsCount) {
                                var e = { "view": { "params": { "Screen": $scope.model.PatientChartMenu.SubMenus.data()[0].Screen, "UID": $scope.model.PatientChartMenu.SubMenus.data()[0].UID } } }
                                $scope.showDetailView(e);
                            }

                            $scope.refreshMetricsCount = false;
                            
                        }
                        catch (ex) {
                            var errExp = {};
                            errExp.Exception = ex;
                            errExp.ModuleName = "PatientChart";
                            errExp.FunctionName = "onGetPtClinicalMetricRetrieved";
                            errExp.StackTrace = printStackTrace({ e: ex });
                            ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                        }
                    }
                }, 0, true);

                CommonFunctions.UnblockKendoView("ptchart-main-splitview");
            }


            /**
              * @ngdoc function
              * @name onGetMoaRetrieved
              * @methodOf roundingModule.controller:PatientChartMenuController
              * @description 
              ** Call back function "onGetMoaRetrieved "
              * @param {object} result
              * Web API call return data 
              */
            $scope.onGetMoaRetrieved = function (result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        $scope.model.Moa.data(result.data);
                    }
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "PatientChart";
                    errExp.FunctionName = "onGetMoaRetrieved";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            };

            $timeout(function() {
                $scope.show();
            }, 500, false);
        });
}());