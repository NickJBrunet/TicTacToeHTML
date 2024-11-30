


//  REGISTERING VARIABLES
let turnCounter = 0
let gameCounter = 1
let gameState = 'undefined'


let seed = [[1,1,1],[1,1,1],[1,1,1]]


const cellBtns = document.getElementsByClassName('cell')
const newGameBtn = document.getElementById('new-game-button')
const playerTurn = document.getElementById('current-turn')

const winnerContainer = document.getElementById('game-winners')

newGameBtn.hidden = true


//  CLICK EVENT LISTENERS
newGameBtn.addEventListener('click', resetGame)
for (let i = 0; i < cellBtns.length; i++)
{
    cellBtns[i].addEventListener('click', () =>
    {
        if (cellBtns[i].childNodes.length === 0)
        {
            turnCounter++
            cellBtns[i].appendChild(updateGame(cellBtns[i].id))
        }
    });
}





//   RESET GAME FUNCTION
function resetGame()
{
    turnCounter = 0
    gameCounter += 1
    gameState = 'undefined'
    seed = [[1,1,1],[1,1,1],[1,1,1]]

    newGameBtn.hidden = true
    playerTurn.style.backgroundColor = 'rgb(173, 173, 173)'

    playerTurn.innerHTML = "PLAYER ONE'S TURN"
    for (let i1 = 0; i1 < cellBtns.length; i1++)
    {
        for (let i2 = 0; i2 < cellBtns[i1].childNodes.length; i2++)
        {
            cellBtns[i1].removeChild(cellBtns[i1].childNodes[i2])
        }
    }
}



function newWinner(playerCount)
{
    let newWinner = document.createElement('p')
    newWinner.classList.add('game-winner')
    newWinner.innerHTML = "PLAYER " + playerCount
    newWinner.style.backgroundColor = "lightgreen"
    return newWinner
}



// GET CURRENT PLAYER SYMBOL
function updateGame(clickedId)
{
    if (gameState == 'undefined')
    {   
        if (turnCounter < 10)
        {
            console.log(turnCounter)
            row = Math.floor((clickedId - 1)/3)
            col = (clickedId - (row * 3)) - 1
    
            seed[row][col] = (turnCounter % 2) + 2
    
            let playerCount =  ((turnCounter % 2) + 1)
            let playerCountOpp =  (((turnCounter + 1) % 2) + 1)
            if (seedWon() === false) {
                playerTurn.innerHTML = "PLAYER " + playerCount + "'S TURN"
                if (turnCounter === 9) {
                    playerTurn.innerHTML = "GAME DRAWN!"
                    playerTurn.style.backgroundColor = 'rgb(233, 220, 105)'
                    newGameBtn.hidden = false
                    gameState = "draw"
                }
            } else {
                playerTurn.innerHTML = "PLAYER " + playerCountOpp + " WINS!"
                playerTurn.style.backgroundColor = 'lightgreen'

                newGameBtn.hidden = false
                gameState = "won"

                winnerContainer.appendChild(newWinner(playerCountOpp))
            }
    
            let symbol = document.createElement('img')
            symbol.src = 'images/' + playerCount + '.png'
            symbol.height = '100'
            symbol.width = '100'
            
            return symbol
        }
    }
}


//  IF ARRAY 1 === ARRAY 2
function aEqual(a, b)
{
    let count = 0
    for (let i = 0; i < a.length; i++)
    {
        if (a[i] === b[i])
        {
            count++
        }
    }
    if (count === a.length)
    {
        return true
    } else 
    {
        return false
    }
}



//  CHECKS IF CURRENT SEED HAS A WINNING STATE
function seedWon(seedList) //returns true or false
{
    let y1 = seed[0]
    let y2 = seed[1]
    let y3 = seed[2]

    let x1 = [y1[0],y2[0],y3[0]]
    let x2 = [y1[1],y2[1],y3[1]]
    let x3 = [y1[2],y2[2],y3[2]]

    let z1 = [y1[0],y2[1],y3[2]]
    let z2 = [y1[2],y2[1],y3[0]]

    let winOne = [3,3,3]
    let winTwo = [2,2,2]

    let win = false

    if (y1.includes(1) === false) {
        if (aEqual(y1, winOne) || aEqual(y1, winTwo)){
            win = true}}
    if (y2.includes(1) === false) {
        if (aEqual(y2, winOne) || aEqual(y2, winTwo)){
            win = true}}
    if (y3.includes(1) === false) {
        if (aEqual(y3, winOne) || aEqual(y3, winTwo)){
            win = true}}

    if (x1.includes(1) === false) {
        if (aEqual(x1, winOne) || aEqual(x1, winTwo)){
            win = true}}
    if (x2.includes(1) === false) {
        if (aEqual(x2, winOne) || aEqual(x2, winTwo)){
            win = true}}
    if (x3.includes(1) === false) {
        if (aEqual(x3, winOne) || aEqual(x3, winTwo)){
            win = true}}
    

    if (z1.includes(1) === false) {
        if (aEqual(z1, winOne) || aEqual(z1, winTwo)){
            win = true}}
    if (z2.includes(1) === false) {
        if (aEqual(z2, winOne) || aEqual(z2, winTwo)){
            win = true}}

    return win

}