
app.controller('HomeController', function($scope, teaService, contextService, cartService){
  $scope.view = {};
  $scope.teaService = teaService;
  $scope.viewSettings = contextService.viewSettings;

  $scope.updateCart = function(teaId, form){
    if(form && form.$valid){
      cartService.updateCartItem(teaId, form.input.qty || 1)
      form.input = {};
      form.$setPristine();
    }
  };

  $scope.filterByCategory = function (item) {
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

app.controller('CheckoutController', function($scope, cartService){
  $scope.view = {};
  $scope.view.editIdx = -1;
  $scope.cartService = cartService;

  $scope.updateQuantity = function(id){
    if($scope.view.qty && $scope.view.qty > 0){
      cartService.updateCartItem(id, $scope.view.qty || 1);
    }
    $scope.view.editIdx = -1;
    $scope.view.qty = null;
  };

  $scope.toggleEdit = function(idx){
    if($scope.view.editIdx === idx){
      $scope.view.editIdx = -1;
    } else {
      $scope.view.editIdx = idx;
    }
  };

  $scope.removeItem = function(id){
    $scope.view.editIdx = -1;
    cartService.deleteItem(id);
  };

  $scope.processOrder = function(){
    $scope.view.editIdx = -1;
    cartService.cart.items = [];
  };

});
