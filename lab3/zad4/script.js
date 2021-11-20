const testBtn = document.getElementById('test-btn');
const testBtnCounter = document.getElementById('counter');
const enableTestButton = document.getElementById('enable-test-btn');
let isEnabled = true;
let counter = 0;

const onTestBtnClick = () => {
    counter++;
    testBtnCounter.innerHTML = counter.toString();
};

enableTestButton.addEventListener('click', () => {
    if (!isEnabled) {
        testBtn.addEventListener('click', onTestBtnClick);
    } else {
        testBtn.removeEventListener('click', onTestBtnClick);
        counter = 0;
        testBtnCounter.innerHTML = counter.toString();
    }
    isEnabled = !isEnabled;
    enableTestButton.innerHTML = isEnabled ? 'Disable Test Button' : 'Enable Test Button';
});
enableTestButton.innerHTML = isEnabled ? 'Disable Test Button' : 'Enable Test Button';
testBtn.addEventListener('click', onTestBtnClick);
testBtnCounter.innerHTML = counter.toString();
