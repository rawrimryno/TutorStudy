/*

This is a custom js for the TutorStudy website.

By: Ryan Ngo

*/


/* General Get Functions for data loading */
function getMajors(){
    //note: needed 2 different methods because select2 does not allow multiple dropdown parents
    $("#studentMajorSelect").select2({
        ajax: {
            url: "http://52.38.218.199/TutorStudyServlet/GetMajors",
            processResults: function(data){
                return{
                    results: $.map(data, function(data){
                        return{
                            id: data.id,
                            text: data.major         
                        }
                    })
                }
            }
        },
        dropdownParent: $("#studentRegistrationForm"),
        createTag: function () {
            // Disable tagging
            return null;
        }
    });
    $("#tutorMajorSelect").select2({
        ajax: {
            url: "http://52.38.218.199/TutorStudyServlet/GetMajors",
            processResults: function(data){
                return{
                    results: $.map(data, function(data){
                        return{
                            id: data.id,
                            text: data.major         
                        }
                    })
                }
            }
        },
        dropdownParent: $("#tutorRegistrationForm"),
        createTag: function () {
            // Disable tagging
            return null;
        }
    });
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
    console.log($("#tutorRegistrationForm").serializeArray());
}
/* End Register Functions*/