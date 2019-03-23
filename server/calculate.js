const notification = require('./notification.js')

module.exports = {
    calculate: (food) => {
        const mfd = [],uid = []
        if(food.length === 0)
            return null
        for(i = 0; i < food.length; i++){
            const exp = food[i].bestBefore
            const date = new Date()
            const dateTime =  parseInt(date.getDate()) + 30*parseInt(date.getMonth()+1) + 365*parseInt(date.getFullYear())
            const timeLeft = food[i].timeToExp - dateTime + exp
            //checking if item has expired or not
                //condition for item has expired
            if(timeLeft <= 0){
                notification.sendNotification(`${food[i].name} expired`, `${food[i].name} has expired`)
                mfd.push(food[i].mfd)
                uid.push(food[i].uid)
            }
            //1 week left for item to expire send notification
            else if(timeLeft > 0 && timeLeft <= 7){
                notification.sendNotification(`${food[i].name} is about to expire`, `${food[i].name} will expire in ${timeLeft} day(s)`)
            }
        }
        return [uid, mfd]
    }
}