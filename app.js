navigator.getUserMedia = 
                         navigator.getUserMedia || 
                         navigator.webkitGetUserMedia ||
                         navigator.mozGetUserMedia ||
                         navigator.msGetUserMedia;

// Select everything in html
const video = document.querySelector('#video')
const audio = document.querySelector('#audio')
const canvas = document.querySelector('#canvas')
const context = canvas.getContext('2d')
let model;

const defaultParams = {
    flipHorizontal: true,
    imageScaleFactor: 0.7,
    maxNumBoxes: 20,
    iouThreshold: 0.2,
    scoreThreshold: 0.4,
};
var start=1;
var start_int;
handTrack.startVideo(video).then(status =>{
    if(status){
        console.log("In ",start)
        navigator.getUserMedia({video:{}} , stream =>{
            video.srcObject = stream;
            start_int=setInterval(runDetection,100)
        },
        err=>console.log(err)
        );
    }
});

function runDetection(){
    model.detect(video)
    .then(predictions=>{
        // console.log(predictions);
        predictions.forEach(object=>{
            if(object.label!="face")
            {
                audio.play();
            }
        });
        model.renderPredictions(predictions,canvas,context,video);
        // if(predictions.length>1){
        //     audio.play();
        // }
    });
}

handTrack.load(defaultParams).then(lmodel => {
    model = lmodel;
});

document.addEventListener('DOMContentLoaded',()=>{
    document.querySelector('#startstop').onclick=function(){
        start=(start+1)%2;
        if(start===1)
        {
            start_int=setInterval(runDetection,100)
            this.innerHTML="Stop"
        }
        else{
            this.innerHTML="Start"
            clearInterval(start_int)
        }
        console.log(start)
    }
})