'use strict';
/**
 * Created by nijat on 1/8/16.
 */
app.factory('casesService', ['$log', '$q', 'endPointDefinitionService', '$resource',
  function($log, $q, endPointDefinitionService, $resource){

    function getCase(id){
      console.log("Getting a Case");
      var deferred = $q.defer();


      if(id) {
        var endPoint = endPointDefinitionService.getCaseURL;
        var resource = $resource(endPoint, {id: id});
        var promise = resource.get().$promise;

        promise.then(function (data) {
          deferred.resolve(Model.Case.fromJson(data));
        }, function (err) {
          deferred.reject('couldn"t reach server to get the Case');
        });

      } else {
        deferred.reject('missing case id in getCase');
      }

      return deferred.promise;
    }

    function getCases(id){
      console.log("Getting all the Cases");
      var deferred = $q.defer();


      if(id) {
        var endPoint = endPointDefinitionService.getCasesURL;
        var resource = $resource(endPoint, {id: id});
        var promise = resource.query().$promise;

        promise.then(function (data) {
          console.log(data);
          var result = [];
          if(data && Object.prototype.toString.call(data) === '[object Array]')
            for(var i = 0; i < data.length; i++){
              result[i]=Model.Case.fromJson(data[i]);
            }
          deferred.resolve(result);
        }, function (err) {
          //$log.error('couldn"t reach server to get the Case');
          deferred.reject('couldn"t reach server to get the Cases');
        });

      } else {
        deferred.reject('missing question id in getCases');
      }

      return deferred.promise;
    }

    function addCase(questionID, data){
      console.log("Adding a new Case");
      var deferred = $q.defer();

      if(data){
        if (questionID) {
          if (data instanceof Model.Case) {

            var endPoint = endPointDefinitionService.addCaseURL;
            var resource = $resource(endPoint, { id : questionID });
            var promise = resource.save(data).$promise;

            promise.then(function (data) {
              var c = Model.Case.fromJson(data);
              deferred.resolve(c);
            }, function (err) {
              deferred.reject('couldn"t reach server to add the Case');
            });
          } else {
            deferred.reject('object is not a case in addCase');
          }
        } else {
          deferred.reject('missing test ID in addCase');
        }
      } else {
        deferred.reject('missing case object in addCase');
      }

      return deferred.promise;
    }

    function updateCase(data){
      console.log("Updating a Case");
      var deferred = $q.defer();

      console.log(data);

      if(data){
        if (data instanceof Model.Case) {

          var endPoint = endPointDefinitionService.updateCaseURL;
          var resource = $resource(endPoint);
          var promise = resource.save(data.toString()).$promise;

          promise.then(function (data) {
            deferred.resolve();
          }, function (err) {
            deferred.reject('couldn"t reach server to update the Case');
          });
        } else {
          deferred.reject('object is not a case in updateCase');
        }
      } else {
        deferred.reject('missing case object in updateCase');
      }

      return deferred.promise;
    }


    return {
      get:getCase,
      getAll:getCases,
      add:addCase,
      update:updateCase
    }

  }]);
