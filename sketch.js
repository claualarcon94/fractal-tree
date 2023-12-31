var ramas = [];
var hojas = [];
var len;
var count = 1;
var angle1;
var angle2;
var ancho;
var t = 0;
var root;

var gravity;

function setup() {
  background(55);

  

  canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent(document.getElementById('canvas-container'));

  

  len = windowHeight*0.185;
  ancho = windowHeight*0.03;

 

  angle1 = Math.PI / 4;
  angle2 = radians(15);

  root = new Tree(createVector(width / 4 + 50, height), createVector(width / 4 + 50, height - len));

  ramas.push(root);

  gravity = createVector(0, 0.01);

  randomSeed(42)
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  background(55);

  t += 0.005;

  for (let rama of ramas) rama.display();


  for (let hoja of hojas) {
    let turbulence = noise(t);
    turbulence = map(turbulence, 0, 1, -0.05, 0.05);
    let wind = createVector(turbulence, 0);

    hoja.applyForce(gravity);
    hoja.applyWind(wind);
    hoja.damp();
    hoja.update();
    hoja.display();
  }


  for (let i = 0; i < ramas.length; i++) {
    if (ramas[i].generation == 10 ) {
      let chance = random(1000);
      if(chance<20){
      let hoja = new Leaves(ramas[i].end);
      hojas.push(hoja);
      }
    }
  }


  for (let i = 0; i < hojas.length; i++) {
    if (hojas[i].pos.y > height || hojas[i].pos.y < 0 || hojas[i].pos.x < 0 || hojas[i].pos.x > width) {
      hojas.splice(i, 1);
    }
  }
}

function touchStarted(){
  if (count < 10) {
    count++;
    ancho *= 0.67;
    for (let i = ramas.length - 1; i >= 0; i--) {
      let current = ramas[i];
      if (!current.finished) {
        let p = random(0, 101);
        if (p < 100 && current.generation > 3 || current.generation <= 3) {
          ramas.push(current.branchA());
        }

        p = random(0, 101);
        if (p < 100 && current.generation > 3 || current.generation <= 3) {

          ramas.push(current.branchB());
        }
      }
      current.finished = true;
    }

  }
}

let touchProcessed = false;
let touchDelay = 500; // Adjust the delay time as needed
let lastTouchTime = 0;

function touchStarted() {
  let currentTime = millis();
  if (!touchProcessed && (currentTime - lastTouchTime) > touchDelay) {
    touchProcessed = true;
    lastTouchTime = currentTime;

    if (count < 10) {
      count++;
      ancho *= 0.67;
      for (let i = ramas.length - 1; i >= 0; i--) {
        let current = ramas[i];
        if (!current.finished) {
          let p = random(0, 101);
          if (p < 100 && current.generation > 3 || current.generation <= 3) {
            ramas.push(current.branchA());
          }
  
          p = random(0, 101);
          if (p < 100 && current.generation > 3 || current.generation <= 3) {
  
            ramas.push(current.branchB());
          }
        }
        current.finished = true;
      }
  
    }
  }
}

function touchEnded() {
  touchProcessed = false;
}