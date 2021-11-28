const points = {
    pointA: document.getElementById('point-a'),
    pointB: document.getElementById('point-b'),
    pointC: document.getElementById('point-c'),
    pointD: document.getElementById('point-d'),
    pointE: document.getElementById('point-e'),
    pointF: document.getElementById('point-f'),
};
const cities = [];

const setDataPointA = () => {
    points.pointA.querySelector('p').innerHTML = cities
        .filter((val) => val.province === 'małopolskie').map((val) => val.name).join(', ');
};
const setDataPointB = () => {
    points.pointB.querySelector('p').innerHTML = cities
        .filter((val) => /.*a.*a.*/.test(val.name)).map((val) => val.name).join(', ');
};
const setDataPointC = () => {
    points.pointC.querySelector('p').innerHTML = cities
        .sort((a, b) => (b.dentensity - a.dentensity))[4].name;
};
const setDataPointD = () => {
    points.pointD.querySelector('p').innerHTML = cities
        .map((val) => (val.people > 100000 ? `${val.name}-CITY` : val.name)).join(', ');
};
const setDataPointE = () => {
    let more = 0;
    let less = 0;
    cities.forEach((val) => {
        if (val.people > 80000) more += 1; else less += 1;
    });
    let text;
    if (more > less) {
        text = 'Miast powyżej 80 000 tys jest więcej.';
    } else if (more === less) {
        text = 'Miast jest po tyle samo';
    } else {
        text = 'Miast poniżej 80 000 tys jest więcej.';
    }
    points.pointE.querySelector('p').innerHTML = `${text}<br>
    Liczba miast powyżej 80 000 tys: ${more}<br>Liczba miast poniżej 80 000 tys: ${less}`;
};
const setDataPointF = () => {
    const areaList = cities.filter((val) => /^[Pp].*/.test(val.township)).map((val) => val.area);
    const areaListAvg = (areaList.reduce((a, b) => a + b) / areaList.length).toFixed(2);
    points.pointF.querySelector('p').innerHTML = `${areaListAvg} km2`;
};

const activateButtons = () => {
    Object.keys(points).forEach((point) => {
        points[point].querySelector('button').addEventListener('click', () => {
            points[point].querySelector('p').classList.toggle('p-hidden');
        });
    });
};

const fetchData = (url) => (fetch(url)
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
        return Promise.reject(new Error(`Http error: ${res.status}`));
    })
    .then((res) => {
        cities.push(...res.cities);
    })
    .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
    })
);

const getData = async () => {
    activateButtons();
    await fetchData('http://localhost:8080/cities');
    setDataPointA();
    setDataPointB();
    setDataPointC();
    setDataPointD();
    setDataPointE();
    setDataPointF();
};

getData();
