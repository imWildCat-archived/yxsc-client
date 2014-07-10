/**
 * 地图 - MapCtrl.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-07-10
 */

(function () {
    const CTRL_PRE = 'MapCtrl.';


    /**
     * 获取校区的map文件路径、设置UI
     * @param campus
     * @returns {String} campusName
     * @private
     */
    var _buildMapCampus = function (campus, $scope, Preferences) {
        // 如果没指定校区，尝试从配置里读取
        if (!campus && Preferences.get('map_campus')) {
            campus = Preferences.get('map_campus');
        }
        // 存储map的校区到用户配置
        Preferences.set('map_campus', campus);

        var mapLocation;
        var campusName;
        switch (campus) {
            case 2:
                mapLocation = 'shungeng';
                campusName = '舜耕';
                break;
            case 3:
                mapLocation = 'shengjing';
                campusName = '圣井';
                break;
            case 4:
                mapLocation = 'mingshui';
                campusName = '明水';
                break;
            default :
                mapLocation = 'yanshan';
                campusName = '燕山';
                break;
        }


        $scope.mapCampus = 'views/map/' + mapLocation + '.html';
        $scope.mapTitle = campusName + '校区地图';
    };

    angular.module('app.controllers.Map', ['ionic', 'toaster', 'app.utilities.Preferences', 'app.services.User', 'app.services.Image'])

        // 注册 Controller
        .controller(CTRL_PRE + 'Index', function ($scope, $ionicActionSheet, $window, toaster, Preferences, UserService) {

            _buildMapCampus(null, $scope, Preferences);

            var _chooseCampus = function (campus) {
                _buildMapCampus(campus, $scope, Preferences);
            };


            $scope.chooseCampusButtonClick = function () {
                $ionicActionSheet.show({
                    buttons: [
                        { text: '燕山校区' },
                        { text: '舜耕校区' },
                        { text: '圣井校区' },
                        { text: '明水校区' }
                    ],
                    titleText: '选择您的想查看的校区',
                    cancelText: '取消',
                    cancel: function () {
                        // Nothing to do
                    },
                    buttonClicked: function (index) {
                        _chooseCampus(index + 1);
                        return true;
                    }
                });


            };
        })


})();