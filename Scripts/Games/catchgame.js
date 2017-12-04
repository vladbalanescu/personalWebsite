/*------------------COPYRIGHT------------------*
* ALL RIGHTS RESERVED TO VLAD BALANESCU, 2016  *
* Personal Website                             *
* NOTICE:  All  information  contained  herein *
*          is and remains  the   property   of *
*          Vlad Balanescu.  The   intellectual *
*          and technical  concepts   contained *
*          herein  are proprietary   to   Vlad *
*          Balanescu.   Dissemination  of this *
*          information   or   reproduction  of *
*          this material is strictly forbidden *
*          unless prior written  permission is *
*          obtained    from     Vlad Balanescu.*
----------------------------------------------*/
$(document).ready(function() {
    // Initialize canvas element as CNV
    var cnv = document.getElementById("canvasCatch");
    var context = cnv.getContext("2d");
    var width = cnv.width;
    var height = cnv.height;

    //////////IMAGES///////////////
    // Background image
    var bgImage = new Image();
    bgImage.src = "Multimedia/Grass2.jpg";
    // Hero image
    var heroImage = new Image();
    heroImage.src = "Multimedia/Hero.gif";
    // Snakeimage
    var snakeImage = new Image();
    snakeImage.src = "Multimedia/Snake.gif";
    //////////IMAGES///////////////

    ////////// Game objects////////
    var hero = {
        speed: 500 // movement in pixels per second
    };
    var snake = {};
    var snakesCaught = 0;
    var minutes, seconds, miliSeconds;
    ////////// Game objects////////

    //////////KEYBOARD CONTROLS///////////////
    var keysDown = {};
    addEventListener("keydown", function(e) {
        keysDown[e.keyCode] = true;
    }, false);
    addEventListener("keyup", function(e) {
        delete keysDown[e.keyCode];
    }, false);
    //////////KEYBOARD CONTROLS///////////////

    //////////GAME RESET///////////////
    function redraw() {
        hero.x = cnv.width / 2;
        hero.y = cnv.height / 2;
        // Throw the snake somewhere on the screen randomly
        snake.x = cnv.width + 200;
        snake.y = cnv.height + 200;
        //Check to be still in canvas
        while (snake.x > (cnv.width - 100) || snake.y > (cnv.height - 100)) {
            snake.x = Math.random() * cnv.width;
            snake.y = Math.random() * cnv.height;
        }
    };
    //////////GAME RESET///////////////

    //////////UPDATE GAME OBJECTS///////////////
    var update = function(modifier) {
        if (38 in keysDown && hero.y > -5) // Player holding up
            hero.y -= hero.speed * modifier;
        if (40 in keysDown && hero.y < cnv.height - 110) // Player holding down
            hero.y += hero.speed * modifier;
        if (37 in keysDown && hero.x > -55) // Player holding left
            hero.x -= hero.speed * modifier;
        if (39 in keysDown && hero.x < cnv.width - 115) // Player holding right
            hero.x += hero.speed * modifier;
        // Snake caught?
        if (hero.x <= (snake.x + 35) //LEFT
            &&
            snake.x <= (hero.x + 95) //RIGHT
            &&
            hero.y <= (snake.y + 75) //DOWN
            &&
            snake.y <= (hero.y + 100)) { //UP
            snakesCaught++;
            redraw();
        }
    };
    //////////UPDATE GAME OBJECTS///////////////

    //Initialize time
    function initTime() {
        minutes = 1,
            seconds = 60,
            miliSeconds = 55;
    }

    // Draw function
    function render() {
        //Countdown the minutes
        if (seconds < 60)
            minutes = 0;
        //Countdown the seconds
        if (miliSeconds == 0) {
            miliSeconds = 55;
            seconds--;
        }
        //Countdown the miliseconds
        miliSeconds--;
        context.drawImage(bgImage, 0, 0);
        context.drawImage(heroImage, hero.x, hero.y);
        context.drawImage(snakeImage, snake.x, snake.y);

        //Paint the time
        context.fillStyle = "white";
        context.font = "30px Arial";
        if (minutes == 1)
            context.fillText("01:00", 60, 420);
        else {
            if (seconds < 10)
                context.fillText("00:0" + seconds, 60, 420);
            else
                context.fillText("00:" + seconds, 60, 420);
        }
        //Paint the score
        context.font = "bold 15px Arial";
        context.fillText("Vipers caught: " + snakesCaught, 60, 440);
        //Check for game over
        if (seconds == 0)
            gameOver();
    };

    //Play button action
    function playAction() {
        document.getElementById("playCatch").style.display = 'none';
        initTime();
        intervalSet = setInterval(playCatch, 20);
    };

    //Main game loop
    function playCatch() {
        update(0.02);
        render();
    };

    //Initial state of the screen
    function startScreen() {
        //Initial welcome message
        context.globalAlpha = 0.6;
        context.fillStyle = "brown";
        context.fillRect(0, 0, width, height);
        context.globalAlpha = 1;
        context.font = "50px Arial Black";
        context.fillStyle = "#000099";
        context.fillText("Catch the viper!", 190, 280);
    };

    //Game over state of the screen
    function gameOver() {
        //Game over message
        context.fillStyle = "brown";
        context.fillRect(0, 0, width, height);
        context.globalAlpha = 1;
        context.font = "50px Arial Black";
        context.fillStyle = "#000099";
        context.fillText("Time's up", 285, 280);
        context.fillStyle = "white";
        context.font = "italic 25px Arial Black";
        context.fillText("Score: " + snakesCaught + " vipers", 295, 320);
        snakesCaught = 0;
        clearInterval(intervalSet);
        document.getElementById("playCatch").style.display = 'block';
    };


    ////////////////////MAIN//////////////////////
    redraw();
    startScreen();
    document.getElementById("playCatch").onclick = playAction;
});
