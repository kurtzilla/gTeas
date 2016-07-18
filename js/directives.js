
app.directive('caffeineMeter', function(){
  return {
    restrict: 'E',
    templateUrl: 'partials/caffeineMeter.html',
    scope: {
      caffeinemg: '='
    },
    controller: ['$scope', function($scope){
      // console.log('caffeinemg', $scope);
      // TODO determine range of scale
      // let's say that 300 is the highest
      var cafPct = ($scope.caffeinemg/300).toFixed(2);
      var cafLvl = cafPct * 180;

      $scope.caf = {};
      $scope.caf.style = '-webkit-transform: rotate(' + cafLvl + 'deg);' +
        '-moz-transform: rotate(' + cafLvl + 'deg);' +
        'transform: rotate(' + cafLvl + 'deg);'
    }]
  }
});

app.directive('wctCheckoutHeader', function(){
  return {
    restrict: 'E',
    templateUrl: 'partials/checkoutHeader.html',
    scope: {
    },
    controller: ['$scope', 'cartService',
      function($scope, cartService){
        $scope.view = {};
        $scope.cartService = cartService;
    }]
  }
});

app.directive('wctListingHeader', function(){
  return {
    restrict: 'E',
    templateUrl: 'partials/listingHeader.html',
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
