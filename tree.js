this.Tree = ()=> {
  this.begin;
  this.end;
  this.acc;
  this.vel=new PVector(0, 0);;
  this.wid;
  this.finished=false;
  this.color;
  this.dir=new PVector(200, 0);
  this.generation;


  Tree(tbegin, tend) {
    vel = new PVector(0, 0);
    acc = new PVector(0, 0);
    end=tend;
    begin=tbegin;
    this.color = color(121,64,28);
    wid=ancho;
    generation=count;
  }
  void update() {
    vel.add(acc);
    begin.add(vel);
    end.add(vel);
    acc.mult(0);
  }

  void applyForce(PVector Force) {
    acc.add(Force);
  }


  Tree branchA() {

    dir = PVector.sub(end, begin);
    dir.mult(.67);
    dir.rotate(-angle2);
    PVector newEnd = PVector.add(end, dir);
    Tree right = new Tree( end, newEnd);

    return right;
  }

  Tree branchB() {
    dir = PVector.sub(end, begin);
    dir.mult(.67);
    dir.rotate(angle1);

    PVector newEnd = PVector.add(end, dir);
    Tree left = new Tree( end, newEnd);
    return left;
  }



  void display() {
    if (generation==10) {
      noStroke();
      fill(#F2E140, 100);
      ellipse(end.x, end.y, 8, 8);
    }

    if (generation<9) {
      stroke(0);
      strokeWeight(wid);
      line(begin.x, begin.y, end.x, end.y);
    } else {
      c=color(#00537E);
      stroke(c);
      strokeWeight(wid);
      line(begin.x, begin.y, end.x, end.y);
    }
  }
}