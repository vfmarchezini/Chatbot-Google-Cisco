var myLibrarySettings = new eGainLibrarySettings();
//myLibrarySettings.CORSHost = 'http://198.18.135.29/system';
myLibrarySettings.CORSHost = 'http://0b08fe1bb73f.ngrok.io/system'
myLibrarySettings.IsDevelopmentModeOn = false;
myLibrarySettings.eGainContextPath = '/static/';
//myLibrarySettings.ChatPauseInSec = '30'
//myLibrarySettings.IsDebugOn = false;

var myLibrary = new eGainLibrary(myLibrarySettings);
var myChat = new myLibrary.Chat();
var myEventHandlers = myChat.GetEventHandlers();


function egain_transfer(incomingMessage){

    myEventHandlers.OnConnectionInitialized = function(initData){
        console.log(initData);
        myLibrary.SetCustomer(customer);
        myChat.Start();
    };

    myEventHandlers.OnConnectSuccess = function(){
        console.log('Connected');
        myChat.SendMessageToAgent(incomingMessage);
    };

    myEventHandlers.OnConnectionFailure = function(ChatConnectionFaiulureEventArgs){
        console.log(ChatConnectionFaiulureEventArgs);
    };

    myEventHandlers.OnAgentMessageReceived = function(agentMessageReceivedEventArgs){
        console.log(agentMessageReceivedEventArgs.Message);
        from_ag_send_to_customer(agentMessageReceivedEventArgs.Message.toString());
    };

    myEventHandlers.OnSystemMessageReceived = function(systemMessageReceivedEventArgs){
        console.log(systemMessageReceivedEventArgs.Message);
        from_ag_send_to_customer(systemMessageReceivedEventArgs.Message.toString());
    };

    myEventHandlers.OnAgentsNotAvailable = function(AgentsNotAvailableEventArgs){
        from_ag_send_to_customer("Por favor aguarde. Em breve um agente irá atendê-lo");
    };

    myEventHandlers.OnConnectionComplete = function(){
        console.log("Completed");
    };

    myEventHandlers.OnErrorOccurred = function(chatErrorOccurredEventArgs){
        alert(chatErrorOccurredEventArgs.toString());
    };

    myEventHandlers.OnAgentJoined = function(AgentJoinedEventArgs){
        console.log(AgentJoinedEventArgs);
    };

    myChat.Initialize('1001','en', 'US', myEventHandlers, 'aqua', 'v11');
}
function sendMessageToEgainAgent(message)
{
        myChat.SendMessageToAgent(message); 
}