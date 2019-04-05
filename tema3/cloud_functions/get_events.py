#Available at https://us-central1-testproject-235308.cloudfunctions.net/getevents 

import pymongo
import json
import urllib

GET_EVENTS_URL = "https://datastore-project-236517.appspot.com/events"

def get_events(request):
	
	email = request.args.get('email')

	urlHandle = urllib.request.urlopen(GET_EVENTS_URL)
	urlData = urlHandle.read()
	eventsJson = json.loads(urlData)
	startedList = []
	invitedList = []

	responseJson = dict()

	for entry in eventsJson["response"]:
		if entry["email"] == email:
			startedList.append(entry)
		if email in entry["guests"]:
			invitedList.append(entry)

	responseJson["started"] = startedList
	responseJson["invited"] = invitedList
    
	headers = {
            	'Access-Control-Allow-Origin': '*',
            	'Access-Control-Allow-Methods': 'GET',
            	'Access-Control-Allow-Headers': 'Content-Type',
            	'Access-Control-Max-Age': '3600'
			  }


	return (json.dumps(responseJson), 200, headers)

