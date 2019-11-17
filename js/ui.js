const flag_us_path = 'assets/img/flag/us.png';
const flag_br_path = 'assets/img/flag/br.png';

let lastSetFlag = 'us';
let lastPassGeneratedValue;

const switchElement = document.querySelector('#dictionaryFrame');
const flagElement = document.querySelector('#dictionaryLanguage');
const lastPassDiv = document.querySelector('#generatedPassword');

switchElement.addEventListener('click', function (event) {
  setFlag();
})

lastPassDiv.addEventListener('click', function (event) {
  copyLastPass(event);
})


function setFlag() {
  if (lastSetFlag === 'us') {
    lastSetFlag = 'br';
    flagElement.src = flag_br_path;
    switchElement.style.justifyContent = "flex-end";
  } else {
    lastSetFlag = 'us';
    flagElement.src = flag_us_path;
    switchElement.style.justifyContent = "flex-start";
  }
}

function copyLastPass(event) {
  lastPassGeneratedValue = event.target.textContent;
  
  const el = document.createElement('textarea');
  el.value = lastPassGeneratedValue;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}