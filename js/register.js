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
    await axios.post('http://87.242.121.216:8080/user/signup',{
        "fname":"",
        "lname":name,
        "login":login,
        "password": password,
        "role": "role",
        "data":"bob"
    }).then(res => console.log(res))
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
    if(data.name && data.login && areEqual && data.password){;
        postData(data)
    }
})
