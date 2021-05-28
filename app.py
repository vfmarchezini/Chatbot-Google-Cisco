#from flask import Flask
from pkg_resources import resource_exists
from google.cloud import dialogflow_v2
from google.protobuf.json_format import MessageToDict, MessageToJson

from google.cloud.dialogflow_v2.types.participant import Message
from google.cloud.dialogflow_v2.types.fulfillment import Fulfillment

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

        for message in messages:
            print(message.text.text)

detect_intent_texts("gisa-pp9s", '123456', ['Olá'], 'pt-BR')