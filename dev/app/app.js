
(function () {
    'use strict';


angular.module('DGSApp.services', []);
angular.module('DGSApp.directives', []);
angular.module('DGSApp.filters', []);


    angular.module('DGSApp', [
        'ui.router',
        'config',
        'DGSApp.services',
        'DGSApp.directives',
        'DGSApp.filters'
    
        ])
    .run(['$rootScope','$state','$window',function($rootScope,$state,$window) {
         FastClick.attach(document.body);
         document.addEventListener("deviceready", function() {
            document.addEventListener("backbutton", function (e) {
                  if($state.current.name==='login')
                         $window.navigator.app.exitApp();
                    else
                         $window.history.back();
                console.log($state.current.name);
              }, false);

}, false);

          $rootScope.$on('$stateChangeStart', function () {
                  $rootScope.loading = false;
            });

    }]);

})();