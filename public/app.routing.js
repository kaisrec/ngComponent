(function(){
  'use strict';
  angular.module('app.routing', ['ui.router'])
  .config(function($stateProvider,$urlRouterProvider){
  $stateProvider
    .state('home',{
      url: '/',
      templateUrl:'../views/home.html'
      })
    .state('view1',{
      url: '/view1',
      templateUrl:'../views/page1.html',
      })
    .state('view2',{
      url: '/view2',
      template:'<firstcompo>' // This is Component
      })
    .state('view1.nested',{
      url: '/view1nested',
      template:'<h1>Nested View in Page1</h1></br>'
      })
    .state('view2.nested',{
      url: '/view2nested',
      template:'<h1>Nested View in Page1</h1></br>'
      });
  $urlRouterProvider.otherwise('/');
  });
})()

