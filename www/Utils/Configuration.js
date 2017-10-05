(function () {
    angular.module('roundingModule').factory('Configuration', function (AppConstants) {
        var serviceUrl = null;
        var baseServiceUrl = null;
        var setServiceUrl = function (bundleId) {
            if (bundleId) {
                switch (bundleId) {
                    case AppConstants.BundleID.LOCAL:
                        baseServiceUrl = AppConstants.BaseServiceUrl.LOCAL;
                        serviceUrl = AppConstants.Env.LOCAL;
                        break;

                    case AppConstants.BundleID.DEV:
                        baseServiceUrl = AppConstants.BaseServiceUrl.DEV;
                        serviceUrl = AppConstants.Env.DEV;
                        break;

                    case AppConstants.BundleID.SYS:
                        baseServiceUrl = AppConstants.BaseServiceUrl.SYS;
                        serviceUrl = AppConstants.Env.SYS;
                        break;

                    case AppConstants.BundleID.DEV2:
                        baseServiceUrl = AppConstants.BaseServiceUrl.DEV;
                        serviceUrl = AppConstants.Env.DEV2;
                        break;

                    case AppConstants.BundleID.SYS2:
                        baseServiceUrl = AppConstants.BaseServiceUrl.SYS;
                        serviceUrl = AppConstants.Env.SYS2;
                        break;

                    case AppConstants.BundleID.TRAIN:
                        baseServiceUrl = AppConstants.BaseServiceUrl.TRAIN;
                        serviceUrl = AppConstants.Env.TRAIN;
                        break;

                    case AppConstants.BundleID.STAGE:
                        baseServiceUrl = AppConstants.BaseServiceUrl.STAGE;
                        serviceUrl = AppConstants.Env.STAGE;
                        break;

                    case AppConstants.BundleID.STAGE2:
                        baseServiceUrl = AppConstants.BaseServiceUrl.PROD;
                        serviceUrl = AppConstants.Env.STAGE2;
                        break;

                    case AppConstants.BundleID.PROD:
                        baseServiceUrl = AppConstants.BaseServiceUrl.PROD;
                        serviceUrl = AppConstants.Env.PROD;
                        break;

                    default:
                        baseServiceUrl = AppConstants.BaseServiceUrl.DEV;
                        serviceUrl = AppConstants.Env.DEV;
                }                
            }
            else if (!serviceUrl) { // means a service url is not defined declaratively. so take the domain name and append the common serivce url end points. 

                serviceUrl = location.protocol + "//" + location.host;
                var url;

                if (location.href.indexOf("#") !== -1) {
                    url = location.href.substr(0, location.href.indexOf("#")).toLowerCase();
                }
                else {
                    url = location.href.toLowerCase();
                }

                //only stage and Prod has same server so just change for stage rest all goes 
                //same for service url + api folder
                if (url.indexOf('localhost') !== -1) { //for testing and debugging purpose
                    serviceUrl = AppConstants.Env.DEV;
                }
                else if (url.indexOf('stagecrd') !== -1) {  // Old Stage same on Production server
                    serviceUrl = serviceUrl + AppConstants.BaseApiFolder.STAGE2;
                }
                else if (url.indexOf('capellawebtrain') !== -1) { //new change for Train Server
                    serviceUrl = serviceUrl + AppConstants.BaseApiFolder.TRAIN;
                }
                else if (url.indexOf('crd2') !== -1) { //for future release 
                    serviceUrl = serviceUrl + AppConstants.BaseApiFolder.COMMON2;
                }
                else {
                    serviceUrl = serviceUrl + AppConstants.BaseApiFolder.COMMON;   //Current Release DEV, SYS, NEW STAGE and PROD
                }
            }
        },

        getServiceUrl = function () {
             return serviceUrl;        
        },

        getBaseServiceUrl = function () {
            return baseServiceUrl;
        },

        getCurrentAppEnvironment = function () {
            var serviceUrl = getServiceUrl();

            if (serviceUrl.toLowerCase().indexOf('localhost') !== -1) {
                baseServiceUrl = AppConstants.BaseServiceUrl.LOCAL;
                return AppConstants.EnvName.LOCAL;
            }
            else if (serviceUrl.toLowerCase().indexOf(AppConstants.BaseServiceUrl.DEV) !== -1) {
                baseServiceUrl = AppConstants.BaseServiceUrl.DEV;
                return AppConstants.EnvName.DEV;
            }
            else if (serviceUrl.toLowerCase().indexOf(AppConstants.BaseServiceUrl.SYS) !== -1) {
                baseServiceUrl = AppConstants.BaseServiceUrl.SYS;
                return AppConstants.EnvName.SYS;
            }
            else if (serviceUrl.toLowerCase().indexOf(AppConstants.BaseServiceUrl.TRAIN) !== -1) {
                baseServiceUrl = AppConstants.BaseServiceUrl.TRAIN;
                return AppConstants.EnvName.TRAIN;
            }
            else if (serviceUrl.toLowerCase().indexOf(AppConstants.BaseServiceUrl.STAGE) !== -1) {
                 baseServiceUrl = AppConstants.BaseServiceUrl.STAGE;
                 return AppConstants.EnvName.STAGE;
            }
            else if (serviceUrl.toLowerCase().indexOf(AppConstants.BaseServiceUrl.PROD) !== -1) {
                baseServiceUrl = AppConstants.BaseServiceUrl.PROD;
                if (serviceUrl.toLowerCase().indexOf('stagecrdapi') !== -1) {
                    return AppConstants.EnvName.STAGE;
                } else {
                    return AppConstants.EnvName.PROD;
                }
            }

            return "Unknown Server";            
        }

        return {
            GetServiceUrl: getServiceUrl,
            SetServiceUrl: setServiceUrl,
            GetBaseServiceUrl: getBaseServiceUrl,
            GetCurrentAppEnvironment: getCurrentAppEnvironment
        }
    });
}());
