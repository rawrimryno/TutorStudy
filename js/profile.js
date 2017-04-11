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
                    break;
                case 3:
                    $("#studentInfoForm").hide();
                    $("#tutorInfoForm input[name='name']").val(result.name);
                    $("#tutorInfoForm input[name='email']").val(result.email);
                    $("#tutorInfoForm textarea[name='description']").val(result.Description);
                    $("#tutorInfoForm input[name='rate']").val(result.Rate);
                    $("#tutorInfoForm select[name='major']").val(result.MID);
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