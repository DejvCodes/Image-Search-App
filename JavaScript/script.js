// Import Access Key
import config from "../JavaScript/config.js"

// Variables
const accessKey = config.accessKey;
const searchForm = document.getElementById('search-form');
const searchBox = document.getElementById('search-box');
const searchResult = document.getElementById('search-result');
const showMoreBtn = document.getElementById('show-more-btn');

// Default values
let keyword = '';
let page = 0;

// Async function searchImages() 
const searchImages = async () => {
    try {
        // Hodnota zadaná do inputu
        keyword = searchBox.value.trim();
        // Kontrola zdali uživatel vyplnil input
        if (keyword === '') {
            alert('Enter your search image ...');
            return;
        }

        // Vytvoření URL adresy
        const URL = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
        
        // Připojení k API serveru (funkce fetch() zahájí asynchronní HTTP požadavek)
        const response = await fetch(URL);
        const data = await response.json();

        // Podmínka zajišťuje, že předchozí výsledky jsou smazány
        if (page === 1) {
            searchResult.innerHTML = '';
        }
        
        const results = data.results;

        // Procházení jednotlivých výsledků
        results.map((result) => {
            // Vytvoření <img> elementu + přidání URL adresy
            const image = document.createElement('img');
            image.src = result.urls.small; 

            // Vytvoření <a> elementu + přidání URL adresy
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = '_blank';

            // Přidání image k vytvořenému odkazu imageLink
            imageLink.appendChild(image);
            // Přidání imageLink do searchResult (zde budou výsledky vyhledávání)
            searchResult.appendChild(imageLink);
        });

        // Po načtení obrázku se zobrazí showMoreBtn
        if (results.length > 0) {
            showMoreBtn.style.display = 'block';
        } else {
            searchResult.innerHTML = ''; // Vymazání výsledků
            showMoreBtn.style.display = 'none'; // Skrytí showMoreBtn
            alert("We didn't find any image");
        }
    } catch(error) {
        console.error("Error fetching images:", error);
        alert("Error. Please try again later.");
    }
}

// Po odeslání formuláře se nastaví page na 1 a zavolá se funkce searchImages()
searchForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Zabrání aktualizování stránky
    page = 1;
    searchImages();
})

// Po stisknutí showMoreBtn se navýší počet stránek (počet obrázků)
showMoreBtn.addEventListener('click', () => {
    page++;
    searchImages();
})

// Metoda .map() v JavaScriptu projde každý prvek v poli a aplikuje definovanou funkci na každý prvek, vytvářejíc nové pole obsahující výsledky aplikace této funkce na každém prvku.