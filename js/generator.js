// Dics
const en = 'https://api.rcrd.me/mpg/en';
const br = 'https://api.rcrd.me/mpg/br';


let selectedDic = 'en';
let lastSelectedDic;
let selectedSeparator;
let numberOfComponents;

let generatedPass;
let lastFiveGeneratedPasses = [];
const clicableArea = document.querySelector('form');
const generateButton = document.querySelector('#generateButton');
const lastFiveTableDesktop = document.querySelector('#tableDesktop tbody');
const lastFiveTableMobile = document.querySelector('#tableMobile tbody');
const switchDic = document.querySelector('#dictionaryFrame');

let validLengthWords;
let choosenWord;


updatePreferences();
initializeDic();

switchDic.addEventListener('click', function (event) {
  event.preventDefault();
  changeDic();
})

generateButton.addEventListener('click', function (event) {
  event.preventDefault();
  generatePass();
})

function changeDic() {
  if (selectedDic === 'en') { selectedDic = 'br'; }
  else { selectedDic = 'en'; }
}

function showGenerated() {
  document.querySelector('#generatedPassword').textContent = generatedPass;
  manageLastFive();
}

function manageLastFive() {
  lastFiveGeneratedPasses.unshift(generatedPass);
  if (lastFiveGeneratedPasses.length > 5) {
    lastFiveGeneratedPasses.length = 5;
  }

  lastFiveTableDesktop.innerHTML = '';
  lastFiveTableMobile.innerHTML = '';

  for (pass of lastFiveGeneratedPasses) {
    let mobileRow = lastFiveTableDesktop.insertRow();
    let desktopRow = lastFiveTableMobile.insertRow();

    let desktopCell = desktopRow.insertCell();
    let mobileCell = mobileRow.insertCell();

    let deskContent = document.createTextNode(pass);
    desktopCell.appendChild(deskContent);

    let mobileContent = document.createTextNode(pass);
    mobileCell.appendChild(mobileContent);
  }
}


function getDictionary(url) {
  lastSelectedDic = url;
  return fetch(eval(url));
}

function initializeDic() {
  let words = getDictionary(selectedDic);
  let firstRun = true;

  words.then(
    response => response.json()).then(
      arrayOfWords => {
        const words = arrayOfWords;

        validLengthWords = words.filter((word) => {
          if (word.length >= 3 && word.length <= 8 && !word.contai) { return true; } else { return false; }
        });

        validLengthWords = validLengthWords.map((word) => { return word.replace(/[1-9]/g, ''); })
        validLengthWords = validLengthWords.map((word) => { return word.replace(/[1-9]/g, ''); })

        if (firstRun) {
          firstRun = false;
          generatePass();
        }
      })
}

function generatePass() {
  updatePreferences();
  generatedPass = '';
  numberOfComponents = +numberOfComponents;

  for (var i = 0; i < numberOfComponents; i++) {
    if (i != numberOfComponents - 1) {
      generatedPass += randomWord() + selectedSeparator;
    } else { generatedPass += randomInt(); }
  }
  showGenerated();
}

function updatePreferences() {
  if (selectedDic !== lastSelectedDic) { initializeDic(); }

  selectedSeparator = document.querySelector('#selectedSeparator').value;
  numberOfComponents = document.querySelector('#numberOfComponents').value;
}

function randomWord() { return validLengthWords[Math.floor(Math.random() * validLengthWords.length)]; }
function randomInt() { return Math.floor(Math.random() * 1000) + 1; }