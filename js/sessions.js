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

function processResponse(TSID){
    var response = $("#"+TSID+"Select").val();
    switch(response){
        case '-1':
            if (confirm("are you sure you want to decline?")){
                $.ajax({
                    type: "POST",
                    async: false,
                    data: {TSID: TSID},
                    url: "http://52.38.218.199/TutorStudyServlet/UpdateTutorDeclineSession",
                    success: function(data){
                        $("#pendingTutorSessionsInfo").removeClass("alert-success");
                        $("#pendingTutorSessionsInfo").removeClass("alert-danger");
                        $("#pendingTutorSessionsInfo").addClass("alert-info");
                        $("#alertPendingTutorSessionsInfo").text(data);
                        $("#pendingTutorSessionsInfo").show('fast');
                        setTimeout(function(){$("#pendingTutorSessionsInfo").hide('fast');}, 2000);
                        loadTutorSessions();
                    }
                });
            }
            break;
        case '0':
            var fields = $("#"+TSID).serializeArray();
            if (!verifyFields(fields)){
                return;
            }
            $.ajax({
                type: "POST",
                async: false,
                data: {
                        TSID: TSID,
                        date: fields[0].value,
                        time: fields[1].value,
                        location: fields[2].value
                    },
                url: "http://52.38.218.199/TutorStudyServlet/UpdateTutorConflictSession",
                success: function(data){
                    $("#pendingTutorSessionsInfo").removeClass("alert-success");
                    $("#pendingTutorSessionsInfo").removeClass("alert-danger");
                    $("#pendingTutorSessionsInfo").addClass("alert-info");
                    $("#alertPendingTutorSessionsInfo").text(data);
                    $("#pendingTutorSessionsInfo").show('fast');
                    setTimeout(function(){$("#pendingTutorSessionsInfo").hide('fast');}, 2000);
                    loadTutorSessions();
                }
            });
            break;
        case '1':
            $.ajax({
                type: "POST",
                async: false,
                data: {TSID: TSID},
                url: "http://52.38.218.199/TutorStudyServlet/UpdateTutorAcceptSession",
                success: function(data){
                    $("#pendingTutorSessionsInfo").removeClass("alert-success");
                    $("#pendingTutorSessionsInfo").removeClass("alert-danger");
                    $("#pendingTutorSessionsInfo").addClass("alert-info");
                    $("#alertPendingTutorSessionsInfo").text(data);
                    $("#pendingTutorSessionsInfo").show('fast');
                    setTimeout(function(){$("#pendingTutorSessionsInfo").hide('fast');}, 2000);
                    loadTutorSessions();
                }
            });
            break;
    }
}

function verifyFields(fields){
    for(var i in fields){
        if(fields[i].value==null || fields[i].value==""){
            $("#pendingTutorSessionsInfo").removeClass("alert-success");
            $("#pendingTutorSessionsInfo").addClass("alert-danger");
            $("#alertPendingTutorSessionsInfo").text("Please fill in all required information. You are missing the " +fields[i].name+".");
            $("#pendingTutorSessionsInfo").show('fast');
            setTimeout(function(){$("#pendingTutorSessionsInfo").hide('fast');}, 2000);
            return false;
        }
    }
    return true;
}

/* End Generic Functions */

/* Load Session Functions */

function loadStudentSessions(){
}

function loadTutorSessions(){
    $.ajax({
        type: "GET",
        async: false,
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
                        Action: "<select id='"+data.TSID+"Select' class='form-control' onChange='changePendingSession("+data.TSID+",this.value);'>"+
                                    "<option value='1'>Accept</option>"+
                                    "<option value='0'>Reschedule</option>"+
                                    "<option value='-1'>Decline</option>"+
                                "</select>"+
                                "<form id='"+data.TSID+"' class='login' style='display:none'>"+
                                    "<p>Choose an available date:</p>"+
                                    "<input name ='date' class='datepicker form-control' type='text'>"+
                                    "<p>Choose an available time:</p>"+
                                    "<input name = 'time'class='timepicker form-control' type='text'>"+
                                    "<p>Please input a location:</p>"+
                                    "<input name = 'location'class='form-control' type='text' id='location' value='"+data.location+"'>"+
                                "</form>"+
                                "<button class='btn btn-primary' onClick='processResponse("+data.TSID+");'>Submit Response</button>"
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
    $(".datepicker").datepicker({
        dateFormat:'yy-mm-dd'
    });
    $(".timepicker").timepicker({
        minTime: '7:00am',
        maxTime: '10:00pm',
        timeFormat: 'H:i:s',
        step:60
    });
});

/* End Document Ready Functions */
