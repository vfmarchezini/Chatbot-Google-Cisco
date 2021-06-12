***Development mode. DO NOT USE FOR PRODUCTION***

Google Cloud Requirements:

Install Google Cloud SDK CLI from https://cloud.google.com/sdk/docs/install
-Python is mandatory. You can use your own Python installation (Check App Aliases) or the bundled Python that comes with the GC SDK installation
-After the installation make sure the gcloud init option is checked.
-Press Y and Log in with the following credentials on your browser. If you have been previouly invited, you can use your own Google Credentials
	username: vinicius.marchezini@wittel.com
	password: Ago@2020

-Select the project [1] gisa-pp9s
-Do not set a default Compute Region
-Run gcloud auth application-default login

Python requirements:
Create a virtual environment on C:\Projects\Python\DialogFlow as follows
>>> C:\Projects\Python\DialogFlow> python -m venv energisaenv
Activate the virtual environment
>>> <venv>\Scripts\activate.bat

Install dialogflow on (energisaenv)

pip install google-cloud-dialogflow

Install Flask on (energisaenv)

pip install Flask

Install Socket IO  (energisaenv)

pip install Flask-SocketIO

Cisco NGROK Requirements
On you Cisco ECE server install NGROK and run the authtoken with the token found on NGROK dashboard for the following account:
	username: vinicius.marchezini@wittel.com
	password: Wittel@2121

Functional example: ngrok.exe authtoken 1tfqu4f83rnA9KTlFVqwi4i5zLy_6G8dXdxw3Kyv7ZExFhd1i

ngrok.exe http --region=us --hostname=eceserver.ngrok.io 80 http://ccece.dcloud.cisco.com


Web Server NGROK Requirements
On you Web server install NGROK and run the authtoken with the token found on NGROK dashboard for the following account:
	username: vinicius.marchezini@wittel.com
	password: Wittel@2121

Functional example: ngrok.exe authtoken 1tfqu4f83rnA9KTlFVqwi4i5zLy_6G8dXdxw3Kyv7ZExFhd1i

ngrok.exe http --region=sa --hostname=localserver.sa.ngrok.io <Flask PORT> e.g. 5000

Running the project
Copy the "flaskr" folder inside TestProject-master to C:\Projects\Python\DialogFlow
  You should have to folders: energisaenv and flaskr
Open flaskr
Run python<version> app.py




