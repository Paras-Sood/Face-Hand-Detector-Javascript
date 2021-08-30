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
    imageScaleFactor: 0.5,
    maxNumBoxes: 20,
    iouThreshold: 0.5,
    scoreThreshold: 0.4,
};


handTrack.startVideo(video).then(status =>{
    if(status){
        navigator.getUserMedia({video:{}} , stream =>{
            video.srcObject = stream;
            setInterval(runDetection,100)
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