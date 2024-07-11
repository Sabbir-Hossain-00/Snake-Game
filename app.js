
// game constrant and variable

let inputDir = {x:0, y:0} ;

let leftbtn = document.querySelector("#left");
let uptbtn = document.querySelector("#up");
let rightbtn = document.querySelector("#right");
let downbtn = document.querySelector("#down");
let startbtn = document.querySelector("#start");

let board =document.querySelector(".board");
let scoreBox =document.querySelector("#scorebox");
let highScoreBox =document.querySelector("#highscorebox");

const foodSound = new Audio("food.mp3");
const gameoverSound = new Audio("gameover.mp3");
const moveSound = new Audio("move.mp3");
const bgSound = new Audio("music.mp3");

let speed = 10;
let lastPaintTime = 0;
let score = 0;

let snakeArr = [
    {x:10 , y:20}
]

let food = {x:5,y:10};


// game function

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime ;
    gameEngine();
    
}

function iscollied (snake){
    // i you bump into yourself

for(let i = 1; i<snakeArr.length; i++){
    if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
        console.log("bunp into yourself")
        return true;
    }
}

// if you bump into the wall
       if(snake[0].x >= 30 || snake[0].x <=0 || snake[0].y >= 30 || snake[0].y <=0){
        console.log("bump wall");
           return true ;
        }

}


 function gameEngine (){


     //  part 1: updating the snake arry and food


     if(iscollied(snakeArr)){
        bgSound.load();
        gameoverSound.play();
        inputDir = {x:0, y:0}
        
        alert("Game Over. Press Start Button to play again !  ");
        scoreBox.innerHTML = "Score: 0"
        snakeArr = [{ x:10 , y:20 }]
        bgSound.play();
        

     }



    //  if you have eaten the food 

    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound.play();
        score += 1;
        if(score > hiscoreval){
            hiscoreval = score ;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            highScoreBox.innerHTML = "High Score" + hiscoreval ;
        }
        scoreBox.innerHTML = "Score:" + score ;
        snakeArr.unshift({x:snakeArr[0].x + inputDir.x, y:snakeArr[0].y + inputDir.y});
         let a = 3;
         let b = 26;
        food = {x:Math.round(a + (b - a)*Math.random()),y:Math.round(a + (b - a)*Math.random())}
    }

     //   moveing the snake

     for(let i = snakeArr.length - 2 ; i >=0; i--){
         snakeArr[i+1] ={...snakeArr[i]}
     }

     snakeArr[0].x += inputDir.x;
     snakeArr[0].y += inputDir.y;



     // part 2 : display the snake and food 
     
    //  display the snake
    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y ;
        snakeElement.style.gridColumnStart = e.x ;
        
        if(index === 0){
            snakeElement.classList.add ("head");
        }else{
            snakeElement.classList.add ("snake");
        }
        board.appendChild(snakeElement)
        
    });


    // display the food


        foodElement = document.createElement("div");
        foodElement.style.gridRowStart = food.y ;
        foodElement.style.gridColumnStart = food.x ;
        foodElement.classList.add ("food");
        board.appendChild(foodElement)
    

 }



// main logic start here

let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
     hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    highScoreBox.innerHTML = "High Score: " + hiscore;
}



window.requestAnimationFrame(main);
 
    startbtn.addEventListener("click",(e)=>{
        inputDir = {x:0, y:1}
        moveSound.play();
        bgSound.play();

        leftbtn.addEventListener("click",()=>{
          
          inputDir.x = -1;
          inputDir.y = 0;
          moveSound.play();
        });
        uptbtn.addEventListener("click",()=>{
         
          inputDir.x = 0;
          inputDir.y = -1;
          moveSound.play();
        });
        rightbtn.addEventListener("click",()=>{
         
          inputDir.x = 1;
          inputDir.y = 0;
          moveSound.play();
        });
        downbtn.addEventListener("click",()=>{
    
          inputDir.x = 0;
          inputDir.y = 1;
          moveSound.play();
        });
  });

  window.addEventListener('keydown',(e)=>{
    inputDir = {x:0,y:1};
    moveSound.play();
    bgSound.play();

    switch(e.key){
        case"ArrowUp":
        
           inputDir.x = 0;
           inputDir.y = -1;

           break;
        case"ArrowDown":
       
           inputDir.x = 0;
           inputDir.y = 1;

           break;
        case"ArrowLeft":
        
           inputDir.x = -1;
           inputDir.y = 0;

           break;
        case"ArrowRight":
        
           inputDir.x = 1;
           inputDir.y = 0;

           break;
        default:
            break;
    }

    
  })
