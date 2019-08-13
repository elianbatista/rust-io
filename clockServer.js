
class eventTimer {
    constructor(cd) {
        this.cd = cd;
        this.start = 0;
        this.end = 0;
    }
    startTimer(startTime) {
        this.start = startTime;
        this.end = this.start + this.cd;
    }
    forceStop() {
        this.start = this.end;
    }
    remainTime() {
        return this.end - this.start;
    }
    runTimer(deltaTime) {
        if (this.start <= this.end) {
            this.start += deltaTime;
        }
    }
    checkTimer() {
        return (this.start >= this.end);
    }
}
module.exports = eventTimer;