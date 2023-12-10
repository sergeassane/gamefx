document.addEventListener('DOMContentLoaded', function () {
    const attemptsElement = document.getElementById('attempts');
    const timerElement = document.getElementById('timer');
    const gameOverElement = document.getElementById('game-over');
    const grid = document.querySelector('#game-board');
    const startButton = document.getElementById('start-game');

    let cardsChosen = [];
    let cardsChosenId = [];
    let cardsWon = [];
    let matches = 0;
    let attempts = 3;
    let seconds = 0;
    let timer;

    const cardArray = [
        { name: 'card1', img: 'images/ima1.png' },
        { name: 'card1', img: 'images/ima1.png' },
        { name: 'card2', img: 'images/ima2.png' },
        { name: 'card2', img: 'images/ima2.png'},
        { name: 'card3', img: 'images/ima3.png' },
        { name: 'card3', img: 'images/ima3.png' },
        { name: 'card4', img: 'images/ima4.png' },
        { name: 'card4', img: 'images/ima4.png' },
        { name: 'card5', img: 'images/ima5.png' },
        { name: 'card5', img: 'images/ima5.png' },
        { name: 'card6', img: 'images/ima6.png' },
        { name: 'card6', img: 'images/ima6.png' },
        { name: 'card7', img: 'images/ima7.png' },
        { name: 'card7', img: 'images/ima7.png' },
        { name: 'card8', img: 'images/ima8.png' },
        { name: 'card8', img: 'images/ima8.png' },
        { name: 'card9', img: 'images/ima9.png' },
        { name: 'card9', img: 'images/ima9.png' },
        { name: 'card10', img:'images/ima10.png'},
        { name: 'card10', img:'images/ima10.png' },
// ...add more pairs as needed
];

    function shuffle(array) {
        array.sort(() => 0.5 - Math.random());
    }

    function createBoard() {
        shuffle(cardArray);
        grid.innerHTML = '';
        cardsWon = [];

        for (let i = 0; i < cardArray.length; i++) {
            const card = document.createElement('img');
            card.setAttribute('src', 'images/blank.png');
            card.setAttribute('data-id', i);
            card.addEventListener('click', flipCard);
            grid.appendChild(card);
        }
    }

    function flipCard() {
        let cardId = this.getAttribute('data-id');
        if (!cardsChosenId.includes(cardId)) {
            cardsChosen.push(cardArray[cardId].name);
            cardsChosenId.push(cardId);
            this.setAttribute('src', cardArray[cardId].img);
            if (cardsChosen.length === 2) {
                setTimeout(checkForMatch, 500);
            }
        }
    }

    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);
        } else {
            cards[firstCardId].setAttribute('src', 'images/blank.png');
            cards[secondCardId].setAttribute('src', 'images/blank.png');
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You found them all!');
        }
    }

    startButton.addEventListener('click', createBoard);
});


    // Add the audio element
    const audio = new Audio('C:\Users\YAMEOGO\Desktop\Music\Rihanna - Diamonds.mp3');

    function checkForMatch() {
        const cards = document.querySelectorAll('#game-board img');
        const firstCardId = cardsChosenId[0];
        const secondCardId = cardsChosenId[1];

        if (cardsChosen[0] === cardsChosen[1] && firstCardId !== secondCardId) {
            cards[firstCardId].style.visibility = 'hidden';
            cards[secondCardId].style.visibility = 'hidden';
            cards[firstCardId].removeEventListener('click', flipCard);
            cards[secondCardId].removeEventListener('click', flipCard);
            cardsWon.push(cardsChosen);

            // Play the music when a match is found
            audio.play();
        } else {
            cards[firstCardId].setAttribute('src', 'images/blank.png');
            cards[secondCardId].setAttribute('src', 'images/blank.png');
        }

        cardsChosen = [];
        cardsChosenId = [];

        if (cardsWon.length === cardArray.length / 2) {
            alert('Congratulations! You found them all!');
        }
    }
   

    function checkForMatch() {
        const isMatch = firstCard.dataset.value === secondCard.dataset.value;

        isMatch ? disableCards() : unflipCards();
        updateAttempts();
    }

    function disableCards() {
        matches++;

        if (matches === 4) {
            gameOver(true);
            return;
        }

        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);

        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 1000);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function updateAttempts() {
        attempts--;
        attemptsElement.textContent = `Attempts left: ${attempts}`;

        if (attempts === 3) {
            gameOver(false);
        }
    }

    function updateTimer() {
        seconds++;
        timerElement.textContent = `Time: ${seconds}s`;

        if (seconds >= 120) {
            gameOver(false);
        }
    }

    function startTimer() {
        timer = setInterval(updateTimer, 1000);
    }

    function stopTimer() {
        clearInterval(timer);
    }

    function gameOver(win) {
        lockBoard = true;
        stopTimer();

        if (win) {
            gameOverElement.textContent = 'Congratulations! You matched all cards!';
        } else {
            gameOverElement.textContent = 'Game Over! You ran out of attempts or took too long.';
        }

        gameOverElement.style.display = 'block';
    }

    function init() {
        startGameButton.addEventListener('click', function () {
            attempts = 3;
            matches = 0;
            seconds = 0;

            attemptsElement.textContent = `Attempts left: ${attempts}`;
            timerElement.textContent = `Time: ${seconds}s`;

            gameOverElement.style.display = 'none';

            gameContainer.innerHTML = '';
            createCards();
            startTimer();
        });

        createCards();
    }

