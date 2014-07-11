/**
 * 话题的Controler - TopicCtrl.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-14
 */

(function () {
    const CTRL_PRE = 'TopicCtrl.';

    var typeOptions = {
        2: ['社团招募'],
        3: ['学长帮帮忙'],
        4: ['寻物启事'],
        5: ['失物招领'],
        6: ['二手交易']
    };

    /**
     * 初始化话题列表 (抽象层)
     * @param type {number} 话题类型
     * @param title {string} 标题
     * @param $scope
     * @param $ionicActionSheet
     * @param toaster
     * @param UserService
     * @param TopicService
     * @private
     */
    var _initList = function (type, title, $scope, $location, $ionicActionSheet, toaster, UserService, TopicService) {
        $scope.viewTitle = title;
        $scope.page = 1;
        $scope.list = [];

        $scope.campus = UserService.clientData.currentCampus;

        // 用以切换校区的时候缓存上一个校区
        $scope.lastPage = null;
        $scope.lastCampus = null;

        var _loadList = function () {
            TopicService.getList(type, $scope.campus, $scope.page).then(function (data) {
                $scope.list = data;
                _setCampusName();
            }, function () {
                // 如果加载失败
                if ($scope.lastCampus) {
                    $scope.campus = $scope.lastCampus;
                }
                if ($scope.lastPage) {
                    $scope.page = $scope.lastPage;
                }
                _setCampusName();
            });
        };


        $scope.newTopicButtonClick = function () {
            if (UserService.checkLogin()) {
                $location.path('/topic/create/' + type);
            }
        };

        /**
         * 选择校区
         * @param campus {Number}
         * @private
         */
        var _chooseCampus = function (campus) {
            $scope.lastCampus = $scope.campus;
            $scope.lastPage = $scope.page;

            $scope.campus = campus;
            UserService.clientData.currentCampus = campus;

            $scope.page = 1;
            _loadList();
        };

        var _setCampusName = function () {
            var _campusNameArray = ['燕山', '舜耕', '圣井', '明水', '全部'];
            $scope.campusName = _campusNameArray[$scope.campus - 1] + '校区';
        };

        $scope.chooseCampusButtonClick = function () {
            $ionicActionSheet.show({
                buttons: [
                    { text: '燕山校区' },
                    { text: '舜耕校区' },
                    { text: '圣井校区' },
                    { text: '明水校区' }
                ],
                destructiveText: '查看全部',
                titleText: '选择您的想查看的校区',
                /* cancelText: '取消',
                 cancel:function(){
                 // Nothing to do
                 },*/
                buttonClicked: function (index) {
                    _chooseCampus(index + 1);
                    return true;
                },
                destructiveButtonClicked: function () {
                    _chooseCampus(5);
                    return true;
                }
            });


        };

        $scope.pageDown = function () {
            if ($scope.page - 1 > 0) {
                $scope.page--;
                _loadList();
            } else {
                toaster.pop('info', '已经是第一页', '没有上一页啦');
            }
        };

        $scope.pageUp = function () {
            $scope.lastPage = $scope.page;
            $scope.page++;
            _loadList();
        };

        // Init
        _loadList();
    };

    angular.module('app.controllers.Topic', ['ionic', 'toaster', 'app.services.User', 'app.services.Topic', 'app.services.Image'])

        // 注册 Controller

        // 话题列表
        .controller(CTRL_PRE + 'list', function ($scope, $location, $stateParams, $ionicActionSheet, toaster, UserService, TopicService) {
            var _type = $stateParams.type;
            if (!_type) {
                toaster.pop('error', '错误', '初始化发表新话题界面时出错');
            }

            _initList(_type, typeOptions[_type][0], $scope, $location, $ionicActionSheet, toaster, UserService, TopicService);
        })

        // 阅读话题
        .controller(CTRL_PRE + 'single', function ($scope, $ionicPopup, $location, $stateParams, toaster, UserService, TopicService) {
            TopicService.getSingle($stateParams.id).then(function (data) {
                $scope.topic = data.topic;
                $scope.replies = data.replies;
            });

            $scope.newReplyButtonClick = function () {
                if (!UserService.checkLogin()) return;
                if (!$scope.topic._id) {
                    toaster.pop('warning', '出错啦', '未知错误，您不能发表回复');
                    return;
                }

                $location.path('/topic/create/reply/' + $scope.topic._id);
            }

            /**
             * 报告不适当内容
             */
            $scope.report = function () {
                if (!UserService.checkLogin()) return;

                $ionicPopup.confirm({
                    title: '报告不适当内容',
                    template: '您确定向管理团队报告本主题含有不适当内容吗？',
                    buttons: [
                        { //Array[Object] (optional). Buttons to place in the popup footer.
                            text: '否',
                            type: 'button-default'
                        },
                        {
                            text: '是',
                            type: 'button-positive',
                            onTap: function (e) {
                                TopicService.report($scope.topic._id).then(function(data){
                                   if(data.reported == true){
                                       toaster.pop('success','报告成功','感谢您的支持！');
                                   }
                                });
                            }
                        }
                    ]
                });
            }
        })

        // 创建新话题
        .controller(CTRL_PRE + 'create', function ($scope, $location, $stateParams, $window, toaster, UserService, TopicService, ImageService) {
            var _type = $stateParams.type;
            if (!_type) {
                toaster.pop('error', '错误', '初始化发表新话题界面时出错');
            }

            UserService.getCsrf();
            if (!UserService.currentUser) {
                toaster.pop('warning', '您尚未登录，请登录', '要发表话题，必须登录');
                $location.path('/user/login');
            }


            $scope.viewTitle = '发布' + typeOptions[_type][0];
            $scope.newTopic = {type: _type, campus: UserService.clientData.currentCampus};


            // 初始化图片上传服务
            ImageService.getToken();
            ImageService.initImageService($scope, function (data) {
                if ($scope.newTopic.content) {
                    $scope.newTopic.content += '\n ![img](' + data.t_url + ')';
                } else {
                    $scope.newTopic.content = '![img](' + data.t_url + ')';
                }
                toaster.pop('info', '图片上传成功');
            }, function () {
                toaster.pop('error', '图片上传失败');
            });


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

                TopicService.postNew($scope.newTopic).then(function (data) {
                    toaster.pop('success', '发布成功');
                    $window.history.back();
                });

                console.log($scope.newTopic);
            }
        })

        .controller(CTRL_PRE + 'reply', function ($scope, $stateParams, $location, $window, toaster, UserService, TopicService, ImageService) {
            UserService.getCsrf();

            $scope.newReply = {
                id: $stateParams.id
            };

            // 初始化图片上传服务
            ImageService.getToken();
            ImageService.initImageService($scope, function (data) {
                if ($scope.newReply.content) {
                    $scope.newReply.content += '\n ![img](' + data.t_url + ')';
                } else {
                    $scope.newReply.content = '![img](' + data.t_url + ')';
                }
                toaster.pop('info', '图片上传成功');
            }, function () {
                toaster.pop('error', '图片上传失败');
            });

            $scope.newReplyFormSubmit = function () {
                if (!$scope.newReply.content) {
                    return toaster.pop('info', '抱歉，不能发表回复', '请填写回复的内容');
                }

                TopicService.reply($scope.newReply).then(function (ret) {
                    console.log(ret);
                    toaster.pop('success', '回复成功');
                    $window.history.back();
                }, function (error) {
//                    toaster.pop('error', '回复失败');
                });
            };
        })

    ;
})();