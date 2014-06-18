/**
 * UserService - UserService.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-13
 */

// 需要注意的是，UserService 不仅仅是数据通信类，而且在内存中缓存着用户的信息

(function () {
    angular.module('app.services.User', ['app.services.base', 'toaster']).service('UserService', ['BaseHttpService', '$location', 'toaster', function (BaseHttpService, $location, toaster) {
        var UserService = {
            currentUser: null, // 保存当前用户数据

            // 客户端数据
            clientData : {
                currentCampus : null // 当前校区
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
         * @param successCallback {Function}
         */
        UserService.reg = function (newUser, successCallback) {
            BaseHttpService.postWithUi('/user/reg', newUser, function (data) {
                UserService.currentUser = data;
                successCallback(data);
            });
        };

        /**
         * 用户登录
         * @param loginUser {Object}
         * @param successCallback {Function}
         */
        UserService.login = function (loginUser, successCallback) {
            BaseHttpService.postWithUi('/user/login', loginUser, function (data) {
                UserService.currentUser = data;
                successCallback(data);
            })
        };

        UserService.logout = function (successCallback) {

        };

        return UserService;
    }]);

})();