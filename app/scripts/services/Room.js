(function() {
  function Room($firebaseArray) {
    var Room = {};
    var ref = firebase.database().ref().child("rooms");
    var rooms = $firebaseArray(ref);

    Room.add = function(room) {
      rooms.$add(room).then(function(ref) {
        var id = ref.key;
        rooms.$indexFor(id);
      });
    };

    Room.all = rooms;

    return Room;
  }

  angular
    .module('letsSlack')
    .factory('Room', ['$firebaseArray', Room]);
})();
