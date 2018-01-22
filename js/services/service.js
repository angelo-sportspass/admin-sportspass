angular
    .module('app')
    .service('sportspass', function(){

    	var vm = this;

    	if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    		vm.baseUrl = '//api.dev.local/v1';
    	} else {
    		vm.baseUrl = '//api.sportsnomads.com.au/v1';
    	}
    	
    })
    .service('aws', function(){

        var vm = this;

        vm.bucket        = 'sportspass';
        vm.access_key    = 'AKIAJUS35NHSJ3CC65DQ';
        vm.secret_key    = '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';

        vm.s3StagingLink = 'https://s3-ap-southeast-2.amazonaws.com/sportspass/Staging';
        vm.s3ProductionLink = 'https://s3-ap-southeast-2.amazonaws.com/sportspass/Production';
    });