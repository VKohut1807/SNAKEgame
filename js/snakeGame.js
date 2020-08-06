"use strict"
document.getElementById('run').addEventListener('click', function() {

    document.getElementById('run').innerHTML = 'Вимкнути';
    let restartWindow = function () {
        document.getElementById('run').onclick = function () {
                location.href=location.href;
        }
    }
    restartWindow();

    let field = document.createElement('div');
    document.getElementById("area-field").appendChild(field);
    field.classList.add('field');

    for (let i=1; i<833; i++){
        let div = document.createElement('div');
        field.appendChild(div);
        div.classList.add('cell');
    }

    let cell = document.getElementsByClassName('cell');
    let x = 1;
    let y = 32;

    for (let i=0; i<cell.length; i++){
        if(x>26){
            x=1;
            y--;
        }
        cell[i].setAttribute('posX', x);
        cell[i].setAttribute('posY', y);
        x++;
    }

    function generateSnake(){
        let posX = Math.round(Math.random()*(26-3)+3);
        let posY = Math.round(Math.random()*(32-1)+1);
        return [posX, posY];
    }

    let coordinates = generateSnake();
    let snakeBody = [document.querySelector('[posX = "'+ coordinates[0]+'"][posY = "'+ coordinates[1]+'"]'),
    document.querySelector('[posX = "'+ (coordinates[0]-1)+'"][posY = "'+ coordinates[1]+'"]'),
    document.querySelector('[posX = "'+ (coordinates[0]-2)+'"][posY = "'+ coordinates[1]+'"]')];

    for(let i = 0; i<snakeBody.length; i++){
        snakeBody[i].classList.add('snakeBody');
    };
    snakeBody[0].classList.add('head');

    let mouse;
    function createMouse(){
        function generateMouse(){
            let posX = Math.round(Math.random()*(26-3)+3);
            let posY = Math.round(Math.random()*(32-1)+1);
            return [posX, posY];
        }
        let mouseCoordinates = generateMouse();
        mouse = document.querySelector('[posX = "'+ mouseCoordinates[0]+'"][posY = "'+ mouseCoordinates[1]+'"]');
        while(mouse.classList.contains('snakeBody')){
            let mouseCoordinates = generateMouse();
            mouse = document.querySelector('[posX = "'+ mouseCoordinates[0]+'"][posY = "'+ mouseCoordinates[1]+'"]');
        };
        mouse.classList.add('mouse');
    }
    createMouse();

    let direction = 'right';
    let steps = false;
    let score = 0;
    let t = 300;
    let input = document.getElementById('input');
    let modalScore = document.querySelector('#modal-score');
    input.value = `${score}`;

    function moveGame(){
        snakeBody[0].classList.remove('head');
        snakeBody[snakeBody.length-1].classList.remove('snakeBody');
        snakeBody.pop();

        moving(); 
        eat();
        finish();

        snakeBody[0].classList.add('head');
        for(let i = 0; i<snakeBody.length; i++){
            snakeBody[i].classList.add('snakeBody');
        };
        steps = true;
    };

    function moving(){
        let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];
        if (direction == 'right'){
            if(snakeCoordinates[0]<26){
                snakeBody.unshift(document.querySelector('[posX = "'+ (+snakeCoordinates[0]+1)+'"][posY = "'+ snakeCoordinates[1]+'"]'));
            } else{
                snakeBody.unshift(document.querySelector('[posX = "1"][posY = "'+ snakeCoordinates[1]+'"]'));
            }
        }
        if (direction == 'left'){
            if(snakeCoordinates[0]>1){
                snakeBody.unshift(document.querySelector('[posX = "'+ (+snakeCoordinates[0]-1)+'"][posY = "'+ snakeCoordinates[1]+'"]'));
            } else{
                snakeBody.unshift(document.querySelector('[posX = "26"][posY = "'+ snakeCoordinates[1]+'"]'));
            }
        }
        if (direction == 'up'){
            if(snakeCoordinates[1]<32){
                snakeBody.unshift(document.querySelector('[posX = "'+snakeCoordinates[0]+'"][posY = "'+ (+snakeCoordinates[1]+1)+'"]'));
            } else{
                snakeBody.unshift(document.querySelector('[posX = "'+snakeCoordinates[0]+'"][posY = "1"]'));
            }
        }
        if (direction == 'down'){  
            if(snakeCoordinates[1]>1){
                snakeBody.unshift(document.querySelector('[posX = "'+snakeCoordinates[0]+'"][posY = "'+ (+snakeCoordinates[1]-1)+'"]'));
            } else{
                snakeBody.unshift(document.querySelector('[posX = "'+snakeCoordinates[0]+'"][posY = "32"]'));
            }
        }
    };
    function eat(){
        if(snakeBody[0].getAttribute('posX') == mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') == mouse.getAttribute('posY')){
            mouse.classList.remove('mouse');
            let a = snakeBody[snakeBody.length-1].getAttribute('posX');
            let b = snakeBody[snakeBody.length-1].getAttribute('posY');
            snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
            createMouse();
            score ++;
            input.value = `${score}`;
            modalScore.innerHTML = score;
        }
    }
    function finish(){
        if(snakeBody[0].classList.contains('snakeBody')){
            clearInterval(interval);
            snakeBody[0].style.background = '#FF020C';
            modal.style.display = "block";
        };
    };
    
    let interval = setInterval(moveGame, t);

    window.addEventListener('keydown', function(e){
        if(steps == true){
            if(e.keyCode == 37 && direction != 'right'){
                direction = 'left';
                steps = false;
            }
            else if(e.keyCode == 38 && direction != 'down'){
                direction = 'up';
                steps = false;
            }
            else if(e.keyCode == 39 && direction != 'left'){
                direction = 'right';
                steps = false;
            }
            else if(e.keyCode == 40 && direction != 'up'){
                direction = 'down';
                steps = false;
            }
        }
    });
});