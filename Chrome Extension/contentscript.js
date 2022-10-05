(async () => {
    const getMinMoney = () => {
        return new Promise((resolve) => {
            chrome.storage.sync.get("minMoney", (value) => {
                resolve(value["minMoney"] ? JSON.parse(value["minMoney"]) : 0);
            });

        })
    }
    const getMaxMoney = () => {
        return new Promise((resolve) => {
            chrome.storage.sync.get("maxMoney", (value) => {
                resolve(value["maxMoney"] ? JSON.parse(value["maxMoney"]) : 0);
            });

        })
    }

    const minMoney = await getMinMoney();
    const maxMoney = await getMaxMoney();



    function clearInner(node) {
        while (node.hasChildNodes()) {
            clear(node.firstChild);
        }
    }

    function clear(node) {
        while (node.hasChildNodes()) {
            clear(node.firstChild);
        }
        node.parentNode.removeChild(node);
    }

    var wholeDiv = document.getElementsByClassName("card-col");
    for (let i = 0; i < wholeDiv.length; i++) {
        var span = wholeDiv[i].querySelector('.line-height-6');
        var priceOfItems = parseInt(0);


        try {
            priceOfItems = parseInt(span.textContent.trim());
        }
        catch (err) {
            console.log(err)
        }
        if (!(priceOfItems >= minMoney && priceOfItems <= maxMoney)) {

            clearInner(wholeDiv[i]);

            if (wholeDiv[i] && !(wholeDiv[i].hasChildNodes())) {
                wholeDiv[i].style.display = "none";
                const div = document.getElementsByClassName("seacrh-carrds-banner");
                for (let j = 0; j < div.length; j++) {
                    div[j].style.display = "none";
                }


            }
        }
    }

})();

