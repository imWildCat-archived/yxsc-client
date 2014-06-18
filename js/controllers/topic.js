/**
 * 话题的Controler - TopicCtrl.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-14
 */

(function () {
    const CTRL_PRE = 'TopicCtrl.';

    /**
     * 初始化话题列表 (抽象层)
     * @param type {number} 话题类型
     * @param title {string} 标题
     * @param $scope
     * @param toaster
     * @param UserService
     * @param TopicService
     * @private
     */
    var _initList = function (type, title, $scope, $location, toaster, UserService, TopicService) {
        $scope.viewTitle = title;
        $scope.currentPage = 1;
        $scope.list = [];

        TopicService.getList(type, 1, $scope.currentPage).then(function (data) {
            $scope.list = data;
        });

        $scope.newTopicButtonClick = function () {
            if (UserService.checkLogin()) {
                $location.path('/topic/create/lost');
            }
        }
    };

    angular.module('app.controllers.Topic', ['toaster', 'app.services.User', 'app.services.Topic'])

        // 注册 Controller

        // 话题列表
        .controller(CTRL_PRE + 'Lost.list', function ($scope, $location, toaster, UserService, TopicService) {
            _initList(4, '寻物启事', $scope, $location, toaster, UserService, TopicService);
            console.log(UserService.currentUser);
        })

        // 阅读话题
        .controller(CTRL_PRE + 'single', function ($scope, $stateParams, toaster, TopicService) {
            TopicService.getSingle($stateParams.id).then(function (data) {
                $scope.topic = data;
            });
        })

        // 创建新话题
        .controller(CTRL_PRE + 'Lost.create', function ($scope, $location, $window, toaster, UserService, TopicService) {
            UserService.getCsrf();
            if (!UserService.currentUser) {
                toaster.pop('warning', '您尚未登录，请登录', '要发表话题，必须登录');
                $location.path('/user/login');
            }

            $scope.viewTitle = '发布寻物启事';
            $scope.newTopic = {type: 4, campus: UserService.clientData.currentCampus};

            /**
             * 响应表单提交事件
             */
            $scope.newTopicFormSubmit = function () {

                if (!$scope.newTopic.subject) {
                    toaster.pop('warning', '抱歉', '标题不能为空');
                    return;
                }
                if (!$scope.newTopic.campus) {
                    toaster.pop('warning', '抱歉', '请选择校区');
                    return;
                }

                TopicService.create($scope.newTopic).then(function (data) {
                    toaster.pop('success', '发布成功');
                    $window.history.back();
                });

                console.log($scope.newTopic);
            }
        })

    ;
})();