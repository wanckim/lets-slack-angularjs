(function() {
  function Auth($firebaseAuth) {
    var auth = $firebaseAuth();

    return auth;
  }

  angular
    .module('letsSlack')
    .factory('Auth', ['$firebaseAuth', Auth]);
})();
