const activeCalls = document.querySelectorAll('.activeCall')
Array.from(activeCalls).forEach(elem => elem.addEventListener('click', displayActiveCall))

window.addEventListener('load', displayActiveCall)

async function displayActiveCall() {
    const id = this.value
    
    if (id) {
        sessionStorage.setItem('id', id)
    }

    try {
        const response = await fetch('displayActiveCall', {
            method: 'get',
        })
        const info = await response.json()
        for (let i = 0; i < info.length; i++) {
            if (info[i]._id == sessionStorage.getItem('id')) {
                document.querySelector('#callId').value = info[i]._id
                document.querySelector('#date').value = info[i].date
                document.querySelector('#time').value = info[i].time
                document.querySelector('#location').value = info[i].location
                document.querySelector('#type').value = info[i].type

                document.querySelector('#first').value = info[i].first
                document.querySelector('#last').value = info[i].last
                document.querySelector('#phone').value = info[i].phone

                document.querySelector('#notes').value = info[i].notes
                
                document.querySelector('#apparatus').value = info[i].apparatus
                document.querySelector('#tone').value = info[i].tone
                document.querySelector('#enroute').value = info[i].enroute
                document.querySelector('#arrival').value = info[i].arrival
                document.querySelector('#departure').value = info[i].departure
                document.querySelector('#quarters').value = info[i].quarters

                document.querySelector('#contact').value = info[i].contact
                document.querySelector('#page').value = info[i].page
                document.querySelector('#notify').value = info[i].notify
            }
        }
    }
    catch(err) {
        console.log(err)
    }
}

const saveCallButton = document.querySelector('#saveCallButton')
saveCallButton.addEventListener('click', saveCall)

async function saveCall() {
    try {
        const id = document.querySelector('#callId').value
        const date = document.querySelector('#date').value
        const time = document.querySelector('#time').value
        const location = document.querySelector('#location').value
        const type = document.querySelector('#type').value

        const first = document.querySelector('#first').value
        const last = document.querySelector('#last').value
        const phone = document.querySelector('#phone').value

        const notes = document.querySelector('#notes').value

        const apparatus = document.querySelector('#apparatus').value
        const tone = document.querySelector('#tone').value
        const enroute = document.querySelector('#enroute').value
        const arrival = document.querySelector('#arrival').value
        const departure = document.querySelector('#departure').value
        const quarters = document.querySelector('#quarters').value

        const contact = document.querySelector('#contact').value
        const page = document.querySelector('#page').value
        const notify = document.querySelector('#notify').value
        
        const res = await fetch('saveCall', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'id': id,
              'date': date,
              'time': time,
              'location': location,
              'type': type,

              'first': first,
              'last': last,
              'phone': phone,

              'notes': notes,

              'apparatus': apparatus,
              'tone': tone,
              'enroute': enroute,
              'arrival': arrival,
              'departure': departure,
              'quarters': quarters,

              'contact': contact,
              'page': page,
              'notify': notify
            })
          })
        const data = await res.json()
        console.log(data)
        window.location.reload();
    }
    catch(err) {
        console.log(err)
    }
}