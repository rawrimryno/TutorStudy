/*

This is a custom js for the TutorStudy website.

By: Ryan Ngo

*/

/* Generic Functions */
function loadMajorAbrv(){
     $.ajax({
        type: "GET",
        async: false,
        dataType: "json",
        url: "http://52.38.218.199/TutorStudyServlet/GetMajorAbrv",
        success:function(data){
            $("#majorSelect").select2({
                data :  $.map(data, function(data){
                            return{
                                id: data.id,
                                text: data.Abrv         
                            }
                        }),
                createTag: function(){
                    return null;
                }
                        
            });
        }
    });
}

function loadTutors(){
    var fields = [];
    $("#majorSelect option:selected").each(function(i, selected){
        fields[i] = $(selected).text();
    });
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://52.38.218.199/TutorStudyServlet/GetTutors",
        data: {fields:fields}
    }).done(function (response) {
        response = $.map(response, function(data){
                    return{
                        TID: data.TID,
                        Name: data.Name,
                        Major: data.Major,
                        Rate: "$"+data.Rate,
                        AvgRating: data.AvgRating,
                        View: "<button class='btn btn-primary' type='button' onClick='loadTutor("+
                                data.UID+");'>View Tutor</button>"
                    };
                });
        var dynatable = $('#result').dynatable({
            dataset: {
                records: response
            }
        }).data('dynatable');

        dynatable.settings.dataset.originalRecords = response;
        dynatable.process();

        $("#result").show();
    });
}


function loadMajors(){
     $.ajax({
        type: "GET",
        async: false,
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

/* End Generic Functions */

/* Update User Functions */
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
        }
    });
    $("#tutorInfoForm").show('slow');
}
/* End Update User Functions */

/* Document Ready Functions */
$(document).ready(function(){
    loadMajorAbrv();
    loadTutors();
    loadMajors();
    loadClasses();
});
/* End Document Ready Functions */