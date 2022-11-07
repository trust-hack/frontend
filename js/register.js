'use strict';

const inputs = document.querySelectorAll('.check-form');
const equalBox = document.querySelectorAll('.pass-equal')
const url = '';/* ccылка на бэкенд */



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
            password = sha256(item.value)
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
    let data = {
        "fname":"",
        "lname":name,
        "login":login,
        "password": password,
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
    postData(data)
    console.log(data.name.length);
    if(data.name.length>0 && data.login.length>0  && areEqual && data.password.length>0 ){;
        console.log('bob');
        postData(data)
    }else{
        console.log('none');
    }
})
