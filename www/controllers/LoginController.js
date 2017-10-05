(function () {
    /**
     * @ngdoc service
     * @author Sandeep Parmar
     * @name roundingModule.service:LoginService
     * @description     
     ** LoginService is being used by LoginController
     ** This will be used for all service calls for Login Screen
     * @property {object} dataresult local variable     
     */
    angular.module('roundingModule').factory('LoginService', function ($rootScope, $http, Configuration, CommonFunctions, ServiceConstants,
                                                                       AppConstants, CommonMessages, Status, ResponseHeader, RouteConstants, DataStorage, StorageConstants, RoleTypeConstants) {
        var dataresult = null;

        /**
        * @ngdoc function 
        * @name GetClientVersion
        * @methodOf roundingModule.service:LoginService         
        * @description       
        ** First service call of the application
        ** Calls Account/GetClientVersionSupportDetails api using $http 
        ** Passes current app build version in query string
        ** If client version supported is true then only it goes further to login screen or goes to app upgrade screen
        */       
        getClientVersion = function () {
            CommonFunctions.Blockui();
            $http({
                      url: Configuration.GetServiceUrl() + ServiceConstants.GetClientVersionSupportDetails,
                      method: 'GET',
                      dataType: 'JSON',
                      params: { 'clientVersion': $rootScope.Global.Constants.CurrentServiceVersion }
                  })
            .success(function (result, status, headers, config) {
                CommonFunctions.Unblockui();
                if (result !== null) {
                    dataresult = result;

                    // even if the service call was a success, check the status in the view model and update the result status.
                    dataresult.resultstatus = (result.Status === Status.ServerResultStatus.Failure) ? Status.ServiceCallStatus.Error : Status.ServiceCallStatus.Success;

                    if (dataresult !== null && dataresult.Messages !== null && dataresult.Messages.length > 0) {
                        CommonFunctions.DisplayAlertMessages(dataresult.Messages);
                    }

                    if (dataresult.resultstatus === Status.ServiceCallStatus.Error) {
                        return;
                    }
                    else {
                        if (!dataresult.Value.IsClientVersionSupported) {
                            kendo.mobile.application.navigate(RouteConstants.AppUpgrade);
                        } 
                    }
                }
            })
            .error(function (result, status, headers, config) {
                CommonFunctions.Unblockui();
                if (!CommonFunctions.IsConnectedToNetwork(true)) {
                    return;
                }
                if (status === '500') {
                    CommonFunctions.DisplayAlertMessage(CommonMessages.Alert.UnhandledErrorMessage);
                }
                else {
                    CommonFunctions.OpenAlertBox('', [{ message: CommonMessages.Alert.UnhandledErrorMessage}], null);
                }
            });
        };

        /**
        * @ngdoc function 
        * @name Authenticate
        * @methodOf roundingModule.service:LoginService         
        * @param {string} username AD Username of the user
        * @param {string} password AD Password of the user
        * @param {undefined} passcode not used anymore just passing undefined to service (for two factor authentication but not used in rounding)
        * @param {function} callback callback function $scope.loginSuccessful
        * @param {function} onerror callback function $scope.loginFailed
        * @description    
        ** Calls Account/GetToken api using $http 
        ** If service call succeeds then populates $rootScope.Global.Objects with all Session and Current User details and callbacks $scope.loginSuccessful 
        ** If service call errors out then callbacks $scope.loginFailed        
        */        
        authenticate = function (username, password, passcode, callback, onerror) {
            $http({
                    url: Configuration.GetServiceUrl() + ServiceConstants.GetToken,
                    method: 'GET',
                    dataType: 'JSON',
                    headers: {
                    'Authorization': CommonFunctions.CreateBasicAuthenticationHeader('Basic', username + ':' + password + ':' + passcode + ':' + AppConstants.AppCode.Rounding)                           
                }
            })
            .success(function (result, status, headers, config) {
                var responseErrorMessage = headers()[ResponseHeader.ERROR_MESSAGE];

                // var responseErrorMessage = (result != null) ? result.AuthenticationErrorMessage : Rounding.Global.Constants.getLoginFailedUnKnownReasonText();
                if (responseErrorMessage) {
                    CommonFunctions.OpenAlertBox('', [{ message: 'Login Failed. ' + responseErrorMessage}], null);
                    if (onerror !== null) {
                        onerror();
                    }
                }
                else {
                    //no error message, so login was successful.
                    if (CommonFunctions.IsNotNullOrEmpty(headers()[ResponseHeader.USERID])) {
                        $rootScope.Global.Objects.CurrentUser.UID = headers()[ResponseHeader.USERID];
                    }

                    if (CommonFunctions.IsNotNullOrEmpty(headers()[ResponseHeader.USER_FIRSTNAME])) {
                        $rootScope.Global.Objects.CurrentUser.FirstName = headers()[ResponseHeader.USER_FIRSTNAME];
                    }

                    if (CommonFunctions.IsNotNullOrEmpty(headers()[ResponseHeader.USER_LASTNAME])) {
                        $rootScope.Global.Objects.CurrentUser.LastName = headers()[ResponseHeader.USER_LASTNAME];
                    }

                    if (CommonFunctions.IsNotNullOrEmpty(headers()[ResponseHeader.USER_ROLE])) {
                        $rootScope.Global.Objects.CurrentUser.CurrentRole = headers()[ResponseHeader.USER_ROLE];
                    }

                    if (CommonFunctions.IsNotNullOrEmpty(headers()[ResponseHeader.SECURE_TOKEN])) {
                        $rootScope.Global.Objects.SessionDetails.Token = headers()[ResponseHeader.SECURE_TOKEN];
                    }

                    if (CommonFunctions.IsNotNullOrEmpty(headers()[ResponseHeader.TOKEN_EXPIRATION_EPOCH])) {
                        $rootScope.Global.Objects.SessionDetails.TokenExpirationEpoch = headers()[ResponseHeader.TOKEN_EXPIRATION_EPOCH];
                    }

                    switch ($rootScope.Global.Objects.CurrentUser.CurrentRole) {
                        case RoleTypeConstants.RCM:
                        case RoleTypeConstants.PRL:
                            $rootScope.Global.Objects.IsRCMPRL = true;
                            break;
                        case RoleTypeConstants.VHN:
                        case RoleTypeConstants.ROM:
                        case RoleTypeConstants.TL:
                        case RoleTypeConstants.NP:
                            $rootScope.Global.Objects.IsRCMPRL = false;
                            break;
                        default:
                            $rootScope.Global.Objects.IsRCMPRL = false;
                            break;
                    }

                    $rootScope.Global.Objects.SessionDetails.IsTimedOut = false;
                    
                    $rootScope.Global.Objects.CurrentUser.DisplayName = $rootScope.Global.Objects.CurrentUser.FirstName + " " + $rootScope.Global.Objects.CurrentUser.LastName;
                    $rootScope.Global.Objects.SessionDetails.TimeoutInMinutes = result.Value.SessionTimeoutInMinutes;

                    $rootScope.Global.Objects.LoggedInUser = result.Value;

                    //TODO
                    //set the value of SessionMakeAliveIntervalMins which will decide when to send a session increment call to server.
                    //this value is calculated as (session timeout mins / 2) - 2 as half of session timeout mins is when server session token is
                    //regenerated. -2 is provided as a buffer so that the session does not expire on server in between.

                    //Rounding.Constants.Common.SessionMakeAliveIntervalMins = (result.SessionTimeoutInMinutes / 2) - 2; 

                    //Rounding.Data.CurrentUser.StartTime = Rounding.Common.Functions.dateFormat(Rounding.Common.Functions.parseDate(new Date()), "mm/dd/yy, h:MM:ss TT");

                    $rootScope.Global.Objects.CurrentUser.StartTime = (new Date()).toLocaleString();
                    $rootScope.Global.Objects.SessionDetails.LastUpdatedDateTime = new Date();

                    CommonFunctions.OnTap();
                                 
                    if (callback !== null) {
                        callback();
                    }
                }
            })
            .error(function (result, status, headers, config) {
                if (!CommonFunctions.IsConnectedToNetwork(true)) {
                    return;
                }
                CommonFunctions.OpenAlertBox('Alert', [{ message: CommonMessages.Alert.LoginFailedUnKnownReasonText}], null);
                if (onerror !== null) {
                    onerror();
                }
            });
        };

        /**
        * @ngdoc function 
        * @name SetVersion
        * @methodOf roundingModule.service:LoginService     
        * @returns {object} model of Rounding.Models.Login type
        * @description    
        * Populates Login Model with Environment, AppCode and App Version         
        */
        setVersion = function () {
            var model = new Rounding.Models.Login();
            model.AppEnvironment = Configuration.GetCurrentAppEnvironment();
            model.AppCode = AppConstants.AppCode.Rounding;
            model.Version = $rootScope.Global.Constants.CurrentAppVersion;
            return model;
        };

        /**
        * @ngdoc function 
        * @name GetModifiedLookupTypes
        * @methodOf roundingModule.service:LoginService     
        * @param {date} updatedDate last updated date of lookups
        * @description    
        ** Calls Account/GetModifiedLookupTypes api using $http         
        ** Populates updated lookup items         
        */
        getModifiedLookupTypes = function (updatedDate) {
            $http({
                      url: Configuration.GetServiceUrl() + ServiceConstants.GetModifiedLookupTypes,
                      method: 'POST',
                      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                      data: $.param({ '': updatedDate })
                })
                .success(function (result, status, headers, config) {
                    if (result.Value !== null && result.Value.length > 0) {
                        for (var i = 0; i < result.Value.length; i++) {
                            var lookupTypeStorageName = DataStorage.GetStorageName(result.Value[i], StorageConstants.StorageType);
                            DataStorage.Remove(lookupTypeStorageName);
                        }
                        DataStorage.SetItem(StorageConstants.LastUpdatedDate, new Date());
                    }
                })
                .error(function (result, status, headers, config) {
                    //what to do here ?
            });
        };

        /**
        * @ngdoc function 
        * @name UpdateLookUps
        * @methodOf roundingModule.service:LoginService     
        * @description    
        ** Clears datastorage of LastUpdatedDate if lastupdateddate is null
        ** Calls GetModifiedLookupTypes                      
        */
        updateLookUps = function () {
            var lastUpdatedDate = DataStorage.GetItem(StorageConstants.LastUpdatedDate);
            if (lastUpdatedDate === null) {
                DataStorage.Clear();
                lastUpdatedDate = "01/01/1901";
            }

            this.GetModifiedLookupTypes(lastUpdatedDate);
        };

        return {
            GetClientVersion: getClientVersion,
            Authenticate: authenticate,
            SetVersion: setVersion,
            GetModifiedLookupTypes: getModifiedLookupTypes,
            UpdateLookUps: updateLookUps
        }
    });
}());

(function () {
    angular.module('roundingModule')
        .controller('LoginController', function ($scope, $rootScope, $timeout, LoginService, RoundingService, ServiceConstants, 
                                                 ScreenConstants, TabTextConstants, CommonFunctions, RouteConstants, CommonMessages, Status)
        /**
        * @ngdoc controller
        * @name roundingModule.controller:LoginController
        * @description 
        ** Controller for Login View
        ** {@link roundingModule.service:LoginService}
        ** Calls LoginService.GetClientVersion when loads
        * @property {object} $scope.model   model of LoginController returned by LoginService.SetVersion     
        */
        {
            $rootScope.ShowPathwayScreening = false;
		
            //checks the current build version
            LoginService.GetClientVersion();
                     
            //Set footer with build app version
            $scope.model = LoginService.SetVersion();            

            /**
            * @ngdoc event 
            * @name login
            * @eventOf roundingModule.controller:LoginController
            * @description       
            ** k-on-tap event of Login button in Login view    
            ** Calls LoginService.Authenticate
            */
            $scope.login = function () {  
                $timeout(function() {
                    $("#login-username").blur();
                }, 0, false);  
            
                // *** only for unit testing pls commented on Check IN Test Checkin 2 for new branch  

                //if ($scope.model.UserName == '') { 
                //    $scope.model.UserName = 'vhn1';
                //    $scope.model.Password = 'test123';      
                //}

                // **** end for Unit testing                             
                if ($scope.loginValidator.validate()) {
                    CommonFunctions.Blockui();
                    LoginService.Authenticate($scope.model.UserName, $scope.model.Password, undefined, $scope.loginSuccessful, $scope.loginFailed);
                }
            };       

            /**
            * @ngdoc function 
            * @name loginSuccessful
            * @methodOf roundingModule.controller:LoginController
            * @description       
            ** Callback function of LoginService.Authenticate success    
            ** Calls LoginService.UpdateLookUps
            ** Calls 'Utility/GetMenus' api to get menus
            ** Calls 'Account/GetClientConfig' api to get client configuration
            ** Calls 'Contacts/GetPreSaveContacts' api to get pre save contacts based on result it navigates to MyPatients or ContactRecap or RCMDashboard screen
            */
            $scope.loginSuccessful = function () {
                CommonFunctions.Unblockui();                
                LoginService.UpdateLookUps();
                mixpanel.track("Login", {
                    "LOGGED_IN_ROLE": $rootScope.Global.Objects.CurrentUser.CurrentRole,
                    "DISPLAY_NAME": $rootScope.Global.Objects.CurrentUser.DisplayName
                });
                RoundingService.ServiceCallWithParams(ServiceConstants.GetMenus, 'POST', 'JSON', { bGetAllMenus: true, switchedToUserUID: null }, function (result) {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        var menus = result.data;
                        for (var i = 0; i < menus.length; i++) {
                            if (menus[i].Screen && menus[i].Screen === ScreenConstants.PatientInfo && menus[i].SubMenus) {
                                for (var j = 0; j < menus[i].SubMenus.length; j++) {
                                    if (menus[i].SubMenus[j].Screen && menus[i].SubMenus[j].Screen === ScreenConstants.MOAAccess && menus[i].SubMenus[j].Tabs) {
                                        //for Task TK-04240, If Access submenu is clicked instead of Review Tab loads all subtabs of it
                                        //Replace MOAAccess with custom tabs in UI
                                        var tabs = [
                                            { CanAdd: "Y", CanDelete: "Y", CanUpdate: "Y", Level: 3, Order: "1", Parent: null, Screen: ScreenConstants.ShiftNSchedule, ScreeningType: "", SubMenus: null, Tabs: null, Text: TabTextConstants.ShiftNSchedule, UID: "1001" },
                                            { CanAdd: "Y", CanDelete: "Y", CanUpdate: "Y", Level: 3, Order: "2", Parent: null, Screen: ScreenConstants.AccessInfo, ScreeningType: "", SubMenus: null, Tabs: null, Text: TabTextConstants.AccessInfo, UID: "1002" },
                                            { CanAdd: "Y", CanDelete: "Y", CanUpdate: "Y", Level: 3, Order: "3", Parent: null, Screen: ScreenConstants.VAP, ScreeningType: "", SubMenus: null, Tabs: null, Text: TabTextConstants.Vap, UID: "1003"}
                                        ];

                                        menus[i].SubMenus[j].Tabs = tabs;
                                    }
                                }
                            }
                            if (menus[i].Screen && menus[i].Screen === ScreenConstants.PathwayScreening) {
                                $rootScope.ShowPathwayScreening = true;
                            }
                        }

                        $rootScope.Global.Objects.Menus = menus;                    
                    }
                });

                RoundingService.ServiceCallWithoutParams(ServiceConstants.GetClientConfig, 'GET', 'JSON', function (result) {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        $rootScope.Global.Objects.ClientConfig = result.data;
                    }
                });
            
                RoundingService.ServiceCallWithParams(ServiceConstants.GetPreSaveContacts, 'GET', 'JSON', {  capellaUserUID: $rootScope.Global.Objects.LoggedInUser.UID }, function (result) {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data && result.data.PreSaveContacts && result.data.PreSaveContacts.length > 0 ) {
                       
                        var sortPreSaveContacts = CommonFunctions.SortArray(result.data.PreSaveContacts, 'CreateDate', true);

                        $rootScope.Global.Contacts.PreSaveContactList = sortPreSaveContacts.slice(0, 5);

                        $rootScope.Global.Contacts.PreSaveContact = $rootScope.Global.Contacts.PreSaveContactList[$rootScope.Global.Contacts.PreSaveContactList.length-1];
                        
                        $rootScope.Global.Objects.SelectedPatient = {
                            UID: $rootScope.Global.Contacts.PreSaveContact.PatientUID,
                            Name: $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[0].PatientName,
                            ID: $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[0].PatientID,
                            preSaveUID: $rootScope.Global.Contacts.PreSaveContact.UID
                        }
                        $rootScope.Global.CheckIsPatientOpened = true;
                        $rootScope.Global.Contacts.PresaveTimer = 180 * 1000;
                        window.setInterval(function () {
                            CommonFunctions.UpdatePreSaveContactList();
                        }, $rootScope.Global.Contacts.PresaveTimer); 

                        $timeout(function() {
                            $("#login-username").blur();
                        }, 0, false); 
						
						
                        kendo.mobile.application.navigate(RouteConstants.ContactRecap);
                    }
                    else {
					    $rootScope.Global.CheckIsPatientOpened = false;
                        $rootScope.Global.Contacts.PreSaveContactList = [];
                        $rootScope.Global.Contacts.PreSaveContact = null;
                        if ($rootScope.Global.Objects.IsRCMPRL) {
                            $timeout(function () {
                                $timeout(function() {
                                    $("#login-username").blur();
                                }, 0, false); 
                                kendo.mobile.application.navigate(RouteConstants.RCMDashboard);
                            }, 200);                            
                        }
                        else {
                            $timeout(function() {
                                $("#login-username").blur();
                            }, 0, false); 
                            kendo.mobile.application.navigate(RouteConstants.MyPatients);
                        }
                    }
                });
            };           

            /**
            * @ngdoc function 
            * @name loginFailed
            * @methodOf roundingModule.controller:LoginController
            * @description       
            * Unblocks UI if Login fails
            */
            $scope.loginFailed = function() {
                CommonFunctions.Unblockui();
            };
        });
}());