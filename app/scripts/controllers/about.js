'use strict';

/**
 * @ngdoc function
 * @name quizApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the quizApp
 */
app
  .controller('AboutCtrl',['$scope', 'questionService',
    function ($scope, questionService) {


      $scope.awesomeThings = [
        'HTML5 Boilerplate',
        'AngularJS',
        'Karma'
      ];

      var getQuestion = function () {
        //questionService.getQuestions().then(function(){},function(){});
      };



    }
  ]
);
