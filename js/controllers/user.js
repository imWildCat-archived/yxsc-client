/**
 * 用户相关的Controler - User.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-12
 */

(function () {
    const CTRL_PRE = 'User.';

    angular.module('app.controllers.user', ['toaster', 'app.services.user'])

        // 注册 Controller
        .controller(CTRL_PRE + 'RegCtrl', function ($scope, toaster, UserService) {
            // 新用户对象， 用于存储用户提交的注册信息
            $scope.newUser = {};


            UserService.getCsrf(function (data) {

            });


            /**
             * 注册按钮点击
             */
            $scope.regFormSubmit = function () {
//                console.log($scope.regForm.$invalid);
                UserService.reg($scope.newUser, function (data) {
                    toaster.pop('success', '注册成功');
                    console.log(data);
                });
                console.log($scope.newUser);
//                BaseHttpService.getWithUi('/school_news/latest',function(data){
//                    console.log(data);
//                });
            };
        })
})();