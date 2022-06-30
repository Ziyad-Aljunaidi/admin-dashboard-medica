async function getAllDoctorsData(){
    let response = await fetch(`https://us-central1-medica72-5933c.cloudfunctions.net/api/getalldata?keyword=doctors`)
    let data = await response.json()
    return data
}

getAllDoctorsData().then((result) =>{
    console.log(result)
    putDoctors(result)
})


function flagControllerDoc(flags){
    let flag_label;
    try{
    if(flags < 1){
        flag_label =`<span class="badge badge-success">${flags}/1</span>`
    }
    else if ( flags >= 1){
        flag_label =`<span class="badge badge-danger">${flags}/1</span>`
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

function statusControllerDoc(flags){
    let status_label
    try{
        if(flags < 1){
            status_label =`<span class="badge badge-primary">Active</span>`
        }

        else if ( flags >= 1){
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

function actionControllerDoc(flags, id){
    let action_btn;
    if(flags < 1){
        action_btn = `<a role="button"  style="colore:white;" onclick="suspendDoc(${id},${flags})" class="badge badge-warning sts-btn"><i class="fa fa-exclamation-triangle"
        aria-hidden="true"></i></a>`
    }else if(flags >= 1){
        action_btn = `<a role="button" style="color:white;" onclick="reactiveDoc(${id})" class="badge badge-success sts-btn"><i class="icofont-refresh" aria-hidden="true"></i></a>`
    }else{
        action_btn = `<a role="button"  style="colore:white;" onclick="suspendDoc(${id})" class="badge badge-warning sts-btn"><i class="fa fa-exclamation-triangle"
        aria-hidden="true"></i></a>`
    }
    return action_btn
}

async function reactiveDoc(doc_id){
    let response = await fetch(`https://us-central1-medica72-5933c.cloudfunctions.net/api/resetDocFlags?doc_id=${doc_id}`)
    let data = await response.json()
    document.getElementById('loading-screen').style.display = "block"
    if(data.message == "done"){
        setTimeout(function() {
            //your code to be executed after 1 second
            window.location.reload()
            document.getElementById('users-div').style.display = "none"
          }, 1000);
    }
    
   //setTimeout(function() {
   //    //your code to be executed after 1 second
   //    
   //  }, 1000);
    
}

async function suspendDoc(doc_id){

    let response = await fetch(`https://us-central1-medica72-5933c.cloudfunctions.net/api/suspendDocFlags?doc_id=${doc_id}`);
    let data = await response.json()
    document.getElementById('loading-screen').style.display = "block"
    if(data.message == "done"){
        setTimeout(function() {
            //your code to be executed after 1 second
            window.location.reload()
            document.getElementById('users-div').style.display = "none"
          }, 1000);
    }
    

   
}

let tbody_doctors = document.getElementById("all-doctors")

function putDoctors(data){
    for(let i=0; i<data.length;i++){
        let tr = document.createElement('tr')
        let th = document.createElement('th')
        let tdname = document.createElement('td')
        let tdid = document.createElement('td')
        let tdphonenumber = document.createElement('td')
        let tdemail = document.createElement('td')
        let tdprofile = document.createElement('td')
        let tdta = document.createElement('td')
        let tdts = document.createElement('td')
        let tdflags = document.createElement('td')
        let tdaccountstatus = document.createElement('td')
        let tdaction = document.createElement('td')

        th.innerHTML = i+1
        tdname.innerHTML = data[i].name
        tdid.innerHTML = data[i].id
        tdphonenumber.innerHTML = data[i].phone_number
        tdemail.innerHTML = data[i].email
        tdprofile.innerHTML = `<a href="https://www.medica72.com/doctor_profile?doc_id=${data[i].id}" target="_blank" style="colore:white;"  class="badge alert-success sts-btn"><i class="icofont-user"></i></a>`
        tdflags.innerHTML = flagControllerDoc(data[i].flags)
        tdaccountstatus.innerHTML = statusControllerDoc(data[i].flags)
        tdaction.innerHTML = actionControllerDoc(data[i].flags, data[i].id)

        tr.appendChild(th)
        tr.appendChild(tdname)
        tr.appendChild(tdid)
        tr.appendChild(tdphonenumber)
        tr.appendChild(tdemail)
        tr.appendChild(tdprofile)
        tr.appendChild(tdflags)
        tr.appendChild(tdaccountstatus)
        tr.appendChild(tdaction)
        tbody_doctors.appendChild(tr)
    }
    document.getElementById("loading-screen").style.display = "none"
    
}
