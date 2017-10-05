(function () {
    /**
    * @ngdoc service 
    * @name roundingModule.service:ScreeningsService
    * @description       
    * ScreeningsService is being used by {@link roundingModule.controller:ScreeningsController}
    * @param {object} ServiceConstants
    * Common Constants.
    * @param {function} RoundingService
    * Common Function.
    */
    angular.module('roundingModule').factory('ScreeningsService', function (ServiceConstants, RoundingService) {

      /**
        * @ngdoc method
        * @methodOf roundingModule.service:ScreeningsService
        * @name getPathwayHeaderData
        * @description
        * Retrieve pathway header items from service
        * @param {function} ServiceConstants.GetPathwayHeaderData
        * ServicePoint.
        * @param {object} data Two parameters PatientUid and SurveyType (e.g. Cognitive, PAM, TransplantPathway, PneuPathway, FluPathway, NutritionPathway, SmokingCessationPathway, ESRDPATHWAY
        * @param {string} method POST
        * @param {object} dataType JSON.
        * @param {string} callBack onGetPathwayHeaderDataRetrieved
        * @returns {object}
        * Header items of the requested SurveyTypes.
        */
        function getPathwayHeaderData(data, method, dataType, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPathwayHeaderData, method, dataType, data, callBack);
        }

        return {
            GetPathwayHeaderData: getPathwayHeaderData
        }
    });
} ());

(function () {

    /**
    * @ngdoc controller
    * @name roundingModule.controller:ScreeningsController
    * @description
    ** Controller for Other Screenings
    ** VersionOne Requirements - <a href="https://www13.v1host.com/DaVitaInc/Task.mvc/Summary?oidToken=Task%3A1361">TK-01054</a>
    ** {@link roundingModule.service:ScreeningsService}
    */
    angular.module('roundingModule')
        .controller('ScreeningsController', function ($rootScope, $scope, ScreeningsService, ExceptionService, CommonFunctions, CommonMessages) {
            var self = $scope;
           
            /**
            * @ngdoc function
            * @name onGetPathwayHeaderDataRetrieved
            * @methodOf roundingModule.controller:ScreeningsController
            * @description             
            ** Service based call back function of GetPathwayHeaderData Service call 
            ** Display header items as key/value pairs.
            * @param {object} result
            * return result data of WebApi call.
            */
            self.onGetPathwayHeaderDataRetrieved = function (result) {
                // self.screeningsBusyMessage.Loaded = true;
                try {
                    if (result.resultstatus === "Success" && (result.data !== null || result.data !== undefined)) {
                        var dataLength = result.data.length;
                        var dataNeeded = [];
                        var entityName = [];
                        var respondArray = [];

                        for (var i = 0; i < dataLength; i++) {
                            var tempArray = [];
                            var mappedArray = [];
                            var keyArray = [];
                            var tempObj = null;
                            if (result.data[i].DataItems.length > 0 && $(result.data[i].DataItems[0].Data).length > 0) {
                                tempObj = $(result.data[i].DataItems[0].Data)[0];
                            }	
                            dataNeeded[i] = result.data[i].HeaderItems;
                            entityName[i] = result.data[i].PathwayName;
					
                            for (var j = 0; j < dataNeeded[i].length; j++) {
                                if (dataNeeded[i][j].DisplayInUI) { 
                                    mappedArray[dataNeeded[i][j].DisplayOrder] = dataNeeded[i][j].DisplayName; 	
                                    keyArray[dataNeeded[i][j].DisplayOrder] = dataNeeded[i][j].UID; 	
                                }			
                            } 
			 	     
                            var mappedArrayLength = mappedArray.length;
					 
                            for (var j = 0; j < mappedArrayLength; j++) { 
                                if (mappedArray[j] !== undefined) {
                                    var stringKey = "" ;
                                    if (tempObj !== null) {
                                        stringKey = keyArray[j].toString();
                                        stringKey = tempObj[stringKey];
                                    }	
                                    tempArray.push({key: mappedArray[j], value: stringKey});
                                } 
                            }
                            respondArray.push({Title: entityName[i], Details: tempArray});
                        }	  
			 
                        self.Screenings = respondArray;

                        CommonFunctions.CreateScroller("screeningstab-container");


                    }
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Screenings";
                    errExp.FunctionName = "onGetPathwayHeaderDataRetrieved";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(Rounding.Common.HandleException(errExp));
                }
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");   
            }
             CommonFunctions.BlockKendoView("ptchart-splitview-main-pan",CommonMessages.BusyMessages.LoadingOtherScreenings);   
            var pathwayHeaderRequest = { "PathwayType": ['Cognitive', 'PAM', 'TransplantPathway', 'PneuPathway', 'FluPathway', 'NutritionPathway', 'SmokingCessationPathway', 'ESRDPATHWAY'], PatientUid: $rootScope.Global.Objects.SelectedPatient.UID }
            ScreeningsService.GetPathwayHeaderData(pathwayHeaderRequest, 'POST', 'JSON', self.onGetPathwayHeaderDataRetrieved);
        });
}());