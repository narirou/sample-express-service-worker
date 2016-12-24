const indexPage = require('../pages/index');
const errorPage = require('../pages/error');

function render() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js')
        .then((registration) => {
            console.log(`ServiceWorker registration successful with scope: ${registration.scope}`);
        })
        .catch(console.error.bind(console));

        window.document.body.innerHTML = indexPage;
        return;
    }
    window.document.body.innerHTML = errorPage;
}

render();
