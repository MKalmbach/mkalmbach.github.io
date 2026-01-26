

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
    .css("top", 50)
    .css("left", 50)
    .appendTo("#die");

});


// ~ ~ TODO 7 - Create a DOT helper function - BEGIN 
//
//              I'm NOT 100% sure how to do this.  
//              Hmmmm.... 

function makeDot(top, left, elementID) // ~ ~ This is my 1st guess for parameter list.

// function makeDot(top, left, dieId) // ~ ~ This is my 2nd guess for parameter list.
{
      $("<div>")
      .css("height", 15)
      .css("width", 15)
      .css("background-color", "blue")
      .css("position", "absolute")
      .css("top", 43)                 // location (43,43) makes dot appear more CENTERED
      .css("left", 43)                // still NOT able to make call to makeDot with different coordinates, hmmmm. 
      .appendTo("#die");
}
// ~ ~ TODO 7 - Create a DOT helper function - END

// ~ ~ checking work of TODO 7 - - so far, TODO 7 is NOT working!    Hmmmmm. 

console.log("--- calling makeDot with (50,50) coordinates -- ")
makeDot(50, 50, "#die"); // middle middle

console.log("--- calling makeDot with (25,25) coordinates -- ")
makeDot(25, 25, "#die"); // top left

console.log("--- calling makeDot with (75,75) coordinates -- ")
makeDot(75, 75, "#die"); // bottom right




// ~ ~ TODO 4.1
function rollDie(dieId)
{
    // console.log("clicked, BABY! \n OH YEAH!");   // ~ ~ TODO 6.2

    // ~ ~ TODO 6.1
    var randomNum = Math.ceil(Math.random() * 6);
    console.log(randomNum);

}


// ~ ~ TODO 4.3
function handleClick()
{
    rollDie("#die");
}



// ~ ~ TODO 4.2
// handleClick();    


// ~ ~ TODO 5
$("#die").on("click", handleClick);



