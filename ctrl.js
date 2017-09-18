angular.module('app', []).controller('ctrl', function($scope, $timeout) {
  var socket = io();
  $scope.messages = [];

  $scope.submit = function(inputMessage, userName) {
    socket.emit('chat message', inputMessage, userName);
    $scope.inputMessage = '';
  };
  socket.on('chat message', function(msg, user) {
    $timeout(function() {
      $scope.messages.push({ msg, user });
    });
  });
});
