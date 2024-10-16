function resetSite() {
    window.location.reload();
}
resolveTrainingFile('https://raw.githubusercontent.com/Frongus/vacabTrainer/refs/heads/main/vocabularyFiles/empty.json', `startup`);

var vocabularyData;

async function resolveTrainingFile(url, origen) {
    try {
        vocabularyData = fetch(url).then(Response => Response.json());
        main();
    } catch {
        alert('Something went wrong whilest resolving the following Url: ' + url);
    }
    console.log(origen);
}

var option1 = document.getElementById('option1');
var option2 = document.getElementById('option2');
var option3 = document.getElementById('option3');

var Vocab = document.getElementById('Vocab');
var status = document.getElementById('Status');

var option1data = document.getElementById('option1Text');
var option2data = document.getElementById('option2Text');
var option3data = document.getElementById('option3Text');

var validationArray = [];
var correctIndex;
var vocubulary;
var correctTranslation;

async function main() {
    console.log(await vocabularyData);
    vocubulary = await vocabularyData;
    console.log('main script is loaded');
    makeTest();
}

function makeTest() {
    option1.checked = false;
    option2.checked = false;
    option3.checked = false;
    console.log(vocubulary.length)

    validationArray = [];

    var rdm1;
    var rdm2;
    var rdm3;

    generateRandomNumbers();

    function generateRandomNumbers() {
        rdm1 = Math.floor(Math.random() * vocubulary.length);
        rdm2 = Math.floor(Math.random() * vocubulary.length);
        rdm3 = Math.floor(Math.random() * vocubulary.length);

        if (rdm1 == rdm2 | rdm1 == rdm3 | rdm2 == rdm3) {
            generateRandomNumbers();
        } else {
            console.log('random numbers created: ' + { rdm1, rdm2, rdm3 });
        }
    }

    console.log({
        rdm1,
        rdm2,
        rdm3
    })

    var correntLocation = Math.floor(Math.random() * 3);

    correctIndex = correntLocation;
    correctTranslation = vocubulary[rdm1].GermanTranslation

    var testedData = vocubulary[rdm1];
    var wrong1 = vocubulary[rdm2].GermanTranslation;
    var wrong2 = vocubulary[rdm3].GermanTranslation;

    validationArray.push(wrong1);
    validationArray.push(wrong2);

    validationArray.splice(correntLocation, 0, testedData.GermanTranslation);

    console.log(validationArray);

    option1data.innerHTML = validationArray[0];
    option2data.innerHTML = validationArray[1];
    option3data.innerHTML = validationArray[2];

    Vocab.innerHTML = testedData.LatinWord;
}

function checkTest() {
    var local;

    if (option1.checked == true) {
        local = 0;
    } else if (option2.checked == true) {
        local = 1;
    } else if (option3.checked == true) {
        local = 2;
    } else {
        alert('Keine Antwort ausgewählt!');
    }

    console.log(correctIndex);
    console.log(local);

    if (correctIndex === local) {
        alert('Richtig geantwortet!');
        makeTest();
    } else {
        alert('Leider Falsch, die richtige antwort wäre: ' + correctTranslation);
        makeTest();
    }
}

main();

const fetchURL = 'https://raw.githubusercontent.com/Frongus/vacabTrainer/refs/heads/main/fileLinks.json';
const dataURLS = fetch(fetchURL).then(Response => Response.json());
const selectContainer = document.getElementById('fileUrl');

var urlArray = [];
var idArray = [];
var localData;

async function main2() {
    selectContainer.innerHTML = '';

    urlArray.push('no Data');
    idArray.push('no Data');

    var opt = document.createElement('option');
    opt.appendChild(document.createTextNode('Bitte eine Trainingsdatei Auswählen'));
    selectContainer.appendChild(opt);

    localData = await dataURLS;
    localData.forEach(element => {
        urlArray.push(element.url);
        idArray.push(element.id);

        var opt = document.createElement('option');
        opt.setAttribute('id', `${element.id}`);
        opt.appendChild(document.createTextNode(element.name_in_select));
        selectContainer.appendChild(opt);
        console.log(element.url);
    });
}

async function loadURL() {
    if (selectContainer.options[selectContainer.selectedIndex].index == 0) {
        alert('Bitte eine Vokabeltrainingsdatei auswählen!');
    } else {
        console.log(selectContainer.options[selectContainer.selectedIndex].index);
        const selectedIndex = selectContainer.options[selectContainer.selectedIndex].index - 1;
        vocabularyData = null;
        await resolveTrainingFile(localData[selectedIndex].url, 'New Data set');
        alert('Neues Vocabeltraining wurde geladen!');
    }
}

main2();