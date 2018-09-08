(function() {
  function HomeCtrl(Room, Message, $uibModal, $cookies) {
    /**
    * @desc Room object firebase array
    * @type {Object}
    */
    this.rooms = Room.all;

    /**
    * @desc Default title bar name
    * @type {String}
    */
    this.roomTitle = "Select Chat Room";

    /**
    * @desc Selected room's room id
    * @type {String}
    */
    this.roomId = null;

    /**
    * @function allMessages
    * @desc Grab all the messages according to room id parameter, and set the chat room title to parameter title
    * @param {String} id, title
    */
    this.allMessages = function(id, title) {
      this.messages = Message.getByRoomId(id);
      this.roomTitle = title;
      this.roomId = id;
    };

    this.animationsEnabled = true;

    /**
    * @function open
    * @desc Opens the modal that creates new chat room with prompts for the room name
    */
    this.open = function(){
      var createRoom = $uibModal.open({
        animation: this.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: '/templates/modal/create-room.html',
        controller: 'CreateRoomCtrl',
        controllerAs: 'createRoom',
        size: 'md',
      });
    };

    this.toggleAnimation = function() {
      this.animationsEnabled = !this.animationsEnabled;
    };

    /**
    * @function sendMessage
    * @desc send the input message to send method in Message service
    * @param {String} newMsg
    */
    this.sendMessage = function() {
      if (!this.newMessage) { return; }
      Message.send(this.newMessage, this.roomId);
      this.newMessage = '';
    };
  }

  angular
    .module('blocChat')
    .controller('HomeCtrl', ['Room', 'Message', '$uibModal', '$cookies', HomeCtrl]);
})();
