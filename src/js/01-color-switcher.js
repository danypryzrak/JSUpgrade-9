function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

const startBtn = document.querySelector("[data-start]");
const stopBtn = document.querySelector("[data-stop]");
const body = document.querySelector("body")
let timerId = null


const onStart = () => {
    startBtn.setAttribute('disabled', 'true')
    timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor()
    }, 1000)
}

const onStop = () => {
    startBtn.removeAttribute("disabled")
    clearInterval(timerId)
}

startBtn.addEventListener("click", onStart)
stopBtn.addEventListener("click", onStop)
