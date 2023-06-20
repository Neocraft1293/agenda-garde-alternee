#!/bin/bash
rm ./*.ics


echo "Lancement du script vac.js..."
node vac.js

if [ $? -eq 0 ]; then
  echo "Le script vac.js s'est terminé avec succès."
else
  echo "Erreur lors de l'exécution du script vac.js."
fi

echo "Lancement du script week-end.js..."
node week-end.js

if [ $? -eq 0 ]; then
  echo "Le script week-end.js s'est terminé avec succès."
else
  echo "Erreur lors de l'exécution du script week-end.js."
fi

echo "Lancement du script script.py..."
python script.py

if [ $? -eq 0 ]; then
  echo "Le script Python s'est terminé avec succès."
else
  echo "Erreur lors de l'exécution du script script.py."
fi

echo "Lancement du script vac-mod.py..."
python vac-mod.py

if [ $? -eq 0 ]; then
  echo "Le script Python s'est terminé avec succès."
else
  echo "Erreur lors de l'exécution du script vac-mod.py."
fi

echo "Lancement du script vacances-mod.py..."
python vacances-mod.py

if [ $? -eq 0 ]; then
  echo "Le script Python s'est terminé avec succès."
else
  echo "Erreur lors de l'exécution du script vacances-mod.py."
fi

echo "Lancement du script agenda.py..."
python agenda.py

if [ $? -eq 0 ]; then
  echo "Le script Python s'est terminé avec succès."
else
  echo "Erreur lors de l'exécution du script agenda.py."
fi

echo "Lancement du script index.js..."
node index.js

if [ $? -eq 0 ]; then
  echo "Le script s'est terminé avec succès."
else
  echo "Erreur lors de l'exécution du script index.js."
fi