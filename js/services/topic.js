/**
 * TopicService - TopicService.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-14
 */
(function () {
    angular.module('app.services.Topic', ['app.services.base']).service('TopicService', ['$q', 'BaseHttpService', function ($q, BaseHttpService) {
        var TopicService = {};

        /**
         * 创建新话题
         * @param newTopic
         * @returns {promise|*}
         */
        TopicService.postNew = function (newTopic) {
            return BaseHttpService.postWithUi('/topic/create', newTopic);
        };

        /**
         * 获取话题列表 (缓存15秒)
         * @param type {Number}
         * @param campus {Number}
         * @param page {Number}
         * @returns {promise|*}
         */
        TopicService.getList = function (type, campus, page) {
            return BaseHttpService.getWithUi('/topic/list'
                , {
                    type: type,
                    campus: campus,
                    page: page
                }, 2);
        };

        /**
         * 获取单个话题 (缓存15秒)
         * @param id
         * @returns {promise|*}
         */
        TopicService.getSingle = function (id) {
            return BaseHttpService.getWithUi('/topic/single/' + id, null, 2);
        };

        /**
         * 回复话题
         * @param id
         * @param newReply
         * @returns {promise|*}
         */
        TopicService.reply = function (newReply) {
            return BaseHttpService.postWithUi('/topic/reply', newReply);
        };

        /**
         * 报告不适当话题
         * @param topicId
         * @returns {promise|*}
         */
        TopicService.report = function (topicId) {
            return BaseHttpService.getWithUi('/topic/report/' + topicId, null, 9);
        };

        return TopicService;
    }]);
})();