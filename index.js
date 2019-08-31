const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(express.static(path.join(__dirname, 'client')));
app.use(bodyParser.json());

const publicVapidKey =
'BJeA9cmuQ1y-8F506A3gJAY2xNWX80E97PtOCHMv_pjk6eDU0-moPepP5eL1YRjoaywk-T9BH2vxt-zMt4OG8gg';
const privateVapidKey = 'DpzB300Y7hXlJ4qTp3hN5iF_D1s22BBx1-IK9srpI1g';

webpush.setVapidDetails('mailto:cbaile@seas.upenn.edu', publicVapidKey, privateVapidKey);

// subscribe route
app.post('/subscribe', (req, res) => {
    // get pushsubscription object
    const subscription = req.body;

    // send 201 - resource created
    res.status(201).json({});

    const payload = JSON.stringify({'title': 'Push Test'});

    setTimeout(() => {
        webpush.sendNotification(subscription, payload)
        .catch(err => {
            console.error(err)
        });
    }, 1);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
})