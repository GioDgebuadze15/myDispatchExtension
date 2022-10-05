function reloadPage() {
  window.location.reload(true);
}
function updateExtensionIcon() {
  chrome.action.setIcon({
    path: {
      "16": "./assets/RedMarsLogo.png",
      "32": "./assets/RedMarsLogo.png",
      "48": "./assets/RedMarsLogo.png",
      "128": "./assets/RedMarsLogo.png"
    }
  });
}
function setDefaultIcon() {
  chrome.action.setIcon({
    path: {
      "16": "./assets/MarsLogo.png",
      "32": "./assets/MarsLogo.png",
      "48": "./assets/MarsLogo.png",
      "128": "./assets/MarsLogo.png"
    }
  });
  return;
}


chrome.runtime.onMessage.addListener(function (request) {
  setDefaultIcon();
  if (request.tab) {
    if (request.tab.url && request.tab.url.includes("mymarket.ge")) {
      if (request.message === "reload") {
        chrome.scripting.executeScript({
          target: { tabId: request.tab.id },
          func: reloadPage,
        });
      }
    }
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === 'updateIcon') {
      updateExtensionIcon();
    }
    if (request.message === "filter") {
      if (changeInfo.status === 'complete' && /mymarket/.test(tab.url)) {
        setDefaultIcon();
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["./contentscript.js"]
        })
          .then(() => {
            console.log("INJECTED THE CONTENT SCRIPT.");
          })
          .catch(err => console.log(err));
      }
    }
    else if (request.message === "monitoring") {
      if (changeInfo.status === 'complete' && /mymarket/.test(tab.url)) {
        setDefaultIcon();
        chrome.scripting.executeScript({
          target: { tabId: tabId },
          files: ["./foreground.js"]
        })
          .then(() => {
            console.log("INJECTED THE FOREGROUND SCRIPT.");
          })
          .catch(err => console.log(err));
      }
    }
  });
});

