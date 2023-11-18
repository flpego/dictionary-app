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
            //
            result.innerHTML = `<h4>${data.title}</h4>`

        } else {
            // Mostrar resultados normales si se encontraron definiciones
            result.innerHTML = renderResults(inputWord, data);

            sound.setAttribute("src", `${data[0].phonetics[0].audio}`);
            console.log(sound);

            const defListContainer = document.querySelector(".definitions-container");
            let defHTML = "";

            for (let i = 0; i < data[0].meanings.length; i++) {
                defHTML += `
                <div class="${data[0].meanings[i].partOfSpeech} def-grid">
                    <h4>${data[0].meanings[i].partOfSpeech}</h4>
                    <ul>
                    ${data[0].meanings[i].definitions.map(definition =>
                    `<li>${definition.definition}</li>`
                ).join("")}
                    </ul>
                </div>
                `
            }

            defListContainer.innerHTML = defHTML;


        }

    } catch (error) {
        console.error("Error en la solicitud a la API:", error.message);
        result.innerHTML = `<h4>404</h4>`;
    }

};

function renderResults(inputWord, data) {
    return ` <div class="word-header-container">
    <h4>${inputWord}</h4>
  <p>Fonética: <span>${data[0].phonetic}</span> </p>
  <button class="play-button" onclick="playSound()">Listen<i class="fa-solid fa-volume-high"></i></button>
</div>

<div class="definitions-container bg-svg">
</div>

<div class="synonym-container">
  <h4>Synonyms</h4>
  <ul>
    ${data[0].meanings[0].synonyms.length > 0
            ? data[0].meanings[0].synonyms.map(synonym => `
        <li>
        <a class="synonym-link" href="#">${synonym}</a>
      </li>`).join('')
            : '<li>No synonyms found</li>'}
  </ul>
</div>`
};



function playSound() {
    sound.play();
};

document.addEventListener("click", function (event) {
    if (event.target.classList.contains("synonym-link")) {
        event.preventDefault();

        const inputWord = event.target.textContent;

        fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${inputWord}`)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                //proximamente sera implementado el manejo a la nueva solicitud
            })
            .catch(error => {
                console.error("Error en la solicitud a la API:", error.message);
            });
    }
});


searchButton.addEventListener("click", function (e) {
    e.preventDefault();
    apiRequest();
});


