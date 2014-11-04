/**
 * 地图 - FileTransferCtrl.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-11-04
 */

(function () {
    const CTRL_PRE = 'FileTransferCtrl.';


    angular.module('app.controllers.FileTransfer', ['ionic', 'toaster', 'app.utilities.Preferences', 'app.services.User', 'app.services.Image'])

        // 注册 Controller
        .controller(CTRL_PRE + 'Index', function ($scope, $ionicPopup, $http, $q, $window, toaster, Preferences, UserService) {
            var _formPost = function (url, params) {
                var deferred = $q.defer();
                $http({
                    method: 'POST',
                    url: url,
                    params: params,
                    timeout: 30,
                    responseType: 'text/html',
                    headers: {'Content-Type': 'application/x-www-form-urlencoded'}
                }).success(function (res) {
                    deferred.resolve(res);
                }).error(function (error) {
                    deferred.reject(error);
                });
                return deferred.promise;
            };

            $scope.file = { code: '' };

            $scope.getFile = function () {
                if ($scope.file.code.length === 0) {
                    $ionicPopup.alert({
                        title: '请输入提取码'
                    });
                } else {
                    _formPost('http://filex.sdufe.edu.cn/down.php', {
                        code: $scope.file.code,
                        vcode: '11'
                    })
                }


            }

        })


})();