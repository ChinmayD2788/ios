
(function () {
      /**
        * @ngdoc controller
        * @name roundingModule.controller:ReloadController
        * @description
        * Controller Name: ReloadController
        * VersionOne Requirements <a href="https://www13.v1host.com/DaVitaInc/Task.mvc/Summary?oidToken=Task%3A328784">TK-28510</a> 
        * Get the data in local variable pane and navigate to reload the page. 
        * @property {object} pane store data  
        */
     angular.module('roundingModule').controller('ReloadController', function($scope, $rootScope, $timeout)
  {
      var pane = $("#ptchart-splitview-main-pan").data("kendoMobilePane");
      $timeout(function () {
          pane.navigate($rootScope.Global.Objects.ReloadPage);
      }, 0, false);


    });
} ());