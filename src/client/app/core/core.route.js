'use strict'

coreRoute.$inject=['$stateProvider']
function coreRoute($stateProvider){
  $stateProvider
      .state("app", {
        url:'/home',
        template: 'hello' 
      });
}

module.exports = coreRoute;
