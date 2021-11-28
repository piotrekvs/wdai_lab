const cardImg = document.getElementById('card-img');
const cardName = document.getElementById('card-name');
const cardPosition = document.getElementById('card-position');
const cardDesc = document.getElementById('card-desc');
const cardLeftBtn = document.getElementById('card-left-btn');
const cardRightBtn = document.getElementById('card-right-btn');
const cardRandomBtn = document.getElementById('card-random-btn');
let currentEmployee = 0;

const employees = [
    {
        img: 'images/img0.jpg',
        name: 'Jan Kowalski',
        position: 'CEO',
        desc: '0. Lorem ipsum dolor sit amet, consectetur adipiscing elit, '
            + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
            + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris '
            + 'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in '
            + 'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
        img: 'images/img1.jpg',
        name: 'Julia Kowalska',
        position: 'Intern',
        desc: '1. Lorem ipsum dolor sit amet, consectetur adipiscing elit, '
            // + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
            + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris '
            + 'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in '
            + 'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
        img: 'images/img2.jpg',
        name: 'Jakub Nowak',
        position: 'Business Manager',
        desc: '2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, '
            + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
            // + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris '
            + 'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in '
            + 'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
    {
        img: 'images/img3.png',
        name: 'Katarzyna Nowak',
        position: 'HR Manager',
        desc: '3. Lorem ipsum dolor sit amet, consectetur adipiscing elit, '
            + 'sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. '
            + 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris '
            // + 'nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in '
            + 'reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    },
];

const mod = (n, m) => ((n % m) + m) % m;
const getRandIntDiff = (min, max, diff) => { // return int [min, max)
    let rand = Math.floor(Math.random() * (max - min) + min);
    while (rand === diff) {
        rand = Math.floor(Math.random() * (max - min) + min);
    }
    return rand;
};

const handleCardChange = (dir) => {
    switch (dir) {
    case 'left': currentEmployee = mod(currentEmployee - 1, employees.length); break;
    case 'right': currentEmployee = mod(currentEmployee + 1, employees.length); break;
    case 'rand': currentEmployee = getRandIntDiff(0, employees.length, currentEmployee); break;
    default: break;
    }
    cardImg.src = employees[currentEmployee].img;
    cardName.textContent = employees[currentEmployee].name;
    cardPosition.textContent = employees[currentEmployee].position;
    cardDesc.textContent = employees[currentEmployee].desc;
};

handleCardChange('');
cardLeftBtn.addEventListener('click', () => handleCardChange('left'));
cardRightBtn.addEventListener('click', () => handleCardChange('right'));
cardRandomBtn.addEventListener('click', () => handleCardChange('rand'));
