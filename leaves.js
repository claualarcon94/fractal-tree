class Leaves {
constructor(tpos) {
    this.pos = createVector(tpos.x, tpos.y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.orientation=random(0, PI/2);
    this.generation=count;
  }

   update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

   damp() {
    let d = random(0, 1);
    this.pos.y-=d;
  }
  
  applyForce(Force) {
    this.acc.add(Force);
  }

   applyWind( twind) {
    let mag = twind.mag();
    mag=mag*cos(this.orientation);
    twind.normalize();
    twind.mult(mag);
    this.applyForce(twind);
  }

   display() {
    noStroke();
    fill(255, 100);
    ellipse(this.pos.x, this.pos.y, 2, 2);
  }
}