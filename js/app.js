
var app = angular.module('myApp', ['ngRoute', 'ngAnimate']);

app.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/about', {
      templateUrl: 'partials/about.html',
      //controller: 'AboutController'
    })
    .when('/contact', {
      templateUrl: 'partials/contact.html',
      // controller: 'ContactController'
    })
    .when('/checkout', {
      templateUrl: 'partials/checkout.html',
      controller: 'CheckoutController'
    })
    .otherwise( {
      templateUrl: 'partials/home.html',
      controller: 'HomeController'
    });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
});
