(function() {
  function Auth($firebaseAuth) {
    var auth = $firebaseAuth();

    return auth;
  }

  angular
    .module('blocChat')
    .factory('Auth', ['$firebaseAuth', Auth]);
})();
