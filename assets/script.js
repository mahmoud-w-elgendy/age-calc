let inputs = document.querySelectorAll("input");
let submitBtn = document.querySelector("button");
let inputHolders = document.querySelectorAll(".input");
let daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
let outputs = document.querySelectorAll(".output");

submitBtn.addEventListener("click", function(e) {
  e.preventDefault();
  let currentDate = new Date();
  let inputText = [];
  let failed = false;
  for(let e of inputHolders) {
    failed = false;
    e.classList.remove("failed");
    e.classList.remove("empty");
    e.classList.remove("invalid");
  }
  for(let input of inputs) {
    inputText.push(input.value);
  }
  let [day, month, year] = inputText;
  let dateInfo = [day, month, year];
  
  for(let i = 0; i < dateInfo.length; i++) {
    if(!(dateInfo[i] != "")) {
      failed = true;
      inputHolders[i].classList.add("empty");
    }
  }
  if(!(month < 13 && month > 0) && month != "") {
    inputHolders[1].classList.add("invalid");
    failed = true;
  }
  if(!(day <= daysInMonth[month - 1] && day > 0) && day != "") {
    inputHolders[0].classList.add("invalid");
    failed = true;
  }
  if(!(year <= (new Date()).getFullYear()) && year != "") {
    inputHolders[2].classList.add("invalid");
    failed = true;
  }
  if(failed == true) {
    for(let e of inputHolders) {
      e.classList.add("failed");
    }
  } else {
    year % 4 ? daysInMonth[1] = 28: daysInMonth[1] = 29;
    let yearCount = currentDate.getFullYear() - year;
    let monthCount = currentDate.getMonth() - month - 1;
    let dayCount = currentDate.getDate() - day;
    if(currentDate.getDate() < day) {
      --monthCount;
      dayCount += daysInMonth[month - 1];
    }
    if(currentDate.getMonth() < month - 1) {
      --yearCount;
      monthCount += 12;
    }
    outputDateInfo = [yearCount, monthCount + 1, dayCount];
    for(let i = 0; i < 3; ++i){
      animateValue(outputs[i], 0, outputDateInfo[i], 900);
    }
  }
})

function animateValue(obj, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    obj.innerHTML = Math.floor(progress * (end - start) + start);
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
}
