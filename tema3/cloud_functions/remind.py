#Available at https://us-central1-testproject-235308.cloudfunctions.net/remind

import json
import urllib
import urllib.request
from urllib import parse
import requests

GET_EVENTS_URL = "https://datastore-project-236517.appspot.com/events"
SEND_FROM_MAIL = "robert.dupu.daniel@gmail.com"
MAIL_SERVICE_URL = "https://us-central1-baietii.cloudfunctions.net/send_emails"

def remind(request):
	event_title = request.args.get("title")

	urlHandle = urllib.request.urlopen(GET_EVENTS_URL)
	urlData = urlHandle.read()
	eventsJson = json.loads(urlData)

	guests = []
	event_data = []

	for entry in eventsJson["response"]:
		if entry["title"] == event_title:
			guests = entry["guests"]
			event_data = entry
			break

	response_dict = dict()
	response_dict["email"] = SEND_FROM_MAIL
	response_dict["description"] = event_data["description"]
	response_dict["guests"] = guests
	response_dict["location"] = event_data["location"]

	response = requests.post(MAIL_SERVICE_URL, json=response_dict)
    
	service_response_json = {"status":"ok"}
	headers = {
            	'Access-Control-Allow-Origin': '*',
            	'Access-Control-Allow-Methods': 'GET',
            	'Access-Control-Allow-Headers': 'Content-Type',
            	'Access-Control-Max-Age': '3600'
    		  }

	return (json.dumps(service_response_json), 200, headers)
