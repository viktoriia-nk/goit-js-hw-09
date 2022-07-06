import Notiflix from 'notiflix';

const formEl = document.querySelector('.form')
const delayEl = formEl.querySelector('[name = "delay"]')
const stepEl = formEl.querySelector('[name="step"]')
const amountEl = formEl.querySelector('[name="amount"]')

let delayValue
let stepValue 
let amountValue 
let amountArr = []
let position = 0


const submitFn = event => {
  event.preventDefault()

  delayValue = Number(delayEl.value)
  stepValue = Number(stepEl.value)
  amountValue = Number(amountEl.value)
  // console.log(typeof delayValue);
  // console.log(stepValue);
  // console.log(amountValue);
  for (let i = 1; i<=amountValue; i+=1){
    amountArr.push(i)
  }
  amountArr.map((num)=>{
    position = num
    delayValue = position === 1 ? delayValue : (delayValue += stepValue);
    createPromise(position, delayValue)
    .then(({position, delayValue})=>{
      Notiflix.Notify.success(`🥳 Fulfilled promise ${position} in ${delayValue}ms`);
      console.log(`✅ Fulfilled promise ${position} in ${delayValue}ms`);
    })
    .catch(({position, delayValue})=>{
      Notiflix.Notify.failure(`💥 Rejected promise ${position} in ${delayValue}ms`)
      console.log(`❌ Rejected promise ${position} in ${delayValue}ms`)
    })
  })
  formEl.reset()

}

formEl.addEventListener("submit", submitFn)

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
  const shouldResolve = Math.random() > 0.3;
  setTimeout (() => {
    if (shouldResolve) {
      resolve ({position, delay});
    } else {
      reject ({position, delay});
    };
  }, delay)
  
});

}
