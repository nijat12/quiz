'use strict';

/**
 * @ngdoc function
 * @name quizApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the quizApp
 */
app
  .controller('createQuizCtrl',['$scope',
    function ($scope) {
      $scope.mainSelect = 'Multiple Choice';
      $scope.mainSelect2 = 'Multiple Choice';
      $scope.xray = 0;

      $scope.xrayToggle = function(){
        $scope.xray+=1;
      }
    }
  ]
);
