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


function verifyTutorFields(fields){
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
function verifyStudentFields(fields){
    for(var i in fields){
        if(fields[i].value==null || fields[i].value==""){
            $("#pendingStudentSessionsInfo").removeClass("alert-success");
            $("#pendingStudentSessionsInfo").addClass("alert-danger");
            $("#alertPendingStudentSessionsInfo").text("Please fill in all required information. You are missing the " +fields[i].name+".");
            $("#pendingStudentSessionsInfo").show('fast');
            setTimeout(function(){$("#pendingStudentSessionsInfo").hide('fast');}, 2000);
            return false;
        }
    }
    return true;
}

/* End Generic Functions */

/* Submit Session Functions */


function processTutorResponse(TSID){
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
            if (!verifyTutorFields(fields)){
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

function processStudentResponse(TSID){
    var response = $("#"+TSID+"Select").val();
    switch(response){
        case '-1':
            if (confirm("are you sure you want to decline?")){
                $.ajax({
                    type: "POST",
                    async: false,
                    data: {TSID: TSID},
                    url: "http://52.38.218.199/TutorStudyServlet/UpdateStudentDeclineSession",
                    success: function(data){
                        $("#pendingStudentSessionsInfo").removeClass("alert-success");
                        $("#pendingStudentSessionsInfo").removeClass("alert-danger");
                        $("#pendingStudentSessionsInfo").addClass("alert-info");
                        $("#alertPendingStudentSessionsInfo").text(data);
                        $("#pendingStudentSessionsInfo").show('fast');
                        setTimeout(function(){$("#pendingStudentSessionsInfo").hide('fast');}, 2000);
                        loadStudentSessions();
                    }
                });
            }
            break;
        case '0':
            var fields = $("#"+TSID).serializeArray();
            if (!verifyTutorFields(fields)){
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
                url: "http://52.38.218.199/TutorStudyServlet/UpdateStudentConflictSession",
                success: function(data){
                    $("#pendingStudentSessionsInfo").removeClass("alert-success");
                    $("#pendingStudentSessionsInfo").removeClass("alert-danger");
                    $("#pendingStudentSessionsInfo").addClass("alert-info");
                    $("#alertPendingStudentSessionsInfo").text(data);
                    $("#pendingStudentSessionsInfo").show('fast');
                    setTimeout(function(){$("#pendingStudentSessionsInfo").hide('fast');}, 2000);
                    loadStudentSessions();
                }
            });
            break;
        case '1':
            $.ajax({
                type: "POST",
                async: false,
                data: {TSID: TSID},
                url: "http://52.38.218.199/TutorStudyServlet/UpdateStudentAcceptSession",
                success: function(data){
                    $("#pendingStudentSessionsInfo").removeClass("alert-success");
                    $("#pendingStudentSessionsInfo").removeClass("alert-danger");
                    $("#pendingStudentSessionsInfo").addClass("alert-info");
                    $("#alertPendingStudentSessionsInfo").text(data);
                    $("#pendingStudentSessionsInfo").show('fast');
                    setTimeout(function(){$("#pendingStudentSessionsInfo").hide('fast');}, 2000);
                    loadStudentSessions();
                }
            });
            break;
    }
}

function submitReview(TSID){
    var fields = $("#"+TSID).serializeArray();
    console.log(fields);
    /*$.ajax({
        type: "POST",
        async: false,
        data: {
                TSID: TSID,
                rating: fields[0].value,
                review: fields[1].value
            },
        url: "http://52.38.218.199/TutorStudyServlet/UpdateStudentConflictSession",
        success: function(data){
            $("#pendingStudentSessionsInfo").removeClass("alert-success");
            $("#pendingStudentSessionsInfo").removeClass("alert-danger");
            $("#pendingStudentSessionsInfo").addClass("alert-info");
            $("#alertPendingStudentSessionsInfo").text(data);
            $("#pendingStudentSessionsInfo").show('fast');
            setTimeout(function(){$("#pendingStudentSessionsInfo").hide('fast');}, 2000);
            loadStudentSessions();
        }
    });*/
}

/* End Submit Session Functions */

/* Load Session Functions */

function loadStudentSessions(){
    $.ajax({
        type: "GET",
        async: false,
        dataType: "JSON",
        url: "http://52.38.218.199/TutorStudyServlet/GetPendingStudentSessions"
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
                                "<button class='btn btn-primary' onClick='processStudentResponse("+data.TSID+");'>Submit Response</button>"
                    };
                });
        var dynatable = $('#pendingStudentSessions').dynatable({
            dataset: {
                records: response
            }
        }).data('dynatable');

        dynatable.settings.dataset.originalRecords = response;
        dynatable.process();
    });
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
                                "<button class='btn btn-primary' onClick='processTutorResponse("+data.TSID+");'>Submit Response</button>"
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
    $.ajax({
        type: "GET",
        async: false,
        dataType: "JSON",
        url: "http://52.38.218.199/TutorStudyServlet/GetUpcomingSessions"
    }).done(function (response) {
        response = $.map(response, function(data){
                    return{
                        TSID: data.TSID,
                        Name: data.name,
                        Course: data.course,
                        Date: data.datetime,
                        Location: data.location
                    };
                });
        var dynatable = $('#upcomingSessions').dynatable({
            dataset: {
                records: response
            }
        }).data('dynatable');

        dynatable.settings.dataset.originalRecords = response;
        dynatable.process();
    });
}

function loadPastSessions(){
    $.ajax({
        type: "GET",
        async: false,
        dataType: "JSON",
        url: "http://52.38.218.199/TutorStudyServlet/GetPastSessions"
    }).done(function (response) {
        response = $.map(response, function(data){
                    return{
                        TSID: data.TSID,
                        Name: data.name,
                        Course: data.course,
                        Date: data.datetime,
                        Location: data.location,
                        Review: "<button class='btn btn-default' onClick= '$(\"#"+data.TSID+"\").show(\"slow\");'>Add Review</button><br><br>"+
                                "<form id='"+data.TSID+"' class='login' style='display:none'>"+
                                    "<a class='close' onClick= '$(\"#"+data.TSID+"\").hide(\"slow\");' aria-label='close'>&times;</a>"+
                                    "<label for='rating'>Rating:</label><br>"+
                                    "<select name='rating'class='form-control'>"+
                                        "<option value='1'>Very Poor</option>"+
                                        "<option value='2'>Poor</option>"+
                                        "<option value='3' selected>Average</option>"+
                                        "<option value='4'>Good</option>"+
                                        "<option value='5'>Excellent</option>"+
                                    "</select>"+
                                    "<label for='description'>Review:</label><br>"+
                                    "<textarea rows='' cols='' class='form-control' name='description' placeholder='Write about your experience...' value=''></textarea><br>"+
                                    "<button type='button' class='btn btn-primary' onClick='submitReview("+data.TSID+");'>Submit Review</button>"+
                                "</form>"
                    };
                });
        var dynatable = $('#pastSessions').dynatable({
            dataset: {
                records: response
            }
        }).data('dynatable');

        dynatable.settings.dataset.originalRecords = response;
        dynatable.process();
    });
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
