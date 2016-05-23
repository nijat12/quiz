'use strict';

/**
 * @ngdoc function
 * @name quizApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the quizApp
 */
app
  .controller('quizCtrl',['$scope', '$base64', 's3Service', 'sessionService', '$state', 'casesService', '$q', 'questionService', 'loadIcon', '$rootScope', 'tagsService',
    function ($scope, $base64, s3Service, sessionService, $state, casesService, $q, questionService, loadIcon, $rootScope, tagsService) {

      //
      //
      // Global
      //
      //

      $scope.test = sessionService.test;
      $scope.allCases = null;
      $scope.caseIndex = 0;
      $scope.currentCase = new Model.Case;
      var backupCase = new Model.Case;
      $scope.questionsOnView = [];
      var questionsOriginal = [];




      //
      //
      //
      //
      // Cases
      //
      //
      //
      //
      $scope.caseTitle = function (){
        if($scope.currentCase){
          if($scope.currentCase.getName() !== null && $scope.currentCase.getName() !== undefined && $scope.currentCase.getName() !== ''){
            return $scope.currentCase.getName();
          } else {
            var calc = $scope.caseIndex+1;
            var rt = 'Case# ' + calc;
            return rt;
          }
        } else {
          var calc = $scope.caseIndex+1;
          var rt = 'Case# ' + calc;
          return rt;
        }

      };

      //Getting a Case
      var getCase = function(id) {
        var d = $q.defer();
        if(id !== ''){
          loadIcon.show();
          casesService.get(id).then(function (data) {
            loadIcon.hide();
            d.resolve(data);
          }, function (err) {
            loadIcon.hide();
            d.reject(err);
          });
        } else d.reject('id is missing to get a case');
        return d.promise;
      };

      //Getting all Cases
      var getAllCases = function() {
        casesService.getAll($scope.test.id).then(function(data){
          //console.log(data);
          $scope.allCases = data;
        },function(err){
          console.log(err);
        });
      };

      //Add new case button
      $scope.addCase = function () {
        checkIfSaved().then(function(){
          addCaseToArray();
        },function(err){
          console.log(err);
        });
      };

      //Adding new case to Case array
      var addCaseToArray = function (){

        saveCase(new Model.Case).then(function(data){
          if(data instanceof Model.Case){
            $scope.currentCase = data;
            $rootScope.$broadcast('ReasignTags');
            backupCase = angular.copy(data);
            $scope.test.cases.push(data.getId());
            $scope.caseIndex = $scope.test.cases.length - 1;
            getAllQuestions().then(function (data) {
              $scope.questionsOnView = data;
              questionsOriginal = angular.copy(data);
            }, function (err) {
              console.log(err);
            })
          }
        },function(err){
          console.log(err);
        });
      };

      //Changing the currently viewed Case
      $scope.changeCase = function (index) {
          checkIfSaved().then(function () {
            getCase($scope.test.cases[index])
              .then(function(data){
                $scope.currentCase = data;
                $rootScope.$broadcast('ReasignTags');
                backupCase = angular.copy(data);
                $scope.caseIndex = index;
                getAllQuestions().then(function (data) {
                  $scope.questionsOnView = data;
                  questionsOriginal = angular.copy(data);
                }, function (err) {
                  console.log(err);
                });
              },function(err){
                console.log(err);
              });
          }, function (err) {
            console.log(err);
          });
      };

      //Save if not Saved
      var checkIfSaved = function () {
        var deff = $q.defer();
        checkIfQuestionSaved().then(function(){
          if (backupCase !== $scope.currentCase){
            updateCase($scope.currentCase)
              .then(function(data){
                backupCase = angular.copy(data);
                getAllCases();
                deff.resolve();
              },function(err){
                deff.reject(err);
              });
          } else deff.resolve();  //Nothing has been changed
        },function(err){
          console.log(err);
          deff.reject(err);
        });

        return deff.promise;
      };

      //Adds the case to question
      var saveCase = function (data) {
        var def = $q.defer();
        loadIcon.show();
        casesService.add($scope.test.id, data)
          .then(function(data){
            loadIcon.hide();
            def.resolve(data);
          },function(err){
            loadIcon.hide();
            def.reject(err);
          });

        return def.promise;
      };

      //Updates the case in question
      var updateCase = function (data) {
        var def = $q.defer();
        loadIcon.show();
        casesService.update(data)
          .then(function (data) {
            loadIcon.hide();
            def.resolve(data);
          }, function (err) {
            loadIcon.hide();
            def.reject(err);
          });

        return def.promise;
      };







      //
      //
      //
      //
      // Question Logic
      //
      //
      //

      //Get all Questions
      var getAllQuestions = function(){
        var d = $q.defer();
        loadIcon.show();
        questionService.getAll($scope.currentCase.getId())
          .then(function (data) {
            loadIcon.hide();
            d.resolve(data);
          }, function (err) {
            loadIcon.hide();
            d.reject(err);
          });

        return d.promise;
      };

      //Add a Question Button
      $scope.addQuestion = function (){
        loadIcon.show();
        checkIfQuestionSaved()
          .then(function () {
            loadIcon.hide();
            addQuestionToArray();
          }, function (err) {
            loadIcon.hide();
            console.log(err);
          });
      };

      var checkIfQuestionSaved = function () {
        var deferred = $q.defer();
        var promises = [];
        var send = [];

        for (var i = 0; i < $scope.questionsOnView.length; i++){
          if(_.isEqual($scope.questionsOnView[i], questionsOriginal[i])){
          } else {
            send.push($scope.questionsOnView[i]);
          }
        }

        if(send.length > 0){
          updateQuestions(send)
            .then(function(){
              deferred.resolve();
              promises.push(deferred.promise);
            }, function(err){
              deferred.reject(err);
              promises.push(deferred.promise);
            });
        } else {
          deferred.resolve();
          promises.push(deferred.promise);
        }
        return $q.all(promises);
      };

      //Save existing question
      var updateQuestions = function (data) {
        var deff = $q.defer();

        questionService.update(data)
          .then(function (data) {
            deff.resolve(data);
          }, function (err) {
            deff.reject(err);
          });

        return deff.promise;
      };

      //Add question to array
      var addQuestionToArray = function () {
        //adding case Id to Question
        var q = new Model.Question;
        q.setCaseId($scope.currentCase.getId());
        var array = [];
        array.push(q);

        saveQuestion(array)
          .then(function(data){
            $scope.questionsOnView.push(data);
            questionsOriginal.push(angular.copy(data));
            $scope.currentCase.questions.push(data.getId());
            checkIfSaved().then(function(){
              //Do nothing
            },function(err){
              console.log(err);
            });
          },function(err){
            console.log(err);
          });
      };

      //Add a new Question
      var saveQuestion = function (data) {
        var def = $q.defer();

        //console.log(data);

        if (data) {
          loadIcon.show();
          questionService.add($scope.currentCase.getId(), data)
            .then(function (obj) {
              loadIcon.hide();
              def.resolve(obj);
            }, function (err) {
              loadIcon.hide();
              def.reject(err);
            });
        } else {
          def.reject('Question Model is missing');
        }

        return def.promise;
      };



      //
      //
      // Upload Images
      //
      //
      $scope.myfile=[];

      $scope.uploadFilesToCase = function (event, base64, files) {
        if(base64 && base64.length > 0){
          for(var i = 0; i< base64.length; i++){

            loadIcon.show();
            casesService.image(base64[i].base64,base64[i].filetype)
              .then(function(data){
                loadIcon.hide();
                $scope.currentCase.images.push(data);
                checkIfSaved();
                //console.log($scope.currentCase);
              },function(err){
                loadIcon.hide();
              });
          }
        }
      };

      $scope.deleteImageFromCase = function (index){
        $scope.currentCase.images.splice(index,1);
        checkIfSaved();
      };


      var iIndex = null;
      $scope.imageOnFocus = function(index){
        iIndex=index;
        //console.log(index);
      };

      $scope.uploadFilesToQuestion = function(event, base64, files){

        var ind = iIndex;
        //console.log(ind);

        if(base64 && base64.length > 0){
          for(var i = 0; i< base64.length; i++){

            //console.log($scope.currentCase);

            //
            //console.log(base64[i]);
            //console.log(ind);
            //
            //console.log($scope.questionsOnView[ind]);

            loadIcon.show();
            casesService.image(base64[i].base64,base64[i].filetype)
              .then(function(data){
                loadIcon.hide();
                $scope.questionsOnView[ind].images.push(data);
                $scope.saveAll();
                //console.log($scope.currentCase);
              },function(err){
                loadIcon.hide();
              });
            iIndex = null;
          }
        }
      };


      $scope.deleteImageFromQuestion = function (parentIndex, index){
        $scope.questionsOnView[parentIndex].images.splice(index,1);
        checkIfSaved();
      };







      //
      //
      // General Code
      //
      //

      //The word count of a text
      $scope.countOf = function(text) {
        var s = text ? text.split(/\s+/) : 0; // it splits the text on space/tab/enter
        return s ? s.length : '';
      };

      //Save
      $scope.saveAll = function () {
        checkIfSaved().then(function(){
            console.log("Saved");
        },function(err){
          console.log("Failed!");
          console.log(err);
        });
      };

      //Next Case view
      $scope.nextCase = function () {
        console.log($scope.test);
        console.log($scope.caseIndex);
        $scope.changeCase($scope.caseIndex + 1);
      };

      // Getting Images for sidebar
      $scope.getIMages = function(index){

      };

      //Scroll to bottom
      var scrollBottom = function () {
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
      };

      //Run when you leave the page
      //Save the questions
      $scope.$on("$destroy", function(){
        //alert('Hey!');
      });


      //Firefox Fix
      $scope.firefoxClass = '';
      $scope.addClassToInput = function(){$scope.firefoxClass = 'has-focus';};
      $scope.removeClassToInput = function(){$scope.firefoxClass = '';};



      //
      //
      //
      // Init
      //
      //
      //


      //run it the first time to make sure everything is in order
      var firstRun = function () {
        //Test Sanity
        if($scope.caseIndex === null || $scope.test.cases === undefined){
          $state.go('header.tests');
        } else {
          if ($scope.test.cases.length !== 0 && $scope.test.cases[0] !== null && $scope.test.cases[0] !== '') {
            getCase($scope.test.cases[0])
              .then(function(data){
                $scope.currentCase = data;
                backupCase = angular.copy(data);
                getAllCases();
                getAllQuestions().then(function (data) {
                  //console.log($scope.currentCase);
                  $scope.questionsOnView = data;
                  questionsOriginal = angular.copy(data);
                  $rootScope.$broadcast('case-loaded');

                }, function (err) {
                  console.log(err);
                });
              },function(err){
              });
          } else {
            //New one has to be created
            addCaseToArray();
          }


          //getTagsFormatted();
        }
      };

      firstRun();
    }

  ]
);
