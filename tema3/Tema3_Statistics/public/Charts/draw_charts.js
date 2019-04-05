function getData() {
    let url = "https://cc-statistics.appspot.com/events";

    fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application.json',
            'Content-type': 'application/json'
        }
    })
        .then(response => response.json()
            .then(response => {
                    let countries = [];
                    for (let i = 0; i < response.response.length; i++) {
                        if (typeof response.response[i].country !== 'undefined') {
                            countries.push(response.response[i].country);
                        }
                    }

                    let countryDict = {};
                    for (let i = 0; i < countries.length; i++) {
                        if (!countryDict[countries[i]])
                            countryDict[countries[i]] = 1;
                        else
                            countryDict[countries[i]]++;
                    }
                    console.log(countryDict);
                    let totalCountries = Object.keys(countryDict).length;
                    drawBar();
                    drawPie(countryDict);
                    getTotalCountries(totalCountries);
                    //getTotalRequests(totalRequests);
                    //getTotalParticipants(totalParticipants);

                }
            )
        )
        .catch(e => console.log(e));
}

function drawBar() {
    let ctx = document.getElementById('responses');
    ctx.height = 100;
    let myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Accept', 'Refuz'],
            datasets: [{
                label: '# of Responses',
                data: [12, 19, 3, 5, 2, 3],
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(54, 162, 235)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)'
                ],
                borderWidth: 1,
                responsive: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function drawPie(countryDict) {
    let ctx = document.getElementById('country');
    ctx.height = 100;
    let countriesKey = Object.keys(countryDict);
    let countriesValues = Object.values(countryDict);
    console.log(countriesKey);

    let myChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: countriesKey,
            datasets: [{
                label: '# of Countries',
                data: countriesValues,
                backgroundColor: [
                    'rgba(255, 99, 132)',
                    'rgba(100, 162, 235)',
                    'rgba(200, 45, 235)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
                responsive: true
            }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
}

function getTotalRequests(totalRequests) {
    let th = document.getElementById('row1');
    th.innerText = totalRequests;
}

function getTotalParticipants(totalParticipants) {
    let th = document.getElementById('row2');
    th.innerText = totalParticipants;
}

function getTotalCountries(totalCountries) {
    let th = document.getElementById('row3');
    th.innerText = totalCountries;
}

getData();