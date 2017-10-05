(function () {
	/**
    * @ngdoc service 
    * @name roundingModule.service:PatientAssessmentService
    * @description       
    * PatientAssessmentService is being used by PatientAssessmentController
    * This will be used for all service calls for Screenings
    * @param {object} ServiceConstants
    * Common Constants.
    * @param {function} RoundingService
    * Common Function.
    */
	angular.module('roundingModule').factory('PatientAssessmentService', function (ServiceConstants, RoundingService) {
		
		function getPatientAssessmentDetails(data, method, dataType, callBack) {
			RoundingService.ServiceCallWithParams(ServiceConstants.GetPatientAssessment, method, dataType, data, callBack, true);
		}
		
		function getPathwaySurveyDetails(data, method, dataType, callBack) {
		    RoundingService.ServiceCallWithParams(ServiceConstants.WebPathwayGet, method, dataType, data, callBack);
		}
		
		function updatePatientAssessmentDetails(data, method, dataType, callBack) {
			RoundingService.ServiceCallWithParams(ServiceConstants.UpdatePatientAssessment, method, dataType, data, callBack);
		}
		
		function addPatientAssessmentDetails(data, method, dataType, callBack) {
			RoundingService.ServiceCallWithParams(ServiceConstants.AddPatientAssessment, method, dataType, data, callBack);
		}

		function getProviderInfo(data, method, dataType, callBack) {
			RoundingService.ServiceCallWithParams(ServiceConstants.GetPatientIPECaregiver, method, dataType, data, callBack, true);
		}
        
        function saveProviderInfo(data, method, dataType, callBack) {
			
			RoundingService.ServiceCallWithParams(ServiceConstants.SaveProviderAssociations, method, dataType, data, callBack);
		} 		

		return {
			GetPatientAssessmentDetails: getPatientAssessmentDetails,
			UpdatePatientAssessmentDetails: updatePatientAssessmentDetails,
			AddPatientAssessmentDetails: addPatientAssessmentDetails,
			GetProviderInfo: getProviderInfo,
			SaveProviderInfo: saveProviderInfo,
		    getPathwaySurveyDetails: getPathwaySurveyDetails
		}
	});
}());

(function () {
	/**
   * @ngdoc controller
   * @name roundingModule.controller:PatientAssessmentController
   * @description
   * Controller for Screenings
   * @property {object} $scope.model - model of PatientAssessmentController.
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
   * @property {string} $scope.PathwayScreenTitle - Display Header for the screening.
   * @property {boolean} $scope.ShowToolTip - If true, tooltip will be displayed based on response to a question , otherwise false.
   * @property {boolean} $scope.CanPostponeSurvey - set to true if survey is postponed, otherwise false.
   * @property {string} $scope.ToolTip - Display Tool tip based on the response to a question.

   */
	angular.module('roundingModule')
        .controller('PatientAssessmentController', function ($rootScope, $scope, $timeout, LookUp, LookupTypes, PatientAssessmentService,  CommonConstants,
                            Status, ExceptionService, CommonFunctions, CommonMessages, ScreenConstants, ScreeningsSurveyTypes,
                            SurveyStatusCode ) {
            /* Required Lookups */
            $scope.RenalDiseaseCausesLookupData = LookUp.GetLookUp(LookupTypes.RenalDiseaseCause),
            $scope.hearingImp = LookUp.GetLookUp(LookupTypes.HearingImpairment),
            $scope.visionImp = LookUp.GetLookUp(LookupTypes.VisionImpairment);
            /* /Required Lookups */
            $scope.isSaveBtnDisabled = false;
            $scope.isSaveBtnClicked = false;
            $scope.isDataChanged = false;
            $scope.PathwayVM = "PathwayVM";
            $scope.isCareGiverYesSatus = 0;
            $scope.CareGiverDataStatus = 0;
            $scope.careGiverSwitchSelected = { 'Yes': 0, 'No': 0 };
            $scope.addCareGiverClickedStatus = false;
            $scope.isFirstCareGiverYesSatus = 0;
            var tempdate = "";
            $scope.providerPhoneNoKey = 0;

            var baseLinesSaveBtn = { isAnswerYes: false, isPrimaryCareGiverFound: false, isBtnEnabled: false },
                setModel = function () {
                    $scope.model = {
                        CurrentScreen: null, 
                        screeningDate: null,
                        screeningDateString: null,
                        Providers: [], 
                        isCareGiverYesNoChanged: false,
                        IsPrimaryCareGiverFound: false,
                        IsDateEnteredFirstTimeFlag: false,
                        IsCaregiverSurveyRequired: false,
                        IsCaregiverSurveyRequiredDisabled: false,
                        IsFreeFormResponseNull: false,
                        IsTextBoxDisabled: false,
                        surveyType: null,
                        screenIdClass: "IPECAREGIVER",
                        Baseline: {},
                        OriginalBaseLine: [],
                        HeaderLabels: [],
                        DialysisType: null,
                        RenalDiseaseCauses: null,
                        HearingImpairments: null,
                        VisionImpairments: null,
                        DialysisSettings: [{
                            Value: '',
                            Text: 'Select a value'
                        }, {
                            Value: 0,
                            Text: 'Inpatient'
                        }, {
                            Value: 1,
                            Text: 'Outpatient'
                        }, {
                            Value: 2,
                            Text: 'Unknown'
                        }],
                        EmptyDropDown: {
                            Text: 'Select a value',
                            Key: '',
                            Value: ''
                        },
                        CareGiverOptions: {
                            IsAddVisible: false,
                            IsEditVisible: false,
                            IsSaveVisible: false,
                            IsCancelVisible: false,
                            IsDeleteVisible: false,
                            IsVisible: false,
                            IsDisabled: false,
                            IsNewRecordAdded: false,
                            DataState: null
                        }
                    };	
                }	, getDefaultProviderData = function () {
                    return {
                        name: null, 
                        PhoneNumber: null, 
                        allowCommunication: false,
                        EffectiveDate: null,
                        EndDate: null,
                        UID: 0
                    };
                },	
			
			setQuestions = function () {
				
			    var tempQuestions = [ {
			        label:	"Chewing Tobacco Use",
			        name: "IsChewingTobaccoYesNo",
			        answer: $scope.model.Baseline.IsChewingTobaccoYesNo ? $scope.model.Baseline.IsChewingTobaccoYesNo : 0,
			        questionID: 0
			    },
					{
					    label:	"Smoking Tobacco Use",
					    name: "IsCurrentSmoker",
					    answer: $scope.model.Baseline.IsCurrentSmoker ? $scope.model.Baseline.IsCurrentSmoker : 0,
					    questionID: 1
					},
					{
					    label:	"Exercises",
					    name: "IsDoingExercise",
					    answer: $scope.model.Baseline.IsDoingExercise ? $scope.model.Baseline.IsDoingExercise : 0,
					    questionID: 2
					},
					{
					    label:	"Checks Weight",
					    name: "IsDoingWeightCheck",
					    answer: $scope.model.Baseline.IsDoingWeightCheck ? $scope.model.Baseline.IsDoingWeightCheck : 0,
					    questionID: 3
					},
					{
					    label:	"Checks BP",
					    name: "IsDoingBPCheck",
					    answer: $scope.model.Baseline.IsDoingBPCheck ? $scope.model.Baseline.IsDoingBPCheck : 0,
					    questionID: 4
					}
			    ];
           
			    var questions = [], 
				indx = -1,
				len = tempQuestions.length;
				
			    for(var i = 0; i < len; i++) {
			        indx++;
			        var options = [{
			            IsSelected: tempQuestions[i].answer ?  "1" : "2" ,
			            Description: "Yes",
			            OptionOrder: 1,
			            QuestionID: i,
			            ID: indx
			        },
					{
					    IsSelected: tempQuestions[i].answer ?  "1" : "2" ,
					    Description: "No",
					    OptionOrder: 2,
					    QuestionID: i,
					    ID: (indx + 1)
					}];
					
			        var question = {
			            Text: tempQuestions[i].label,
			            IndexName: tempQuestions[i].name,
			            Options:  options
			        };
			        questions[i] = question;
			    }	
			    $scope.Questions = questions;
			},
            timeStamp = function (date) {
                var timestamp = (new Date(date).getTime()) / 1000;
                console.log('timestamp : ' + timestamp);
                return timestamp;
            }, IsFutureDate = function (inputDate) {
			   
                var MinTimestamp = parseInt((new Date(inputDate).getTime()) / 1000);
                var MaxTimestamp = parseInt((new Date().getTime()) / 1000);
                if (MinTimestamp >= MaxTimestamp ) {
                    return true;
                } else {
                    return false;
                }
			  
			},FormatDate = function (date) {			   
			    var today = new Date(date);
			    var dd = today.getDate(),
                    mm = today.getMonth() + 1,
                    yyyy = today.getFullYear(),
                    todayStr = '';
			    if (dd < 10) {
			        dd = '0' + dd;
			    }
			    if (mm < 10) {
			        mm = '0' + mm;
			    }
			    todayStr = mm + '/' + dd + '/' + yyyy;
			    return todayStr;
			}, getNoOfDaysBackDate = function (days) {
			    var today = new Date(date);
			    today.setDate(d.getDate() - days);
			    var dd = today.getDate(),
                    mm = today.getMonth() + 1,
                    yyyy = today.getFullYear(),
                    todayStr = '';
			    if (dd < 10) {
			        dd = '0' + dd;
			    }
			    if (mm < 10) {
			        mm = '0' + mm;
			    }
			    todayStr = mm + '/' + dd + '/' + yyyy;
			    return todayStr;
			},
            formatDates = function () {
                if ($scope.model.Baseline.IPEDate) {
                    $scope.model.Baseline.IPEDate = FormatDate($scope.model.Baseline.IPEDate);
                }

                if ($scope.model.Baseline.FirstEverDialysisDate) {
                    $scope.model.Baseline.FirstEverDialysisDate = FormatDate($scope.model.Baseline.FirstEverDialysisDate);
                }
                if ($scope.model.Baseline.FirstChronicDialysisDate) {
                    $scope.model.Baseline.FirstChronicDialysisDate = FormatDate($scope.model.Baseline.FirstChronicDialysisDate);
                }
            }, IsDateBetweenPastSevenDays = function (inputDate) {
                var date2 = new Date();
                inputDate.setHours(0);
                inputDate.setMinutes(0, 0, 0);
                date2.setHours(0);
                date2.setMinutes(0, 0, 0);
                var datediff = Math.abs(inputDate.getTime() - date2.getTime());
                var days= parseInt(datediff / (24 * 60 * 60 * 1000), 10);   
                var isValidDate = 0;
                if(days < 7 ){
                    isValidDate = 1;
                 }
                return isValidDate;
            },setSurveyData = function (statusCode) {
                $scope.model.Baseline.SurveyResponse = {};

                $scope.model.Baseline.SurveyResponse.SurveyStatus = statusCode;
                $scope.model.Baseline.SurveyResponse.CompletedDate = FormatDate(new Date());
			    
                $scope.model.Baseline.SurveyResponse.UID = $scope.model.Baseline.PathwayVM && $scope.model.Baseline.PathwayVM.UID > 0 ? $scope.model.Baseline.PathwayVM.UID : 0;
                $scope.model.Baseline.SurveyResponse.DataState = CommonConstants.DataStateEnum.Modified;

                $scope.model.Baseline.SurveyResponse.SurveyTypeCode = $scope.model.screenIdClass;
                $scope.model.Baseline.SurveyResponse.StartDate = FormatDate(new Date());

                $scope.model.Baseline.SurveyResponse.PatientUID = $rootScope.Global.Objects.SelectedPatient.UID;//$scope.model.Baseline.PatientUID;
                $scope.model.Baseline.SurveyResponse.SurveyUID = $scope.model.Baseline.PathwayVM.SurveyUID || '' ;
                $scope.model.Baseline.SurveyResponse.SurveyComments = $scope.model.Baseline.PathwayVM.LevelComments;
                $scope.model.Baseline.SurveyResponse.Level = $scope.model.Baseline.PathwayVM.Level;
                $scope.model.Baseline.SurveyResponse.RefusalReasonCode = $scope.model.Baseline.PathwayVM.RefusalReasonCode;
                $scope.model.Baseline.SurveyResponse.IncludePatientCommentYesNo = $scope.model.Baseline.PathwayVM.IncludePatientCommentYesNo || '';
                $scope.model.Baseline.SurveyResponse.IncludeProviderCommentYesNo = $scope.model.Baseline.PathwayVM.IncludeProviderCommentYesNo || '';
			    $scope.model.Baseline.SurveyResponse.Comments = "";
			    $scope.model.Baseline.SurveyResponse.ResponseQuestions = [];
			    var questionGroupsTotal = $scope.model.Baseline.PathwayVM.QuestionGroups.length;
			    for (var i = 0; i < questionGroupsTotal; i++) {
			        $scope.model.Baseline.SurveyResponse.ResponseQuestions[i] = {};
			        var questionsTotal = $scope.model.Baseline.PathwayVM.QuestionGroups[i].Questions.length;
			        for (var j = 0; j < questionsTotal; j++) {
			            $scope.model.Baseline.SurveyResponse.ResponseQuestions[i].QuestionUID = $scope.model.Baseline.PathwayVM.QuestionGroups[i].Questions[j].UID;
			            $scope.model.Baseline.SurveyResponse.ResponseQuestions[i].Responses = [];
			            $scope.model.Baseline.SurveyResponse.ResponseQuestions[i].Responses[j] = {};
			            var OptionUID = 0;
			            if ($scope.model.Baseline.PathwayVM.QuestionGroups[i].Questions[j].CanBePrepopulated == true) {
			                var optionsTotal = $scope.model.Baseline.PathwayVM.QuestionGroups[i].Questions[j].Options.length;
			                for (var k = 0; k < optionsTotal; k++) {
			                    if ($scope.model.Baseline.PathwayVM.QuestionGroups[i].Questions[j].Options[k].Description == 'Yes' && ($scope.isCareGiverYesSatus == 1 ) ) {
			                        OptionUID = $scope.model.Baseline.PathwayVM.QuestionGroups[i].Questions[j].Options[k].UID;
			                        $scope.model.Baseline.PathwayVM.QuestionGroups[i].Questions[j].Options[k].IsSelected = true;
			                    } else if ($scope.model.Baseline.PathwayVM.QuestionGroups[i].Questions[j].Options[k].Description == 'Yes' && ($scope.isCareGiverYesSatus == 2) ) {
			                       $scope.model.Baseline.PathwayVM.QuestionGroups[i].Questions[j].Options[k].IsSelected = false;
			                    }else if ($scope.model.Baseline.PathwayVM.QuestionGroups[i].Questions[j].Options[k].Description == 'No' && ($scope.isCareGiverYesSatus == 1 ) ) {
			                       $scope.model.Baseline.PathwayVM.QuestionGroups[i].Questions[j].Options[k].IsSelected = false;
			                    } else if ($scope.model.Baseline.PathwayVM.QuestionGroups[i].Questions[j].Options[k].Description == 'No' && ($scope.isCareGiverYesSatus == 2)) {
			                        OptionUID = $scope.model.Baseline.PathwayVM.QuestionGroups[i].Questions[j].Options[k].UID;
			                        $scope.model.Baseline.PathwayVM.QuestionGroups[i].Questions[j].Options[k].IsSelected = true;
			                    }
			                }
			                $scope.model.Baseline.SurveyResponse.ResponseQuestions[i].Responses[j].OptionUID = OptionUID;
			            }
                    }
			    }

			}, UpdatePatientIPE = function () {

			    PatientAssessmentService.UpdatePatientAssessmentDetails($scope.model.Baseline, 'POST', 'JSON', $scope.onSavePatientAssessmentDetailsRetrieved);			    			    
			},
            AddPatientIPE = function () {
                PatientAssessmentService.AddPatientAssessmentDetails($scope.model.Baseline, 'POST', 'JSON', $scope.onSavePatientAssessmentDetailsRetrieved);
            },         
             validatePhone = function (phoneno) {
                var testresults;
                var filter = /.?\d{3}.?\d{3}.?\d{4}\b/i;
                if (filter.test(phoneno))
                    testresults = true;
                else {
                    testresults = false;
                }
                return (testresults);
            }, 
            careGiverFunctionality = function (type, careGiverResponse) {

                var careGiverData = $scope.model.ProvidersTemp;
                var careGiverSatus = 0;
                if ((careGiverData) && (careGiverData.length) > 0 && (careGiverData[0].nameUID)) {
                    careGiverSatus = 1;
                } else {
                    careGiverSatus = 0;
                }
               
                if ($scope.isCareGiverYesSatus == 0 || type == 3) {
                    var careGiverResponse = false;
                    if ($scope.model.Baseline.PathwayVM && $scope.model.Baseline.PathwayVM.QuestionGroups && $scope.model.Baseline.PathwayVM.QuestionGroups.length > 0 && $scope.model.Baseline.PathwayVM.QuestionGroups[0] && $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions && $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions[0] && $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions.length > 0 && $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions[0]) {
                        var careData = $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions[0];
                        if (careData.CanBePrepopulated == true) {
                            var cnt = careData.Options.length;
                            for (var i = 0; i < cnt; i++) {
                                if (careData.Options[i].Description == 'Yes' && careData.Options[i].IsSelected) {
                                    careGiverResponse = 1;                                   
                                } else if (careData.Options[i].Description == 'No' && careData.Options[i].IsSelected) {
                                    careGiverResponse = 2;
                                }
                            }
                        }
                    }
                    if (careGiverData[0] && careGiverData[0].EndDate != null && FormatDate(careGiverData[0].EndDate) > FormatDate(new Date())) {
                        
                        careGiverResponse = 1;
                    } else {                        
                        
                        careGiverResponse = 2;                                  
                    }
                    $scope.isCareGiverYesSatus = careGiverResponse;                    
                }

                if (careGiverResponse == 1) {
                    setCareGiverQuestionResponse('Yes');
                }else{
                    setCareGiverQuestionResponse('No');
                }

                if (careGiverResponse == 1 ) {
                    if (careGiverSatus == 1) {
                        $scope.model.CareGiverOptions.IsVisible = true;
                        $scope.model.CareGiverOptions.IsAddVisible = true;
                        $scope.model.CareGiverOptions.IsEditVisible = true;
                        $scope.model.CareGiverOptions.IsDisabled = true;
                        $scope.model.CareGiverOptions.IsCancelVisible = false;
                        $scope.model.CareGiverOptions.IsSaveVisible = false;
                        $scope.model.CareGiverOptions.IsDeleteVisible = false;
                        $scope.isSaveBtnDisabled = false;
                   
                    } else if (careGiverSatus == 0 ) {
                        $scope.model.CareGiverOptions.IsVisible = true;
                        $scope.model.CareGiverOptions.IsDisabled = true;
                        $scope.model.CareGiverOptions.IsAddVisible = true;
                        $scope.model.CareGiverOptions.IsEditVisible = false;
                        $scope.model.CareGiverOptions.IsCancelVisible = false;
                        $scope.model.CareGiverOptions.IsSaveVisible = false;
                        $scope.model.CareGiverOptions.IsDeleteVisible = false;
                        $scope.isSaveBtnDisabled = true;                       
                    }	
                } else if (careGiverResponse == 2 ) {
                    if (careGiverSatus == 1) {
                        $scope.model.CareGiverOptions.IsVisible = true;
                        $scope.model.CareGiverOptions.IsDisabled = true;
                        $scope.model.CareGiverOptions.IsDeleteVisible = true;
                        $scope.model.CareGiverOptions.IsAddVisible = false;
                        $scope.model.CareGiverOptions.IsEditVisible = false;
                        $scope.model.CareGiverOptions.IsCancelVisible = false;
                        $scope.model.CareGiverOptions.IsSaveVisible = false;
                        $scope.isSaveBtnDisabled = true;
                        
                    } else {
                        $scope.model.CareGiverOptions.IsVisible = false;
                        $scope.model.CareGiverOptions.IsDisabled = false;
                        $scope.model.CareGiverOptions.IsAddVisible = false;
                        $scope.model.CareGiverOptions.IsEditVisible = false;
                        $scope.model.CareGiverOptions.IsCancelVisible = false;
                        $scope.model.CareGiverOptions.IsSaveVisible = false;
                        $scope.model.CareGiverOptions.IsDeleteVisible = false;
                        $scope.isSaveBtnDisabled = false;
                        $scope.model.Providers = [];
                    }               
                }
                if ($scope.isFirstCareGiverYesSatus == 0) {
                    $scope.isSaveBtnDisabled = false;
                    $scope.isFirstCareGiverYesSatus = 1;
                }
            },
            genarateCareFunctionalityBlock = function (type, Providers) {
                if ($scope.isCareGiverYesSatus == 2) {
                    setCareGiverQuestionResponse('No');
                } else {
                    setCareGiverQuestionResponse('Yes');
                }
                if (type == 1) {
                    if ((Providers) && (Providers.length) > 0 && (Providers[0].nameUID)) {
                        $scope.careGiveDataState = CommonConstants.DataStateEnum.UnChanged;
                        $scope.model.CareGiverOptions.IsCancelVisible = false;
                        $scope.model.CareGiverOptions.IsSaveVisible = false;
                        $scope.model.CareGiverOptions.IsAddVisible = false;
                        $scope.model.CareGiverOptions.IsEditVisible = false;
                        $scope.model.CareGiverOptions.IsDisabled = true;
                        $scope.model.CareGiverOptions.IsDeleteVisible = true;
                        $scope.model.CareGiverOptions.IsVisible = true;

                        $scope.isSaveBtnDisabled = true;
                        $scope.model.ProvidersTemp = angular.copy($scope.model.OriginalProviders);
                    } else {
                        $scope.careGiveDataState = CommonConstants.DataStateEnum.UnChanged;		                    	                    
                        $scope.model.CareGiverOptions.IsVisible = false;
                        $scope.model.CareGiverOptions.IsCancelVisible = false;
                        $scope.model.CareGiverOptions.IsSaveVisible = false;
                        $scope.model.CareGiverOptions.IsAddVisible = false;
                        $scope.model.CareGiverOptions.IsEditVisible = false;
                        $scope.model.CareGiverOptions.IsDisabled = false;
                        $scope.model.CareGiverOptions.IsDeleteVisible = false;

                        $scope.isSaveBtnDisabled = false;
                        $scope.model.ProvidersTemp = angular.copy($scope.model.OriginalProvidersTemp);
                    }
                } else if (type == 2) {
                    if ($scope.isCareGiverYesSatus == 2) {
                        if ((Providers) && (Providers.length) > 0 && (Providers[0].nameUID)) {
                            $scope.careGiveDataState = CommonConstants.DataStateEnum.UnChanged;
                            $scope.model.CareGiverOptions.IsDisabled = true;
                            $scope.model.CareGiverOptions.IsVisible = true;
                            $scope.model.CareGiverOptions.IsAddVisible = false;
                            $scope.model.CareGiverOptions.IsEditVisible = false;
                            $scope.model.CareGiverOptions.IsCancelVisible = false;
                            $scope.model.CareGiverOptions.IsSaveVisible = false;
                            $scope.model.CareGiverOptions.IsDeleteVisible = true;
                            $scope.isSaveBtnDisabled = true;
                            $scope.model.ProvidersTemp = angular.copy($scope.model.OriginalProviders);
                        } else {
                            $scope.careGiveDataState = CommonConstants.DataStateEnum.UnChanged;
                            $scope.model.CareGiverOptions.IsDisabled = true;
                            $scope.model.CareGiverOptions.IsAddVisible = false;
                            $scope.model.CareGiverOptions.IsEditVisible = false;
                            $scope.model.CareGiverOptions.IsCancelVisible = false;
                            $scope.model.CareGiverOptions.IsSaveVisible = false;
                            $scope.model.CareGiverOptions.IsDeleteVisible = false;
                             $scope.model.CareGiverOptions.IsVisible = false;
                            $scope.isSaveBtnDisabled = false;
                            $scope.model.ProvidersTemp = angular.copy($scope.model.OriginalProviders);
                            
                        }
                    } else if ($scope.isCareGiverYesSatus == 1) {
                        if ((Providers) && (Providers.length) > 0 && (Providers[0].nameUID)) {
                            $scope.careGiveDataState = CommonConstants.DataStateEnum.UnChanged;
                            $scope.model.CareGiverOptions.IsDisabled = true;
                            $scope.model.CareGiverOptions.IsVisible = true;
                            $scope.model.CareGiverOptions.IsAddVisible = true;
                            $scope.model.CareGiverOptions.IsEditVisible = true;
                            $scope.model.CareGiverOptions.IsCancelVisible = false;
                            $scope.model.CareGiverOptions.IsSaveVisible = false;
                            $scope.model.CareGiverOptions.IsDeleteVisible = false;
                            $scope.isSaveBtnDisabled = true;
                            $scope.model.ProvidersTemp = angular.copy($scope.model.OriginalProviders);
                        } else {
                            $scope.careGiveDataState = CommonConstants.DataStateEnum.UnChanged;
                            $scope.model.CareGiverOptions.IsDisabled = true;
                            $scope.model.CareGiverOptions.IsAddVisible = true;
                            $scope.model.CareGiverOptions.IsEditVisible = false;
                            $scope.model.CareGiverOptions.IsCancelVisible = false;
                            $scope.model.CareGiverOptions.IsSaveVisible = false;
                            $scope.model.CareGiverOptions.IsDeleteVisible = false;
                            $scope.model.CareGiverOptions.IsVisible = false;
                            $scope.isSaveBtnDisabled = false;
                            $scope.model.ProvidersTemp = angular.copy($scope.model.OriginalProviders);
                        }
                    }
                }
            },
            setCareGiverQuestionResponseById = function (queId) {
                
                if ($scope.model.Baseline.PathwayVM && $scope.model.Baseline.PathwayVM.QuestionGroups && $scope.model.Baseline.PathwayVM.QuestionGroups.length > 0 && $scope.model.Baseline.PathwayVM.QuestionGroups[0] && $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions && $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions[0] && $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions.length > 0 && $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions[0]) {

                    var careData = $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions[0];                    
                    if (careData.CanBePrepopulated == true) {
                        var cnt = careData.Options.length;
                        for (var i = 0; i < cnt; i++) {
                            
                            if (careData.Options[i].Description == 'No') {
                                noId = careData.Options[i].UID;
                                $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions[0].Options[i].IsSelected = false;
                                $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions[0].Options[i].SelectedIndex = false;
                            }
                        }
                       
                    }
                }
            },
            setCareGiverQuestionResponse = function (responseText) {
                if ($scope.model.Baseline.PathwayVM && $scope.model.Baseline.PathwayVM.QuestionGroups && $scope.model.Baseline.PathwayVM.QuestionGroups.length > 0 && $scope.model.Baseline.PathwayVM.QuestionGroups[0] && $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions && $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions[0] && $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions.length > 0 && $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions[0]) {
                    var careData = $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions[0];
                    var yesId = 0, noId = 0, yesStatus = 0, noStatus = 0, queId = 0;

                    if (responseText == 'Yes') {
                        yesStatus = true;
                        noStatus = false;
                    } else {
                        yesStatus = false;
                        noStatus = true;
                    }

                    if (careData.CanBePrepopulated == true) {
                        var cnt = careData.Options.length;
                        for (var i = 0; i < cnt; i++) {
                            queId = careData.Options[i].QuestionUID;
                            if (responseText == 'Yes') {
                                if (careData.Options[i].Description == 'Yes' ) {
                                yesId = careData.Options[i].UID;
                                
                                $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions[0].Options[i].IsSelected = yesStatus;
                                $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions[0].Options[i].SelectedIndex = yesStatus;
                            }

                            if (careData.Options[i].Description == 'No' ) {
                                noId = careData.Options[i].UID;
                                $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions[0].Options[i].IsSelected = noStatus;
                                $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions[0].Options[i].SelectedIndex = noStatus;
                            }

                            } else {
                                    var care = careData.Options[i];
                                    if (careData.Options[i].Description == 'Yes' ) {
                                        yesId = careData.Options[i].UID;
                                        $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions[0].Options[i].IsSelected = yesStatus;
                                        $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions[0].Options[i].SelectedIndex = yesStatus;
                                    }

                                    if (careData.Options[i].Description ==  'No' ) {
                                        noId = careData.Options[i].UID;
                                        $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions[0].Options[i].IsSelected = noStatus;
                                        $scope.model.Baseline.PathwayVM.QuestionGroups[0].Questions[0].Options[i].SelectedIndex = noStatus;
                                    }
                                    //this is a bad logic but i had to do it - sankp
                                    setTimeout(function () {
                                        $('#caregiver' + '-' + care.QuestionUID + '-' + care.UID).prop('checked', true);
                                    }, 300);
                            }
                        }
                        /*
                        if( responseText == 'Yes' ){
                            setCareGiverQuestionResponseById(queId,yesId, true);
                            setCareGiverQuestionResponseById(queId.noId, false);
                        }else if( responseText == 'No' ){
                            setCareGiverQuestionResponseById(queId,yesId, false);
                            setCareGiverQuestionResponseById(queId,noId, true);
                        }*/
                    }
                }
            },
             setFirstEverDialysisSelected = function () {
                 var SettingFirstEverDialysisIndex = '';
                 if (typeof ($scope.model.Baseline.SettingFirstEverDialysis) == 'undefined' || $scope.model.Baseline.SettingFirstEverDialysis == null ) {
                     SettingFirstEverDialysisIndex = 0;
                 } else {
                     SettingFirstEverDialysisIndex = ($scope.model.Baseline.SettingFirstEverDialysis) + 1;
                 }
                 $scope.model.DialysisSettings.SelectedType = $scope.model.DialysisSettings[SettingFirstEverDialysisIndex];                
             },
            setRenalDiseaseCausesSelected = function () {
                $scope.model.RenalDiseaseCauses = $scope.model.Baseline.ICDType === CommonConstants.ICDTypes.ICD9 ? $scope.renalDiseaseCausesICD9TypeData : $scope.renalDiseaseCausesICD10TypeData;
                var indx = 0;
                if($scope.model.Baseline.RenalDiseaseCause) {
                    for(var i = 0; i < $scope.model.RenalDiseaseCauses.length; i++) {
                        if(($scope.model.RenalDiseaseCauses[i].Value) && $scope.model.RenalDiseaseCauses[i].Value === $scope.model.Baseline.RenalDiseaseCause) {
                            indx = i;
                            break;
                        }
                    }	
                }
                $scope.model.RenalDiseaseCauses.SelectedType = $scope.model.RenalDiseaseCauses[indx];
            },
               setHearingImpairmentsSelected = function () {
                   if ($scope.model.HearingImpairments){
                       for(var i = 0; i < $scope.model.HearingImpairments.length; i++) {
                           if ($scope.model.HearingImpairments[i].Value == $scope.model.Baseline.HearingImpairment) {
                               $scope.model.HearingImpairments.SelectedType = $scope.model.HearingImpairments[i];
                           }
                       }   
                       if(!$scope.model.Baseline.HearingImpairment){
                               $scope.model.HearingImpairments.SelectedType = $scope.model.HearingImpairments[0];
                        }
                   }
               }, 
               setVisionImpairmentsSelected = function () {
                   if ($scope.model.VisionImpairments){
                       for (var i = 0; i < $scope.model.VisionImpairments.length; i++) {
                           if ($scope.model.VisionImpairments[i].Value == $scope.model.Baseline.VisionImpairment) {
                               $scope.model.VisionImpairments.SelectedType = $scope.model.VisionImpairments[i];
                           }
                       }
                       if (!$scope.model.Baseline.VisionImpairment) {
                           $scope.model.VisionImpairments.SelectedType = $scope.model.VisionImpairments[0];
                       }
                   }
               },             
               setICD = function () {
                   var selectedIndex = $scope.model.Baseline.ICDType === CommonConstants.ICDTypes.ICD9 ? 1 : 2;
                   $scope.ICD = [{
                       Text: "ICD Code Type",
                       IndexName: $scope.model.Baseline.ICDType,
                       SelectedIndex: selectedIndex,
                       Options: [{
                           TypeCode: "ICD9",
                           Description: "ICD-9",
                           IsSelected: selectedIndex === 1,
                           OptionOrder: 1
                       },
                       {
                           TypeCode: "ICD10",
                           Description: "ICD-10",
                           IsSelected: selectedIndex === 2,
                           OptionOrder: 2
                       }]
                   }];
               },
			retrieveProviderInfo = function () {
			    CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
			    var data = $.param({ '': $rootScope.Global.Objects.SelectedPatient.UID });
			    PatientAssessmentService.GetProviderInfo(data, 'POST', 'JSON', onGetProviderInfoRetrieved);
			},
                onGetProviderInfoRetrieved = function (result) {
                    try {
                        if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                            $scope.model.Providers = [];
                            $scope.model.lastProviders = [];

                            $scope.model.OriginalProvidersData = angular.copy(result.data);
                            $scope.model.IsPrimaryCareGiverFound = false;
                            $scope.providerPhoneNoKey = 0;
                            var provider = getDefaultProviderData();

                            if (result.data.length === 0) {
                                $scope.model.Providers.push(provider);
                            } else if (result.data.length >= 1) {
                                $scope.model.IsPrimaryCareGiverFound = true;
                                var providerCount = result.data.length;
                                if (providerCount > 2) {
                                    providerCount = 2;
                                }
                                
                                for (var i = 0; i < providerCount ; i++) {
                                    provider = getDefaultProviderData();
                                    provider.name = result.data[i].ProviderInfo.Name;
                                    provider.nameUID = result.data[i].ProviderInfo.UID;
                                    
                                    if (result.data[i].ProviderInfo.ProviderAddress.length > 0) {
                                        if(result.data[i].ProviderInfo.ProviderAddress[0]){
                                        provider.providerAddressUID = result.data[i].ProviderInfo.ProviderAddress[0].UID;
                                            var PhonesLength = result.data[i].ProviderInfo.ProviderAddress[0].Phones.length;
                                            if (PhonesLength > 0) {
                                                for (var p = 0; p < PhonesLength; p++) {
                                                    if (result.data[i].ProviderInfo.ProviderAddress[0].Phones[p]['Type'] == "W") {
                                                        if(i == 0 ){
                                                            $scope.providerPhoneNoKey = p;
                                                        }
                                                        provider.PhoneNumber = result.data[i].ProviderInfo.ProviderAddress[0].Phones[p]['PhoneNumber'];
                                                        provider.PhoneNumberUID = result.data[i].ProviderInfo.ProviderAddress[0].Phones[p].UID;
                                                    }
                                                }
                                            }
                                        }
                                    } else {
                                        provider.providerAddressUID = 0;
                                    }

                                    provider.allowCommunication = result.data[i].ProviderInfo.AllowCommunication;
                                    provider.EffectiveDate = result.data[i].EffectiveDate;
                                    provider.EndDate = result.data[i].EndDate;
                                    provider.UID = result.data[i].UID;
                                   

                                    if (FormatDate(result.data[i].EndDate) > FormatDate(new Date())) {
                                        $scope.model.Providers.push(provider);                                        
                                    } else {
                                        $scope.model.lastProviders.push(provider);
                                    }
                                    
                                }
                            }

                            $scope.model.OriginalProviders = angular.copy($scope.model.Providers);
                            $scope.model.ProvidersTemp = angular.copy($scope.model.Providers);

                            careGiverFunctionality(2, $scope.isCareGiverYesSatus);
                            
                            if (CommonFunctions.UIChanged) {
                                CommonFunctions.UIChanged;
                            } else {
                                CommonFunctions.UICanceled();
                            }                            
                        }
                    } catch (ex) {
                        var errExp = {};
                        errExp.Exception = ex;
                        errExp.ModuleName = "Pathway";
                        errExp.FunctionName = "onGetProviderInfoRetrieved";
                        errExp.StackTrace = printStackTrace({ e: ex });
                        ExceptionService.LogException(Rounding.Common.HandleException(errExp));
                    }
                    $timeout(function () {
                        CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
                    }, 0, false);
                }, setRequiredLookups = function () {
                    
                    if (!$scope.RenalDiseaseCausesLookupData) {
                        $scope.RenalDiseaseCausesLookupData = LookUp.GetLookUp(LookupTypes.RenalDiseaseCause);
                    }
                    if (!$scope.HearingImpairment) {
                        $scope.hearingImp = LookUp.GetLookUp(LookupTypes.HearingImpairment);
                    }
                    if (!$scope.VisionImpairment) {
                        $scope.visionImp = LookUp.GetLookUp(LookupTypes.VisionImpairment);
                    }

                    $scope.renalDiseaseCausesICD9TypeData = [];
                    $scope.renalDiseaseCausesICD10TypeData = [];
                    if ($scope.RenalDiseaseCausesLookupData){
                        $scope.model.RenalDiseaseCauses = Object.keys($scope.RenalDiseaseCausesLookupData).map(function (e) {
                            return $scope.RenalDiseaseCausesLookupData[e];
                        });
                   
                        angular.forEach($scope.model.RenalDiseaseCauses, function (item) {

                            if (item.Value) {
                                item.Order = 1;
                            } else {
                                item.Order = 0;
                            }
                            if (item.Text == CommonConstants.ICDTypes.SELECT_A_VALUE) {
                                $scope.renalDiseaseCausesICD9TypeData.push(item);
                                $scope.renalDiseaseCausesICD10TypeData.push(item);
                            }
                            if (item.AdditionalInfo == CommonConstants.ICDTypes.ICD9) {
                                $scope.renalDiseaseCausesICD9TypeData.push(item);
                            } else if (item.AdditionalInfo == CommonConstants.ICDTypes.ICD10) {
                                $scope.renalDiseaseCausesICD10TypeData.push(item);
                            }
                        });
                        $scope.model.RenalDiseaseCauses.SelectedType = $scope.model.RenalDiseaseCauses[0];
                    }
                    
                    if ($scope.hearingImp){
                        $scope.model.HearingImpairments = Object.keys($scope.hearingImp).map(function (e) {
                            return $scope.hearingImp[e];
                        });
                        if ($scope.model.Baseline.HearingImpairment == 0 || $scope.model.Baseline.HearingImpairment) {
                            indx = parseInt($scope.model.Baseline.HearingImpairment) === 0 ? 0 : parseInt($scope.model.Baseline.HearingImpairment);
                        } else {
                            indx = 0;
                        }
                        $scope.model.HearingImpairments.SelectedType = $scope.hearingImp[indx];

                    }
                    if ($scope.visionImp) {

                        $scope.model.VisionImpairments = Object.keys($scope.visionImp).map(function (e) {
                            return $scope.visionImp[e];
                        });
                        if ($scope.model.Baseline.VisionImpairment == 0 || $scope.model.Baseline.HearingImpairment) {
                            indx = parseInt($scope.model.Baseline.HearingImpairment) === 0 ? 0 : parseInt($scope.model.Baseline.HearingImpairment);
                        } else {
                            indx = 0;
                        }                        
                        $scope.model.VisionImpairments.SelectedType = $scope.visionImp[indx];
                    }

                };
           
            $scope.thingsChange = function (questionID) {
                for (var i = 0; i < $scope.Questions.length; i++) {
                    if (questionID === i) {
                        if ($scope.model.Baseline[$scope.Questions[questionID].IndexName]) {
                            $scope.model.Baseline[$scope.Questions[questionID].IndexName] = false;
                        } else {
                            $scope.model.Baseline[$scope.Questions[questionID].IndexName] = true;
                        }
                        CommonFunctions.UIChanged();
                        break;
                    }
                }
            };
			$scope.renalDiseaseCausesTypeChange = function () {
			    $scope.model.Baseline.RenalDiseaseCause = $scope.model.RenalDiseaseCauses.SelectedType.Value;
			    CommonFunctions.UIChanged();
			};
			$scope.hearingImpairmentsTypeChange = function () {
			    $scope.model.Baseline.HearingImpairment = $scope.model.HearingImpairments.SelectedType.Value;
			    CommonFunctions.UIChanged();
			};
			$scope.visionImpairmentsTypeChange = function () {
			    $scope.model.Baseline.VisionImpairment = $scope.model.VisionImpairments.SelectedType.Value;
			    CommonFunctions.UIChanged();
			};
			$scope.onDialysisTypeChange = function () {
			    $scope.model.Baseline.SettingFirstEverDialysis = $scope.model.DialysisSettings.SelectedType.Value;
			    CommonFunctions.UIChanged();
			};
			$scope.onSwitchChange = function (optionObj) {			    
			    CommonFunctions.UIChanged();
			};
			$scope.IPEDateOptions = {
			    format: "MM/dd/yyyy",
			    open: function (e) {
			        tempdate = $("#asst-screening-datepicker").data("kendoDatePicker").value();
			        $("#asst-screening-datepicker").data("kendoDatePicker").value(new Date());
			    },
			    close: function (e) {
			        $("#asst-screening-datepicker").data("kendoDatePicker").value(tempdate);
			    },
			    change: function () {
			        CommonFunctions.UIChanged();
			        tempdate = $("#asst-screening-datepicker").data("kendoDatePicker").value();
			    }
			}

			//$scope.open = function(e) {
			//    tempdate = angular.copy($scope.model.Baseline.IPEDate);
			//    $scope.model.Baseline.IPEDate = new Date();
			//};
			//$scope.close = function (e) {
			//    $scope.model.Baseline.IPEDate = angular.copy(tempdate);			    
			//};
			//$scope.dateValueChange = function (e) {
			//    tempdate = angular.copy($scope.model.Baseline.IPEDate);
			//    CommonFunctions.UIChanged();
			//};

			$scope.careGiverSwitchChange = function (optionObj) {
			    var changedStatus = 0;
			    if (optionObj.Description == 'Yes' && $scope.isCareGiverYesSatus == 2) {
			        $scope.isCareGiverYesSatus = 1;
			        changedStatus = 1;
			    } else if (optionObj.Description == 'Yes' && $scope.isCareGiverYesSatus == 1) {
			        $scope.isCareGiverYesSatus = 1;
			        changedStatus = 0;
			    } else if (optionObj.Description == 'No' && $scope.isCareGiverYesSatus == 1) {
			        $scope.careGiverSwitchSelected.Yes = true;
			        			        
			        var addModifyStatus = 0, editModifyStatus = 0;

			        if ($scope.addCareGiverClickedStatus == true) {
			            if ($scope.model.ProvidersTemp[0] && $scope.model.ProvidersTemp[0].name == null) {
			                $scope.model.ProvidersTemp[0].name = "";
			            }			           
			            if (!(angular.equals($scope.model.ProvidersTemp, $scope.model.OriginalProvidersTemp))) {
			                addModifyStatus = 2;
			            } else {
			                addModifyStatus = 1;
			            }
			        } else {
			            if (!(angular.equals($scope.model.ProvidersTemp, $scope.model.Providers))) {
			                editModifyStatus = 2;
			            } else {
			                editModifyStatus = 1;
			            }
			        }
			        if (addModifyStatus == 2 || editModifyStatus == 2 ) {
			            changedStatus = 0;			            
			            $scope.isCareGiverYesSatus = 1;
			            $scope.cancelCareGiver(2);		
			        } else {
			            changedStatus = 1;
			            $scope.isCareGiverYesSatus = 2;
			            $scope.model.ProvidersTemp = angular.copy($scope.model.Providers);
			        }
			    }else if (optionObj.Description == 'No' && $scope.isCareGiverYesSatus == 2 ) {
			        changedStatus = 0;
			    }

			    if(changedStatus){
			        careGiverFunctionality(1, $scope.isCareGiverYesSatus);
			        CommonFunctions.UIChanged();
			    }
			};
			$scope.onOK = function () {
			    $scope.model.Providers = $scope.model.OriginalProviders;
			    $scope.cancelCareGiver(2);

			    careGiverFunctionality(1, $scope.isCareGiverYesSatus);
			    CommonFunctions.UIChanged();
			};

			$scope.ICDCodeTypeClick = function (code) {
			    if(!$scope.model.Baseline.ICDType) {
			        $scope.model.Baseline.ICDType = CommonConstants.ICDTypes.ICD10;
			    }
		        if (code == CommonConstants.ICDTypes.ICD9 && code != $scope.model.Baseline.ICDType) {
			        $scope.model.RenalDiseaseCauses = $scope.renalDiseaseCausesICD9TypeData;
			        $scope.model.Baseline.ICDType = CommonConstants.ICDTypes.ICD9;
			        $scope.model.RenalDiseaseCauses.SelectedType = $scope.model.RenalDiseaseCauses[0];
			    } else if (code == CommonConstants.ICDTypes.ICD10 && code != $scope.model.Baseline.ICDType) {
                    $scope.model.RenalDiseaseCauses = $scope.renalDiseaseCausesICD10TypeData;
                    $scope.model.Baseline.ICDType = CommonConstants.ICDTypes.ICD10;
                    $scope.model.RenalDiseaseCauses.SelectedType = $scope.model.RenalDiseaseCauses[0];
                }
                $scope.model.Baseline.RenalDiseaseCause = $scope.model.RenalDiseaseCauses.SelectedType.Value;
                CommonFunctions.UIChanged();
            };

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
			                $scope.model.surveyType = $scope.model.CurrentScreen.Screen;
			                $scope.ScreenTitle = $scope.model.CurrentScreen.Text;
			            }
			        }
			    } catch (ex) {
			        var errExp = {};
			        errExp.Exception = ex;
			        errExp.ModuleName = "PatientAssessment";
			        errExp.FunctionName = "setScreeningHeader";
			        errExp.StackTrace = printStackTrace({ e: ex });
			        ExceptionService.LogException(CommonFunctions.HandleException(errExp));
			    }
			};
			
		   	$scope.callPatientAssessmentDetails = function () {
		   	    CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
		   	    var patientAssessmentDetailFilter = $.param({ '': $rootScope.Global.Objects.SelectedPatient.UID });
		   	    $timeout(function () {
		   	        PatientAssessmentService.GetPatientAssessmentDetails(patientAssessmentDetailFilter, 'POST', 'JSON', $scope.onGetPatientAssessmentDetailsRetrieved);
		   	    }, 0, false);
		   	};
			
			$scope.getPathwaySurveyDetails = function () {
			    try {
			        var SurveyDetailFilter = {
			            filter: {
			                PatientUID: $rootScope.Global.Objects.SelectedPatient.UID,
			                SurveyTypeCode: 'IPECAREGIVER',
			                NoOfSurveys: 1

			            },
			            GetSurveyDetailsOnly: false
			        };
			        PatientAssessmentService.getPathwaySurveyDetails(SurveyDetailFilter,'POST', 'JSON', $scope.onGetSurveyDetailsRetrieved);
			    } catch (ex) {
			        var errExp = {};
			        errExp.Exception = ex;
			        errExp.ModuleName = "PathwaysTab";
			        errExp.FunctionName = "getSurveyDetails";
			        errExp.StackTrace = printStackTrace({ e: ex });
			        ExceptionService.LogException(CommonFunctions.HandleException(errExp));
			    }
			};
			
			$scope.onGetSurveyDetailsRetrieved = function (result) {
			    try {
			        if (result.data.Survey && result.data.Survey.QuestionGroups && result.data.Survey.QuestionGroups.length > 0 && result.data.Survey.QuestionGroups[0] && result.data.Survey.QuestionGroups[0].Questions && result.data.Survey.QuestionGroups[0].Questions[0] && result.data.Survey.QuestionGroups[0].Questions.length > 0 && result.data.Survey.QuestionGroups[0].Questions[0]) {
			            $scope.model.Baseline.PathwayVM = result.data.Survey;                   
			            $scope.model.OriginalBaseline = angular.copy($scope.model.Baseline);
			             retrieveProviderInfo();
			            
			        }
			    } catch (ex) {
			        var errExp = {};
			        errExp.Exception = ex;
			        errExp.ModuleName = "PatientPathwaysTab";
			        errExp.FunctionName = "onGetSurveyDetailsRetrieved";
			        errExp.StackTrace = printStackTrace({ e: ex });
			        ExceptionService.LogException(CommonFunctions.HandleException(errExp));
			    };
			};
			$scope.onGetPatientAssessmentDetailsRetrieved = function (result) {
			    try {

			        var Providers = getDefaultProviderData();
			        $scope.model.OriginalProvidersTemp = [];
			        Providers.name = "";
			        $scope.model.OriginalProvidersTemp.push(Providers);

			        setRequiredLookups();
        			if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
						var isData = false;
						if(angular.isArray(result.data)) {
							if( result.data.length > 0 ) {
								$scope.model.Baseline = result.data[0];
								isData = true;
							}
						} else {
						    if (result.data) {
						        if (typeof(result.data) != 'undefined' ) {
						            $scope.model.Baseline = result.data;
						            isData = true;
						        } 
							} 
						}
						
						setQuestions();
							
						setICD();
						setFirstEverDialysisSelected();
						setRenalDiseaseCausesSelected();						
						setHearingImpairmentsSelected();
						setVisionImpairmentsSelected();

						
						if (!$scope.model.Baseline.IsHavingDiffWalking) {
						    $scope.model.Baseline.IsHavingDiffWalking = false;
						}
						if (!$scope.model.Baseline.IsHavingStairsHome) {
						    $scope.model.Baseline.IsHavingStairsHome = false;
						}
						if (!$scope.model.Baseline.IsMCOtherYesNo) {
						    $scope.model.Baseline.IsMCOtherYesNo = false;
						}
						if (!$scope.model.Baseline.IsTransportationNeeded) {
						    $scope.model.Baseline.IsTransportationNeeded = false;
						}
						if (!$scope.model.Baseline.IsInAbusiveEnvironment) {
						    $scope.model.Baseline.IsInAbusiveEnvironment = false;
						}  
						if (!$scope.model.Baseline.IsLivingAlone) {
						    $scope.model.Baseline.IsLivingAlone = false;
						}  
						if (!$scope.model.Baseline.IsInUnsafeEnvironment) {
						    $scope.model.Baseline.IsInUnsafeEnvironment = false;
						}
						if (!$scope.model.Baseline.IsTransient) {
						    $scope.model.Baseline.IsTransient = false;
						} 
						if (!$scope.model.Baseline.IsLivingAlone) {
						    $scope.model.Baseline.IsLivingAlone = false;
						}						
						if (!$scope.model.Baseline.IsTOHomeHemoYesNo) {
						    $scope.model.Baseline.IsTOHomeHemoYesNo = false;
						}
						if (!$scope.model.Baseline.IsTOPDYesNo) {
						    $scope.model.Baseline.IsTOPDYesNo = false;
						}
						if (!$scope.model.Baseline.IsTOInCenterYesNo) {
						    $scope.model.Baseline.IsTOInCenterYesNo = false;
						}
						if (!$scope.model.Baseline.IsTOTransplantYesNo) {
						    $scope.model.Baseline.IsTOTransplantYesNo = false;
						}
						if (!$scope.model.Baseline.IsTONoTreatmentYesNo) {
						    $scope.model.Baseline.IsTONoTreatmentYesNo = false;
						}

						if (!$scope.model.Baseline.NumberOfHospitalization) {
						    $scope.model.Baseline.NumberOfHospitalization = 0;
						}
						if (!$scope.model.Baseline.FirstEverDialysisDate) {
						    $scope.model.Baseline.FirstEverDialysisDate = null;
						}
						if (!$scope.model.Baseline.FirstChronicDialysisDate) {
						    $scope.model.Baseline.FirstChronicDialysisDate = null;
						}
						$scope.model.OriginalBaseline = angular.copy($scope.model.Baseline);
						
						var scroller = $("#patient-asst-screening-scroller").data("kendoMobileScroller");
						if (scroller) {
						    scroller.reset(); //reset the scroller
						}

						if ((JSON.stringify($scope.model.Baseline) != '{}') && ($scope.model.Baseline.PathwayVM )) {
						     retrieveProviderInfo(); 
						}
						else {
						    $scope.getPathwaySurveyDetails();
						    
						}
						if (!$scope.model.Baseline.IPEDate) {
						    $scope.model.Baseline.IPEDate = FormatDate(new Date());
						}                        
						
        			} else {
        			   
        			}
				} catch (ex) {
        			var errExp = {};
        			errExp.Exception = ex;
        			errExp.ModuleName = "Pathway";
        			errExp.FunctionName = "onGetPatientAssessmentDetailsRetrieved";
        			errExp.StackTrace = printStackTrace({ e: ex });
        			ExceptionService.LogException(Rounding.Common.HandleException(errExp));
				}

				$timeout(function () {
				   
					CommonFunctions.UICanceled();
					CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
				}, 0, false);	
        	};
			
			$scope.cancelScreening = function () {
			    var status =0;
			    if (angular.equals($scope.model.Baseline,$scope.model.OriginalBaseline)) {
			        status =0;
			    } else {
			        status =1;
			    }
			    if (status) {
			    CommonFunctions.OpenCustomConfirmBox(CommonMessages.Alert.ConfirmMessage, CommonMessages.Alert.ChangesLost, "Yes,No", function (data) {
                        if (data !== undefined && data.returnValue !== undefined) {
                            if (data.returnValue) {
                                $timeout(function () {
                                    $scope.model.Baseline = angular.copy($scope.model.OriginalBaseline);
                                    $scope.model.ProvidersTemp = angular.copy($scope.model.OriginalProviders);
                                    setICD();
                                    setFirstEverDialysisSelected();
                                    setRenalDiseaseCausesSelected();
                                    setHearingImpairmentsSelected();
                                    setVisionImpairmentsSelected();
                                    setQuestions();
                                    careGiverFunctionality(3, false);
                                    
                                    $scope.model.Baseline.IPEDate = $scope.model.Baseline.IPEDate ? $scope.model.Baseline.IPEDate : FormatDate(new Date());
                                    /* Cancel Caregiver functionality  */
                                    if (($scope.model.Providers) && ($scope.model.Providers.length) > 0 && ($scope.model.Providers[0].nameUID)) {
                                        $scope.careGiveDataState = CommonConstants.DataStateEnum.UnChanged;
                                        $scope.model.CareGiverOptions.IsDisabled = true;
                                        $scope.model.CareGiverOptions.IsAddVisible = true;
                                        $scope.model.CareGiverOptions.IsEditVisible = true;
                                        $scope.model.CareGiverOptions.IsCancelVisible = false;
                                        $scope.model.CareGiverOptions.IsSaveVisible = false;
                                        $scope.model.CareGiverOptions.IsDeleteVisible = false;
                                        if ($scope.isCareGiverYesSatus == 1) {
                                            $scope.isSaveBtnDisabled = false;
                                        } else {
                                            $scope.isSaveBtnDisabled = true;
                                        }
                                        $scope.model.Providers = angular.copy($scope.model.OriginalProviders);
                                    } else {
                                        $scope.careGiveDataState = CommonConstants.DataStateEnum.UnChanged;
                                        $scope.model.CareGiverOptions.IsDisabled = true;
                                        $scope.model.CareGiverOptions.IsAddVisible = true;
                                        $scope.model.CareGiverOptions.IsEditVisible = false;
                                        $scope.model.CareGiverOptions.IsCancelVisible = false;
                                        $scope.model.CareGiverOptions.IsSaveVisible = false;
                                        $scope.model.CareGiverOptions.IsDeleteVisible = false;
                                        if ($scope.isCareGiverYesSatus == 1) {
                                            $scope.isSaveBtnDisabled = true;
                                        } else {
                                            $scope.isSaveBtnDisabled = false;
                                        }
                                        $scope.model.Providers = angular.copy($scope.model.OriginalProviders);
                                    }
                                    /* /Cancel Caregiver functionality  */
                                    CommonFunctions.UICanceled();
                                }, 10, true);
                            } else {
                                /*if ($scope.isCareGiverYesSatus == 1) {
                                    if (($scope.model.Providers) && ($scope.model.Providers.length) > 0 && ($scope.model.Providers[0].nameUID)) {
                                        $scope.isSaveBtnDisabled = false;
                                    } else {
                                        $scope.isSaveBtnDisabled = true;
                                    }
                                } else {
                                    if (($scope.model.Providers) && ($scope.model.Providers.length) > 0 && ($scope.model.Providers[0].nameUID)) {
                                        $scope.isSaveBtnDisabled = true;
                                    } else {
                                        $scope.isSaveBtnDisabled = false;
                                    }
                                }*/
                            }
			            }
			        });

			    }

			    
			};
			$scope.isValidDate = function (calDateStr) {
			    if (!calDateStr) {
			        return false;
			    }
			    var todayDate = new Date();
			    var argDate = new Date(calDateStr);
			    $scope.model.screeningMinDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate() - 6);
			    $scope.model.screeningMaxDate = new Date(todayDate.getFullYear(), todayDate.getMonth(), todayDate.getDate());
			    if (argDate < $scope.model.screeningMinDate || argDate > $scope.model.screeningMaxDate) {
			        return false;
			    } else {
			        return true;
			    }
			};			
			$scope.save = function (arg) {
			    $scope.savePostponeButtonClicked = true;
			    var result = '',
                    checkFlag = '',
                    isValidAssessmentDate = false,
                    isInvalidFirstEverDialysisDate = false,
                    isInvalidFirstChronicDialysisDate = false,
                    isInvalidOtherField = false;
			    if ($scope.isDateEnteredFirstTimeFlag === false) {
			        $scope.model.Baseline.IPEDate = new Date();
			        $scope.isDateEnteredFirstTimeFlag = true;
			    }

			    if (($scope.model.Baseline.DataState === CommonConstants.DataState.Added)) {
			        checkFlag = CommonConstants.DataState.Added;
			    } else if ($scope.model.Baseline.DataState != CommonConstants.DataState.Added) {
			        checkFlag = CommonConstants.DataState.Modified;
			    }
			  
			    if ($scope.model.Baseline.IPEDate) {
			        isValidAssessmentDate = IsDateBetweenPastSevenDays(
                        new Date(FormatDate(
                            new Date($scope.model.Baseline.IPEDate))));
			        if (!isValidAssessmentDate) {
			            if ($scope.model.Baseline.IPEDate == $scope.model.OriginalBaseline.IPEDate) {
			                $scope.model.Baseline.IPEDate = FormatDate(new Date());
			                isValidAssessmentDate = 1;
			            }
			        }
			    }

			    if ($scope.model.Baseline.FirstEverDialysisDate) {
			        isInvalidFirstEverDialysisDate = IsFutureDate(FormatDate($scope.model.Baseline.FirstEverDialysisDate));
			    }

			    if ($scope.model.Baseline.FirstChronicDialysisDate) {
			        isInvalidFirstChronicDialysisDate = IsFutureDate(FormatDate($scope.model.Baseline.FirstChronicDialysisDate));
			    }
			    isInvalidOtherField = ($scope.model.Baseline.IsMCOtherYesNo) && (!$scope.model.Baseline.MCOtherNotes)
			    if (!$scope.model.Baseline.IPEDate) {
			        CommonFunctions.OpenAlertBox('Alert', [{ message: CommonMessages.Alert.AssessmentDateBlankAlert }], null);
			    } else if (IsFutureDate(FormatDate($scope.model.Baseline.IPEDate))) {
			        CommonFunctions.OpenAlertBox('Alert', [{ message: 'Assessment Date can not be a future date.' }], null);
			    } else if ($scope.model.Baseline.IPEDate && !isValidAssessmentDate) {
			        CommonFunctions.OpenAlertBox('Alert', [{ message: CommonMessages.Alert.AssessmentDateAlert }], null);
			    } else if ($scope.model.Baseline.FirstEverDialysisDate && isInvalidFirstEverDialysisDate) {
			        CommonFunctions.OpenAlertBox('Alert', [{ message: 'First Ever Dialysis Date can not be later than today date.' }], null);
			    } else if ($scope.model.Baseline.FirstChronicDialysisDate && isInvalidFirstChronicDialysisDate) {
			        CommonFunctions.OpenAlertBox('Alert', [{ message: 'First Chronic Dialysis Date can not be later than today date.' }], null);
			    } else if ((!$scope.model.Baseline.HearingImpairment) && (!$scope.model.Baseline.VisionImpairment) && isInvalidOtherField) {
			        CommonFunctions.OpenAlertBox('Alert', [{ message: 'Hearing Impairment should be set to a valid value for this operation, Vision Impairment should be set to a valid value for this operation, Mobility Impairment Other Notes should be set to a valid value for this operation' }], null);
			    } else if ((!$scope.model.Baseline.HearingImpairment) && (!$scope.model.Baseline.VisionImpairment)) {
			        CommonFunctions.OpenAlertBox('Alert', [{ message: 'Hearing Impairment should be set to a valid value for this operation, Vision Impairment should be set to a valid value for this operation' }], null);
			    } else if ((!$scope.model.Baseline.HearingImpairment) && isInvalidOtherField) {
			        CommonFunctions.OpenAlertBox('Alert', [{ message: 'Hearing Impairment should be set to a valid value for this operation, Mobility Impairment Other Notes should be set to a valid value for this operation' }], null);
			    } else if ((!$scope.model.Baseline.VisionImpairment) && isInvalidOtherField) {
			        CommonFunctions.OpenAlertBox('Alert', [{ message: 'Vision Impairment should be set to a valid value for this operation , Mobility Impairment Other Notes should be set to a valid value for this operation' }], null);
			    } else if (!$scope.model.Baseline.HearingImpairment) {
			        CommonFunctions.OpenAlertBox('Alert', [{ message: 'Hearing Impairment should be set to a valid value for this operation' }], null);
			    } else if (!$scope.model.Baseline.VisionImpairment) {
			        CommonFunctions.OpenAlertBox('Alert', [{ message: 'Vision Impairment should be set to a valid value for this operation' }], null);
			    } else if (isInvalidOtherField) {
			        CommonFunctions.OpenAlertBox('Alert', [{ message: 'Mobility Impairment Other Notes should be set to a valid value for this operation' }], null);
			    } else if ($scope.model.Baseline.NumberOfHospitalization > 30) {
			        CommonFunctions.OpenAlertBox('Alert', [{ message: 'Number of Hospital Admits should not exceed 30' }], null);
			    } else {

			        CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");

			        if (arg === CommonConstants.StatusCode.Completed) {
			            $scope.model.Baseline.Status = CommonConstants.StatusCode.Completed;
			        } else if (arg === CommonConstants.StatusCode.Pending) {
			            $scope.model.Baseline.Status = CommonConstants.StatusCode.Pending;
			        }
			        if ( JSON.stringify($scope.model.Baseline.PathwayVM) == '{}') {			           
			            $scope.getPathwaySurveyDetails();
			        }

			        setSurveyData(arg);
			        if (arg === 'C')
			        {
			            $scope.model.Baseline.Status = '2';
			        }

			        if (typeof($scope.model.Baseline.DataState) == 'undefined' || $scope.model.Baseline.DataState === CommonConstants.DataState.Added) {
			            $scope.model.Baseline.DataState = CommonConstants.DataState.Added;
			            $scope.model.Baseline.PatientUID = $rootScope.Global.Objects.SelectedPatient.UID;
			            formatDates();
			            $scope.model.Baseline.PathwayVM = {};
			            PatientAssessmentService.AddPatientAssessmentDetails($scope.model.Baseline, 'POST', 'JSON', $scope.onSavePatientAssessmentDetailsRetrieved);
			        } else if ($scope.model.Baseline.DataState != CommonConstants.DataState.Added) {
			            $scope.model.Baseline.DataState = CommonConstants.DataState.Modified;
			            formatDates();			          
			            PatientAssessmentService.UpdatePatientAssessmentDetails($scope.model.Baseline, 'POST', 'JSON', $scope.onSavePatientAssessmentDetailsRetrieved);	                        
			        }
			       
			       
			    }
			};
			$scope.getDateString = function(dateTimeStr) {
				return CommonFunctions.DateFunctions.DatefromDatetime(dateTimeStr);
			};
            /* CareGiver Functionality */
			$scope.editCareGiver = function () {
			   
			    if (($scope.model.Providers) && ($scope.model.Providers.length) > 0 && ($scope.model.Providers[0].nameUID)) {
			        $scope.careGiveDataState = CommonConstants.DataStateEnum.Modified;
			    } else {
			        $scope.careGiveDataState = CommonConstants.DataStateEnum.Added;
			    }
			    $scope.model.CareGiverOptions.IsAddVisible = false;
			    $scope.model.CareGiverOptions.IsEditVisible = false;
			    $scope.model.CareGiverOptions.IsSaveVisible = true;
			    $scope.model.CareGiverOptions.IsCancelVisible = true;
			    $scope.model.CareGiverOptions.IsDisabled = false;
			    $scope.model.CareGiverOptions.IsDeleteVisible = false;
			    $scope.isSaveBtnDisabled = true;
			    $scope.addCareGiverClickedStatus = false;
			    CommonFunctions.UIChanged();
			};
			$scope.cancelCareGiver = function (type) {
			    var cancelYesSatus = 0;			                   

			    var OriginalProviders = $scope.model.OriginalProviders;
			    

			    if ($scope.model.Providers.length == 0) {
			        $scope.model.Providers = angular.copy($scope.model.OriginalProvidersTemp);
			    }
			    if ($scope.model.ProvidersTemp[0] && $scope.model.ProvidersTemp[0].name == null) {
			        $scope.model.ProvidersTemp[0].name = "";
			    }

			    var addModifyStatus = 0, editModifyStatus = 0, addModifyCheckStatus = 0, editModifyCheckStatus = 0;
			    if ($scope.addCareGiverClickedStatus == true) {			       

			        if (!(angular.equals($scope.model.ProvidersTemp, $scope.model.OriginalProvidersTemp))) {
			            addModifyStatus = 2;
			        } else {
			            addModifyStatus = 1;
			        }
			    } else {
			        if (!(angular.equals($scope.model.ProvidersTemp, $scope.model.Providers))) {
			            editModifyStatus = 2;
			        } else {
			            editModifyStatus = 1;
			        }
			    }
			    if(addModifyStatus == 2 ){
			        CommonFunctions.OpenCustomConfirmBox(CommonMessages.Alert.ConfirmMessage, CommonMessages.Alert.ChangesLost, "Yes,No", function (data) {
			            if (data !== undefined && data.returnValue !== undefined) {
			                if (data.returnValue) {
			                    $timeout(function () {
			                        if(type == 1){
			                            $scope.isCareGiverYesSatus = 2;
			                            $scope.model.ProvidersTemp = angular.copy($scope.model.OriginalProviders);
			                            careGiverFunctionality(3, $scope.isCareGiverYesSatus);
			                        }else{
			                            $scope.isCareGiverYesSatus = 2;
			                            genarateCareFunctionalityBlock(1, $scope.model.Providers);
			                        }				                       
			                        
			                    }, 10, true);
			                } else {
			                    $timeout(function () {
			                        if (type == 2) {
			                             $scope.isCareGiverYesSatus = 1;
			                            setCareGiverQuestionResponse('Yes');
			                            setCareGiverQuestionResponseById('No');
			                        }	
			                    }, 10, true);
			                }
			            }
			        });
			    } else if (addModifyStatus == 1) {
			        $scope.model.ProvidersTemp = $scope.model.Providers;
			        if (type == 2) {
			            if (($scope.model.ProvidersTemp) && ($scope.model.ProvidersTemp.length) > 0 && ($scope.model.ProvidersTemp[0].nameUID)) {
			               
			            } else {
			                $scope.isCareGiverYesSatus = 2;
			            }
			        } else {
			            $scope.isCareGiverYesSatus = 1;
			        }
			        careGiverFunctionality(1, $scope.isCareGiverYesSatus);
			    }

			    if (editModifyStatus == 2) {
			        CommonFunctions.OpenCustomConfirmBox(CommonMessages.Alert.ConfirmMessage, CommonMessages.Alert.ChangesLost, "Yes,No", function (data) {
			            if (data !== undefined && data.returnValue !== undefined) {
			                if (data.returnValue) {
			                    $timeout(function () {
			                        if(type == 1){
			                            $scope.isCareGiverYesSatus = 1;
			                            $scope.model.ProvidersTemp = angular.copy($scope.model.OriginalProviders);
			                            careGiverFunctionality(1, $scope.isCareGiverYesSatus);
			                        }else{
			                            $scope.isCareGiverYesSatus = 2;
			                            genarateCareFunctionalityBlock(2, $scope.model.Providers);
			                        }			                        
			                        
			                    }, 10, true);
			                } else {
			                    $timeout(function () {
			                        if (type == 2) {
			                        
			                            $scope.isCareGiverYesSatus = 1;
			                            setCareGiverQuestionResponseById('No');
			                        }
			                    }, 10, true);
			                }
			            }
			        });
			    } else if (editModifyStatus == 1) {
			        if (type == 2) {
			            if (($scope.model.ProvidersTemp) && ($scope.model.ProvidersTemp.length) > 0 && ($scope.model.ProvidersTemp[0].nameUID)) {
			            } else {
			                $scope.isCareGiverYesSatus = 2;
			            }
			        } else {
			            $scope.isCareGiverYesSatus = 1;
			        }
			        careGiverFunctionality(1, $scope.isCareGiverYesSatus);
			    }
			    $scope.addCareGiverClickedStatus = false;
			};			
			$scope.addCareGiver = function () {
			    $scope.careGiveDataState = CommonConstants.DataStateEnum.Added;
			    $scope.model.CareGiverOptions.IsDisabled = false;
			    $scope.model.CareGiverOptions.IsAddVisible = false;
			    $scope.model.CareGiverOptions.IsEditVisible = false;
			    $scope.model.CareGiverOptions.IsSaveVisible = true;
			    $scope.model.CareGiverOptions.IsCancelVisible = true;
			    $scope.model.CareGiverOptions.IsDeleteVisible = false;
			    $scope.isSaveBtnDisabled = true;
			    $scope.model.ProvidersTemp = [];
			    var Providers = getDefaultProviderData();
			    $scope.addCareGiverClickedStatus = true;
			    $scope.model.ProvidersTemp.push(Providers);
			    CommonFunctions.UIChanged();
			};
			$scope.deleteCareGiver = function () {
			    CommonFunctions.OpenConfirmBox("Delete Provider", CommonMessages.Alert.DeleteCaregiverConfirmation, function (data) {
			        if (data != undefined && data.returnValue != undefined) {
			            if (data.returnValue) {
			                $scope.careGiveDataState = CommonConstants.DataStateEnum.Deleted;
			                $scope.saveCareGiver();
			            }
			        }
			    });
			};
			$scope.saveCareGiver = function () {
			    try {
			        var careGiverName = $scope.model.ProvidersTemp[0].name,
                        careGiverNameUID = $scope.model.ProvidersTemp[0].nameUID,
                        careGiverPhoneNo = $scope.model.ProvidersTemp[0].PhoneNumber,
                        careGiverPhoneNoUID = $scope.model.ProvidersTemp[0].PhoneNumberUID,
                        providerAddressUID = $scope.model.ProvidersTemp[0].providerAddressUID,
                        allowCommunChk = $scope.model.ProvidersTemp[0].allowCommunication
			        dataState = $scope.careGiveDataState,
                    providerDataState = 0,
                    saveProviderInfoDataState = 0,
                    phoneData = [];
                        saveCareGiverStatus = false,
                        messageData = '';

                        if (dataState == 3) {
			            providerDataState = 0;
			        } else {
			            providerDataState = dataState;
			        }
			        if (careGiverName) {
			            if (careGiverPhoneNoUID) {
			                if (careGiverPhoneNo && !validatePhone(careGiverPhoneNo)) {
			                    messageData = "Please enter valid phone no";
			                    saveCareGiverStatus = false;
			                } else {
			                    saveCareGiverStatus = true;
			                }
			            } else {
			                if (careGiverPhoneNo && !validatePhone(careGiverPhoneNo)) {
			                    messageData = "Please enter valid phone no";
			                    saveCareGiverStatus = false;
			                } else {
			                    saveCareGiverStatus = true;
			                }
			            }
			        } else {
			            messageData = "Name Is Mandatory";
			            saveCareGiverStatus = false;
			        }

			        if (saveCareGiverStatus == true) {

			            var providerDetailToBeSaved = {}, ProviderInfo = {}, ProviderAddress = {}, PhoneNos = {};
			            var phoneDataState = 0;
			            if (careGiverPhoneNoUID) {
			                if(careGiverPhoneNo){
			                    phoneDataState = dataState; 
			                } else {
			                    phoneDataState = 3;
			                }			               
			            } else {
			                if (careGiverPhoneNo) {
			                    phoneDataState = 1;
			                }
			            }
			           
			            if(phoneDataState == 3){
			                careGiverPhoneNo = $scope.model.OriginalProviders[0].PhoneNumber;
			            }
			            var PhoneUpdateState = 0;
			            if(phoneDataState == 2){
			                PhoneUpdateState = providerDataState;
			            }else{
			                PhoneUpdateState = phoneDataState;
                        }
			            PhoneNos = {
			                "PhoneNumber": careGiverPhoneNo,
			                "DataState": PhoneUpdateState,
			                "Type": "W",
			                'UID': careGiverPhoneNoUID
			            };
			            ProviderAddress = {
			                "type": "SERVICE",
			                "DataState": providerDataState,
			                "IsFaxNumberVerified": false,
			                "UID": providerAddressUID
			        };
			            if ( ( $scope.model.OriginalProvidersData.length > 0 ) && angular.isDefined( $scope.model.OriginalProvidersData[0].ProviderInfo.ProviderAddress[0].Phones ) ) {
			                phoneData = $scope.model.OriginalProvidersData[0].ProviderInfo.ProviderAddress[0].Phones;   
			            }
			            phoneData[$scope.providerPhoneNoKey] = PhoneNos;
			            
			            if (phoneDataState) {
			                ProviderAddress.Phones= phoneData;
			            };


			            ProviderInfo = {
			                "Name": careGiverName,
			                "ProviderCategory": "Team",
			                "DataState": providerDataState,
			                "AllowCommunication": allowCommunChk,
			                'UID': careGiverNameUID,
			                "ProviderAddress": [ProviderAddress],

			            };

			            CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");

			            if (dataState == 2 ) {
			                saveProviderInfoDataState = 0;
			            } else {
			                saveProviderInfoDataState = dataState;
			            }
			            providerDetailToBeSaved.AssociationType = "CG";
			            providerDetailToBeSaved.PatientUID = $rootScope.Global.Objects.SelectedPatient.UID;
			            providerDetailToBeSaved.UID = $scope.model.ProvidersTemp[0].UID;
			            providerDetailToBeSaved.DataState = saveProviderInfoDataState;
			            providerDetailToBeSaved.MessageType = "System";
			            providerDetailToBeSaved.ProviderInfo = ProviderInfo;
			            $scope.CareGiverDataStatus = dataState;
			            PatientAssessmentService.SaveProviderInfo(providerDetailToBeSaved, 'POST', 'JSON', $scope.onSaveProviderInfoRetrieved);
			            
			        } else {
			            CommonFunctions.OpenAlertBox('Alert', [{ message: messageData }], null);
			        }

			    } catch (ex) {
			        var errExp = {};
			        errExp.Exception = ex;
			        errExp.ModuleName = "PatientAssessment";
			        errExp.FunctionName = "saveCareGiver";
			        errExp.StackTrace = printStackTrace({ e: ex });
			        ExceptionService.LogException(CommonFunctions.HandleException(errExp));
			    }
			};
			
			/**
            * @ngdoc function
            * @name onSavePatientAssessmentDetailsRetrieved
            * @methodOf roundingModule.controller:PatientAssessmentController
            * @description             
            * @param {object} result
            * return result data of WebApi call
            */
			$scope.onSavePatientAssessmentDetailsRetrieved = function (result) {
			    try {
			       
			        if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
			            CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
			            CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.PatientScreeningSaved);
			            if (result.data.AlertMessageText && result.data.AlertMessageText.length > 0) {
			                CommonFunctions.DisplayAlertMessage(result.data.AlertMessageText);
			            }
			            setModel();
			            $scope.onGetPatientAssessmentDetailsRetrieved(result);
			            $scope.model.IsCaregiverSurveyRequired = false;
			            
			        }
			    }
			    catch (ex) {
			        var errExp = {};
			        errExp.Exception = ex;
			        errExp.ModuleName = "AllScreening";
			        errExp.FunctionName = "onSavePatientAssessmentDetailsRetrieved";
			        errExp.StackTrace = printStackTrace({ e: ex });
			        ExceptionService.LogException(CommonFunctions.HandleException(errExp));
			    }
			};
			
			
			/**
            * @ngdoc function
            * @name onSaveProviderInfo
            * @methodOf roundingModule.controller:PatientAssessmentController
            * @description             
            * @param {object} result
            * return result data of WebApi call
            */
        	$scope.onSaveProviderInfoRetrieved = function (result) {
        	    try {
        	        if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
        	            CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
        	            if ($scope.CareGiverDataStatus == 3) {
        	                CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.CareGiverScreeningDeleted);
        	            }else{
        	                CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.CareGiverScreeningSaved);
        	            }
        	            $scope.addCareGiverClickedStatus = false;
        	            if (result.data.AlertMessageText && result.data.AlertMessageText.length > 0) {
        	                CommonFunctions.DisplayAlertMessage(result.data.AlertMessageText);
        	            }
        	            $timeout(function () {
        	                var data = $.param({ '': $rootScope.Global.Objects.SelectedPatient.UID });
        	                PatientAssessmentService.GetProviderInfo(data, 'POST', 'JSON', onGetProviderInfoRetrieved);
        	            }, 0, false)

        	        }
        	    }
        	    catch (ex) {
        	        var errExp = {};
        	        errExp.Exception = ex;
        	        errExp.ModuleName = "AllScreening";
        	        errExp.FunctionName = "onSaveProviderInfo";
        	        errExp.StackTrace = printStackTrace({ e: ex });
        	        ExceptionService.LogException(CommonFunctions.HandleException(errExp));
        	    };
        	    $timeout(function () {
        	        CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
        	    }, 0, false)
        	};
			
						
			setModel();	
         	$scope.setScreeningHeader();
         	$scope.callPatientAssessmentDetails();
         	$scope.keyPress = function ($event) {
         	    if (isNaN(String.fromCharCode($event.keyCode))) {
         	        $event.preventDefault();
         	    }
         	};
         	$scope.keyUp = function ($event) {
         	    if (isNaN($scope.model.Baseline.NumberOfHospitalization)) {
         	        $scope.model.Baseline.NumberOfHospitalization = 0;
         	    }
         	    if (parseInt($scope.model.Baseline.NumberOfHospitalization) > 20) {
         	        $scope.model.Baseline.NumberOfHospitalization = 20;
         	    }
         	};
        });

}());