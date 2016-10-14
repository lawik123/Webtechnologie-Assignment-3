/**
 * Created by Lars Meulenbroek on 10/14/2016.
 */
$(window).onload(function () {
    $(document).ready(function() {
        console.log("ready");
        $("#loginBtn").click(function () {
            console.log("click");
            $("#textHome").hide();
            console.log("hide");
        })
    });
});
