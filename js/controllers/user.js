/**
 * 用户相关的Controler - UserCtrl.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-12
 */

(function () {
    const CTRL_PRE = 'UserCtrl.';

    angular.module('app.controllers.User', ['toaster', 'app.services.User'])

        // 注册 Controller
        .controller(CTRL_PRE + 'Reg', function ($scope, $window, toaster, UserService) {

            // 新用户对象， 用于存储用户提交的注册信息
            $scope.newUser = {};

            UserService.getCsrf();

            /**
             * 注册按钮点击
             */
            $scope.regFormSubmit = function () {
                UserService.reg($scope.newUser, function (data) {
                    toaster.pop('success', '注册成功');
                    $window.history.back();
                    console.log(data);
                });
                console.log($scope.newUser);
            };
        })
})();