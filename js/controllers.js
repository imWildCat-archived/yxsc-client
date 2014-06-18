angular.module('app.controllers', ['app.utilities.Geolocation','app.utilities.Preferences'])

    .controller('AppCtrl', function ($scope) {
    })

    .controller('PlaylistsCtrl', function ($scope) {
        $scope.playlists = [
            { title: 'Reggae', id: 1 },
            { title: 'Chill', id: 2 },
            { title: 'Dubstep', id: 3 },
            { title: 'Indie', id: 4 },
            { title: 'Rap', id: 5 },
            { title: 'Cowbell', id: 6 }
        ];
    })

    .controller('PlaylistCtrl', function ($scope, $location, $stateParams) {
        console.log($stateParams);
        $location.path('/index');
    })

    .controller('TestCtrl', function ($scope,Preferences, $location, $stateParams, Geolocation) {
//        console.log($stateParams);

    Preferences.set('saads',{dsad:23231});

//        console.log($localStorage.test);

        $scope.test = function () {

            Geolocation.getCampus().then(function (data) {
//                console.log('校区: '+data);
            },function(error){
//                console.log(error);
            });

// onSuccess Callback
//   This method accepts a `Position` object, which contains
//   the current GPS coordinates
//
//            var onSuccess = function (position) {
//                alert('Latitude: ' + position.coords.latitude + '\n' +
//                    'Longitude: ' + position.coords.longitude + '\n' +
//                    'Altitude: ' + position.coords.altitude + '\n' +
//                    'Accuracy: ' + position.coords.accuracy + '\n' +
//                    'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
//                    'Heading: ' + position.coords.heading + '\n' +
//                    'Speed: ' + position.coords.speed + '\n' +
//                    'Timestamp: ' + position.timestamp + '\n');
//            };

// onError Callback receives a PositionError object
//
//            function onError(error) {
//                alert('code: ' + error.code + '\n' +
//                    'message: ' + error.message + '\n');
//            }
//
//            navigator.geolocation.getCurrentPosition(onSuccess, onError);
        };
    })
;
