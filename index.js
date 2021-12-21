
// select all 81 divs inside of container div and declare a variable to save the collection
let boxElements = document.querySelector('.grid').children;

// create a 2D array containing the starting values of the puzzle
let initialPuzzle = [
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0]
]

// create function to fill solved sudoku puzzle
function solvePuzzle() {
    // fill initial puzzle array
    for (let i = 1; i <= initialPuzzle.length; i++) {
        for (let j = 1; j <= initialPuzzle[0].length; j++) {  
            const val = document.querySelector(`#r${i}c${j}`).value;
            initialPuzzle[i - 1][j - 1] = val;
            if (val === "") {
                initialPuzzle[i - 1][j - 1] = 0;    
            }         
        }    
    }

    // create a hard copy of initial array
    let solvedPuzzle = [];
    for (let i = 0; i < initialPuzzle.length; i++) {
        solvedPuzzle[i] = initialPuzzle[i].slice(0);
    }           
    solve(solvedPuzzle);
           
    // fill remaining puzzle
    let count = 0;
    for (let i = 0; i < solvedPuzzle.length; i++) {
        for (let j = 0; j < solvedPuzzle[0].length; j++) {  
            if (initialPuzzle[i][j] === 0) {
                boxElements[count].innerHTML = "<div>" + solvedPuzzle[i][j] + "</div>";
                boxElements[count].setAttribute("style", "color: blue");
            }        
            count++;
        }    
    }
    // switch out display of solve and reset buttons
    document.querySelector('.solve').setAttribute('style', 'display: none');
    document.querySelector('.reset').setAttribute('style', 'display: block');
}

// create reset function to clear the page
function reset() {
    
    
    let count = 0;
    for (let i = 1; i <= initialPuzzle.length; i++) {
        for (let j = 1; j <= initialPuzzle[0].length; j++) { 
            boxElements[count].innerHTML = "";
            let boxInput = document.createElement("input"); 
            let boxId = `r${i}c${j}`;
            boxInput.id = boxId;
            boxInput.setAttribute("value", "");
            boxInput.setAttribute("type", "number");
            boxElements[count].appendChild(boxInput);        
            count++;
        }    
    }
    initialPuzzle = [
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0]
    ]
    document.querySelector('.reset').setAttribute('style', 'display: none');
    document.querySelector('.solve').setAttribute('style', 'display: block');    
}


// create function to solve the incomplete sudoku board using backtracking
function solve(board) {  
    let emptySpot = nextEmptySpot(board);
    let row = emptySpot[0];
    let col = emptySpot[1];

    // there is no more empty spots
    if (row === -1){
        return board;
    }

    for(let num = 1; num<=9; num++){
        if (checkValue(board, row, col, num)){
            // if value is valid, assign it to empty spot and call solve function again 
            board[row][col] = num;
            solve(board);
        }
    }

    if (nextEmptySpot(board)[0] !== -1) {
        board[row][col] = 0;
        return board;
    }
        
}


// UTILITY FUNCTIONS

// function to find next emtpy spot
function nextEmptySpot(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] === 0) 
                return [i, j];
        }
    }
    return [-1, -1];
};
// check validity

function checkValue(board, row, column, value) {
    if(checkRow(board, row, value) &&
      checkColumn(board, column, value) &&
      checkSquare(board, row, column, value)) {
        return true;
    }
    
    return false; 
};

// function to check if rows are valid
function checkRow(board, row, value){
    for(let i = 0; i < board[row].length; i++) {
        if(board[row][i] == value) {
            return false;
        }
    }
   
    return true;
};

//function to check if columns are valid
function checkColumn(board, column, value){
    for(let i = 0; i < board.length; i++) {
        if(board[i][column] == value) {
            return false;
        }
    }

    return true;
};

// function to check if 3x3 box is valid 
function checkSquare(board, row, column, value){
    boxRow = Math.floor(row / 3) * 3;
    boxCol = Math.floor(column / 3) * 3;
    
    for (let r = 0; r < 3; r++){
        for (let c = 0; c < 3; c++){
            if (board[boxRow + r][boxCol + c] == value)
                return false;
        }
    }
    return true;
};
