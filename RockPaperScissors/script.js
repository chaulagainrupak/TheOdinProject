// Declearing the randm number generator. I got this from the Mozzila reference guide.

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}




// console.log(getRandomInt(3));
let won;
let humanScore = 0;
let computerScore = 0;

// ROCK = 0 

// PAPER = 1 

// Scissors = 2

function eval(choice){
    let computerChoice = getRandomInt(3);
    console.log("The computer chose: ",computerChoice);
    if (choice == 0 && computerChoice == 2){
        humanScore++;
        updateScore();
        alert("You Won!");
        return won = true;
    }else if (choice == 1 && computerChoice == 0){
        humanScore++;
        updateScore();
        alert("You Won!");
        return won = true;
    }else if (choice == 2 && computerChoice == 1){
        humanScore++;
        updateScore();
        alert("You Won!");
        return won = true;
    }else if (choice == computerChoice){
        alert("It\'s A Draw!");
        return won = null;
    }else {
        computerScore++
        updateScore();
        alert("You Lost! You Can Still Try Again!");
        return won = false;
    }
}

function updateScore(){
    document.getElementById("humanScore").innerHTML = humanScore;
    document.getElementById("computerScore").innerHTML = computerScore;
}














