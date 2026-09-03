let GAcc,AirAcc;
let radiusM;

let sizeMin = 5
let sizeMax = 50
let particleNum = 2000
let mouseCtrBool = true
let pauseBool = false
let showUI = true

let accArray;
let posArray;
let vArray;
let radius;
let colorArray;

let order = 0;

//Debug
let particleCanvas;


function setup() {
  colorMode(HSB);
  frameRate(60)
  createCanvas(windowWidth, windowWidth);
  background(0);
  particleCanvas = createGraphics(windowWidth,windowHeight)
  particleCanvas.colorMode(HSB);

  //set Array number
    accArray=Array(particleNum)
    posArray=Array(particleNum)
    vArray=Array(particleNum)
    radius=Array(particleNum)
    colorArray=Array(particleNum)

  //Generate Initial Array Values
    for (i=0;i<radius.length;i++){
      radius[i] = random(sizeMin,sizeMax);
    }
    for (i=0;i<posArray.length;i++){
      posArray[i] =
        createVector(random(20,width-20),random(20,height-20));
    }
    for (i=0;i<vArray.length;i++){
      vArray[i] = createVector(0,0)
    }
    for (i=0;i<colorArray.length;i++){
      colorArray[i] = random(60,100)
    }
  

  GAcc = 0.06
  AirAcc = 0.01
  radiusM = 10


}

function draw() {
  background(0);
  particleCanvas.background(0,0);
 
  //control keys
  if (keyIsPressed == true){
    if (key === 'g'){
    GAcc +=0.01
    } else if (key === 'h'){
      GAcc -=0.01
    }
    if (key === 'a'){
      AirAcc += 0.003
    } else if (key === 's'){
      AirAcc -=0.003
    }
    if (key === 'o'){
      order += 0.01
    } else if (key === 'p'){
      order -= 0.01
    }
    if (order>1){
      order = 1
    } else if (order<0){
      order = 0
    }
  }
  
  //!!Array of Balls
  for (i=0;i<posArray.length;i++){
    
    //define Acc
    accArray[i] = createVector(posArray[i].x-mouseX, posArray[i].y-mouseY)
    accArray[i].setMag(2)
    
    //Bounce off mouse
    let d=dist(mouseX,mouseY,posArray[i].x,posArray[i].y);

    if(mouseCtrBool){
      if (d <= radius[i]+radiusM){
        vArray[i].x += accArray[i].x
        vArray[i].y += accArray[i].y
      }
    }
    
    //Bounce off walls
    if (posArray[i].x<=0+radius[i] || posArray[i].x>=width-radius[i]){
      vArray[i].x = -vArray[i].x
    }
    if (posArray[i].y<=0+radius[i] ||posArray[i].y>=height-radius[i]){
      vArray[i].y = -vArray[i].y
    }
    
    //Prevent wall clipping
    if (posArray[i].y>height-radius[i]){
      posArray[i].y = height-radius[i]
    }
    if (posArray[i].y<0+radius[i]){
      posArray[i].y = 0+radius[i]
    }
    if (posArray[i].x>width-radius[i]){
      posArray[i].x = width-radius[i]
    }
    if (posArray[i].x<0+radius[i]){
      posArray[i].x = 0+radius[i]
    }
    
    //G and Air acceleration
    vArray[i].y += GAcc*map(radius[i],sizeMin,sizeMax,1,1)
    if(vArray[i].x > 0){
    vArray[i].x -= AirAcc*map(radius[i],sizeMin,sizeMax,1.3,1)
    }
    if (vArray[i].x<0){
    vArray[i].x += AirAcc*map(radius[i],sizeMin,sizeMax,1.3,1)
    }
    
    //set limit to v
    if(mag(vArray[i].x,vArray[i].y)>10){
      vArray[i].setMag(10)
    }
    
    //pause
    if(pauseBool){
      vArray[i].setMag(0)
    }

    //v deceleration
    vArray[i].setMag(vArray[i].mag()*0.999)
    
    //add v to pos and blend order
    posArray[i].y = (posArray[i].y+vArray[i].y)*(1-order)
      +map(sin(frameCount/10),-1,1,height/2-100,height/2+100)*(order)
    posArray[i].x = (posArray[i].x+vArray[i].x)*(1-order)
      +map(cos(frameCount/10),-1,1,width/2-100,width/2+100)*(order)
    

    
    //draw circle
    particleCanvas.fill(250,colorArray[i]*map(sin(frameCount/30),-1,1,0.5,1),100);
    particleCanvas.stroke(250,0,0)
    particleCanvas.strokeWeight(1)
    particleCanvas.circle(posArray[i].x,posArray[i].y,radius[i])
  }
  
  image(particleCanvas,0,0)
  
  
  //Cursor Setup
  if(mouseX>20 && mouseX<40 && mouseY>80 && mouseY<110){
  cursor(CROSS)
  }else if (mouseX>100 && mouseX<120 && mouseY>80 && mouseY<110){
  cursor(CROSS)                   
  }else if (mouseX>width-80 && mouseX<width-20 && mouseY<30 && mouseY>10){
  cursor(CROSS)
  }else {
  noCursor();
  
  fill(30,0,100)
  noStroke();
  circle (mouseX,mouseY,radiusM*2)
  
  for(MWave = radiusM*2+10; MWave < radiusM*2+20; MWave+=10){
  noFill();
  strokeWeight(map(MWave,radiusM*2+15,radiusM*2+60,4,2));
  stroke(30,0,100,1);
  circle (mouseX,mouseY,MWave);
  }
  }

  //text instructions
    if (showUI){
      textStyle(BOLD)
      textAlign(RIGHT);
      stroke(0)
      fill(250,map(sin(frameCount/30),-1,1,50,100),100)
      textSize(15)
      text('hide UI',width-20,30)
  
      if (mouseIsPressed == true && mouseX>20 && mouseX<40 && mouseY>80 && mouseY<110){
  fill(0,0.5);
  noStroke()
  rect(10,10,275,285)
  fill(60,100,100)
  textAlign(LEFT);
  text('press "g" to add negative G Acc ⬇️',20,130)
  text('press "h" to add positive G Acc ⬆️',20,155)
  text('press "i" to invert G Acc',20,180)
  text('press "a" to increase Air Acc',20,205)
  text('press "s" to decrease Air Acc',20,230)
  text('press "o" to increase Order',20,255)
  text('press "p" to decrease Order',20,280)   
  } else {
  noStroke();
  fill(0,0.5);
  rect(10,10,190,110)
  }
  
  noStroke()
  fill(60,100,100)
  textAlign(LEFT);
  textSize(15)
  text('G Acceleraton:',20,30)
  text(nf(-GAcc,1,3),150,30)
  text('Air Friction:',20,55)
  text(nf(-AirAcc,1,3),150,55)
  text('# of Particles:',20,80)
  text(nf(particleNum,1),150,80)
  textAlign(CENTER);
  text('ORDER',width/2,30)
  text(nf(order,1,1),width/2+50,30)
  
  textAlign(LEFT);
  
  text('💁‍♂️',20,105)
  text('Info',45,105)
      if (mouseCtrBool){
        text('🐭',100,105)
      } else {
        text('🚫',100,105)
      }
    } else {
    textStyle(BOLD)
    textAlign(RIGHT);
    stroke(0)
    fill(250,map(sin(frameCount/30),-1,1,50,100),100)
    textSize(15)
    text('Show UI',width-20,30) 
  }

  //End of Draw
}

function windowResized(){
  createCanvas(windowWidth, windowHeight);
  particleCanvas = createGraphics(windowWidth,windowHeight)
  particleCanvas.colorMode(HSB);
}

function mousePressed() {
  if (mouseX>100 && mouseX<120 && mouseY > 80 && mouseY < 110) {
    mouseCtrBool = !mouseCtrBool;
  }
  if (mouseX>width-80 && mouseX<width-20 && mouseY<30 && mouseY>10){
    showUI = !showUI
  }
}

function keyPressed(){
      if(key === 'i'){
        GAcc = -GAcc
      }
  if(key === 'r'){
    pauseBool = !pauseBool
  }
}