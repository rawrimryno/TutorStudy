/*

This is a custom js for the TutorStudy website.

By: Ryan Ngo

*/


/* General Get Functions for data loading */
function getMajors(){
    //note: needed 2 different methods because select2 does not allow multiple dropdown parents
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
                dropdownParent:$("#registerModal"),
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
                dropdownParent:$("#registerModal"),
                createTag: function(){
                    return null;
                }
            });
        }
    })
}
/* End General Get Functions */

/* General Load Functions */
/* End General Load Functions */

/*Form Functions*/
function changeRegisterForm(type){
    var accountType = type.value;
    getMajors();
    switch(accountType){
        case("Student"):
            $("#tutorRegistrationForm").hide();
            $("#studentRegistrationForm").show("slow");
            console.log("student form loaded");
            break;
        case("Tutor"):
            $("#studentRegistrationForm").hide();
            $("#tutorRegistrationForm").show("slow");
            console.log("tutor form loaded");
            break;
        default:
            console.log("Error: Account Type not found");
    }
}
/*End Form Functions */

/*Register Functions*/
function registerTutor(){
    var fields = $("#tutorRegistrationForm").serializeArray();
    console.log(fields);
    if (!verifyTutorFields(fields))
        return;
    /*$.ajax({
        type: "POST",
        url: "http://52.38.218.199/TutorStudyServlet/RegisterTutor",
        data: fields,
        success: function(data){
            switch(data){
                case 1:
                    console.log("successfully registered");
                    break;
                default:
                    console.log("error registering");
                    break;
            }
        }
    });*/
}

function verifyTutorFields(fields){
    for(var i in fields){
        if(fields[i].value==null || fields[i].value==""){
            $("#registerInfo").removeClass("alert-success");
            $("#registerInfo").addClass("alert-danger");
            $("#alertInfo").text("Please fill in all required information. You are missing your " +fields[i].name+".");
            $("#registerInfo").show('fast');
            return false;
        }
    }
    var lsuEmail = new RegExp("[a-z]+[0-9]*@lsu.edu");
    if (!lsuEmail.test(fields[1].value)){
        $("#registerInfo").removeClass("alert-success");
        $("#registerInfo").addClass("alert-danger");
        $("#alertInfo").text("Please enter in a valid LSU email.");
        $("#registerInfo").show('fast');
        return false;
    }
    if(fields[2].value!=fields[3].value){
        $("#registerInfo").removeClass("alert-success");
        $("#registerInfo").addClass("alert-danger");
        $("#alertInfo").text("Passwords do not match.");
        $("#registerInfo").show('fast');
        return false;
    }
    return true;
}
/* End Register Functions*/