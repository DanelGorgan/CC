
from __future__ import print_function
import httplib2
import os

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
from apiclient import errors
try:
    import argparse
    flags = argparse.ArgumentParser(parents=[tools.argparser]).parse_args()
except ImportError:
    flags = None

class send_email:
    def __init__(self,service):
        self.service = service
    def create_message(self,sender, to, subject, message_text):
      message = MIMEText(message_text,'html')
      message['to'] = to
      message['from'] = sender
      message['subject'] = subject
      raw = base64.urlsafe_b64encode(message.as_bytes())
      raw = raw.decode()
      body = {'raw': raw}
      return body

    def send_message(self, user_id, message):
        try:
            message = (self.service.users().messages().send(userId=user_id, body=message).execute())
            print('Message Id: %s' % message['id'])
            return message
        except errors.HttpError as error:
            print( error)
