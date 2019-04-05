const {Datastore} = require('@google-cloud/datastore');
const uuidv4 = require('uuid/v4');
const config = require('./config');


const projectId = config.projectId;

const datastore = new Datastore({
    projectId: projectId,
});

exports.getInvitations = async function (req, res) {
    const query = datastore.createQuery('Invitations');
    let list = await query.run();

    res.json({response: list[0]})
};

exports.updateInvitation = async function (req, res, email) {

    console.log("[updateInvitation] " + email);
    let key = datastore.key(['Invitations', email]);

    const query = datastore.createQuery('Invitations');
    let inv = await query.run();
    console.log(inv);
    inv[0][0].response = "Yes";
    let entity = {
        key: key,
        data : inv[0][0]
    };
    await datastore.save(entity);


    return res.json({result: "Update succesfuly"})
};