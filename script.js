let fetchMusica = (query, id) => {
    let section = document.querySelector(`#${id}`);
    let row = document.querySelector(`#${id}Section`);

// Fetch dei dati
fetch(`https://striveschool-api.herokuapp.com/api/deezer/search?q=${query}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Errore HTTP! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
       let variabile = data.data
       console.log(variabile)
       section.classList.remove('d-none');
     
     
       for (let i = 0; i < variabile.slice(0,4).length; i++) {
        let element = variabile[i];
    
        // Creazione dinamica delle card
        row.innerHTML += `
            <div class="col">
                <div class="card">
                    <img src="${element.album.cover_xl}" class="card-img-top" alt="${element.title}">
                    <div class="card-body">
                        <h5 class="card-title">${element.album.title}</h5>
                    </div>
                </div>
            </div>`;
    }
    

    })
    .catch(err => {
        console.error(`Errore durante il fetch per la query "${query}": ${err.message}`);
    });

}

// Chiamate alla funzione
fetchMusica('eminem', 'eminem');
fetchMusica('metallica', 'metallica');
fetchMusica('queen', 'queen');




