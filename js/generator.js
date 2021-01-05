// dics URLs
const dictonariesURLs = {
  en: 'https://api.rcrd.me/mpg/en',
  br: 'https://api.rcrd.me/mpg/br'
}

const dictonariesContent = {
  english: [],
  portuguese: []
}

// preferences
const preferences = {
  selectedDic: 'en',
  lastSelectedDic: 'en',
  selectedSeparator: '.',
  numberOfComponents: 3
}

// html elements
const generateButton = document.querySelector('#generateButton');
const lastFiveTableDesktop = document.querySelector('#tableDesktop tbody');
const lastFiveTableMobile = document.querySelector('#tableMobile tbody');
const dicSeletor = document.querySelector('#dictionarySelector');
const separatorSelector = document.querySelector('#selectedSeparator');
const componentsQuantity = document.querySelector('#numberOfComponents');

// variables
let lastFiveGeneratedPasses = [];
let validLengthWords;
let choosenWord;

// App startup
initializeApp();

// event listeners
generateButton.addEventListener('click', function (event) {
  event.preventDefault();
  generatePass();
})

// functions
function initializeApp() {
  updatePreferences();
  initializeDic(true);
}

function showGenerated(generatedPass) {
  document.querySelector('#generatedPassword').textContent = generatedPass;
  manageLastFive(generatedPass);
}

function manageLastFive(generatedPass) {
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

function getDictionaries() {
  dictonariesContent.english = fetch(dictonariesURLs.en).then(
    response => response.json(),
  );
  dictonariesContent.portuguese = fetch(dictonariesURLs.br).then(
    response => response.json(),
  );
}

function initializeDic(firstrun) {
  if (dictonariesContent.english.length === 0) {
    getDictionaries();
  }

  let words = null;

  switch (preferences.selectedDic) {
    case 'br':
      words = dictonariesContent.portuguese;
      break;

    case 'en':
    default:
      words = dictonariesContent.english;
      break;
  }

  words.then(
    arrayOfWords => {
      const words = arrayOfWords;

      validLengthWords = words.filter((word) => {
        if (word.length >= 3 && word.length <= 8 && !word.contai) { return true; } else { return false; }
      });

      validLengthWords = validLengthWords.map((word) => { return word.replace(/[1-9]/g, ''); });

      (firstrun) ? generatePass() : ''; // should'n be here; get this async to solve it 
    })
}

function generatePass() {
  updatePreferences();
  let generatedPass = '';

  for (var i = 0; i < preferences.numberOfComponents; i++) {
    if (i != preferences.numberOfComponents - 1) {
      generatedPass += randomWord() + preferences.selectedSeparator;
    } else { generatedPass += randomInt(); }
  }

  showGenerated(generatedPass);
}

function updatePreferences() {
  preferences.lastSelectedDic = preferences.selectedDic;
  preferences.selectedDic = dicSeletor.value;
  preferences.selectedSeparator = separatorSelector.value;
  preferences.numberOfComponents = componentsQuantity.value;

  if (preferences.lastSelectedDic !== preferences.selectedDic) { initializeDic(false) }
}

function randomWord() { return validLengthWords[Math.floor(Math.random() * validLengthWords.length)]; }
function randomInt() { return Math.floor(Math.random() * 1000) + 1; }