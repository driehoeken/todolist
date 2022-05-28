//setting dark mode from localStorage
if(localStorage.getItem('mode') === 'dark'){
    document.getElementById('vars').setAttribute('href', 'dark.css');
}