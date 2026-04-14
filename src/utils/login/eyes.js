const openEye = document.getElementById('icon-login-open')
const closeEye = document.getElementById('icon-login-close')
const inputPassword = document.getElementById('input-password')

openEye.addEventListener('click', () =>{
  inputPassword.type = 'text'
  openEye.classList.add('hidden')
  
  closeEye.classList.remove('hidden')

})
closeEye.addEventListener('click', () =>{
  inputPassword.type = 'password'
  openEye.classList.remove('hidden');
  closeEye.classList.add('hidden');
})
