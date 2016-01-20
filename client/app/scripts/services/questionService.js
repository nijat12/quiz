'use strict';
/**
 * Created by nijat on 8/19/15.
 */

app.factory('questionService', ['$log', 'endPointDefinitionService', '$resource', '$q',
  function($log, endPointDefinitionService, $resource, $q){

  function getQuestions(id){
    console.log("Getting all the Questions");
    var deferred = $q.defer();

    if(id){
      var endPoint = endPointDefinitionService.getQuestionsUrl;
      var resource = $resource(endPoint, {id: id});
      var promise = resource.query().$promise;

      promise.then(function (data) {
        deferred.resolve(data);
      }, function () {
        $log.error('couldn"t reach server to get the list of Questions');
        deferred.reject('couldn"t reach server to get the list of Questions');
      });
    } else {
      deferred.reject('missing ID for getQuestions');
    }

    return deferred.promise;
  }

  function getQuestion(id){
    console.log("Getting a Question");
    var deferred = $q.defer();

    if(id){
      var endPoint = endPointDefinitionService.getQuestionUrl;
      var resource = $resource(endPoint, {id: id});
      var promise = resource.get().$promise;

      promise.then(function(data){
        deferred.resolve(data);
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

    function addQuestion(questionID, data){
      console.log("Adding a new Question");
      var deferred = $q.defer();

      if(data){
        if (questionID) {
          if (Object.prototype.toString.call( data ) === '[object Array]' && data[0] instanceof Model.Question) {

            var endPoint = endPointDefinitionService.addQuestionUrl;
            var resource = $resource(endPoint, { id : questionID }, {
              saveIt:{
                method:'POST',
                isArray:true
              }});
            var promise = resource.saveIt(data).$promise;

            promise.then(function (obj) {
              var dt = obj[0];
              deferred.resolve(new Model.Question.fromJson(dt));
            }, function (err) {
              deferred.reject('couldn"t reach server to add the Question');
            });
          } else {
            deferred.reject('object is not a question in addQuestion');
          }
        } else {
          deferred.reject('missing question ID in addQuestion');
        }
      } else {
        deferred.reject('missing question object in addQuestion');
      }

      return deferred.promise;
    }

    function updateQuestion(data){
      console.log("Updating a Question");
      var deferred = $q.defer();

      if(data){
        if (data instanceof Model.Question) {

          var endPoint = endPointDefinitionService.updateQuestionUrl;
          var resource = $resource(endPoint);
          var promise = resource.save(data.toString()).$promise;

          promise.then(function (data) {
            deferred.resolve();
          }, function (err) {
            deferred.reject('couldn"t reach server to update the Question');
          });
        } else {
          deferred.reject('object is not a question in updateQuestion');
        }
      } else {
        deferred.reject('missing question object in updateQuestion');
      }

      return deferred.promise;
    }

  return {
    get:getQuestion,
    getAll:getQuestions,
    add:addQuestion,
    update:updateQuestion
  }

}]);
