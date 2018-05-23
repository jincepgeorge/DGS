angular.module('DGSApp.services')
    .service('DataService', ['$http', '$log', '$q', 'ENV','$filter', function($http, $log, $q, ENV,$filter) {


        this.GetDashboradData = function(custID,isOfflineReq) {
            var deferred = $q.defer();
            if (localStorage.dashboardData && isOfflineReq) {
                deferred.resolve({
                    success: true,
                    responseData: getDashboardData()
                });
            } else {
               // $http.get(ENV.keys.jsonUrl + ENV.keys.dashboardData)
                 $http.get(ENV.getCustomerDataAPI.replace("<custid>",custID))
                    .then(function(data) {
                        deferred.resolve({
                            success: true,
                            responseData: data.data
                        });
                        setDashboardData(data.data);
                    }, function(msg, code) {
                        deferred.reject(msg);
                        $log.error(msg);
                    });
            }

            return deferred.promise;

        };

          this.ValidateUser = function(userObj) {
            var deferred = $q.defer();
            $http.get(ENV.keys.jsonUrl + ENV.keys.employeelist)
                    .then(function(response) {

                        var filteredUser = $filter('filter')(response.data, userObj,true)[0];
                        if(filteredUser){
                        deferred.resolve({
                            success: true,
                            responseData: filteredUser
                        });
                    }else{
                         deferred.resolve({
                            success: false,
                            responseData: ENV.messages.INVALID_LOGIN
                        });
                    }
                    }, function(msg, code) {
                        deferred.reject(msg);
                        $log.error(msg);
                    });
            

            return deferred.promise;

        };
        this.UpdateTopupAmount = function(updatedObj) {
              var deferred = $q.defer();
                         $http({
                    url: ENV.makePaymentAPI,
                    method: "POST",
                    data: updatedObj
                })
                .then(function(response) {
                        // success
                         deferred.resolve({
                            success: true,
                            responseData: response
                        });
                }, 
                function(msg, code)  { // optional
                        // failed
                         deferred.reject(msg);
                        $log.error(msg);
                });
            //setDashboardData(updatedObj);
            return deferred.promise;
        };

        var setDashboardData = function(dashboardData) {
            localStorage.dashboardData = JSON.stringify(dashboardData);
        };
        var getDashboardData = function() {
            if (!localStorage.dashboardData) {
                localStorage.dashboardData = JSON.stringify([]);
            }
            return JSON.parse(localStorage.dashboardData);
        };

    }]);