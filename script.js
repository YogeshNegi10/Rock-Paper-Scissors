//  <---- function for autoPlay ---->

let isPlaying = false;
let intervalId;

const autoPlayBtn = document.querySelector(".autoPlay-btn");
autoPlayBtn.addEventListener("click", autoPlay);

function autoPlay() {
  if (!isPlaying) {
    intervalId = setInterval(() => {
      const computerMove = pickComputerMove();
      playGame(computerMove);
    }, 1000);
    isPlaying = true;
    autoPlayBtn.innerHTML = "Stop";
  } else {
    clearInterval(intervalId);
    isPlaying = false;
    autoPlayBtn.innerHTML = "AutoPlay";
  }
}



//  <---- This is for calling data from localstorage ---->

let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  lose: 0,
  tie: 0,
};

//  <---- function for PlayGame ---->

function playGame(yourChoice) {
  const computerMove = pickComputerMove();
  let result = "";
  if (yourChoice === "rock") {
    if (computerMove === "rock") {
      result = `Tie.`;
      score.tie++;
    } else if (computerMove === "paper") {
      result = `You Lose.`;
      score.lose++;
    } else if (computerMove === "scissor") {
      result = `You Win.`;
      score.wins++;
    }
  } else if (yourChoice === "paper") {
    if (computerMove == "rock") {
      result = `You Win.`;
      score.wins++;
    } else if (computerMove === "paper") {
      result = `Tie.`;
      score.tie++;
    } else if (computerMove === "scissor") {
      result = `You Lose.`;
      score.lose++;
    }
  }

  if (yourChoice === "scissor") {
    if (computerMove === "rock") {
      result = `You Lose.`;
      score.lose++;
    } else if (computerMove === "paper") {
      result = `You Win.`;
      score.wins++;
    } else if (computerMove === "scissor") {
      result = `Tie.`;
      score.tie++;
    }
  }

  //  <----  this line is for saving data score to localStorage ---->

  localStorage.setItem("score", JSON.stringify(score));

  //  <---- this line is for showing data in the webpage ---->

  document.querySelector(".js-moves").innerHTML = `You <img src="/images/${yourChoice}.png"> <img src="/images/${computerMove}.png"> Computer `;
  displayScore();
  document.querySelector(".js-result").innerHTML = result;
}

//  <---- function for displaying Score ---->

function displayScore() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Lose: ${score.lose}, Tie: ${score.tie}`;
}

//  <---- function to pickComputerMove ----> 

function pickComputerMove() {
  const randomNumber = Math.ceil(Math.random() * 3);

  let computerMove = "";
  if (randomNumber == 1) {
    computerMove = "rock";
  } else if (randomNumber == 2) {
    computerMove = "paper";
  } else if (randomNumber == 3) {
    computerMove = "scissor";
  }
  return computerMove;
}

//  <---- function for resetGame ---->  

const resetBtn = document.querySelector(".reset-btn");
resetBtn.addEventListener("click", ()=>{

    checkFunction();
    
});


function reset() {
  
  confirmReset()
  score.wins = 0;
  score.lose = 0;
  score.tie = 0;
  localStorage.removeItem("score");

  document.querySelector(".js-moves").innerHTML = `Score Reset.`;
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Lose: ${score.lose}, Tie: ${score.tie}`;
  document.querySelector(".js-result").innerHTML = "";
 }


//  <---- function for startGame ---->  

const startBtn = document.querySelector(".startGame");
startBtn.addEventListener("click", startGame);
   

function startGame() {

  let btns = document.querySelectorAll(".js-disabled-btns");

  btns.forEach((element) => {
    element.disabled = false;
    element.style.cursor = "pointer";
    element.classList.remove("active");
  });

  let startGame = document.querySelector(".startGame");
  startGame.style.display = "none";

  displayScore();

//  <---- This is for keyboard event to play the game ----> 

  window.addEventListener('keydown', (e)=>{

    if(e.key === 'r' || e.key === 'R'){
         playGame('rock')

    }else if(e.key === 'p' || e.key === 'P'){
            
       playGame('paper') 
    }  else if(e.key === 's' || e.key === 'S'){

       playGame('scissor')
    }else if(e.key === 'a' || e.key === 'A'){
      autoPlay();
    }else if(e.key === 'Backspace'){

         checkFunction();  
    }
})

}
//  <---- This function is for Checking score before resetting ----> 

 function checkFunction(){
  if((score.wins === 0 && score.lose) === 0 && score.tie === 0){
    document.querySelector(".js-moves").innerHTML = `Play First `;
   }else {
    confirmReset();
   }
  
}


//  <---- This is for confirming the reset ----> 


function confirmReset(){
  document.querySelector(
    ".js-score"
  ).innerHTML = ` Do You want to reset <button class ='js-confirm'>Yes</button> <button class = 'js-confirm'>No</button>`

   const confirmBtn  = document.querySelectorAll('.js-confirm');

    
       confirmBtn.forEach((btn)=>{
             btn.addEventListener('click',(e)=>{
                  if(e.target.innerHTML === 'Yes'){
                        reset()
                  }else if(e.target.innerHTML === 'No'){
                   setTimeout(()=>{
                    document.querySelector(
                      ".js-score"
                    ).innerHTML = `Wins: ${score.wins}, Lose: ${score.lose}, Tie: ${score.tie}`;
                   },1000)
                   document.querySelector(
                    ".js-score"
                  ).innerHTML = `Good Job ! Keep Playing`;
                 
                  }
             })
       })
      
}


//  <---- applying Css dyanmically ---->  

let applyBtn = document.querySelector(".js-apply");

applyBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = "style.css";
  document.head.appendChild(link);
  applyBtn.style.display = "none";
   applyBtn.innerHTML =""
});

//  <---- hintbtn,hintBox js code ----> 


const hintBtn = document.querySelector(".hintBtn");
const hintBox = document.querySelector(".hintBox");


hintBtn.addEventListener('mouseover', ()=>{
  setTimeout(()=>{
    hintBox.classList.remove('active')
  },3000)
     hintBox.classList.add('active')
    hintBtn.style.opacity = '0'
    setTimeout(()=>{
      hintBtn.style.opacity = '.5'
    },3000)
})


 //  <---- closeBtn js code ----> 

const closeBtn = document.querySelector(".closeBtn");

  closeBtn.addEventListener('click', ()=>{
  hintBox.classList.remove('active')
  hintBtn.style.opacity = '.5'
})


