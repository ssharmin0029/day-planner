var saveButtons = $('.saveBtn');
var timeBlocks = $('.time-block');

// Current Day
var today = moment();
$('#currentDay').text(today.format('dddd, MMMM Do YYYY'));

// Runs once DOM is ready for JS code to execute 
$(document).ready(function () {
    $('textarea').each(function () {
        var parentID = $(this).parent().attr('id');
        $(this).text(localStorage.getItem(parentID));
    });
});

// Color Coding function 
function handleColorCoding() {
    currentHour = moment().hour();

    for (var i = 0; i < timeBlocks.length; i++) {
        var timeBlock = $(timeBlocks[i]);
        var timeBlockHour = timeBlock.data('hour');

        if (currentHour === timeBlockHour) {
            timeBlock.find('.desc').addClass('present');
            // timeBlock.parent().eq(2).addClass('present');
        }
        else if (currentHour > timeBlockHour) {
            timeBlock.find('.desc').removeClass('present');
            timeBlock.find('.desc').addClass('past');
        }
        else {
            timeBlock.find('.desc').removeClass('present');
            timeBlock.find('.desc').removeClass('past'); 
            timeBlock.find('.desc').addClass('future');
        }
    }
}

var checkCurrentHour = setInterval(function () {
    handleColorCoding();
}, 15000);

handleColorCoding();

// Function to handle save 
function handleSave(event) {
    var target = $(event.target);
    var textAreaVal = target.siblings('textarea').val().trim();
    var parentID = target.parent().attr('id');
    localStorage.setItem(parentID, textAreaVal);
}


saveButtons.on("click", handleSave);