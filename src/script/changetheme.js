const changeTheme = document.querySelector('#change-theme-checkbox');

if(localStorage.getItem('mode') === 'dark'){
    changeTheme.checked= true;
}
changeTheme.addEventListener('click', () => {
    
    if(changeTheme.checked){
        localStorage.setItem('mode', 'dark');
    }
    else{
        localStorage.setItem('mode', 'light');
    }
    document.getElementById('vars').setAttribute('href', `src/style/${localStorage.getItem('mode')}.css`);
});