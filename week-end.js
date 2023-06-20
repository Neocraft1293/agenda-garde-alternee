const moment = require('moment');
const ical = require('ical-generator');
const fs = require('fs');

// Obtenez l'année en cours
const currentYear = moment().year();
// Obtenez l'année suivante
const nextYear = moment().add(1, 'year').year();

// Créez une fonction pour générer les événements et les sauvegarder dans un fichier .ics
function genererEvenements() {
  // Créez un générateur iCalendar
  const cal = ical();

  // Parcourez chaque année (année en cours et année suivante)
  for (let year of [currentYear, nextYear]) {
    // Parcourez chaque mois
    for (let month = 0; month < 12; month++) {
      // Définissez la date du premier jour du mois (le samedi correspondant)
      const dateDebut = moment({ year, month, day: 1 }).startOf('month').day(6);

      // Vérifiez si le mois a effectivement un cinquième week-end
      if (dateDebut.clone().add(4, 'weeks').month() === month) {
        // Calculez la date et l'heure de début du cinquième week-end (vendredi 19h)
        const dateDebutCinquiemeWeekend = dateDebut.clone().add(4, 'weeks').day(5).hour(19);

        // Calculez la date et l'heure de fin du cinquième week-end (dimanche 19h)
        const dateFinCinquiemeWeekend = dateDebutCinquiemeWeekend.clone().add(2, 'days').hour(19);

        // Créez l'événement pour le cinquième week-end
        const eventCinquiemeWeekend = cal.createEvent({
          start: dateDebutCinquiemeWeekend.toDate(),
          end: dateFinCinquiemeWeekend.toDate(),
          summary: 'Événement planifié - Cinquième week-end',
        });

        // Ajoutez ici le code pour personnaliser l'événement du cinquième week-end selon vos besoins

        console.log('Événement planifié du', dateDebutCinquiemeWeekend.format('YYYY-MM-DD HH:mm'), 'au', dateFinCinquiemeWeekend.format('YYYY-MM-DD HH:mm'));
      }

      // Calculez la date et l'heure de début du premier week-end (vendredi 19h)
      const dateDebutPremierWeekend = dateDebut.clone().day(5).hour(19);

      // Calculez la date et l'heure de fin du premier week-end (dimanche 19h)
      const dateFinPremierWeekend = dateDebutPremierWeekend.clone().add(2, 'days').hour(19);

      // Créez l'événement pour le premier week-end
      const eventPremierWeekend = cal.createEvent({
        start: dateDebutPremierWeekend.toDate(),
        end: dateFinPremierWeekend.toDate(),
        summary: 'Événement planifié - Premier week-end',
      });

      // Ajoutez ici le code pour personnaliser l'événement du premier week-end selon vos besoins

      console.log('Événement planifié du', dateDebutPremierWeekend.format('YYYY-MM-DD HH:mm'), 'au', dateFinPremierWeekend.format('YYYY-MM-DD HH:mm'));

      // Calculez la date et l'heure de début du troisième week-end (vendredi 19h)
      const dateDebutTroisiemeWeekend = dateDebut.clone().add(2, 'weeks').day(5).hour(19);

      // Calculez la date et l'heure de fin du troisième week-end (dimanche 19h)
      const dateFinTroisiemeWeekend = dateDebutTroisiemeWeekend.clone().add(2, 'days').hour(19);

      // Créez l'événement pour le troisième week-end
      const eventTroisiemeWeekend = cal.createEvent({
        start: dateDebutTroisiemeWeekend.toDate(),
        end: dateFinTroisiemeWeekend.toDate(),
        summary: 'Événement planifié - Troisième week-end',
      });

      // Ajoutez ici le code pour personnaliser l'événement du troisième week-end selon vos besoins

      console.log('Événement planifié du', dateDebutTroisiemeWeekend.format('YYYY-MM-DD HH:mm'), 'au', dateFinTroisiemeWeekend.format('YYYY-MM-DD HH:mm'));
    }
  }

  // Sauvegarde de l'agenda dans un fichier .ics
  const icsData = cal.toString();
  fs.writeFileSync('week-end.ics', icsData, 'utf8');
  console.log('Agenda sauvegardé dans agenda.ics');
}

// Appelez la fonction pour générer les événements et sauvegarder l'agenda
console.log('Début de la génération des événements...');
genererEvenements();
console.log('Fin de la génération des événements.');
