const fetch = require('node-fetch')
const token = require('./token.js')

module.exports = {
    sendNotification: (title, body) => {
        fetch('https://exp.host/--/api/v2/push/send',{
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({
                to: token,
                title: title,
                body: body,
                channelId: "default"
            })
        })
    }
}