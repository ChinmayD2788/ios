/**
	 * @ngdoc service
	 * @author Mikhail Rakhunov
	 * @name roundingModule.service:HospitalizationTabService
	 * @description     
	 * @version : 1.0
 */
(function () {
/**
	 * @ngdoc service 
	 * @name roundingModule.service:HospitalizationTabService
	 * @param {Object} data taskToBeAdded
	 * @param {function} callBack $scope.onCreateNewTaskCompleted
	 * @description       
	 *<i>HospitalizationTabService is being used by HospitalizationTabController
	 * This will be used for all service calls for HospitalizationTab Screen</i>
	  * @param {object} $rootScope
	 * Angular rootScope object.
	 * @param {object} ServiceConstants
	 * Common Constants.
	 * @param {function} RoundingService
	 * Common Function.
*/
    angular.module('roundingModule').factory('HospitalizationTabService', function ($rootScope, ServiceConstants, RoundingService) {
		 /**
		 * @ngdoc method
		 * @methodOf roundingModule.service:HospitalizationTabService
		 * @name getPtHospitalization
		 * @description
		 ** <b>Retrieve PtHospitalization data from service</b>
		 * @param {function} ServiceConstants.GetPtHospitalization
		 * <b><i>ServicePoint.</i></b>
		 * @param {object} $.param
		 *<b><i>Passing $rootScope.Global.Objects.SelectedPatient.UID.</i></b>
		 * @param {string} method
		 *<b><i> Method: POST</b></i>
		 * @param {object} dataType
		 *<b><i> DataType: JSON.</i></b>
		 * @param {string} callBack function name
		 *<b></i>Name is "$scope.onHospitalizationsRetrieved".</b></i>
		 * @returns {object}
		 * <b></i> PtHospitalization data.</b></i>
	*/
        function getPtHospitalization(callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPtHospitalization, 'POST', 'JSON', $.param({ '' : $rootScope.Global.Objects.SelectedPatient.UID }), callBack, true); //ServicePoint, method, dataType, data, callBack
        }

        return {
            GetPtHospitalization: getPtHospitalization
        };
    });
}());

(function () {
 /**
	* @ngdoc controller
	* @name roundingModule.controller:HospitalizationTabController
	* @description
	* <b>Controller for RCM PHospitalization </b>
	*/
    angular.module('roundingModule')
        .controller('HospitalizationTabController', function ($scope, LookUp, LookupTypes, HospitalizationTabService, CommonFunctions, CommonConstants,
                                                                ExceptionService, CommonMessages, Status) {
            $scope.Hospitalizations = [];
            $scope.noDataAvailable = true;            
           	   
            LookUp.GetLookUp(LookupTypes.AdmitType);
            LookUp.GetLookUp(LookupTypes.DischargePlan);
            LookUp.GetLookUp(LookupTypes.ReadmitReason);
            LookUp.GetLookUp(LookupTypes.PrimaryDx);
            LookUp.GetLookUp(LookupTypes.PrimaryDxSubCategory);
	   /**
		* @ngdoc method
		* @name onHospitalizationsRetrieved 
		* @methodOf roundingModule.controller:HospitalizationTabController
		* @description
		** <b> callBack for <i>get Hospitalization data</i> service method </b>
		* @param {object} result 
		* <b><i> Hospitalization Details </i></b>
		*/
            $scope.onHospitalizationsRetrieved = function (result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data
                        && result.data.Hospitalizations && result.data.Hospitalizations.length > 0) {
                        
                        for (var i = 0; i < result.data.Hospitalizations.length; i++) {
                            var infoNote = "";
                            if (result.data.Hospitalizations[i].IsAvoidableAdmit) {
                                infoNote = 'Avoidable';
                                if (result.data.Hospitalizations[i].IsReAdmit === CommonConstants.AdmitStatus.Yes) {
                                    infoNote += '/Readmission';
                                }
                            } else if (result.data.Hospitalizations[i].IsReAdmit === CommonConstants.AdmitStatus.Yes) {
                                infoNote = 'Readmission';
                            }
                            result.data.Hospitalizations[i].IsReAdmit = infoNote;
                        }
                        $scope.Hospitalizations = result.data.Hospitalizations;
                        $scope.noDataAvailable = true;
                    } else {
                        $scope.Hospitalizations = [];
                        $scope.noDataAvailable = false;
                    }
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "HospitalizationTabService";
                    errExp.FunctionName = "onHospitalizationsRetrieved";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");   
            }
          
            CommonFunctions.BlockKendoView("ptchart-splitview-main-pan", CommonMessages.BusyMessages.LoadingHospitalization);
            HospitalizationTabService.GetPtHospitalization($scope.onHospitalizationsRetrieved);
        }); 
}());		   	   	   	   