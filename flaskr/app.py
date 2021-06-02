from flask import Flask, render_template
from flask_socketio import SocketIO, join_room, leave_room
from google.cloud import dialogflow_v2
from google.protobuf.json_format import MessageToDict, MessageToJson
from google.cloud.dialogflow_v2.types.intent import Intent

import socketio

app = Flask(__name__)
socketio = SocketIO(app)


@app.route('/')
def route_chat():
    return render_template('chat.html')

@socketio.on('send_msg_to_bot')
def send_msg_to_bot(data):
    message = data['msg']
    detect_intent_texts("gisa-pp9s", "123456", [message], "pt-BR")

def detect_intent_texts(project_id, session_id, texts, language_code):
    session_client = dialogflow_v2.SessionsClient()

    session = session_client.session_path(project_id, session_id)
    print("Session path: {}\n".format(session))

    for text in texts:
        text_input = dialogflow_v2.TextInput(text=text, language_code=language_code)

        query_input = dialogflow_v2.QueryInput(text=text_input)

        response = session_client.detect_intent(
            request={"session":session, "query_input":query_input}
        )

        print("=" * 20)
        print("Query Text: {}".format(response.query_result.query_text))
        print(
            "Detected intent: {} (confidence: {})\n".format(
                response.query_result.intent.display_name,
                response.query_result.intent_detection_confidence
            )
        )
        #print("Fullfiment text :{}\n".format(response.query_result.fulfillment_messages))

        messages = response.query_result.fulfillment_messages
        print(type(messages))

        for message in messages:
            msg_to_send = str(Intent().Message(message).text.text)
            print(type(msg_to_send))
            #print(Message().SerializeToString(message.text))
            #print(type(Message().SerializeToString(message.text.text)))
            socketio.emit('send_msg_to_customer', msg_to_send)
        #print(messages)


#detect_intent_texts("gisa-pp9s", '123456', ['Olá'], 'pt-BR')
socketio.run(app, debug=True)