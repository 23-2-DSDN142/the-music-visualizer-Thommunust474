let firstrun = true;
let moonImg;  

// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  if(firstrun){
    rectMode(CENTER);
    moonImg = loadImage('Moon.png');

    firstrun = false;
  }

  colorMode = (HSB, 100);
  background(20)
  textFont('Helvetica'); // please use CSS safe fonts
  
  textSize(24);

    var bassBoost = map(bass*3, 0,100,40,300);
    var drumHeight = map(drum, 0, 100, 0 + drum/2, height);
    var drumSize = map(drum*2, 0, 10, 50, 10);
    var drumextra = map(drum, 0, 200, 0 + drumSize/2, height);
    var vocalsize = map(vocal, 0, 400, 0 + vocal, height);

      stroke(255);
      strokeWeight(4);
        line(0, height / 2, 600, height / 2); //light line}

      let colours = [
        color(230,0,0), //red
        color(240,150,0), //orange
        color(240,240,0), //yellow
        color(0,180,50), //green
        color(0,0,200), //blue
        color(180,0,255), //purple
      ]
      //refracted light
      noStroke();
      //red
      fill(230 *bassBoost, 1, 1);
      triangle(width/2, height/2, 1280, 200, 1280, 251);
      //orange
      fill(240, 150, 0);
      triangle(width/2, height/2, 1280, 250, 1280, 301);
      //yellow
      fill(240, 240, 0);
      triangle(width/2, height/2, 1280, 300, 1280, 351);
      //green
      fill(0, 180, 50);
      triangle(width/2, height/2, 1280, 350, 1280, 401);
      //blue
      fill(0, 0, 200);
      triangle(width/2, height/2, 1280, 400, 1280, 451);
      //purple
      fill(180, 0, 255);
      triangle(width/2, height/2, 1280, 450, 1280, 501);
          
  //Begin Prism Code

      // Define the vertices of the triangle
      let x1 = width / 2;
      let y1 = height / 4;
      let x2 = width / 2.666;
      let y2 = height / 1.6;
      let x3 = width / 1.6;
      let y3 = height / 1.6;

      // Calculate the center of the triangle
      let centerX = (x1 + x2 + x3) / 3;
      let centerY = (y1 + y2 + y3) / 3;

      push(); // Save the current transformation state
      translate(centerX, centerY); // Translate to the center of the triangle
      let angle = radians(frameCount * 30); // Change the angle as needed
      rotate(angle);

      // Set stroke color and weight
      stroke(255);
      strokeWeight(6); // Adjust the thickness as needed
      fill(10,10,10);

      // Draw the triangle
      triangle(x1 - centerX, y1 - centerY, x2 - centerX, y2 - centerY, x3 - centerX, y3 - centerY);
      pop(); // Restore the previous transformation state

  //End Prism Code

    noStroke();
    fill(200,180,200-drum*2);
    ellipse(width/2, 360, drumSize/1.5, drumSize/1.5); //draw drum ball (the sun)
    // triangle(300, 100, 320, 100, 310, 80);

    push();
    let angle2 = radians(-(frameCount * 2));
    
    // Calculate the center of the moon image
    let moonCenterX = 480 + moonImg.width / 2;
    let moonCenterY = 200 + moonImg.height / 2;
    
    translate(moonCenterX, moonCenterY); // Set the rotation center to the moon image center
    rotate(angle2);
    
    tint(255 - drum * 2, 255 - drum * 2);
    image(moonImg, -moonImg.width / 2, -moonImg.height / 2); // Draw the moon image with the center as the rotation point
    pop();

    // for(var i = 1; i <= 100; i++){
    //   fill(255);
    //   ellipse(50, 50+ i, vocalsize);

    // }
}