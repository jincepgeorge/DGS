angular.module('DGSApp.services')
.service('FlashService',['$rootScope', function($rootScope){


    initService = function(username, password, callback){
        $rootScope.$on('$stateChangeStart', function () {
                clearFlashMessage();
            });
 
    };
    
    clearFlashMessage = function(username, password, callback){
          var flash = $rootScope.flash;
                if (flash) {
                    if (!flash.keepAfterLocationChange) {
                        delete $rootScope.flash;
                    } else {
                        // only keep for a single location change
                        flash.keepAfterLocationChange = false;
                    }
                }
    };
     
    this.Success = function(message, keepAfterLocationChange){
         $rootScope.flash = {
                message: message,
                type: 'success', 
                keepAfterLocationChange: keepAfterLocationChange
            };
    }; 
    
    this.Error = function(message, keepAfterLocationChange){
          $rootScope.flash = {
                message: message,
                type: 'error',
                keepAfterLocationChange: keepAfterLocationChange
            };
    };
    this.Clear = function(){
         clearFlashMessage();
    };
     initService();                     

}]);

