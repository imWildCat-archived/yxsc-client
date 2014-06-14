/**
 * TopicService - TopicService.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-14
 */
(function () {
    angular.module('app.services.Topic', ['app.services.base']).service('TopicService', ['BaseHttpService', function (BaseHttpService) {
        var TopicService = {};

        TopicService.createTopic = function (page, successCallback) {
            BaseHttpService.getWithUi('/school_news/latest', {page: page}, successCallback);
        };


        return TopicService;
    }]);
})();