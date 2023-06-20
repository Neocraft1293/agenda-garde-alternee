from datetime import datetime, timedelta
from icalendar import Calendar, Event

# Fonction pour créer un nouvel événement à partir d'un événement existant
def create_new_event(event, start_date, end_date, period):
    new_event = Event()
    new_event.add('summary', event.get('summary'))
    new_event.add('dtstart', start_date)
    new_event.add('dtend', end_date)
    new_event.add('description', f"{period}")
    return new_event

# Fonction pour sauvegarder un calendrier dans un fichier .ics
def save_calendar(calendar, filename):
    with open(filename, 'wb') as f:
        f.write(calendar.to_ical())

# Charger le fichier .ics
with open('./vacances.ics', 'rb') as f:
    calendar = Calendar.from_ical(f.read())

new_calendar = Calendar()

# Initialisation des compteurs pour les logs
total_events = 0
ignored_events = 0

# Séparer les événements selon les règles spécifiées
for event in calendar.walk('VEVENT'):
    total_events += 1

    summary = event.get('summary')
    description = event.get('description')

    if not summary or not summary.startswith('Vacances'):
        print(f"Événement ignoré (V) (Résumé invalide) : {summary}")
        ignored_events += 1
        continue

    if description and 'Enseignants' in description:
        print(f"Événement ignoré (E) (Description invalide) : {summary}")
        ignored_events += 1
        continue

    start_date = event.get('dtstart').dt
    end_date = event.get('dtend').dt

    duration = end_date - start_date

    # Événements de 16 jours
    if duration == timedelta(days=16):
        first_period_start = start_date
        first_period_end = start_date + timedelta(days=8)
        second_period_start = first_period_end
        second_period_end = end_date

        new_event = create_new_event(event, first_period_start, first_period_end, "PV Période 1")
        new_calendar.add_component(new_event)
        new_event = create_new_event(event, second_period_start, second_period_end, "PV Période 2")
        new_calendar.add_component(new_event)

    # Événements de 58 jours
    elif duration == timedelta(days=58):
        first_period_start = start_date
        first_period_end = start_date + timedelta(days=14)
        second_period_start = first_period_end
        second_period_end = start_date + timedelta(days=28)
        third_period_start = second_period_end
        third_period_end = start_date + timedelta(days=42)
        fourth_period_start = third_period_end
        fourth_period_end = end_date

        new_event = create_new_event(event, first_period_start, first_period_end, "GV Période 1")
        new_calendar.add_component(new_event)
        new_event = create_new_event(event, second_period_start, second_period_end, "GV Période 2")
        new_calendar.add_component(new_event)
        new_event = create_new_event(event, third_period_start, third_period_end, "GV Période 3")
        new_calendar.add_component(new_event)
        new_event = create_new_event(event, fourth_period_start, fourth_period_end, "GV Période 4")
        new_calendar.add_component(new_event)

    # Événements de durée différente
    else:
        new_event = create_new_event(event, start_date, end_date, "Période unique")
        new_calendar.add_component(new_event)

# Sauvegarder les événements filtrés dans "vac-mod.ics"
save_calendar(new_calendar, 'vac-mod.ics')
print(f"Total d'événements : {total_events}")
print(f"Événements ignorés : {ignored_events}")
print("Fichier vac-mod.ics créé avec succès.")