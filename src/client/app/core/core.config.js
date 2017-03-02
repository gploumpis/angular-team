'use strict'
coreConfig.$inject=['$locationProvider','$urlRouterProvider']
function coreConfig($locationProvider,$urlRouterProvider){
  $locationProvider.html5Mode(false);
  $locationProvider.hashPrefix('!');

  $urlRouterProvider.otherwise('home');
}

module.exports = coreConfig;
