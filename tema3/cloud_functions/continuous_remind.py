#Available at https://us-central1-testproject-235308.cloudfunctions.net/continuous_remind

import json
import urllib
import urllib.request
from urllib import parse
import requests
from datetime import date
from datetime import datetime

GET_EVENTS_URL = "https://datastore-project-236517.appspot.com/events"
SEND_FROM_MAIL = "robert.dupu.daniel@gmail.com"
MAIL_SERVICE_URL = "https://us-central1-baietii.cloudfunctions.net/send_emails"

def continuous_remind(request):
	urlHandle = urllib.request.urlopen(GET_EVENTS_URL)
	urlData = urlHandle.read()
	eventsJson = json.loads(urlData)

	current_date = datetime.today().date()
	print(current_date)

	for entry in eventsJson["response"]:
		guests = entry["guests"]
		event_data = entry
		
		if "data" not in event_data or not event_data["data"]: continue
		event_date_list = event_data["data"].split("-")
		year = int(event_date_list[0])
		month = int(event_date_list[1])
		day = int(event_date_list[2])
		event_date = date(year, month, day)		

		if (event_date - current_date).days <= 1:
			response_dict = dict()
			response_dict["email"] = SEND_FROM_MAIL
			response_dict["description"] = event_data["description"]
			response_dict["guests"] = guests
			response_dict["location"] = event_data["location"]
			response = requests.post(MAIL_SERVICE_URL, json=response_dict)

			response_dict["guests"] = [event_data["email"]]
			response = requests.post(MAIL_SERVICE_URL, json=response_dict)

		service_response_json = {"status":"ok"}

	return json.dumps(service_response_json)