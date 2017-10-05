(function () {
    /**
    * @ngdoc service
    * @author Sandeep Parmar
    * @name roundingModule.service:MedicationsService
    * @description     
    ** MedicationsService is being used by MedicationsController, AllergyFilterController, MedicationFilterController, MedicationMenuController, MedsReviewDateController and AddMedicationController
    ** This will be used for all service calls for Medication Screen

    * @property {string} selectedAllergyFilter     local variable, default value 'All'
    * @property {string} selectedMedicationFilter  local variable, default value 'All'
    * @property {date} screeningDate               local variable, default value ''
    * @property {array} surveyDetails              local variable, default value []
    * @property {date} lastMedReviewDate           local variable, default value ''
    * @property {json} selectedMedication          local variable, default value {}
    * @property {json} medicationsList             local variable, default value {}
    */
    angular.module('roundingModule').factory('MedicationsService', function ($rootScope, $timeout, ServiceConstants, RoundingService, Status,
                                        CommonConstants, CommonFunctions) {

        var selectedAllergyFilter = "All";
        var selectedMedicationFilter = "All";
        var screeningDate = "";
        var surveyDetails = [];
        var lastMedReviewDate = "";
        var selectedMedication = {};
        var medicationsList = {};
        

        /**
        * @ngdoc function 
        * @name NewMedicationModel
        * @methodOf roundingModule.service:MedicationsService
        * @param {enum} datastate CommonConstants.DataState
        * @param {bool} flag if true then add and false then edit mode
        * @returns {Object} new medicationModel  
        * @description       
        ** creates new MedicationModel and returns it
        */
        function newMedicationModel(datastate, flag) {
            return {
                IsAdd: flag, // true if in add mode, false if in edit mode 
                DataState: datastate, // datastate
                UID: null, // uid (if in edit mode)
                ESA: false,
                PatientUID: $rootScope.Global.Objects.SelectedPatient.UID, // patient uid
                SelectedDrug: [],
                DrugName: null, // label name text (autocomplete)
                DrugID: null, // label name value (autocomplete)
                OrderNote: null, // order note (text)
                MedicationStatus: CommonConstants.MedicationStatuses.ACTIVE,
                RxNumber: "D" + (new Date()).format("mmddyyHHMMss", false), // Rx Number (textbox)
                FilledDate: new Date(), // Filled (DatePicker)
                DiscontinuedDate: null, // Discontinued (DatePicker)
                WrittenDate: new Date(), // Written (DatePicker)
                Dose: null, // Dose (Numeric up-down)
                SelectedUnit: [],
                Unit: null, // Unit (autocomplete)
                SelectedFrequency: [], // Frequency (autocomplete),
                Frequency: null,
                SelectedRoute: [],
                Route: null, // Route (autocomplete)
                PrescNPI: null, // Pres NPI (textbox)
                RefillNumber: null, // Refill Number (Numeric up-down)
                Quantity: null, // Quantity (Numeric up-down)
                DaysSupply: null, // Days Supply (Numeric up-down)
                MaxRefills: null, // Max Refills (Numeric up-down)
                PrescName: null, // Name (textbox)
                PharmacyName: null, // Pharm Name (textbox)
                City: null, // City (textbox)
                SelectedState: [], // State (autocomplete)
                State: null,
                ZipCode: null, // Zip (textbox)
                Phone: null, // Phone (textbox)
                IsIPE: false,
                SelectedSource: [],
                Source: null,
                CreateDate: new Date(),
                SelectedIndication: [],
                IndicationCode: null, // Indication value (autocomplete)
                IndicationDescription: null, // Indication text (autocomplete)
                MapDiagnosis: null, // Indication text (autocomplete) if indication is set, else it should be disabled
                MapDiagnosisEnability: true,
                SelectedSubstitute: [],
                DrugSubsituteID: null, // Substitute value (autocomplete)
                DrugSubsituteDescription: null, // Substitute text (autocomplete)
                DiscontinueReason: null, // Discontinued Reason (textbox)
                Sequence: null,
                IsActive: null,
                DrugClass: null
            }
        }

        /**
        * @ngdoc function 
        * @name GetPatientMedication
        * @methodOf roundingModule.service:MedicationsService
        * @param {Object} data { patientUID: $rootScope.Global.Objects.SelectedPatient.UID, IsIpe: false or true }
        * @param {function} callback $scope.onPatientMedicationRetrieved      
        * @description       
        ** Calls GetPatientMedication api 'Clinical/GetPatientMedication' using RoundingService 
        */
        function getPatientMedication(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPatientMedication, 'POST', 'JSON', data, callback);
        }

        /**
        * @ngdoc function 
        * @name GetPatientAllergies
        * @methodOf roundingModule.service:MedicationsService
        * @param {Object} data { patientUID: $rootScope.Global.Objects.SelectedPatient.UID, IsIpe: false or true }
        * @param {function} callback $scope.onPatientAllergiesRetrieved      
        * @description       
        ** Calls GetPatientAllergies api 'Clinical/GetPatientAllergies' using RoundingService 
        */
        function getPatientAllergies(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPatientAllergies, 'POST', 'JSON', data, callback);
        }

        /**
        * @ngdoc function 
        * @name GetActionItems
        * @methodOf roundingModule.service:MedicationsService
        * @param {Object} data actionItemFilter
        * @param {function} callback $scope.onActionItemsRetrieved      
        * @description       
        ** Calls GetActionItems api 'User/GetActionItems' using RoundingService   
        */
        function getActionItems(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetActionItems, 'POST', 'JSON', data, callback);
        }

        /**
        * @ngdoc function 
        * @name GetMedReviewDate
        * @methodOf roundingModule.service:MedicationsService
        * @param {Object} data { patientUID: $rootScope.Global.Objects.SelectedPatient.UID }
        * @param {function} callback inline function     
        * @description       
        ** Calls GetMedReviewDate api 'Clinical/GetMedReviewDate' using RoundingService   
        */
        function getMedReviewDate(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetMedReviewDate, 'POST', 'JSON', data, callback, true);
        }

        /**
        * @ngdoc function 
        * @name GetAllergyList
        * @methodOf roundingModule.service:MedicationsService
        * @param {Object} data search text
        * @param {function} callback $scope.setAllergySuggestionList     
        * @description       
        ** Calls GetAllergyList api 'DIB/GetAllergyList' using RoundingService   
        */
        function getAllergyList(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetAllergyList, 'GET', 'JSON', data, callback);
        }

        /**
        * @ngdoc function 
        * @name GetMedicationsList
        * @methodOf roundingModule.service:MedicationsService
        * @param {Object} data search text
        * @param {function} callback $scope.setAllergySuggestionList or inline function    
        * @description       
        ** Calls GetMedList api 'DIB/GetMedList' using RoundingService   
        */
        function getMedicationsList(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetMedList, 'GET', 'JSON', data, callback);
        }

        /**
        * @ngdoc function 
        * @name SavePatientAllergy
        * @methodOf roundingModule.service:MedicationsService
        * @param {Object} data $scope.model.AllergyModel
        * @param {function} callback inline function    
        * @description       
        ** Calls SavePatientAllergy api 'Clinical/SavePatienttAllergy' using RoundingService   
        */
        function savePatientAllergy(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.SavePatientAllergy, 'POST', 'JSON', data, callback);
        }

        /**
        * @ngdoc function 
        * @name GetSurveyDetails
        * @methodOf roundingModule.service:MedicationsService
        * @param {Object} data { PatientUID: $rootScope.Global.Objects.SelectedPatient.UID, HarUID: '', SurveyTypeCode: "InterventionMedication", NoOfSurveys: 1 }
        * @param {function} callback MedicationsService.SetIntMedicationSurvey    
        * @description       
        ** Calls GetSurveyDetails api 'Pathways/GetSurveyDetails' using RoundingService   
        */
        function getSurveyDetails(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetSurveyDetails, 'POST', 'JSON', data, callback);
        }

        /**
        * @ngdoc function 
        * @name SaveSurveyDetails
        * @methodOf roundingModule.service:MedicationsService
        * @param {Object} data surveyResponse
        * @param {function} callback inline function    
        * @description       
        ** Calls SaveSurveyDetails api 'Pathways/SaveSurveyDetails' using RoundingService   
        */
        function saveSurveyDetails(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.SaveSurveyDetails, 'POST', 'JSON', data, callback);
        }

        /**
        * @ngdoc function 
        * @name PerformAggregateScreening
        * @methodOf roundingModule.service:MedicationsService
        * @param {Object} data $.param({ '': $rootScope.Global.Objects.SelectedPatient.UID }
        * @param {function} callback inline function    
        * @description       
        ** Calls PerformAggregateScreening api 'DIB/PerformAggregateScreening' using RoundingService   
        */
        function performAggregateScreening(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.PerformAggregateScreening, 'POST', 'JSON', data, callback, true);
        }

        /**
        * @ngdoc function 
        * @name SearchMedicalConditions
        * @methodOf roundingModule.service:MedicationsService
        * @param {Object} data search text
        * @param {function} callback inline function    
        * @description       
        ** Calls SearchMedicalConditions api 'DIB/SearchMedicalConditions' using RoundingService   
        */
        function searchMedicalConditions(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.SearchMedicalConditions, 'POST', 'JSON', data, callback, true);
        }

        /**
        * @ngdoc function 
        * @name SavePatientMedication
        * @methodOf roundingModule.service:MedicationsService
        * @param {Object} data addMedsRequest
        * @param {function} callback inline function    
        * @description       
        ** Calls SavePatientMedication api 'Clinical/SavePatientMedication' using RoundingService   
        */
        function savePatientMedication(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.SavePatientMedication, 'POST', 'JSON', data, callback);
        }

        /**
        * @ngdoc function 
        * @name SetAllergyFilter
        * @methodOf roundingModule.service:MedicationsService
        * @param {Object} filter selectedAllergyFilter
        * @description       
        ** Sets selectedAllergyFilter and Broadcasts setAllergyFilter   
        */
        function setAllergyFilter(filter) {
            selectedAllergyFilter = filter;
            $timeout(function () {
                $rootScope.$broadcast('setAllergyFilter', { "filter": filter });
            }, 0, false);
        }

        /**
        * @ngdoc function 
        * @name GetAllergyFilter
        * @methodOf roundingModule.service:MedicationsService
        * @returns {Object} local variable selectedAllergyFilter
        * @description       
        ** Returns selectedAllergyFilter    
        */
        function getAllergyFilter() {
            return selectedAllergyFilter;
        }

        /**
        * @ngdoc function 
        * @name SetMedicationFilter
        * @methodOf roundingModule.service:MedicationsService
        * @param {Object} filter selectedMedicationFilter
        * @description       
        ** Sets selectedMedicationFilter and Broadcasts setMedicationFilter   
        */
        function setMedicationFilter(filter) {
            selectedMedicationFilter = filter;
            $timeout(function () {
                $rootScope.$broadcast('setMedicationFilter', { "filter": filter });
            }, 0, false);
        }

        /**
        * @ngdoc function 
        * @name OnActionItemsRetrieved
        * @methodOf roundingModule.service:MedicationsService
        * @param {Object} data returned by service
        * @description       
        ** Broadcasts onActionItemsRetrieved    
        */
        function onActionItemsRetrieved(data) {
            $rootScope.$broadcast('onActionItemsRetrieved', { "data": data });
        }

        /**
        * @ngdoc function 
        * @name GetMedicationFilter
        * @methodOf roundingModule.service:MedicationsService
        * @returns {Object} local variable selectedMedicationFilter
        * @description       
        ** Returns selectedMedicationFilter    
        */
        function getMedicationFilter() {
            return selectedMedicationFilter;
        }

        /**
        * @ngdoc function 
        * @name SetScreeningDate
        * @methodOf roundingModule.service:MedicationsService
        * @param {date} date screening date which needs to be set
        * @description       
        ** Sets screeningDate    
        */
        function setScreeningDate(date) {
            screeningDate = date;
        }

        /**
        * @ngdoc function 
        * @name GetScreeningDate
        * @methodOf roundingModule.service:MedicationsService
        * @returns {Object} local variable screeningDate
        * @description       
        ** returns screeningDate    
        */
        function getScreeningDate() {
            return screeningDate;
        }

        /**
        * @ngdoc function 
        * @name SetIntMedicationSurvey
        * @methodOf roundingModule.service:MedicationsService
        * @param {object} result result returned by service
        * @description       
        ** Sets screeningDate    
        */
        function setIntMedicationSurvey(result) {
            if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                surveyDetails = result.data.SurveyDetails[0];
            }
        }

        /**
        * @ngdoc function 
        * @name GetIntMedicationSurvey
        * @methodOf roundingModule.service:MedicationsService
        * @returns {object} surveyDetails local variable
        * @description       
        ** Sets screeningDate    
        */
        function getIntMedicationSurvey() {
            return surveyDetails;
        }

        /**
        * @ngdoc function 
        * @name SetLastMedReviewDate
        * @methodOf roundingModule.service:MedicationsService
        * @param {object} date med review date
        * @description       
        ** Sets lastMedReviewDate   
        ** Broadcasts onLastMedReviewDateRetrieved
        */
        function setLastMedReviewDate(date) {
            lastMedReviewDate = date;
            $rootScope.$broadcast('onLastMedReviewDateRetrieved', { "date": date });
        }

        /**
        * @ngdoc function 
        * @name RefreshMedications
        * @methodOf roundingModule.service:MedicationsService
        * @description       
        ** Broadcasts refreshMedications
        */
        function refreshMedications() {
            $rootScope.$broadcast('refreshMedications');
        }

        /**
        * @ngdoc function 
        * @name GetLastMedReviewDate
        * @methodOf roundingModule.service:MedicationsService
        * @returns {Object} local variable lastMedReviewDate
        * @description       
        ** returns lastMedReviewDate    
        */
        function getLastMedReviewDate() {
            return lastMedReviewDate;
        }

        /**
        * @ngdoc function 
        * @name SetSelectedMedication
        * @methodOf roundingModule.service:MedicationsService
        * @param {Object} medication local variable medication
        * @description       
        ** sets selectedMedication    
        */
        function setSelectedMedication(medication) {
            selectedMedication = medication;
        }

        /**
        * @ngdoc function 
        * @name SetMedications
        * @methodOf roundingModule.service:MedicationsService
        * @param {Object} medications local variable medications
        * @description       
        ** sets medications List    
        */
        function setMedications(medications) {
            medicationsList = medications;
        }

        /**
        * @ngdoc function 
        * @name GetMedications
        * @methodOf roundingModule.service:MedicationsService
        * @param {Object} medications local variable medications
        * @description       
        ** Get medicationsList   
        */
        function getMedications() {
            return medicationsList;
        }

        /**
        * @ngdoc function 
        * @name GetSelectedMedication
        * @methodOf roundingModule.service:MedicationsService
        * @returns {Object} local variable medication
        * @description       
        ** returns selectedMedication    
        */
        function getSelectedMedication() {
            return selectedMedication;
            
        }

        return {
            GetPatientMedication: getPatientMedication,
            GetPatientAllergies: getPatientAllergies,
            GetActionItems: getActionItems,
            GetMedReviewDate: getMedReviewDate,
            SetAllergyFilter: setAllergyFilter,
            GetAllergyFilter: getAllergyFilter,
            GetAllergyList: getAllergyList,
            GetMedicationsList: getMedicationsList,
            SavePatientAllergy: savePatientAllergy,
            SetMedicationFilter: setMedicationFilter,
            GetMedicationFilter: getMedicationFilter,
            PerformAggregateScreening: performAggregateScreening,
            SearchMedicalConditions: searchMedicalConditions,
            SavePatientMedication: savePatientMedication,
            RefreshMedications: refreshMedications,
            OnActionItemsRetrieved: onActionItemsRetrieved,
            SetScreeningDate: setScreeningDate,
            GetScreeningDate: getScreeningDate,
            GetIntMedicationSurvey: getIntMedicationSurvey,
            SetIntMedicationSurvey: setIntMedicationSurvey,
            GetLastMedReviewDate: getLastMedReviewDate,
            SetLastMedReviewDate: setLastMedReviewDate,
            GetSurveyDetails: getSurveyDetails,
            SaveSurveyDetails: saveSurveyDetails,
            NewMedicationModel: newMedicationModel,
            SetSelectedMedication: setSelectedMedication,
            GetSelectedMedication: getSelectedMedication,
            GetMedications: getMedications,
            SetMedications: setMedications
        };
    });
}());

(function () {
    angular.module('roundingModule')
        .controller('MedicationsController', function ($rootScope, $scope, $timeout, LookUp, LookupTypes, MedicationsService, ExceptionService, CommonFunctions,
                                                       CommonConstants, ScreenConstants, Status, CommonMessages) {
            /**
             * @ngdoc controller
             * @name roundingModule.controller:MedicationsController
             * @description 
             ** Main Controller for Medications Screen 
             
             * @property {object} $scope.model                            model of MedicationsController
             * @property {object} $scope.model.Alerts                     property of $scope.model used for Alerts
             * @property {object} $scope.model.Medications                property of $scope.model used for Medications
             * @property {object} $scope.model.LastReviewDate             property of $scope.model used for LastReviewDate
             * @property {object} $scope.model.LastReviewDateVisible      property of $scope.model used for LastReviewDate Visibility
             * @property {object} $scope.model.Allergies                  property of $scope.model used for Allergies
             * @property {object} $scope.model.NoDataVisible              property of $scope.model used for NoData Visibility   
             * @property {object} $scope.model.Filters                    property of $scope.model used for Filters  of Allergies 
             * @property {object} $scope.model.AllergyListConfig          property of $scope.model used for Allergy List AutoCompleteBox 
             * @property {object} $scope.model.AllergyModel               property of $scope.model used for Allergy 
             * @property {object} $scope.model.MedicationModel            property of $scope.model used for Medication 
             */

            $scope.$$listeners['setAllergyFilter'] = [];
            $scope.$$listeners['setMedicationFilter'] = [];
            $scope.$$listeners['onActionItemsRetrieved'] = [];
            $scope.$$listeners['onLastMedReviewDateRetrieved'] = [];
            $scope.$$listeners['refreshMedications'] = [];

            $scope.model = {};
            $scope.model.Alerts = {};
            $scope.model.Medications = new kendo.data.DataSource({ data: [] });
            $scope.model.LastReviewDate = null;
            $scope.model.LastReviewDateVisible = false;
            $scope.model.Allergies = new kendo.data.DataSource({ data: [] });
            $scope.model.NoDataVisible = false;

            $scope.model.Filters = {
                "AllergyFilterVisible": true,
                "AllergyFilter": "All",
                "AddAllergyVisible": false,
                "AddAllergyDisable": false,
                "MedicationFilter": "All"
            };

            $scope.model.AllergyListConfig = {
                placeholder: "Allergy",
                filter: "contains",
                minLength: "3",
                dataTextField: "Description",
                dataSource: new kendo.data.DataSource({ data: [] })
            };

            $scope.model.AllergyModel = {};
            $scope.model.MedicationModel = {};

            function newAllergyModel(datastate, patientuid) {
                $scope.model.AllergyModel = {
                    UID: "",
                    AllergyName: "",
                    DIBAllerygyID: "",
                    IsIPE: "",
                    IsDeleted: "",
                    Symptom: "",
                    DataState: datastate,
                    PatientUID: patientuid,
                    AllergyType: "AllergyClass"
                }
            }

            //load the lookups
            LookUp.GetLookUp(LookupTypes.MedicationSource);
            LookUp.GetLookUp(LookupTypes.MedicationStatus);
            LookUp.GetLookUp(LookupTypes.UnitOfMeasure);
            LookUp.GetLookUp(LookupTypes.Frequency);
            LookUp.GetLookUp(LookupTypes.MedAdministrationRoute);
            LookUp.GetLookUp(LookupTypes.State);
            LookUp.GetLookUp(LookupTypes.ESADrugs);

            /**
             * @ngdoc function 
             * @name getLookupItem
             * @methodOf roundingModule.controller:MedicationsController    
             * @param {string} lookupType type of lookup
             * @param {string} item lookup item whose text needs to get
             * @returns {string} lookup item text
             * @description    
             ** Gets call from Medications view for lookup text based on value   
             */
            $scope.getLookupItem = function (lookupType, item) {
                return LookUp.GetValueByKey(lookupType, item).Text;
            }

            /**
             * @ngdoc event 
             * @name setAllergyFilter
             * @eventOf roundingModule.controller:MedicationsController
             * @param {string} e event data
             * @param {string} arg arg with filter data
             * @description       
             ** subscriber of setAllergyFilter broadcast event which will filter allergies list
             */
            $scope.$on('setAllergyFilter', function (e, arg) {
                $scope.model.Filters.AllergyFilter = arg.filter;
                if (CommonFunctions.IsNotNullOrEmpty($scope.model.Allergies)) {
                    //Filter the allergies list here
                    if ($scope.model.Filters.AllergyFilter === "All") {
                        $scope.model.Allergies.filter({});
                    } else if ($scope.model.Filters.AllergyFilter === "Allergy Class") {
                        $scope.model.Allergies.filter({ field: "AllergyType", operator: "eq", value: "AllergyClass" });
                    } else if ($scope.model.Filters.AllergyFilter === "Medication") {
                        $scope.model.Allergies.filter({ field: "AllergyType", operator: "eq", value: "Medication" });
                    }
                    CommonFunctions.ResetScroller("alrg-list-scrolls");
                }
            });

            /**
             * @ngdoc event 
             * @name setMedicationFilter
             * @eventOf roundingModule.controller:MedicationsController
             * @param {string} e event data
             * @param {string} arg arg with filter data
             * @description       
             ** subscriber of setMedicationFilter broadcast event which will filter medications list
             */
            $scope.$on('setMedicationFilter', function (e, arg) {
                $scope.model.Filters.MedicationFilter = arg.filter;
                if (CommonFunctions.IsNotNullOrEmpty($scope.model.Medications)) {
                    //Filter the allergies list here
                    if ($scope.model.Filters.MedicationFilter === "All") {
                        $scope.model.Medications.filter({});
                    } else if ($scope.model.Filters.MedicationFilter === "Active") {
                        $scope.model.Medications.filter({ field: "MedicationStatus", operator: "eq", value: "A" });
                    } else if ($scope.model.Filters.MedicationFilter === "Discontinued") {
                        $scope.model.Medications.filter({ field: "MedicationStatus", operator: "eq", value: "D" });
                    }
                    CommonFunctions.ResetScroller("meds-list-scrolls");
                }
            });

            /**
            * @ngdoc event 
            * @name onActionItemsRetrieved
            * @eventOf roundingModule.controller:MedicationsController
            * @param {string} e event data
            * @param {string} arg arg with filter data
            * @description       
            ** subscriber of onActionItemsRetrieved broadcast event which will call $scope.onActionItemsRetrieved passing arg
            */
            $scope.$on('onActionItemsRetrieved', function (e, arg) {
                $scope.onActionItemsRetrieved(arg);
            });

            /**
            * @ngdoc event 
            * @name onLastMedReviewDateRetrieved
            * @eventOf roundingModule.controller:MedicationsController
            * @param {string} e event data
            * @param {string} arg arg with filter data
            * @description       
            ** subscriber of onLastMedReviewDateRetrieved broadcast event which will set $scope.model.LastReviewDate 
            ** Changes UI behaviour  
            */
            $scope.$on('onLastMedReviewDateRetrieved', function (e, arg) {
                $timeout(function () {
                    $scope.model.LastReviewDate = arg.date;
                    if (CommonFunctions.IsNotNullOrEmpty($("#medication-tab-strip").data("kendoTabStrip"))) {
                        if ($("#medication-tab-strip").data("kendoTabStrip").select().index() === 1) {
                            $scope.model.LastReviewDateVisible = true;
                        }
                    }
                }, 0, true);
            });

            /**
            * @ngdoc event 
            * @name refreshMedications
            * @eventOf roundingModule.controller:MedicationsController            
            * @description       
            ** subscriber of refreshMedications broadcast event which will call MedicationsService.GetPatientMedication
            */
            $scope.$on('refreshMedications', function () {
                // call get patient medication to list medication
                MedicationsService.GetPatientMedication({ patientUID: $rootScope.Global.Objects.SelectedPatient.UID, IsIpe: false }, $scope.onPatientMedicationRetrieved);
            });

            /**
            * @ngdoc function 
            * @name showMedications
            * @methodOf roundingModule.controller:MedicationsController
            * @description       
            ** Gets call when Medications Screen loads
            ** Calls MedicationsService.GetActionItems
            ** Calls MedicationsService.GetPatientMedication
            ** Calls MedicationsService.GetPatientAllergies
            ** Calls $scope.getSurvey()
            ** Changes UI behaviour  
            */
            $scope.showMedications = function () {
                CommonFunctions.BlockKendoView("ptchart-splitview-main-pan", CommonMessages.BusyMessages.LoadingMedications);
                $scope.model.Alerts.MedsActiveVisible = false;
                $scope.model.Alerts.MedsMprVisible = false;

                var curDate = new Date();
                var actionItemFilter = {
                    StartDate: (new Date(curDate.setFullYear(curDate.getUTCFullYear() - 1))).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                    DataFilter: [CommonConstants.ActionItemType.DIBAlerts],
                    EndDate: (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                    PtUID: $rootScope.Global.Objects.SelectedPatient.UID,
                    CapellaUserUID: $rootScope.Global.Objects.CurrentUser.UID
                };

                if (LookUp.GetLookUp(LookupTypes.ESADrugs) === undefined) {
                    window.setTimeout(function () {
                        // call get patient action items
                        MedicationsService.GetActionItems(actionItemFilter, $scope.onActionItemsRetrieved);
                        // call get patient medication to list medication
                        MedicationsService.GetPatientMedication({ patientUID: $rootScope.Global.Objects.SelectedPatient.UID, IsIPE: false }, $scope.onPatientMedicationRetrieved);
                        // call get patient allergy to show the allergy list
                        MedicationsService.GetPatientAllergies({ patientUID: $rootScope.Global.Objects.SelectedPatient.UID, IsIPE: false }, $scope.onPatientAllergiesRetrieved);

                        $scope.getSurvey();
                    }, 2500);
                }
                else {
                    // call get patient action items
                    MedicationsService.GetActionItems(actionItemFilter, $scope.onActionItemsRetrieved);
                    // call get patient medication to list medication
                    MedicationsService.GetPatientMedication({ patientUID: $rootScope.Global.Objects.SelectedPatient.UID, IsIPE: false }, $scope.onPatientMedicationRetrieved);
                    // call get patient allergy to show the allergy list
                    MedicationsService.GetPatientAllergies({ patientUID: $rootScope.Global.Objects.SelectedPatient.UID, IsIPE: false }, $scope.onPatientAllergiesRetrieved);
                    $scope.getSurvey();
                }

                $timeout(function () {
                    var tabStrip = $("#medication-tab-strip").kendoTabStrip().data("kendoTabStrip");
                    if (tabStrip) {
                        var selectedtab = tabStrip.select(0);
                        $scope.onTabSelect(selectedtab);
                    }
                }, 0, false);
            }

            /**
            * @ngdoc function 
            * @name getSurvey
            * @methodOf roundingModule.controller:MedicationsController
            * @description       
            ** Calls MedicationsService.GetSurveyDetails
            ** Changes UI behaviour  
            */
            $scope.getSurvey = function () {
                try {
                    window.setTimeout(function () {
                        MedicationsService.GetSurveyDetails({ PatientUID: $rootScope.Global.Objects.SelectedPatient.UID, HarUID: '', SurveyTypeCode: "InterventionMedication", NoOfSurveys: 1 }, MedicationsService.SetIntMedicationSurvey);
                    }, 200);
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Medications";
                    errExp.FunctionName = "getSurvey";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
            * @ngdoc function 
            * @name onActionItemsRetrieved
            * @methodOf roundingModule.controller:MedicationsController
            * @param {object} result returned by service
            * @description       
            ** Callback function of MedicationsService.GetActionItems
            */
            $scope.onActionItemsRetrieved = function (result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        if (result.data.length > 0) {
                            $scope.model.Alerts.MedsActiveVisible = true;
                        }
                    }
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Medications";
                    errExp.FunctionName = "onActionItemsRetrieved";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
            * @ngdoc function 
            * @name onPatientMedicationRetrieved
            * @methodOf roundingModule.controller:MedicationsController
            * @param {object} result returned by service
            * @description       
            ** Callback function of MedicationsService.GetPatientMedication
            ** Populates Medications
            ** Calls getLastReviewDatw()
            ** Changes UI behaviour
            */
            $scope.onPatientMedicationRetrieved = function (result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        if (result.data.length > 0) {
                            var sysdate = new Date();
                            $.each(result.data, function (key, item) {
                                if (item.DiscontinuedDate === null && item.MPR !== null && (item.MPR < 0.8 || item.MPR > 1.2)) {
                                    $scope.model.Alerts.MedsMprVisible = true;
                                }

                                //HKP : 9/29/2015 - updating logic for TK-29986 (UI: Rounding: Update logic for Discontinue Date)
                                //if(item.DiscontinuedDate !== null && item.DiscontinuedDate !== undefined && (new Date(item.DiscontinuedDate)).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false) > (new Date(CommonFunctions.DateFunctions.sysDate())).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false)) {
                                //    item.MedicationStatus = "A";
                                //}

                                if (item.Dose) {
                                    var num = item.Dose;
                                    var convertToFloat = parseFloat(num).toFixed(2);
                                    item.Dose = convertToFloat;

                                }

                                if (item.DiscontinuedDate !== null && item.DiscontinuedDate !== undefined) {
                                    if (Date.parse(item.DiscontinuedDate) > Date.parse(sysdate)) {
                                        item.MedicationStatus = "A";
                                    }
                                    else {
                                        item.MedicationStatus = "D";
                                    }
                                }

                                if (item.DrugID === 0) {
                                    var drugItem = CommonFunctions.Find(LookUp.GetLookupWithoutSelectValue(LookupTypes.ESADrugs), "Value", item.DrugName);
                                    if (drugItem !== null && drugItem !== undefined) {
                                        $.extend(item, { DrugNameText: drugItem[0].Text });
                                    }
                                }
                                else {
                                    $.extend(item, { DrugNameText: "" });
                                }
                            });

                            $scope.model.Medications.data(result.data);
                            CommonFunctions.CreateScroller("meds-list-scrolls");
                            MedicationsService.SetMedications($scope.model.Medications);
                            getLastReviewDate();

                            $scope.model.NoDataVisible = false;
                        } else {
                            MedicationsService.SetMedications(null);
                            $scope.model.Medications.data([]);
                            $scope.model.NoDataVisible = true;
                        }

                        MedicationsService.SetMedicationFilter("Active");
                    }
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Medications";
                    errExp.FunctionName = "onPatientMedicationRetrieved";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
                CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");
            }

            /**
            * @ngdoc function 
            * @name onPatientAllergiesRetrieved
            * @methodOf roundingModule.controller:MedicationsController
            * @param {object} result returned by service
            * @description       
            ** Callback function of MedicationsService.GetPatientAllergies
            ** Populates Allergies
            ** Calls MedicationsService.SetAllergyFilter
            ** Changes UI behaviour
            */
            $scope.onPatientAllergiesRetrieved = function (result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        if (result.data.length > 0) {
                            $scope.model.Allergies.data(result.data);
                            CommonFunctions.CreateScroller("alrg-list-scrolls");
                        } else {
                            $scope.model.Allergies.data([]);
                        }

                        MedicationsService.SetAllergyFilter("All");
                    }
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Medications";
                    errExp.FunctionName = "onPatientAllergiesRetrieved";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
            * @ngdoc event 
            * @name onTabSelect
            * @eventOf roundingModule.controller:MedicationsController
            * @param {string} tab text of the tab
            * @description       
            ** ng-click event of tab select from medications view
            ** Changes UI behaviour
            */
            $scope.onTabSelect = function (tab) {
                if (tab === "Medications") {
                    if ($scope.model.LastReviewDate !== null) {
                        $scope.model.LastReviewDateVisible = true;
                    }
                    $scope.model.Filters.AllergyFilterVisible = false;
                    $scope.model.Filters.AddAllergyVisible = false;
                } else {
                    $scope.model.Filters.AllergyFilterVisible = true;
                    $scope.model.LastReviewDateVisible = false;
                    $scope.model.Filters.AddAllergyDisable = false;
                }
            }

            /**
            * @ngdoc function 
            * @name getLastReviewDate
            * @methodOf roundingModule.controller:MedicationsController
            * @description       
            ** Calls MedicationsService.GetMedReviewDate
            ** Changes UI behaviour
            */
            getLastReviewDate = function () {
                try {
                    MedicationsService.GetMedReviewDate($.param({ '': $rootScope.Global.Objects.SelectedPatient.UID }), function (result) {
                        if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                            MedicationsService.SetLastMedReviewDate(result.data.MedReviewDate);
                            $scope.model.LastReviewDateVisible = false;
                        }
                    });
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Medications";
                    errExp.FunctionName = "getLastReviewDate";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
            * @ngdoc event 
            * @name onAddAllergyClick
            * @eventOf roundingModule.controller:MedicationsController
            * @description       
            ** ng-click event of Add Alergy Button from medications view
            ** Creates new $scope.model.AllergyModel
            ** Changes UI behaviour
            */
            $scope.onAddAllergyClick = function () {
                newAllergyModel(CommonConstants.DataState.Added, $rootScope.Global.Objects.SelectedPatient.UID);

                // Show Add allergy section
                //$(".alrg-add").fadeIn("fast");
                $scope.model.Filters.AddAllergyVisible = true;
                $scope.model.Filters.AddAllergyDisable = true;

                var scroller = $("#alrg-list-scrolls").data("kendoMobileScroller");
                if (scroller) {
                    var offset = scroller.height();
                    if (offset === 0) {
                        offset = 100;
                    }

                    if (scroller.scrollHeight() > 490) {
                        scroller.scrollTo(0, scroller.scrollHeight() * -1 - 70 + offset);
                    }
                }
				CommonFunctions.UIChanged();
            }

            /**
            * @ngdoc event 
            * @name getAllergyData
            * @eventOf roundingModule.controller:MedicationsController
            * @param {object} e event data
            * @description       
            ** key-up event of Allergy Auto Complete Box
            ** Calls MedicationsService.GetAllergyList
            ** Calls refereshAutoComplete
            ** Calls closeAutoComplete
            ** Changes UI behaviour
            */
            $scope.getAllergyData = function (e) {
                if ($scope.model.AllergyModel.AllergyName) {
                    if (CommonFunctions.ShouldGetData($scope.model.AllergyModel.AllergyName, e)) {
                        if ($scope.model.AllergyModel.AllergyType === "AllergyClass") {
                            MedicationsService.GetAllergyList({ searchText: $scope.model.AllergyModel.AllergyName }, $scope.setAllergySuggestionList);
                        } else {
                            MedicationsService.GetMedicationsList({ searchText: $scope.model.AllergyModel.AllergyName }, $scope.setAllergySuggestionList);
                        }
                    }
                    else {
                        refreshAutoComplete('acAllergy', []);
                        closeAutoComplete('acAllergy');
                    }
                }
            }

            /**
            * @ngdoc function 
            * @name closeAutoComplete
            * @methodOf roundingModule.controller:MedicationsController
            * @description       
            ** Closes AutoComplete only for less then 3 character input
            */
            closeAutoComplete = function (id) {
                var ac = $("#" + id).data("kendoAutoComplete");
                ac.close();
            }

            /**
            * @ngdoc function 
            * @name refreshAutoComplete
            * @methodOf roundingModule.controller:MedicationsController
            * @description       
            ** Refreshes autocomplete manually after retriving data from server
            */
            refreshAutoComplete = function (id, data) {
                var ac = $("#" + id).data("kendoAutoComplete");
                ac.setDataSource(data);
                ac.search(ac.value());
            }

            /**
            * @ngdoc function 
            * @name setAllergySuggestionList
            * @methodOf roundingModule.controller:MedicationsController
            * @description 
            ** Call back function of MedicationsService.GetAllergyList
            ** Call back function of MedicationsService.GetMedicationsList
            ** Updates allergy suggestion list after GetAllergyList or GetMedicationsList service call is over
            */
            $scope.setAllergySuggestionList = function (result) {
                try {
                    if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                        $scope.model.AllergyListConfig.dataSource.data(result.data);
                        refreshAutoComplete('acAllergy', result.data);
                    }
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Medications";
                    errExp.FunctionName = "setAllergySuggestionList";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
            * @ngdoc event 
            * @name model.AllergyModel.AllergyType
            * @eventOf roundingModule.controller:MedicationsController
            * @description 
            ** Watches changes for model.AllergyModel.AllergyType
            */
            $scope.$watch("model.AllergyModel.AllergyType", function (newValue, oldValue) {
                // Ignore initial setup.
                if (newValue === oldValue) {
                    return;
                }

                if ($scope.model.AllergyModel.AllergyType === newValue) {
                    $scope.model.AllergyListConfig.dataSource.data([]);
                    $scope.model.AllergyModel.AllergyName = "";
                    return;
                }
            });

            /**
            * @ngdoc event 
            * @name onSaveAllergyClick
            * @eventOf roundingModule.controller:MedicationsController
            * @description 
            ** k-on-tap event of Save Allergy Button from medications view
            ** Calls MedicationsService.SavePatientAllergy
            ** Calls MedicationsService.GetPatientAllergies
            ** Changes UI behaviour            
            */
            $scope.onSaveAllergyClick = function () {
                try {
                    if ($scope.addAllergyValidator.validate()) {
                        CommonFunctions.BlockElement("medication-tab-strip");
                        $("#alrg-autocomplete .k-tooltip-validation").hide();

                        var allergy = $("#acAllergy").data("kendoAutoComplete");
                        if (allergy) {
                            $scope.model.AllergyModel.AllergyName = allergy.value();
                        }

                        $.each($scope.model.AllergyListConfig.dataSource.data(), function (key, item) {
                            if (item.Description === $scope.model.AllergyModel.AllergyName) {
                                $scope.model.AllergyModel.DIBAllerygyID = item.ID;
                                return false;
                            }
                        });

                        MedicationsService.SavePatientAllergy($scope.model.AllergyModel, function (result) {
                            if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                                if (result.data) {
                                    CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.AllergySaved);
                                    MedicationsService.GetPatientAllergies({ patientUID: $rootScope.Global.Objects.SelectedPatient.UID, IsIPE: false }, $scope.onPatientAllergiesRetrieved);

                                    // calling onCancelAllergyClick to reset changes
                                    cancelCurrentAllergy();
                                    $scope.model.Filters.AddAllergyDisable = false;
                                } else {
                                    CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.AllergySaveFailed);
                                }
                            }
                            CommonFunctions.UnblockElement("medication-tab-strip");
                        });
						CommonFunctions.UISaved();
                    } else {
                        $("#alrg-autocomplete .k-tooltip-validation").show();
                    }
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Medications";
                    errExp.FunctionName = "onSaveAllergyClick";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
            * @ngdoc event 
            * @name onDeleteAllergyTap
            * @eventOf roundingModule.controller:MedicationsController
            * @param {object} dataItem  item of $scope.model.Allergies
            * @description 
            ** k-on-tap event of Delete Allergy Button from medications view
            ** Calls MedicationsService.SavePatientAllergy
            ** Calls MedicationsService.GetPatientAllergies
            ** Changes UI behaviour            
            */
            $scope.onDeleteAllergyTap = function (dataItem) {
                CommonFunctions.OpenCustomConfirmBox("Confirm", CommonMessages.Alert.ConfirmDeleteAllergy, "Yes,No", function (data) {
                    if (data !== undefined && data.returnValue !== undefined) {
                        if (data.returnValue) {
                            CommonFunctions.BlockElement("medication-tab-strip");
                            var deleteAllergy = {
                                UID: dataItem.UID, PatientUID: dataItem.PatientUID, AllergyName: dataItem.AllergyName,
                                DIBAllerygyID: dataItem.DIBAllerygyID, AllergyType: dataItem.AllergyType, IsIPE: false,
                                IsDeleted: true, Symptom: dataItem.Symptom, DataState: CommonConstants.DataState.Deleted
                            };

                            MedicationsService.SavePatientAllergy(deleteAllergy, function (result) {
                                if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                                    if (result.data) {
                                        CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.AllergyDeleted);
                                        $scope.model.Allergies.remove(dataItem);
                                        CommonFunctions.ResetScroller("alrg-list-scrolls");
                                    } else {
                                        CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.AllergyDeleteFailed);
                                    }
                                }
                                CommonFunctions.UnblockElement("medication-tab-strip");
                            });
                        }
                    }
                });
            }

            /**
            * @ngdoc event 
            * @name onCancelAllergyClick
            * @eventOf roundingModule.controller:MedicationsController
            * @description 
            ** k-on-tap event of Cancel Allergy Button from medications view
            ** Calls cancelCurrentAllergy            
            ** Changes UI behaviour            
            */
            $scope.onCancelAllergyClick = function () {
                if ($scope.model.AllergyModel.AllergyName !== "" || $scope.model.AllergyModel.Symptom !== "") {
                    CommonFunctions.OpenConfirmBox("Confirm", CommonMessages.Alert.ConfirmCancelAllergy, function (data) {
                        if (data && data.returnValue) {
                            $timeout(function () {
                                cancelCurrentAllergy();
                            }, 100, true);
                        }
                    });
                } else {
                    cancelCurrentAllergy();
                }
            }

            /**
            * @ngdoc function 
            * @name cancelCurrentAllergy
            * @methodOf roundingModule.controller:MedicationsController
            * @description 
            ** Cancels added allergy            
            ** Changes UI behaviour            
            */
            function cancelCurrentAllergy() {
                newAllergyModel(CommonConstants.DataState.Added, $rootScope.Global.Objects.SelectedPatient.UID);
                $scope.model.Filters.AddAllergyVisible = false;
                $scope.model.Filters.AddAllergyDisable = false;   
                $("#add-allergy-div").data("kendoValidator").hideMessages();
                CommonFunctions.ResetScroller("alrg-list-scrolls");
				CommonFunctions.UICanceled();
            }

            /**
            * @ngdoc event 
            * @name showFullMedication
            * @eventOf roundingModule.controller:MedicationsController
            * @param {object} dataItem item of $scope.model.Medications list
            * @description 
            ** ng-click event of showFullMedication div from medications view
            ** Show hide medication            
            ** Changes UI behaviour            
            */
            $scope.showFullMedication = function (dataItem) {
                //incase if you want to flip all opened one the uncomment below 2 lines
                //$(".med-details").parent().addClass('med-details-inactive').removeClass('med-details-active');                
                if ($("#med-details-" + dataItem.UID).is(":visible")) {
                    $("#med-details-" + dataItem.UID).hide();
                    $("#med-details-" + dataItem.UID).parent().addClass('med-details-inactive').removeClass('med-details-active');
                } else {
                    //$(".med-details").hide();
                    $("#med-details-" + dataItem.UID).show();
                    $("#med-details-" + dataItem.UID).parent().addClass('med-details-active').removeClass('med-details-inactive');
                }
            }

            /**
            * @ngdoc event 
            * @name onMedEditClick
            * @eventOf roundingModule.controller:MedicationsController
            * @param {object} dataItem item of $scope.model.Medications list
            * @description 
            ** k-on-tap event of Edit Entry from medications list view
            ** Prepares Comboboxes, LookUp Data etc and opens Add Medication ModalView  
            ** Calls MedicationsService.SetSelectedMedication
            */
            $scope.onMedEditClick = function (dataItem) {
                //set the selected medication in service after updating data item with lookups                           
                dataItem.IsAdd = false;
                dataItem.DataState = CommonConstants.DataState.Modified;
                if (dataItem.DrugID === 0) {
                    dataItem.ESA = true;
                    dataItem.SelectedDrug = CommonFunctions.Find(LookUp.GetLookupWithoutSelectValue(LookupTypes.ESADrugs), "Value", dataItem.DrugName);
                } else {
                    dataItem.ESA = false;
                    dataItem.SelectedDrug = [{ Description: dataItem.DrugName, ID: dataItem.DrugID }];
                }

                if (dataItem.IsActive) {
                    dataItem.MedicationStatus = CommonConstants.MedicationStatuses.ACTIVE;
                } else {
                    dataItem.MedicationStatus = CommonConstants.MedicationStatuses.DISCONTINUED;
                }
                /*
                if (CommonFunctions.IsNotNullOrEmpty(dataItem.FilledDate)) {
                    dataItem.FilledDate = new Date(dataItem.FilledDate);
                }
                if (CommonFunctions.IsNotNullOrEmpty(dataItem.DiscontinuedDate)) {
                    dataItem.DiscontinuedDate = new Date(dataItem.DiscontinuedDate);
                }
                if (CommonFunctions.IsNotNullOrEmpty(dataItem.WrittenDate)) {
                    dataItem.WrittenDate = new Date(dataItem.WrittenDate);
                }
                */

                dataItem.SelectedUnit = [];
                if (CommonFunctions.IsNotNullOrEmpty(dataItem.Unit)) {
                    dataItem.SelectedUnit = CommonFunctions.Find(LookUp.GetLookupWithoutSelectValue(LookupTypes.UnitOfMeasure), "Value", dataItem.Unit);
                }

                dataItem.SelectedFrequency = [];
                if (CommonFunctions.IsNotNullOrEmpty(dataItem.Frequency)) {
                    dataItem.SelectedFrequency = CommonFunctions.Find(LookUp.GetLookupWithoutSelectValue(LookupTypes.Frequency), "Value", dataItem.Frequency);
                }
                dataItem.SelectedRoute = [];
                if (CommonFunctions.IsNotNullOrEmpty(dataItem.Route)) {
                    dataItem.SelectedRoute = CommonFunctions.Find(LookUp.GetLookupWithoutSelectValue(LookupTypes.MedAdministrationRoute), "Value", dataItem.Route);
                }
                dataItem.SelectedState = [];
                if (CommonFunctions.IsNotNullOrEmpty(dataItem.State)) {
                    dataItem.SelectedState = CommonFunctions.Find(LookUp.GetLookupWithoutSelectValue(LookupTypes.State), "Value", dataItem.State);
                }
                dataItem.SelectedSource = []
                if (CommonFunctions.IsNotNullOrEmpty(dataItem.Source)) {
                    dataItem.SelectedSource = CommonFunctions.Find(LookUp.GetLookupWithoutSelectValue(LookupTypes.MedicationSource), "Value", dataItem.Source);
                }
                if (CommonFunctions.IsNotNullOrEmpty(dataItem.CreateDate)) {
                    dataItem.CreateDate = new Date(dataItem.CreateDate);
                }

                if (CommonFunctions.IsNotNullOrEmpty(dataItem.IndicationDescription)) {
                    dataItem.MapDiagnosisEnability = false;
                } else {
                    dataItem.MapDiagnosisEnability = true;
                }

                dataItem.SelectedIndication = [{ Description: dataItem.IndicationDescription, ID: dataItem.IndicationCode }];

                dataItem.SelectedSubstitute = [{ Description: dataItem.DrugSubsituteDescription, ID: dataItem.DrugSubsituteID }];
                
                MedicationsService.SetSelectedMedication(dataItem);
        
                $timeout(function () {
                    $("#add-meds-modalview").kendoMobileModalView("open");
                }, 0, false);

            }

            $scope.showMedications();
        })
        .controller('AllergyFilterController', function ($rootScope, $scope, MedicationsService)
            /**
             * @ngdoc controller
             * @name roundingModule.controller:AllergyFilterController
             * @description 
             ** Child controller of MedicationController
             ** Controller for Allergy Filter PopOver 
             
             * @property {object} $scope.model                            model of AllergyFilterController
             * @property {object} $scope.model.AllergyFilter              property of $scope.model used for listview           
             */ {
            $scope.model = {};
            $scope.model.AllergyFilter = MedicationsService.GetAllergyFilter();

            /**
            * @ngdoc event 
            * @name onAllergyFilterClick
            * @eventOf roundingModule.controller:AllergyFilterController
            * @description 
            ** ng-click event of Allergy Filter popover
            ** Closes PopOver  
            ** Calls MedicationsService.SetAllergyFilter to set filter
            */
            $scope.onAllergyFilterClick = function () {
                $("#popover-alrg-filter").data("kendoMobilePopOver").close();
                MedicationsService.SetAllergyFilter($scope.model.AllergyFilter);
            }
        }) //Controller for Medication Menu Popover
        .controller('MedicationMenuController', function ($rootScope, $scope, $timeout, MedicationsService, CommonFunctions, CommonConstants, CommonMessages)
            /**
            * @ngdoc controller
            * @name roundingModule.controller:MedicationMenuController
            * @description 
            ** Child controller of MedicationController
            ** Controller for Medication Menu PopOver 
                 
            * @property {object} $scope.model                            model of MedicationMenuController
            * @property {object} $scope.model.ScreeningDate              property of $scope.model used for screening date           
            */ {
            $scope.model = {};
            $scope.model.ScreeningDate = MedicationsService.GetScreeningDate();
            $scope.model.MedicationsList = MedicationsService.GetMedications();
            /**
            * @ngdoc event 
            * @name onMedsMenuClick
            * @eventOf roundingModule.controller:MedicationMenuController
            * @param {string} menu menu item
            * @description 
            ** ng-click event of meds menu
            ** Closes PopOver  
            ** Calls MedicationsService.SetScreeningDate
            ** Calls MedicationsService.GetActionItems
            ** Calls MedicationsService.SetSelectedMedication
            */
            $scope.onMedsMenuClick = function (menu) {
                try {
                    $("#popover-meds-menu").data("kendoMobilePopOver").close();

                    switch (menu) {
                        case "PerformScreening":
                            MedicationsService.PerformAggregateScreening($.param({ '': $rootScope.Global.Objects.SelectedPatient.UID }), function (res) {
                                if (res.data) {
                                    var curDate = new Date();
                                    var actionItemFilter = {
                                        StartDate: (new Date(curDate.setFullYear(curDate.getUTCFullYear() - 1))).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                                        DataFilter: [CommonConstants.ActionItemType.DIBAlerts],
                                        EndDate: (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                                        PtUID: $rootScope.Global.Objects.SelectedPatient.UID,
                                        CapellaUserUid: $rootScope.Global.Objects.CurrentUser.UID
                                    };
                                    MedicationsService.GetActionItems(actionItemFilter, MedicationsService.OnActionItemsRetrieved);

                                    $scope.model.ScreeningDate = "Last screened at: " + CommonFunctions.DateFunctions.TodayDateString("mm/dd/yy", true) // if second argument is true: hours and minute needed;
                                    MedicationsService.SetScreeningDate($scope.model.ScreeningDate);
                                } else {
                                    MedicationsService.SetScreeningDate("");
                                }
                            });
                            break;
                        case "AddMedicationReview":
                            $timeout(function () {
                                $("#meds-reviewdate-modalview").kendoMobileModalView("open");
                            }, 0, false);
                            break;
                        case "AddMedication":
                            var activeMedNotKnownFound = false;
                            if ($scope.model.MedicationsList && $scope.model.MedicationsList.data !== undefined && $scope.model.MedicationsList.data().length > 0) {
                                angular.forEach($scope.model.MedicationsList.data(), function (med) {
                                    if (med.MedicationStatus === "A" && med.DrugName === "UNKOWN") {
                                        activeMedNotKnownFound = true;
                                    }
                                });
                            }
                            if (activeMedNotKnownFound) {
                                CommonFunctions.OpenAlertBox('Alert', [{ message: CommonMessages.Alert.ActiveUnKnownMedRecord }], null);
                            } else {
                                //For Adding new Medication created new model and set in service to pass to Modal View
                                MedicationsService.SetSelectedMedication(MedicationsService.NewMedicationModel(CommonConstants.DataState.Added, true));
                                $timeout(function () {
                                    $("#add-meds-modalview").kendoMobileModalView("open");
                                }, 0, false);
                            }
                            break;
                        default:
                            break;
                    }
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Medications";
                    errExp.FunctionName = "onMedsMenuClick";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }
        })
        .controller('MedicationFilterController', function ($rootScope, $scope, MedicationsService)
            /**
            * @ngdoc controller
            * @name roundingModule.controller:MedicationFilterController
            * @description 
            ** Child controller of MedicationController
            ** Controller for Medication Filter PopOver 
                 
            * @property {object} $scope.model                            model of MedicationFilterController
            * @property {object} $scope.model.MedicationFilter           property of $scope.model used for medication filter           
            */ {
            $scope.model = {};
            $scope.model.MedicationFilter = MedicationsService.GetMedicationFilter();

            /**
            * @ngdoc event 
            * @name onMedicationFilterClick
            * @eventOf roundingModule.controller:MedicationFilterController
            * @description 
            ** ng-click event of Medication Filter popover
            ** Closes PopOver  
            ** Calls MedicationsService.SetMedicationFilter to set filter
            */
            $scope.onMedicationFilterClick = function () {
                $("#popover-med-filter").data("kendoMobilePopOver").close();
                MedicationsService.SetMedicationFilter($scope.model.MedicationFilter);
            }
        })
        .controller('MedsReviewDateController', function ($rootScope, $scope, MedicationsService, CommonFunctions, CommonConstants, CommonMessages, Status, ExceptionService)
            /**
            * @ngdoc controller
            * @name roundingModule.controller:MedsReviewDateController
            * @description 
            ** Child controller of MedicationController
            ** Controller for Medication Review Date Modal View 
                     
            * @property {object} $scope.model                       model of MedsReviewDateController
            * @property {date} $scope.model.MaxReviewDate           property of $scope.model used for max review date   
            * @property {date} $scope.model.MinReviewDate           property of $scope.model used for min review date           
            * @property {date} $scope.model.MedReviewDate           property of $scope.model used for meds review date           
            * @property {bool} $scope.model.PatientRefused          property of $scope.model used for patient refused flag filter           
            */ {
            $scope.model = {};
            $scope.model.MaxReviewDate = new Date();
            $scope.model.MaxReviewDate.setHours(23, 59, 59, 0);
            $scope.model.MinReviewDate = new Date();
            $scope.model.MinReviewDate.setDate($scope.model.MaxReviewDate.getDate() - 6);
            $scope.model.MinReviewDate.setHours(0, 0, 0, 0);
            $scope.model.MedReviewDate = "";
            $scope.model.PatientRefused = false;

            /**
            * @ngdoc event 
            * @name onCancelMedsReviewClick
            * @eventOf roundingModule.controller:MedsReviewDateController
            * @description 
            ** k-on-tap event of Cancel Button of MedsReview Modal View
            ** Closes modal view  
            */
            $scope.onCancelMedsReviewClick = function () {
                $("#meds-reviewdate-modalview").data("kendoValidator").hideMessages();
                $("#meds-review-calendar").data("kendoCalendar").value("");
                $scope.model.PatientRefused = false;
                $("#meds-reviewdate-modalview").data("kendoMobileModalView").close();
            }

            /**
            * @ngdoc event 
            * @name onCreateMedsReviewClick
            * @eventOf roundingModule.controller:MedsReviewDateController
            * @description 
            ** k-on-tap event of Save button of MedsReview modal view
            ** Saves medication review date
            ** Calls MedicationsService.GetIntMedicationSurvey
            ** Calls MedicationsService.SaveSurveyDetails
            ** Closes modal view  
            */
            $scope.onCreateMedsReviewClick = function () {
                try {
                    if ($scope.medsReviewDateValidator.validate()) {
                        if ($("#meds-review-calendar").data("kendoCalendar").value()) {
                            CommonFunctions.Blockui();

                            var survey = MedicationsService.GetIntMedicationSurvey();
                            $scope.model.MedReviewDate = (new Date($("#meds-review-calendar").data("kendoCalendar").value())).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false)

                            var responseQuestions = [];
                            if (!$scope.model.PatientRefused) {
                                //Answering first question
                                var question = survey.QuestionGroups[0].Questions[0];
                                responseQuestions.push({ QuestionUID: question.UID, Responses: [{ OptionUID: question.Options[0].UID, FreeFormResponse: "" }] });
                            }
                            var surveyResponse = {
                                RefusalReasonCode: $scope.model.PatientRefused ? CommonConstants.SurveyRefusalReasonCode.PatientRefused : "",
                                PatientUID: $rootScope.Global.Objects.SelectedPatient.UID,
                                SurveyTypeCode: survey.SurveyTypeCode,
                                SurveyUID: survey.SurveyUID,
                                ResponseQuestions: responseQuestions,
                                CompletedDate: (new Date()).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false),
                                SurveyStatus: "C",
                                StartDate: $scope.model.MedReviewDate
                            };

                            MedicationsService.SaveSurveyDetails(surveyResponse, function (result) {
                                if (result.resultstatus === Status.ServiceCallStatus.Success) {
                                    if (!$scope.model.PatientRefused) {
                                        if (MedicationsService.GetLastMedReviewDate() === "" || new Date($scope.model.MedReviewDate) > new Date(MedicationsService.GetLastMedReviewDate())) {
                                            MedicationsService.SetLastMedReviewDate($scope.model.MedReviewDate);
                                        }
                                    }

                                    $scope.onCancelMedsReviewClick();
                                    CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.MedReviewCreated);
                                } else {
                                    CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.MedReviewCreateFailed);
                                }
                            });
                        }
                    }
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Medications";
                    errExp.FunctionName = "onCreateMedsReviewClick(onSaveSurveyDetails)";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }
        })
        .controller('AddMedicationController', function ($rootScope, $scope, $timeout, MedicationsService, CommonConstants, CommonFunctions,
                                                         CommonMessages, LookUp, LookupTypes, Status)
            /**
            * @ngdoc controller
            * @name roundingModule.controller:AddMedicationController
            * @description 
            ** Child controller of MedicationController
            ** Controller for Medication Review Date Modal View 
                         
            * @property {object} $scope.model                                               model of AddMedicationController
            * @property {object} $scope.model.Medication                                    property of $scope.model used for medication   
            * @property {object} $scope.model.MedicationsList                               property of $scope.model used for Medications List   
            * @property {object} $scope.model.LabelNameListConfig                           property of $scope.model used for Label Names Autocompletebox          
            * @property {kendo.data.DataSource} $scope.model.ESADrugsList                   property of $scope.model used for ESA Drugs List from lookup           
            * @property {kendo.data.DataSource} $scope.model.UnitOfMeasureList              property of $scope.model used for Unit Of Measure List from lookup
            * @property {kendo.data.DataSource} $scope.model.FrequencyList                  property of $scope.model used for Frequency List from lookup           
            * @property {kendo.data.DataSource} $scope.model.MedAdministrationRouteList     property of $scope.model used for Med Administration List from lookup
            * @property {kendo.data.DataSource} $scope.model.MedicationSourceList           property of $scope.model used for Medication Source List from lookup           
            * @property {kendo.data.DataSource} $scope.model.Medication.SelectedSource      property of $scope.model.Medication used for Medication's SelectedSource
            * @property {kendo.data.DataSource} $scope.model.StateList                      property of $scope.model used for States List from lookup           
            * @property {object} $scope.model.MedConditionsListConfig                       property of $scope.model used for Med Conditions List from lookup
            * @property {object} $scope.model.SubstituteListConfig                          property of $scope.model used for Substitute List from lookup
            */ {
      
            $scope.model = {};

                    $scope.model.Medication = MedicationsService.GetSelectedMedication();

                    $scope.model.MedicationsList = MedicationsService.GetMedications();

                    //mask using jquery mask library
                    $(".masked-phone").mask("(999) 999-9999");
                    $(".masked-zip").mask("99999");

                    //k-options configs for autocomplete drop downs
                    $scope.model.LabelNameListConfig = {
                        filter: "contains",
                        minLength: "3",
                        dataTextField: "Description",
                        dataValueField: "ID",
                        dataSource: new kendo.data.DataSource({ data: [] })
                    };

                    $scope.model.ESADrugsList = CommonFunctions.Find(LookUp.GetLookupWithoutSelectValue(LookupTypes.ESADrugs), "IsShownUI", true);
                    $scope.model.UnitOfMeasureList = CommonFunctions.Find(LookUp.GetLookupWithoutSelectValue(LookupTypes.UnitOfMeasure), "IsShownUI", true);
                    $scope.model.FrequencyList = CommonFunctions.Find(LookUp.GetLookupWithoutSelectValue(LookupTypes.Frequency), "IsShownUI", true);
                    $scope.model.MedAdministrationRouteList = CommonFunctions.Find(LookUp.GetLookupWithoutSelectValue(LookupTypes.MedAdministrationRoute), "IsShownUI", true);
                    $scope.model.MedicationSourceList = CommonFunctions.Find(LookUp.GetLookupWithoutSelectValue(LookupTypes.MedicationSource), "IsShownUI", true);

                    $scope.model.Medication.SelectedSource = [];
                    $scope.model.Medication.SelectedSource = CommonFunctions.Find(LookUp.GetLookupWithoutSelectValue(LookupTypes.MedicationSource), "Value", CommonConstants.MedicationSource.PatientReported);

                    $scope.model.StateList = CommonFunctions.Find(LookUp.GetLookupWithoutSelectValue(LookupTypes.State), "IsShownUI", true);

                    $scope.model.MedConditionsListConfig = {
                        filter: "contains",
                        minLength: "3",
                        dataTextField: "Description",
                        dataValueField: "ID",
                        dataSource: new kendo.data.DataSource({ data: [] })
                    }

                    $scope.model.SubstituteListConfig = {
                        filter: "contains",
                        dataTextField: "Description",
                        dataValueField: "ID",
                        dataSource: new kendo.data.DataSource({ data: [] })
                    }
            
            /**
            * @ngdoc function 
            * @name addMedicationsValidator
            * @methodOf roundingModule.controller:AddMedicationController
            * @description 
            ** Creates custom validator using kendo validator  using diffrent business rules
            */
            /** #### Defect D-3176  **/
            $timeout(function () {    
                $scope.addMedicationsValidator = $("#add-meds-modalview").kendoValidator({
                
                    rules: {
                        nothidden: function (input) { //validation if not hidden and required
                            if ((input.is("[data-nothidden-msg]") && !input.is(":hidden"))) {
                                return $.trim(input.val()) !== "";
                            }
                            return true;
                        },
                        datevalid: function (input) {  //if input date is not valid
                            if ($.trim(input.val()) !== "") {
                                if (input.is("[data-datevalid-msg]")) {
                                    return kendo.parseDate($.trim(input.val()));
                                }
                            }
                            return true;
                        },
                        acvalid: function (input) { //if autocomplete value is not valid
                            if (input.is("[data-acvalid-msg]") && $.trim(input.val()) !== "") {

                                if (input.is("[name=aclabelName-esad]") || input.is("[name=aclabelName-gml]")) {
                                    if (CommonFunctions.IsNotNullOrEmpty($scope.model.Medication.SelectedDrug)) {
                                        if ($scope.model.Medication.SelectedDrug[0]) {
                                            return true;
                                        }
                                    }
                                }
                                else if (input.is("[name=acunit]")) {
                                    if (CommonFunctions.IsNotNullOrEmpty($scope.model.Medication.SelectedUnit)) {
                                        if ($scope.model.Medication.SelectedUnit[0]) {
                                            return true;
                                        }
                                    }
                                }
                                else if (input.is("[name=acfrequency]")) {
                                    if (CommonFunctions.IsNotNullOrEmpty($scope.model.Medication.SelectedFrequency)) {
                                        if ($scope.model.Medication.SelectedFrequency[0]) {
                                            return true;
                                        }
                                    }
                                }
                                else if (input.is("[name=acroute]")) {
                                    if (CommonFunctions.IsNotNullOrEmpty($scope.model.Medication.SelectedRoute)) {
                                        if ($scope.model.Medication.SelectedRoute[0]) {
                                            return true;
                                        }
                                    }
                                }
                                else if (input.is("[name=acsource]")) {
                                    if (CommonFunctions.IsNotNullOrEmpty($scope.model.Medication.SelectedSource)) {
                                        if ($scope.model.Medication.SelectedSource[0]) {
                                            return true;
                                        }
                                    }
                                }
                                else if (input.is("[name=acstate]")) {
                                    if (CommonFunctions.IsNotNullOrEmpty($scope.model.Medication.SelectedState)) {
                                        if ($scope.model.Medication.SelectedState[0]) {
                                            return true;
                                        }
                                    }
                                }
                                else if (input.is("[name=acindication]")) {
                                    if (CommonFunctions.IsNotNullOrEmpty($scope.model.Medication.SelectedIndication)) {
                                        if ($scope.model.Medication.SelectedIndication[0]) {
                                            return true;
                                        }
                                    }
                                }
                                else if (input.is("[name=acsubstitute]")) {
                                    if (CommonFunctions.IsNotNullOrEmpty($scope.model.Medication.SelectedSubstitute)) {
                                        if ($scope.model.Medication.SelectedSubstitute[0]) {
                                            return true;
                                        }
                                    }
                                }
                                return false;
                            }
                            return true;
                        },
                        disdate: function (datepicker) {  //if discontinue date is not selected with discontinue reason                                                
                            if (datepicker.is("[name=discontinueddate]")) {
                                if (CommonFunctions.IsNotNullOrEmpty($scope.model.Medication.DiscontinueReason)) {
                                    return $.trim(datepicker.val()) !== "";
                                }
                            }
                            return true;
                        },
                        disreason: function (input) {  //if discontinue reason is not entred with discontinue date                                                
                            if (input.is("[name=discontinuedreason]")) {
                                if (CommonFunctions.IsNotNullOrEmpty($scope.model.Medication.DiscontinuedDate)) {
                                    return $.trim(input.val()) !== "";
                                }
                            }
                            return true;
                        },
                        frequency: function (input) {
                            if (input.is("[name=acfrequency]")) {
                                if ($.trim(input.val()) === "" && CommonFunctions.IsNotNullOrEmpty($scope.model.Medication.SelectedDrug) &&
                                   $scope.model.Medication.SelectedDrug[0] && $scope.model.Medication.SelectedDrug[0].Value === "UNKOWN") {
                                    return true;
                                }

                                return $.trim(input.val()) !== "";
                            }
                            return true;
                        },
                        dose: function (input) {
                            if (input.is("[name=dose-numeric]")) {
                                if ($.trim(input.val()) === "" && CommonFunctions.IsNotNullOrEmpty($scope.model.Medication.SelectedDrug) &&
                                   $scope.model.Medication.SelectedDrug[0] && $scope.model.Medication.SelectedDrug[0].Value === "UNKOWN") {
                                    return true;
                                }
                                else if($.trim(input.val()) === "" && ($scope.model.Medication.ESA 
                                        || (CommonFunctions.IsNotNullOrEmpty($scope.model.Medication.SelectedFrequency) && $scope.model.Medication.SelectedFrequency[0] && $scope.model.Medication.SelectedFrequency[0].Value === CommonConstants.MedFrequencyConstants.SS)
                                        || (CommonFunctions.IsNotNullOrEmpty($scope.model.Medication.SelectedRoute) && $scope.model.Medication.SelectedRoute[0] && $scope.model.Medication.SelectedRoute[0].Value === CommonConstants.MedRouteConstants.Topical))){
                                   return true;
                                }

                                return $.trim(input.val()) !== "";
                            }
                            return true;
                        },
                        mapdiag: function (input) {  //if mapdiagnosis is not entered with Indication selected                                                     
                            if (input.is("[name=mapdiagnosis]")) {
                                if (CommonFunctions.IsNotNullOrEmpty($scope.model.Medication.SelectedIndication)) {
                                    if ($scope.model.Medication.SelectedIndication[0]) {
                                        return $.trim(input.val()) !== "";
                                    }
                                }
                            }
                            return true;
                        }
                    },
                    messages: {
                        //defined in html                    
                    }
                }).data("kendoValidator");
            }, 0, false);

            /**
            * @ngdoc event 
            * @name getLabelNameList
            * @eventOf roundingModule.controller:AddMedicationController
            * @param {object} e kendo event data
            * @description 
            ** ng-keyup event of LabelName autocompletebox            
            ** Calls MedicationsService.GetMedicationsList if search text is greater than 3
            ** Populates Label Name autocompletebox
            */
            $scope.getLabelNameList = function (e) {
                try {
                    var txt = e.originalEvent.srcElement.value;
                    if (txt) {
                        if (CommonFunctions.ShouldGetData(txt, e)) {
                            MedicationsService.GetMedicationsList({ searchText: txt }, function (result) {
                                if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                                    var ac = $("#aclabelName-gml").data("kendoAutoComplete");
                                    ac.setDataSource(result.data);
                                    ac.search(ac.value());
                                }
                            });
                        }
                    }
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Medications";
                    errExp.FunctionName = "getLabelNameList";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
            * @ngdoc event 
            * @name getMedConditions
            * @eventOf roundingModule.controller:AddMedicationController
            * @param {object} e kendo event data
            * @description 
            ** ng-keyup event of Indications autocompletebox            
            ** Calls MedicationsService.SearchMedicalConditions if search text is greater than 3
            ** Populates Indication autocompletebox
            */
            $scope.getMedConditions = function (e) {
                try {
                    var txt = e.originalEvent.srcElement.value;
                    if (txt) {
                        if (CommonFunctions.ShouldGetData(txt, e)) {
                            MedicationsService.SearchMedicalConditions($.param({ '': txt }), function (result) {
                                if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                                    var ac = $("#acindication").data("kendoAutoComplete");
                                    ac.setDataSource(result.data);
                                    ac.search(ac.value());
                                }
                            });
                        }
                    }
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Medications";
                    errExp.FunctionName = "getMedConditions";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
            * @ngdoc event 
            * @name getSubstitutesData
            * @eventOf roundingModule.controller:AddMedicationController
            * @param {object} e kendo event data
            * @description 
            ** ng-keyup event of Substitute autocompletebox            
            ** Calls MedicationsService.GetMedicationsList if search text is greater than 3
            ** Populates Substitute autocompletebox
            */
            $scope.getSubstitutesData = function (e) {
                try {
                    var txt = e.originalEvent.srcElement.value;
                    if (txt) {
                        if (CommonFunctions.ShouldGetData(txt, e)) {
                            MedicationsService.GetMedicationsList({ searchText: txt }, function (result) {
                                if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                                    var ac = $("#acsubstitute").data("kendoAutoComplete");
                                    ac.setDataSource(result.data);
                                    ac.search(ac.value());
                                }
                            });
                        }
                    }
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Medications";
                    errExp.FunctionName = "getSubstitutesData";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            //This is not used anymore
            $scope.esaChange = function (e) {
                $scope.model.Medication.SelectedDrug = null;
                $scope.model.LabelNameListConfig.dataSource.data([]);
                $scope.model.ESADrugsListConfig.dataSource.data([]);
            }

            /**
            * @ngdoc event 
            * @name indicationSelect
            * @eventOf roundingModule.controller:AddMedicationController
            * @param {object} e kendo event data
            * @description 
            ** k-on-change event of Substitute autocompletebox 
            ** Changes UI Behaviour
            */
            $scope.indicationSelect = function (e) {
                $timeout(function () {
                    if ($scope.model.Medication.SelectedIndication[0] && $scope.model.Medication.SelectedIndication[0].Description) {
                        $scope.model.Medication.MapDiagnosis = $scope.model.Medication.SelectedIndication[0].Description;
                        $scope.model.Medication.MapDiagnosisEnability = false;
                    } else {
                        $scope.model.Medication.MapDiagnosis = null;
                        $scope.model.Medication.MapDiagnosisEnability = true;
                    }
                }, 0, true);
            }

            /**
            * @ngdoc event 
            * @name onCancelAddMedsClick
            * @eventOf roundingModule.controller:AddMedicationController
            * @description 
            ** k-on-tap event of Cancel button of Add/Edit Medication modal view 
            ** Calls MedicationsService.NewMedicationModel
            ** Changes UI Behaviour
            */
            $scope.onCancelAddMedsClick = function () {
                $scope.model.Medication = MedicationsService.NewMedicationModel(CommonConstants.DataState.Added, true);
                $("#add-meds-modalview").data("kendoValidator").hideMessages();
                $("#add-meds-modalview").kendoMobileModalView("close");
            }

            /**
            * @ngdoc event 
            * @name onSaveAddMedsClick
            * @eventOf roundingModule.controller:AddMedicationController
            * @description 
            ** k-on-tap event of Save button of Add/Edit Medication modal view 
            ** Saves Medication
            ** Calls MedicationsService.SavePatientMedication
            ** Calls MedicationsService.RefreshMedications
            ** Changes UI Behaviour
            */
            $scope.onSaveAddMedsClick = function () {
                try {
                    if (checkForUnknownMedication()) {
                        CommonFunctions.OpenAlertBox('Alert', [{ message: CommonMessages.Alert.ActiveUnKnownMedRecord }], null);
                    }
                    else if (checkForActiveMedication()) {
                        CommonFunctions.OpenAlertBox('Alert', [{ message: CommonMessages.Alert.ActiveMedRecord }], null);
                    }
                    else {
                        if ($scope.addMedicationsValidator.validate()) {

                            var addMedsRequest = prepareSaveMedsRequest($scope.model.Medication);
                            CommonFunctions.Blockui();

                            MedicationsService.SavePatientMedication(addMedsRequest, function (result) {
                                if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
                                    $scope.onCancelAddMedsClick();
                                    CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.PtMedAdded);
                                    MedicationsService.RefreshMedications();
                                } else {
                                    CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.PtMedAddFailed);
                                }
                            });
                        }
                    }
                } catch (ex) {
                    var errExp = {};
                    errExp.Exception = ex;
                    errExp.ModuleName = "Medications";
                    errExp.FunctionName = "onSaveAddMedsClick";
                    errExp.StackTrace = printStackTrace({ e: ex });
                    ExceptionService.LogException(CommonFunctions.HandleException(errExp));
                }
            }

            /**
           * @ngdoc function 
           * @name checkForUnknownMedication
           * @methodOf roundingModule.controller:AddMedicationController
           * @param {object} meds medication model
           * @returns {object} returns boolean value if there is any active medication history not known
           * @description 
           ** check for active medication history not known
           */
            function checkForUnknownMedication() {
                var activeMedNotKnownFound = false;
                if ($scope.model.MedicationsList && $scope.model.Medication.DataState === CommonConstants.DataState.Added) {
                    if ($scope.model.MedicationsList.data !== undefined && $scope.model.MedicationsList.data().length > 0) {
                        angular.forEach($scope.model.MedicationsList.data(), function (med) {
                            if (med.MedicationStatus === "A" && med.DrugName === "UNKOWN") {
                                activeMedNotKnownFound = true;
                            }
                        });
                    }
                }
                return activeMedNotKnownFound;
            }

            /**
           * @ngdoc function 
           * @name checkForActiveMedication
           * @methodOf roundingModule.controller:AddMedicationController
           * @param {object} meds medication model
           * @returns {object} returns boolean value if there is any active medication present
           * @description 
           ** check for active medication
           */
            function checkForActiveMedication() {
                var activeMedFound = false;
                if ($scope.model.MedicationsList && $scope.model.Medication.DataState === CommonConstants.DataState.Added && $scope.model.Medication.ESA && CommonFunctions.IsNotNullOrEmpty($scope.model.Medication.SelectedDrug) &&
                               $scope.model.Medication.SelectedDrug[0] && $scope.model.Medication.SelectedDrug[0].Value === "UNKOWN") {
                    if ($scope.model.MedicationsList.data !== undefined && $scope.model.MedicationsList.data().length > 0) {
                        angular.forEach($scope.model.MedicationsList.data(), function (med) {
                            if (med.MedicationStatus === "A") {
                                activeMedFound = true;
                            }
                        });
                    }
                }
                return activeMedFound;
            }

            /**
            * @ngdoc function 
            * @name prepareSaveMedsRequest
            * @methodOf roundingModule.controller:AddMedicationController
            * @param {object} meds medication model
            * @returns {object} returns model for medication to pass on to service
            * @description 
            ** prepares medication model for save
            */
            function prepareSaveMedsRequest(meds) {
                var request = {
                    DataState: meds.DataState,
                    UID: meds.UID,
                    PatientUID: meds.PatientUID,
                    DrugName: meds.ESA ? meds.SelectedDrug[0].Value : meds.SelectedDrug[0].Description,
                    DrugID: meds.ESA ? 0 : meds.SelectedDrug[0].ID,
                    OrderNote: meds.OrderNote,
                    MedicationStatus: CommonFunctions.IsNotNullOrEmpty(meds.DiscontinuedDate) ? "D" : meds.MedicationStatus,
                    RxNumber: meds.RxNumber,
                    FilledDate: CommonFunctions.IsNotNullOrEmpty(meds.FilledDate) ? (new Date(meds.FilledDate)).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false) : meds.FilledDate,
                    DiscontinuedDate: CommonFunctions.IsNotNullOrEmpty(meds.DiscontinuedDate) ? (new Date(meds.DiscontinuedDate)).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false) : meds.DiscontinuedDate,
                    WrittenDate: CommonFunctions.IsNotNullOrEmpty(meds.WrittenDate) ? (new Date(meds.WrittenDate)).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false) : meds.WrittenDate,
                    Dose: meds.Dose,
                    Unit: CommonFunctions.IsNotNullOrEmpty(meds.SelectedUnit[0]) ? meds.SelectedUnit[0].Value : "",
                    Frequency: CommonFunctions.IsNotNullOrEmpty(meds.SelectedFrequency[0]) ? meds.SelectedFrequency[0].Value : "",
                    Route: CommonFunctions.IsNotNullOrEmpty(meds.SelectedRoute[0]) ? meds.SelectedRoute[0].Value : "",
                    PrescNPI: meds.PrescNPI,
                    RefillNumber: meds.RefillNumber,
                    Quantity: meds.Quantity,
                    DaysSupply: meds.DaysSupply,
                    MaxRefills: meds.MaxRefills,
                    PrescName: meds.PrescName,
                    PharmacyName: meds.PharmacyName,
                    Sequence: meds.Sequence,
                    IsActive: meds.IsActive,
                    DrugClass: meds.DrugClass,
                    City: meds.City,
                    State: CommonFunctions.IsNotNullOrEmpty(meds.SelectedState[0]) ? meds.SelectedState[0].Value : "",
                    ZipCode: meds.ZipCode,
                    Phone: meds.Phone,
                    IsIPE: meds.IsIPE,
                    Source: CommonFunctions.IsNotNullOrEmpty(meds.SelectedSource[0]) ? meds.SelectedSource[0].Value : "",
                    CreateDate: meds.CreateDate,
                    IndicationCode: CommonFunctions.IsNotNullOrEmpty(meds.SelectedIndication[0]) ? meds.SelectedIndication[0].ID : "",
                    IndicationDescription: CommonFunctions.IsNotNullOrEmpty(meds.SelectedIndication[0]) ? meds.SelectedIndication[0].Description : "",
                    MapDiagnosis: meds.MapDiagnosis,
                    MapDiagnosisEnability: meds.MapDiagnosisEnability,
                    DrugSubsituteID: CommonFunctions.IsNotNullOrEmpty(meds.SelectedSubstitute[0]) ? meds.SelectedSubstitute[0].ID : "",
                    DrugSubsituteDescription: CommonFunctions.IsNotNullOrEmpty(meds.SelectedSubstitute[0]) ? meds.SelectedSubstitute[0].Description : "",
                    DiscontinueReason: meds.DiscontinueReason
                }

                return request;
            }
        });
}());