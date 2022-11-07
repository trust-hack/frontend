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


let rightPass;
let rightPassHash;
let currentPass;


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

    rightPassHash = rightPass.user.password    
    await sha256($('#form-password')[0].value).then(res =>currentPass = res)

    if(rightPass && rightPassHash === currentPass){
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




