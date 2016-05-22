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
  .controller('testCtrl',['$scope', 'testsService', 'sessionService', '$state', '$rootScope', '$q', 'loadIcon', 'tagsService',
      function ($scope, testsService, sessionService, $state, $rootScope, $q, loadIcon, tagsService) {
        $scope.tests = null;
        $scope.newTest = null;
        $scope.newName = null;
        $scope.newDescription = null;
        //$scope.newTags = {};
        $scope.selectedTag = null;
        $scope.matchingCases = null;
        $scope.selection = []; //Case Selection for New Test

        var getTests = function () {
          loadIcon.show();
          testsService.getAll().then(function(data){
            $scope.tests = null;
            $scope.tests = data;
            console.log($scope.tests);
            //getTags().then(function(){
              loadIcon.hide();
            //},function(){
            //  loadIcon.hide();
            //});
          },function(err){
            loadIcon.hide();
          });
        };

        getTests();

        var getTestsByTag = function (tag) {
          //testsService.
        };

        $scope.createJson = function () {

          //console.log($scope.selectedTag);

          if ($scope.newTest.$valid) {
            $scope.newTest = Model.Test.fromJson({name:$scope.newName,status:'Active'});
            if($scope.newDescription){
              $scope.newTest.setDescription($scope.newDescription);
            }
            if($scope.selectedTag){

              //Open another modal to pick Cases with these Tags
              $scope.closeModal();
              testsService.getCasesByTag($scope.selectedTag).then(function (data) {
                console.log(data);
                $scope.matchingCases = data;
                openModal2();
              }, function (err) {
              });


            } else {
              createTest();
            }
          }
        };


        $scope.submitWithCases = function () {
          if($scope.selection.length>0){
            $scope.newTest.setCases($scope.selection);
            $scope.closeModal2();
            createTest();
          } else {
            //Nothing has been selected
          }
        };

        var createTest = function () {
          testsService.createTest($scope.newTest).then(function (data) {
            sessionService.test = data;
            console.log(sessionService.test);
            $('#myModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $state.go('header.createQuiz');
          }, function (err) {
            console.log(err);
          });
        };

        $scope.edit = function (index) {
          sessionService.test = $scope.tests[index];
          $state.go('header.createQuiz');
        };

        $scope.deleteTest = function (index) {
          testsService.delete($scope.tests[index].id)
            .then(function(data){
              console.log(data);
              alert('deleted');
              getTests();
            },function(err){
              console.log(err);
              alert("Couldn't delete, please try again");
            });
        };


        //Checkbox Functionality
        $scope.toggleSelection = function toggleSelection(ids) {
          var idx = $scope.selection.indexOf(ids);

          // is currently selected
          if (idx > -1) {
            $scope.selection.splice(idx, 1);
          }

          // is newly selected
          else {
            $scope.selection.push(ids);
          }
        };



        //Custom Date formatter for Cirm
        Date.prototype.asISODateString = function() {
          var d = this;
          function pad(n){
            return n < 10 ? '0'+n : n
          }
          var result = pad(d.getUTCMonth()+1)+'-'
            + pad(d.getUTCDate())+'-'
            + d.getUTCFullYear();

          return result;
        };


        $scope.closeModal = function () {
          $('#myModal').modal('hide');
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
        };


        var openModal2 = function () {
          $('#myModal2').modal('show');
          $('body').addClass('modal-open');
          $('.modal-backdrop').add();

        };

        $scope.closeModal2 = function () {
          $('#myModal2').modal('hide');
          $('body').removeClass('modal-open');
          $('.modal-backdrop').remove();
        };


        //openModal2();
      }
    ]
  );
