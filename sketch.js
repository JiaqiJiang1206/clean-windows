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
  setInterval(increment, 1000); // 1000 ms = every 1 seconds，每n秒执行一次function

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
    x = Math.floor(pose.nose.x);
    y = Math.floor(pose.nose.y);//mouseY;//pose.nose.y;
    // console.log(x)
    // console.log(y)
    for(var m = y-30; m < y+30; m++){
      for(var n = x-30; n< x+30; n++){
        var index0 = (n + m*width)*4
          Gray[index0] = 1;

      }
    }
    
  }
    

  for(var i = 0; i < height; i++){
    for(var j = 0; j< width; j++){
      var index = (j + i*width)*4
      pixels[index+0] = video.pixels[index+0];
      pixels[index+1] = video.pixels[index+1];
      pixels[index+2] = video.pixels[index+2];

      pixels[index+3] = video.pixels[index+3]/Gray[index];//除数越大，图像越灰
 
    }
  }

  updatePixels();
  video.updatePixels();
  //image(video, mouseX, mouseY, 30, 30, mouseX, mouseY, 30, 30);


}

function increment() {
  for(var i = 0; i < 640*480*4; i++){
    Gray[i] += 0.05;
  }
}

