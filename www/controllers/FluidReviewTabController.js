(function () {
    /**
   * @ngdoc service
   * @name  roundingModule.service:FluidService
   * @description 
   * Service Name: FluidService        
   */
    angular.module('roundingModule').factory('FluidService', function (ServiceConstants, RoundingService) {
        /**
        * @ngdoc method
        * @name FluidService.getfluidManagement
        * @methodOf roundingModule.service:FluidService
        * @description This service method will get Fluid Data. This data will be used to bind the Chart and Grid on this screen.
        * @param {object} data 
        * Contains patientUID as input parameter for API  
        * @param {string} method
        * Method: GET/POST.
        * @param {object} dataType
        * DataType of the object example .JSON 
        * @param {object} callBack
        * $scope.onGetfluidManagementRetrieved.
        * @returns {object}
        * result (fluidmanagement)
        */
        function getfluidManagement(data, method, dataType, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetFluidData, method, dataType, $.param({ '': data }), callBack, true);
        }

        return {
            GetfluidManagement: getfluidManagement
        }
    });
}());

(function () {
    angular.module('roundingModule')
       /**
		 * @ngdoc controller
		 * @name roundingModule.controller:FluidReviewTabController
		 * @description
         * Controller for Fluid Management => Review Tab
		 * <p>VersionOne Requirements - <a href="https://www13.v1host.com/DaVitaInc/Task.mvc/Summary?oidToken=Task%3A30000">TK-01414</a></p>
         * @property {boolean} $scope.noDataAvailable Set to true when there is no data. In this case, it will display <i>No Data Available</i> on UI. Otherwise it will display Chart and Grid.
		 */
        .controller('FluidReviewTabController', function ($rootScope, $scope, FluidService, ExceptionService, CommonFunctions, CommonMessages, ExceptionService, Status) {
             
            $scope.noDataAvailable = false;
       /**
         * @ngdoc function
         * @name onGetfluidManagementRetrieved
         * @methodOf roundingModule.controller:FluidReviewTabController
         * @description             
         * Call back function to retrieve all fluid management data for the selected patient.
         * @param {object} result
         * result contains data for fluid management
         */
            $scope.onGetfluidManagementRetrieved = function (result) {
                try {
                  
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data !== null && result.data !== undefined) {
                        if(result.data.length === 0 || (result.data.length > 0 && (result.data[0].FluidLabData === null || result.data[0].FluidLabData === undefined || result.data[0].FluidLabData.length === 0)))
                        {
                             $scope.noDataAvailable = true;
                        }
                        else 
                        {
                            result.data[0].FluidLabData = CommonFunctions.SortArray(result.data[0].FluidLabData, 'TxDate', false);

                            for (var i = 0; i < result.data[0].FluidLabData.length; i++) {
                                var formatteddate = CommonFunctions.DateFunctions.dateFormat(CommonFunctions.DateFunctions.parseDate(result.data[0].FluidLabData[i].TxDate), "mm/dd/yy", false);
                                result.data[0].FluidLabData[i].TxDate = formatteddate;
                                result.data[0].FluidLabData[i].TxDateGrid = CommonFunctions.DateFunctions.dateFormat(formatteddate, "mm/dd/yyyy", false);
                            }

                            $scope.fluidChartData = new kendo.data.DataSource({
                                data: result.data[0].FluidLabData.slice(0, 6),
                                sort: {
                                    field: "TxDate",
                                    dir: "asc"
                                }
                            });
                            
                            $("#fluidReviewTabChart").kendoChart({
                                dataSource: $scope.fluidChartData,
                                legend:{ position: 'top' },
                                series: [{  
                                            field: 'TxDryWeight', 
                                            name: 'Post Tx Weight', 
                                            color: '#ED8722', 
                                            type: 'line', 
                                            style: 'smooth', 
                                            labels: {visible: false}, 
                                            missingValues: 'gap'
                                        },
                                        {
                                            field: 'TxWetWeight', 
                                            name: 'Pre Tx Weight', 
                                            color: '#56A0D3', 
                                            type: 'line', 
                                            style: 'smooth', 
                                            labels: {visible: false}, 
                                            missingValues: 'gap'
                                        },
                                        {
                                            field: 'TargetDryWeight', 
                                            name: 'Target Weight', 
                                            type: 'area', 
                                            color: 'gray',
                                            opacity: 0, 
                                            missingValues: 'gap',
                                            line: { 
                                                color: 'gray', 
                                                width: 3, 
                                                dashType: 'dot'
                                            }, 
                                            markers: { 
                                                visible: true, 
                                                background: 'grey', 
                                                size: 8
                                            }
                                        }
                                ],
                                categoryAxis: {
                                    field: "TxDate",
                                    labels: { 
                                        visible: true
                                    }, 
                                    majorGridLines: {
                                        visible: true
                                    }
                                },
                                tooltip: {
                                    visible: true,
                                    template: '#= series.name #: #= value #'
                                },
                                legendItemClick: function(e) {
                                    e.preventDefault();
                                    return false;
                                }
                            
                            });
                            
                            var tempgrid = $("#fluidReviewTabGrid").data("kendoGrid");
                            if (tempgrid) {
                                tempgrid.destroy();
                                $("#fluidReviewTabGrid").html("");
                            }
                            $("#fluidReviewTabGrid").kendoGrid({
                                dataSource: {
                                    data: result.data[0].FluidLabData,
                                    schema: {
                                        model: {
                                            fields: {
                                                TxDate: { type: "string" },
                                                TxFacility: { type: "string" },
                                                TxWetWeight: { type: "string" },
                                                TxDryWeight: { type: "string" },
                                                TargetDryWeight: { type: "string" },
                                                SittingPreTxBp: { type: "string" },
                                                SittingPostTxBp: { type: "string" },
                                                Runtime: { type: "string" }
                                            }
                                        }
                                    }
                                },
                                scrollable: true,
                                groupable: false,
                                sortable: {
                                    mode: "single",
                                    allowUnsort: false
                                },
                                pageable: false,
                                reorderable: false,
                                resizable: false,
                                columns:[{
                                            field: "TxDateGrid",
                                            title: "Tx Date",
                                            template: "<span>#= TxDateGrid #</span>"
                                        },{
                                            field: "TxFacility",
                                            title: "Tx Facility",
                                            template: "<span#=(IsTreatmentData !== true?\" class='span-pink-bgcolor'>\" : '>') + TxFacility#</span>"
                                        },{
                                            field: "TxWetWeight",
                                            title: "Pre-Wet Weight(Kg)",
                                            template: "<span>#=(TxWetWeight? TxWetWeight : '&nbsp;')#</span>"
                                        },{
                                            field: "TxDryWeight",
                                            title: "Post-Dry Weight(Kg)",
                                            template: "<span#=(TxDryWeight > TargetDryWeight?\" style='color:red;'>\" : '>') + (TxDryWeight? TxDryWeight : '&nbsp;')#</span>"
                                        },{
                                            field: "Idwg",
                                            title: "IDWG",
                                            template: "<span>#= Idwg #</span>"
                                        },{
                                            field: "TargetDryWeight",
                                            title: "Target Weight(Kg)",
                                            template: "<span>#=(TargetDryWeight? TargetDryWeight : '&nbsp;')#</span>"
                                        },{
                                            field: "SittingPreTxBp",
                                            title: "Pre-Tx BP",
                                            template: "<span>#=(SittingPreTxBp? SittingPreTxBp : '&nbsp;')#</span>"
                                        },{
                                            field: "SittingPostTxBp",
                                            title: "Post-Tx BP",
                                            template: "<span>#=(SittingPostTxBp? SittingPostTxBp :'&nbsp;')#</span>"
                                        },{
                                            field: "RunTime",
                                            title: "Runtime",
                                            template: "<span>#=(RunTime? RunTime : '&nbsp;')#</span>"
							
                                        }
                                ],
                                dataBound: function (e) {
                                    $('.span-pink-bgcolor').each(function () {
                                        $(this).parent().parent().addClass('pink-bgcolor');
                                    });
                                }
                            });
                            var scroller = $("#fluidReviewTabGrid").data("kendoMobileScroller");
                            if (!scroller) {
                                $("#fluidReviewTabGrid").kendoMobileScroller();
                            }
                        }
                    }
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "FluidReviewTabController";
                    errExp.FunctionName = "onGetfluidManagementRetrieved";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");   
            }
            CommonFunctions.BlockKendoView("ptchart-splitview-main-pan",CommonMessages.BusyMessages.LoadingFluidData);
            FluidService.GetfluidManagement($rootScope.Global.Objects.SelectedPatient.UID, 'POST', 'JSON', $scope.onGetfluidManagementRetrieved);
        });
}());