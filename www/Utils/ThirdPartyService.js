(function () {
    angular.module('roundingModule').factory('ThirdPartyService', function ($rootScope, $http, RouteConstants, Configuration,
                ServiceConstants, Status, CommonMessages, ResponseHeader, CommonFunctions, $timeout,PlacementConstants) {

        var dataresult = {
            data: [],
            resultstatus: 'started',
            errormessage: '',
            searchaddress: ''
        }

        bingservice = function (param, isTextQuary, callback, curdatatype, curtype, countval) {
             try
            {
                var searchqry = "";
			    var count = countval;
			    if (isTextQuary != true) {
				    searchqry = "q=" + param.Address1 + " " + param.City + " " + param.StateCode + " " + param.Zip + "&key=Ag_yUs9OuGa05CF_x1mbKfZKPTf3Qc2lkt3XP9FyZKRsGmle-N3fLmOu0oed2Uwj" + "&jsonp=?";
			    }
                else 
                {
				    searchqry = "q=" + param + "&key=Ag_yUs9OuGa05CF_x1mbKfZKPTf3Qc2lkt3XP9FyZKRsGmle-N3fLmOu0oed2Uwj" + "&jsonp=?";
				    //dataresult.searchaddress = param.address;
                }

                $.ajax({
				    url: "http://dev.virtualearth.net/REST/v1/Locations?" + searchqry,
				    type: curtype,
				    dataType: curdatatype,
				    success: function (result, textstatus, xhr) {
					    if (result.resourceSets.length != 0) {
						    if (result.resourceSets[0].estimatedTotal == 1 && result.resourceSets[0].resources[0].confidence == "High") {
							    var checkadd = CommonFunctions.ObjectPropertyExist(result.resourceSets[0].resources[0].address, "postalCode");
							    var checkcity = CommonFunctions.ObjectPropertyExist(result.resourceSets[0].resources[0].address, "locality");
							    if (isTextQuary != true) {
								    if ((checkadd === "" && checkcity === "") && param.Zip != "") {
									    result.resourceSets[0].resources[0].address.postalCode = param.Address.Zip;
									    dataresult.data = result.resourceSets[0];
									    dataresult.resultstatus = Status.ServiceCallStatus.Success;
									    dataresult.errormessage = "";
									    callback(dataresult);
								    }
								    else if (checkadd != "" && checkcity != "") {
									    dataresult.data = result.resourceSets[0];
									    dataresult.resultstatus = Status.ServiceCallStatus.Success;
									    dataresult.errormessage = "";
									    callback(dataresult);
								    }
								    else {
									    //							if (param.Address.Zip != null || param.Address.Zip !="") {
									    //								param.Address.Address1 = "";
									    //								ThirdPartyServiceCall.BingService(param, callback, curdatatype, curtype);
									    //							}
									    dataresult.data = result.resourceSets[0];
									    dataresult.resultstatus = Status.ServiceCallStatus.Error;
									    dataresult.errormessage = PlacementConstants.MapError.NoZipCode;
									    callback(dataresult);
								    }
							    }
							    else {
								    if (checkadd != "" && checkcity != "") {
									    dataresult.data = result.resourceSets[0];
									    dataresult.resultstatus = Status.ServiceCallStatus.Success;
									    dataresult.errormessage = "";
									    callback(dataresult);
								    }
								    else {
									    dataresult.data = result.resourceSets[0];
									    dataresult.errormessage = PlacementConstants.MapError.NoZipCode;
									    dataresult.resultstatus = Status.ServiceCallStatus.Error;
									    callback(dataresult);
								    }
							    }
						    }
						    else if (result.resourceSets[0].estimatedTotal == 1 && result.resourceSets[0].resources[0].confidence != "High") {
							    dataresult.resultstatus = Status.ServiceCallStatus.Error;
							    var checkadd = CommonFunctions.ObjectPropertyExist(result.resourceSets[0].resources[0].address, "postalCode");
							    var checkcity = CommonFunctions.ObjectPropertyExist(result.resourceSets[0].resources[0].address, "locality");
							    if (checkadd != "" && checkcity != "") {
								    //dataresult.data = result.resourceSets[0];
								    dataresult.errormessage = PlacementConstants.MapError.MoreAddress;


								    var dataaddress = [];
								    for (var i = 0; i < result.resourceSets[0].resources.length; i++) {
									    var checkadd = CommonFunctions.ObjectPropertyExist(result.resourceSets[0].resources[i].address, "postalCode");
									    var checkcity = CommonFunctions.ObjectPropertyExist(result.resourceSets[0].resources[i].address, "locality");
									    if (checkadd != "" && checkcity != "") {
										    dataaddress.push(result.resourceSets[0].resources[i]);
									    }
								    }
								    //dataresult.data = result.resourceSets[0];
								    result.resourceSets[0].resources = [];
								    result.resourceSets[0].resources = dataaddress;
								    if (dataaddress.length <= 0) {
									    dataresult.resultstatus = Status.ServiceCallStatus.Error;
									    dataresult.errormessage = CommonMessages.Alert.MapSearchProblem;
									    callback(dataresult);
								    }
								    else {
									    dataresult.data = result.resourceSets[0];
									    dataresult.resultstatus = Status.ServiceCallStatus.Error;
									    callback(dataresult);
								    }
							    }
							    else {
								    if (isTextQuary != true) {
									    if (param.Zip != null || param.Zip != "") {

										    if (count === 0) {
											    count = 1;
											    param.Address1 = "";
											    bingservice(param, isTextQuary, callback, curdatatype, curtype, count);
										    }
										    else {
											    dataresult.data = result.resourceSets[0];
											    dataresult.errormessage = PlacementConstants.MapError.NoZipCode;
											    dataresult.resultstatus = Status.ServiceCallStatus.Error;
											    callback(dataresult);
										    }
									    }
									    else {
										    dataresult.data = result.resourceSets[0];
										    dataresult.errormessage = PlacementConstants.MapError.NoZipCode;
										    dataresult.resultstatus = Status.ServiceCallStatus.Error;
										    callback(dataresult);
									    }
								    }
								    else {
									    dataresult.data = result.resourceSets[0];
									    dataresult.errormessage = PlacementConstants.MapError.NoZipCode;
									    dataresult.resultstatus = Status.ServiceCallStatus.Error;
									    callback(dataresult);
								    }
							    }
						    }
						    else if (result.resourceSets[0].estimatedTotal > 1) {
							    dataresult.resultstatus = Status.ServiceCallStatus.Error;
							    var checkadd = CommonFunctions.ObjectPropertyExist(result.resourceSets[0].resources[0].address, "postalCode");
							    var checkcity = CommonFunctions.ObjectPropertyExist(result.resourceSets[0].resources[0].address, "locality");
							    if (checkadd != "" && checkcity != "") {
								    //dataresult.data = result.resourceSets[0];
								    dataresult.errormessage = PlacementConstants.MapError.MoreAddress;


								    var dataaddress = [];
								    for (var i = 0; i < result.resourceSets[0].resources.length; i++) {
									    var checkadd = CommonFunctions.ObjectPropertyExist(result.resourceSets[0].resources[i].address, "postalCode");
									    var checkcity = CommonFunctions.ObjectPropertyExist(result.resourceSets[0].resources[i].address, "locality");
									    if (checkadd != "" && checkcity != "") {
										    dataaddress.push(result.resourceSets[0].resources[i]);
									    }
								    }

								    //dataresult.data = result.resourceSets[0];
								    result.resourceSets[0].resources = [];
								    result.resourceSets[0].resources = dataaddress;
								    if (dataaddress.length <= 0) {
									    dataresult.resultstatus = Status.ServiceCallStatus.Error;
									    dataresult.errormessage = "Please enter valid address";
									    callback(dataresult);
								    }
								    else {
									    dataresult.data = result.resourceSets[0];
									    dataresult.resultstatus = Status.ServiceCallStatus.Error;
									    callback(dataresult);
								    }
							    }
							    else {
								    if (isTextQuary != true) {
									    if (param.Zip != null || param.Zip != "") {

										    if (count === 0) {
											    count = 1;
											    param.Address1 = "";
											    bingservice(param, isTextQuary, callback, curdatatype, curtype, count);
										    }
										    else {
											    dataresult.data = result.resourceSets[0];
											    dataresult.errormessage = PlacementConstants.MapError.NoZipCode;
											    dataresult.resultstatus = Status.ServiceCallStatus.Error;
											    callback(dataresult);
										    }
									    }
									    else {

										    dataresult.data = result.resourceSets[0];
										    dataresult.errormessage = PlacementConstants.MapError.NoZipCode;
										    dataresult.resultstatus = Status.ServiceCallStatus.Error;
										    callback(dataresult);
									    }
								    }
								    else {
									    dataresult.data = result.resourceSets[0];
									    dataresult.errormessage = PlacementConstants.MapError.NoZipCode;
									    dataresult.resultstatus = Status.ServiceCallStatus.Error;
									    callback(dataresult);
								    }

							    }
						    }
						    else {
							    dataresult.resultstatus = Status.ServiceCallStatus.Error;
							    dataresult.errormessage = CommonMessages.Alert.MapSearchProblem;
							    callback(dataresult);
						    }
					    }
					    else {
						    dataresult.resultstatus = Status.ServiceCallStatus.Error;
						    dataresult.errormessage = CommonMessages.Alert.MapSearchProblem;
						    callback(dataresult);
					    }
				    },
				    error: function (jqXHR, textStatus, errorThrown) {
					    dataresult.data = '';
					    dataresult.resultstatus = Status.ServiceCallStatus.Error;
					    dataresult.errormessage = CommonMessages.Alert.BingMapService;
					    if (CapellaMobile.Placement.Settings.PlcmtMapProviderPageStatus === PlacementConstants.PageStatus.DCPage) {
						    $("#plcmt-choosecenter-searcharea-errorMessage").show();
						    $("#plcmt-choosecenter-searcharea-errorMessage").html(CommonMessages.Alert.BingMapService + "Error:" + textStatus);
					    }
					    else {
						    $("#plcmt-provider-address-errorMessage").show();
						    $("#plcmt-provider-address-errorMessage").html(CommonMessages.Alert.BingMapService +"Error:" +textStatus);
					    }
					    CapellaMobile.Common.OpenAlertBox('Alert', [{ message: (CommonMessages.Alert.BingMapService + ", Error description: " + ex.message)}], null);
					    //callback(dataresult);
				    }
			    });



            }
            catch (ex) 
            {
			    //CapellaMobile.Common.OpenAlertBox('Alert', [{ message: ("Error Section:BingService" + ", Error description: " + ex.message)}], null);
		    }
        };

        return {
            BingService: bingservice,
          
        }
    });
} ());

