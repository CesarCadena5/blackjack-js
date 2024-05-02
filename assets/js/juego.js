(() => {
    'use strict';

    let deck = [];
    const types = ['C', 'D', 'H', 'S'],
        specials = ['A', 'J', 'Q', 'K'];

    const msg = document.querySelector('#messages'),
        text = document.querySelectorAll('small'),
        btnOrder = document.querySelector('#orderCard'),
        btnStop = document.querySelector('#stopGame'),
        btnNew = document.querySelector('#newGame');

    let containerCardsPlayer = document.querySelector('#player-cards'),
        containerCardsComputer = document.querySelector('#computer-cards');

    let pointsPlayer = 0;
    let pointsComputer = 0;

    const initDeck = () => {
        deck = createDeck();
    };

    const createDeck = () => {
        deck = [];
        for (let index = 2; index <= 10; index++) {
            for (const type of types) {
                deck.push(index + type);
            }
        }

        for (const type of types) {
            for (const special of specials) {
                deck.push(special + type);
            }
        }

        return _.shuffle(deck);
    };

    const orderCard = () => deck.shift();

    const valueCard = (card) => {
        const value = card.substring(0, card.length - 1);
        return (isNaN(value)) ? (value === 'A') ? 11 : 10 : value * 1;
    };

    const computerShift = () => {
        do {
            const card = orderCard();
            pointsComputer = pointsComputer + valueCard(card);
            text[1].innerText = pointsComputer;
            createCard(card, containerCardsComputer, "computer");

            if (pointsPlayer > 21) {
                break;
            }
        } while ((pointsComputer < pointsPlayer) && (pointsPlayer <= 21));
    };

    const createAlert = (message, color) => {
        const alert = document.createElement('div');
        alert.role = 'alert';

        alert.classList.add('alert');
        alert.classList.add(`alert-${color}`);
        alert.innerText = message;
        btnOrder.disabled = true;
        btnStop.disabled = true;

        msg.append(alert);
    };

    const executeValidation = (type) => {
        if (type === "player" && pointsPlayer > 21) {
            createAlert("¡¡Lo siento, perdiste😓!!", "danger");
            computerShift();
        } else if (type === "player" && pointsPlayer === 21) {
            createAlert("¡¡Síííí, ganaste🤪!!", "success");
            computerShift();
        } else if (type === "computer" && pointsComputer <= 21 && pointsComputer > pointsPlayer) {
            createAlert("¡¡La computadora gana🌞!!", "success");
        } else if (type === "computer" && pointsComputer === pointsPlayer) {
            createAlert("¡¡Juego empatado ⭐!!");
        } else if (type === "computer" && pointsComputer > 21 && pointsPlayer <= 21) {
            createAlert("¡¡Síííí, ganaste🤪!!", "success");
        }
    };

    const createCard = (card, container, type) => {
        const img = document.createElement('img');
        img.classList.add('cards');
        img.src = `assets/cartas/${card}.png`;
        img.alt = card;

        container.append(img);
        executeValidation(type);
    };

    // Eventos
    btnOrder.addEventListener('click', () => {
        initDeck();
        const card = orderCard();
        pointsPlayer = pointsPlayer + valueCard(card);
        text[0].innerText = pointsPlayer;
        createCard(card, containerCardsPlayer, "player");
    });

    btnStop.addEventListener('click', () => {
        btnOrder.disabled = true;
        btnStop.disabled = true;
        computerShift();
    });

    btnNew.addEventListener('click', () => {
        location.reload();
    });
})();