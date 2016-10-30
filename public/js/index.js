/**
 * Created by Lars Meulenbroek on 10/29/2016.
 */
$(document).ready(function () {
    $('#homenav').click(function () {
        $('html, body').animate({
            scrollTop: $("#section1").offset().top
        }, 100);
    });

    if (lscache.get("tokenData")) {
        $(".nav.navbar-nav").append("<li><a class='netflixText' href='community.html'>Community <span class='sr-only'></span></a></li>")
        $(".nav.navbar-nav>li#registerNav").hide();
    }

});