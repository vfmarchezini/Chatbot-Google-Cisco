from flask import Flask, render_template
from flask_socketio import SocketIO
from google.cloud import dialogflow_v2
from google.cloud.dialogflow_v2.types import intent
from google.cloud.dialogflow_v2.types.intent import Intent
import uuid
import socketio

app = Flask(__name__)
socketio = SocketIO(app)

@app.route('/')
def route_chat():
    return render_template('chat.html')

@socketio.on('send_msg_to_bot')
def send_msg_to_bot(data):
    message = data['msg']
    detect_intent_texts("gisa-pp9s", str(uuid.uuid4()), [message], "pt-BR")

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

        if str(response.query_result.intent.display_name) != "falar-com-atendentes":
            messages = response.query_result.fulfillment_messages

            for message in messages:
                result_text = str(Intent().Message(message).text.text)
                result_text = result_text.replace('\n',"").replace("[","").replace("]","").replace("'","")
                print(result_text)
                socketio.emit('send_msg_to_customer', result_text)
        else:
            messages = response.query_result.fulfillment_messages

            for message in messages:
                result_text = str(Intent().Message(message).text.text)
                result_text = result_text.replace('\n',"").replace("[","").replace("]","").replace("'","")
                print(result_text)
                socketio.emit('send_msg_to_customer', result_text)
            socketio.emit('transfer_to_agent', result_text)

#detect_intent_texts("gisa-pp9s", '123456', ['Olá'], 'pt-BR')
socketio.run(app, debug=True)