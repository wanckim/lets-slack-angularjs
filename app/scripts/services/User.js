(function() {
  function User($firebaseArray, $firebaseObject) {
    var User = {};
    var userRef = firebase.database().ref('users');
    var connectedRef = firebase.database().ref('.info/connected');
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

    User.setOnline = function(uid) {
      var connected = $firebaseObject(connectedRef);
      var online = $firebaseArray(userRef.child(uid+'/online'));

      connected.$watch(function() {
        if(connected.$value) {
          online.$add(true).then(function(connectedRef) {
            connectedRef.onDisconnect().remove();
          });
        }
      });
    };

    return User;
  }

  angular
    .module('letsSlack')
    .factory('User', ['$firebaseArray', '$firebaseObject', User])
})();
