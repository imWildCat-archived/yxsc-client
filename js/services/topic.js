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
        TopicService.create = function (newTopic) {
            // TODO: 换行没有实现
            return BaseHttpService.postWithUi('/topic/create', newTopic);
        };

        /**
         * 获取话题列表
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
                });
        };

        /**
         * 获取单个话题
         * @param id
         * @returns {promise|*}
         */
        TopicService.getSingle = function (id ) {
            return BaseHttpService.getWithUi('/topic/single/' + id, null);
        };

        return TopicService;
    }]);
})();