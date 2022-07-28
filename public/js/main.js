// Display selected call after page load

window.addEventListener('load', displaySelectedCall)

// Display selected call from active call list

const activeCalls = document.querySelectorAll('.activeCall')
Array.from(activeCalls).forEach(elem => elem.addEventListener('click', displaySelectedCall))

async function displaySelectedCall() {
    const id = this.value
    if (id) {
        sessionStorage.setItem('id', id) // Set this id to sessionStorage, so the selected call can be displayed on page load
    }
    const idSessionStorage = sessionStorage.getItem('id')
    try {
        const res = await fetch('displaySelectedCall', {
            method: 'get',
        })
        const info = await res.json()
        highlightSelectedCall(info) // Highlight selected call in call list
        for (let i = 0; i < info.length; i++) {
            if (info[i]._id == idSessionStorage) {
                addApparatusRow(info[i]) // Add additional apparatus rows, if necessary 
                const callInfoData = document.querySelectorAll('.callInfoData')
                Array.from(callInfoData).forEach(elem => {
                    if (info[i].hasOwnProperty(elem.id)) {
                        elem.value = info[i][elem.id]
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
    }
    catch(err) {
        console.log(err)
    }
}

// Highlight selected call in call list

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

// Add additional apparatus rows, if necessary

// Remove all rows except the first. Reset IDs to start at 1.
// Calculate how many rows to complete.
    // Cannot check values directly, because they haven't been added to the form
    // Iterate through the JSON and count the apparatus IDs
// Create the rows.
// return to display function to fill values.



const addApparatusRow = async function(info) {
    let apparatusRow = document.querySelectorAll('.apparatusRow')
    let apparatusRowArray = Array.from(apparatusRow)
    const idLoop = function(clone) {
        for (let i = 1; i < clone.childNodes.length; i += 2) { // Loop through childNodes to update element ids
            let id = clone.childNodes[i].childNodes[0].id
            clone.childNodes[i].childNodes[0].id = incrementId(id)
        }
    }
    const incrementId = function(id) {
        id = id.split('')
        id = id.map(elem => Number(elem) ? Number(elem) + 1 : elem)
        return id = id.join('')
    }
    let apparatusCount = 0
    while (info.hasOwnProperty(['apparatus' + (apparatusCount + 1)])) {
        apparatusCount += 1
    }

    // console.log(info)
    console.log('Apparatus Count: ' + apparatusCount)
    console.log('Apparatus Array Count: ' + apparatusRowArray.length)
    console.log(apparatusRowArray)

    try {
        // apparatusRowArray.forEach((elem, index) => { // If there are too many rows, remove all except the first and readd as needed
        //     if (index > 0) {
        //         elem.remove()
        //         apparatusRowArray.splice(index, 1)
        //         console.log('Removing element')
        //         console.log('Count: (after removal)' + apparatusCount)
        //         console.log('Apparatus Array: (after removal)' + apparatusRowArray.length)
        //     }
        // })
        
        if (apparatusRowArray.length === apparatusCount + 1) { // If there is already the correct number of rows, return without making changes
            console.log('There is already the correct number of elements')
            return
        }
        else if (apparatusRowArray.length > apparatusCount) { // If there are too many rows, remove all except the first
            console.log('There are too many elements')
            let rowCount = 2
            apparatusRowArray.reverse().forEach((elem, index) => {
                if (index > 0) {
                    elem.remove()
                }
            })
            console.log('Removing elements with for loop -- FINISHED')
        }

        // else if (apparatusRowArray.length > apparatusCount) { // If there are too many rows, remove all except the first
        //     console.log('Theres too many elements')
        //     let rowCount = 2
        //     while (document.querySelector('#apparatus' + rowCount)) {
        //         rowCount += 1
        //         document.querySelector('#apparatus' + rowCount).parentElement.parentElement.remove()
        //         console.log('Removing elements with for loop')
        //     }
        // console.log('Removing elements with for loop -- FINISHED')

        // else if (apparatusRowArray.length > apparatusCount) { 
        //     console.log(apparatusRowArray)
        //     apparatusRowArray.forEach((elem, index) => {
        //         if (index > 0) {
        //             elem.remove()
        //             apparatusRowArray.splice(index, 1)
        //             console.log('Removing element')
        //             console.log('Count: (after removal)' + apparatusCount)
        //             console.log('Apparatus Array: (after removal)' + apparatusRowArray.length)
        //         }
        //     })
        // }
        
        console.log('Adding elements')
        for (let i = 1; i < apparatusCount + 1; i++) { // Clone nodes and place them in DOM
            const node = apparatusRowArray.at(-1)
            const clone = node.cloneNode(true)
            idLoop(clone)
            node.before(clone)
            apparatusRow = document.querySelectorAll('.apparatusRow')
            apparatusRowArray = Array.from(apparatusRow).reverse()
        }
    }
    catch(err) {
        console.log(err)
    }
}

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