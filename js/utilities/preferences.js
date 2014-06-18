/**
 * Preferences - Preferences.*
 * 用户配置
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-18
 */
(function () {
    angular.module('app.utilities.Preferences', ['ngStorage']).service('Preferences', ['$localStorage', function ($localStorage) {
        var Preferences = {};

        /**
         * 获取配置
         * @param key {String}
         * @returns {*}
         */
        Preferences.get = function (key) {
            return $localStorage[key];
        };


        /**
         * 设定配置
         * @param key {String}
         * @param value {String}
         * @returns {*}
         */
        Preferences.set = function (key, value) {
            return $localStorage[key] = value;
        };

        /**
         * 存储用户登录信息
         * @param username
         * @param password
         * @returns {*}
         */
        Preferences.saveUser = function (username, password) {
            return Preferences.set('saved_user', {
                username: username,
                password: password
            });
        };

        /**
         * 获取用户登录信息
         * @returns {*}
         */
        Preferences.getUser = function () {
            var savedUser = Preferences.get('saved_user');
            if(savedUser && savedUser.username && savedUser.password){
                return savedUser;
            } else {
                return null;
            }
        };

        return Preferences;
    }]);
})();
