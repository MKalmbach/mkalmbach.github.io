
/* global $, sessionStorage*/

////////////////////////////////////////////////////////////////////////////////
///////////////////////// VARIABLE DECLARATIONS ////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// HTML jQuery Objects
var board = $("#board");
var scoreElement = $("#score");
var highScoreElement = $("#highScore");

// Game Variables
var score = 0; // variable to keep track of the score
var started = false; // variable to keep track of whether the game has started

// TODO 4, Part 1: Create the apple variable
var apple = {}; // ?? is this supposed to be a var or a const ??

// TODO 5, Part 1: Create the snake variable
const snake = {};

// Constant Variables
var ROWS = 20;
var COLUMNS = 20;
var SQUARE_SIZE = 20;
var KEY = {
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
};

// interval variable required for stopping the update function when the game ends
var updateInterval;

// variable to keep track of the key (keycode) last pressed by the user
var activeKey;

////////////////////////////////////////////////////////////////////////////////
////////////////////////////// GAME SETUP //////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

// TODO: turn on keyboard inputs
$("body").on("keydown", handleKeyDown);

// start the game
init();

function init() 
{
  // TODO 5, Part 2: initialize the snake  ~ ~ ??? I think this is Part 3 of TODO 5 ????
  snake.body = [];                // Start with an empty body
  makeSnakeSquare(10, 10);        // Create the first square in the middle of the board
  makeSnakeSquare(10, 9);         // Create a second square to the left of the first
  makeSnakeSquare(10, 8);         // Create a third square to the left of the second
  snake.head = snake.body[0];     // Mark the first segment as the head
  snake.head.direction = "right"; // Initialize direction of the head


  // TODO 4, Part 3: initialize the apple
  makeApple();

  // TODO 6, Part 1: Initialize the interval
  updateInterval = setInterval(update, 200);
}

////////////////////////////////////////////////////////////////////////////////
///////////////////////// PROGRAM FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/*
 * On each update tick update the snake's position and check for
 * collisions with the walls.
 */
function update() 
{

  // TODO 6, Part 2: Fill in the update function's code block
  if (started) 
  {
    moveSnake();
  }

  if (hasHitWall() || hasCollidedWithSnake()) 
  {
    console.log("\n\n --- Game Over! ---- \n\n  ");
    endGame();
  }

  if (hasCollidedWithApple()) 
  {
    handleAppleCollision();
  }
}



function checkForNewDirection(event) 
{
  /* 
  TODO 7.4: Update snake.head.direction based on the value of activeKey.

  BONUS: Only allow direction changes to take place if the new direction is
  perpendicular to the current direction
  */

  // console.log("/n/nChecking for new direction...");
  // console.log("snake head direciton = ", snake.head.direction);
  // console.log("active key = ", activeKey);

  if (snake.head.direction === "left" || snake.head.direction === "right") 
  {
    if (activeKey === KEY.UP) 
    {
      snake.head.direction = "up";
    } 
    else if (activeKey === KEY.DOWN) 
    {
      snake.head.direction = "down";
    }
  } 
  else if (snake.head.direction === "up" || snake.head.direction === "down") 
  {
    if (activeKey === KEY.LEFT) 
    {
      snake.head.direction = "left";
    } 
    else if (activeKey === KEY.RIGHT) 
    {
      snake.head.direction = "right";
    }
  }


  // ~ ~ ~ the work of TODO 7.5 (without the BONUS) ~ ~ ~

  // if (activeKey === KEY.LEFT) 
  // {
  //   snake.head.direction = "left";
  // }

  // // FILL IN THE REST ~ ~ the work of TODO 7.6 ~ ~ ~ 
  // else if (activeKey === KEY.RIGHT) 
  // {
  //   snake.head.direction = "right";
  // } 
  // else if (activeKey === KEY.UP) 
  // {
  //   snake.head.direction = "up";
  // } 
  // else if (activeKey === KEY.DOWN) 
  // {
  //   snake.head.direction = "down";
  // }
  
  console.log(snake.head.direction);     // uncomment me!
}
// end of function checkForNewDirection(event)






function moveSnake() 
{
  /* 
        > > > > > START HERE < < < < < < <

    TODO 10: Move each part of the snake's body such that it's body follows the head.
    
    HINT: To complete this TODO we must figure out the next direction, row, and 
    column for each snakeSquare in the snake's body. The parts of the snake are 
    stored in the Array snake.body and each part knows its current 
    column/row properties. 
  */

  // for loop begins at the end of the snake (snake.body.length - 1)
  // for loop ends at 1 (not 0 because that is the head and is is handled separately)
  for (var i = snake.body.length - 1; i >=  1; i--) 
  {
    var currentSnakeSquare = snake.body[i];
    var snakeSquareInFront = snake.body[i - 1]; 

    moveBodyAToBodyB(currentSnakeSquare, snakeSquareInFront);
    repositionSquare(currentSnakeSquare);
  }

  // Before moving the head, check for a new direction from the keyboard input
  checkForNewDirection();         // ~ ~ ~ I think this goes with TODO 8 ~ ~ ~

  /* 
    TODO 8: determine the next row and column for the snake's head
    
    HINT: The snake's head will need to move forward 1 square based on the value
    of snake.head.direction which may be one of "left", "right", "up", or "down"
  */
  if (snake.head.direction === "left") {
    snake.head.column = snake.head.column - 1;
  } else if (snake.head.direction === "right") {
    snake.head.column = snake.head.column + 1;
  } else if (snake.head.direction === "up") {
    snake.head.row = snake.head.row - 1;
  } else if (snake.head.direction === "down") {
    snake.head.row = snake.head.row + 1;
  }

  repositionSquare(snake.head);

} // end of function moveSnake()




// TODO 9.2: Create a new helper function called moveBodyAToBodyB(bodyA, bodyB)

function moveBodyAToBodyB(bodyA, bodyB) 
{
  // TODO 9.3: Set bodyA's row, column, and direction properties to match bodyB's.
  bodyA.row       = bodyB.row;
  bodyA.column    = bodyB.column;
  bodyA.direction = bodyB.direction;

} // end of function moveBodyAToBodyB(bodyA, bodyB)



// ~ ~ ~ TODO 9.4: Test 1 of above function ~ ~ ~
//
// var bodyA = { row: 5, column: 5, direction: "right" };
// var bodyB = { row: 6, column: 5, direction: "down" };
//
// console.log(`before moving, body A: ${JSON.stringify(bodyA)}`); 
// // Should log: { row: 5, column: 5, direction: "right" }
//
// moveBodyAToBodyB(bodyA, bodyB);
//
// console.log(`after moving, body A: ${JSON.stringify(bodyA)}`); 
// // Should log: { row: 6, column: 5, direction: "down" } || Note the match with bodyB
//
// ~ ~ ~ TODO 9.4: Test 1 WORKED, so I am commenting it out ~ ~ ~


// ~ ~ ~ TODO 9.4: Test 2 of above function ~ ~ ~
//
// console.log("Moving body A to body B...");
// setTimeout(() => {
//   moveBodyAToBodyB(snake.body[1], snake.head);
//   repositionSquare(snake.body[1]);
// }, 2_000);
//
// ~ ~ ~ TODO 9.4: Test 2 WORKED, so I am commenting it out ~ ~ ~



function hasHitWall() 
{
  /* 
    TODO 11: Should return true if the snake's head has collided 
    with any of the four walls of the board.  Otherwise, return false.
    
    HINT: What will the row and column of the snake's head be if this were the case?
  */

    // console.log(" board width = ", COLUMNS);
    // console.log(" board height = ", ROWS);
    // console.log(" snake head column = ", snake.head.column);
    // console.log(" snake head row = ", snake.head.row);

  if (   snake.head.column <= 0           //  left wall
      || snake.head.column >= COLUMNS     //  right wall
      || snake.head.row <= 0              //  top wall
      || snake.head.row >= ROWS )         //  bottom wall
  { 
    console.log("\n\t ! head COLLIDED with WALL ! \n");
    return true;
  }
  else
  {
    return false;
  }

} // end of function hasHitWall()



function hasCollidedWithApple() 
{
  /* 
    TODO 12: Should return true if the snake's head has collided with the apple, 
    false otherwise
    
    HINT: Both the apple and the snake's head are aware of their own row and column
  */

  if (snake.head.row === apple.row && snake.head.column === apple.column) 
  {
    return true;
  }
  else
  {
    return false;
  }
  
} // end of function hasCollidedWithApple()



function handleAppleCollision() 
{
  // increase the score and update the score DOM element
  score++;
  scoreElement.text("Score: " + score);

  // Remove existing Apple and create a new one
  apple.element.remove();
  makeApple();

  var row = snake.tail.row;
  var column = snake.tail.column;

  makeSnakeSquare(row, column);

} // end of function handleAppleCollision()



function hasCollidedWithSnake() 
{
  // console.log("Checking for collision of snake head with snake body ");
  // console.log("snake length = ", snake.body.length);

  // console.log("snake head at row ", snake.head.row,
  //             " column ", snake.head.column);
  /* 
    TODO 13: Should return true if the snake's head has collided with any part of the
    snake's body.
    
    HINT: Each part of the snake's body is stored in the snake.body Array. The
    head and each part of the snake's body also knows its own row and column.
  */

    // loop through each part of the snake's body (start at index 1 to skip the head)
    for (var i = 1; i < snake.body.length; i++) 
    {
      // console.log("checking body part ", i);

      var currentSnakeSquare = snake.body[i];

      // console.log("\t current square at row ", currentSnakeSquare.row,
      //             " column ", currentSnakeSquare.column); 
      

      // check if the head's row and column match the current snakeSquare's row and column
      if (snake.head.row === currentSnakeSquare.row 
          && 
          snake.head.column === currentSnakeSquare.column)
      {
        console.log("\n\t ! head COLLIDED with body part ! ", i, "\n");
        return true
      }
      
    } // end of for loop checking each part of the snake's body for collision


    // if no collision detected, return false
    // console.log("NO COLLISION occurred");
    return false;

} // end of function hasCollidedWithSnake()



function endGame() 
{
  // stop update function from running
  clearInterval(updateInterval);
  started = false; // reset the started variable

  // clear board of all elements
  board.empty();

  // update the highScoreElement to display the highScore
  highScoreElement.text("High Score: " + calculateHighScore());
  scoreElement.text("Score: 0");
  score = 0;

  // restart the game after 500 ms
  setTimeout(init, 500);
}



////////////////////////////////////////////////////////////////////////////////
////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////

/* Create an HTML element for the apple using jQuery. Then find a random
 * position on the board that is not occupied and position the apple there.
 */
function makeApple() 
{
  // TODO 4, Part 2: Fill in this function's code block

  // make the apple jQuery Object and append it to the board
  apple.element = $("<div>").addClass("apple").appendTo(board);

  // get a random available row/column on the board
  var randomPosition = getRandomAvailablePosition();

  // initialize the row/column properties on the Apple Object
  apple.row = randomPosition.row;
  apple.column = randomPosition.column;

  // position the apple on the screen
  repositionSquare(apple);
}


/*  Create an HTML element for a snakeSquare using jQuery. 
    Then, given a row and column on the board, position it on the screen. 
    Finally, add the new snakeSquare to the snake.body Array and set a new tail.
 */
function makeSnakeSquare(row, column) 
{
  // TODO 5, Part 2: Fill in this function's code block
  // initialize a new snakeSquare Object
  const snakeSquare = {};

  // make the snakeSquare element and add it to the board
  snakeSquare.element = $("<div>").addClass("snake").appendTo(board);

  // assign the row and column position
  snakeSquare.row = row;
  snakeSquare.column = column;

  // set the snake’s position visually
  repositionSquare(snakeSquare);

  // if this is the head, give it a unique ID
  if (snake.body.length === 0) {
    snakeSquare.element.attr("id", "snake-head");
  }

  // add the square to the snake’s body and update the tail
  snake.body.push(snakeSquare);
  snake.tail = snakeSquare;
}


/* 
  event.which returns the keycode of the key that is pressed when the
  keydown event occurs
  
  The KEY Object creates a map for the Arrow Keys to their keycode:

    KEY.LEFT = 37
    KEY.UP = 38
    KEY.RIGHT = 39
    KEY.DOWN = 40
*/
function handleKeyDown(event) 
{
  // TODO 7.2: make the handleKeyDown function register which key is pressed
  activeKey = event.which;
  // console.log("active key = ", activeKey);

  // If a valid direction key is pressed, start the game
  if (
      event.which === KEY.LEFT  ||
      event.which === KEY.RIGHT ||
      event.which === KEY.UP    ||
      event.which === KEY.DOWN
    ) 
  {
    started = true; // the game starts when the first key is pressed
  }
}// end of function handleKeyDown(event)



/* Given a gameSquare (which may be a snakeSquare or the apple), 
   positiont the gameSquare on the screen.
 */
function repositionSquare(square) 
{
  var squareElement = square.element;
  var row = square.row;
  var column = square.column;

  var buffer = 20;

  // position the square on the screen according to the row and column
  squareElement.css("left", column * SQUARE_SIZE + buffer);
  squareElement.css("top", row * SQUARE_SIZE + buffer);
}



/* Returns a (row,column) Object that is not occupied by another game component
 */
function getRandomAvailablePosition() 
{
  var spaceIsAvailable;
  var randomPosition = {};

  /* Generate random positions until one is found that doesn't overlap with the snake */
  while (!spaceIsAvailable) 
  {
    randomPosition.column = Math.floor(Math.random() * COLUMNS);
    randomPosition.row = Math.floor(Math.random() * ROWS);
    spaceIsAvailable = true;

    /*
      TODO 14: After generating the random position, make sure the position is
      not occupied by a snakeSquare in the snake's body (including head). 
      If it is,  then set spaceIsAvailable to false so that a new position is generated.
    */

    for (var i = 0; i < snake.body.length; i++) 
    {
      var currentSnakeSquare = snake.body[i];

      if (   randomPosition.row === currentSnakeSquare.row
          && randomPosition.column === currentSnakeSquare.column)
      {
        spaceIsAvailable = false;  // this forces while loop to try again to find a new position
      }
    } // end of for loop checking each part of the snake's head & body

  } // end of while loop searching for available position

  return randomPosition;

} // end of function getRandomAvailablePosition()



function calculateHighScore() 
{
  // retrieve the high score from session storage if it exists, or set it to 0
  var highScore = sessionStorage.getItem("highScore") || 0;

  if (score > highScore) {
    sessionStorage.setItem("highScore", score);
    highScore = score;
    alert("New High Score!");
  }

  return highScore;
}
