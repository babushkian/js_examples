let countdown;
const timerDisplay = document.querySelector('.timer_display-left')
const endTime = document.querySelector('.timer_display-end')
const buttons = document.querySelectorAll('[data-time]')

function timer(seconds) {
    clearInterval(countdown);
    const current_time = Date.now();
    const endTime = current_time + seconds * 1000;
    displayTimer(seconds);
    displayEndTime(endTime);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((endTime - Date.now())/1000);
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
         displayTimer(secondsLeft);
         
    }, 1000);
}

function displayTimer(seconds) {
    const minutes = Math.floor(seconds/60)
    const secs = seconds % 60
    const display = `${minutes}:${secs<10?'0':''}${secs}`
    timerDisplay.textContent = display
    document.title = display
}

function displayEndTime(timestamp) {
    const end = new Date(timestamp)
    const mins = end.getMinutes()
    const hours = end.getHours()
    endTime.textContent = `Вернуться в ${hours}:${mins<10?'0':''}${mins}`

}

buttons.forEach(button => button.addEventListener('click', () => {
    timer(parseInt(button.dataset.time))
}));
document.timerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const minutes = parseInt(this.minutes.value);
    timer(minutes*60);
    this.reset() // очищаем форму
});