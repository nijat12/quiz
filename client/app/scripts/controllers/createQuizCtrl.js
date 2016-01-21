'use strict';

/**
 * @ngdoc function
 * @name quizApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the quizApp
 */
app
  .controller('createQuizCtrl',['$scope', '$base64', 's3Service', 'sessionService', '$state', 'casesService', '$q', 'questionService', 'loadIcon',
    function ($scope, $base64, s3Service, sessionService, $state, casesService, $q, questionService, loadIcon) {
      $scope.test = sessionService.test;
      $scope.caseIndex = 0;
      $scope.currentCase = new Model.Case;
      var backupCase = new Model.Case;
      $scope.questionsOnView = [];
      var questionsOriginal = [];

      $scope.caseTitle = function (){
        if($scope.currentCase){
          if($scope.currentCase.getName() !== null && $scope.currentCase.getName() !== undefined){
            return $scope.currentCase.getName();
          } else {
            var rt = $scope.caseIndex+1;
            return rt;
          }
        } else {
          var rt = $scope.caseIndex+1;
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
      var getAllCases = function(id) {
        casesService.getAll(id).then(function(data){
          console.log(data);
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
            backupCase = angular.copy(data);
            $scope.test.cases.push(data.getId());
            $scope.caseIndex = $scope.test.cases.length - 1;
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
                backupCase = angular.copy(data);
                $scope.caseIndex = index;
                if($scope.currentCase.questions.length > 0){
                  getAllQuestions().then(function (data) {
                    $scope.questionsOnView = data;
                    questionsOriginal = data;
                  }, function (err) {
                    console.log(err);
                  });
                }
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







      /////////////////////Question Logic/////////////

      ////Get a Question
      //var getQuestion = function(id, position){
      //  if(id !== ''){
      //    questionService.get(id).then(function(data){
      //      $scope.questionsOnView[position] = data;
      //      questionsOriginal[position] = data;
      //      console.log(data);
      //    }, function (err){
      //      console.log(err);
      //    });
      //  }
      //};

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

        for (var i = 0; i < $scope.questionsOnView.length; i++){
          if($scope.questionsOnView[i] !== questionsOriginal[i]){

            updateQuestions($scope.questionsOnView[i])
              .then(function(data){
                $scope.questionsOnView[i] = data;
                questionsOriginal[i] = data;
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
            questionsOriginal.push(data);
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

        console.log(data);

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
                getAllQuestions().then(function (data) {
                  $scope.questionsOnView = data;
                  questionsOriginal = data;
                }, function (err) {
                  console.log(err);
                });
              },function(err){
              });
          } else {
            //New one has to be created
            addCaseToArray();
          }
        }
      }();

      //Scroll to bottom
      var scrollBottom = function () {
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
      };

      //Run when you leave the page
      //Save the questions
      $scope.$on("$destroy", function(){
        //alert('Hey!');
      });








      $scope.mainSelect = 'True';
      $scope.mainSelect2 = 'True';
      $scope.xray = 0;
      $scope.xray2 = 0;
      $scope.open = false;
      var base64 = null;

      $scope.xrayToggle = function(){
        $scope.xray+=1;
      };

      $scope.secondXrayToggle = function(){
        $scope.xray2+=1;
      };

      // Photo to Base64 converter
      var base64Convert = function (image) {

        var FR= new FileReader();
        FR.onload = function(e) {
          //el("img").src = e.target.result;
          base64 = e.target.result.split(",");
        };
        FR.readAsDataURL( this.files[0] );

      };


      // Photo to Base64 converter
      function el(id){return document.getElementById(id);} // Get elem by ID

      function readImage() {
        if ( this.files && this.files[0] ) {
          var FR= new FileReader();
          FR.onload = function(e) {
            //el("img").src = e.target.result;
            base64 = e.target.result.split(",");
          };
          FR.readAsDataURL( this.files[0] );
        }
      }

      //el("cameraInput").addEventListener("change", readImage, false);


      $scope.uploadFiles = function (files, errFiles) {
        $scope.files = files;
        $scope.errFiles = errFiles;
        angular.forEach(files, function(file) {

          var base64 = base64Convert(file);
          //console.log(base64);

          //base64 = base64.split(",");
          //
          //if (base64 != null){
          //
          //  //Geting image type
          //  var type = "jpg";
          //
          //  if (base64[0].indexOf("image/png") > -1){type = "png";}
          //
          //  s3Service.saveFile('image_311_direct_', type, base64[1])
          //    .then(function(mediaData){
          //        $scope.sr.mediaUrl = mediaData.url;
          //        $scope.sr.mediaFile = mediaData.key;
          //
          //        console.log($scope.sr.mediaUrl);
          //        submitSRapi();
          //      },
          //      function(error){
          //
          //        alert('Error: Cannot send the Picture. Please try again')
          //      });
          //} else {
          //  //do something
          //}
          //
          //
          //
          //file.upload = Upload.upload({
          //  url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
          //  data: {file: file}
          //});
          //
          //file.upload.then(function (response) {
          //  $timeout(function () {
          //    file.result = response.data;
          //  });
          //}, function (response) {
          //  if (response.status > 0)
          //    $scope.errorMsg = response.status + ': ' + response.data;
          //}, function (evt) {
          //  file.progress = Math.min(100, parseInt(100.0 *
          //    evt.loaded / evt.total));
          //});
        });
      };
    }
  ]
);
