(function() {
    'use strict';

    angular.module('DGSApp')
        .controller('DashboardController', ["$scope", "$state", "DataService", "FlashService", "ENV","$rootScope", function($scope, $state, DataService, FlashService, ENV,$rootScope) {
            $rootScope.loading = false;

            $scope.initController = function() {
                  $rootScope.loading = true;
                  FlashService.Clear();
                DataService.GetDashboradData(localStorage.custId,false)
                    .then(function(response) {
                           $rootScope.loading = false;
                        if (response.success) {
                         
                            $scope.datsboardObj = response.responseData;
                            $scope.datsboardObj.currentDate= $scope.datsboardObj.currentDate ? $scope.datsboardObj.currentDate : new Date().toString();
                  
                            $scope.initGuageData($scope.datsboardObj);

                        } else {
                            FlashService.Error(response);
                           $rootScope.loading = false;


                        }
                    },function(error){
                        FlashService.Error(ENV.messages.UNKNOWN_ERROR);
                           $rootScope.loading = false;
                          //  $state.go("login");


                    });
            };
            $scope.refreshChart = function(rawData) {

                $scope.initGuageData(rawData)
            };

            $scope.initGuageData = function(datsboardObj) {
                 var CHART_SUBTITLE_POS="0";
                 var CHART_MARGIN_TOP=0;
                if(screen.availWidth>320){
                     CHART_SUBTITLE_POS=170;
                     CHART_MARGIN_TOP="43%"
                 }
                else{
                      CHART_SUBTITLE_POS=120;
                        CHART_MARGIN_TOP="41%"
                  }
              // var rawData =80,
              
            
            var consumptionDisplayData=parseFloat(datsboardObj.Consumption).toFixed(2),
            maxConsumption=datsboardObj.MaxConsumption,
            consumptionData=(consumptionDisplayData/maxConsumption)*100,
                    data = getData(consumptionData);
                    console.log(consumptionData);
                var i = 0;

                function getData(rawData) {
                   // rawData=80;
                    var data = [],
                        start = Math.round(Math.floor(rawData / 10) * 10);
                    data.push(rawData);
                    for (i = start; i > 0; i -= 10) {
                        data.push({
                            y: i
                        });
                    }
                    return data;
                }

                Highcharts.chart('guage-container', {
                    chart: {
                        type: 'solidgauge',
                        marginTop: 10
                    },
                    credits:false,

                    title: {
                        text: ''
                    },

                    subtitle: {
                        text: '<div class="cons-cont"><div class="cons-text">Consumption Charge</div><br><div class="cons-text-2"> Cons</div><br><div class="cons-value">' + consumptionDisplayData + 'kWh $'+parseFloat(datsboardObj.Charge).toFixed(2)+'</div></div>',

                        y: CHART_SUBTITLE_POS,
                        zIndex: 7
                    },

                    tooltip: {
                        enabled: false
                    },

                    pane: [{
                        startAngle: -120,
                        endAngle: 120,
                        background: [{ // Track for Move
                            outerRadius: '100%',
                            innerRadius: '80%',
                            backgroundColor: Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0.3).get(),
                            borderWidth: 0,
                            shape: 'arc'
                        }],
                        size: '80%',
                        center: ['50%', CHART_MARGIN_TOP]
                    }, {
                        startAngle: -120,
                        endAngle: 120,
                        size: '80%',
                        center: ['50%', CHART_MARGIN_TOP],
                        background: [{
                            backgroundColor: ('#00152a')
                        }]
                    }],

                    yAxis: [{
                        min: 0,
                        max: 100,
                        lineWidth: 1,
                        lineColor: 'white',
                        tickInterval: 1,
                        labels: {
                            enabled: false
                        },
                        minorTickWidth: 0,
                        tickLength: 30,
                        tickWidth: 1,
                        tickColor: '#4c5155',
                        zIndex: 6,
                          plotBands: [{
            from: 0,
            to: 100,
            thickness:30,
            color: '#4c5155' // green
        }],
                     
                   stops: [
        [0, '#3fd213'],
        [0.101, '#3fd213'],
        [0.201, '#3fd213'],
        [0.301, '#3fd213'],
        [0.401, '#f6c102'],
        [0.501, '#f6c102'],
        [0.601, '#f6c102'],
        [0.701, '#f6c102'],
        [0.801, '#fa1b04'],
        [0.901, '#fa1b04'],
        [1, '#fa1b04']
      ]
                    }, {
                        linkedTo: 0,
                        pane: 1,
                        lineWidth: 5,
                        lineColor: '#00152a',
                        tickPositions: [],
                        zIndex: 6
                    }],

                    series: [{
                        animation: true,
                        dataLabels: {
                            enabled: false
                        },
                        borderWidth: 0,
                        color: Highcharts.getOptions().colors[0],
                        radius: '100%',
                        innerRadius: '80%',
                        data: data
                    }]
                });
            };
             $scope.initController();
            

        }]);
})();