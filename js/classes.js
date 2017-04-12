/*

This is a custom js for the TutorStudy website.

By: Ryan Ngo

*/

/* Generic Functions */
function loadMajorAbrv(){
     $.ajax({
        type: "GET",
        async: "false",
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
    console.log(CID);
}
/* End Generic Functions */

/* Update User Functions */

/* End Update User Functions */

/* Document Ready Functions */
$(document).ready(function(){
    loadMajorAbrv();
    loadClasses();
});
/* End Document Ready Functions */