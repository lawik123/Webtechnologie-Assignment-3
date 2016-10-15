/**
 * Created by Lawik Ayoub on 14-Oct-16.
 */
//TODO: get token from localstorage
//TODO: sort users in alphabetical order
//TODO: onclick for table content which leads to the user profile of the selected user
$(document).ready(function(){
    $.ajax({
        url:"http://localhost:3000/api/userlist",
        type:"GET",
        dataType:"json",
        success: function (result) {
            $.each(result, function (key,val) {
                $("#table-content").append("<tr><td>"+val.firstName+"</td></tr>")
            });
            if(result.size==1){
                $("#table-description").text("There is 1 person using Notflix");
            }
            else{
                $("#table-description").text("There are "+ result.length+" People using Notflix!");
            }

        },
        error: function (request,status,error) {
            if(request.status===401){
                // $("#table-content").hide();
                $(".table").hide();
                $("#table-description").append("Please <a href='#'>Login</a> to use this feature.");
            }
        },
        beforeSend: setHeader
    })
    function setHeader(xhr) {
        xhr.setRequestHeader("Authorization", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyTmFtZSI6Imxhd2lrMSIsImlhdCI6MTQ3NjQ3ODM0MywiZXhwIjoxNDc2NDgwMTQzfQ.0J4x54O6rqggmZPrNHIO9wHChu53Oi68cPYMcu7vKcY")
    }

});
