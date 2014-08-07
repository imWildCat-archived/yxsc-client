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

        .controller(CTRL_PRE + 'Pomotodo', function ($scope, $window, toaster, Preferences, UserService) {
            $scope.loadWebsite = function () {
                window.open('https://pomotodo.com/', '_system');
            }
        })

        .controller(CTRL_PRE + 'AboutUs', function ($scope, $window, toaster, Preferences, UserService) {
            var team = [
                '<div class="item item-avatar"><img src="img/aboutus/chong.png"> <h2>种道涵</h2><p>队长，程序员，国际交流学院。</p> </div> <div class="item item-body"><p>这是介绍</p> </div>',
                '<div class="item item-avatar"><img src="img/aboutus/luo.png"> <h2>罗昶</h2><p>UE负责人，金融学院。</p> </div> <div class="item item-body"><p>这是介绍</p> </div>',
                '<div class="item item-avatar"><img src="img/aboutus/yang.png"> <h2>杨亚东</h2><p>运营负责人，金融学院。</p> </div> <div class="item item-body"><p>这是介绍</p> </div>'
            ];

            var teamHtml = team[0] + team[1] + team[2];
            $scope.teamHtml = teamHtml;
        })


})();