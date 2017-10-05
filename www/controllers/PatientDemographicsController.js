/**
* @author Chinmay Dhavale 
* @version 1.0
* @fileOverview PatientDemographicsController Documentation
*/


(function () {
    angular.module('roundingModule')
        /**
    * @ngdoc controller
    * @name roundingModule.controller:PatientDemographicsController
    * @description 
    ** Controller for PCM Demographics View(RCM/PRL users).
    ** VersionOne Requirements - <a href="https://www13.v1host.com/DaVitaInc/Task.mvc/Summary?oidToken=Task%3A226733">TK-21707</a>
    * @property {object} $scope.PatientDemographicsModel        Patient Demographics Details.
    * @property {string} $scope.patientGender                   Gender of the patient.
    * @property {string} $scope.patientMaritalStatus            Marital Status of the patient.
    * @property {string} $scope.patientRace                     Race of the patient.
    * @property {string} $scope.patientLangauge                 Langauge of the patient.
    * @property {string} $scope.patientEmailAddress             Email address of the patient.
    * @property {string} $scope.patientContactPreferredTime     Preffered time to contact.
    * @property {string} $scope.patientReligion                 Religion of the patient.
    * @property {string} $scope.patientWorkStatus               Work Status of the patient.
    * @property {date}   $scope.patientDateOfFirstDialysis      Date of the first dialysis of the patient.
    * @property {string} $scope.patientContactPreferredDay      Preffered day to contact the patient.
    * @property {string} $scope.patientHearingImpairment        Hearing Impairment status of the patient.
    * @property {string} $scope.patientVisionImpairment         Vision Impairment status of the patient.
    * @property {string} $scope.patientCognitiveImpairment      Cognitive Imapirment status of the patient.
    * @property {string} $scope.patientIsHavingDiffWalking      Walking Difficulty for patient
    * @property {string} $scope.patientIsHavingStairsHome       Difficulty walking stairs for patient.
    * @property {string} $scope.patientIsMCOtherYN              Other Impairments of the patient.
    * @property {number} $scope.medicalRecordNumber             Patient's medical record number.
    * @property {number} $scope.davitaMPI_ID                    Patients Davita MPI ID.
    * @property {number} $scope.medicareID                      Patient's medicare ID.
    * @property {number} $scope.payerGroupNo                    Patient's Payer Group no.
    * @property {number} $scope.specialPayorID                  Patient's special Payer ID.
    * @property {number} $scope.ssn                             Patient's Social Security Number (SSN).
    * @property {number} $scope.usi                             Patient's USI number.
    * @property {number} $scope.patientMemberID                 Patient's ID (MEM ID).
    * @property {date}   $scope.PatientDemographicsModel.dob    Patient's DOB.
    * @property {number} $scope.PatientDemographicsModel.sig    Patient's SIG.
    * @property {number} $scope.PatientDemographicsModel.memid  Patient's ID (MEM ID).
    * @property {function} $scope.PatientDemographicsModel.phone Calls          getPhoneDetails function to acquire patient's phone details.
    * @property {function} $scope.PatientDemographicsModel.mailingAddress       Calls getAddresses function to acquire patient's mailing address.
    * @property {function} $scope.PatientDemographicsModel.comorbidstop3        Calls getComorbids function to acquire patient's comorbids details and displays first 3 records on demographics ribbon.
    * @property {function} $scope.PatientDemographicsModel.complaintstop3       Calls getComplaints function to acquire patient's complaints details and displays first 3 records on demographics ribbon.
    * @property {function} $scope.PatientDemographicsModel.careteamtop3         Calls getCareTeam function to acquire patient's careteam details and displays first 3 records on demographics ribbon.
    * @property {function} $scope.PatientDemographicsModel.comorbidsother       Calls getComorbids function to acquire patient's comorbids details. If more than 3 records are present, displays a popover containing the rest
    * @property {function} $scope.PatientDemographicsModel.complaintsother      Calls getComplaints function to acquire patient's complaints details. If more than 3 records are present, displays a popover containing the rest
    * @property {function} $scope.PatientDemographicsModel.careteamother        Calls getCareTeam function to acquire patient's careteam details. If more than 3 records are present, displays a popover containing the rest
    * @property {function} $scope.PatientDemographicsModel.identifiers          Calls assignedIdentifiers function to acquire patients identifiers.
    * @property {string} $scope.landlinePhoneNo         Patient's landline number.
    * @property {string} $scope.mobilePhoneNo           Patient's mobile number.
    * @property {string} $scope.faxNumber               Patient's fax number.
    * @property {string} $scope.workPhoneNo             Patient's work phone number.
    * @property {string} phone.PrimaryPhone             Patient's Primary phone number to contact. If Phone.IsPrimary = true, attaches a "(P)" value next to the phone number. 
    */
        .controller('PatientDemographicsController', function ($scope, $rootScope, $timeout, Status, LookUp, LookupTypes, PatientDetailsService, ExceptionService, CommonFunctions,
                                 PatientDemographicsConstants, PtDetailFilterConstants, CommonMessages, RouteConstants, AddressTypeConstants, PhoneTypeConstants, CommonConstants) {

            $scope.$$listeners['updateDemographicsDetails'] = [];

            //load the lookups
            LookUp.GetLookUp(LookupTypes.AssociationType);
            LookUp.GetLookUp(LookupTypes.FollowupTasks);
            LookUp.GetLookUp(LookupTypes.State);
            LookUp.GetLookUp(LookupTypes.Language);
            LookUp.GetLookUp(LookupTypes.ContactPreferenceDay);
            LookUp.GetLookUp(LookupTypes.ContactPreferenceTime);
            LookUp.GetLookUp(LookupTypes.MaritalStatus);
            LookUp.GetLookUp(LookupTypes.Race);
            LookUp.GetLookUp(LookupTypes.EthnicOrigin);
            LookUp.GetLookUp(LookupTypes.PatientWorkStatus);
            LookUp.GetLookUp(LookupTypes.MemberIdModifier);
            $scope.IsSaveDemographicsVisible = false;
            $scope.IsSavePntInfoIds = false;

            $scope.EditDemographics = {
                States: [],
                Genders: [],
                PrimaryPhone: [],
                Languages: [],
                ContactPreferenceDays: [],
                ContactPreferenceTimes: []                
            };

            var saveDemographicsModel = {};
            $scope.PatientDemographicsModel = {};
            $scope.PatientDemographics = {};
            $scope.FromDateString;
            $scope.ToDateString;
            $scope.MaxDate = new Date();
            $scope.MinDate = new Date(2000, 0, 1, 0, 0, 0);
            $scope.SavedSubGroupID = null;
            $scope.SavedHRSID = null;

            /**
             * @ngdoc function
             * @name fromDateChanged
             * @methodOf roundingModule.controller:PatientDemographicsController
             * @description
             * handles fromDateChanged event for min date property.            
             */
            $scope.fromDateChanged = function () {
                $scope.MinDate = new Date($scope.FromDateString);
                if ($scope.MinDate == "Invalid Date") {
                    $scope.ToDateString = "";
                    $scope.EditDemographics.tempAddress.endDate = null;
                }
            };
            /**
             * @ngdoc function
             * @name toDateChanged
             * @methodOf roundingModule.controller:PatientDemographicsController
             * @description
             * handles toDateChanged event for max date property.            
             */
            $scope.toDateChanged = function () {
                $scope.MaxDate = new Date($scope.ToDateString);
                if ($scope.MaxDate == "Invalid Date") {
                    $scope.FromDateString = "";
                    $scope.EditDemographics.tempAddress.startDate = null;
                }
            };
           
            $timeout(function () {
                $scope.getDemographics();
            }, 1500, false);            

            /**
             * @ngdoc function
             * @name editDemographics
             * @methodOf roundingModule.controller:PatientDemographicsController
             * @description
             * makes demographics editable.            
             */
            $scope.editDemographics = function () {
                $scope.IsSaveDemographicsVisible = true;
            };

            /**
             * @ngdoc function
             * @name getDemographics
             * @methodOf roundingModule.controller:PatientDemographicsController
             * @description
             * gets patient details.             .
             */
            $scope.getDemographics = function () {
                $scope.IsSaveDemographicsVisible = false;
                $rootScope.$broadcast('getPatientDetails');
                CommonFunctions.BlockKendoView("ptchart-middle-pane", CommonMessages.BusyMessages.LoadingPtDetails);
            };

            /**
             * @ngdoc function
             * @name populateDropDowns
             * @methodOf roundingModule.controller:PatientDemographicsController
             * @description
             * populated all dropdowns data and edit demographics copy for html view and edit.
             * @param {array} result
             * patient details returned by service
             * @returns {object} isPhoneTypeExist
             * isPhoneTypeExist flag for the sent phoneType.
             */
            $scope.populateDropDowns = function (result) {                 
                $scope.PatientDetails = result.PatientDetails;
                $scope.PatientDemographics = angular.copy(result.PatientDetails.Demographics);
                saveDemographicsModel = angular.copy(result.PatientDetails.Demographics);
                
                $scope.EditDemographics =
                {
                    dob: result.PatientDetails.Demographics.DateOfBirth ? CommonFunctions.DateFunctions.dateFormat(CommonFunctions.DateFunctions.parseDate(result.PatientDetails.Demographics.DateOfBirth), "mm/dd/yyyy") : "",
                    sig: CommonFunctions.GetSIG(result.PatientDetails.SIG),
                    memid: $rootScope.Global.Objects.SelectedPatient.ID ? $rootScope.Global.Objects.SelectedPatient.ID : "",
                    phone: getPhoneDetails(result.PatientDetails.Phones),
                    mailingAddress: {},
                    homeAddress: {},
                    tempAddress: {},
                    comorbidstop3: getComorbids(result.PatientDetails.Comorbids, true),
                    complaintstop3: getComplaints(result.PatientDetails.Complaints, true),
                    careteamtop3: getCareTeam(result.PatientDetails.CareTeam, true),
                    comorbidsother: getComorbids(result.PatientDetails.Comorbids, false),
                    complaintsother: getComplaints(result.PatientDetails.Complaints, false),
                    careteamother: getCareTeam(result.PatientDetails.CareTeam, false),
                    identifiers: assignedIdentifiers(result.PatientDetails.IdentiFiers,true),
                    Email: CommonFunctions.IsNotNullOrEmpty(result.PatientDetails.Demographics.EmailAddress) ? result.PatientDetails.Demographics.EmailAddress : "" 
                };                

                //states lookup
                var states = CommonFunctions.Find(LookUp.GetLookUp(LookupTypes.State), "IsShownUI", true);
                $scope.EditDemographics.States = angular.copy(states);                

                //addresses
                $scope.EditDemographics.mailingAddress = {};
                $scope.EditDemographics.homeAddress = {};
                $scope.EditDemographics.tempAddress = {};
                populateAddresses(result.PatientDetails.Demographics.Addresses);

                if (result.PatientDetails.Demographics.Addresses.length > 0) {
                    angular.forEach(result.PatientDetails.Demographics.Addresses, function (addressobj) {
                        if (addressobj) {
                            if (addressobj.Type === AddressTypeConstants.Mailing) {
                                angular.forEach(states, function (stateobj) {
                                    {
                                        if (stateobj.Value === addressobj.StateCode)
                                            $scope.EditDemographics.mailingAddress.selectedState = stateobj;
                                    }
                                });
                            }

                            if (addressobj.Type === AddressTypeConstants.Home) {
                                angular.forEach(states, function (stateobj) {
                                    {
                                        if (stateobj.Value === addressobj.StateCode)
                                            $scope.EditDemographics.homeAddress.selectedState = stateobj;
                                    }
                                });
                            }

                            if (addressobj.Type === AddressTypeConstants.Temporary) {
                                angular.forEach(states, function (stateobj) {
                                    {
                                        if (stateobj.Value === addressobj.StateCode)
                                            $scope.EditDemographics.tempAddress.selectedState = stateobj;
                                    }
                                });
                            }
                        }
                    });
                }               

                $scope.EditDemographics.Genders = [{
                    Value: 'M',
                    Text: 'Male'
                }, {
                    Value: 'F',
                    Text: 'Female'
                }];

                $scope.EditDemographics.PrimaryPhone = [{
                    Value: '',
                    Text: 'Select a value'
                }, {
                    Value: 'L',
                    Text: 'Home'
                }, {
                    Value: 'W',
                    Text: 'Work'
                },
                {
                    Value: 'M',
                    Text: 'Mobile'
                }];

                //phones
                if (result.PatientDetails.Phones.length > 0 && result.PatientDetails.Phones) {
                    var selectedphonetype = {};
                    angular.forEach(result.PatientDetails.Phones, function (phone) {
                        if (phone.IsPrimary) {
                            selectedphonetype = phone;
                        }
                    });
                                        
                    //primaryphone types
                    angular.forEach($scope.EditDemographics.PrimaryPhone, function (obj) {
                        if (obj.Value === selectedphonetype.Type) {
                            $scope.EditDemographics.PrimaryPhoneSelected = obj;
                        }
                    });
                }

                //languages
                var LanguagesShowInUI = LookUp.GetLookUp(LookupTypes.Language);
                $scope.EditDemographics.Languages = CommonFunctions.Find(LanguagesShowInUI, "IsShownUI", true);
                //$scope.EditDemographics.Languages = LookUp.GetLookUp(LookupTypes.Language);
                $scope.EditDemographics.LanguageSelected = $scope.EditDemographics.Languages[0];
                angular.forEach($scope.EditDemographics.Languages, function (langobj) {
                    if (result.PatientDetails.Demographics.Language === langobj.Value) {
                        $scope.EditDemographics.LanguageSelected = langobj
                    }
                });
             
                //genders
                $scope.EditDemographics.GenderSelected = $scope.EditDemographics.Genders[0];
                angular.forEach($scope.EditDemographics.Genders, function (genderobj) {
                    if (result.PatientDetails.Demographics.Gender === genderobj.Value) {
                        $scope.EditDemographics.GenderSelected = genderobj;
                    }
                });

                //contact preference days               
                $scope.EditDemographics.ContactPreferenceDays = LookUp.GetLookUp(LookupTypes.ContactPreferenceDay);
                $scope.EditDemographics.ContactPreferenceDaySelected = $scope.EditDemographics.ContactPreferenceDays[0];
                angular.forEach($scope.EditDemographics.ContactPreferenceDays, function (cpdayobj) {                    
                    if (result.PatientDetails.Demographics.ContactPreferenceDay === cpdayobj.Value) {
                        $scope.EditDemographics.ContactPreferenceDaySelected = cpdayobj;
                    }                    
                });

                //contact preference times
                $scope.EditDemographics.ContactPreferenceTimes = LookUp.GetLookUp(LookupTypes.ContactPreferenceTime);
                $scope.EditDemographics.ContactPreferenceTimeSelected = $scope.EditDemographics.ContactPreferenceTimes[0];                
                angular.forEach($scope.EditDemographics.ContactPreferenceTimes, function (cptimeobj) {
                    if (result.PatientDetails.Demographics.ContactPreferenceTime === cptimeobj.Value) {
                        $scope.EditDemographics.ContactPreferenceTimeSelected = cptimeobj;
                    }
                });

                //marital statuses
                $scope.EditDemographics.MaritalStatuses = LookUp.GetLookUp(LookupTypes.MaritalStatus);
                $scope.EditDemographics.MaritalStatusSelected = $scope.EditDemographics.MaritalStatuses[0];                
                angular.forEach($scope.EditDemographics.MaritalStatuses, function (maritalobj) {
                    if (result.PatientDetails.Demographics.MaritalStatus === maritalobj.Value) {
                        $scope.EditDemographics.MaritalStatusSelected = maritalobj;
                    }
                });

                //races
                $scope.EditDemographics.Races = LookUp.GetLookUp(LookupTypes.Race);
                $scope.EditDemographics.RaceSelected = $scope.EditDemographics.Races[0];                
                angular.forEach($scope.EditDemographics.Races, function (raceobj) {
                    if (result.PatientDetails.Demographics.Race === raceobj.Value) {
                        $scope.EditDemographics.RaceSelected = raceobj;
                    }
                });

                //ethnicities
                $scope.EditDemographics.Ethnicities = LookUp.GetLookUp(LookupTypes.EthnicOrigin);
                $scope.EditDemographics.EthnicitySelected = $scope.EditDemographics.Ethnicities[0];                
                angular.forEach($scope.EditDemographics.Ethnicities, function (ethnicityobj) {
                    if (result.PatientDetails.Demographics.Ethnicity === ethnicityobj.Value) {
                        $scope.EditDemographics.EthnicitySelected = ethnicityobj;
                    }
                });

                //patient work statuses
                $scope.EditDemographics.PatientWorkStatuses = LookUp.GetLookUp(LookupTypes.PatientWorkStatus);
                $scope.EditDemographics.PatientWorkStatusSelected = $scope.EditDemographics.PatientWorkStatuses[0];                
                angular.forEach($scope.EditDemographics.PatientWorkStatuses, function (patientworkstatusobj) {
                    if (result.PatientDetails.Demographics.WorkingHistory === patientworkstatusobj.Value) {
                        $scope.EditDemographics.PatientWorkStatusSelected = patientworkstatusobj;
                    }
                });

            }

            /**
            * @ngdoc event
            * @name updateDemographicsDetails
            * @eventOf roundingModule.controller:PatientDemographicsController
            * @description 
            * Subscribe <i> updateDemograpicsDetails</i> to retrieve Patient Details.
            * @param {event} event 
            * subscribe event
            * @param {object} arg
            * Patient details for demographics 
            */
            $scope.$on('updateDemographicsDetails', function (event, arg) {
                $timeout(function () {
                    var result = arg.result;
                    
                    $scope.populateDropDowns(result);

                    $scope.patientGender = result.PatientDetails.Demographics.Gender ? (result.PatientDetails.Demographics.Gender === "F" ? "FEMALE" : "MALE") : "";
                    $scope.patientMaritalStatus = result.PatientDetails.Demographics.MaritalStatusText ? result.PatientDetails.Demographics.MaritalStatusText : "";
                    $scope.patientRace = result.PatientDetails.Demographics.RaceText ? result.PatientDetails.Demographics.RaceText : "";
                    $scope.patientLangauge = result.PatientDetails.Demographics.LanguageText ? result.PatientDetails.Demographics.LanguageText : "";
                    $scope.patientEmailAddress = result.PatientDetails.Demographics.EmailAddress ? result.PatientDetails.Demographics.EmailAddress : "";
                    $scope.patientContactPreferredTime = result.PatientDetails.Demographics.ContactPreferenceTimeText ? result.PatientDetails.Demographics.ContactPreferenceTimeText : "";
                    $scope.patientReligion = result.PatientDetails.Demographics.ReligionText ? result.PatientDetails.Demographics.ReligionText : "";
                    $scope.patientWorkStatus = result.PatientDetails.Demographics.WorkingHistoryText ? result.PatientDetails.Demographics.WorkingHistoryText : "";
                    $scope.patientDateOfFirstDialysis = result.PatientDetails.Demographics.DateOfFirstDialysis ? CommonFunctions.DateFunctions.dateFormat(CommonFunctions.DateFunctions.parseDate(result.PatientDetails.Demographics.DateOfFirstDialysis), "mm/dd/yyyy") : "";

                    $scope.patientContactPreferredDay = result.PatientDetails.Demographics.ContactPreferenceDayText ? result.PatientDetails.Demographics.ContactPreferenceDayText : "";
                    //impairments
                    $scope.patientHearingImpairment = result.PatientDetails.Demographics.HearingImpairment ? result.PatientDetails.Demographics.HearingImpairment : "";
                    $scope.patientVisionImpairment = result.PatientDetails.Demographics.VisionImpairment ? result.PatientDetails.Demographics.VisionImpairment : "";
                    $scope.patientCognitiveImpairment = result.PatientDetails.Demographics.CognitiveImpairment ? (result.PatientDetails.Demographics.CognitiveImpairment === false ? "NO" : "YES") : "";
                    $scope.patientIsHavingDiffWalking = result.PatientDetails.Demographics.IsHavingDiffWalking ? (result.PatientDetails.Demographics.IsHavingDiffWalking === false ? "NO" : "YES") : "";
                    $scope.patientIsHavingStairsHome = result.PatientDetails.Demographics.IsHavingStairsHome ? (result.PatientDetails.Demographics.IsHavingStairsHome === false ? "NO" : "YES") : "";
                    $scope.patientIsMCOtherYN = result.PatientDetails.Demographics.IsMCOtherYN ? (result.PatientDetails.Demographics.IsMCOtherYN === false ? "NO" : "YES") : "";

                    $scope.patientMemberID = result.PatientDetails.Demographics.ID ? result.PatientDetails.Demographics.ID : "";
                    $scope.PatientDemographicsModel.Demographics =
                    {
                        dob: result.PatientDetails.Demographics.DateOfBirth ? CommonFunctions.DateFunctions.dateFormat(CommonFunctions.DateFunctions.parseDate(result.PatientDetails.Demographics.DateOfBirth), "mm/dd/yyyy") : "",
                        sig: CommonFunctions.GetSIG(result.PatientDetails.SIG),
                        memid: $rootScope.Global.Objects.SelectedPatient.ID ? $rootScope.Global.Objects.SelectedPatient.ID : "",
                        phone: getPhoneDetails(result.PatientDetails.Phones),
                        mailingAddress: getAddresses(result.PatientDetails.Demographics.Addresses),
                        comorbidstop3: getComorbids(result.PatientDetails.Comorbids, true),
                        complaintstop3: getComplaints(result.PatientDetails.Complaints, true),
                        careteamtop3: getCareTeam(result.PatientDetails.CareTeam, true),
                        comorbidsother: getComorbids(result.PatientDetails.Comorbids, false),
                        complaintsother: getComplaints(result.PatientDetails.Complaints, false),
                        careteamother: getCareTeam(result.PatientDetails.CareTeam, false),
                        identifiers: assignedIdentifiers(result.PatientDetails.IdentiFiers,true),
                    };

                    $rootScope.Global.Objects.SelectedPatient.Admission = result.PatientDetails.Admission;

                    //used to get address for placements
                    if (result.PatientDetails.Demographics.Addresses) {
                        setSelectedPatientAddress(result.PatientDetails.Demographics.Addresses);
                    }

                    if (result.PatientDetails.EnrollmentDetails && result.PatientDetails.EnrollmentDetails.PayorName && result.PatientDetails.EnrollmentDetails.PayorName !== '') {
                        $scope.PayorName = result.PatientDetails.EnrollmentDetails.PayorName;
                    } else {
                        $scope.PayorName = '';
                    }
                    $scope.isGroupModifierVisibile = getGroupModifierVisibility();

                    //to render lab history chart, we need disease state
                    if ($scope.PatientDemographicsModel.comorbidstop3 &&
                        $scope.PatientDemographicsModel.comorbidstop3.length > 0) {
                        $rootScope.Global.Objects.CurrentPatientDiseaseState = $scope.PatientDemographicsModel.comorbidstop3[0];
                    }

                    PatientDetailsService.SetDemographics($scope.PatientDemographicsModel);

                    CommonFunctions.CreateScroller("demographics-ptchart-ptdetails-container");
                    CommonFunctions.UnblockKendoView("ptchart-middle-pane");
                }, 100, true);
            });
            
            /**
            * @ngdoc function
            * @name saveDemographics
            * @methodOf roundingModule.controller:PatientDemographicsController
            * @description
            * saves demographics.            
            */
            $scope.saveDemographics = function () {
                var i,
                    patientDetails = {},                
                    patientDemographics = {},                                                                                
                    updatedDob = '';

                $scope.IsSaveDemographicsVisible = true;               

                if ($scope.EditDemographics.PrimaryPhoneSelected) {
                    var errorMessage = "";
                    switch ($scope.EditDemographics.PrimaryPhoneSelected.Value) {
                        case "" : 
                            errorMessage = "Primary Phone Type Required";                             
                            break;
                        case "L" :
                            if (!$scope.landlinePhoneNo) {
                                errorMessage = "Home Phone Number Required";
                            }
                            break;
                        case "W":
                            if (!$scope.workPhoneNo) {
                                errorMessage = "Work Phone Number Required";
                            }
                            break;
                        case "M":
                            if (!$scope.mobilePhoneNo) {
                                errorMessage = "Mobile Phone Number Required";
                            }
                            break;
                    }
                    if (errorMessage) {
                        CommonFunctions.DisplayAlertMessage(errorMessage);
                        return;
                    }                    
                } else {
                    CommonFunctions.DisplayAlertMessage("Primary Phone Type Required");
                    return;
                }

                if ($scope.EditDemographics.LanguageSelected && $scope.EditDemographics.LanguageSelected.Value === "") {
                    var errorMessage = "Language Required";

                    if (errorMessage) {
                        CommonFunctions.DisplayAlertMessage(errorMessage);
                        return;
                    }
                }
                                                 
                if ($scope.EditDemographics) {
                    var patientDOBUpdated = $scope.EditDemographics.dob; 
                    updatedDob = patientDOBUpdated.split('/')[2] + "-" + patientDOBUpdated.split('/')[0] + "-" + patientDOBUpdated.split('/')[1] + "T00:00:00";
                        
                    updateAddresses();
                    saveDemographicsModel.Phones = [];
                    updatePhones();

                    phoneCount = saveDemographicsModel.Phones.length;
                    if (phoneCount > 0) {
                        for (i = 0; i < phoneCount; i++) {
                            if (saveDemographicsModel.Phones[i].Type == $scope.EditDemographics.PrimaryPhoneSelected.Value) {
                                saveDemographicsModel.Phones[i].IsPrimary = true;
                            } else {
                                saveDemographicsModel.Phones[i].IsPrimary = false;
                            }
                        }
                    }

                    patientDemographics.UID = $scope.PatientDetails.Demographics.UID;
                    patientDemographics.ID = $scope.PatientDetails.Demographics.ID;
                    patientDemographics.FirstName = $scope.PatientDetails.Demographics.FirstName;
                    patientDemographics.MiddleName = $scope.PatientDetails.Demographics.MiddleName;
                    patientDemographics.LastName = $scope.PatientDetails.Demographics.LastName;
                    patientDemographics.PreferredName = $scope.PatientDetails.Demographics.PreferredName;
                    patientDemographics.PatientAdmitType = null;
                    patientDemographics.DateOfBirth = updatedDob;

                    //address data
                    patientDemographics.Addresses = saveDemographicsModel.Addresses;

                    patientDemographics.EmailAddress = $scope.EditDemographics.Email;
                        
                    if ($scope.EditDemographics.LanguageSelected.Value) {
                        patientDemographics.Language = $scope.EditDemographics.LanguageSelected.Value; //dropdown
                        patientDemographics.LanguageText = $scope.EditDemographics.LanguageSelected.Text;
                    }
                    else {
                        patientDemographics.Language = null; //dropdown
                        patientDemographics.LanguageText = null;
                    }                        

                    if ($scope.EditDemographics.MaritalStatusSelected.Value) {
                        patientDemographics.MaritalStatus = $scope.EditDemographics.MaritalStatusSelected.Value; //dropdown
                        patientDemographics.MaritalStatusText = $scope.EditDemographics.MaritalStatusSelected.Text;
                    } else {
                        patientDemographics.MaritalStatus = null; //dropdown
                        patientDemographics.MaritalStatusText = null;
                    }
                    patientDemographics.Gender = $scope.EditDemographics.GenderSelected.Value;

                    if ($scope.EditDemographics.ContactPreferenceDaySelected.Value) {
                        patientDemographics.ContactPreferenceDay = $scope.EditDemographics.ContactPreferenceDaySelected.Value; //dropdown pref day
                        patientDemographics.ContactPreferenceDayText = $scope.EditDemographics.ContactPreferenceDaySelected.Text;//dropdown pfreday text
                    } 
                    else {                           
                        patientDemographics.ContactPreferenceDay = null;
                        patientDemographics.ContactPreferenceDayText = null;
                    }                        

                    if ($scope.EditDemographics.ContactPreferenceTimeSelected.Value) {
                        patientDemographics.ContactPreferenceTime = $scope.EditDemographics.ContactPreferenceTimeSelected.Value; //dropdown  preftime 
                        patientDemographics.ContactPreferenceTimeText = $scope.EditDemographics.ContactPreferenceTimeSelected.Text; //dropdown PreferenceTime text
                    } else {
                        patientDemographics.ContactPreferenceTime = null;
                        patientDemographics.ContactPreferenceTimeText = null;
                    }

                    if ($scope.EditDemographics.RaceSelected.Value) {
                        patientDemographics.Race = $scope.EditDemographics.RaceSelected.Value;
                        patientDemographics.RaceText = $scope.EditDemographics.RaceSelected.Text;
                    } else {
                        patientDemographics.Race = null;
                        patientDemographics.RaceText = null;
                    }

                    if ($scope.EditDemographics.EthnicitySelected.Value) {
                        patientDemographics.Ethnicity = $scope.EditDemographics.EthnicitySelected.Value;
                        patientDemographics.EthnicityText = $scope.EditDemographics.EthnicitySelected.Text;
                    }
                    else {
                        patientDemographics.Ethnicity = null;
                        patientDemographics.EthnicityText = null;
                    }

                    if ($scope.EditDemographics.PatientWorkStatusSelected.Value) {
                        patientDemographics.WorkingHistory = $scope.EditDemographics.PatientWorkStatusSelected.Value;
                        patientDemographics.WorkingHistoryText = $scope.EditDemographics.PatientWorkStatusSelected.Text;
                    } else {
                        patientDemographics.WorkingHistory = null;
                        patientDemographics.WorkingHistoryText = null;
                    }

                    patientDemographics.Religion = $scope.PatientDetails.Demographics.Religion;
                    patientDemographics.ReligionText = $scope.PatientDetails.Demographics.ReligionText;
                    patientDemographics.DateOfFirstDialysis = $scope.PatientDetails.Demographics.DateOfFirstDialysis;
                    patientDemographics.HearingImpairment = $scope.PatientDetails.Demographics.HearingImpairment;
                    patientDemographics.VisionImpairment = $scope.PatientDetails.Demographics.VisionImpairment;
                    patientDemographics.CognitiveImpairment = $scope.PatientDetails.Demographics.CognitiveImpairment;
                    patientDemographics.MobilityImpairment = $scope.PatientDetails.Demographics.MobilityImpairment;
                    patientDemographics.UpdateShippingAddress = $scope.PatientDetails.Demographics.UpdateShippingAddress;                        
                    patientDemographics.DataState = CommonConstants.DataState.Modified;

                    //if (patientDemographics.IsMCOtherYN) {
                    //    patientDemographics.IsMCOtherYN = $scope.EditDemographics.IsMCOtherYN;
                    //    patientDemographics.MCOtherNotes = $scope.EditDemographics.MCOtherNotes;
                    //}

                    patientDetails.Demographics = patientDemographics;
                    patientDetails.PatientUID = $rootScope.Global.Objects.SelectedPatient.UID;

                    patientDetails.Phones = saveDemographicsModel.Phones;
                    patientDetails.DataState = CommonConstants.DataState.Modified;

                    var data = {
                        "PatientDetails" : patientDetails,
                        "Role" : $rootScope.Global.Objects.CurrentUser.CurrentRole,
                        "Status" : 0,
                        "DataState" : CommonConstants.DataState.Modified
                    };

                    CommonFunctions.BlockKendoView("ptchart-middle-pane", CommonMessages.BusyMessages.SavingDemographics);
                    PatientDetailsService.AddPatientDetails(data, addPatientDemographicsCompleted);
                }
                
            };           
            
            /**
             * @ngdoc function
             * @name savePatientInfoIds
             * @methodOf roundingModule.controller:PatientDemographicsController
             * @description
             * saved patient info ids.                          
             */
            $scope.savePatientInfoIds = function () {
                if ($scope.patientInfoIDSValidator.validate()) {
                    var patientInfoIds = {};
                    patientInfoIds.Role = 'VHN';
                    var PatientDetails = {};
                    PatientDetails.IdentiFiers = [];
                    PatientDetails.PatientUID = $rootScope.Global.Objects.SelectedPatient.UID;
                    PatientDetails.DataState = CommonConstants.DataState.Modified;

                    if ($scope.PatientInfoIdentifiers.initialList) {
                        angular.forEach($scope.PatientInfoIdentifiers.initialList, function (key, val) {
                            var identifier = {};
                            identifier = angular.copy(key);
                            switch (key.MITCode) {
                                case PatientDemographicsConstants.GROUP_POLICYNO:
                                    if (identifier.MIDId && identifier.MIDId !== $scope.PatientInfoIdentifiers.medicalRecordNumber) {
                                        identifier.MIDId = $scope.PatientInfoIdentifiers.medicalRecordNumber;
                                        if ($.trim($scope.PatientInfoIdentifiers.medicalRecordNumber) === "")
                                            identifier.DataState = CommonConstants.DataState.Deleted;
                                        else
                                            identifier.DataState = CommonConstants.DataState.Modified;

                                        PatientDetails.IdentiFiers.push(identifier);
                                    }
                                    else if (!identifier.MIDId && $scope.PatientInfoIdentifiers.medicalRecordNumber) {
                                        identifier.MIDId = $scope.PatientInfoIdentifiers.medicalRecordNumber;
                                        identifier.DataState = CommonConstants.DataState.Deleted;
                                        PatientDetails.IdentiFiers.push(identifier);
                                    }
                                    break;
                                case PatientDemographicsConstants.DAVITA_MPIID:
                                    if (identifier.MIDId && identifier.MIDId !== $scope.PatientInfoIdentifiers.davitaMPI_ID) {
                                        identifier.MIDId = $scope.PatientInfoIdentifiers.davitaMPI_ID;
                                        if ($.trim($scope.PatientInfoIdentifiers.davitaMPI_ID) === "")
                                            identifier.DataState = CommonConstants.DataState.Deleted;
                                        else
                                            identifier.DataState = CommonConstants.DataState.Modified;
                                        PatientDetails.IdentiFiers.push(identifier);
                                    }
                                    else if (!identifier.MIDId && $scope.PatientInfoIdentifiers.davitaMPI_ID) {
                                        identifier.MIDId = $scope.PatientInfoIdentifiers.davitaMPI_ID;
                                        identifier.DataState = CommonConstants.DataState.Deleted;
                                        PatientDetails.IdentiFiers.push(identifier);
                                    }
                                    break;
                                case PatientDemographicsConstants.MEDICARE_ID:
                                    if (identifier.MIDId && identifier.MIDId !== $scope.PatientInfoIdentifiers.medicareID) {
                                        identifier.MIDId = $scope.PatientInfoIdentifiers.medicareID;
                                        if ($.trim($scope.PatientInfoIdentifiers.medicareID) === "")
                                            identifier.DataState = CommonConstants.DataState.Deleted;
                                        else
                                            identifier.DataState = CommonConstants.DataState.Modified;
                                        PatientDetails.IdentiFiers.push(identifier);
                                    }
                                    else if (!identifier.MIDId && $scope.PatientInfoIdentifiers.medicareID) {
                                        identifier.MIDId = $scope.PatientInfoIdentifiers.medicareID;
                                        identifier.DataState = CommonConstants.DataState.Deleted;
                                        PatientDetails.IdentiFiers.push(identifier);
                                    }
                                    break;
                                case PatientDemographicsConstants.PAYOR_GROUPNO:
                                    if ((identifier.MIDId && identifier.MIDId !== $scope.PatientInfoIdentifiers.payerGroupNo) || (identifier.Detail && $scope.PatientInfoIdentifiers.MemberIdModifierSelected && identifier.Detail !== $scope.PatientInfoIdentifiers.MemberIdModifierSelected.Value)) {
                                        identifier.MIDId = $scope.PatientInfoIdentifiers.payerGroupNo;

                                        if (identifier.Detail && $scope.PatientInfoIdentifiers.MemberIdModifierSelected && identifier.Detail !== $scope.PatientInfoIdentifiers.MemberIdModifierSelected.Value && $scope.PatientInfoIdentifiers.MemberIdModifierSelected.Value !== "") {
                                            identifier.Detail = $scope.PatientInfoIdentifiers.MemberIdModifierSelected.Value;
                                        }

                                        if ($.trim($scope.PatientInfoIdentifiers.payerGroupNo) === "")
                                            identifier.DataState = CommonConstants.DataState.Deleted;
                                        else
                                            identifier.DataState = CommonConstants.DataState.Modified;
                                        PatientDetails.IdentiFiers.push(identifier);
                                    }
                                    else if (!identifier.MIDId && $scope.PatientInfoIdentifiers.payerGroupNo) {
                                        identifier.MIDId = $scope.PatientInfoIdentifiers.payerGroupNo;
                                        identifier.DataState = CommonConstants.DataState.Deleted;
                                        PatientDetails.IdentiFiers.push(identifier);
                                    }
                                    break;
                                case PatientDemographicsConstants.SPECIAL_PAYOR_ID:
                                    if (identifier.MIDId && identifier.MIDId !== $scope.PatientInfoIdentifiers.specialPayorID) {
                                        identifier.MIDId = $scope.PatientInfoIdentifiers.specialPayorID;
                                        if ($.trim($scope.PatientInfoIdentifiers.specialPayorID) === "")
                                            identifier.DataState = CommonConstants.DataState.Deleted;
                                        else
                                            identifier.DataState = CommonConstants.DataState.Modified;
                                        PatientDetails.IdentiFiers.push(identifier);
                                    }
                                    else if (!identifier.MIDId && $scope.PatientInfoIdentifiers.specialPayorID) {
                                        identifier.MIDId = $scope.PatientInfoIdentifiers.specialPayorID;
                                        identifier.DataState = CommonConstants.DataState.Deleted;
                                        PatientDetails.IdentiFiers.push(identifier);
                                    }
                                    break;
                                case PatientDemographicsConstants.SSN:
                                    if (identifier.MIDId && identifier.MIDId !== $scope.PatientInfoIdentifiers.ssn) {
                                        identifier.MIDId = $scope.PatientInfoIdentifiers.ssn;
                                        if ($.trim($scope.PatientInfoIdentifiers.ssn) === "")
                                            identifier.DataState = CommonConstants.DataState.Deleted;
                                        else
                                            identifier.DataState = CommonConstants.DataState.Modified;
                                        PatientDetails.IdentiFiers.push(identifier);
                                    }
                                    else if (!identifier.MIDId && $scope.PatientInfoIdentifiers.ssn) {
                                        identifier.MIDId = $scope.PatientInfoIdentifiers.ssn;
                                        identifier.DataState = CommonConstants.DataState.Deleted;
                                        PatientDetails.IdentiFiers.push(identifier);
                                    }
                                    break;
                                case PatientDemographicsConstants.USI:
                                    if (identifier.MIDId && identifier.MIDId !== $scope.PatientInfoIdentifiers.usi) {
                                        identifier.MIDId = $scope.PatientInfoIdentifiers.usi;
                                        if ($.trim($scope.PatientInfoIdentifiers.usi) === "")
                                            identifier.DataState = CommonConstants.DataState.Deleted;
                                        else
                                            identifier.DataState = CommonConstants.DataState.Modified;
                                        PatientDetails.IdentiFiers.push(identifier);
                                    }
                                    else if (!identifier.MIDId && $scope.PatientInfoIdentifiers.usi) {
                                        identifier.MIDId = $scope.PatientInfoIdentifiers.usi;
                                        identifier.DataState = CommonConstants.DataState.Deleted;
                                        PatientDetails.IdentiFiers.push(identifier);
                                    }
                                    break;
                                case PatientDemographicsConstants.THREE_H:
                                    if (identifier.MIDId && identifier.MIDId !== $scope.PatientInfoIdentifiers.SubGroupID) {
                                        identifier.MIDId = $scope.PatientInfoIdentifiers.SubGroupID;
                                        if ($.trim($scope.PatientInfoIdentifiers.SubGroupID) === "")
                                            identifier.DataState = CommonConstants.DataState.Deleted;
                                        else
                                            identifier.DataState = CommonConstants.DataState.Modified;
                                        PatientDetails.IdentiFiers.push(identifier);
                                    }
                                    else if (!identifier.MIDId && $scope.PatientInfoIdentifiers.SubGroupID) {
                                        identifier.MIDId = $scope.PatientInfoIdentifiers.SubGroupID;
                                        identifier.DataState = CommonConstants.DataState.Deleted;
                                        PatientDetails.IdentiFiers.push(identifier);
                                    }
                                    break;
                                case PatientDemographicsConstants.N6:
                                    if (identifier.MIDId && identifier.MIDId !== $scope.PatientInfoIdentifiers.HRSID) {
                                        identifier.MIDId = $scope.PatientInfoIdentifiers.HRSID;
                                        if ($.trim($scope.PatientInfoIdentifiers.HRSID) === "")
                                            identifier.DataState = CommonConstants.DataState.Deleted;
                                        else
                                            identifier.DataState = CommonConstants.DataState.Modified;
                                        PatientDetails.IdentiFiers.push(identifier);
                                    }
                                    else if (!identifier.MIDId && $scope.PatientInfoIdentifiers.HRSID) {
                                        identifier.MIDId = $scope.PatientInfoIdentifiers.HRSID;
                                        identifier.DataState = CommonConstants.DataState.Deleted;
                                        PatientDetails.IdentiFiers.push(identifier);
                                    }
                                    break;
                            }
                        });
                    }

                    var identifier = {};

                    if (!$scope.PatientInfoIdentifiers.medicalRecordNumberExist && $scope.PatientInfoIdentifiers.medicalRecordNumber) {
                        identifier = {};
                        identifier.MIDId = $scope.PatientInfoIdentifiers.medicalRecordNumber;
                        identifier.MITCode = PatientDemographicsConstants.GROUP_POLICYNO;
                        identifier.DataState = CommonConstants.DataState.Added;
                        PatientDetails.IdentiFiers.push(identifier);
                    }
                    if (!$scope.PatientInfoIdentifiers.davitaMPI_IDExist && $scope.PatientInfoIdentifiers.davitaMPI_ID) {
                        identifier = {};
                        identifier.MIDId = $scope.PatientInfoIdentifiers.davitaMPI_ID;
                        identifier.MITCode = PatientDemographicsConstants.DAVITA_MPIID;
                        identifier.DataState = CommonConstants.DataState.Added;
                        PatientDetails.IdentiFiers.push(identifier);
                    }
                    if (!$scope.PatientInfoIdentifiers.medicareIDExist && $scope.PatientInfoIdentifiers.medicareID) {
                        identifier = {};
                        identifier.MIDId = $scope.PatientInfoIdentifiers.medicareID;
                        identifier.MITCode = PatientDemographicsConstants.MEDICARE_ID;
                        identifier.DataState = CommonConstants.DataState.Added;
                        PatientDetails.IdentiFiers.push(identifier);
                    }
                    if (!$scope.PatientInfoIdentifiers.payerGroupNoExist && $scope.PatientInfoIdentifiers.payerGroupNo) {
                        identifier = {};
                        identifier.MIDId = $scope.PatientInfoIdentifiers.payerGroupNo;
                        identifier.MITCode = PatientDemographicsConstants.PAYOR_GROUPNO;
                        identifier.DataState = CommonConstants.DataState.Added;
                        if ($scope.PatientInfoIdentifiers.payerGroupNo.length > 0 && $scope.PatientInfoIdentifiers.MemberIdModifierSelected && $scope.PatientInfoIdentifiers.MemberIdModifierSelected.Value && $scope.PatientInfoIdentifiers.MemberIdModifierSelected !== '') {
                            identifier.Detail = $scope.PatientInfoIdentifiers.MemberIdModifierSelected.Value;
                        }
                        else {
                            identifier.Detail = '';
                        }
                        PatientDetails.IdentiFiers.push(identifier);
                    }
                    if (!$scope.PatientInfoIdentifiers.specialPayorIDExist && $scope.PatientInfoIdentifiers.specialPayorID) {
                        identifier = {};
                        identifier.MIDId = $scope.PatientInfoIdentifiers.specialPayorID;
                        identifier.MITCode = PatientDemographicsConstants.SPECIAL_PAYOR_ID;
                        identifier.DataState = CommonConstants.DataState.Added;
                        PatientDetails.IdentiFiers.push(identifier);
                    }
                    if (!$scope.PatientInfoIdentifiers.ssnExist && $scope.PatientInfoIdentifiers.ssn) {
                        identifier = {};
                        identifier.MIDId = $scope.PatientInfoIdentifiers.ssn;
                        identifier.MITCode = PatientDemographicsConstants.SSN;
                        identifier.DataState = CommonConstants.DataState.Added;
                        PatientDetails.IdentiFiers.push(identifier);
                    }
                    if (!$scope.PatientInfoIdentifiers.usiExist && $scope.PatientInfoIdentifiers.usi) {
                        identifier = {};
                        identifier.MIDId = $scope.PatientInfoIdentifiers.usi;
                        identifier.MITCode = PatientDemographicsConstants.USI;
                        identifier.DataState = CommonConstants.DataState.Added;
                        PatientDetails.IdentiFiers.push(identifier);
                    }
                    if (!$scope.PatientInfoIdentifiers.SubGroupIDExist && $scope.PatientInfoIdentifiers.SubGroupID) {
                        identifier = {};
                        identifier.MIDId = $scope.PatientInfoIdentifiers.SubGroupID;
                        identifier.MITCode = PatientDemographicsConstants.THREE_H;
                        identifier.DataState = CommonConstants.DataState.Added;
                        PatientDetails.IdentiFiers.push(identifier);
                    }
                    if (!$scope.PatientInfoIdentifiers.HRSIDExist && $scope.PatientInfoIdentifiers.HRSID) {
                        identifier = {};
                        identifier.MIDId = $scope.PatientInfoIdentifiers.HRSID;
                        identifier.MITCode = PatientDemographicsConstants.N6;
                        identifier.DataState = CommonConstants.DataState.Added;
                        PatientDetails.IdentiFiers.push(identifier);
                    }

                    if (PatientDetails.IdentiFiers && PatientDetails.IdentiFiers.length > 0) {
                        $scope.SavedSubGroupID = $scope.PatientInfoIdentifiers.SubGroupID;
                        $scope.SavedHRSID = $scope.PatientInfoIdentifiers.HRSID;
                        patientInfoIds.PatientDetails = PatientDetails;
                        CommonFunctions.BlockKendoView("ptchart-middle-pane", CommonMessages.BusyMessages.Updating);
                        PatientDetailsService.AddPatientDetails(patientInfoIds, addPatientDetailsCallBack);
                        $scope.IsSavePntInfoIds = false;
                        $scope.IsMemberIdModifierVisible = false;
                        //assignedIdentifiers($scope.PatientInfoIdentifiers.initialList, true);
                        //$scope.getDemographics();
                    }
                    else {
                        //show alert popup "No ids to save"
                        CommonFunctions.DisplayAlertMessage("No ids to save!");                        
                    }
                }
            };

            /**
              * @ngdoc function
              * @name editPatientInfoIds
              * @methodOf roundingModule.controller:PatientDemographicsController
              * @description
              * makes Id section in edit mode with save button visible.              
              */
            $scope.editPatientInfoIds = function () {
                $scope.IsSavePntInfoIds = true;

                if ($scope.PatientInfoIdentifiers.payerGroupNo && $scope.PatientInfoIdentifiers.payerGroupNo.length > 0)
                    $scope.IsMemberIdModifierVisible = true;
                else
                    $scope.IsMemberIdModifierVisible = false;

            };

            $scope.payerGroupNoChanged = function () {
                if ($scope.PatientInfoIdentifiers.payerGroupNo && $scope.PatientInfoIdentifiers.payerGroupNo.length > 0)
                    $scope.IsMemberIdModifierVisible = true;
                else
                    $scope.IsMemberIdModifierVisible = false;

            };


            /**
              * @ngdoc function
              * @name cancelPatientInfoIds
              * @methodOf roundingModule.controller:PatientDemographicsController
              * @description
              * cancels edit of Patient Info Ids and goes back current state of data.              
              */
             $scope.cancelPatientInfoIds = function () {
                 $scope.IsSavePntInfoIds = false;
                 $scope.IsMemberIdModifierVisible = false;
                 $scope.patientInfoIDSValidator.hideMessages();
                 //assignedIdentifiers($scope.PatientInfoIdentifiers.initialList,true);
                 $scope.getDemographics();
             };
           
            /**
             * @ngdoc function
             * @name addPatientDetailsCallBack
             * @methodOf roundingModule.controller:PatientDemographicsController
             * @description
             * Call back method for Add Patient Details service call for ID section.
             * @param {array} result
             * result sent by the service             
             */
             var addPatientDetailsCallBack = function (result) {
                if (result && result.data && result.data.PatientDetails && result.data.PatientDetails.InfoMessage) {
                    //msg = result.data.PatientDetails.InfoMessage;
                    //CommonFunctions.DisplayAlerMessage(result.data.PatientDetails.InfoMessage);
                    CommonFunctions.DisplayFadingMessage(result.data.PatientDetails.InfoMessage);
                    $scope.IsSavePntInfoIds = false;
                    $scope.IsMemberIdModifierVisible = false;
                    //assignedIdentifiers($scope.PatientInfoIdentifiers.initialList,true);
                }
                $scope.getDemographics();
                CommonFunctions.UnblockKendoView("ptchart-middle-pane");
             },

           /**
             * @ngdoc function
             * @name addPatientDemographicsCompleted
             * @methodOf roundingModule.controller:PatientDemographicsController
             * @description
             * Call back method for Add Patient Details service call for Demographics section.
             * @param {array} result
             * result sent by the service             
             */
           addPatientDemographicsCompleted = function (result) {                
               if (result && result.resultstatus === Status.ServiceCallStatus.Success) {
                   CommonFunctions.DisplayFadingMessage(CommonMessages.BusyMessages.DemographicsSaved);
                   $scope.IsSaveDemographicsVisible = false;
                   $scope.getDemographics();
               }
               CommonFunctions.UnblockKendoView("ptchart-middle-pane");
           },

           getGroupModifierVisibility = function () {
               isVisible = false;
               if ($scope.PayorName && $scope.PayorName !== '') {
                   //if (startsWith($scope.PayorName, 'HUM')) {
                   if ($scope.PayorName.startsWith('HUM')) {
                       isVisible = true;
                   }
               }
               return isVisible;
           },

           /**
             * @ngdoc function
             * @name chkForPhoneTypeExists
             * @methodOf roundingModule.controller:PatientDemographicsController
             * @description
             * Checks if phone type exists.
             * @param {array} phoneType
             * phoneType of the phone number
             * @returns {object} isPhoneTypeExist
             * isPhoneTypeExist flag for the sent phoneType.
             */
           chkForPhoneTypeExists = function (phoneType) {
                var i,
                    phoneTypeLen = 0,
                    isPhoneTypeExist = false;
                if ($scope.PatientDetails.Phones) {
                    phoneTypeLen = $scope.PatientDetails.Phones.length;
                    if (phoneTypeLen > 0) {
                        if ($scope.PatientDetails.Phones !== null) {
                            for (i = 0; i < phoneTypeLen; i = i + 1) {
                                if ($scope.PatientDetails.Phones[i].Type === phoneType) {
                                    isPhoneTypeExist = true;
                                    break;
                                }
                            }
                        }
                    }
                    return isPhoneTypeExist;
                }
           },
           chkForAddrTypeExists = function (strAddrType) {
               var i,
                   addrLen = 0,
                   isAddrTypeExist = false;
               addrLen = $scope.PatientDemographics.Addresses.length;
               if (addrLen > 0) {
                   if ($scope.PatientDemographics.Addresses !== null) {
                       for (i = 0; i < addrLen; i = i + 1) {
                           if ($scope.PatientDemographics.Addresses[i].Type === strAddrType) {
                               isAddrTypeExist = true;
                               break;
                           }
                       }
                   }
               }
               return isAddrTypeExist;
           },
           updateAddresses = function () {
               var i,
                   addrLen = 0,
                   addrTemplate = '',
                   pntAddresses = angular.copy($scope.PatientDemographics.Addresses);
               addrLen = $scope.PatientDemographics.Addresses.length;               
               if (chkForAddrTypeExists(AddressTypeConstants.Mailing) === true) {
                   if (addrLen > 0) {
                       for (i = 0; i < addrLen; i = i + 1) {
                           if ($scope.PatientDemographics.Addresses[i].Type === AddressTypeConstants.Mailing) {
                               pntAddresses[i].Address1 = $scope.EditDemographics.mailingAddress.address1 ? $scope.EditDemographics.mailingAddress.address1 : "";
                               pntAddresses[i].Address2 = $scope.EditDemographics.mailingAddress.address2 ? $scope.EditDemographics.mailingAddress.address2 : "";
                               pntAddresses[i].City = $scope.EditDemographics.mailingAddress.city ? $scope.EditDemographics.mailingAddress.city : "";
                               pntAddresses[i].StateCode = $scope.EditDemographics.mailingAddress.selectedState ? $scope.EditDemographics.mailingAddress.selectedState.Value : "";
                               pntAddresses[i].Zip = $scope.EditDemographics.mailingAddress.zip;
                               pntAddresses[i].DataState = CommonConstants.DataState.Modified;
                               break;
                           }
                       }
                   }
               }
               else {
                   addrTemplate = {};
                   addrTemplate.Type = AddressTypeConstants.Mailing;
                   addrTemplate.Address1 = $scope.EditDemographics.mailingAddress.address1 ? $scope.EditDemographics.mailingAddress.address1 : "";
                   addrTemplate.Address2 = $scope.EditDemographics.mailingAddress.address2 ? $scope.EditDemographics.mailingAddress.address2 : "";
                   addrTemplate.City = $scope.EditDemographics.mailingAddress.city ? $scope.EditDemographics.mailingAddress.city : "";
                   addrTemplate.StateCode = $scope.EditDemographics.mailingAddress.selectedState ? $scope.EditDemographics.mailingAddress.selectedState.Value : "";
                   addrTemplate.Zip = $scope.EditDemographics.mailingAddress.zip;
                   addrTemplate.DataState = CommonConstants.DataState.Added;
                   pntAddresses.push(addrTemplate);
               }

               if ($scope.EditDemographics.mailingAddress.copyToHomeAddress) {
                   if (chkForAddrTypeExists(AddressTypeConstants.Mailing)) {
                       if (chkForAddrTypeExists(AddressTypeConstants.Home)) {
                           if (addrLen > 0) {
                               for (i = 0; i < addrLen; i = i + 1) {
                                   if ($scope.PatientDemographics.Addresses[i].Type === AddressTypeConstants.Home) {
                                       pntAddresses[i].Address1 = $scope.EditDemographics.mailingAddress.address1 ? $scope.EditDemographics.mailingAddress.address1 : "";
                                       pntAddresses[i].Address2 = $scope.EditDemographics.mailingAddress.address2 ? $scope.EditDemographics.mailingAddress.address2 : "";
                                       pntAddresses[i].City = $scope.EditDemographics.mailingAddress.city ? $scope.EditDemographics.mailingAddress.city : "";
                                       pntAddresses[i].StateCode = $scope.EditDemographics.mailingAddress.selectedState ? $scope.EditDemographics.mailingAddress.selectedState.Value : "";
                                       pntAddresses[i].Zip = $scope.EditDemographics.mailingAddress.zip;
                                       pntAddresses[i].DataState = CommonConstants.DataState.Modified;
                                       break;
                                   }
                               }
                           }
                       }
                       else {
                           addrTemplate = {};
                           addrTemplate.Type = AddressTypeConstants.Home;
                           addrTemplate.Address1 = $scope.EditDemographics.mailingAddress.address1 ? $scope.EditDemographics.mailingAddress.address1 : "";
                           addrTemplate.Address2 = $scope.EditDemographics.mailingAddress.address2 ? $scope.EditDemographics.mailingAddress.address2 : "";
                           addrTemplate.City = $scope.EditDemographics.mailingAddress.city ? $scope.EditDemographics.mailingAddress.city : "";
                           addrTemplate.StateCode = $scope.EditDemographics.mailingAddress.selectedState ? $scope.EditDemographics.mailingAddress.selectedState.Value : "";
                           addrTemplate.Zip = $scope.EditDemographics.mailingAddress.zip;
                           addrTemplate.DataState = CommonConstants.DataState.Added;
                           if (!addrTemplate.Address1 && !addrTemplate.Address2 && !addrTemplate.City
                               && !addrTemplate.StateCode && !addrTemplate.Zip) {
                               //Do not send the address for save
                           } else {
                               pntAddresses.push(addrTemplate);
                           }
                       }
                   }
               }
               else {
                   if (chkForAddrTypeExists(AddressTypeConstants.Home)) {
                       if (addrLen > 0) {
                           for (i = 0; i < addrLen; i = i + 1) {
                               if ($scope.PatientDemographics.Addresses[i].Type === AddressTypeConstants.Home) {
                                   pntAddresses[i].Address1 = $scope.EditDemographics.homeAddress.address1 ? $scope.EditDemographics.homeAddress.address1 : "";
                                   pntAddresses[i].Address2 = $scope.EditDemographics.homeAddress.address2 ? $scope.EditDemographics.homeAddress.address2 : "";
                                   pntAddresses[i].City = $scope.EditDemographics.homeAddress.city ? $scope.EditDemographics.homeAddress.city : "";
                                   pntAddresses[i].StateCode = $scope.EditDemographics.homeAddress.selectedState ? $scope.EditDemographics.homeAddress.selectedState.Value : "";
                                   pntAddresses[i].Zip = $scope.EditDemographics.homeAddress.zip;
                                   pntAddresses[i].DataState = CommonConstants.DataState.Modified;
                                   break;
                               }
                           }
                       }
                   }
                   else {
                       addrTemplate = {};
                       addrTemplate.Type = AddressTypeConstants.Home;
                       addrTemplate.Address1 = $scope.EditDemographics.homeAddress.address1 ? $scope.EditDemographics.homeAddress.address1 : "";
                       addrTemplate.Address2 = $scope.EditDemographics.homeAddress.address2 ? $scope.EditDemographics.homeAddress.address2 : "";
                       addrTemplate.City = $scope.EditDemographics.homeAddress.city ? $scope.EditDemographics.homeAddress.city : "";
                       addrTemplate.StateCode = $scope.EditDemographics.homeAddress.selectedState ? $scope.EditDemographics.homeAddress.selectedState.Value : "";
                       addrTemplate.Zip = $scope.EditDemographics.homeAddress.zip;
                       addrTemplate.DataState = CommonConstants.DataState.Added;
                       if (!addrTemplate.Address1 && !addrTemplate.Address2 && !addrTemplate.City
                               && !addrTemplate.StateCode && !addrTemplate.Zip) {
                           //Do not send the address for save
                       } else {
                           pntAddresses.push(addrTemplate);
                       }
                   }
               }

               if (chkForAddrTypeExists(AddressTypeConstants.Temporary)) {
                   if (addrLen > 0) {
                       for (i = 0; i < addrLen; i = i + 1) {
                           if ($scope.PatientDemographics.Addresses[i].Type === AddressTypeConstants.Temporary) {
                               pntAddresses[i].Address1 = $scope.EditDemographics.tempAddress.address1 ? $scope.EditDemographics.tempAddress.address1 : "";
                               pntAddresses[i].Address2 = $scope.EditDemographics.tempAddress.address2 ? $scope.EditDemographics.tempAddress.address2 : "";
                               pntAddresses[i].City = $scope.EditDemographics.tempAddress.city ? $scope.EditDemographics.tempAddress.city : "";
                               pntAddresses[i].StateCode = $scope.EditDemographics.tempAddress.selectedState ? $scope.EditDemographics.tempAddress.selectedState.Value : "";
                               pntAddresses[i].Zip = $scope.EditDemographics.tempAddress.zip;
                               pntAddresses[i].StartDate = $scope.EditDemographics.tempAddress.startDate;
                               pntAddresses[i].EndDate = $scope.EditDemographics.tempAddress.endDate;
                               pntAddresses[i].DataState = CommonConstants.DataState.Modified;
                               break;
                           }
                       }
                   }
               }
               else {
                   addrTemplate = {};
                   addrTemplate.Type = AddressTypeConstants.Temporary;
                   addrTemplate.Address1 = $scope.EditDemographics.tempAddress.address1 ? $scope.EditDemographics.tempAddress.address1 : "";
                   addrTemplate.Address2 = $scope.EditDemographics.tempAddress.address2 ? $scope.EditDemographics.tempAddress.address2 : "";
                   addrTemplate.City = $scope.EditDemographics.tempAddress.city ? $scope.EditDemographics.tempAddress.city : "";
                   addrTemplate.StateCode = $scope.EditDemographics.tempAddress.selectedState ? $scope.EditDemographics.tempAddress.selectedState.Value : "";
                   addrTemplate.Zip = $scope.EditDemographics.tempAddress.zip;
                   addrTemplate.StartDate = $scope.EditDemographics.tempAddress.startDate ? (new Date($scope.EditDemographics.tempAddress.startDate)).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false) : "";
                   addrTemplate.EndDate = $scope.EditDemographics.tempAddress.endDate ? (new Date($scope.EditDemographics.tempAddress.endDate)).format(CommonFunctions.DateFunctions.dateFormat.masks.isoDateTime, false) : "";
                   addrTemplate.DataState = CommonConstants.DataState.Added;
                   if (!addrTemplate.Address1 && !addrTemplate.Address2 && !addrTemplate.City
                               && !addrTemplate.StateCode && !addrTemplate.Zip && !addrTemplate.StartDate && !addrTemplate.EndDate) {
                       //Do not send the address for save
                   } else {
                       pntAddresses.push(addrTemplate);
                   }
               }              
               saveDemographicsModel.Addresses = pntAddresses;               
           },
           /**
             * @ngdoc function
             * @name updatePhones
             * @methodOf roundingModule.controller:PatientDemographicsController
             * @description
             * Update Phones for save.                          
             */
           updatePhones = function () {
               var i,
                   phoneTypeLen = 0,
                   phoneTemplate = {},
                   phones = angular.copy($scope.PatientDetails.Phones),
                   phoneTypeLen = phones.length,            

               patientPhoneNo = $scope.landlinePhoneNo ? $scope.landlinePhoneNo.replace(/[^0-9]/g, "") : "";
               if (chkForPhoneTypeExists(PhoneTypeConstants.Landline)) {                   
                   if (phoneTypeLen > 0) {
                       for (i = 0; i < phoneTypeLen; i = i + 1) {
                           if (phones[i].Type === PhoneTypeConstants.Landline) {                               
                               phones[i].IsPrimary = false;
                               if (!patientPhoneNo) {
                                   phones[i].DataState = CommonConstants.DataState.Deleted
                               } else {
                                   phones[i].DataState = CommonConstants.DataState.Modified;
                                   phones[i].PhoneNumber = patientPhoneNo;                                                               
                               }
                               break;
                           }
                       }
                   }                   
               } else {
                   if (patientPhoneNo) {                       
                       phoneTemplate = {};
                       phoneTemplate.Type = PhoneTypeConstants.Landline;
                       phoneTemplate.PhoneNumber = patientPhoneNo;
                       phoneTemplate.IsPrimary = false;
                       phoneTemplate.DataState = CommonConstants.DataState.Added;
                       phones.push(phoneTemplate);
                   }
               }
               
               patientPhoneNo = $scope.workPhoneNo ? $scope.workPhoneNo.replace(/[^0-9]/g, "") : "";
               if (chkForPhoneTypeExists(PhoneTypeConstants.Work)) {                                     
                   if (phoneTypeLen > 0) {
                       for (i = 0; i < phoneTypeLen; i = i + 1) {
                           if (phones[i].Type === PhoneTypeConstants.Work) {
                               phones[i].IsPrimary = false;
                               if (!patientPhoneNo) {
                                   phones[i].DataState = CommonConstants.DataState.Deleted
                               } else {
                                   phones[i].DataState = CommonConstants.DataState.Modified;
                                   phones[i].PhoneNumber = patientPhoneNo;
                               }
                               break;
                           }
                       }
                   }                   
               } else {
                   if (patientPhoneNo) {
                       phoneTemplate = {}; 
                       phoneTemplate.Type = PhoneTypeConstants.Work;
                       phoneTemplate.PhoneNumber = patientPhoneNo;
                       phoneTemplate.IsPrimary = false;
                       phoneTemplate.DataState = CommonConstants.DataState.Added;
                       phones.push(phoneTemplate);
                   }
               }
              
               patientPhoneNo = $scope.mobilePhoneNo ? $scope.mobilePhoneNo.replace(/[^0-9]/g, "") : "";
               if (chkForPhoneTypeExists(PhoneTypeConstants.Mobile) === true) {                   
                   if (phoneTypeLen > 0) {
                       for (i = 0; i < phoneTypeLen; i = i + 1) {
                           if (phones[i].Type === PhoneTypeConstants.Mobile) {
                               phones[i].IsPrimary = false;
                               if (!patientPhoneNo) {
                                   phones[i].DataState = CommonConstants.DataState.Deleted
                               } else {
                                   phones[i].DataState = CommonConstants.DataState.Modified;
                                   phones[i].PhoneNumber = patientPhoneNo;
                               }
                               break;
                           }
                       }
                   }                   
               } else {
                   if (patientPhoneNo) {                       
                       phoneTemplate = {};
                       phoneTemplate.Type = PhoneTypeConstants.Mobile;
                       phoneTemplate.PhoneNumber = patientPhoneNo;
                       phoneTemplate.IsPrimary = false;
                       phoneTemplate.DataState = CommonConstants.DataState.Added;
                       phones.push(phoneTemplate);
                   }
               }
               
               patientPhoneNo = $scope.faxNumber ? $scope.faxNumber.replace(/[^0-9]/g, "") : "";
               if (chkForPhoneTypeExists(PhoneTypeConstants.Fax) === true) {                   
                   if (phoneTypeLen > 0) {
                       for (i = 0; i < phoneTypeLen; i = i + 1) {
                           if (phones[i].Type === PhoneTypeConstants.Fax) {
                               phones[i].IsPrimary = false;
                               if (!patientPhoneNo) {
                                   phones[i].DataState = CommonConstants.DataState.Deleted
                               } else {
                                   phones[i].DataState = CommonConstants.DataState.Modified;
                                   phones[i].PhoneNumber = patientPhoneNo;
                               }
                               break;
                           }
                       }
                   }                   
               } else {
                   if (patientPhoneNo) {                       
                       phoneTemplate = {};
                       phoneTemplate.Type = PhoneTypeConstants.Fax;
                       phoneTemplate.PhoneNumber = patientPhoneNo;
                       phoneTemplate.IsPrimary = false;
                       phoneTemplate.DataState = CommonConstants.DataState.Added;
                       phones.push(phoneTemplate);
                   }
               }

               saveDemographicsModel.Phones = phones;              
            },            
                
            /**
            * @ngdoc function
            * @name assignedIdentifiers
            * @methodOf roundingModule.controller:PatientDemographicsController
            * @description
            * Retrieve information on Member Identifiers.
            * @param {array} Val
            * Identifier Details
            */            
            assignedIdentifiers = function (identifiers, isFirstInitialization) {
                if (identifiers) {
                    $scope.PatientInfoIdentifiers = {};

                    if (isFirstInitialization)
                        $scope.PatientInfoIdentifiers.initialList = angular.copy(identifiers);


                    ////Group Member Id Modifiers - Dropdown Values
                    $scope.PatientInfoIdentifiers.MemberIdModifiers = [];
                    var MemberIdModifierList = LookUp.GetLookUp(LookupTypes.MemberIdModifier);
                    angular.forEach(MemberIdModifierList, function (gm) {
                        if (gm.Value === "FI" || gm.Value === "ASO" || gm.Value === "") {
                            $scope.PatientInfoIdentifiers.MemberIdModifiers.push(gm);
                        }                        
                    });
                    $scope.PatientInfoIdentifiers.MemberIdModifierSelected = $scope.PatientInfoIdentifiers.MemberIdModifiers[0];
                    
                    angular.forEach(identifiers, function (key, value) {
                        switch (key.MITCode) {
                            case PatientDemographicsConstants.GROUP_POLICYNO:
                                $scope.PatientInfoIdentifiers.medicalRecordNumber = key.MIDId;
                                $scope.PatientInfoIdentifiers.medicalRecordNumberExist = true;
                                break;
                            case PatientDemographicsConstants.DAVITA_MPIID:
                                $scope.PatientInfoIdentifiers.davitaMPI_ID = key.MIDId;
                                $scope.PatientInfoIdentifiers.davitaMPI_IDExist = true;
                                break;
                            case PatientDemographicsConstants.MEDICARE_ID:
                                $scope.PatientInfoIdentifiers.medicareID = key.MIDId;
                                $scope.PatientInfoIdentifiers.medicareIDExist = true;
                                break;
                            case PatientDemographicsConstants.PAYOR_GROUPNO:
                                $scope.PatientInfoIdentifiers.payerGroupNo = key.MIDId;
                                $scope.PatientInfoIdentifiers.payerGroupNoExist = true;
                                //to get MemberIdModifierSelectedValue
                                $scope.PatientInfoIdentifiers.MemberIdModifierSelectedValue = key.Detail;                                
                                angular.forEach($scope.PatientInfoIdentifiers.MemberIdModifiers, function (MemberIdModifierobj) {
                                    if ($scope.PatientInfoIdentifiers.MemberIdModifierSelectedValue === MemberIdModifierobj.Value) {
                                        $scope.PatientInfoIdentifiers.MemberIdModifierSelected = MemberIdModifierobj
                                        $scope.PatientInfoIdentifiers.MemberIdModifierSelectedExist = true;
                                    }
                                });
                                break;
                            case PatientDemographicsConstants.SPECIAL_PAYOR_ID:
                                $scope.PatientInfoIdentifiers.specialPayorID = key.MIDId;
                                $scope.PatientInfoIdentifiers.specialPayorIDExist = true;
                                break;
                            case PatientDemographicsConstants.SSN:
                                $scope.PatientInfoIdentifiers.ssn = key.MIDId;
                                $scope.PatientInfoIdentifiers.ssnExist = true;
                                break;
                            case PatientDemographicsConstants.USI:
                                $scope.PatientInfoIdentifiers.usi = key.MIDId;
                                $scope.PatientInfoIdentifiers.usiExist = true;
                                break;
                            case PatientDemographicsConstants.THREE_H:
                                $scope.PatientInfoIdentifiers.SubGroupID = key.MIDId;
                                $scope.PatientInfoIdentifiers.SubGroupIDExist = true;
                                break;
                            case PatientDemographicsConstants.N6:
                                $scope.PatientInfoIdentifiers.HRSID = key.MIDId;
                                $scope.PatientInfoIdentifiers.HRSIDExist = true;
                                break;
                        }
                    });

                    $scope.IsMemberIdModifierVisible = false;
                    //if ($scope.SavedSubGroupID !== null)
                    //    $scope.PatientInfoIdentifiers.SubGroupID = $scope.SavedSubGroupID;
                    //if ($scope.SavedHRSID !== null)
                    //    $scope.PatientInfoIdentifiers.HRSID = $scope.SavedHRSID;


                }
            },


            /**
             * @ngdoc function
             * @name getPhoneDetails
             * @methodOf roundingModule.controller:PatientDemographicsController
             * @description
             * Retrieve patient's phone information. 
             * @param {array} phones
             * Phone Details
             * @returns {object} phone
             * Phone Details of the patient.
             */            
            getPhoneDetails = function (phones) {
                var phone = {};
                if (phones && phones.length > 0) {
                    var primaryPhone = "";
                    for (var i = 0; i < phones.length; i++) {
                        if (phones[i].Type === PhoneTypeConstants.Landline) {
                            if (phones[i].IsPrimary) {
                                $scope.landlinePhoneNo = phones[i].PhoneNumber + " (P) ";
                                primaryPhone = phones[i].PhoneNumber;
                            } else {
                                $scope.landlinePhoneNo = phones[i].PhoneNumber;
                            }
                        }

                        if (phones[i].Type === PhoneTypeConstants.Mobile) {
                            if (phones[i].IsPrimary) {
                                $scope.mobilePhoneNo = phones[i].PhoneNumber + " (P) ";
                                primaryPhone = phones[i].PhoneNumber;
                            } else {
                                $scope.mobilePhoneNo = phones[i].PhoneNumber;
                            }
                        }

                        if (phones[i].Type === PhoneTypeConstants.Fax) {
                            if (phones[i].IsPrimary) {
                                $scope.faxNumber = phones[i].PhoneNumber + " (P) ";
                                primaryPhone = phones[i].PhoneNumber;
                            } else {
                                $scope.faxNumber = phones[i].PhoneNumber;
                            }
                        }

                        if (phones[i].Type === PhoneTypeConstants.Work) {
                            if (phones[i].IsPrimary) {
                                $scope.workPhoneNo = phones[i].PhoneNumber + " (P) ";
                                primaryPhone = phones[i].PhoneNumber;
                            } else {
                                $scope.workPhoneNo = phones[i].PhoneNumber;
                            }
                        }
                    }

                    phone = {
                        primaryphone: primaryPhone,
                    };
                }
                return phone;
            },

            /**
             * @ngdoc function
             * @name setSelectedPatientAddress
             * @methodOf roundingModule.controller:PatientDemographicsController
             * @description
             * Set patient address on a global scope. This address will be used for Placements screen.
             * @param {array} addresses
             * Patient addresses
             */            
            setSelectedPatientAddress = function (addresses) {
                var mailingAddress = null;
                var homeAddress = null;
                var tempAddress = null;

                if (addresses) {
                    angular.forEach(addresses, function (value, key) {
                        if (value.Type === AddressTypeConstants.Mailing) {
                            mailingAddress = value;
                        }
                        else if (value.Type === AddressTypeConstants.Home) {
                            homeAddress = value;
                        }
                        else if (value.Type === AddressTypeConstants.Temporary) {
                            tempAddress = value;
                        }
                    });
                }

                if (homeAddress) {
                    $rootScope.Global.Objects.SelectedPatient.Address = homeAddress;
                }
                else if (mailingAddress) {
                    $rootScope.Global.Objects.SelectedPatient.Address = mailingAddress;
                }
                else if (tempAddress) {
                    $rootScope.Global.Objects.SelectedPatient.Address = tempAddress;
                }
            },
            /**
             * @ngdoc function
             * @name populateAddresses
             * @methodOf roundingModule.controller:PatientDemographicsController
             * @description
             * Populates addresses for mailing, home and temporary.
             * @param {array} addresses
             * Addresses of the selected patient             
             */
            populateAddresses = function (addresses) {                            
                if (addresses) {
                    angular.forEach(addresses, function (value, key) {
                        if (value.Type)
                            if (value.Type === AddressTypeConstants.Mailing) {                                                                
                                $scope.EditDemographics.mailingAddress.address1 = CommonFunctions.IsNotNullOrEmpty(value.Address1) ? value.Address1 : "";
                                $scope.EditDemographics.mailingAddress.address2 = CommonFunctions.IsNotNullOrEmpty(value.Address2) ? value.Address2 : "";
                                $scope.EditDemographics.mailingAddress.city = CommonFunctions.IsNotNullOrEmpty(value.City) ? value.City : "";
                                $scope.EditDemographics.mailingAddress.selectedState = CommonFunctions.IsNotNullOrEmpty(value.StateCode) ? value.StateCode : "";
                                $scope.EditDemographics.mailingAddress.zip = CommonFunctions.IsNotNullOrEmpty(value.Zip) ? value.Zip : "";
                            } else if (value.Type === AddressTypeConstants.Home) {                                
                                $scope.EditDemographics.homeAddress.address1 = CommonFunctions.IsNotNullOrEmpty(value.Address1) ? value.Address1 : "";
                                $scope.EditDemographics.homeAddress.address2 = CommonFunctions.IsNotNullOrEmpty(value.Address2) ? value.Address2 : "";
                                $scope.EditDemographics.homeAddress.city = CommonFunctions.IsNotNullOrEmpty(value.City) ? value.City : "";
                                $scope.EditDemographics.homeAddress.selectedState = (CommonFunctions.IsNotNullOrEmpty(value.StateCode) ? value.StateCode : "");
                                $scope.EditDemographics.homeAddress.zip = (CommonFunctions.IsNotNullOrEmpty(value.Zip) ? value.Zip : "");
                            } else if (value.Type === AddressTypeConstants.Temporary) {                                
                                $scope.EditDemographics.tempAddress.address1 = CommonFunctions.IsNotNullOrEmpty(value.Address1) ? value.Address1 : "";
                                $scope.EditDemographics.tempAddress.address2 = CommonFunctions.IsNotNullOrEmpty(value.Address2) ? value.Address2 : "";
                                $scope.EditDemographics.tempAddress.startDate = (CommonFunctions.IsNotNullOrEmpty(value.StartDate) ? CommonFunctions.DateFunctions.dateFormat(CommonFunctions.DateFunctions.parseDate(value.StartDate), "mm/dd/yyyy") : "");
                                $scope.EditDemographics.tempAddress.endDate = (CommonFunctions.IsNotNullOrEmpty(value.EndDate) ? CommonFunctions.DateFunctions.dateFormat(CommonFunctions.DateFunctions.parseDate(value.EndDate), "mm/dd/yyyy") : "");                                                                
                                $scope.EditDemographics.tempAddress.city = CommonFunctions.IsNotNullOrEmpty(value.City) ? value.City : "";
                                $scope.EditDemographics.tempAddress.state = (CommonFunctions.IsNotNullOrEmpty(value.StateCode) ? value.StateCode : "");
                                $scope.EditDemographics.tempAddress.zip = (CommonFunctions.IsNotNullOrEmpty(value.Zip) ? value.Zip : "");                               
                            }
                    });                    
                }                
            },

            /**
             * @ngdoc function
             * @name getAddresses
             * @methodOf roundingModule.controller:PatientDemographicsController
             * @description
             * Get address of the selected patient.
             * @param {array} addresses
             * Address of the selected patient
             * @returns {object} mailingAddress
             * Addresses of the selected patient.
             */            
            getAddresses = function (addresses) {
                var mailingAddress = {},
                    homeaddress = "",                              
                    mailingCityStateZip = "",
                    tempaddstartdate = new Date(),
                    tempaddenddate = new Date(),                
                    tempaddress = "";
                              
                if (addresses) {
                    angular.forEach(addresses, function (value, key) {
                        if (value.Type)
                            if (value.Type === AddressTypeConstants.Mailing) {
                                mailingAddress = ((CommonFunctions.IsNotNullOrEmpty(value.Address1) ? (value.Address1 + "") : "") + (CommonFunctions.IsNotNullOrEmpty(value.Address2) ? (", " + value.Address2) : ""));                                
                                mailingCityStateZip = ((CommonFunctions.IsNotNullOrEmpty(value.City) ? (value.City + ", ") : "") + (CommonFunctions.IsNotNullOrEmpty(value.StateCode) ? (value.StateCode + " ") : "") + (CommonFunctions.IsNotNullOrEmpty(value.Zip) ? (value.Zip + " ") : ""));                                                                
                            } else if (value.Type === AddressTypeConstants.Home) {
                                homeaddress = ((CommonFunctions.IsNotNullOrEmpty(value.Address1) ? (value.Address1 + "") : "") + (CommonFunctions.IsNotNullOrEmpty(value.Address2) ? (", " + value.Address2 + " , ") : "")) + ((CommonFunctions.IsNotNullOrEmpty(value.City) ? (value.City + ", ") : "") + (CommonFunctions.IsNotNullOrEmpty(value.StateCode) ? (value.StateCode + " ") : "") + (CommonFunctions.IsNotNullOrEmpty(value.Zip) ? (value.Zip + " ") : ""));                                                             
                            } else if (value.Type === AddressTypeConstants.Temporary) {
                                tempaddress = ((CommonFunctions.IsNotNullOrEmpty(value.Address1) ? (value.Address1 + "") : "") + (CommonFunctions.IsNotNullOrEmpty(value.Address2) ? (", " + value.Address2 + " , ") : "")) + ((CommonFunctions.IsNotNullOrEmpty(value.City) ? (value.City + ", ") : "") + (CommonFunctions.IsNotNullOrEmpty(value.StateCode) ? (value.StateCode + " ") : "") + (CommonFunctions.IsNotNullOrEmpty(value.Zip) ? (value.Zip + " ") : ""));
                                tempaddstartdate = (CommonFunctions.IsNotNullOrEmpty(value.StartDate) ? CommonFunctions.DateFunctions.dateFormat(CommonFunctions.DateFunctions.parseDate(value.StartDate), "mm/dd/yyyy") : "");
                                tempaddstartdate = (CommonFunctions.IsNotNullOrEmpty(value.EndDate) ? CommonFunctions.DateFunctions.dateFormat(CommonFunctions.DateFunctions.parseDate(value.EndDate), "mm/dd/yyyy") : "");                                
                            }
                    });

                    addresses = {
                        address1: mailingAddress,
                        mailingCityStateZip: mailingCityStateZip,
                        homeaddress: homeaddress,
                        tempaddress: tempaddress,
                        tempaddstartdate: tempaddstartdate,
                        tempaddenddate: tempaddenddate                                                                
                    };
                }
                return addresses;
            },

            /**
             * @ngdoc function
             * @name getComorbids
             * @methodOf roundingModule.controller:PatientDemographicsController
             * @description
             * Get details for patient's comorbids.
             * @param {array} comorbids
             * List of comorbids
             * @param {boolean} showtop3
             * Boolean value to display comorbids as a pop up. 
             */            
            getComorbids = function (comorbids, showtop3) {
                if (comorbids) {
                    if (showtop3) {
                        return (comorbids.length <= 3) ? comorbids : comorbids.slice(0, 3);
                    }
                    else {
                        return (comorbids.length > 3) ? comorbids.slice(3, comorbids.length) : null;
                    }
                }
            },

            /**
             * @ngdoc function
             * @name getComplaints
             * @methodOf roundingModule.controller:PatientDemographicsController
             * @description
             * Complaints data for selected patient.
             * @param {array} complaints
             * List of complaints.
             * @param {boolean} showtop3
             * Boolean value to display complaints as a pop up.
             */            
            getComplaints = function (complaints, showtop3) {
                if (complaints) {
                    if (showtop3) {
                        return (complaints.length <= 3) ? complaints : complaints.slice(0, 3);
                    }
                    else {
                        return (complaints.length > 3) ? complaints.slice(3, complaints.length) : null;
                    }
                }
            },

            /**
             * @ngdoc function
             * @name getCareTeam
             * @methodOf roundingModule.controller:PatientDemographicsController
             * @description
             * CareTeam data for selected patient.
             * @param {array} careteam
             * List of careteam.
             * @param {boolean} showtop3
             * Boolean value to display careteam as a pop up.
             */            
            getCareTeam = function (careteam, showtop3) {
                if (careteam) {
                    var typeText = { "TypeText": "" };
                    var allItems = jQuery.grep(careteam, function (item) {
                        $.extend(item, typeText);
                        item.TypeText = LookUp.GetValueByKey(LookupTypes.AssociationType, item.Type).Text;
                        return item.Type !== "DC";
                    });

                    if (showtop3) {
                        return (allItems.length < 3) ? allItems : allItems.slice(0, 3);
                    }
                    else {
                        return (allItems.length > 3) ? allItems.slice(3, allItems.length) : null;
                    }
                }
            }
        });
}());