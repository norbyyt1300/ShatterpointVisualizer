function tryToLoadSquadFromURL() {
    var preexistingSPT = window.location.search;
    if (preexistingSPT.length > 1) {
        document.getElementById("sptInputField").value = preexistingSPT.replace("?", "");
        var loadFromURL = false;
        importSquad(loadFromURL);
    }
}

function importSquad(loadFromURL) {

    var sptCodeString = document.getElementById("sptInputField").value;
    
    if (loadFromURL) {
        if (window.location.search != sptCodeString) {
            window.location.search = sptCodeString;
        }
    }

    var unitSPTArray = sptCodeString.replace("[", "").replace("]", "").replace("spt", "").split(",");
    console.log("Units:", unitSPTArray);

    unitSPTArray.forEach((unitSPTCode, idx) => {
        var unitJSON = lookUpUnitJSON(unitSPTCode);
        console.log("UnitJSON:", idx, unitJSON);
        displayUnit(idx, unitJSON);
    });
}

function lookUpUnitJSON(unitSPTCode) {
    console.log("Searching for a match for this SPT code:", unitSPTCode);
    return CHARACTERS_JSON.find((unitJSON) => {
        return (unitJSON.SPT && (Number(unitJSON.SPT) == Number(unitSPTCode)));
    });
}

function displayUnit(idx, unitJSON) {
    var unitElement = document.getElementById("unit" + (1 + idx));
    unitElement.textContent = '';

    var img = document.createElement("img");
    img.classList = "unitImg";
    img.src = "https://pointbreaksw.com/Images/" + unitJSON.CARD_BACK;
    unitElement.appendChild(img);

    var img2 = document.createElement("img");
    img2.classList = "unitStanceImg";
    img2.src = "https://pointbreaksw.com/Images/" + unitJSON.STANCE1;
    unitElement.appendChild(img2);


    if (unitJSON.STANCE2 != "") {
        var img3 = document.createElement("img");
        img3.classList = "unitStanceImg";
        img3.src = "https://pointbreaksw.com/Images/" + unitJSON.STANCE2;
        unitElement.appendChild(img3);
    }
}

