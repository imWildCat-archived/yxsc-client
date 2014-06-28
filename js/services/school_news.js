/**
 * SchoolNewsService - SchoolNewsService.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-14
 */
(function () {
    angular.module('app.services.SchoolNews', ['app.services.base']).service('SchoolNewsService', ['$q', 'BaseHttpService', function ($q, BaseHttpService) {
        var SchoolNewsService = {};

        /**
         * 获取最新新闻(缓存1小时)
         * @param page
         * @returns {promise|*}
         */
        SchoolNewsService.latest = function (page) {
            return BaseHttpService.getWithUi('/school_news/latest', {page: page}, 9);
        };

        /**
         * 获取单条新闻(缓存10分钟)
         * @param id
         * @returns {promise|*}
         */
        SchoolNewsService.single = function (id) {
            return BaseHttpService.getWithUi('/school_news/single/' + id, null, 1);
        };

        return SchoolNewsService;
    }]);
})();