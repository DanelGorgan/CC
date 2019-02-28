const postEstateSchema = {
  'description': 'Object of estates entry for POST',
  'type': 'object',
  'properties': {
    'estates': {
      'type': 'array',
      'items': {'$ref': '#/definitions/estates'}
    }
  },
  'definitions': {
    'estates': {
      'type': 'object',
      'required': ['title', 'city'],
      'properties': {
        'title': {
          'type': 'string',
          'description': 'The name of the estate.'
        },
        'city': {
          'type': 'string',
          'description': 'The name of the estate'
        },
        'latitude': {
          'type': 'number',
          'description': 'The name of the estate'
        },
        'longitude': {
          'type': 'number',
          'description': 'The name of the estate'
        }
      }
    }
  }
}
const putEstateSchema = {
  'description': 'Object of estates entry for PUT',
  'type': 'object',
  'properties': {
    'estates': {
      'type': 'object',
      'items': {'$ref': '#/definitions/estates'}
    }
  },
  'definitions': {
    'estates': {
      'type': 'object',
      'properties': {
        'title': {
          'type': 'string',
          'description': 'The name of the estate.'
        },
        'city': {
          'type': 'string',
          'description': 'The name of the estate'
        },
        'latitude': {
          'type': 'number',
          'description': 'The name of the estate'
        },
        'longitude': {
          'type': 'number',
          'description': 'The name of the estate'
        }
      }
    }
  }
}
const distanceSchema = {
  'description': 'Object of estates entry for PUT',
  'required': ['latitude1', 'latitude2'],
  'type': 'object',
  'properties': {
    'latitude1': {
      'type': 'number',
      'minimum': -90,
      'maximum': 90
    }, 'latitude2': {
      'type': 'number',
      'minimum': -90,
      'maximum': 90
    }
  }
}

module.exports = {
  postEstateSchema,
  putEstateSchema,
  distanceSchema
}