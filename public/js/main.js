const activeCalls = document.querySelectorAll('.activeCall')
Array.from(activeCalls).forEach(elem => elem.addEventListener('click', displayActiveCall))

async function displayActiveCall() {
    var id = this.value
    sessionStorage.removeItem('id')
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
                console.log(info[i].location)
                document.querySelector('#date').value = info[i].date || 'Date'
                document.querySelector('#time').value = info[i].time || 'Time'
                document.querySelector('#location').value = info[i].location
                document.querySelector('#type').value = info[i].type || 'Type'
            }
        }
    }
    catch(err) {
        console.log(err)
    }
}

// const saveCallButton = document.querySelector('#saveCall')
// saveCallButton.addEventListener('click', saveCall)

// async function saveCall(){
//     const id = this.data
//     sessionStorage.removeItem('id')
//     sessionStorage.setItem('id', id)
//     console.log(id)
//     console.log('Saving call')

//     try{
//         const response = await fetch('saveCall', {
//             method: 'put',
//             headers: {'Content-Type': 'application/json'},
//             body: JSON.stringify({
//               '_id': id
//             })
//           })
//         const data = await response.json()
//         console.log(data)
//         location.reload()

//     }catch(err){
//         console.log(err)
//     }
// }




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