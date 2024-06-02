const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const button = document.querySelector("button");

function random(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random()*(max-min+1))+min;
}

let schaarArray;
let steenArray;
let papierArray;
let aantal = 30;
let stoppen;
initialize();

button.onclick = () => { stoppen=true;setTimeout(initialize, 50)};


function initialize() {
    schaarArray = [];
    steenArray = [];
    papierArray = [];
    for(let i = 0;i<30;i++) {
        schaarArray.push(new Schaar(random(50, canvas.clientWidth - 50), random(50, canvas.clientHeight - 50), random(1,4)));
        steenArray.push(new Steen(random(50, canvas.clientWidth - 50), random(50, canvas.clientHeight - 50), random(1,4)));
        papierArray.push(new Papier(random(50, canvas.clientWidth - 50), random(50, canvas.clientHeight - 50), random(1,4)));
    }
    stoppen = false;
    button.classList.add("hidden");
    loop();
}
function loop() {
    ctx.clearRect(0,0,1500,700);
    console.log(steenArray.length + " " + schaarArray.length + " " + papierArray.length);
    if(steenArray.length == (aantal*3) || papierArray.length == (aantal*3) || schaarArray.length == (aantal*3)) {
        stoppen = true;
        button.classList.remove("hidden");
    }
    schaarArray.forEach((el) => {
        el.move(canvas);
        el.draw(ctx);
        for(let i = 0;i<papierArray.length;i++) {
            if(el.collide(papierArray[i])) {
                schaarArray.push(new Schaar(papierArray[i].x, papierArray[i].y, random(1,4)));
                papierArray.splice(i, 1);
            }
        }
    })
    steenArray.forEach((el) => {
        el.move(canvas);
        el.draw(ctx);
        for(let i = 0;i<schaarArray.length;i++) {
            if(el.collide(schaarArray[i])) {
                steenArray.push(new Steen(schaarArray[i].x, schaarArray[i].y, random(1,4)));
                schaarArray.splice(i, 1);
            }
        }
    })
    papierArray.forEach((el) => {
        el.move(canvas);
        el.draw(ctx);
        for(let i = 0;i<steenArray.length;i++) {
            if(el.collide(steenArray[i])) {
                papierArray.push(new Papier(steenArray[i].x, steenArray[i].y, random(1,4)));
                steenArray.splice(i, 1);
            }
        }
    })
    
    if(stoppen == false) {
        setTimeout(loop, 10);
    }
}