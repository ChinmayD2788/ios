(function () {
    /**
    * @ngdoc controller
    * @name roundingModule.controller:OpenPatientsController
    * @description
    * Controller for Open Patients Footer 
    * @property {object} $scope.OpenPatientsModel model of OpenPatientsController
    * @property {number} $scope.OpenPatientsModel.Total property of $scope.OpenPatientsModel which is used to get total open patients
    * @property {kendo.data.DataSource} $scope.OpenPatientsModel.OpenPatients property of $scope.OpenPatientsModel which carries open patients data
    * @property {object} $scope.OpenPatientsModel.GridOptions property of $scope.OpenPatientsModel which is used to display open patients in grid
    * @property {boolean} $scope.OpenPatientsModel.OpenPatientsShow property of $scope.OpenPatientsModel which sets OpenPatientsShow flag
    */
    angular.module('roundingModule')
        .controller('OpenPatientsController', function ($scope, $rootScope, $timeout, AlertsService, ExceptionService, CommonFunctions, CommonConstants,
                                                        $filter, CommonMessages, Status, RouteConstants) {
            $scope.OpenPatientsModel = {};
            $scope.OpenPatientsModel.Total = 0;
            $scope.OpenPatientsModel.OpenPatients = new kendo.data.DataSource({ data: [] });
            $scope.OpenPatientsModel.OpenPatientsShow = false;
            // $scope.OpenPatientsModel.GridOptions = {};            

            $scope.GridOptions = {};



            $scope.$$listeners['changeOpenPatientsShowFlag'] = [];

            /**
            * @ngdoc event 
            * @name changeOpenPatientsShowFlag
            * @eventOf roundingModule.controller:OpenPatientsController           
            * @description       
            ** Subscriber of changeOpenPatientsShowFlag event which will set boolean value for OpenPatientsShow
            */
            $scope.$on('changeOpenPatientsShowFlag', function () {
                $timeout(function () {
                    $scope.OpenPatientsModel.OpenPatientsShow = false;
                }, 0, false);
            });

            /**
            * @ngdoc function 
            * @name $scope.showOpenPatients
            * @methodOf roundingModule.controller:OpenPatientsController           
            * @description       
            ** Loads the data grid of open patients
            ** Sets the $scope.OpenPatientsModel.Total 
            ** Gets call when OpenPatientsController loads
            */
            $scope.showOpenPatients = function () {
                try {                
                    if ($rootScope.Global.Contacts.PreSaveContactList && $rootScope.Global.Contacts.PreSaveContactList.length > 0) {

                        $scope.OpenPatientsModel.OpenPatients.data($rootScope.Global.Contacts.PreSaveContactList);
                        $scope.OpenPatientsModel.Total = $scope.OpenPatientsModel.OpenPatients._total > 0 ? $scope.OpenPatientsModel.OpenPatients._total : 0;
                        
            // $scope.OpenPatientsModel.GridOptions = {
                        $scope.GridOptions = {
                        dataSource: $scope.OpenPatientsModel.OpenPatients,                            
                            selectable: "row",
                            height: 220,
                            change: function (e) {
                                onOpenSelectedPatient(e.sender.dataItem(this.select()));
                            },
                            scrollable: {
                                virtual: true
                            }
                            /*,
                            dataBinding:function(e)
                            {
                             //   $scope.GridOptions.dataSource.read();
                            }
                            */
                            ,
                            columns:[{
                                        field: "PatientName",
                                        template: "<div class='openpatients-name'>#=PtContacts.PtContacts[0].PatientName#</div><span class='icon-delete-button' kendo-touch k-on-tap='onOpenPatientSelected(dataItem)'></span>"                                        
                                    }]
                        };                                      
                    } else {                        
                        $scope.OpenPatientsModel.Total = 0;                                            
                    }
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "OpenPatients";
                    errExp.FunctionName = "showOpenPatients";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
            * @ngdoc event 
            * @name onOpenPatientSelected
            * @eventOf roundingModule.controller:OpenPatientsController           
            * @description       
            ** k-on-tap event of kendo touch
            ** Patient Selection Event from Opened Patients
            ** Calls CommonFunctions.NavigatetoSelectedPatient
            */
            $scope.onOpenPatientSelected = function (dataItem) {
			    CommonFunctions.NavigatetoSelectedPatient(dataItem, true);
            }

			/**
			* @ngdoc event 
			* @name onOpenSelectedPatient
			* @eventOf roundingModule.controller:OpenPatientsController           
			* @description       
			** change event of grid item
			** Calls CommonFunctions.NavigatetoSelectedPatient
			*/
            onOpenSelectedPatient = function (selectedRow) {
                try {
                    CommonFunctions.CheckUIChange(function () {
						if(selectedRow) {
							CommonFunctions.NavigatetoSelectedPatient(selectedRow, true);
						}
					 }, null);		
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "OpenPatients";
                    errExp.FunctionName = "onOpenSelectedPatient";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
            * @ngdoc event 
            * @name openPatientsShowClick
            * @eventOf roundingModule.controller:OpenPatientsController           
            * @description       
            ** ng-click event of patient div
            ** Handles open patients animation
            */
            $scope.openPatientsShowClick = function () {
                try {
                    if ($scope.OpenPatientsModel.Total === 0) {
                        return;
                    }

                    if ($scope.OpenPatientsModel.OpenPatientsShow === false) {
                        $(".openpatients-view").removeClass("alerts-slide-down").addClass("alerts-slide-up");
                        $scope.OpenPatientsModel.OpenPatientsShow = true;
                    } else {
                        $(".openpatients-view").removeClass("alerts-slide-up").addClass("alerts-slide-down");
                        $scope.OpenPatientsModel.OpenPatientsShow = false;
                    }
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "OpenPatients";
                    errExp.FunctionName = "openPatientsShowClick";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }
            /**
            * @ngdoc event 
            * @name OpenPatientsModel.Total
            * @eventOf roundingModule.controller:$watch
            * @description 
            ** Global watch for OpenPatientsModel.Total
            */
            $scope.$watch('OpenPatientsModel.Total', function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }
                $scope.showOpenPatients();
            });

            /**
            * @ngdoc event 
            * @name $rootScope.Global.Contacts.PreSaveContactList
            * @eventOf roundingModule.controller:OpenPatientsController
            * @description 
            ** Global watch for PreSaveContactList
            */
            $scope.$watch(function () { return $rootScope.Global.Contacts.PreSaveContactList; }, function (newValue, oldValue) {
                if (newValue === oldValue) {
                    return;
                }               
                $scope.OpenPatientsModel.OpenPatients.data($rootScope.Global.Contacts.PreSaveContactList);
                $scope.OpenPatientsModel.Total = $scope.OpenPatientsModel.OpenPatients._total > 0 ? $scope.OpenPatientsModel.OpenPatients._total : 0;

                if ($scope.OpenPatientsModel.Total === 0 && $scope.OpenPatientsModel.OpenPatientsShow === true)
                {
                    $(".openpatients-view").removeClass("alerts-slide-up").addClass("alerts-slide-down");
                    $scope.OpenPatientsModel.OpenPatientsShow = false;
                }                
            }, true);

            //start point of Open Patients
            $scope.showOpenPatients();           
        });
}());