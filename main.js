prediction1 = "";
prediction2 = "";

Webcam.set({
    width: 350,
    height: 300,
    image_format: "png",
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach("#camera");

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = "<img id='captured_img' src='"+ data_uri +"'>";  
    });
}

console.log("ml5 version: ",ml5.version);
classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/ow0tmTjOS/model.json", modelLoaded);

function modelLoaded()
{
    console.log("model is loaded");
}

function speak()
{
    synth = window.speechSynthesis;
    speakdata_1 = "The First Prediction is: " + prediction1;
    speakdata_2 = "The Second Prediction is: " + prediction2;
    var utturThis = new SpeechSynthesisUtterance(speakdata_1 + speakdata_2);
    synth.speak(utturThis);
}

function predict()
{
    img = document.getElementById("captured_img");
    classifier.classify(img, gotResult);
}

function display(result, div, num)
{
    if (result[num].label == "Up")
    {
        div.innerHTML = "👍";
    } else if (result[num].label == "Down")
    {
        div.innerHTML = "👎";
    } else if (result[num].label == "Point")
    {
        div.innerHTML = "🫵";
    } else if (result[num].label == "Amazing")
    {
        div.innerHTML = "👌";
    }         
}

function gotResult(err, result)
{
    if (err)
    {
      console.error(err);  
    }else{
        document.getElementById("emoji_result_1").innerHTML = result[0].label;
        document.getElementById("emoji_result_2").innerHTML = result[1].label;

        prediction1 =  result[0].label;
        prediction2 =  result[1].label;

        speak();

        display(result, document.getElementById("emoji_1"), 0);
        display(result, document.getElementById("emoji_2"), 1);
    }     
}