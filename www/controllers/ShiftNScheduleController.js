/**
	 * @ngdoc service
	 * @author Mikhail Rakhunov
	 * @name roundingModule.service:ShiftNScheduleService
	 * @description 
   	 * @version : 1.0
 */
(function () {
/**
	 * @ngdoc service 
	 * @name roundingModule.service:ShiftNScheduleService
	 * @param {Object} data $.param({ '' : PatientUid })
	 * @param {function} callBack onPatientScheduleRetrieved
	 * @description       
	 * ShiftNScheduleService is being used by ShiftNScheduleServiceController
	 * This will be used for all service calls for the Dialysis Schedule and Shift Screen
	 * @param {object} $rootScope
	 * Angular rootScope object.
	 * @param {object} ServiceConstants
	 * Common Constants.
	 * @param {function} RoundingService
	 * Common Function.
*/
    angular.module('roundingModule').factory('ShiftNScheduleService', function ($rootScope, ServiceConstants, RoundingService) {
	/**
		 * @ngdoc method
		 * @methodOf roundingModule.service:ShiftNScheduleService
		 * @name getSchedule
		 * @description
		 * Retrieve Schedule data from service
		 * @param {function} ServiceConstants.GetPtContacts
		 * ServicePoint.
		 * @param {string} method
		 * Method: POST
		 * @param {object} dataType
		 * DataType: JSON.
		 * @param {string} callBack function name
		 * Name is "onPatientScheduleRetrieved".
		 * @returns {object}
		 *  The Patient Schedule data.
	*/
        function getSchedule(callBack) {
            var PatientUid = $rootScope.Global.Objects.SelectedPatient.UID; 
            var data = $.param({ '' : PatientUid });
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPatientSchedule, 'POST', 'JSON', data, callBack, true); 
        }
	
/**
		 * @ngdoc method
		 * @methodOf roundingModule.service:ShiftNScheduleService
		 * @name savePatientSchedule
		 * @description
		 * Send a Save Schedule data request to service
		 * @param {function} ServiceConstants.SavePatientSchedule
		 * ServicePoint.
		 * @param {string} method
		 * Method: POST
		 * @param {object} dataType
		 * DataType: JSON.
		 * @param {object} data
		 * Request object.
		 * @param {string} callBack function name
		 *Name is "onPatientScheduleSave".
		 * @returns {object}
		 *  The result object with status property
	*/	
        function savePatientSchedule(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.SavePatientSchedule, 'POST', 'JSON', data, callBack); 
        }
		
        return {
            GetSchedule: getSchedule,
            SavePatientSchedule: savePatientSchedule
			
        };
    });
}());

(function () {

/**
	* @ngdoc controller
	* @name roundingModule.controller:ShiftNScheduleController
	* @description
	* Controller for  the Dialysis Schedule and Shift Screen
	* @property {object} $scope.Schedule
	* the Current Schedule, default value []
	* @property {object} $scope.WeekDays
	* Week days schedule boolean array, default values 'false' of all day names 
	* @property {object} $scope.scheduledDay
	* json object , default values: day = null; data = null
	*/

    angular.module('roundingModule')
        .controller('ShiftNScheduleController', function ($rootScope, $scope, LookUp, LookupTypes, ShiftNScheduleService, CommonFunctions, CommonConstants, ExceptionService) {
            $scope.Schedule = [];  // current schedule
            $scope.WeekDays = [['Sun',false], ['Mon',false], ['Tue',false], ['Wed',false], ['Thu',false], ['Fri',false], ['Sat',false]];
            $scope.scheduledDay = { day:null, data:null };
	  
	  /**
		* @ngdoc method
		* @name Data 
		* @methodOf roundingModule.controller:ShiftNScheduleController
		* @description
		*  Using to  get objects: Schedule, ScheduledTime, ClearSelectedDaySchedule, and boolean SaveInProgress.
		* @property {object} Schedule
		* default values: null
		* @property {object} ScheduledTime
		* default values: null
		* @property {boolean} clearSelectedDaySchedule
		* default values: false
		* @property {boolean} saveInProgress
		* default values: false
		* @returns {object} itself properties 
	*/
	  
            var Data = function () {
                var schedule = null;
                var scheduledTime = null;
                var clearSelectedDaySchedule = false;
                var saveInProgress = false;
		
                return {
                    Schedule: schedule,
                    ScheduledTime: scheduledTime,
                    ClearSelectedDaySchedule: clearSelectedDaySchedule,
                    SaveInProgress: saveInProgress
                }
            }();
	  /**
		* @ngdoc method
		* @name $scope.toUpper
		* @methodOf roundingModule.controller:ShiftNScheduleController
		* @description
		*  Using to upper-case String.
		* @param {string} str 
		*  any string.
		* @returns {string} up  
	*/
            $scope.toUpper = function(str) {
                var up = str.toUpperCase();
                return up;
            }
	 /**
		* @ngdoc method
		* @name $scope.editDaySchedule
		* @methodOf roundingModule.controller:ShiftNScheduleController
		* @description
		*  Using to edit the Day Schedule.
		* @param {string} day
		*  day string.
		* @param {object} $event
		* Angular Event variable
		* @property {function} setArrow arguments w (string: width), d (string: day name)
	*/	   	   
            $scope.editDaySchedule = function (day, event) {
			
		    var setArrow = function (w, d) {
                    var b = 0;
                    switch (d) {
                        case "Sun":
                            b = 0;
                            break;
                        case "Mon":
                            b = 1;
                            break;
                        case "Tue":
                            b = 2;
                            break;
                        case "Wed":
                            b = 3;
                            break;
                        case "Thu":
                            b = 4;
                            break;
                        case "Fri":
                            b = 5;
                            break;
                        case "Sat":
                            b = 6;
                            break;
                        default:
                            b = 0;
                            break;
                    }
                    var margin = 25;
                    margin = (w * b) + (w / 2) + (margin * b);
                    $(".popup-arrow").css("margin-left", margin);
                }
		
                try {
                    if (!(Data.ScheduledTime) || !(Data.ScheduledTime.Day) || (Data.ScheduledTime.Day !== day)) {                       
                        $(".schedule-edit").hide();
                        $scope.cancelEditDaySchedule();
                        Data.ClearSelectedDaySchedule = false;
                        setArrow($(event.currentTarget).parent().width(), day);
                        $(event.currentTarget).addClass("selected");
                        var currDate = new Date();
                        var data = CommonFunctions.Find($scope.Schedule.ScheduleTimes, "Day", day)[0];
                        var sth = 0, stm = 0, eth = 12, etm = 0, d = day;
                        if (data) {
                            sth = data.StartTime.Hour;
                            stm = data.StartTime.Minute;
                            eth = data.EndTime.Hour;
                            etm = data.EndTime.Minute;
                        }
                        Data.ScheduledTime = kendo.observable({
                                                                  Day: d,
                                                                  StartTime: new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), sth, stm),
                                                                  EndTime: new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate(), eth, etm),
                                                                  StartTimeChange: function () {
                                                                      if ($($(".schedule-clear")[0]).attr('disabled')) {
                                                                          $($(".schedule-clear")[0]).removeAttr('disabled');
                                                                      }
                                                                      Data.ClearSelectedDaySchedule = false;
                                                                  },
                                                                  EndTimeChange: function () {
                                                                      if ($($(".schedule-clear")[0]).attr('disabled')) {
                                                                          $($(".schedule-clear")[0]).removeAttr('disabled');
                                                                      }
                                                                      Data.ClearSelectedDaySchedule = false;
                                                                  }
                                                              });
                    
                        $(".schedule-edit").fadeIn();
                        kendo.bind($(".schedule-edit-container"), Data.ScheduledTime); 
                        var dateTimePicker = $("#starttime").data("kendoTimePicker");
                        dateTimePicker.value(new Date(Data.ScheduledTime.StartTime));
                        dateTimePicker = $("#endtime").data("kendoTimePicker");
                        dateTimePicker.value(new Date(Data.ScheduledTime.EndTime));
                    }
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "ShiftNSchedule";
                    errExp.FunctionName = "editDaySchedule";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }
	/**
		* @ngdoc method
		* @name  cancelSchedule
		* @methodOf roundingModule.controller:ShiftNScheduleController
		* @description
		*  Using to cancel Schedule.
	*/	   
            var cancelSchedule = function() {
                $("a.selected").removeClass("selected");
                if (Data.ScheduledTime) {
                    Data.ScheduledTime.unbind();
                }
                Data.ScheduledTime = null;
                if ($($(".schedule-clear")[0]).attr('disabled')) {
                    $($(".schedule-clear")[0]).removeAttr('disabled');
                }	
            }
		/**
		* @ngdoc method
		* @name  cancelEditDaySchedule
		* @methodOf roundingModule.controller:ShiftNScheduleController
		* @description
		*  Using to cancel Edit Day Schedule.
	*/	 
            $scope.cancelEditDaySchedule = function() {
                $(".schedule-edit").fadeOut();
                cancelSchedule();
                Data.ClearSelectedDaySchedule = false;
            }
	/**
		* @ngdoc method
		* @name  clearDaySchedule
		* @methodOf roundingModule.controller:ShiftNScheduleController
		* @description
		*  Using to clear Day Schedule.
	*/	 
            $scope.clearDaySchedule = function () {
                Data.ClearSelectedDaySchedule = true;
                Data.ScheduledTime.StartTime = null;
                Data.ScheduledTime.EndTime = null;
                var dateTimePicker = $("#starttime").data("kendoTimePicker");
                dateTimePicker.value(null);
                dateTimePicker = $("#endtime").data("kendoTimePicker");
                dateTimePicker.value(null);
							
                $($(".schedule-clear")[0]).attr('disabled', 'disabled');
            }
   /**
		* @ngdoc method
		* @name  setScheduleTimes
		* @methodOf roundingModule.controller:ShiftNScheduleController
		* @param {object} str
		* Scheduler object
		* @description
		*  Using to set Schedule time.
		* @returns {object} ScheduleTimes
	*/
            var setScheduleTimes = function (st) {
                var ScheduleTimes = [];
                if (st) {
                    for (var i = 0; i < st.length; i++) {
                        ScheduleTimes.push({
                                               Day: st[i].Day,
                                               StartTime: {
                                Hour: st[i].StartTime.Hour,
                                Minute: st[i].StartTime.Minute
                            },
                                               EndTime: {
                                Hour: st[i].EndTime.Hour,
                                Minute: st[i].EndTime.Minute
                            }
                                           });
                    }
                }
                return ScheduleTimes;
            }
    /**
		* @ngdoc method
		* @name  prepareSaveRequest
		* @methodOf roundingModule.controller:ShiftNScheduleController
		* @param {object} d 
		* Scheduler object
		* @description
		*  Using to populate the Schedule object.
		* @returns {object} data (schedule object)
	*/
            var prepareSaveRequest = function (d) {
                if (d) {
                    var st = setScheduleTimes(d.ScheduleTimes);
                    var data = {
                        DataState: 	CommonConstants.DataState.Modified,
                        PatientUID: $rootScope.Global.Objects.SelectedPatient.UID,
                        SchedIsFri: d.SchedIsFri,
                        SchedIsMon: d.SchedIsMon,
                        SchedIsSat: d.SchedIsSat,
                        SchedIsSun: d.SchedIsSun,
                        SchedIsThu: d.SchedIsThu,
                        SchedIsTue: d.SchedIsTue,
                        SchedIsWed: d.SchedIsWed,
                        ScheduleTimes: st,
                        Shift: d.Shift
                    }
                    return data;
                } else {
                    return d;
                }
            }
	/**
		* @ngdoc method
		* @name  $scope.saveSchedule
		* @methodOf roundingModule.controller:ShiftNScheduleController
		* @param {object} d 
		* Scheduler object
		* @description
		*  Using to send save Schedule request to Service.
		* @returns {object} data 
		* Scheduler object
	*/
            $scope.saveSchedule = function() {
                try {  
                    if (!Data.SaveInProgress && Data.ScheduledTime) {
                        if (!Data.ClearSelectedDaySchedule) {
                            var errors = "";
                            var errorsVal = "";
                            var sttime = kendo.parseDate($('#starttime').val());
                            if (!sttime) {
                                errorsVal += "Invalid start time.\n"
                            }

                            var entime = kendo.parseDate($('#endtime').val());
                            if (!entime) {
                                errorsVal += "Invalid end time.\n"
                            }

                            if (errorsVal !== "") {
                                CommonFunctions.OpenAlertBox('Validation', [{ message: errorsVal}], null);
                                return;
                            }

                            if (Data.ScheduledTime.StartTime === null) {
                                errors += "Please enter start time.\n"
                            }
                            if (Data.ScheduledTime.EndTime === null) {
                                errors += "Please enter end time.\n"
                            }

                            if (Data.ScheduledTime.StartTime >= Data.ScheduledTime.EndTime) {
                                errors += "Start time can not be greater than or equal to end time.\n";
                            }
                            if (errors !== "") {
                                CommonFunctions.DisplayAlertMessage(errors);
                                return;
                            }
                        }
                        var d = Data.ScheduledTime.Day;
                        var data = prepareSaveRequest($scope.Schedule);

                        switch (d) {
                            case "Sun":
                                if (Data.ClearSelectedDaySchedule && !data.SchedIsSun) {
                                    $(".schedule-edit").fadeOut();
                                    cancelSchedule();
                                    return;
                                }
                                data.SchedIsSun = !Data.ClearSelectedDaySchedule;
                                break;
                            case "Mon":
                                if (Data.ClearSelectedDaySchedule && !data.SchedIsMon) {
                                    $(".schedule-edit").fadeOut();
                                    cancelSchedule();
                                    return;
                                }
                                data.SchedIsMon = !Data.ClearSelectedDaySchedule;
                                break;
                            case "Tue":
                                if (Data.ClearSelectedDaySchedule && !data.SchedIsTue) {
                                    $(".schedule-edit").fadeOut();
                                    cancelSchedule();
                                    return;
                                }
                                data.SchedIsTue = !Data.ClearSelectedDaySchedule;
                                break;
                            case "Wed":
                                if (Data.ClearSelectedDaySchedule && !data.SchedIsWed) {
                                    $(".schedule-edit").fadeOut();
                                    cancelSchedule();
                                    return;
                                }
                                data.SchedIsWed = !Data.ClearSelectedDaySchedule;
                                break;
                            case "Thu":
                                if (Data.ClearSelectedDaySchedule && !data.SchedIsThu) {
                                    $(".schedule-edit").fadeOut();
                                    cancelSchedule();
                                    return;
                                }
                                data.SchedIsThu = !Data.ClearSelectedDaySchedule;
                                break;
                            case "Fri":
                                if (Data.ClearSelectedDaySchedule && !data.SchedIsFri) {
                                    $(".schedule-edit").fadeOut();
                                    cancelSchedule();
                                    return;
                                }
                                data.SchedIsFri = !Data.ClearSelectedDaySchedule;
                                break;
                            case "Sat":
                                if (Data.ClearSelectedDaySchedule && !data.SchedIsSat) {
                                    $(".schedule-edit").fadeOut();
                                    cancelSchedule();
                                    return;
                                }
                                data.SchedIsSat = !Data.ClearSelectedDaySchedule;
                                break;
                        }

                        if (Data.ClearSelectedDaySchedule) {
                            var removeIndex = -1;
                            for (var i = 0; i < data.ScheduleTimes.length; i++) {
                                if (data.ScheduleTimes[i].Day == d) {
                                    removeIndex = i;
                                }
                            }
                            data.ScheduleTimes.splice(removeIndex, 1);
                        } else {
                            var t = CommonFunctions.Find(data.ScheduleTimes, "Day", d)[0];
                            if (t) {
                                t.StartTime.Hour = Data.ScheduledTime.StartTime.getHours();
                                t.StartTime.Minute = Data.ScheduledTime.StartTime.getMinutes();
                                t.EndTime.Hour = Data.ScheduledTime.EndTime.getHours();
                                t.EndTime.Minute = Data.ScheduledTime.EndTime.getMinutes();
                            } else {
                                data.ScheduleTimes.push({
                                                            Day: d,
                                                            StartTime: {
                                        Hour: Data.ScheduledTime.StartTime.getHours(),
                                        Minute: Data.ScheduledTime.StartTime.getMinutes()
                                    },
                                                            EndTime: {
                                        Hour: Data.ScheduledTime.EndTime.getHours(),
                                        Minute: Data.ScheduledTime.EndTime.getMinutes()
                                    }
                                                        });
                            }
                        }
                        Data.SaveInProgress = true;
                        $scope.scheduledDay.day = d;
				
                        data.Shift = $('.dss-header-shift select').val();
				
                        $scope.scheduledDay.data = data.ScheduleTimes;
                        $scope.Schedule.ScheduleTimes = data.ScheduleTimes;
				 
                        ShiftNScheduleService.SavePatientSchedule(data, onPatientScheduleSave);
                    }
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "ShiftNSchedule";
                    errExp.FunctionName = "saveSchedule";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }
	/**
		* @ngdoc method
		* @name  converHours
		* @methodOf roundingModule.controller:ShiftNScheduleController
		* @param {string} h (hours)
		* @param {string} m (minutes)
		* @description
		*  Using to convert time to AM/PM with mask "00 : 00 A".
		* @returns {object} data (schedule object)
	*/
            var converHours = function (h, m) {
                h = parseInt(h);
                m = parseInt(m);
                var timeString = "";
                var hoursInd = "A";
                if (h === 0) {
                    timeString = "12"
                } else if (h > 12) {
                    timeString += h - 12;
                    hoursInd = "P";
                } else {
                    timeString += h;
                } 
		
                timeString += ":";
                timeString += (m < 10 ? ("0" + m) : m) + hoursInd;
                return timeString;
            }
		/**
		* @ngdoc method
		* @name onPatientScheduleRetrieved 
		* @methodOf roundingModule.controller:ShiftNScheduleController
		* @description
		*  callBack for get Schedule data service method 
		* @param {object} result 
		* Result object
		*  Schedule Details 
		*/
            var onPatientScheduleRetrieved = function (result) {
                try {
                    if (result.resultstatus === "Success" && (result.data)) {
                        var tempObj = [
                            result.data.SchedIsSun, result.data.SchedIsMon, result.data.SchedIsTue, 
                            result.data.SchedIsWed, result.data.SchedIsThu, result.data.SchedIsFri, result.data.SchedIsSat
                        ];
					
                        var len = $scope.WeekDays.length;
					
                        for (var i = 0; i < len; i++) {
                            $scope.WeekDays[i][1] = tempObj[i];
                        }
									
                        $scope.Schedule = result.data;
                        $scope.shifts = LookUp.GetLookUp(LookupTypes.Shift);
                        $scope.ScheduleTimes = [];
					
                        if ($scope.Schedule.ScheduleTimes) {
                            var st = $scope.Schedule.ScheduleTimes;
                            for (var i = 0; i < st.length; i++) {
                                $scope.ScheduleTimes.push({
                                                              Day: st[i].Day,
                                                              StartTime: {
                                        Hour: st[i].StartTime.Hour,
                                        Minute: st[i].StartTime.Minute
                                    },
                                                              EndTime: {
                                        Hour: st[i].EndTime.Hour,
                                        Minute: st[i].EndTime.Minute
                                    },
								
                                                              TimeStr: converHours(st[i].StartTime.Hour, st[i].StartTime.Minute) + " - " + 
                                                                       converHours(st[i].EndTime.Hour, st[i].EndTime.Minute)
                                                          });
                            }
                        }
				
                        $scope.getScheduleTimes = function(day) {
                            var result = "";
                            for (var i = 0; i < $scope.ScheduleTimes.length; i++) {
                                if ($scope.ScheduleTimes[i].Day === day) { 
                                    result = $scope.ScheduleTimes[i].TimeStr;
                                    break;
                                }
                            }
                            return result;
                        }		
                    } else {
                        $scope.Schedule = [];
                    }
				
                    if ($scope.Schedule.Shift) {
                        var dropdownlist = $('.dss-header-shift select').data("kendoDropDownList");
                        dropdownlist.value($scope.Schedule.Shift);
                    }	
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Schedule";
                    errExp.FunctionName = "onGetPtContactsRetrieved";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }
		
            var onPatientScheduleSave = function (result) {
                Data.SaveInProgress = false;
                try {
                    if (result.resultstatus === "Success" && (result.data !== null && result.data !== undefined)) {
                        switch ($scope.scheduledDay.day) {
                            case "Sun":
                                $scope.Schedule.SchedIsSun = !Data.ClearSelectedDaySchedule;
                                break;
                            case "Mon":
                                $scope.Schedule.SchedIsMon = !Data.ClearSelectedDaySchedule;
                                break;
                            case "Tue":
                                $scope.Schedule.SchedIsTue = !Data.ClearSelectedDaySchedule;
                                break;
                            case "Wed":
                                $scope.Schedule.SchedIsWed = !Data.ClearSelectedDaySchedule;
                                break;
                            case "Thu":
                                $scope.Schedule.SchedIsThu = !Data.ClearSelectedDaySchedule;
                                break;
                            case "Fri":
                                $scope.Schedule.SchedIsFri = !Data.ClearSelectedDaySchedule;
                                break;
                            case "Sat":
                                $scope.Schedule.SchedIsSat = !Data.ClearSelectedDaySchedule;
                                break;
                        }
																				
                        if (Data.ClearSelectedDaySchedule) {
                            Data.ClearSelectedDaySchedule = false;	
                            $('a.selected').parent().find('.schedule-time').text("");
                            $('a.selected').removeClass('scheduled');
                        } else {
                            var schData = CommonFunctions.Find($scope.Schedule.ScheduleTimes, "Day", $scope.scheduledDay.day)[0];
						   
                            if (!schData) {
                                schData = $scope.scheduledDay.data[$scope.scheduledDay.data.length - 1];
                            }		
                            var timeStr = converHours(schData.StartTime.Hour, schData.StartTime.Minute) + " - " + 
                                          converHours(schData.EndTime.Hour, schData.EndTime.Minute);
								  
                            $('a.selected').parent().find('.schedule-time').text(timeStr);
                            $('a.selected').addClass('scheduled');
                        }
                        $scope.scheduledDay.day = null;
                        $scope.scheduledDay.data = null;
                        $(".schedule-edit").fadeOut();
                        cancelSchedule();
                    }
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Schedule";
                    errExp.FunctionName = "onPatientScheduleSave";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }	
            };
		
            ShiftNScheduleService.GetSchedule(onPatientScheduleRetrieved);
        }); 
}());	   