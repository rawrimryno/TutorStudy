/*

This is a custom js for the TutorStudy website.

By: Ryan Ngo

*/

/* Generic Functions */
function loadUserSession(){
    $.ajax({
        type: "GET",
        async: false,
        dataType: "JSON",
        url: "http://52.38.218.199/TutorStudyServlet/GetUserInfo",
        success: function(data){
            var result = data;
            switch(result.UTID){
                case 2:
                    loadStudentSessions();
                    loadUpcomingSessions();
                    loadPastSessions();
                    break;
                case 3:
                    loadStudentSessions();
                    loadTutorSessions();
                    loadUpcomingSessions();
                    loadPastSessions();
                    $("#tutorSessions").show();
                    break;
                default:
                    break;
            }
        }
    });
}

/* End Generic Functions */

/* Load Session Functions */

function loadStudentSessions(){
    
}

function loadTutorSessions(){

}

function loadUpcomingSessions(){

}

function loadPastSessions(){

}

/* End Load Session Functions */

/* Document Ready Functions */
$(document).ready(function(){
    checkLogin();
    loadUserSession();
});

/* End Document Ready Functions */
