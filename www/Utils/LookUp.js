(function () {
    angular.module('roundingModule').factory('LookUp', function ($http, $rootScope, Configuration, CommonFunctions, DataStorage, ServiceConstants, StorageConstants) {

        //This array keeps all Lookup data
        //Lookup function:get all lookup list by lookupname begin
        //eg to call look Up service data -> CapellaMobile.LookUp.Data.get(CapellaMobile.Constants.LookUp.State)
        getLookUp = function (lookupType) {

            //var storageName = DataStorage.GetStorageName(lookupType, StorageConstants.StorageType);

            //Check if look up data is available in local storage.
            var lookupData = DataStorage.GetItem(lookupType);

            //if local storage didnt return the data, get the data from the service and store it in local storage.
            if (lookupData == null || lookupData.length <= 0) {
                $http({
                    url: Configuration.GetServiceUrl() + ServiceConstants.GetLookupData,
                    method: 'GET',
                    dataType: 'JSON',
                    params: { 'lookupTypeRequest': lookupType },
                    headers: { 'Authorization': "Session" + " " + $rootScope.Global.Objects.SessionDetails.Token,
                        'UserId': $rootScope.Global.Objects.LoggedInUser.UID
                    }
                }).
                success(function (result, status, headers, config) {
                    if (result != null) {
                        DataStorage.SetItem(lookupType, result.Value);
                        return result.Value;
                    }
                })
                .error(function (result, status, headers, config) {
                    CommonFunctions.OpenAlertBox('Alert', [{ message: "Error accessing lookup data. " + ' Error Message: ' + result.Message}], null);
                });
            }
            else {
                return lookupData;
            }
        };

        getParentChildLookUp = function (lookupRequest, callBack) {

            var lookupname = lookupRequest.parentLookupType + lookupRequest.childLookupType;

            //Check if look up data is available in local storage.
            var lookupData = DataStorage.GetItem(lookupname);

            //if local storage didnt return the data, get the data from the service and store it in local storage.
            if (lookupData == null || lookupData.length <= 0) {
                $http({
                    url: Configuration.GetServiceUrl() + ServiceConstants.GetParentChildLookup,
                    method: 'POST',
                    dataType: 'JSON',
                    data: $.param(lookupRequest), //{ 'lookupRequest': lookupRequest },
                    headers: { 'Authorization': "Session" + " " + $rootScope.Global.Objects.SessionDetails.Token,
                        'UserId': $rootScope.Global.Objects.LoggedInUser.UID,
                        'Content-Type': 'application/x-www-form-urlencoded'
                    }
                }).
                success(function (result, status, headers, config) {
                    if (result != null) {
                        DataStorage.SetItem(lookupname, result.Value);
                        if (callBack) {
                            callBack(result.Value);
                        }
                        else 
                            return result.Value;
                    }
                })
                .error(function (result, status, headers, config) {
                    CommonFunctions.OpenAlertBox('Alert', [{ message: "Error accessing lookup data. " + ' Error Message: ' + result.Message}], null);
                });
            }
            else {
                if (callBack) {
                    callBack(lookupData);
                }
                else {
                    return lookupData;
                }
            }
        };

        getValueByKey = function (lookupType, key) {
            if (!key) return { Text: "", IsShownUI: false, Value: "" };

            var lookupData = getLookUp(lookupType);

            var valueofItem = jQuery.grep(lookupData, function (a) { return a.Value === key.trim(); });

            if ((!valueofItem) || valueofItem.length === 0) {
                key = key.toUpperCase();
                valueofItem = jQuery.grep(lookupData, function (a) { return a.Value === key.trim(); });
            }

            if ((!valueofItem) || valueofItem.length === 0) {
                key = key.toLowerCase();
                valueofItem = jQuery.grep(lookupData, function (a) { return a.Value === key.trim(); });
            }

            if (valueofItem != null && valueofItem != undefined && valueofItem.length > 0) {
                return valueofItem[0];
            }
            else {
                var lookupItem = {
                    Text: key,
                    IsShownUI: false,
                    Value: key
                }
                return lookupItem;
            }
        };

        getAllChildrenByParent = function (lookupType) {
            var lookupData = this.getLookUp(lookupType);
            var filteredChildren = [];
            $.each(lookupData.ChildLookup.LookupItems, function (key1, item) {
                if (item.IsShownUI === true) {
                    filteredChildren.push(item);
                }
            });

            return filteredChildren;
        };

        getParentChildinTemplate = function (lookupType) {
            var parentschilds = getParentChildLookUp(lookupType);
            var tempparentchild = [];
            // D-01321 : Added line below to fix null exception when app is deployed on iPad - contact recap screen does not load since look API is still in progress : HKP: 1/12/2016
            if (parentschilds && parentschilds.ParentLookup && parentschilds.ParentLookup.LookupItems) {
                $.each(parentschilds.ParentLookup.LookupItems, function (key, parent) {
                    if (parent.UID != null && parent.IsShownUI) {
                        var parentchilds = { Text: parent.Text, Value: parent.Value, UID: parent.UID, Children: [], ToolTip: parent.ToolTip };
                        $.each(parentschilds.ChildLookup.LookupItems, function (key, child) {
                            if (child.ParentLookupItemUID === parent.UID && child.IsShownUI) {
                                parentchilds.Children.push({ Text: child.Text, Value: child.Value, UID: child.UID, IsSelected: false });
                            }
                        });
                        tempparentchild.push(parentchilds);
                    }
                });
            }
            return tempparentchild;
        };

        getParentChildLookupData = function (lookupType) {
            var parentChild = getParentChildLookUp(lookupType);
            var tempparentchild = [];
            if (parentChild && parentChild.ParentLookup && parentChild.ParentLookup.LookupItems) {
                $.each(parentChild.ParentLookup.LookupItems, function (key, parent) {
                    if (parent.UID != null && parent.IsShownUI) {
                        var parentchilds = { Text: parent.Text, Value: parent.Value, UID: parent.UID, Children: [], ToolTip: parent.ToolTip };
                        $.each(parentChild.ChildLookup.LookupItems, function (key, child) {
                            if (child.ParentLookupItemUID === parent.UID && child.IsShownUI) {
                                parentchilds.Children.push({ Text: child.Text, Value: child.Value, UID: child.UID, IsSelected: false });
                            }
                        });

                        if (parentchilds.Children && parentchilds.Children.length > 0) {
                            parentchilds.Children.splice(0, 0, {
                                "IsSelected": true,
                                "UID": "",
                                "Text": "Select a value",
                                "Value": ""
                            });
                        }
                       
                        tempparentchild.push(parentchilds);
                    }
                });

                tempparentchild.splice(0, 0, {
                    "Children": [],
                    "ParentLookUpItemUID": "",
                    "Text": "Select a value",
                    "Value": ""
                });
            }
            return tempparentchild;
        };

        getLookupWithoutSelectValue = function (lookupType) {

            var lookupData = getLookUp(lookupType);
            if (lookupData != undefined) {
                lookupData.shift();
            }
            else {
                lookupData = [];
            }
            return lookupData;
        };
        isEmpty = function isEmpty(obj) {

            // null and undefined are "empty"
            if (obj == null) return true;

            // Assume if it has a length property with a non-zero value
            // that that property is correct.
            if (obj.length > 0) return false;
            if (obj.length === 0) return true;

            // Otherwise, does it have any properties of its own?
            // Note that this doesn't handle
            // toString and valueOf enumeration bugs in IE < 9
            for (var key in obj) {
                if (hasOwnProperty.call(obj, key)) return false;
            }

            return true;
        };
        getLookupDisplay = function (lookupType, sortProperty) {
            var lookup = getLookUp(lookupType);
            if (isEmpty(lookup))
                lookup = undefined;
            else {
                var result = {}, i = null,
                    destinationArray = [];
                for (i in lookup) {
                    if (lookup.hasOwnProperty(i) && lookup[i].IsShownUI === true) {
                        result[i] = lookup[i];
                        if (sortProperty) {
                            destinationArray.push(lookup[i]);
                        }
                    }
                }
                if (sortProperty) {
                    destinationArray.sort(function (a, b) {
                        if (a[sortProperty] < b[sortProperty]) return -1;
                        if (a[sortProperty] > b[sortProperty]) return 1;
                        return 0;
                    });
                    result = $.extend({}, destinationArray);
                }
                if (result) {
                    lookup = result;
                }
            }
            return lookup;
        };

        return {
            GetLookUp: getLookUp,
            GetParentChildLookUp: getParentChildLookUp,
            GetParentChildLookupData : getParentChildLookupData,
            GetValueByKey: getValueByKey,
            GetAllChildrenByParent: getAllChildrenByParent,
            GetParentChildinTemplate: getParentChildinTemplate,
            GetLookupWithoutSelectValue: getLookupWithoutSelectValue,
            GetLookupDisplay: getLookupDisplay
        };

    });
} ());