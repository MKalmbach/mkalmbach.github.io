// - - -   ORIGINAL init.js from OPERATION SPARK - - - 

// - - -   I am trying to START OVER from SCRATCH ! - - - 


var init = function (window) {
    'use strict';
    var 
        draw = window.opspark.draw,
        physikz = window.opspark.racket.physikz,
        
        app = window.opspark.makeApp(),
        canvas = app.canvas, 
        view = app.view,
        fps = draw.fps('#000');
        
    
    window.opspark.makeGame = function() {
        
        window.opspark.game = {};
        var game = window.opspark.game;
        
        ///////////////////
        // PROGRAM SETUP //
        ///////////////////
        
        // TODO 1 : Declare and initialize our variables
        var circle;
        var circles = [];


        // TODO 2 : Create a function that draws a circle 
        function drawCircle()
        {
            // create circle
            //randomCircleInArea(area, randomizeAlpha, addCross, borderColor, borderThickness, randomRadialProps ) 
            circle = draw.randomCircleInArea( canvas, true, true, "#999", 2 );

            // set motion properties of circle
            physikz.addRandomVelocity( circle, canvas, 5, 5 );

            // add circle to the array & to the view 
            view.addChild(circle);
            circles.push(circle);
        }


        // TODO 3 : Call the drawCircle() function - - now this is COMMENTED OUT 
        /*
        drawCircle();
        drawCircle();
        drawCircle();
        drawCircle();
        drawCircle();
        */


        // TODO 7 : Use a loop to create multiple circles

        //for (var i = 0; i < 10; i++)      // sparse - slow - boring
        //for (var i = 0; i < 100; i++)     // graceful movement - still a bit of white space 
        for (var i = 0; i < 500; i++)     // full grid - very busy - things are hopping
        //for (var i = 0; i < 5000; i++)    // crowded grid - sluggish
        {
            drawCircle();
        }




        ///////////////////
        // PROGRAM LOGIC //
        ///////////////////
        
        /* 
        This Function is called 60 times/second, producing 60 frames/second.
        In each frame, for every circle, it should redraw that circle
        and check to see if it has drifted off the screen.         
        */
        function update() 
        {
            // TODO 4 : Update the position of each circle        ~ ~ COMMENTED OUT! 
            //          using physikz.updatePosition() 
            /*
            physikz.updatePosition(circles[0]);
            physikz.updatePosition(circles[1]);
            physikz.updatePosition(circles[2]);
            physikz.updatePosition(circles[3]);
            physikz.updatePosition(circles[4]);
            */

            
            // TODO 5 : Call game.checkCirclePosition() on your circles ~ ~ COMMENTED OUT! 
            /*
            game.checkCirclePosition(circles[0]);  
            game.checkCirclePosition(circles[1]);  
            game.checkCirclePosition(circles[2]);  
            game.checkCirclePosition(circles[3]);  
            game.checkCirclePosition(circles[4]);  
            */

           

            // TODO 8 / TODO 9 : Iterate over the array
            // for each circle, 
            //     update the position 
            //     check to see if circle has drifted off screen and adjust
            for (var i = 0; i < circles.length; i++) 
            {
                // Code to update each circle
                physikz.updatePosition(circles[i]);
                game.checkCirclePosition(circles[i]);  
            }
           
        }// end of update FUNCTION
    

        /* 
        This Function should check the position of a circle that is passed to the 
        Function. If that circle drifts off the screen, this Function should move
        it to the opposite side of the screen.
        */
        game.checkCirclePosition = function(circle) {

            // if the circle has gone past the RIGHT side of the screen then place it on the LEFT
            if ( circle.x > canvas.width ) 
            {
                circle.x = 0;
            }
            
            // TODO 6 : YOUR CODE STARTS HERE //////////////////////

            // if the circle has gone past the LEFT side of the screen then place it on the RIGHT
            if ( circle.x < 0 ) 
            {
                circle.x = canvas.width;
            }

            // if the circle has gone past the BOTTOM side of the screen then place it on the TOP
            if ( circle.y > canvas.height ) 
            {
                circle.y = 0;
            }

            // if the circle has gone past the TOP side of the screen then place it on the BOTTOM
            if ( circle.y < 0 ) 
            {
                circle.y = canvas.height;
            }
            


            // YOUR TODO 6 CODE ENDS HERE //////////////////////////
        }
        
        /////////////////////////////////////////////////////////////
        // --- NO CODE BELOW HERE  --- DO NOT REMOVE THIS CODE --- //
        /////////////////////////////////////////////////////////////
        
        view.addChild(fps);
        app.addUpdateable(fps);
        
        game.circle = circle;
        game.circles = circles;
        game.drawCircle = drawCircle;
        game.update = update;
        
        app.addUpdateable(window.opspark.game);
    }
};

// DO NOT REMOVE THIS CODE //////////////////////////////////////////////////////
if((typeof process !== 'undefined') &&
    (typeof process.versions.node !== 'undefined')) {
    // here, export any references you need for tests //
    module.exports = init;
}


