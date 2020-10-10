const yourShip = document.querySelector(".player-shooter");
const playArea = document.querySelector("#main-play-area");
const aliensImg = ['images/monster-1.png', 'images/monster-2.png', 'images/monster-3.png']

//função de movimentação e tiro da nave
function flyShip(event) {
    if(event.key === "ArrowUp") {
        event.preventDefault();
        moveUp();
    }
    else if(event.key === "ArrowDown") {
        event.preventDefault();
        moveDown();
    }
    else if(event.key === " ") {
        event.preventDefault();
        fireLaser();
    }
}

//função de movimentação para cima
function moveUp() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');

    if(topPosition === "10px") {
        return;
    }
    else {
        let position = parseInt(topPosition);
        position -= 40;
        yourShip.style.top = `${position}px`;
    }
}

//função de movimentação para baixo
function moveDown() {
    let topPosition = getComputedStyle(yourShip).getPropertyValue('top');

    if(topPosition === "530px") {
        return;
    }
    else {
        let position = parseInt(topPosition);
        position += 40;
        yourShip.style.top = `${position}px`;
    }
}

//função de tiro
function fireLaser() {
    let laser = createLaserElement();
    playArea.appendChild(laser);
    moveLaser(laser);
}

function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let imageLaser = document.createElement("img");

    imageLaser.src = "./images/shoot.png";
    imageLaser.classList.add('laser');
    imageLaser.style.left = `${xPosition}px`;
    imageLaser.style.top = `${yPosition - 10}px`;

    return imageLaser;
}

function moveLaser(laser) {
    let laserInterval = setInterval(() => {
        let xPosition = parseInt(laser.style.left);
        let aliens = document.querySelectorAll('.alien');
        //compara se cada alien foi atingido, se sim, troca a imagem para a explosão.
        aliens.forEach((alien) => {
            if(checkLaserCollision(laser, alien)) {
                alien.src = 'img/explosion.png';
                alien.classList.remove('alien');
                alien.classList.add('dead-alien');
            }
        })
        if(xPosition === 340) {
            laser.remove();
        }
        else {
            laser.style.left = `${xPosition + 8}px`;
        }

    }, 10);
}

//função para criar inimigos aleatórios
function createAliens() {
    let alien = document.createElement('img');
    let alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]; //sorteando imagens
    alien.src = alienSprite;
    alien.classList.add('alien');
    alien.classList.add('alien-transition');
    alien.style.left = '370px'; 
    alien.style.top = `${Math.floor(Math.random() * 330) * 30}px`;
    playArea.appendChild(alien);
    moveAlien(alien); 
}

//função de movimentação dos inimigos
function moveAlien(alien) {
    let moveAliensInterval = setInterval(() => {
        let xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));

        if(xPosition <= 50) {
            if(Array.from(alien.classList).includes('dead-alien')) {
                alien.remove();
            }
            else {
                //gameOver();
            }
        }
        else {
            alien.style.left = `${xPosition - 4}px`;
        }
    }, 30);
}

//função que cria a colisão com os inimigos
function checkLaserCollision(laser, alien) {
    let laserTop = parseInt(laser.style.top);
    let laserLeft = parseInt(laser.style.left);
    let laserBottom = laserTop - 20;
    
    let alienTop = parseInt(alien.style.top);
    let alienLeft = parseInt(alien.style.left);
    let alienBottom = alienTop - 30;

    if(laserLeft != 340 && laserLeft + 40 >= alienLeft) {
        if(laserTop <= alienTop && laserTop >= alienBottom) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}


window.addEventListener('keydown', flyShip);
createAliens();