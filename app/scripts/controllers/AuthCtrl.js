(function() {
  function AuthCtrl(Auth, $state, $uibModalInstance) {
    this.user = {
      email: '',
      password: ''
    };

    this.login = function() {
      Auth.$signInWithEmailAndPassword(this.user.email, this.user.password).then(function(auth) {
        $uibModalInstance.close(console.log("Welcome \"" + auth.email + "\"!"));
        $state.go('home');
      }, function(error) {
        this.error = error;
      });
    };

    this.register = function() {
      Auth.$createUserWithEmailAndPassword(this.user.email, this.user.password).then(function(user) {
        $uibModalInstance.close(console.log("Thank you for joining Let's Slack \"" + user.email + "\"!"));
        $state.go('home');
      }, function(error) {
        this.error = error;
      });
    };

    this.cancel = function() {
      $uibModalInstance.close();
    }
  }

  angular
    .module('blocChat')
    .controller('AuthCtrl', ['Auth', '$state', '$uibModalInstance', AuthCtrl]);
})();
