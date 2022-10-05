import {getActiveTabURL} from './utils.js'


const seconds = document.getElementById("input-sec");
const minutes = document.getElementById("input-min");
const startButton = document.getElementById("start_button");
const startMonitoring = document.getElementById("startMonitoring");

var refresh_interval = 0;
var state = false;

async function reload() {
  const activeTab = await getActiveTabURL();
  chrome.runtime.sendMessage({ message: "reload",tab: activeTab });
}

function startButton_clickHandler(e) {
  if (state === false) {
    refresh_interval = (parseInt(minutes.value) * 60) + parseInt(seconds.value);
    if (refresh_interval !== 0) {
      startButton.innerHTML = 'Stop';
      countdown(refresh_interval);
      state = true;
    }
    else {
      alert('Input data is incorrect!');
    }
  }
  else {
    chrome.runtime.sendMessage({ message: "stop clicked!" });
    startButton.innerHTML = 'Start'
    state = false;
    window.location.reload(true);
  }
}


async function startMonitoring_clickHandler(e) {
  const activeTab = await getActiveTabURL();
  startMonitoring.innerHTML= 'Started Monitoring'
  startMonitoring.disabled =true;
  startMonitoring.style.cursor = "not-allowed";
  chrome.runtime.sendMessage({ message: "monitoring",tab: activeTab });
}


 function resetAll() {
   seconds.innerHTML = 0;
   minutes.innerHTML = 0;
   refresh_interval = 0;
   state = false;

 }

function countdown(time) {
  var t = time;
  var x = setInterval(function () {
    if (state === true) {
      t--;
      if (t < 0) {
        reload();
        t = time;
      }
    }
    else {
      clearInterval(x);
    }
  },1000)
}


document.addEventListener('DOMContentLoaded', function () {
  resetAll();
  startButton.addEventListener('click', startButton_clickHandler);
  startMonitoring.addEventListener('click', startMonitoring_clickHandler);
});