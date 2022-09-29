song1 = "";
song1_status = "";
song2 = "";
song2_status = "";
scoreRightWrist = 0;
scoreLeftWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristY = 0;
rightWristX = 0;

function preload(){
song1 = loadSound("music.mp3");
song2 = loadSound("toxic.mp3");
}


function setup(){

canvas = createCanvas(500,500);
canvas.center();


video = createCapture(VIDEO);
video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
    
    
}

function draw(){
image(video,0,0,500,500);
song1_status = song1.isPlaying();
song2_status = song2.isPlaying();
fill("#FF0000");
stroke("#FF0000");
if(scoreRightWrist>0.2){


circle(rightWristX,leftWristY,20);
song2.stop();

if(song1_status==false){
document.getElementById("song").innerHTML = "playing_____your";
song1.play();
}
if(scoreLeftWrist>0.2){
circle(lefWristX,leftWristY,20);
song1.stop();
if(song2_status==false){
    document.getElementById("song").innerHTML = "playing_____mom";
    song2.play();
}
}
}

function play()
{
song.play();
song.setVolume(1);
song.setRate(1);


}

function modelLoaded(){
console.log("posenet is loaded__--")
}

function gotPoses(results){
    if(results.length>0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("scoreRightWrist = "+ scoreRightWrist);
        console.log("scoreLeftWrist = "+ scoreLeftWrist);
        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;

    }
}


}