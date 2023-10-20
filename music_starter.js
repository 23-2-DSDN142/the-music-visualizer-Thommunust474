let firstrun = true;
let moonImg;  

// vocal, drum, bass, and other are volumes ranging from 0 to 100
function draw_one_frame(words, vocal, drum, bass, other, counter) {
  if(firstrun){
    rectMode(CENTER);
    moonImg = loadImage('Moon.png');
    starsImg = loadImage('Stars.png');
    firstrun = false;
  }

  colorMode = (HSB, 100);
  background(20)
  textFont('Helvetica'); // please use CSS safe fonts
  textSize(24);

    var bassBoost = map(bass, 0,100,40,150);
    var drumSize = map(drum*2, 0, 10, 50, 10);
    var drumextra = map(drum/60, 0, 1, 0 + drumSize/2, 1);
    var vocalsize = map(vocal, 0, 400, 0 + vocal, height);
    var othersize = map(other, 0, 200,0, 10);

  tint(-200 + vocalsize * 3, -200 + vocalsize * 3);
  image(starsImg, 0, 0, 0);

  //BEGIN LINE LAYER

      stroke(255);
      strokeWeight(1*othersize);
        line(0, height / 2, 600, height / 2); //light line

  //END LINE LAYER 

  //BEGIN PRISM LAYER
      push(); 

      // Triangle verticies
      let x1 = width / 2;
      let y1 = height / 4;
      let x2 = width / 2.666;
      let y2 = height / 1.6;
      let x3 = width / 1.6;
      let y3 = height / 1.6;

      //Center of triangle
      let centerX = (x1 + x2 + x3) / 3;
      let centerY = (y1 + y2 + y3) / 3;

      translate(centerX, centerY); //triange centre
      let angle = radians(frameCount * 30);
      rotate(angle);
      
      pop();

  //END PRISM LAYER

  //BEGIN LIGHT REFRACTION LAYER

      push();

      let rotationFraction = (angle / 60);
      
      let colors = [ // Colours
        color(230, 1*bassBoost, 1*bassBoost),    // Red
        color(240, 150, 1*bassBoost),  // Orange
        color(240, 240, 1*bassBoost),  // Yellow
        color(1*bassBoost, 180, 50),   // Green
        color(1*bassBoost, 1*bassBoost, 200),    // Blue
        color(180, 1*bassBoost, 255)   // Purple
      ];
      
      // Coolour change per rotation
      let colorChangeIndex = floor(rotationFraction * colors.length);

        // Refracted light - ChatGPT assisted
      noStroke();
      for (let i = 0; i < colors.length; i++) {
        // Colour change within loop
        let currentColorIndex = (colorChangeIndex - i + colors.length) % colors.length;
        let previousColorIndex = (currentColorIndex - 1 + colors.length) % colors.length;
      
        // 2 colours
        let lerpAmount = rotationFraction * colors.length - i;
        let lerpedColor = lerpColor(colors[currentColorIndex], colors[previousColorIndex], lerpAmount);
      
        fill(lerpedColor);
        let offset = i * 50; //adjust offset
        triangle(width/2, height/2, 1280, 200 + offset, 1280, 251 + offset);

      }
      pop();
      push();

      //triangle vertises
      let px1 = width / 2;
      let py1 = height / 4;
      let px2 = width / 2.666;
      let py2 = height / 1.6;
      let px3 = width / 1.6;
      let py3 = height / 1.6;

      //triangle center point
      let pcenterX = (px1 + px2 + px3) / 3;
      let pcenterY = (py1 + py2 + py3) / 3;

      translate(pcenterX, pcenterY); //Triangle Center
      rotate(angle);

      //Colour and weight
      stroke(255);
      strokeWeight(1 + drumextra);
      fill(10,10,10);

      //Draw the real prism
      triangle(px1 - pcenterX, py1 - pcenterY, px2 - pcenterX, py2 - pcenterY, px3 - pcenterX, py3 - pcenterY);
      pop();

    //END LIGHT REFRACTION LAYER

    //BEGIN MOON LAYER

      noStroke();
      fill(255,255,255-drum*2);
      ellipse(width/2, 360, drumSize/1.5, drumSize/1.5); //draw drum ball (the sun)
      // triangle(300, 100, 320, 100, 310, 80);

      push();
      let angle2 = radians(-(frameCount * 2));
      
      // Calculate the center of the moon image
      let moonCenterX = 480 + moonImg.width / 2;
      let moonCenterY = 200 + moonImg.height / 2;
      
      translate(moonCenterX, moonCenterY); //rotate around center
      rotate(angle2);
      
      tint(255 - drum * 2, 255 - drum * 2);
      image(moonImg, -moonImg.width / 2, -moonImg.height / 2); //moon image
      pop();

    //END MOON LAYER

    }
