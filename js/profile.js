/*

This is a custom js for the TutorStudy website.

By: Ryan Ngo

*/

/* Generic Functions */
function getUserInfo(){
    loadMajors();
    loadClasses();
    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "http://52.38.218.199/TutorStudyServlet/GetUserInfo",
        success: function(data){
            var result = data;
            switch(result.UTID){
                case 2:
                    $("#tutorInfoForm").hide();
                    $("#studentInfoForm input[name='name']").val(result.name);
                    $("#studentInfoForm input[name='email']").val(result.email);
                    $("#studentMajorSelect").val(result.MID);
                    $("#studentMajorSelect").trigger('change');
                    break;
                case 3:
                    console.log(result);
                    console.log(result.classes);
                    $("#studentInfoForm").hide();
                    $("#tutorInfoForm input[name='name']").val(result.name);
                    $("#tutorInfoForm input[name='email']").val(result.email);
                    $("#tutorInfoForm textarea[name='description']").val(result.Description);
                    $("#tutorInfoForm input[name='rate']").val(result.Rate);
                    $("#tutorMajorSelect").val(result.MID).trigger('change');
                    $("#classSelect").val(result.classes).multiselect('refresh');
                    break;
                default:
                    break;
            }
        },
        error: function(){
            window.location.replace("http://52.38.218.199/TutorStudy/");
        }
    });
}

function loadMajors(){
     $.ajax({
        type: "GET",
        async: "false",
        dataType: "json",
        url: "http://52.38.218.199/TutorStudyServlet/GetMajors",
        success:function(data){
            $("#studentMajorSelect").select2({
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

function loadClasses(){
    $.ajax({
        type: "GET",
        async: "false",
        dataType: "json",
        url: "http://52.38.218.199/TutorStudyServlet/GetClasses"
    }).done(function(response){
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
    });
}
/* End Generic Functions */

/* Update User Functions */
function updateTutor(){
    var fields = $("#tutorInfoForm").serializeArray();
    if (!checkPassword(fields)){
        return;
    }
    console.log(fields);
    fields = $("#tutorInfoForm").serialize();
    $.ajax({
        type: "POST",
        url: "http://52.38.218.199/TutorStudyServlet/UpdateTutor",
        data: fields,
        success: function(data){
            $("#userInfo").removeClass("alert-success");
            $("#userInfo").removeClass("alert-danger");
            $("#userInfo").addClass("alert-info");
            $("#alertUserInfo").text(data);
            $("#userInfo").show('fast');
            setTimeout(function(){$("#userInfo").hide('fast');}, 2000);
        }
    });
}

function updateStudent(){
    var fields = $("#studentInfoForm").serializeArray();
    if (!checkPassword(fields)){
        return;
    }
    fields = $("#studentInfoForm").serialize();
    $.ajax({
        type: "POST",
        url: "http://52.38.218.199/TutorStudyServlet/UpdateStudent",
        data: fields,
        success: function(data){
            $("#userInfo").removeClass("alert-success");
            $("#userInfo").removeClass("alert-danger");
            $("#userInfo").addClass("alert-info");
            $("#alertUserInfo").text(data);
            $("#userInfo").show('fast');
            setTimeout(function(){$("#userInfo").hide('fast');}, 2000);
        }
    });
}

function checkPassword(fields){
    if(fields[1].value!=fields[2].value){
        $("#userInfo").removeClass("alert-success");
        $("#userInfo").addClass("alert-danger");
        $("#alertUserInfo").text("Passwords do not match.");
        $("#userInfo").show('fast');
        setTimeout(function(){$("#userInfo").hide('fast');}, 2000);
        return false;
    }
    return true;
}
/* End Update User Functions */

/* Document Ready Functions */
$(document).ready(function(){
    getUserInfo();
});
/* End Document Ready Functions */