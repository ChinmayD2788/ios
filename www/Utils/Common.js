/**
 * @ngdoc service
 * @author Mikhail Rakhunov
 * @name roundingModule.service:CommonFunctions
 * @description 
 * @version : 1.0
 */
 
(function () {
    /**
     * @ngdoc service
     * @name roundingModule.service:CommonFunctions
     * @description
     * Factory for  Common Functions
     * @property {boolean} isUIChanged
     * default value: false
     * @property {object} dateFunctions
     * default value: {}
     * @property {object} preSaveTimer
     * default value: null
     * @property {boolean} closePop
     * default value: false
     */
    angular.module('roundingModule').factory('CommonFunctions', function ($rootScope, $http, $timeout, $interval, Configuration, AppConstants, CommonMessages, CommonConstants, ServiceConstants, RouteConstants, ContactConstants) {
        var isUIChanged = false;
        var dateFunctions = {};
        var preSaveTimer = null;
        var closePop = false;

        find = function (obj, key, val) {
            var objects = [];
            for (var i in obj) {
                if (!obj.hasOwnProperty(i))
                    continue;
                if (typeof obj[i] == 'object') {
                    objects = objects.concat(find(obj[i], key, val));
                } else if (i == key && obj[key] == val) {
                    objects.push(obj);
                }
            }
            return objects;
        },
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name isRunningOnPhoneGap
         * @description       
         * Check if the application is running on PhoneGap
         * @returns {boolean} unnamed
         *  True - it is running
         */	
        isRunningOnPhoneGap = function () {
            if ((document.URL.indexOf('http://') === -1) && (document.URL.indexOf('https://') === -1)) {
                if (navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry|IEMobile)/)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name formatPhoneNumber
         * @description       
         * Format Phone Number string
         * @param {string} str
         * String including date
         * @returns {string}
         *  String with formatted phone data
         */
        formatPhoneNumber= function (str) {
            var newString = "";
            if (str != null && str.length >= 10) {
                var i;
                var result = "";

                for (i = 0; i < str.length; i++) {
                    var c = str.charAt(i).toString();
                    if ((c >= "0") && (c <= "9")) {
                        result = c + result;
                    }
                }

                for (n = result.length; n >= 0; n--) {
                    newString += result.charAt(n);
                }

                if (newString.length == 10) {
                    newString = newString.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3')
                }
            }

            return newString;
        },
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name stripAlphaChars
         * @description       
         * Format Number string by removing any charachers and empty spaces escluding digits
         * @param {string} srcstring
         * String with digits
         * @returns {string}
         *  String with digits only
         */
        stripAlphaChars = function (srcstring) {
            var newstr = new String(srcstring);
            newstr = newstr.replace(/[^0-9]/g, '');
            return newstr;
        },
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name getSelectedPatientUID
         * @description       
         * get Selected PatientUID
         * @returns {string}
         *  PatientUID
         */
        // get selected patient UID
        getSelectedPatientUID = function () {
            return $rootScope.Global.Objects.SelectedPatient.UID;
        },
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name updateSelectedPatient
         * @description       
         * Update Selected PatientUID
		
         */
        updateSelectedPatient = function (selectedPatient) {
            $rootScope.Global.Objects.SelectedPatient.Name = selectedPatient.PatientName;
            $rootScope.Global.Objects.SelectedPatient.UID = selectedPatient.PatientUID;
            $rootScope.Global.Objects.SelectedPatient.ID = selectedPatient.ID ? selectedPatient.ID : null;
        },

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name nonProdEnvAlert
         * @description       
         * Dispalys Alert Message if the user log on in Non Production Application
		
         */ 
        nonProdEnvAlert = function () {
            var env = Configuration.GetCurrentAppEnvironment();
            if (env != AppConstants.EnvName.PROD) {
                displayAlertMessage(CommonMessages.Alert.NonPRODAlert);
            }
        },        
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name isConnectedToNetwork
         * @description       
         * Update Selected PatientUID
         * @returns {boolean} unnamed
         *  True - connected; False - Not
         */
        isConnectedToNetwork = function (displayAlert) {
            try {
                if (isRunningOnPhoneGap()) {
                    var networkState = navigator.connection.type;
                    //alert(Connection.NONE);
                    //alert(networkState);

                    // var states = {};
                    //states[Connection.UNKNOWN] = 'Unknown connection';
                    //states[Connection.ETHERNET] = 'Ethernet connection';
                    //states[Connection.WIFI] = 'WiFi connection';
                    //states[Connection.CELL_2G] = 'Cell 2G connection';
                    //states[Connection.CELL_3G] = 'Cell 3G connection';
                    //states[Connection.CELL_4G] = 'Cell 4G connection';
                    //states[Connection.NONE] = 'No network connection';

                    if (networkState == Connection.NONE || networkState == Connection.UNKNOWN) {
                        if (displayAlert) {
                            displayAlertMessage(CommonMessages.Alert.NoNetworkErrorMessage);
                        }
                        return false;
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
            }
            catch (ex) {
                alert(ex);
            }
        },
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name handleNullForDisplay
         * @description       
         * Replace Null or empty String to one space string
         * @param {string} str
         * any string 
         * @returns {string}
         *  String or one space string
         */
        handleNullForDisplay = function (str) {
            //if value is null or empty, return a space. space is used so that layout is not affected.
            if (str == null || str == '') {
                return ' ';
            } else
                return str;
        }
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name isNotNullOrEmpty
         * @description       
         * CHecking id string is not null or empty
         * @param {string} str
         * any string 
         * @returns {boolean} unnamed
         *  True - String is null or empty
         */
        isNotNullOrEmpty = function (str) {
            if (str) {
                if (typeof str === 'string') {
                    if ($.trim(str) !== '') {
                        return true;
                    }
                } else {
                    return true;
                }
            }
            return false;	
        },
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name openAlertBox
         * @description       
         *  Open the Alert modal window
         * @param {string} title
         * Title for the Message  box
         * @param {array} messages
         * array messages 
         * @param {boolean} onOk
         * True - it is needed for OK button click
         */
        // open alert box
        openAlertBox = function (title, messages, onOk) {
            var message = '';
            for (var i = 0; i < messages.length; i++) {
                message = message + messages[i].message + ' ';
            }

            if (isRunningOnPhoneGap()) {
                navigator.notification.alert(message, onOk, title, 'Ok');
            } else {
                //for website
                alert(message);
                if (onOk) {
                    onOk();
                }
            }
        },
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name openConfirmBox
         * @description       
         * Open the Confirmation modal window
         * @param {string} title
         * Title for the Message  box
         * @param {array} messages
         * array messages 
         * @param {string} callback
         * Name of CallBack function
         */
        // open confirm box
        openConfirmBox = function (title, message, callback) {
            if (isRunningOnPhoneGap()) {
                navigator.notification.confirm(
                    message, // message
                    function (buttonIndex) {
                        callback({ returnValue: (buttonIndex === 1) ? true : false });
                    }, // callback to invoke with index of button pressed
                    title, // title
                    'Ok,Cancel'     // buttonLabels
                    );
            } else { // for website.
                var selectedval = confirm(message);
                callback({ returnValue: selectedval });
            }
        },
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name openCustomConfirmBox
         * @description       
         *  Open the Custom Confirmation modal window
         * @param {string} title
         * Title for the Message  box
         * @param {array} messages
         * array messages 
         * @param {string} callback
         * Name of CallBack function
         * @param {string} callback
         * Name of CallBack function
		
         */               
        openCustomConfirmBox = function (title, message, buttons, callback) {
            if (isRunningOnPhoneGap()) {
                var customButtons = "Ok,Cancel";
                if (buttons !== null && buttons !== undefined && buttons !== "") {
                    customButtons = buttons;
                }
                navigator.notification.confirm(
                    message, // message
                    function (buttonIndex) {
                        callback({ returnValue: (buttonIndex === 1) ? true : false });
                    }, // callback to invoke with index of button pressed
                    title, // title
                    customButtons   // buttonLabels
                    );
            } else { // for website.
                var selectedval = confirm(message);
                callback({ returnValue: selectedval });
            }
        },
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name displayAlertMessage
         * @description       
         * Displays Alert Message
         * @param {string} message
         * any String
         * @param {string} callback
         * Name of Call Back function
		
         */
        displayAlertMessage = function (message, callback) {
            openAlertBox('', [{ message: message }], callback);
        },

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name displayAlertMessages
         * @description       
         * Displays many Alert Messages in one time
         * @param {array} messages
         * any Strings
         */
        displayAlertMessages = function (messages) {
            var concatMessages = "";
            for (var i = 0; i < messages.length; i++) {
                if (!concatMessages) {
                    concatMessages = concatMessages + messages[i].Message + ".";
                } else {
                    concatMessages = concatMessages + "\n" + messages[i].Message + ".";
                }
            }
            displayAlertMessage(concatMessages);
        },
		
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name blockui
         * @description       
         * block UI
         */		
        blockui = function () {
            $.blockUI({
                          message: "<img src='Images/Loading.gif' />",
                          css: { 
                    backgroundColor: 'none', border: 'none', left: '50%', top: '50%', padding: 0,
                    margin: 0,
                    width: '30%',
                    top: '40%',
                    left: '35%',
                    textAlign: 'center',
                    color: '#43517A',
                    cursor: 'wait'     
                },
                          baseZ: 9999999,
                          overlayCSS:{
                    opacity: 0.6,
                    cursor: 'pointer'
                }
                      });
        },         
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name blockKendoView
         * @description       
         * block Kendo View
         * @param {string} element
         * element ID
         * @param {string} message
         * Message to be shown
         */
        blockKendoView= function (element, message) {
            kendo.ui.progress($("#" + element), true);
            if (message != null) {
                var position = $("#" + element).height();
                if (position === 0) {
                    position = $rootScope.Global.Objects.DeviceHeight;
                    position = position / 2 + 75;
                } else {
                    position = position / 2 + 25;
                }
                $("#" + element).find(".k-loading-image").append("<span style='top:" + position + "px'  class='crd-busy-message'>" + message + "</span>");
            }
        },

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name blockElement
         * @description       
         * block Kendo View
         * @param {string} element
         * element ID
         */
        blockElement = function (element) {
            $("#" + element).block({
                                       message: "<img src='Images/Loading.gif' />",
                                       css: { 
                    backgroundColor: 'none', border: 'none', left: '50%', top: '50%', padding: 0,
                    margin: 0,
                    width: '100%',
                    top: '40%',
                    left: '35%',
                    textAlign: 'center',
                    color: '#43517A',
                    cursor: 'wait'
                },
                                       baseZ: 9999999,
                                       overlayCSS:{
                    opacity: 0.6,
                    cursor: 'pointer'
                }
                                   });
        }, 
		
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name unblockKendoView
         * @description       
         * Unblock Kendo View
         * @param {string} element
         * element ID
         */		
        unblockKendoView = function(element) {
            kendo.ui.progress($("#" + element), false);
            //kendo.mobile.application.hideLoading();
        },
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name unblockElement
         * @description       
         * Unblock Element
         * @param {string} element
         * element ID
         */		
        unblockElement = function(element) {
            $("#" + element).unblock();
        },
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name unblockui
         * @description       
         * Unblock UI
         */	
        unblockui = function () {
            $.unblockUI({ });
        },

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name displayFadingMessage
         * @description       
         * display Fading Message
         * @param {string} message
         * element ID
         */	
        displayFadingMessage = function (message) {
            $.blockUI({
                          message: message,
                          fadeIn: 700,
                          fadeOut: 700,
                          timeout: 2000,
                          showOverlay: false,
                          centerY: false,
                          css: {
                    width: '350px',
                    top: '50%',
                    position: 'absolute',
                    right: '10px',
                    border: 'none',
                    padding: '5px',
                    backgroundColor: '#000',
                    '-webkit-border-radius': '10px',
                    '-moz-border-radius': '10px',
                    opacity: .6,
                    color: '#fff'
                }
                      });
        },
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name setIndicatorColor
         * @description       
         * set Indicator Color
         * @param {string} indicatorColor
         * color name
         */	
        setIndicatorColor=function(indicatorColor) {
            if (indicatorColor == "Yellow") {
                return "orange";
            } else if (indicatorColor == "Red") {
                return "#DC6060";
            } else if (indicatorColor == "Green") {
                return "green";
            } else if (indicatorColor == "None") {
                return "#fff";
            }
        },  
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name uiChanged
         * @description       
         * set IisUIChanged to "true"
		
         */			
        uiChanged= function () {
            isUIChanged = true;
        },
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name uiSaved
         * @description       
         * set IisUIChanged to "false"
		
         */	
        uiSaved= function () {
            isUIChanged = false;
        },

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name uiCanceled
         * @description       
         * set IisUIChanged to "false"
		
         */	
        uiCanceled= function () {
            isUIChanged = false;
        },
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name checkUIChange
         * @description       
         * displays the Confirm Box and call argument functions if they not null base of the user response.
         * @param {string} onOK
         * function name
         * @param {string} onCancel
         * function name
         */	
        checkUIChange= function (onOK, onCancel, msg) {
            if (isUIChanged) {
				var msgToShow = msg || CommonMessages.Alert.ConfirmOnNavigateAway; 
                openConfirmBox(CommonMessages.Alert.ConfirmMessage, msgToShow, function (data) {
                    if (data !== undefined && data.returnValue !== undefined) {
                        if (data.returnValue) {
                            uiCanceled();
                            if (onOK != null) {
                                onOK();
                            }
                        } else {
                            if (onCancel != null) {
                                onCancel();
                            }
                        }
                    }
                });
            } else {
                onOK();
            }
        },

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name handleException
         * @description       
         * handle Exception
         * @param {object} exceptionDetails
         * JSON object
         * @returns {object} serviceCallOptions
         *  JSON object
         */	
        handleException = function (exceptionDetails) {
            //        ==========Example==========
            //        var errExp = {};
            //        errExp.Exception = ex; //exception object generated in catch block.
            //        errExp.ModuleName = "Contacts"; //module in which exception happened. e.g. worklist, placements
            //        errExp.FunctionName = "savePreSaveContact"; //function in which exception was generated.
            //        errExp.DetailedErrorMessage = "Error occured while saving presave contact."; //custom error message.
            //        errExp.StackTrace = printStackTrace({ e: ex }); //stack trace
            //        CapellaMobile.Common.HandleException(errExp); // call this function from your catch block to handle and log exception message
            //        ==========Example==========
            var serviceCallOptions = {
                serviceEndPoint: ServiceConstants.LogError,
                dataType: 'JSON',
                method: 'POST',
                data: {
                    ModuleName: exceptionDetails.ModuleName,
                    FunctionName: exceptionDetails.FunctionName,
                    StackTrace: exceptionDetails.StackTrace,
                    ErrorName: (exceptionDetails.Exception === undefined) ? '' : exceptionDetails.Exception.name,
                    ErrorMesage: (exceptionDetails.Exception === undefined) ? '' : exceptionDetails.Exception.message,
                    LineNo: (exceptionDetails.Exception === undefined) ? '' : exceptionDetails.Exception.line,
                    Url: (exceptionDetails.Exception === undefined) ? '' : exceptionDetails.Exception.sourceURL,
                    DetailedErrorMessage: exceptionDetails.detailedErrorMessage,
                    CurrentPatintUID: $rootScope.Global.Objects.SelectedPatient != null ? $rootScope.Global.Objects.SelectedPatient.PatientUID : null,
                    LoggedInUserUID: $rootScope.Global.Objects.CurrentUser != null ? $rootScope.Global.Objects.CurrentUser.UID : null
                }
            }

            return serviceCallOptions;                
        },

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name createBasicAuthenticationHeader
         * @description       
         * create Basic Authentication Header
         * @param {string} authType
         * Plaint text
         * @param {string} credentials
         * Plaint text
         * @returns {string} header
         *  Header with encrypted credentials
         */	
        createBasicAuthenticationHeader = function (authType, credentials) {
            var header = authType + " " + $.base64.encode(credentials);
            return header;            
        },

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name appLogout
         * @description       
         * create Basic Authentication Header
         * @returns {boolean} isPreSaveContact
         *  "True" if it is found
         */
        isPreSaveRecordFound = function() {
            var isPreSaveContact = ($rootScope.Global.Contacts.PreSaveContactList && $rootScope.Global.Contacts.PreSaveContactList.length > 0) ? true : false;
            return isPreSaveContact;
        },

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name appLogout
         * @description       
         * displays pop up message and update changes before the application will be logout
         */
        appLogout = function() {
            checkUIChange(function () {
                var isFound = isPreSaveRecordFound();
                var warningMsg = isFound? CommonMessages.Alert.LogoutConfirmationWarning : CommonMessages.Alert.LogoutConfirmation;
								
                openConfirmBox(CommonMessages.Alert.ConfirmMessage, warningMsg, function (data) {
                    if (data !== undefined && data.returnValue !== undefined) {
                        if (data.returnValue) {
                            if (isFound) {
                                updatePreSaveContactList();
                            }
                            $rootScope.$broadcast('UserLoggingOut', { any: {} });							
                            appLogoutWithoutConfirmation('');
                        } else {
                            closePop = true;			
                        }
                    } 
                });
            });
            if (closePop) {
                closePopover(event);
            }
        },
		
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name closePopover
         * @description       
         * close Popover
         * @param {object} e
         * Event object
         */
        closePopover = function (e) {
            var popover = $(e.target).closest('[data-role=popover]').data('kendoMobilePopOver');
            popover.close();
            closePop = false;
        },
		
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name onHomeClick
         * @description       
         * Returns to Home screen
         */	
        onHomeClick = function () {
            checkUIChange(function () {
                var path = ($rootScope.Global.Objects.IsRCMPRL) ? RouteConstants.RCMDashboard : RouteConstants.MyPatients;
                $timeout(function () {
                    kendo.mobile.application.navigate(path);
                }, 0, false);
            }, null);
        }

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name appLogoutWithoutConfirmation
         * @description       
         * Logout application without confirmation from the user
         * @param {string} alertMessage
         * Message Text
         */	
        appLogoutWithoutConfirmation = function(alertMessage) {
            if (!$rootScope.Global.Objects.IsAppPaused) {
                blockui();
                $http({
                          url: Configuration.GetServiceUrl() + ServiceConstants.Logout,
                          method: 'GET',
                          dataType: 'JSON',
                          headers: {
                        'Authorization': "Session" + " " + $rootScope.Global.Objects.SessionDetails.Token,
                        'UserId': $rootScope.Global.Objects.LoggedInUser.UID
                    }
                      }).
                success(function (result, status, headers, config) {
                    if (result !== null) {
                        uiCanceled(); 
                        clearClientSession(alertMessage);
                    }
                }).
                error(function (result, status, headers, config) {
                    uiCanceled(); 
                    clearClientSession(alertMessage); 
                });
            }           
        },

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name clearClientSession
         * @description       
         * clear Client Session and display a message
         * @param {string} alertMessage
         * Message Text
         */
        clearClientSession = function(alertMessage) {
            clearGlobalObjects();                       
            cleanupResources();

            $timeout(function () {
                kendo.mobile.application.navigate(RouteConstants.Login);
            }, 0, false);                        

            if (alertMessage) {
                displayFadingMessage(alertMessage);
            } else {
                displayFadingMessage(CommonMessages.BusyMessages.LogoutMessage);    
            }
        },

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name clearGlobalObjects
         * @description       
         * clear Global Objects
         */
        clearGlobalObjects = function() {
            $rootScope.Global.Objects.SelectedPatient = {};
            $rootScope.Global.Objects.SessionDetails.Token = null;
            $rootScope.Global.Objects.SessionDetails.TokenExpirationEpoch = null;
            $rootScope.Global.Objects.SessionDetails.IsTimedOut = false;
            $rootScope.Global.Objects.SessionDetails.TimeoutInMinutes = null;
            $rootScope.Global.Objects.SessionDetails.LastUpdatedDateTime = null;

            $rootScope.Global.Objects.LoggedInUser.UID = null;
            $rootScope.Global.Objects.LoggedInUser.DisplayName = null;
            $rootScope.Global.Objects.LoggedInUser.CurrentRole = null;
            $rootScope.Global.Objects.LoggedInUser.StartTime = null;
            $rootScope.Global.Objects.LoggedInUser.FirstName = null;
            $rootScope.Global.Objects.LoggedInUser.LastName = null;

            $rootScope.Global.Objects.CurrentUser.UID = null;
            $rootScope.Global.Objects.CurrentUser.DisplayName = null;
            $rootScope.Global.Objects.CurrentUser.CurrentRole = null;
            $rootScope.Global.Objects.CurrentUser.StartTime = null;
            $rootScope.Global.Objects.CurrentUser.FirstName = null;
            $rootScope.Global.Objects.CurrentUser.LastName = null;

            window.clearTimeout($rootScope.Global.Objects.GlobalSessionTimeoutTimer);            

            $rootScope.Global.Objects.IsRCMPRL = false;
            $rootScope.Global.Objects.IsUserSwitched = false;

            window.clearInterval(preSaveTimer);

            $rootScope.Global.Contacts.PreSaveContact = null;
            $rootScope.Global.Contacts.PreSaveContactList = null;
            $rootScope.Global.Contacts.Tags = null;
            $rootScope.Global.Contacts.PresaveTimer = 0;
        },

        /**
        * @ngdoc method
        * @methodOf roundingModule.service:CommonFunctions
        * @name getSurveyType
        * @description       
        * get surveytype for the selected pathways or screening menu
        */
        getSurveyType = function () {
            var menus = $rootScope.Global.Objects.Menus;
            var surveyType;
            $.each(menus, function (key, menu) {
                if (menu.SubMenus != null) {
                    $.each(menu.SubMenus, function (key, submenu) {
                        if ($rootScope.Global.Objects.CRDSelectedMenu.UID === submenu.UID &&
                           submenu.ScreeningType !== CommonConstants.Nutrition) {
                            surveyType = submenu.ScreeningType;
                            return;
                        }
                        else if (submenu.Tabs) {
                            $.each(submenu.Tabs, function (key, tab) {
                                if ($rootScope.Global.Objects.CRDSelectedMenu.UID === tab.UID &&
                                    tab.ScreeningType !== CommonConstants.Nutrition) {
                                    surveyType = tab.ScreeningType;
                                    return;
                                }
                            });
                        }
                    });
                }
            });

            return surveyType;
        },

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name cleanupResources
         * @description       
         * clear all HTML/javascript resources
         */
        cleanupResources = function () {
            $(".km-view").each(function (index) {
                if (this.id !== "crd-login-view" && this.id !== "crd-index-view") {
                    var view = $(this).data("kendoMobileView");
                    if (view === null || view === undefined) {
                        view = $(this).data("kendoMobileModalView");
                    }
                    if (view) {
                        if (!$(view.element[0]).hasClass("do-not-destroy")) {
                            try {
                                view.destroy();
                                view.element.remove(); 
                            }
                            catch (ex) {
                                console.log(ex);
                            }                                
                        }
                    }
                }
            });

            view = $("#ptchart-splitview").data("kendoMobileSplitView");
            if (view) {
                try {
                    view.destroy();
                    view.element.remove(); 
                }
                catch (ex) {
                    console.log(ex);
                }
            }

            view = $("#ptchart-main-splitview").data("kendoMobileSplitView");
            if (view) {
                try {
                    // view.destroy();
                    view.element.remove(); 
                }
                catch (ex) {
                    console.log(ex);
                }
            }

            $(".km-view").each(function (index) {
                if (this.id !== "crd-login-view" && this.id !== "crd-index-view") {
                    view = $(this).data("kendoMobileSplitView");
                    if (view) {
                        try {
                            view.destroy();
                            view.element.remove(); 
                        }
                        catch (ex) {
                            console.log(ex);
                        }
                    }
                }
            });
        },

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name getContactMethod
         * @description       
         * getting a Contact Method
         * @param {string} contactMethod
         * Name of the Contact Method
         * @returns {string} string
         *  short URL for contact type image location
         */
        getContactMethod = function (contactMethod) {
            if (CommonConstants.ContactMethod.PHONE == contactMethod) {
                return "Images/Phone_Medium.png";
            } else if (CommonConstants.ContactMethod.BROWSING == contactMethod) {
                return "Images/Browse_Medium.png";
            } else if (CommonConstants.ContactMethod.IN_PERSON == contactMethod) {
                return "Images/Person_Medium.png";
            } else if (CommonConstants.ContactMethod.EMAIL == contactMethod) {
                return "Images/Email_Medium.png";
            } else if (CommonConstants.ContactMethod.FAX == contactMethod) {
                return "Images/Fax_Medium.png";
            } else if (CommonConstants.ContactMethod.MAIL == contactMethod) {
                return "Images/Postal_Medium.png";
            }
        },

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name getSIG
         * @description       
         * getting SIG abbreviation
         * @param {string} contactMethod
         * Name of the Contact Method
         * @returns {string} sig
         * SIG full text
         */
        getSIG = function (sig) {
            switch (sig) {
                case "HIGH":
                    sig = "H";
                    break;
                case "MEDIUM":
                    sig = "M";
                    break;
                case "LOW":
                    sig = "L";
                    break;
                default:
                    sig = "";
                    break;
            }
            return sig;
        }

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name sortArray
         * @description       
         * Sorting Array
         * @param {array} array with object elements
         * Array object
         * @param {String} key
         * Key
         * @param {boolean} isAscending
         * True if is the ascending sort needed
         * @returns {array} unnamed
         * Sorted Array
         */
        sortArray = function (array, key, isAscending) {
            return array.sort(function (a, b) {
                var x = a[key]; 
                var y = b[key];
                if (isAscending) {
                    return ((x < y) ? -1 : ((x > y) ? 1 : 0)); //*** sort ascending
                } else {
                    return ((y < x) ? -1 : ((y > x) ? 1 : 0)); //*** sort descending
                }
            });
        },

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name createPreSaveContact
         * @description       
         * Creating PreSave Contact
         */
        createPreSaveContact = function() {
            var patient = $rootScope.Global.Objects.SelectedPatient;
            var preSaveContact;
            
            if ($rootScope.Global.Objects.IsRCMPRL) {
                preSaveContact = {
                    UID: 0,
                    PatientUID: patient.UID,
                    PreSaveInfo: "",
                    PreSaveContactStatus: ContactConstants.PreSaveContactStatus.Active,
                    CreateDate: (new Date()).format(dateFunctions.dateFormat.masks.isoDateTime, false),
                    UserUID: $rootScope.Global.Objects.LoggedInUser.UID,
                    UserRole: $rootScope.Global.Objects.LoggedInUser.CurrentRole,
                    PtContacts: {
                        PtContacts: [{
                                        UID: 0,
                                        PatientUID: patient.UID,
                                        PatientParameter: "Rounding-RCMPRL",
                                        PatientName: patient.Name,
                                        PatientID: patient.ID,
                                        IsDefaultContact: false,
                                        ContactDate: (new Date()).format(dateFunctions.dateFormat.masks.isoDateTime, false),
                                        InternalTeam: ContactConstants.InternalTeam.RENAL_CASE_MANAGER,
                                        ExternalTeam: ContactConstants.ExternalTeam.PATIENT,
                                        ContactMethod: ContactConstants.Methods.IN_PERSON,
                                        ContactLocation: ContactConstants.Location.HOSPITAL,
                                        Resolution: ContactConstants.Resolution.COMPLETED,
                                        Direction: ContactConstants.Direction.NOT_APPLICABLE,
                                        EngagementBeginScale: ContactConstants.EngagementScore.NOT_ASSESSED,
                                        EngagementEndScale: ContactConstants.EngagementScore.NOT_ASSESSED,
                                        ContactReason: ContactConstants.Reason.OUTPATIENT_PLACEMENT,
                                        PreSaveUID: 0,
                                        ContactNotes: [{
                                                                ContactUID: 0,
                                                                ContactNoteUID: 0,
                                                                DataState: CommonConstants.DataState.Added,
                                                                NoteDate: (new Date()).format(dateFunctions.dateFormat.masks.isoDateTime, false),
                                                                NoteDetail: ContactConstants.DefaultNote.NoteDetail,
                                                                TagsString: "",
                                                                Tags: [ContactConstants.TagsValue.PatientInfo]
                                                            }
                                        ],
                                        CreatedBy: $rootScope.Global.Objects.LoggedInUser.UID,
                                        ContactTime: (new Date()).format(dateFunctions.dateFormat.masks.isoTime, false),
                                        UserMessages: null,
                                        DataState: CommonConstants.DataState.Added
                                    }
                            ]
                    },
                    DataState: CommonConstants.DataState.Added
                };
            } else {
                preSaveContact = {
                    UID: 0,
                    PatientUID: patient.UID,
                    PreSaveInfo: "",
                    PreSaveContactStatus: ContactConstants.PreSaveContactStatus.Active,
                    CreateDate: (new Date()).format(dateFunctions.dateFormat.masks.isoDateTime, false),
                    UserUID: $rootScope.Global.Objects.LoggedInUser.UID,
                    UserRole: $rootScope.Global.Objects.LoggedInUser.CurrentRole,
                    PtContacts: {
                        PtContacts: [{
                                        UID: 0,
                                        PatientUID: patient.UID,
                                        PatientParameter: "Rounding-VHN",
                                        PatientName: patient.Name,
                                        PatientID: patient.ID,
                                        IsDefaultContact: false,
                                        ContactDate: (new Date()).format(dateFunctions.dateFormat.masks.isoDateTime, false),
                                        InternalTeam: ContactConstants.InternalTeam.REGISTERED_NURSE,
                                        ExternalTeam: ContactConstants.ExternalTeam.PATIENT,
                                        ContactMethod: ContactConstants.Methods.IN_PERSON,
                                        ContactLocation: ContactConstants.Location.DIALYSIS_CENTER,
                                        Resolution: ContactConstants.Resolution.COMPLETED,
                                        Direction: ContactConstants.Direction.NOT_APPLICABLE,
                                        EngagementBeginScale: ContactConstants.EngagementScore.NOT_ASSESSED,
                                        EngagementEndScale: ContactConstants.EngagementScore.NOT_ASSESSED,
                                        ContactReason: ContactConstants.Reason.ROUTINE_CONTACT,
                                        PreSaveUID: 0,
                                        ContactNotes: [{
                                                                ContactUID: 0,
                                                                ContactNoteUID: 0,
                                                                DataState: CommonConstants.DataState.Added,
                                                                NoteDate: (new Date()).format(dateFunctions.dateFormat.masks.isoDateTime, false),
                                                                NoteDetail: ContactConstants.DefaultNote.NoteDetail,
                                                                TagsString: "",
                                                                Tags: [ContactConstants.TagsValue.PatientInfo]
                                                            }
                                        ],
                                        CreatedBy: $rootScope.Global.Objects.LoggedInUser.UID,
                                        ContactTime: (new Date()).format(dateFunctions.dateFormat.masks.isoTime, false),
                                        UserMessages: null,
                                        DataState: CommonConstants.DataState.Added
                                    }
                            ]
                    },
                    DataState: CommonConstants.DataState.Added
                };
            }

            //$rootScope.Global.Contacts.PreSaveContact = preSaveContact;
            $rootScope.Global.Contacts.PresaveTimer = 180 * 1000;
            $rootScope.Global.Contacts.Tags = preSaveContact.PtContacts.PtContacts[0].ContactNotes[0].Tags;
            if ($rootScope.Global.Contacts.PreSaveContactList === null) {
                $rootScope.Global.Contacts.PreSaveContactList = [];
            }

            callAddPreSaveContact(true, preSaveContact); 
            
            //this timer runs for 3 minutes and saves the PreSaveContact
            preSaveTimer = window.setInterval(function () {
                updatePreSaveContactList();
            }, $rootScope.Global.Contacts.PresaveTimer);          
        },
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name postPoneContact
         * @description       
         * Posting Pone Contact
         * @param {object} preSaveToBeSaved
         * JSON object
         */        
        postPoneContact = function (preSaveToBeSaved) {
            if (getPatientFromPresaveList(preSaveToBeSaved.PatientUID) != null) {
                preSaveToBeSaved.PreSaveContactStatus = ContactConstants.PreSaveContactStatus.Pending;
                preSaveToBeSaved.DataState = CommonConstants.DataState.Modified;
                preSaveToBeSaved.PtContacts.DataState = CommonConstants.DataState.Modified;
                if (preSaveToBeSaved.PtContacts && preSaveToBeSaved.PtContacts.PtContacts && preSaveToBeSaved.PtContacts.PtContacts.length > 0) {
                    for (var i = 0; i < preSaveToBeSaved.PtContacts.PtContacts.length; i++) {
                        preSaveToBeSaved.PtContacts.PtContacts[i].DataState = CommonConstants.DataState.Modified;
                        if (preSaveToBeSaved.PtContacts.PtContacts[i].ContactNotes && preSaveToBeSaved.PtContacts.PtContacts[i].ContactNotes.length > 0) {
                            preSaveToBeSaved.PtContacts.PtContacts[i].ContactNotes[0].DataState = CommonConstants.DataState.Modified;
                        }
                    }
                }
                callAddPreSaveContact(false, preSaveToBeSaved);
            }
        }

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name updatePreSaveContactList
         * @description       
         * updating the PreSaveContact List
         */   
        updatePreSaveContactList = function() {
            var preSaveToBeSaved;
            for (var i = 0; i < $rootScope.Global.Contacts.PreSaveContactList.length; i++) {
                preSaveToBeSaved = $rootScope.Global.Contacts.PreSaveContactList[i];
                //preSaveToBeSaved.PreSaveContactStatus = /*ContactConstants.PreSaveContactStatus.Active*/;
                preSaveToBeSaved.DataState = CommonConstants.DataState.Modified;
                preSaveToBeSaved.PtContacts.DataState = CommonConstants.DataState.Modified;
                if (preSaveToBeSaved.PtContacts && preSaveToBeSaved.PtContacts.PtContacts && preSaveToBeSaved.PtContacts.PtContacts.length > 0) {
                    preSaveToBeSaved.PtContacts.PtContacts[0].DataState = CommonConstants.DataState.Modified;
                    if (preSaveToBeSaved.PtContacts.PtContacts[0].ContactNotes && preSaveToBeSaved.PtContacts.PtContacts[0].ContactNotes.length > 0) {
                        preSaveToBeSaved.PtContacts.PtContacts[0].ContactNotes[0].DataState = CommonConstants.DataState.Modified;
                    }
                }
                callAddPreSaveContact(false, preSaveToBeSaved);
            }
        }, 
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name navigatetoSelectedPatient
         * @description       
         * Navigate to the Selected Patient
         * @param {object} dataItem
         * object
         * @param {boolean} convertToJSON
         * True - if it is needed convert to JSON object
         */        		
        navigatetoSelectedPatient = function (dataItem, convertToJSON) {
            var navigateToScreen = RouteConstants.PatientChart;
            if (convertToJSON) {
                dataItem = dataItem.toJSON();
                navigateToScreen = RouteConstants.ContactRecap;
            }
            if (dataItem.UID !== $rootScope.Global.Contacts.PreSaveContact.UID) {
                $rootScope.Global.Contacts.PreSaveContact = dataItem;
                $rootScope.Global.Objects.SelectedPatient.Name = dataItem.PtContacts.PtContacts[0].PatientName;
                $rootScope.Global.Objects.SelectedPatient.UID = dataItem.PtContacts.PtContacts[0].PatientUID;
                $rootScope.Global.Objects.SelectedPatient.ID = dataItem.PtContacts.PtContacts[0].PatientID;
                $rootScope.Global.Objects.SelectedPatient.Admission = null;
            }

            kendo.mobile.application.navigate(navigateToScreen);
            if (kendo.mobile.application.view().id === navigateToScreen) {					
                if (navigateToScreen === RouteConstants.PatientChart) {
                    $timeout(function () {
                        $rootScope.$broadcast('PtChartInit');
                    }, 0, false);
                } else if (navigateToScreen === RouteConstants.ContactRecap) {
                    $timeout(function () {
                        $rootScope.$broadcast('ContactRecapInit');
                    }, 0, false);		            
                }
            }
        },
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name deleteSelectedPatient
         * @description       
         * Deleting the Selected Patient
         * @param {object} patientTobeDeleted
         * object
         * @returns {integer} patientIndex
         * Patient index
         */        	      
        deleteSelectedPatient=function (patientTobeDeleted) {
            var patientIndex;

            try {
                patientIndex = $rootScope.Global.Contacts.PreSaveContactList.indexOf(patientTobeDeleted);
                if (patientIndex > -1) {
                    $rootScope.Global.Contacts.PreSaveContactList.splice(patientIndex, 1);
                }
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "CommonFunctions";
                errExp.FunctionName = "DeleteSelectedPatient";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(handleException(errExp));
            }

            return patientIndex;
        },
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name setPreSaveContactbyIndex
         * @description       
         * set the PreSave Contact by index
         * @param {integer} index
         * object
         * @returns {integer} patientIndex
         * Patient index
         */      
        setPreSaveContactbyIndex = function (index) {
            try {
                if ($rootScope.Global.Contacts.PreSaveContactList.length === index) {
                    index = index - 1;
                    $rootScope.Global.Contacts.PreSaveContact = $rootScope.Global.Contacts.PreSaveContactList[index];
                } else {
                    $rootScope.Global.Contacts.PreSaveContact = $rootScope.Global.Contacts.PreSaveContactList[index];
                }
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "CommonFunctions";
                errExp.FunctionName = "SetPreSaveContactbyIndex";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(handleException(errExp));
            }
            return index;
        },
        /**
        * @ngdoc method
        * @methodOf roundingModule.service:CommonFunctions
        * @name getIndexForPreSaveContact
        * @description       
        * gets the index of selected patient from PreSaveContactList
        * object
        * @returns {integer} patientIndex
        * Patient index
        */
        getIndexForPreSaveContact = function () {
            var patientIndex = -1;
            try {
                angular.forEach($rootScope.Global.Contacts.PreSaveContactList, function (presave, index) {
                    if (presave.PatientUID === getSelectedPatientUID()) {
                        patientIndex = index;
                        return patientIndex;
                    };
                });
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "CommonFunctions";
                errExp.FunctionName = "getIndexForPreSaveContact";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(handleException(errExp));
            }
            return patientIndex;
        },
        /**
       * @ngdoc method
       * @methodOf roundingModule.service:CommonFunctions
       * @name saveSeletectedPreSaveContact
       * @description       
       * Calls AddPresaveContact API to save the presave contact for selected patient
       */
        saveSeletectedPreSaveContact = function (preSaveToBeSaved) {
            try {
                if (preSaveToBeSaved && preSaveToBeSaved.UID > 0) {
                    preSaveToBeSaved.DataState = CommonConstants.DataState.Modified;
                    preSaveToBeSaved.PtContacts.DataState = CommonConstants.DataState.Modified;
                    if (preSaveToBeSaved.PtContacts && preSaveToBeSaved.PtContacts.PtContacts && preSaveToBeSaved.PtContacts.PtContacts.length > 0) {
                        preSaveToBeSaved.PtContacts.PtContacts[0].DataState = CommonConstants.DataState.Modified;
                        if (preSaveToBeSaved.PtContacts.PtContacts[0].ContactNotes && preSaveToBeSaved.PtContacts.PtContacts[0].ContactNotes.length > 0) {
                            preSaveToBeSaved.PtContacts.PtContacts[0].ContactNotes[0].DataState = CommonConstants.DataState.Modified;
                        }
                    }
                    callAddPreSaveContact(false, preSaveToBeSaved);
                }
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "CommonFunctions";
                errExp.FunctionName = "saveSeletectedPreSaveContact";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(handleException(errExp));
            }
        },
        
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name callAddPreSaveContact
         * @description       
         * call AddPreSaveContact
         * @param {boolean} isAddingNewPreSaveContact
         * boolean: true or false
         * @param {object} preSaveContact
         * preSaveContact object
		
         */     
        callAddPreSaveContact = function(isAddingNewPreSaveContact, preSaveContact) {
            if ($rootScope.Global.Objects.SessionDetails.IsTimedOut === false) {
                $http({
                          url: Configuration.GetServiceUrl() + ServiceConstants.AddPreSaveContact,
                          method: 'POST',
                          dataType: 'JSON',
                          data: $.param(preSaveContact),
                          headers: {
                        'Authorization': "Session" + " " + $rootScope.Global.Objects.SessionDetails.Token,
                        'UserId': $rootScope.Global.Objects.LoggedInUser.UID, 
                        'Content-Type': 'application/x-www-form-urlencoded' 
                    }
                      }).
                success(function (result, status, headers, config) {
                    if (result) {
                        if (result.Value) {
                            if (isAddingNewPreSaveContact) {
                                $rootScope.Global.Contacts.PreSaveContact = result.Value;                                
                                $rootScope.Global.Contacts.PreSaveContactList.push(result.Value);
                                kendo.mobile.application.navigate(RouteConstants.PatientChart);
                            }
                            
                            // postponepatient button click
                            if ($rootScope.Global.Contacts.IsContactPostPoned) {
                                $rootScope.Global.Contacts.IsContactPostPoned = false;
                                if (result.Value.PreSaveContactStatus === ContactConstants.PreSaveContactStatus.Pending) {
                                    var patientTobeDeleted = getPatientFromPresaveList($rootScope.Global.Objects.SelectedPatient.UID);
                                    if (patientTobeDeleted) {
                                        var patientIndex = deleteSelectedPatient(patientTobeDeleted);
                                                                                
                                        displayFadingMessage(CommonMessages.BusyMessages.PostPoneContact);

                                        if (isPreSaveRecordFound()) {
                                            patientIndex = setPreSaveContactbyIndex(patientIndex);

                                            $rootScope.Global.Objects.SelectedPatient.Name = $rootScope.Global.Contacts.PreSaveContactList[patientIndex].PtContacts.PtContacts[0].PatientName;
                                            $rootScope.Global.Objects.SelectedPatient.UID = $rootScope.Global.Contacts.PreSaveContactList[patientIndex].PtContacts.PtContacts[0].PatientUID;
                                            $rootScope.Global.Objects.SelectedPatient.ID = $rootScope.Global.Contacts.PreSaveContactList[patientIndex].PtContacts.PtContacts[0].PatientID;

                                            $timeout(function () {
                                                $rootScope.$broadcast('ContactRecapInit');
                                            }, 0, false);                              
                                        } else {
                                            if ($rootScope.Global.Objects.IsRCMPRL) {
                                                $timeout(function () {
                                                    kendo.mobile.application.navigate(RouteConstants.RCMDashboard);
                                                }, 0);
                                            } else {
                                                $timeout(function () {
                                                    kendo.mobile.application.navigate(RouteConstants.MyPatients);
                                                }, 0);
                                            }
                                        }
                                    }
                                }
                            }
                        } else if (result.Messages && result.Messages.length > 0) {
                            displayAlertMessage(result.Messages[0].Message);
                        }
                    }
                
                    unblockKendoView("main-pane");
                }).
                error(function (result, status, headers, config) {
                    if (status === 401) {
                        appLogoutWithoutConfirmation(headers().errormessage);                            
                    } else {
                        displayAlertMessage(result.Message); 
                    }
                    unblockKendoView("main-pane");
                });				
            }
        }, 
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name createScroller
         * @description       
         * Creates scroller
         * @param {string} scrollId
         * HTML object ID 
         */          

        createScroller = function(scrollId) {
            var scroller = $("#" + scrollId).data("kendoMobileScroller");
            if (!scroller) {
                $("#" + scrollId).kendoMobileScroller();
            } else {
                scroller.reset();
            }
        },
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name resetScroller
         * @description       
         * Remove scroller
         * @param {string} scrollId
         * HTML object ID 
         */     
        resetScroller = function(scrollId) {
            var scroller = $("#" + scrollId).data("kendoMobileScroller");
            if (scroller) {
                scroller.reset();
            }  
        },

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name shouldGetData
         * @description       
         * Check if the data is required
         * @param {string} property
         * Plaint text
         * @param {object} event
         * Event object
         * @returns {boolean} unnamed
         * True  if it is required
         */      		
        shouldGetData = function(property, event) {
            if (property != "" && property.length >= 3) {
                var c = String.fromCharCode(event.keyCode);
                var isWordChar = c.match(/\w/);
                var charAllowed = (event.keyCode === 8 || event.keyCode === 46);
                if (isWordChar || charAllowed) {
                    return true;
                }
            }
            return false;
        }
        
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name getPatientFromPresaveList
         * @description       
         * getting Patient from the PresaveList
         * @param {string} patientUID
         * Patient UID
         * @returns {object} $rootScope.Global.Contacts.PreSaveContactList
         * Patient Information from the PresaveList
         */   	
        getPatientFromPresaveList = function (patientUID) {
            if ((patientUID) && ($rootScope.Global.Contacts.PreSaveContactList)) {
                var length = $rootScope.Global.Contacts.PreSaveContactList.length;
                for (var i = 0; i < length; i++) {
                    if (($rootScope.Global.Contacts.PreSaveContactList[i].PatientUID) && $rootScope.Global.Contacts.PreSaveContactList[i].PatientUID === patientUID) {
                        return $rootScope.Global.Contacts.PreSaveContactList[i];
                    }
                }
            }
            return null;
        }	
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name objectPropertyExist
         * @description       
         * Check if the Property Value exist
         * @param {object} ObjectVal
         * object Value 
         * @param {string} PropertyVal
         * Property Value 
         * @returns {string} PropertyVal
         * Property Value or empty string
         */   		
        objectPropertyExist = function (ObjectVal, PropertyVal) {
            if (ObjectVal.hasOwnProperty(PropertyVal)) {
                return $(ObjectVal).attr(PropertyVal);
            } else {
                return "";
            }
        }

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name onTap
         * @description       
         * Procedure for OnTab event
         */  		
        onTap = function() {
            var sessionTimeOutInMilliSeconds = ($rootScope.Global.Objects.SessionDetails.TimeoutInMinutes - 1) * 60000;
                                  
            window.clearTimeout($rootScope.Global.Objects.GlobalSessionTimeoutTimer);
            $rootScope.Global.Objects.GlobalSessionTimeoutTimer = window.setTimeout(function () { //This function will be called when the timer triggers session timeout.
                //Log out                           
                $rootScope.$broadcast('UserLoggingOut', { any: {} });
                window.clearInterval(preSaveTimer);
                appLogoutWithoutConfirmation(CommonMessages.Alert.SessionTimedOutMessage);                
                $rootScope.Global.Objects.SessionDetails.IsTimedOut = true;
            }, sessionTimeOutInMilliSeconds);

            if ($rootScope.Global.Objects.SessionDetails.LastUpdatedDateTime != null) { //if this value is null, user is not logged in.
                var sessionUpdateGapMins = ((new Date()) - $rootScope.Global.Objects.SessionDetails.LastUpdatedDateTime) / (60000);

                if (sessionUpdateGapMins >= $rootScope.Global.Objects.SessionDetails.SessionAliveIntervalInMins
                    && $rootScope.Global.Objects.SessionDetails.IsTimedOut === false) {
                    //call the make alive method to increase the server timeout.
                    $http({
                              url: Configuration.GetServiceUrl() + ServiceConstants.SessionMakeAlive,
                              method: 'GET',
                              dataType: 'JSON',
                              headers: {
                            'Authorization': "Session" + " " + $rootScope.Global.Objects.SessionDetails.Token,
                            'UserId': $rootScope.Global.Objects.LoggedInUser.UID
                        }
                          }).
                    success(function (result, status, headers, config) {
                        if (result != null) {
                            $rootScope.Global.Objects.SessionDetails.LastUpdatedDateTime = new Date();                                        
                        }
                    });
                }
            }
        }

        /************************************************************* 
        Date Functions  on Sub function package dateFunctions
        *************************************************************/
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name dateFunctions.DatefromDatetime
         * @description       
         * Build string with 2 or 4 digits year.
         * @param {string} thisdate
         * Included string with date and time 
         * @param {boolean} isTwoDigitYearNeeded
         * indicated 2 (true) or 4(false) digit year is needed
         * @returns {string}
         *  String with date only or empty string
         */
        dateFunctions.DatefromDatetime = function (thisdate, isTwoDigitYearNeeded) {
            if (thisdate != null) {
                var tdate = new Date(thisdate);
                var curr_date = tdate.getDate();
                var curr_month = tdate.getMonth() + 1;
                var curr_year = tdate.getFullYear();
                if (isTwoDigitYearNeeded) {
                    curr_year = (curr_year.toString()).substr(2, 2);
                }
				
                return curr_month + "/" + curr_date + "/" + curr_year;
            } else {
                return '';
            }
        }
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name dateFunctions.TodayDateString
         * @description       
         * Build Today Date string with or without time
         * @param {string} dateMask
         * Date mask string 
         * @param {boolean} isTimeNeeded
         * indicates if time needed (true)
         * @returns {string}
         *  String with date or empty string
         */
        dateFunctions.TodayDateString = function (dateMask, isTimeNeeded) {
            var tdate = new Date();
            var curr_date = tdate.getDate();
            var curr_month = tdate.getMonth() + 1;
            var curr_year = tdate.getFullYear();
            var curr_time = "";
				
            if (curr_month < 10) {
                curr_month = "0" + curr_month;
            }
            if (curr_date < 10) {
                curr_date = "0" + curr_date;
            }
            if (dateMask === "mm/dd/yy") {
                curr_year = (curr_year.toString()).substr(2, 2);
            } else {
                return "";
            } // for future masks
				
            if (isTimeNeeded) {
                var dd = "AM";
                var curr_hours = tdate.getHours();
                var curr_min = tdate.getMinutes();
					
                if (curr_hours >= 12) {
                    curr_hours = curr_hours - 12;
                    dd = "PM";
                }
                if (curr_hours == 0) {
                    curr_hours = 12;
                }
                if (curr_hours < 10) {
                    curr_hours = "0" + curr_hours;
                }
                if (curr_min < 10) {
                    curr_min = "0" + curr_min;
                }
					
                curr_time = " " + curr_hours + ":" + curr_min + " " + dd;
            }
				
            return curr_month + "/" + curr_date + "/" + curr_year + curr_time;
        }
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name dateFunctions.sysDate
         * @description       
         * Build Date string base string includes number of milliseconds
         * @returns {string}
         *  String with date 
         */
        dateFunctions.sysDate = function() {
            var d = new Date();
            var month = d.getMonth() + 1;
            var day = d.getDate();

            return d.getFullYear() + '/' + (('' + month).length < 2 ? '0' : '') + month + '/' + (('' + day).length < 2 ? '0' : '') + day;
        }
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name parseDate
         * @description       
         * Build Date string 
         * @returns {string}
         *  String with date
         */
        dateFunctions.parseDate = function (value) {
            var s = value;
            if (s != undefined && s != null && s != "") {
                var a = s.split(/[^0-9]/);
                var d = new Date(a[0], a[1] - 1, a[2], a[3], a[4], a[5]);
                return d;
            }
            return s;
        }
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name getYearsFromDate
         * @description       
         * Gets the number of full years from the specified date to now
         * @returns {string}
         *  Int with number of years
         */
        dateFunctions.getYearsFromDate = function (date) {
            var today = new Date();
            var years = today.getFullYear() - date.getFullYear();
            var m = today.getMonth() - date.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
                years--;
            }
            return years;
        }
        /**
         * @ngdoc method
         * @methodOf roundingModule.service:CommonFunctions
         * @name dateFunctions.dateFormat
         * @description       
         * Build Date string 
         * @returns {string}
         *  String with formatted date
         */
        dateFunctions.dateFormat = function () {
            var token = /d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,
                timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,
                timezoneClip = /[^-+\dA-Z]/g,
                pad = function (val, len) {
                    val = String(val);
                    len = len || 2;
                    while (val.length < len)
                        val = "0" + val;
                    return val;
                };

            // Regexes and supporting functions are cached through closure
            return function (date, mask, utc) {
                var dF = dateFunctions.dateFormat;

                // You can't provide utc if you skip other args (use the "UTC:" mask prefix)
                if (arguments.length == 1 && Object.prototype.toString.call(date) == "[object String]" && !/\d/.test(date)) {
                    mask = date;
                    date = undefined;
                }

                // Passing date through Date applies dateFunctions.parseDate, if necessary
                date = date ? new Date(date) : new Date;
                if (isNaN(date))
                    throw SyntaxError("invalid date");

                mask = String(dF.masks[mask] || mask || dF.masks["default"]);

                // Allow setting the utc argument via the mask
                if (mask.slice(0, 4) == "UTC:") {
                    mask = mask.slice(4);
                    utc = true;
                }

                var _ = utc ? "getUTC" : "get",
                    d = date[_ + "Date"](),
                    D = date[_ + "Day"](),
                    m = date[_ + "Month"](),
                    y = date[_ + "FullYear"](),
                    H = date[_ + "Hours"](),
                    M = date[_ + "Minutes"](),
                    s = date[_ + "Seconds"](),
                    L = date[_ + "Milliseconds"](),
                    o = utc ? 0 : date.getTimezoneOffset(),
                    flags = {
                        d: d,
                        dd: pad(d),
                        ddd: dF.i18n.dayNames[D],
                        dddd: dF.i18n.dayNames[D + 7],
                        m: m + 1,
                        mm: pad(m + 1),
                        mmm: dF.i18n.monthNames[m],
                        mmmm: dF.i18n.monthNames[m + 12],
                        yy: String(y).slice(2),
                        yyyy: y,
                        h: H % 12 || 12,
                        hh: pad(H % 12 || 12),
                        H: H,
                        HH: pad(H),
                        M: M,
                        MM: pad(M),
                        s: s,
                        ss: pad(s),
                        l: pad(L, 3),
                        L: pad(L > 99 ? Math.round(L / 10) : L),
                        t: H < 12 ? "a" : "p",
                        tt: H < 12 ? "am" : "pm",
                        T: H < 12 ? "A" : "P",
                        TT: H < 12 ? "AM" : "PM",
                        Z: utc ? "UTC" : (String(date).match(timezone) || [""]).pop().replace(timezoneClip, ""),
                        o: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4),
                        S: ["th", "st", "nd", "rd"][d % 10 > 3 ? 0 : (d % 100 - d % 10 != 10) * d % 10]
                    };

                return mask.replace(token, function ($0) {
                    return $0 in flags ? flags[$0] : $0.slice(1, $0.length - 1);
                });
                /************************************************************* 
                END Date Functions
                *************************************************************/								
            };
        }();

        // Some common format strings
        dateFunctions.dateFormat.masks = {
            "default": "ddd mmm dd yyyy HH:MM:ss",
            ampm: "mm/dd/yyyy h:MM:ss TT",
            shortDate: "m/d/yy",
            mediumDate: "mmm d, yyyy",
            longDate: "mmmm d, yyyy",
            fullDate: "dddd, mmmm d, yyyy",
            shortTime: "h:MM TT",
            mediumTime: "h:MM:ss TT",
            longTime: "h:MM:ss TT Z",
            isoDate: "yyyy-mm-dd",
            isoTime: "HH:MM:ss",
            isoDateTime: "yyyy-mm-dd'T'HH:MM:ss",
            isoUtcDateTime: "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"
        };
        
        // Internationalization strings
        dateFunctions.dateFormat.i18n = {
            dayNames: [
                "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat",
                "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
            ],
            monthNames: [
                "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
                "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
            ]
        };

        // For convenience...
        Date.prototype.format = function (mask, utc) {
            return dateFunctions.dateFormat(this, mask, utc);
        };

        Date.prototype.toJSONLocal = (function () {
            function addZ(n) {
                return (n < 10 ? '0' : '') + n;
            }
            return function () {
                return this.format(dateFunctions.dateFormat.masks.isoDateTime, false);
            };
        }());

        return {           
            Find : find,
            IsRunningOnPhoneGap: isRunningOnPhoneGap,
            NonProdEnvAlert: nonProdEnvAlert,
            IsConnectedToNetwork: isConnectedToNetwork,
            IsNotNullOrEmpty: isNotNullOrEmpty,
            OpenAlertBox: openAlertBox,
            OpenConfirmBox: openConfirmBox,
            OpenCustomConfirmBox: openCustomConfirmBox,
            DisplayAlertMessage: displayAlertMessage,
            DisplayAlertMessages: displayAlertMessages,
            DisplayFadingMessage : displayFadingMessage,
            BlockElement: blockElement,
            UnblockElement: unblockElement,
            Blockui: blockui,
            Unblockui: unblockui,
            BlockKendoView:blockKendoView,
            UnblockKendoView:unblockKendoView,
            HandleException: handleException,
            CreateBasicAuthenticationHeader : createBasicAuthenticationHeader, 
            SetIndicatorColor: setIndicatorColor,
            UIChanged: uiChanged,
            UISaved: uiSaved,
            UICanceled: uiCanceled,
            CheckUIChange: checkUIChange,
            GetSelectedPatientUID: getSelectedPatientUID,
            UpdateSelectedPatient: updateSelectedPatient,
            DateFunctions: dateFunctions,
            AppLogout: appLogout,
            AppLogoutWithoutConfirmation: appLogoutWithoutConfirmation,
            ClearClientSession: clearClientSession,
            GetContactMethod: getContactMethod,
            SortArray: sortArray,
            FormatPhoneNumber : formatPhoneNumber,
            StripAlphaChars: stripAlphaChars,
            CreateScroller: createScroller,
            ResetScroller: resetScroller,
            ShouldGetData: shouldGetData,
            CreatePreSaveContact: createPreSaveContact,            
            CleanupResources: cleanupResources,
            ObjectPropertyExist: objectPropertyExist,
            OnTap: onTap,
            UpdatePreSaveContactList: updatePreSaveContactList,
            GetSIG : getSIG,
            IsPreSaveRecordFound: isPreSaveRecordFound,
            GetPatientFromPresaveList: getPatientFromPresaveList,
            PostPoneContact: postPoneContact,
            NavigatetoSelectedPatient: navigatetoSelectedPatient,
            OnHomeClick: onHomeClick,
            SetPreSaveContactbyIndex: setPreSaveContactbyIndex,
            GetIndexForPreSaveContact: getIndexForPreSaveContact,
            SaveSeletectedPreSaveContact: saveSeletectedPreSaveContact,
            DeleteSelectedPatient: deleteSelectedPatient,
            ClosePopover: closePopover,
            GetSurveyType: getSurveyType
        };
    });
}());