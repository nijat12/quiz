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

      el("cameraInput").addEventListener("change", readImage, false);


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
      }
    }
  ]
);
