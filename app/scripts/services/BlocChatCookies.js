(function() {
  function BlocChatCookies($cookies, $uibModal) {
    /**
    * @desc Remove the cookie of current user on the page load
    */
    $cookies.remove('blocChatCurrentUser');

    /**
    * @desc Grab the value of current user's username from cookies (most likely null if first time loading the page)
    */
    var currentUser = $cookies.get('blocChatCurrentUser');

    console.log("Current user is: " + currentUser);

    /**
    * @desc Load Username modal template which prompts the viewer for username and set the current username
    */
    if (!currentUser || currentUser === '') {
      $uibModal.open({
        templateUrl: '/templates/modal/username.html',
        controller: 'UsernameCtrl',
        controllerAs: 'username'
      });

      currentUser = $cookies.get('blocChatCurrentUser');
    }
  }

  angular
    .module('letsSlack')
    // .run(['$cookies', '$uibModal', BlocChatCookies]);
    .factory(['$cookies', '$uibModal', BlocChatCookies]);
})();
