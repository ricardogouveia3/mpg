let lastSetFlag = 'us';
let lastPassGeneratedValue;

const flagElement = document.querySelector('#dictionaryLanguage');
const lastPassDiv = document.querySelector('#generatedPassword');

lastPassDiv.addEventListener('click', function (event) {
  copyLastPass(event);
})

function copyLastPass(event) {
  lastPassGeneratedValue = event.target.textContent;
  
  const el = document.createElement('textarea');
  el.value = lastPassGeneratedValue;
  document.body.appendChild(el);
  el.select();
  document.execCommand('copy');
  document.body.removeChild(el);
}