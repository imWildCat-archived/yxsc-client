/**
 * BaseHttpService - BaseHttpService.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-13
 */

(function () {
    angular.module('app.services.base', ['ionic', 'toaster', 'app.config'])
        .service('BaseHttpService', ['$q','$http', '$location', '$ionicLoading', 'toaster', 'appConf', 'errorMessages'
            , function ($q,$http, $location, $ionicLoading, toaster, appConf, errorMessages) {
                var BaseHttpService = {
                    _csrf: ''
                };

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
                 * @returns {promise|*}
                 */
                BaseHttpService.get = function (uri, params) {
                    var deferred = $q.defer();
                    $http({
                        method: 'GET',
                        url: appConf.baseUrl + uri,
                        params: params,
                        timeout: appConf.timeout,
                        responseType: 'json'
                    }).success(function (res) {
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
                 * @returns {promise|*}
                 */
                BaseHttpService.getWithUi = function (uri, params) {
                    var deferred = $q.defer();
                    uiLoading.show();
                    this.get(uri, params, function (res) {
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
                    this.post(uri, params, function (res) {
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