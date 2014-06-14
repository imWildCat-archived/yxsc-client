/**
 * 话题的Controler - TopicCtrl.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-14
 */

(function () {
    const CTRL_PRE = 'TopicCtrl.';

    angular.module('app.controllers.Topic', ['toaster', 'app.services.User', 'app.services.Topic'])

        // 注册 Controller
        .controller(CTRL_PRE + 'Lost.list', function ($scope, $window, toaster, UserService, TopicService) {
            console.log(UserService.currentUser);
        })
        .controller(CTRL_PRE + 'Lost.new', function ($scope, $window, toaster, UserService, TopicService) {
            $scope.viewTitle = '发布寻物启事';
        })

    ;
})();