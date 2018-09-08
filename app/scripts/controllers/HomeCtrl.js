(function() {
  function HomeCtrl(Room, Message, $uibModal, $cookies, Auth, $state) {
    this.auth = Auth;

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

    this.toggleAnimation = function() {
      this.animationsEnabled = !this.animationsEnabled;
    };

    /**
    * @function newRoom
    * @desc Opens the modal that creates new chat room with prompts for the room name
    */
    this.newRoom = function(){
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

    /**
    * @function register
    * @desc Opens modal that allows user to sign up
    */
    this.register = function() {
      var register = $uibModal.open({
        animation: this.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: '/templates/modal/register.html',
        controller: 'AuthCtrl',
        controllerAs: 'auth',
        size: 'md',
      });
    };

    /**
    * @function login
    * @desc Opens modal that allows user to log in
    */
    this.login = function() {
      var login = $uibModal.open({
        animation: this.animationsEnabled,
        ariaLabelledBy: 'modal-title',
        ariaDescribedBy: 'modal-body',
        templateUrl: '/templates/modal/login.html',
        controller: 'AuthCtrl',
        controllerAs: 'auth',
        size: 'md',
      });
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

    this.logout = function() {
      Auth.$signOut().then(function(auth) {
        $state.go('home');
        alert("Successfully logged out")
      }, function(error) {
        this.error = error;
      });
    };
  }

  angular
    .module('letsSlack')
    .controller('HomeCtrl', ['Room', 'Message', '$uibModal', '$cookies', 'Auth', '$state', HomeCtrl]);
})();
