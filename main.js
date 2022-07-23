song1 = "";
song2 = "";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
song1Status = 0;
song2Status = 0;

function preload(){
    song1 = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}

function setup(){
    canvas = createCanvas(600, 450);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on('pose', gotPoses);
}

function modelLoaded(){
    console.log("PoseNet Is Initialized");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Score LeftWrist = " + scoreLeftWrist + "Score RightWrist = " + scoreRightWrist);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        console.log("LeftWristX = " + leftWristx + "LeftWristY = " + leftWristy);

        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("rightWristX = " + rightWristx + "rightWristY = " + rightWristy);
    }
}

function draw(){
    image(video, 0, 0, 600, 450);
    song1Status = song1.isPlaying();
    song2Status = song2.isPlaying();
    fill("red");
    stroke("red");
    if(scoreLeftWrist > 0.2){
        circle(leftWristx, leftWristy, 20);
        song1.stop();
        if(song2Status == false){
            song2.play();
            document.getElementById("song").innerHTML = "Playing - Peter Pan Song"
        }
    }
    if(scoreRightWrist > 0.2){
        circle(rightWristx, rightWristy, 20);
        song2.stop();
        if(song1Status == false){
            song1.play();
            document.getElementById("song").innerHTML = "Playing - Harry Potter Theme Song"
        }
    }
}