const API_PUBLIC = ''
document.getElementById('btn-exit').addEventListener('click',async () =>{
   
    try{
        const response = await fetch('/api/api/Auth/logout', {
            method: 'POST',
            credentials: 'include',
        });
        const data = await response.json();
        if(response.ok){
            window.location.href ='/'
        }
    }catch(error){
        console.log(error)
    }
})