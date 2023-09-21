const moment = require('moment');
const ical = require('ical-generator');
const fs = require('fs');

const currentYear = moment().year();
const nextYear = moment().add(1, 'year').year();

function genererEvenements() {
  const cal = ical.default({name: 'my cal'});

  for (let year of [currentYear, nextYear]) {
    for (let month = 0; month < 12; month++) {
      const dateDebut = moment({ year, month, day: 1 }).startOf('month').day(6);

      if (dateDebut.clone().add(4, 'weeks').month() === month) {
        const dateDebutCinquiemeWeekend = dateDebut.clone().add(4, 'weeks').day(5).hour(19);
        const dateFinCinquiemeWeekend = dateDebutCinquiemeWeekend.clone().add(2, 'days').hour(19);

        const eventCinquiemeWeekend = cal.createEvent({
          start: dateDebutCinquiemeWeekend.toDate(),
          end: dateFinCinquiemeWeekend.toDate(),
          summary: 'Événement planifié - Cinquième week-end',
        });

        console.log('Événement planifié du', dateDebutCinquiemeWeekend.format('YYYY-MM-DD HH:mm'), 'au', dateFinCinquiemeWeekend.format('YYYY-MM-DD HH:mm'));
      }

      const dateDebutPremierWeekend = dateDebut.clone().day(5).hour(19);
      const dateFinPremierWeekend = dateDebutPremierWeekend.clone().add(2, 'days').hour(19);

      const eventPremierWeekend = cal.createEvent({
        start: dateDebutPremierWeekend.toDate(),
        end: dateFinPremierWeekend.toDate(),
        summary: 'Événement planifié - Premier week-end',
      });

      console.log('Événement planifié du', dateDebutPremierWeekend.format('YYYY-MM-DD HH:mm'), 'au', dateFinPremierWeekend.format('YYYY-MM-DD HH:mm'));

      const dateDebutTroisiemeWeekend = dateDebut.clone().add(2, 'weeks').day(5).hour(19);
      const dateFinTroisiemeWeekend = dateDebutTroisiemeWeekend.clone().add(2, 'days').hour(19);

      const eventTroisiemeWeekend = cal.createEvent({
        start: dateDebutTroisiemeWeekend.toDate(),
        end: dateFinTroisiemeWeekend.toDate(),
        summary: 'Événement planifié - Troisième week-end',
      });

      console.log('Événement planifié du', dateDebutTroisiemeWeekend.format('YYYY-MM-DD HH:mm'), 'au', dateFinTroisiemeWeekend.format('YYYY-MM-DD HH:mm'));
    }
  }

  const icsData = cal.toString();
  fs.writeFileSync('week-end.ics', icsData, 'utf8');
  console.log('Agenda sauvegardé dans agenda.ics');
}

console.log('Début de la génération des événements...');
genererEvenements();
console.log('Fin de la génération des événements.');
