

// ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! 
// CURRENT PROGRESS - I'm working on TODO 7, but it's not quite right  ! 
// ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! 

$(document).ready(function () {

  // Your code goes here

  // ~ ~ TODO 3.1 - Create a DOT with JQuery
  $("<div>")
    .css("height", 15)
    .css("width", 15)
    .css("background-color", "hotPink")
    .css("position", "absolute")
    .css("top",  43)
    .css("left", 43)
    .appendTo("#die");

});


// ~ ~ TODO 7 - Create a DOT helper function - BEGIN 
//
//              I'm NOT 100% sure how to do this.  
//              Hmmmm.... 

//function makeDot(top, left, elementID) // ~ ~ This is my 1st guess for parameter list.

function makeDot(top, left, dieId) // ~ ~ This is my 2nd guess for parameter list.
{
      $("<div>")
      .css("height", 15)
      .css("width", 15)
      .css("background-color", "blue")
      .css("position", "absolute")
      .css("top", top)                 // location (43,43) makes dot appear more CENTERED
      .css("left", left)                // still NOT able to make call to makeDot with different coordinates, hmmmm. 
      .appendTo(dieId);
}
// ~ ~ TODO 7 - Create a DOT helper function - END

// ~ ~ checking work of TODO 7 - - so far, TODO 7 is NOT working!    Hmmmmm. 

// console.log("--- calling makeDot with (43,43) coordinates -- ")
// makeDot(43, 43, "#die"); // middle middle

// console.log("--- calling makeDot with (18,18) coordinates -- ")
// makeDot(18, 18, "#die"); // top left

// console.log("--- calling makeDot with (67,67) coordinates -- ")
// makeDot(67, 67, "#die"); // bottom right


// ~ ~ TODO 4.1
function rollDie(dieId)
{
    // ~ ~ TODO 9 - clear existing dots from die
    $(dieId).empty();


    // ~ ~ TODO 6.1
    var randomNum = Math.ceil(Math.random() * 6);
    console.log("die clicked", randomNum);        // ~ ~ TODO 6.2 - checking work

    // ~ ~ TODO 8 - add dots to die base on randomNum value 
    if (randomNum === 1) 
    {
        makeDot(43, 43, "#die"); // middle middle
    } 
    else if (randomNum === 2) 
    {
        makeDot(18, 18, "#die"); // top left
        makeDot(67, 67, "#die"); // bottom right
    } 
    else if (randomNum === 3) 
    {
        makeDot(18, 18, "#die"); // top left
        makeDot(67, 67, "#die"); // bottom right
        makeDot(43, 43, "#die"); // middle middle
    } 
    else if (randomNum === 4) 
    {
        makeDot(67, 67, "#die"); // bottom right
        makeDot(18, 18, "#die"); // top left
        makeDot(18, 67, "#die"); // bottom left
        makeDot(67, 18, "#die"); // top right
    } 
    else if (randomNum === 5) 
    {
        makeDot(43, 43, "#die"); // middle middle
        makeDot(67, 67, "#die"); // bottom right
        makeDot(18, 18, "#die"); // top left
        makeDot(18, 67, "#die"); // bottom left
        makeDot(67, 18, "#die"); // top right
    }
    else if (randomNum === 6) 
    {   
        makeDot(18, 18, "#die"); // top    left
        makeDot(67, 18, "#die"); // top    right

        makeDot(43, 18, "#die"); // middle left
        makeDot(43, 67, "#die"); // middle right

        makeDot(18, 67, "#die"); // bottom left
        makeDot(67, 67, "#die"); // bottom right 
    }
}



// ~ ~ TODO 4.2
function handleClick()
{
    rollDie("#die");
}



// ~ ~ TODO 4.2
//handleClick();      // at TODO 5, this line is commented out.       

// ~ ~ TODO 5
//     This tells the browser: 
//     “When the element with the ID die is clicked, 
//      run the handleClick function.”
$("#die").on("click", handleClick);



