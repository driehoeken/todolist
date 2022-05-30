

//setting dark mode from localStorage if set
if(localStorage.getItem('mode') === 'dark'){
    document.getElementById('vars').setAttribute('href', 'src/style/dark.css');
}
