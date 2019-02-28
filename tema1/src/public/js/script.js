function sendData () {
  let word = document.getElementById('inputValue').value
  let url = `http://localhost:8081/api/logs?country=${word}`
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
      console.log(response)
      response = JSON.parse(response)
      let vreme = document.getElementById('vreme')
      vreme.innerHTML = response.text[0]
    }
  ).catch(e => console.log(e))
}

function metrics () {
  let url = 'http://localhost:8081/metrics'
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
      let table = document.getElementById('table')
      console.log(response)
      for (let elem in response) {
        let tr = document.createElement('tr')
        for (let prop in response[elem]) {
          let td = document.createElement('td')
          td.innerText = response[elem][prop]
          tr.appendChild(td)
        }
        table.appendChild(tr)
      }
    }
  ).catch(e => console.log(e))
}

metrics()
