
'use strict';

angular.module('psWebmetricsService', []).factory('psWebmetricsService', ['$rootScope', function ($rootScope) {

    var hub = $.connection.metricHub;
    hub.client.broadcastMessage = function (time, bandwidthPct, cpuPct, salesAmt, alphaSalesAmt, betaSalesAmt) {
        $rootScope.$broadcast('psWebmetricsService-received-data-event',
            {
                'time': time,
                'bandwidthPct': bandwidthPct,
                'cpuPct': cpuPct,
                'salesAmt': salesAmt,
                'alphaSalesAmt': alphaSalesAmt,
                'betaSalesAmt': betaSalesAmt
            });
    };

    $.connection.hub.start()
    .done()
    .fail(function (data) {
        alert(data);
    });

    var getTitle = function (metric) {
        switch (metric) {
            case 'bandwidthPct':
                return 'Bandwidth %';
            case 'cpuPct':
                return 'CPU %';            
        }
        return undefined;
    }

    return {
        getTitle: getTitle
    };

}]);