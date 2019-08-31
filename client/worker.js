console.log('----service worker loaded----');

self.addEventListener('push', e => {
    const data = e.data.json();
    console.log(data);
    console.log('hello');
    console.log('----push received----');
    self.registration.showNotification(data.title, {
        body: 'notified by peter',
        icon: 'android-chrome-256x256.png'
    });
});