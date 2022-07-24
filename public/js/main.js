// Display selected call from active call list

const activeCalls = document.querySelectorAll('.activeCall')
Array.from(activeCalls).forEach(elem => elem.addEventListener('click', displaySelectedCall))

async function displaySelectedCall() {
    const id = this.value
    if (id) {
        sessionStorage.setItem('id', id) // Sets new id to sessionStorage, so the call will be active on reload
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
                    else if (elem.id === "id") {
                        elem.value = info[i]._id // MongoDB's "_id" does not match elem's "id", so the id value must be set manually
                    }
                    else {
                        elem.value = '' // Server.js does not assign properties in MongoDB when the call is created, 
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

// Create a new call

const newCallButton = document.querySelector("#newCall")
newCallButton.addEventListener('click', createCall)

async function createCall() {
    try {
        const res = await fetch('createCall', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
          })
        const data = await res.json()
        const id = data.insertedId
        if (id) {
            sessionStorage.setItem('id', id) // Sets new id to sessionStorage, so the new call will be active on reload
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
        const callInfoDataObject = {}
        const callInfoData = document.querySelectorAll('.callInfoData')
        Array.from(callInfoData).forEach(elem => {
            callInfoDataObject[elem.id] = elem.value // Populates object with properties and values from the active call form
        })
        const res = await fetch('saveSelectedCall', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(callInfoDataObject)  
          })
        const data = await res.json()
    }
    catch(err) {
        console.log(err)
    }
}

// Delete selected call

const deleteCallButton = document.querySelector('#deleteCallButton')
deleteCallButton.addEventListener('click', deleteSelectedCall)

async function deleteSelectedCall() {
    const id = document.querySelector('#id').value
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