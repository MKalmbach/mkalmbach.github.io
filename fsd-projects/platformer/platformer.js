$(function () {
  // initialize canvas and context when able to
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  window.addEventListener("load", loadJson);

  function setup() {
    if (firstTimeSetup) {
      halleImage = document.getElementById("player");
      projectileImage = document.getElementById("projectile");
      cannonImage = document.getElementById("cannon");
      $(document).on("keydown", handleKeyDown);
      $(document).on("keyup", handleKeyUp);
      firstTimeSetup = false;
      //start game
      setInterval(main, 1000 / frameRate);
    }

    // Create walls - do not delete or modify this code
    createPlatform(-50, -50, canvas.width + 100, 50); // top wall
    createPlatform(-50, canvas.height - 10, canvas.width + 100, 200, "navy"); // bottom wall
    createPlatform(-50, -50, 50, canvas.height + 500); // left wall
    createPlatform(canvas.width, -50, 50, canvas.height + 100); // right wall

    //////////////////////////////////
    // ONLY CHANGE BELOW THIS POINT //
    //////////////////////////////////

    // TODO 1 - Enable the Grid
    // toggleGrid();


    // TODO 2 - Create Platforms

    createPlatform(150,  640, 100, 10, "red");
    createPlatform(400,  525, 100, 10, "orange");
    createPlatform(600,  390, 100, 10, "yellow");
    createPlatform(450,  251, 100, 10, "green");
    createPlatform(900,  605, 100, 10, "blue");
    createPlatform(1040, 470, 100, 10, "purple");
    

    // TODO 3 - Create Collectables

    // "database", "diamond", "grace", "kennedi", "max", and "steve"



    createCollectable("steve", 180, 170, 0.8, 0.5);
    
    createCollectable("grace", 410, 170, 0.8, 0.5);

    createCollectable("database", 440, 170, 0.3, 0.7);
    createCollectable("diamond",  480, 170, 0.5, 0.6);
    createCollectable("database", 520, 170, 0.3, 0.7);
    
    createCollectable("max", 660, 170, 0.3, 0.7);

    createCollectable("database", 890, 170, 0.3, 0.6);
    createCollectable("kennedi",  930, 170, 0.5, 0.6);
    createCollectable("database", 975, 170, 0.3, 0.6);

    createCollectable("database", 1025, 170, 0.3, 0.6);
    createCollectable("database", 1070, 170, 0.3, 0.5);
    createCollectable("database", 1115, 170, 0.3, 0.6);



    // TODO 4 - Create Cannons

    createCannon("top",    190,  2000);
    createCannon("right",  340,  1800);
    createCannon("bottom", 740,  1500);
    
    
    //////////////////////////////////
    // ONLY CHANGE ABOVE THIS POINT //
    //////////////////////////////////
  }

  registerSetup(setup);
});
