/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort


// TODO 3: Implement quickSort


// TODOs 4 & 5: Implement partition


// ~ ~ TODO 1: Implement swap of elements at indexes i & j 
function swap(array, i, j)
{
    console.log("BEGIN swap() function");
    console.log("i=",i, "j=", j, "array[i]=", array[i], "array[j]=", array[j]);
    

    // make a copy of the element at index i
    var elementCopy = array[i];

    // store the element at index j in position i
    array[i] = array[j];

    // store the copy of the element at index i in position j
    array[j] = elementCopy; 


    console.log("END   swap() function");
    console.log("i=",i, "j=", j, "array[i]=", array[i], "array[j]=", array[j]);

    // draw a visual rep. of the swap ~ ~ TODO 1.2 
    drawSwap(array, i, j);
}


///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep()
{
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j)
{
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter)
{
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}