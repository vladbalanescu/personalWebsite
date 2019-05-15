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
    // Initialize canvas
    var c = document.getElementById("canvasBricks");
    var ctx = c.getContext("2d");

    //Global variables
    var width = c.width;
    var height = c.height;
    var x = 200;
    var y = 220;
    var r = 7;
    var speedX = 3.5;
    var speedY = 4;
    var px = 330;
    var paddleh = 15;
    var paddlew = 120;
    var bricks;
    var NROWS = 9;
    var NCOLS = 10;
    var BRICKWIDTH = (width / NCOLS) - 5.5;
    var BRICKHEIGHT = 15;
    var PADDING = 5;
    var rowcolors = ["#000099", "#000099", "#000099",
        "#ffff66", "#ffff66", "#ffff66",
        "#ff3300", "#ff3300", "#ff3300"
    ];
    rightDown = false;
    leftDown = false;
    var canvasMinX;
    var canvasMaxX;

    ///////////////////////////////
    //MOUSE AND KEYBOARD CONTROLS//
    ///////////////////////////////
    //~>MOUSE
    function init_mouse() {
        canvasMinX = c.offsetLeft;
        canvasMaxX = canvasMinX + width - paddlew;
    }

    function onMouseMove(evt) {
        if (evt.pageX > canvasMinX && evt.pageX < canvasMaxX && ballY + dy < height) {
            paddlex = evt.pageX - canvasMinX;
        }
    }
    document.addEventListener("mousemove", onMouseMove);
    //~>KEYBOARD
    //Set rightDown or leftDown if the right or left keys are down
    function onKeyDown(evt) {
        if (evt.keyCode == 39) rightDown = true;
        else if (evt.keyCode == 37) leftDown = true;
    }
    //Unset them when the right or left key are up
    function onKeyUp(evt) {
        if (evt.keyCode == 39) rightDown = false;
        else if (evt.keyCode == 37) leftDown = false;
    }
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("keyup", onKeyUp);

    ////////////////////////
    //RENDERING FUNCTIONS//
    ///////////////////////
    //Clear the canvas
    function clear() {
        ctx.clearRect(0, 0, width, height);
    }
    //Draw a circle
    function circle(x, y, r) {
        ctx.beginPath();
        ctx.fillStyle = "white";
        ctx.arc(x, y, r, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fill();
    }
    //Draw a rectangle
    function rect(x, y, w, h) {
        ctx.beginPath();
        ctx.rect(x, y, w, h);
        ctx.closePath();
        ctx.fill();
    }
    //Initialize bricks
    function initbricks() {
        bricks = new Array(NROWS);
        for (i = 0; i < NROWS; i++) {
            bricks[i] = new Array(NCOLS);
            for (j = 0; j < NCOLS; j++) {
                bricks[i][j] = 1;
            }
        }
    }
    //Reset the coordinates to initial state
    function initCoord() {
        ballX = x;
        ballY = y;
        radius = r
        paddlex = px;
        dx = speedX;
        dy = speedY;
    }
    //Initial state of the screen
    function initialScreen() {
        initCoord();
        initbricks();
        draw();

        //Initial welcome message
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = "#004d1a";
        ctx.fillRect(0, 0, width, height);
        ctx.globalAlpha = 1;
        ctx.font = "italic 40px Arial Black";
        ctx.fillStyle = "white";
        ctx.fillText("The", 360, 270);
        ctx.font = "50px Arial Black";
        ctx.fillStyle = "#000099";
        ctx.fillText("BRICK GAME!", 220, 330);
        init_mouse();
    }

    //////////////////////
    //MAIN DRAW FUNCTION//
    /////////////////////
    //Draw on CANVAS
    function draw() {
        clear();
        circle(ballX, ballY, radius);
        rect(paddlex, height - paddleh, paddlew, paddleh);
        //draw bricks
        for (i = 0; i < NROWS; i++) {
            ctx.fillStyle = rowcolors[i];
            for (j = 0; j < NCOLS; j++) {
                if (bricks[i][j] == 1) {
                    rect((j * (BRICKWIDTH + PADDING)) + PADDING,
                        (i * (BRICKHEIGHT + PADDING)) + PADDING,
                        BRICKWIDTH, BRICKHEIGHT);
                }
            }
        }
        //brick hit condition
        ballY -= 20; //Adapt y coord to define brick margin
        rowheight = BRICKHEIGHT + PADDING;
        colwidth = BRICKWIDTH + PADDING;
        row = Math.floor(ballY / rowheight);
        col = Math.floor(ballX / colwidth);
        //hit brick ~> reverse the ball and erase brick
        if (ballY < NROWS * rowheight && row >= 0 && col >= 0 && bricks[row][col] == 1) {
            dy = -dy;
            bricks[row][col] = 0;
        }
        ballY += 20; //Restore y coord
        //if game not over, move paddle
        if (ballY + dy < height)
            if (rightDown && paddlex + paddlew < width) paddlex += 7;
            else
        if (leftDown && paddlex > 0) paddlex -= 7;
        //Right/Left stop condition
        if (ballX + dx > width - 5 || ballX + dx < 5)
            dx = -dx;
        //Up stop condition
        if (ballY + dy < 5)
            dy = -dy;
        //Down stop condition
        else
        //if ball is on the paddle
        if (ballY + dy > height - 20 && ballX > paddlex && ballX < paddlex + paddlew)
            dy = -dy;
        //if ball is not on the paddle
        else if (ballY + dy > height + 8) {
            //game over, so stop the animation
            clearInterval(interval);
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "blue";
            ctx.fillRect(0, 0, width, height);
            ctx.globalAlpha = 1;
            ctx.font = "60px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("You lost!", 290, 270);
            document.getElementById("playBricks").style.display = 'block';
        }
        //A win
        bool = true;
        nr = 0;
        for (m = 0; m < NROWS; m++)
            for (n = 0; n < NCOLS; n++)
                if (bricks[m][n] == 1) {
                    bool = false;
                    nr++;
                }
        if (bool) {
            clearInterval(interval);
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "green";
            ctx.fillRect(0, 0, width, height);
            ctx.globalAlpha = 1;
            ctx.font = "60px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("Congrats! You won", 170, 270);
            document.getElementById("playBricks").style.display = 'block';
        }
        //Score
        ctx.fillStyle = "white";
        ctx.font = "15px Arial";
        ctx.fillText("Score: " + Math.round(100 - (nr * 100) / (NROWS * NCOLS)) + "%", 10, 500);
        ballX += dx;
        ballY += dy;
    }

    /////////////////////////MAIN///////////////////////////////
    //Initialise
    initialScreen();

    //Play Easy Button
    function playEasy() {
        interval = setInterval(draw, 15);
        startGame();
    }

    //Play Medium Button
    function playMedium() {
        interval = setInterval(draw, 10);
        startGame();
    }

    //Play Expert Button
    function playExpert() {
        interval = setInterval(draw, 7);
        startGame();
    }

    //Start function
    function startGame() {
        document.getElementById("easyB").style.display = 'none';
        document.getElementById("mediumB").style.display = 'none';
        document.getElementById("expertB").style.display = 'none';

        clear();
        initCoord();
        initbricks();
        draw();
    }
    //Choose mode
    function chooseMode() {
        document.getElementById("playBricks").style.display = 'none';
        document.getElementById("easyB").style.display = 'inline-block';
        document.getElementById("easyB").onclick = playEasy;
        document.getElementById("mediumB").style.display = 'inline-block';
        document.getElementById("mediumB").onclick = playMedium;
        document.getElementById("expertB").style.display = 'inline-block';
        document.getElementById("expertB").onclick = playExpert;
    }
    //Initialize game
    function init() {
        document.getElementById("easyB").style.display = 'none';
        document.getElementById("mediumB").style.display = 'none';
        document.getElementById("expertB").style.display = 'none';
        document.getElementById("playBricks").onclick = chooseMode;
    }

    //Load canvas after window has loaded
    if (document.getElementById) window.onload = init;
});
