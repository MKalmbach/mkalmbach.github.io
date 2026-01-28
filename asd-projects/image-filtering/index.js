
// This is a small program. There are only two sections.
// This first section is what runs as soon as the page loads.
// ------------------------------------------------------------
$(document).ready(function () {
 render($("#display"), image);
 $("#apply").on("click", applyAndRender);
 $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// This function resets the image to its original value.
// DO NOT change this function ! ! !
// ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! !
function resetAndRender() {
 reset();
 render($("#display"), image);
}



// This function applies the filters to the image.
// This is where you should call all of your "apply" functions.
// ------------------------------------------------------------
function applyAndRender() 
{

  // Multiple TODOs: Call your apply function(s) here
  // ------------------------------------------------------------

  // console.log ("- - - Calling applyFilter() - - - ")

  // applyFilter();                                    // ~ ~ TODO 1.2 ~ ~ 

  // applyFilter(reddify);                             // ~ ~ TODO 5.2 ~ ~  
  // applyFilterNoBackground(reddify);                 // ~ ~ TODO 10  ~ ~   

  // applyFilter(decreaseBlue);                        // ~ ~ TODO 7.2 ~ ~  
  // applyFilterNoBackground(decreaseBlue);            // ~ ~ TODO 10  ~ ~  

  // applyFilter(increaseGreenByBlue);                 // ~ ~ TODO 8.2 ~ ~
  // applyFilterNoBackground(increaseGreenByBlue);     // ~ ~ TODO 10  ~ ~ 

  // TODO 10 - apply 4 filters - 2 with background & 2 without background

  applyFilterNoBackground(reddify);
  applyFilterNoBackground(decreaseBlue);
  applyFilter(increaseGreenByBlue);
  applyFilter(decreaseBlue);
  

 // DO NOT change the below line of code
 // ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! ! !
 render($("#display"), image);

} // end of applyAndRender function




/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////



// TODO 1, 2, 3 & 5: Create the applyFilter function here

// ~ ~ TODO 1.1 & 1.3 -- begin ~ ~
// ----------------------------------
function applyFilter(filterFunction)    // ~ ~ TODO 5.1 ~ ~ TODO 5 is correct ! !
{
 // console.log ("INSIDE applyFilter() - - - ")  

 var backgroundColor = image[0][0];    // temporary

 var maxRows = image.length;
 // console.log ("\t max rows = ", maxRows);

 for (var r = 0; r < maxRows; r++)
 {
   var maxCols = image[r].length;
   // console.log("\t max cols = ", maxCols);
  
   for (var c = 0; c < maxCols; c++)
   {
     // ~ ~ TODO 1 ~ ~
     // ** STUDENT suggestion --> also print the values for row & col
     // see if nested loops are accessing each block in image
     // console.log("------------------------")
     // console.log("row = ", r, "   col = ", c, "\t pixel info:", image[r][c] );   // TODO 1

     // ~ ~ TODO 2 - begin ~ ~

     var currentPixel = image[r][c];  // TODO 2.1
    
     var pixelArray = rgbStringToArray(currentPixel);    // TODO 2.2

     filterFunction(pixelArray);   // change the pixel according to the filter

     // ~ ~ LATER, work for TODO 3 - (change pixel color) - will happen here ! ! !   // TODO 2.3
     // -----------------------------------------------------------------------------------------
     // pixelArray[RED] = 200;    // TODO 3 - is correct ! !

     // Apply which ever Filter Function was sent in as an argument.  // TODO 5.3
     //--------------------------------------------------------------------------

     // Convert updated pixel back to a string.
     var updatedPixel = rgbArrayToString(pixelArray);  // TODO 2.4

     // Store updated pixel string back into 2-D array of the image.
     image[r][c] = updatedPixel;   // TODO 2.5

     // dispaly how pixel info is changed from String to Array and the back again
     // console.log("pixel:", pixel);
     // console.log("pixelArray:", pixelArray);
     // console.log("updatedPixel:", updatedPixel);

      // ~ ~ TODO 2 - end - TODO 2 is correct ! ! ! ~ ~

   }
 }
}
// ~ ~ TODO 1.1 & 1.3 -- end -- TODO 1 is correct ! ! !   ~ ~




// ------------------------------------------------------
// TODO 9 Create the applyFilterNoBackground function
// ------------------------------------------------------
function applyFilterNoBackground(filterFunction)      // TODO 9.1
{
 var backgroundColor = image[0][0];                  // TODO 9.2

 var maxRows = image.length;
 for (var r = 0; r < maxRows; r++)
 {
   var maxCols = image[r].length;
   for (var c = 0; c < maxCols; c++)
   {
     // get the current pixel
     var currentPixel  = image [r][c];

     // convert current pixel info to an array
     var pixelArray    = rgbStringToArray(currentPixel);

     // make sure current pixel is NOT part of background
     if ( currentPixel !== backgroundColor )
     {
       // Call whichever Filter Function was sent in as an argument.
       filterFunction(pixelArray); 
     }

     // Convert updated pixel back to a string.
     var updatedPixel = rgbArrayToString(pixelArray);  // TODO 2.4

     // Store updated pixel string back into 2-D array of the image.
     image[r][c] = updatedPixel;   // TODO 2.5


    }
 }
}
// ~ ~ TODO 9 - end
// ------------------------------------------------------



// ------------------------------------------------------
// ~ ~ TODO 6 - begin - Create the keepInBounds function
// ------------------------------------------------------
function keepInBounds(num)
{
 if      (num < 0)     {return 0}
 else if (num > 255)   {return 255}
 else                  {return num}

 // I choose NOT to use a TERNARY.  I prefer to keep is straightforward.
}

// make sure the keepInBounds function is correct
// console.log("when num = -20 --> result = ",  keepInBounds(-20), "\t --- should be 0"   );
// console.log("when num = 300 --> result = ",  keepInBounds(300), "\t --- should be 255" );
// console.log("when num = 125 --> result = ",  keepInBounds(125), "\t --- should be 125" );

// ~ ~ TODO 6 - end - It is CORRECT ! !
// ------------------------------------------------------



// ----------------------------------------------------
// ~ ~ TODO 4 - begin : Create reddify filter function
// ----------------------------------------------------
function reddify(pixelArrayInfo)
{
 pixelArrayInfo[RED] = 200;
}

// Make sure reddify function works!
// var testArray = [100, 100, 100];
// console.log("Test Array orig    = ", testArray); // Should show [100, 100, 100]

// reddify(testArray);
// console.log("Test Array changed = ", testArray); // Should show [250, 100, 100]

// ~ ~ TODO 4 - end - it is CORRECT ! ! 
// ----------------------------------------------------



// --------------------------------------
// TODO 7: Create decreaseBlue function
// --------------------------------------
function decreaseBlue(pixelArrayInfo)
{
 console.log(" begin  decreaseBlue: pixelArrayInfo = ", pixelArrayInfo);

 var blueValue = pixelArrayInfo[BLUE];
 blueValue = keepInBounds(blueValue - 50);
 pixelArrayInfo[BLUE] = blueValue;

 console.log(" end of decreaseBlue: pixelArrayInfo = ", pixelArrayInfo);

}

// // Make sure decreaseBlue function works!
// console.log("\t 1st test of decreaseB")
// var testArray = [100, 200, 20];
// decreaseBlue(testArray);

// console.log("\t 1st test of decreaseB")
// var testArray = [100, 200, 175];
// decreaseBlue(testArray);

// ~ ~ TODO 7 - end - it is CORRECT ! ! 
// ----------------------------------------------------



// --------------------------------------------
// TODO 8: Create increaseGreenByBlue function
// --------------------------------------------
function increaseGreenByBlue(pixelArrayInfo)
{
 console.log(" begin  increaseGreenByBlue: pixelArrayInfo = ", pixelArrayInfo);

 var blueValue   = pixelArrayInfo[BLUE];
 var greenValue  = pixelArrayInfo[GREEN];

 greenValue            = keepInBounds(greenValue + blueValue);
 pixelArrayInfo[GREEN] = greenValue;

 console.log(" begin  increaseGreenByBlue: pixelArrayInfo = ", pixelArrayInfo);

}



// CHALLENGE code goes below here. Not gonna do it.  Wouldn't be prudent!

// ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ 




