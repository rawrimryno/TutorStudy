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
    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "http://52.38.218.199/TutorStudyServlet/GetPendingTutorSessions"
    }).done(function (response) {
        response = $.map(response, function(data){
                    return{
                        TSID: data.TSID,
                        Name: data.name,
                        Course: data.course,
                        Date: data.datetime,
                        Location: data.location,
                        Action: "<button class='btn btn-success' type='button'>Accept</button><br>"+
                                "<button class='btn btn-info' type='button'>Reschedule</button><br>"+
                                "<button class='btn btn-danger' type='button'>Decline</button><br>"
                    };
                });
        var dynatable = $('#pendingTutorSessions').dynatable({
            dataset: {
                records: response
            }
        }).data('dynatable');

        dynatable.settings.dataset.originalRecords = response;
        dynatable.process();
    });
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
