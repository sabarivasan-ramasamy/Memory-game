const cardArray = [
    { name: 'rohit', img: 'images/rohit.jpeg' },
    { name: 'ms', img: 'images/ms.jpeg' },
    { name: 'virat', img: 'images/virat.jpeg' },
    { name: 'bumrah', img: 'images/bumrah.jpeg' },
    { name: 'kl', img: 'images/kl.jpeg' },
    { name: 'sachin', img: 'images/sachin.jpeg' },
    { name: 'rohit', img: 'images/rohit.jpeg' },
    { name: 'ms', img: 'images/ms.jpeg' },
    { name: 'virat', img: 'images/virat.jpeg' },
    { name: 'bumrah', img: 'images/bumrah.jpeg' },
    { name: 'kl', img: 'images/kl.jpeg' },
    { name: 'sachin', img: 'images/sachin.jpeg' }
]

cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
const resultDisplay = document.querySelector('#result')
const confettiContainer = document.getElementById('confetti')
let cardsChosen = []
let cardsChosenIds = []
let cardsWon = []

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        const card = document.createElement('img')
        card.setAttribute('src', 'images/white1.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridDisplay.appendChild(card)
    }
}

function checkMatch() {
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]

    if (optionOneId == optionTwoId) {
        cards[optionOneId].setAttribute('src', 'images/white1.png')
        cards[optionTwoId].setAttribute('src', 'images/white1.png')
        alert('You have clicked the same image!')
    } else if (cardsChosen[0] === cardsChosen[1]) {
        alert('You found a match')
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
    } else {
        cards[optionOneId].setAttribute('src', 'images/white1.png')
        cards[optionTwoId].setAttribute('src', 'images/white1.png')
        alert('Sorry, try again')
    }
    cardsChosen = []
    cardsChosenIds = []
    resultDisplay.textContent = cardsWon.length
    if (cardsWon.length === cardArray.length / 2) {
        resultDisplay.textContent = 'Congratulations! You found them all!'
        showConfetti()
    }
}

function flipCard() {
    const cardId = this.getAttribute('data-id')
    cardsChosen.push(cardArray[cardId].name)
    cardsChosenIds.push(cardId)
    this.setAttribute('src', cardArray[cardId].img)
    if (cardsChosen.length === 2) {
        setTimeout(checkMatch, 500)
    }
}

function showConfetti() {
    confettiContainer.style.display = 'block'
    for (let i = 0; i < 100; i++) {
        const confettiPiece = document.createElement('div')
        confettiPiece.classList.add('confetti-piece')
        confettiPiece.style.left = Math.random() * 100 + 'vw'
        confettiPiece.style.backgroundColor = getRandomColor()
        confettiPiece.style.animationDuration = Math.random() * 2 + 3 + 's'
        confettiContainer.appendChild(confettiPiece)
    }
    setTimeout(() => {
        confettiContainer.style.display = 'none'
        confettiContainer.innerHTML = '' // Clear confetti after animation
    }, 5000) // Show confetti for 5 seconds
}

function getRandomColor() {
    const colors = ['#ff0a54', '#ff477e', '#ff7096', '#ff85a1', '#fbb1bd', '#f9bec7']
    return colors[Math.floor(Math.random() * colors.length)]
}

createBoard()
