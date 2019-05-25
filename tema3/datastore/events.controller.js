const {Datastore} = require('@google-cloud/datastore'),
    uuidv4 = require('uuid/v4'),
    config = require('./config');


const projectId = config.projectId;

const datastore = new Datastore({
    projectId: projectId,
});

exports.addPlace = async function (req, res) {

    const placeKey = datastore.key(['Places', uuidv4()]);

    const place = {
        key: placeKey,
        data: req.body
    };

    await datastore.save(place);
    return res.json({msg: "done"})
};

exports.getPlaces = async function (req, res) {
    const query = datastore.createQuery('Places');
    let places = await query.run();

    places[0].map(place =>{
        place['id'] =  place[datastore.KEY]['name']
    });

    res.json(places[0])
};

exports.getPlace = async function (req, res) {
    const placeKey = datastore.key(['Places', req.params.id]);
    const [entity] = await datastore.get(placeKey);

    res.json(entity)
};

exports.getAllReservations = async function (req, res) {
    const query = datastore.createQuery(['Reservation']);
    let reservations = await query.run()

    reservations[0].map(reservation => {
        reservation['id'] = [datastore.KEY]['name']
    });

    res.json(reservations[0])
};

exports.getReservationById = async function (req, res) {
    const query = datastore.createQuery('Reservation').filter('placeId', '=', req.params.id);
    let event = await query.run();

    res.json(event[0])
};


exports.updatePlace = async function (req, res) {

    const placeKey = datastore.key(['Places', req.params.id]);
    const [entity] = await datastore.get(placeKey);

    Object.keys(req.body).map(key => {
        entity[key] = req.body[key]
    });

    const updatedEntity = {
        key: placeKey,
        data: entity,
    };

    await datastore.update(updatedEntity);
    return res.json({msg: "Success!"})
};


exports.deletePlace = async function (req, res) {
    const placeKey = datastore.key(['Places', req.params.id]);
    const [entity] = await datastore.delete(placeKey);

    res.json(entity)
};

