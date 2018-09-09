(function() {
  function MessageCtrl(profile, channelName, messages, Auth) {
    this.messages = messages;
    this.channelName = channelName;
    this.profile = profile;

    this.newMessage = '';

    this.sendMessage = function() {
      if(!this.newMessage) { return ; }

      this.messages.$add({
        uid: profile.$id,
        body: this.newMessage,
        timestamp: firebase.database.ServerValue.TIMESTAMP
      });
      
      this.newMessage = '';
    };
  }

  angular
    .module('letsSlack')
    .controller('MessageCtrl', ['profile', 'channelName', 'messages', 'Auth', MessageCtrl]);
})();
