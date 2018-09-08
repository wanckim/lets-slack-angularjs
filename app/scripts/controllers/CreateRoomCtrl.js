(function() {
  function CreateRoomCtrl($uibModalInstance, Room) {
    var RoomObject = Room;

    this.ok = function(room) {
      RoomObject.add(room);
      $uibModalInstance.close({$value: room});
    };
    this.cancel = function() {
      $uibModalInstance.close({$value: 'cancel'});
    };
  }

  angular
    .module('blocChat')
    .controller('CreateRoomCtrl', ['$uibModalInstance', 'Room', CreateRoomCtrl]);
})();
