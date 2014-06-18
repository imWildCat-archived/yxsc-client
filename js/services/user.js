/**
 * UserService - UserService.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-13
 */

// 需要注意的是，UserService 不仅仅是数据通信类，而且在内存中缓存着用户的信息

(function () {
    angular.module('app.services.User', ['app.services.base', 'toaster']).service('UserService', ['$q', 'BaseHttpService', '$location', 'toaster', function ($q, BaseHttpService, $location, toaster) {
        var UserService = {
            currentUser: null, // 保存当前用户数据

            // 客户端数据
            clientData: {
                currentCampus: null // 当前校区
            }
        };

        UserService.getCsrf = function () {
            BaseHttpService.getCsrf();
        };

        /**
         * 检查是否登录
         * @param message {String} 未登录时的提醒消息
         * @returns {boolean}
         */
        UserService.checkLogin = function (message) {
            if (!UserService.currentUser) {
                toaster.pop('warning', '您尚未登录，请登录', message);
                $location.path('/user/login');
                return false;
            }
            return true;
        };

        /**
         * 用户注册
         * @param newUser {Object}
         * @returns {promise|*}
         */
        UserService.reg = function (newUser) {
            var deferred = $q.defer();
            BaseHttpService.postWithUi('/user/reg', newUser).then(function (data) {
                UserService.currentUser = data;
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /**
         * 用户登录
         * @param loginUser {Object}
         * @returns {Deferred}
         */
        UserService.login = function (loginUser) {
            var deferred = $q.defer();
            console.log(deferred);
            BaseHttpService.postWithUi('/user/login', loginUser).then(function (data) {
                UserService.currentUser = data;
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        UserService.logout = function () {
            var deferred = $q.defer();
            return deferred.promise;
        };

        return UserService;
    }]);

})();