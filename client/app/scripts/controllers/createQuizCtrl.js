'use strict';

/**
 * @ngdoc function
 * @name quizApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the quizApp
 */
app
  .controller('createQuizCtrl',['$scope', '$base64', 's3Service',
    function ($scope, $base64, s3Service) {
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

      $scope.createJson = function () {

        //Explanations
        var explanation1 = Model.Explanation.fromJson({label: 'Label Test1', images: ['url1', 'url2']});
        var explanation2 = Model.Explanation.fromJson({label: 'Label Test2', images: ['url1', 'url2']});
        var explanation3 = Model.Explanation.fromJson({label: 'Label Test3', images: ['url1', 'url2']});
        var explanation4 = Model.Explanation.fromJson({label: 'Label Test4', images: ['url1', 'url2']});
        var explanation5 = Model.Explanation.fromJson({label:'Label Test5', images:['url1','url2']});

        //Questions
        var question1 = Model.Question.fromJson({id:'0000001',label:'Test Test test1', answer:false, images:['url1','url2'], explanations:explanation1});
        var question2 = Model.Question.fromJson({id:'0000002',label:'Test Test test2', answer:false, images:['url1','url2'], explanations:explanation2});
        var question3 = Model.Question.fromJson({id:'0000003',label:'Test Test test3', answer:false, images:['url1','url2'], explanations:explanation3});
        var question4 = Model.Question.fromJson({id:'0000004',label:'Test Test test4', answer:false, images:['url1','url2'], explanations:explanation4});
        var question5 = Model.Question.fromJson({id:'0000005',label:'Test Test test5', answer:false, images:['url1','url2'], explanations:explanation5});

        //Cases
        var case1 = Model.Case.fromJson({id:'000001', status:false, images:['url1','url2'], questions:[question1, question2, question3]});
        var case2 = Model.Case.fromJson({id:'000002', status:false, images:['url1','url2'], questions:[question4, question5]});
        var case3 = Model.Case.fromJson({id:'000003', status:false, images:['url1','url2'], questions:[question1, question3, question5]});

        //Tests
        var test1 = Model.Test.fromJson({id:'00001', name:'Test1', created:'01/01/2000', status:'not-taken', updated:'01/01/2015', cases:[case1,case2, case3]});
        var test2 = Model.Test.fromJson({id:'00002', name:'Test2', created:'01/02/2000', status:'not-taken', updated:'01/02/2015', cases:[case1,case3]});

        //Users
        var user = Model.User.fromJson({id: '0001', firstName: 'John', lastName: 'Doe', userName: 'johnDoe123', roles: ['admin'], institutions: 'FIU', address: '111 NW 1st St', state: 'FL', zip: '33128', tests:[test1,test2]});


        console.log(JSON.stringify(user));
      };
      $scope.createJson();
    }
  ]
);
