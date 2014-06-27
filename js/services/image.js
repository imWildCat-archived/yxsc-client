/**
 * ImageService - ImageService.*
 *
 * @author WildCat <wildcat.name@gmail.com>
 * @date 2014-06-23
 */

(function () {
    angular.module('app.services.Image', ['app.services.base', 'ionic','toaster', 'angularFileUpload', 'app.config']).service('ImageService', ['$q', '$http', 'BaseHttpService', 'appConf', '$location', '$ionicLoading','toaster', '$upload', function ($q, $http, BaseHttpService, appConf, $location,$ionicLoading, toaster, $upload) {
        var ImageService = {
            token: null
        };

        ImageService.getToken = function () {
            BaseHttpService.get('/get_img_token', null).then(function (res) {
                ImageService.token = res.data.token;
            });
        };

        ImageService.postImg = function (file) {
            var formData = new FormData();
            formData.append('file', file);

            var deferred = $q.defer();
            $http({
                method: 'POST',
                url: 'http://api.tietuku.com/v1/Up',
                params: {Token: ImageService.token},
                data: formData,
                timeout: appConf.timeout,
//                responseType: 'json',
                headers: {'Content-Type': 'multipart/form-data'}
            }).success(function (res) {
                deferred.resolve(res);
            }).error(function (error) {
                deferred.reject(error);
            });
            return deferred.promise;
        };

        ImageService.initImageService = function ($scope, successCallBack, errorCallback) {
            $scope.onFileSelect = function ($files) {
                //$files: an array of files selected, each file has name, size, and type.
                for (var i = 0; i < $files.length; i++) {
                    toaster.pop('info', '上传中...');
                    var file = $files[i];
                    $scope.upload = $upload.upload({
                        url: 'http://api.tietuku.com/v1/Up', //upload.php script, node.js route, or servlet url
                        // method: 'POST' or 'PUT',
                        // headers: {'header-key': 'header-value'},
                        // withCredentials: true,
                        data: {Token: ImageService.token},
                        file: file // or list of files: $files for html5 only
                        /* set the file formData name ('Content-Desposition'). Default is 'file' */
                        //fileFormDataName: myFile, //or a list of names for multiple files (html5).
                        /* customize how data is added to formData. See #40#issuecomment-28612000 for sample code */
                        //formDataAppender: function(formData, key, val){}
                    }).progress(function (evt) {
                        var percentage = parseInt(100.0 * evt.loaded / evt.total);
                        $ionicLoading.show({
                            template: '图片上传中...' + percentage + '%',
                            noBackdrop: true,
                            duration: 30000 // 30 sec
                        });
                        console.log('percent: ' + percentage);
                    }).success(function (data, status, headers, config) {
                        // file is uploaded successfully
                        $ionicLoading.hide();
                        successCallBack(data, status, headers, config);
                    }).error(function (error) {
                        $ionicLoading.hide();
                        errorCallback(error);
                    });
                }
            };
        }
        ;

        return ImageService;

    }
    ])
    ;
})
();