'use strict';
/**
 * Created by nijat on 8/19/15.
 */

app.factory('questionService', ['$log', 'endPointDefinitionService', '$resource',
  function($log, endPointDefinitionService, $resource){

  function getQuestions(){
    var deferred = $q.defer();

    var endPoint = endPointDefinitionService.apiURL;
    var resource = $resource(endPoint);
    var promise = resource.query().$promise;

    promise.then(function(){
      deferred.resolve();
    },function(){
      $log.error('couldn"t reach server to get the list of Questions');
      deferred.reject('couldn"t reach server to get the list of Questions');
    });

    return deferred.promise;
  }

  function getQuestion(id){
    var deferred = $q.defer();

    if(id){
      var endPoint = endPointDefinitionService.apiURL;
      var resource = $resource(endPoint);
      var promise = resource.query().$promise;

      promise.then(function(){
        deferred.resolve();
      },function(){
        $log.error('couldn"t reach server to get the a Question');
        deferred.reject('couldn"t reach server to get the a Question');
      });
    }
    else {
      deferred.reject('missing ID for getQuestion');
    }

    return deferred.promise;
  }

  return {
    getQuestions:getQuestions,
    getQuestion:getQuestion
  }

}]);
