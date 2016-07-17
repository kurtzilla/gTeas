
app.directive('wctStoreHeader', function(){
  return {
    restrict: 'E',
    templateUrl: 'partials/header.html',
    scope: {
    },
    controller: ['$scope', '$location', function($scope, $location){
      // console.log('Scope', $scope);
      // console.log('loc path', $location.path());
      
      $scope.view = {};
      $scope.view.isHome = function(){
        return ($location.path().trim().length === 0 ||
          $location.path().trim() === '/' ||
          $location.path().trim().toLowerCase().indexOf('home') !== -1);
      };
      $scope.view.isAbout = function(){
        return $location.path().trim().toLowerCase().indexOf('about') !== -1;
      };
      $scope.view.isContact = function(){
        return $location.path().trim().toLowerCase().indexOf('contact') !== -1;
      };
    }]
  }
})
