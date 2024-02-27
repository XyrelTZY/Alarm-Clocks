

let checkbox = document.querySelector(".checkbox");
let setBtn = document.querySelector(".set-btn");
let stopBtn = document.querySelector(".stop-btn");
let timeContainer = document.querySelector(".time");
let alarmContainer = document.querySelector(".alarm-container");
let timePara = timeContainer.querySelector(".time-value");
let datePara = timeContainer.querySelector(".date-value");
let hourInput = document.getElementById("i1");
let minuteInput = document.getElementById("i2");
let ampmInput = document.getElementById("ampm1");
let sound = new Audio("https://www.freespecialeffects.co.uk/soundfx/animals/duck1.wav");
sound.loop = true;
sound.loop = true;
let interval1 = "",
  interval2 = "";
checkbox.onclick = () => {
  if (checkbox.checked) {
    setBtn.classList.remove("hidden");
    localStorage.setItem("checkbox", true);
    if (localStorage.getItem("hour")) stopInterval(), startInterval();
  } else {
    setBtn.classList.add("hidden");
    stopBtn.classList.add("hidden");
    stopInterval();
    localStorage.removeItem("checkbox");
  }
};
setBtn.onclick = () => {
  alarmContainer.classList.remove("hidden");
  timeContainer.classList.add("hidden");
  localStorage.setItem("opened", true);
};

// time interval
let hour,
  minute,
  second,
  ampm = "AM";
let date, month, year;
function timeInterval() {
  const today = new Date();
  hour = today.getHours();
  if (hour >= 12) ampm = "PM";
  if (hour > 12) hour = hour - 12;
  minute = today.getMinutes();
  second = today.getSeconds();
  timePara.innerHTML = `${addZero(hour)}:${addZero(minute)}:${addZero(
    second
  )}  ${ampm}`;

  date = today.getDate();
  month = today.getMonth() + 1;
  year = today.getFullYear();
  datePara.innerHTML = `${addZero(date)}-${addZero(month)}-${addZero(year)}`;
}
timeInterval();
interval1 = setInterval(timeInterval, 1000);
function addZero(x) {
  if (x.toString().length == 1) x = "0" + x;
  return x;
}
// alarmInterval

function alarmInterval() {
  if (
    checkbox.checked &&
    hour == hourInput.value &&
    minute == minuteInput.value &&
    ampm == ampmInput.value &&
    alarmContainer.classList.contains("hidden")
  ) {
    setBtn.classList.add("hidden");
    stopBtn.classList.remove("hidden");
    sound.play();
    setTimeout(() => clearInterval(interval2));
    setTimeout(() => {
      sound.pause();
      setBtn.classList.remove("hidden");
      stopBtn.classList.add("hidden");
    }, 120000);
  }
  // console.log("a");
}
function cancelBtn() {
  alarmContainer.classList.add("hidden");
  timeContainer.classList.remove("hidden");
  localStorage.removeItem("opened");
}
function okBtn() {
  if (hourInput.value != "" && minuteInput.value != "") {
    hourInput.value = addZero(hourInput.value);
    minuteInput.value = addZero(minuteInput.value);
    if (
      hourInput.value.length <= 2 &&
      minuteInput.value.length <= 2 &&
      hourInput.value > 0 &&
      hourInput.value <= 12 &&
      minuteInput.value >= 0 &&
      minuteInput.value <= 59
    ) {
      startInterval();
      cancelBtn();
      localStorage.setItem("hour", hourInput.value);
      localStorage.setItem("minute", minuteInput.value);
      localStorage.setItem("ampm", ampmInput.value);
    }
  } else alert("Fill all the input field");
}
stopBtn.onclick = () => {
  stopInterval();
  setTimeout(() => startInterval(), 120000);
  setBtn.classList.remove("hidden");
  stopBtn.classList.add("hidden");
};

window.onload = () => {
  if (localStorage.getItem("checkbox")) {
    checkbox.checked = true;
    setBtn.classList.remove("hidden");
    startInterval();
  }
  hourInput.value = localStorage.getItem("hour");
  minuteInput.value = localStorage.getItem("minute");
  if (localStorage.getItem("ampm"))
    alarmContainer.querySelector(
      `option[value=${localStorage.getItem("ampm")}]`
    ).selected = true;
  if (localStorage.getItem("opened")) {
    alarmContainer.classList.remove("hidden");
    timeContainer.classList.add("hidden");
  }
};
function startInterval() {
  clearInterval(interval2);
  interval2 = setInterval(alarmInterval, 1000);
}
function stopInterval() {
  clearInterval(interval2);
  sound.pause();
}
window.oncontextmenu = (e) => {
  e.preventDefault();
  document.body.requestFullscreen();
};

