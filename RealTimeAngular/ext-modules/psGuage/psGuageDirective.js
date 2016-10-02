'use strict';

angular.module('psGuage').directive('psGuage', ['psWebmetricsService', function (psWebmetricsService) {
    return {
        templateUrl: 'ext-modules/psGuage/psGuageTemplate.html',
        scope: {
            metric: '@metric'
        },
        link: function (scope, el, attrs) {

            scope.initialized = false;
            scope.title = psWebmetricsService.getTitle(scope.metric);
            scope.options = {
                width: 200, height: 120,
                redFrom: 90, redTo: 100,
                yellowFrom: 75, yellowTo: 90,
                minorTicks: 5
            };


            scope.$on('psWebmetricsService-received-data-event', function (event, data) {

                if (!scope.initialized) {
                    scope.data = google.visualization.arrayToDataTable([
                        ['Label', 'Value'],
                        [scope.title, 0]
                    ]);

                    scope.chart = new google.visualization.Gauge(el[0]);
                    scope.initialized = true;
                }
                scope.data.setValue(0, 1, Math.round(data[scope.metric]));
                scope.chart.draw(scope.data, scope.options);
            });

        }
    }
}]);
