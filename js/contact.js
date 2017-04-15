/*

This is a custom js for the TutorStudy website.

By: Ryan Ngo

*/

/* Generic Functions */
function loadTutorFormMajors(){
     $.ajax({
        type: "GET",
        async: false,
        dataType: "json",
        url: "http://52.38.218.199/TutorStudyServlet/GetMajors",
        success:function(data){
            $("#tutorMajorSelect").select2({
                data :  $.map(data, function(data){
                            return{
                                id: data.id,
                                text: data.major         
                            }
                        }),
                createTag: function(){
                    return null;
                }
            });
        }
    });
}

function loadTutorFormClasses(){
    $.ajax({
        type: "GET",
        async: false,
        dataType: "json",
        url: "http://52.38.218.199/TutorStudyServlet/GetClasses",
        success :function(response){
            response = $.map(response, function(data){
                            return{
                                id: data.CID,
                                text: data.Abrv+" "+data.CNum+"-"+data.CName        
                            }
                        });
            $("#classSelect").select2({
                data :  response,
                createTag: function(){
                    return null;
                }
                        
            });
        }
    });
}

function loadTutor(UID){
    $.ajax({
        type: "GET",
        async: false,
        data: {UID: UID},
        dataType: "JSON",
        url: "http://52.38.218.199/TutorStudyServlet/GetTutorInfo",
        success: function(data){
            var result = data;
            $("#classSelect").val(result.classes).trigger('change');
            $("#studentInfoForm").hide();
            $("#tutorInfoForm input[name='name']").val(result.name);
            $("#tutorInfoForm input[name='email']").val(result.email);
            $("#tutorInfoForm textarea[name='description']").val(result.Description);
            $("#tutorInfoForm input[name='rate']").val(result.Rate);
            $("#tutorMajorSelect").val(result.MID).trigger('change');
            $("#tutorInfoForm input[name='avgRating']").val(result.AvgRating+"/5");
            $("#scheduleSession input[name='tutorUID']").val(UID);
            var classOptions = [];
            result.classes.forEach(function(element){
                var option = {
                    id: element,
                    text: $("#classSelect option").eq(element-1).text()
                };
                classOptions.push(option);
            });
            $("#tutorClass").select2({
                data :  classOptions,
                createTag: function(){
                    return null;
                }
            });
        }
    });
    $("#tutorInfoForm").show('slow');
}

/* End Generic Functions */

/* Session Request Functions */

function submitSessionRequest(){
    var fields = $("#scheduleSession").serializeArray();
    console.log(fields);
    if (!verifyFields(fields))
        return;
    fields = $("#scheduleSession").serialize();
    $.ajax({
        type: "POST",
        url: "http://52.38.218.199/TutorStudyServlet/RequestSession",
        data: fields,
        success: function(data){
            console.log(data);
            $("#sessionInfo").removeClass("alert-danger");
            $("#sessionInfo").removeClass("alert-success");
            $("#sessionInfo").addClass("alert-info");
            $("#alertSessionInfo").text(data);
            $("#sessionInfo").show('fast');
        }
    });
}

function verifyFields(fields){
    for(var i = 0; i < fields.length-1; i++){
        if(fields[i].value==null || fields[i].value==""){
            $("#sessionInfo").removeClass("alert-success");
            $("#sessionInfo").addClass("alert-danger");
            $("#alertSessionInfo").text("Please fill in all required information. You are missing the " +fields[i].name+".");
            $("#sessionInfo").show('fast');
            setTimeout(function(){$("#registerInfo").hide('fast');}, 2000);
            return false;
        }
    }
}

/* End Session Request Functions */

/* Document Ready Functions */
$(document).ready(function(){
    checkLogin();
    loadTutorFormMajors();
    loadTutorFormClasses();
    loadTutor($_GET("Tutor"));
    $("#datepicker").datepicker({
        dateFormat:'yy-mm-dd'
    });
    $("#timepicker").timepicker({
        minTime: '7:00am',
        maxTime: '10:00pm',
        timeFormat: 'H:i:s',
        step:60
    });
});
/* End Document Ready Functions */

/* Default Functions */
function $_GET(param) {
	var vars = {};
	window.location.href.replace( location.hash, '' ).replace( 
		/[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
		function( m, key, value ) { // callback
			vars[key] = value !== undefined ? value : '';
		}
	);

	if ( param ) {
		return vars[param] ? vars[param] : null;	
	}
	return vars;
}

/* End Default Functions */