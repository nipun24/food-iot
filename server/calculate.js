module.exports = {
    calculate: (expTime) => {
        //these needs to pe passes as arguments but using as hard coded values for now
        // const timeToExp = "737100"
        //
        if(expTime.length === 0)
            console.log("empty")
        for(i = 0; i < expTime.length; i++){
            for (j = 0; j < expTime[i].timeToExp.length; j++){
                const exp = expTime[i].timeToExp[j]
                const date = new Date()
                const dateTime =  parseInt(date.getDate()) + 30*parseInt(date.getMonth()+1) + 365*parseInt(date.getFullYear())
                const timeLeft = parseInt(exp) - dateTime
                //checking if item has expired or not
                //condition for item has expired
                if(timeLeft <= 0){
                    console.log("item has expired")
                }
                //1 week left for item to expire send notification
                else if(timeLeft > 0 && timeLeft <= 7){
                    console.log("send notification")
                }
                //item is still good but send return timeLeft to update the database
                else {
                    console.log("item is good")
                }
            }
        }
    }
}