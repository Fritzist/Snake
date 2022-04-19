
        let canvas = document.getElementById("canvas");
        let ctx = canvas.getContext("2d");
        let rows = 20;
        let cols = 20;
        let snake = [{
            x: 19, 
            y:3
        }];

        let food;
        let cellWidth = canvas.width / cols;
        let cellHeight = canvas.height / rows;
        let direction = "LEFT";
        let foodcollected = false;

        placeFood();

        setInterval(gameLoop, 200);

        document.addEventListener("keydown", keyDown);

    
        draw();

        function draw() {

            //background
            ctx.fillStyle = "black";
            ctx.fillRect(0, 0, canvas.width, canvas.height); // canvas.width / height = automatisch die größe von dem canvas
            
            //player / snake
            ctx.fillStyle = "white";
            add(100, 150);
            add(130, 150);
            add(160, 150);
            add(190, 150);
            add(220, 150);


            snake.forEach(part => add(part.x, part.y));
            

            //food
            ctx.fillStyle = "cyan";
            add(food.x, food.y);

            requestAnimationFrame(draw);

        }

        function gameEnd() {

            //gegen sich selber
            let firstPart =snake[0];
            let otherParts = snake.slice(1);
            let duplicatePart = otherParts.find(part => part.x == firstPart.x && part.y == firstPart.y);

            //gegen die Wand
            if (snake[0].x < 0 || 
                snake[0].x > cols -1 ||
                snake[0].y < 0 ||
                snake[0].y > rows -1 ||
                duplicatePart
        ) {

            placeFood();
            
            snake = [{
                x: 19, 
                y:3
            }];

            direction = "LEFT";

        }
    }

        function placeFood() {

            let randomX = Math.floor(Math.random() * cols);
            let randomY = Math.floor(Math.random() * rows); 

            food = {x: randomX, y: randomY};

        }

        function add(x, y) {

            ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);

        }

        function shiftSnake() {

            for (let i = snake.length - 1; i > 0; i--) {
                const part = snake[i];
                const lastpart = snake[i - 1];
                part.x = lastpart.x;
                part.y = lastpart.y;
                
            }
        }

        function gameLoop() {
            gameEnd();

            if (foodcollected) {
                snake = [{
                    x: snake[0].x, 
                    y: snake[0].y
                }, ...snake];

                foodcollected = false;

            }

            shiftSnake();

            if (direction == "LEFT") {
                snake[0].x--;
            }
            
            if (direction == "RIGHT") {
                snake[0].x++;
            }

            if (direction == "UP") {
                snake[0].y--;
            }

            if (direction == "DOWN") {
                snake[0].y++;
            }

            if (snake[0].x == food.x &&
                snake[0].y == food.y) {

                    foodcollected = true;    

                    placeFood(); // place the food again

            }
        }

        const directions = {
            37: "LEFT",
            65: "LEFT",
            38: "UP",
            87: "UP",
            39: "RIGHT",
            68: "RIGHT",
            40: "DOWN",
            83: "DOWN",

            }

            function keyDown(e) {
            const tmpDirection = directions[e.keyCode];
            if(tmpDirection) direction = tmpDirection;
            }
