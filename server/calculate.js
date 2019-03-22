const notification = require('./notification.js')

module.exports = {
    calculate: (food) => {
        const mfd = [],timeToExp = []
        if(food.length === 0)
            return null
        for(i = 0; i < food.length; i++){
            const exp = food[i].exp
            for (j = 0; j < food[i].timeToExp.length; j++){
                const timeToExp = food[i].timeToExp[j]
                const date = new Date()
                const dateTime =  parseInt(date.getDate()) + 30*parseInt(date.getMonth()+1) + 365*parseInt(date.getFullYear())
                const timeLeft = timeToExp - dateTime + exp
                //checking if item has expired or not
                //condition for item has expired
                if(timeLeft <= 0){
                    notification.sendNotification(`${food[i].name} expired`, `${food[i].name} has expired`)
                    mfd.push(food[i].mfd[j])
                    timeToExp.push(food[i].timeToExp[j])
                }
                //1 week left for item to expire send notification
                else if(timeLeft > 0 && timeLeft <= 7){
                    notification.sendNotification(`${food[i].name} is about to expire`, `${food[i].name} will expire in ${timeLeft} days`)
                }
                //item is still good but send return timeLeft to update the database
                else {
                    console.log("item is good")
                }
            }
        }
        return [mfd, timeToExp]
    }
}