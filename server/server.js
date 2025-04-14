const express = require("express");
const path = require('path');
const app = express();

// Servir Bootstrap, jQuery et Popper
app.use('/css', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/css')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/bootstrap/dist/js')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/jquery/dist')));
app.use('/js', express.static(path.join(__dirname, 'node_modules/@popperjs/dist')));

// Servir les fichiers statiques de 'front'
app.use(express.static(path.join(__dirname, '../front')));

// Route pour la page principale
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, '../front/index.html'));
});

app.listen(5000, () => {
  console.log('Listening on http://localhost:5000');
});


const fs = require('fs');


function lireFichierJSON(cheminFichier, res) {
  fs.readFile(path.join(__dirname, cheminFichier), "utf8", (err, data) => {
    if (err) {
      console.error(`Erreur lors de la lecture de ${cheminFichier} :`, err);
      res.status(500).json({ error: `Erreur lors de la lecture du fichier ${cheminFichier}` });
      return;
    }
    try {
      res.json(JSON.parse(data)); // Convertir et envoyer le JSON
    } catch (parseError) {
      console.error(`Erreur de parsing du fichier ${cheminFichier} :`, parseError);
      res.status(500).json({ error: `Erreur de parsing du fichier ${cheminFichier}` });
    }
  });
}

app.get("/livre", (req, res) => {
  lireFichierJSON("livre.json", res);
});

app.get("/acteur", (req, res) => {
  lireFichierJSON("acteur.json", res);
});



