/**
 * 应用初始化 与 路由
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-11
 */

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
(function () {
    const TEMPLATES_DIR = 'templates/';

    angular.module('sdufe-client', ['ionic',
        'app.controllers',
        'app.controllers.user'])

        .run(function ($ionicPlatform) {
            $ionicPlatform.ready(function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    // org.apache.cordova.statusbar required
                    StatusBar.styleDefault();
                }
            });
        })

        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                .state('app', {
                    url: "/app",
                    abstract: true,
                    templateUrl: "templates/menu.html",
                    controller: 'AppCtrl'
                })

                .state('app.search', {
                    url: "/search",
                    views: {
                        'menuContent': {
                            templateUrl: "templates/search.html"
                        }
                    }
                })


                .state('app.index', {
                    url: '/index',
                    views: {
                        'menuContent': {
                            templateUrl: 'templates/index.html'
                        }
                    }
                })

                .state('app.browse', {
                    url: "/browse",
                    views: {
                        'menuContent': {
                            templateUrl: "templates/browse.html"
                        }
                    }
                })
                .state('app.playlists', {
                    url: "/playlists",
                    views: {
                        'menuContent': {
                            templateUrl: "templates/playlists.html",
                            controller: 'PlaylistsCtrl'
                        }
                    }
                })

                .state('app.single', {
                    url: "/playlists/:playlistId",
                    views: {
                        'menuContent': {
                            templateUrl: "templates/playlist.html",
                            controller: 'PlaylistCtrl'
                        }
                    }
                });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/index');
        })

        .config(function ($stateProvider) {
            const USER_TEMPLATES_DIR = TEMPLATES_DIR + 'user/';
            $stateProvider
                .state('user', {
                    url: "/user",
                    abstract: true,
                    templateUrl: "templates/menu.html",
                    controller: 'AppCtrl'
                })

                .state('user.index', {
                    url: '/index',
                    views: {
                        'menuContent': {
                            templateUrl: USER_TEMPLATES_DIR + 'index.html',
                            controller: 'User.TestCtrl'
                        }
                    }
                })

                .state('user.reg', {
                    url: '/reg',
                    views: {
                        menuContent: {
                            templateUrl: USER_TEMPLATES_DIR + 'reg.html',
                            controller: 'User.RegCtrl'
                        }
                    }
                })

            // if none of the above states are matched, use this as the fallback
//        $urlRouterProvider.otherwise('/user/index');
        });
})();

