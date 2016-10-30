$(document).ready(function(){
 var ratingsCounter = 0;
 var normalCounter = 0;
    var myMoviesCounter = 0;
    if(lscache.get("tokenData")){
        $(".nav-tabs").append("<li><a data-toggle='tab' href='#myMovies'>My movies</a></li>");
        $(".tab-content").append("<div id='myMovies' class='tab-pane fade '></div>");
        $("#myMovies").append(" <div class='row'></div>");
        $(".nav.navbar-nav").append("<li><a class='netflixText' href='community.html'>Community <span class='sr-only'></span></a></li>");
        $(".nav.navbar-nav>li#registerNav").hide();

        $.ajax( {
            url: "http://localhost:3000/api/personalratings2",
            type: "GET",
            dataType: "json",
            success: function (result) {
                $.each(result, function (key, val) {
                    var poster;
                    var rating;
                    var modal;
                    if(val.ratings!=undefined){
                        rating = val.ratings[0].rating;
                        modal = "#changeRateModal"

                    }
                    else{
                        rating = "Not rated yet"
                        modal = "#rateModal"
                    }
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
                    if(myMoviesCounter==4){
                        myMoviesCounter=1
                        $("#myMovies").append("<div class='row'><div class='col-md-3 col-sm-6'>" +
                            "<div class='movie-item' id='" + val._id+"'>"+
                            "<div>" +
                            "<img width='300' height='450' src='"+poster+"'/>"+
                            "<div class='caption'>" +
                            "<h3>Rating:"+rating+"</h3><" +
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
                            "<button type='button' class='btn btn-primary drop-down-toggle'>Info</button>" +
                            "</div></div>"+
                            "</div></div></div></div>")

                    }else{
                        myMoviesCounter++;
                        $("#myMovies div.row:last").append("<div class='col-md-3 col-sm-6'>" +
                            "<div class='movie-item' id='" + val._id+"'>"+
                            "<div>" +
                            "<img width='300' height='450' src='"+poster+"'/>"+
                            "<div class='caption'>" +
                            "<h3>Rating:"+rating+"</h3><" +
                            "/div>"+
                            "<div class='cap1'>" +
                            "<h3>"+val.title+"</h3>" +
                            "<p>Release: "+val.release+"</p>" +
                            "<p>Director: "+val.director+"</p>" +
                            "<p>Length: "+val.length+" minutes</p>" +
                            "<p>"+val.description+"</p>" +
                            "</div>" +
                            "<div class='dropup'>"+
                            "<div class='btn-group btn-group-justified'>" +
                            "<div class='btn-group'>" +
                            "<button type='button' class='btn btn-primary dropdown-toggle' data-toggle='dropdown'>Info <span class='caret'></span></button>" +
                                "<ul class='dropdown-menu drop-up' role='menu'>" +
                            "<li><button type='button' class=' btn btn-primary info-btn' '>info</button></li> " +
                            "<li><button type='button' class=' btn btn-primary rate-btn' data-toggle='modal' data-target='"+modal+"'>Manage rating</button></li> "+
                            "</ul>"+
                            "</div></div>"+
                            "</div></div></div></div>")
                    }

                    $(".rate-btn").on('click',function () {
                        id  = $(this).closest(".movie-item").attr("id");
                        console.log(id);
                    })

                })
            },
            error: function (xhr, status, error) {

            },
            beforeSend:setHeader
        })
        function setHeader(xhr) {
            console.log("test")
            if(lscache.get("tokenData")){
                xhr.setRequestHeader("Authorization", lscache.get("tokenData").tokenKey);

            }
        }
        var id
        $("#rateModal").on("hidden.bs.modal", function(){
            // $(".modal-body").removeData()
            $(this).find("input,textarea,select,#rateTitle").val('');
        });

        $("#rateModalButton").click(function () {
            console.log(id);
            console.log("click")
            rate = $("#rating").val();
            if (rate == 0.5 ||rate== 1 ||rate== 1.5 ||rate== 2 ||rate== 2.5 ||rate== 3 ||rate== 3.5 ||rate== 4 ||rate== 4.5||rate== 5) {
                $.ajax({
                    url: "http://localhost:3000/api/addrating",
                    type: "POST",
                    dataType: "json",
                    data: {_id: id, rating: $("#rating").val()},
                    success: function (result) {
                        location.reload(true);
                    },
                    error: function (xhr, status, error) {

                    },
                    beforeSend: setHeader
                })
                function setHeader(xhr) {
                    console.log("test")
                    if (lscache.get("tokenData")) {
                        xhr.setRequestHeader("Authorization", lscache.get("tokenData").tokenKey);

                    }
                }
            }
            else{
                console.log("error");
                $("#rateForm").addClass("has-error");
                $("#rateForm").append('<span id="helpBlock2" class="help-block">Invalid rating</span>');
            }
        })

        $("#changeRateModal").on("hidden.bs.modal", function(){
            // $(".modal-body").removeData()
            $(this).find("input,textarea,select,#rateTitle").val('');
        });

        $("#changeRateModalButton").click(function () {
            console.log(id);
            console.log("click")
            rate = $("#rating").val();
            if (rate == 0.5 ||rate== 1 ||rate== 1.5 ||rate== 2 ||rate== 2.5 ||rate== 3 ||rate== 3.5 ||rate== 4 ||rate== 4.5||rate== 5){
                $.ajax({
                    url: "http://localhost:3000/api/changerating",
                    type: "PUT",
                    dataType: "json",
                    data: {_id: id, rating: $("#changeRating").val()},
                    success: function (result) {
                        location.reload(true);
                    },
                    error: function (xhr, status, error) {

                    },
                    beforeSend: setHeader
                })
                function setHeader(xhr) {
                    console.log("test")
                    if (lscache.get("tokenData")) {
                        xhr.setRequestHeader("Authorization", lscache.get("tokenData").tokenKey);

                    }
                }
            }
            else{
                console.log("error");
                $("#changeRateForm").addClass("has-error");
                $("#changeRateForm").append('<span id="helpBlock2" class="help-block">Invalid rating</span>');
            }
        })

        $("#removeRateModalButton").click(function () {
            console.log(id);
            console.log("click")
                $.ajax({
                    url: "http://localhost:3000/api/removerating",
                    type: "DELETE",
                    dataType: "json",
                    data: {_id: id},
                    success: function (result) {
                        location.reload(true);
                    },
                    error: function (xhr, status, error) {

                    },
                    beforeSend: setHeader
                })
                function setHeader(xhr) {
                    console.log("test")
                    if (lscache.get("tokenData")) {
                        xhr.setRequestHeader("Authorization", lscache.get("tokenData").tokenKey);

                    }
                }

        })





    }
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
                        "<button type='button' class='btn btn-primary info-btn'>Info</button>" +
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
                        "<button type='button' class='btn btn-primary info-btn'>Info</button>" +
                        "</div></div></div></div></div>")
                }
                $(".info-button").on ('click',function () {
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
                        "<button type='button' class='btn btn-primary info-btn'>Info</button>" +
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
                        "<button type='button' class='btn btn-primary info-btn'>Info</button>" +
                        "</div></div>"+
                        "</div></div></div>")
                }
                $(".info-btn").on ('click',function () {
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



