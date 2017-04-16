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

function changePendingSession(TSID, value){
    if (value == 0){
        $("#"+TSID).show('slow');
    }else{
        $("#"+TSID).hide('slow');
    }
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
                        Action: "<select class='form-control' onChange='changePendingSession("+data.TSID+",this.value);'>"+
                                    "<option value='1'>Accept</option>"+
                                    "<option value='0'>Reschedule</option>"+
                                    "<option value='-1'>Decline</option>"+
                                "</select>"+
                                "<form id='"+data.TSID+"' class='login' style='display:none'>"+
                                    "<p>Choose an available date:</p>"+
                                    "<input name ='date' class='form-control datepicker' type='text'>"+
                                    "<p>Choose an available time:</p>"+
                                    "<input name = 'time'class='form-control timepicker' type='text'>"+
                                    "<p>Please input a location:</p>"+
                                    "<input name = 'location'class='form-control' type='text' id='location' value='"+data.location+"'>"+
                                "</form>"+
                                "<button class='btn btn-primary'>Submit Response</button>"
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
    $(".datepicker").forEach(function(element){
        element.datepicker({
            dateFormat:'yy-mm-dd'
        });
    });
    $(".timepicker").forEach(function(element){
        element.timepicker({
            minTime: '7:00am',
            maxTime: '10:00pm',
            timeFormat: 'H:i:s',
            step:60
        });
    });
});

/* End Document Ready Functions */
