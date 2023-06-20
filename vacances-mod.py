from icalendar import Calendar, Event

def filtrer_evenements(calendrier):
    periodes_filtrees = []

    for component in calendrier.walk():
        if component.name == "VEVENT":
            description = component.get("DESCRIPTION")
            if description and description == "PV Période 1" and annee_impair(component):
                periodes_filtrees.append(component)
            elif description and description == "PV Période 2" and annee_paire(component):
                periodes_filtrees.append(component)
            elif description and description == "GV Période 1" and annee_paire(component):
                periodes_filtrees.append(component)
            elif description and description == "GV Période 2" and annee_impair(component):
                periodes_filtrees.append(component)
            elif description and description == "GV Période 3" and annee_paire(component):
                periodes_filtrees.append(component)
            elif description and description == "GV Période 4" and annee_impair(component):
                periodes_filtrees.append(component)


            

    return periodes_filtrees

def annee_impair(event):
    dtstart = event.get("DTSTART").dt
    annee = dtstart.year
    return annee % 2 != 0

def annee_paire(event):
    dtstart = event.get("DTSTART").dt
    annee = dtstart.year
    return annee % 2 == 0

def main():
    fichier_entree = "./vac-mod.ics"
    fichier_sortie = "./vacances-mod.ics"

    with open(fichier_entree, "rb") as f:
        calendrier = Calendar.from_ical(f.read())

    evenements_filtres = filtrer_evenements(calendrier)

    calendrier_filtre = Calendar()
    for event in evenements_filtres:
        calendrier_filtre.add_component(event)

    with open(fichier_sortie, "wb") as f:
        f.write(calendrier_filtre.to_ical())

    print("Filtrage terminé. Les événements filtrés ont été enregistrés dans", fichier_sortie)

if __name__ == "__main__":
    main()
