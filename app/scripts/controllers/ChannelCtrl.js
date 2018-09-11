(function() {
  function ChannelCtrl($state, Auth, User, channels, profile) {
    this.profile = profile;
    this.channels = channels;

    this.users = User.all;
    this.getDisplayName = User.getDisplayName;
    this.getGravatar = User.getGravatar;

    this.logout = function() {
      alert("See you next time!");
      this.profile.online = null;
      this.profile.$save().then(function() {
        Auth.$signOut().then(function() {
          $state.go('home');
        });
      });
    };

    this.newChannel = {
      name: ''
    };

    this.createChannel = function() {
      this.channels.$add(this.newChannel).then(function(ref) {
        $state.go('channels.messages', { channelId: ref.key });
      });
    };

    User.setOnline(profile.$id);
  }

  angular
    .module('letsSlack')
    .controller('ChannelCtrl', ['$state', 'Auth', 'User', 'channels', 'profile', ChannelCtrl])
})();
