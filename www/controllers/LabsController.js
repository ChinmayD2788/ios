 /**
	 * @ngdoc service
	 * @author Mikhail Rakhunov
	 * @name roundingModule.service:LabService
	 * @description     
	 * @version : 1.0
 */

(function () {
/**
	 * @ngdoc service 
	 * @name roundingModule.service:LabService
	 * @param {Object} data taskToBeAdded
	 * @param {function} callBack $scope.onCreateNewTaskCompleted
	 * @description       
	 *<i>LabService is being used by LabController
	 * This will be used for all service calls for Lab Screen</i>
	 * @param {object} ServiceConstants
	 * Common Constants.
	 * @param {function} RoundingService
	 * Common Function.
*/
	
    angular.module('roundingModule').factory('LabsService', function (ServiceConstants, RoundingService) {
	   /**
		 * @ngdoc method
		 * @methodOf roundingModule.service:LabService
		 * @name getDataValRanges
		 * @description
		 ** <b>Retrieve Value Ranges from service</b>
		 * @param {function} data
		 * <b><i> Value Ranges to be retrieved.</i></b>
		 * @param {string} method
		 *<b><i> Method: GET</b></i>
		 * @param {object} dataType
		 *<b><i> DataType of the return object is JSON.</i></b>
		 * @param {string} callBack function name
		 *<b></i>Name is "$scope.onGetDataValRangeRetrieved".</b></i>
		 * @returns {object}
		 * <b></i> Value Ranges.</b></i>
	*/
	
        function getDataValRanges(callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetDataValRanges, 'GET', 'JSON', null, callBack)  //ServicePoint, method, dataType, data, callBack
        }
		 /**
			 * @ngdoc method
			 * @methodOf roundingModule.service:LabService
			 * @name getPtLabs
			 * @description
			 ** <b>Retrieve PT Labs data from service using filter</b>
			 * @param {object} labFilter
			 * <b><i> Filter object.</i></b>
			 * @param {string} method
			 *<b><i> Method: POST </b></i>
			 * @param {object} dataType
			 *<b><i> DataType is JSON.</i></b>
			 * @param {string} callBack function name
			 *<b></i> Name is "$scope.onGetPtLabsRetrived".</b></i>
			 * @returns {object}
			 ** PT Labs
		*/
        function getPtLabs(labFilter, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPtLabs, 'POST', 'JSON', labFilter, callBack);
        }
		
        return {
            GetDataValRanges: getDataValRanges,
            GetPtLabs:getPtLabs
        };
    });
}());

(function () {
	/**
	* @ngdoc controller
	* @name roundingModule.controller:LabsController
	* @description
	* <b>Controller for Labs </b>
	*/
    angular.module('roundingModule')
        .controller('LabsController', function ($rootScope, $scope, LookUp, LookupTypes, LabsService, CommonFunctions, LabType, Status, CommonConstants, ExceptionService, CommonMessages) {
            $scope.NoDataAvailable = true;
            $scope.CurrentLabHistory = [];
            $scope.LabHistory = [];
            $scope.DataValRanges = [];
            $scope.CurrentLab = null;
            $scope.Labs = [];
			$scope.NoData = CommonMessages.NoDataAvailable;
						
            LookUp.GetLookUp(LookupTypes.LabType);
						
            var labFilter = {
                PatientUID: $rootScope.Global.Objects.SelectedPatient.UID,
                LabTypes:[
                    LabType.Height,
                    LabType.Weight,
                    LabType.TargetDryWeight,                    
                    LabType.Phosphorous,
                    LabType.Creatinine,
                    LabType.GFR,
                    LabType.HgbA1C,
                    LabType.LDL,
                    LabType.Hgb,
                    LabType.Albumin,
                    LabType.UrineAlbuminCreatinineRatio,
                    LabType.DipstickForProtein,
                    LabType.Co2Level,
                    LabType.Calcium,
                    LabType.KTV,
                    LabType.URR,
                    LabType.Potassium,
                    LabType.PTH,
                    LabType.Hepatitisbtiter,
                    LabType.Ferritin,
                    LabType.TSAT,
                    LabType.BPSys,
                    LabType.BPDia
                ],	
                StartDate: null,
                EndDate: null
            }; 

	/**
		* @ngdoc method
		* @name onGetDataValRangeRetrieved 
		* @methodOf roundingModule.controller:LabsController
		* @description
		** <b>callBack for <i>GetDataValRanges</i> service method </b>
		* @param {object} result 
		* <b><i> The Range data </i></b>
	*/
       
            $scope.onGetDataValRangeRetrieved = function (result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && (result.data !== null || result.data !== undefined)) {
                        $scope.DataValRanges = result.data;
                    } 
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Labs";
                    errExp.FunctionName = "onGetDataValRangeRetrieved";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }
 
/**
		* @ngdoc method
		* @name onGetPtLabsRetrived 
		* @methodOf roundingModule.controller:LabsController
		* @description
		** <b>callBack for <i>GetPtLabs</i> service method </b>
		* @param {object} result 
		* <b><i> The Lab Current data and The Lab History data</i></b>
	*/ 
            $scope.onGetPtLabsRetrived = function (result) {
                try {
                    $scope.NoDataAvailable = true;
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        if (result.data.Current && result.data.Current.length > 0) {
                            $scope.NoDataAvailable = false;
                            $scope.Labs = result.data.Current;
                            $scope.LabHistory = result.data.History;

                            var len = $scope.Labs.length;
                            for (var i = 0; i < len; i++) {
                                var lookupItem = LookUp.GetValueByKey(LookupTypes.LabType, $scope.Labs[i].LabType);
                                $scope.Labs[i].LabTypeText = lookupItem.Text;
                            }
                        }
                        else {
                            $scope.NoDataAvailable = true;
                        }	
                    }
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Labs";
                    errExp.FunctionName = "onGetPtLabsRetrived";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");   
            }
	/**
	@element div
	* @function
	 * Open a Modal Window to display data as a chart 
	 * @param {object} SelectedItem - The Selected Item object.
 */        		
            $scope.onLabItemSelected = function (SelectedItem) { 
			    $scope.CurrentLab = null;
                try {
				    if (SelectedItem) {
                        $scope.CurrentLabHistory = [];
                        $scope.CurrentLab = SelectedItem;
			            var minTargetValue = 0;
                        var maxTargetValue = 0;
						
                        var targetValue = [];
                        if ($scope.DataValRanges && $scope.DataValRanges.length > 0) {
                            $($scope.DataValRanges).each(function (index, valRange) {
                                if (valRange !== null && valRange !== undefined) {
                                    if ($scope.CurrentLab.LabType === valRange.Type) {
                                        if (valRange.DiseaseState === "C" &&
                                            $rootScope.Global.Objects.CurrentPatientDiseaseState.indexOf("CKD") > -1) {
                                            targetValue.push(valRange.TargetMinValue);
                                            targetValue.push(valRange.TargetMaxValue);
                                        }
                                        else if (valRange.DiseaseState === "E" && 
                                                 $rootScope.Global.Objects.CurrentPatientDiseaseState.indexOf("ESRD") > -1) { 
                                            targetValue.push(valRange.TargetMinValue);
                                            targetValue.push(valRange.TargetMaxValue);
                                        }
                                        else if (valRange.DiseaseState !== "E" && valRange.DiseaseState !== "C") {
                                            targetValue.push(valRange.TargetMinValue);
                                            targetValue.push(valRange.TargetMaxValue);
                                        }
                                    }
                                }
                            });
                        }
                        
                        if (targetValue.length > 1) {
                            targetValue = targetValue.sort(function (a, b) {
                                return (a - b);
                            });

                            minTargetValue = targetValue[0];
                            maxTargetValue = targetValue[targetValue.length - 1];
                        }

                        var yAxisValue = [];
						
                        angular.forEach($scope.LabHistory, function(lab, index) {
                            if (lab.LabType === $scope.CurrentLab.LabType) {
                                if (lab.Value <= minTargetValue || lab.Value >= maxTargetValue) {
                                    lab.colorValue = CommonConstants.LabHistoryColor.Red;
                                }
                                else {
                                    lab.colorValue = CommonConstants.LabHistoryColor.Gray;
                                }
						        
								if(lab.DrawDate.length > 10) {
									lab.DrawDate = CommonFunctions.DateFunctions.dateFormat(CommonFunctions.DateFunctions.parseDate(lab.DrawDate), "mm/dd/yy", false);
								}	
							     yAxisValue.push(lab.Value);
                                $scope.CurrentLabHistory.push(lab);
                            }
                        });
	
                        if (minTargetValue >= 0 && maxTargetValue > 0) {
                            yAxisValue.push(minTargetValue);
                            yAxisValue.push(maxTargetValue);
                        }

                        yAxisValue = yAxisValue.sort(function (a, b) {
                            return (a - b);
                        });

                        // Set chart min/max value
                        var chartMinValue = parseFloat(yAxisValue[0]);
                        var chartMaxValue = parseFloat(yAxisValue[yAxisValue.length - 1]);
                        if (chartMinValue >= 1) {
                            chartMinValue = parseFloat(chartMinValue);
                        }
                        if (chartMaxValue >= 0) {
                            chartMaxValue = parseFloat(chartMaxValue) + 10.0;
                        }
                        var tempObject = [];
                        var currLength = $scope.CurrentLabHistory.length - 1;
                        var j = -1;
                        for (var i = currLength; i >= 0; i--) {
                            j++;
                            tempObject[j] = $scope.CurrentLabHistory[i];
                        }						
                        $scope.CurrentLabHistory = tempObject;
						
                        // render chart
                        var labHistorySource = new kendo.data.DataSource({
                                                                             data: $scope.CurrentLabHistory
                                                                         });

                        $("#lab-history-chart").kendoChart({
                            dataSource: labHistorySource,
                           	seriesDefaults:{
                                type: "line",
                                style: "smooth",
                                labels:{
                                    visible: true,
                                    background: "transparent",
                                    padding: 0,
                                    position: "top"
                                }
                            },
                            plotArea:{
                                margin:{
                                    top: 10,
                                    left: 5,
                                    right: 5,
                                    bottom: 10
                                }
                            },
                            series:[{
                                        color: 'Gray',
                                        aggregate: "max",
                                        field: "Value",
                                        categoryField: "DrawDate",
                                        colorField: "colorValue",
                                        labels:{
                                            visible: true
                                        },
                                        margin:{
                                            top: 50,
                                            left: 15,
                                            right: 5,
                                            bottom: 50
                                        },
                                        markers:{
                                            visible: true,
                                            size: 12
                                        }
                                    }
                            ],
                            valueAxis:[{
                                        min: chartMinValue,
                                        max: chartMaxValue,
																
                                        plotBands: [{ from: minTargetValue, to: maxTargetValue, color: CommonConstants.LabHistoryColor.Green, opacity:0.6}],
                                        line: {
                                            visible: true
                                        },
                                        majorGridLines:{
                                            visible: true
                                        },
                                        majorTicks: {
                                            visible: false
                                        }
                                    }
                            ],
                            panes: [
                                {clip: false}
                            ],
                            categoryAxis:{
                                baseUnit: "Days",
                                labels:{
                                    rotation: 0,
                                    template: "#=value#"
									
                                },
								majorGridLines:{
                                    visible: true
                                },
                                majorTicks:{
                                    visible: false
                                },
                                justified: false
                            },
                            tooltip:{
                                visible: true,
                                format: '{0}',
                                template: '<span class="lab-chart-tooltip">#= value #</span>'
                            }
                        });
					
                        //**** Open Modal Window *****************
                        var txt = $scope.CurrentLab.LabTypeText + ' (' + $scope.CurrentLab.Value + ')';
                        var clsNames = $scope.CurrentLab.Color==='Red' ? 'crd-redtext lab-item-label' : 'crd-greentext lab-item-label';
                        var length = $scope.CurrentLab.GoalRanges.length;
						
                        $.extend($scope.CurrentLab, { LabTypeFullText : txt });
                        $.extend($scope.CurrentLab, { ClassNames : clsNames });
                        
                        txt = "";
						
                        for (var x = 0; x < length; x++) {
                            txt += (x === 0? 'Goal: ' : ' ') + $scope.CurrentLab.GoalRanges[x];
                        }
                        $.extend($scope.CurrentLab, { GoalRangesFullText : txt });
                       			
                        $("#lab-history-modalview").data("kendoMobileModalView").open();
                    }
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Labs";
                    errExp.FunctionName = "onLabItemSelected";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            } 
            CommonFunctions.BlockKendoView("ptchart-splitview-main-pan", CommonMessages.BusyMessages.LoadingLabs);
            LabsService.GetDataValRanges($scope.onGetDataValRangeRetrieved);
            LabsService.GetPtLabs(labFilter, $scope.onGetPtLabsRetrived);
        }); 
}());  