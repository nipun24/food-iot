const fetch = require('node-fetch')
const {TOKEN, DOMAIN, API_KEY, recipients} = require('./token.js')
const mailgun = require('mailgun-js')({apiKey: API_KEY, domain: DOMAIN})

module.exports = {
    sendNotification: (title, body) => {
        fetch('https://exp.host/--/api/v2/push/send',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                to: TOKEN,
                title: title,
                body: body,
                channelId: "default"
            })
        })
    },
    sendEmail: (subject,text) => {
        const data = {
            from: `food-iot@${DOMAIN}`,
            to: recipients,
            subject: subject,
            text: text
        };
          
        mailgun.messages().send(data, (error, body) => {
            if(error)
                throw error
        });
    }
}