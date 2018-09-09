(function() {
  function MessageCtrl(profile, channelName, messages) {
    this.messages = messages;
    this.channelName = channelName;

    this.newMessage = '';

    this.sendMessage = function() {
      if(this.newMessage.length > 0) {
        this.messages.$add({
          uid: profile.$id,
          body: this.newMessage,
          timestamp: firebase.database.ServerValue.TIMESTAMP
        }).then(function() {
          this.newMessage = '';
        });
      }
    };
  }

  angular
    .module('letsSlack')
    .controller('MessageCtrl', ['profile', 'channelName', 'messages', MessageCtrl]);
})();
