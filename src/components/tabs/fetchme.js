try {
  fetch('https://us-central1-bloodpool-2dfd4.cloudfunctions.net/adduseree', {
method: 'POST',
headers: {
Accept: 'application/json',
'Content-Type': 'application/json',
},
body: JSON.stringify({
phn: this.state.phn,
password: this.state.password,
fcmid: this.state.fcmid,
lat: this.state.lat,
longt: this.state.longt,
act: this.state.active,
bgroup: this.state.bgroup,
addr: this.state.addr
}),
}).then((response) => {
  console.log(response);
})
.catch((error) => {
  console.error(error);
});
} catch (err) {
  console.log('error signing up: ', err)
}
