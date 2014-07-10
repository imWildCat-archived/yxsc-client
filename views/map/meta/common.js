// 百度地图API功能
var map = new BMap.Map("school-map");
map.centerAndZoom(new BMap.Point(mapData.center[0], mapData.center[1]), 17);

map.addControl(new BMap.NavigationControl());  //添加默认缩放平移控件
map.addControl(new BMap.ScaleControl());       // 添加默认比例尺控件
map.addControl(new BMap.MapTypeControl({mapTypes: [BMAP_NORMAL_MAP,BMAP_HYBRID_MAP]}));     //2D图，卫星图

// 标注当前位置
navigator.geolocation.getCurrentPosition(function (position) {
    if (position) {
        var _latitude = position.coords.latitude;
        var _longitude = position.coords.longitude;

        var icon = new BMap.Icon('meta/location.gif', new BMap.Size(14, 23));
        var marker = new BMap.Marker(new BMap.Point(_longitude, _latitude), {icon: icon});  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中

        //创建信息窗口
        var infoWindow = new BMap.InfoWindow('您的当前位置');
        marker.addEventListener('click', function () {
            this.openInfoWindow(infoWindow);
        });
    }
});

var addPoint = function (point) {
    var marker = new BMap.Marker(new BMap.Point(point.long, point.lat));  // 创建标注
    map.addOverlay(marker);              // 将标注添加到地图中
    var opts = {
//            width : 100,     // 信息窗口宽度
//            height: 50,     // 信息窗口高度
        title: point.name  // 信息窗口标题
    };

//创建信息窗口
    var infoWindow = new BMap.InfoWindow(point.note|| '',opts);
    marker.addEventListener('click', function () {
        this.openInfoWindow(infoWindow);
    });
};

var pointsArray = mapData.points;
for (var i = 0; i < pointsArray.length; i++) {
    addPoint(pointsArray[i]);
}
