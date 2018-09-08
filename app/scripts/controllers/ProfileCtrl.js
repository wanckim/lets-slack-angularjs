(function() {
  function ProfileCtrl($state, auth, profile) {
    this.profile = profile;

    this.updateProfile = function() {
      // this.profile.emailHash = md5.createHash(auth.eamil);
      this.profile.$save().then(function() {
        $state.go('home');
      });
    };
  }

  angular
    .module('letsSlack')
    .controller('ProfileCtrl', ['$state', 'auth', 'profile', ProfileCtrl]);
})();
