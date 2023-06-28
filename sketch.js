var ramas = []; 
var hojas = [];
var len = 200;
var count = 1;
var angle1;
var angle2;
var ancho = 20;
var t = 0;
var root;

var gravity;

function setup() {
  background(55);
  if (windowWidth < 1000) {
    canvas = createCanvas(displayWidth, displayHeight);
    len = 100;
    ancho = 10;
  } else {
   canvas = createCanvas(800, 600);
  }
  canvas.parent(document.getElementById('canvas-container'));
  
  angle1 = Math.PI / 4;
  angle2 = radians(15);
  
  root = new Tree(createVector(width / 2, height), createVector(width / 2, height - len));
  
  ramas.push(root);
  
  gravity = createVector(0, 0.01);

  randomSeed(42)
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
    if (ramas[i].generation == 10 && frameCount % 60 == 0) {
      let hoja = new Leaves(ramas[i].end);
      hojas.push(hoja);
    }
  }


  for (let i = 0; i < hojas.length; i++) {
    if (hojas[i].pos.y > height || hojas[i].pos.y < 0 || hojas[i].pos.x < 0 || hojas[i].pos.x > width) {
      hojas.splice(i, 1);
    }
  }
}

function mousePressed() {
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

    if (count == 10) {
      for (let i = 0; i < ramas.length; i++) {
        if (!ramas[i].finished) {
          let hojapos = ramas[i].end.copy();
          let hoja = new Leaves(hojapos);
          hojas.push(hoja);
        }
      }
    }
  }
}