(function () {
    angular.module('roundingModule')
    .controller('IndexController', function ($scope, Configuration, $rootScope, CommonFunctions, RouteConstants, CommonMessages)
    /**
    * @ngdoc controller
    * @name roundingModule.controller:IndexController
    * @description 
    ** Controller for Index View
    ** Called when the app loads/initializes
    */
    {
        /**
        * @ngdoc function 
        * @name setDeviceHeight
        * @methodOf roundingModule.controller:IndexController
        * @param {number} width width of the device
        * @description 
        * Sets $rootScope.Global.Objects.DeviceHeight property from width
        */
        $scope.setDeviceHeight = function (height) {
            $rootScope.Global.Objects.DeviceHeight = height;
        }

        /**
        * @ngdoc function 
        * @name initialize
        * @methodOf roundingModule.controller:IndexController
        * @description 
        ** Called first when Index view loads
        ** Intializes the app
        ** Calls Configuration.SetServiceUrl
        ** Calls $scope.bindEvents
        ** Navigates to Login Screen                 
        */        
        $scope.initialize = function () {
            if (CommonFunctions.IsRunningOnPhoneGap()) {
                $scope.bindEvents();
            } else {                
                $scope.setDeviceHeight($(window).height());
                Configuration.SetServiceUrl(null);                
                CommonFunctions.NonProdEnvAlert();              
                kendo.mobile.application.navigate(RouteConstants.Login);
            }
        }

        /**
        * @ngdoc event 
        * @name bindEvents
        * @eventOf roundingModule.controller:IndexController
        * @description         
        * Binds 'deviceready' event
        */
        $scope.bindEvents = function () {
            document.addEventListener("deviceready", $scope.onDeviceReady, false);
        }

        /**
        * @ngdoc function 
        * @name initializeMobileApp
        * @methodOf roundingModule.controller:IndexController
        * @param {string} result app bundle identifier
        * @description 
        ** Callback function of window.wizUtils.getBundleIdentifier
        ** Calls Configuration.SetServiceUrl to load APIs based on the environment
        ** Displays NonProdEnvAlert popup      
        ** Navigates to Login Screen
        */
        $scope.initializeMobileApp = function (result) {
            Configuration.SetServiceUrl(result);
            CommonFunctions.NonProdEnvAlert();           
            kendo.mobile.application.navigate(RouteConstants.Login);
        }

        /**
        * @ngdoc function 
        * @name failure
        * @methodOf roundingModule.controller:IndexController        
        * @description 
        ** Callback function of window.wizUtils.getBundleIdentifier
        ** Callback function of window.wizUtils.getDeviceWidth
        ** Displays alert in case of failure        
        */
        $scope.failure = function () {
            alert("App Start Failed!");
        }
     
        /**
        * @ngdoc event 
        * @name onDeviceReady
        * @eventOf roundingModule.controller:IndexController
        * @description 
        ** Calls window.wizUtils.getBundleIdentifier
        ** Calls window.wizUtils.getDeviceWidth
        ** Binds phonegap events which are required 'pause', 'resume', 'offline'
        */
        $scope.onDeviceReady = function () {
            //$scope.receivedEvent('deviceready');
            if (!window.wizUtils) {
                alert("Could not find wizUtils");
            }
            else {
                window.wizUtils.getBundleIdentifier($scope.initializeMobileApp, $scope.failure);
                //for device orientation get width and make it height
                window.wizUtils.getDeviceHeight($scope.setDeviceHeight, $scope.failure);
            }

            document.addEventListener("pause", function () {
                $rootScope.Global.Objects.IsAppPaused = true;
            }, false);

            //resume event will be invoked when the app comes out of suspension mode.
            document.addEventListener("resume", function () {
                $rootScope.Global.Objects.IsAppPaused = false;
                //Call UpdateClientSessionTimeout to increase session timeout if its not expired yet or force client logout if its already expired.
                //the function is called using timeout; otherwise app might hang in iOS.
                setTimeout(function () {
                    $rootScope.Global.Functions.tap();
                }, 0);
            }, false);

            document.addEventListener("offline", function onOffline() {
                $rootScope.$broadcast('UserLoggingOut', { any: {} });
                appLogoutWithoutConfirmation(CommonMessages.NetworkUnavailableMsg);     
            }, false);
        }

        /**
        * @ngdoc event 
        * @name receivedEvent
        * @eventOf roundingModule.controller:IndexController
        * @description 
        ** Updates DOM on a Received Event
        */
        $scope.receivedEvent = function (id) {
            var parentElement = document.getElementById(id);
            var listeningElement = parentElement.querySelector('.listening');
            var receivedElement = parentElement.querySelector('.received');

            listeningElement.setAttribute('style', 'display:none;');
            receivedElement.setAttribute('style', 'display:block;');

            console.log('Received Event: ' + id);
        }

        $scope.initialize();

    });
} ());


