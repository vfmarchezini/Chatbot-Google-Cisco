//Add config file for production
const socket = io.connect("http://127.0.0.1:5000");

var _id_for_div = 0;

socket.on('connect', function(){

    $("<div id='agent' class='agent'></div>").appendTo('#chat-body')
    $("<img src='../static/energisa.png' alt='Energisa'>").appendTo("#agent");
    $("<p>Seja Bem-Vindo ao Chat da Energisa</p>").appendTo("#agent");
    $("<span class='time-right'>"+new Date().getHours()+":"+new Date().getMinutes()+"</span>").appendTo("#agent");

    let message_input = document.getElementById('txt_input');

    document.getElementById('message-input-form').onsubmit = function(e){  
        e.preventDefault();
        let message = message_input.value.trim();

        let d = new Date();
        let h = d.getHours();
        let m = d.getMinutes();
        
        if(message.length){
            socket.emit('send_msg_to_bot', {
                msg: message
            })

            _id_for_div++;
            let div_plus_id = "'customer"+_id_for_div+"'";

            $("<div id="+div_plus_id+" class='customer'></div>").appendTo('#chat-body')
            $("<img src='../static/customer.png' alt='Cliente'>").appendTo("#customer"+_id_for_div+"");
            $("<p>"+message+"</p>").appendTo("#customer"+_id_for_div+"");
            $("<span class='time-left'>"+h+":"+m+"</span>").appendTo("#customer"+_id_for_div+"");
        }
        message_input.value='';
        message_input.focus();
    }   
});

socket.on('send_msg_to_customer', function (data) {
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();

    _id_for_div++;
    let div_plus_id = "'agent"+_id_for_div+"'";

    //console.log(data);
    //console.log(typeof(data));

    response = data.substr(2);
    console.log(response)

    $("<div id="+div_plus_id+" class='agent'></div>").appendTo('#chat-body')
    $("<img src='../static/energisa.png' alt='Cliente'>").appendTo("#agent"+_id_for_div+"");
    $("<p>"+response+"</p>").appendTo("#agent"+_id_for_div+"");
    $("<span class='time-left'>"+h+":"+m+"</span>").appendTo("#agent"+_id_for_div+"");
});