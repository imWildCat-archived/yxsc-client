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
    const VIEWS_DIR = 'views/';

    angular.module('sdufe-client', ['ionic',
        'app.controllers',
        'app.controllers.User',
        'app.controllers.SchoolNews'])

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
                    templateUrl: "views/menu.html",
                    controller: 'AppCtrl'
                })

                .state('app.search', {
                    url: "/search",
                    views: {
                        'menuContent': {
                            templateUrl: "views/search.html"
                        }
                    }
                })


                .state('app.index', {
                    url: '/index',
                    views: {
                        'menuContent': {
                            templateUrl: 'views/index.html'
                        }
                    }
                })

                .state('app.browse', {
                    url: "/browse",
                    views: {
                        'menuContent': {
                            templateUrl: "views/browse.html"
                        }
                    }
                })
                .state('app.playlists', {
                    url: "/playlists",
                    views: {
                        'menuContent': {
                            templateUrl: "views/playlists.html",
                            controller: 'PlaylistsCtrl'
                        }
                    }
                })

                .state('app.single', {
                    url: "/playlists/:playlistId",
                    views: {
                        'menuContent': {
                            templateUrl: "views/playlist.html",
                            controller: 'PlaylistCtrl'
                        }
                    }
                });
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/index');
        })

        .config(function ($stateProvider) {
            const USER_VIEWS_DIR = VIEWS_DIR + 'user/';
            $stateProvider
                .state('user', {
                    url: "/user",
                    abstract: true,
                    templateUrl: "views/menu.html",
                    controller: 'AppCtrl'
                })

                .state('user.reg', {
                    url: '/reg',
                    views: {
                        menuContent: {
                            templateUrl: USER_VIEWS_DIR + 'reg.html',
                            controller: 'UserCtrl.Reg'
                        }
                    }
                })
        })

        .config(function ($stateProvider) {
            const SCHOOL_NEWS_VIEWS_DIR = VIEWS_DIR + 'school_news/';
            $stateProvider
                .state('schoolNews', {
                    url: "/schoolNews",
                    abstract: true,
                    templateUrl: "views/menu.html",
                    controller: 'AppCtrl'
                })
                .state('schoolNews.list', {
                    url: '/list',
                    views: {
                        menuContent: {
                            templateUrl: SCHOOL_NEWS_VIEWS_DIR + 'list.html',
                            controller: 'SchoolNewsCtrl.list'
                        }
                    }
                })
                .state('schoolNews.single', {
                    url:'/single/:id',
                    views: {
                        menuContent:{
                            templateUrl:SCHOOL_NEWS_VIEWS_DIR + 'single.html',
                            controller: 'SchoolNewsCtrl.single'
                        }
                    }
                })
        })
    ;

})();

