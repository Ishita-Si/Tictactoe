let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");  
let newGamebtn = document.querySelector("#start");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let moveCount = 0;
let turn0 = true;

const winPatterns = [
 [0,1,2],
 [0,3,6],
 [0,4,8],
 [1,4,7],
 [2,5,8],
 [2,4,6],
 [3,4,5],
 [6,7,8],
];

const resetGame = () => {
    turn0 = true;
    moveCount = 0;  // Reset the move count
    enableBoxes();
    msgContainer.classList.add("hide");
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText === "") {
            if (turn0) {
                box.innerText = "O";
                box.style.color = "red";
                turn0 = false;
            } else {
                box.innerText = "X";
                box.style.color = "blue";
                turn0 = true;
            }
            box.disabled = true;

            moveCount++;  // Increment the move count
            checkWinner();
        }
    });
});

const disableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = true;
    });
}

const enableBoxes = () => {
    boxes.forEach((box) => {
        box.disabled = false;
        box.innerText = "";
    });
}

const showWinner = (winner) => {
    msg.innerText = `BINGO, You Won! ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    let winner = false;
    
    // Check for a winning pattern
    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                winner = true;
                break;
            }
        }
    }

    // If no winner and all boxes are filled (moveCount = 9), declare a draw
    if (!winner && moveCount === 9) {
        msg.innerText = "It's a draw!! Play again.";
        msgContainer.classList.remove("hide");
        disableBoxes();  // Disable boxes to end the game
    }
};

newGamebtn.addEventListener("click", resetGame);
resetbtn.addEventListener("click", resetGame);