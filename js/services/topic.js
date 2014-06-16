/**
 * TopicService - TopicService.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-14
 */
(function () {
    angular.module('app.services.Topic', ['app.services.base']).service('TopicService', ['BaseHttpService', function (BaseHttpService) {
        var TopicService = {};

        /**
         * 创建新话题
         * @param newTopic
         * @param successCallback
         */
        TopicService.create = function (newTopic, successCallback) {
            BaseHttpService.postWithUi('/topic/create', newTopic, successCallback);
        };

        /**
         * 获取话题列表
         * @param type {Number}
         * @param campus {Number}
         * @param page {Number}
         */
        TopicService.getList = function (type, campus, page, successCallback, errorCallback) {
            BaseHttpService.getWithUi('/topic/list'
                , {
                    type: type,
                    campus: campus,
                    page: page
                }
                , successCallback
                , errorCallback);
        };

        /**
         * 获取单个话题
         * @param id
         * @param successCallback
         * @param errorCallback
         */
        TopicService.getSingle = function (id, successCallback, errorCallback) {
            BaseHttpService.getWithUi('/topic/single/' + id,null, successCallback, errorCallback);
        };

        return TopicService;
    }]);
})();