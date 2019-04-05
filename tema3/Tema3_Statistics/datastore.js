const {Datastore} = require('@google-cloud/datastore');
const uuidv4 = require('uuid/v4');
const config = require('./config');


const projectId = config.projectId;

const datastore = new Datastore({
    projectId: projectId,
});

exports.addEvent = async function (req, res) {

    const eventKey = datastore.key(['Events', uuidv4()]);

    const eventId = uuidv4();

    const event = {
        key: eventKey,
        data: {...req.body, id: eventId}
    };

    await datastore.save(event);
    for (let i = 0; i < req.body.guests.length; i++) {
        const invitationKey = datastore.key(['Invitations', uuidv4()]);
        const d = new Date();
        const invitation = {
            key: invitationKey,
            data: {
                "event_id": eventId,
                "sender": req.body.email,
                "receiver": req.body.guests[i],
                "response": "no",
                "date": d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate()
            }
        };
        await datastore.save(invitation);
    }

    res.json({msg: "done"})
};

exports.getEvents = async function (req, res) {
    const query = datastore.createQuery('Events');
    let list = await query.run();

    res.json({response: list[0]})
};

exports.getEvent = async function (req, res) {
    const query = datastore.createQuery('Events').filter("id", "=", req.params.id);
    let event = await query.run();

    res.json({response: event[0]})
};