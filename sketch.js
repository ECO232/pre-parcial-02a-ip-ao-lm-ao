let line1 = [];
let line2 = [];
let numPoints = 10;
let spacing;
let timer = 60;
let timerInterval;
let isTimeUp = false;

function setup() {
  createCanvas(400, 200);
  spacing = width / (numPoints + 1);
  
  for (let i = 0; i < numPoints; i++) {
    line1.push({
      position: createVector(spacing * (i + 1), height / 3),
      color: color(255, 0, 0) // Color rojo para la línea que va hacia la derecha
    });
    
    line2.push({
      position: createVector(spacing * (i + 1), (2 * height) / 3),
      color: color(0, 0, 255) // Color azul para la línea que va hacia la izquierda
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
  for (let i = 0; i < numPoints; i++) {
    line1[i].position.x += 2; // La línea que va a la derecha se mueve más rápido
    if (line1[i].position.x > width) {
      line1[i].position.x = 0;
    }
  }

  // Mueve los puntos de la segunda línea hacia la izquierda
  for (let i = 0; i < numPoints; i++) {
    line2[i].position.x -= 1; // La línea que va hacia la izquierda se mueve más lento
    if (line2[i].position.x < 0) {
      line2[i].position.x = width;
    }
  }

  // Dibuja los puntos
  for (let i = 0; i < numPoints; i++) {
    fill(line1[i].color);
    ellipse(line1[i].position.x, line1[i].position.y, 10, 10);
    
    fill(line2[i].color);
    ellipse(line2[i].position.x, line2[i].position.y, 10, 10);
  }
}

function decrementTimer() {
  timer--;
  if (timer <= 0) {
    isTimeUp = true;
  }
}