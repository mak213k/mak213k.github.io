"use strict";

var yourShip = document.querySelector('.player-shooter');
var playArea = document.querySelector('#main-play-area');
var aliensImg = ['img/monster-1.png', 'img/monster-2.png', 'img/monster-3.png'];
var instructionsText = document.querySelector('.game-instructions');
var startButton = document.querySelector('.start-button');
var alienInterval; //movimento e tiro da nave

function flyShip(event) {
  if (event.key === 'ArrowUp') {
    event.preventDefault();
    moveUp();
  } else if (event.key === 'ArrowDown') {
    event.preventDefault();
    moveDown();
  } else if (event.key === " ") {
    event.preventDefault();
    fireLaser();
  }
} //função de subir


function moveUp() {
  var topPosition = getComputedStyle(yourShip).getPropertyValue('top');

  if (topPosition === "0px") {
    return;
  } else {
    var position = parseInt(topPosition);
    position -= 50;
    yourShip.style.top = "".concat(position, "px");
  }
} //função de descer


function moveDown() {
  var topPosition = getComputedStyle(yourShip).getPropertyValue('top');

  if (topPosition === "510px") {
    return;
  } else {
    var position = parseInt(topPosition);
    position += 50;
    yourShip.style.top = "".concat(position, "px");
  }
} //funcionalidade de tiro


function fireLaser() {
  var laser = createLaserElement();
  playArea.appendChild(laser);
  moveLaser(laser);
}

function createLaserElement() {
  var xPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('left'));
  var yPosition = parseInt(window.getComputedStyle(yourShip).getPropertyValue('top'));
  var newLaser = document.createElement('img');
  newLaser.src = 'img/shoot.png';
  newLaser.classList.add('laser');
  newLaser.style.left = "".concat(xPosition, "px");
  newLaser.style.top = "".concat(yPosition - 10, "px");
  return newLaser;
}

function moveLaser(laser) {
  var laserInterval = setInterval(function () {
    var xPosition = parseInt(laser.style.left);
    var aliens = document.querySelectorAll('.alien');
    aliens.forEach(function (alien) {
      //comparando se cada alien foi atingido, se sim, troca o src da imagem
      if (checkLaserCollision(laser, alien)) {
        alien.src = 'img/explosion.png';
        alien.classList.remove('alien');
        alien.classList.add('dead-alien');
      }
    });

    if (xPosition === 340) {
      laser.remove();
    } else {
      laser.style.left = "".concat(xPosition + 8, "px");
    }
  }, 10);
} //função para criar inimigos aleatórios


function createAliens() {
  var newAlien = document.createElement('img');
  var alienSprite = aliensImg[Math.floor(Math.random() * aliensImg.length)]; //sorteio de imagens

  newAlien.src = alienSprite;
  newAlien.classList.add('alien');
  newAlien.classList.add('alien-transition');
  newAlien.style.left = '370px';
  newAlien.style.top = "".concat(Math.floor(Math.random() * 330) + 30, "px");
  playArea.appendChild(newAlien);
  moveAlien(newAlien);
} //função para movimentar os inimigos


function moveAlien(alien) {
  var moveAlienInterval = setInterval(function () {
    var xPosition = parseInt(window.getComputedStyle(alien).getPropertyValue('left'));

    if (xPosition <= 50) {
      if (Array.from(alien.classList).includes('dead-alien')) {
        alien.remove();
      } else {
        gameOver();
      }
    } else {
      alien.style.left = "".concat(xPosition - 4, "px");
    }
  }, 30);
} //função para  colisão


function checkLaserCollision(laser, alien) {
  var laserTop = parseInt(laser.style.top);
  var laserLeft = parseInt(laser.style.left);
  var laserBottom = laserTop - 20;
  var alienTop = parseInt(alien.style.top);
  var alienLeft = parseInt(alien.style.left);
  var alienBottom = alienTop - 30;

  if (laserLeft != 340 && laserLeft + 40 >= alienLeft) {
    if (laserTop <= alienTop && laserTop >= alienBottom) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
} //inicio do jogo


startButton.addEventListener('click', function (event) {
  playGame();
});

function playGame() {
  startButton.style.display = 'none';
  instructionsText.style.display = 'none';
  window.addEventListener('keydown', flyShip);
  alienInterval = setInterval(function () {
    createAliens();
  }, 2000);
} //função de game over


function gameOver() {
  window.removeEventListener('keydown', flyShip);
  clearInterval(alienInterval);
  var aliens = document.querySelectorAll('.alien');
  aliens.forEach(function (alien) {
    return alien.remove();
  });
  var lasers = document.querySelectorAll('.laser');
  lasers.forEach(function (laser) {
    return laser.remove();
  });
  setTimeout(function () {
    alert('game over!');
    yourShip.style.top = "250px";
    startButton.style.display = "block";
    instructionsText.style.display = "block";
  });
}