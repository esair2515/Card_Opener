document.getElementById('open-pack').addEventListener('click', openPack);

function openPack() {
    const cardContainer = document.getElementById('card-container');
    cardContainer.innerHTML = ''; // Clear previous cards

    const cards = generateCards();
    displayCards(cards);
}

function generateCards() {
    const possibleCards = ['Card A', 'Card B', 'Card C', 'Card D', 'Card E'];
    const selectedCards = [];

    for (let i = 0; i < 3; i++) { // Generate 3 random cards
        const randomIndex = Math.floor(Math.random() * possibleCards.length);
        selectedCards.push(possibleCards[randomIndex]);
    }

    return selectedCards;
}

function displayCards(cards) {
    const cardContainer = document.getElementById('card-container');

    cards.forEach(card => {
        const cardElement = document.createElement('div');
        cardElement.classList.add('card');
        cardElement.textContent = card;
        cardContainer.appendChild(cardElement);
    });
}
