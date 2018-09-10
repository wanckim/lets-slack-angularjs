(function() {
  function Message($firebaseArray) {
    var channelMessageRef = firebase.database().ref('channelMessages');

    var userMessageRef = firebase.database().ref('userMessages');

    return {
      forChannel: function(channelId) {
        return $firebaseArray(channelMessageRef.child(channelId));
      },
      forUser: function(uid1, uid2) {
        var path = uid1 < uid2 ? uid1+'/'+uid2 : uid2+'/'+uid1;

        return $firebaseArray(userMessageRef.child(path));
      }
    };
  }

  angular
    .module('letsSlack')
    .factory('Message', ['$firebaseArray', Message]);
})();
