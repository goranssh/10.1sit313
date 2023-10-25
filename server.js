const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Mailgun configuration
var apiKey = 'key-a0b08bdc06c97f0f388cb2a6e5c0cf0e'; 
var domain = 'sandboxe357e4a674474a2e8ed4f5d27aeb3380.mailgun.org'; 
const mailgun = require('mailgun-js')({ apiKey, domain });

// Serve HTML and process subscriptions
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/subscribe', (req, res) => {
    const subscriberEmail = req.body.email; // Use subscriberEmail here
    const data = {
        from: 'rahul4825.be22@chitkara.edu.in',
        to: subscriberEmail,
        subject: "Thanks for subscribing!",
        text: "Welcome to our newsletter!"
    };

    mailgun.messages().send(data, (error, body) => { // Use message here
        if (error) {
            console.error(error);
            res.status(500).send('Failed to send email');
        } else {
            console.log('Email sent:', body);
            res.status(200).send('Email sent successfully');
        }
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
