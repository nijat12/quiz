'use strict';

app.factory('s3Service', ['$resource', '$q', 'endPointDefinitionService', function ($resource, $q, uriService) {

  var saveFile = function (name, extension, data) {
    var q = $q.defer();
    var endPoint = uriService.s3URL + "upload64encoded";
    var s3Resource = $resource(endPoint);
    this.postData = {
      name: name,
      extension: extension,
      data: data
    };

    var p = s3Resource.save(this.postData).$promise;

    p.then(function (response) {
      q.resolve(response.value);
    }, function (error) {
      q.reject(error);
    });

    return q.promise;
  };

  var getFileFromUrl = function (url) {
    var q = $q.defer();
    var endPoint = url;
    var s3Resource = $resource(endPoint);

    var p = s3Resource.get().$promise;

    p.then(function (response) {
      q.resolve(response);
    }, function (error) {
      q.reject(error);
    });

    return q.promise;
  };

  var deleteFile = function (fileKey) {
    var q = $q.defer();
    var endPoint = uriService.s3URL + "delete";
    var s3Resource = $resource(endPoint);
    this.postData = {filename: fileKey};

    var p = s3Resource.save(this.postData).$promise;

    p.then(function (response) {
      q.resolve(response.value);
    }, function (error) {
      q.reject(error);
    });

    return q.promise;
  };

  return {
    saveFile: saveFile,
    getFileUrl: getFileFromUrl,
    deleteFile: deleteFile
  };

}]);

