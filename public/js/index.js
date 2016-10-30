/**
 * Created by Lars Meulenbroek on 10/29/2016.
 */
$(document).ready(function () {
    $('#homenav').click(function () {
        $('html, body').animate({
            scrollTop: $("#section1").offset().top
        }, 100);
    });
    $('#top5nav').click(function () {
        $('html, body').animate({
            scrollTop: $("#section2").offset().top
        }, "slow");
    });

    var first = 0;
    var moviecounter = 0;

    $.ajax({
        url: "http://localhost:3000/api/movies",
        type: "GET",
        dataType: "json",
        success: function (result) {
            $.each(result, function (key, val) {
                    var poster;
                    console.log(val.title);
                    $.ajax({
                        type: "GET",
                        dataType: "json",
                        url: "http://www.omdbapi.com/?t=" + val.title,
                        success: function (data) {
                            poster = data.Poster;
                        },
                        async: false,
                        error: function () {
                            return "Image not found.";
                        }
                    });
                    console.log(poster);
                    if (first === 0 && moviecounter < 5) {
                        moviecounter++;
                        first = 1;
                        $("#topFive").append(
                            "<div class='movie-image'>" +
                            "<img class='active' width='300' height='450' src='" + poster + "'/>" +
                            "</div></div></div>")
                    } else if(moviecounter < 5) {
                        moviecounter++;
                        $("#topFive").append(
                            "<div class='movie-image'>" +
                            "<img width='300' height='450' src='" + poster + "'/>" +
                            "</div></div></div>")
                    }
                }
            )
        }

    });
    slideSwitch();

    function slideSwitch() {
        var $active = $('#topFive img.active');
        var $next = $active.next();

        $next.addClass('active');

        $active.removeClass('active');
    }

    $(function() {
        setInterval( "slideSwitch()", 5000 );
    });
});