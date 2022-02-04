import {loadGameForDate, updateStatsPage} from "./game";

loadGameForDate(new Date());
updateStatsPage();

function startTimer(duration, display) {
    let start = Date.now(),
        diff,
        hours,
        minutes,
        seconds,
        intervalId;

    function timer() {
        // get the number of seconds that have elapsed since
        // startTimer() was called
        diff = duration - (((Date.now() - start) / 1000) | 0);

        if (diff >= 0) {
            // does the same job as parseInt truncates the float
            hours = (diff / 3600) | 0;
            minutes = (diff / 60 % 60) | 0;
            seconds = (diff % 60) | 0;

            minutes = minutes < 10 ? "0" + minutes : minutes;
            seconds = seconds < 10 ? "0" + seconds : seconds;

            display.textContent = hours + ":" + minutes + ":" + seconds;
        } else {
            display.textContent = "Now!";
            clearInterval(intervalId);
        }

    }

    // we don't want to wait a full second before the timer starts
    timer();
    intervalId = setInterval(timer, 1000);
}

function getSecondsTillTomorrow(): number {
    let now = new Date();
    let tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
    let diff = tomorrow.getTime() - now.getTime(); // difference in ms
    return Math.round(diff / 1000); // convert to seconds
}

startTimer(getSecondsTillTomorrow(), document.getElementById("countdown-timer"));
