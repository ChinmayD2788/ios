(function () {
    angular.module('roundingModule')
	.controller('AppUpgradeController', function ($scope, ExceptionService, CommonFunctions, Configuration)
	    /**
        * @ngdoc controller
        * @name roundingModule.controller:AppUpgradeController
        * @description 
        ** Controller for App Upgrade View        
        */
	{
	    // Commentted for ROUND-413
	    /**
        * @ngdoc function 
        * @name setInstallationUrl
        * @methodOf roundingModule.controller:AppUpgradeController
        * @description       
        ** Calls Configuration.GetBaseServiceUrl
        ** Sets up href of Upgrade Button in app upgrade view with app installation html page path
        */
	    //$scope.setInstallationUrl = function () {	        	              
	    //    var url = Configuration.GetBaseServiceUrl();
	    //    if (url.indexOf('villagehealthmobile') !== -1) {      //for Stage
	    //    	url = url + '/stagecrd/install/install.html';
	    //    }
	    //    else if (url.indexOf('capellawebtrain') !== -1) {
	    //        url = url + '/crd/install/install.html';  //new change for Train Server
	    //    }
	    //    else {  //for Dev and Sys
	    //    	url = url + '/crdangular/install/install.html';
	    //    }

	    //    $('#btnUpgrade').attr("href", url);
	    //}

	    //$scope.setInstallationUrl();	

	    /**
        * @ngdoc function 
        * @name setInstallationGuideUrl
        * @methodOf roundingModule.controller:AppUpgradeController
        * @description       
        ** Calls Configuration.GetBaseServiceUrl
        ** Sets up href of AppUpgradeDirection Button in app upgrade view with app installation document page path
        */
	    $scope.setInstallationGuideUrl = function () {
	        var url =  Configuration.GetBaseServiceUrl() + '/crd/install/UpdatingAppDirections.docx';
	        $('#btnUpgrade').attr("href", url);
	    }

	    $scope.setInstallationGuideUrl();
	});
} ());
  