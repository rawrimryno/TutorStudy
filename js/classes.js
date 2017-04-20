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

function loadClasses(){
    var fields = [];
    $("#majorSelect option:selected").each(function(i, selected){
        fields[i] = $(selected).text();
    });
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://52.38.218.199/TutorStudyServlet/GetClasses",
        data: {fields:fields}
    }).done(function (response) {
        response = $.map(response, function(data){
                            return{
                                CID: data.CID,
                                CNum: data.Abrv +" "+ data.CNum,
                                CName: data.CName,
                                Contact: "<button type='button' class='btn btn-primary' onClick='loadTutors("+data.CID+");'>Find Tutors</button>"         
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

function loadTutors(CID){
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://52.38.218.199/TutorStudyServlet/GetClassTutors",
        data: {CID:CID}
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
                                Rate: "$"+ data.Rate,
                                AvgRating: data.AvgRating,
                                Contact: "<button type='button' class='btn btn-primary' onClick='loadTutor("
                                            +data.UID+");'>View Profile</button>"         
                            };
                        });
        var dynatable = $('#tutors').dynatable({
            dataset: {
                records: response
            }
        }).data('dynatable');

        dynatable.settings.dataset.originalRecords = response;
        dynatable.process();

        $("#tutorContainer").show('slow');
    });
}


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
            if (result.AvgRating  == 0){
                result.AvgRating = '-';
            }else{
                result.AvgRating = Number((result.AvgRating).toFixed(2));
            }
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
/* End Generic Functions */

/* Update User Functions */

/* End Update User Functions */

/* Document Ready Functions */
$(document).ready(function(){
    loadMajorAbrv();
    loadClasses();
    loadTutorFormMajors();
    loadTutorFormClasses();
});
/* End Document Ready Functions */