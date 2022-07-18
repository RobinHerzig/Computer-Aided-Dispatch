const activeCalls = document.querySelectorAll('.activeCall')
Array.from(activeCalls).forEach(elem => elem.addEventListener('click', displayActiveCall))

async function displayActiveCall() {
    const id = this.value
    // sessionStorage.removeItem('id')
    sessionStorage.setItem('id', id)
    console.log(id)
    // if (!sessionStorage.getItem(id)) return

    try {
        const response = await fetch('displayActiveCall', {
            method: 'get',
            // headers: {'Content-Type': 'application/json'},
            // body: JSON.stringify({
            //   '_id': id,
            // })
        })
        const info = await response.json()
        console.log(info)
        for (let i = 0; i < info.length; i++) {
            if (info[i]._id == sessionStorage.getItem('id')) {
                document.querySelector('#callId').value = info[i]._id
                document.querySelector('#date').value = info[i].date
                document.querySelector('#time').value = info[i].time
                document.querySelector('#location').value = info[i].location
                document.querySelector('#type').value = info[i].type
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
        console.log(id)
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
              '_id': id,
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
        // location.reload()
    }
    catch(err) {
        console.log(err)
    }
}




// const deleteText = document.querySelectorAll('.fa-trash')
// const thumbText = document.querySelectorAll('.fa-thumbs-up')

// Array.from(deleteText).forEach((element)=>{
//     element.addEventListener('click', deleteRapper)
// })

// Array.from(thumbText).forEach((element)=>{
//     element.addEventListener('click', addLike)
// })

// async function deleteRapper(){
//     const sName = this.parentNode.childNodes[1].innerText
//     const bName = this.parentNode.childNodes[3].innerText
//     try{
//         const response = await fetch('deleteRapper', {
//             method: 'delete',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               'stageNameS': sName,
//               'birthNameS': bName
//             })
//           })
//         const data = await response.json()
//         console.log(data)
//         location.reload()

//     }catch(err){
//         console.log(err)
//     }
// }

// async function addLike(){
//     const sName = this.parentNode.childNodes[1].innerText
//     const bName = this.parentNode.childNodes[3].innerText
//     const tLikes = Number(this.parentNode.childNodes[5].innerText)
//     try{
//         const response = await fetch('addOneLike', {
//             method: 'put',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               'stageNameS': sName,
//               'birthNameS': bName,
//               'likesS': tLikes
//             })
//           })
//         const data = await response.json()
//         console.log(data)
//         location.reload()

//     }catch(err){
//         console.log(err)
//     }
// }