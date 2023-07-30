var localVideo = document.getElementById("local-video");
var remoteVideo = document.getElementById("remote-video");

var chatInput = document.getElementById("chat-input");
var sendMessageButton = document.getElementById("send-message");

var socket = new WebSocket("ws://localhost:8080");

socket.onopen = function() {
    console.log("Websocket opened");
}

socket.onmessage = function(event) {
    var data = JSON.parse(event.data);

    if(data.type == "video") {
        remoteVideo.srcObject = data.video;
    } else if (data.type == "message") {
        var chatMessage = document.createElement("li");
        chatMessage.textContent = data.message;
        document.getElementById("chat-messages").appendChild(chatMessage);

    }
};

sendMessageButton.onclick = function(){
    var message = chatInput.value;
    
    socket.send(JSON.stringify({
        type: "message",
        message: message
    }));
};