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
        $scope.newTags = {};

        var getTests = function () {
          loadIcon.show();
          testsService.getAll().then(function(data){
            $scope.tests = null;
            $scope.tests = data;
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

        $scope.createJson = function () {

          //console.log($scope.newTags);

          if ($scope.newTest.$valid) {
            $scope.newTest = Model.Test.fromJson({name:$scope.newName,status:'Active'});
            if($scope.newDescription){
              $scope.newTest.setDescription($scope.newDescription);
            }
            if($scope.newTags){
              

              //Open another modal to pick Cases with these Tags


            }

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
          }


          ////Explanations
          //var explanation1 = Model.Explanation.fromJson({label: 'Label Test1', images: ['url1', 'url2']});
          //var explanation2 = Model.Explanation.fromJson({label: 'Label Test2', images: ['url1', 'url2']});
          //var explanation3 = Model.Explanation.fromJson({label: 'Label Test3', images: ['url1', 'url2']});
          //var explanation4 = Model.Explanation.fromJson({label: 'Label Test4', images: ['url1', 'url2']});
          //var explanation5 = Model.Explanation.fromJson({label:'Label Test5', images:['url1','url2']});
          //
          ////Questions
          //var question1 = Model.Question.fromJson({id:'0000001',label:'Test Test test1', answer:false, images:['url1','url2'], explanations:explanation1});
          //var question2 = Model.Question.fromJson({id:'0000002',label:'Test Test test2', answer:false, images:['url1','url2'], explanations:explanation2});
          //var question3 = Model.Question.fromJson({id:'0000003',label:'Test Test test3', answer:false, images:['url1','url2'], explanations:explanation3});
          //var question4 = Model.Question.fromJson({id:'0000004',label:'Test Test test4', answer:false, images:['url1','url2'], explanations:explanation4});
          //var question5 = Model.Question.fromJson({id:'0000005',label:'Test Test test5', answer:false, images:['url1','url2'], explanations:explanation5});
          //
          ////Cases
          //var case1 = Model.Case.fromJson({id:'000001', status:false, images:['url1','url2'], questions:[question1, question2, question3]});
          //var case2 = Model.Case.fromJson({id:'000002', status:false, images:['url1','url2'], questions:[question4, question5]});
          //var case3 = Model.Case.fromJson({id:'000003', status:false, images:['url1','url2'], questions:[question1, question3, question5]});
          //
          ////Tests
          //var test1 = Model.Test.fromJson({name:'Test1', status:'not-taken', description: 'Test1'});
          //var test2 = Model.Test.fromJson({name:'Test2', status:'not-taken', description: 'Test2'});

          ////Users
          //var user = Model.User.fromJson({id: '0001', firstName: 'John', lastName: 'Doe', userName: 'johnDoe123', roles: ['admin'], institutions: 'FIU', address: '111 NW 1st St', state: 'FL', zip: '33128', tests:[test1,test2]});



          //testsService.createTest(test1).then(function (data) {
          //  console.log(data);
          //  test1 = data;
          //}, function (err) {
          //  console.log(err);
          //});
          //testsService.createTest(test2).then(function (data) {
          //  console.log(data);
          //  test2 = data;
          //  //getTests();
          //}, function (err) {
          //  console.log(err);
          //});
        };

        $scope.edit = function (index) {
          sessionService.test = $scope.tests[index];
          $state.go('header.createQuiz');
        };

        $scope.deleteTest = function (index) {
          testsService.delete($scope.tests[index].id)
            .then(function(data){
              console.log(data);
            },function(err){
              console.log(err);
            });
        };

        //var getTags = function () {
        //  var deff = $q.defer();
        //
        //  tagsService.get().then(function(data){
        //    if(data && data.length > 0) {
        //      $rootScope.tags = data;
        //    }
        //    deff.resolve();
        //  },function(err){
        //    console.log(err);
        //    deff.reject();
        //  });
        //
        //  return deff.promise;
        //};



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
      }
    ]
  );
