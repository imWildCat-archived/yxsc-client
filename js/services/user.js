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
         * @returns {promise|*}
         */
        UserService.login = function (loginUser) {
            var deferred = $q.defer();
            BaseHttpService.postWithUi('/user/login', loginUser).then(function (data) {
                UserService.currentUser = data;
                deferred.resolve(data);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /**
         * 用户登出(未实现)
         * @returns {promise|*}
         */
        UserService.logout = function () {
            var deferred = $q.defer();
            return deferred.promise;
        };

        /**
         * 修改用户资料
         * @param userProfile
         * @returns {promise|*}
         */
        UserService.changeProfile = function (userProfile) {
            var deferred = $q.defer();
            BaseHttpService.postWithUi('/user/update_profile', {user: userProfile}).then(function (ret) {
                UserService.currentUser = ret;
                deferred.resolve(ret);
            }, function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        /**
         * 修改密码
         * @param newPassword
         * @returns {promise|*}
         */
        UserService.changePassword = function (currentPassword, newPassword) {
            return BaseHttpService.postWithUi('/user/change_password', {
                currentPassword: currentPassword,
                newPassword: newPassword
            });
        };

        /**
         * 获取用户信息
         * @param userId
         */
        UserService.getInfo = function (userId) {
            return BaseHttpService.getWithUi('/user/' + userId + '/info', null);
        };

        /**
         * 获取用户话题
         * @param userId
         * @returns {promise|*}
         */
        UserService.getTopics = function (userId) {
            return BaseHttpService.getWithUi('/user/' + userId + '/topics', null);
        };

        /**
         * 获取用户回复
         * @param userId
         * @returns {promise|*}
         */
        UserService.getReplies = function (userId) {
            return BaseHttpService.getWithUi('/user/' + userId + '/replies', null);
        };

        return UserService;
    }]);

})();