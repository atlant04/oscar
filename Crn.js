
class Crn {
    constructor(crn) {
        this.crn = crn;
        this.current = null;
        this.notified = false;
        this.statusChanged = false;
    }

    updateSeating(seats) {
        const newSeats = seats.seats.remaining;
        if(newSeats != current){
            statusChanged = true;
        } else {
            statusChanged = false;
        }
        current = newSeats;
    }

    getNewStatus() {
        notified = true;
        return current;
    }

}
