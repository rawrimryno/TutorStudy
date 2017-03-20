/*

This is a custom js for the TutorStudy website.

By: Ryan Ngo

*/


/* General Get Functions for data loading */
function getMajors(){
    $.ajax({
        dataType: "json",
        url: "http://52.38.218.199/TutorStudyServlet/GetMajors",
        success:function(data){
            $("#majorSelect").select2({
                data:data
            });
        }
    });
    /*$.ajax({
        type: "GET",
        url: "http://52.38.218.199/TutorStudyServlet/GetMajors",
        contentType:"application/json",
        success: function(data){
            console.log(JSON.stringify(data));
            return data;
        }
    })*/
}
/* End General Get Functions */

/* General Load Functions */
/* End General Load Functions */

/*Form Functions*/
function changeRegisterForm(type){
    var accountType = type.value;
    switch(accountType){
        case("Student"):
            $("#tutorRegistrationForm").hide();
            $("#studentRegistrationForm").show("slow");
            console.log("student form loaded");
            break;
        case("Tutor"):
            $("#studentRegistrationForm").hide();
            $("#tutorRegistrationForm").show("slow");
            getMajors();
            console.log("tutor form loaded");
            break;
        default:
            console.log("Error: Account Type not found");
    }
}
/*End Form Functions */