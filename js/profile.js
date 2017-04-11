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
            var obj = data;
            console.log(data);
            console.log(obj.UTID);
        }
    });
}
/* End Generic Functions */

/* Document Ready Functions */
$(document).ready(function(){
    getUserInfo();
});
/* End Document Ready Functions */