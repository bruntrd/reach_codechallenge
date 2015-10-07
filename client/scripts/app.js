// variables
var next = false;
var user;

//jquery, handles posts
$(document).ready(function() {
    //login submit action
    $('#login').submit(function (event) {
        event.preventDefault();
        var formData = $('#login').serialize();
        user = {
            name: name = login.elements["name"].value
        };
        console.log(formData);
        $.ajax({
            type: "POST",
            url: "/verify",
            data: formData,
            success: function (data) {
                console.log(data);
                console.log(data);
                if(data ==="true"){
                    console.log("this happened");
                    window.location.href = "http://localhost:5000/hours"
                }
                else {
                    console.log("the other happened");
                    alert("incorrect username or password, try again");
                    location.reload();
                }
            }
        });
    });

    $('#saveHours').submit(function(event){
        //save hours action
        var allHours = {
            monday : name = saveHours.elements["Monday"].value,
            tuesday: name = saveHours.elements["Tuesday"].value,
            wednesday : name = saveHours.elements["Wednesday"].value,
            thursday : name = saveHours.elements["Thursday"].value,
            friday : name = saveHours.elements["Friday"].value,
            saturday : name = saveHours.elements["Saturday"].value,
            sunday : name = saveHours.elements["Sunday"].value,
        };
        console.log(allHours);
        event.preventDefault();
        var hours= $('#saveHours').serialize();
        console.log(hours);
        // runs conditionals for hour and days restrictions
        if (next === false) {
            fortyHours(allHours);
        }
        if (next === false) {
            tenHours(allHours);
        }
        if (next === false) {
            weekends(allHours);
        }
        $.ajax({
            type:"POST",
            url:"/hours/save",
            data:hours,
            success:function(data){
                console.log(data);
                alert("hours submitted");
            }
        })
    });
});


//functions for too many hours in a week, day, and days worked

function fortyHours(hours){
    var totalHours = parseInt(hours.sunday) + parseInt(hours.monday) + parseInt(hours.tuesday) + parseInt(hours.wednesday) + parseInt(hours.thursday) + parseInt(hours.friday) + parseInt(hours.saturday);
    console.log(totalHours);
    next=false;
    if (totalHours>40){
        alert("Quit Working So Hard");
        location.reload();
        next=true;
    } else
    {
        return;
    }
}

function tenHours(hours){
    $.each(hours, function(key, value) {
        if (parseInt(value)>9) {
            alert("Too Many Hours!")
            location.reload();
            next = true
        } else {
            return;
        }
    });
}

    function weekends(hours){
        var counter=0;
        $.each(hours, function(key,value){
            if (key == "saturday" && parseInt(value)>0){
                counter ++;
            }
            if (key == "sunday" && parseInt(value)>0){
                counter ++;
            }
            if (key == "monday" && parseInt(value)>0){
                counter ++;
            }
        });
        if (counter > 2){
            alert("Take a day off")
            location.reload();
            next = true;
        }
        else {
            return;
        }
}