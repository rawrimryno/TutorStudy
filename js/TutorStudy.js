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
            break;
        case("Tutor"):
            $("#studentRegistrationForm").hide();
            $("#tutorRegistrationForm").show("slow");
            break;
        default:
            console.log("Error: Account Type not found");
    }
}
/*End Form Functions */

/*Register Functions*/
function registerTutor(){
    var fields = $("#tutorRegistrationForm").serializeArray();
    if (!verifyFields(fields))
        return;
    fields = $("#tutorRegistrationForm").serialize();
    $.ajax({
        type: "POST",
        url: "http://52.38.218.199/TutorStudyServlet/RegisterTutor",
        data: fields,
        success: function(data){
            $("#registerInfo").removeClass("alert-danger");
            $("#registerInfo").removeClass("alert-success");
            $("#registerInfo").addClass("alert-info");
            $("#alertRegisterInfo").text(data);
            $("#registerInfo").show('fast');
            setTimeout(function(){$("#registerInfo").hide('fast');}, 2000);
            setTimeout(function(){$("#tutorRegistrationForm").hide('slow');},500);
        }
    });
}

function registerStudent(){
    var fields =$("#studentRegistrationForm").serializeArray();
    if (!verifyFields(fields))
        return;
    fields = $("#studentRegistrationForm").serialize();
    $.ajax({
        type: "POST",
        url: "http://52.38.218.199/TutorStudyServlet/RegisterStudent",
        data: fields,
        success: function(data){
            $("#registerInfo").removeClass("alert-danger");
            $("#registerInfo").removeClass("alert-success");
            $("#registerInfo").addClass("alert-info");
            $("#alertRegisterInfo").text(data);
            $("#registerInfo").show('fast');
            setTimeout(function(){$("#registerInfo").hide('fast');}, 2000);
            setTimeout(function(){$("#studentRegistrationForm").hide('slow');},500);
        }
    });
}

function verifyFields(fields){
    for(var i in fields){
        if(fields[i].value==null || fields[i].value==""){
            $("#registerInfo").removeClass("alert-success");
            $("#registerInfo").addClass("alert-danger");
            $("#alertRegisterInfo").text("Please fill in all required information. You are missing your " +fields[i].name+".");
            $("#registerInfo").show('fast');
            setTimeout(function(){$("#registerInfo").hide('fast');}, 2000);
            return false;
        }
    }
    var lsuEmail = new RegExp("[a-z]+[0-9]*@lsu.edu$");
    if (!lsuEmail.test(fields[1].value)){
        $("#registerInfo").removeClass("alert-success");
        $("#registerInfo").addClass("alert-danger");
        $("#alertRegisterInfo").text("Please enter in a valid LSU email.");
        $("#registerInfo").show('fast');
        setTimeout(function(){$("#registerInfo").hide('fast');}, 2000);
        return false;
    }
    if(fields[2].value!=fields[3].value){
        $("#registerInfo").removeClass("alert-success");
        $("#registerInfo").addClass("alert-danger");
        $("#alertRegisterInfo").text("Passwords do not match.");
        $("#registerInfo").show('fast');
        setTimeout(function(){$("#registerInfo").hide('fast');}, 2000);
        return false;
    }
    return true;
}

/* End Register Functions*/
/* Login Functions */
function Login(){
    var lsuEmail = new RegExp("[a-z]+[0-9]*@lsu.edu$");
    if (!lsuEmail.test($("#loginForm input[name=email]").val())){
        $("#loginInfo").removeClass("alert-success");
        $("#loginInfo").addClass("alert-danger");
        $("#alertLoginInfo").text("Please enter in a valid LSU email.");
        $("#loginInfo").show('fast');
        setTimeout(function(){$("#loginInfo").hide('fast');}, 2000);
    }else{
        var fields = $("#loginForm").serialize();
        $.ajax({
            type: "POST",
            url: "http://52.38.218.199/TutorStudyServlet/Login",
            data: fields,
            success: function(data){
                $("#loginInfo").removeClass("alert-danger");
                $("#loginInfo").removeClass("alert-success");
                $("#loginInfo").addClass("alert-info");
                $("#alertLoginInfo").text(data);
                $("#loginInfo").show('fast');
                if (data.includes("Success")){
                    loadUser();
                    setTimeout(function(){
                        $("#loginForm").hide('slow');
                        $("#loginInfo").hide('slow');
                    }, 2000);
                }
            }
        });
    }
}
/* End Login Functions */

/* Document Load Functions */
$(document).ready(function(){
    loadUser();
});
/* End Document Load Functions */

/* Misc User Functions */
function loadUser(){
    $.ajax({
        type: "GET",
        url: "http://52.38.218.199/TutorStudyServlet/GetUserName",
        success: function(data){
            var result = $.trim(data);
            $("#username").text(result);
            if (result === "Guest"){
                $(".userOptions").hide();
            }else{
                $(".userOptions").show();
            }
        }
    });
}

function logout(){
    $.ajax({
        type: "GET",
        url: "http://52.38.218.199/TutorStudyServlet/Logout"
    });
    window.location.replace("http://52.38.218.199/TutorStudy");
}

function checkLogin(){
    $.ajax({
        type: "GET",
        async: false,
        url: "http://52.38.218.199/TutorStudyServlet/CheckLogin",
        success: function(data){
            var result = $.trim(data);
            if (result =="false"){
                alert("You must be logged in to access this content.");
                window.location.replace("http://52.38.218.199/TutorStudy/");
            }
        }
    });
}
/* End Misc User Functions */