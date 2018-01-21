(function () {
  'use strict';

  angular
      .module('app')
      .factory('BannerService', BannerService);

      BannerService.$inject = ['$http', '$window', '$rootScope', '$timeout',  '$location', 'sportspass'];
      function BannerService($http, $window, $rootScope, $timeout, $location, sportspass) {
      	 var service = {};

      	 service.getAll = function() {
      	 	return $http.get( sportspass.baseUrl + '/banner/get-banners');
      	 },

         service.getOne = function(id) {
          return $http.get( sportspass.baseUrl + '/banner/' + id);
         },

         service.update = function(id, data) {
          return $http.put( sportspass.baseUrl + '/banner/' + id, data);
         }

         service.create = function(data) {
          return $http.post( sportspass.baseUrl + '/banner', data);
         }

        service.createBanner = function(data) {

          var config = {
              method: 'POST',
              url: sportspass.baseUrl + '/banner', // /api/upload
              headers: {
                'Content-Type': undefined
              },
              data: data,
              transformRequest: function(data) {

                  var formData = new FormData();

                  angular.forEach(data, function(value, key) {
                    formData.append(key, value);
                  });
                  
                  return formData;  
              }
          };
          
          return $http(config);
         }

        service.updateBanner = function(id, data) {

          var config = {
              method: 'PUT',
              url: sportspass.baseUrl + '/banner/' + id, // /api/upload
              headers: {
                'Content-Type': undefined
              },
              data: data,
              transformRequest: function(data) {

                  var formData = new FormData();

                  formData.append("image", data.image);
                  formData.append("type", data.type);
                  formData.append("banner_categories", data.banner_categories);
                  formData.append("banner_retailer", data.banner_retailer);
                  formData.append("name", data.name);
                  formData.append("url", data.url);
                  formData.append("is_new_tab", data.is_new_tab);
                  formData.append("is_hot_offer", data.is_hot_offer);
                  formData.append("is_home_page", data.is_home_page);
                  formData.append("is_trending_offers", data.is_trending_offers);
                  formData.append("is_trending_experiences", data.is_trending_experiences);
                  formData.append("is_default", data.is_default);
                  formData.append("status", data.status);

                  return formData;  
              }
          };
          
          return $http(config);
         }

         service.delete = function(id) {
          return $http.delete(sportspass.baseUrl + '/banner/' + id);
         }

      	 return service;
      }
  })();