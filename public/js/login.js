/**
 * Created by Lawik Ayoub on 15-Oct-16.
 */
$(document).ready(function() {
    if(lscache.get("tokenData")){
        $("#loginBtn").addClass("hidden");
        $("#navUser").removeClass("hidden");
        $("#navUsernameButton").text(lscache.get("tokenData").userName);
        $("#navLogoutButton").click(function () {
            lscache.remove('tokenData');
            window.location = "index.html";
        })
    }
    $("#loginModalButton").click(function () {
        $("#loginModalUsernameForm").removeClass("has-error");
        $("#helpBlock1").remove();
        $("#loginModalPasswordForm").removeClass("has-error");
        $("#helpBlock2").remove();
        var user = $("#username").val()
        $.ajax({
            url: "http://localhost:3000/api/authenticate",
            type: "POST",
            data:{userName: $("#username").val(), password: $("#password").val()},
            dataType: "json",
            success: function (result) {
                console.log(result.token);
                lscache.set('tokenData',{'tokenKey':result.token,'userName':user},30);
                location.reload(true);
            },
            error: function (xhr, status, error) {
                console.log(xhr.status);
                var json = $.parseJSON(xhr.responseText);
                if(json.message==="username does not exist"){
                    if ($("#helpBlock1").length==0) {
                        $("#loginModalUsernameForm").addClass("has-error")
                        $("#loginModalUsernameForm").append('<span id="helpBlock1" class="help-block">Username does not exist</span>');
                    }
                }
                else if(json.message==="invalid password"){
                    if ($("#helpBlock2").length==0) {
                        $("#loginModalPasswordForm").addClass("has-error")
                        $("#loginModalPasswordForm").append('<span id="helpBlock2" class="help-block">Invalid password</span>');
                    }
                }
            }
        });
    });

});