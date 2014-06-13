/**
 * UserService - User.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-13
 */

(function () {
    angular.module('app.services.user', ['app.services.base']).service('UserService', ['BaseHttpService', function (BaseHttpService) {
        var UserService = {};

        UserService.getCsrf = function (successCallback) {
            BaseHttpService.get('/get_csrf', null, successCallback);
        };

        /**
         * 用户注册
         * @param newUser {Object}
         * @param successCallback {Function}
         */
        UserService.reg = function (newUser, successCallback) {
            BaseHttpService.postWithUi('/user/reg', newUser, successCallback);
        };

        return UserService;
    }]);

})();