/*

This is a custom js for the TutorStudy website.

By: Ryan Ngo

*/
var name, major, description, fee, UTID;

/* Generic Functions */
function getUserInfo(){
    loadMajors();
    $.ajax({
        type: "GET",
        dataType: "JSON",
        url: "http://52.38.218.199/TutorStudyServlet/GetUserInfo",
        success: function(data){
            var result = data;
            console.log(result);
            switch(result.UTID){
                case 2:
                    $("#tutorInfoForm").hide();
                    $("#studentInfoForm input[name='name']").val(result.name);
                    $("#studentInfoForm input[name='email']").val(result.email);
                    $("#studentInfoForm").val(result.MID);
                    $("#studentInfoForm").trigger('change');
                    break;
                case 3:
                    $("#studentInfoForm").hide();
                    $("#tutorInfoForm input[name='name']").val(result.name);
                    $("#tutorInfoForm input[name='email']").val(result.email);
                    $("#tutorInfoForm textarea[name='description']").val(result.Description);
                    $("#tutorInfoForm input[name='rate']").val(result.Rate);
                    $("#tutorMajorSelect").val(result.MID);
                    $("#tutorMajorSelect").trigger('change');
                    break;
                default:
                    window.location.replace("index.html");
                    break;
            }
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
    })
}
/* End Generic Functions */

/* Document Ready Functions */
$(document).ready(function(){
    getUserInfo();
});
/* End Document Ready Functions */