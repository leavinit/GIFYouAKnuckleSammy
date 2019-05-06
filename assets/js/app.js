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
        msg.on("click",function(){
            fetchData($(this).attr("data-item"));
        });
        $("#buttonsDiv").prepend(msg);
    }
    var clrWrap = $("<div id='clearBtnDiv' style='self-align:right'>");
    var clr = $("<button class=clearBtn>").text("Clear Screen");
    clrWrap.append(clr);
    clr.on("click",function(){
        $("#stillDiv").empty();
    });
    $("#buttonsDiv").append(clrWrap);
    // console.log($("#buttonsDiv").height());
    $("#container").css("padding-top",$("#buttonsDiv").height());
    $("#topicDiv").css("padding-top",$("#buttonsDiv").height());

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

//Definitely want to display stills and data first then load the animated pics onclick
function displayStills(container){
  

    var el =$("<img>");
    el.attr("src",container.images.still);
    el.on("click",function(){
        var tmp = $(this).attr("src");
        if (tmp == container.images.still){
            $(this).attr("src",container.images.gif);
        }
        else {
            $(this).attr("src",container.images.still);
        }
        
    });
    el.css("width","40%").css("margin-left","5%").css("margin-bottom","5%");
    wrapper = $("<span style='position:relative;'>");
    wrapper.append(el);
    wrapper.append("<span class='picInfo'>"+container.title+"</span>");
    wrapper.append("<div class='ratingInfo' style='text-align:center;position:absolute;z-index:12;'>Rating: "+container.rating+"</div>");
    $("#stillDiv").append(wrapper);
    

    $(".picInfo").css("position","absolute").css("margin","auto")
        .css("top","50%").css("left","30%").css("z-index","10").css("width","60%")
        .css("border","2px solid white").css("text-align","center")
        .css("background-color","gray").css("opacity",".75").css("color","white");
    
    $(".ratingInfo").css("position","absolute").css("margin","auto")
    .css("top","-90%").css("left","30%").css("z-index","10").css("width","60%")
    .css("border","2px solid white").css("text-align","center")
    .css("background-color","gray").css("opacity",".75").css("color","white");

    // $(".ratingInfo").css("left","50%").css("top","10%");
    $("#stilDiv").css("display","flex").css("justify-content","space-around");
 
    
    

}


$(document).ready(function(){

    $("#addTopicBtn").click(function(){
        // console.log('submitting');
        topics.push($("#newTopic").val());
        $("#buttonsDiv").empty();
        displayButtons(topics);
    });
    displayButtons(topics);

});

