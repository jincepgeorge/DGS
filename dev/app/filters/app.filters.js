angular.module('DGSApp.filters')
	.filter('encodeURIComponent', function() {
	    return window.decodeURIComponent;
	})
  .filter('to_trusted', ['$sce', function($sce){
      return function(text) {
          return $sce.trustAsHtml(text);
      };
  }])
	.filter('date_format', [ function(){
      return function(dt) {
				var month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
        var date = new Date(dt);
				return (date.getDate() + "-" + month[date.getMonth()] +"-" + date.getFullYear());
      };
  }]);
