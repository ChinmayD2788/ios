/**
* @fileOverview LogoutPopover documentation
* @author Amit Mistry
* @version 1.0
*/

(function () {
    angular.module('roundingModule').
        /**
		 * @ngdoc controller
		 * @name roundingModule.controller:LogoutPopoverController
		 * @description
		 ** Controller for Log Out Pop up window
         ** VersionOne Requirements - View Access - <a href="https://www13.v1host.com/DaVitaInc/Task.mvc/Summary?oidToken=Task%3A328561">TK-28503</a>
		 */        
        controller('LogoutPopoverController', function ($scope, CommonFunctions) {
        
            //var self = $scope;
        /**
         * @ngdoc event 
         * @name logout
         * @eventOf roundingModule.controller:LogoutPopoverController
         * @description
         ** AngularJS ng-click event:when little user icon clicked its opened popover window, user will select logout and clicked on event will fire .
         ** User will log out of the rounding application & the session will be closed.
         ** Calls "AppLogout" Common function.
         */
        $scope.logout = function () {            
            CommonFunctions.AppLogout();
            mixpanel.track("Logout");
        }               
    });
} ());