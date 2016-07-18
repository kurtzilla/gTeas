
app.directive('wctListingFunctionHeader', function(){
  return {
    restrict: 'E',
    templateUrl: 'partials/listingFunctionHeader.html',
    scope: {
    },
    controller: ['$scope', 'teaService', 'contextService', 'cartService', '$location',
      function($scope, teaService, contextService, cartService, $location){
        $scope.view = {};
        $scope.viewSettings = contextService.viewSettings;
        $scope.teaService = teaService;
        $scope.cartService = cartService;

        $scope.gotoCheckout = function(){
          $location.path('/checkout');
        };
    }]
  }
});


app.directive('wctStoreHeader', function(){
  return {
    restrict: 'E',
    templateUrl: 'partials/header.html',
    scope: {
    },
    controller: ['$scope', '$location', 'contextService', function($scope, $location, contextService){
      // console.log('Scope', $scope);
      // console.log('loc path', $location.path());

      $scope.view = {};
      $scope.viewSettings = contextService.viewSettings;

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
});






















//
