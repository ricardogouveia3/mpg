const en = 'data/words_dictionary_en.json';
const br = 'data/words_dictionary_br.json';

let selectedDic;
let lastSelectedDic;
let selectedSeparator;
let numberOfComponents;

let generatedPass;
let lastFiveGeneratedPasses = [];
const clicableArea = document.querySelector('form');
const generateButton = document.querySelector('button');
const lastFiveTable = document.querySelector('tbody');

let validLengthWords;
let choosenWord;


updatePreferences();
initializeDic();
generateButton.addEventListener('click', function (event) {
  event.preventDefault();
  generatePass();
})

function showGenerated() {
  document.querySelector('#generatedPassword').textContent = generatedPass;
  manageLastFive();
}

function manageLastFive() {
  console.log(lastFiveGeneratedPasses);
  lastFiveGeneratedPasses.unshift(generatedPass);
  if (lastFiveGeneratedPasses.length >= 5) {
    lastFiveGeneratedPasses.length = 5;
  }

  lastFiveTable.innerHTML = '';

  for (pass of lastFiveGeneratedPasses) {
    let row = lastFiveTable.insertRow();
    let cell = row.insertCell();
    let content = document.createTextNode(pass);
    cell.appendChild(content);
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
        const words = Object.keys(arrayOfWords);

        validLengthWords = words.filter((word) => {
          if (word.length >= 3 && word.length <= 8 && !word.contai) { return true; } else { return false; }
        });

        validLengthWords = validLengthWords.map((word) => {return word.replace(/[1-9]/g, '');})
        validLengthWords = validLengthWords.map((word) => {return word.replace(/[1-9]/g, '');})

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
    if ( i != numberOfComponents - 1) {
      generatedPass += randomWord() + selectedSeparator;
    } else { generatedPass += randomInt(); }
  }
  showGenerated();
}

function updatePreferences() {
  selectedDic = document.querySelector('input[name="language"]:checked').value;
  if ( selectedDic !== lastSelectedDic ) { initializeDic(); }

  selectedSeparator = document.querySelector('#selectedSeparator').value;
  numberOfComponents = document.querySelector('#numberOfComponents').value;
}

function randomWord() { return validLengthWords[Math.floor(Math.random() * validLengthWords.length)]; }
function randomInt() { return Math.floor(Math.random() * 1000) + 1; }