/*
document.addEventListener('DOMContentLoaded', function () {
  fetch('http://localhost:5000/livre')
      .then(response => response.json())
      .then(data => {
          const container = document.querySelector('#livres .d-flex');
          if (!container) {
              console.error("Erreur : L'élément #livres .d-flex n'existe pas.");
              return;
          }

          container.innerHTML = ''; // Vider le conteneur avant d'ajouter du contenu

          data.forEach(livre => {
              console.log(livre);

              // Création de l'élément de la carte
              const cardDiv = document.createElement('div');
              cardDiv.classList.add("card", "col-12", "col-md-6", "col-lg-4", "col-xl-3", "col-xxl-2", "mb-4");
              cardDiv.style.width = "15rem";
              cardDiv.style.height = "36rem";

              // Construction du contenu de la carte
              cardDiv.innerHTML = `
                  <img src="${livre.image}" class="card-img-top" alt="${livre.title}">
                  <div class="card-body">
                      <h5 class="card-title">${livre.title}</h5>
                      <p class="card-text">${livre.description}</p>
                  </div>
                  <ul class="list-group list-group-flush">
                      <li class="list-group-item"><strong>Auteur:</strong> ${livre.author}</li>
                      <li class="list-group-item"><strong>Éditeur:</strong> ${livre.publisher}</li>
                      <li class="list-group-item"><strong>Année:</strong> ${livre.year}</li>
                      <li class="list-group-item"><strong>Proposé par:</strong> ${livre.proposed_by}</li>
                  </ul>
                  <div class="card-body">
                      ${(Array.isArray(livre.links) && livre.links.length > 0) 
                          ? livre.links.map(link => `<a href="${link.url}" class="card-link">${link.text}</a>`).join(' ') 
                          : ''}
                  </div>
              `;

              // Ajout de la carte au container
              container.appendChild(cardDiv);
          });
      })
      .catch(error => console.error('Erreur lors de la récupération des livres:', error));
});

*/


//ACTEURS

document.addEventListener('DOMContentLoaded', function () {
    fetch('http://localhost:5000/acteur') 
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erreur HTTP ! Statut : ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log("Données reçues :", data);

            const acteurContainer = document.getElementById('acteurs-container');
            if (!acteurContainer) {
                console.error("Erreur : L'élément #acteurs-container n'existe pas.");
                return;
            }

            acteurContainer.innerHTML = ''; // Vider le conteneur avant d'ajouter du contenu

            data.forEach(acteur => {
                console.log("Ajout de l'acteur :", acteur);

                const cardDiv = document.createElement('div');
                cardDiv.classList.add("col-12", "col-md-6", "col-lg-4", "col-xl-3", "col-xxl-2", "mb-4");

                cardDiv.innerHTML = `
                    <div class="card" style="width: 18rem;">
                        <img src="${acteur.image}" class="card-img-top" alt="${acteur.name}">
                        <div class="card-body">
                            <h5 class="card-title">${acteur.name} (${acteur.books.length} Livres)</h5>
                        </div>
                        <ul class="list-group list-group-flush">
                            <li class="list-group-item"><strong>Pays d'origine :</strong> ${acteur.country}</li>
                            <li class="list-group-item"><strong>Année de naissance :</strong> ${acteur.birth_year}</li>
                            <li class="list-group-item"><strong>Année de décès :</strong> ${acteur.death_year ?? '-'}</li>
                            <li class="list-group-item">
                                <h6>Livres :</h6>
                                <ul>
                                    ${acteur.books.map(book => `<li><a href="livres.html?auteur=${encodeURIComponent(acteur.name)}&livre=${encodeURIComponent(book.title)}">${book.title}</a></li>`).join('')}
                                </ul>
                            </li>
                        </ul>
                    </div>
                `;

                acteurContainer.appendChild(cardDiv);
            });
        })
        .catch(error => console.error('Erreur lors de la récupération des acteurs:', error));
});
