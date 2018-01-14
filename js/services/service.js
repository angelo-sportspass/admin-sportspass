angular
    .module('app')
    .service('sportspass', function(){

    	var vm = this;

    	vm.baseUrl = 'http://api.dev.local/v1';
    });