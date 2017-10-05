(function () {
    /**
    * @ngdoc service
    * @author Mikhail Rakhunov
    * @name roundingModule.service:ProviderInfoService
    * @description     
    ** ProviderInfoService is being used by MedicationsController, AllergyFilterController, MedicationFilterController, MedicationMenuController, MedsReviewDateController and AddMedicationController
    ** This will be used for all service calls for Medication Screen

    * @property {string} selectedAllergyFilter     local variable, default value 'All'
    * @property {string} selectedMedicationFilter  local variable, default value 'All'
    * @property {date} screeningDate               local variable, default value ''
    * @property {array} surveyDetails              local variable, default value []
    * @property {date} lastMedReviewDate           local variable, default value ''
    * @property {json} selectedMedication          local variable, default value {}
    * @property {json} medicationsList             local variable, default value {}
    */
    angular.module('roundingModule').factory('ProviderInfoService', function ($rootScope, $timeout, ServiceConstants, RoundingService, Status,
                                        CommonConstants, CommonFunctions, LookUp, LookupTypes) {

          /**
        * @ngdoc function 
        * @name GetPatientComorbids
        * @methodOf roundingModule.service:ProviderInfoService
        * @param {Object} data { patientUID: $rootScope.Global.Objects.SelectedPatient.UID, IsIpe: false or true }
        * @param {function} callback $scope.onPatientMedicationRetrieved      
        * @description       
        ** Calls GetPatientComorbids api 'Clinical/GetPatientComorbids' using RoundingService 
        */
		
		var providerInfoModel = {
				NoDataVisible: false,
				Providers: [],
				ProviderDetail: function () {
					this.Name = '';
					this.MiddleName = '';
					this.LastName = '';
					this.Genders = CommonConstants.Gender;
					this.SelectedGender = null;
					this.AccessReports = false;
					this.AcceptsRFI = false;
					this.VerifiedPatient = false;
					this.PriorSeeing = false;
					this.ProviderType = null;
					this.ContractedTo = '';
					this.PreferredContactMethod = '';
					this.MaxDate = new Date();
					this.SelectedDate = null;
					this.States = LookUp.GetLookUp(LookupTypes.State);
					this.SelectedState = null;
					this.ProviderTypes = LookUp.GetLookUp(LookupTypes.ProviderType);
					this.SelectedProviderType = null;
				}
			};
		
		/**
         * @ngdoc function 
         * @name newProviderInfoModel
         * @methodOf roundingModule.service:ProviderInfoService
         * @returns {object} new comorbidModel
         * @description       
         ** Initializes and returns new Comorbid Model
         */
        function getProviderInfoModel() {
			return providerInfoModel
        }
		
		function getProviderAssociationsWithHistory(data, callback) {
            RoundingService.ServiceCallWithParams(ServiceConstants.GetProviderAssociationsWithHistory, 'POST', 'JSON', data, callback, true);
        }
		
		function saveProviderAssociations(data, callBack) {
            RoundingService.ServiceCallWithParams(ServiceConstants.SaveProviderAssociations, 'POST', 'JSON', data, callBack);
        }


		
        return {
			GetProviderInfoModel: getProviderInfoModel,
            GetProviderAssociationsWithHistory: getProviderAssociationsWithHistory,
			SaveProviderAssociations: saveProviderAssociations
		};
    });
} ());

(function () {
    angular.module('roundingModule')
        .controller('ProviderInfoController', function ($rootScope, $scope, $timeout, $filter, ProviderInfoService, ExceptionService, CommonFunctions,
                                                       CommonConstants, LookUp, LookupTypes, ScreenConstants, Status, CommonMessages) {
		  
//***** load the lookups for Display data 
			/*LookUp.GetLookUp(LookupTypes.AssociationType);
			LookUp.GetLookUp(LookupTypes.ContractingFacility);
			LookUp.GetLookUp(LookupTypes.MemberRelation);
            LookUp.GetLookUp(LookupTypes.TeamType);
            LookUp.GetLookUp(LookupTypes.State);
			LookUp.GetLookUp(lookupTypes.PreferredContactMethod);
			LookUp.GetLookUp(lookupTypes.ProviderAddressType);
			LookUp.GetLookUp(lookupTypes.ProviderType);
			LookUp.GetLookUp(lookupTypes.ProviderAddressType);
			LookUp.GetLookUp(lookupTypes.ProviderIDType);
			LookUp.GetLookUp(lookupTypes.ProviderSpecialtyType);
			LookUp.GetLookUp(lookupTypes.Language);
			LookUp.GetLookUp(lookupTypes.Program);
			LookUp.GetLookUp(lookupTypes.GroupCode);*/
			
// ****** Get Look up for one Item 
			$scope.getLookupItem = function (lookupType, item) {
				return LookUp.GetValueByKey(lookupType, item).Text;
            };
//*********************
	var getPrimaryAddress = function (addrObj) {
		var addrArray = angular.isArray(addrObj.ProviderAddress) ? addrObj.ProviderAddress : [];
		var addr = [];
		if(addrObj.FirstName !== null || addrObj.LastName !== null) {
			var temp = addrObj.FirstName === null? "" : addrObj.FirstName;
			temp += addrObj.LastName === null? "" : " " + addrObj.LastName;
			addr.push(temp);
		} else {
			addr.push(addrObj.Name  === null? "" : addrObj.Name);
		}
		
		
		for(var i = 0; i < addrArray.length; i++) {
			if(addrArray[i].IsPrimary) {
				if(addrArray[i].Address1 !== null) {
					addr.push(addrArray[i].Address1);
				}	
				addr.push(addrArray[i].City === null? "" : addrArray[i].City);
				var temp = addrArray[i].StateCode === null? "" : addrArray[i].StateCode;
				temp += addrArray[i].Zip === null? "" :  ' - ' + addrArray[i].Zip;
				if(temp !== "") {
					addr.push(temp); 
				}	
				if(angular.isArray(addrArray[i].Phones)) {
					var phType = [];
					for(var j = 0; j < addrArray[i].Phones.length; j++) {
						if( addrArray[i].Phones[j].Type === "W") {
							phType[0] = addrArray[i].Phones[j].PhoneNumber === null? "" : "Ph:" + addrArray[i].Phones[j].PhoneNumber; 
						} else if (addrArray[i].Phones[j].Type === "F") {
							phType[1] = addrArray[i].Phones[j].PhoneNumber === null? "" : "Fax:" + addrArray[i].Phones[j].PhoneNumber; 
						} 
					}
					if(phType[0] !== "") {
						addr.push(phType[0]);
					}	
					if(phType[1] !== "") {
						addr.push(phType[1]);
					}	
				}
				break;			
			}
		}
		if(addrObj.AffiliatedTo !== null) {
			addr.push("Affiliated to - " + addrObj.AffiliatedTo);
		}
		
		if(addrObj.ContractedToCode !== null) {
			addr.push("Contracted to - " + addrObj.ContractedToCode);
		}
		
		if(addr.length === 0) {
			addr.push("");
		}
		return addr;
	};

	$scope.selectRow = function(dataItem) {
		var indx = dataItem.OriginalIndex;
	};


//****** RETRIVE, EDIT, DELETE, and SAVE functions
		
	$scope.getProviderInfoDetails = function () {
		CommonFunctions.BlockKendoView("ptchart-splitview-main-pan");
		var filter = $.param({ '': $rootScope.Global.Objects.SelectedPatient.UID });
		$timeout(function () {
			ProviderInfoService.GetProviderAssociationsWithHistory(filter, $scope.onProviderInfoRetrieved);
		 }, 0, false);	
	};
			
	$scope.onProviderInfoRetrieved = function (result) {
		try {
			$scope.model = angular.copy(ProviderInfoService.GetProviderInfoModel());
			if (result.resultstatus === Status.ServiceCallStatus.Success && result.data) {
				if (result.data.length > 0) {
					$scope.OriginalProviders = angular.copy(result.data);
					var todayDate = new Date();
					var firstTime = true;
					angular.forEach(result.data, function(value, key) {
						if(new Date(value.EndDate) >= todayDate) {
							value.OriginalIndex = key;
							if(firstTime) {
								value.IsSelected = true;
								firstTime = false;
							} else {
								value.IsSelected = false;
							}	
							value.Address = getPrimaryAddress(value.ProviderInfo);
							$scope.model.Providers.push(value);
						}
					});
					$scope.model.NoDataVisible = $scope.model.Providers.length > 0 ? false : true;
					CommonFunctions.CreateScroller("provider-scroller");
				}	
			}
			
		} catch (ex) {
			var errExp = {};
			errExp.Exception = ex;
			errExp.ModuleName = "ProviderInfo";
			errExp.FunctionName = "onProviderInfoRetrieved";
			errExp.StackTrace = printStackTrace({ e: ex });
			ExceptionService.LogException(CommonFunctions.HandleException(errExp));
		}
		
		CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");

	};
	
	$scope.onDeleteProviderInfo = function (dataItem) {
		$timeout(function () {
			CommonFunctions.OpenCustomConfirmBox(CommonMessages.Alert.ConfirmMessage, CommonMessages.Alert.DeactivateComorbid, "Yes,No", function (data) {
				if (data && data.returnValue) {
				   CommonFunctions.Blockui();
				   var provider = $scope.OriginalProviders[dataItem.OriginalIndex];
					provider.DataState = 3;
					provider.MessageType = "System";
					ProviderInfoService.SaveProviderAssociations(provider, $scope.onProviderInfoSaved);
				}   
				CommonFunctions.Unblockui();						   
			});
		}, 50, true);	
	};	
	
	$scope.onProviderInfoSaved = function (result) {
		try {
			if (result.resultstatus === Status.ServiceCallStatus.Success) {
				$scope.getProviderInfoDetails();
			}	
		} catch (ex) {
			var errExp = {};
			errExp.Exception = ex;
			errExp.ModuleName = "ProviderInfo";
			errExp.FunctionName = "onProviderInfoSaved";
			errExp.StackTrace = printStackTrace({ e: ex });
			ExceptionService.LogException(CommonFunctions.HandleException(errExp));
		}
		
		CommonFunctions.UnblockKendoView("ptchart-splitview-main-pan");	
	};
	
//**************** Start Retrive process
	$scope.getProviderInfoDetails();
//******************************************************************************	




//***********ProviderMenuController*********************************************************	
	})//Controller for Provider Menu Popover
        .controller('ProviderMenuController', function ($rootScope, $scope, $timeout, ProviderInfoService, CommonFunctions, CommonConstants, CommonMessages)
            /**
            * @ngdoc controller
            * @name roundingModule.controller:MedicationMenuController
            * @description 
            ** Child controller of MedicationController
            ** Controller for Medication Menu PopOver 
                 
            * @property {object} $scope.model                            model of MedicationMenuController
            * @property {object} $scope.model.ScreeningDate              property of $scope.model used for screening date           
            */ {
            /*$scope.model = {};
			$scope.maxDate = new Date();
			$scope.genders = CommonConstants.Gender;
			$scope.selectedGender = null;*/
			
			if(!$scope.providerDetails) {
				$scope.providerDetails = new (ProviderInfoService.GetProviderInfoModel().ProviderDetail);
			}	
			
			
			/*var states = LookUp.GetLookUp(LookupTypes.State),
			    providerTypes = LookUp.GetLookUp(LookupTypes.ProviderType);//,
				genders = LookUp.GetLookUp(LookupTypes.Gender),
				contractingFacilities = LookUp.GetLookUp(LookupTypes.ContractingFacility),
				preferredContactMethods = LookUp.GetLookUp(LookupTypes.ContactMethod),
				providerAddressTypes = LookUp.GetLookUp(LookupTypes.ProviderAddressType);*/
			
            /*$scope.model.ScreeningDate = MedicationsService.GetScreeningDate();
            $scope.model.MedicationsList = MedicationsService.GetMedications();*/
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
            $scope.onProviderMenuClick = function (menu) {
                try {
                    $("#popover-provider-menu").data("kendoMobilePopOver").close();

                   switch (menu) {
                        case "DC":
							$timeout(function () {
                                $("#add-provider-modalview").kendoMobileModalView("open");
                            }, 0, false);
                            break;
                        case "Peph":
                            $timeout(function () {
                                $("#add-provider-modalview").kendoMobileModalView("open");
                            }, 0, false);
                            break;
                        case "PCP":
                            $timeout(function () {
                                $("#add-provider-modalview").kendoMobileModalView("open");
                            }, 0, false);
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
            };
			$scope.onCancelAddProviderClick = function() {
				$scope.providerDetails = null;
				$("#add-provider-modalview").kendoMobileModalView("close");
			};
			
			$scope.onAddProviderClick = function() {
				$("#add-provider-modalview").kendoMobileModalView("close");
			};
			
			$scope.onGenderChange = function() {
				var test = $scope.selectedGender;
			}	
        })			
} ());