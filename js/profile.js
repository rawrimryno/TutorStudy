/*

This is a custom js for the TutorStudy website.

By: Ryan Ngo

*/
var name, major, description, fee, UTID;

/* Generic Functions */
function getUserInfo(){
    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "http://52.38.218.199/TutorStudyServlet/GetUserInfo",
        success: function(data){
            var result = data;
            switch(result.UTID){
                case 2:
                    $("#tutorInfoForm").hide();
                    break;
                case 3:
                    $("#studentInfoForm").hide();
                    break;
                default:
                    window.location.replace("index.html");
                    break;
            }
        }
    });
}
/* End Generic Functions */

/* Document Ready Functions */
$(document).ready(function(){
    getUserInfo();
});
/* End Document Ready Functions */