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
        vm.s3StagingLink = 'https://s3-ap-southeast-2.amazonaws.com/sportspass/Staging';
        vm.s3ProductionLink = 'https://s3-ap-southeast-2.amazonaws.com/sportspass/Production';
    })
    .service('fields', function(){

        var vm = this;

        vm.default = [{"type":"text","label":"Last Name","name":"last-name","description":"Enter the last name of the participant/player","placeholder":"Last Name"},{"order":0,"label":"First Name","name":"first-name","description":"Enter the first name of the participant/player","type":"text","placeholder":"First Name"},{"order":0,"label":"Member Number","name":"member-number","description":"Enter the member number in your email","type":"text","placeholder":"Member Number"},{"order":0,"label":"Participant Photo","type":"file","description":"Upload a photo of the participant/player","name":"avatar"}];
    });