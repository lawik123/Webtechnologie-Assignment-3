/**
 * Created by Lawik Ayoub on 16-Oct-16.
 */
$(document).ready(function () {
    $("#registerButton").click(function () {
        if($("#registerInputPrefixName").size==0){
            $.ajax({
                url: "http://localhost:3000/api/register",
                type: "POST",
                data:{userName: $("#registerInputUsername").val(), password: $("#registerInputPassword").val(),
                    firstName:$("#registerInputFirstName").val(),
                    lastName:$("#registerInputLastName").val()},
                dataType: "json",
                success: function (result) {
                    $.ajax({
                        url: "http://localhost:3000/api/authenticate",
                        type: "POST",
                        data:{userName: $("#registerInputUsername").val(), password: $("#registerInputPassword").val()},
                        dataType: "json",
                        success: function (result) {
                            console.log(result.token);
                            lscache.set('tokenData',{'tokenKey':result.token,'userName':$("#registerInputUsername").val()},30);
                            window.location = "index.html"
                        },
                        error: function (xhr, status, error) {
                            console.log(xhr.status);
                        }
                    });
                },
                error: function (xhr, status, error) {
                    console.log(xhr.status);
                    var json = $.parseJSON(xhr.responseText);
                    if(xhr.status==409){
                        // $("#registerInputUsernameGroup").addClass();
                        $("#userNameConflictModal").modal()
                    }
                }
            });
        }
        else{
            $.ajax({
                url: "http://localhost:3000/api/register",
                type: "POST",
                data:{userName: $("#registerInputUsername").val(), password: $("#registerInputPassword").val(),
                    firstName:$("#registerInputFirstName").val(),tussenvoegsel:$("#registerInputPrefixName").val(),
                    lastName:$("#registerInputLastName").val()},
                dataType: "json",
                success: function (result) {
                    $.ajax({
                        url: "http://localhost:3000/api/authenticate",
                        type: "POST",
                        data:{userName: $("#registerInputUsername").val(), password: $("#registerInputPassword").val()},
                        dataType: "json",
                        success: function (result) {
                            console.log(result.token);
                            lscache.set('tokenData',{'tokenKey':result.token,'userName':$("#registerInputUsername").val()},30);
                            window.location = "index.html"
                        },
                        error: function (xhr, status, error) {
                            console.log(xhr.status);
                        }
                    });

                    // location.reload(true);
                },
                error: function (xhr, status, error) {
                    console.log(xhr.status);
                    var json = $.parseJSON(xhr.responseText);
                    if(xhr.status==409){
                        // $("#registerInputUsernameGroup").addClass();
                        $("#userNameConflictModal").modal()

                    }
                }
            });
        }

    });

})