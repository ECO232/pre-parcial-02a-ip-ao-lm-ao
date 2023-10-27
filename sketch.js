let randomPoints1 = [];
let randomPoints2 = [];
let numFlashPoints = 5;
let numNormalPoints = 10;
let spacing;
let timer = 60;
let timerInterval;
let isTimeUp = false;
let imgFlash;
let imgNormal;

function preload() {
  imgFlash = loadImage('ducks/patoFlash.png');
  imgNormal = loadImage('ducks/patoNormal.png');
}

function setup() {
  createCanvas(700, 600);
  spacing = width / (numNormalPoints + 1);
  
  for (let i = 0; i < numFlashPoints; i++) {
    randomPoints1.push({
      position: createVector(random(0, width), random(0, height)),
      img: imgFlash
    });
  }
    
  for (let i = 0; i < numNormalPoints; i++) {
    randomPoints2.push({
      position: createVector(random(0, width), random(0, height)),
      img: imgNormal
    });
  }
  
  timerInterval = setInterval(decrementTimer, 1000);
}

function draw() {
  background(220);
  
  if (isTimeUp) {
    noLoop();
    clearInterval(timerInterval);
    textSize(32);
    fill(0);
    text("¡Time's up!", width / 4, height / 2);
    return;
  }

  // Mueve los puntos de la primera línea hacia la derecha
  for (let i = 0; i < numFlashPoints; i++) {
    randomPoints1[i].position.x += 15; // La línea que va a la derecha se mueve más rápido
    if (randomPoints1[i].position.x > width) {
      randomPoints1[i].position.x = 0;
    }
  }

  // Mueve los puntos de la segunda línea hacia la izquierda
  for (let i = 0; i < numNormalPoints; i++) {
    randomPoints2[i].position.x -= 2; // La línea que va hacia la izquierda se mueve más lento
    if (randomPoints2[i].position.x < 0) {
      randomPoints2[i].position.x = width;
    }
  }

  // Dibuja los puntos

  for (let i = 0; i < numFlashPoints; i++) {
    image(imgFlash, randomPoints1[i].position.x, randomPoints1[i].position.y, 60, 60);
  }

  for (let i = 0; i < numNormalPoints; i++) {
    image(imgNormal, randomPoints2[i].position.x, randomPoints2[i].position.y, 60, 60);
  }
}

function decrementTimer() {
  timer--;
  if (timer <= 0) {
    isTimeUp = true;
  }
}