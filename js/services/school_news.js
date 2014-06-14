/**
 * SchoolNewsService - SchoolNewsService.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-14
 */
(function () {
    angular.module('app.services.SchoolNews', ['app.services.base']).service('SchoolNewsService', ['BaseHttpService', function (BaseHttpService) {
        var SchoolNewsService = {};

        SchoolNewsService.latest = function (page, successCallback) {
            BaseHttpService.getWithUi('/school_news/latest', {page: page}, successCallback);
        };

        SchoolNewsService.single = function (id, successCallback) {
            BaseHttpService.getWithUi('/school_news/single/' + id, null, successCallback);
        };

        return SchoolNewsService;
    }]);
})();