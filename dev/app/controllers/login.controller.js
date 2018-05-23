
(function () {
    'use strict';

    angular.module('DGSApp')
    .controller('LoginController', ["$scope", "$state",'FlashService','$rootScope','DataService','ENV', function($scope, $state,
         FlashService,$rootScope,DataService,ENV){
        $scope.appTitle=ENV.appTitle;

        $scope.login = function(){
            $rootScope.loading = true;
            DataService.ValidateUser({'userName':$scope.username,'password':$scope.password}).then(function(response){
                    $rootScope.loading = false;
                    if(response.success){
                        localStorage.custId=response.responseData.customerId;
                        $rootScope.userName=$scope.username;
                          $state.go("dashboard");
                      }else{
                         FlashService.Error(ENV.messages.INVALID_LOGIN);
                       
                      }
            },function(error){
                         FlashService.Error(ENV.messages.INVALID_LOGIN);
                         $rootScope.loading = false;

            });
        //     if($scope.username.toUpperCase()===ENV.userName.toUpperCase() && $scope.password.toUpperCase()===ENV.password.toUpperCase())
        //     $state.go("dashboard");
        // else{
        //     FlashService.Error(ENV.messages.INVALID_LOGIN);
        //       $rootScope.loading = false;
        // }

           
        };

    }]);

})();

