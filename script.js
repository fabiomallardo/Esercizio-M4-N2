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
     
     
       for (let i = 0; i < variabile.length; i++) {
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



let bottoni = document.querySelectorAll('.btn.btn-dark');

// Funzione per creare una lista dinamica
function crealista(variabile) {
    // Genera una lista HTML basata sull'array "variabile"
    let lista = '<ul>';
    variabile.forEach(element => {
        lista += `<li>${element.album.title}</li>`; // Accedi correttamente a `item.album.title`
    });
    lista += '</ul>';
    return lista;
}

// Itera sui bottoni per aggiungere il listener
bottoni.forEach(bottone => {
    bottone.addEventListener('click', function () {

        // Aggiungi il modal al body
        document.body.innerHTML += `
            <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">Nome Canzoni</h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            ${crealista(datiLista)} <!-- Inserisce la lista dinamica -->
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Chiudi</button>
                            <button type="button" class="btn btn-primary">Salva</button>
                        </div>
                    </div>
                </div>
            </div>`;

        // Attiva il modal
        let modal = new bootstrap.Modal(document.getElementById('exampleModal'));
        modal.show();
    });
});
