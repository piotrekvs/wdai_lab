const baloonContainer = document.getElementById('baloon-container');
const contextMenu = document.getElementById('ctx-menu');
const baloonEmoji = '\u{1F388}';
const explosiomEmoji = '\u{1F4A5}';
const explosionSize = 500;
const minSize = 40;
const changeSize = 1.10;
let baloonSize = 150;

baloonContainer.textContent = baloonEmoji;
baloonContainer.style.fontSize = `${baloonSize}px`;

document.addEventListener('keydown', (e) => {
    contextMenu.classList.remove('visible');
    if (e.key === 'ArrowUp') {
        baloonSize = Math.floor(baloonSize * changeSize);
        if (baloonSize < explosionSize) {
            baloonContainer.style.fontSize = `${baloonSize}px`;
        } else {
            baloonContainer.textContent = explosiomEmoji;
        }
    } else if (e.key === 'ArrowDown' && baloonSize > minSize && baloonSize <= explosionSize) {
        baloonSize = Math.max(Math.floor(baloonSize / changeSize), minSize);
        baloonContainer.style.fontSize = `${baloonSize}px`;
    }
});

// Context Menu

baloonContainer.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    if (e.ctrlKey === true && baloonContainer.textContent === baloonEmoji) {
        contextMenu.textContent = `${Math.floor(((baloonSize - minSize) / explosionSize) * 100)}%`;
        contextMenu.style.top = `${e.clientY}px`;
        contextMenu.style.left = `${e.clientX}px`;
        contextMenu.classList.add('visible');
    }
});

document.addEventListener('mousedown', () => {
    contextMenu.classList.remove('visible');
});
