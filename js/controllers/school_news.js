/**
 * 学校新闻 - SchoolNewsCtrl.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-14
 */
(function () {
    const CTRL_PRE = 'SchoolNewsCtrl.';

    angular.module('app.controllers.SchoolNews', ['app.services.SchoolNews'])
        .controller(CTRL_PRE + 'list', function ($scope, SchoolNewsService) {
            SchoolNewsService.latest(1).then(function (data) {
                $scope.newsList = data;
//                console.log(data);
            });
        })
        .controller(CTRL_PRE + 'single', function ($scope, $stateParams, SchoolNewsService) {
            SchoolNewsService.single($stateParams.id).then(function (data) {
//                console.log(data);
                $scope.news = data;
            });
        })
    ;
})();