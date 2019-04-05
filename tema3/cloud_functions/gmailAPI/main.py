from __future__ import print_function
import httplib2
import os
import json
import auth
import send_email
from apiclient import discovery
from oauth2client import client
from oauth2client import tools
from oauth2client.file import Storage
import base64
from email.mime.text import MIMEText
from email.mime.audio import MIMEAudio
from email.mime.image import MIMEImage
from email.mime.base import MIMEBase
from email.mime.multipart import MIMEMultipart
import mimetypes
from flask import escape
from oauth2client.contrib import gce
import requests


def send_emails(request):
    
    SCOPES = 'https://mail.google.com/'
    CLIENT_SECRET_FILE = 'client_secret.json'
    APPLICATION_NAME = 'baietii'
    authInst = auth.auth(SCOPES,CLIENT_SECRET_FILE,APPLICATION_NAME)
    credentials = authInst.get_credentials()
    http = credentials.authorize(httplib2.Http())
    service = discovery.build('gmail', 'v1', http=http)
    data = request.get_json(silent=True)
    url = 'https://us-central1-baietii.cloudfunctions.net/maps'
    r = requests.post((url),json={"location":data["location"]})
    sendInst = send_email.send_email(service)
    for guest in data['guests']:
        html = '<html><head></head><body><p>Userul cu emailul '+data['email']+' te-a invitat la eveniment.</p><p>Descrierea evenimentului este:' + data['description'] +'</p>'+'<img src ='+r.text+'><p>Click pe următorul link pentru a accepta: https://ccinvite.appspot.com?email='+guest+'</p></body></html>'
        message = sendInst.create_message('baietii@appspot.gserviceaccount.com',guest,data['email']+' invate you to...',html)
        sendInst.send_message('me',message)
    responseJson = {'msg':"Success"}
    headers = {
            	'Access-Control-Allow-Origin': '*',
            	'Access-Control-Allow-Methods': 'POST',
            	'Access-Control-Allow-Headers': 'Content-Type',
            	'Access-Control-Max-Age': '3600'
			  }


    return (json.dumps(responseJson), 200, headers)

