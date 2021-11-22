const form = document.getElementById('form-edit-list');
const list = document.getElementById('list');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!e.currentTarget['text-input'].value) { return; }
    const newElement = document.createElement('li');
    newElement.textContent = e.currentTarget['text-input'].value;
    e.currentTarget['text-input'].value = '';
    list.appendChild(newElement);
});

form.del.addEventListener('click', () => {
    if (list.hasChildNodes()) {
        list.removeChild(list.firstChild);
    }
});
