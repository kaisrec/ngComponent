(function() {
function firstcompo (){
    return {
        //bindings:{message:'@'},
        controller:ctrl,
        controllerAs:'vm',
        templateUrl:'movielist/movie.list.view.html'
        };
}
function ctrl($http){
    var vm = this; 
    vm.showit = function(){console.log(vm.agence)};
    vm.$onInit = function(){ $http.get('/agences').then(function(res){vm.data = res.data;})};
    vm.$onChanges = function(e){console.log(e)};
}
angular.module('myApp')
    .component('firstcompo',firstcompo());
})();

