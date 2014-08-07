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
            $scope.page = 0;
            $scope.newsList = [];
            $scope.isLoading = false;

            $scope.loadMore = function () {
                if ($scope.isLoading) {
                    return;
                } else {
                    $scope.isLoading = true;
                    $scope.page++;
                    SchoolNewsService.latest($scope.page).then(function (data) {
                        if (data.length === 0) {
                            $scope.isLoading = true;
                        } else {
                            $scope.newsList = $scope.newsList.concat(data);
                            $scope.isLoading = false;
                        }
                        console.log(data);
                    });
                }

                $scope.$broadcast('scroll.infiniteScrollComplete');
            };
//            $scope.$on('stateChangeSuccess', function () {
//                $scope.loadMore();
//            });
        })
        .controller(CTRL_PRE + 'single', function ($scope, $stateParams, SchoolNewsService) {
            SchoolNewsService.single($stateParams.id).then(function (data) {
//                console.log(data);
                $scope.news = data;
            });
        })
    ;
})();