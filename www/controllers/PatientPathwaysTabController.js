/**
* @ngdoc overview
* @name roundingModule
* @description
* <b>Overiview of Patient Pathways Controller </b>
* @author: Chinmay Dhavale.
* @version : 1.0
* @
*/

(function () {
    /**
	* @ngdoc service
	* @name roundingModule.service:PatientPathwaysTabService
	* @description
	** <b> Used by Patient Pathways Tab Contoroller. </b>
    ** <b> Used to make service calls for Patient Pathways for RCM Role.</b>
	* @param {string} ServiceConstants
	* Common Constants.
	* @param {function} RoundingService
	* Common Function.
	*/
    angular.module('roundingModule').factory('PatientPathwaysTabService', function (ServiceConstants, RoundingService) {

        /**
         * @ngdoc method
         * @methodOf roundingModule.service:PatientPathwaysTabService
         * @name getSurveyDetails
         * @description
         ** <b> Service Call </b>
         ** <b> API : <i> User/GetSurveyDetails </i></b>
         ** <b>Load Survey for a new patient</b>
         * @param {object} data
         * <b><i> Patient Details to be retrieved.</i></b>
         * @param {string} method
         *<b><i> Method: GET/POST </b></i>
         * @param {object} dataType
         *<b><i> DataType of the return object.</i></b>
         * @param {object} callBack
         *<b></i> $scope.onGetPatientSurveyDetailsRetrieved.</b></i>
         * @returns {object}
         ** Patient Details
         */
        function getSurveyDetails(data, method, dataType, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetSurveyDetails, method, dataType, data, callBack);
        }

        /**
		* @ngdoc method
		* @methodOf roundingModule.service:PatientPathwaysTabService
		* @name getPatientSurveyDetails
		* @description
        ** <b> Service Call </b>
        ** <b> API : <i> User/GetPatientSurveyDetails </i></b>
        ** <b>Load Survey for a new patient or open an existing survey on load.</b>
		* @param {object} data
		* <b><i>Patient Details to be retrieved.</i></b>
		* @param {string} method
		* <b><i>Method: GET/POST. </i></b>
		* @param {object} dataType
		* <b><i> DataType of the return object.</i></b>
		* @param {object} callBack
		* <b><i>$scope.onGetPatientSurveyDetailsRetrieved.</i></b>
		* @returns {object}
		** Patient Details.
		*/
        function getPatientSurveyDetails(data, method, dataType, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPatientSurveyDetails, method, dataType, data, callBack);
        }
		
        /**
		* @ngdoc method
		* @name saveSurveyDetails
		* @methodOf roundingModule.service:PatientPathwaysTabService
		* @description
        ** <b> Service Call </b>
        ** <b> API : <i> api/Pathways/SaveSurveyDetails</i>
        ** <b> Use : Save survey after completion </b>
		* @param {object} data 
		* <b><i> Survey details to be saved</b></i>
		* @param {string} method
		* <b><i>Method: GET/POST.
		* @param {object} dataType
		* <b><i>DataType of the object example .JSON </b></i>
		* @param {object} callBack
		* <b><i>$scope.onSaveSurveyDetailsCompleted.</b></i>
		*/
        function saveSurveyDetails(data, method, dataType, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.SaveSurveyDetails, method, dataType, data, callBack);
        }

        return {
            GetSurveyDetails: getSurveyDetails,
            GetPatientSurveyDetails: getPatientSurveyDetails,
            SaveSurveyDetails: saveSurveyDetails,			
        }
    });
}());

(function () {
    /**
	* @ngdoc controller
	* @name roundingModule.controller:PatientPathwaysTabController
	* @description
	** <b>Controller for RCM Patient Pathways </b>
    * @property {kendo.data.DataSource} $scope.SurveyDetails - Load Survey for selected patient.
    * @property {string} $scope.SelectedSurveyType - Selected Survey Type.
    * @property {string} $scope.SurveyType - Type of Survey 
    * @property {object} $scope.Buttons - Edit, Save & Cancel button on Pathways screen.
    * @property {boolean} $scope.IsSurveyCommentVisible - Visibility of Survey Comments.
    * @property {boolean} $scope.IsSurveyDetailsCommentDisable - Value to decide whether Survey Comment Section should be disabled or enabled.
    * @property {boolean} $scope.noActiveAdmissionRecord - Boolean value to check for admission record of a patient.
	*/
    angular.module('roundingModule').controller('PatientPathwaysTabController', function ($scope, $rootScope, $timeout, PatientPathwaysTabService, CommonMessages, CommonConstants, RCMPathwaysScreen, RCMPathwaysSurveyTypes, ExceptionService, CommonFunctions, Status, ServiceConstants) {
        $scope.SurveyDetails = new kendo.data.DataSource({ data: [] });
       
        $scope.SelectedSurveyType = null;
        $scope.SurveyType = null;
        $scope.displayText = '';
        $scope.Buttons = {"EditButtonVisible": false, "SaveButtonVisible": false, "CancelButtonVisible": false};
		$scope.IsSurveydetailsCommentsVisible = true;
		$scope.IsSurveydetailsCommentDisabled = true;

		$scope.noActiveAdmissionRecord = false;
        

        /**
		* @ngdoc method
		* @name onGetPatientSurveyDetailsRetrieved 
		* @methodOf roundingModule.controller:PatientPathwaysTabController
		* @description
		** <b> callBack for <i>getPatientSurveyDetails</i> service method </b>
		* @param {object} result 
		* <b><i> Patient Details </i></b>
		*/
        $scope.onGetPatientSurveyDetailsRetrieved = function(result) {
            try {
                if (result.resultstatus === Status.ServiceCallStatus.Success && CommonFunctions.IsNotNullOrEmpty(result.data) 
                    && CommonFunctions.IsNotNullOrEmpty(result.data.SurveyDetails) && result.data.SurveyDetails.length > 0) {
                    $scope.PatientPathwaySurveyName = result.data.SurveyDetails[0].SurveyName;
                    if ($rootScope.Global.Objects.SelectedPatient.Admission === null || $rootScope.Global.Objects.SelectedPatient.Admission === undefined) {
                        $scope.noActiveAdmissionRecord = true;
                        $scope.Buttons.EditButtonVisible = false;
                        CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
                        
                    }
                    else {
						$scope.noActiveAdmissionRecord = false;
                        
                        $scope.SurveyDetails.data([]);
                        $scope.SurveyDetails.data(result.data.SurveyDetails);
                        $scope.bindPatientSurveyDetails(result.data.SurveyDetails);
                        CommonFunctions.CreateScroller("rcmdb-ptchart-pthwy-surveydetails"); 
                        CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
                        $scope.Buttons.EditButtonVisible = true;
                    }
                    CommonFunctions.UICanceled();
                } else {
                    var surveytype = $scope.SelectedSurveyType;
                    $scope.Surveytype = surveytype;
                    getSurveyDetails();
                }
            } catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "PatientPathwaysTab";
                errExp.FunctionName = "onGetPatientSurveyDetailsRetrieved";
                errExp.StackTrace = printStackTrace({e: ex});
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
            }
        }
        
        /**
		* @ngdoc method
		* @name onGetSurveyDetailsRetrieved 
		* @methodOf roundingModule.controller:PatientPathwaysTabController
		* @description
		* callBack for <i>getSurveyDetails</i> service method.
		* @param {object} result 
		* Retrieving Patient Details for Pathways.
		*/
        $scope.onGetSurveyDetailsRetrieved = function(result) {
            try {
                if (result.resultstatus = Status.ServiceCallStatus.Success && result.data !== null && result.data !== undefined && result.data.SurveyDetails !== null && 
                                          result.data.SurveyDetails !== undefined && result.data.SurveyDetails.length > 0) {
                    $scope.PatientPathwaySurveyName = result.data.SurveyDetails[0].SurveyName;
                    if ($rootScope.Global.Objects.SelectedPatient.Admission === null || $rootScope.Global.Objects.SelectedPatient.Admission === undefined) {
                        $scope.noActiveAdmissionRecord = true;
                        $scope.Buttons.EditButtonVisible = false;
                        CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
                    }
                    else {
                        $scope.noActiveAdmissionRecord = false;
                        $scope.SurveyDetails.data([]);
                        $scope.SurveyDetails.data(result.data.SurveyDetails);
                        $scope.bindPatientSurveyDetails(result.data.SurveyDetails);
                        CommonFunctions.CreateScroller("rcmdb-ptchart-pthwy-surveydetails"); 
                        CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
                    }
                    CommonFunctions.UICanceled();
                }
                else {
                    var surveytype = $scope.SelectedSurveyType;
                    $scope.Surveytype = surveytype;
                }
            } catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "PatientPathwaysTab";
                errExp.FunctionName = "onGetSurveyDetailsRetrived";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
            }
        }
		
        /**
        * @ngdoc method
        * @name getSurveyDetails
        * @methodOf roundingModule.controller:PatientPathwaysTabController
		* @description
        * Makes use of PatientPathwaysTabService <i> GetSurveyDetails </i> function to load survey.
        */
        getSurveyDetails = function() {
            //if ($rootScope.Global.Objects.SelectedPatient.Admission === null ||  $rootScope.Global.Objects.SelectedPatient.Admission=== undefined) {
            //    $scope.noActiveAdmissionRecord = true;
            //    $scope.Buttons.EditButtonVisible = false;
            //    CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            //} 
			//else {
                CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
                var surveyDetailFilter = {SurveyTypeCode: $scope.SurveyType, HarUID:'', PatientUID: $rootScope.Global.Objects.SelectedPatient.UID, NoOfSurveys:0}
                $timeout(function() {
                    PatientPathwaysTabService.GetSurveyDetails(surveyDetailFilter, 'POST', 'JSON', $scope.onGetSurveyDetailsRetrieved);
                }, 0, false);
                
            //}
        }

        /**
        * @ngdoc method
        * @name getPatientSurveyDetails
        * @methodOf roundingModule.controller:PatientPathwaysTabController
		* @description
        * Makes use of PatientPathwaysTabService <i> GetPatientSurveyDetails </i> function to load survey.
        */
        getPatientSurveyDetails = function() {
            if ($rootScope.Global.Objects.SelectedPatient.Admission === null || $rootScope.Global.Objects.SelectedPatient.Admission=== undefined) {
                $scope.noActiveAdmissionRecord = true;
                $scope.Buttons.EditButtonVisible = false;
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
                getSurveyDetails();
            }
			else {
                CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
                var patientSurveyDetailFilter = { SurveyTypeCode: $scope.SurveyType, HarUID: $rootScope.Global.Objects.SelectedPatient.Admission ? $rootScope.Global.Objects.SelectedPatient.Admission.UID : '' , PatientUID: $rootScope.Global.Objects.SelectedPatient.UID, NoOfSurveys:1 }
                $timeout(function() {
                    PatientPathwaysTabService.GetPatientSurveyDetails(patientSurveyDetailFilter, 'POST', 'JSON', $scope.onGetPatientSurveyDetailsRetrieved);
                }, 0, false);
            }

        }
		
        /**
        * @ngdoc method
        * @name show
        * @methodOf roundingModule.controller:PatientPathwaysTabController
		* @description
        * Show survey based on the Pathway screen selected for RCM.
        */
        $scope.show = function() {
            switch ($rootScope.Global.Objects.CRDSelectedMenu.Screen) {
                case RCMPathwaysScreen.RCMAccessCareTab:
                    $scope.SurveyType = RCMPathwaysSurveyTypes.AccessCarePathway;
                    break;
                case RCMPathwaysScreen.RCMDiabetesMgmtTab:
                    $scope.SurveyType = RCMPathwaysSurveyTypes.DiabetesMgmtRCMPathway;
                    break;
                case RCMPathwaysScreen.RCMDietTab:
                    $scope.SurveyType = RCMPathwaysSurveyTypes.DietPathway;
                    break;
                case RCMPathwaysScreen.RCMFluidMgmtTab:
                    $scope.SurveyType = RCMPathwaysSurveyTypes.FluidMgmtRCMPathway;
                    break;
                case RCMPathwaysScreen.RCMMedicationManagementTab:
                    $scope.SurveyType = RCMPathwaysSurveyTypes.MedicationMgmtPathway;
                    break;
                case RCMPathwaysScreen.RCMTreatmentRegimenTab:
                    $scope.SurveyType = RCMPathwaysSurveyTypes.TreatmentRegimenPathway;
                    break;
                default:
            }
	
            getPatientSurveyDetails();  	   
        }
        
        $scope.show();
		
        /**
        * @ngdoc method
        * @name onSaveSurveyDetailsCompleted
        * @methodOf roundingModule.controller:PatientPathwaysTabController
		* @description
        * 1] callBack method for saveSurveyDetails.
        * 2] Save survey details of the selected patient after completion.
        * @param {object} result
        * Saved survey details of the patient.
        */
        $scope.onSaveSurveyDetailsCompleted = function(result) {
            try {
                if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                    CommonFunctions.UICanceled();
                    CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.PathwaySaved);
                    getPatientSurveyDetails(); 
                } 
            } catch (ex) {
                var errExp = {};
                errExp.Exception = ex; 
                errExp.ModuleName = "PatientPathwaysTab";
                errExp.FunctionName = "onSaveSurveyDetailsCompleted";
                errExp.StackTrace = printStackTrace({ e:ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
            }
        }

        /**
        * @ngdoc event
        * @name savePatientPathways()
        * @eventOf roundingModule.controller:PatientPathwaysTabController
		* @description
		* 1] ng-click event called on click of <i> Save button </i> on Pathways Screen </b>
        * 2] Saves survey questions along with its response</b>
        */
        $scope.savePatientPathways = function() {
            try {
                var responseQuestions = new kendo.data.ObservableArray([]);
				 
                $scope.SurveyDetails.data().forEach(function (surveyDetail) {
                    surveyDetail.QuestionGroups.forEach(function (questionGroup) {
                        questionGroup.Questions.forEach(function(question) {
                            var responseQuestion = { "QuestionUID": question.UID, "Responses": new kendo.data.ObservableArray([]) };
                            question.Options.forEach(function(option) {
                                if (option.IsSelected) {
                                    responseQuestion.Responses.push({ "OptionUID":option.UID, "FreeFormResponse": option.FreeFormResponse });
                                }
                            });
								 
                            if (responseQuestion.Responses.length > 0) {
                                responseQuestions.push(responseQuestion);
                            }
                        });
                    });
                });

                var surveyResponse; 
                surveyResponse = {
                    PatientUID: $rootScope.Global.Objects.SelectedPatient.UID,
                    HARUID:$rootScope.Global.Objects.SelectedPatient.Admission.UID, //HARUID
                    DataState:$scope.SurveyDetails.data()[0].UID == 0 ? CommonConstants.DataState.Added : CommonConstants.DataState.Modified,
                    MemSurveyUID: $scope.SurveyDetails.data()[0].UID,
                    SurveyTypeCode: $scope.SurveyDetails.data()[0].SurveyTypeCode,
                    SurveyUID: $scope.SurveyDetails.data()[0].SurveyUID,
                    SurveyComments: $scope.SurveyDetails.data()[0].SurveyComments,
                    IncludePatientCommentYesNo: $scope.SurveyDetails.data()[0].IncludePatientCommentYesNo,
                    IncludeProviderCommentYesNo: $scope.SurveyDetails.data()[0].IncludeProviderCommentYesNo,
                    ResponseQuestions: responseQuestions.toJSON(),
                    StartDate:(new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                    CompletedDate:(new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                    SurveyStatus: "C",
                };
									 
                var allQuestionsAnswered = false;
                var isEndOfSurvey = false;
                
                if ($scope.patientPathwaysValidator.validate()) {
                    $scope.SurveyDetails.data()[0].QuestionGroups.forEach(function(questionGroup) {
                        questionGroup.Questions.forEach(function(question) {
                            var atleastOneOptionSelected = false;
                            question.Options.forEach(function(option) {
                                if (option.IsSelected) {
                                    atleastOneOptionSelected = true;
                                    return;
                                }
                                if (option.IsEndOfSurvey) {
                                    isEndOfSurvey = true;
                                    return;
                                }
                            });
                            if (!atleastOneOptionSelected) {
                                allQuestionsAnswered = false;   
                                return;
                            }else {
                                allQuestionsAnswered = true;
                                return;
                            }
                        });
                    });
                    if (!allQuestionsAnswered && isEndOfSurvey) {
                        CommonFunctions.DisplayAlertMessage(CommonMessages.Alert.AnswerAllQuestions);
                    } else if (isEndOfSurvey) {
                        PatientPathwaysTabService.SaveSurveyDetails(surveyResponse, 'POST', 'JSON', $scope.onSaveSurveyDetailsCompleted);
                         $scope.Buttons.EditButtonVisible = true;
                         $scope.Buttons.CancelButtonVisible = false;
                         $scope.Buttons.SaveButtonVisible = false;
						 $scope.IsSurveydetailsCommentDisabled = true;

                    }else {
						 $scope.IsSurveydetailsCommentDisabled = false;
                    }
                } else {
                }
            } catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "PatientPathwaysTab";
                errExp.FunctionName = "savePatientPathways";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
            }
        }
        
        /**
        * @ngdoc event
        * @name EditPatientPathways()
        * @eventOf roundingModule.controller:PatientPathwaysTabController
		* @description
        * 1] ng-click event for Editing pathways on view.
        * 2] Edit selected pathway.
        */
        $scope.EditPatientPathways = function() {
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            	$scope.Buttons.EditButtonVisible = false;
                $scope.Buttons.CancelButtonVisible = true;
                $scope.Buttons.SaveButtonVisible = true;
                $scope.SurveyDetails.data().forEach(function (surveyDetail) {
                    surveyDetail.QuestionGroups.forEach(function (questionGroup) {
                        questionGroup.Questions.forEach(function(question) {
							question.Options.forEach(function(option){
								option.IsOptionDisabled = false;
								question.IsRadioGroupDisabled = false;
								$scope.IsSurveydetailsCommentDisabled = false;
								
								
							});
                            
                            
                        });
                    });
                });	

        }

        /**
        * @ngdoc event
        * @name cancelPatientPathways()
        * @eventOf roundingModule.controller:PatientPathwaysTabController
		* @description
        * 1] ng-click event for cancel Pathways on the view.
        * 2] Revert changes made to the selected Pathway.
        */
        $scope.cancelPatientPathways = function() {
			try{
				
                CommonFunctions.OpenCustomConfirmBox('Confirm', CommonMessages.Alert.ChangesLost, "Yes,No", function(data) {
                    if (data !== undefined && data.returnValue !== undefined) {
                        $scope.Buttons.EditButtonVisible = true;
                        $scope.Buttons.CancelButtonVisible = false;
                        $scope.Buttons.SaveButtonVisible = false;
                        if (data.returnValue === true) {
                            $scope.IsSurveydetailsCommentDisabled = true;
                            
                            getPatientSurveyDetails();
                        } else {                        
                          $scope.EditPatientPathways();
                        }            
                    }
                });
			}
			catch(ex){
				var errExp = {};
				errExp.Exception = ex;
				errExp.ModuleName = PatientPathwaysTab;
				errExp.FunctionName = "cancelPatientPathways";
				errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
				
			}
			
		}
		
        /**
        * @ngdoc method
        * @name onGroupRadioChecked
        * @methodOf roundingModule.controller:PatientPathwaysTabController
		* @description
        * Selecting options for pathways.
        */
        $scope.onGroupRadioChecked = function(questionUID, uid, optionOrder) {
            try {
                var questionOrder = 0;
     			
                $scope.SurveyDetails.data().forEach(function(surveyDetail) {
                    surveyDetail.QuestionGroups.forEach(function(questionGroup) {
                        questionGroup.Questions.forEach(function (question) {
                            if (question.UID === questionUID) {
                                questionOrder = question.Order;   
                            }
                        });
                    });
                });
				
                //var skip = false;
                //var skipToQuestionUID = null;
				
                //var anyQuestionVisibled = false;
                $scope.SurveyDetails.data().forEach(function (surveyDetail) {
                    surveyDetail.QuestionGroups.forEach(function (questionGroup) {
                        questionGroup.Questions.forEach(function (question) {
                            if (question.UID === questionUID) {
                                question.Options.forEach(function (option) {
                                    if (parseInt(uid) === option.UID && parseInt(optionOrder) === option.OptionOrder) {
                                        option.IsSelected = true;
                                        option.SelectedIndex = option.OptionOrder;
									    question.SelectedIndex = option.OptionOrder - 1;
                                        
                                    }
                                    else {
                                        option.IsSelected = false;
                                        question.SelectedIndex = -1
                                        
                                    }
                                });
                            }
                        });
                    });
                });
                
                CommonFunctions.UIChanged();
            } catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "PatientPathwaysTab";
                errExp.FunctionName = "onGroupRadioChecked";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
            }
        }
		
        /**
        * @ngdoc method
        * @name bindPatientSurveyDetails
        * @methodOf roundingModule.controller:PatientPathwaysTabController
		* @description
        * Bind Survey Details for selected patient.
        */
        $scope.bindPatientSurveyDetails = function(surveyDetails, survey) {
            try {
                var visibility = { "IsQuestionVisible": false }
                var isOptionDisabled = { "IsOptionDisabled": false }
                var isRadioGroupDisabled = { "IsRadioGroupDisabled": false }
                var displayOrder = { "DisplayOrder": 0 }
                var questionOrder = { "QuestionOrder": 0 }
                var selectedIndex = {"SelectedIndex" : 0};
                var switchOption = {"SwitchOption":false};
				 
                $.each(surveyDetails, function (key1, surveyDetail) {
                    if (surveyDetail.SurveyComments === null) {
                        surveyDetail.SurveyComments = ""
                    }

                    if (surveyDetail.SurveyStatusCode === "Completed") {
                             isOptionDisabled.IsOptionDisabled = true;
                             isRadioGroupDisabled.IsRadioGroupDisabled = true;
                             $scope.IsSurveydetailsCommentDisabled = true;
                           
                        }   else if (surveyDetail.SurveyStatusCode === "Pending") {
                                 isOptionDisabled.IsOptionDisabled = false;
                                 isRadioGroupDisabled.IsRadioGroupDisabled = false;
								 $scope.Buttons.SaveButtonVisible = true;
                                 $scope.Buttons.CancelButtonVisible = true;
								 $scope.Buttons.EditButtonVisible = false;
								 $scope.IsSurveydetailsCommentDisabled = false;
						         
//								
                                 if (surveyDetail.SurveyComments === "") {
									 $scope.IsSurveydetailsCommentDisabled = false;
						           
                                  
                            }
                        }

					if (surveyDetail.QuestionGroups !== null) {
                            $.each(surveyDetail.QuestionGroups, function (key2, questionGroup) {
                                if (questionGroup !== null) {
                                    var wasLastQuestionVisible = false;
                                    var endOfSurvey = false;
                                    $.each(questionGroup.Questions, function (key3, question) {
                                        if (question !== null) {
                                            if (!question.IsMultiple) {
                                                $.extend(question, isRadioGroupDisabled);
                                            }

                                            questionOrder.QuestionOrder = question.Order; //Set QuestionOrder at Option level to display for skip logic
                                            $.each(question.Options, function (key4, option) {
                                                switchOption.SwitchOption = false;
                                                if (option.IsSelected) {
                                                 
                                                    question.SelectedIndex = option.OptionOrder; //set index manually
                                                    selectedIndex.SelectedIndex = option.OptionOrder;
                                                    switchOption.SwitchOption = true;
                                                    $.extend(option, selectedIndex);
                                                    if (option.IsEndOfSurvey) {
                                                        endOfSurvey = true;  
                                                    }

                                                }
                                       
                                                $.extend(option, isOptionDisabled);
                                                $.extend(option, questionOrder);
                                                $.extend(option, switchOption);
                                            });
											
											
                                            //If with answer of last question pathway was postponed then show the save button visible
                                            $.extend(question, displayOrder);
                                            $.extend(question, visibility);
                                        }
                                    });
                                }
                            });
                        }
					
                });
				
				
				
				$scope.SurveyDetails.data(surveyDetails);
                    if (surveyDetails.length === 0) {
						$scope.IsSurveydetailsCommentsVisible = false;
                        // $("#ptchart-pthwy-surveydetails-comments").css({ "visibility": "hidden" });
                    } else {
						$scope.IsSurveydetailsCommentsVisible = true;
                        // $("#ptchart-pthwy-surveydetails-comments").css({ "visibility": "visible" });
                    }  
					
				window.setTimeout(function () {
                        var hgt = $rootScope.Global.Objects.DeviceHeight - ($("#rcmdb-ptchart-pthwy-view").height() + 95);
                        $("#rcmdb-ptchart-pthwy-surveydetails").css({ "height": hgt.toString() + "px" }); 
                        CommonFunctions.CreateScroller("rcmdb-ptchart-pthwy-surveydetails");
                    }, 1000);                    

                    //hide all error messages for previously loaded
                    if ($("#rcmdb-ptchart-pthwy-content").data("kendoValidator") != undefined) {
                        $("#rcmdb-ptchart-pthwy-content").data("kendoValidator").hideMessages();
                    }
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "PatientPathwaysTab";
                errExp.FunctionName = "bindPatientSurveyDetails";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
            }
        }
		
        /**
        * @ngdoc method
        * @name surveyCommentsBlur
        * @methodOf roundingModule.controller:PatientPathwaysTabController
		* @description
        * Disable comments section in Pathway.
        */
		$scope.surveyCommentsBlur = function(){
			try{
				if($scope.SurveyDetails && $scope.SurveyDetails.data()[0] && $scope.SurveyDetails.data()[0].SurveyComments === ""){
					 $("#rcmdb-ptchart-pthwy-patient-comment").attr("disabled", true);
                     $("#rcmdb-ptchart-pthwy-provider-comment").attr("disabled", true);
                     $scope.SurveyDetails.data()[0].IncludePatientCommentYesNo = false;
                     $scope.SurveyDetails.data()[0].IncludeProviderCommentYesNo = false;
				}
				else{
					 $("#rcmdb-ptchart-pthwy-patient-comment").attr("disabled", false);
                     $("#rcmdb-ptchart-pthwy-provider-comment").attr("disabled", false);
				}
			}
			catch(ex){
				 var errExp = {};
                 errExp.Exception = ex;
                 errExp.ModuleName = "PatientPathwaysTab";
                 errExp.FunctionName = "surveyCommentsBlur"; 
                 errExp.StackTrace = printStackTrace({ e: ex });
                 ExceptionService.LogException(CommonFunctions.HandleException(errExp));
			}
			
		}
		
        /**
        * @ngdoc method
        * @name onSwitchChange
        * @methodOf roundingModule.controller:PatientPathwaysTabController
		* @description
        * Switch Change for Treatment Regimen Pathway.
        */
		$scope.onSwitchChange = function(){
			 
            $scope.SurveyDetails.data()[0].QuestionGroups.forEach(function(questionGroup) {
                questionGroup.Questions.forEach(function(question) {
                    if (question.IsMultiple) { 
                        question.Options.forEach(function(option) {
                            if (option.IsSelected && option.Description === "N/A") {
                                option.IsOptionDisabled = false;
                                option.FreeFormTemplate.HasFreeForm = true;
                                option.FreeFormResponse = null;
                                question.Options.forEach(function(option) {
                                    if (option.OptionOrder < 5) {
                                        option.IsSelected = false;
                                        option.IsOptionDisabled = true;
                                        option.FreeFormResponse = null;
                                    } 
                                });
                            } else {
                                option.IsOptionDisabled = false;
                            }
                        });
                    }
                })
            });
				
		}

    });
}());