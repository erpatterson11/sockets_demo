angular.module('app', []).controller('ctrl', function($scope, $timeout) {

    const socket = io()
    
    $scope.messages = []

    // server emits a 'chat message' event
    socket.on('chat message', (msg, user) => {
        // $timeout causes the digest cycle to update the view
        $timeout(() => {
            console.log(msg, user);
            $scope.messages = [...$scope.messages, {msg,user}]
            $scope.inputMessage = ""
        })
    })

    $scope.submit = (msg, user) => (
        // sends a 'chat message' event to the server
        socket.emit('chat message', msg, user)
    )

});


