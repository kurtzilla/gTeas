
app.service('cartService', ['teaService', function(teaService){
  this.cart = {};
  this.cart.items = [];//sku, qty

  this.getItem = function(id){
    return this.cart.items.find(function(itm){
      return itm.sku === id;
    });
  };

  this.getItemIndex = function(id){
    return this.cart.items.findIndex(function(itm){
      return itm.sku === id;
    });
  };

  this.deleteItem = function(id){
    var existing = this.getItemIndex(id);
    if(existing !== -1){
      this.cart.items.splice(existing, 1);
    }
  };

  this.updateCartItem = function(id, qty){
    var existing = this.getItem(id);

    if(existing){
      existing.qty += qty;
      // limit to ten
      if(existing.qty > 10){
        existing.qty = 10;
      }
    } else {
      this.cart.items.push({'sku':id, 'qty': qty});
    }
  };

  this.status = function(){
    var num = this.numItems();
    return (num > 0) ? num.toString() + ' items' : 'Empty!';
  };

  this.numItems = function(){
    return this.cart.items.length;
  };

  this.qtyItems = function(){
    return this.cart.items.reduce(function(total, item) {
      return total + item.qty;
    }, 0);
  };

  this.subtotal = function(){
    this.cart.items.reduce(function(total, item) {
      var tea = teaService.teaById(item.sku);
      return total + (Number(tea.price) * .01);
    }, 0);
  }
}]);

app.service('contextService', function(){
  this.viewSettings = {};
  this.viewSettings.nameFilter = '';
  this.viewSettings.categoryFilter = '';
  this.viewSettings.priceSortDirection = 'false';
});

app.service('teaService', function(){

  this.getCategories = function(){
    var coll = [];

    this.store.forEach(function(itm){
      itm.categories.forEach(function(ele){
        if(coll.indexOf(ele) === -1){
          coll.push(ele);
        }
      });
    });

    return coll.sort();
  };

  this.getMaxStoreId = function(){
    var maxCallback = ( max, cur ) => Math.max( max, cur );
    return this.store.map( el => el._id )
                     .reduce( maxCallback , 0 );
  };

  this.teaCreate = function(_name, _ingredients, _caffeineScale, _price,
    _inStock, _rating, _imageUrl, _categoriesArr){

    var _id = (parseInt(getMaxStoreId(), 16) +0x1).toString (16);
    var _v = 0;

    this.store.push({
      _id: _id,
      name: _name,
      ingredients: _ingredients,
      caffeineScale: _caffeineScale,
      price: _price,
      inStock: _inStock,
      rating: _rating,
      imageUrl: _imageUrl,
      __v: _v,
      categories: _categoriesArr
    });

    return _id;
  };
  this.teaById = function(id){
    return this.store.find(function(itm){
      return itm._id === id;
    });
  };
  this.teaIndexById = function(id){
    return this.store.findIndex(function(itm){
      return itm._id === id;
    });
  };
  // update?
  this.teaUpdate= function(id, _name, _ingredients, _caffeineScale, _price,
                          _inStock, _rating, _imageUrl, _v, _categoriesArr){
    var tea = this.teaById(id);
    if(tea){
      tea.name = _name;
      tea.ingredients = _ingredients,
      tea.caffeineScale = _caffeineScale,
      tea.price = _price,
      tea.inStock = _inStock,
      tea.rating = _rating,
      tea.imageUrl = _imageUrl,
      tea.__v = _v,
      tea.categories = _categoriesArr
    }
  };

  this.teaDelete = function(ordinal_id){
    this.store.splice(ordinal_id,1);
  };

  this.store = [
      {
          "_id": "55c8ee82152165d244b98300",
          "name": "Bayard stew",
          "ingredients": "concentrated gluten, jewelry, dill, beetle nut, toast",
          "caffeineScale": 244,
          "price": 1540,
          "inStock": true,
          "rating": 1,
          "imageUrl": "http://s7d5.scene7.com/is/image/Teavana/32664_d?$cimg$",
          "__v": 0,
          "categories": [ "dark", "cold"]
      },

      {
          "_id": "55c8ee82152165d244b98301",
          "name": "Incompactness syrup",
          "ingredients": "fennel, nutmeg leaves, parsley, cream of 'cream of cream', blarney",
          "caffeineScale": 49,
          "price": 7348,
          "inStock": true,
          "rating": 2,
          "imageUrl": "http://s7d5.scene7.com/is/image/Teavana/32303_d?$cimg$",
          "__v": 0,
          "categories": ["awesome"]
      },
      {
          "_id": "55c8ee82152165d244b98302",
          "name": "Flexner white tea",
          "ingredients": "hot sauce, iron, beetle nut, fresco, blarney, raw mashed potato",
          "caffeineScale": 38,
          "price": 4991,
          "inStock": true,
          "rating": 4,
          "imageUrl": "http://s7d5.scene7.com/is/image/Teavana/31358_d?$cimg$",
          "__v": 0,
          "categories": ["cold"]
      },
      {
          "_id": "55c8ee82152165d244b98303",
          "name": "Pressor leaf",
          "ingredients": "purina chow, flavorings, pepper, acorns, quality tallow, old sock, bay leaf",
          "caffeineScale": 153,
          "price": 5496,
          "inStock": true,
          "rating": 1,
          "imageUrl": "http://s7d5.scene7.com/is/image/Teavana/31358_d?$cimg$",
          "__v": 0,
          "categories": ["dry", "hot", "awesome"]
      },
      {
          "_id": "55c8ee82152165d244b98304",
          "name": "Flexner veggie tea",
          "ingredients": "cream of tartar, eggplant, cake, deer antler",
          "caffeineScale": 181,
          "price": 2445,
          "inStock": true,
          "rating": 1,
          "imageUrl": "http://s7d5.scene7.com/is/image/Teavana/32621_d?$cimg$",
          "__v": 0,
          "categories": ["summer"]
      },
      {
          "_id": "55c8ee82152165d244b98305",
          "name": "Topflighter malt",
          "ingredients": "botox, toast, cream of 'cream of 'cream of cream'', kitchen scraps, beef, aligator tongue, lawn clippings",
          "caffeineScale": 241,
          "price": 4486,
          "inStock": true,
          "rating": 3,
          "imageUrl": "http://s7d5.scene7.com/is/image/Teavana/31359_d?$cimg$",
          "__v": 0,
          "categories": ["dry","lucid","warm"]
      },
      {
          "_id": "55c8ee82152165d244b98306",
          "name": "Cooking mix",
          "ingredients": "flavorings, roasted mushrooms, toast, tumeric",
          "caffeineScale": 230,
          "price": 6973,
          "inStock": true,
          "rating": 3,
          "imageUrl": "http://s7d5.scene7.com/is/image/Teavana/32303_d?$cimg$",
          "__v": 0,
          "categories": ["summer"]
      },
      {
          "_id": "55c8ee82152165d244b98307",
          "name": "Cooking stew",
          "ingredients": "eggplant",
          "caffeineScale": 122,
          "price": 6003,
          "inStock": true,
          "rating": 2,
          "imageUrl": "http://s7d5.scene7.com/is/image/Teavana/31358_d?$cimg$",
          "__v": 0,
          "categories": ["dry","winter","lucid"]
      },
      {
          "_id": "55c8ee82152165d244b98308",
          "name": "Prevenient herb tea",
          "ingredients": "cream of tartar, cream of cream, kitchen scraps, flavorings",
          "caffeineScale": 196,
          "price": 1374,
          "inStock": true,
          "rating": 3,
          "imageUrl": "http://s7d5.scene7.com/is/image/Teavana/32174_d?$cimg$",
          "__v": 0,
          "categories": ["lucid","hot"]
      },
      {
          "_id": "55c8ee82152165d244b98309",
          "name": "Angular mix",
          "ingredients": "hot sauce, lawn clippings, fennel, parsley, quinine",
          "caffeineScale": 196,
          "price": 4158,
          "inStock": true,
          "rating": 2,
          "imageUrl": "http://s7d5.scene7.com/is/image/Teavana/32621_d?$cimg$",
          "__v": 0,
          "categories": ["spring", "warm","winter"]
      }
  ];

});
