async function getAllUsersData(){
    let response = await fetch(`https://us-central1-medica72-5933c.cloudfunctions.net/api/getalldata?keyword=users`)
    let data = await response.json()
    return data
}

getAllUsersData().then((result) =>{
    console.log(result)
    putUsers(result)
})


function flagController(flags){
    let flag_label;
    try{
    if(flags <= 1){
        flag_label =`<span class="badge badge-success">${flags}/3</span>`
    }
    else if(flags < 3){
        flag_label =`<span class="badge badge-warning">${flags}/3</span>`
    }else if ( flags >= 3){
        flag_label =`<span class="badge badge-danger">${flags}/3</span>`
    }

    else{
        flag_label = `<span class="badge badge-light">No Flags</span>`
    }
    }catch{
        flag_label = `<span class="badge badge-light">No Flags</span>`
    }
    console.log(flag_label)
    return flag_label
}

function statusController(flags){
    let status_label
    try{
        if(flags < 3){
            status_label =`<span class="badge badge-primary">Active</span>`
        }

        else if ( flags >= 3){
            status_label =`<span class="badge badge-warning">Suspended</span>`
        }
    
        else{
            status_label = `<span class="badge badge-primary">Active</span>`
        }
    }catch{
        status_label = `<span class="badge badge-primary">Active</span>`
    }
    return status_label
}

function actionController(flags, id){
    let action_btn;
    if(flags < 3){
        action_btn = `<a role="button"  style="colore:white;" onclick="suspend(${id},${flags})" class="badge badge-warning sts-btn"><i class="fa fa-exclamation-triangle"
        aria-hidden="true"></i></a>`
    }else if(flags >= 3){
        action_btn = `<a role="button" style="color:white;" onclick="reactive(${id})" class="badge badge-success sts-btn"><i class="icofont-refresh" aria-hidden="true"></i></a>`
    }else{
        action_btn = `<a role="button"  style="colore:white;" onclick="suspend(${id})" class="badge badge-warning sts-btn"><i class="fa fa-exclamation-triangle"
        aria-hidden="true"></i></a>`
    }
    return action_btn
}

async function reactive(user_id){
    let response = await fetch(`https://us-central1-medica72-5933c.cloudfunctions.net/api/resetflags?user_id=${user_id}`)
    setTimeout(function() {
        //your code to be executed after 1 second
        window.location.reload()
      }, 500);
    
}

async function suspend(user_id){

    await fetch(`https://us-central1-medica72-5933c.cloudfunctions.net/api/suspendUser?user_id=${user_id}`)
    setTimeout(function() {
        //your code to be executed after 1 second
        window.location.reload()
      }, 500);
   
}

let tbody = document.getElementById("all-users")

function putUsers(data){
    for(let i=0; i<data.length;i++){
        let tr = document.createElement('tr')
        let th = document.createElement('th')
        let tdname = document.createElement('td')
        let tdid = document.createElement('td')
        let tdphonenumber = document.createElement('td')
        let tdemail = document.createElement('td')
        let tdtr = document.createElement('td')
        let tdta = document.createElement('td')
        let tdts = document.createElement('td')
        let tdflags = document.createElement('td')
        let tdaccountstatus = document.createElement('td')
        let tdaction = document.createElement('td')

        th.innerHTML = i+1
        tdname.innerHTML = data[i].first_name+" "+data[i].last_name
        tdid.innerHTML = data[i].id
        tdphonenumber.innerHTML = data[i].phone_number
        tdemail.innerHTML = data[i].email
        tdflags.innerHTML = flagController(data[i].flags)
        tdaccountstatus.innerHTML = statusController(data[i].flags)
        tdaction.innerHTML = actionController(data[i].flags, data[i].id)

        tr.appendChild(th)
        tr.appendChild(tdname)
        tr.appendChild(tdid)
        tr.appendChild(tdphonenumber)
        tr.appendChild(tdemail)
        tr.appendChild(tdflags)
        tr.appendChild(tdaccountstatus)
        tr.appendChild(tdaction)
        tbody.appendChild(tr)
    }
    document.getElementById("loading-screen").style.display = "none"
    
}
let tr = document.createElement('tr')
let th = document.createElement('th')
let tdname = document.createElement('td')
let tdid = document.createElement('td')
let tdphonenumber = document.createElement('td')
let tdemail = document.createElement('td')
let tdtr = document.createElement('td')
let tdta = document.createElement('td')
let tdts = document.createElement('td')
let tdflags = document.createElement('td')
let tdaccountstatus = document.createElement('td')
let tdaction = document.createElement('td')
