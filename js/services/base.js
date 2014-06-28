/**
 * BaseHttpService - BaseHttpService.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-13
 */

(function () {
    angular.module('app.services.base', ['ionic', 'toaster', 'app.config', 'angular-data.DSCacheFactory'])
        .service('BaseHttpService', ['$q', '$http', '$location', '$ionicLoading', 'toaster', 'appConf', 'errorMessages', 'DSCacheFactory'
            , function ($q, $http, $location, $ionicLoading, toaster, appConf, errorMessages, DSCacheFactory) {
                var BaseHttpService = {
                    _csrf: ''
                };

                // 定义缓存策略，根据缓存时常的长短，分为一下几种，在get请求第三个参数可以设置：
                // (AngularJS没有优雅的缓存策略方式，所以只能这样啦)
                // 1 - 5 秒
                // 2 - 15 秒
                // 3 - 30 秒
                // 4 - 60 秒
                // 5 - 300 秒 (5分钟)
                // 6 - 600 秒 (10分钟)
                // 7 - 1200 秒 (20分钟)
                // 8 - 1800 秒 (30分钟)
                // 9 - 36000秒 (1小时)

                const DEFINED_CACHE_CONFIG = [
                    [5000],
                    [15000],
                    [30000],
                    [60000],
                    [30000],
                    [600000],
                    [1200000],
                    [1800000],
                    [36000000]
                ];

                for (var i = 1; i <= DEFINED_CACHE_CONFIG.length; i++) {
                    DSCacheFactory('httpDataCache' + i, {
                        maxAge: DEFINED_CACHE_CONFIG[i - 1][0], // Items added to this cache expire after several seconds.
                        cacheFlushInterval: 3600000, // This cache will clear itself every hour.
                        deleteOnExpire: 'aggressive' // Items will be deleted from this cache right when they expire.
                    });
                }

                /**
                 * 对ionic loading进行简单封装
                 * @type {{show: show, hide: hide}}
                 */
                var uiLoading = {
                    show: function () {
                        $ionicLoading.show({
                            template: '加载中...',
                            noBackdrop: true,
                            duration: 30000 // 30 sec
                        });
                    },
                    hide: function () {
                        $ionicLoading.hide();
                    }
                };

                /**
                 * 错误处理
                 * @param res {Object}
                 * @private
                 */
                var _errorHandler = function (res) {
                    toaster.pop('warning', '呃，出错啦', errorMessages[res.error.code]);
                    switch (res.error.code) {
                        case 1001:
                            // 若用户未登录，跳转到登录页
                            $location.path('/user/login');
                            break;
                        default:
                            break;
                    }
                };

                // 已基本实现promise
                // 但是似乎不是最佳实践

                /**
                 * 基础GET请求
                 * @param uri {String}
                 * @param params {Object}
                 * @param cacheType {Number} 缓存类型，如果不缓存，null/false
                 * @returns {promise|*}
                 */
                BaseHttpService.get = function (uri, params, cacheType) {
                    var deferred = $q.defer();
                    var httpConfig = {
                        method: 'GET',
                        url: appConf.baseUrl + uri,
                        params: params,
                        timeout: appConf.timeout,
                        responseType: 'json'
                    };

                    // 设置缓存时长类型
                    if (cacheType) {
                        cacheType = parseInt(cacheType);
                        if (cacheType <= 9 && cacheType >= 1) {
                            httpConfig.cache = DSCacheFactory.get('httpDataCache' + cacheType);
                        }
                    }

                    $http(httpConfig).success(function (res) {
                        deferred.resolve(res);
                    }).error(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };

                /**
                 * 基础POST请求
                 * @param uri {String}
                 * @param params {Object}
                 * @returns {promise|*}
                 */
                BaseHttpService.post = function (uri, params) {
                    var deferred = $q.defer();
                    $http({
                        method: 'POST',
                        url: appConf.baseUrl + uri,
                        params: params,
                        timeout: appConf.timeout,
                        responseType: 'json',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded', 'x-csrf-token': this._csrf}
                    }).success(function (res) {
                        deferred.resolve(res);
                    }).error(function (error) {
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };

                /**
                 * GET: 附加UI响应(包含错误响应)
                 * @param uri {String}
                 * @param params {Object}
                 * @param cacheType {Number} 缓存类型，如果不缓存，null/false
                 * @returns {promise|*}
                 */
                BaseHttpService.getWithUi = function (uri, params, cacheType) {
                    var deferred = $q.defer();
                    uiLoading.show();
                    this.get(uri, params, cacheType).then(function (res) {
                        uiLoading.hide();
                        // 请求成功， 但是需求判断status， 判定操作是否成功
                        if (res.status === 1) {
                            deferred.resolve(res.data);
                        } else {
                            _errorHandler(res);
                            deferred.reject(res);
                        }
                    }, function (error) {
                        uiLoading.hide();
                        // 请求失败， 为网络错误
                        toaster.pop('error', '网络错误', '请求失败');
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };

                /**
                 * POST: 附加UI响应(包含错误响应)
                 * @param uri {String}
                 * @param params {Object}
                 * @returns {promise|*}
                 */
                BaseHttpService.postWithUi = function (uri, params) {
                    var deferred = $q.defer();
                    uiLoading.show();
                    this.post(uri, params).then(function (res) {
                        uiLoading.hide();
                        // 请求成功， 但是需求判断status， 判定操作是否成功
                        if (res.status === 1) {
                            deferred.resolve(res.data);
                        } else {
                            _errorHandler(res);

                            deferred.reject(res);
                        }
                    }, function (error) {
                        uiLoading.hide();
                        // 请求失败， 为网络错误
                        toaster.pop('error', '网络错误', '请求失败');
                        deferred.reject(error);
                    });
                    return deferred.promise;
                };

                BaseHttpService.getCsrf = function () {
                    this.get('/get_csrf', null).then(function (res) {
                        if (res.status === 1 && res.data.csrf) {
                            BaseHttpService._csrf = res.data.csrf;
                        }
                    });
                };

                return BaseHttpService;
            }]);


})();