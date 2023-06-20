const axios = require('axios');
const fs = require('fs');

const url = 'https://fr.ftp.opendatasoft.com/openscol/fr-en-calendrier-scolaire/Zone-A.ics';
const fichierSortie = 'vacances.ics';

axios.get(url, { responseType: 'stream' })
  .then(response => {
    response.data.pipe(fs.createWriteStream(fichierSortie));
    console.log('Le fichier ICS a été téléchargé avec succès et sauvegardé dans', fichierSortie);
  })
  .catch(error => {
    console.error('Une erreur s\'est produite lors du téléchargement du fichier ICS :', error);
  });
