window.addEventListener('load', () => {
    /** @type {HTMLCanvasElement} */
    const canvasBkgr = document.getElementById('canvas-background');
    /** @type {HTMLCanvasElement} */
    const canvas = document.getElementById('canvas-main');
    const ctx = canvas.getContext('2d');
    const divUI = document.getElementById('div-ui');
    const screenRes = {
        res: [{
            w: 960, h: 540, scale: 0.5, class: 'game-resolution-qhd',
        },
        {
            w: 1280, h: 720, scale: 0.7, class: 'game-resolution-hd',
        },
        {
            w: 1600, h: 900, scale: 0.9, class: 'game-resolution-hdp',
        }],
        current: 0,
    };
    const timeControl = {
        frameLastTimestamp: 0,
        lastSpownedTimestamp: 0,
        nextSpownIn: 0,
        clearArray: 0,
    };
    const gameStatus = {
        livesAtStart: 3,
        livesCurrent: 3,
        points: 0,
        playerName: '',
    };
    const damage = 101;
    const enemyImg = new Image();
    enemyImg.src = 'images/walkingdead.png';
    let enemiesArray = [];
    let isGameOver = true;

    function updateLivesString() {
        let lives = '';
        for (let i = 0; i < gameStatus.livesAtStart; i++) {
            i < gameStatus.livesCurrent ? lives += '\u2764\uFE0F' : lives += '\uD83D\uDDA4';
        }
        document.getElementById('ingame-lives').innerText = lives;
    }

    class Enemy {
        constructor() {
            this.x = canvas.width;
            this.y = Enemy.#getRandomY(); // this.constructor.#getRandomY()
            this.spriteWidth = Math.floor(2000 / 10);
            this.spriteHeight = 312;
            this.sizeFactor = Enemy.#getRandomSizeFactor();
            this.width = Math.floor(this.spriteWidth * this.sizeFactor);
            this.height = Math.floor(this.spriteHeight * this.sizeFactor);
            this.speed = Enemy.#getRandomSpeed();
            this.frame = 0;
            this.frameLength = 60; // ms, = (1000 / 60) * (4fps)
            this.frameLastTimestamp = 0;
            this.health = 100;
            this.toDelete = false;
        }

        static #getRandomY() {
            return Math.floor(
                (screenRes.res[screenRes.current].h / 2)
                + ((Math.random() - 0.7) * (screenRes.res[screenRes.current].h / 4)),
            );
        }

        static #getRandomSizeFactor() {
            return screenRes.res[screenRes.current].scale * (0.5 + Math.random());
        }

        static #getRandomSpeed() {
            return Math.floor(
                (Math.random() * 5 + 1) * screenRes.res[screenRes.current].scale * 2,
            );
        }

        update(timestamp) {
            if (this.x + this.width < 0) {
                if (this.toDelete === false) {
                    gameStatus.livesCurrent--;
                    updateLivesString();
                }
                this.toDelete = true;
            } else {
                this.x -= this.speed;
                if (timestamp - this.frameLastTimestamp > this.frameLength) {
                    this.frameLastTimestamp = timestamp;
                    this.frame >= (10 - 1) ? this.frame = 0 : this.frame++;
                }
            }
        }

        draw() {
            if (!this.toDelete) {
                // ctx.strokeRect(this.x, this.y, this.width, this.height);
                ctx.drawImage(
                    enemyImg,
                    this.frame * this.spriteWidth,
                    0,
                    this.spriteWidth,
                    this.spriteHeight,
                    this.x,
                    this.y,
                    this.width,
                    this.height,
                );
            }
        }

        hitTest(clickX, clickY) {
            if (this.x < clickX && clickX < this.x + this.width
                && this.y < clickY && clickY < this.y + this.height && !this.toDelete) {
                this.health -= damage;
                if (this.health < 0) {
                    this.toDelete = true;
                    gameStatus.points += 12;
                }
                return true;
            }
            return false;
        }
    }

    function showMenu() {
        document.getElementById('div-ui-menu').classList.remove('div-ui-hide');
    }

    function hideMenu() {
        document.getElementById('div-ui-menu').classList.add('div-ui-hide');
    }

    async function showRanking(arg) {
        document.getElementById('div-ui-ranking').classList.remove('div-ui-hide');
        const bestScores = [];
        // https://jsonblob.com/917356058243252224
        const url = 'https://jsonblob.com/api/jsonBlob/917356058243252224';
        await fetch(url, { method: 'GET' }).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(new Error(`Http error: ${res.status}`));
        }).then((res) => {
            res.sort((a, b) => (b.score - a.score)).slice(0, 7)
                .forEach((val) => bestScores.push(val));
        }).catch((error) => {
            // eslint-disable-next-line no-console
            console.error(error);
        });
        if (arg === 'game') {
            const lastGame = {
                player: gameStatus.playerName,
                score: gameStatus.points,
                date: Date.now(),
            };
            bestScores.push(lastGame);
            await fetch(url, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bestScores),
            }).catch((error) => {
                // eslint-disable-next-line no-console
                console.log(error);
            });
        }
        let scoreTable = '';
        bestScores.sort((a, b) => (b.score - a.score)).forEach((val) => {
            scoreTable += `<li>${val.player} | Score: ${val.score} | `
            + `Date: ${new Date(val.date).toDateString()}</li>`;
        });
        document.getElementById('ranking-list').innerHTML = scoreTable;

        // eslint-disable-next-line no-console
        console.log(bestScores);
    }

    function hideRanking() {
        document.getElementById('div-ui-ranking').classList.add('div-ui-hide');
    }

    function showIngameUI() {
        document.getElementById('div-ui-ingame').classList.remove('div-ui-hide');
        divUI.classList.remove('div-ui-menu-layout');
        divUI.classList.add('div-ui-ingame-layout');
    }

    function hideIngameUI() {
        document.getElementById('div-ui-ingame').classList.add('div-ui-hide');
        divUI.classList.remove('div-ui-ingame-layout');
        divUI.classList.add('div-ui-menu-layout');
    }

    function handleEnemies(timestamp) {
        if (timestamp - timeControl.lastSpownedTimestamp > timeControl.nextSpownIn) {
            enemiesArray.push(new Enemy());
            timeControl.lastSpownedTimestamp = timestamp;
            timeControl.nextSpownIn = Math.floor(
                Math.random() * (3000 / (1 + gameStatus.points / 200)) + 200,
                // (1 + gameStatus.points / 200) faster when more points
            );
        }
        if (timestamp - timeControl.clearArray > 10000) {
            enemiesArray = enemiesArray.filter((enemy) => !enemy.toDelete);
            timeControl.clearArray = timestamp;
        }
    }

    function handleHitTest(e) {
        const mouse = {
            x: e.offsetX,
            y: e.offsetY,
        };
        let isMissed = true;
        if (!isGameOver) {
            for (let i = 0; i < enemiesArray.length; i++) {
                if (enemiesArray[i].hitTest(mouse.x, mouse.y)) {
                    isMissed = false;
                    break;
                }
            }
        }
        if (isMissed) {
            gameStatus.points -= 6;
        }
        document.getElementById('ingame-points').innerText = `POINTS ${gameStatus.points}`;
    }

    function gameEnd() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        isGameOver = true;
        enemiesArray = [];
        divUI.removeEventListener('mousedown', handleHitTest);
        hideIngameUI();
        showRanking('game');
    }

    function animate(timestamp) {
        handleEnemies(timestamp);
        if (gameStatus.livesCurrent <= 0) {
            isGameOver = !isGameOver;
        }
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let i = enemiesArray.length - 1; i >= 0; i--) {
            enemiesArray[i].update(timestamp);
            enemiesArray[i].draw();
        }
        if (!isGameOver) {
            requestAnimationFrame(animate);
        } else {
            gameEnd();
        }
    }

    function gameStart(e) {
        e.stopPropagation();
        hideMenu();
        divUI.addEventListener('mousedown', handleHitTest);
        isGameOver = false;
        enemiesArray = [];
        gameStatus.livesAtStart = 3;
        gameStatus.livesCurrent = 3;
        gameStatus.points = 0;
        updateLivesString();
        document.getElementById('ingame-player-name').innerText = gameStatus.playerName;
        document.getElementById('ingame-points').innerText = `POINTS ${gameStatus.points}`;
        showIngameUI();
        animate(0);
    }

    function setResolution(changeIdx) {
        if (changeIdx < 0 || changeIdx > 2) {
            return;
        }
        canvasBkgr.classList.remove(screenRes.res[screenRes.current].class);
        canvas.classList.remove(screenRes.res[screenRes.current].class);
        divUI.classList.remove(screenRes.res[screenRes.current].class);
        screenRes.current = changeIdx;
        canvasBkgr.classList.add(screenRes.res[screenRes.current].class);
        canvas.classList.add(screenRes.res[screenRes.current].class);
        divUI.classList.add(screenRes.res[screenRes.current].class);
        document.getElementById('menu-resolution-show')
            .textContent = `${screenRes.res[screenRes.current].h}p`;
        canvas.width = screenRes.res[screenRes.current].w;
        canvas.height = screenRes.res[screenRes.current].h;
    }

    function gameUiInit() {
        document.getElementById('menu-start-game').addEventListener('click', (e) => {
            gameStatus.playerName = document.getElementById('menu-player-name').value;
            if (gameStatus.playerName.length > 0) {
                gameStart(e);
            } else {
                window.alert('Enter player name!');
            }
        });
        document.getElementById('menu-ranking').addEventListener('click', () => {
            hideMenu();
            showRanking('');
        });
        document.getElementById('menu-resolution-down')
            .addEventListener('click', () => setResolution(screenRes.current - 1));
        document.getElementById('menu-resolution-up')
            .addEventListener('click', () => setResolution(screenRes.current + 1));
        document.getElementById('ranking-close').addEventListener('click', () => {
            hideRanking();
            showMenu();
        });
        document.getElementById('ingame-menu').addEventListener('click', () => {
            isGameOver = true;
        });
    }

    function main() {
        setResolution(0);
        gameUiInit();
        showMenu();
        hideRanking();
        hideIngameUI();
    }

    main();
});
