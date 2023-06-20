from datetime import datetime
from ics import Calendar, Event

# Charger les événements du fichier week-end.ics
weekend_calendar = Calendar(open('./week-end.ics', 'r').read())

# Charger les événements du fichier vacances.ics
vacation_calendar = Calendar(open('./vacances.ics', 'r').read())

# Récupérer les événements du week-end
weekend_events = list(weekend_calendar.events)

# Filtrer les événements du week-end qui chevauchent les vacances
filtered_events = []
num_events_removed = 0
for weekend_event in weekend_events:
    overlap = False
    for vacation_event in vacation_calendar.events:
        if weekend_event.begin <= vacation_event.end and weekend_event.end >= vacation_event.begin:
            overlap = True
            break
    if not overlap:
        filtered_events.append(weekend_event)
    else:
        num_events_removed += 1

print("Nombre d'événements du week-end:", len(weekend_events))
print("Nombre d'événements de vacances:", len(vacation_calendar.events))
print("Nombre d'événements supprimés:", num_events_removed)

# Créer un nouvel agenda avec les événements filtrés
filtered_calendar = Calendar()
for event in filtered_events:
    filtered_calendar.events.add(event)

# Écrire le nouvel agenda dans un fichier agenda.ics
with open('week-end-mod.ics', 'w') as output_file:
    output_file.writelines(filtered_calendar)

print("Le fichier agenda.ics a été généré avec succès.")
