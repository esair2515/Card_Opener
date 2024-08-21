const cards = [
    { id: 1, name: 'Card 1', rarity: 'common' },
    { id: 2, name: 'Card 2', rarity: 'rare' },
    { id: 3, name: 'Card 3', rarity: 'mythic' },
    { id: 4, name: 'Card 4', rarity: 'legendary' },
];

const collection = [];

function getRarityColor(rarity) {
    switch (rarity) {
        case 'common':
            return 'blue';
        case 'rare':
            return 'yellow';
        case 'mythic':
            return 'red';
        case 'legendary':
            return 'purple';
    }
}

function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.id = card.id;

    const front = document.createElement('div');
    front.classList.add('card-front');
    front.textContent = card.name;

    const back = document.createElement('div');
    back.classList.add('card-back');
    back.style.backgroundColor = getRarityColor(card.rarity);

    cardElement.appendChild(front);
    cardElement.appendChild(back);

    cardElement.addEventListener('click', () => {
        saveToCollection(card);
    });

    return cardElement;
}

function renderCards() {
    const container = document.querySelector('.card-container');
    container.innerHTML = '';
    cards.forEach(card => {
        const cardElement = createCardElement(card);
        container.appendChild(cardElement);
    });
}

function saveToCollection(card) {
    collection.push(card);
    updateCollection();
}

function updateCollection() {
    const collectionContainer = document.querySelector('.collection-container');
    collectionContainer.innerHTML = '';
    collection.forEach(card => {
        const cardElement = createCardElement(card);
        collectionContainer.appendChild(cardElement);
    });
}

renderCards();
