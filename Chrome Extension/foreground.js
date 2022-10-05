(() => {
  var data = [];
  function getCurrentURL() {
    return window.location.href
  }

  const currentUrl = getCurrentURL();
  const baseUrl = "https://api2.mymarket.ge/api/ka/products";
  const sortId = "&SortID=1";
  const limit = "&Limit=26";
  const basePageNumber = "&Page=1";

  function createUrl() {
    const urlPostFix = currentUrl.split("?")[1];
    var url = baseUrl.concat("/?").concat(urlPostFix).concat(sortId);
    if (!(url.includes("Page="))) {
      url = url.concat(basePageNumber);
    }
    if (url.includes("&Limit=10")) {
      url = url.replace("&Limit=10", limit);
    }
    else {
      url = url.concat(limit);
    }
    return url;
  }

  const url = createUrl();

  function makeRequest() {
    httpRequest = new XMLHttpRequest();

    if (!httpRequest) {
      alert("Giving up :( Cannot create an XMLHTTP instance");
      return false;
    }
    httpRequest.onreadystatechange = alertContents;
    httpRequest.open("POST", url, true);
    httpRequest.responseType = 'json';
    httpRequest.send();

    setTimeout(makeRequest, 30000);
  }

  function alertContents() {
    if (httpRequest.readyState === XMLHttpRequest.DONE) {
      if (httpRequest.status === 200) {
        const newData = httpRequest.response.data.Prs;
        if (data.length === 0) {
          data = newData;
        }
        else {
          compareData(newData);
        }
      } else {
        alert("There was a problem with the request.");
      }
    }
  }

  makeRequest();

  function changeExtension() {
    chrome.runtime.sendMessage({
      action: 'updateIcon',
      value: false
    });

    return;
  }

  function compareData(newData) {
    if (data.length === newData.length) {
      for (let i = 0; i < data.length; i++) {
        if (JSON.stringify(data[i].product_id) !== JSON.stringify(newData[i].product_id)) {
          data = newData;
          changeExtension();
          break;
        }
      }
      return;
    }
    else {
      alert("Some Error Occured!");
    }
  }
})();



