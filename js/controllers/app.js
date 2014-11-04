/**
 * 应用根Controler - AppCtrl.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-26
 */

(function () {
    const CTRL_PRE = 'AppCtrl.';

    angular.module('app.controllers.App', ['ionic', 'toaster', 'app.utilities.Preferences', 'app.services.User', 'app.services.Image', 'app.config'])

        // 注册 Controller
        .controller(CTRL_PRE + 'Index', function ($scope, $window, $ionicPopup, toaster, Preferences, UserService, appVersion) {
            $scope.user = UserService.currentUser;
            $scope.notificationCount = false;

            if ($scope.user) {
                UserService.getNotiCount().then(function (data) {
                    if (data === 0) return;
                    $scope.notificationCount = data;
                });
            }

            // 判断设备，只有在 Android 上才会出现更新功能
            $scope.isAndroid = ionic.Platform.isAndroid();

            // 检查更新
            var _needUpdating = function (currentVersion, targetVersion) {
                var splitVersionString = function (str) {
                    return str.split('.');
                };
                var currentVersionArray = splitVersionString(currentVersion);
                var targetVersionArray = splitVersionString(targetVersion);
                for (var i = 1; i < targetVersionArray.length; i++) {
                    var iCurrent = parseInt(currentVersionArray[i] || 0);
                    var iTarget = parseInt(targetVersionArray[i] || 0);
                    if (iTarget > iCurrent) return true;
                    else if (iTarget < iCurrent) return false;
                }
                return false;
            };
            console.log('check updating');
            var _performUpdating = function (force) {
                if (!$scope.isAndroid) return;
                force = force || false;
                if (!force) {
                    if ((Date.now() - (Preferences.get('last_updating_time') || 0)) < 60 * 60 * 1000) return;
                }
                UserService.getVersion().then(function (ret) {
                    var targetVersionStr = ret.data.version;
                    console.log(targetVersionStr);
                    if (_needUpdating(appVersion, targetVersionStr)) {
                        console.log('need updating');
                        $ionicPopup.show({
                            title: '有新版本更新啦',
                            subTitle: '童鞋，是否更新呢？',
                            scope: $scope,
                            buttons: [
                                { text: '取消' },
                                {
                                    text: '<b>更新</b>',
                                    type: 'button-positive',
                                    onTap: function (e) {
                                        window.open(ret.data.link || 'http://anyu2u.sinaapp.com/latest.apk', '_system');
                                        e.preventDefault();
                                    }
                                },
                            ]
                        });
                    } else {
                        console.log('do not need updating');
                        if(force) {
                            $ionicPopup.alert({
                                title: '当前版本已是最新'
                            });
                        }
                    }
                }, function () {
                    $ionicPopup.alert({
                        title: '呜呜...检查更新失败啦'
                    });
                });
                Preferences.set('last_updating_time', Date.now());
            };

            _performUpdating();

            $scope.checkUpdating = function () {
                _performUpdating(true);
            }

        })

        .controller(CTRL_PRE + 'SchoolBusSchedule', function ($scope, $window, toaster, Preferences, UserService) {

        })


        .controller(CTRL_PRE + 'Pomotodo', function ($scope, $window, toaster, Preferences, UserService) {
            $scope.loadWebsite = function () {
                window.open('https://pomotodo.com/', '_system');
            }
        })

        .controller(CTRL_PRE + 'AboutUs', function ($scope, $window, toaster, Preferences, UserService) {
            var team = [
                '<div class="item item-avatar"><img src="img/aboutus/chong.png"> <h2>种道涵</h2><p>队长，程序员，国际交流学院。</p> </div> <div class="item item-body"><p>负责本项目全部编码工作，架构设计。编程爱好者，伪全栈工程师，考鸭。</p> </div>',
                '<div class="item item-avatar"><img src="img/aboutus/luo.jpg"> <h2>罗昶</h2><p>UE负责人，金融学院。</p> </div> <div class="item item-body"><p>负责本项目用户体验改进。永日科技创始人，geeker。</p> </div>',
                '<div class="item item-avatar"><img src="img/aboutus/yang.jpg"> <h2>杨亚东</h2><p>运营负责人，金融学院。</p> </div> <div class="item item-body"><p>负责本项目运营。金融学院志愿者协会创始人，放荡不羁的Otaku。</p> </div>'
            ];
            team.sort(randomSort);

            var teamHtml = team[0] + team[1] + team[2];
            $scope.teamHtml = teamHtml;
        })

    function randomSort(a, b) {
        return Math.random() > .5 ? -1 : 1;
    }
})();