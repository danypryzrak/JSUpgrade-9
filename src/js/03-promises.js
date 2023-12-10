import Notiflix from "notiflix";

const form = document.querySelector(".form")


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
    const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    resolve({position, delay})
  } else {
    reject({position, delay})
  }
  }, delay)
  })
}

const onResolve = ({position, delay}) => {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);

}

const onRejected = ({position, delay}) => {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

form.addEventListener("submit", (ev) => {
  ev.preventDefault();
  let delay = Number(ev.target.elements.delay.value)
  const amount = Number(ev.target.elements.amount.value)
  const step = Number(ev.target.elements.step.value)
  
  for (let i = 1; i <= amount; i++) {
    console.log(delay)
    console.log(Number(ev.target.elements.delay.value))
    if (delay === Number(ev.target.elements.delay.value)) {
      createPromise(i, delay).then(onResolve).catch(onRejected);
    } else {
      delay += step;
      createPromise(i, delay).then(onResolve).catch(onRejected)
    }
    form.reset()
  } 
})

