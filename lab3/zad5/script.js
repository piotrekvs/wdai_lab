const boxOne = document.getElementById('one');
const boxTwo = document.getElementById('two');
const boxThree = document.getElementById('three');
const messageElement = document.getElementById('message');
const propagationBtn = document.getElementById('propagation-btn');
const resetBtn = document.getElementById('reset-btn');
const scoreElement = document.getElementById('score');
let handleBoxTwo;
let handleBoxThree;
let propagation = true;
let messageTimeout;

const score = {
    score: 0,
    targets: { first: false, second: false },
    add(event, val) {
        if (!propagation) {
            event.stopPropagation();
        }
        this.score += val;
        scoreElement.textContent = this.score.toString();
        if (!this.targets.first && this.score > 30) {
            this.targets.first = true;
            boxTwo.removeEventListener('click', handleBoxTwo);
            boxTwo.classList.add('box-disabled');
        }
        if (!this.targets.second && this.score > 50) {
            this.targets.second = true;
            boxThree.removeEventListener('click', handleBoxThree);
            boxThree.classList.add('box-disabled');
        }
    },
};

const showMessage = (color, val) => {
    clearTimeout(messageTimeout);
    messageElement.textContent = `Nacisnąłeś kwadrat ${color} o wartości ${val}!`;
    messageTimeout = setTimeout(() => {
        messageElement.innerHTML = '&nbsp';
    }, 2000);
};

const handleBoxOne = (event) => {
    if (event.target === boxOne) {
        showMessage('niebieski', 1);
    }
    score.add(event, 1);
};
handleBoxTwo = (event) => {
    if (event.target === boxTwo) {
        showMessage('żółty', 2);
    }
    score.add(event, 2);
};
handleBoxThree = (event) => {
    if (event.target === boxThree) {
        showMessage('czerwony', 5);
    }
    score.add(event, 5);
};

const handleReset = () => {
    score.score = 0;
    score.targets.first = false;
    score.targets.second = false;
    boxOne.addEventListener('click', handleBoxOne);
    boxTwo.addEventListener('click', handleBoxTwo);
    boxThree.addEventListener('click', handleBoxThree);
    boxTwo.classList.remove('box-disabled');
    boxThree.classList.remove('box-disabled');
    scoreElement.textContent = '0';
};

propagationBtn.addEventListener('click', () => {
    propagation = !propagation;
    propagationBtn.textContent = `${propagation ? 'Stop' : 'Start'} propagation`;
});

resetBtn.addEventListener('click', handleReset);

// set listeners on page load
handleReset();
