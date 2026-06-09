var playground = document.getElementById("playground");
var dirDisplay = document.getElementById("dir_display_s");
var count = document.getElementById("count_s");
var slider = document.getElementById("speed_control");
var value = document.getElementById("value");

var counter = 0;
var looper;
var speed = 1;  //1 speed = 100 ms
var deltaTime = 0;

var cols = Math.floor(playground.clientWidth / 10);
var rows = Math.floor(playground.clientHeight / 10);
var posx = cols/2;
var posy = rows/2;


var map = Array.from(
    { length: cols },
    () => Array(rows).fill(null)
);

for(let y = 0; y < rows; y++){
    for(let x = 0; x < cols; x++){
        let cell = document.createElement("div");

        cell.style.width = "10px";
        cell.style.height = "10px";
        cell.style.border = "none";
        cell.style.backgroundColor = "#fffbe9";
        playground.appendChild(cell);
        map[x][y] = cell;
    }
}

map[posx][posy].style.backgroundColor = "#ff0000";

function update(){
    deltaTime++;
    if(deltaTime >= speed){
        move();
        deltaTime = 0;
    }
}



function move(){
    let nextx = posx;
    let nexty = posy;
    let dir = Math.floor(Math.random()*4)+1;
    if(dir == 1){
        //up
        if(posy != 0){
            nexty--;
        }
        dirDisplay.innerHTML = "↑";
    }
    else if(dir == 2){
        //down
        if(posy != rows - 1){
            nexty++;
        }
        dirDisplay.innerHTML = "↓";
    }
    else if(dir == 3){
        //left
        if(posx != 0){
            nextx--;
        }
        dirDisplay.innerHTML = "←";

    }
    else{
        //right
        if(posx != cols - 1){
            nextx++;
        }
        dirDisplay.innerHTML = "→";

    }

    counter++;
    map[posx][posy].style.backgroundColor = "#000000";
    map[nextx][nexty].style.backgroundColor = "#ff0000";
    posx = nextx;
    posy = nexty;

    count.innerHTML = counter;
}

slider.addEventListener("input", () => {
    updateSpeed();
});


function updateSpeed(){
    let inverted = 11 - slider.value;
    value.textContent = inverted;
    speed = slider.value;
}


looper = setInterval(()=>{
    update();
}, 50);
updateSpeed();


