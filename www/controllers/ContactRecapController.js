/**
* @author Chinmay Dhavale 
* @version 1.0
* @fileOverview ContactRecapController Documentation
*/


(function () {
    /**
    * @ngdoc service
    * @name roundingModule.service:ContactRecapService
    * @description
    ** Used by ContactRecapController & Edit Snippets Controller.
    * @param {constant} ServiceConstants
    * Common Constants
    * @param {service} RoundingService
    * Service used to make API calls 
    * @param {object} $rootScope
    * AngularJS global scope object 
    * @param {function} $timeout
    * AngularJS timeout function
    */
    angular.module('roundingModule').factory('ContactRecapService', function (ServiceConstants, RoundingService, $rootScope, $timeout) {
        //Shared data between 2 controllers
        var textAreadata = "", textAreadataMember = "";
        var listwrongspell = [];

        /**
         * @ngdoc function
         * @name getTextArea
         * @methodOf roundingModule.service:ContactRecapService
         * @description
         ** This function is used to get text area
         * @returns {string}
         ** Returns a string containing the word under spell check
         */
        function getTextArea() {
            return textAreadata;
        }
        /**
         * @ngdoc function
         * @name getTextAreaMember
         * @methodOf roundingModule.service:ContactRecapService
         * @description
         ** This function is used to get text area
         * @returns {string}
         ** Returns a string containing the word under spell check
         */
        function getTextAreaMember() {
            return textAreadataMember;
        }
        /**
        * @ngdoc function
        * @name setTextArea
        * @methodOf roundingModule.service:ContactRecapService
        * @description
        ** Used to set Text Area
        * @param {string} data
        * word set for spell check
        * @param {array} arr
        * Array containing the word under spell check
        */
        function setTextArea(data, arr) {
            textAreadata = data;
            listwrongspell = arr;
        }


        function setTextAreaOny(data) {
            textAreadata = data;            
        }

        ///** Code has been commentted for future reference
        //* @ngdoc method
        //* @name getWrongSpell
        //* @methodOf roundingModule.service:ContactRecapService
        //* @description 
        //** Gets incorrect spelling for spell check
        //* @retunrs {array} listwrongSpell
        //** Returns array containing wrong spell
        //*/
        //function getWrongSpell() {
        //    return listwrongspell;
        //}

        ///**
        //* @ngdoc method
        //* @name setWrongSpell
        //* @methodOf roundingModule.service:ContactRecapService
        //* @description
        //** Used to return corrected spelling
        //* @param {array} val
        //* sets wrong spelling
        //*/
        //function setWrongSpell(val) {
        //    listwrongspell = val;
        //}
        
        /**
        * @ngdoc method
        * @name getSnippets
        * @methodOf roundingModule.service:ContactRecapService
        * @description 
        **  Service Call
        **  API:  GetSnippets 
        **  Called upon selection of a patient from Open Patients list and upon finalize 
        * @param {object} data
        * Snippet details to be retrieved 
        * @param {string} method
        * Method: GET/POST 
        * @param {object} dataType
        * data type of the returned value 
        * @param {object} callBack
        * $scope.onGetPtSnippetsRetrieved 
        */
        function getSnippets(data, method, dataType, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetSnippets, method, dataType, data, callBack);
        }

        /**
        * @ngdoc method
        * @name saveSnippets
        * @methodOf roundingModule.service:ContactRecapService
        * @description 
        **  Service Call 
        **  API: User/SaveSnippets  
        **  Functions gets called upon any change in snippets. Exmaple add, edit ,delete etc
        * @param {object} data
        * Snippet details to be retrieved 
        * @param {string} method
        * Method: GET/POST 
        * @param {object} dataType
        * data type of the returned value 
        * @param {object} callBack
        * onCreateSnippetSaveClicked 
        */
        function saveSnippets(data, method, dataType, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.SaveSnippets, method, dataType, data, callBack);
        }
        
        /**
        * @ngdoc function
        * @name reloadSnippets
        * @methodOf roundingModule.service:ContactRecapService
        * @description
        ** Broadcast event Reloads snippet globally to share the code across multiple controllers
        */
        function reloadSnippets() {
            $timeout(function () {
                $rootScope.$broadcast('ReloadSnippets');
            }, 0, false);
        }

        /**
        * @ngdoc method
        * @name getActionItems
        * @methodOf roundingModule.service:ContactRecapService
        * @description 
        **  Service Call 
        **  API called : User/GetActionItems
        **  Called upon selection of a new patient or existing patient from Open Patients list 
        * @param {object} data
        * actionItem filter
        * @param {string} method
        * Method: GET/POST 
        * @param {object} dataType
        * data type of the returned value
        * @param {object} callBack
        * onGetActionItemsRetrieved
        */
        function getActionItems(data, method, dataType, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetActionItems, method, dataType, data, callBack);
        }

        /**
         * @ngdoc method
         * @name saveTaskDelegation
         * @methodOf roundingModule.service:ContactRecapService
         * @description 
         **  Service Call 
         **  API called : User/SaveTaskDelegation
         **  Role : VHN 
         **  Called upon click of Delegate Task on My Tasks screen list 
         * @param {object} data
         * actionItem filter 
         * @param {string} method
         * Method: GET/POST  
         * @param {object} dataType
         * data type of the returned value
         * @param {object} callBack
         * onSaveTaskDelegationRetrieved 
         */
        function saveTaskDelegation(data, method, dataType, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.SaveTaskDelegation, method, dataType, data, callBack);
        }

        return {
            GetSnippets: getSnippets,
            SaveSnippets: saveSnippets,
            ReloadSnippets: reloadSnippets,
            GetActionItems: getActionItems,
            SaveTaskDelegation: saveTaskDelegation,
            GetTextArea: getTextArea,
            GetTextAreaMember: getTextAreaMember,
            SetTextArea: setTextArea,            
            SetTextAreaOny: setTextAreaOny
            //GetWrongSpell: getWrongSpell,
            //SetWrongSpell: setWrongSpell,
        };
    });
}());

(function () {
    angular.module('roundingModule')
    /**
    * @ngdoc controller
    * @name roundingModule.controller:ContactRecapController
    * @description
    ** Controller for Contact Recap Screen.
    * @property {boolean} $scope.ConsiderAlertFooter To set up alerts at footer
    * @property {kendo.data.DataSource} $scope.Snippets Data source for Snippets
    * @property {kendo.data.DataSource} $scope.ModifiedSnippets Data source for modifying Snippets
    * @property {kendo.data.DataSource} $scope.DeletedSnippets Data source for deleted snippets
    * @property {object} $scope.MyTasks model for My Tasks
    * @property {object} $scope.DelegatedTasks model for Delegated Tasks
    * @property {boolean} $scope.isTasksVisible Boolean value to make Tasks visible
    * @property {boolean} $scope.showPathwayScreening Show Pathway Screening
    * @property {boolean} $rootScope.Global.Contacts.IsContactPostPoned Global Property to determine whether contact should be postponed
    * @property {boolean} $scope.IsSnippetEditMode Determine where snippet is in edit mode
    * @property {boolean} $scope.IsSnippetAddMode Determine where snippet is in add mode
    */
        .controller('ContactRecapController', function ($scope, $rootScope, $timeout, $interval, RoundingService, ContactRecapService, ExceptionService, RouteConstants, CommonFunctions, LookUp, LookupTypes, ContactConstants, CommonConstants, CommonMessages, Status, ServiceConstants, DataStorage) {
            $scope.$$listeners['ResetNote'] = [];
            $scope.$$listeners['ContactRecapInit'] = [];
            $scope.$$listeners['ReloadSnippets'] = [];
            
            var lookupRequest = {
                "parentLookupType": LookupTypes.TagGroup,
                "childLookupType": LookupTypes.Tags,
                "isNoCache": false
            },
            textAreaDragFunction = function (text,txtarea) {
                var scrollPos = txtarea.scrollTop;
                var strPos = 0;
                var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? "ff" : (document.selection ? "ie" : false));
                if (br === "ie") {
                    txtarea.focus();
                    var range = document.selection.createRange();
                    range.moveStart('character', -txtarea.value.length);
                    strPos = range.text.length;
                } else if (br === "ff")
                    strPos = txtarea.selectionStart;

                var front = (txtarea.value).substring(0, strPos);
                var back = (txtarea.value).substring(strPos, txtarea.value.length);
                txtarea.value = front + text + back;
                strPos = strPos + text.length;
                if (br === "ie") {
                    txtarea.focus();
                    var ierange = document.selection.createRange();
                    ierange.moveStart('character', -txtarea.value.length);
                    ierange.moveStart('character', strPos);
                    ierange.moveEnd('character', 0);
                    ierange.select();
                } else if (br === "ff") {
                    txtarea.selectionStart = strPos;
                    txtarea.selectionEnd = strPos;
                    txtarea.focus();
                }
                txtarea.scrollTop = scrollPos;
               
            },
            deleteContactCheckboxStatusByType = function (type) {
                var IsDeleteChecked = false;
                if ( type == 0) {
                    IsDeleteChecked = $scope.PreSaveContact.IsDeleteChecked;
                }
                if(type == 1){
                    IsDeleteChecked = $scope.PreSaveContact.IsDeleteCheckedMember;
                }
                return IsDeleteChecked;
            };


            //For showing or hiding Alerts
            $scope.ConsiderAlertFooter = true;
            $scope.IsRoutineCarePlanActiveStatus = true;
            $scope.tabBaseCarePlanKey = 0;
            //LookUp.GetParentChildLookUp(lookupRequest, bindTags);
            LookUp.GetLookUp(LookupTypes.ContactMethod);
            LookUp.GetLookUp(LookupTypes.ContactLocation)
            LookUp.GetLookUp(LookupTypes.Direction);
            LookUp.GetLookUp(LookupTypes.ContactReason);
            LookUp.GetLookUp(LookupTypes.InternalTeam);
            LookUp.GetLookUp(LookupTypes.ExternalTeam);
            LookUp.GetLookUp(LookupTypes.Resolution);
            LookUp.GetLookUp(LookupTypes.EngagementScale);        
            LookUp.GetLookUp(LookupTypes.Tags);
            //
            $scope.contactrecapContactnoteRows = ContactConstants.ContactrecapContactnoteTextArea.MinHeight;
            $scope.contactrecapContactnoteMemberRows = ContactConstants.ContactrecapContactnoteMemberTextArea.MinHeight;

            /**
            * @ngdoc event
            * @name ContactRecapInit
            * @eventOf roundingModule.controller:ContactRecapController
            * @description
            ** Suscribe event ContactRecapInit for use in Contact recap controller. </b>
            ** Initialization of contact recap screen
            */
            $scope.$on('ContactRecapInit', function () {
                $timeout(function () {
                    $scope.show();
                }, 0, false);
            });

            /**
            * @ngdoc event
            * @name homeButtonClick
            * @eventOf roundingModule.controller:ContactRecapController
            * @description 
            ** Makes use of OnHomeClick Common function.
            ** ng-click event to to navigate to Dashboard for RCM and Patient Chart for VHN
            */
            $scope.homeButtonClick = function () {
                CommonFunctions.OnHomeClick();
            }
            
            var actionItemFilter = null;
           
            $scope.Snippets = new kendo.data.DataSource({ data: [] });
            $scope.ModifiedSnippets = new kendo.data.DataSource({ data: [] });
            $scope.DeletedSnippets = new kendo.data.DataSource({ data: [] });
            $scope.MyTasks = [];
            $scope.DelegatedTasks = [];

            $scope.isTasksVisible = !$rootScope.Global.Objects.IsRCMPRL;
            $scope.showPathwayScreening = $rootScope.showPathwayScreening;

            /**
            * @ngdoc event
            * @name ptChartButtonClick
            * @eventOf roundingModule.controller:ContactRecapController
            * @description 
            ** ng-click event to navigate to Patient Chart for RCM & VHN
            */
            $scope.ptChartButtonClick = function () {
                kendo.mobile.application.navigate(RouteConstants.PatientChart);
            }
			
            $timeout(function () {
                if ($rootScope.Global.CheckIsPatientOpened && CommonFunctions.IsPreSaveRecordFound()) {
                    CommonFunctions.DisplayAlertMessage(CommonMessages.Alert.LoginUnsavedPatientContactsText);
                    $rootScope.Global.CheckIsPatientOpened = false;
                }	
            }, 0);
			
           

            /**
            * @ngdoc event
            * @name postPoneContact
            * @eventOf roundingModule.controller:ContactRecapController
            * @description
            ** Functionality used to postpone a contact on contact recap screen
            ** Makes us of PostponeContact common functions
            */
            $scope.postPoneContact = function () {
                $rootScope.Global.Contacts.IsContactPostPoned = true;
                CommonFunctions.BlockKendoView("main-pane");
                CommonFunctions.PostPoneContact($rootScope.Global.Contacts.PreSaveContact);
            }

            /**
            * @ngdoc function
            * @name removeBr
            * @methodOf roundingModule.controller:ContactRecapController
            * @description 
            ** Replace <br/> tag
            * @param {string} String
            * String to be replaced
            */
            $scope.removeBr = function (String) {
                return String.replace(/(\r\n|\r|\n)/g, "<br />");
            }
            
            /**
            * @ngdoc event
            * @name ResetNote
            * @eventOf roundingModule.controller:ContactRecapController
            * @description
            ** Broadcasted on click of OK button on Spell Check screen
            ** Subscribed once spell check is completed
            * @param {object} event
            *  Suscribed event 
            * @param {string} arg
            *  argument 
            */
            $scope.$on('ResetNote', function (event, arg) {                                                       
                //var textarea= removeBr((ContactRecapService.GetTextArea().replace(/</g, String.fromCharCode(0)), function (word) {return word;}).replace(/\x00/g, "&lt;"));                
                var textarea = ContactRecapService.GetTextArea().replace(/<br\s*\/?>/g, '\n');
                var memberTextarea = ContactRecapService.GetTextAreaMember().replace(/<br\s*\/?>/g, '\n');
                $timeout(function () {
                     if ($scope.IsRoutineCarePlanActiveStatus) { 
                         $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].NoteDetail = textarea;
                     } else {
                         $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].NoteDetail = memberTextarea;
                     }
                }, 1000, false);
                
                $("#contactrecap-contactnote").focus();
                $("#contactrecap-contactnote").val(textarea);
                $scope.setContactrecapContactnote();
                $("#contactrecap-contactnote-member").val(memberTextarea);
                $scope.setContactrecapContactnoteMember();
            });
                
            /**
            * @ngdoc event
            * @name changeContact
            * @eventOf roundingModule.controller:ContactRecapController
            * @description 
            ** Kendo on click event to open change contact pop up on contact recap screen
            */
            //Change Contact functions
            $scope.changeContact = function () {
                $scope.changeContactValidator = $("#changecontact-modalview").kendoValidator({
                    rules: {
                        fieldrequired: function (input) {
                            if ($.trim(input.val()) === "" &&
                                ($scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactMethod === ContactConstants.Methods.PHONE ||
                                    $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactMethod === ContactConstants.Methods.EMAIL ||
                                    $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactMethod === ContactConstants.Methods.FAX ||
                                    $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactMethod === ContactConstants.Methods.MAIL)) {
                                return false;
                            } else {
                                return true;
                            }
                        }
                    }
                }).data("kendoValidator");

                $scope.contactMethodSelected($rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactMethod, true);
              
                $("#changecontact-modalview").data("kendoMobileModalView").open();
            }   

            /**
            * @ngdoc event
            * @name changeContactOK
            * @eventOf roundingModule.controller:ContactRecapController
            * @description
            ** Kendo on- click event to save changes for change contact functionality
            */
            $scope.changeContactOK = function () {
                if ($scope.changeContactValidator.validate()) {

                    //$rootScope.Global.Contacts.PreSaveContact = jQuery.extend(true, {}, $scope.PreSaveContact);

                    // Saving values individually since jQuery.extend is not working
                    $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactMethod = $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactMethod;
                    $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactLocation = $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactLocation
                    $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].InternalTeam = $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].InternalTeam;
                    $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ExternalTeam = $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ExternalTeam;
                    $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].Resolution = $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].Resolution; 
                    $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].Direction = $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].Direction;
                    $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].EngagementBeginScale = $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].EngagementBeginScale;
                    $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].EngagementEndScale = $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].EngagementEndScale;
                    $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactReason = $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactReason;

                    //Updating ContactDate Hours and Time from ContactTime as Service is only Considerting Contact Date while saving
                    //into Database. 
                    $scope.PreSaveContact.ContactDate.setHours($scope.PreSaveContact.ContactTime.getHours());
                    $scope.PreSaveContact.ContactDate.setMinutes($scope.PreSaveContact.ContactTime.getMinutes());

                    $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactDate = new Date($scope.PreSaveContact.ContactDate).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false);

                    $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactTime = new Date($scope.PreSaveContact.ContactTime).format(CommonFunctions.DateFunctions.dateFormat.masks.shortTime, false);

                    // Using GetPatientFromPreSaveContactList from CommonFunctions
                    var saveContactDetailsOnChangeContactOk = CommonFunctions.GetPatientFromPresaveList($rootScope.Global.Contacts.PreSaveContact.PatientUID);
                  
                    if (saveContactDetailsOnChangeContactOk) {
                        saveContactDetailsOnChangeContactOk.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactDate = $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactDate;
                        saveContactDetailsOnChangeContactOk.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactMethod = $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactMethod;
                        saveContactDetailsOnChangeContactOk.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactLocation = $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactLocation;
                        saveContactDetailsOnChangeContactOk.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].InternalTeam = $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].InternalTeam;
                        saveContactDetailsOnChangeContactOk.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ExternalTeam = $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ExternalTeam;
                        saveContactDetailsOnChangeContactOk.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].Resolution = $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].Resolution;
                        saveContactDetailsOnChangeContactOk.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].Direction = $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].Direction;
                        saveContactDetailsOnChangeContactOk.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].EngagementBeginScale = $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].EngagementBeginScale;
                        saveContactDetailsOnChangeContactOk.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].EngagementEndScale = $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].EngagementEndScale;
                        saveContactDetailsOnChangeContactOk.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactReason = $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactReason;
                        saveContactDetailsOnChangeContactOk.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactTime = $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactTime;
                    }
                     

                    $("#changecontact-modalview").data("kendoMobileModalView").close();                    
                }
            }

            /**
            * @ngdoc event
            * @name changeContactCancel
            * @eventOf roundingModule.controller:ContactRecapController
            * @description
            ** Kendo on- click event to revert changes made on change contact screen
            */
            $scope.changeContactCancel = function () {                                                             
                $scope.PreSaveContact = jQuery.extend(true, {}, $rootScope.Global.Contacts.PreSaveContact); 
                $scope.PreSaveContact.NoteDate = CommonFunctions.DateFunctions.parseDate($rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].NoteDate).format("mmmm dd, yyyy hh:MMTT", false);
                $scope.PreSaveContact.ContactDate = new Date(CommonFunctions.DateFunctions.parseDate($rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactDate).format(CommonFunctions.DateFunctions.dateFormat.masks.isoUtcDateTime, false));
                $scope.PreSaveContact.ContactTime = new Date($scope.PreSaveContact.ContactDate).format(CommonFunctions.DateFunctions.dateFormat.masks.shortTime, false);
                $scope.PreSaveContact.TagsList = $scope.createTagsArray($rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].Tags);

                $scope.changeContactValidator.hideMessages();
                $("#changecontact-modalview").data("kendoMobileModalView").close();
            }


           

            /**
            * @ngdoc event
            * @name finalizeContact
            * @eventOf roundingModule.controller:ContactRecapController
            * @description 
            ** Kendo on-click event to finalize patient on contact recap screen
            */
            $scope.finalizeContact = function () {
                CommonFunctions.OpenConfirmBox(CommonMessages.Alert.ConfirmClosePatient, CommonMessages.Alert.FinalizeContact, function (data) {

                    if (data !== undefined && data.returnValue !== undefined) {
                        if (data.returnValue) {                            
                            $rootScope.Global.Contacts.PresaveTimer = 0;
                            var preSaveContact = $rootScope.Global.Contacts.PreSaveContact;

                            var oldPatientName = $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].PatientName;

                            var ptContact = null;
                            
                            var deleteStatus = deleteContactCheckboxStatusByType(0) || deleteContactCheckboxStatusByType(1);
                            preSaveContact.PtContacts.DataState = deleteStatus ? CommonConstants.DataState.Deleted : CommonConstants.DataState.Added;
                            
                            var finalizeMessage = CommonMessages.BusyMessages.SaveContactFor + oldPatientName;

                            $timeout(function () {
                                CommonFunctions.BlockKendoView("contactrecap-view", finalizeMessage);
                            },0,false);

                            for (var j = 0; j < preSaveContact.PtContacts.PtContacts.length; j++) {
                                ptContact = preSaveContact.PtContacts.PtContacts[j];
                                ptContact.PreSaveUID = preSaveContact.UID;
                                ptContact.DataState = deleteContactCheckboxStatusByType(j) ? CommonConstants.DataState.Deleted : CommonConstants.DataState.Added;
                            }

                            RoundingService.ServiceCallWithParams(ServiceConstants.AddPtContacts, 'POST', 'JSON', $.param(preSaveContact.PtContacts), function (resdata) {
                                if (resdata.resultstatus === Status.ServiceCallStatus.Success) {
                                    try {                                        
                                      
                                        var patientDeleteOnFinalize = CommonFunctions.GetPatientFromPresaveList($rootScope.Global.Objects.SelectedPatient.UID);
                                        if (patientDeleteOnFinalize) {
                                            var patientIndex = deleteSelectedPatient(patientDeleteOnFinalize);
                                        }
                                            

                                        /*D-04037 : CHANGE CONTACT and EDIT TOPICS buttons are unresponsive after finalizing a patient record under 'Contact Recap' screen.
                                         reset scope which was previously bind with html controls */

                                        // $("#changecontact-modalview").remove();

                                       //$("#edittopics-modalview").remove();
                                        if ($scope.IsRoutineCarePlanActiveStatus) {
                                            angular.forEach($scope.TagsLookup.ParentLookUp, function (parent) {
                                                angular.forEach(parent.Children, function (child) {
                                                    child.IsSelected = false;
                                                });
                                            });
                                        } else {
                                            angular.forEach($scope.MemberTagsLookup.ParentLookUp, function (parent) {
                                                angular.forEach(parent.Children, function (child) {
                                                    child.IsSelected = false;
                                                });
                                            });
                                        }
                                        
                                      

                                        if (isPreSaveRecordFound()) {

                                            patientIndex = setPreSaveContactbyIndex(patientIndex);

                                            newPatientName = $rootScope.Global.Contacts.PreSaveContact && $rootScope.Global.Contacts.PreSaveContact.PtContacts && $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts && $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts.length > 0 ? $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[0].PatientName : "";
                                            
                                            var patientRecordMessage = CommonMessages.BusyMessages.OpenPatientRecord + newPatientName;
                                            

                                            $timeout(function () {
                                                CommonFunctions.UnblockKendoView("contactrecap-view");
                                                CommonFunctions.BlockKendoView("contactrecap-view", patientRecordMessage);
                                            }, 0, false);

                                            $rootScope.Global.Objects.SelectedPatient.Name = $rootScope.Global.Contacts.PreSaveContactList[patientIndex].PtContacts.PtContacts[$scope.tabBaseCarePlanKey].PatientName;
                                            $rootScope.Global.Objects.SelectedPatient.UID = $rootScope.Global.Contacts.PreSaveContactList[patientIndex].PtContacts.PtContacts[$scope.tabBaseCarePlanKey].PatientUID;
                                            $rootScope.Global.Objects.SelectedPatient.ID = $rootScope.Global.Contacts.PreSaveContactList[patientIndex].PtContacts.PtContacts[0].PatientID;

                                            $timeout(function () {
                                                $rootScope.$broadcast('ContactRecapInit');
                                            }, 0, false); 
                                            
                                        }
                                        else {
                                            if ($rootScope.Global.Objects.IsRCMPRL) {
                                                $timeout(function () {
                                                    kendo.mobile.application.navigate(RouteConstants.RCMDashboard);
                                                }, 0);
                                            }
                                            else {
                                                $timeout(function () {
                                                    kendo.mobile.application.navigate(RouteConstants.MyPatients);
                                                }, 0);
                                            }
                                        }
                                        
                                    }
                                    catch (ex) {
                                        var errExp = {};
                                        errExp.Exception = ex;
                                        errExp.ModuleName = "ContactRecap";
                                        errExp.FunctionName = "finalizeContact";
                                        errExp.StackTrace = printStackTrace({ e: ex });
                                        ExceptionService.HandleException(errExp);
                                    }
                                }
                            }, true);
                        }
                    }
                });
                
            }

            /**
            * @ngdoc event
            * @name editTopicsCancel
            * @eventOf roundingModule.controller:ContactRecapController
            * @description
            ** Kendo on-click event to revert changes made to edit topics screen
            */
            //Edit Topics Functions
            $scope.editTopicsCancel = function () {
                               
                if ($scope.IsRoutineCarePlanActiveStatus) {
                    angular.forEach($scope.TagsLookup.ParentLookUp, function (parent) {
                        angular.forEach(parent.Children, function (child) {
                            child.IsSelected = false;
                        });
                    });
                } else {
                    angular.forEach($scope.MemberTagsLookup.ParentLookUp, function (parent) {
                        angular.forEach(parent.Children, function (child) {
                            child.IsSelected = false;
                        });
                    });
                }
               

                $scope.PreSaveContact.TagsList = $scope.createTagsArray($rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].Tags);                
                $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].Tags = JSON.parse(JSON.stringify($rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].Tags));
                
                if ($scope.IsRoutineCarePlanActiveStatus) {
                    $("#edittopics-modalview").data("kendoMobileModalView").close();
                } else {
                    $("#member-edittopics-modalview").data("kendoMobileModalView").close();
                }
            }

            /**
             * @ngdoc event
             * @name editTopicsOK
             * @eventOf roundingModule.controller:ContactRecapController
             * @description
             ** Kendo on-click event to save changes made to the edit topics screen
             */
            $scope.editTopicsOK = function () {
                var TagsList = [];
                var Tags = [];
                
                if ($scope.IsRoutineCarePlanActiveStatus) {
                    angular.forEach($scope.TagsLookup.ParentLookUp, function (parent) {
                        angular.forEach(parent.Children, function (child) {
                            if (child.IsSelected) {
                                TagsList.push(child);
                                Tags.push(child.Value);
                            }
                        });
                    });
                } else {
                    angular.forEach($scope.MemberTagsLookup.ParentLookUp, function (parent) {
                        angular.forEach(parent.Children, function (child) {
                            if (child.IsSelected) {
                                TagsList.push(child);
                                Tags.push(child.Value);
                            }
                        });
                    });
                }
                

                if (TagsList.length > 0) {
                    $scope.PreSaveContact.TagsList = JSON.parse(JSON.stringify(TagsList));
                    $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].Tags = JSON.parse(JSON.stringify(Tags));

                    $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].Tags = $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].Tags;
                    
                    //Using GetPatientFromPreSaveList from CommonFunctions
                    var saveTagsOnEditTopics = CommonFunctions.GetPatientFromPresaveList($rootScope.Global.Contacts.PreSaveContact.PatientUID);
                    if (saveTagsOnEditTopics) {
                        saveTagsOnEditTopics.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].Tags = $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].Tags;
                    }
                    if ($scope.IsRoutineCarePlanActiveStatus) {
                        $("#edittopics-modalview").data("kendoMobileModalView").close();
                    } else {
                        $("#member-edittopics-modalview").data("kendoMobileModalView").close();
                    }

                } else {
                    CommonFunctions.DisplayAlertMessage(CommonMessages.Alert.AtleastOneTagRequired);
                }
            }

            /**
            * @ngdoc event
            * @name editTopics
            * @eventOf roundingModule.controller:ContactRecapController
            * @description
            ** Kendo on-click event to open Edit topics screen on contact recap
            */
            $scope.editTopics = function () {
                var tagSelected = false;
               
                 var TagsData = $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].Tags;
            
                angular.forEach(TagsData, function (selTags) {
                    tagSelected = false;
                    if ($scope.IsRoutineCarePlanActiveStatus) {
                        angular.forEach($scope.TagsLookup.ParentLookUp, function (parent) {
                            if (!tagSelected) {
                                angular.forEach(parent.Children, function (child) {
                                    if (selTags === child.Value && !tagSelected) {
                                        child.IsSelected = true;
                                        tagSelected = true;
                                    }
                                });
                            }
                        });
                    } else {
                        angular.forEach($scope.MemberTagsLookup.ParentLookUp, function (parent) {
                            if (!tagSelected) {
                                angular.forEach(parent.Children, function (child) {
                                    if (selTags === child.Value && !tagSelected) {
                                        child.IsSelected = true;
                                        tagSelected = true;
                                    }
                                });
                            }
                        });
                    }
                    
                });
                if ($scope.IsRoutineCarePlanActiveStatus) {
                    $scope.PreSaveContact.TagsList = $scope.createTagsArray($scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].Tags);
                    $("#edittopics-modalview").data("kendoMobileModalView").open();
                } else {
                    $scope.PreMemberSaveContactTagsList = $scope.createTagsArray($scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].Tags);
                    $("#member-edittopics-modalview").data("kendoMobileModalView").open();
                }

                


            }


            /**
            * @ngdoc function
            * @name createTagsArray
            * @methodOf roundingModule.controller:ContactRecapController
            * @description 
            ** Tags in edit topics screen
            * @param {array} tagsValue 
            *  Value of the tags 
            */
            $scope.createTagsArray = function (tagsValue) {
                var tempTags = [];
                var tagFound = false;
                if (tagsValue) {
                    if ($scope.IsRoutineCarePlanActiveStatus) {
                        angular.forEach(tagsValue, function (selTags) {
                            tagFound = false;                        
                            angular.forEach($scope.TagsLookup.ParentLookUp, function (parent) {
                                if (!tagFound) {
                                    angular.forEach(parent.Children, function (child) {
                                        if (selTags === child.Value && !tagFound) {
                                            child.IsSelected = true;
                                            tempTags.push(child);
                                            tagFound = true;
                                        }
                                    });
                                }
                            });
                        });
                    } else {
                        angular.forEach(tagsValue, function (selTags) {
                            tagFound = false;                        
                            angular.forEach($scope.MemberTagsLookup.ParentLookUp, function (parent) {
                                if (!tagFound) {
                                    angular.forEach(parent.Children, function (child) {
                                        if (selTags === child.Value && !tagFound) {
                                            child.IsSelected = true;
                                            tempTags.push(child);
                                            tagFound = true;
                                        }
                                    });
                                }
                            });
                        });
                    }
                }
                return tempTags;
            }

            /**
            * @ngdoc function
            * @name contactMethodSelected
            * @methodOf roundingModule.controller:ContactRecapController
            * @description
            ** Select contact method on change contact screen
            * @param {string} contactMethod
            *  Contact method selected 
            * @param {boolean} modifyContact
            *  Condition on modifying contact 
            */
            $scope.contactMethodSelected = function (contactMethod, modifyContact) {
                $scope.changeContactValidator.hideMessages();
                if (!modifyContact) {
                    setDefaultContactValues();
                }
                
                switch (contactMethod) {
                    case ContactConstants.Methods.BROWSING:
                        $(".browsing-icon").addClass("contactmethod-selectedbutton");

                        $(".inperson-icon").removeClass("contactmethod-selectedbutton");
                        $(".email-icon").removeClass("contactmethod-selectedbutton");
                        $(".fax-icon").removeClass("contactmethod-selectedbutton");
                        $(".phone-icon").removeClass("contactmethod-selectedbutton");
                        $(".mail-icon").removeClass("contactmethod-selectedbutton");
                        if (!modifyContact) {
                            $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactReason = ContactConstants.Reason.ROUTINE_CONTACT;
                            $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].Resolution = ContactConstants.Resolution.COMPLETED;
                        }
                        break;
                    case ContactConstants.Methods.EMAIL:

                        $(".email-icon").addClass("contactmethod-selectedbutton");

                        $(".browsing-icon").removeClass("contactmethod-selectedbutton");
                        $(".fax-icon").removeClass("contactmethod-selectedbutton");
                        $(".phone-icon").removeClass("contactmethod-selectedbutton");
                        $(".mail-icon").removeClass("contactmethod-selectedbutton");
                        $(".inperson-icon").removeClass("contactmethod-selectedbutton");

                        break;
                    case ContactConstants.Methods.FAX:
                        $(".fax-icon").addClass("contactmethod-selectedbutton");
                                                       
                        $(".browsing-icon").removeClass("contactmethod-selectedbutton");
                        $(".email-icon").removeClass("contactmethod-selectedbutton");
                        $(".phone-icon").removeClass("contactmethod-selectedbutton");
                        $(".mail-icon").removeClass("contactmethod-selectedbutton");
                        $(".inperson-icon").removeClass("contactmethod-selectedbutton");

                        break;
                    case ContactConstants.Methods.PHONE:
                        $(".phone-icon").addClass("contactmethod-selectedbutton");

                        $(".browsing-icon").removeClass("contactmethod-selectedbutton");
                        $(".email-icon").removeClass("contactmethod-selectedbutton");
                        $(".fax-icon").removeClass("contactmethod-selectedbutton");
                        $(".mail-icon").removeClass("contactmethod-selectedbutton");
                        $(".inperson-icon").removeClass("contactmethod-selectedbutton");

                        break;
                    case ContactConstants.Methods.MAIL:
                        $(".mail-icon").addClass("contactmethod-selectedbutton");

                        $(".browsing-icon").removeClass("contactmethod-selectedbutton");
                        $(".email-icon").removeClass("contactmethod-selectedbutton");
                        $(".fax-icon").removeClass("contactmethod-selectedbutton");
                        $(".phone-icon").removeClass("contactmethod-selectedbutton");
                        $(".inperson-icon").removeClass("contactmethod-selectedbutton");

                        break;
                    case ContactConstants.Methods.IN_PERSON:
                        $(".inperson-icon").addClass("contactmethod-selectedbutton");

                        $(".browsing-icon").removeClass("contactmethod-selectedbutton");
                        $(".email-icon").removeClass("contactmethod-selectedbutton");
                        $(".fax-icon").removeClass("contactmethod-selectedbutton");
                        $(".phone-icon").removeClass("contactmethod-selectedbutton");
                        $(".mail-icon").removeClass("contactmethod-selectedbutton");
                        if (!modifyContact) {
                            $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactLocation = $rootScope.Global.Objects.IsRCMPRL ? ContactConstants.Location.HOSPITAL : ContactConstants.Location.DIALYSIS_CENTER;
                            $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactReason = ContactConstants.Reason.ROUTINE_CONTACT;
                            $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].Resolution = ContactConstants.Resolution.COMPLETED;
                        }
                        break;
                    default:
                        break;
                }

                $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactMethod = contactMethod;
            }

            /**
            * @ngdoc function
            * @name setDefaultContactValues
            * @methodOf roundingModule.controller:ContactRecapController
            * @description
            ** Set Default Values for change contact method on change contact screen
            */
            setDefaultContactValues = function() {
                $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].Direction = ContactConstants.Direction.NOT_APPLICABLE;
                $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ExternalTeam = ContactConstants.ExternalTeam.PATIENT;
                $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].InternalTeam = $rootScope.Global.Objects.IsRCMPRL ? ContactConstants.InternalTeam.RENAL_CASE_MANAGER : ContactConstants.InternalTeam.REGISTERED_NURSE ;
                $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactReason = "";
                $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].Resolution = "";
                $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactLocation = "";
            }


           
            /**
            * @ngdoc function
            * @name onGetPtSnippetsRetrieved
            * @methodOf roundingModule.controller:ContactRecapController
            * @description
            ** Retrieve Snippets after log in
            * @param {object} result
            *  snippet data  
            */
            $scope.onGetPtSnippetsRetrieved = function(result) {
                if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                    var scrollone = $("#contactrecap-view-submenus-list").data("kendoMobileScroller");
                    if (scrollone === undefined || scrollone === null) {
                        $("#contactrecap-view-submenus-list").kendoMobileScroller();
                    } else {
                        scrollone.reset();
                    }
                    
                    result.data = result.data.sort(function (a, b) {
                        return (a.UID - b.UID);
                    });

                    $scope.Snippets.data(result.data);                              
                    $scope.ModifiedSnippets.data(result.data);
					if(result.data.length > 0) {
						$scope.IsSnippetEditMode = false;
						$scope.IsSnippetAddMode = true;
					} else {
						$scope.IsSnippetEditMode = false;
						$scope.IsSnippetAddMode = false;
					}	

                    var scrolloneContactrecap = $("#contactrecap-view-submenus-list").data("kendoMobileScroller");
                    if (scrolloneContactrecap === undefined || scrolloneContactrecap === null) {
                        $("#contactrecap-view-submenus-list").kendoMobileScroller();
                    } else {
                        scrolloneContactrecap.reset();
                    }
					
                }
            }

            /**
            * @ngdoc function
            * @name $on (ReloadSnippets)
            * @methodOf roundingModule.controller:ContactRecapController
            * @description
            ** Subscribe event Reload Snippets to run $scope.getSnippets() function
            */
            $scope.$on('ReloadSnippets', function() {
                $timeout(function() {            
                    $scope.getSnippets();
                }, 0, false);
            });

            /**
            * @ngdoc function
            * @name getSnippets
            * @methodOf roundingModule.controller:ContactRecapController
            * @description
            ** Makes use of ContactRecapService function getSnippets for Snippets retrieval
            */
            $scope.getSnippets = function() {
                var userUid = parseInt($rootScope.Global.Objects.CurrentUser.UID);
                ContactRecapService.GetSnippets(userUid , 'POST', 'JSON', $scope.onGetPtSnippetsRetrieved);
            }

            /**
            * @ngdoc event
            * @name onEditSnippetClicked
            * @eventOf roundingModule.controller:ContactRecapController
            * @description 
            ** AngularJS click event to edit snippets
            */
            $scope.onEditSnippetClicked = function() {
                try {
                    $scope.IsSnippetEditMode = true;
                    $scope.IsSnippetAddMode = false;

                    var scrollone = $("#contactrecap-view-submenus-list").data("kendoMobileScroller");
                    if (scrollone === undefined || scrollone === null) {
                        $("#contactrecap-view-submenus-list").kendoMobileScroller();
                    } else {
                        scrollone.reset();
                    }
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Contacts";
                    errExp.FunctionName = "onEditSnippetClicked";
                    errExp.DetailedErrorMessage = "Error occured while editing snippest.";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
            * @ngdoc function
            * @name OnSavePtSnippets
            * @methodOf roundingModule.controller:ContactRecapController
            * @description 
            ** Calls $scope.getSnippets on saving of snippet
            * @param {object} result
            *  Snippet Details 
            */
            $scope.OnSavePtSnippets = function (result) {
                if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                    if (result.data) {
                        $scope.getSnippets();
                    }
                }
                CommonFunctions.UnblockKendoView("contactrecap-snippets-view");
            }

            /**
            * @ngdoc event
            * @name draggableConfig
            * @eventOf roundingModule.controller:ContactRecapController
            * @description
            ** Gets called when the snippet is dragged on

            */
            $scope.draggableConfig = {
                hint: function (e) {
                    return e.clone();
                }
            };

            /**
            * @ngdoc event
            * @name draggableHint
            * @eventOf roundingModule.controller:ContactRecapController
            * @description
            ** Gets called when the snippet is dragged on
            * @param {event} e
            *  Drag event 
            */
            $scope.draggableHint = function(e) {
                var uid = parseInt(e);
                return $("#" + uid).clone();
            }

            /**
            * @ngdoc event
            * @name onDrop
            * @eventOf roundingModule.controller:ContactRecapController
            * @description
            ** Gets called when the snippet is dropped on
            * @param {object} e
            * Drop event 
            */
            $scope.onDrop = function(e) {
                $scope.$apply(function() {
                    var text = $(e.draggable.element[0]).find(".contactrecap-snippetstext").text();
                    //var txtarea = $("#" + contactrecap-contactnote).next('textarea')[0];
                    var txtarea = $("#contactrecap-contactnote")[0];
                    textAreaDragFunction(text,txtarea);
                    $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].NoteDetail = txtarea.value;

                    //Using GetPatientFromPreSaveList from CommonFunctions
                    var saveSnippetOnDrop = CommonFunctions.GetPatientFromPresaveList($rootScope.Global.Contacts.PreSaveContact.PatientUID);
                    if (saveSnippetOnDrop) {
                        saveSnippetOnDrop.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].NoteDetail = txtarea.value;
                    }

                    $rootScope.Global.Contacts.PreSaveContact = jQuery.extend(true, {}, $scope.PreSaveContact);
                    $scope.setContactrecapContactnote();
                });
            }
            /**
            * @ngdoc event
            * @name onDrop
            * @eventOf roundingModule.controller:ContactRecapController
            * @description
            ** Gets called when the snippet is dropped on
            * @param {object} e
            * Drop event 
            */
            $scope.onDropMember = function (e) {
                $scope.$apply(function () {
                    var text = $(e.draggable.element[0]).find(".contactrecap-snippetstext").text();
                    //var txtarea = $("#" + contactrecap-contactnote).next('textarea')[0];
                    var txtarea = $("#contactrecap-contactnote-member")[0];
                    textAreaDragFunction(text,txtarea);
                    $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].NoteDetail = txtarea.value;

                    //Using GetPatientFromPreSaveList from CommonFunctions
                    var saveSnippetOnDrop = CommonFunctions.GetPatientFromPresaveList($rootScope.Global.Contacts.PreSaveContact.PatientUID);
                    if (saveSnippetOnDrop) {
                        saveSnippetOnDrop.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].NoteDetail = txtarea.value;
                    }

                    $rootScope.Global.Contacts.PreSaveContact = jQuery.extend(true, {}, $scope.PreSaveContact);
                    $scope.setContactrecapContactnoteMember();
                });
            }
            /**
            * @ngdoc event
            * @name updateContactNote
            * @eventOf roundingModule.controller:ContactRecapController
            * @description
            ** Gets called on any change in contact note
            * @param {object} e
            *  updated contact note
            */
            $scope.updateContactNote = function(e) {
                try {
                    if (e == 'RoutineContact' ) {
                        var txtarea = $("#contactrecap-contactnote")[0];
                        $scope.setContactrecapContactnote();
                        $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].NoteDetail = txtarea.value;
                    }else if( e == 'MemberCarePlan' ){
                        var txtareaMember = $("#contactrecap-contactnote-member")[0];
                        $scope.setContactrecapContactnoteMember();
                        $scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].NoteDetail = txtareaMember.value;
                    }
                    
                    $rootScope.Global.Contacts.PreSaveContact = jQuery.extend(true, {}, $scope.PreSaveContact);

                    //Using GetPatientFromPreSaveList from CommonFunctions
                    var patientContactNoteUpdate = CommonFunctions.GetPatientFromPresaveList($rootScope.Global.Contacts.PreSaveContact.PatientUID);
                    if (patientContactNoteUpdate) {
                        patientContactNoteUpdate.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].NoteDetail = $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].NoteDetail;
                    }

                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Contacts";
                    errExp.FunctionName = "updateContactNote";
                    errExp.DetailedErrorMessage = "Error occured while updating contact note.";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            $scope.setContactrecapContactnote = function (e) {
                var txtarea = $("#contactrecap-contactnote")[0];
                var rows = txtarea.value.split(/\r|\r\n|\n/).length;  
                var rowsByCharacters = parseInt($('#contactrecap-contactnote').val().length / 135); 
                if (rows > rowsByCharacters && rows >= ContactConstants.ContactrecapContactnoteTextArea.MinHeight) {
                    if (rows < ContactConstants.ContactrecapContactnoteTextArea.MaxHeight)
                        $scope.contactrecapContactnoteRows = rows;
                    else
                        $scope.contactrecapContactnoteRows = ContactConstants.ContactrecapContactnoteTextArea.MaxHeight;

                } else if (rowsByCharacters > rows && rowsByCharacters >= ContactConstants.ContactrecapContactnoteTextArea.MinHeight) {
                    if (rowsByCharacters < ContactConstants.ContactrecapContactnoteTextArea.MaxHeight)
                        $scope.contactrecapContactnoteRows = rowsByCharacters;
                    else
                        $scope.contactrecapContactnoteRows = ContactConstants.ContactrecapContactnoteTextArea.MaxHeight;

                } else {
                    $scope.contactrecapContactnoteRows = ContactConstants.ContactrecapContactnoteTextArea.MinHeight;
                }
            }

            $scope.setContactrecapContactnoteMember = function (e) {
                var txtarea = $("#contactrecap-contactnote-member")[0];
                var rows = txtarea.value.split(/\r|\r\n|\n/).length; 
                var rowsByCharacters = parseInt($('#contactrecap-contactnote-member').val().length / 135);
                if (rows > rowsByCharacters && rows >= ContactConstants.ContactrecapContactnoteMemberTextArea.MinHeight) {
                    if (rows < ContactConstants.ContactrecapContactnoteMemberTextArea.MaxHeight)
                        $scope.contactrecapContactnoteMemberRows = rows;
                    else
                        $scope.contactrecapContactnoteMemberRows = ContactConstants.ContactrecapContactnoteMemberTextArea.MaxHeight;

                } else if (rowsByCharacters > rows && rowsByCharacters >= ContactConstants.ContactrecapContactnoteMemberTextArea.MinHeight) {
                    if (rowsByCharacters < ContactConstants.ContactrecapContactnoteMemberTextArea.MaxHeight)
                        $scope.contactrecapContactnoteMemberRows = rowsByCharacters;
                    else
                        $scope.contactrecapContactnoteMemberRows = ContactConstants.ContactrecapContactnoteMemberTextArea.MaxHeight;

                } else {
                    $scope.contactrecapContactnoteMemberRows = ContactConstants.ContactrecapContactnoteMemberTextArea.MinHeight;
                }
            }
            
            /**
            * @ngdoc event
            * @name onEditDoneSnippetClicked
            * @eventOf roundingModule.controller:ContactRecapController
            * @description
            ** AngularJS ng-click event to save Snippets on click
            */
            $scope.onEditDoneSnippetClicked = function(e) {
                try {
                    // collect modified snippets
                    var updateSnippets = new kendo.data.ObservableArray([]);
                    $($scope.ModifiedSnippets.data()).each(function (index, modifiedSnippet) {
                        if (modifiedSnippet !== null && modifiedSnippet !== undefined) {
                            $($scope.Snippets.data()).each(function (index, snippet) {
                                if (snippet !== null && snippet !== undefined &&
                                    snippet.UID === modifiedSnippet.UID && snippet.Text !== modifiedSnippet.Text) {
                                    modifiedSnippet.DataState = CommonConstants.DataState.Modified;
                                    updateSnippets.push(modifiedSnippet);
                                }
                            });
                        }
                    });

                    // collect deleted snippets
                    $($scope.DeletedSnippets.data()).each(function (index, deletedSnippet) {
                        if (deletedSnippet !== null && deletedSnippet !== undefined &&
                            deletedSnippet.DataState === CommonConstants.DataState.Deleted) {
                            updateSnippets.push(deletedSnippet);
                        }
                    });

                    if (updateSnippets !== null && updateSnippets !== undefined && updateSnippets.length > 0) {
                        CommonFunctions.BlockKendoView("contactrecap-snippets-view", "Saving Snippets...");
                        updateSnippets = updateSnippets.toJSON();
                        ContactRecapService.SaveSnippets(updateSnippets, 'POST', 'JSON', $scope.OnSavePtSnippets);
                    } else {
                        $scope.IsSnippetEditMode = false;
                        $scope.IsSnippetAddMode = true;
                        var scrollone = $("#contactrecap-view-submenus-list").data("kendoMobileScroller");
                        if (scrollone === undefined || scrollone === null) {
                            $("#contactrecap-view-submenus-list").kendoMobileScroller();
                        } else {
                            scrollone.reset();
                        }
                    }
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Contacts";
                    errExp.FunctionName = "onEditDoneSnippetClicked";
                    errExp.DetailedErrorMessage = "Error occured while editing snippest.";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
            * @ngdoc event
            * @name onDeleteSnippetClick
            * @eventOf roundingModule.controller:ContactRecapController
            * @description
            ** AngularJS ng-click event to delete snippets on click
            */
            $scope.onDeleteSnippetClick = function(e) {
                try {
                    var selobj = CommonFunctions.Find($scope.ModifiedSnippets, "UID", parseInt(e))[0];
                    if (selobj !== null && selobj !== undefined) {
                        selobj.DataState = CommonConstants.DataState.Deleted;
                        $scope.DeletedSnippets.data().push(selobj);
                        $scope.ModifiedSnippets.data().remove(selobj);
                    }
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Contacts";
                    errExp.FunctionName = "onDeleteSnippetClick";
                    errExp.DetailedErrorMessage = "Error occured while deleting snippest.";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }


            var getActionItemFilter = function () {
                var now = new Date();
                var daysinpast = new Date(now.getFullYear(), now.getMonth(), now.getDate() - 14);
                var daysinfuture = new Date(now.getFullYear(), now.getMonth() + 1, now.getDate());

                var actionItemFilter = {
                    CapellaUserUID: $rootScope.Global.Objects.CurrentUser.UID,
                    PtUID: $rootScope.Global.Objects.SelectedPatient.UID,
                    DataFilter: [
                        CommonConstants.ActionItemType.Tasks,
                        CommonConstants.ActionItemType.DevicesTasks
                    ],
                    StartDate: daysinpast.format("mm/dd/yy"),
                    EndDate: daysinfuture.format("mm/dd/yy"),
                    TasksForContactRecap: true
                };
                return actionItemFilter;
            };

            /**
            * @ngdoc function
            * @name onGetActionItemsRetrieved
            * @methodOf roundingModule.controller:ContactRecapController
            * @description
            ** Call back function for GetActionItems function
            * @param {object} result
            * Action items result data  
            */
            function onGetActionItemsRetrieved(result) {
                $scope.MyTasks = [];
                $scope.DelegatedTasks = [];
                if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                    $(result.data).each(function () {
                        if ((this.DelegatedDate)) {
                            $scope.DelegatedTasks.push(this);
                        } else {
                            $scope.MyTasks.push(this);
                        }
                    });
                }

                CommonFunctions.UnblockElement("contactrecap-tasks-list");
                CommonFunctions.CreateScroller('contactrecap-mytaskslist-area');
                CommonFunctions.CreateScroller('contactrecap-delegatedtaskslist-area');
                $scope.setContactrecapContactnote();
                $scope.setContactrecapContactnoteMember();
            }
            
            /**
            * @ngdoc event
            * @name taskDraggableConfig
            * @eventOf roundingModule.controller:ContactRecapController
            * @description
            ** Gets called when a delegated task is dragged on
            * @param {event} e
            * Drag event 
            */
            $scope.taskDraggableConfig = {
                hint: function (e) {
                    return e.clone();
                }
            };

            $scope.taskDraggableHint = function(e) {
                var uid = parseInt(e);
                return $("#" + uid).clone();
            }

            /**
            * @ngdoc event
            * @name taskOnDrop
            * @eventOf roundingModule.controller:ContactRecapController
            * @description
            ** Gets called when a delegated task is dropped on
            * @param {event} e
            * Drop event 
            */
            $scope.taskOnDrop = function(e) {
                var updateTaskObjects = function(Uid) {
                    var removedObj = null; 
                    var dataObj = $scope.DelegatedTasks;
                    var length = dataObj.length;
                    var i = 0;
                    for (i = 0; i < length; i++) {
                        if (dataObj[i].UID === Uid) {
                            removedObj = dataObj[i];						
                            break; 
                        }
                    }	
					
                    if (removedObj) {
                        $scope.DelegatedTasks.splice(i, 1);
                        $scope.MyTasks.push(removedObj);
                    }
                    return removedObj
                }	
                var dragUid = e.draggable.element.data("uid");
                var toRemove = updateTaskObjects(dragUid);
                if (toRemove) {
                    unDelegateTask(toRemove);
                }
            }	

            /**
            * @ngdoc function
            * @name unDelegateTask
            * @methodOf roundingModule.controller:ContactRecapController
            * @description
            ** Gets called when the task gets undelegated or dropped onto My Tasks section under Contact recap screen for VHN
            * @param {object} e
            * Delegated task details 
            */
            function unDelegateTask(e) {
                var taskToBeDelegated = {
                    UID: e.UID,
                    PatientUID: e.PatientUID,
                    DelegatorUID: $rootScope.Global.Objects.CurrentUser.UID,
                    CategoryCode: e.CategoryCode,
                    DelegateDate: new Date().format(CommonFunctions.DateFunctions.dateFormat.masks.isoUtcDateTime, false),
                    DataState: CommonConstants.DataState.Modified
                }
                
                ContactRecapService.SaveTaskDelegation(taskToBeDelegated, 'POST', 'JSON', onSaveTaskDelegationRetrieved);
            }
		
            /**
            * @ngdoc function
            * @name onSaveTaskDelegationRetrieved
            * @methodOf roundingModule.controller:ContactRecapController
            * @description
            ** Call back method for saveTaskDelegation service call
            * @param {object} result
            * Delegated task details
            */
            function onSaveTaskDelegationRetrieved(result) {
                if (result.resultstatus === Status.ServiceCallStatus.Success) {
                    actionItemFilter = getActionItemFilter();
                    ContactRecapService.GetActionItems(actionItemFilter, 'POST', 'JSON', onGetActionItemsRetrieved);
                    CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.TaskDelegated);
                }
            }	

            /**
            * @ngdoc function
            * @name show
            * @methodOf roundingModule.controller:ContactRecapController
            * @description
            ** Start page of the screen
            */
            $scope.show = function () {
                $scope.tabBaseCarePlanKey = 0;
                $scope.LoggedInUser = $rootScope.Global.Objects.LoggedInUser;

                $scope.Patient = $rootScope.Global.Objects.SelectedPatient;

                $scope.getSnippets();
			    
                if ($scope.isTasksVisible) {
                    //CommonFunctions.BlockKendoView("contactrecap-mytaskslist");
                    CommonFunctions.BlockElement("contactrecap-tasks-list");
                    actionItemFilter = getActionItemFilter();                    
                    ContactRecapService.GetActionItems(actionItemFilter, 'POST', 'JSON', onGetActionItemsRetrieved);
                }
                
                $scope.TagsLookup = LookUp.GetParentChildLookUp(lookupRequest);
                $scope.MemberTagsLookup = $scope.TagsLookup;

                $scope.ContactLocationLookup = {
                    dataTextField: "Text",
                    dataValueField: "Value",
                    dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.ContactLocation), CommonConstants.IsShownUI, true)
                };
                
                $scope.DirectionLookup = {
                    dataTextField: "Text",
                    dataValueField: "Value",
                    dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.Direction), CommonConstants.IsShownUI, true)
                };

                $scope.ContactReasonLookup = {
                    dataTextField: "Text",
                    dataValueField: "Value",
                    dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.ContactReason), CommonConstants.IsShownUI, true)
                };

                $scope.InternalTeamLookup = {
                    dataTextField: "Text",
                    dataValueField: "Value",
                    dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.InternalTeam), CommonConstants.IsShownUI, true)
                };

                $scope.ExternalTeamLookup = {
                    dataTextField: "Text",
                    dataValueField: "Value",
                    dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.ExternalTeam), CommonConstants.IsShownUI, true)
                };

                $scope.ResolutionLookup = {
                    dataTextField: "Text",
                    dataValueField: "Value",
                    dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.Resolution), CommonConstants.IsShownUI, true)
                };

                $scope.EngagementScaleLookup = {
                    dataTextField: "Text",
                    dataValueField: "Value",
                    dataSource: CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.EngagementScale), CommonConstants.IsShownUI, true)
                };

                $scope.ContactMethodLookup = CommonFunctions.Find(LookUp.GetLookupWithoutSelectValue(LookupTypes.ContactMethod), CommonConstants.IsShownUI, true);
              
                $scope.TagsLookup.ParentLookUp = LookUp.GetParentChildinTemplate(lookupRequest);
                $scope.MemberTagsLookup.ParentLookUp = LookUp.GetParentChildinTemplate(lookupRequest);
                
                // Using GetPatientFromPresaveList from CommonFunctions
                var patientsOnContactRecap = CommonFunctions.GetPatientFromPresaveList($scope.Patient.UID);
                if (patientsOnContactRecap) {
                    $rootScope.Global.Contacts.PreSaveContact = patientsOnContactRecap;                    
                }

                if ($rootScope.Global.Contacts !== null && $rootScope.Global.Contacts !== undefined && $rootScope.Global.Contacts.PreSaveContact !== null && $rootScope.Global.Contacts.PreSaveContact !== undefined) {
                     $scope.PreSaveContact = jQuery.extend(true, {}, $rootScope.Global.Contacts.PreSaveContact);                    

                    $scope.PreSaveContact.TagsList = $scope.createTagsArray($scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].Tags);

                    if ($scope.IsRoutineCarePlanActiveStatus) {
                        $scope.PreSaveContact.IsDeleteChecked = false;
                    } else {
                        $scope.PreSaveContact.IsDeleteCheckedMember = false;
                    }

                    $scope.PreSaveContact.NoteDate = CommonFunctions.DateFunctions.parseDate($rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].NoteDate).format("mmmm dd, yyyy hh:MMTT", false);
                    
                    $scope.PreSaveContact.ContactDate = new Date(CommonFunctions.DateFunctions.parseDate($rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactDate).format(CommonFunctions.DateFunctions.dateFormat.masks.isoUtcDateTime, false));

                    //Getting time from ContactDate to show in ContactTime Picker as Service gives time part in ContactDate
                    $scope.PreSaveContact.ContactTime = new Date($scope.PreSaveContact.ContactDate);

                    $scope.MaxContactDate = new Date();
                    $scope.MaxContactDate.setHours(23, 59, 59, 0);
                    $scope.MinContactDate = new Date();
                    $scope.MinContactDate.setDate($scope.MaxContactDate.getDate() - 6);
                    $scope.MinContactDate.setHours(0, 0, 0, 0);

                    $scope.contactDateOptions = {
                        format: "MM/dd/yyyy",
                        max: $scope.MaxContactDate,
                        min: $scope.MinContactDate,
                    }
                    var length = $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts.length;
                    var memberCarePlan = [];
                    for (var i = 1 ; i < length ; i++) {
                        if(ContactConstants.Reason.MEMBER_CARE_PLAN == $rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[i].ContactReason) {
                            memberCarePlan.push(i);
                        }
                    }
                    $scope.memberCarePlanKey = -1;
                    if (memberCarePlan.length > 0) {
                        $scope.memberCarePlanKey = memberCarePlan[0];
                        $scope.IsMemberCarePlanActiveTab = true;
                     } else {
                        $scope.IsMemberCarePlanActiveTab = false;
                        $scope.memberCarePlanKey = 0;
                    }
                    if ($scope.IsRoutineCarePlanActiveStatus) {
                        $scope.tabBaseCarePlanKey = 0;
                    } else {
                        $scope.tabBaseCarePlanKey = $scope.memberCarePlanKey;
                    }
                    $("#contact-recap-tab-strip").kendoTabStrip().data("kendoTabStrip").select(0);
                    $scope.IsRoutineCarePlanActiveStatus = true;                    
                }

                $timeout(function () {
                    CommonFunctions.UnblockKendoView("contactrecap-view");
                },0,false);
                
            }
            /**
            * @ngdoc event 
            * @name onRecapTabSelect
            * @eventOf roundingModule.controller:MedicationsController
            * @param {string} tab text of the tab
            * @description       
            ** ng-click event of tab select from medications view
            ** Changes UI behaviour
            */
            $scope.onRecapTabSelect = function (tab) {
                if (tab === "RoutineContact" && $scope.IsRoutineCarePlanActiveStatus == false) {
                    $scope.IsRoutineCarePlanActiveStatus = true;
                    $scope.tabBaseCarePlanKey = 0;//$scope.routineCarePlanKey;
                    $scope.PreSaveContact.TagsList = $scope.createTagsArray($rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].Tags);
                } else if (tab === "MemberCarePlan" && $scope.IsRoutineCarePlanActiveStatus == true) {
                        angular.forEach($scope.MemberTagsLookup.ParentLookUp, function (parent) {
                            angular.forEach(parent.Children, function (child) {
                                child.IsSelected = false;
                            });
                        });

                    $scope.tabBaseCarePlanKey = $scope.memberCarePlanKey;
                    $scope.IsRoutineCarePlanActiveStatus = false;
                    $scope.PreMemberSaveContactNoteDate = CommonFunctions.DateFunctions.parseDate($rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].NoteDate).format("mmmm dd, yyyy hh:MMTT", false);

                    $scope.PreSaveContact.TagsList = $scope.createTagsArray($rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].Tags);
                    //$scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].Tags = JSON.parse(JSON.stringify($rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].Tags));

                    // $scope.PreMemberSaveContactTagsList = $scope.createTagsArray($scope.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].Tags);
                  //  $scope.PreSaveContact.TagsList = $scope.createTagsArray($rootScope.Global.Contacts.PreSaveContact.PtContacts.PtContacts[$scope.tabBaseCarePlanKey].ContactNotes[0].Tags);
                }
            };

            //$scope.show();


            /**
           * @ngdoc function
           * @name bindTags
           * @methodOf roundingModule.controller:ContactRecapController
           * @description
           ** Added this callback from getParentChildLookup to fix tags lookup issue on iPad : D-01321 : HKP: 1/13/16
           */
            bindTags = function (data) {
                $scope.show();
            }

            LookUp.GetParentChildLookUp(lookupRequest, bindTags);

            /* Spell checker commentted out the functionality */ 
            ///////////// Start Spellcheking functionality///////////            
            //var listWrongspell = []
            //$scope.model = {};
            //$scope.model.suggestion = [];
            //$scope.model.AddedDictionary = [];
            //$scope.model.completecheck = false;

            //lang = BJSpell("dictionary.js/en_US.js", function () {
            //    lang = this;
            //    function newLines(String) {
            //        return String.replace(/(\r\n|\r|\n)/g, "<br />");
            //    };

            //    this.spellCheckABC = function (myval) {
            //        var textarea = newLines(lang.replace(myval.replace(/</g, String.fromCharCode(0)), function (word) {
            //            return word;
            //        }).replace(/\x00/g, "&lt;"));
            //        var regex = /<br\s*[\/]?>/gi;
            //        textarea = textarea.replace(regex, "\n");
            //        var wrongspelling = [];
            //        var i = 0;

            //        angular.forEach(BJSpell.en_US.originalword/*BJSpell.en_US.checked*/, function (key, value) {
            //            if (key === false) {
            //                wrongspelling[i++] = value;
            //            }
            //        });

            //        var lookupData = DataStorage.GetItem(LookupTypes.AddtoDictionary);
            //        if (lookupData !== null && lookupData !== "") {
            //            angular.forEach(lookupData.split(','), function (key) {
            //                wrongspelling = jQuery.grep(wrongspelling, function (value) {
            //                    return value !== key;
            //                });
            //            });
            //        }
            //        ContactRecapService.SetTextArea(textarea, wrongspelling);
            //    };
            //});

            ///**
            //* @ngdoc function
            //* @name highlightWord
            //* @methodOf roundingModule.controller:ContactRecapController
            //* @description 
            //** Highlights word for spell check
            //*/
            //function highlightWord() {
            //    var searchText = listWrongspell[0];

            //    $scope.model.suggestion = lang.suggest(searchText, 5);
            //    $("#selectedword").val(searchText);

            //    $("#txtSpell").highlightTextarea('destroy');
            //    $("#txtSpell").highlightTextarea({ words: [listWrongspell[0]] });

            //    $("#txtSpell").focus();

            //    if (searchText === undefined) {
            //        $scope.model.completecheck = true;
            //    }
            //}

            ///**
            //* @ngdoc event
            //* @name spellCheck
            //* @eventOf roundingModule.controller:ContactRecapController
            //* @description 
            //** Kendo UI on-click event called upon click on spell check icon to open modal view
            //*/
            //$scope.spellCheck = function () {
            //    ContactRecapService.SetWrongSpell(null);
            //    lang.spellCheckABC($("#contactrecap-contactnote").val());
            //    var keepContinue = true;
            //    angular.forEach(BJSpell.en_US.originalword, function (value) {
            //        if (keepContinue) {
            //            if (!value) {
            //                keepContinue = false;
            //            }
            //        }
            //    });

            //    if (!keepContinue) {
            //        $("#SpellCheck-modalview").data("kendoMobileModalView").open();
            //        listWrongspell = ContactRecapService.GetWrongSpell();
            //        $("#txtSpell").val(ContactRecapService.GetTextArea());
            //        highlightWord();

            //        CommonFunctions.CreateScroller('txtdiv');
            //    } else {
            //        alert("The spellcheck is completed");
            //    }
            //}

            ///**
            //* @ngdoc event
            //* @name closeSpellChecker
            //* @eventOf roundingModule.controller:ContactRecapController
            //* @description 
            //**  Kendo UI on-click event called upon click of Cancel button on Spell Check screen
            //**  Revert changes made to text under spell check and close Spell Check screen
            //*/
            //$scope.closeSpellChecker = function () {
            //    $("#SpellCheck-modalview").data("kendoMobileModalView").close();
            //}

            ///**
            //* @ngdoc event
            //* @name closeeditdict
            //* @eventOf roundingModule.controller:ContactRecapController
            //* @description 
            //** Kendo UI on-click event called upon click on Cancel button on Edit Custom Dictionary screen
            //** Use: Close custom directory
            //*/
            //$scope.closeeditdict = function () {
            //    $("#editdict-modalview").data("kendoMobileModalView").close();
            //}

            ///**
            //* @ngdoc event
            //* @name ignoreAll
            //* @eventOf roundingModule.controller:ContactRecapController
            //* @description 
            //** Kendo UI on-click event called upon click on Ignore All button
            //** Use : Ingores all suggestion for the highlighted word
            //*/
            //$scope.ignoreAll = function () {
            //    /* skip the word one by one */
            //    var tempval = listWrongspell[0]

            //    angular.forEach(BJSpell.en_US.originalword, function (value, key) {
            //        if (key === tempval)
            //            delete BJSpell.en_US.originalword[tempval];
            //    }
            //        );
            //    listWrongspell.shift();
            //    highlightWord();
            //}

            ///**
            //* @ngdoc event
            //* @name addToDictionary
            //* @eventOf roundingModule.controller:ContactRecapController
            //* @description 
            //** Kendo UI on-click event called on click of Add to Dictionary button
            //** Use: Add custom word to the dictionary
            //*/
            //$scope.addToDictionary = function () {
            //    /* change spelling in text area and add the new word in the custom dictionary too.
            //    develope the new edit dictionary button. to edit the dictionary */
            //    //AddDictionary                
            //    var lookupData = DataStorage.GetItem(LookupTypes.AddtoDictionary);
            //    if (lookupData === null) {
            //        DataStorage.SetItem("AddtoDictionary", $("#selectedword").val());
            //    } else {
            //        /* avoid duplicate key in the datastorage */
            //        var contine = true;
            //        angular.forEach(lookupData.split(','), function (key) {
            //            if (contine) {
            //                if (key === $("#selectedword").val())
            //                    contine = false;
            //            }
            //        });
            //        if (contine) {
            //            lookupData = lookupData + "," + $("#selectedword").val();
            //            DataStorage.SetItem("AddtoDictionary", lookupData);
            //        }
            //    }

            //    var tempval = "";
            //    var keepGoing = true;
            //    angular.forEach(listWrongspell, function (value, key) {
            //        if (keepGoing) {
            //            var regex = new RegExp("\\b" + value + "\\b");
            //            $("#txtSpell").val($("#txtSpell").val().replace(regex, $("#selectedword").val()));
            //            keepGoing = false;
            //            tempval = value;
            //        }
            //    }
            //        );

            //    listWrongspell = jQuery.grep(listWrongspell, function (value) {
            //        return value !== tempval;
            //    });
            //    highlightWord();
            //}

            ///**
            //* @ngdoc event
            //* @name editdicAddnewWord
            //* @eventOf roundingModule.controller:ContactRecapController
            //* @description
            //** Kendo UI on-click event called on click of Add button on Edit Custom Dictionary screen
            //** Use: Add custom word to the dictionary
            //*/
            //$scope.editdicAddnewWord = function () {
            //    if ($("#AddWord").val()) {
            //        var lookupData = DataStorage.GetItem(LookupTypes.AddtoDictionary);
            //        if (lookupData === null) {
            //            DataStorage.SetItem("AddtoDictionary", $("#AddWord").val());
            //        } else {
            //            var contine = true;
            //            angular.forEach(lookupData.split(','), function (key) {
            //                if (contine) {
            //                    if (key === $("#AddWord").val())
            //                        contine = false;
            //                }
            //            });

            //            if (contine) {
            //                lookupData = lookupData + "," + $("#AddWord").val();
            //                DataStorage.SetItem("AddtoDictionary", lookupData);
            //            }
            //        }

            //        CommonFunctions.CreateScroller('edit-dic');
            //        $scope.model.AddedDictionary = DataStorage.GetItem("AddtoDictionary").split(',');
            //        $("#AddWord").val('');
            //    }
            //}

            ///**
            //* @ngdoc event
            //* @name editDictionary
            //* @eventOf roundingModule.controller:ContactRecapController
            //* @description 
            //** Kendo UI on-click event called upon click of Edit Dictionary button on Spell Check screen
            //** Use: Edit Dicitionary to add custom word
            //*/
            //$scope.editDictionary = function () {
            //    if (DataStorage.GetItem("AddtoDictionary") != null)
            //        $scope.model.AddedDictionary = DataStorage.GetItem("AddtoDictionary").split(',');
            //    $("#editdict-modalview").data("kendoMobileModalView").open();
            //}

            ///**
            //* @ngdoc 
            //* @name editdicDeleteItem
            //* @methodOf roundingModule.controller:ContactRecapController
            //* @description 
            //** Kendo UI on-click event called upon click of Delete button on Edit Custom Dictionary screen
            //** Use: Delete custom word
            //*/
            //$scope.editdicDeleteItem = function () {
            //    if ($scope.model.AddedDictionary !== null && $("#deleteword").val() !== null && $("#deleteword").val() !== undefined) {
            //        $scope.model.AddedDictionary = jQuery.grep($scope.model.AddedDictionary, function (value) {
            //            return value !== $("#deleteword").val();
            //        });
            //        var deletedItems = $scope.model.AddedDictionary.join();
            //        DataStorage.Remove("AddtoDictionary");
            //        DataStorage.SetItem("AddtoDictionary", deletedItems);
            //        $scope.model.AddedDictionary = DataStorage.GetItem("AddtoDictionary").split(',');
            //    }
            //}

            ///**
            //* @ngdoc 
            //* @name editdicDeleteAllItems
            //* @methodOf roundingModule.controller:ContactRecapController
            //* @description 
            //** Kendo UI on-click event called upon click of Delete All button on Edit Custom Dictionary screen
            //** Use: Deletes all custom made words
            //*/
            //$scope.editdicDeleteAllItems = function () {
            //    DataStorage.Remove("AddtoDictionary");
            //    $scope.model.AddedDictionary = [];
            //}

            ///**
            //* @ngdoc event
            //* @name changespell
            //* @eventOf roundingModule.controller:ContactRecapController
            //* @description 
            //** Kendo UI on-click event called upon click of Change button
            //** Use: Change the highlighted word (Word under spell check)
            //*/
            //$scope.changespell = function () {
            //    var tempval = "";
            //    var keepGoing = true;
            //    angular.forEach(listWrongspell, function (value, key) {
            //        if (keepGoing) {
            //            var regex = new RegExp("\\b" + value + "\\b");
            //            $("#txtSpell").val($("#txtSpell").val().replace(regex, $("#selectedword").val()));
            //            keepGoing = false;
            //            tempval = value;
            //        }
            //    }
            //        );

            //    listWrongspell = jQuery.grep(listWrongspell, function (value) {
            //        return value !== tempval;
            //    });

            //    angular.forEach(BJSpell.en_US.originalword, function (value, key) {
            //        if (key === tempval)
            //            delete BJSpell.en_US.originalword[tempval];
            //    }
            //        );

            //    highlightWord();
            //    ContactRecapService.SetWrongSpell(listWrongspell);
            //}

            ///**
            //* @ngdoc function
            //* @name selectrow
            //* @methodOf roundingModule.controller:ContactRecapController
            //* @description 
            //** Select row
            //* @param {string} word
            //* word text 
            //* @param {number} dividexid
            //* Index number
            //*/
            //$scope.selectrow = function (word, divindexid) {
            //    angular.forEach($scope.model.suggestion, function (value, index) {
            //        $("#myword_" + index).css("background", "");
            //    });

            //    $("#myword_" + divindexid).css("background", "lightgrey");
            //    $("#selectedword").val(word);
            //}

            ///**
            //* @ngdoc event
            //* @name editSelected
            //* @eventOf roundingModule.controller:ContactRecapController
            //* @description 
            //** AngularJS click event called upon click on words under Suggestions on Spell Check screen 
            //** Use: Select a word from the list of word under suggestions
            //* @param {string} word
            //*  word text
            //* @param {number} dividexid
            //*  Index number of the suggested word 
            //*/
            //$scope.editSelected = function (word, divindex) {
            //    //use the edit index style
            //    angular.forEach($scope.model.AddedDictionary, function (value, index) {
            //        $("#editdic_" + index).css("background", "");
            //    });
            //    $("#editdic_" + divindex).css("background", "lightgrey");
            //    $("#deleteword").val(word);
            //}

            ///**
            //* @ngdoc event
            //* @name correctedSpell
            //* @eventOf roundingModule.controller:ContactRecapController
            //* @description 
            //**  Kendo UI on-click event called upon click of OK button
            //**  Use:Completion of spell check
            //*/
            //$scope.correctedSpell = function () {
            //    ContactRecapService.SetTextAreaOny($("#txtSpell").val());
            //    $("#SpellCheck-modalview").data("kendoMobileModalView").close();

            //    $timeout(function () {
            //        $rootScope.$broadcast('ResetNote');
            //    }, 0, false);
            //}

            ///////////// End Spellcheking functionality///////////

                   
            
        })

    /**
    * @ngdoc controller
    * @name roundingModule.controller:CreateSnippetController
    * @description
    ** Controller for creation of a new snippet on contact recap screen
    ** Is instantiated by tap on Create New Snippet
    */
        .controller('CreateSnippetController', function ($rootScope, $scope, ContactRecapService, ExceptionService, CommonFunctions, CommonMessages, 
                                                         CommonConstants, Status) {
            var self = $scope;      
                    
            //Save click event function
            /**
            * @ngdoc event
            * @name onCreateSnippetSaveClicked
            * @eventOf roundingModule.controller:CreateSnippetController
            * @description
            ** Kendo UI on-tap event called upon tap on save button of create snippet screen
            */
            self.onCreateSnippetSaveClicked = function () {
                try {
                    if (self.createSnippetValidator.validate()) {  
                        CommonFunctions.BlockKendoView("contactrecap-snippets-view");
                        var snippetText = $("#contactrecap-create-snippet-text").val();
                        self.saveSnippets(snippetText);
                    }
                }
                catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "ContactRecap";
                    errExp.FunctionName = "onCreateSnippetSaveClicked";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }     

            /**
            * @ngdoc function
            * @name saveSnippets
            * @methodOf roundingModule.controller:CreateSnippetController
            * @description
            **  Service Call 
            **  API: User/SaveSnippets
            **  Called upon saving of snippets on Create New Snippet Screen
            * @param {string} snippetText 
            *  Snippet text to be saved 
            */
            self.saveSnippets = function(snippetText) {
                var userUid = parseInt($rootScope.Global.Objects.CurrentUser.UID);
                var snippets = new kendo.data.ObservableArray([]);
                var snippet = {
                    DataState: CommonConstants.DataState.Added,
                    CapellaUserUid: userUid,
                    UID: 0,
                    Text: snippetText
                };
                snippets.push(snippet);
                snippets = snippets.toJSON();
                ContactRecapService.SaveSnippets(snippets , 'POST', 'JSON', self.OnSavePtSnippets);
            }
       
            /**
            * @ngdoc function
            * @name OnSavePtSnippets
            * @methodOf roundingModule.controller:CreateSnippetController
            * @description
            ** Adds the current snippet to the list of snippets on contact recap screen
            * @param {object} result
            * Snippet Object  
            */
            self.OnSavePtSnippets = function (result) {
                if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                    if (result.data) {
                        //  getSnippets();
                        ContactRecapService.ReloadSnippets();
                        $("#contactrecap-create-snippet-modalview").data("kendoMobileModalView").close();
                    }
                }
                CommonFunctions.UnblockKendoView("contactrecap-snippets-view");
            }

            /**
            * @ngdoc event
            * @name closeModalViewcCreateSnippet
            * @eventOf roundingModule.controller:CreateSnippetController
            * @description
            ** Kendo on-tap event called upon tap on Cancel button on Create New Snippet Screen
            */
            //closes the modal view for Create Snippet
            self.closeModalViewcCreateSnippet = function () {
                $("#contactrecap-create-snippet-modalview").data("kendoValidator").hideMessages();
                $("#contactrecap-create-snippet-modalview").data("kendoMobileModalView").close();
            }
            $("#contactrecap-create-snippet-text").val('');
            //$("#contactrecap-create-snippet-text").focus();            
        });
}());