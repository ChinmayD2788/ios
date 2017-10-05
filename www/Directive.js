(function () {
    angular.module('roundingModule')    
    .directive('editPatientCarePlan', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/PathwaysView.html',
        };
    })
    .directive('pathwaysView', function () {
         return {
             restrict: 'E',
             templateUrl: 'views/PathwaysView.html',
         };
     })   
}());
