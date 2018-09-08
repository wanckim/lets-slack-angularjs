(function() {
  function UsernameCtrl($uibModalInstance, $cookies) {
    this.ok = function(username) {
      if (!username) {
        alert("Please enter username!");
      } else {
        $cookies.put('blocChatCurrentUser', username);
        $uibModalInstance.close(console.log("Welcome \"" + $cookies.get('blocChatCurrentUser') + "\"!"));
      }
    };
  }

  angular
    .module('blocChat')
    .controller('UsernameCtrl', ['$uibModalInstance', '$cookies', UsernameCtrl]);
})();
