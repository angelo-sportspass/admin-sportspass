angular
    .module('app')
    .service('sportspass', function(){

    	var vm = this;

    	if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    		vm.baseUrl = '//api.dev.local/v1';
    	} else {
    		vm.baseUrl = '//api.sportsnomads.com.au/v1';
    	}
    	
    });