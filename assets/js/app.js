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
        var msg = $("<button data-item="+topic+" class=topicBtn>").text(topic);
        $("#buttonsDiv").prepend(msg);
    }

}

function fetchData(searchTerm){
    
    var apiURL = "https://api.giphy.com/v1/gifs/search?" +
    "api_key="+API_KEY+"&q="+searchTerm+
    "&limit="+IMG_LIMIT+"&offset=0&rating=R&lang=en";
    

    $.ajax({
        url: apiURL,
        method: "GET"
    }).then(function(response) {
        
        response.data.forEach(function(item){
             
            var dataObj = {
                "term"      : searchTerm,
                "title"     : item.title,
                "images"    : {
                        "still" : item.images.fixed_height_still.url,
                        "gif"   : item.images.fixed_height.webp
                    },
                "rating"    : item.rating
            };
            // console.log(dataObj);
            displayStills(dataObj);
        });
            
    });

    
}

//Display Functions

//Definitely want to display stills and data first then load the animated pics later (or onclick)
function displayStills(container){
    //fill in
    // console.log(container.images.still);
    var el =$("<img>");
    el.attr("src",container.images.still);
    // console.log(el.attr("src"));
    $("#stillDiv").append(el);
    
    var elgif =$("<img>");
    elgif.attr("src",container.images.gif);
    $("#gifDiv").append(elgif);

    

}



displayButtons(topics);

fetchData('deepdream');
// console.log (stillDivs)

