$(document).ready(function() {
    //Initialize canvas
    var canvas = $("#canvasSnake")[0];
    var ctx = canvas.getContext("2d");
    var width = $("#canvasSnake").width();
    var height = $("#canvasSnake").height();

    //Global variables
    var cw = 20;
    var d;
    var food;
    var score;
    var snake_array;
    var image = new Image();
    var imageW = 40;

    //Create the snake
    function create_snake() {
        var length = 5; //Length of the snake
        snake_array = [];
        for (var i = length - 1; i >= 0; i--) {
            snake_array.push({
                x: i,
                y: 0
            });
        }
    }

    //Create the food
    function create_food() {
        food = {
            x: Math.round(Math.random() * (width - imageW) / cw),
            y: Math.round(Math.random() * (height - imageW) / cw),
        };
    }

    //Paint a cell
    function paint_cell(x, y) {
        ctx.fillStyle = "#990000";
        ctx.fillRect(x * cw, y * cw, cw, cw);
        ctx.strokeStyle = "#0F2157";
        ctx.strokeRect(x * cw, y * cw, cw, cw);
    }

    //Paint the food
    function paint_food(x, y) {
        image.src = 'Multimedia/Apple.png';
        image.onload = function() {
            ctx.drawImage(image, x, y);
        }
    }

    //Check the collision
    function check_collision(x, y, array) {
        for (var i = 0; i < array.length; i++) {
            if (array[i].x == x && array[i].y == y)
                return true;
        }
        return false;
    }

    //Keyboard controls
    $(document).keydown(function(e) {
        var key = e.which;
        //Prevent reverse gear
        if (key == "37" && d != "right") d = "left";
        else if (key == "38" && d != "down") d = "up";
        else if (key == "39" && d != "left") d = "right";
        else if (key == "40" && d != "up") d = "down";
    })

    //Prevent default browser up/down keys listeners
    window.addEventListener("keydown", function(e) {
        // space and arrow keys
        if ([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
            e.preventDefault();
        }
    }, false);

    //Paint the game
    function paint() {
        ctx.clearRect(0, 0, width, height);
        var nx = snake_array[0].x;
        var ny = snake_array[0].y;
        //Move the snake
        if (d == "right") nx++;
        else if (d == "left") nx--;
        else if (d == "up") ny--;
        else if (d == "down") ny++;
        //Reset conditions
        if (nx == -1 || nx == Math.round(width / cw) ||
            ny == -1 || ny == Math.round(height / cw) ||
            check_collision(nx, ny, snake_array)) {
            //Restart game
            ctx.globalAlpha = 0.4;
            ctx.fillStyle = "blue";
            ctx.fillRect(0, 0, width, height);
            ctx.globalAlpha = 1;
            ctx.font = "60px Arial";
            ctx.fillStyle = "white";
            ctx.fillText("The end my friend!", 170, 270);
            ctx.font = "25px Arial Black";
            ctx.fillStyle = "white";
            ctx.fillText("Score: " + score + " apples", 310, 320);
            clearInterval(game_loop);
            init();
            document.getElementById("playSnake").style.display = 'block';
            return;
        }
        //Eat the food
        if (nx >= food.x && nx <= food.x + 1 &&
            ny >= food.y && ny <= food.y + 1) {
            var tail = {
                x: nx,
                y: ny
            };
            score++;
            //Create new food
            create_food();
        } else {
            var tail = snake_array.pop(); //pops out the last cell
            tail.x = nx;
            tail.y = ny;
        }
        snake_array.unshift(tail); //puts back the tail as the first cell
        for (var i = 0; i < snake_array.length; i++) {
            var c = snake_array[i];
            //Paint the cells
            paint_cell(c.x, c.y);
        }
        //Paint the food
        paint_food(food.x * cw, food.y * cw);
        //Paint the score
        ctx.fillStyle = "white";
        ctx.font = "15px Arial";
        ctx.fillText("Score: " + score + " apples", 10, 500);
    }

    //Initial state of the screen
    function initialScreen() {
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
        ctx.fillText("SNAKE GAME!", 220, 330);
    }

    //Play Easy Button
    function playEasyS() {
        document.getElementById("easyS").style.display = 'none';
        document.getElementById("mediumS").style.display = 'none';
        document.getElementById("expertS").style.display = 'none';
        game_loop = setInterval(paint, 60);
    }

    //Play Medium Button
    function playMediumS() {
        document.getElementById("easyS").style.display = 'none';
        document.getElementById("mediumS").style.display = 'none';
        document.getElementById("expertS").style.display = 'none';
        game_loop = setInterval(paint, 40);
    }

    //Play Expert Button
    function playExpertS() {
        document.getElementById("easyS").style.display = 'none';
        document.getElementById("mediumS").style.display = 'none';
        document.getElementById("expertS").style.display = 'none';
        game_loop = setInterval(paint, 30);
    }

    function chooseMode() {
        document.getElementById("playSnake").style.display = 'none';
        document.getElementById("easyS").style.display = 'inline-block';
        document.getElementById("easyS").onclick = playEasyS;
        document.getElementById("mediumS").style.display = 'inline-block';
        document.getElementById("mediumS").onclick = playMediumS;
        document.getElementById("expertS").style.display = 'inline-block';
        document.getElementById("expertS").onclick = playExpertS;
    }

    //Initialize the game
    function init() {
        d = "right"; //default direction
        create_snake();
        create_food();
        score = 0;
        document.getElementById("easyS").style.display = 'none';
        document.getElementById("mediumS").style.display = 'none';
        document.getElementById("expertS").style.display = 'none';
        document.getElementById("playSnake").onclick = chooseMode;
    }

    /////////////////////////MAIN///////////////////////////////
    init();
    initialScreen();
});
