(function() {
  function Channel($firebaseArray) {
    var Channel = {};
    var ref = firebase.database().ref('channels');
    var channels = $firebaseArray(ref);

    Channel.all = channels;

    return Channel;
  }

  angular
    .module('letsSlack')
    .factory('Channel', ['$firebaseArray', Channel]);
})();
