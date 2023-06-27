ArrayList<Tree> ramas;  //<>//
ArrayList<Leaves> hojas;

float len=200;
float count=1;
float angle1=PI/4;
float angle2=radians(15);
float ancho=20;


float t=0;
Tree root;



void setup() {
  background(55);
  size(700, 600);
  ramas = new ArrayList<Tree>();
  hojas = new ArrayList <Leaves>();

  root = new Tree(new PVector(width/2, height), new PVector(width/2, height-len));
  ramas.add(root);
  //hojas.add(new Leaves(new PVector(0, 0)));
  hojas.add(new Leaves(new PVector(-100, 100)));
}

void draw() {
  background(55);
  t+=0.005;
  for (Tree rama : ramas) {
    if (rama.generation>=10) {
      float noise = noise(t);
      noise = map(noise, 0, 1, -0.5, 0.5);
      PVector wind = new PVector (noise, 0);
      // rama.applyForce(wind);
      rama.update();
    }

    rama.display();
  }

  PVector gravity = new PVector(0, 0.01);


  for (Leaves hoja : hojas) {


    float noise = noise(t);
    noise = map(noise, 0, 1, -0.05, 0.05);
    PVector wind = new PVector (noise, 0);
    //PVector wind = new PVector (-0.05, 0);

    hoja.applyForce(gravity);
    hoja.applyWind(wind);
    hoja.damp();
    hoja.update();
    hoja.display();
    //}
  }


  for (int i=0; i<ramas.size(); i++) {
    if (ramas.get(i).generation==10 && frameCount%20==0) {
      Leaves hoja= new Leaves(ramas.get(i).end);
      hojas.add(hoja);
    }
  }


  for (int i=0; i<hojas.size(); i++) {
    if (hojas.get(i).pos.y>height || hojas.get(i).pos.x<0 || hojas.get(i).pos.x>width) {// || hojas.size()>1000) {
      hojas.remove(i);
    }
  }
}




void mousePressed() {
}

void keyPressed() {
  if (key=='+' && count<10) {
    count++;
    ancho*=0.67;
    for ( int i=ramas.size()-1; i>=0; i--) {  
      Tree current = ramas.get(i);
      if (!current.finished) {
        float p = random(0, 101);
        if (p<100  && current.generation>3 || current.generation<=3 ) {        
          ramas.add(current.branchA());
        }

        p = random(0, 101);
        if (p<100  && current.generation>3 || current.generation<=3 ) {   

          ramas.add(current.branchB());
        }
      }
      current.finished=true;
    }

    if (count>=8) {
      for (int i=0; i<ramas.size(); i++) {
        if (!ramas.get(i).finished) {
          PVector hojapos = ramas.get(i).end.copy();
          Leaves hoja= new Leaves(hojapos);
          hojas.add(hoja);
        }
      }
    }
  } else if (key=='f') {
    saveFrame("screenshots/arbolfractal####.png");
  }
}