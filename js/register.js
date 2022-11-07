'use strict';

const inputs = document.querySelectorAll('.check-form');
const equalBox = document.querySelectorAll('.pass-equal')
const url = '';/* ccылка на бэкенд */

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(message);                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    return hashHex;
}




const getData = ()=>{
    let name,login, password;

    inputs.forEach(item =>{
        if(item.id === 'name'){
            name = item.value
        }
        if(item.id === 'email' ){
            login = item.value
        }
        if(item.id === 'password'){
            password = item.value
           
        }
    })

    return{name, login , password}
}


const checkPass = ()=>{

    let areEqual = true
    equalBox.forEach(item => {

        if($('#password')[0].value !== $('#rePassword')[0].value || $('#rePassword')[0].value.length < 6){
            item.innerHTML = 'Пароли не совпадают'
            item.classList.add('active');
            areEqual =  false
        }
        if($('#rePassword')[0].value.length < 6){
            item.innerHTML = 'Минимальная длина пароля 6'
            item.classList.add('active');
            areEqual =  false
        }
        else{
            item.classList.remove('active');
            areEqual= true
        }
        
    });
    return areEqual
};



const postData = async ({name, login, password})=>{
    let passwordHash;
    await  sha256(password).then(res => passwordHash = res)
    console.log(passwordHash);
    let data = {
        "fname":"",
        "lname":name,
        "login":login,
        "password": passwordHash,
        "role": "role",
        "data":"bob"
    }
    await fetch('http://87.242.121.216:8080/user/signup',{
        method:'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
          },
        body:JSON.stringify(data)
    }).then(res => res.json())
    .then(res => console.log(res))
    changeUrl('/lk/main/lk.html')
}



const changeUrl = (path/* путь до админ панели в начале без '/' или точки */)=>{
    const url = window.location.href;
    let newUrl = url.split('/');
    newUrl[newUrl.length -1] = path
    window.location.href = newUrl.join('/')
}
 
$(".site-btn").on('click' , (e)=>{
    e.preventDefault();
    let areEqual = checkPass();
    let data = getData();
    console.log(data);
    if(data.name && data.name.length>0 && data.login.length>0  && areEqual && data.password.length>0 ){;
        console.log('bob');
        postData(data)
    }else{
        console.log('none');
    }
})
