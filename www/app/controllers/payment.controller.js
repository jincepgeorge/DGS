!function(){"use strict";angular.module("DGSApp").controller("PaymentController",["$scope","$state","DataService","$rootScope","ENV","FlashService",function(a,o,t,e,n,r){a.currentTab="prePayment",a.viewPayentDetails=function(o){a.currentTab=o},a.makePayment=function(){e.loading=!0,a.datsboardObj?t.UpdateTopupAmount({customerId:a.datsboardObj.CustomerId,topUpAmount:a.topupAmount}).then(function(a){e.loading=!1,o.go("dashboard")},function(a){e.loading=!1,r.Error(n.messages.UNKNOWN_ERROR)}):(e.loading=!1,r.Error(n.messages.UNKNOWN_ERROR))},a.getDashBoardData=function(){r.Clear(),t.GetDashboradData(localStorage.custId,!0).then(function(o){o.success?a.datsboardObj=o.responseData:r.Error(n.messages.UNKNOWN_ERROR)},function(a){r.Error(n.messages.UNKNOWN_ERROR)})},e.showToggleMenu=!0,a.getDashBoardData()}])}();