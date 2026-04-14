document.querySelectorAll('.password-group').forEach(group => {
    
    const input = group.querySelector('.password-input');
    const openEye = group.querySelector('.icon-open');
    const closeEye = group.querySelector('.icon-close');

    openEye.addEventListener('click', () => {
        input.type = 'password';
        openEye.classList.add('hidden');
        closeEye.classList.remove('hidden');
    });

    closeEye.addEventListener('click', () => {
        input.type = 'text';
        openEye.classList.remove('hidden');
        closeEye.classList.add('hidden');
    });

});
