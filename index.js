function handleSubmit (e) {
  e.preventDefault()
  const user = e.target
  const url = getUrl(
    user.fname.value,
    user.email.value,
    user.streetName.value,
    user.houseNumber.value,
    user.city.value,
    user.entrance.value,
    user.aptNumber.value,
    user.zip.value,
    user.cnumber.value,
    user.cphone.value,
    user.businessName.value,
    user.typeOfService.value,
    user.typeOfDelivery.value
  )
  callAPI(url)
}

function getUrl (
  name,
  email,
  streetName,
  houseNumber,
  city,
  enterance,
  aptNumber,
  customerNumber,
  customerPhone,
  businessName,
  typeOfService,
  typeOfDelivery
) {
  const delivery = 'מסירה'
  const pickup = 'איסוף'
  var URL = `https://run.hfd.co.il/RunCom.Server/Request.aspx?APPNAME=run&PRGNAME=ship_create_anonymous&ARGUMENTS=-N${customerNumber},-A${
    typeOfService === 'delivery' ? delivery : pickup
  },-N${
    typeOfDelivery === 'homeDelivery' ? 35 : 50
  }, -N5,-A${businessName},-A,-N${
    typeOfDelivery === 'homeDelivery' ? 10 : 11
  },-N,-N,-N, -A${name},-A,-A${city},-A,-A${streetName},-A${houseNumber},-A${enterance},-A,-A${aptNumber},-A${customerPhone},-A,-A, 
          -A,-A,-A,-A${createId()},-A,-A,-N, -N,-N,-A,-A,-N,-N,-AXML,-AY,-A,-N,-A${email},-A,-A`
  return URL
}

function createId (length = 10) {
  var code = ''
  var chars =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!@#$%^&*()'
  for (var i = 0; i < length; i++) {
    code += chars[Math.floor(Math.random() * chars.length)]
  }
  return code
}

function callAPI (url) {
  fetch(url)
    .then(response => {
      return response.text()
    })
    .then(str => {
      const data = new DOMParser().parseFromString(str, 'text/xml');
      handleResponse(data);
    })
}

function handleResponse (data) {
  const result = data.getElementsByTagName('result')

  result.length >= 1 && result[0].textContent === 'ok'
    ? handleSuccess()
    : handleError()
}

function handleSuccess () {
  const successMsg = document.getElementById('success-msg')
  const errorMsg = document.getElementById('error-msg')
  successMsg.style.display = 'block'
  errorMsg.style.display = 'none'
}

function handleError () {
  const errorMsg = document.getElementById('error-msg')
  const successMsg = document.getElementById('success-msg')
  errorMsg.style.display = 'block'
  successMsg.style.display = 'none'

}

function removeMessage (el) {
  el.parentElement.style.display = 'none'
}
