$(document).ready(function(){
 var ratingsCounter = 1;
 var normalCounter = 0;
    $.ajax( {
        url: "http://localhost:3000/api/movieratings",
        type: "GET",
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, val) {
                var poster;
                console.log(val.title);
                // console.log(getImage("frozen"))
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    url: "http://www.omdbapi.com/?t=" + val.title,
                    success: function(data){
                        poster = data.Poster;
                    },
                    async:false,
                    error: function() {
                        return "Image not found.";
                    }
                });
                console.log(poster)
                // var poster =  getImage(val.title);
                // console.log(getImage(val.title));
                // console.log(poster);
                if(ratingsCounter===4){
                    ratingsCounter = 1;
                    $("#home").append("<div class='row'><div class='col-md-3 col-sm-6'>" +
                        "<div class='movie-item'>" +
                        "<div>" +
                        "<img width='300' height='450' src='"+poster+"'+/>"+
                        "<div class='caption'>" +
                        "<h3>Rating:"+val.rating_average+"</h3><" +
                        "/div>"+
                        "<div class='cap1'>" +
                        "<h3>"+val.title+"</h3>" +
                        "<p>Release: "+val.release+"</p>" +
                        "<p>Director: "+val.director+"</p>" +
                        "<p>Length: "+val.length+" minutes</p>" +
                        "<p>"+val.description+"</p>" +
                        "</div>" +
                        "<div class='btn-group btn-group-justified'>" +
                        "<div class='btn-group'>" +
                        "<button type='button' class='btn btn-primary'>Info</button>" +
                        "</div></div></div></div></div></div>")

                }else{
                    ratingsCounter++;
                    $("#home div.row:last").append("<div class='col-md-3 col-sm-6'>" +
                        "<div class='movie-item'>" +
                        "<div>" +
                        "<img width='300' height='450' src='"+poster+"'+/>"+
                        "<div class='caption'>" +
                        "<h3>Rating:"+val.rating_average+"</h3><" +
                        "/div>"+
                        "<div class='cap1'>" +
                        "<h3>"+val.title+"</h3>" +
                        "<p>Release: "+val.release+"</p>" +
                        "<p>Director: "+val.director+"</p>" +
                        "<p>Length: "+val.length+" minutes</p>" +
                        "<p>"+val.description+"</p>" +
                        "</div>" +
                        "<div class='btn-group btn-group-justified'>" +
                        "<div class='btn-group'>" +
                        "<button type='button' class='btn btn-primary'>Info</button>" +
                        "</div></div></div></div></div>")
                }
                $(".btn").on ('click',function () {
                    $(".cap1").css("bottom","-100%");
                    if($(this).closest(".movie-item").find(".cap1").css("bottom")!=="0px") {
                        $(this).closest(".movie-item").find(".cap1").css("bottom", "0px")
                    }
                    // else{
                    //     $(this).closest(".movie-item").find(".cap1").css("bottom", "-100%")
                    // }
                });

            })
        },
        error: function (xhr, status, error) {

        }
    })

    $.ajax( {
        url: "http://localhost:3000/api/movies",
        type: "GET",
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, val) {
                var poster;
                console.log(val.title);
                // console.log(getImage("frozen"))
                $.ajax({
                    type: "GET",
                    dataType: "json",
                    url: "http://www.omdbapi.com/?t=" + val.title,
                    success: function(data){
                        poster = data.Poster;
                    },
                    async:false,
                    error: function() {
                        return "Image not found.";
                    }
                });
                console.log(poster)
                if(normalCounter==4){
                    normalCounter=1
                    $("#menu1").append("<div class='row'><div class='col-md-3 col-sm-6'>" +
                        "<div class='movie-item'>" +
                        "<div>" +
                        "<img width='300' height='450' src='"+poster+"'/>"+
                        "<div class='cap1'>" +
                        "<h3>"+val.title+"</h3>" +
                        "<p>Release: "+val.release+"</p>" +
                        "<p>Director: "+val.director+"</p>" +
                        "<p>Length: "+val.length+" minutes</p>" +
                        "<p>"+val.description+"</p>" +
                        "</div>" +
                        "<div class='btn-group btn-group-justified'>" +
                        "<div class='btn-group'>" +
                        "<button type='button' class='btn btn-primary'>Info</button>" +
                        "</div></div>"+
                        "</div></div></div></div>")

                }else{
                    normalCounter++;
                    $("#menu1 div.row:last").append("<div class='col-md-3 col-sm-6'>" +
                        "<div class='movie-item'>" +
                        "<div>" +
                        "<img width='300' height='450' src='"+poster+"'/>"+
                        "<div class='cap1'>" +
                        "<h3>"+val.title+"</h3>" +
                        "<p>Release: "+val.release+"</p>" +
                        "<p>Director: "+val.director+"</p>" +
                        "<p>Length: "+val.length+" minutes</p>" +
                        "<p>"+val.description+"</p>" +
                        "</div>" +
                        "<div class='btn-group btn-group-justified'>" +
                        "<div class='btn-group'>" +
                        "<button type='button' class='btn btn-primary'>Info</button>" +
                        "</div></div>"+
                        "</div></div></div>")
                }
                $(".btn").on ('click',function () {
                    console.log($(this).closest(".movie-item").find(".cap1").css("bottom"));
                    $(".cap1").css("bottom","-100%");
                    if($(this).closest(".movie-item").find(".cap1").css("bottom")!=="0px") {
                        $(this).closest(".movie-item").find(".cap1").css("bottom", "0px")
                    }
                    // else{
                    //     $(this).closest(".movie-item").find(".cap1").css("bottom", "-100%")
                    // }
                });
                
            })
        },
        error: function (xhr, status, error) {

        }
    })




});



