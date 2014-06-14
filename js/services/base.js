/**
 * BaseHttpService - BaseHttpService.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-13
 */

(function () {
    angular.module('app.services.base', ['ionic', 'toaster', 'app.config'])
        .service('BaseHttpService', ['$http', '$ionicLoading', 'toaster', 'appConf', 'errorMessages'
            , function ($http, $ionicLoading, toaster, appConf, errorMessages) {
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

                // 虽然不想，但是为了节约时间，写成回调函数了，没有用promise，回头研究 ＝。＝

                /**
                 * 基础GET请求
                 * @param uri {String}
                 * @param params {Object}
                 * @param successCallback {Function}
                 * @param errorCallback {Function}
                 */
                BaseHttpService.get = function (uri, params, successCallback, errorCallback) {
                    $http({
                        method: 'GET',
                        url: appConf.baseUrl + uri,
                        params: params,
                        timeout: appConf.timeout,
                        responseType: 'json'
                    }).success(function (res) {
                        successCallback(res);
                    }).error(function (error) {
                        if (errorCallback) {
                            errorCallback(error);
                        }
                    });
                };

                /**
                 * 基础POST请求
                 * @param uri {String}
                 * @param params {Object}
                 * @param successCallback {Function}
                 * @param errorCallback {Function}
                 */
                BaseHttpService.post = function (uri, params, successCallback, errorCallback) {
//                    params._csrf = this._csrf;
                    $http({
                        method: 'POST',
                        url: appConf.baseUrl + uri,
                        params: params,
                        timeout: appConf.timeout,
                        responseType: 'json',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded','x-csrf-token':this._csrf}
                    }).success(function (res) {
                        successCallback(res);
                    }).error(function (error) {
                        if (errorCallback) {
                            errorCallback(error);
                        }
                    });
                };

                /**
                 * GET: 附加UI响应(包含错误响应)
                 * @param uri {String}
                 * @param params {Object}
                 * @param successCallback {Function}
                 * @param errorCallback {Function}
                 */
                BaseHttpService.getWithUi = function (uri,params, successCallback, errorCallback) {
                    uiLoading.show();
                    this.get(uri, params, function (res) {
                        uiLoading.hide();
                        // 请求成功， 但是需求判断status， 判定操作是否成功
                        if (res.status === 1) {
                            successCallback(res.data);
                        } else {
                            toaster.pop('warning', '出错啦', errorMessages[res.error.code]);
                            if (errorCallback) {
                                errorCallback(res);
                            }
                        }
                    }, function (error) {
                        uiLoading.hide();
                        // 请求失败， 为网络错误
                        toaster.pop('error', '网络错误', '请求失败');
                        if (errorCallback) {
                            errorCallback(error);
                        }
                    });
                };

                /**
                 * POST: 附加UI响应(包含错误响应)
                 * @param uri {String}
                 * @param params {Object}
                 * @param successCallback {Function}
                 * @param errorCallback {Function}
                 */
                BaseHttpService.postWithUi = function (uri, params, successCallback, errorCallback) {
                    uiLoading.show();
                    this.post(uri, params, function (res) {
                        uiLoading.hide();
                        // 请求成功， 但是需求判断status， 判定操作是否成功
                        if (res.status === 1) {
                            successCallback(res.data);
                        } else {
                            toaster.pop('warning', '出错啦', errorMessages[res.error.code]);
                            if (errorCallback) {
                                errorCallback(res);
                            }
                        }
                    }, function (error) {
                        uiLoading.hide();
                        // 请求失败， 为网络错误
                        toaster.pop('error', '网络错误', '请求失败');
                        if (errorCallback) {
                            errorCallback(error);
                        }
                    });
                };

                BaseHttpService.getCsrf = function () {
                    this.get('/get_csrf', null, function (res) {
                        if (res.status === 1 && res.data.csrf) {
                            BaseHttpService._csrf = res.data.csrf;
                        }
                    });
                };

                return BaseHttpService;
            }]);


})();