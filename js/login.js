let rightPass;
console.log('bob');
const changeUrl = (path/* путь до админ панели в начале без '/' или точки */)=>{
    const url = window.location.href;
    let newUrl = url.split('/');
    newUrl[newUrl.length -1] = path
    window.location.href = newUrl.join('/')
}

const checkData = async (login)=>{

    await fetch(`http://87.242.121.216:8080/user/login/${login}`)
    .then(res => res.json())
    .then(res=> rightPass = res);
    console.log(rightPass);

    if(rightPass && rightPass.user.password === sha256($('#form-password')[0].value)){
        changeUrl('/lk/main/lk.html')
    }else{
        for(let i = 0 ; i < $('.form-error').length; i++){
            $('.form-error')[i].classList.add('active')
        }
    }
}


$('.site-btn').on('click' , (e)=>{
    e.preventDefault()
    checkData($('#form-email')[0].value)
})




