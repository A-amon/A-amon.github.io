const MOVES = ['paper', 'scissors', 'rock']
var playerMove, compMove
var score = 0

//read score from localstorage
getScore = () => {
    savedScore = window.localStorage.getItem("score")
    if (savedScore !== "undefined" && savedScore !== "null")
        score = savedScore
}

//save score to localstorage
//set displayed scored value
saveScore = () => {
    window.localStorage.setItem("score", score)
    document.getElementsByClassName("score__value")[0].textContent = score
}

startMatch = () => {
    setTimeout(() => {
        computerMove()
        displayWinner()
    }, 3000)
}

//display result 
displayWinner = () => {
    let winner = checkWinner()
    let resultFinal = document.getElementsByClassName("result__final")[0]
    let resultText = resultFinal.children[0]

    if (winner === "player") {
        resultText.textContent = "You win"
        let playerResult = document.getElementsByClassName("result__player")[0]
        playerResult.classList.add("winner")
    }
    else if (winner === "computer") {
        resultText.textContent = "You lose"
        let compResult = document.getElementsByClassName("result__computer")[0]
        compResult.classList.add("winner")
    }
    else
        resultText.textContent = "It's a draw"

    resultFinal.classList.add("show")
}

//check rules for winner
checkWinner = () => {
    let winner = "player"
    if (playerMove === compMove)
        winner = "draw"
    else if (playerMove === "paper" && compMove === "scissors")
        winner = "computer"
    else if (playerMove === "rock" && compMove === "paper")
        winner = "computer"
    else if (playerMove === "scissors" && compMove === "rock")
        winner = "computer"

    if (winner == "player")
        score++
    else if (winner === "computer")
        score > 0 ? score-- : score
    saveScore()
    return winner
}

//player select move
playerMove = (event) => {
    let selectedButton = event.target
    playerMove = selectedButton.getAttribute("data-value")

    let resultPlayer = document.getElementsByClassName("result__player")[0]
    let buttonImage = selectedButton.children[0]
    buttonImage.setAttribute("alt", buttonImage.getAttribute("alt").replace("Select ", ""))     //remove "Select" prompt in selected button's image for accessibility
    resultPlayer.replaceChild(selectedButton, resultPlayer.children[1])     //replace dummy button with selected button

    hideSelectEl()
    startMatch()
}

//hide .select
hideSelectEl = () => {
    let selectEl = document.getElementsByClassName("select")[0]
    selectEl.classList.add("hide")

    showResultEl()
}

//show .result
showResultEl = () => {
    let resultEl = document.getElementsByClassName("result")[0]
    resultEl.classList.remove("hide")
}

//computer select move
computerMove = () => {
    let randomInd = Math.floor(Math.random() * 3)
    compMove = MOVES[randomInd]

    let selectButtons = document.getElementsByClassName("select__button")

    let compButton = selectButtons[randomInd].cloneNode(true)
    let resultComp = document.getElementsByClassName("result__computer")[0]

    let buttonImage = compButton.children[0]
    buttonImage.setAttribute("alt", buttonImage.getAttribute("alt").replace("Select ", ""))     //remove "Select" prompt in selected button's image for accessibility

    resultComp.replaceChild(compButton, resultComp.children[1])     //replace dummy button with selected button
}

//open and close modal
handleRulesModal = () => {
    let rulesModal = document.getElementsByClassName("rules__modal")[0]
    if (rulesModal.classList.contains("show"))
        rulesModal.classList.remove('show')
    else
        rulesModal.classList.add("show")
}

//add click event to .select__button
let selectButtons = document.getElementsByClassName("select__button")

for (let button of selectButtons) {
    button.addEventListener("click", playerMove)
}

let againButtons = document.getElementsByClassName("again__button")

for (let againButton of againButtons) {
    againButton.addEventListener("click", () => {
        location.reload()
    })
}

getScore()
saveScore()

let rulesButton = document.getElementsByClassName("rules__button")[0]
rulesButton.addEventListener("click", handleRulesModal)

let modalCloseButton = document.getElementsByClassName("close__button")[0]
modalCloseButton.addEventListener("click", handleRulesModal)