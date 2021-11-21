const pbEntryElement = document.getElementById('pb-entry-component');
const pbEntriesElement = document.getElementById('pb-entries');
const pbNewElement = {
    inputName: document.getElementById('pb-name'),
    inputNumber: document.getElementById('pb-number'),
    addBtn: document.querySelector('#pb-new > button'),
};

function deletebutton() {
    pbEntriesElement.removeChild(this.parentNode);
}

const createEntry = () => {
    const name = pbNewElement.inputName.value;
    const number = pbNewElement.inputNumber.value;
    if (!/^\d{9}$/.test(number) || !/^[A-Z][A-Za-z\s]*$/.test(name)) {
        alert('Błędne dane!');
        return;
    }
    const newEntry = pbEntryElement.content.cloneNode(true);
    newEntry.querySelector('.pb-entry-info > h2').textContent = name;
    newEntry.querySelector('.pb-entry-info > h3').textContent = number;
    newEntry.querySelector('.pb-entry-del').addEventListener('click', deletebutton);

    // newEntry.querySelector('.pb-entry-del').addEventListener('click', (e) => {
    //     pbEntriesElement.removeChild(e.currentTarget.parentNode);
    // });

    pbEntriesElement.appendChild(newEntry);
};

pbNewElement.addBtn.addEventListener('click', createEntry);
