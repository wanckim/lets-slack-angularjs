(function() {
  function Message($firebaseArray, $cookies) {
    var Message = {};
    var ref = firebase.database().ref().child("messages");
    var messages = $firebaseArray(ref);

    /**
    * @desc Date Object
    */
    var TimeObject = new Date();

    /**
    * @function getByRoomId
    * @desc Filter the messages with according room id
    * @param {String} roomId
    */
    Message.getByRoomId = function(roomId) {
      return $firebaseArray(ref.orderByChild('roomId').equalTo(roomId));
    };

    /**
    * @function send
    * @desc Take the sending message as argument and create Message object and add to Message firebaseArray
    * @param {String} newMsg, rId
    */
    Message.send = function(newMsg, rId) {
      var CurrentUser = $cookies.get('blocChatCurrentUser');
      var CurrentTime = getTime();

      if (!CurrentUser || !rId) { return; }

      var newMessage = {
          content: newMsg,
          roomId: rId,
          sentAt: CurrentTime,
          username: CurrentUser
      }

      messages.$add(newMessage).then(function(ref) {
        var id = ref.key;
        messages.$indexFor(id);
      });
    };

    /**
    * @function getTime
    * @desc Get current time in "AM/PM HH:MM" format
    * @returns {String} time
    */
    var getTime = function() {
      var hour = TimeObject.getHours();
      var min = TimeObject.getMinutes();

      if (min < 10) {
        min = "0"+min;
      }

      if (hour > 11) {
        if (hour !== 12) {
          return (hour-12) + ":" + min + " PM";
        } else {
          return "12:" + min + " PM";
        }
      } else {
        if (hour !== 0) {
          return hour + ":" + min + " AM";
        } else {
          return "12:" + min + " AM";
        }
      }
    };

    return Message;
  }

  angular
    .module('letsSlack')
    .factory('Message', ['$firebaseArray', '$cookies', Message]);
})();
