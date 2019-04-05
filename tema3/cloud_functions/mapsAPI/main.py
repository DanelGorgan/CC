import json
from flask import escape

def send_Map(request):
    data = request.get_json(silent=True)
    key = 'AIzaSyDhqFvDK5oBPXBRDgsOU_GHotyrfYF8NwA'
    locationPortions = data['location'].split(' ')
    location = locationPortions[0]
    for portion in locationPortions[1:]:
        location += '+'
        location += portion
    link = 'https://maps.googleapis.com/maps/api/staticmap?center='+location +'&zoom=13&size=600x300&maptype=roadmap&markers=color:blue%7Clabel:'+location[0] + '%7C' + location+'&key='+key
    return link

    
