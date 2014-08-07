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
            baseUrl: 'https://yinxiangshancai.duapp.com/api/v1',
            httpTimeout:30
        })
//        .constant('CONF_BASE_URL','http://localhost:18080/api/vi')
//        .constant('CONF_APP_NAME','印象山财')

        .constant('errorMessages',{
            // 1001 ~ 1999 , 与用户相关的错误
            1001: '您尚未登录，请登录',
            1002:'用户名或密码错误',
            1004: '您的money不够啦',

            1101:'用户名已被使用',
            1102:'邮箱已被使用',
            1103:'用户名格式错误',
            1104:'邮箱格式错误',

            1201:'您的积分不足，无法进行此操作',
            1202:'请不要发言过快，上次发言30秒后方可继续',

            1301:'您输入的密码不正确，无法修改密码',

            2001: '没有找到相关贴子'
//            2001: '这个话题没找到'
        })
    ;
})();