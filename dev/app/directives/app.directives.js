angular.module('DGSApp.directives')
.directive('flashmessage', function() {
        return {
            restrict: 'E',
             template: '<div ng-class="{ \'alert\': flash, \'alert-success\': flash.type === \'success\', \'alert-danger\': flash.type === \'error\' }" ng-if="flash" ng-bind="flash.message"></div>',
            link: function (scope, elem, attrs) {
               
            }
        };
    })
    .directive("loader", function() {
        return{
            restrict: "E",
            template: '<div class="loading"><img src="assets/images/loader.gif">',
            link: function(scope, elem, attrs){

            }
        };
    })
    .directive("header",['ENV', function(ENV) {
        return{
            controller:['$scope',function($scope){
                $scope.appTitle=ENV.appTitle;
				
				$scope.collapsed = true;
				$scope.openCollapseMenu = function(){
					$scope.collapsed = !$scope.collapsed;
				};
            }],
            restrict: "E",
            templateUrl: 'app/components/header/header.html',
            link: function(scope, elem, attrs){
				
            }
        };
   }]).directive('numbersOnly', function () {
     return {
      require: 'ngModel',
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
        function inputValue(val) {
          if (val) {
            var digits = val.replace(/[^0-9.]/g, '');

            if (digits.split('.').length > 2) {
              digits = digits.substring(0, digits.length - 1);
            }

            if (digits !== val) {
              ctrl.$setViewValue(digits);
              ctrl.$render();
            }
            return parseFloat(digits);
          }
          return undefined;
        }            
        ctrl.$parsers.push(inputValue);
      }
    };
});

 