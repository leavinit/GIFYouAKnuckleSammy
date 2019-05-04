var apiKey = "SgJpkOUY4f5rrojGpZOiKEf4i1clPMC7";
const IMG_LIMIT = 10;
var query;

var apiURL = "https://api.giphy.com/v1/gifs/search?" +
"api_key=SgJpkOUY4f5rrojGpZOiKEf4i1clPMC7&q="+query+
"&limit="+IMG_LIMIT+"&offset=0&rating=R&lang=en";


var topics = [
    "Inceptionism","Neural Network","Fractal","Geodesic","Deepdream","Alex Gray",
    "Visual Illusion","Computer Art"
];
console.log(topics);
function displayButtons(items){
    for (var i in items){
        var topic = items[i];
        var msg = $("<button data-item="+topic+" class=topicBtn>").text(topic);
        $("#buttonsDiv").prepend(msg);
    }

}


    displayButtons(topics);


