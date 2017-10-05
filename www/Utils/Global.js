(function () {
    angular.module('roundingModule').run(function ($rootScope, $http, $timeout, Configuration, ServiceConstants, RouteConstants,
                                            CommonMessages, CommonFunctions) {
        $rootScope.Global =
        {
            Objects: {
                ClientConfig: null,
                IsAppPaused: false,                
                AjaxChakraEnabled: true,
                ApplicationCode: null,
                LoggedInUser: null,
                SwitchedUser: null,                
                IsUserSwitched: null,
                SelectedPatient: {},
                SelectedPathwayMenu: null,
                SelectedPathwayScreeningMenu: null,
                ReloadPage: null,                
                SessionDetails: {
                    Token: null,
                    TokenExpirationEpoch: null,
                    IsTimedOut: false,
                    TimeoutInMinutes: null,
                    LastUpdatedDateTime: null,
                    SessionAliveIntervalInMins: 2
                },
                CurrentUser:
                {
                    UID: '',
                    DisplayName: '',
                    CurrentRole: '',
                    StartTime: '',
                    FirstName: '',
                    LastName: ''
                },
                DeviceHeight: 690,
                Menus: null,
                DataStorage: {
                    Supports: null,
                    LastUpdatedDate: null
                },
                Lookups: null,
                CurrentPatientDiseaseState: null,
                GlobalSessionTimeoutTimer: null,
                IsRCMPRL: null,
                ShowAlerts: false,
                ShowOpenPatients: true
            },

            Constants: {
                CurrentServiceVersion: "1.4.13",           //application version number.               
                CurrentAppVersion: "1.4.13"               //1.4.14 is next prod version 
            },

            Contacts: {
                PreSaveContactList:[],
                PreSaveContact: null,
                IsContactPostPoned: false,
                PresaveTimer: 180 * 1000,
                Tags: [],
				MaxPatientsOpened: 5,
				StopToOpenPatient: function () {
					if(($rootScope.Global.Contacts.PreSaveContactList) && $rootScope.Global.Contacts.PreSaveContactList.length >= $rootScope.Global.Contacts.MaxPatientsOpened) {
						CommonFunctions.DisplayAlertMessage(CommonMessages.Alert.TheMaximumNumberPatientRecordsOpenWarning);
						return true;
					} else {
						return false;
					}	
				}
				
            },            

            Templates :
            {
                Alerts: { Name: 'Alerts', Url: RouteConstants.Alerts },
                OpenPatients: { Name: 'OpenPatients', Url: RouteConstants.OpenPatients },
                PatientDetails: { Name: 'PatientDetails', Url: RouteConstants.PatientDetails },
                PatientActiveCarePlan: { Name: 'Active Patient Care Plan', Url: RouteConstants.PatientActiveCarePlan },
                PatientCare: { Name: 'Active Patient Care Plan', Url: RouteConstants.PatientCare },
                Pathways: { Name: 'Pathways', Url: RouteConstants.AddNewCarePlan }               
            },

            Functions: {
                tap: function (e) {
                    if ($rootScope.Global.Objects.SessionDetails && $rootScope.Global.Objects.SessionDetails.Token) {
                        CommonFunctions.OnTap();                       
                    }
                }
            },
            Listeners: {

            }
        }       
    });
} ());
                                      