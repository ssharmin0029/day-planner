// Variables to refer elements in the document
var saveButtons = $('.saveBtn');
var timeBlocks = $('.time-block');
var clearButton = $('#clearBtn');

// Gets the Current Day, Date and Time
var today = moment();
$('#currentDay').text(today.format('dddd, MMMM Do YYYY [~] LT'));

// Runs when DOM is ready for JS code to execute 
$(document).ready(function () {
    $('textarea').each(function () {
        var parentID = $(this).parent().attr('id');
        $(this).text(localStorage.getItem(parentID));
    });
});

// Saves the text area values in the local storage, using their parent IDs
function handleSave(event) {
    var target = $(event.target);
    var textAreaVal = target.siblings('textarea').val() || target.closest('button').siblings('textarea').val();
    var parentID = target.parent().attr('id') || target.closest('button').parent().attr('id');
    localStorage.setItem(parentID, textAreaVal);
}

// Triggers handleSave on each click 
saveButtons.on("click", handleSave);

// Sets the text area values to empty and clears the local storage
function handleClear() {
    $('textarea').val("");
    localStorage.clear();
}

// Triggers handleClear on click 
clearButton.on("click", handleClear);

// Color Coding function to check past, present and future time-blocks 
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

// Makes function call
handleColorCoding();

// Calls handleColorCoding function every 15 seconds to check the Current Hour  
var checkCurrentHour = setInterval(function () {
    handleColorCoding();
}, 15000);