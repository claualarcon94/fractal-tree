class Tree { //<>//
  
   //this.color = color(121, 64, 28);


  constructor(begin,end) {
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.end=end;
    this.begin=begin;
    this.color = color(121, 64, 28);
    this.wid=ancho;
    this.generation=count;
    this.finished=false;
  }
   update() {
    this.vel.add(this.acc);
    this.begin.add(this.vel);
    this.end.add(this.vel);
    this.acc.mult(0);
  }

   applyForce( force) {
    this.acc.add(force);
  }


   branchA() {

    let dir = p5.Vector.sub(this.end, this.begin);
    dir.mult(.67);
    dir.rotate(-angle2);
    var newEnd = p5.Vector.add(this.end, dir);
    var right = new Tree( this.end, newEnd);

    return right;
    
  }

   branchB() {
    let dir = p5.Vector.sub(this.end, this.begin);
    dir.mult(.67);
    dir.rotate(angle1);
    var newEnd = p5.Vector.add(this.end, dir);
    var left =new Tree( this.end, newEnd);
    return left;
  }



   display() {
    if (this.generation === 10) {
      noStroke();
      fill(242, 225, 64);
      ellipse(this.end.x, this.end.y, 8, 8);
    }

    if (this.generation<9) {
      stroke(0);
      strokeWeight(this.wid);
      line(this.begin.x, this.begin.y, this.end.x, this.end.y);
    } else {
      stroke(0, 83, 126);
      strokeWeight(this.wid);
      line(this.begin.x,this.begin.y, this.end.x, this.end.y);
    }
  }

}