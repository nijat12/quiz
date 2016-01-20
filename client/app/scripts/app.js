'use strict';

/**
 * @ngdoc overview
 * @name quizApp
 * @description
 * # quizApp
 *
 * Main module of the application.
 */
var app = angular
  .module('quizApp', [
    'ngAnimate',
    'ngAria',
    'ngMessages',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ngDialog',
    'ngFileUpload',
    'base64',
    'angularSpinner'
  ])

  //.run(['$location', function($location){
  //  $location.path("/login");
  //}])

  .config(function ($stateProvider, $urlRouterProvider) {

    window.paceOptions = {
      ajax: {
        trackMethods:      ['GET', 'POST', 'PUT'],  // takes all verbs...
        trackWebSockets:  false                     // off because LiveReload will cause pace to load forever...
      },
      document:            false,                   // we only care about XHR loads...
      restartOnPushState:  false                    // we only care about XHR requests...
    };

    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('header', {
        templateUrl: 'views/header.html',
        controller: 'headerCtrl'
      })
      .state('header.login', {
        url:'/',
        templateUrl: 'views/login.html'
        //controller: 'headerCtrl'
      })
      .state('header.createQuiz', {
        url:'/create',
        templateUrl: 'views/createQuiz.html',
        controller: 'createQuizCtrl'
      })
      .state('header.tests', {
        url:'/view/tests',
        templateUrl: 'views/tests.html',
        controller: 'testCtrl'
      })
      .state('header.viewQuizUser', {
        url:'/view/user',
        templateUrl: 'views/viewQuizUser.html'
        //controller: 'createQuizCtrl'
      })
      .state('header.takeTest', {
        url:'/test',
        templateUrl: 'views/takeQuiz.html',
        controller: 'takeQuizCtrl'
      });
  });
