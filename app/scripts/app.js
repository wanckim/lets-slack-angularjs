(function() {
  function config($locationProvider, $stateProvider) {
    $locationProvider
      .html5Mode({
        enabled: true,
        requireBase: false
      });

    $stateProvider
      .state('home', {
        url: '/',
        controller: 'HomeCtrl as home',
        templateUrl: '/templates/home.html',
        resolve: {
          requireNoAuth: function($state, Auth) {
            Auth.$requireSignIn().then(function(auth) {
              console.log(auth.email);
              // $state.go('home');
            }, function(error) {
              return;
            });
          }
        }
      });
  }

  angular
    .module('letsSlack', ['ui.router', 'firebase', 'ui.bootstrap', 'ngCookies'])
    .config(config);
})();
