const API_KEY = 'PzxPDkiNzeWiwBfXsz8d69r8nOP0O4vNJ7HmFBaZ';
const API_URL = 'https://api.nasa.gov/planetary/apod';

document.addEventListener('DOMContentLoaded', () => {
    getCurrentImageOfTheDay();
    loadSearchHistory();
    
    const form = document.getElementById('search-form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const chead=document.getElementById('head1');
        
        const date = document.getElementById('search-input').value;
        if (date) {
            getImageOfTheDay(date);
            changehead(chead,date);
        }
    });
});

function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split('T')[0];
    fetchImageOfTheDay(currentDate);
}

function changehead(ch , date){ 
    ch.textContent = `Picture On ${date}`;
}

function getImageOfTheDay(date) {
    fetchImageOfTheDay(date);
    saveSearch(date);
    addSearchToHistory(date);
}

function fetchImageOfTheDay(date) {
    fetch(`${API_URL}?date=${date}&api_key=${API_KEY}`)
        .then(response => response.json())
        .then(data => {
            displayImage(data);
        })
        .catch(error => {
            console.error('Error fetching the image:', error);
        });
}

function displayImage(data) {
    const container = document.getElementById('current-image-container');
    container.innerHTML = `
        
        <img src="${data.url}" alt="${data.title}">
        <h4>${data.title}</h4>
        <p>${data.explanation}</p>
    `;
}

function saveSearch(date) {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    if (!searches.includes(date)) {
        searches.push(date);
        localStorage.setItem('searches', JSON.stringify(searches));
    }
}

function loadSearchHistory() {
    let searches = JSON.parse(localStorage.getItem('searches')) || [];
    searches.forEach(date => {
        addSearchToHistory(date);
    });
}

function addSearchToHistory(date) {
    const searchHistory = document.getElementById('search-history');
    const listItem = document.createElement('li');
    const chead1=document.getElementById('head1');
    listItem.textContent = date;
    listItem.addEventListener('click', () => {
        fetchImageOfTheDay(date);
        changehead(chead1,date);

    });
    searchHistory.appendChild(listItem);
}
