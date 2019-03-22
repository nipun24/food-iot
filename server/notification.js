const fetch = require('node-fetch')
const EXPO_PUSH_TOKEN = require('./constants.js').EXPO_PUSH_TOKEN
module.exports = {
    sendNotification: (title, body) => {
        fetch('https://exp.host/--/api/v2/push/send',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                to: EXPO_PUSH_TOKEN,
                title: title,
                body: body,
                channelId: "default"
            })
        })
    }
}