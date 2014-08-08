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
            $scope.notificationCount = false;

            if ($scope.user) {
                UserService.getNotiCount().then(function (data) {
                    if (data === 0) return;
                    $scope.notificationCount = data;
                });
            }
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