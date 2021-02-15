class CountdownTimer {
  constructor({ selector, targetDate }) {
    this.intervalId = null;
    this.isActive = false;
    this.timerRef = document.querySelector(selector);
    this.targetDate = targetDate;
    this.init();
  }

  init() {
    const time = this.getTimeComponents(0);
    this.updateClockface(time);
  }

  start() {
    if (this.isActive) {
      return;
    }
    const startTime = this.targetDate.getTime();
    this.isActive = true;

    this.intervalId = setInterval(() => {
      const currentTime = Date.now();
      const deltaTime = startTime - currentTime;
      const time = this.getTimeComponents(deltaTime);

      this.updateClockface(time);
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.isActive = false;
    const time = this.getTimeComponents(0);
    this.updateClockface(time);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(
      Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    );
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }

  pad(value) {
    return String(value).padStart(2, '0');
  }

  updateClockface({ days, hours, mins, secs }) {
    this.timerRef.querySelector('[data-value="days"]').textContent = days;
    this.timerRef.querySelector('[data-value="hours"]').textContent = hours;
    this.timerRef.querySelector('[data-value="mins"]').textContent = mins;
    this.timerRef.querySelector('[data-value="secs"]').textContent = secs;
  }
}

const timer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Feb 27, 2021'),
});
