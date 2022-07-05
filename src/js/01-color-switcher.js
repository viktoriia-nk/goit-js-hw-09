
const bodyEl = document.querySelector("body")
const buttonElStart = document.querySelector("button[data-start]")
const buttonElStop = document.querySelector('button[data-stop]')
let setIntervalId=null;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

buttonElStart.addEventListener("click", ()=>{
    buttonElStart.setAttribute("disabled", 'true')
        setIntervalId = setInterval(()=>{
        bodyEl.style.backgroundColor=`${getRandomHexColor()}`
    },1000)
 
    
})

buttonElStop.addEventListener("click", () => {
    buttonElStart.removeAttribute("disabled")
    clearInterval(setIntervalId)
})








