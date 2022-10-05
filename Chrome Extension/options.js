const minMoney = document.getElementById("minMoney");
const maxMoney = document.getElementById("maxMoney");
const subButton = document.getElementById("subButton");



async function filter() {
    chrome.runtime.sendMessage({ message: "filter"})

}

function submittButton_clickHandler(e) {
    const minimumMoney = parseInt(minMoney.value);
    const maximumMoney = parseInt(maxMoney.value);
    if (minimumMoney !== 0 && maximumMoney === 0) {
        alert('Input data is incorrect!')
    }
    else if (minimumMoney === 0 && minimumMoney === 0) {
        alert('Fields cannot be empty!')
    }
    else if (minimumMoney > maximumMoney) {
        alert('Max number must be more than min number!')
    }
    else {
        chrome.storage.sync.set({"minMoney": minimumMoney});
        chrome.storage.sync.set({"maxMoney": maximumMoney});
        filter();
    }
}

function resetAll() {
    minMoney.innerHTML = 0;
    maxMoney.innerHTML = 0;

}

document.addEventListener('DOMContentLoaded', function () {
    resetAll();
    subButton.addEventListener('click', submittButton_clickHandler);
});