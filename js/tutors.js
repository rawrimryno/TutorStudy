/*

This is a custom js for the TutorStudy website.

By: Ryan Ngo

*/

/* Generic Functions */

function loadTutors(){
    var fields = [];
    $("#majorSelect option:selected").each(function(i, selected){
        fields[i] = $(selected).val();
    });
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://52.38.218.199/TutorStudyServlet/GetTutors",
        data: {fields:fields}
    }).done(function (response) {
        response = $.map(response, function(data){
                    if (data.AvgRating  == 0){
                        data.AvgRating = '-';
                    }else{
                        data.AvgRating = Number((data.AvgRating).toFixed(2));
                    }
                    return{
                        TID: data.TID,
                        Name: data.Name,
                        Major: data.Major,
                        Rate: "$"+data.Rate,
                        AvgRating: data.AvgRating+"/5",
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
            $("#majorSelect").select2({
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
            if (data.AvgRating  == 0){
                data.AvgRating = '-';
            }else{
                data.AvgRating = Number((data.AvgRating).toFixed(2));
            }
            var result = data;
            $("#classSelect").val(result.classes).trigger('change');
            $("#studentInfoForm").hide();
            $("#tutorInfoForm input[name='name']").val(result.name);
            $("#tutorInfoForm input[name='email']").val(result.email);
            $("#tutorInfoForm textarea[name='description']").val(result.Description);
            $("#tutorInfoForm input[name='rate']").val(result.Rate);
            $("#tutorMajorSelect").val(result.MID).trigger('change');
            $("#tutorInfoForm input[name='avgRating']").val(result.AvgRating+"/5");
            $("#scheduleSession").click(function(){
                window.location.replace("./contact.html?Tutor="+UID);
            });
            $("#TID").val(result.TID);
            $("#reviewsContainer").hide('slow');
        }
    });
    $("#tutorInfoForm").show('slow');
}

function loadReviews(){
    $.ajax({
        type:"GET",
        data: {TID: $("#TID").val()},
        dataType: "JSON",
        url: "http://52.38.218.199/TutorStudyServlet/GetReviews"
    }).done(function (response) {
        var dynatable = $('#reviews').dynatable({
            dataset: {
                records: response
            }
        }).data('dynatable');

        dynatable.settings.dataset.originalRecords = response;
        dynatable.process();

        $("#reviewsContainer").show();
    });
}
/* End Update User Functions */

/* Document Ready Functions */
$(document).ready(function(){
    loadTutors();
    loadMajors();
    loadClasses();
});
/* End Document Ready Functions */