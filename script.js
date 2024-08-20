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

            const cardInner = document.createElement('div');
            cardInner.classList.add('card-inner');

            const cardFront = document.createElement('div');
            cardFront.classList.add('card-front');
            cardFront.innerHTML = `<p>${card.name}</p>`;

            const cardBack = document.createElement('div');
            cardBack.classList.add('card-back');
            cardBack.innerHTML = `<p>${card.name}</p>`;

            cardInner.appendChild(cardFront);
            cardInner.appendChild(cardBack);
            cardDiv.appendChild(cardInner);
            collectionDiv.appendChild(cardDiv);
        }
    }, 2000); // Delay card opening to match the animation
}
// Smooth Scroll for In-Page Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Loading Animation
window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.style.opacity = '0';
    setTimeout(() => {
        loader.style.display = 'none';
    }, 500);
});

// Interactive Element Animation
const elements = document.querySelectorAll('.container');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
});

elements.forEach(element => {
    observer.observe(element);
});
// Dynamic Content Loading
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY + window.innerHeight;
    const contentHeight = document.documentElement.scrollHeight;
    
    if (scrollPosition >= contentHeight - 100) {
        loadMoreContent();
    }
});

function loadMoreContent() {
    const container = document.querySelector('.content-container');
    for (let i = 0; i < 5; i++) {
        const newContent = document.createElement('div');
        newContent.classList.add('content-item');
        newContent.innerText = `New Content Item ${Math.random().toString(36).substring(7)}`;
        container.appendChild(newContent);
    }
}

// Modal Windows
document.querySelectorAll('.open-modal').forEach(button => {
    button.addEventListener('click', () => {
        const modal = document.querySelector('.modal');
        modal.style.display = 'block';
    });
});

document.querySelector('.modal-close').addEventListener('click', () => {
    document.querySelector('.modal').style.display = 'none';
});

// Notification System
function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.classList.add('notification', type);
    notification.innerText = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Example Notification
showNotification('Welcome to the site!', 'success');

// Dark Mode Toggle
const toggleSwitch = document.querySelector('.theme-switch input[type="checkbox"]');
toggleSwitch.addEventListener('change', switchTheme);

function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}
