// Display selected call from active call list

const activeCalls = document.querySelectorAll('.activeCall')
Array.from(activeCalls).forEach(elem => elem.addEventListener('click', displaySelectedCall))

async function displaySelectedCall() {
    const id = this.value
    if (id) {
        sessionStorage.setItem('id', id)
    }
    const idSessionStorage = sessionStorage.getItem('id')
    try {
        const res = await fetch('displaySelectedCall', {
            method: 'get',
        })
        const info = await res.json()
        for (let i = 0; i < info.length; i++) {
            if (info[i]._id == idSessionStorage) {
                const callInfoData = document.querySelectorAll('.callInfoData')
                Array.from(callInfoData).forEach(elem => {
                    if (info[i].hasOwnProperty(elem.id)) {
                        elem.value = info[i][elem.id]
                        // if apparatusTable
                    }
                })
            }
        }
        highlightSelectedCall(info)
    }
    catch(err) {
        console.log(err)
    }
}

// Automatically select call after page load

window.addEventListener('load', displaySelectedCall)

// Automatically select newly created call

const newCallButton = document.querySelector("#newCall")
newCallButton.addEventListener('click', createCall)

async function createCall() {
    try {
        const res = await fetch('createCall', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
          })
        const data = await res.json()
        console.log(data)
        const id = data.insertedId
        if (id) {
            sessionStorage.setItem('id', id)
        }
        window.location.reload();
    }
    catch(err) {
        console.log(err)
    }
}

// Automatically highlight selected call in call list

const highlightSelectedCall = async function(info) {
    const idSessionStorage = sessionStorage.getItem('id')
    const activeCallArray = Array.from(activeCalls)

    try {
        for (let i = 0; i < info.length; i++) {
            if (info[i]._id == idSessionStorage) {
                activeCallArray[i].style.background = 'grey'
            }
            else {
                activeCallArray[i].style.background = 'transparent'
            }
        }
    }
    catch(err) {
        console.log(err)
    }
}

// Save selected call

const saveCallButton = document.querySelector('#saveCallButton')
saveCallButton.addEventListener('click', saveSelectedCall)

async function saveSelectedCall() {
    try {
        // const callInfoDataObject = {}
        // const callInfoData = document.querySelectorAll('.callInfoData')
        // Array.from(callInfoData).forEach(elem => {
        //     callInfoDataObject[elem.id] = elem.value
        // })
        // console.log(callInfoDataObject)

        const id = document.querySelector('#id').value
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

        const res = await fetch('saveSelectedCall', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(
                // callInfoDataObject

                {
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
                }
            )
          })
        const data = await res.json()
        window.location.reload();
    }
    catch(err) {
        console.log(err)
    }
}

// Delete selected call

const deleteCallButton = document.querySelector('#deleteCallButton')
deleteCallButton.addEventListener('click', deleteSelectedCall)

async function deleteSelectedCall() {
    const id = document.querySelector('#callId').value
    try {
        const response = await fetch('deleteSelectedCall', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              'id': id,
            })
          })
        const data = await response.json()
        window.location.reload();

    }
    catch(err) {
        console.log(err)
    }
}