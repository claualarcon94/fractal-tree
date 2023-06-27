class Leaves {
  PVector pos;  
  PVector acc;
  PVector vel;
  //float x, y;
  float orientation;
  float generation;

  Leaves(PVector tpos) {
    pos = new PVector(tpos.x, tpos.y);
    vel = new PVector(0, 0);
    acc = new PVector(0, 0);
    orientation=random(0, PI/2);
    generation=count;
  }

  void update() {
    vel.add(acc);
    pos.add(vel);
    acc.mult(0);
  }

  void damp() {
    float d = random(0, 1);
    pos.y-=d;
  }

  void applyWind(PVector twind) {
    float mag = twind.mag();
    mag=mag*cos(orientation);
    twind.normalize();
    twind.mult(mag);
    applyForce(twind);
  }
  void applyForce(PVector Force) {
    acc.add(Force);
  }


  void display() {
    noStroke();
    fill(255, 100);
    ellipse(pos.x, pos.y, 2, 2);
  }
}