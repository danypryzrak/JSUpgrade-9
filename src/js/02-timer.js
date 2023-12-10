import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

const timeInput = document.querySelector("#datetime-picker")
const startBtn = document.querySelector("[data-start]")
let days = document.querySelector("[data-days]")
let hours = document.querySelector("[data-hours]")
let minutes = document.querySelector("[data-minutes]")
let seconds = document.querySelector("[data-seconds]")
let selectedTime
let timerId


startBtn.disabled = true

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0].getTime() <= options.defaultDate.getTime()) {
        alert("Please choose a date in the future")
      } else {
          startBtn.disabled = false
          selectedTime = selectedDates[0].getTime()
      }
   
  },
};

flatpickr(timeInput, options)

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
return String(value).padStart(2, '0')
}

startBtn.addEventListener("click", () => {
    timerId = setInterval(() => {
        
        let timeDiff = selectedTime - new Date()
        let remainder = convertMs(timeDiff)
        console.log(String(remainder.days))
    
        if (timeDiff > 0) {
    startBtn.disabled = true
    days.textContent = addLeadingZero(remainder.days)
    hours.textContent = addLeadingZero(remainder.hours)
    minutes.textContent = addLeadingZero(remainder.minutes)
    seconds.textContent = addLeadingZero(remainder.seconds)
    } else {
            startBtn.disabled = false
            clearInterval(timerId)
            days.textContent = "00"
            hours.textContent = "00"
            minutes.textContent = "00"
            seconds.textContent = "00"
    }
    }, 1000)
})