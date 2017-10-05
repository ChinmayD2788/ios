(function () {
    angular.module('roundingModule').filter('formatPlacementDate', function ($filter, CommonFunctions) {
        return function (val) {
            var _date = (CommonFunctions.DateFunctions.dateFormat(CommonFunctions.DateFunctions.parseDate(val), "mm/dd/yy h:MM TT") + " PST");
            return _date;
        };
    });

    angular.module('roundingModule').filter('getLookupText', function ($filter, LookUp) {
        return function (val, lookupType) {
            return LookUp.GetValueByKey(lookupType, val).Text;
        };
    });
 
    angular.module('roundingModule').filter('unsafe', function ($sce) {
        return function (val) {
            return $sce.trustAsHtml(val);
        };
    });

    angular.module('roundingModule').filter('convertToLocalTime', function ($filter) {
        return function (utcDateString, format) {
            // return if input date is null or undefined
            if (!utcDateString) {
                return;
            }

            // append 'Z' to the date string to indicate UTC time if the timezone isn't already specified
            if (utcDateString.indexOf('Z') === -1 && utcDateString.indexOf('+') === -1) {
                utcDateString += 'Z';
            }

            // convert and format date using the built in angularjs date filter
            return $filter('date')(utcDateString, format);
        };
    });
} ());