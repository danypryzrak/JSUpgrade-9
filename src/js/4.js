import Notiflix from "notiflix";

const form = document.querySelector('form')


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

function onCreatePromises(e) {
  e.preventDefault()
  let delay = Number(e.target.elements.delay.value)
  const step = Number(e.target.elements.step.value)
  const amount = Number(e.target.elements.amount.value)
  
  for (let i = 1; i <= amount; i++){
    if (delay === Number(e.target.elements.delay.value)) {
      createPromise(i, delay).then(onSuccess).catch(onError);
    
    } else {
      delay += step;
      createPromise(i, delay).then(onSuccess).catch(onError);
    }
    form.reset()
  }
}

function onError({ position, delay }) {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
}

function onSuccess({ position, delay }) {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
}

form.addEventListener('submit', onCreatePromises);