const yourShip = document.querySelector('.player-shooter');
const playerArea = document.querySelector('#main-play-area');

//função de movimentação e tiro da nave
function flyShip(event) {
    if(event.key === 'ArrowUp') {
        event.preventDefault();
        moveUp();
    }
    else if(event.key === 'ArrowDown') {
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
    playerArea.appendChild(laser);
    moveLaser();
}

function createLaserElement() {
    let xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
    let yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
    let imageLaser = document.createElement('images');

    imageLaser.src = 'images/shoot.png';
    imageLaser.classList.add('laser');
    imageLaser.style.left = `${xPosition}px`;
    imageLaser.style.top = `${yPosition - 10}px`;

    return imageLaser;
}

function moveLaser() {

}

window.addEventListener('keydown', flyShip);