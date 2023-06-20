import datetime
from icalendar import Calendar, Event

def extract_events(file_path):
    with open(file_path, 'rb') as file:
        calendar = Calendar.from_ical(file.read())
        
        events = []
        for component in calendar.walk():
            if component.name == 'VEVENT':
                events.append(component)
        
        return events

# Chemin vers les fichiers ICS
weekend_file = './week-end-mod.ics'
vacation_file = './vacances-mod.ics'

# Création d'un nouvel agenda
new_agenda = Calendar()

# Extraction des événements du fichier week-end-mod.ics
weekend_events = extract_events(weekend_file)

# Extraction des événements du fichier vacances-mod.ics
vacation_events = extract_events(vacation_file)

# Ajout des événements du week-end à l'agenda
for event in weekend_events:
    new_agenda.add_component(event)

# Ajout des événements des vacances à l'agenda
for event in vacation_events:
    new_agenda.add_component(event)

# Enregistrement de l'agenda dans un fichier agenda.ics
with open('agenda.ics', 'wb') as file:
    file.write(new_agenda.to_ical())

print("Nouvel agenda généré avec succès.")
