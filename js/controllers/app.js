/**
 * 应用根Controler - AppCtrl.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-26
 */

(function () {
    const CTRL_PRE = 'AppCtrl.';

    angular.module('app.controllers.App', ['toaster', 'app.utilities.Preferences', 'app.services.User', 'app.services.Image'])

        // 注册 Controller
        .controller(CTRL_PRE + 'Index', function ($scope, $window, toaster, Preferences, UserService) {
            $scope.user = UserService.currentUser;
        })


})();