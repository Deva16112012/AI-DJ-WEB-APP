rightwristx=0;
rightwristy=0;
leftwristx=0;
leftwristy=0;
scorerightwrist=0;
scoreleftwrist=0;
function preload(){
    x=loadSound("music.mp3");
}
function setup(){
    canvas=createCanvas(600,500);
    canvas.center();
    v=createCapture(VIDEO);
    v.hide();
    y=ml5.poseNet(v,modelloded);
    y.on('pose',gotposes);
}
function modelloded(){
    console.log("Model is loded.");
}
function gotposes(ans){
    if(ans.length>0){
        console.log(ans);
        leftwristx=ans[0].pose.leftWrist.x;
        leftwristy=ans[0].pose.leftWrist.y;
        rightwristx=ans[0].pose.rightWrist.x;
        rightwristy=ans[0].pose.rightWrist.y;
        console.log("left wrist x is ",leftwristx+"left wrist y is ",leftwristy);
        console.log("right wrist x is ",rightwristx+"right wrist y is ",rightwristy);
        scoreleftwrist=ans[0].pose.keypoints[9].score;
        scorerightwrist=ans[0].pose.keypoints[10].score;
        console.log("score of left wrist is",scoreleftwrist);
        console.log("score of right wrist is",scorerightwrist);
    }
}
function draw(){
    image(v,0,0,600,500);
    fill("purple");
    stroke("#8A2BE2");
    if(scorerightwrist>0.2){
        circle(rightwristx,rightwristy,20);
        if(rightwristy>0&&rightwristy<=100){
            x.rate(0.5);
            document.getElementById("u").innerHTML="Speed = 0.5x";
        }
        else if(rightwristy>100&&rightwristy<=200){
            x.rate(1);
            document.getElementById("u").innerHTML="Speed = 1x";
        }
        else if(rightwristy>200&&rightwristy<=300){
            x.rate(1.5);
            document.getElementById("u").innerHTML="Speed = 1.5x";
        }
        else if(rightwristy>300&&rightwristy<=400){
            x.rate(2);
            document.getElementById("u").innerHTML="Speed = 2x";
        }
        else if(rightwristy>400){
            x.rate(2.5);
            document.getElementById("u").innerHTML="Speed = 2.5x";
        }
    }
    if(scoreleftwrist>0.2){
        circle(leftwristx,leftwristy,20);
        f=Number(leftwristy);
        g=floor(f);
        h=g/500;
        document.getElementById("o").innerHTML="Volume: "+h;
        x.setVolume(h);
    }
}
function b(){
    x.play();
    x.setVolume(1);
    x.rate(1);
}