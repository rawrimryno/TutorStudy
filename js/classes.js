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
    var params = false;
    $("#majorSelect option:selected").each(function(i, selected){
        fields[i] = $(selected).text();
    });
    if (fields.length > 0)
        params = true;
    $.ajax({
        type: "GET",
        dataType: "json",
        url: "http://52.38.218.199/TutorStudyServlet/GetClasses",
        data: {params: params, fields:fields}
    }).done(function (response) {
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
/* End Generic Functions */

/* Update User Functions */

/* End Update User Functions */

/* Document Ready Functions */
$(document).ready(function(){
    loadMajorAbrv();
});
/* End Document Ready Functions */