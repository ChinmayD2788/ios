/// <reference path="StoryController.js" />
/**
	 * @ngdoc service
	 * @author Mikhail Rakhunov
	 * @name roundingModule.service:StoryService
	 * @description 
   	 * @version : 1.0
 */
 
(function () {
/**
	 * @ngdoc service 
	 * @name roundingModule.service:StoryService
	 * @param {Object} data taskToBeAdded
	 * @param {function} callBack $scope.onCreateNewTaskCompleted
	 * @description       
	 *StoryService is being used by StoryController
	 * This will be used for all service calls for Story Screen
	 * @param {object} $rootScope
	 * Angular rootScope object.
	 * @param {object} ServiceConstants
	 * Common Constants.
	 * @param {function} RoundingService
	 * Common Function.
*/
    angular.module('roundingModule').factory('StoryService', function ($rootScope, ServiceConstants, RoundingService) {
	 /**
		 * @ngdoc method
		 * @methodOf roundingModule.service:StoryService
		 * @name getStory
		 * @description
		 ** Retrieve Story data from service
		 * @param {function} ServiceConstants.GetPtContacts
		 * ServicePoint.
		 * @param {string} method
		 * Method: POST
		 * @param {object} dataType
		 * DataType: JSON.
		 * @param {string} callBack function name
		 *Name is "onGetPtContactsRetrieved".
		 * @returns {object}
		 *  Story data.
	*/
        function getStory(callBack, startDate, endDate) {
            var data = $.param({
                patientUID: $rootScope.Global.Objects.SelectedPatient.UID,
                StartDate: startDate,
                EndDate: endDate
            });
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPtContacts, 'POST', 'JSON', data, callBack, true); //ServicePoint, method, dataType, data, callBack
        }

        return {
            GetStory: getStory
        };
    });
}());

(function () {
/**
	* @ngdoc controller
	* @name roundingModule.controller:StoryController
	* @description
	* Controller for Story Screen. 
    * <p>VersionOne Requirements - <a href="https://www13.v1host.com/DaVitaInc/Task.mvc/Summary?oidToken=Task%3A1338">TK-01031</a> and <a href="https://www13.v1host.com/DaVitaInc/Task.mvc/Summary?oidToken=Task%3A48300">TK-04242</a> </p>
	* @property {object}
	* $scope.Story
	* Scope Property, default value []
	* @property {boolean} $scope.noDataAvailable
	* Scope Property, default value true
	*/

    angular.module('roundingModule')
        .controller('StoryController', function ($rootScope, $scope, $timeout, LookUp, LookupTypes, StoryService, CommonFunctions, ExceptionService, CommonMessages, StoryConstants) {
             $scope.model = {};
             $scope.model.Story = [];
             $scope.model.noDataAvailable = true;
             $scope.model.SelectedContactFilterCategory = '';
             $scope.model.SelectedFilterValues = [];
             $scope.model.FilteredStory = [];
             $scope.model.SelectedDateRangeFilter = StoryConstants.LastMonth;
             $scope.isLateEntry = false;

             var isChangeFired = false;
             var contactDate = '',
                localContactDate = '',
                localContactTime = '',
                entryDate = '',
                localEntryDate = '',
                localEntryTime = '';

		   /*$scope.rootScope = $rootScope;
            $scope.lookUp = LookUp;
            $scope.LookupTypes = LookupTypes;
            $scope.CommonFunctions = CommonFunctions;*/
	   	   	   	   
            LookUp.GetLookUp(LookupTypes.ContactMethod);
            LookUp.GetLookUp(LookupTypes.ContactReason);
            LookUp.GetLookUp(LookupTypes.InternalTeam);
            LookUp.GetLookUp(LookupTypes.ExternalTeam);
            LookUp.GetLookUp(LookupTypes.Resolution);
            LookUp.GetLookUp(LookupTypes.Direction);
            LookUp.GetLookUp(LookupTypes.Tags);
	      
		/**
		* @ngdoc method
		* @name onGetPtContactsRetrieved 
		* @methodOf roundingModule.controller:StoryController
		* @description
		*  callBack for get Story data service method 
		* @param {object} result 
		*  Story Details 
		*/
            $scope.onGetPtContactsRetrieved = function (result) {
                try {
                    if (result.resultstatus === "Success" && result.data && result.data.length > 0) {
                        $("#story-container-scroller").data("kendoMobileScroller").reset();
                        $scope.model.Story = result.data;                        
                        getLocalDateTimeZones($scope.model.Story);
                        if ($scope.model.SelectedFilterValues && $scope.model.SelectedFilterValues.length > 0) {
                            // apply filter
                            var finalFilteredPatient = [];
                            $scope.model.Story.forEach(function (contact) {
                                if (contact) {
                                    var filteredContact = $scope.contactStoryFilter(contact);
                                    if (filteredContact) {
                                        finalFilteredPatient.push(angular.copy(contact));
                                    }
                                }
                            });
                            $scope.model.FilteredStory = angular.copy(finalFilteredPatient);
                        }
                        else {
                            $scope.model.FilteredStory = result.data;
                        }
                        $scope.model.noDataAvailable = true;
                    } else {
                        $scope.model.Story = [];
                        //$scope.cssDisplay = 'block';
                        $scope.model.noDataAvailable = false;
                    }
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Story";
                    errExp.FunctionName = "onGetPtContactsRetrieved";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");   
            }
		
		/**
		* @ngdoc method
		* @name getContactMethod 
		* @methodOf roundingModule.controller:StoryController
		* @description
		* Get a Method to populate The Contact Information
		* @param {string} method
		* passing the Method Abbreviation
		* @returns {function} CommonFunctions.GetContactMethod(method)	
		*/
            $scope.getContactMethod = function(method) {
                return CommonFunctions.GetContactMethod(method); 
            }
			
			/**
		* @ngdoc method
		* @name getContactReason
		* @methodOf roundingModule.controller:StoryController
		* @description
		* Get a Reason to populate The Contact Information
		* @param {string} reason
		* passing the Reason Abbreviation
		* @returns {function}	LookUp.GetValueByKey(LookupTypes.ContactReason, reason).Text	
		*/
			
            $scope.getContactReason = function(reason) {
                return LookUp.GetValueByKey(LookupTypes.ContactReason, reason).Text; 
            }
	 /**	
		* @ngdoc method
		* @name getResolution
		* @methodOf roundingModule.controller:StoryController
		* @description
		* Get The Resolution to populate The Contact Information
		* @param {string} resolution
		* passing the Resolution Abbreviation
		* @returns {function} LookUp.GetValueByKey(LookupTypes.Resolution, resolution).Text	
		*/
            $scope.getResolution = function(resolution) {
                return LookUp.GetValueByKey(LookupTypes.Resolution, resolution).Text; 
            }
	 /**		
		* @ngdoc method
		* @name getDirection
		* @methodOf roundingModule.controller:StoryController
		* @description
		* Get the Direction to populate The Contact Information
		* @param {string} direction
		* passing the Direction Abbreviation
		* @returns {function} LookUp.GetValueByKey(LookupTypes.Resolution, resolution).Text	
		*/
            $scope.getDirection = function(direction) {
                return LookUp.GetValueByKey(LookupTypes.Direction, direction).Text; 
            }
	 /**	
		* @ngdoc method
		* @name getTag
		* @methodOf roundingModule.controller:StoryController
		* @description
		* Get a Tag to populate The Contact Information
		* @param {string} tag
		* passing the Tag Abbreviation
		* @returns {function} LookUp.GetValueByKey(LookupTypes.Tags, tag).Text	
		
		*/
            $scope.getTag = function(tag) {
                return LookUp.GetValueByKey(LookupTypes.Tags, tag).Text; 
            }
		 /**	
		* @ngdoc method
		* @name getTeams
		* @methodOf roundingModule.controller:StoryController
		* @description
		**  Get Teams to populate The Contact Information
		* @param {string} intTeam
		* passing the Internal Team Abbreviation
		* @param {string} extTeam
		* passing the External Team Abbreviation
		* @returns {string} intTeamText + " - " + extTeamText
		*/
            $scope.getTeams = function(intTeam, extTeam) {
                var intTeamText = LookUp.GetValueByKey(LookupTypes.InternalTeam, intTeam).Text;
                var extTeamText = LookUp.GetValueByKey(LookupTypes.ExternalTeam, extTeam).Text; 	
                return intTeamText + " - " + extTeamText;
            }
		/**	
		* @ngdoc method
		* @name getTags
		* @methodOf roundingModule.controller:StoryController
		* @description
		**  Get Tags to populate The Contact Information
		* @param {array} tags
		* passing the Array of Tags Abbreviations
		* @returns {string} Tags Text	
		
		*/
            $scope.getTags = function (tags) {
                var tagsArray = [];
                angular.forEach(tags, function (value, key) {
                    var tg = LookUp.GetValueByKey(LookupTypes.Tags, value).Text;
                    tagsArray.push(tg);
                })
                var tagText = tagsArray.toString();
                tagText = tagText.replace(/,/g, ", ");
                return tagText;
            };
            


            getLocalDateTimeZones = function (contactsList) {
                if (contactsList.length >0) {
                    angular.forEach(contactsList, function (ctcList) {
                        if (ctcList.ContactDate) {
                            contactDate = new Date(ctcList.ContactDate);
                            localContactDate = contactDate.toLocaleDateString();
                            localContactTime = contactDate.toLocaleTimeString();                                                        
                        }
                        if (ctcList.EntryDate) {
                            entryDate = Date.parse(ctcList.EntryDate);
                            localEntryDate = new Date(ctcList.EntryDate).toLocaleDateString();
                            
                            if (!ctcList.EntryTimeLocal) {
                                ctcList.EntryTimeLocal = entryDate;
                            }
                        }
                        if (!ctcList.IsLateEntry) {
                            if (localContactDate == localEntryDate) {
                                ctcList.IsLateEntry = false;
                            } else {
                                ctcList.IsLateEntry = true;
                            }
                        }                        
                        
                    });
                }

            }
            /**
            * @ngdoc function 
            * @name getStartDate
            * @methodOf roundingModule.controller:StoryController
            * @description       
            ** Get start date
            */
            getStartDate = function () {
                var currentDate = new Date(),
                    startDate = CommonFunctions.DateFunctions.dateFormat(new Date(
                                    currentDate.getUTCFullYear(),
                                    currentDate.getUTCMonth() - 1,
                                    currentDate.getUTCDate()
                                ), "mm/dd/yy", false);
                return startDate;
            };

            /**
            * @ngdoc function 
            * @name getEndDate
            * @methodOf roundingModule.controller:StoryController
            * @description       
            ** Get End date
            */
            getEndDate = function () {
                var currentDate = new Date(),
                    endDate = CommonFunctions.DateFunctions.dateFormat(new Date(
                                    currentDate.getUTCFullYear(),
                                    currentDate.getMonth(),
                                    currentDate.getDate(),
                                    23,
                                    59,
                                    59,
                                    999
                                ), "mm/dd/yy", false);
                return endDate;
            };

            /**
            * @ngdoc function 
            * @name setDefaultDateValues
            * @methodOf roundingModule.controller:StoryController
            * @description       
            ** Set default dave values for kendo calendar
            */
            setDefaultDateValues = function () {
                var date = new Date();
                $scope.model.EndDate = new Date();
                $scope.model.MaxStartDate = new Date(date.setDate(date.getDate() - 365));
                $scope.model.FromDate = angular.copy($scope.model.MaxStartDate);
                $scope.model.InitFromDate = angular.copy($scope.model.MaxStartDate);
                $scope.model.ToDate = new Date();
                $scope.model.InitToDate = new Date();
            };

            /**
            * @ngdoc function 
            * @name getContactRangeFilters
            * @methodOf roundingModule.controller:StoryController
            * @description       
            ** Get contact range filters
            */
            getContactRangeFilters = function () {
                return [{ "Text": StoryConstants.LastMonth, "Value": StoryConstants.LastMonth }, { "Text": StoryConstants.Custom, "Value": StoryConstants.Custom }];
            };

            /**
            * @ngdoc function 
            * @name getContactFilterCategories
            * @methodOf roundingModule.controller:StoryController
            * @description       
            ** Get contact filter categories
            */
            getContactFilterCategories = function () {
                return [{ 'Text': StoryConstants.AllContacts, 'Link': '\#ContactFilterPopOver' }, { 'Text': StoryConstants.ContactReason, 'Link': '\#ContactFilterPopOverOption' }, { 'Text': StoryConstants.InternalTeam, 'Link': '\#ContactFilterPopOverOption' }, { 'Text': StoryConstants.ExternalTeam, 'Link': '\#ContactFilterPopOverOption' }];
            };

            /**
            * @ngdoc event 
            * @name onClosePopOverClick
            * @eventOf roundingModule.controller:StoryController
            * @description       
            ** ng-click event of close button in contacts filter popover
            ** Changes UI behaviour
            */
             $scope.onClosePopOverClick = function () {
                 $("#ContactFilterPopOverOption").data("kendoMobilePopOver").close();
                 $("#ContactFilterPopOver").data("kendoMobilePopOver").close();
             }

            /**
            * @ngdoc event 
            * @name onContactFilterClick
            * @eventOf roundingModule.controller:StoryController
            * @description       
            ** ng-click event of filter button in contacts story
            ** Changes UI behaviour
            */
             $scope.onContactFilterClick = function (dataItem) {
                 $scope.model.SelectedContactFilterCategory = dataItem.Text;
                 $scope.model.SelectedFilterValues = [];
                 var subFilterValues = [];
                 if (dataItem.Text === StoryConstants.AllContacts) {
                     $scope.model.CurrentFilters = "";
                     $scope.model.FilteredStory = angular.copy($scope.model.Story);
                     $("#story-container-scroller").data("kendoMobileScroller").reset();
                 }
                 else if (dataItem.Text === StoryConstants.InternalTeam) {

                     subFilterValues = CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.InternalTeam), "IsShownUI", true);
                 }
                 else if (dataItem.Text === StoryConstants.ExternalTeam) {

                     subFilterValues = CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.ExternalTeam), "IsShownUI", true);
                 }
                 else if (dataItem.Text === StoryConstants.ContactReason) {

                     subFilterValues = CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.ContactReason), "IsShownUI", true);
                 }

                 if (subFilterValues.length > 0) {
                     var nullValue = CommonFunctions.Find(subFilterValues, "Value", "");
                     subFilterValues.splice(nullValue, 1);
                     $scope.model.ContactsFilterSubCategories = subFilterValues;
                 }

                 $timeout(function () {
                     $("#sub-category-pop-over-view").data("kendoMobileView").view().scroller.reset();
                 }, 0, false);
             }

            /**
            * @ngdoc event 
            * @name onContactSubFilterClick
            * @eventOf roundingModule.controller:StoryController
            * @description       
            ** ng-click event of checkbox in contacts filter popover
            ** Changes UI behaviour
            */
            $scope.onContactSubFilterClick = function (e) {
                if ($scope.model.SelectedFilterValues.length === 0) {
                    $scope.model.FilteredStory = [];
                }
                $scope.model.FilteredStory = [];
                if (e.currentTarget.checked) {
                    if ($.inArray(e.currentTarget.value, $scope.model.SelectedFilterValues) <= -1) {
                        $scope.model.SelectedFilterValues.push(e.currentTarget.value);
                    }
                }
                else {
                    if ($.inArray(e.currentTarget.value, $scope.model.SelectedFilterValues) > -1) {
                        $scope.model.SelectedFilterValues.splice($.inArray(e.currentTarget.value, $scope.model.SelectedFilterValues), 1);
                    }
                }
				
                $scope.model.CurrentFilters = "";
                var currentFilterValues = [];
                for (var i = 0; i < $scope.model.SelectedFilterValues.length; i++) {
                	if ($scope.model.SelectedContactFilterCategory === StoryConstants.InternalTeam) {

                		currentFilterValues.push(LookUp.GetValueByKey(LookupTypes.InternalTeam, $scope.model.SelectedFilterValues[i]).Text);
                	}
                	else if ($scope.model.SelectedContactFilterCategory === StoryConstants.ExternalTeam) {

                		currentFilterValues.push(LookUp.GetValueByKey(LookupTypes.ExternalTeam, $scope.model.SelectedFilterValues[i]).Text);
                	}
                	else if ($scope.model.SelectedContactFilterCategory === StoryConstants.ContactReason) {

                		currentFilterValues.push(LookUp.GetValueByKey(LookupTypes.ContactReason, $scope.model.SelectedFilterValues[i]).Text);
                	}
					
                	var currentFilterText = currentFilterValues.toString();
					$scope.model.CurrentFilters = currentFilterText.replace(/,/g, ", ");
                }

                $timeout(function () {
                    // apply filter
                    var finalFilteredPatient = [];
                    $scope.model.Story.forEach(function (contact) {
                        if (contact) {
                            var filteredContact = $scope.contactStoryFilter(contact);
                            if (filteredContact) {
                                finalFilteredPatient.push(angular.copy(contact));
                            }
                        }
                    });

                    $scope.model.FilteredStory = angular.copy(finalFilteredPatient);
                    $("#story-container-scroller").data("kendoMobileScroller").reset();
                }, 0, false);
            }

             /**
            * @ngdoc event 
            * @name onDateRangeSelect
            * @eventOf roundingModule.controller:StoryController
            * @description       
            ** k-on-select event of dropdown list for contacts range filter
            ** Changes UI behaviour
            */
            $scope.onDateRangeSelect = function (e) {
                if (event && event.srcElement && event.srcElement.textContent && event.srcElement.textContent.indexOf("Custom") !== -1 && isChangeFired === false) {
                    setDefaultDateValues();
                    $("#fromDateCalendar").data("kendoCalendar").value(new Date($scope.model.MaxStartDate));
                    $("#fromDateCalendar").data("kendoCalendar").min(new Date($scope.model.MaxStartDate));
                    $("#toDateCalendar").data("kendoCalendar").min(new Date($scope.model.MaxStartDate));
                    $("#fromDateCalendar").data("kendoCalendar").max(new Date($scope.model.EndDate));
                    $("#toDateCalendar").data("kendoCalendar").max(new Date($scope.model.EndDate));
                    $("#toDateCalendar").data("kendoCalendar").value(new Date($scope.model.ToDate));
                    $("#daterange-modalview").kendoMobileModalView("open");
                }
            }

             /**
            * @ngdoc event 
            * @name onChangeDate
            * @eventOf roundingModule.controller:StoryController
            * @description       
            ** k-on-change event of kendo calendar
            ** Changes UI behaviour
            */
            $scope.onChangeDate = function (id) {
                if (id === 'fromDate') {
                    $scope.model.InitFromDate = $("#fromDateCalendar").data("kendoCalendar").current();
                }
                else {
                    $scope.model.InitToDate = $("#toDateCalendar").data("kendoCalendar").current();
                }
            }

            /**
            * @ngdoc event 
            * @name onDateRangeChange
            * @eventOf roundingModule.controller:StoryController
            * @description       
            ** k-on-change event of dropdown list for contacts range filter
            ** Changes UI behaviour
            */
            $scope.onDateRangeChange = function () {
                var dropdownlist = $("#ddlStoryDateFilter").data("kendoDropDownList");
                isChangeFired = true;
                if (dropdownlist.dataItem().Text !== StoryConstants.LastMonth) {
                    setDefaultDateValues();
                    $("#fromDateCalendar").data("kendoCalendar").value(new Date($scope.model.MaxStartDate));
                    $("#fromDateCalendar").data("kendoCalendar").min(new Date($scope.model.MaxStartDate));
                    $("#toDateCalendar").data("kendoCalendar").min(new Date($scope.model.MaxStartDate));
                    $("#fromDateCalendar").data("kendoCalendar").max(new Date($scope.model.EndDate));
                    $("#toDateCalendar").data("kendoCalendar").max(new Date($scope.model.EndDate));
                    $("#toDateCalendar").data("kendoCalendar").value(new Date($scope.model.ToDate));
                    $("#daterange-modalview").kendoMobileModalView("open");
                }
                else {
                    $scope.model.ContactsRangeFilters = getContactRangeFilters();
                    CommonFunctions.BlockKendoView("ptchart-splitview-main-pan", CommonMessages.BusyMessages.LoadingStory);
                    StoryService.GetStory($scope.onGetPtContactsRetrieved,getStartDate(),getEndDate());
                }
            }

            /**
            * @ngdoc event 
            * @name dateRangeOK
            * @eventOf roundingModule.controller:StoryController
            * @description       
            ** ng-click event of ok button of contact date range dialog
            ** Changes UI behaviour
            */
            $scope.dateRangeOK = function () {
                var startDate = $("#fromDateCalendar").data("kendoCalendar").current();
                var endDate = $("#toDateCalendar").data("kendoCalendar").current();
                var dropdownlist = $("#ddlStoryDateFilter").data("kendoDropDownList");
                if (dropdownlist) {
                    dropdownlist.dataItem().Text = "Custom:" + CommonFunctions.DateFunctions.dateFormat(startDate, "mm/dd/yy", false) + "-" + CommonFunctions.DateFunctions.dateFormat(endDate, "mm/dd/yy", false);
                    dropdownlist.refresh();
                }
                CommonFunctions.BlockKendoView("ptchart-splitview-main-pan", CommonMessages.BusyMessages.LoadingStory);
                StoryService.GetStory($scope.onGetPtContactsRetrieved, CommonFunctions.DateFunctions.dateFormat(startDate, "mm/dd/yy", false), CommonFunctions.DateFunctions.dateFormat(endDate, "mm/dd/yy", false));
                $("#daterange-modalview").kendoMobileModalView("close");
                isChangeFired = false;
             }

             /**
            * @ngdoc event 
            * @name dateRangeCancel
            * @eventOf roundingModule.controller:StoryController
            * @description       
            ** ng-click event of cancel button of contact date range dialog
            ** Changes UI behaviour
            */
            $scope.dateRangeCancel = function () {
                $("#daterange-modalview").kendoMobileModalView("close");
                isChangeFired = false;
             }


            /**
            * @ngdoc method 
            * @name contactStoryFilter
            * @eventOf roundingModule.controller:StoryController
            * @description       
            ** Filter contacts story list
            ** Changes UI behaviour
            */
             $scope.contactStoryFilter = function (contact) {
                 if ($scope.model.SelectedFilterValues && $scope.model.SelectedFilterValues.length > 0) {
                     if ($scope.model.SelectedContactFilterCategory === StoryConstants.InternalTeam) {
                         return ($scope.model.SelectedFilterValues.indexOf(contact.InternalTeam) !== -1);
                     }
                     else if ($scope.model.SelectedContactFilterCategory === StoryConstants.ExternalTeam) {
                         return ($scope.model.SelectedFilterValues.indexOf(contact.ExternalTeam) !== -1);
                     }
                     else if ($scope.model.SelectedContactFilterCategory === StoryConstants.ContactReason) {
                         return ($scope.model.SelectedFilterValues.indexOf(contact.ContactReason) !== -1);
                     }
                 }
                 else {
                     return contact;
                 }
             }
            setDefaultDateValues();
            $scope.model.ContactsRangeFilters = getContactRangeFilters();
            $scope.model.ContactsFilterCategories = getContactFilterCategories();
            $scope.model.CurrentFilters = "";
            CommonFunctions.BlockKendoView("ptchart-splitview-main-pan", CommonMessages.BusyMessages.LoadingStory);
            StoryService.GetStory($scope.onGetPtContactsRetrieved,getStartDate(),getEndDate());
        });
}());	   