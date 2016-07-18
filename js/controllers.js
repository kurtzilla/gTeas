

app.controller('HomeController', function($scope, teaService, contextService){
  $scope.view = {};
  $scope.teaService = teaService;
  $scope.viewSettings = contextService.viewSettings;

  $scope.filterByCategory = function (item) {
    // console.log('ITEM', item);
    // console.log('FILTER', $scope.viewSettings.categoryFilter);
    if(!$scope.viewSettings.categoryFilter || $scope.viewSettings.categoryFilter.trim().length === 0){
      return true;
    }
    return item.categories.indexOf($scope.viewSettings.categoryFilter) !== -1;
  };

  $scope.filterByName = function (item) {
    if(!$scope.viewSettings.nameFilter || $scope.viewSettings.nameFilter.trim().length === 0){
      return true;
    }
    return item.name.toLowerCase().indexOf($scope.viewSettings.nameFilter.toLowerCase()) !== -1;
  };

});

app.controller('AboutController', function($scope){

});

app.controller('ContactController', function($scope){

});

app.controller('CheckoutController', function($scope){

});
