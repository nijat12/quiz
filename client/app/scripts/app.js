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
    'base64',
    'angularSpinner',
    'angularjs-dropdown-multiselect',
    'naif.base64',
    'angularHideHeader',
    'ngTagsInput'
  ])

  .run(['$location', function($location){
    $location.path("/login");
  }])

  .config(function ($stateProvider, $urlRouterProvider) {

    window.paceOptions = {
      ajax: {
        trackMethods:      ['GET', 'POST', 'PUT'],  // takes all verbs...
        trackWebSockets:  false                     // off because LiveReload will cause pace to load forever...
      },
      document:            false,                   // we only care about XHR loads...
      restartOnPushState:  false                    // we only care about XHR requests...
    };

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
        controller: 'quizCtrl'
      })
      .state('header.tests', {
        url:'/view/tests',
        templateUrl: 'views/tests.html',
        controller: 'testCtrl'
      })
      .state('header.tags', {
        url:'/view/tags',
        templateUrl: 'views/tags.html',
        controller: 'tagsCtrl'
      })
      .state('header.viewQuizUser', {
        url:'/view/user',
        templateUrl: 'views/viewQuizUser.html'
        //controller: 'createQuizCtrl'
      })
      .state('header.takeTest', {
        url:'/test',
        templateUrl: 'views/takeQuiz.html',
        controller: 'quizCtrl'
      });

    $urlRouterProvider.otherwise(function($injector, $location){
      var state = $injector.get('$state');
      state.go("header.login", $location.search()); // here we get { query: ... }
      //return $location.path();
    });
  });
