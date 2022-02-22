let chatWindow = document.getElementById('chat_window');

function Send(){
    var message = document.getElementById('sendfield').value;
    console.log(message);
    api_post("messages/0", {id: 1, content: message}).then(json => {
        console.log(json)
    })
    GetMessages();
}

function GetMessages(){
    api_get("messages/0").then(response => {
        if(!response.success)
            throw new Error("API FAILED: " + response.error)

        for (let i = 0; i < response.messages.length; i++)
        {
            let msg = response.messages[i].content;
            document.getElementById('chattext').innerHTML += '<p>' + msg + '</p>';
        }
        // let msg = document.getElementById("sendfield").value
        // document.getElementById('chattext').innerHTML += '<p>' + msg + '</p>';
        // document.getElementById('chattext').innerHTML += '<br>';
        // api_post(msg);
    
        let shouldScroll = chatWindow.scrollTop + chatWindow.clientHeight === chatWindow.scrollHeight;
    
        if (!shouldScroll) {
            scrollToBottom();
        }
        function scrollToBottom() {
            chatWindow.scrollTop = chatWindow.scrollHeight;
        }
    })
}

function Login(){
    var usern = document.getElementById('Username');
    var passw = document.getElementById('Password');
    var response = api_post("authorize/login", {username: usern, password: passw});
}

function Register(){
    var usern = document.getElementById('Username');
    var passw = document.getElementById('Password');
    var response = api_post("user", {username: usern, password: passw});
}

function RenewJWT(){
    var response = api_post("authorize/renew", {token: token});
}