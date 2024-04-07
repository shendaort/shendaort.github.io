const ID=[13665906]

async function login(){
    const map = 'https://dao3.fun/play/d39efd7b5b9736b28f32'
    var uid=document.getElementById(`uid`).value
    var pas=document.getElementById(`pass`).value
    var arm=document.getElementById(`arm`).value
    var ts=document.getElementById(`ts`).value
    if(arm=='192.136.124.3'&&ts=="8000"&&pas=="131210197"&&ID.includes(Number(uid))){
        alert(`身份校验无误！`)
        var url=map+"?uid="+uid+"&arm=1&atp=true&time="+Date.now()
        window.location.href=url
    }else{
        alert(`信息有误`)
    }
}