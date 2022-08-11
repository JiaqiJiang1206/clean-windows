var video;
var vScale = 1;//调整清晰度
var Gray = [];

let poseNet;
let pose;

let x;
let y;


function setup() {
  createCanvas(640, 480);
  pixelDensity(1);
  video = createCapture(VIDEO);
  video.size(width / vScale, height / vScale);
  video.hide();
  setInterval(increment, 300); // 1000 ms = every 1 seconds，每n秒执行一次function

  for(var i = 0; i < 640*480*4; i++){
    Gray[i] = 1;
  }
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
}

function gotPoses(poses){
	//console.log(poses);
	if(poses.length > 0){
	  pose = poses[0].pose;
	}
}
  
  
function modelLoaded() {
	console.log('poseNet ready');
}

function mouseClicked(){

  
}

function draw() {
  //background(51);
  // image(video, 0, 0, width, height);
  loadPixels();
  video.loadPixels();

  if(pose){

    x0 = Math.floor(pose.nose.x);
    y0 = Math.floor(pose.nose.y);//mouseY;//pose.nose.y;
    // console.log(x)
    // console.log(y)
    for(var m = y0-70; m < y0+70; m++){
      for(var n = x0-70; n< x0+70; n++){
        var index0 = (n + m*width)*4
          Gray[index0] = 1;

      }
    }
    if(pose.rightWrist.x ){
      x1 = Math.floor(pose.rightWrist.x);
      y1 = Math.floor(pose.rightWrist.y);//mouseY;//pose.nose.y;
      // console.log(x)
      // console.log(y)
      for(var m = y1-70; m < y1+70; m++){
        for(var n = x1-70; n< x1+70; n++){
          var index1 = (n + m*width)*4
            Gray[index1] = 1;

        }
      }
    }
    
    if(pose.leftWrist.x){
      x2 = Math.floor(pose.leftWrist.x);
      y2 = Math.floor(pose.leftWrist.y);//mouseY;//pose.nose.y;
      // console.log(x)
      // console.log(y)
      for(var m = y2-70; m < y2+70; m++){
        for(var n = x2-70; n< x2+70; n++){
          var index2 = (n + m*width)*4
            Gray[index2] = 1;

        }
      }
      }
    
    
  }
    

  for(var i = 0; i < height; i++){
    for(var j = 0; j< width; j++){
      var index = (j + i*width)*4
      var indexV = ((i+1)*width-j-1)*4;

      pixels[index+0] = video.pixels[indexV+0];
      pixels[index+1] = video.pixels[indexV+1];
      pixels[index+2] = video.pixels[indexV+2];

      pixels[index+3] = video.pixels[indexV+3]/Gray[indexV];//除数越大，图像越灰
 
    }
  }

  updatePixels();
  video.updatePixels();
  //image(video, mouseX, mouseY, 30, 30, mouseX, mouseY, 30, 30);


}

function increment() {
  for(var i = 0; i < 640*480*4; i++){
    Gray[i] += 0.01;
  }
}

