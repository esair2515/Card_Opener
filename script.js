const cards = [
    { id: 1, name: 'Card 1', rarity: 'common' },
    { id: 2, name: 'Card 2', rarity: 'rare' },
    { id: 3, name: 'Card 3', rarity: 'mythic' },
    { id: 4, name: 'Card 4', rarity: 'legendary' },
];

let collection = [];

function getRarityColor(rarity) {
    switch (rarity) {
        case 'common':
            return 'rgba(0, 0, 255, 0.3)';
        case 'rare':
            return 'rgba(255, 255, 0, 0.3)';
        case 'mythic':
            return 'rgba(255, 0, 0, 0.3)';
        case 'legendary':
            return 'rgba(128, 0, 128, 0.3)';
    }
}

function createCardElement(card) {
    const cardElement = document.createElement('div');
    cardElement.classList.add('card');
    cardElement.dataset.id = card.id;
    cardElement.draggable = true;

    const front = document.createElement('div');
    front.classList.add('card-front');
    front.textContent = card.name;
    front.style.backgroundColor = getRarityColor(card.rarity);

    const back = document.createElement('div');
    back.classList.add('card-back');

    cardElement.appendChild(front);
    cardElement.appendChild(back);

    cardElement.addEventListener('click', () => {
        cardElement.classList.toggle('flip');
        showModal(card);
    });

    cardElement.addEventListener('dragstart', handleDragStart);

    return cardElement;
}

function handleDragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.dataset.id);
}

function handleDrop(event) {
    event.preventDefault();
    const cardId = event.dataTransfer.getData('text/plain');
    const card = cards.find(c => c.id == cardId);
    if (card && !collection.some(c => c.id == cardId)) {
        saveToCollection(card);
    } else if (collection.some(c => c.id == cardId)) {
        removeFromCollection(cardId);
    }
}

function handleDragOver(event) {
    event.preventDefault();
}

function renderCards(cardsToRender) {
    const container = document.querySelector('.card-container');
    container.innerHTML = '';
    cardsToRender.forEach(card => {
        const cardElement = createCardElement(card);
        container.appendChild(cardElement);
    });
}

function saveToCollection(card) {
    collection.push(card);
    updateCollection();
    localStorage.setItem('collection', JSON.stringify(collection));
}

function removeFromCollection(cardId) {
    collection = collection.filter(card => card.id != cardId);
    updateCollection();
    localStorage.setItem('collection', JSON.stringify(collection));
}

function updateCollection() {
    const collectionContainer = document.querySelector('.collection-container');
    collectionContainer.innerHTML = '';
    collection.forEach(card => {
        const cardElement = createCardElement(card);
        collectionContainer.appendChild(cardElement);
    });
}

function loadCollection() {
    const savedCollection = localStorage.getItem('collection');
    if (savedCollection) {
        collection = JSON.parse(savedCollection);
        updateCollection();
    }
}

function showModal(card) {
    const modal = document.getElementById('card-modal');
    const modalBody = modal.querySelector('.modal-body');
    modalBody.textContent = `${card.name} - ${card.rarity}`;
    modal.style.display = 'block';

    document.getElementById('save-card').onclick = () => saveToCollection(card);
}

document.querySelector('.close-modal').addEventListener('click', () => {
    document.getElementById('card-modal').style.display = 'none';
});

document.getElementById('search-bar').addEventListener('input', (event) => {
    const searchText = event.target.value.toLowerCase();
    const filteredCards = cards.filter(card => card.name.toLowerCase().includes(searchText));
    renderCards(filteredCards);
});

document.getElementById('sort-options').addEventListener('change', (event) => {
    const sortBy = event.target.value;
    const sortedCards = [...cards].sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    renderCards(sortedCards);
});

document.getElementById('start-collection').addEventListener('click', () => {
    document.getElementById('home-screen').style.display = 'none';
    document.getElementById('main-content').style.display = 'block';
});

const collectionContainer = document.querySelector('.collection-container');
collectionContainer.addEventListener('dragover', handleDragOver);
collectionContainer.addEventListener('drop', handleDrop);

loadCollection();
renderCards(cards);
