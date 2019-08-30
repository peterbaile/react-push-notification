const publicVapidKey =
    'BJeA9cmuQ1y-8F506A3gJAY2xNWX80E97PtOCHMv_pjk6eDU0-moPepP5eL1YRjoaywk-T9BH2vxt-zMt4OG8gg';

if ('serviceWorker' in navigator) {
    send()
        .catch(err => {
            console.error(err);
        })
}

async function send() {
    console.log("----registering a service worker----");
    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });
    console.log("------service worker registered-----");

    console.log('----registering push----');
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });
    console.log('----push registered----');

    console.log('----sending push----');
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    });
    console.log('----push sent----');
}

const urlBase64ToUint8Array = base64String => {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}