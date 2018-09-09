(function() {
  function Message($firebaseArray) {
    var Message = {};
    var ref = firebase.database().ref('messages');
    var messages = $firebaseArray(ref);

    return {
      forChannel: function(channelId) {
        return $firebaseArray(ref.child(channelId));
      }
    };
  }

  angular
    .module('letsSlack')
    .factory('Message', ['$firebaseArray', Message]);
})();
