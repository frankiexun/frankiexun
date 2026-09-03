let frame, xpos, ypos, xpos2, ypos2, xpos3, ypos3,sat, xpos4,ypos4, osNum;
let radius1, radius2, radius3, radius4, smallRad
let circlex, circley;
let color1, color2,color3;
let sin1, sin2 , sin3;

function setup() {
  createCanvas(windowWidth/2, windowWidth/2);
  colorMode (HSB)

  frame = 0;
  xpos = 0;
  ypos = 0;
  xpos2 = 0;
  ypos2 = 0;
  xpos3 = 0;
  ypos3 = 0;
  xpos4 = 0;
  ypos4 = 0;
  sat = 0
  circlex = 0
  circley = 0
  osNum = 0 
  
  radius1 = 180
  radius2 = 130
  radius3 = 80
  radius4 = 60
  smallRad = 60
    
    
}

function draw() {
  color1= color(40,100, 80)
  color2= color(230,100,100)
  color3= color(0)
  
  background(color3)
  
  translate(width/2,height/2)
  frame = frame + 0.3
  

  sin1 = 150*sin(frame/10) 
  sin2 = 100*sin(frame/15 - 500)
  sin3 = 100*sin(frame/5)
  
  
  xpos = map(sin(frame/5-5000),-1,1,-100,100)
  ypos = map(sin(frame/45-5000),-1,1,-100,100) + sin3
  xpos2 = 100*sin(frame/4-400)
  ypos2 = 100*sin(frame/20-400) + sin3
  xpos3 = 100*sin(frame/4)
  ypos3 = 100*sin(frame/40) + sin3
  xpos4 = 100*sin(frame/4.8-1000)
  ypos4 = 100*sin(frame/40-1000)
  
  
  osNum = sin(frame/2)
  sat = map(osNum, -1, 1, 0, 100)
  
  //circle1 
  stroke(color3);
  strokeWeight(20)
  fill(color2)
  circle(xpos,ypos,radius1*2);
  
  push();
  translate(xpos, ypos)
  circlex = cos(frame/13)*(radius1+smallRad)
  circley = sin(frame/13)*(radius1+smallRad)
  circle(circlex, circley, smallRad*2)
  pop();
  
  //circle2
  stroke(color3);
  strokeWeight(20)
  fill(color2)
  circle(xpos2,ypos2,radius2*2);
  
  push();
  translate(xpos2, ypos2)
  circlex = cos(-frame/10)*(radius2+smallRad)
  circley = sin(-frame/10)*(radius2+smallRad)
  circle(circlex, circley, smallRad*2)
  pop();
  
  //circle3
  stroke(color3);
  strokeWeight(20)
  fill(color2)
  circle(xpos3,ypos3,radius3*2);
  
  push();
  translate(xpos3, ypos3)
  circlex = cos(frame/7)*(radius3+smallRad/2)
  circley = sin(frame/7)*(radius3+smallRad/2)
  circle(circlex, circley, smallRad)
  pop();
  
  
  push();
  translate(xpos3, ypos3)
  circlex = cos(-frame/3)*(radius3+smallRad/1.2)
  circley = sin(-frame/3)*(radius3+smallRad/1.2)
  circle(circlex, circley, smallRad*2/1.2)
  pop();
  
  
  //circle4
  stroke(color3);
  strokeWeight(20)
  fill(color2)
  circle(xpos4,ypos4,radius4*2);
  
  push();
  translate(xpos4, ypos4)
  circlex = cos(-frame/4)*(radius4+smallRad/2)
  circley = sin(-frame/4)*(radius4+smallRad/2)
  circle(circlex, circley, smallRad)
  pop();



  

  

  
                       

  
  
}

  // function trigCircle(x,y,rad);
  // sin1 = 150*sin(frame/10)
  