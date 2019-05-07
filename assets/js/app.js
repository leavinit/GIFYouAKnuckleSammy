const API_KEY = "SgJpkOUY4f5rrojGpZOiKEf4i1clPMC7";
const IMG_LIMIT = 10;
var query;
var topics = [
    "Inceptionism","Neural Network","Fractal","Geodesic","Deepdream","Alex Gray",
    "Visual Illusion","Computer Art"
];


//utility function to auto scroll the page when new images added
// https://stackoverflow.com/a/14490167

function scroll(divOuter,targetDiv){
    var holdingDiv = $(divOuter),
        scrollTo = $(targetDiv); 
    console.log("outer " + divOuter + " target " + targetDiv);
    $('html,body').animate({scrollTop: scrollTo.offset().top+50});

    // holdingDiv.animate({
    //     scrollTop: scrollTo.offset().top - holdingDiv.offset().top + holdingDiv.scrollTop()
    // });
}

var firstRun = true;
function displayButtons(items){
    var offset = 0;
    for (var i in items){
        var topic = items[i];
        //Funtions to retrieve items from topics array and display them w/
        // click handlers attached to each button generated

        var msg = $("<button data-item="+topic+" data-offset="+offset+" class=topicBtn>").text(topic);
        
        msg.on("click",function(){
            fetchData($(this).attr("data-item"),$(this).attr("data-offset"));
            offset+=10            ;
            $(this).attr("data-offset", offset);
            if(!firstRun){
                // scroll("#container","."+$("#container").last().class());
                var x1=$("#stillDiv").children().last()
                x1.uniqueId();
                scrollTarget = $("#stillDiv").children().last();
                sTid =scrollTarget.attr("id");
                console.log(sTid);
                // $("#"+sTid).css("outline","1px solid blue");
                scroll("body","#"+sTid);
            }
            firstRun = false;
        });
        $("#buttonsDiv").prepend(msg);
    }
    var clrWrap = $("<div id='clearBtnDiv' style='self-align:right'>");
    var clr = $("<button class=clearBtn>").text("Clear Screen");
    clr.css("background-color","#4a5c7a");
    clr.css("color","white");
    clrWrap.append(clr);
    clr.on("click",function(){
        $("#stillDiv").empty();
        firstRun = true;
    });
    $("#buttonsDiv").append(clrWrap);
    // console.log($("#buttonsDiv").height());
    $("#container").css("padding-top",$("#buttonsDiv").height());
    $("#topicDiv").css("padding-top",$("#buttonsDiv").height());

}

function fetchData(searchTerm,pageOffset){
    
    var apiURL = "https://api.giphy.com/v1/gifs/search?" +
    "api_key="+API_KEY+"&q="+searchTerm+
    "&limit="+IMG_LIMIT+"&offset="+pageOffset+"&rating=R&lang=en";
    

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
    
    el.css("width","40%").css("margin-left","5%").css("margin-bottom","5%");
    //hover will hide the info and ratings divs, and show the 'play' image
    // playImg = $("<img class='img_play' src='assets/images/video-play-icon.png'>");
    // playImg.css("width","40%").css("margin-left","5%").css("margin-bottom","5%").css("display","absolute");
    // playImgWrap = $("<span class='playImg' style='position:relative;'>");
    // playImgWrap.append(playImg);
    // playImgWrap.hide();
    wrapper = $("<span class='detailsClass' style='position:relative;'>");
    
    wrapper.append(el);
    
    wrapper.append("<span class='picInfo'>"+container.title+"</span>");
    wrapper.append("<div class='ratingInfo' style='text-align:center;position:absolute;z-index:12;'>Rating: "+container.rating+"</div>");
    // wrapper.append(playImgWrap);
    
    $("#stillDiv").append(wrapper);
    

    el.on("click",function(){
        var tmp = $(this).attr("src");
        if (tmp == container.images.still){
            $(this).attr("src",container.images.gif);
        }
        else {
            $(this).attr("src",container.images.still);
        }
        
    });
    
    el.hover(function(){
        console.log('hovering');
        console.log ($(this).next());
        $(this).next().hide();
        $(this).next().next().hide();
    
        $(this).css("cursor","pointer");
        $("#clickMsg").show();
    
    },function(event){
        console.log ("Exiting");
        console.log(event.delegateTarget)
        $(this).next().show();
        $(this).next().next().show();
        $(this).parent().remove("#msg1");
        $(this).css("cursor","auto");
        $("#clickMsg").hide();
    });
    
    
    $(".picInfo").css("position","absolute").css("margin","auto")
        .css("top","50%").css("left","30%").css("z-index","10").css("width","60%")
        .css("border","2px solid white").css("text-align","center")
        .css("background-color","gray").css("opacity",".75").css("color","white");

    $(".ratingInfo").css("position","absolute").css("margin","auto")
    .css("top","-90%").css("left","30%").css("z-index","10").css("width","60%")
    .css("border","2px solid white").css("text-align","center")
    .css("background-color","gray").css("opacity",".75").css("color","white");
 
}




$(document).ready(function(){

    $("#addTopicBtn").click(function(){
        topics.push($("#newTopic").val());
        $("#buttonsDiv").empty();
        displayButtons(topics);
    });
    displayButtons(topics);

});

