/**
* @fileOverview Patient Details Service Documentation
* @author Chinmay Dhavale
* @version 1.0
*/


(function () {
    //MyTasks Service
    /**
    * @ngdoc service
    * @name roundingModule.service:PatientDetailsService
    * @description
    * Used by PatientDetailsController to display patient details on <i>Patient Chart</i> view. 
    * @param {object} $rootScope
    * Global scope object.
    * @param {object} ServiceConstants
    * Service based common constants.
    * @param {service} RoundingService
    * Makes use of RoundingService.
    * @param {service} $timeout
    * Angular JS timeout function.
    */
    angular.module('roundingModule').factory('PatientDetailsService', function ($rootScope, ServiceConstants, RoundingService, $timeout) {
        var model = [];
        var comorbids = [];

        /**
        * @ngdoc function
        * @name getPatientDetails
        * @methodOf roundingModule.service:PatientDetailsService
        * @description
        ** Service Call.
        ** API : Demographics/GetPatientDetails.
        ** Gets called when the user taps on PtChart button for Patient Details.
        */
        function getPatientDetails(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetPatientDetails, 'POST', 'JSON', data, callBack);
        }     
       
        /**
        * @ngdoc function
        * @name setDemographics
        * @methodOf roundingModule.service:PatientDetailsService
        * @description
        * Used to set Demographics values.
        * @param {object} value
        * Patient's demographic details.
        */
        function setDemographics(value) {
            model.Demographics = value;
        }

        /**
        * @ngdoc function
        * @name getDemographics
        * @methodOf roundingModule.service:PatientDetailsService
        * @description
        * Used to set Demographics values.
        * @returns {object} demographics
        * Patient's demographic details.
        */
        function getDemographics() {
            if ($rootScope.Global.Objects.IsRCMPRL) {
                return model;
            }
            else {
                return model.Demographics;
            }
            
        }       

        /**
       * @ngdoc function
       * @name setComorbids
       * @methodOf roundingModule.service:PatientDetailsService
       * @description
       * Used to set Comorbids values.
       * @param {object} value
       * Patient's comorbid details.
       */
        function setComorbids(value) {
            comorbids = value;
        }

        /**
        * @ngdoc function
        * @name getComorbids
        * @methodOf roundingModule.service:PatientDetailsService
        * @description
        * Used to set Comorbids values.
        * @returns {object} comorbids
        * Patient's comorbids details.
        */
        function getComorbids() {
            return comorbids;
        }


        function addPatientDetails(data, callBack)
        {
            RoundingService.ServiceCallWithParams(ServiceConstants.AddPatientDetails, 'POST', 'JSON', data, callBack);
        }
		
		function providerTeam(respProviders) {
		var ProviderTeam = {},
			now = new Date(),
			provEndDate,
			respProvider;

		ProviderTeam.Providers = [];
		ProviderTeam.Tooltip = setPatientProfileToolTip();
		ProviderTeam.Tooltip.Header = 'PROVIDERS & TEAM';

		for (var ctr = 0; ctr < respProviders.length; ctr += 1) {
			respProvider = respProviders[ctr];
			provEndDate = new Date(respProvider.EndDate);
			if (provEndDate > now) {
				ProviderTeam.Providers.push(respProvider);
			}
		}
		ProviderTeam.Providers.sort(function(a, b) {
			var diff = a.AssociationType.localeCompare(b.AssociationType);
			if (diff === 0) {
				// string compare of dates
				diff = a.EffectiveDate.localeCompare(b.EffectiveDate);
			}
			return diff;
		});

		for (var ctr = 0; ctr < ProviderTeam.Providers.length; ctr += 1) {
			ProviderTeam.Tooltip.NotesHtml += (';' + (ctr + 1) + '. ' + ProviderTeam.Providers[ctr].ProviderInfo.Name);
		}
		ProviderTeam.NotesCount = ctr;
		
		return ProviderTeam;
	}

	function comorbids(respComorbids) {
		var ComorbidsObj = {},
			tempComorbid,
			index = 0;

		ComorbidsObj.Comorbids = respComorbids;
		ComorbidsObj.Tooltip = setPatientProfileToolTip();

		ComorbidsObj.Tooltip.Header = 'Comorbids:';

		for (var ctr = 0; ctr < respComorbids.length; ctr += 1) {
			tempComorbid = respComorbids[ctr];
			if (tempComorbid.Status == 'A') {
				index += 1;
				ComorbidsObj.Tooltip.NotesHtml = ComorbidsObj.Tooltip.NotesHtml +
					';' + index + '. ' + tempComorbid.ComorbidCode;
			}
			ComorbidsObj.NotesCount = index;
		}
		
		return ComorbidsObj;
	}
	
	function setPatientProfileToolTip() {
		var PatientProfileToolTip = {};

		PatientProfileToolTip.Header = '';
		PatientProfileToolTip.SubHeader = '';
		PatientProfileToolTip.NotesHtml = '';
		PatientProfileToolTip.NotesCount = '';
		
		return PatientProfileToolTip;
	};

		return {
			GetPatientDetails: getPatientDetails,           
			SetDemographics: setDemographics,
			GetDemographics: getDemographics,
			SetComorbids: setComorbids,
			GetComorbids: getComorbids,
			AddPatientDetails: addPatientDetails,
			ProviderTeam: providerTeam,
			Comorbids: comorbids,
			SetPatientProfileToolTip: setPatientProfileToolTip
		};
    });
} ());

(function () { //Common PatientDetailsController For PatientDetail.html Template //Used in both MyTasks and Demographics
    angular.module('roundingModule')
    /**
    * @ngdoc controller
    * @name roundingModule.controller:PatientDetailsController
    * @description
    * Controller for Patient Details.
    * @property {object} $scope.PatientDetailsModel - Model for Patient Details 
    * @property {object} $scope.PatientDetailsModel.Demographics - Model for patient demographics.
    */
    .controller('PatientDetailsController', function ($rootScope, $scope, $timeout, LookUp, LookupTypes, PatientDetailsService, PatientChartService, ExceptionService, CommonFunctions,
                                            PtDetailFilterConstants, Status, CommonMessages, RouteConstants) {

        $scope.$$listeners['getPatientDetails'] = [];

        //service based get patient details
        $scope.$on('getPatientDetails', function () {
            $timeout(function () {
                $scope.showPatientDetails();
            }, 0, false);
        });

        //Load the lookups
        LookUp.GetLookUp(LookupTypes.AssociationType);
        LookUp.GetLookUp(LookupTypes.FollowupTasks);
        LookUp.GetLookUp(LookupTypes.GroupCode);
        LookUp.GetLookUp(LookupTypes.Comorbid);

        $scope.PatientDetailsModel = {};
        $scope.PatientDetailsModel.Demographics = {};              
        
        /**
        * @ngdoc function
        * @name showPatientDetails
        * @methodOf roundingModule.controller:PatientDetailsController
        * @description 
        * Use to show patient details on retrieve.
        */
        //loads default mytask view data
        $scope.showPatientDetails = function() {
            $timeout(function() {
                if($rootScope.Global.Objects.SelectedPatient != null)   
                {
                   $rootScope.Global.Objects.SelectedPatient.IsESCOMarket = false;
                   var filter =
                   {                       
                       patientUID: $rootScope.Global.Objects.SelectedPatient.UID,                       
                       PtDetailFilter: $rootScope.Global.Objects.IsRCMPRL ? [ PtDetailFilterConstants.Demographics,
                                        PtDetailFilterConstants.Admission,
                                        PtDetailFilterConstants.MemberIdentifiers,
                                        PtDetailFilterConstants.Comorbids,
                                        PtDetailFilterConstants.Complaints,
                                        PtDetailFilterConstants.CareTeam,
                                        PtDetailFilterConstants.EnrollmentDetails] : [PtDetailFilterConstants.Demographics,
                                                                                PtDetailFilterConstants.Comorbids,
                                                                                PtDetailFilterConstants.Complaints,
                                                                                PtDetailFilterConstants.CareTeam,
                                                                                PtDetailFilterConstants.EnrollmentDetails,
                                                                                PtDetailFilterConstants.MemberIdentifiers
                                                                            ]
                   };

                   CommonFunctions.BlockKendoView("ptchart-ptdetails-container", CommonMessages.BusyMessages.LoadingPtDetails);                   
                   if (LookUp.GetLookUp(LookupTypes.FollowupTasks) === undefined) {
                        window.setTimeout(function () {
                            PatientDetailsService.GetPatientDetails(filter, $scope.onGetPatientDetailsRetrieved);
                        }, 2500);
                   }
                   else {
                        PatientDetailsService.GetPatientDetails(filter, $scope.onGetPatientDetailsRetrieved);                
                   }                                                                                                   
                }
            }, 0, true);
        }                  

        /**
        * @ngdoc function
        * @name onGetPatientDetailsRetrieved
        * @methodOf roundingModule.controller:PatientDetailsController
        * @description
        * Gets called on completion of patient details retrieval
        * @param {object} result
        * Patient details
        */
        //gets call when get patient details service completed
        $scope.onGetPatientDetailsRetrieved = function (result) {            
            try 
            {
                if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) 
                {
                    //ROUND:49,50 DEMOGRPHICS FOR VHN ROLE 
                    //if ($rootScope.Global.Objects.IsRCMPRL)
                    {
                        //PatientDetailsService.SetPatientDetails(result.data);
                        $timeout(function () {
                            $rootScope.$broadcast('updateDemographicsDetails', { "result": result.data });                            
                        }, 0, false);
                    }
                    
                    var payor;
                    if (result.data.PatientDetails.EnrollmentDetails !== null || result.data.PatientDetails.EnrollmentDetails !== undefined) {

                        // To render lab history chart, we need disease state
                        $rootScope.Global.Objects.CurrentPatientDiseaseState = result.data.PatientDetails.EnrollmentDetails.DiseaseState;
                                                
                        if(result.data.PatientDetails.EnrollmentDetails.ReferringPayorUID !== null)
                        {
                            self.GroupCodesLookup =LookUp.GetLookUp(LookupTypes.GroupCode);
                            if (self.GroupCodesLookup) {
                                angular.forEach(self.GroupCodesLookup, function(code) {            
                                    if(code.UID === result.data.PatientDetails.EnrollmentDetails.ReferringPayorUID)
                                    {   
                                        payor = code; 
                                    }
                                });               
                            }
                      
                            if(payor && payor.Text.toUpperCase().indexOf("ESC") === 0)
                            {
                                $rootScope.Global.Objects.SelectedPatient.IsESCOMarket = true;
                            }
                            else
                            {
                                $rootScope.Global.Objects.SelectedPatient.IsESCOMarket = false;
                            }
                            if (payor && payor.AdditionalInfo2 && payor.AdditionalInfo2.toUpperCase().indexOf("SNP") === 0) {
                                $rootScope.Global.Objects.SelectedPatient.IsSNPESCOMarket = true;
                            } else {
                                $rootScope.Global.Objects.SelectedPatient.IsSNPESCOMarket = false;
                            }
                        }
                    }

                    $scope.PatientDetailsModel.Demographics = 
                    {
                        name: (result.data.PatientDetails.Demographics.FirstName === null ? "" : result.data.PatientDetails.Demographics.FirstName) + " " + (result.data.PatientDetails.Demographics.MiddleName === null ? "" : result.data.PatientDetails.Demographics.MiddleName) + " " + (result.data.PatientDetails.Demographics.LastName === null ? "" : result.data.PatientDetails.Demographics.LastName),
                        dob: (result.data.PatientDetails.Demographics.DateOfBirth === null || result.data.PatientDetails.Demographics.DateOfBirth === undefined || result.data.PatientDetails.Demographics.DateOfBirth === "") ? "" : CommonFunctions.DateFunctions.dateFormat(CommonFunctions.DateFunctions.parseDate(result.data.PatientDetails.Demographics.DateOfBirth), "mm/dd/yyyy"),
                        age: (result.data.PatientDetails.Demographics.DateOfBirth === null || result.data.PatientDetails.Demographics.DateOfBirth === undefined || result.data.PatientDetails.Demographics.DateOfBirth === "") ? "" : CommonFunctions.DateFunctions.getYearsFromDate(CommonFunctions.DateFunctions.parseDate(result.data.PatientDetails.Demographics.DateOfBirth)),
                        sig: $rootScope.Global.Objects.SelectedPatient.SIG,
                        shift: setShiftnSchedule($rootScope.Global.Objects.SelectedPatient.Schedule),
                        dialysisCenter: $rootScope.Global.Objects.SelectedPatient.DialysisCenter != null ? $rootScope.Global.Objects.SelectedPatient.DialysisCenter : "",
                        memid: $rootScope.Global.Objects.SelectedPatient.ID != null ? $rootScope.Global.Objects.SelectedPatient.ID : "",
                        phone: getHomePhone(result.data.PatientDetails.Phones),
                        mailingAddress: getMailingAddress(result.data.PatientDetails.Demographics.Addresses),
                        comorbidstop3: getComorbids(result.data.PatientDetails.Comorbids, true),
                        complaintstop3: getComplaints(result.data.PatientDetails.Complaints, true),
                        careteamtop3: getCareTeam(result.data.PatientDetails.CareTeam, true),
                        comorbidsother: getComorbids(result.data.PatientDetails.Comorbids, false),
                        complaintsother: getComplaints(result.data.PatientDetails.Complaints, false),
                        careteamother: getCareTeam(result.data.PatientDetails.CareTeam, false),
                        payor: (payor && payor.Text) ? payor.Text : "n/a"
                    }               
                    
                    // To render lab history chart, we need disease state
                    //if ($scope.PatientDetailsModel.Demographics.comorbidstop3 &&
                    //$scope.PatientDetailsModel.Demographics.comorbidstop3.length > 0) 
                    //{
                    //    $rootScope.Global.Objects.CurrentPatientDiseaseState = $scope.PatientDetailsModel.Demographics.comorbidstop3[0];
                    //}


                    PatientDetailsService.SetComorbids(result.data.PatientDetails.Comorbids);
                    PatientDetailsService.SetDemographics($scope.PatientDetailsModel);
                    var hgt = $rootScope.Global.Objects.DeviceHeight - ($("#ptchart-ptdetails-container").height() + $("#mytasks-screenheader").height() + 130);
                    $("#select-tasktypes").css({ "height": hgt.toString() + "px" });

                    $rootScope.Global.Objects.SelectedPatient.ID = result.data.PatientDetails.Demographics.ID;
                }             
            }
            catch (ex) {
                var errExp = {};
                errExp.Exception = ex;
                errExp.ModuleName = "MyTasks";
                errExp.FunctionName = "onGetPatientDetailsRetrieved";
                errExp.StackTrace = printStackTrace({ e: ex });
                ExceptionService.LogException(CommonFunctions.HandleException(errExp));
            }
            CommonFunctions.UnblockKendoView("ptchart-middle-pane");
            CommonFunctions.UnblockKendoView("ptchart-ptdetails-container");
        }                       
        
        /**
        * @ngdoc function 
        * @name setShiftnSchedule
        * @methodOf roundingModule.controller:PatientDetailsController
        * @description 
        * This function is used to display information about patient's shift and schedule.
        * @param {object} ptdata
        * Patient Details
        */
        //util function
        setShiftnSchedule = function (ptdata) {
            var ss = "";
            if (ptdata !== null && ptdata !== undefined) {
                if (ptdata.Shift) {
                    ss = ptdata.Shift + "/";
                }
                if (ptdata.SchedIsMon) {
                    ss += "M";
                }
                if (ptdata.SchedIsTue) {
                    ss += "T";
                }
                if (ptdata.SchedIsWed) {
                    ss += "W";
                }
                if (ptdata.SchedIsThu) {
                    ss += "TH";
                }
                if (ptdata.SchedIsFri) {
                    ss += "F";
                }
                if (ptdata.SchedIsSat) {
                    ss += "SA";
                }
                if (ptdata.SchedIsSun) {
                    ss += "SU";
                }
            }
            return ss;
        }

        /**
         * @ngdoc function
         * @name getHomePhone
         * @methodOf roundingModule.controller:PatientDetailsController
         * @description
         * Use : Retrieve home phone details of the patient. 
         * @param {array} phones
         * Phone Details
         * @returns {object} phone
         * Phone Details of the patient.
         */
        //util function
        getHomePhone = function (phones) {
            
            var phone = {};
            var phone1 = null;
            if (phones && phones.length > 0) {
                var isPrimary = false;
                var primaryPhone = null;

                for (var i = 0; i < phones.length; i++) {
                    if (phones[i].IsPrimary) {
                        isPrimary = true;
                        primaryPhone = phones[i];
                        break;
                    }
                    else if (phones[i].Type === "L" && !isPrimary) {
                        primaryPhone = phones[i];
                    }
                }
                if (primaryPhone && primaryPhone.PhoneNumber) {
                    phone1 = primaryPhone;
                    var formattedPhone = phone1.PhoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '($1)-$2-$3');
                    phone1.PhoneNumber = formattedPhone;
                }
            }

            phone = {
                    primaryphone : phone1 ?  phone1.PhoneNumber : ""
                };

            return phone;
        }

        /**
         * @ngdoc function
         * @name getMailingAddress
         * @methodOf roundingModule.controller:PatientDetailsController
         * @description
         * Use: Get Address for selected patient
         * @param {array} addresses
         * Addresses based on location.
         * @returns {object} mailingAddress
         * Addresses of the selected patient.
         */
        //util function
        getMailingAddress = function (addresses) {
            var mailingAddress = {};
            if (addresses) {
                  angular.forEach(addresses, function(value, key) {            
                        if(value.Type === "MA")
                        {
                            mailingAddress = {
                                address1: (value.Address1 == null ? "" : value.Address1 + "") + (value.Address2 == null ? "" : ", " + value.Address2),
                                citystatezip: (value.City == null ? "" : value.City + ", ") + (value.StateCode == null ? "" : value.StateCode + " ") + (value.Zip == null ? "" : value.Zip + " ")
                            };           
                        }
                   });               
            }
            return mailingAddress;
        }

        /**
         * @ngdoc function
         * @name getComorbids
         * @methodOf roundingModule.controller:PatientDetailsController
         * @description
         * Use: Comorbids data for selected patient.
         * @param {array} comorbids
         * List of comorbids.
         * @param {boolean} showtop3
         * Boolean value to display comorbids as a pop up.
         */
        //util function
        getComorbids = function (comorbids, showtop3) {
            if (comorbids) {
                if (showtop3) {
                    return (comorbids.length <= 3) ? comorbids : comorbids.slice(0, 3);
                }
                else {
                    return (comorbids.length > 3) ? comorbids.slice(3, comorbids.length) : null;
                }
            }
        }

        /**
         * @ngdoc function
         * @name getComplaints
         * @methodOf roundingModule.controller:PatientDetailsController
         * @description
         * Use: Complaints data for selected patient.
         * @param {array} complaints
         * List of complaints.
         * @param {boolean} showtop3
         * Boolean value to display complaints as a pop up.
         */
        //util function
        getComplaints = function (complaints, showtop3) {
            if (complaints) {
                if (showtop3) {
                    return (complaints.length <= 3) ? complaints : complaints.slice(0, 3);
                }
                else {
                    return (complaints.length > 3) ? complaints.slice(3, complaints.length) : null;
                }
            }
        }

        /**
         * @ngdoc function
         * @name getCareTeam
         * @methodOf roundingModule.controller:PatientDetailsController
         * @description
         * Use: CareTeam data for selected patient.
         * @param {array} careteam
         * List of careteam.
         * @param {boolean} showtop3
         * Boolean value to display careteam as a pop up.
         */
        //util function
        getCareTeam = function (careteam, showtop3) {
            if (careteam) {
                var typeText = { "TypeText" : "" }
                var allitems = jQuery.grep(careteam, function (item) {                    
                    $.extend(item, typeText);
                    item.TypeText = LookUp.GetValueByKey(LookupTypes.AssociationType, item.Type).Text;
                    return item.Type != "DC";
                });

                if (showtop3) {
                    return (allitems.length < 3) ? allitems : allitems.slice(0, 3);
                }
                else {
                    return (allitems.length > 3) ? allitems.slice(3, allitems.length) : null;
                }
            }
        }                   
    })

    /**
    * @ngdoc controller
    * @name roundingModule.controller:ComorbidsotherController
    * @description
    * Controller for other comorbids on Patient Chart screen.
    * @param {object} $rootScope
    * Global scope object.
    * @param {object} $rootScope
    * Local scope object.
    * @param {service} PatientDetailsService
    * Used to make calls to the API.
    */
        //Comorbids Popup Controller
    .controller('ComorbidsotherController', function ($rootScope, $scope, PatientDetailsService) {        
        $scope.model = PatientDetailsService.GetDemographics();
    });
} ());

