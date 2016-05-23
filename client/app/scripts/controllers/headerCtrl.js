/**
 * Created by nijat on 1/11/16.
 */
app
  .controller('headerCtrl', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $rootScope.user1 = Model.User.fromJson({id: '0001', firstName: 'John', lastName: 'Doe', userName: 'johnDoe111', roles: ['admin'], institutions: 'FIU', address: '111 NW 1st St', state: 'FL', zip: '33128'});
    $rootScope.user2 = Model.User.fromJson({id: '0002', firstName: 'Jane', lastName: 'Doe', userName: 'janeDoe222', roles: ['user'], institutions: 'FIU', address: '111 NW 1st St', state: 'FL', zip: '33128'});
    $rootScope.user = $rootScope.user2;
    $rootScope.tags = [];
  }]);
