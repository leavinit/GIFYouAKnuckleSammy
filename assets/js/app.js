const API_KEY = "SgJpkOUY4f5rrojGpZOiKEf4i1clPMC7";
const IMG_LIMIT = 10;
var query;
var topics = [
    "Inceptionism","Neural Network","Fractal","Geodesic","Deepdream","Alex Gray",
    "Visual Illusion","Computer Art"
];



function displayButtons(items){
    for (var i in items){
        var topic = items[i];
        var msg = $("<button data-item="+topic+" class=topicBtn>    ").text(topic);
        $("#buttonsDiv").prepend(msg);
    }

}

//returns an array of objects that store the data we need to display at a later point
function fetchData(searchTerm){
    
    var apiURL = "https://api.giphy.com/v1/gifs/search?" +
    "api_key="+API_KEY+"&q="+searchTerm+
    "&limit="+IMG_LIMIT+"&offset=0&rating=R&lang=en";
    
    var dataObj;
    var dataContainer = [];
    $.ajax({
        url: apiURL,
        method: "GET"
    }).then(function(response) {

        response.data.forEach(function(item){
            dataObj = {
                "term"  : searchTerm,
                "images" : {
                    "still" : item.images.fixed_height_still.url,
                    "gif"   : item.images.fixed_height.webp
                },
                "rating"   : item.rating
                // "tags"      : item
            }
            dataContainer.push(dataObj);
        });

    });
    return dataContainer;    
}

//Display Functions

//Definitely want to display stills and data first then load the animated pics later (or onclick)






// displayButtons(topics);
var testRun=fetchData('deepdream');   
console.log(testRun);
