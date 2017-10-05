(function () {
    angular.module('roundingModule').factory('RoundingService', function ($rootScope, $http, RouteConstants, Configuration, 
                ServiceConstants, Status, CommonMessages, ResponseHeader, CommonFunctions,$timeout) {
        
       
        processServiceResult = function (result, headers) {
            if (CommonFunctions.IsNotNullOrEmpty(headers()[ResponseHeader.SECURE_TOKEN])) {               
                $rootScope.Global.Objects.SessionDetails.Token = (headers()[ResponseHeader.SECURE_TOKEN]);
            }

            if (CommonFunctions.IsNotNullOrEmpty(headers()[ResponseHeader.TOKEN_EXPIRATION_EPOCH])) {
                $rootScope.Global.Objects.SessionDetails.TokenExpirationEpoch = (headers()[ResponseHeader.TOKEN_EXPIRATION_EPOCH]);
            }

            if (CommonFunctions.IsNotNullOrEmpty(headers()[ResponseHeader.ERROR_MESSAGE])) {
                CommonFunctions.DisplayAlertMessage(headers()[ResponseHeader.ERROR_MESSAGE]);
            }

            if (result != null) {
                if (result.Messages != null && result.Messages.length > 0) {
                    CommonFunctions.DisplayAlertMessages(result.Messages)
                }
            }
        };

        serviceCallWithParams = function (serviceEndPoint, method, dataType, data, callBack, isPostMethod) {
            serviceProcess(serviceEndPoint, method, dataType, data, callBack, isPostMethod);
        };

        serviceCallWithoutParams = function (serviceEndPoint, method, dataType, callBack) {
            serviceProcess(serviceEndPoint, method, dataType, null, callBack);
        };

        serviceCallForExceptions = function (options) {
            serviceProcess(options.serviceEndPoint, options.method, options.dataType, 
                           options.data === '' ? null : options.data, options.callBackFunction);
        }

        serviceProcess = function (serviceEndPoint, method, dataType, data, callBack, isPostMethod) {
            if ($rootScope.Global.Objects.SessionDetails.Token === null) {
               kendo.mobile.application.navigate(RouteConstants.Login);
            }
            else {
                if ($rootScope.Global.Objects.SessionDetails.IsTimedOut === false) {
                   
                    var dataresult = {
                        data: [],
                        resultstatus: 'started',
                        errormessage: ''
                    }

                    $http({
                        url: Configuration.GetServiceUrl() + serviceEndPoint,
                        method: method,
                        dataType: dataType,
                        params: method === "GET" ? data : null,
                        data: method === "POST" ? data : null,                      
                        headers: isPostMethod ? { 'Authorization': "Session" + " " + $rootScope.Global.Objects.SessionDetails.Token, 'UserId': $rootScope.Global.Objects.LoggedInUser.UID, 'Content-Type': 'application/x-www-form-urlencoded' }
                                   : { 'Authorization': "Session" + " " + $rootScope.Global.Objects.SessionDetails.Token, 'UserId': $rootScope.Global.Objects.LoggedInUser.UID }
                    }).
                    success(function (result, status, headers, config) {
                        if (result != null) {
                            dataresult.data = result.Value;

                            //even if the service call was a success, check the status in the model and update the result status.
                            dataresult.resultstatus = (result.Status === Status.ServerResultStatus.Failure) ? Status.ServiceCallStatus.Error : Status.ServiceCallStatus.Success;

                            processServiceResult(result, headers);
                                                     
                            //Rounding.Global.Objects.SetLastSessionUpdateDateTime(new Date()); //update client session watch.
                            if (callBack) {
                                callBack(dataresult);
                            }
                        }
                        else {
                            CommonFunctions.UnblockElement("contactrecap-tasks-list");
                            if (callBack) {
                                callBack({ resultstatus: 2, data: {} });
                            }                            
                        }
                    }).
                    error(function (result, status, headers, config) {
                        CommonFunctions.UnblockElement("contactrecap-tasks-list");
                        if (status === 401) { //unauthorized
                            if (CommonFunctions.IsNotNullOrEmpty(headers()[ResponseHeader.ERROR_MESSAGE])) {
                                if (serviceEndPoint != ServiceConstants.Logout) {
                                    //if 401 error occurs for logout service call, dont display the error message.
                                    CommonFunctions.DisplayAlertMessage(headers()[ResponseHeader.ERROR_MESSAGE]);
                                         $timeout(function() {  
                                            $rootScope.$broadcast('UserLoggingOut', { any: {} });
                                         }, 0, false);       

                                    appLogoutWithoutConfirmation('');
                                }
                            }                      

                            return;
                        }
                        else {
                            if (!CommonFunctions.IsConnectedToNetwork(true)) {
                                return;
                            }
                            //TODO if service has internal excpetion
                            //                            else if (status === '500') {
                            //                                var exceptionDetails = {
                            //                                    DetailedErrorMessage: "500 error happened",
                            //                                    ModuleName: "service call",
                            //                                    FunctionName: "ServiceProcess",
                            //                                    Exception: {
                            //                                        name: textStatus,
                            //                                        message: errorThrown,
                            //                                        sourceURL: Rounding.Config.GetServiceUrl() + serviceEndPoint
                            //                                    }
                            //                                };
                            //                                CommonFunctions.HandleException(exceptionDetails);
                            //                                //CommonFunctions.DisplayAlertMessage(Rounding.Constants.AlertMessages.UnhandledErrorMessage);
                            //                            } else {
                            //                                CommonFunctions.DisplayAlertMessage(Rounding.Constants.AlertMessages.UnhandledErrorMessage);
                            //                            }
                            dataresult.data = '';
                            dataresult.resultstatus = Status.ServiceCallStatus.Error;
                            callBack(dataresult);
                        }
                    });
                }
                else {
                    CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.LogoutMessage);
                }
            }
        };

        return {
            ServiceCallWithParams: serviceCallWithParams,
            ServiceCallWithoutParams: serviceCallWithoutParams,
            ServiceCallForExceptions: serviceCallForExceptions
        }
    });
} ());

﻿(function () {
    angular.module('roundingModule').factory('ExceptionService', function (RoundingService, CommonFunctions, CommonMessages) {
        logException = function (options) {
            RoundingService.ServiceCallForExceptions(options);
            CommonFunctions.DisplayAlertMessage(CommonMessages.Alert.UnhandledErrorMessage);
        }

        return {
            LogException: logException
        };
    });
} ());