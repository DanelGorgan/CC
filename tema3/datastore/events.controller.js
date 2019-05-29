const {Datastore} = require('@google-cloud/datastore'),
    uuidv4 = require('uuid/v4'),
    async = require('async'),
    config = require('./config');


const projectId = config.projectId;

const datastore = new Datastore({
    projectId: projectId,
});

exports.getAllFromDatabase = async function (req, res) {
    let tablename = req.params.tablename
    const query = datastore.createQuery([tablename.charAt(0).toUpperCase() + tablename.slice(1)]);
    let elements = await query.run()

    elements[0].map(element => {
        element['id'] = element[datastore.KEY]['name']

    });

    res.json(elements[0])
}

exports.updateEntity = async function (req, res) {
    let lwrTablename = req.params.tablename.charAt(0).toUpperCase() + req.params.tablename.slice(1);
    const entityKey = datastore.key([lwrTablename, req.params.id]);
    const [entity] = await datastore.get(entityKey);


    Object.keys(req.body).map(key => {
        entity[key] = req.body[key];
    });

    const updatedEntity = {
        key: entityKey,
        data: entity,
    };

    await datastore.update(updatedEntity);
    return res.json({status: "success"})
};

exports.addEntity = async function (req, res) {
    let tablename = req.params.tablename.charAt(0).toUpperCase() + req.params.tablename.slice(1);
    const entityKey = datastore.key([tablename, uuidv4()]);

    const newEntity = {
        key: entityKey,
        data: req.body
    };

    await datastore.save(newEntity);
    return res.json({message: "success"})
};


exports.deleteEntity = async function (req, res) {
    let tablename = req.params.tablename.charAt(0).toUpperCase() + req.params.tablename.slice(1);
    const entityKey = datastore.key([tablename, req.params.id]);
    const [entity] = await datastore.delete(entityKey);

    res.json({"message": "success"})
};


exports.getEntityByAttribute = async function (req, res) {
    let tablename = req.params.tablename.charAt(0).toUpperCase() + req.params.tablename.slice(1);
    const query = datastore.createQuery([tablename]).filter(req.params.attribute, "=", req.params.value);
    let event = await query.run();

    res.json({response: event[0]})
};

exports.getEntityById = async function (req, res) {
    let tablename = req.params.tablename.charAt(0).toUpperCase() + req.params.tablename.slice(1);
    const entityKey = datastore.key([tablename, req.params.id]);
    const [entity] = await datastore.get(entityKey);

    entity['id'] = entity[datastore.KEY]['name']

    res.json(entity)
};

exports.getReservationsByOwnerId = async function (req, res) {
    let query = datastore.createQuery(['Places']).filter("ownerId", "=", req.params.ownerId);
    let places = await query.run();
    let reservations = [];
    async.eachSeries(places[0], async (place, cb) => {
        query = await datastore.createQuery(['Reservations']).filter("placeId", "=", place[datastore.KEY]['name']);
        let reservation = await query.run();
        reservation[0][0].place = place.name;
        reservation[0][0].id = reservation[0][0][datastore.KEY]['name']
        reservations.push(reservation[0][0])
        cb()
    }, (err, result) => {
        return res.json(reservations)
    })
};

exports.getPlaceById = async function (req, res) {
    const placeKey = datastore.key(['Places', req.params.placeId])
    const [place] = await datastore.get(placeKey)

    place['id'] = place[datastore.KEY]['name']

    res.json(place)
};

exports.getRoomById = async function (req, res) {
    const roomKey = datastore.key(['Rooms', req.params.roomId])
    const [room] = await datastore.get(roomKey)

    room['id'] = room[datastore.KEY]['name']

    res.json(room)
};
