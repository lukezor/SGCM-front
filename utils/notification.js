const buefy = require('buefy')

class Notification {
    sendNotification(message, type, time) {
        buefy.NotificationProgrammatic.open({
            message: message,
            type: type,
            time: time,
            position: 'is-bottom-right'
        })
    }
}

export default new Notification()