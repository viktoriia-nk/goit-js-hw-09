import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.querySelector('#datetime-picker');
const buttonStartEl = document.querySelector('[data-start]');
const daysValueEl = document.querySelector('[data-days]');
const hoursValueEl = document.querySelector('[data-hours]');
const minutesValueEl = document.querySelector('[data-minutes]');
const secondsValueEl = document.querySelector('[data-seconds]');
const body = document.querySelector("body")
const divTimerEl = document.querySelector(".timer")

let selectedDate = null
let setIntervalId=null;

buttonStartEl.setAttribute("disabled", "true")

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        
      if (selectedDates[0] - Date.now() < 0) {
        window.alert('Please choose a date in the future');
              return;
            } else {
                selectedDate = selectedDates[0]
                buttonStartEl.removeAttribute("disabled")
            }
    },
  };

  const addLeadingZero = value => {
    return String(value).padStart(2, '0');
  };

  function convertMs(ms) {
      const second = 1000;
      const minute = second * 60;
      const hour = minute * 60;
      const day = hour * 24;
    
      const days = addLeadingZero(Math.floor(ms / day));
      const hours = addLeadingZero(Math.floor((ms % day) / hour));
      const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
      const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
      return { days, hours, minutes, seconds };
    }

    const startTimerFn = () => {
      
      buttonStartEl.setAttribute("disabled", "true")
      setIntervalId = setInterval(() => {
                const different = selectedDate - Date.now();
                const { days, hours, minutes, seconds } = convertMs(different);
                daysValueEl.textContent = days;
                hoursValueEl.textContent = hours;
                minutesValueEl.textContent = minutes;
                secondsValueEl.textContent = seconds;
                // console.log(selectedDate- Date.now())
                if (selectedDate - Date.now() < 1000){
                  clearInterval(setIntervalId)
                }
              }, 
              1000);
              
    }
   

    body.style.backgroundColor = "#212b46";
    body.style.color= "#c1c0c4";
    body.style.fontSize = "25px";
    divTimerEl.style.display = "flex"
    divTimerEl.style.gap = "30px"

    
  
    require("flatpickr/dist/themes/dark.css");

    buttonStartEl.addEventListener("click", startTimerFn)
    flatpickr(inputEl, options);
