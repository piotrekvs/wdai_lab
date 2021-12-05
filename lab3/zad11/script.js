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
        clearArray: 0,
    };
    const gameStatus = {
        livesAtStart: 3,
        livesCurrent: 3,
        points: 0,
    };
    const damage = 101;
    const enemyImg = new Image();
    enemyImg.src = 'images/walkingdead.png';
    let enemiesArray = [];
    let isGameOver = true;

    class Enemy {
        constructor() {
            this.x = canvas.width;
            this.y = Enemy.#getRandomY(); // this.constructor.#getRandomY()
            this.spriteWidth = Math.floor(2000 / 10);
            this.spriteHeight = 312;
            this.sizeFactor = Enemy.#getRandomSizeFactor();
            this.width = Math.floor(this.spriteWidth * this.sizeFactor);
            this.height = Math.floor(this.spriteHeight * this.sizeFactor);
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

        update(timestamp) {
            if (this.x + this.width < 0) {
                if (this.toDelete === false) {
                    gameStatus.livesCurrent--;
                }
                this.toDelete = true;
            } else {
                this.x -= 4;
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

    function showRanking() {
        document.getElementById('div-ui-ranking').classList.remove('div-ui-hide');
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
        if (timestamp - timeControl.lastSpownedTimestamp > 2000) {
            // console.log(`timestamp: ${timestamp} | last: ${timeControl.lastSpownedTimestamp}`);
            // console.log(enemiesArray);
            enemiesArray.push(new Enemy());
            timeControl.lastSpownedTimestamp = timestamp;
        }
        if (timestamp - timeControl.clearArray > 10000) {
            enemiesArray = enemiesArray.filter((enemy) => !enemy.toDelete);
            timeControl.clearArray = timestamp;
        }
    }

    function handleHitTest(e) {
        const mouse = {
            x: e.pageX - divUI.getBoundingClientRect().left,
            y: e.pageY - divUI.getBoundingClientRect().top,
        };
        let isMissed = true;
        if (!isGameOver) {
            for (let i = enemiesArray.length - 1; i >= 0; i--) {
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
        divUI.removeEventListener('click', handleHitTest);
        hideIngameUI();
        showRanking();
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
        if (!isGameOver) { requestAnimationFrame(animate); } else {
            gameEnd();
        }
    }

    function gameStart(e) {
        e.stopPropagation();
        hideMenu();
        divUI.addEventListener('click', handleHitTest);
        isGameOver = false;
        enemiesArray = [];
        gameStatus.livesAtStart = 3;
        gameStatus.livesCurrent = 3;
        gameStatus.points = 0;
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
        document.getElementById('menu-start-game')
            .addEventListener('click', gameStart);
        document.getElementById('menu-ranking').addEventListener('click', () => {
            hideMenu();
            showRanking();
        });
        document.getElementById('menu-resolution-down')
            .addEventListener('click', () => setResolution(screenRes.current - 1));
        document.getElementById('menu-resolution-up')
            .addEventListener('click', () => setResolution(screenRes.current + 1));
        document.getElementById('ranking-close').addEventListener('click', () => {
            hideRanking();
            showMenu();
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
