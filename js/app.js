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
    const COMMON_VIEWS_DIR = VIEWS_DIR + 'common/no_menu.html';

    angular.module('sdufe-client', [
        'ionic',
        'toaster',
        'app.utilities.Geolocation',
        'app.utilities.Preferences',
        'app.services.User',
        'app.controllers.App',
        'app.controllers.Map',
        'app.controllers.User',
        'app.controllers.SchoolNews',
        'app.controllers.Topic'
    ])

//        // 实现换行功能
//        .filter('newlines', function () {
//            return function (text) {
//                if (text)
//                    return text.replace(/\n/g, '<br />');
//                else return text;
//            }
//        })

        // 自定义markdown， 实现如图片显示的功能
        .filter('miniMarkdown', function () {
            return function (text) {
                if (text) {
                    // 集成换行
                    text = text.replace(/\n/g, '<br />');
                    // 处理图片
                    return text.replace(/!\[img\]\((http:\/\/i[0-9]\.tietuku\.com\/\w+\.jpg)\)/gi, '<img class="content-img" src="$1" />');
                } else {
                    return text;
                }
            }
        })

        // 头像uri filter
        .filter('avatarUri', function () {
            return function (text) {
                if (text)
                    return text;
                else return 'img/no_avatar.png';
            }
        })

        .filter('campusName', function () {
            return function (text) {
                text = parseInt(text);
                switch (text) {
                    case 1:
                        return '燕山';
                    case 2:
                        return '舜耕';
                    case 3:
                        return '圣井';
                    case 4:
                        return '明水';
                    default :
                        return '未知校区';
                }
            }
        })

        .filter('genderName', function () {
            return function (text) {
                console.log('gender:' + text);
                if (text) {
                    return '学长';
                } else {
                    return '学妹';
                }
            }
        })
//        .filter('safeHTML', function () {
//            return function(text) {
//                return text.replace(/\n/g, '<br/>');
//            }
//        })
//        .filter('noHTML', function () {
//            return function(text) {
//                return text
//                    .replace(/&/g, '&amp;')
//                    .replace(/>/g, '&gt;')
//                    .replace(/</g, '&lt;');
//            }
//        })

        .run(function ($ionicPlatform, toaster, UserService, Preferences, Geolocation) {
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

                /**
                 * 初始化当前校区
                 * @private
                 */
                var _initCurrentCampus = function () {
                    Geolocation.getCampus().then(function (campus) {
                        UserService.clientData.currentCampus = campus;

                        // 配置地图校区
                        if (!Preferences.get('map_campus')) {
                            Preferences.set('map_campus', campus);
                        }
                    });
                };
                _initCurrentCampus();

                // 隐藏加载图像
                if (cordova) {
                    setTimeout(function () {
                        cordova.require('org.apache.cordova.splashscreen.SplashScreen').hide();
                    }, 1000);
                }
            });
        })

        .config(function ($stateProvider, $urlRouterProvider) {
            $stateProvider

                .state('app', {
                    url: "/app",
                    abstract: true,
                    templateUrl: VIEWS_DIR + 'menu.html'
                })

                .state('app.lost', {
                    url: '/topic_list/:type',
                    views: {
                        menuContent: {
                            templateUrl: 'views/topic/list.html',
                            controller: 'TopicCtrl.list'
                        }
                    }
                })

                .state('app.index', {
                    url: '/index',
                    views: {
                        'menuContent': {
                            templateUrl: 'views/index.html',
                            controller: 'AppCtrl.Index'
                        }
                    }
                })

                .state('app.map', {
                    url: '/map',
                    views: {
                        menuContent: {
                            templateUrl: 'views/map/index.html',
                            controller: 'MapCtrl.Index'
                        }
                    }
                })

            ;
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/app/index');
        })

        .config(function ($stateProvider) {
            const USER_VIEWS_DIR = VIEWS_DIR + 'user/';
            $stateProvider
                .state('user', {
                    url: '/user',
                    abstract: true,
                    templateUrl: COMMON_VIEWS_DIR
                })

                .state('user.reg', {
                    url: '/reg',
                    views: {
                        content: {
                            templateUrl: USER_VIEWS_DIR + 'reg.html',
                            controller: 'UserCtrl.Reg'
                        }
                    }
                })

                .state('user.login', {
                    url: '/login',
                    views: {
                        content: {
                            templateUrl: USER_VIEWS_DIR + 'login.html',
                            controller: 'UserCtrl.Login'
                        }
                    }
                })

                .state('user.edit', {
                    url: '/edit',
                    views: {
                        content: {
                            templateUrl: USER_VIEWS_DIR + 'edit.html',
                            controller: 'UserCtrl.Edit'
                        }
                    }
                })

                .state('user.change_password', {
                    url: '/change_password',
                    views: {
                        content: {
                            templateUrl: USER_VIEWS_DIR + 'change_password.html',
                            controller: 'UserCtrl.ChangePassword'
                        }
                    }
                })

                .state('user.info', {
                    url: '/info/:id',
                    views: {
                        content: {
                            templateUrl: USER_VIEWS_DIR + 'info.html',
                            controller: 'UserCtrl.Info'
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
                    templateUrl: VIEWS_DIR + 'menu.html',
//                    controller: 'AppCtrl'
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
                    url: '/single/:id',
                    views: {
                        menuContent: {
                            templateUrl: SCHOOL_NEWS_VIEWS_DIR + 'single.html',
                            controller: 'SchoolNewsCtrl.single'
                        }
                    }
                })
        })

        .config(function ($stateProvider) {
            const TOPIC_VIEWS_DIR = VIEWS_DIR + 'topic/';
            $stateProvider
                .state('topic', {
                    url: '/topic',
                    abstract: true,
                    templateUrl: VIEWS_DIR + 'common/no_menu.html'
//                    controller: 'AppCtrl'
                })

                .state('topic.single', {
                    url: '/single/:id',
                    views: {
                        content: {
                            templateUrl: TOPIC_VIEWS_DIR + 'single.html',
                            controller: 'TopicCtrl.single'
                        }
                    }
                })

                .state('topic.createLost', {
                    url: '/create/:type',
                    views: {
                        content: {
                            templateUrl: TOPIC_VIEWS_DIR + 'create.html',
                            controller: 'TopicCtrl.create'
                        }
                    }
                })

                .state('topic.reply', {
                    url: '/create/reply/:id',
                    views: {
                        content: {
                            templateUrl: TOPIC_VIEWS_DIR + 'reply.html',
                            controller: 'TopicCtrl.reply'
                        }
                    }
                })
        })

    ;

})();

