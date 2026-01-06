/* global $, sessionStorage */

// ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?
// current PROBLEM - - TODO 9 - - wallCollision() function - - 
//                                It detects when the RIGHT wall or LOWER wall is passed
//                                but it DOES NOT detect when the LEFT wall or the UPPER wall is passed. 
//
// FIXED - if LEFT or UPPER boundary is passed, reset x or y value to 0 ! ! 
//
// ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?


// PROBLEM!   After TODO 6, the box does NOT seem to be moving.   Hmmmm ? ? ? ?
//
// FIXED ! !  This happened because the attribute  position: absolute;    was NOT in my      #walker RULE ! ! !

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()

function runProgram() {
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;

  // Constant KEY object  ~ ~ TODO 3 ~ ~
  const KEY = {
    ENTER: 13,
    LEFT: 37,
    UP: 38,
    RIGHT: 39,
    DOWN: 40,
    W_UP: 87,
    A_LEFT: 65,
    S_DOWN: 83,
    D_RIGHT: 68,
  };

  // Game Item Objects

  // ~ ~ TODO 4 - begin ~ ~

  // create the walker object to store position & speed
  var walker = {};
  walker.x = 0;
  walker.y = 0;
  walker.speedX = 0;
  walker.speedY = 0;

  // ~ ~ TODO 4 - end ~ ~

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL); // execute newFrame every 0.0166 seconds (60 Frames per second)

  /* 
  This section is where you set up event listeners for user input.

  For example, if you wanted to handle a click event on the document, 
    you would replace 'eventType' with 'click', 

  and if you wanted to execute a function named 'handleClick', 
    you would replace 'handleEvent' with 'handleClick'.

  Note: You can have multiple event listeners for different types of events.
  */
  // ~ ~ original:   $(document).on("keydown", handleEvent);   ~ ~ ~ changed in TODO 2 ~ ~ ~

  $(document).on("keydown", handleKeyDown);

  $(document).on("keyup", handleKeyUp);   // ~ ~ TODO 8 ~ ~




  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    // console.log("inside newFrame() ")
    // console.log("\t reposition & redraw GameItem ")

    repositionGameItem(); // ~ ~ TODO 5 ~ ~

    wallCollision();      // ~ ~ TODO 9 ~ ~ 

    redrawGameItem();     // ~ ~ TODO 6 ~ ~

  }

  /* 
  This section is where you set up the event handlers for user input.
  For example, if you wanted to make an event handler for a click event, 
  you should rename this function to 'handleClick', 
  then write the code that should execute when the click event occurs.
  
  Note: You can have multiple event handlers for different types of events.
  */
  // ~ ~ original:  function handleEvent(event) {    ~ ~ ~ changed in TODO 2 ~ ~ ~

  function handleKeyDown(event) {
    // console.log(walker.x, walker.y); // ~ ~ TODO 5 ~ ~

    console.log(event.which); // ~ ~ TODO 2 ~ ~

    // ~ ~ TODO 3 ~ ~ log which key is pressed ~ ~
    if (event.which === KEY.LEFT) {
      walker.speedX = walker.speedX - 5;
      console.log("LEFT pressed, speedX = ", walker.speedX);
    }
     // ~ ~ begin TODO 3 ~ ~ log which key is pressed ~ ~


    // code for TODO 7:      adding 5   to speed for X & Y for RIGHT & DOWN
    //                  subtracting 5 from speed for X & Y for LEFT  & UP 
    else if (event.which === KEY.RIGHT) {
      walker.speedX = walker.speedX + 5;
      console.log("LEFT pressed, speedX = ", walker.speedX);

    } else if (event.which === KEY.UP) {
      console.log("UP pressed");
      walker.speedY = walker.speedY - 5;

    } else if (event.which === KEY.DOWN) {
      console.log("DOWN pressed");
      walker.speedY = walker.speedY + 5;

    } else if (event.which === KEY.W_UP) {
      console.log("W-UP pressed");
      walker.speedY = walker.speedY - 5;

    } else if (event.which === KEY.A_LEFT) {
      console.log("A-LEFT pressed");
      walker.speedX = walker.speedX - 5;

    } else if (event.which === KEY.S_DOWN) {
      console.log("S-DOWN pressed");
      walker.speedY = walker.speedY + 5;

    } else if (event.which === KEY.D_RIGHT) {
      console.log("D-RIGHT pressed");
      walker.speedX = walker.speedX + 5;
    }
    // ~ ~ end TODO 3 ~ ~ log which key is pressed ~ ~
  }



  // ~ ~ TODO 8 - begin ~ ~ 

  function handleKeyUp(event) {

    if (event.which === KEY.LEFT) {
      
      walker.speedX = 0;

    } else if (event.which === KEY.RIGHT) {
      
      walker.speedX = 0;

    } else if (event.which === KEY.UP) {
      
      walker.speedY = 0;

    } else if (event.which === KEY.DOWN) {
      
      walker.speedY = 0;

    } else if (event.which === KEY.W_UP) {
      
      walker.speedY = 0;

    } else if (event.which === KEY.A_LEFT) {
      
      walker.speedX = 0;

    } else if (event.which === KEY.S_DOWN) {
      
      walker.speedY = 0;

    } else if (event.which === KEY.D_RIGHT) {
      
      walker.speedX = 0;
    }


  }
  // ~ ~ TODO 8 - end ~ ~ 




  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // ~ ~ TODO 5 - begin ~ ~
  function repositionGameItem() {
    // add the horiz. & vert. speeds to x & y positions
    walker.x = walker.x + walker.speedX;
    walker.y = walker.y + walker.speedY;

    console.log("inside repositionGameItem function")
    console.log("X & speed", walker.x, walker.speedX, "\t Y & speed", walker.y, walker.speedY); // ~ ~ TODO 5 ~ ~
  }
  // ~ ~ TODO 5 - end ~ ~

  // ~ ~ TODO 6 - begin ~ ~
  function redrawGameItem() {
    // console.log("inside redrawGameItem()");
    // console.log("Walker position:", walker.x, walker.y);

    $("#walker").css("left", walker.x);
    $("#walker").css("top", walker.y);
  }
  // ~ ~ TODO 6 - end ~ ~


  // ~ ~ TODO 9 - begin ~ ~
  function wallCollision(){

      // Inside the wallCollision() function:
      // Use if statements to check if the walker object is moving the object beyond the game board edges.

      // Recall that the walker’s x and y properties represent its position on the screen.

      // Use 0 as the minimum (left/top) value for each direction.

      // Use $("#board").width() for the maximum horizontal boundary, and $("#board").height() for the maximum vertical boundary.
      // If a boundary is crossed, subtract the walker’s speed in that direction to "undo" the movement.
    
      // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 

      const maxHorzBoundary = $("#board").width()   -  $("#walker").width(); 
      const maxVertBoundary = $("#board").height()  -  $("#walker").height();

      console.log("-- inside wallCollision() -- x, y values = ", walker.x, walker.y);
      console.log("   MAX =    ", maxHorzBoundary, maxVertBoundary);
      
      var xIsNeg = (walker.x < 0);

      console.log( "\t Is walker.x LESS THAN ZERO ???  -->  ", xIsNeg);


      // let xVal = parseFloat( $(#walker).css('left') );  ~ ~ THIS LED TO ERRORS ~ ~ 


      // ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 

      // Check if WALKER has gone past the RIGHT-most edge of board.
      if (walker.x > maxHorzBoundary)
      {
        // If a boundary is crossed, subtract the walker’s speed in that direction to "undo" the movement.
        walker.x = walker.x - walker.speedX;
      }

      // Check if WALKER has gone past the LEFT-most edge of board.
      // else if (walker.x <= 0)
      else if (walker.x < 0)
      {
        console.log("walker.x is LESS THAN 0, so add speedX to walker.x")
        console.log("BEFORE", "walker.x =", walker.x, "\t and walker.speedX = ", walker.speedX);

        // walker.x = walker.x + walker.speedX;  ~ ~ DOES NOT WORK ~ ~ 
        walker.x = 0;       // ~ ~ Try THIS.  YEP, it works!  ~ ~ 

        console.log("AFTER", "walker.x =", walker.x, "\t and walker.speedX = ", walker.speedX);
      }

      // Check if WALKER has gone past the LOWER-most edge of board.
      else if (walker.y > maxVertBoundary)
      {
        walker.y = walker.y - walker.speedY;
      }

      // Check if WALKER has gone past the UPPER-most edge of board.
      else if (walker.y <= 0)
      {
        // reset y value to 0 
        walker.y = 0;
      }

  }
  // ~ ~ TODO 9 - begin ~ ~


  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
}
