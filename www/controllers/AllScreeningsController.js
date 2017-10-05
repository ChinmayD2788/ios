 (function () {
	/**
    * @ngdoc service 
    * @name roundingModule.service:AllScreeningsService
    * @description       
    * AllScreeningsService is being used by AllScreeningsController
    * This will be used for all service calls for Screenings
    * @param {object} ServiceConstants
    * Common Constants.
    * @param {function} RoundingService
    * Common Function.
    */
	angular.module('roundingModule').factory('AllScreeningsService', function (ServiceConstants, RoundingService) {
		/**
        * @ngdoc method
        * @methodOf roundingModule.service:AllScreeningsService
        * @name getPatientSurveyDetails
        * @description
        ** Retrieve patient Survey detail from service
        * @param {function} ServiceConstants.GetPatientSurveyDetails
        * ServicePoint.
        * @param {object} data
        * Data: Patient survey detail filter
        * @param {string} method
        * Method: POST
        * @param {object} dataType
        * DataType: JSON.
        * @param {string} callBack onGetPatientSurveyDetailsRetrieved
        * @returns {object}
        * Patient Survey detail.
        */
		function getPatientSurveyDetails(data, method, dataType, callBack) {
			RoundingService.ServiceCallWithParams(ServiceConstants.GetPatientSurveyDetails, method, dataType, data, callBack);
		}

		/*function getPathwayHeaderData(data, method, dataType, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPathwayHeaderData, method, dataType, data, callBack);
        }*/

		/**
        * @ngdoc method
        * @methodOf roundingModule.service:AllScreeningsService
        * @name getSurveyDetails
        * @description
        ** Retrieve Survey detail from service
        * @param {function} ServiceConstants.GetSurveyDetails
        * ServicePoint.
        * @param {object} data
        * Data: Survey detail filter
        * @param {string} method
        * Method: POST
        * @param {object} dataType
        * DataType: JSON.
        * @param {string} callBack onGetSurveyDetailsRetrieved
        * @returns {object}
        * Survey detail.
        */
		function getSurveyDetails(data, method, dataType, callBack) {
			RoundingService.ServiceCallWithParams(ServiceConstants.GetSurveyDetails, method, dataType, data, callBack);
		}

		/**
        * @ngdoc method
        * @methodOf roundingModule.service:AllScreeningsService
        * @name saveSurveyDetails
        * @description
        ** Retrieve Survey detail from service
        * @param {function} ServiceConstants.SaveSurveyDetails
        * ServicePoint.
        * @param {object} data
        * Data: Survey detail response to be saved
        * @param {string} method
        * Method: POST
        * @param {object} dataType
        * DataType: JSON.
        * @param {string} callBack onSaveSurveyDetailsRetrieved
        * @returns {object}
        * Value flag of saved survey details.
        */
		function saveSurveyDetails(data, method, dataType, callBack) {
			RoundingService.ServiceCallWithParams(ServiceConstants.AddPatientSurvey, method, dataType, data, callBack);
		}

		return {
			GetPatientSurveyDetails: getPatientSurveyDetails,
			//GetPathwayHeaderData: getPathwayHeaderData,
			GetSurveyDetails: getSurveyDetails,
			SaveSurveyDetails: saveSurveyDetails
		}
	});
}());

(function () {
	/**
   * @ngdoc controller
   * @name roundingModule.controller:AllScreeningsController
   * @description
   * Controller for Screenings
   * @property {object} $scope.model - model of AllScreeningsController.
   * @property {kendo.data.DataSource} $scope.model.SurveyDetails - property of $scope.model used to store SurveyDetails data.
   * @property {object} $scope.model.screeningDate - property of $scope.model used for screeningDate.
   * @property {object} $scope.model.screeningDateString - property of $scope.model used for screeningDateString.
   * @property {object} $scope.model.IsEscoPatientExempt - property of $scope.model used for esco patient checkbox.
   * @property {object} $scope.model.IsEscoPatientExemptDisabled - property of $scope.model used for disabling esco patient checkbox.
   * @property {object} $scope.model.IsPatientRefused - property of $scope.model used for patient refused checkbox.
   * @property {object} $scope.model.IsPatientRefusedDisabled - property of $scope.model used for disabling patient refused checkbox.
   * @property {object} $scope.model.IsCaregiverSurveyRequired - property of $scope.model used for caregiver survery required checkbox.
   * @property {object} $scope.model.IsCaregiverSurveyRequiredDisabled - property of $scope.model used for disabling caregiver survery required checkbox.
   * @property {object} $scope.model.IsPatientMedicallyUnableToComplete - property of $scope.model used for Patient Medically Unable To Complete Screening required checkbox.
   * @property {object} $scope.model.IsPatientMedicallyUnableToCompleteDisabled - property of $scope.model used for disabling Patient Medically Unable To Complete Screening checkbox.


   * @property {object} $scope.Buttons - property of $scope used for Buttons.
   * @property {boolean} $scope.Buttons.AddButtonVisible - if true, will display the add button, if false the add button will be hidden.
   * @property {boolean} $scope.Buttons.PostponeButtonVisible - if true, will display the postpone button,else hidden.
   * @property {boolean} $scope.Buttons.SaveButtonVisible - if true, will display the Save button, else hidden.
   * @property {boolean} $scope.Buttons.CancelButtonVisible - if true will display the Cancel button, else hidden.
   * @property {boolean} $scope.CanAddSurvey - if true will display the add button after survey completion.
   * @property {boolean} $scope.IsAddingSurvey - if true will add new survey.
   * @property {boolean} $scope.hasChanges - set to true if there are changes in the survey.
   * @property {boolean} $scope.IsDepressionScreening - set to true if the current screen is Depression screening otherwise set to false.
   * @property {string}  $scope.model.surveyType - Sets the survey type.
   * @property {boolean} $scope.model.IsPainAssessmentScreening - set to true, if the current screen is Pain Assessment Screening, otherwise false.
   * @property {boolean} $scope.model.IsESRDTreatmentOptionsScreening - set to true, if the current screen is ESRD Treatment Options Screening, otherwise false.
    * @property {boolean} $scope.model.IsPAMScreening - set to true, if the current screen is PAM Screening, otherwise false.
   * @property {boolean} $scope.model.IsAdl - set to true, if the current screen is ADL SCREENING, otherwise false.
   * @property {boolean} $scope.disableScreeingDate - if true will disable the screening date, otherwise will enable it.
   * @property {array} $scope.model.disabledDates - List of dates in parsed format.
   * @property {Date} $scope.model.screeningDate - Screening date on date picker.
   * @property {Date} $scope.model.screeningMinDate - Minimum date displayed on date picker.
   * @property {Date} $scope.model.screeningMaxDate - Maximum date displayed on date picker.
   * @property {Date} $scope.model.prevSurveyDates - Date of last completed screening.
   * @property {string} $scope.PathwayScreenTitle - Display Header for respective screening.
   * @property {boolean} $scope.ShowToolTip - If true, tooltip will be displayed based on response to a question , otherwise false.
   * @property {boolean} $scope.CanPostponeSurvey - set to true if survey is postponed, otherwise false.
   * @property {string} $scope.ToolTip - Display Tool tip based on the response to a question.

   */
	angular.module('roundingModule')
        .controller('AllScreeningsController', function ($rootScope, $scope, $timeout, AllScreeningsService, ComorbidsService, CommonConstants,
                            Status, ExceptionService, CommonFunctions, CommonMessages, ScreenConstants, ScreeningsSurveyTypes,
                            SurveyStatusCode, DepressionScreeningConstants, PatientDetailsService, PtExmptComorbidConstant) {

        	$scope.model = {
        		screeningDate: null,
        		screeningDateString: null,
        		SurveyDetails: [],
        		IsPatientRefused: false,
				IsPatientRefusedDisabled: false,
        		IsCaregiverSurveyRequired: false,
				IsCaregiverSurveyRequiredDisabled: false,
        		IsActiveComorbid: false,
        		IsSaveButtonDisabled: false,
        		IsPatientMedicallyUnableToComplete: false,
				IsPatientMedicallyUnableToCompleteDisabled: false,
        		IsFreeFormResponseNull: false,
        		IsTextBoxDisabled: false,
				IsAddButtonClicked: false,
				IsPostponeButtonClicked: false,
				IsHeaderCheckboxChanged: false,
                IsReadyForUpdate: false,
				CheckBoxName: null,
				HeaderLabels: []
        	}
        	$scope.model.SurveyDetails = new kendo.data.DataSource({ data: [] });
        	$scope.Buttons = { "AddButtonVisible": false, "PostponeButtonVisible": false, "SaveButtonVisible": false, "CancelButtonVisible": false };

        	//Task TK-30654 
        	var q1No = false;
        	var q2No = false;
        	var q3No = false;

        	var onPatientComorbidsRetrieved = [];
        	var ActiveComorbidList = [];

        	var getComorbids = function () {
        	    var data = $.param({ '': $rootScope.Global.Objects.SelectedPatient.UID });
        	    ComorbidsService.GetPatientComorbids(data, onPatientComorbidsRetrieved);
        	};

        	onPatientComorbidsRetrieved = function (result) {
        	    angular.forEach(result.data, function (comorbidList) {
        	        if (comorbidList.Status === Status.AccessStatus.Active) {
        	            ActiveComorbidList.push(comorbidList);
        	        }
        	    });
        	    checkforDepressionComorbids(ActiveComorbidList);
        	}
        	var checkforDepressionComorbids = function (ComorbidList) {
        	    angular.forEach(ComorbidList, function (comorbid) {
        	        if (comorbid.ComorbidCode === PtExmptComorbidConstant.BD || comorbid.ComorbidCode === PtExmptComorbidConstant.DEPMC || comorbid.ComorbidCode === PtExmptComorbidConstant.DEPDPD) {
        	            $scope.model.IsActiveComorbid = true;
        	        }
        	    });
        	}

        	/**
            * @ngdoc function
            * @name $scope.bindScreeningDatePicker
            * @methodOf roundingModule.controller:AllScreeningsController
            * @description 
            ** Populate date picker control with pre-defined values.
            ** Sets datepicker's min/max values.
            ** Handles change and/or open event.
            */
        	$scope.bindScreeningDatePicker = function () {
        		try {
        			$scope.monthPickerConfig = {
        				value: $scope.model.screeningDate.format('mm/dd/yyyy'),
        				dates: $scope.model.disabledDates,
        				month: {
        					content: '<div class="enabledDay"> #= data.value # </div>'
        				},
        				min: new Date($scope.model.screeningMinDate),
        				max: new Date($scope.model.screeningMaxDate),
        				change: function () {
        					$scope.model.screeningDate = this.value();
        				    //Commented for D-04192 : HKP: 4/19/2016: checked with BA no need to display changes lost popup when date is changed (similar to CPP)
        					//$scope.hasChanges = true;
        					//CommonFunctions.UIChanged();
        				},
        				open: function () {
							disableDates();
        				    //$("#screening-datepicker_dateview .k-header .k-link").off("click");
        				    //$("#screening-datepicker_dateview .k-header .k-link").on("click", function (e) {
        				    //    disableDates();
        				    //});
        				}
        			};

        			if ($scope.model.SurveyDetail.UID == 0) {
        				$scope.disableScreeingDate = false;
        			} else {
        				$scope.disableScreeingDate = true;
        			}        			
        		} catch (ex) {
        			var errExp = {};
        			errExp.Exception = ex;
        			errExp.ModuleName = "AllScreenings";
        			errExp.FunctionName = "bindScreeningDatePicker";
        			errExp.StackTrace = printStackTrace({ e: ex });
        			ExceptionService.LogException(CommonFunctions.HandleException(errExp));
        		}
        	}

        	/**
            * @ngdoc function
            * @name openLink
            * @methodOf roundingModule.controller:AllScreeningsController
            * @description 
            ** Opens a link for kindney smart.
            */
        	$scope.openLink = function () {
        		$timeout(function () {
        			var mywin = window.open('http://www.kidneysupportivecare.org/Home.aspx', '_blank', 'location=yes')
        		}, 0, true);
        	}

        	/**
            * @ngdoc function
            * @name clearResponses
            * @methodOf roundingModule.controller:AllScreeningsController
            * @description 
            ** Clear the survey question's responses.
            */
        	$scope.clearResponses = function () {
        		try {
        			$scope.model.SurveyDetails.data().forEach(function (surveyDetail) {
        				surveyDetail.QuestionGroups.forEach(function (questionGroup) {
        					questionGroup.Questions.forEach(function (question) {
        						question.Options.forEach(function (option) {
									option.FreeFormResponse = null;
        							if (option.IsSelected) {
        								option.IsSelected = false;
										question.SelectedIndex = -1;
        							}
        						});
        					});
        				});
        			});

        		} catch (ex) {
        			var errExp = {};
        			errExp.Exception = ex;
        			errExp.ModuleName = "AllScreening";
        			errExp.FunctionName = "clearResponses";
        			errExp.StackTrace = printStackTrace({ e: ex });
        			ExceptionService.LogException(CommonFunctions.HandleException(errExp));
        		}
        	}

        	/**
            * @ngdoc event
            * @name cgChanged
            * @eventOf roundingModule.controller:AllScreeningsController
            * @description 
            ** ng-click event of caregiversurveyrequired checkbox.
            ** Changes UI behavior on depression screening.
            ** Calls $scope.clearResponses if caregiversurveyrequired checkbox is checked.
            ** Makes save button visible and hides postpone button if checkbox is checked.
            ** Makes postpone button visible and hides save button if checkbox is unchecked.
            */
        	$scope.cgChanged = function () {
        	    try {
					$scope.hasChanges = false;
					if($scope.model.IsReadyForUpdate) {
						$scope.model.IsHeaderCheckboxChanged = true;
					}	

        		    if ($scope.model.IsCaregiverSurveyRequired) {
						if ($scope.model.IsPatientRefused) {
							$scope.model.IsPatientRefused = false;
							$scope.model.IsPatientRefusedDisabled = true;
						}
						if($scope.model.CheckBoxName === "IsCaregiverSurveyRequired") {
							$scope.model.IsHeaderCheckboxChanged = false;
						}
							
        	            $timeout(function () {
        	                CommonFunctions.CheckUIChange($scope.onOK, $scope.onCancel, CommonMessages.Alert.ChangesLost);
        	            }, 100, true);
        	        }
        	        else {
        	            $scope.checkBoxUnchecked();
        	        }
        	    }
        	    catch (ex) {
        	        var errExp = {};
        	        errExp.Exception = ex;
        	        errExp.ModuleName = "AllScreening";
        	        errExp.FunctionName = "cgChanged";
        	        errExp.StackTrace = printStackTrace({ e: ex });
        	        ExceptionService.LogException(CommonFunctions.HandleException(errExp));
        	    }
        	}

            /**
            * @ngdoc event
            * @name onOK
            * @eventOf roundingModule.controller:AllScreeningsController
            * @description 
            ** OK button click event for changes lost popup to reset all checkboxes and survey responses.
            */
        	$scope.onOK = function () {
        	    $timeout(function () {
        	        $scope.clearResponses();
        	        $(".crd-ptchart-pthwy-question-radio").prop("checked", false);
        	        $(".crd-ptchart-pthwy-question-radio").prop("disabled", true);
        	        $scope.Buttons.PostponeButtonVisible = $scope.model && $scope.model.SurveyDetails && $scope.model.SurveyDetails.data()[0] && $scope.model.SurveyDetails.data()[0].SurveyStatusCode === SurveyStatusCode.Completed ? false : true;
        	        $scope.Buttons.SaveButtonVisible = $scope.model && $scope.model.SurveyDetails && $scope.model.SurveyDetails.data()[0] && $scope.model.SurveyDetails.data()[0].SurveyStatusCode === SurveyStatusCode.Completed ? false : true;

        	        if ($scope.model.IsPatientRefused) {
        	            $scope.model.IsCaregiverSurveyRequiredDisabled = true;
        	            $scope.model.IsPatientMedicallyUnableToCompleteDisabled = true;
        	            q1No = false; q2No = false; q3No = false;
        	        }
        	        else if ($scope.model.IsCaregiverSurveyRequired) {
        	            $scope.model.IsPatientRefusedDisabled = true;
        	            $scope.model.IsPatientMedicallyUnableToCompleteDisabled = true;
        	        }
        	        else if ($scope.model.IsPatientMedicallyUnableToComplete) {
        	            $scope.model.IsPatientRefusedDisabled = true;
        	            $scope.model.IsCaregiverSurveyRequiredDisabled = true;
        	        
        	        }
        	    }, 100, true);
        	}

            /**
            * @ngdoc event
            * @name onCancel
            * @eventOf roundingModule.controller:AllScreeningsController
            * @description 
            ** Cancel button click event for changes lost popup to reset selected checkbox - no change in survey response - remains same includeing save and postpone button
            */
        	$scope.onCancel = function () {
        	    $timeout(function () {
        	        $scope.model.IsPatientMedicallyUnableToComplete = false;
        	        $scope.model.IsPatientRefused = false;
        	        $scope.model.IsCaregiverSurveyRequired = false;

        	        $scope.model.IsPatientMedicallyUnableToCompleteDisabled = false;
        	        $scope.model.IsPatientRefusedDisabled = false;
        	        $scope.model.IsCaregiverSurveyRequiredDisabled = false;
        	    }, 100, true);
        	}

            /**
            * @ngdoc event
            * @name checkBoxUnchecked
            * @eventOf roundingModule.controller:AllScreeningsController
            * @description 
            ** Refactored code for checkbox uncheck events Caregiver Survey, Patient Refused and Patient Medically Unable to Complete
            */
            $scope.checkBoxUnchecked = function () {
                $timeout(function () {
        	        $(".crd-ptchart-pthwy-question-radio").prop("disabled", false);

        	        $scope.model.IsPatientMedicallyUnableToComplete = false;
        	        $scope.model.IsPatientRefused = false;
        	        $scope.model.IsCaregiverSurveyRequired = false;

        	        $scope.model.IsPatientMedicallyUnableToCompleteDisabled = false;
        	        $scope.model.IsPatientRefusedDisabled = false;
        	        $scope.model.IsCaregiverSurveyRequiredDisabled = false;

        	        $scope.Buttons.PostponeButtonVisible = false;
        	        $scope.Buttons.SaveButtonVisible = false;
        	    }, 100, true);
        	}

        	/**
            * @ngdoc event
            * @name ptRefused
            * @eventOf roundingModule.controller:AllScreeningsController
            * @description 
            ** ng-click event of patientrefusedsurvey checkbox.
            ** Changes UI behavior on depression screening.
            ** Calls $scope.clearResponses if caregiversurveyrequired checkbox is checked.
            ** Makes save button visible and hides postpone button if checkbox is checked.
            ** Makes postpone button visible and hides save button if checkbox is unchecked.
            */
        	$scope.ptRefused = function () {
        	    try {

					$scope.hasChanges = false;
					if($scope.model.IsReadyForUpdate) {
						$scope.model.IsHeaderCheckboxChanged = true;
					}	
                    
        		    if ($scope.model.IsPatientRefused) {
						if($scope.model.IsPatientMedicallyUnableToComplete) {
							$scope.model.IsPatientMedicallyUnableToComplete = false;
							$scope.model.IsPatientMedicallyUnableToCompleteDisabled = true;
						}
						if($scope.model.CheckBoxName === "IsPatientRefused") {
							$scope.model.IsHeaderCheckboxChanged = false;
						}
					    $timeout(function () {
        		            CommonFunctions.CheckUIChange($scope.onOK, $scope.onCancel, CommonMessages.Alert.ChangesLost);
        		        }, 100, true);
        			}
        		    else {
        		        $scope.checkBoxUnchecked();
        		    }
        		} catch (ex) {
        			var errExp = {};
        			errExp.Exception = ex;
        			errExp.ModuleName = "AllScreening";
        			errExp.FunctionName = "ptRefused";
        			errExp.StackTrace = printStackTrace({ e: ex });
        			ExceptionService.LogException(CommonFunctions.HandleException(errExp));
        		}
        	}

            /**
            * @ngdoc event
            * @name ptMedicallyUnableToCompleteChanged
            * @eventOf roundingModule.controller:AllScreeningsController
            * @description 
            ** ng-click event of patientrefusedsurvey checkbox.
            ** Changes UI behavior on depression screening.
            ** Calls $scope.clearResponses if caregiversurveyrequired checkbox is checked.
            ** Makes save button visible and hides postpone button if checkbox is checked.
            ** Makes postpone button visible and hides save button if checkbox is unchecked.
            */
        	$scope.ptMedicallyUnableToCompleteChanged = function () {
        	    try {
					$scope.hasChanges = false;
					if($scope.model.IsReadyForUpdate) {
						$scope.model.IsHeaderCheckboxChanged = true;
					}	
	                
        	        if ($scope.model.IsPatientMedicallyUnableToComplete) {
						if ($scope.model.IsPatientRefused) {
							$scope.model.IsPatientRefused = false;
							$scope.model.IsPatientRefusedDisabled = true;
						}
						
						if($scope.model.CheckBoxName === "IsPatientMedicallyUnableToComplete") {
							$scope.model.IsHeaderCheckboxChanged = false;
						}
						 
        	            $timeout(function () {
        	                CommonFunctions.CheckUIChange($scope.onOK, $scope.onCancel, CommonMessages.Alert.ChangesLost);
        	            }, 100, true);
        	        }
        	        else {
        	            $scope.allScreeningsValidator.hideMessages();
        	            $scope.checkBoxUnchecked();
        	        }
        	    }
        	    catch (ex) {
        	        var errExp = {};
        	        errExp.Exception = ex;
        	        errExp.ModuleName = "AllScreening";
        	        errExp.FunctionName = "ptMedicallyUnableToCompleteChanged";
        	        errExp.StackTrace = printStackTrace({ e: ex });
        	        ExceptionService.LogException(CommonFunctions.HandleException(errExp));
        	    }
        	};

        	/**
            * @ngdoc function 
            * @name bindSurveyDetails
            * @methodOf roundingModule.controller:AllScreeningsController  
            * @description       
            ** Set survey details properties.   
            ** Set default values for screenings.
            * @param {object} surveyDetails
            * Survey Details
            * @param {string} survey
            * Flag for surveys
            */
        	$scope.bindSurveyDetails = function (surveyDetails, survey) {
        	    try {
        	        var isOptionDisabled = { "IsOptionDisabled": false }
        	        var isRadioGroupDisabled = { "IsRadioGroupDisabled": false }
        	        var questionOrder = { "QuestionOrder": 0 }
        	        var selectedIndex = { "SelectedIndex": 0 };
        	        var switchOption = { "SwitchOption": false };
        	        var colorClasses = ["brown", "orange", "yellow", "green", "blue"];
        	        var optionDescriptions = [];
        	        var hasChanges = { "HasChanges": false };

        	        $scope.ShowToolTip = false;
        			
        	        $scope.model.HeaderLabels = [];
        	        var elBackgroundClases = ["box-brown", "box-orange", "box-yellow", "box-green", "box-blue"];


        	        // Defect D-03120 Rounding: Depression Screening: Static Text is not displayed on UI
        	        if (surveyDetails[0].Tooltip !== null && surveyDetails[0].Tooltip !== undefined) {
        	            $scope.ShowToolTip = true;
        	            $scope.ToolTip = surveyDetails[0].Tooltip;
        	        }
        	        var PatientRefusedChecked = false;
        	        var CareGiverChecked = false;
        	        var PtMedicallyUnableChecked = false;

        	        $scope.IsDepressionScreening = false;
        	        $scope.IsCognitiveScreening = false;
        	        $scope.IsPAMScreening = false;
        	        $scope.Buttons.SaveButtonVisible = false;

        	        if (surveyDetails[0].SurveyTypeCode === ScreeningsSurveyTypes.Depression) {
        	            $.extend(surveyDetails[0], PatientRefusedChecked);
        	            $scope.IsDepressionScreening = true;

        	            //Remove Q14 - endofsurvey from UI
        	            var endOfSurveyQuestion = surveyDetails[0].QuestionGroups[surveyDetails[0].QuestionGroups.length - 1].Questions[surveyDetails[0].QuestionGroups[surveyDetails[0].QuestionGroups.length - 1].Questions.length - 1];
        	            if (endOfSurveyQuestion != null && endOfSurveyQuestion != undefined && endOfSurveyQuestion.Text == DepressionScreeningConstants.EndSurvey) {
        	                surveyDetails[0].QuestionGroups[surveyDetails[0].QuestionGroups.length - 1].Questions.splice($.inArray(endOfSurveyQuestion, surveyDetails[0].QuestionGroups[surveyDetails[0].QuestionGroups.length - 1].Questions), 1);
        	            }
        	        }
        	        else if (surveyDetails[0].SurveyTypeCode === ScreeningsSurveyTypes.Cognitive) {
        	            $scope.IsCognitiveScreening = true;
						
        	            $.extend(surveyDetails[0], PatientRefusedChecked);
        	            $.extend(surveyDetails[0], PtMedicallyUnableChecked);
        	        }
        	        else if (surveyDetails[0].SurveyTypeCode === ScreeningsSurveyTypes.PAM) {
        	            $scope.IsPAMScreening = true;
        	            $.extend(surveyDetails[0], PatientRefusedChecked);
        	            $.extend(surveyDetails[0], CareGiverChecked);
        	            var len = surveyDetails[0].QuestionGroups[0].Questions[0].Options.length;
												
        	            for(var i = 0; i < len; i++) {
        	                var hLabel = {
        	                    className: elBackgroundClases[i], 
        	                    text: surveyDetails[0].QuestionGroups[0].Questions[0].Options[i].Description
        	                }
        	                $scope.model.HeaderLabels.push(hLabel);
        	                optionDescriptions.push(hLabel.text);
        	            }
        	        }

        	        //Adding for RefusalReason check - pending mode checkbox not selected
        	        switch(surveyDetails[0].RefusalReasonCode){
        	            case CommonConstants.SurveyRefusalReasonCode.PatientRefused:
        	                $scope.model.IsPatientRefused = true;
        	                $scope.model.CheckBoxName = "IsPatientRefused";
        	                $timeout(function () {
        	                    CommonFunctions.CheckUIChange($scope.onOK, $scope.onCancel, CommonMessages.Alert.ChangesLost);
        	                }, 100, true);
        	                break;
        	            case CommonConstants.SurveyRefusalReasonCode.CaregiverSurveyRequired:
        	                $scope.model.IsCaregiverSurveyRequired = true;
        	                $scope.model.CheckBoxName = "IsCaregiverSurveyRequired";
        	                $timeout(function () {
        	                    CommonFunctions.CheckUIChange($scope.onOK, $scope.onCancel, CommonMessages.Alert.ChangesLost);
        	                }, 100, true);
        	                break;
        	            case CommonConstants.SurveyRefusalReasonCode.PatientMedicallyUnableToComplete:
        	                $scope.model.IsPatientMedicallyUnableToComplete = true;
        	                $scope.model.CheckBoxName = "IsPatientMedicallyUnableToComplete";
        	                if (!$scope.IsDepressionScreening) {
        	                    $timeout(function () {
        	                        CommonFunctions.CheckUIChange($scope.onOK, $scope.onCancel, CommonMessages.Alert.ChangesLost);
        	                    }, 100, true);
        	                }
							
        	                break;
        	            default:
        	                $scope.model.IsPatientRefused = false;
        	                $scope.model.IsCaregiverSurveyRequired = false;
        	                $scope.model.IsPatientMedicallyUnableToComplete = false;
        	                //$scope.model.IsEscoPatientExempt = false;

        	                $scope.model.IsPatientRefusedDisabled = false;
        	                $scope.model.IsCaregiverSurveyRequiredDisabled = false;
        	                $scope.model.IsPatientMedicallyUnableToCompleteDisabled = false;
        	                //$scope.model.IsEscoPatientExemptDisabled = false;
        	                $scope.model.CheckBoxName = null;
        	                break;
        	        }
					
        	        if(!$scope.model.IsReadyForUpdate) {
        	            $scope.model.IsReadyForUpdate = true;
        	        }
        			
        	        if (surveyDetails[0].SurveyStatusCode === SurveyStatusCode.Completed) {
        	            isOptionDisabled.IsOptionDisabled = true;
        	            isRadioGroupDisabled.IsRadioGroupDisabled = true;
        	            $(".crd-ptchart-pthwy-question-radio").prop("disabled", true);
        	            $scope.Buttons.AddButtonVisible = true;
        	            $scope.Buttons.PostponeButtonVisible = false;
        	            $scope.Buttons.SaveButtonVisible = false;
        	            $scope.Buttons.CancelButtonVisible = false;
        	            $scope.model.IsTextBoxDisabled = true;
        	        }
        	        else if (surveyDetails[0].SurveyStatusCode === SurveyStatusCode.Pending) {
        	            // D-04061 : PROD: Rounding - Save button disables when Screening/survey is completed and click postpone
        	            // $scope.Buttons.SaveButtonVisible = false;
        	            $scope.model.IsTextBoxDisabled = false;
        	        }

        	        var questionCnt = 0, answerRespcnt = 0;

        	        $.each(surveyDetails, function (key1, surveyDetail) {
        	            if (surveyDetail.QuestionGroups != null) {
        	                $.each(surveyDetail.QuestionGroups, function (key2, questionGroup) {
        	                    if (questionGroup != null) {
        	                        $.each(questionGroup.Questions, function (key3, question) {
        	                            if (question != null) {
        	                                $.extend(question, hasChanges);
        	                                if (!question.IsMultiple) {
        	                                    $.extend(question, isRadioGroupDisabled);
        	                                }
        	                                if (question.ToolTip != null) {
        	                                    question.ToolTip = question.ToolTip.replace(/'/g, "&quot;");
        	                                }

        	                                questionOrder.QuestionOrder = question.Order; //Set QuestionOrder at Option level to display for skip logic

        	                                ++questionCnt;

        	                                var optionsArray = [];
        	                                var indx = -1;

        	                                $.each(question.Options, function (key4, option) {
        	                                    var isOptionTextHidden = { "IsOptionTextHidden": false };
        	                                    var isOptionTextAlreadyShown = { "isOptionTextAlreadyShown": false };
        	                                    if (option.IsSelected) {

        	                                        ++answerRespcnt;

        	                                        question.SelectedIndex = option.OptionOrder; //set index manually
        	                                        selectedIndex.SelectedIndex = option.OptionOrder;
        	                                        switchOption.SwitchOption = true;
        	                                        $.extend(option, selectedIndex);
        	                                        if (surveyDetails[0].SurveyTypeCode === ScreeningsSurveyTypes.Depression) {
        	                                            if ($scope.DepressionScreeningNewSurvey == true) {
        	                                                if (question.Order === 1) {
        	                                                    option.Description === "No" ? q1No = true : q1No = false;
        	                                                }
        	                                                else if (question.Order === 2) {
        	                                                    option.Description === "No" ? q2No = true : q2No = false;
        	                                                }
        	                                                else if (question.Order === 3) {
        	                                                    option.Description === "No" ? q3No = true : q3No = false;
        	                                                }
        	                                            } else {
        	                                                if (question.Order === 1) {
        	                                                    option.Description === "No" ? q1No = true : q1No = false;
        	                                                    depressionScreeningQ1Res = option.Description;
        	                                                }
        	                                                else if (question.Order === 2) {
        	                                                    option.Description === "No" ? q3No = true : q3No = false;
        	                                                    depressionScreeningQ3Res = option.Description;
        	                                                } else if (question.Order === 3) {
        	                                                    option.Description === "No" ? q4No = true : q4No = false;
        	                                                    option.Description === "No" ? depressionScreeningQ4 = true : depressionScreeningQ4 = false;
        	                                                    depressionScreeningQ4Res = option.Description;
        	                                                }
        	                                            }
        	                                        }
        	                                    }

        	                                    $.extend(option, isOptionDisabled);
        	                                    $.extend(option, questionOrder);
        	                                    $.extend(option, switchOption);

        	                                    //*** MR hide duplicate option Text
        	                                    if (question.IsMultiple) {
        	                                        if ((option.DisplayText)) {
        	                                            var willDisplayed = true;
        	                                            if (indx > -1) {
        	                                                for (var i = 0; i < optionsArray.length; i++) {
        	                                                    if (option.DisplayText === optionsArray[i]) {
        	                                                        willDisplayed = false;
        	                                                        break;
        	                                                    }
        	                                                }
        	                                            }
        	                                            if (willDisplayed) {
        	                                                indx++;
        	                                                optionsArray[indx] = option.DisplayText;
        	                                                isOptionTextHidden.IsOptionTextHidden = !option.IsSelected;

        	                                            } else {
        	                                                isOptionTextHidden.IsOptionTextHidden = true;
        	                                            }
        	                                            //isOptionTextHidden.IsOptionTextHidden = false;
        	                                        } else {
        	                                            isOptionTextHidden.IsOptionTextHidden = true;
        	                                        }
        	                                    }
        	                                    //*** MR END duplicate option Text
        	                                    $.extend(option, isOptionTextHidden);
        	                                    $.extend(option, isOptionTextAlreadyShown);

        	                                    if (surveyDetails[0].SurveyTypeCode === ScreeningsSurveyTypes.PAM) {
        	                                        var indx = optionDescriptions.indexOf(option.Description);
        	                                        option.ColorClass = colorClasses[indx];
        	                                    }
        	                                });
        	                            }
        	                        });
        	                    }
        	                });
        	            }
        	        });

        	        $scope.model.SurveyDetails.data(surveyDetails);

        	        $timeout(function () {        			   
        	            if ($scope.IsDepressionScreening) {
        	                $scope.DepressionScreeningNewSurvey = false;
        	                var DepressionScreeningNoOfQuesCnt = 12;
        	                if (surveyDetails[0].QuestionGroups[0].Questions[1].Text == DepressionScreeningConstants.Survey_Comments_Question) {
        	                    $scope.DepressionScreeningNewSurvey = true;
        	                    DepressionScreeningNoOfQuesCnt = 13;
        	                }
        	                if (surveyDetails[0].SurveyStatusCode === SurveyStatusCode.Completed) {
        	                    $(".crd-ptchart-pthwy-question-radio").prop("disabled", true);
        	                }
        	                else if (surveyDetails[0].UID > 0) {
        	                    var selQuestions = jQuery.grep(surveyDetails[0].QuestionGroups[0].Questions, function (value) {
        	                        return value.SelectedIndex > -1;
        	                    });

        	                    if (selQuestions && selQuestions.length > 0 && selQuestions[0].Options[0].IsSelected) {
        	                        for (var j = 1; j <= DepressionScreeningNoOfQuesCnt; j++) {
        	                            var optname = (surveyDetails[0].QuestionGroups[0].Questions[j].UID);
        	                            var elements = $(document.getElementsByName(optname));
        	                            if (elements != null && elements != undefined && questionOrder == 2 && $scope.DepressionScreeningNewSurvey) {
        	                                elements.prop("disabled", false);
        	                            }else if(elements != null && elements != undefined) {
        	                                elements.prop("disabled", true);
        	                            }
        	                        }
        	                        $scope.Buttons.SaveButtonVisible = true;
        	                        /*-- Updated Logic for Postpone when the user click No or NA as a response to Question 1 -- */
        	                    } else if (selQuestions && selQuestions.length > 0 && selQuestions[0].Options[1].IsSelected || selQuestions[0].Options[2].IsSelected) {
        	                        for (var j = 1; j <= DepressionScreeningNoOfQuesCnt; j++) {
        	                            optname = (surveyDetails[0].QuestionGroups[0].Questions[j].UID);
        	                            questionOrder = (surveyDetails[0].QuestionGroups[0].Questions[j].Order)
        	                            elements = $(document.getElementsByName(optname));
        	                            if($scope.DepressionScreeningNewSurvey == true){
        	                                if (elements != null && elements != undefined && questionOrder == 2 && $scope.DepressionScreeningNewSurvey) {
        	                                    elements.prop("disabled", true);
        	                                } else if (elements != null && elements != undefined) {
        	                                    elements.prop("disabled", false);
        	                                }
        	                            }
        	                        }
        	                        $scope.Buttons.SaveButtonVisible = true;
        	                    } else {
        	                        for (var j = 10; j <= DepressionScreeningNoOfQuesCnt; j++) {
        	                            optname = (surveyDetails[0].QuestionGroups[0].Questions[j].UID);
        	                            elements = $(document.getElementsByName(optname));
        	                            if (elements != null && elements != undefined) {
        	                                elements.prop("disabled", false);
        	                            }
        	                        }

        	                        if (selQuestions != null && selQuestions != undefined && selQuestions.length > 0) {
        	                            var lastQuestionAnswered = selQuestions[selQuestions.length - 1];
        	                            for (var i = 0; i < selQuestions.length; i++) {
        	                                var optname = (selQuestions[i].UID);
        	                                var elements = $(document.getElementsByName(optname));
        	                                if (elements != null && elements != undefined) {
        	                                    elements.prop("disabled", false);
        	                                }
        	                            }

        	                            $scope.Buttons.SaveButtonVisible = $scope.canSaveDepressionScreening(surveyDetails[0].QuestionGroups[0].Questions, lastQuestionAnswered);
        	                            //$scope.canSaveDepressionScreening(surveyDetails[0].QuestionGroups[0].Questions, lastQuestionAnswered);
        	                            //found this issue while working on task TK-30654 and fixed it as above
        	                        }
        	                    }
        	                } else {
        	                    $.each(surveyDetails[0].QuestionGroups, function (keyQueGroup, qGroup) {
        	                        if (qGroup.Questions != null && qGroup.Questions != undefined && qGroup.Questions.length > 0) {
        	                            $.each(qGroup.Questions, function (keyQue, question) {
        	                                if (keyQue == 0 || keyQue == 10 || keyQue == 11 || keyQue == 12) {
        	                                    var optname = (question.UID);
        	                                    var elements = $(document.getElementsByName(optname));
        	                                    if (elements != null && elements != undefined) {
        	                                        elements.prop("disabled", false);
        	                                    }

        	                                    $.each(question.Options, function (key4, option) {
        	                                        option.IsOptionDisabled = false;
        	                                    });
        	                                } else {
        	                                    $.each(question.Options, function (key4, option) {
        	                                        option.IsOptionDisabled = true;
        	                                    });
        	                                }
        	                            });
        	                        }
        	                    });
        	                }
        	            }
        	        }, 0);

        	        if (surveyDetails[0].SurveyStatusCode === SurveyStatusCode.Completed) {
        	            $scope.CanAddSurvey = true;
        	            $scope.IsAddingSurvey = false;
        	            $scope.hasChanges = false;
        	            $scope.freeFormHasChanges = false;
        	            $scope.Buttons.PostponeButtonVisible = false;
        	            $scope.Buttons.SaveButtonVisible = false;
        	            $scope.Buttons.CancelButtonVisible = false;
        	        } else {
        	            $scope.bindScreeningDatePicker();
        	            $scope.IsAddingSurvey = true;
        	            $scope.Buttons.AddButtonVisible = false;
        	            $scope.Buttons.CancelButtonVisible = true;
        	            $scope.CanAddSurvey = false;
        	            if (surveyDetails[0].UID == 0) {
        	                $scope.CanPostPoneSurvey = false;
        	                $scope.Buttons.PostponeButtonVisible = false;
        	            } else {
        	                $scope.CanPostPoneSurvey = true;
        	                $scope.Buttons.PostponeButtonVisible = true;

        	                if (questionCnt == answerRespcnt)
        	                    $scope.Buttons.SaveButtonVisible = true;

        	            }
        	        }

        	        //Set dynamic height due to scrollbar issue
        	        $timeout(function () {
        	            //var hgt = $rootScope.Global.Objects.DeviceHeight - ($("#ptchart-allscreenings-surveyheaders").height() + 130);
        	            //$("#screening-scroller").css({ "height": hgt.toString() + "px" });

        	            // Alternate Solution to Scroller Issue
        	            var hgt = $("allscreenings-listview").height();
        	            $("#screening-scroller").css({ "height": hgt + "px" });
        	            CommonFunctions.CreateScroller("screening-scroller");

        	            //Depression Screening logic  
        	            var SaveButtonVisibleStatus = false;
        	            if ($scope.IsDepressionScreening) {
        	                if (depressionScreeningQ1Res == 'Yes') {
        	                    if (surveyDetails[0].UID != 0 && $scope.Buttons.PostponeButtonVisible) {
        	                        enableQuestions();
        	                    }
        	                    if ($scope.DepressionScreeningNewSurvey == true) {
        	                        if (depressionScreeningQ2Res.length > 0) {
        	                            SaveButtonVisibleStatus = true;
        	                        } else {
        	                            $scope.Buttons.SaveButtonVisible = false;
        	                        }
        	                    } else {
        	                        SaveButtonVisibleStatus = true;
        	                    }
        	                } 
        	            } else if (depressionScreeningQ1Res == 'No') {
        	                if (depressionScreeningQ3Res == 'No') {
        	                    if (depressionScreeningQ4Res == 'No') {
        	                        SaveButtonVisibleStatus = true;
        	                        disableQuestions();
        	                        if (surveyDetails[0].UID != 0 && $scope.Buttons.PostponeButtonVisible) {
        	                            $scope.Buttons.SaveButtonVisible = true;
        	                        }
        	                    }
						
        	                    if(surveyDetails[0].SurveyStatusCode === SurveyStatusCode.Pending) {
        	                        if($scope.model.IsAddButtonClicked || !$scope.disableScreeingDate) {
        	                            $scope.model.IsAddButtonClicked = false;
        	                            $("#screening-datepicker").data("kendoDatePicker").value($scope.model.screeningDate.format('mm/dd/yyyy'));
        	                        } else {
        	                            var startDate = CommonFunctions.DateFunctions.parseDate(surveyDetails[0].StartDate).format("mm/dd/yyyy");
        	                            // *** MR Round-134 fix
        	                            $("#screening-datepicker").data("kendoDatePicker").min(startDate);	
        	                            $("#screening-datepicker").data("kendoDatePicker").max(startDate);
        	                            $("#screening-datepicker").data("kendoDatePicker").value(startDate);
        	                        } 
        	                    }
        	                }
        	            }
        	        },500);
					
        	    }catch (ex) {
        			var errExp = {};
        			errExp.Exception = ex;
        			errExp.ModuleName = "PathwaysTab";
        			errExp.FunctionName = "bindSurveyDetails";
        			errExp.StackTrace = printStackTrace({ e: ex });
        			ExceptionService.LogException(CommonFunctions.HandleException(errExp));
        		}
        	}
			
			disableDates = function () {
				
				if($(".x-added").length > 0) {
					removeDisableDates();
				}
				
			    $(".enabledDay").each(function (i, el) {
			        for (var i = 0; i < $scope.model.prevSurveyDates.length; i++) {
			            var disabledate = ($scope.model.prevSurveyDates[i]).slice(0, 10);
			            var tdate = new Date(($(el).parent()).attr('title'));
			            var curr_date = ("0" + (tdate.getDate())).slice(-2);
			            var curr_month = ("0" + (tdate.getMonth() + 1)).slice(-2);
			            var curr_year = tdate.getFullYear();
			            var dtpkdate = curr_year + "-" + curr_month + "-" + curr_date;
			            if (dtpkdate === disabledate) {
							$(el).addClass('x-added'); //**** MR mark for future remove it
							$(el).attr('data-num', $(el).text()); //**** MR store date
							$(el).attr('data-parentDate', $(el).parent().attr('data-value')); //**** MR store parent date
							$(el).attr('data-parentTitle', $(el).parent().attr('title')); //**** MR store parent title
			                $(el).html("X");
			                $(el).removeClass("enabledDay").addClass("disabledDay");
			            }
			        }
			    });

			    $(".disabledDay").parent().removeClass("k-link"); //removing this class makes the day unselectable
			    $(".disabledDay").parent().removeAttr("href"); //this removes the hyperlink styling
			    $(".disabledDay").parent().removeAttr("title");
			    $(".disabledDay").parent().removeAttr("data-value");
			};
			
			removeDisableDates = function () {
				 $(".x-added").each(function (i, el) {
					  $(el).html($(el).attr('data-num'));
					  $(el).removeClass("disabledDay").addClass("enabledDay");
					  $(el).parent().attr('data-value', $(el).attr('data-parentDate'));
					  $(el).parent().attr('title', $(el).attr('data-parentTitle'));
				 });
				$(".x-added").removeAttr("data-num");
				$(".x-added").removeAttr("data-parentDate");
				$(".x-added").removeAttr("data-parentTitle");
				
				$(".x-added").parent().addClass("k-link"); 
			    $(".x-added").parent().attr("href", "#"); 
			    $(".x-added").removeClass("x-added");		
			};
               		
									
        	/**
           * @ngdoc function 
           * @name canSaveDepressionScreening
           * @methodOf roundingModule.controller:AllScreeningsController  
           * @description       
           ** Checks for the depression screening question's responses to make save button visible.
           * @param {array} Questions
           * Array of objects containing Depression Screening Pathway
           * @param {object} selQuestion
           * Response of the selected question
           * @returns {booelan} canSaveDepressionScreening
           * Boolean value,if true will display the save button , if false will keep it hidden.
           */
        	$scope.canSaveDepressionScreening = function (Questions, selQuestion) {
        		var canSaveDepressionScreening = false;

        		var optname;
        		var element;
        		
        		if (Questions[0].Options[1].IsSelected || Questions[0].Options[2].IsSelected) {
        			if (selQuestion != null && selQuestion != undefined) {
        			    var nextQuestion = jQuery.grep(Questions, function (value) {
        			        return value.Order == selQuestion.Order + 1;
        			    });

        			    if (nextQuestion != null && nextQuestion != undefined && nextQuestion.length > 0) {
        			        optname = (nextQuestion[0].UID);
        			        element = $(document.getElementsByName(optname));
        			        if (element != null && element != undefined) {
        			            if ($scope.DepressionScreeningNewSurvey == true) {
        			                element.prop("disabled", true);
        			                element.prop("checked", false);
        			            } else {
        			                element.prop("disabled", false);
        			                element.prop("checked", false);
        			            }
        			        }
        			    }

                        //-- Skip to the next Question --//
        			    var followingToNextQuestion = jQuery.grep(Questions, function (value) {
        			        if ($scope.DepressionScreeningNewSurvey == true) {
        			            return value.Order == selQuestion.Order + 2;
        			        } else {
        			            return value.Order == selQuestion.Order + 1;
        			        }
        				});

        				if (followingToNextQuestion != null && followingToNextQuestion != undefined && followingToNextQuestion.length > 0) {
        				    optname = (followingToNextQuestion[0].UID);
        				    element = $(document.getElementsByName(optname));
        				    if (element != null && element != undefined) {
        				        element.prop("disabled", false);
        				    }
        				}
        				var QuesCount = 1, QuesMaxCount = 9;
        				if ($scope.DepressionScreeningNewSurvey == true) {
        				    QuesCount = 2;
        				    QuesMaxCount = 10;
        				}
        				for (var i = QuesCount; i <= QuesMaxCount; i++) {
        				    optname = (Questions[i].UID);
        				    element = $(document.getElementsByName(optname));
        				    if (element != null && element != undefined) {
        				        if ($scope.DepressionScreeningNewSurvey == true) {
        				            if(i != QuesCount) {
        				                element.prop("disabled", true);
        				            }
        				            element.prop("checked", false);
        				        } else {
        				            if (i != QuesCount) {
        				                element.prop("disabled", false);
        				            }
        				            element.prop("checked", false);
        				        }
        				    }
        				    for (var j = 0; j < Questions[i].Options.length; j++) {
        				        Questions[i].Options[j].IsSelected = false;
        				        Questions[i].SelectedIndex = -1;
        				    }
        				}
                        //-- This code is when the user 1st selects Yes for Question 1 selects a value for Question 2 and then Selects 'No'--//
        			    for (var j = 0; j < Questions[1].Options.length; j++) {
        			    	Questions[1].Options[j].IsSelected = false;
        			    	Questions[1].SelectedIndex = -1;
        			    }

        			    

        			} else if (selQuestion != null && selQuestion != undefined && selQuestion.Order !== 1) {
        			    nextQuestion = jQuery.grep(Questions, function (value) {
        			        return value.Order == selQuestion.Order + 1;
        			    });

        			    if (nextQuestion != null && nextQuestion != undefined && nextQuestion.length > 0) {
        			        optname = (nextQuestion[0].UID);
        			        element = $(document.getElementsByName(optname));
        			        if (element != null && element != undefined) {
        			            element.prop("disabled", false);
        			        }
        			    }                                			    
                        
                    }

        		    //--enable 4th question for initial all 3 "NO" and then select 2nd as "Yes"--//
        			if ($scope.DepressionScreeningNewSurvey == true) {
        			    if (Questions[0].SelectedIndex > -1 &&
                       Questions[1].SelectedIndex > -1 && Questions[2].SelectedIndex > -1) {
        				optname = (Questions[3].UID);
        			        element = $(document.getElementsByName(optname));
        			        if (element) {
        			            element.prop("disabled", false);
        			        }
        			    }
        			} else {
        			    if (Questions[0].SelectedIndex > -1 &&
                            Questions[1].SelectedIndex > -1 &&
                            Questions[2].SelectedIndex > -1) {
        			        optname = (Questions[3].UID);
        			        element = $(document.getElementsByName(optname));
        			        if (element) {
        			            element.prop("disabled", false);
        			        }
        			    }
        			}
        			
        			if ($scope.DepressionScreeningNewSurvey == true && Questions[0].SelectedIndex > -1 &&
                        Questions[2].SelectedIndex > -1 && Questions[3].SelectedIndex > -1 &&
                        Questions[4].SelectedIndex > -1 && Questions[5].SelectedIndex > -1 &&
                        Questions[6].SelectedIndex > -1 && Questions[7].SelectedIndex > -1 &&
                        Questions[8].SelectedIndex > -1 && Questions[9].SelectedIndex > -1 &&
                        Questions[10].SelectedIndex > -1 && Questions[11].SelectedIndex > -1 && Questions[12].SelectedIndex > -1) {
        			    canSaveDepressionScreening = true;
        			}else if ($scope.DepressionScreeningNewSurvey == false && Questions[0].SelectedIndex > -1 &&
                        Questions[1].SelectedIndex > -1 && Questions[2].SelectedIndex > -1 &&
                        Questions[3].SelectedIndex > -1 && Questions[4].SelectedIndex > -1 &&
                        Questions[5].SelectedIndex > -1 && Questions[6].SelectedIndex > -1 &&
                        Questions[7].SelectedIndex > -1 && Questions[8].SelectedIndex > -1 &&
                        Questions[9].SelectedIndex > -1 && Questions[10].SelectedIndex > -1 && Questions[11].SelectedIndex > -1 &&
                        Questions[12].SelectedIndex > -1) {
        			        canSaveDepressionScreening = true;
        			} else if ($scope.DepressionScreeningNewSurvey == true && Questions[0].SelectedIndex > -1 &&
                               Questions[2].SelectedIndex > -1 && Questions[3].SelectedIndex > -1 &&
                               Questions[4].SelectedIndex > -1 && Questions[5].SelectedIndex > -1 &&
                               Questions[6].SelectedIndex > -1 && Questions[7].SelectedIndex > -1 &&
                               Questions[8].SelectedIndex > -1 && Questions[9].SelectedIndex > -1 &&
                               Questions[10].Options[0].IsSelected && (Questions[11].SelectedIndex < 0 || Questions[12].SelectedIndex < 0)) {
        			    canSaveDepressionScreening = false;
        			} else if ($scope.DepressionScreeningNewSurvey == false && Questions[0].SelectedIndex > -1 &&
                               Questions[1].SelectedIndex > -1 && Questions[2].SelectedIndex > -1 &&
                               Questions[3].SelectedIndex > -1 && Questions[4].SelectedIndex > -1 &&
                               Questions[5].SelectedIndex > -1 && Questions[6].SelectedIndex > -1 &&
                               Questions[7].SelectedIndex > -1 && Questions[8].SelectedIndex > -1 &&
                               Questions[9].Options[0].IsSelected && (Questions[10].SelectedIndex < 0 || Questions[11].SelectedIndex < 0 || Questions[12].SelectedIndex < 0)) {
        			    canSaveDepressionScreening = false;
        			}
        		} else if (Questions[0].Options[0].IsSelected) {
        			
        			canSaveDepressionScreening = true;
        			$scope.model.IsPatientMedicallyUnableToComplete = true;
        			var lenCondition = 9;
        			if ($scope.DepressionScreeningNewSurvey == true) {
        			    lenCondition = 10;
        			}
        			for (var i = 1; i <= lenCondition; i++) {
        			    optname = (Questions[i].UID);
        				element = $(document.getElementsByName(optname));

        				if (element != null && element != undefined && questionOrder === 2 && $scope.DepressionScreeningNewSurvey == true) {
        				    element.prop("disabled", false);
        				    //element.prop("checked", true);
        				} else if (element != null && element != undefined) {
        				    element.prop("disabled", true);
        				    element.prop("checked", false);        				    
        				}
        				        				
        			}
        			if ($scope.IsDepressionScreening) {
        			    var i = 1;
        			    if ($scope.DepressionScreeningNewSurvey == true) {
        			        i = 2;
        			    }
        			    for (; i <= lenCondition; i++) {
        			        for (var j = 0; j < Questions[i].Options.length; j++) {
        			            Questions[i].Options[j].IsSelected = false;
        			            Questions[i].SelectedIndex = -1;
        			        }
        			    }
        		    }else{
        		        for (var i = 2; i <= 9; i++) {
        		            for (var j = 0; j < Questions[i].Options.length; j++) {
        		                Questions[i].Options[j].IsSelected = false;
        		                Questions[i].SelectedIndex = -1;
        		            }
        		        }
        			}
        			    if (Questions[0].SelectedIndex > -1 && Questions[1].SelectedIndex > -1) {
        			        canSaveDepressionScreening = true;
        			    }
        			} else {
        			    if (Questions[0].SelectedIndex > -1 ) {
        			        canSaveDepressionScreening = true;
        			    }
                    
        		    /*-- ROUND -374: User is able to select Q2 options even when response for Q1 is "No".--*/
        			q1No = false;
        			q3No = false;
        			q4No = false;
        		    
        		}
        		return canSaveDepressionScreening;
        	}

        	/**
            * @ngdoc event 
            * @name  thingsChange
            * @eventOf roundingModule.controller:AllScreeningsController  
            * @description       
            ** ng-click event of input type radio.
            ** Sets the visibility of postpone/save buttons based on the selected questions response.
            * @param {number} questionUID
            * UID of the question selected
            * @param {number} uid
            * UID of the question group
            * @param {number} optionOrder
            * Selected option order number
            */
        	$scope.thingsChange = function (questionUID, uid, optionOrder) {
        	    var canSave = true;
        	    var canPostPoneSurvey = false;
        	    var endOfSurvey = false;
        	    var selQuestion = null;
        		var scrollheight = 0;
        	    if ($scope.model.surveyType === ScreeningsSurveyTypes.Depression) {
        	        if ($scope.ToolTip) {
        	            scrollheight = 60;
        	        }
        	        $scope.model.SurveyDetails.data().forEach(function (surveyDetail) {
        	            surveyDetail.QuestionGroups.forEach(function (questionGroup) {
        	                if (questionGroup.Description) {
        	                    scrollheight = scrollheight + 30;
        	                }
        	                questionGroup.Questions.forEach(function (question) {
        	                    //Hide-Show DisplayText
        	                    scrollheight = scrollheight + $("#question-" + question.UID + "-" + question.Order).height();

        	                    if (question.UID === questionUID) {
        	                        question.Options.forEach(function (option) {
        	                            if (parseInt(uid) === option.UID && parseInt(optionOrder) === option.OptionOrder) {
        	                                option.IsSelected = true;
        	                                question.SelectedIndex = option.OptionOrder;
        	                                canPostPoneSurvey = true;
        	                                if (questionGroup.Questions.length != question.Order)
        	                                    scrollToNextQuestion(question.UID, question.Order, scrollheight);

        	                                selQuestion = question;
        	                                if ($scope.DepressionScreeningNewSurvey == true) {
        	                                    if (question.Order === 1) {
        	                                        //option.Description === "No" ? q1No = true : q1No = false, q2No = false, q3No = false;
        	                                        option.Description === "No" ? q1No = true : q1No = false;
        	                                        if (option.Description === "No" || option.Description === "NA") {
        	                                            if (q3No == true) {
        	                                                q3No = false;
        	                                            }
        	                                            if (q4No == true) {
        	                                                q4No = false;
        	                                            }
        	                                            $scope.model.IsPatientMedicallyUnableToComplete = false;
        	                                        }
        	                                    }
        	                                    else if (question.Order === 3) {
        	                                        option.Description === "No" ? q3No = true : q3No = false;
        	                                    }
        	                                    else if (question.Order === 4) {
        	                                        option.Description === "No" ? q4No = true : q4No = false;
        	                                    }
        	                                } else {
        	                                    if (question.Order === 1) {
        	                                        //option.Description === "No" ? q1No = true : q1No = false, q4No = false, q3No = false;
        	                                        option.Description === "No" ? q1No = true : q1No = false;
        	                                        if (option.Description === "No" || option.Description === "NA"){
        	                                            if( q3No == true ){
        	                                                q3No = false;
        	                                            }
        	                                            if(q4No == true){        	                                            
        	                                                q4No = false;
        	                                            }
        	                                            $scope.model.IsPatientMedicallyUnableToComplete = false;
        	                                        }
        	                                    }
        	                                    else if (question.Order === 2) {
        	                                        option.Description === "No" ? q3No = true : q3No = false;        	                                       
        	                                    }
        	                                    else if (question.Order === 3) {
        	                                        option.Description === "No" ? q4No = true : q4No = false;
        	                                    }
        	                                }
        	                            }
        	                            else {
        	                                option.IsSelected = false;
        	                            }
        	                        
        	                    
        	                        });
                                    }
        	            });
        	        });        	        
        			if (q1No && q2No && q3No) {
        	            canSave = true;
        	            disableQuestions();
        	        } else {
        	            canSave = $scope.canSaveDepressionScreening($scope.model.SurveyDetails.data()[0].QuestionGroups[0].Questions, selQuestion);
        	            enableQuestions();
        			}
                    
        	    }else{
        	        if ($scope.ToolTip) {
        	            scrollheight = 60;
                            	                    
        	        $scope.model.SurveyDetails.data().forEach(function (surveyDetail) {
        	            var questiongroupslength = surveyDetail.QuestionGroups.length;

        	            surveyDetail.QuestionGroups.forEach(function (questionGroup) {
        			        if(questionGroup.Description != "Default Group" ) {
        	                    scrollheight = scrollheight + 30;
        	                }
        	                if (questionGroup.Questions != null && questionGroup.Questions != undefined && questionGroup.Questions.length > 0 && !endOfSurvey) {
        	                    questionGroup.Questions.forEach(function (question) {
        	                        var oneOptionSelected = false;

        	                        scrollheight = scrollheight + $("#question-" + question.UID + "-" + question.Order).height();

        	                        if (question.Options != null && question.Options != undefined && question.Options.length > 0 && !endOfSurvey) {
        	                            question.Options.forEach(function (option) {
        	                                if (question.UID === questionUID) {

        	                                    if (parseInt(uid) === option.UID && parseInt(optionOrder) === option.OptionOrder) {

        	                                        option.IsSelected = true;
        	                                        question.SelectedIndex = option.OptionOrder;

        									        if (questiongroupslength <= 1)
        									        {
        	                                            if (questionGroup.Questions.length != question.Order)
        	                                                scrollToNextQuestion(question.UID, question.Order, scrollheight);
        									        }else
        									        {
        	                                            scrollToNextQuestion(question.UID, question.Order, scrollheight);

        	                                        }



        	                                        if (($scope.model.surveyType === ScreeningsSurveyTypes.PainAssessment || $scope.model.surveyType === ScreeningsSurveyTypes.ESCOFallRiskAssessment) && question.Order == 1 && !option.IsEndOfSurvey) {
        	                                            for (var i = question.Order; i < questionGroup.Questions.length; i++) {
        	                                                for (var j = 0; j < questionGroup.Questions[i].Options.length; j++) {
        	                                                    questionGroup.Questions[i].Options[j].IsSelected = false;
        	                                                    if (questionGroup.Questions[i].IsMultiple) {
        	                                                        var swtch = $("#" + questionGroup.Questions[i].Options[j].UID).data("kendoMobileSwitch");
        	                                                        if (swtch != null && swtch != undefined) {
        	                                                            swtch.check(false);
        	                                                            swtch.enable(true);
        	                                                        }
        	                                                    } else {
        	                                                        var optname = (questionGroup.Questions[i].UID);
        	                                                        elements = $(document.getElementsByName(optname));
        	                                                        if (elements != null && elements != undefined) {
        	                                                            elements.attr("checked", false);
        	                                                            elements.prop("disabled", false);
        	                                                        }
        	                                                    }
        	                                                }
        	                                            }
        	                                        }
        	                                    } else {
        	                                        option.IsSelected = false;
        	                                    }
        	                                }

        	                                if (option.IsSelected) {
        	                                    oneOptionSelected = true;
        	                                    // $("#postpone-button").css('display', 'inline');
        	                                    canPostPoneSurvey = true;
        	                                    $scope.hasChanges = true;
        	                                    CommonFunctions.UIChanged();
        	                                    if (option.IsEndOfSurvey) {
        	                                        endOfSurvey = true;
        	                                        canSave = true;

        	                                        if ($scope.model.surveyType === ScreeningsSurveyTypes.PainAssessment || $scope.model.surveyType === ScreeningsSurveyTypes.ESCOFallRiskAssessment) {
        	                                            if (question.Order < questionGroup.Questions.length) {
        	                                                for (var i = question.Order; i < questionGroup.Questions.length; i++) {
        	                                                    for (var j = 0; j < questionGroup.Questions[i].Options.length; j++) {
        	                                                        questionGroup.Questions[i].Options[j].IsSelected = false;
        	                                                        if (questionGroup.Questions[i].IsMultiple) {
        	                                                            var swtch = $("#" + questionGroup.Questions[i].Options[j].UID).data("kendoMobileSwitch");
        	                                                            if (swtch != null && swtch != undefined) {
        	                                                                swtch.check(false);
        	                                                                swtch.enable(false);
        	                                                            }
        	                                                        } else {
        	                                                            optname = (questionGroup.Questions[i].UID);
        	                                                            var elements = $(document.getElementsByName(optname));
        	                                                            if (elements != null && elements != undefined) {
        	                                                                elements.prop("disabled", true);
        	                                                                elements.attr("checked", false);
        	                                                            }
        	                                                        }
        	                                                    }
        	                                                    questionGroup.Questions[i].SelectedIndex = -1;
        	                                                }
        	                                                return;
        	                                            } else {
        	                                                for (var i = 0; i < questionGroup.Questions.length; i++) {
        	                                                    var isSelected = false;
        	                                                    for (var j = 0; j < questionGroup.Questions[i].Options.length; j++) {
        	                                                        if (questionGroup.Questions[i].Options[j].IsSelected) {
        	                                                            isSelected = true;
        	                                                        }
        	                                                    }
        	                                                    if (!isSelected) {
        	                                                        oneOptionSelected = false;
        	                                                        canSave = false;
        	                                                        endofsurvey = false;
        	                                                        return;
        	                                                    }
        	                                                }
        	                                            }
        	                                        }
        	                                    }
        	                                }
        	                            });
        	                        }

        	                        if (!oneOptionSelected && canSave && !endOfSurvey) {
        	                            canSave = false;
        	                        } else if (endOfSurvey) {
        	                            return;
        	                        }
        	                    });
        	                }
        	            });
        	        });
        	    }

        	    if (canSave === true) {
        	        $scope.Buttons.SaveButtonVisible = true;
        	        CommonFunctions.UIChanged();
        	        $scope.hasChanges = true;
        	    } else {
        	        CommonFunctions.UIChanged();
        	        $scope.hasChanges = true;
        	        $scope.Buttons.SaveButtonVisible = false;
        	    }
        	    if (canPostPoneSurvey === true) {
        	        CommonFunctions.UIChanged();
        	        $scope.hasChanges = true;
        	        $scope.Buttons.PostponeButtonVisible = true;
        	    } else if (canPostPoneSurvey === false) {
        	        $scope.Buttons.PostponeButtonVisible = false;
        	    }
        	}

        	/**
            * @ngdoc function
            * @name disableFunctions
            * @methodOf roundingModule.controller:AllScreeningsController
            * @description 
            ** disables and resets questions answers for depression screening if first 3 questions are answered "NO"
            */
        	disableQuestions = function () {
        		$scope.model.SurveyDetails.data().forEach(function (surveyDetail) {
        			surveyDetail.QuestionGroups.forEach(function (questionGroup) {
        				if (questionGroup.Questions && questionGroup.Questions.length > 0) {
        				    questionGroup.Questions.forEach(function (question) {
        					    if (question.Order > 4) {
        							question.SelectedIndex = -1;
        							if (question.Options && question.Options.length > 0) {
        								question.Options.forEach(function (option) {
        									option.IsSelected = false;
        									if (question.IsMultiple) {
        										var swtch = $("#" + option.UID).data("kendoMobileSwitch");
        										if (swtch) {
        											swtch.check(false);
        											swtch.enable(false);
        										}
        									}
        									else if ($scope.DepressionScreeningNewSurvey == true && (question.Order === 12 || question.Order === 13 || question.Order === 14) ) {
        										$("#" + "radio-" + option.UID).attr('checked', false);
        										$("#" + "radio-" + option.UID).attr('disabled', true);
        									}
        									else if (question.Order === 12 || question.Order === 13 || question.Order === 14) {
        									    $("#" + "radio-" + option.UID).attr('checked', false);
        									    $("#" + "radio-" + option.UID).attr('disabled', true);
        									}
        									else {
        										$("#" + option.UID + "-" + option.OptionOrder).attr('checked', false);
        										$("#" + option.UID + "-" + option.OptionOrder).attr('disabled', true);
        									}
        								});
        							}
        						}
        					});
        				}
        			});
        		});
        	}

        	/**
            * @ngdoc function
            * @name enableQuestions
            * @methodOf roundingModule.controller:AllScreeningsController
            * @description 
            ** enabled  questions answers for depression screening if any first 3 questions are answered "YES"
            */
        	enableQuestions = function () {
        		$scope.model.SurveyDetails.data().forEach(function (surveyDetail) {
        			surveyDetail.QuestionGroups.forEach(function (questionGroup) {
        				if (questionGroup.Questions && questionGroup.Questions.length > 0) {
        					questionGroup.Questions.forEach(function (question) {
        						if (question.Options && question.Options.length > 0) {
        							question.Options.forEach(function (option) {
        								/*if (question.Order <= 4) {   
                                            $("#" + option.UID + "-" + option.OptionOrder).attr('disabled', false);
                                        }*/
        								if (question.Order === 12 || question.Order === 13|| question.Order === 14) {
        							            $("#" + "radio-" + option.UID).attr('disabled', false);
        							        }
        							    }
        							});
        						}
        					});
        				}
        			});
        		});
        	}   


            /**
            * @ngdoc function 
            * @name scrollToNextQuestion 
            * @eventOf roundingModule.controller:AllScreeningsController  
            * @description
            ** commonfunction calls when thingsChange ng-click event and onSwitchChange  
            ** input type radio or checksbox click the scroll move to next question.
            * @param {number} questionUID
            * UID of the question selected
            * @param {number} order
            * order of the question number 
            * @param {number} scrollheight
            * by looping get the total height till the current question
            */
        	var tempscrollheight = 0;
        	scrollToNextQuestion = function (UID, Order, scrollheight)
        	{

        	   

                var tempUID = UID + 1;
        		var tempOrd = Order + 1;
        		var nextdivheight = $("#question-" + tempUID + "-" + tempOrd).height();        		

                /*
        		var q = surveyDetails.questionGroups.length;
        	    var atv = surveyDetail.QuestionGroups.at.length;
                */

        		if (!nextdivheight)
        		{                    
        			//set minimum height
        			nextdivheight = 50;
        		}
        		var scroller = $("#screening-scroller").data("kendoMobileScroller");
        		if (!scroller) {
        			$("#screening-scroller").kendoMobileScroller();
        		}
        		
                /*
        		console.log("scrollheight " + scroller.scrollHeight() + " height: " + scroller.height());
        		var offset = scroller.height();
        		if (offset == 0)
        		    offset = 100;
        		scroller.scrollTo(0, scroller.scrollHeight() * -1 + offset);
                */

        		//tempscrollheight = tempscrollheight + scrollheight;


                if (scrollheight + nextdivheight >= ($("#screening-scroller").height() - 50)) {
                    //if (scrollheight + nextdivheight >= $("#screening-scroller").height()) {
                    /*
                    var moveto = scrollheight + nextdivheight - ($("#screening-scroller").height() - 80);        		  
                    scroller.scrollTo(0, -moveto);
                    */        		
                    var offset = scroller.height();
                    if (offset == 0)
                        offset = 100;
        	        
                    if (tempscrollheight < scroller.scrollHeight())
        		if ((scrollheight + nextdivheight) < (scroller.scrollHeight() - 375))        		
        		{
                            var moveto = scrollheight + nextdivheight - ($("#screening-scroller").height() - 80);        		    
                            scroller.scrollTo(0, -moveto);
                            //scroller.scrollTo(0, -tempscrollheight);
        		}
        		else {
                            scroller.scrollTo(0, scroller.scrollHeight() * -1 + offset);
                            //scroller.scrollTo(0, scroller.scrollHeight() * -1 + (nextdivheight + ($("#screening-scroller").height())));
                        }

                    //scroller.scrollTo(0, scroller.scrollHeight() * -1 + (scrollheight + nextdivheight));
            
                }
                
        	}


            /*
        	function scrollToBottfom() {
        	    var scroller = app.scroller();
        	    console.log("scrollheight " + scroller.scrollHeight() + " height: " + scroller.height());
        	    var offset = scroller.height();
        	    if (offset == 0)
        	        offset = 100;
        	    scroller.scrollTo(0, scroller.scrollHeight() * -1 + offset);
        	}*/





        	/**
            * @ngdoc event 
            * @name onSwitchChange
            * @eventOf roundingModule.controller:AllScreeningsController  
            * @description       
            ** k-on-change event of kendo mobile swtich.
            ** Calls thingsChange ng-click event of input type radio.
            * @param {object} e
            * Object containing status and response of the question
            */
        	$scope.onSwitchChange = function (questionUID, uid, e, optOrder) {
        	    try {
        	        var senderul = $(e.sender.element).attr('id');
        	        var res = senderul.split("-");
        	        var isChecked = false;
        	        var i = 0;

        	        $(".question-options-" + res[3] + "-" + res[5]).children().each(function (value) {
        	            if ($(this).hasClass("km-switch-on")) {
        	                isChecked = true;
        	                i++;
        	            }
        	        });

        	        //	var scrollheight = 0;
        	        //if ($scope.Tooltip) {
        	        //    scrollheight = scrollheight + $("#allscreenings-survey-tooltip").height();
        	        //}
        	        //if ($scope.model.IsPainAssessmentScreening) {
        	        //    scrollheight = scrollheight + $("#kidneysmart_url").height();
        	        //}

        	        $scope.model.SurveyDetails.data().forEach(function (surveyDetail) {
        	            surveyDetail.QuestionGroups.forEach(function (questionGroup) {

        	                //if (questionGroup.Description) {
        	                //    scrollheight = scrollheight + 30;
        	                //}

        	                questionGroup.Questions.forEach(function (question) {
        	                    /* scrolling logic */

        	                    //scrollheight = scrollheight + $("#question-" + question.UID + "-" + question.Order).height();
        	                    //if (question.Options != null && question.Options != undefined && question.Options.length > 0) {/* && !endOfSurvey) { */
        	                    //    question.Options.forEach(function (option) {
        	                    //        if (question.UID === questionUID) {
        	                    //            if (parseInt(uid) === option.UID && parseInt(optOrder) === option.OptionOrder) {        	                                    
        	                    //                scrollToNextQuestion(question.UID, question.Order, scrollheight);                                                
        	                    //            }
        	                    //        }
        	                    //    });
        	                    //}

        	                    if (question.Order > parseInt(res[5])) {
        	                        question.SelectedIndex = -1;
        	                        question.Options.forEach(function (option) {
        	                            option.IsSelected = false;
        	                            $("#" + option.UID + "-" + option.OptionOrder).attr('checked', false);
        	                        });
        	                    }
        	                    if (question.IsMultiple && optOrder <= question.Options.length && (question.Options[optOrder - 1].DisplayText)) {
        	                        var isFirst = true;
        	                        question.Options[optOrder - 1].IsOptionTextHidden = false;
        	                        question.Options[optOrder - 1].isOptionTextAlreadyShown = false;

        	                        for (var i = 0; i < question.Options.length; i++) {
        	                            if (question.Options[optOrder - 1].DisplayText !== question.Options[i].DisplayText) {
        	                                continue;
        	                            }

        	                            if (question.Options[optOrder - 1].IsSelected) {
        	                                if (question.Options[i].IsSelected) {
        	                                    question.Options[i].isOptionTextAlreadyShown = true;
        	                                    question.Options[optOrder - 1].isOptionTextAlreadyShown = false;
        	                                } else {
        	                                    question.Options[i].isOptionTextAlreadyShown = true;
        	                                }
        	                            } else {
        	                                if (question.Options[i].IsSelected) {
        	                                    if (isFirst) {
        	                                        question.Options[i].isOptionTextAlreadyShown = false;
        	                                        isFirst = false;
        	                                    } else {
        	                                        question.Options[i].isOptionTextAlreadyShown = true;
        	                                    }
        	                                }
        	                            }
        	                        }
        	                    }
        	                });
        	            });
        	        });

        	        $scope.thingsChange(-1, -1, -1);
        	    } catch (ex) {
        	        var errExp = {};
        	        errExp.Exception = ex;
        	        errExp.ModuleName = "Pathways";
        	        errExp.FunctionName = "onSwitchChange";
        	        errExp.StackTrace = printStackTrace({ e: ex });
        	        ExceptionService.LogException(CommonFunctions.HandleException(errExp));
        	    }
        	}

        	/**
            * @ngdoc function 
            * @name isStartDateValid
            * @methodOf roundingModule.controller:AllScreeningsController  
            * @description       
            ** Checks the screening date with previous survey dates.
            ** Multiple screenings can't be saved on the same screening date.
            * @returns {booelan} isValidStartDate Returns true if the screening date is valid, else returns false.
            */

        	$scope.isStartDateValid = function () {
        		var isValidStartDate = true;

        		if ($scope.model.prevSurveyDates && $scope.model.prevSurveyDates.length > 0) {
        			for (var i = 0; i < $scope.model.prevSurveyDates.length; i++) {
        				if (CommonFunctions.DateFunctions.dateFormat($scope.model.screeningDate, "mm-dd-yyyy", false) == CommonFunctions.DateFunctions.dateFormat(CommonFunctions.DateFunctions.parseDate($scope.model.prevSurveyDates[i]), "mm-dd-yyyy", false)) {
        					isValidStartDate = false;
        					return;
        				}
        			}
        		}
        		return isValidStartDate;
        	}

        	/**
            * @ngdoc function 
            * @name setResponsesToSave
            * @methodOf roundingModule.controller:AllScreeningsController  
            * @description       
            ** Makes the collection of answered questions to save the screening.
            * @returns {object} responseQuestions
            * Saving questions and their responses
            */
        	$scope.setResponsesToSave = function () {
        		var responseQuestions = new kendo.data.ObservableArray([]);
        		try {
        			$scope.model.SurveyDetails.data()[0].QuestionGroups.forEach(function (questionGroup) {
        				questionGroup.Questions.forEach(function (question) {
        					var responseQuestion = { "QuestionUID": question.UID, "Responses": new kendo.data.ObservableArray([]) };
        					question.Options.forEach(function (option) {
        						if (option.IsSelected) {
        							responseQuestion.Responses.push({ "OptionUID": option.UID, "FreeFormResponse": option.FreeFormResponse });
        						}
        					});

        					if (responseQuestion.Responses.length > 0) {
        						responseQuestions.push(responseQuestion);
        					}
        				});
        			});

        			return responseQuestions;
        		} catch (ex) {
        			var errExp = {};
        			errExp.Exception = ex;
        			errExp.ModuleName = "AllScreening";
        			errExp.FunctionName = "setResponsesToSave";
        			errExp.StackTrace = printStackTrace({ e: ex });
        			ExceptionService.LogException(CommonFunctions.HandleException(errExp));
        		}
        	}

        	/**
            * @ngdoc function
            * @name onSaveSurveyDetailsRetrieved
            * @methodOf roundingModule.controller:AllScreeningsController
            * @description             
            ** Service based call back function of SaveSurveyDetails Service call.
            ** Calls $scope.callGetPtSurveyDetails after successfully saving survey detail.
            * @param {object} result
            * return result data of WebApi call
            */
        	$scope.onSaveSurveyDetailsRetrieved = function (result) {
        		try {
        			if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
        				CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
        				CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.ScreeningSaved);
        				if (result.data.AlertMessageText && result.data.AlertMessageText.length > 0) {
        					CommonFunctions.DisplayAlertMessage(result.data.AlertMessageText);
        				}

        				$scope.hasChanges = false;
        				$scope.freeFormHasChanges = false;
        				$scope.callGetPtSurveyDetails();
        				$scope.model.IsCaregiverSurveyRequired = false;
        				$scope.model.IsEscoPatientExempt = false;
        				$scope.model.IsPatientRefused = false;
        				$scope.model.IsPatientMedicallyUnableToComplete = false;
        				$scope.model.IsPatientRefusedDisabled = false;
						
						if($scope.model.IsPostponeButtonClicked) {
							$scope.model.IsHeaderCheckboxChanged = false;
						}
        			}
        		}
        	    catch (ex) {
        			var errExp = {};
        			errExp.Exception = ex;
        			errExp.ModuleName = "AllScreening";
        			errExp.FunctionName = "OnSaveSurveyDetailsRetrieved";
        			errExp.StackTrace = printStackTrace({ e: ex });
        			ExceptionService.LogException(CommonFunctions.HandleException(errExp));
        		}
        	}

        	/**
            * @ngdoc function 
            * @name prepareForPostPone
            * @methodOf roundingModule.controller:AllScreeningsController  
            * @description       
            ** Calls $scope.setResponsesToSave.
            ** Sets SurveyStatus to "P"(postpone).
            */
        	$scope.prepareForPostPone = function () {
        		var responsesToBeSaved = $scope.setResponsesToSave();
				var refusalReasonCode = null;

				//if($scope.IsCognitiveScreening) {
				//	refusalReasonCode = $scope.model.IsPatientMedicallyUnableToComplete ? CommonConstants.SurveyRefusalReasonCode.PatientMedicallyUnableToComplete : $scope.model.IsPatientRefused ? CommonConstants.SurveyRefusalReasonCode.PatientRefused : null;
				//}
				//else if ($scope.IsPAMScreening) {
				//	$scope.model.IsPatientRefused = $scope.model.PAMScreening.IsPatientRefused;
				//	$scope.model.IsCaregiverSurveyRequired = $scope.model.PAMScreening.IsCaregiverSurveyRequired;
				//	refusalReasonCode = $scope.model.IsCaregiverSurveyRequired ? CommonConstants.SurveyRefusalReasonCode.CaregiverSurveyRequired : $scope.model.PatientRefused? CommonConstants.SurveyRefusalReasonCode.PatientRefused : null;
				//}

				if ($scope.model.IsPatientRefused) {
				    refusalReasonCode = CommonConstants.SurveyRefusalReasonCode.PatientRefused;
				}
				else if ($scope.model.IsCaregiverSurveyRequired) {
				    refusalReasonCode = CommonConstants.SurveyRefusalReasonCode.CaregiverSurveyRequired;
				}
				else if ($scope.model.IsPatientMedicallyUnableToComplete) {
				    refusalReasonCode = CommonConstants.SurveyRefusalReasonCode.PatientMedicallyUnableToComplete;
				}
                
        		var screeningToBeSaved = {
        			DataState: $scope.model.SurveyDetail.UID === 0 ? CommonConstants.DataState.Added : CommonConstants.DataState.Modified,
        			MemSurveyUID: $scope.model.SurveyDetails.data()[0].UID,
        			PatientUID: $rootScope.Global.Objects.SelectedPatient.UID,
        			SurveyTypeCode: $scope.model.surveyType,
        			SurveyComments: $scope.model.SurveyDetails.data()[0].SurveyComments,
        			SurveyUID: $scope.model.SurveyDetails.data()[0].SurveyUID,
        			ResponseQuestions: responsesToBeSaved.toJSON(),
        			StartDate: (new Date($scope.model.screeningDate)).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
        			SurveyStatus: "P",
        			RefusalReasonCode: refusalReasonCode
        		};
        		AllScreeningsService.SaveSurveyDetails(screeningToBeSaved, 'POST', 'JSON', $scope.onSaveSurveyDetailsRetrieved);
        	}

        	/**
            * @ngdoc event 
            * @name postPoneScreening
            * @eventOf roundingModule.controller:AllScreeningsController  
            * @description       
            ** ng-click event of postpone button.
            ** Calls $scope.prepareForPostPone.
            */
        	$scope.postPoneScreening = function () {
        		try {
					$scope.model.IsPostponeButtonClicked = true;
        			CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
        			if ($scope.model.SurveyDetail.UID == 0) {
        				if ($scope.isStartDateValid()) {
        					$timeout(function () {
        						$scope.prepareForPostPone();
        					}, 0, true);
        				} else {
        					CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
        					CommonFunctions.OpenAlertBox('Alert', [{ message: CommonMessages.Alert.ScreeningDateInValid }], null);
        				}
        			} else {
        				$scope.prepareForPostPone();
        			}
        		} catch (ex) {
        			var errExp = {};
        			errExp.Exception = ex;
        			errExp.ModuleName = "AllScreenings";
        			errExp.FunctionName = "postPoneScreening";
        			errExp.StackTrace = printStackTrace({ e: ex });
        			ExceptionService.LogException(CommonFunctions.HandleException(errExp));
        		}
        	}

        	/**
            * @ngdoc event 
            * @name cancelScreening
            * @eventOf roundingModule.controller:AllScreeningsController  
            * @description       
            ** ng-click event of cancel button.
            ** Cancel the survey detail changes.     
            */
        	$scope.cancelScreening = function () {
        		try {
					
        			if ($scope.hasChanges || $scope.freeFormHasChanges || $scope.model.IsHeaderCheckboxChanged) {
						CommonFunctions.OpenConfirmBox(CommonMessages.Alert.ConfirmMessage, CommonMessages.Alert.ChangesLost, function (data) {
        					if (data != undefined && data.returnValue != undefined) {
        						if (data.returnValue) {
        						    $scope.hasChanges = false;
        						    $scope.freeFormHasChanges = false;
									$scope.model.IsHeaderCheckboxChanged = false;
									$scope.model.IsPostponeButtonClicked = false;
									CommonFunctions.UICanceled();
        							$scope.callGetPtSurveyDetails();
        						}
        					}
        				});
        			} else {
        				$scope.callGetPtSurveyDetails();
        			}
        		} catch (ex) {
        			var errExp = {};
        			errExp.Exception = ex;
        			errExp.ModuleName = "AllScreening";
        			errExp.FunctionName = "cancelScreening";
        			errExp.StackTrace = printStackTrace({ e: ex });
        			ExceptionService.LogException(CommonFunctions.HandleException(errExp));
        		}
        	}

        	/**
            * @ngdoc function 
            * @name prepareForSave
            * @methodOf roundingModule.controller:AllScreeningsController  
            * @description       
            ** Calls $scope.setResponsesToSave.
            ** Sets SurveyStatus to "C"(complete).
            */
        	$scope.prepareForSave = function () {
        		if ($scope.allScreeningsValidator.validate()) {
        			var responsesToBeSaved = $scope.setResponsesToSave();
        			var refusalReasonCode = null;
        			if ($scope.model.IsPatientRefused) {
					    refusalReasonCode = CommonConstants.SurveyRefusalReasonCode.PatientRefused;
					}
					else if ($scope.model.IsCaregiverSurveyRequired) {
					    refusalReasonCode = CommonConstants.SurveyRefusalReasonCode.CaregiverSurveyRequired;
					}
					else if ($scope.model.IsPatientMedicallyUnableToComplete) {
					    refusalReasonCode = CommonConstants.SurveyRefusalReasonCode.PatientMedicallyUnableToComplete;
					}
					else if($scope.model.IsEscoPatientExempt){
					    refusalReasonCode = CommonConstants.SurveyRefusalReasonCode.PatientExempt;
					}

					//if(!refusalReasonCode) {
					//	refusalReasonCode = $scope.model.IsCaregiverSurveyRequired ? CommonConstants.SurveyRefusalReasonCode.CaregiverSurveyRequired : $scope.model.IsPatientRefused? CommonConstants.SurveyRefusalReasonCode.PatientRefused : null;
					//}	
        			var screeningToBeSaved = {
        				DataState: $scope.model.SurveyDetail.UID === 0 ? CommonConstants.DataState.Added : CommonConstants.DataState.Modified,
        				MemSurveyUID: $scope.model.SurveyDetails.data()[0].UID,
        				PatientUID: $rootScope.Global.Objects.SelectedPatient.UID,
        				SurveyTypeCode: $scope.model.surveyType,
        				SurveyComments: $scope.model.SurveyDetails.data()[0].SurveyComments,
        				SurveyUID: $scope.model.SurveyDetails.data()[0].SurveyUID,
        				ResponseQuestions: responsesToBeSaved.toJSON(),
        				StartDate: (new Date($scope.model.screeningDate)).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
        				CompletedDate: (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
        				SurveyStatus: "C",
        				RefusalReasonCode: refusalReasonCode
        			};
        			AllScreeningsService.SaveSurveyDetails(screeningToBeSaved, 'POST', 'JSON', $scope.onSaveSurveyDetailsRetrieved);
        		}
        	}

        	/**
            * @ngdoc event 
            * @name saveScreening
            * @eventOf roundingModule.controller:AllScreeningsController  
            * @description       
            ** ng-click event of save button.
            ** Calls $scope.prepareForSave.
            */
        	$scope.saveScreening = function () {
        	    try {
        	        if ($scope.allScreeningsValidator.validate()) {
        	            CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
        	            if ($scope.model.SurveyDetail.UID == 0) {
        	                if ($scope.isStartDateValid()) {
        	                    $scope.prepareForSave();
        	                    //$scope.model.IsTextBoxDisabled = true;
        	                } else {
        	                    CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
        	                    CommonFunctions.OpenAlertBox('Alert', [{ message: CommonMessages.Alert.ScreeningDateInValid }], null);
        	                }
        	            } else {
        	                $scope.prepareForSave();
        	            }
        	        }
        	    }
        	    catch (ex) {
        			var errExp = {};
        			errExp.Exception = ex;
        			errExp.ModuleName = "AllScreening";
        			errExp.FunctionName = "saveScreening";
        			errExp.StackTrace = printStackTrace({ e: ex });
        			ExceptionService.LogException(CommonFunctions.HandleException(errExp));
        		}
        	}

        	/**
            * @ngdoc function 
            * @name setScreeningHeader
            * @methodOf roundingModule.controller:AllScreeningsController  
            * @description       
            ** Sets the screening header using selected CRDSelectedMenu screen.
            */
        	$scope.setScreeningHeader = function () {
        		try {
        			if ($rootScope.Global.Objects.CRDSelectedMenu != null && $rootScope.Global.Objects.CRDSelectedMenu != undefined) {
        				jQuery.grep($rootScope.Global.Objects.Menus, function (value) {
        					if (value.Screen == $rootScope.Global.Objects.CRDSelectedMenu.Screen) {
        						$scope.model.CurrentScreen = value;
        						return;
        					} else if (value != null && value.SubMenus != null && value.SubMenus != undefined) {
        						jQuery.grep(value.SubMenus, function (submenu) {
        							if (submenu.Screen == $rootScope.Global.Objects.CRDSelectedMenu.Screen) {
        								$scope.model.CurrentScreen = submenu;
        								return;
        							}
        							else if (submenu != null && submenu.Tabs != null && submenu.Tabs != undefined) {
        								jQuery.grep(submenu.Tabs, function (tab) {
        									if (tab.Screen == $rootScope.Global.Objects.CRDSelectedMenu.Screen) {
        										$scope.model.CurrentScreen = tab;
        										return;
        									}
        								});
        							}
        						});
        					} else if (value != null && value.Tabs != null && value.Tabs != undefined) {
        						jQuery.grep(value.Tabs, function (tab) {
        							if (tab.Screen == $rootScope.Global.Objects.CRDSelectedMenu.Screen) {
        								$scope.model.CurrentScreen = tab;
        								return;
        							}
        						});
        					}
        				});

        				if ($scope.model.CurrentScreen != null && $scope.model.CurrentScreen != undefined && $scope.model.CurrentScreen.Screen != null && $scope.model.CurrentScreen.Screen != undefined) {
        					$scope.setSurveyType();
        					$scope.PathwayScreenTitle = $scope.model.CurrentScreen.Text;
        				}
        			}
        		} catch (ex) {
        			var errExp = {};
        			errExp.Exception = ex;
        			errExp.ModuleName = "AllScreenings";
        			errExp.FunctionName = "setScreeningHeader";
        			errExp.StackTrace = printStackTrace({ e: ex });
        			ExceptionService.LogException(CommonFunctions.HandleException(errExp));
        		}
        	}

        	/**
            * @ngdoc function 
            * @name setSurveyType
            * @methodOf roundingModule.controller:AllScreeningsController  
            * @description       
            ** Set survey type based on selected menu item.
            */
        	$scope.setSurveyType = function () {
        		try {
        			$scope.model.surveyType = CommonFunctions.GetSurveyType();
        			$scope.model.IsAdl = false;
        			switch ($scope.model.CurrentScreen.Screen) {
        				case ScreenConstants.ADLScreening:
        					$scope.model.IsPainAssessmentScreening = false;
        					$scope.model.IsAdl = true;
        					break;
        				case ScreenConstants.DepressionScreeningTab:
        				case ScreenConstants.FallRiskAssessment:
        				case ScreenConstants.HomeSafetyScreening:
        					$scope.model.IsPainAssessmentScreening = false;
        					break;
        				case ScreenConstants.ESCOFallRiskAssessment:
        					$scope.model.IsPainAssessmentScreening = false;
        					break;
        				case ScreenConstants.PainAssessment:
        					$scope.model.IsPainAssessmentScreening = true;
        					break;
        				default:
        					break;
        			}
        			//switch ($scope.model.CurrentScreen.Screen) {
        			//    case ScreenConstants.ADLScreening:
        			//        $scope.model.surveyType = ScreeningsSurveyTypes.ADL;
        			//        $scope.model.IsPainAssessmentScreening = false;
        			//        $scope.model.IsAdl = true;
        			//        break;
        			//    case ScreenConstants.DepressionScreeningTab:
        			//        $scope.model.surveyType = ScreeningsSurveyTypes.Depression;
        			//        $scope.model.IsPainAssessmentScreening = false;
        			//        break;
        			//    case ScreenConstants.FallRiskAssessment:
        			//        $scope.model.surveyType = ScreeningsSurveyTypes.FallRiskAssessment;
        			//        $scope.model.IsPainAssessmentScreening = false;
        			//        break;
        			//    case ScreenConstants.ESCOFallRiskAssessment:
        			//        $scope.model.surveyType = ScreeningsSurveyTypes.ESCOFallRiskAssessment;
        			//        $scope.model.IsPainAssessmentScreening = false;
        			//        $scope.model.CurrentScreen.Text = "ESCO Fall Risk Assessment"
        			//        break;
        			//    case ScreenConstants.HomeSafetyScreening:
        			//        $scope.model.surveyType = ScreeningsSurveyTypes.HomeSafety;
        			//        $scope.model.IsPainAssessmentScreening = false;
        			//        break;
        			//    case ScreenConstants.PainAssessment:
        			//        $scope.model.surveyType = ScreeningsSurveyTypes.PainAssessment;
        			//        $scope.model.IsPainAssessmentScreening = true;
        			//        break;
        			//    default:
        			//        break;
        			//}
        		} catch (ex) {
        			var errExp = {};
        			errExp.Exception = ex;
        			errExp.ModuleName = "AllScreenings";
        			errExp.FunctionName = "SetSurveyType";
        			errExp.StackTrace = printStackTrace({ e: ex });
        			ExceptionService.LogException(CommonFunctions.HandleException(errExp));
        		}
        	}

        	/**
            * @ngdoc function 
            * @name setDisabledDates
            * @methodOf roundingModule.controller:AllScreeningsController  
            * @description       
            ** Blocks screening dates using previous screening dates and current date.
            */
        	$scope.setDisabledDates = function () {
        		try {
        			$scope.model.disabledDates = [];
        			$scope.model.screeningDate = new Date();
        			$scope.model.screeningMinDate = new Date($scope.model.screeningDate.getFullYear(), $scope.model.screeningDate.getMonth(), $scope.model.screeningDate.getDate() - 6);
        			$scope.model.screeningMaxDate = new Date($scope.model.screeningDate.getFullYear(), $scope.model.screeningDate.getMonth(), $scope.model.screeningDate.getDate());
        			$scope.model.prevSurveyDates = [];

        			if ($scope.model.SurveyDetail != null && $scope.model.SurveyDetail != undefined) {
        				if ($scope.model.SurveyDetail.UID > 0) {
        					if ($scope.model.SurveyDetail.PreviousSurveyDates === null || $scope.model.SurveyDetail.PreviousSurveyDates === undefined) {
        						$scope.model.SurveyDetail.PreviousSurveyDates = [];
        					}
        					$scope.model.SurveyDetail.PreviousSurveyDates.push($scope.model.SurveyDetail.StartDate);

        					if ($scope.model.SurveyDetail.SurveyStatusCode === SurveyStatusCode.Pending) {
        						$scope.model.screeningDate = CommonFunctions.DateFunctions.parseDate($scope.model.SurveyDetail.StartDate);
        					}
        				} else {
        					$scope.model.SurveyDetail.StartDate = $scope.model.screeningDate;
        				}

        				if ($scope.model.SurveyDetail.PreviousSurveyDates != null && $scope.model.SurveyDetail.PreviousSurveyDates != undefined && $scope.model.SurveyDetail.PreviousSurveyDates.length > 0) {
        					$scope.model.prevSurveyDates = $scope.model.SurveyDetail.PreviousSurveyDates;

        					var parsedDate;
        					var startdate;
        					for (var i = 0; i < $scope.model.SurveyDetail.PreviousSurveyDates.length; i++) {
        						parsedDate = CommonFunctions.DateFunctions.dateFormat(CommonFunctions.DateFunctions.parseDate($scope.model.SurveyDetail.PreviousSurveyDates[i]), "mm-dd-yyyy", false);
        						startdate = CommonFunctions.DateFunctions.dateFormat($scope.model.screeningDate, "mm-dd-yyyy", false);
        						if (parsedDate == startdate) {
        							$scope.model.screeningDate.setDate($scope.model.screeningDate.getDate() - 1)
        							$scope.model.screeningDate.format("mm/dd/yyyy");
        						}
        						$scope.model.disabledDates.push(+new Date(parsedDate));
        					}
        				}
        			}
        		} catch (ex) {
        			var errExp = {};
        			errExp.Exception = ex;
        			errExp.ModuleName = "AllScreenings";
        			errExp.FunctionName = "setDisabledDates";
        			errExp.StackTrace = printStackTrace({ e: ex });
        			ExceptionService.LogException(CommonFunctions.HandleException(errExp));
        		}
        	}

        	/**
            * @ngdoc function
            * @name onGetSurveyDetailsRetrieved
            * @methodOf roundingModule.controller:AllScreeningsController
            * @description             
            ** Service based call back function of GetSurveyDetails Service call.
            ** Calls bindSurveyDetails.
            * @param {object} result
            * return result data of WebApi call.
            */
        	$scope.onGetSurveyDetailsRetrieved = function (result) {
        		try {
        			if (result.resultstatus === Status.ServiceCallStatus.Success && result.data && result.data.SurveyDetails && result.data.SurveyDetails.length > 0) {
        				$scope.model.SurveyDetail = result.data.SurveyDetails[0];
        				q1No = false; q2No = false; q3No = false;
        				$scope.bindSurveyDetails(result.data.SurveyDetails, "prepop");
        				$scope.model.IsPatientRefused = false;
        				getComorbids();
        				AllScreeningsService.SurveyDetail = result.data.SurveyDetails[0];
        				$scope.IsAddingSurvey = true;
        				CommonFunctions.UICanceled();
        			}
        		} catch (ex) {
        			var errExp = {};
        			errExp.Exception = ex;
        			errExp.ModuleName = "Pathway";
        			errExp.FunctionName = "onGetSurveyDetailsRetrieved";
        			errExp.StackTrace = printStackTrace({ e: ex });
        			ExceptionService.LogException(Rounding.Common.HandleException(errExp));
        		}
        		CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
        	}

        	/**
            * @ngdoc event 
            * @name addPathways
            * @eventOf roundingModule.controller:AllScreeningsController  
            * @description       
            ** ng-click event of add screening button.
            ** Calls AllScreeningsService.GetSurveyDetails to generate a new survey. 
            */
        	$scope.addPathways = function () {
				$scope.model.IsAddButtonClicked = !$scope.disableScreeingDate;
        		CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
        		var surveyType = { SurveyTypeCode: $scope.model.surveyType }
        		AllScreeningsService.GetSurveyDetails(surveyType, 'POST', 'JSON', $scope.onGetSurveyDetailsRetrieved);
        		//$scope.model.IsTextBoxDisabled = false;
        	}

        	/**
            * @ngdoc function
            * @name onGetPatientSurveyDetailsRetrieved
            * @methodOf roundingModule.controller:AllScreeningsController
            * @description             
            ** Service based call back function of GetPatientSurveyDetails Service call.
            ** Calls $scope.bindSurveyDetails.
            ** Calls $scope.setDisabledDates.
            * @param {object} result
            * return result data of WebApi call.
            */
        	$scope.onGetPatientSurveyDetailsRetrieved = function (result) {
        		try {
        			if (result.resultstatus === Status.ServiceCallStatus.Success && result.data && result.data.SurveyDetails
                             && result.data.SurveyDetails.length > 0) {
        				q1No = false; q2No = false; q3No = false;
        				$scope.model.SurveyDetail = result.data.SurveyDetails[0];
        				$scope.model.SurveyDetails.data([]);
        				$scope.setDisabledDates();
        				$scope.bindSurveyDetails(result.data.SurveyDetails, "prepop");
        				getComorbids();
        				AllScreeningsService.SurveyDetail = result.data.SurveyDetails[0];
        			} else {
        				$scope.setDisabledDates();
        				$scope.addPathways();
        			}
        			CommonFunctions.UICanceled();
        		} catch (ex) {
        			var errExp = {};
        			errExp.Exception = ex;
        			errExp.ModuleName = "Pathway";
        			errExp.FunctionName = "onGetPatientSurveyDetailsRetrieved";
        			errExp.StackTrace = printStackTrace({ e: ex });
        			ExceptionService.LogException(Rounding.Common.HandleException(errExp));
        		}
        		CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
        	}

        	/**
            * @ngdoc function 
            * @name callGetPtSurveyDetails
            * @methodOf roundingModule.controller:AllScreeningsController  
            * @description       
            ** Calls AllScreeningsService.GetPatientSurveyDetails.
            */
        	$scope.callGetPtSurveyDetails = function () {
        	    if ($scope.allScreeningsValidator) {
        	        $scope.allScreeningsValidator.hideMessages();
        	    }

        	    if ($scope.model) {
        	        $scope.model.IsPatientMedicallyUnableToComplete = false;
        	        $scope.model.IsPatientRefused = false;
        	        $scope.model.IsEscoPatientExempt = false;
        	        $scope.model.IsCaregiverSurveyRequired = false;

        	        $scope.model.IsPatientRefusedDisabled = false;
        	        $scope.model.IsCaregiverSurveyRequiredDisabled = false;
        	        $scope.model.IsPatientMedicallyUnableToCompleteDisabled = false;
        	    }


                CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
        		var patientSurveyDetailFilter = { SurveyTypeCode: $scope.model.surveyType, PatientUID: $rootScope.Global.Objects.SelectedPatient.UID, NoOfSurveys: 1 }

        		$timeout(function () {
        			AllScreeningsService.GetPatientSurveyDetails(patientSurveyDetailFilter, 'POST', 'JSON', $scope.onGetPatientSurveyDetailsRetrieved);
        		}, 0, false);
        	}

        	/**
            * @ngdoc event 
            * @name onFreeFormTextChanged
            * @methodOf roundingModule.controller:AllScreeningsController  
            * @description       
            ** ng-blur event of free form input
            */
        	$scope.onFreeFormTextChanged = function (selectedQuestion, selectedOption) {
        	    if ($scope.model.SurveyDetail && $scope.model.SurveyDetail.QuestionGroups) {
        	        $scope.model.SurveyDetail.QuestionGroups.forEach(function (questionGroup) {
        	            questionGroup.Questions.forEach(function (question) {
        	                if (question.UID === selectedQuestion.UID) {
        	                    question.Options.forEach(function (option) {
        	                        if (option.UID === selectedOption.UID) {
        	                            if (option.FreeFormResponse !== selectedOption.FreeFormResponse) {
        	                                selectedQuestion.HasChanges = true;
        	                            }
        	                            else {
        	                                selectedQuestion.HasChanges = false;
        	                            }
        	                        }
        	                    });
        	                }
        	            });
        	        });
        	    }
        	    $scope.freeFormHasChanges = false;
        	    if ($scope.model.SurveyDetails) {
        	        $scope.model.SurveyDetails.data().forEach(function (surveyDetail) {
        	            surveyDetail.QuestionGroups.forEach(function (questionGroup) {
        	                questionGroup.Questions.forEach(function (question) {
        	                    if (question.HasChanges) {
        	                        $scope.freeFormHasChanges = true;
        	                    }
        	                });
        	            });
        	        });
        	    }
        	}

        	$scope.setScreeningHeader();
        	$scope.callGetPtSurveyDetails();
        });
}());