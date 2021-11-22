const button = document.querySelector('button');
const img = document.querySelector('img');
const imgAttributes = {
    0: {
        src: 'resources/mountains.jpg',
        border: 'red',
    },
    1: {
        src: 'resources/ocean.jpg',
        border: 'blue',
    },
};
let isOcean = 0;
img.src = imgAttributes[isOcean].src;
img.style.borderColor = imgAttributes[isOcean].border;

button.addEventListener('click', () => {
    isOcean = (isOcean + 1) % 2;
    img.src = imgAttributes[isOcean].src;
    img.style.borderColor = imgAttributes[isOcean].border;
});
