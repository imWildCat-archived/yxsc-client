/**
 * 用户相关的Controler - UserCtrl.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-12
 */

(function () {
    const CTRL_PRE = 'UserCtrl.';

    angular.module('app.controllers.User', ['toaster', 'app.utilities.Preferences', 'app.services.User', 'app.services.Image'])

        // 注册 Controller
        .controller(CTRL_PRE + 'Reg', function ($scope, $window, toaster, Preferences, UserService) {
            // 新用户对象， 用于存储用户提交的注册信息
            $scope.newUser = {};

            UserService.getCsrf();

            /**
             * 注册按钮点击
             */
            $scope.regFormSubmit = function () {
                UserService.reg($scope.newUser).then(function (data) {
                    toaster.pop('success', '注册成功');

                    Preferences.saveUser($scope.newUser.username, $scope.newUser.password);
                    $window.history.back();
                });
//                console.log($scope.newUser);
            };
        })

        // 登录 Controller
        .controller(CTRL_PRE + 'Login', function ($scope, $window, toaster, Preferences, UserService) {
            $scope.loginUser = {};

            // 获取保存的用户信息
            var savedUser = Preferences.getUser();
            if (savedUser) {
                $scope.loginUser = savedUser;
            }

            UserService.getCsrf();

            /**
             * 登录按钮点击
             */
            $scope.loginFormSubmit = function () {
                UserService.login($scope.loginUser).then(function (data) {
                    toaster.pop('success', '登录成功');
                    Preferences.saveUser($scope.loginUser.username, $scope.loginUser.password);
                    $window.history.back();
                });
            }
        })

        // 编辑用户资料
        .controller(CTRL_PRE + 'Edit', function ($scope, $window, toaster, Preferences, UserService, ImageService) {
            UserService.checkLogin();

            $scope.user = UserService.currentUser;
            $scope.form = {};

            ImageService.getToken();

            ImageService.initImageService($scope, function (data) {
                $scope.user.avatar = data.t_url;
                UserService.changeProfile($scope.user).then(function () {
                    toaster.pop('success', '用户资料修改成功');
                }, function () {
                    toaster.pop('error', '用户资料修改失败');
                })
            }, function () {
                toaster.pop('error', '头像上传失败');
                // 尝试再次获取一次token是否能解决上传失败问题
                ImageService.getToken();
            });


        })

        // 修改密码
        .controller(CTRL_PRE + 'ChangePassword', function ($scope, $window, toaster, Preferences, UserService) {
            UserService.checkLogin();

            $scope.user = UserService.currentUser;
            $scope.formModel = {};

            $scope.changePasswordFormSubmit = function () {
                if(!($scope.formModel.newPassword && $scope.formModel.currentPassword)){
                    toaster.pop('warning', '请输入密码');
                    return;
                }
                if ($scope.formModel.newPassword != $scope.formModel.newPasswordRepeat) {
                    toaster.pop('warning', '两遍密码不一致');
                    return;
                }

                UserService.changePassword($scope.formModel.currentPassword, $scope.formModel.newPassword).then(function () {
                    Preferences.saveUser(UserService.currentUser.username, $scope.formModel.newPassword);
                    toaster.pop('success', '密码修改成功');
                    $window.history.back();
                }, function () {
//                    toaster.pop('warning', '密码修改失败');
                })
            };
        })
    ;
})();