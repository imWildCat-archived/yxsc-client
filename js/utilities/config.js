/**
 * 应用程序配置 - 常量
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-13
 */

(function () {
    angular.module('app.config', []).constant('appConf',
        {
//            baseUrl: 'http://localhost:18080/api/v1',
            baseUrl: 'http://yinxiangshancai.duapp.com/api/v1',
            httpTimeout:30
        })
//        .constant('CONF_BASE_URL','http://localhost:18080/api/vi')
//        .constant('CONF_APP_NAME','印象山财')

        .constant('errorMessages',{
            // 1001 ~ 1999 , 与用户相关的错误
            1001: '您尚未登录，请登录',
            1004: '您的money不够啦',

            1101:'用户名已被使用',
            1102:'邮箱已被使用',
            1103:'用户名格式错误',
            1104:'邮箱格式错误'
        })
    ;
})();