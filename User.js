class User {
    constructor(phone) {
        this.phone = phone;
        this.crns = []
    }

    notify(oscar) {
        this.crns.forEach(Crn => {
            const section = oscar.lookUp(Crn.crn)
            const current_seats = section.
            crn.updateSeating(current_seats)
        })
        notifications = this.crns.map(crn => {
            if(crn.statusChanged && !crn.notifed){
                return crn.getNewStatus();
            }
        })
        return notifications;
    }
}

