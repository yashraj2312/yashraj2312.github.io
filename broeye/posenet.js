let video;
let poseNet;
let poses = [];
var started = false;
var k = 0;
var x = new Audio('alert.mp3');
var eye;

function setup() {
  const canvas = createCanvas(640, 480); // or use to make fullscreen canvas window.innerWidth, window.innerHeight, but you should to change the formula in changeFontSize()
  canvas.parent('videoContainer');

  video = createCapture(VIDEO);
  video.size(width, height);

  if (video == true) {console.log('true');}

  poseNet = ml5.poseNet(video, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });

  //video.hide();
  noLoop();
}

function start() {
  select('#startbutton').html('stop')
  document.getElementById('startbutton').addEventListener('click', stop);
  started = true;
  loop();
}

function stop() {
  select('#startbutton').html('start')
  document.getElementById('startbutton').addEventListener('click', start);
  removeBlur();
  started = false;
  noLoop();
}

function draw() {
  if(started){
    //image(whitePicture, 0, 0, width, height);
    image(video, 0, 0, width, height);

    drawEyes();
  }
}

function modelReady(){
}

var rightEye, leftEye, rightShoulder, leftShoulder, rightWrist, leftWrist, rightKnee,
    leftKnee, rightAnkle, leftAnkle, distanceEye, defaultRightEyePosition = [],
    defaultLeftEyePosition = [], defaultRightShoulderPosition = [], defaultLeftShoulderPosition = [];
var d = 0;
function drawEyes()  {
  for (let i = 0; i < poses.length; i++) {
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      let keypoint = pose.keypoints[j];
      rightEye = pose.keypoints[2].position;
      leftEye = pose.keypoints[1].position;
      rightShoulder = pose.keypoints[6].position;
      leftShoulder = pose.keypoints[5].position;
      rightWrist = pose.keypoints[10].position;
      leftWrist = pose.keypoints[9].position;
      rightKnee = pose.keypoints[14].position;
      leftKnee = pose.keypoints[13].position;
      rightAnkle = pose.keypoints[16].position;
      leftAnkle = pose.keypoints[15].position;


      while(defaultRightEyePosition.length < 1) {
        defaultRightEyePosition.push(rightEye.y);
      }

      while(defaultLeftEyePosition.length < 1) {
        defaultLeftEyePosition.push(leftEye.y);
      }

      while(defaultRightShoulderPosition.length < 1) {
        defaultRightShoulderPosition.push(rightShoulder.y);
      }

      while(defaultLeftShoulderPosition.length < 1) {
        defaultLeftShoulderPosition.push(leftShoulder.y);
      }

      window.eye = Math.abs(rightEye.y - defaultRightEyePosition[0]);

      window.eyeReal=rightEye.y - defaultRightEyePosition[0];
      if (eye > 15&& Math.abs(rightEye.y - defaultRightShoulderPosition[0]) > 15) {
        blurScreen();
        x.play();
        if(eye>36){
          document.getElementById('posText').innerHTML="Move back!";
        }
        else if(eye<=35 && eye>15){
          document.getElementById('posText').innerHTML="Move back a little!";
        }

      }
      console.log(eyeReal);

      if (eye < 15 && Math.abs(rightShoulder.y - defaultRightShoulderPosition[0]) < 15) {
        removeBlur();

        document.getElementById('posText').innerHTML="Good posture!";
      }



      if (keypoint.score > 0.9 ) {
        fill(255, 0, 0);
        noStroke();
        ellipse(rightEye.x, rightEye.y, 10, 10);
        ellipse(leftEye.x, leftEye.y, 10, 10);
        ellipse(rightShoulder.x, rightShoulder.y, 10, 10);
        ellipse(leftShoulder.x, leftShoulder.y, 10, 10);
      }


    }
  }

}

function blurScreen() {
  document.getElementById('container').style.filter = 'blur(10px)';
  document.getElementById('container').style.transition= '0.9s';


}



function removeBlur() {
  document.getElementById('container').style.filter = 'blur(0px)';
}



window.onload=function fillChart() {
var dps = []; // dataPoints
var chart = new CanvasJS.Chart("chartContainer", {
	title :{
		text: "Dynamic Data"
	},
	axisY: {
		includeZero: false
	},
	data: [{
		type: "line",
		dataPoints: dps
	}]
});

var xVal = 0;
var yVal = 0;
var updateInterval = 500;
var dataLength = 20; // number of dataPoints visible at any point

var updateChart = function (count) {

	count = count || 1;

	for (var j = 0; j < count; j++) {
		yVal = eye;
		dps.push({
			x: xVal,
			y: yVal
		});
		xVal++;
	}

	if (dps.length > dataLength) {
		dps.shift();
	}

	chart.render();
};

updateChart(dataLength);
setInterval(function(){updateChart()}, updateInterval);

}

// Get the modal


// When the user clicks the button, open the modal
function showMyStuff() {
  document.getElementById("myModal").style.display = "block";
}

// When the user clicks on <span> (x), close the modal
function hideMyStuff() {
  document.getElementById("myModal").style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it





function alertOff(){
  x.loop = false;
  x.pause();
  x.load();
}
