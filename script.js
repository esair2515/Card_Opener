const rarities = ['common', 'rare', 'ultra-rare'];
const cards = {
    'common': ['Card 1', 'Card 2', 'Card 3'],
    'rare': ['Card 4', 'Card 5'],
    'ultra-rare': ['Card 6']
};

function getRandomCard() {
    const rarityProbabilities = {
        'common': 0.7, // 70%
        'rare': 0.2,   // 20%
        'ultra-rare': 0.1 // 10%
    };

    let cumulativeProbability = 0;
    const random = Math.random();

    for (const rarity in rarityProbabilities) {
        cumulativeProbability += rarityProbabilities[rarity];
        if (random < cumulativeProbability) {
            const cardList = cards[rarity];
            const cardName = cardList[Math.floor(Math.random() * cardList.length)];
            return { name: cardName, rarity: rarity };
        }
    }
}

function showAnimation() {
    document.getElementById('animation').style.display = 'flex';
    setTimeout(() => {
        document.getElementById('animation').style.display = 'none';
    }, 2000); // Duration of the animation
}

function openPack() {
    showAnimation();
    setTimeout(() => {
        const numberOfCards = 5; // Number of cards per pack
        const collectionDiv = document.getElementById('cards');
        collectionDiv.innerHTML = ''; // Clear previous cards

        for (let i = 0; i < numberOfCards; i++) {
            const card = getRandomCard();
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('card', card.rarity);
            cardDiv.innerHTML = `<p>${card.name}</p>`;
            collectionDiv.appendChild(cardDiv);
        }
    }, 2000); // Delay card opening to match the animation
}
