/**
 * Created by nijat on 1/30/16.
 */
app.controller('questionCtrl', ['$scope',
  function ($scope){
    $scope.mainSelect = 'Normal';
    $scope.mainSelect2 = 'Normal';
    $scope.xray = 0;
    $scope.xray2 = 0;
    $scope.open = false;

    $scope.xrayToggle = function(){
      $scope.xray+=1;
    };

    $scope.secondXrayToggle = function(){
      $scope.xray2+=1;
    };

    //$scope.myfile=null;
    //
    //$scope.uploadFilesToQuestion = function (event, base64, files) {
    //  if(base64 && base64.length > 0){
    //    for(var i = 0; i< base64.length; i++){
    //
    //      casesService.image(base64[i].base64,base64[i].filetype)
    //        .then(function(data){
    //          //$scope.currentCase.images.push(data);
    //          //checkIfSaved();
    //          //console.log($scope.currentCase);
    //        },function(err){
    //
    //        });
    //    }
    //  }
    //};
    //
    //$scope.deleteImageFromQuestion = function (index){
    //  $scope.currentCase.images.splice(index,1);
    //  checkIfSaved();
    //};
    //
    //
    ////Firefox Fix
    //$scope.firefoxClass = '';
    //$scope.addClassToInput = function(){$scope.firefoxClass = 'has-focus';};
    //$scope.removeClassToInput = function(){$scope.firefoxClass = '';};
  }
]);
