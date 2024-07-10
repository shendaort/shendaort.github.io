function getURLParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}
function encodeToBase64(str) {
    return window.btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}
const mail_title = getURLParameter('title');
const mail_to = getURLParameter('to');
const mail_content = getURLParameter('content');

var myHeaders = new Headers();
myHeaders.append("User-Agent", "Apifox/1.0.0 (https://apifox.com)");
myHeaders.append("Content-Type", "application/json");

var raw = JSON.stringify({
   "key": "f34928eaf7e8675ca1a17db0fbaa3c2f",
   "main": encodeToBase64(mail_content),
   "to": mail_to,
   "title": mail_title,
   "t": Date.now(),
   "sw": "a3d7eb36c26735f3f6250ff1283158b78753be06936a928d40a5c0d3c2401cc9"
});

var requestOptions = {
   method: 'POST',
   headers: myHeaders,
   body: raw,
   redirect: 'follow'
};


fetch("https://api.pgaot.com/email/send", requestOptions)
   .then(response => response.text())
   .then(result => console.log(result))
   .catch(error => console.log('error', error));

   