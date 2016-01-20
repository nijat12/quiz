'use strict';
/**
 * Created by nijat on 1/8/16.
 */
app.factory('testsService', ['$log', '$q', 'endPointDefinitionService', '$resource',
  function($log, $q, endPointDefinitionService, $resource){

    function getTests(){
      var deferred = $q.defer();

      var endPoint = endPointDefinitionService.testURL;
      var resource = $resource(endPoint);
      var promise = resource.query().$promise;

      promise.then(function(data){
        //console.log(data);
        var result = [];
        if(data && Object.prototype.toString.call(data) === '[object Array]')
        for(var i = 0; i < data.length; i++){
          result[i]=Model.Test.fromJson(data[i]);
        }
        deferred.resolve(result);
      },function(err){
        $log.error('couldn"t reach server to get the Tests');
        deferred.reject('couldn"t reach server to get the Tests');
      });

      return deferred.promise;
    }

    function createTest(test){
      var deferred = $q.defer();

      if(test){
        if(test instanceof Model.Test){

          var endPoint = endPointDefinitionService.testURL;
          var resource = $resource(endPoint);
          var promise = resource.save(test).$promise;

          promise.then(function (data) {
            var test = Model.Test.fromJson(data);
            deferred.resolve(test);
          }, function (err) {
            deferred.reject('couldn"t reach server to add the Test');
          });
        } else {
          deferred.reject('object is not a test in createTest');
        }
      } else {
        deferred.reject('missing test object in createTest');
      }

      return deferred.promise;
    }


    function deleteTest(id){
      var deferred = $q.defer();

      if(id) {
        var endPoint = endPointDefinitionService.deleteTestURL;
        var resource = $resource(endPoint, {id: id},
          {
            delete_user: {
              method: 'DELETE',
              headers: {
                'Content-Type': 'application/json;charset=utf-8'
              }
            }
          });
        var promise = resource.delete_user().$promise;

        promise.then(function (data) {
          deferred.resolve(data);
        }, function (err) {
          //$log.error('couldn"t reach server to get the Case');
          deferred.reject('couldn"t reach server to delete the Test');
        });

      } else {
        deferred.reject('missing Test id in deleteTest');
      }

      return deferred.promise;
    }


    return {
      getAll:getTests,
      createTest:createTest,
      delete:deleteTest
    }

  }]);
