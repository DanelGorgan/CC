function onSubmit() {
    let data = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        guests: document.getElementById('guests').value,
        location: document.getElementById('location').value,
        data: document.getElementById('data').value,
        title: document.getElementById('title').value,
        description: document.getElementById('description').value
    };
    data.guests = data.guests.split(',');
    let url = `https://datastore-project-236517.appspot.com/events`;
    fetch(url, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(
        response => {
            let url1 = `https://us-central1-testproject-235308.cloudfunctions.net/remind?title=${data.title}`;
            fetch(url1, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            }).then(
                response => {
                    alert('Sucess')
                }
            ).catch(e => console.log(e))
        }
    ).catch(e => console.log(e))
}

function getEmailEvents() {
    let email = document.getElementById('email').value;
    let url = `https://us-central1-testproject-235308.cloudfunctions.net/getevents?email=${email}`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(
        response => response.json()
    ).then(
        response => {
            console.log(response);
            let out = document.getElementById('output');
            let inv = document.getElementById('invited');
            let nr = 0;
            for (let i = 0; i < response.started.length; i++) {
                nr += response.started[i].guests.length;
            }
            inv.innerText = "Userul a fost invitat la " + response.invited.length + " eventuri";
            out.innerText = "Userul a creat " + response.started.length + " eventuri, si a invitat " + nr + ' persoane';
        }
    ).catch(e => console.log(e))
}

function getweather() {
    let city = document.getElementById('city').value;
    let url = `https://weather-project-236622.appspot.com/?city=${city}`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }).then(
        response => response.json()
    ).then(
        response => {
            console.log(response);
            let out = document.getElementById('output');
            out.innerText = response.weather;
        }
    ).catch(e => console.log(e))
}

function remindEvent() {
    let title = document.getElementById('title').value;
    let url = `https://us-central1-testproject-235308.cloudfunctions.net/remind?title=${title}`;
    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then(
            response => response.json()
        )
        .then(
            response => {
                alert('sucess')
            }
        ).catch(e => console.log(e))
}