const postAirportSchema = {
    "description": "Object of airports entry for POST",
    "type": "object",
    "required": ["airports"],
    "properties": {
        "airports": {
            "type": "array",
            "items": {"$ref": "#/definitions/airports"}
        }
    },
    "definitions": {
        "airports": {
            "type": "object",
            "required": ["name", "city"],
            "properties": {
                "name": {
                    "type": "string",
                    "description": "The name of the airport."
                },
                "city": {
                    "type": "string",
                    "description": "The name of the airport"
                },
                "latitude": {
                    "type": "number",
                    "description": "The name of the airport"
                },
                "longitude": {
                    "type": "number",
                    "description": "The name of the airport"
                }
            }
        }
    }
}
const putAirportSchema = {
    "description": "Object of airports entry for PUT",
    "type": "object",
    "properties": {
        "airports": {
            "type": "object",
            "items": {"$ref": "#/definitions/airports"}
        }
    },
    "definitions": {
        "airports": {
            "type": "object",
            "properties": {
                "name": {
                    "type": "string",
                    "description": "The name of the airport."
                },
                "city": {
                    "type": "string",
                    "description": "The name of the airport"
                },
                "latitude": {
                    "type": "number",
                    "description": "The name of the airport"
                },
                "longitude": {
                    "type": "number",
                    "description": "The name of the airport"
                }
            }
        }
    }
}
const distanceSchema = {
    "description": "Object of airports entry for PUT",
    "required": ["latitude1", "latitude2", "longitude1", "longitude2"],
    "type": "object",
    "properties": {
        "latitude1": {
            "type": "number",
            "minimum": -90,
            "maximum": 90
        }, "latitude2": {
            "type": "number",
            "minimum": -90,
            "maximum": 90
        },
        "longitude1": {
            "type": "number",
            "minimum": -180,
            "maximum": 180
        }, "longitude2": {
            "type": "number",
            "minimum": -180,
            "maximum": 180
        }
    }
}

module.exports = {
    postAirportSchema,
    putAirportSchema,
    distanceSchema
}