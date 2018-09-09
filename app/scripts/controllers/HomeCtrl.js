(function() {
  function HomeCtrl(Message, $uibModal, Auth, $state) {
    /**
    * @desc Implement Auth for use in home.html
    * @type {Object}
    */
    this.auth = Auth;

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
  }
  
  angular
    .module('letsSlack')
    .controller('HomeCtrl', ['Message', '$uibModal', 'Auth', '$state', HomeCtrl]);
})();
