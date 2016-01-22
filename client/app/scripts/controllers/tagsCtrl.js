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

        var getTags = function () {
          loadIcon.show();
          tagsService.get().then(function (data) {
            if(data && data.length > 0) {
              $rootScope.tags = data;
            }
            loadIcon.hide();
          }, function () {
            loadIcon.hide();
          });
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

        getTags();

      }
    ]
  );
