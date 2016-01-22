/**
 * Created by nijat on 1/22/16.
 */
'use strict';

app.factory('tagsService', ['$log', '$q', 'endPointDefinitionService', '$resource',
  function($log, $q, endPointDefinitionService, $resource){

    function getAllTags(){
      var deferred = $q.defer();

      var endPoint = endPointDefinitionService.tagsURL;
      var resource = $resource(endPoint);
      var promise = resource.query().$promise;

      promise.then(function(data){
        var result = [];
        if(data && Object.prototype.toString.call(data) === '[object Array]')
        for(var i = 0; i < data.length; i++){
          result[i]=Model.Tag.fromJson(data[i]);
        }
        deferred.resolve(result);
      },function(err){
        $log.error('couldn"t reach server to get the Tests');
        deferred.reject('couldn"t reach server to get the Tests');
      });

      return deferred.promise;
    }

    function createTags(tag){
      var deferred = $q.defer();

      if(tag){
        if(tag instanceof Model.Tag){

          var endPoint = endPointDefinitionService.tagsURL;
          var resource = $resource(endPoint);
          var promise = resource.save(tag).$promise;

          promise.then(function (data) {
            var test = Model.Tag.fromJson(data);
            deferred.resolve(test);
          }, function (err) {
            deferred.reject('couldn"t reach server to add the Tag');
          });
        } else {
          deferred.reject('object is not a tag in createTags');
        }
      } else {
        deferred.reject('missing tag object in createTags');
      }

      return deferred.promise;
    }


    return {
      get:getAllTags,
      create:createTags
    }

  }]);
