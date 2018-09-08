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
              Auth.$onAuthStateChanged(function(user) {
                if (user) {
                  $state.go('channels');
                }
              });
            }, function(error) {
              return;
            });
          }
        }
      })
      .state('profile', {
        url: '/profile',
        controller: 'ProfileCtrl as profileCtrl',
        templateUrl: '/templates/profile.html',
        resolve: {
          auth: function($state, User, Auth) {
            return Auth.$requireSignIn().catch(function() {
              $state.go('home');
            });
          },
          profile: function(User, Auth) {
            return Auth.$requireSignIn().then(function(auth) {
              return User.getProfile(auth.uid).$loaded();
            });
          }
        }
      })
      .state('channels', {
        url: '/channels',
        controller: 'ChannelCtrl as channelCtrl',
        templateUrl: '/templates/channels/index.html',
        resolve: {
          channels: function(Channel) {
            return Channel.all;
          },
          profile: function($state, Auth, User) {
            return Auth.$requireSignIn().then(function(auth) {
              return User.getProfile(auth.uid).$loaded().then(function(profile) {
                if(profile.displayName) {
                  return profile;
                } else {
                  $state.go('profile');
                }
              });
            }, function(error) {
              $state.go('home');
            });
          }
        }
      })
      .state('channels.create', {
        url: '/channels-create',
        controller: 'ChannelCtrl as channelCtrl',
        templateUrl: '/templates/channels/create.html'
      });
  }

  angular
    .module('letsSlack', ['ui.router', 'firebase', 'ui.bootstrap', 'ngCookies'])
    .config(config);
})();
