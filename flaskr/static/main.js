var _id_for_div = 0;
var socket;
var customer;
var xferred = false;
var transcript = "";

window.onload = function(){
    document.getElementById('customer-properties-form').onsubmit = function(e){  
        e.preventDefault();
        var customer_email;
        var customer_fst_lst_name;
        console.log($("#txt_email").val());
        console.log($("#txt_firstname").val());
        console.log($("#txt_lastname").val());

        customer =  new myLibrary.Datatype.CustomerObject();
        customer.SetPrimaryKey(customer.PrimaryKeyParams.PRIMARY_KEY_EMAIL, $("#txt_email").val());

        //Customer Email Parameters

        customer_email = new myLibrary.Datatype.CustomerParameter();
        customer_email.eGainParentObject = "casemgmt";
        customer_email.eGainChildObject = "email_address_contact_point_data";
        customer_email.eGainAttribute = "email_address";
        customer_email.eGainValue = $("#txt_email").val();
        customer_email.eGainParamName = "email_address";
        customer_email.eGainMinLength = "1";
        customer_email.eGainMaxLength = "50";
        customer_email.eGainRequired = "1";
        customer_email.eGainFieldType = "1";
        customer_email.eGainPrimaryKey = "1";
        customer_email.eGainValidationString= "";

        //Customer First Name

        customer_fst_lst_name = new myLibrary.Datatype.CustomerParameter();
        customer_fst_lst_name.eGainParentObject = "casemgmt";
        customer_fst_lst_name.eGainChildObject = "individual_customer_data";
        customer_fst_lst_name.eGainAttribute = "full_name";
        customer_fst_lst_name.eGainValue = $("#txt_firstname").val() + " " + $("#txt_lastname").val();
        customer_fst_lst_name.eGainMinLength = "1";
        customer_fst_lst_name.eGainMaxLength = "50";
        customer_fst_lst_name.eGainRequired = "1";
        customer_fst_lst_name.eGainFieldType = "1";
        customer_fst_lst_name.eGainPrimaryKey = "0";
        customer_fst_lst_name.eGainValidationString= "";

        //Add Customer Parameters to Customer Object

        customer.AddCustomerParameter(customer_email);
        customer.AddCustomerParameter(customer_fst_lst_name);
        //Add config file for production
        //socket = io.connect("http://127.0.0.1:5000");
        socket = io.connect("https://f1efeafcd268.ngrok.io");

        socket.on('connect', function(){
            $('#txt_input_cl').blur();
            $('#message-div').remove();

            $("<div id='agent' class='agent'></div>").appendTo('#div_chat_body')
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
                
                if(!xferred){
                    if(message.length){
                        socket.emit('send_msg_to_bot', {
                            msg: message
                        })
            
                        _id_for_div++;
                        let div_plus_id = "'customer"+_id_for_div+"'";
            
                        $("<div id="+div_plus_id+" class='customer'></div>").appendTo('#div_chat_body')
                        $("<img src='../static/customer.png' alt='Cliente'>").appendTo("#customer"+_id_for_div+"");
                        $("<p>"+message+"</p>").appendTo("#customer"+_id_for_div+"");
                        $("<span class='time-left'>"+h+":"+m+"</span>").appendTo("#customer"+_id_for_div+"");
                        $('#div_chat_body').get(0).scrollIntoView({behavior: "smooth", block:"end", inline: "nearest"});
                        transcript = transcript +"\n" + $("#txt_firstname").val()+": " + message;
                    }
                }
                else{
                    sendMessageToEgainAgent(message);
                    _id_for_div++;
                        let div_plus_id = "'customer"+_id_for_div+"'";
            
                        $("<div id="+div_plus_id+" class='customer'></div>").appendTo('#div_chat_body')
                        $("<img src='../static/customer.png' alt='Cliente'>").appendTo("#customer"+_id_for_div+"");
                        $("<p>"+message+"</p>").appendTo("#customer"+_id_for_div+"");
                        $("<span class='time-left'>"+h+":"+m+"</span>").appendTo("#customer"+_id_for_div+"");
                        $('#div_chat_body').get(0).scrollIntoView({behavior: "smooth", block:"end", inline: "nearest"});
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
        
            $("<div id="+div_plus_id+" class='agent'></div>").appendTo('#div_chat_body')
            $("<img src='../static/energisa.png' alt='Cliente'>").appendTo("#agent"+_id_for_div+"");
            $("<p>"+data+"</p>").appendTo("#agent"+_id_for_div+"");
            $("<span class='time-right'>"+h+":"+m+"</span>").appendTo("#agent"+_id_for_div+"");
            $('#div_chat_body').get(0).scrollIntoView({behavior: "smooth", block:"end", inline: "nearest"});
            transcript = transcript +"\n BOT: "+ data;
        });
        
        socket.on('transfer_to_agent', function (data) {
            console.log(data);
            xferred = true;
            transcript = transcript+data;
            egain_transfer(transcript);
        });
    }
}

function from_ag_send_to_customer(message)
{
    let d = new Date();
    let h = d.getHours();
    let m = d.getMinutes();

    _id_for_div++;
    let div_plus_id = "'agent"+_id_for_div+"'";

    $("<div id="+div_plus_id+" class='agent'></div>").appendTo('#div_chat_body')
    $("<img src='../static/energisa.png' alt='Cliente'>").appendTo("#agent"+_id_for_div+"");
    $("<p>"+message+"</p>").appendTo("#agent"+_id_for_div+"");
    $("<span class='time-right'>"+h+":"+m+"</span>").appendTo("#agent"+_id_for_div+"");
    $('#div_chat_body').get(0).scrollIntoView({behavior: "smooth", block:"end", inline: "nearest"});
}