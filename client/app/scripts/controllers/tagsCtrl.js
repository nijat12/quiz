/**
 * Created by nijat on 1/8/16.
 */
'use strict';

/**
 * @ngdoc function
 * @name quizApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the quizApp
 */
app
  .controller('tagsCtrl',['$scope', '$state', '$rootScope', '$q', 'loadIcon', 'tagsService',
      function ($scope, $state, $rootScope, $q, loadIcon, tagsService) {
        $scope.newName = null;

        $scope.localTags = [];
        $scope.tagsModel = [];
        $scope.tagsSettings = {displayProp: 'name', idProp: 'id', closeOnBlur: true};

        var getTags = function () {

          var deferred = $q.defer();

          loadIcon.show();
          tagsService.get().then(function (data) {

            if(data && data.length > 0) {

              $rootScope.tags = data;
              deferred.resolve();

            } else {
              deferred.reject('Tags Came In Empty');
            }

            loadIcon.hide();
          }, function () {
            loadIcon.hide();
            deferred.reject("Couldn't get Tags");
          });

          return deferred.promise;
        };

        $scope.createTag = function (){
          if ($scope.newName && $scope.newName !== '' && $scope.newName !== null){
            var tag = new Model.Tag;
            tag.setName($scope.newName);
            tagsService.create(tag)
              .then(function(data){
                console.log(data);
                getTags();
              },function(err){

              });
          }

          $('#tagModal').modal('hide');
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
        };

        $scope.deleteTag = function (){
          alert('Assume It is Deleted');
        };


        //
        //
        //
        // Tags
        //
        //
        //


        var getTagsFormatted = function(){
          //console.log('fired');
          $scope.localTags = [];

          for (var i = 0; i < $rootScope.tags.length; i++){
            $scope.localTags.push({id: i, name: $rootScope.tags[i].getName()});
          }

          if($scope.currentCase && $scope.currentCase!==undefined) startListening();
        };

        //To wait until the case is loaded
        var startListening = function () {
          $rootScope.$on('case-loaded', function(){
            assignTags()
          });
          $rootScope.$on('ReasignTags', function(){
            assignTags()
          });
        };

        var assignTags = function () {
          $scope.tagsModel = [];
          for(var i = 0; i < $scope.currentCase.tags.length; i++){
            for(var x = 0; x < $scope.localTags.length; x++){
              if($scope.currentCase.tags[i] === $scope.localTags[x].name){
                $scope.tagsModel.push({id: x});
              }
            }
          }
        };

        var tagsReformatted = function(val){

          var stateFinder = 0;                  // 0 tag input, 1 create Quiz

          if(val && val.length>0){
            if($scope.currentCase && $scope.currentCase!==undefined) {
              stateFinder=1;
              $scope.currentCase.tags = [];
            } else if ($scope.newTags && $scope.newTags!==undefined) {
              stateFinder=0;
              $scope.newTags.tags = [];
            }

            for (var i = 0; i < val.length; i++) {
              for (var x = 0; x < $scope.localTags.length; x++){
                if(val[i].id === $scope.localTags[x].id){
                  if(stateFinder===1){
                    $scope.currentCase.tags.push($scope.localTags[x].name);
                  } else {
                    $scope.newTags.tags.push($scope.localTags[x].name);
                  }
                }
              }
            }

          }
        };

        $scope.$watchCollection(
          "tagsModel",
          function( newValue, oldValue) {
            tagsReformatted(newValue);
          }
        );

        //$scope.$watch(
        //  "currentCase.id",
        //  function( newValue, oldValue) {
        //    console.log('changed');
        //    getTagsFormatted();
        //  }
        //);



        getTags().then(function () {
          getTagsFormatted();
        }, function (e) {

        });

      }
    ]
  );
