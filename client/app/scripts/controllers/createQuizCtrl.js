'use strict';

/**
 * @ngdoc function
 * @name quizApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the quizApp
 */
app
  .controller('createQuizCtrl',['$scope', '$base64', 's3Service', 'sessionService', '$state', 'casesService', '$q',
    function ($scope, $base64, s3Service, sessionService, $state, casesService, $q) {
      $scope.test = sessionService.test;
      $scope.caseIndex = 0;
      $scope.currentCase = new Model.Case;
      $scope.saveState = true;

      //Check if there are any Cases
      if($scope.test.cases && $scope.test.cases.length === 0){
        $scope.test.cases[0] = '';
        $scope.saveState = false;
      }

      //Getting a Case
      var getCase = function(id) {
        if(id !== ''){
          casesService.get(id).then(function (data) {
            $scope.currentCase = data;
            console.log(data);
          }, function (err) {
            console.log(err);
          });
        }
      };

      //Getting all Cases
      var getAllCase = function(id) {
        casesService.getAll(id).then(function(data){
          //$scope.currentCase = data;
          console.log(data);
        },function(err){
          console.log(err);
        });
      };

      //Add new case button
      $scope.addCase = function () {
        checkIfSaved().then(function(){
          addCaseToArray();
        },function(mssg){
          if(mssg === 'saved') addCaseToArray();
        });
      };

      //Adding new case to Case array
      var addCaseToArray = function (){
        $scope.test.cases.push(new Model.Case);
        $scope.caseIndex = $scope.test.cases.length - 1;
        $scope.saveState = false;
        $scope.currentCase = new Model.Case;
      };

      //Changing the currently viewed Case
      $scope.changeCase = function (index) {
        //if ($scope.test.cases[$scope.caseIndex] != index) {
          checkIfSaved().then(function () {
            $scope.caseIndex = index;
            getCase($scope.test.cases[$scope.caseIndex]);
          }, function (mssg) {
            if (mssg === 'saved') {
              $scope.caseIndex = index;
              getCase($scope.test.cases[$scope.caseIndex]);
            }
          });
        //}
      };

      //Save if not Saved
      var checkIfSaved = function () {
        var deff = $q.defer();

        if($scope.saveState === false) {

          //check to update or save
          if($scope.currentCase.id && $scope.currentCase.id !== null){
            console.log("update");
            $scope.update().then(function () {
              deff.resolve();
            }, function () {
              deff.reject('not');
            });
          } else {
            console.log("save");
            $scope.save().then(function () {
              deff.resolve();
            }, function () {
              deff.reject('not');
            });
          }

        } else deff.reject('saved');

        return deff.promise;
      };

      //Adds the case to question
      $scope.save = function () {
        var def = $q.defer();
        casesService.add($scope.test.id, $scope.currentCase)
          .then(function(data){
            $scope.currentCase = data;
            $scope.test.cases[$scope.caseIndex] = data.id;
            $scope.saveState = true;
            def.resolve();
          },function(err){
            console.log(err);
            def.reject();
          });

        return def.promise;
      };

      //Updates the case in question
      $scope.update = function () {
        var def = $q.defer();

        if($scope.test.cases[$scope.caseIndex] !== ''){
          casesService.update($scope.currentCase)
            .then(function (data) {
              //$scope.test.cases[$scope.caseIndex] = data;
              $scope.saveState = true;
              def.resolve();
            }, function (err) {
              console.log(err);
              def.reject();
            });
        }

        return def.promise;
      };



      //run it the first time to make sure everything is in order
      var firstRun = function () {
        //Test Sanity
        if($scope.caseIndex === null || $scope.test.cases === undefined){
          $state.go('header.tests');
        }

        //See what we are dealing with
        console.log($scope.test.cases);
      }();








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
