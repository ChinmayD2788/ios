angular.module('roundingModule').constant('AppConstants',
{
    AppCode: {
        Rounding: 'CRD'
    },

    BundleID: {       
        DEV: 'com.DavitaVH.Rounding-DEV',
        SYS: 'com.DavitaVH.Rounding-SYS',
        DEV2: 'com.DavitaVH.Rounding-DEV2',
        SYS2: 'com.DavitaVH.Rounding-SYS2',
        TRAIN: 'com.DavitaVH.Rounding-TRAIN',
        STAGE: 'com.DavitaVH.Rounding-STAGE',
        STAGE2: 'com.DavitaVH.Rounding-STAGE2',
        PROD: 'com.DavitaVH.Rounding',
        //for testing and debugging purpose
        LOCAL: 'com.DavitaVH.Rounding-LOCAL'        
    },

    Env: {
        DEV: 'https://villagehealthmobiledev.com/crdapi/api/',
        SYS: 'https://villagehealthmobileqa.com/crdapi/api/',
        DEV2: 'https://villagehealthmobiledev.com/crdapi/api/',
        SYS2: 'https://villagehealthmobileqa.com/crdapi/api/',
        TRAIN: 'https://capellawebtrain.com/crdapi/api/',          
        STAGE: 'https://villagehealthmobilestage.com/crdapi/api/',  //new Stage Server
        STAGE2: 'https://villagehealthmobile.com/stagecrdapi/api/',    
        PROD: 'https://villagehealthmobile.com/crdapi/api/',
        //for testing and debugging purpose      
        LOCAL: 'http://localhost/crdangularapi/api/'
        //LOCAL: 'http ://localhost/old_cppapi/crdapi/api/'
    },

    BaseServiceUrl: {
        DEV: 'https://villagehealthmobiledev.com',
        SYS: 'https://villagehealthmobileqa.com',            
        TRAIN: 'https://capellawebtrain.com', 
        STAGE: 'https://villagehealthmobilestage.com',
        PROD: 'https://villagehealthmobile.com',
        //for testing and debugging purpose      
        LOCAL: 'http://localhost'
    },

    BaseApiFolder: {
        COMMON: '/crdapi/api/',   // Common for DEV, SYS and New Stage
        COMMON2: '/crdapi/api/', // Common for DEV2, SYS2
        TRAIN: '/crdapi/api/',   //new change for Train Server
        STAGE2: '/stagecrdapi/api/'  // Old Stage, Same on Production Server
    },

    EnvName: {
        DEV: 'DEV',
        SYS: 'SYS',
        TRAIN: 'TRAIN',
        STAGE: 'STAGE',
        PROD: 'Production',
        //for testing and debugging purpose
        LOCAL: 'Developer Machine'
    }           
});


angular.module('roundingModule').constant('RouteConstants',
{
        ADLScreening: 'views/AllScreenings.html',
        FallRiskAssessment: 'views/AllScreenings.html',
		ESCOFallRiskAssessment: 'views/AllScreenings.html',
		PainAssessment: 'views/AllScreenings.html',
		MOAPatientAssessment: 'views/PatientAssessment.html',
        HomeSafetyScreening: 'views/AllScreenings.html',
        MOAInfectionManagement: 'views/Pathways.html',
		Login: 'views/Login.html',
        AppUpgrade: 'install/AppUpgrade.html',
        MyPatients: 'views/MyPatients.html',
        PatientChart: 'views/PatientChart.html',
        Screenings: 'views/Screenings.html',
        Labs: 'views/Labs.html',        
        Story: 'views/Story.html',
        HospitalizationTab: 'views/HospitalizationTab.html',
        AccessInfo: 'views/AccessInfo.html',
        AccessTab: 'views/AccessTab.html',
        AllScreenings: 'views/AllScreenings.html',
        ContactRecap: 'views/ContactRecap.html',
        Contacts: 'views/Story.html',
        DemographicsPage: 'views/Demographics.html',
        PatientInfo: 'views/PatientInfo.html',
		ProviderInfo: 'views/ProviderInfo.html',
        DiabetesTab: 'views/DiabetesTab.html',
        DialysisCentersMapPage: 'views/DialysisCenterSelection.html',
        FluidManagementTab: 'views/FluidReviewTab.html',
        HospitalizationTab: 'views/HospitalizationTab.html',
        MedicationsTab: 'views/Medications.html',
        MyTasks: 'views/MyTasks.html',
        MyTasksCRD: 'views/MyTasks.html',
        PathwaysTab: 'views/PathwaysTab.html',
        PlacementOptionsReportView: 'views/PlacementOptionsReportView.html',
        PlacementPage: 'views/Placements.html',
        PlacementReportFaxPreview: 'views/ReportFaxPreview.html',
        Screenings: 'views/Screenings.html',
        ShiftNSchedule: 'views/ShiftNSchedule.html',
        VAP: 'views/Vap.html',
        DepressionScreeningTab: 'views/AllScreenings.html',
		CognitiveScreening: 'views/AllScreenings.html',
		PAMSurvey: 'views/AllScreenings.html',
		Comorbids: 'views/Comorbids.html',



        //RCM screens
        RCMDashboard: 'views/RCMDashboard.html',
        PatientDemographics: 'views/PatientDemographics.html',
        PatientAdmissionTab: 'views/HospitalizationTab.html',
        PatientPlacementTab: 'views/PatientPlacementTab.html',
        RCMAccessCareTab: 'views/PatientPathwaysTab.html',
        RCMDiabetesMgmtTab: 'views/PatientPathwaysTab.html',
        RCMDietTab: 'views/PatientPathwaysTab.html',
        RCMFluidMgmtTab: 'views/PatientPathwaysTab.html',
        RCMMedicationManagementTab: 'views/PatientPathwaysTab.html',
        RCMTreatmentRegimenTab: 'views/PatientPathwaysTab.html',

        //PartialViews
        PatientDetails: 'views/PatientDetails.html',
        Alerts: 'views/Alerts.html',
        OpenPatients: 'views/OpenPatients.html',
        Reload: 'views/Reload.html',

        //Patient Care Plan  
        ActiveCarePlans: 'views/ActiveCarePlans.html',
        PatientCare: 'views/PatientCarePlan.html',
        AddNewCarePlan: 'views/PathwaysTab.html',
        Goals: 'views/Goals.html'
});

angular.module('roundingModule').constant('LookupTypes',
{   
    AccessBodyPart: "AccessBodyPart",
    AccessInactiveReason: "AccessInactiveReason",
    AccessRegion: "AccessRegion",
    AccessSide: "AccessSide",
    AccessStatus: "AccessStatus",
    AccessTermReason: "AccessTermReason",
    AccessType: "AccessType",
    AdmitType: "AdmitType",
    AssociationType: "AssociationType",
    ContactLocation: "ContactLocation",
    ContactPreferenceDay: "ContactPreferenceDay",
    ContactPreferenceTime: "ContactPreferenceTime",
    ContactMethod: "ContactMethod",
    ContactReason: "ContactReason",
    Comorbid: "Comorbid",
	ComorbidDetail: "ComorbidDetail",
	ProviderType: "ProviderType",
	ComorbidGroup: "ComorbidGroup",
    DelayReason: "DelayReason",
    DiabeticScreening: "DiabeticScreening",
    DialysisCenter: "DialysisCenter",
    Direction: "Direction",
    DischargePlan: "DischargePlan",
    EngagementScale: "EngagementScale",
    ESADrugs: "ESADrugs",
    ExternalTeam: "ExternalTeam",
    EyeAnamolies: "EyeAnamolies",
    FollowupTasks: "FollowupTasks",
    FootDeformities: "FootDeformities",
    Frequency: "Frequency",
    GroupCode: "GroupCode",
    InternalTeam: "InternalTeam",
    LabType: "LabType",
    LastAccessReason: "LastAccessReason",
    MedAdministrationRoute: "MedAdministrationRoute",
    MedicationSource: "MedicationSource",
    MedicationStatus: "MedicationStatus",
    PtStatus: "PtStatus",
    PrimaryDx: "PrimaryDx",
    PrimaryDxSubCategory: "PrimaryDxSubCategory",
    ReadmitReason: "ReadmitReason",
    RefusalReason: "RefusalReason",
    RefusalReasonCode: "RefusalReasonCode",
    Resolution: "Resolution",
    Screen: "Screen",
    ScreeningDirection: "ScreeningDirection",
    ScreeningRefusalReason: "ScreeningRefusalReason",
    ScreeningResult: "ScreeningResult",
    Shift: "Shift",
    State: "State",
    StopReason: "StopReason",
    SurveyType: "SurveyType",
    TagGroup: "TagGroup",
    Tags: "Tags",
    TermDetail: "TermDetail",
    TermReason: "TermReason",
    UnitOfMeasure: "UnitOfMeasure",
    PlacementNotRequiredReason: "PlacementNotRequiredReason",
    ProviderDeclinedReason: "ProviderDeclinedReason",
    PtChoseFacilityReason: "PtChoseFacilityReason",
    PlacementDelayReason: "PlacementDelayReason",
    AddtoDictionary: "AddtoDictionary",
    ImmunizationType: 'ImmunizationType',
    ImmunizationBrandName: 'ImmunizationBrandName',
    ImmunizationReasonNotGiven: 'ImmunizationReasonNotGiven',
	RenalDiseaseCause: 'RenalDiseaseCause',
	HearingImpairment: 'HearingImpairment',
	VisionImpairment: 'VisionImpairment',
	Language: "Language",
	MaritalStatus: "MaritalStatus",
	Race: "Race",
	EthnicOrigin: "EthnicOrigin",
	PatientWorkStatus: "PatientWorkStatus",
	MemberIdModifier: "MemberIdModifier",
	MenuOfAction: "MenuOfAction",
	GoalStatus: "GoalStatus",
	GoalImportanceLevel: "GoalImportanceLevel",
	GoalConfidenceLevel: "GoalConfidenceLevel",
	SensoryFootExamResult: "SensoryFootExamResult",
    PulseFootExamResult: "PulseFootExamResult"

});

angular.module('roundingModule').constant('ServiceConstants',
{
    //Worklist
    GetWorkList: 'worklist/getworklist',

    //Placements
    GetPlacements: 'Placements/GetPlacements',
    GetPlacementDetailsForCriterion: 'Placements/GetPlacementDetailsForCriterion',
    GetPlacementsProvider: 'Placements/GetPlacementsProvider',
    SavePlacementDetails: 'Placements/SavePlacementsDetail',
    SavePlacementsSelection: 'Placements/SavePlacementsSelection',
    SavePlacements: 'Placements/SavePlacements',
    SendFaxAndUpdatePlacementStatus: 'Placements/SendFaxAndUpdatePlacementStatus',
    SavePlacementsAndReturnReport: 'Placements/SavePlacementsAndReturnReport',

    //Demographics
    GetPatientDetails: 'Demographics/GetPatientDetails',
    AddPatientDetails: 'Demographics/AddPatientDetails',

    //Utility
    GetLookupData: 'Utility/GetLookupData',

    GetParentChildLookup: 'Utility/GetParentChildLookup',
    ProcessFaxRequest: 'Utility/ProcessFaxRequest',

    //AddPtContacts: 'Utility/AddPtContacts',
    LogError: 'Utility/LogError',
    GetMenus: 'Utility/GetMenus',
    GetMoa: 'Utility/GetMoa',
    GetDataValRanges: 'Utility/GetDataValRanges',

    //Reports
    GetClinicalReport: 'Reports/GetClinicalReport',
    GetPlacementOptionsReport: 'Reports/GetPlacementOptionsReport',
    GetReportUrl: "Reports/GetReport?reportType=",
    GetReportDocument: 'Reports/GetReportDocument',

    //Account
    Logout: 'Account/Logout',
    SessionMakeAlive: 'Account/SessionMakeAlive',
    GetModifiedLookupTypes: 'Account/GetModifiedLookupTypes',
    GetToken: 'Account/GetToken',

    //Pathways
    GetSurveyDetails: 'Pathways/GetSurveyDetails',
    GetPatientSurveyDetails: 'Pathways/GetPatientSurveyDetails',
    SaveSurveyDetails: 'Pathways/SaveSurveyDetails',

    //Contacts
    GetPreSaveContacts: 'Contacts/GetPreSaveContacts',
    AddPreSaveContact: 'Contacts/AddPreSaveContact',
    AddPtContacts: 'Contacts/AddPtContacts',

    //Config - Unauthenticated calls
    GetClientVersionSupportDetails: 'Account/GetClientVersionSupportDetails',
    GetClientConfig: 'Account/GetClientConfig',  

    //User Controller
    GetPatients: 'User/GetPatients',
    GetActionItems: 'User/GetActionItems',
    SearchPatient: 'User/SearchPatient',
    GetTeamUsers: 'User/GetTeamUsers',
    SaveTaskDelegation: 'User/SaveTaskDelegation',
    GetSnippets: 'User/GetSnippets',
    SaveSnippets: 'User/SaveSnippets',

    //Patient Controller
    UpdateAlert: 'Patient/UpdateAlert',
    GetPtContacts: 'Patient/GetPtContacts',
    GetPtClinicalMetric: 'Patient/GetPtClinicalMetric',
    GetPathwayHeaderData: 'Patient/GetPathwayHeaderData',
    GetPatientSchedule: 'Patient/GetPatientSchedule',
    SavePatientSchedule: 'Patient/SavePatientSchedule',
    GetPrePopulatedResponse: 'Patient/GetPrePopulatedResponse',
	GetProviderAssociationsWithHistory: 'Patient/GetProviderAssociationsWithHistory',
	GetProviderAssociations: 'Patient/GetProviderAssociations',
	SaveProviderAssociations: 'Patient/SaveProviderAssociations',
	WebPathwayGet: 'Patient/WebPathwayGet',
	GetPatientIPECaregiver: 'Patient/GetPatientIPECaregiver',
    AddTask: 'Patient/AddTask',
    UpdateTask: 'Patient/UpdateTask',
    AddPtDiabScreening: 'Patient/AddPtDiabScreening',
    AddPatientSurvey: 'Patient/AddPatientSurvey',
    AddPtImmunization: 'Patient/AddPtImmunization',
    GetSurveyHeaderData: 'Patient/GetSurveyHeaderData',
    GetPatientImmunization: 'Patient/GetPatientImmunization',
    GetClinicalRelevance:'Patient/GetClinicalRelevancForTopic',

    //Clinical Controller
    GetPatientAllergies: 'Clinical/GetPatientAllergies',
    GetPatientMedication: 'Clinical/GetPatientMedication',
	GetPatientComorbids: 'Clinical/GetPatientComorbids',
	SavePtComorbids: 'Clinical/SavePtComorbids',
	GetPatientAssessment: 'Clinical/GetPatientIPE',
	UpdatePatientAssessment: 'Clinical/UpdatePatientIPE',
	AddPatientAssessment: 'Clinical/AddPatientIPE',
    GetMedReviewDate: 'Clinical/GetMedReviewDate',
    SavePatientAllergy: 'Clinical/SavePatienttAllergy',
    GetPtHospitalization: 'Clinical/GetPtHospitalization',
    GetFluidData: 'Clinical/GetFluidData',
    SavePatientMedication: 'Clinical/SavePatientMedication',
    GetPatientAccessMgmt: 'Clinical/GetPatienttAccessMgmt',
    SavePatientAccessMgmt: 'Clinical/SavePatientAccessMgmt',
    GetPatientVascularAccessPlan: 'Clinical/GetPatientVascularAccessPlan',
    SavePatientVascularAccess: 'Clinical/SavePatientVascularAccess',
    GetVapStepDetails: 'Clinical/GetVapStepDetails',
    GetPtLabs: 'Clinical/GetPtLab',
    GetStory: 'Clinical/GetStory',
   
    //DIB Controller
    GetAllergyList: 'DIB/GetAllergyList',
    GetMedList: 'DIB/GetMedList',
    SearchMedicalConditions: 'DIB/SearchMedicalConditions',
    PerformAggregateScreening: 'DIB/PerformAggregateScreening',

    //Patient Care Plan
    GetPatientGoals: 'Patient/GetPatientGoals',
    AddPatientGoal: 'Patient/AddPatientGoal',
    UpdatePatientGoal: 'Patient/UpdatePtGoal',

    //Comorbid
    GetComorbidReviews: 'Patient/GetComorbidReviews',
    AddPatientSurvey: 'Patient/AddPatientSurvey'
});



angular.module('roundingModule').constant('Status',
{
    ServerResultStatus: {
        Unknown: 0,
        Processing: 1,
        Success: 2,
        Failure: 3
    },

    ServiceCallStatus: {
        Success: 'Success',
        Error: 'Error'
    },

    AccessStatus: {
        Active: "A",
        InActive: "I",
        Termed: "T"
    }
});

angular.module('roundingModule').constant('ResponseHeader',
{    
    SECURE_TOKEN: "securetoken",
    USERID: "userid",
    TOKEN_EXPIRATION_EPOCH: "tokenexpirationepoch",
    USER_FIRSTNAME: "userfirstname",
    USER_LASTNAME: "userlastname",
    USER_FULLNAME: "userfullname",
    USER_ROLE: "userrole",
    ERROR_MESSAGE: "errormessage"    
});

angular.module('roundingModule').constant('LabType',
{
    Height: "Height",
    Weight: "Weight",
    TargetDryWeight: "TargetDryWeight",    
    Phosphorous: "Phosphorous",
    Creatinine: "Creatinine",
    GFR: "GFR",
    HgbA1C: "HgbA1C",
    LDL: "LDL",
    Hgb: "Hgb",
    Albumin: "Albumin",
    UrineAlbuminCreatinineRatio: "UrineAlbuminCreatinineRatio",
    DipstickForProtein: "DipstickForProtein",
    Co2Level: "Co2Level",
    Calcium: "Calcium",
    KTV: "KTV",
    URR: "URR",
    Potassium: "Potassium",
    PTH: "PTH",
    Hepatitisbtiter: "Hepatitisbtiter",
    Ferritin: "Ferritin",
    TSAT: "TSAT",
    BPSys: "BPSys",
    BPDia: "BPDia"
});

angular.module('roundingModule').constant('CommonMessages',
{
    Alert: {
        LoginFailedUnKnownReasonText: "Login failed. Please try again later.",
        LoginUnsavedPatientContactsText: "Unsaved patient contacts from your last session have been retrieved and loaded. Please review and save these contacts before logging out.",
        TheMaximumNumberPatientRecordsOpenWarning: "You met the maximum number of patient records open. Please close a patient and try again.",
		ChoseDialysisCenter: "Are you sure you want to chose this Dialysis center? This operation can not be undone.",
        LogoutConfirmation: "Are you sure you want logout from Rounding?",
		DeleteProviderConfirmation: "Are you sure you want to delete this Provider record?",
        LogoutConfirmationWarning: "You have unsaved contact notes, are you sure you want to logout?",
        ConfirmOnNavigateAway: 'You have entered new data on this page.' +
            ' If you navigate away from this page without first saving your data,' +
            ' the changes will be lost. ' +
            ' "OK" to navigate, "Cancel" to stop navigation',
        ChangesLost: 'Your current changes will be lost. Do you want to continue?',
        DeactivateComorbid: 'Are you sure you want to deactivate this Comorbid?',
		DeleteProviderRecord: "Are you sure you want to delete this Provider record?",
        ConfirmMessage: "Confirm",
		DeleteProviderConfirmTitle: "Delete Provider",
        ConfirmClosePatient: "Close Patient Record?",
        WaitErrorMessage: "Something went wrong OR report is not yet generated on the server, Please try again and wait until report is shown on the screen before sending fax.",
        FinalizePatient: "Are you sure you want to finalize this patient ?",
        DeleteContact: "Are you sure you want to delete this contact? \nNote: by deleting contact for this patient, patient record will also be closed.",
        SendFaxConfirmation: "would you like to send fax?",
        BingMapService: "BingMap search problem, please enter full address",
        DialysisCenterSelection: "Only 2 selections are allowed.",
        UnhandledErrorMessage: "Application Error. Please try again and if it persists open a service now ticket.",
        NoNetworkErrorMessage: "No network connection detected. Please retry when you establish connectivity.",
        SessionTimedOutMessage: "Your session has timed out. Please login again.",
        MapSearchProblem: "Please enter full address",
        PlcmtRecentSearch: "No recent search available!",
        PlcmtReason: "Please select an option to save!",
        PlcmtFacilityMsg: "Please enter valid Facility Approved Patient Date",
        PlcmtTransientMsg: "Transient start date and Transient End date should not be less than approved date",
        PlcmtTransientValidMsg: "Please enter valid Transient End Date greater than Transient Start Date",
        PlcmtTransientApproveMsg: "Please enter valid Transient End Date and Start Date greater than or equal to patient approve date",
        PatientTermed: "This Operation is not allowed on Termed patients",
        NonPRODAlert: "You are working on Non-Production Environment. \nClick 'Ok' to confirm or Exit app if you have opened it by error.",
        MaxNumberOfPatientMessage: "You have met the maximum number of patient records open, Please close a patient record and try again.",        
        PatientAlertAcknowledge: "Are you sure you want to acknowledge this alert ?",
        ConfirmDeleteAllergy: "Are you sure you want to delete allergy ?",
        ConfirmCancelAllergy: "Your current changes will be lost.",
        MedReviewDateValidation: "Please select medication review date from the calendar.",
        Alert: "Alert",
        ScreeningDateInValid: "There is already one screening saved on the same day. Please select another date to save.",
        FinalizeContact: "Contacts marked for deletion(if any) shall not be saved. \nBy finalizing the contacts for this patient, the patient record will also be closed. \nAre you sure you want to proceed?",
        LocalStorageError: "Your browser does not support localStorage. Check with admin.",
        AtleastOneTagRequired: "Please select atleast one Tag",
        AnswerAllQuestions : "Please answer all questions",
		AssessmentDateAlert: "Assessment Date should be within past 7 days from today's date",
        ActiveMedRecord: "There is an ACTIVE medication available, you can not add medication record of 'Medication History Not Known'",
        ActiveUnKnownMedRecord: "There is an ACTIVE record of 'Medication History Not Known', you can not add a new medication without discontinuing 'Medication History Not Known'",
        EscoPatientExemptMessage: "ESCO Patients are only exempt from Depression Screening if an active comorbid of Major/Clinical depression, Dysthymia/Persistent Depressive Disorder or Bi-Polar Disorder exists. Please update Comorbids if appropriate",
        ImmunizationSameDateInvalid:"You can not Add Same Immunization on Same Day.",
        AssessmentDateBlankAlert: "Assessment Date cannot be a blank",
        DeleteCaregiverConfirmation: "Are you sure you want to delete the Caregiver Record?",
        GoalStatusInProgressOrNotStarted: "Goal Status should be In Progress OR Not Started",
        NoChangesFound: "No Changes Found",
        AbnormalitiesRequired: "Please select a value for abnormalities."
    },
    NoDataAvailable: "No Data Available",
	
    BusyMessages: {
        LoginBusyMessage: "Authenticating...",
        LoadingMyPatients: "Loading Patients...",
        LoadingWorklist: "Loading Worklist...",
        LoadingLabs: "Loading Labs...",
        LoadingStory: "Loading Stories...",
        LoadingMedications: "Loading Medications...",
        LoadingHospitalization: "Loading Hospitalization...",
        LoadingTasks: "Loading Tasks...",
        LoadingOtherScreenings: "Loading Other Screenings...",
        LoadingFluidData: "Loading Fluid Data...",
        LoadingPtDetails: "Loading Patient Info...",
        LogoutMessage: "You have successfully logged out of Capella Mobile...",
        NetworkUnavailableMsg: "The network is unavailable. Please check your connection and login again...",
        PlacementSearchSavedMessage: "Search saved successfully...",
        PlacementSelectedMessage: "Placement selected succcessfully...",
        PlacementApproveSaved: "Placement approved succcessfully...",
        PlacementDeclineSaved: "Placement declined succcessfully...",
        PlacementRejectSaved: "Placement rejected succcessfully...",
        PlacementReasonSaved: "Placement reason saved succcessfully...",
        PlacementFaxSent: "Placement fax sent successfully...",
        PathwaySaved: "Pathway saved successfully...",
        ScreeningSaved: "Screening saved successfully...",
        AllergyDeleted: "Allergy deleted successfully...",
        AllergyDeleteFailed: "Delete allergy failed...",
        AllergySaved: "Allergy saved successfully...",
        AllergySaveFailed: "Save allergy failed...",
        MedReviewCreated: "Medication review created successfully...",
        MedReviewCreateFailed: "Add Medication review failed...",
        PtMedAdded: "Patient Medication saved successfully...",
        PtMedAddFailed: "Add medication failed...",
        ScreeningSaved: "Screening saved successfully...",
        AccessInfoSaved: "Access saved successfully...",
        AccessInfoFailed: "Save access failed...",
        NewTaskAdded: "Task has been created successfully...",
        NewTaskAddingFailed: "Adding Task failed...",
        TaskCompleted: "The task has been marked as complete.",
        TaskCompletedFailed: "Completing Task failed...",
        TaskDelegated: "Task has been delegated successfully...",
        TaskUnDelegated: "Task has been undelegated successfully...",
        StepSaved: "Step saved successfully...",
        StepFailed: "Save step failed...",
        PlanCreated: "Plan created successfully...",
        PlanCreateFailed: "Plan create failed...",
        PlanStopped: "Plan stopped successfully...",
        PlanStopFailed: "Plan stop failed...",
        PostPoneContact: "Contact has been postponed successfully...",
        SaveContactFor: "Saving Contact for ",
        OpenPatientRecord: "Opening Patient Record For ",
        SavingDemographics: "Saving Demographics...",
        SavingImmunization:"Saving Immunization....",
        Updating: "Updating...",
        DemographicsSaved: "Patient Demographics updated successfully...",
        CareGiverScreeningSaved: "Caregiver information is saved successfully...",
        CareGiverScreeningDeleted: "Caregiver information is deleted successfully...",
        PatientScreeningSaved: "Patient Assessment has been saved successfully...",
        SavingCarePlan: "Saving Care Plan....",
        CarePlanSaved: "Care Plan saved successfully...",
        ComorbidReviewCreated: "Comorbid review created successfully...",
        ComorbidReviewCreateFailed: "Add Comorbid review failed...",
        ComorbidSaved: "Comorbid saved successfully...",
        LoadingComorbids: "Loading Comorbids...",
        CarePlanUpdateSaved: "Care Plan updated successfully...",
        CarePlanUpdateFailed: "Care Plan updated failed...",
        CarePlanFailed: "Care Plan failed..."
    }
});

angular.module('roundingModule').constant('MyPatientsConstants',
{
    MyPatientTexts : {
        AllPatients : "ALL PATIENTS"
    },

    EligibilityStatus : {
        Assessed: "AS",
        Enrolled: "ENR",
        Engaged: "ENG",
        Managed: "MG"
    },

    Shift : {
        Shift1st: "1",
        Shift2nd: "2",
        Shift3rd: "3",
        Shift4th: "4",
        Shift5th: "5",
        CenterNocturnal: "C",
        HomeHemo: "H",
        HomePD: "P"
    },
    
    Sig : {
        High: "H",
        Medium: "M",
        Low: "L"
    },
	
    FilterLabel:{
        High: "High",
        Medium: "Medium",
        Low:"Low",
        Shift1st: "1st",
        Shift2nd: "2nd",
        Shift3rd: "3rd",
        Shift4th: "4th",
        Shift5th: "5th",
        CenterNocturnal: "Center Nocturnal",
        HomeHemo: "Home Hemo",
        HomePD: "Home PD"
    },

	Filters : {
        Enrolled : "Enrolled",
        Engaged  : "Engaged",
        Assessed : "Assessed",
        Transferred: "Transferred",
        Managed: "Managed",
        Readmit: "Readmit",
        MVP: "MVP",
        SigHigh : "Sig-High",   
        SigMedium : "Sig-Medium",
        SigLow:"Sig-Low", 
        One:"1",
        Two:"2",
        Three:"3",
        Four:"4",
        Five:"5",
        C:"C",
        H:"H",
        P:"P",
        Sun:"sun",
        Mon:"mon",
        Tue:"tue",
        Wed:"wed",
        Thu:"thu",
        Fri: "fri",
        Sat: "sat"
    },

    Schedule:{
        SchedIsMon:"SchedIsMon",
        SchedIsTue:"SchedIsTue", 
        SchedIsWed:"SchedIsWed", 
        SchedIsThu:"SchedIsThu", 
        SchedIsFri:"SchedIsFri",
        SchedIsSat:"SchedIsSat",
        SchedIsSun:"SchedIsSun"
    },

    Sortorder:{
        Sig:"sig",
        Shift:"shift",
        Schedule:"schedule",
        LastName:"lastname",
        DialysisCenter:"dialysiscenter"
    }
        
});

angular.module('roundingModule').constant('RCMDashboardConstants',
{
    RCMDashboardFilter:{
        AllMyPatients:"AllMyPatients",
        NewAdmits: "NewAdmits",
        ReadmitHigh: "ReadmitHigh",
        ReadmitMed: "ReadmitMed",
        ReadmitLow: "ReadmitLow",
        NewPlacements: "NewPlacements",
        ActiveCVC: "ActiveCVC",
        RecentlyDischarged: "RecentlyDischarged"
    },

    RCMDashboardSortTypeText: { 
        PatientNameText: "Patient Name",
        PatientTypeText: "Patient Type (Admit)",
        AdmitDateText: "Admit Date",
        DischargeDateText: "Discharge Date",
        UnitText: "Unit",
        RoomNumberText: "Room Number",
        HospitalText: "Hospital"
        }

//    RCMDashboardSortTypes: [{ "Text": "Patient Name", "Dir": "asc", "Value": "LastName" }, 
//                                     { "Text": "Patient Type (Admit)", "Dir": "asc", "Value": "PatientAdmitType" },                                       
//                                     { "Text": "Admit Date", "Dir": "asc", "Value": "AdmitDate" }, 
//                                     { "Text": "Discharge Date", "Dir": "asc", "Value": "DischargeDate" }, 
//                                     { "Text": "Unit", "Dir": "asc", "Value": "Unit" }, 
//                                     { "Text": "Room Number", "Dir": "asc", "Value": "RoomNumber" }, 
//                                     { "Text": "Hospital", "Dir": "asc", "Value": "Facility"} ]

});


angular.module('roundingModule').constant('ScreenConstants',
{
        MyTasks: "MyTasks",
        MyPatients: "MyPatients",
        DepressionScreening: "DepressionScreening",
        HomeSafetyScreening: "HomeSafetyScreening",
        CognitiveScreening: "CognitiveScreening",
        AdvanceCarePlanning: "Advance Care Planning",
        MemberInfo: "MemberInfo",
        Medications: "Medications",
        Hospitalizations: "Hospitalizations",
        Labs: "Labs",
        Story: "Story",
        HospitalizationTab: "HospitalizationTab",
        Access: "Access",
        None: "None",
        PatientInfo: "PatientInfo",
		ProviderInfo: "ProviderInfo",
        FluidManagement: "FluidManagement",
        ADLScreening: "ADLScreening",
        MOAAccess: "MOAAccess",
        MOADepression: "MOADepression",
        MOADiabetes: "MOADiabetes",
        MOAInfectionManagement: "MOAInfectionManagement",
        MOAHealthMaintenance: "MOAHealthMaintenance",
        MOAHospitalization: "MOAHospitalization",
        MOAMedication: "MOAMedication",
        MOAFluidManagement: "MOAFluidManagement",
        MOAACP: "MOAACP",
        Screenings: "Screenings",
        PathwaysTab: "PathwaysTab",
        AccessTab: "AccessTab",
        ShiftNSchedule: "ShiftNSchedule",
        AccessInfo: "AccessInfo",
        VAP: "VAP",
        DiabetesTab: "DiabetesTab",
        FluidManagementTab: "FluidManagementTab",
        HospitalizationTab: "HospitalizationTab",
        MedicationsTab: "MedicationsTab",
        DepressionScreeningTab: "DepressionScreeningTab",
        FallRiskAssessment: "FallRiskAssessment",
		ESCOFallRiskAssessment: "ESCOFallRiskAssessment",
        PainAssessment: "PainAssessment",
		PatientAssessment: "PatientAssessment",
        MOAInfectionManagement: "MOAInfectionManagement",
        PathwayScreening: "PathwayScreening",
        RCMDashboard: "RCMDashboard",
        ESRDTreatmentOptions: "ESRDTreatmentOptions",
        CaregiverAssessment: "CaregiverAssessment",
        NutritionPathway: "NutritionPathway",
		TransplantPathway: "TransplantPathway",
		MOATransplant: "MOATransplant",
		SmokingCessation: "SmokingCessation",
		PAMSurvey: "PAMSurvey",
		CognitiveScreening: "CognitiveScreening",
		MOAImmunizations: 'MOAImmunizations',
		ImmunizationsTab: 'ImmunizationsTab',
		PatientCarePlan: "PatientCarePlan",
		Comorbids: "Comorbids",        
        CarePlanGoal: "CAREPLANGOAL"
});

angular.module('roundingModule').constant('TabTextConstants',
{
        ShiftNSchedule: "Dialysis Shift and Schedule",
        AccessInfo: "Access Information",
        Vap: "Vascular Access Plan"
});

angular.module('roundingModule').constant('CommonConstants',
{
    TextColor: 
    {
        Red: "Red",
        Green: "Green",
        Yellow: "Yellow",
        Orange: "Orange",
        None: "None"
    },

    LabHistoryColor: {
        Red: "#DC6060",
        Gray: "#565656",
        Green: "#92DDB6"
    },

    MenuMetricItemsColor : {
        Red: "#DC6060",
        Green: "#3D9C3D",
        Orange: "Orange"
    },

    ActionItemType : {
        Tasks: "Tasks",
        Alerts: "Alerts",
        Scorecard: "Scorecard",
        Pathway: "Pathway",
        DevicesAlerts: "DevicesAlerts",
        DevicesTasks: "DevicesTasks",
        DIBAlerts: "DIBAlerts"
    },

    ContactMethod :  {
        PHONE: "P",
        BROWSING: "I",
        IN_PERSON: "IP",
        EMAIL: "E",
        FAX: "F",
        MAIL: "M"
    },
	
	Gender: [
		{Value: "", Text: ""},
		{Value: "M", Text: "Male"},
		{Value: "F", Text: "Female"},
		{Value: "N", Text: "Not Applicable"}
],

    DataState : {
        Added: "Added",
        Modified: "Modified",
        Unchanged: "Unchanged",
        Deleted: "Deleted"
    },
    DataStateEnum : {
        UnChanged: 0,
        Added: 1,
        Modified: 2,
        Deleted: 3,
        Detached: 4
    },
    StatusCode : {
        Completed: "Completed",
        New: "New",
        Pending: "Pending"
    },
    MedicationStatuses: {
        ACTIVE: "A",
        DISCONTINUED: "D"
    },
    MedicationSource: {
        PatientReported: "PT"
    },
    SurveyRefusalReasonCode: {
        PatientRefused: "PatientRefused",
        CaregiverSurveyRequired: "CaregiverSurveyRequired",
        PatientExempt: "PatientExempt",
        PatientMedicallyUnableToComplete:"PatientMedicallyUnableToComplete"
    }, 
	ICDTypes: {
		SELECT_A_VALUE: "Select a value",
		ICD9: "ICD9",
		ICD10: "ICD10"
	},
   	
    AccessStatus: {
        Active: "Active",
        Termed: "Termed",
        InActive: "InActive"
    },
    AccessPlan: {
       CVC1: "CVC1"
    },
    AccessType: {
       Catheter: "Catheter"
    },
    StepCode: {
        PatientAcceptance: "PatientAcceptance",
        SurgicalStepCodes: ["SurgicalProcedure", "SurgicalProcedure2", "SurgicalProcedure3"],
        Stepcodes: ["VesselMapping", "SurgicalEvaluation", "SurgicalProcedure", "SurgicalProcedure2",
                "SurgicalProcedure3", "EvaluationForMaturation", "EvaluationForMaturation2", "EvaluationForMaturation3",
                "FirstCannulation", "FirstCannulation3", "CVCOut"]
    },
    CircleImage: {
        Red: "crd-circle-red",
        Green: "crd-circle-green",
        Yellow: "crd-circle-yellow",
        Orange: "crd-circle-orange",
        Blue: "crd-circle-blue"
    },
    ReportConstants: {
        ClinicalReport: "RCMClinicalReport",
        QAReport: "RCMQAReport",
        SBARReport: "SBARReport"
    },
    MedRouteConstants: {
       Topical: "TP"
    },
    MedFrequencyConstants: {
        SS: "SS"
    },
    AdmitStatus: {
        Yes: "Y"
    },
    IsShownUI: "IsShownUI",
    Nutrition: "Nutrition",
    GoalStatusCode : {
        Met: "M",
        Unmet: "U",
        Inprogress: "I",
        PartiallyMet: "P",
        Cancelled: "A",
        NotStarted: "N"
    },
    ClinicalRelevanceType : {
        CLI: 0,
        SC: 1
    },
    ComorbidTypes: {
        CKD: "CKD",
        ESRD: "ESRD",
        TRANS: "TRANS",
        DT1: "DT1",
        DT2: "DT2",
        BMT: "BMT"
    }
});

angular.module('roundingModule').constant('StorageConstants',
{
    StorageType: "Lookup",
    LastUpdatedDate: "LastUpdatedDate"
});

angular.module('roundingModule').constant('PtDetailFilterConstants',
{
    Demographics: "Demographics",
    InsuranceInfo: "InsuranceInfo",
    Admission: "Admission",
    EligibilityInfo: "EligibilityInfo",
    Programs: "Programs",
    QAChecklistInfo: "QAChecklistInfo",
    EnrollmentDetails: "EnrollmentDetails",
    MemberIdentifiers: "MemberIdentifiers",
    PtSchedule: "PtSchedule",
    Comorbids: "Comorbids",
    Complaints: "Complaints",
    CareTeam: "CareTeam"
});

angular.module('roundingModule').constant('ScreeningsSurveyTypes',
{
    ADL: "ADL",
    Depression: "Depression",
	Cognitive: "Cognitive",
	PAM: "PAM",
    FallRiskAssessment: "FallRiskAssessment",
    ESCOFallRiskAssessment: "ESCOFALLRISKASSESSMENT",
    HomeSafety: "HomeSafety",
    PainAssessment: "PainAssessment",
	ESRDTreatmentOptions: "ESRDTreatmentOptions",
	MOATransplant: "MOATransplant",
    DMEyeExamPathway: "DMEyeExamPathway",
    DMFootcarePathway: "DMFootcarePathway",
    ADPathway: "AdPathway",
    FluidManagementPathway:"FluidManagementPathway",
    InfectionPathway:"InfectionPathway",
    HospitalizationPathway:"HospitalizationPathway",
    DMBloodSugarMgmtPathway: "DMBloodSugarMgmtPathway",
    GeneralAssessmentPathway: "GeneralAssessmentPathway",
    ESRDPATHWAY: "ESRDPATHWAY",
    FluPathway: "FluPathway",
    PneuPathway: "PneuPathway"
});

angular.module('roundingModule').constant('SurveyStatusCode',
{
    Completed: "Completed",
    New: "New",
    Pending: "Pending"
});

angular.module('roundingModule').constant('AddressTypeConstants',
{
    Home: "HO",
    Mailing: "MA",
    Temporary: "TM"
});

angular.module('roundingModule').constant('PhoneTypeConstants',
{
    Landline: "L",
    Mobile: "M",
    Fax:"F",
    Work:"W"
});


angular.module('roundingModule').constant('RoleTypeConstants',
{
    VHN: "VHN",
    TL: "TL",
    ROM: "ROM",
    NP: "NP",
    RCM: "RCM",
    PRL: "PRL"
});

angular.module('roundingModule').constant('DiabetesScreeningType',
{
    AnnualDiabetecFootExam: "ADF",
    DiabetecRetinalExam: "DRE",
    VHNFootCheck: "QDF",
    NPFootCheck: "NDF"
});


angular.module('roundingModule').constant('ImmnunizationType',
{        
    H1N1FluVaccine:"H1N1",
    TetanusDiphtheriaBooster:"DPT",
    InfluenzaVaccine :"FLU",
    PneumococcalVaccine:"PNEU",
    HepatitisB :"HEPB"
});





//angular.module('roundingModule').constant('SurveyRefusalReasonCode',
//{
//        PatientRefused: "PatientRefused",
//        CaregiverSurveyRequired: "CaregiverSurveyRequired"
//});

angular.module('roundingModule').constant('DiabetesScreeningResult',
{
        Abnormal: "AB",
        Normal: "N",
        NotMedicallyApplicable: "NA",
        PatientRefused: "REFUSE"
});

angular.module('roundingModule').constant('DepressionScreeningConstants',
{   
    Yes: "Yes",
    EndSurvey: "EndSurvey",
    No: "No",
    NA: "NA",
    NO_ANSWER: "No Answer",
    Survey_Comments_Question: "Please select the Mental Health Diagnosis from below:"
});

angular.module('roundingModule').constant('PatientDemographicsConstants',
{  
    GROUP_POLICYNO: "1L",
    DAVITA_MPIID: "DVA",
    MEDICARE_ID: "MCR",
    PAYOR_GROUPNO: "PGN",
    SPECIAL_PAYOR_ID: "SPI",
    SSN: "SY",
    USI: "USI",
    IMBH_ID: "IMBH",
    THREE_H: "3H",
    N6: "N6",
    GROUP_MODIFIER: "MIM"
});

angular.module('roundingModule').constant('PtExmptComorbidConstant',
{   
    BD: "BD",
    DEPMC: "DEPMC",
    DEPDPD: "DEPDPD"    
});

angular.module('roundingModule').constant('ContactConstants',
{
    Reason : {
        BROWSING: "I",
        ENROLLMENT: "EN",
        POST_DC_FOLLOWUP: "PDF",
        MEMBER_CARE_PLAN: "MCP",
        PROVIDER_CARE_REPORT: "PCR",
        RECORDS_REQUEST: "RR",
        ROUTINE_CONTACT: "RC",
        DEVICE: "DA",
        OUTPATIENT_PLACEMENT: "OP"
    },

    InternalTeam : {
        LICENSED_PRACTICAL_NURSE: "LPN",
        ASSISTANT: "HSA",
        VH_ENROLLMENT_NURSE: "VHEN",
        REGISTERED_NURSE: "HSC",
        NURSE_PRACTITIONER: "NP",
        RENAL_CASE_MANAGER: "RCM",
        PATIENT_RELATIONS_LIAISION: "PRL"
    },

    ExternalTeam : {
        PATIENT: "PT",
        CAREGIVER: "CG",
        HSC: "HSC",
        NEPHROLOGIST: "NP"
    },

    Methods : {
        PHONE: "P",
        BROWSING: "I",
        IN_PERSON: "IP",
        EMAIL: "E",
        FAX: "F",
        MAIL: "M"
    },

    Location : {
        DIALYSIS_CENTER: "DC",
        HOSPITAL: "H"
    },

    Direction : {
        OUTGOING: "O",
        INCOMING: "I",
        NOT_APPLICABLE: "NA"
    },

    Resolution : {
        COMPLETED: "C",
        ATTEMPTED_INCOMPLETE: "I",
        MESSAGE: "M",
        APPEND_TEXT_CALL_OUT_COME: "Call Outcome",
        APPEND_TEXT_CALL_IN_COMPLETE_DETAIL: "Call IncompleteDetail",
        APPEND_TEXT_ADDITIONAL_NOTES: "Additional Notes",
        APPEND_TEXT_ENROLLMENT_OUT_COME: "EnrollmentScreening Outcome",
        APPEND_TEXT_REASON_UNDECIDED: "Reason Undecided"
    },

    EngagementScore : {
        NOT_ASSESSED: "NA"
    },

    DefaultNote :{
        NoteDetail: "Reviewing patient information"
    },

    TagsValue : {
        Access: "Access",
        ADL: "ADL",
        AdvanceCarePlanning: "AdvanceCarePlanning",
        Anemia: "Anemia",
        BehavioralHealthScreening: "BehavioralHealthScreening",
        Bone: "Bone",
        Cardiocom: "Cardiocom",
        CaseManagementArchive: "CaseManagementArchive",
        CKD: "CKD",
        Coaching: "Coaching",
        CognitiveScreening: "CognitiveScreening",
        Comorbids: "Comorbids",
        CVD: "CVD",
        DepressionScreening: "DepressionScreening",
        Diabetes: "Diabetes",
        PrgDiabetes: "PrgDiabetes",
        Diet: "Diet",
        Enrollment: "Enrollment",
        ErroredRecord: "ErroredRecord",
        ESRDDialysis: "ESRDDialysis",
        CKC: "CKC",
        FallRiskAssessment: "FallRiskAssessment",
		ESCOFallRiskAssessment: "ESCOFallRiskAssessment",
        FluidManagement: "FluidManagement",
        GI: "GI",
        HealthMaintenance: "HealthMaintenance",
        Devices: "Devices",
        HomeSafetyScreening: "HomeSafetyScreening",
        Hospitalizations: "Hospitalizations",
        Immunizations: "Immunizations",
        Labs: "Labs",
        Lifestyle: "Lifestyle",
        MaterialFulfillment: "MaterialFulfillment",
        MedicalEquipment: "MedicalEquipment",
        Medications: "Medications",
        MTM: "MTM",
        Neuro: "Neuro",
        None: "None",
        NoteToSelf: "NoteToSelf",
        NutritionScreening: "NutritionScreening",
        Orthopedic: "Orthopedic",
        PainAssessment: "PainAssessment",
		PatientAssessment: "PatientAssessment",
        ESRDTreatmentOptions: "ESRDTreatmentOptions",
		PAMSurvey: "PAMSurvey",
        PTH: "PTH",
        PatientAssessment: "PatientAssessment",
        PatientCarePlan: "PatientCarePlan",
        PatientInfo: "PatientInfo",
		ProviderInfo: "ProviderInfo",
        PMR: "PMR",
        ProgramClosure: "ProgramClosure",
        ProviderInfo: "ProviderInfo",
        Pulmonary: "Pulmonary",
        PVD: "PVD",
        RCM: "RCM",
        ReferralFollowup: "ReferralFollowup",
        Referrals: "Referrals",
        RxAvanti: "RxAvanti",
        RxBSCA: "RxBSCA",
        StratificationOverride: "StratificationOverride",
        SurpriseQuestion: "SurpriseQuestion",
        TechScreening: "TechScreening",
        TMR: "TMR",
        TransplantEvaluation: "TransplantEvaluation",
        TreatmentOptions: "TreatmentOptions",
        Urological: "Urological",
        VAP: "VAP",
        Wounds: "Wounds"
    },

    PreSaveContactStatus: {
        Active: "A",
        Pending: "P"
    },

    ContactrecapContactnoteTextArea: {
        MinHeight: 12,
        MaxHeight: 20
    },

    ContactrecapContactnoteMemberTextArea: {
        MinHeight: 12,
        MaxHeight: 20
    }
});


angular.module('roundingModule').constant('PlacementConstants',
{  
    BingMapsKey: "AlXBUaJwkr9CHC9BXvjokV1UvygLzz7DYuD76Frt9xZMqjb47YEjv1e-Iq2LuJcn",
    BingMapsLocationUrl: "https://dev.virtualearth.net/REST/v1/Locations?",
    BingMapsImageryUrl: "https://dev.virtualearth.net/REST/v1/Imagery?",
    
    PRESENTED_TO_PATIENT_STATUS: "PTP",  
    CHOSEN_BY_PATIENT_STATUS: "PTC",
    APPROVED_BY_FACILITY_STATUS: "FYA",
    DECLINED_BY_FACILITY_STATUS: "FYD",
    FAX_SENT_TO_PROVIDER_STATUS: "FSP",

    CHOSEN_BY_PATIENT_STATUS_TEXT: "Chosen By Patient",
    APPROVED_BY_FACILITY_STATUS_TEXT: "Approved By Provider",
    DECLINED_BY_FACILITY_STATUS_TEXT: "Declined By Provider",
    FAX_SENT_TO_PROVIDER_STATUS_TEXT: "FAX Sent To Provider",

    PLACEMENT_SPECIALIST_PHONE: "1-866-889-6019",
    PLACEMENT_SPECIALIST_INTERNATIONAL: "+1 (610) 722-6019",
    MAX_SEARCH_RADIUS: 100,
	MIN_SELECTED_RADIUS: 5,

    StatusApproved: "Approved",
    StatusRejected: "Rejected",
    PageStatus: { Start: "start", DCPage: "dcpage", DCmappage: "dcmappage" },
    MapError: { NoZipCode: "NoZipCode", MoreAddress: "MoreAddress" }
});

angular.module('roundingModule').constant('ScreenHeaderConstant',
{
    PathwayScreenTitle: "Review",

    ADPathwayFieldName: {
        EffectiveDate: "Effective Date",
        DiscussionDate: "Discussion Date"
    }

});


angular.module('roundingModule').constant('FaxSubRequestType',
{
    SBARReport: "SBAR",
    ClinicalDocument: "CLI",
    QAReport: "QA"
});

angular.module('roundingModule').constant('GoalsPriority',
{
    High: {
        'Text': 'High',
        'Value': 'H',
        'IsShownUI': true
    },
    Medium: {
        'Text': 'Medium',
        'Value': 'M',
        'IsShownUI': true
    },
    Low: {
        'Text': 'Low',
        'Value': 'L',
        'IsShownUI': true
    }
});

angular.module('roundingModule').constant('FaxRequestType',
{
    Report: "REP",
    RequestForInfo: "RFI"
});

angular.module('roundingModule').constant('FaxAutomationConstants',
{
   FaxRequestPreview: "P",
});


angular.module('roundingModule').constant('AddTaskConstants',
{
    TaskType: "Annual HRA Task",
    INITIALHRA: "INITIALHRA",
    ANNUALHRA: "ANNUALHRA"
});


angular.module('roundingModule').constant('RCMPathwaysScreen',
{
    // Screening Survey Type Constants for Patient Pathways
    RCMAccessCareTab: "RCMAccessCareTab",
    RCMDiabetesMgmtTab: "RCMDiabetesMgmtTab",
    RCMDietTab: "RCMDietTab",
    RCMFluidMgmtTab: "RCMFluidMgmtTab",
    RCMMedicationManagementTab:"RCMMedicationManagementTab",
    RCMTreatmentRegimenTab: "RCMTreatmentRegimenTab"
});

angular.module('roundingModule').constant('RCMPathwaysSurveyTypes',
{
    // Screening Survey Type Constants for Patient Pathways
    AccessCarePathway: "AccessCarePathway",
    DiabetesMgmtRCMPathway: "DiabetesMgmtRCMPathway",
    DietPathway: "DietPathway",
    FluidMgmtRCMPathway: "FluidMgmtRCMPathway",
    MedicationMgmtPathway:"MedicationMgmtPathway",
    TreatmentRegimenPathway: "TreatmentRegimenPathway"
});

angular.module('roundingModule').constant('AbnormalitiesConstants',
{
    Other: "OTR"
});

angular.module('roundingModule').constant('StoryConstants',
{
    LastMonth: "Last Month",
    Custom: "Custom",
    AllContacts: "All Contacts",
    InternalTeam: "Internal Team",
    ExternalTeam: "External Team",
    ContactReason: "Contact Reason"
});

angular.module('roundingModule').constant('PatientCarePlanConstants',
{
    ClinicalRelevanceItemColor : [
                                    'Red',
                                    'Yellow',
                                    'None',
                                    'Green'
                                ]
});
