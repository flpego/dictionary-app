const searchButton = document.querySelector("#search-button");
const result = document.querySelector('#result');
const sound = document.querySelector('#sound');


async function apiRequest() {
    const inputWord = document.querySelector("#input-word").value;

    console.log(inputWord)
    try {
        const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`);
        const data = await res.json()
        console.log(data)

        if (data.title === 'No Definitions Found') {

            result.innerHTML = `<h4>${data.title}</h4>`

        } else {
            // Mostrar resultados normales si se encontraron definiciones
            result.innerHTML = `
            <h4>${inputWord}</h4>
            <div class="word-header-container">
            <p>Fonética: ${data[0].phonetic}</p>
            <button onclick="playSound()">Sound</button>
            </div>
    
      
            <div class="definitions-container">
            <h4>definitions</h4>
              <ul>
                ${data[0].meanings[0].definitions.map(definition => `
                <li>${definition.definition}</li>
                `).join("")}
              </ul>
            </div>

            <div class="synonym-container">    
            <h4>synonyms</h4>
            <ul>
            ${data[0].meanings[0].synonyms.map(synonym => `
            <li>${synonym}</li>
            `).join('')}
          </ul>
            </div>            
      
           
            <p></p>
            `;

            sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
            console.log(sound);
        }

    } catch (error) {
        console.error("Error en la solicitud a la API:", error.message);
        result.innerHTML = `<h4>404</h4>`;
    }

}

function playSound() {
    sound.play();
}

searchButton.addEventListener("click", function (e) {
    e.preventDefault();
    apiRequest();
})


