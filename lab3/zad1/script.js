const button = document.querySelector('button');
const nameElement = document.querySelector('span');
let personName = '';

button.addEventListener('click', () => {
    personName = prompt('Please enter your name', '');
    nameElement.textContent = personName;
});
