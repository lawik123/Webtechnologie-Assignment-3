/**
 * Created by Lawik Ayoub on 16-Oct-16.
 */
$(document).ready(function () {
    $("#registerInputUsername").on('input',function () {
        if($(this).val().length<4){
            $("#registerInputUsernameForm").addClass("has-error")
        }
        else{
            $("#registerInputUsernameForm").removeClass("has-error")
        }
    })
    $("#registerInputPassword").on('input',function () {
        if($(this).val().length<6){
            $("#registerInputPasswordForm").addClass("has-error")
        }
        else{
            $("#registerInputPasswordForm").removeClass("has-error")
        }
    })
    $("#registerConfirmPassword").on('input',function () {
        if($("#registerConfirmPassword").val()!==($("#registerInputPassword").val())){
            if(!$("#registerInputConfirmPasswordForm").hasClass("has-error")){
                $("#registerInputConfirmPasswordForm").addClass("has-error")
                $("#registerInputConfirmPasswordForm").append('<span id="helpBlock3" class="help-block">Your passwords Don\'t match</span>');
            }
        }
        else{
            $("#registerInputConfirmPasswordForm").removeClass("has-error")
            $("#helpBlock3").remove();
        }
    })
    $("#registerInputFirstName").on('input',function () {
        if($(this).val().length<1){
            if(!$("#registerInputFirstForm").hasClass("has-error")){
                $("#registerInputFirstNameForm").addClass("has-error")
                $("#registerInputFirstNameForm").append('<span id="helpBlock1" class="help-block">Please fill out this field</span>');
            }
        }
        else{
            $("#registerInputFirstNameForm").removeClass("has-error")
            $("#helpBlock1").remove();
        }
    })
    $("#registerInputLastName").on('input',function () {
        if($(this).val().length<1){
            if(!$("#registerInputLastNameForm").hasClass("has-error")){
                $("#registerInputLastNameForm").addClass("has-error")
                $("#registerInputLastNameForm").append('<span id="helpBlock2" class="help-block">Please fill out this field</span>');
            }
        }
        else{
            $("#registerInputLastNameForm").removeClass("has-error")
            $("#helpBlock2").remove();
        }
    })
    $("#registerInputFirstName").on('blur',function () {
        if($(this).val().length<1){
            if(!$("#registerInputFirstNameForm").hasClass("has-error")){
                $("#registerInputFirstNameForm").addClass("has-error")
                $("#registerInputFirstNameForm").append('<span id="helpBlock1" class="help-block">Please fill out this field</span>');
            }
        }
        else{
            $("#registerInputFirstNameForm").removeClass("has-error")
            $("#helpBlock1").remove();
        }
    })
    $("#registerInputLastName").on('blur',function () {
        if($(this).val().length<1){
            if(!$("#registerInputLastNameForm").hasClass("has-error")){
                $("#registerInputLastNameForm").addClass("has-error")
                $("#registerInputLastNameForm").append('<span id="helpBlock2" class="help-block">Please fill out this field</span>');
            }
        }
        else{
            $("#registerInputLastNameForm").removeClass("has-error")
            $("#helpBlock2").remove();
        }
    })
    $("#registerCheckbox").on('change',function (){
        if(!$("#registerCheckbox").is(':checked')) {
            if (!$("#registerCheckboxGroup").hasClass("has-error")) {
                $("#registerCheckboxGroup").addClass("has-error")
                $("#registerCheckboxGroup").append('<span id="helpBlock4" class="help-block">You must accept our ToS in order to create an account</span>')
            }
        }
        else{
            if($("#registerCheckboxGroup").hasClass("has-error")){
                $("#registerCheckboxGroup").removeClass("has-error")
                $("#helpBlock4").remove();
            }
        }

        });

    $("#registerButton").click(function () {

        $("#registerInputUsernameForm").removeClass("has-error")
        $("#registerInputPasswordForm").removeClass("has-error")
        $("#registerInputConfirmPasswordForm").removeClass("has-error")
        $("#registerInputFirstNameForm").removeClass("has-error")
        $("#registerInputLastNameForm").removeClass("has-error")

        $("#helpBlock1").remove();
        $("#helpBlock2").remove();
        $("#helpBlock3").remove();

        if($("#registerInputUsername").val().length<4){
            $("#registerInputUsernameForm").addClass("has-error")
            // $("#registerInputUsernameForm").append('<span id="helpBlock1" class="help-block">Please fill out this field</span>');
        }
        if($("#registerInputPassword").val().length<6){
            $("#registerInputPasswordForm").addClass("has-error")
            // $("#registerInputUsernameForm").append('<span id="helpBlock1" class="help-block">Please fill out this field</span>');
        }
        if($("#registerInputFirstName").val().length===0){
            $("#registerInputFirstNameForm").addClass("has-error")
            $("#registerInputFirstNameForm").append('<span id="helpBlock1" class="help-block">Please fill out this field</span>');
        }
        if($("#registerInputLastName").val().length===0){
            $("#registerInputLastNameForm").addClass("has-error")
            $("#registerInputLastNameForm").append('<span id="helpBlock2" class="help-block">Please fill out this field</span>');
        }
        if($("#registerConfirmPassword").val()!==($("#registerInputPassword").val())){
            $("#registerInputConfirmPasswordForm").addClass("has-error")
            $("#registerInputConfirmPasswordForm").append('<span id="helpBlock3" class="help-block">Your passwords Don\'t match</span>');
        }
        if(!$("#registerCheckbox").is(':checked')){
            $("#registerCheckboxGroup").addClass("has-error")
            $("#registerCheckboxGroup").append('<span id="helpBlock4" class="help-block">You must accept our ToS in order to create an account</span>');

        }

        if(($("#registerInputUsername").val().length>=4)&&($("#registerInputPassword").val().length>=6)&&($("#registerInputFirstName").val().length>0)
        &&($("#registerInputLastName").val().length>0)&&($("#registerConfirmPassword").val()==($("#registerInputPassword").val()))){
            console.log("testing")
            if($("#registerInputPrefixName").val().length==0){
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
            else if($("#registerInputPrefixName").val().length>0){
                console.log("test")
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
        }


    });

})