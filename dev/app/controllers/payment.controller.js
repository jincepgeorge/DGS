
(function () {
    'use strict';

    angular.module('DGSApp')
    .controller('PaymentController', ["$scope", "$state","DataService", "$rootScope","ENV","FlashService", function($scope, $state, DataService, $rootScope,ENV,FlashService){

	$scope.currentTab = "prePayment";
    $scope.viewPayentDetails = function(tab){
		$scope.currentTab = tab;
	};
	$scope.makePayment=function(){
		//$scope.topupAmount;
		  $rootScope.loading = true;
      if($scope.datsboardObj){
		//($scope.currentTab==='prePayment'? ($scope.datsboardObj.PrePaymentBalance = parseFloat($scope.datsboardObj.PrePaymentBalance)+ parseFloat($scope.topupAmount)):($scope.datsboardObj.CreditBalance =parseFloat($scope.datsboardObj.CreditBalance)+ parseFloat($scope.topupAmount)))
		DataService.UpdateTopupAmount({"customerId":$scope.datsboardObj.CustomerId,"topUpAmount":$scope.topupAmount}).then(
			function(respose){
				  $rootScope.loading = false;
				 $state.go("dashboard");
			},function(error){
				  $rootScope.loading = false;
				   FlashService.Error(ENV.messages.UNKNOWN_ERROR);
			}
			);
  }else{
    $rootScope.loading = false;
           FlashService.Error(ENV.messages.UNKNOWN_ERROR);
  }
		
	};
	$scope.getDashBoardData=function(){
		  FlashService.Clear();
		 DataService.GetDashboradData(localStorage.custId,true)
                    .then(function(response) {
                        if (response.success) {
                            $scope.datsboardObj = response.responseData;

                        } else {
                           
                             FlashService.Error(ENV.messages.UNKNOWN_ERROR);

                        }
                    },function(error){
       
           FlashService.Error(ENV.messages.UNKNOWN_ERROR);
      });
	};



		$rootScope.showToggleMenu = true;
		$scope.getDashBoardData();
}]);
})();
