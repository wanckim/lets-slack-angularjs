(function() {
  function ChannelCtrl($state, Auth, User, channels, profile) {
    this.profile = profile;
    this.channels = channels;

    this.getDisplayName = User.getDisplayName;
    this.getGravatar = User.getGravatar;

    this.logout = function() {
      alert("See you next time!");
      Auth.$signOut().then(function() {
        $state.go('home');
      });
    };

    this.newChannel = {
      name: ''
    };
    
    this.createChannel = function() {
      this.channels.$add(this.newChannel).then(function() {
        this.newChannel = {
          name: ''
        };
      });
    };
  }

  angular
    .module('letsSlack')
    .controller('ChannelCtrl', ['$state', 'Auth', 'User', 'channels', 'profile', ChannelCtrl])
})();
