(function () {
  'use strict';

  angular
      .module('app')
      .factory('ClubsService', ClubsService);

      ClubsService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function ClubsService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.getAll = function() {
      	 	return $http.get( sportspass.baseUrl + '/club/get-clubs');
      	 },

         service.getOne = function(id) {
          return $http.get( sportspass.baseUrl + '/club/' + id);
         },

         service.update = function(id, data) {
          return $http.put( sportspass.baseUrl + '/club/' + id, data);
         }

         service.create = function(data) {
          return $http.post( sportspass.baseUrl + '/club', data);
         }

         service.delete = function(id) {
          return $http.delete(sportspass.baseUrl + '/club/' + id);
         }

         service.getClubBanners = function(id) {
          return $http.get( sportspass.baseUrl + '/club/club-banners/' + id);
         }

         service.clubBannersSort = function(data) {
          return $http.post( sportspass.baseUrl + '/club/sort-club-banners', data);
         }

         service.createClub = function(data) {

          var config = {
              method: 'POST',
              url: sportspass.baseUrl + '/club', // /api/upload
              headers: {
                'Content-Type': undefined
              },
              data: data,
              transformRequest: function(data) {

                  var formData = new FormData();

                  formData.append("logo", data.logo);
                  formData.append("banner_image", data.banner_image);
                  formData.append("front_card_image", data.front_card_image);
                  formData.append("email_header_image", data.email_header_image);

                  formData.append("name", data.name);
                  formData.append("club_prefix", data.club_prefix);
                  formData.append("link", data.link);
                  formData.append("is_barcode", data.is_barcode);
                  formData.append("expiry", data.expiry);

                  formData.append("sport_name", data.sport_name);
                  formData.append("officer", data.officer);
                  formData.append("officer_position", data.officer_position);

                  return formData;  
              }
          };
          
          return $http(config);
         }

        service.updateClub = function(id, data) {

            var config = {
              method: 'PUT',
              url: sportspass.baseUrl + '/club/'+id, // /api/upload
              headers: {
                'Content-Type': undefined
              },
              data: data,
              transformRequest: function(data) {

                  var formData = new FormData();

                  formData.append("logo", data.logo);
                  formData.append("banner_image", data.banner_image);
                  formData.append("front_card_image", data.front_card_image);
                  formData.append("email_header_image", data.email_header_image);

                  formData.append("name", data.name);
                  formData.append("club_prefix", data.club_prefix);
                  formData.append("link", data.link);
                  formData.append("is_barcode", data.is_barcode);
                  formData.append("expiry", data.expiry);

                  formData.append("sport_name", data.sport_name);
                  formData.append("officer", data.officer);
                  formData.append("officer_position", data.officer_position);

                  return formData;  
              }
          };
          
          return $http(config);
        }

      	 return service;
      }
  })();