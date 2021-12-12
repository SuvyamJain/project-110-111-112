Webcam.set ({
    width: 350,
    height:300,
    image_format: 'png',
    png_quality: 100
});

camera = document.getElementById('camera');

Webcam.attach('#camera');

function take_snapshot(){
    Webcam.snap(function(data_uri) {

    document.getElementById('result').innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
});
} 

console.log("ml5 version-",ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/BuP3Bdvt9/',model_loaded);
function model_loaded() {
    console.log("model loaded")
};


function speak(){

    var synth = window.speechSynthesis;
    speak_data1 = "the first prediction is "+ prediction_1;
    var utterThis = new SpeechSynthesisutterence(speak_data1);
    synth.speak(utterThis);
}

function check() {
    img = document.getElementById('captured_image');
    classifier.classify(img, gotResult);
}
function gotResult(error, results) {
    if(error) {
        console.error(error);
    }
else{
    console.log(results);

    document.getElementById("result_gesture_name").innerHTML = results[0].label;

    

    prediction_1 = results[0].label;

    
    speak();
if(results[0].label == "ok")
{
    document.getElementById("update_emoji").innerHTML = "&#128077;";
}
if(results[0].label == "no")
{
    document.getElementById("update_emoji").innerHTML = "&#128078";
}
if(results[0].label == "very good")
{
    document.getElementById("update_emoji").innerHTML = "&#128076;";
}
}
}

