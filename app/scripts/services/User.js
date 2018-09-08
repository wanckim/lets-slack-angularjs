(function() {
  function User($firebaseArray, $firebaseObject) {
    var User = {};
    var userRef = firebase.database().ref('users');
    var users = $firebaseArray(userRef);

    User.all = users;

    User.getProfile = function(uid) {
      return $firebaseObject(userRef.child(uid));
    };

    User.getDisplayName = function(uid) {
      return users.$getRecord(uid).displayName;
    };

    User.getGravatar = function(uid) {
      return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
    };

    return User;
  }

  angular
    .module('letsSlack')
    .factory('User', ['$firebaseArray', '$firebaseObject', User])
})();
