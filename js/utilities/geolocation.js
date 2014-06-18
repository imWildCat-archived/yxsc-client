/**
 * Geolocation - Geolocation.*
 * 地理信息工具
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-18
 */
(function () {
    angular.module('app.utilities.Geolocation', []).service('Geolocation', ['$q', 'toaster', function ($q, toaster) {
        var Geolocation = {};

        /**
         * 四校区坐标
         * @type {*[]}
         * @private
         */
        var _campusLocation = [
            [117.075821, 36.650727], // 燕山
            [117.02658 , 36.631137], // 舜耕
            [117.380621, 36.677093], // 圣井
            [117.516367, 36.664284]  // 明水
        ];

        /**
         * 获取校区ID: 1 - 燕山; 2 - 舜耕； 3 - 圣井; 4 - 明水.
         * @returns {promise|*}
         */
        Geolocation.getCampus = function () {
            var deferred = $q.defer();
            navigator.geolocation.getCurrentPosition(function (position) {
                var _locationGaps = [];

                var _latitude = position.coords.latitude;
                var _longitude = position.coords.longitude;

                // 遍历4校区位置数组
                for (var i = 0; i < _campusLocation.length; i++) {
                    var gap = Math.pow((_campusLocation[i][0] - _longitude), 2)
                        + Math.pow((_campusLocation[i][1] - _latitude ), 2);
                    // gap = x^2 + y^2 , 勾股定理 ＝。＝
                    _locationGaps.push(gap);
                }

                // 计算最小值
                var _minimum = Math.min(_locationGaps[0], _locationGaps[1], _locationGaps[2], _locationGaps[3]);

                for (var i = 0; i < _locationGaps.length; i++) {
                    if (_locationGaps[i] === _minimum) {
                        deferred.resolve(i + 1); // 返回校区ID
                    }
                }
            }, function (error) {
                // 如果获取经纬度时出错, 提示错误
                toaster.pop('error','无法获取您的地理位置','请检查您是否禁止本应用获取您的当前位置');
                deferred.reject(error);
            });
            return deferred.promise;
        };

        return Geolocation;
    }]);
})();


// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
//var onSuccess = function (position) {
//    alert('Latitude: ' + position.coords.latitude + '\n' +
//        'Longitude: ' + position.coords.longitude + '\n' +
//        'Altitude: ' + position.coords.altitude + '\n' +
//        'Accuracy: ' + position.coords.accuracy + '\n' +
//        'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
//        'Heading: ' + position.coords.heading + '\n' +
//        'Speed: ' + position.coords.speed + '\n' +
//        'Timestamp: ' + position.timestamp + '\n');
//};
//
//// onError Callback receives a PositionError object
////
//function onError(error) {
//    alert('code: ' + error.code + '\n' +
//        'message: ' + error.message + '\n');
//}
//
//navigator.geolocation.getCurrentPosition(onSuccess, onError);