# LAB 13 : Bypass de la Détection de Root Android avec Objection

## Description

Ce laboratoire explique comment contourner la détection de root dans une application Android en utilisant **ADB**, **Frida**, **frida-server** et **Objection**.

L’objectif principal est de lancer une application Android sous instrumentation, puis d’utiliser la commande Objection suivante :



Ce lab est réalisé uniquement dans un environnement contrôlé à des fins pédagogiques.

Objectifs du lab

À la fin de ce lab, nous devons être capables de :

Installer Objection sur le PC.
Installer Frida côté PC.
Télécharger et lancer frida-server sur Android.
Vérifier la connexion entre le PC et l’appareil Android.
Lancer une application cible avec Objection.
Exécuter un bypass de détection root.
Valider le résultat avant et après le bypass.
Comprendre les limites du bypass Java.
Utiliser Frida pour compléter le bypass si l’application utilise des checks natifs C/C++.
Environnement utilisé
Élément	Description
Système PC	Windows
Appareil Android	Émulateur Android ou appareil rooté
Outils	ADB, Frida, frida-server, Objection
Langages	Python, JavaScript
Cible	Application Android avec détection de root
Structure du dépôt GitHub
LAB13-Android-Root-Bypass-Objection/




#Installation recommandée avec pipx
pip install --user pipx
pipx ensurepath
pipx install objection
Installation classique avec pip
pip install --upgrade objection
Vérification de l’installation
objection --version
objection --help


<img width="976" height="280" alt="image" src="https://github.com/user-attachments/assets/30d30c3b-59fc-49f0-a957-5c1bc4e8df60" />


2. Préparation de l’appareil Android et lancement de frida-server

Avant d’utiliser Objection, il faut que Frida fonctionne correctement entre le PC et l’appareil Android.

Vérifier la connexion ADB
adb devices

Résultat attendu :

List of devices attached
emulator-5554    device

Si l’appareil apparaît comme unauthorized, il faut déverrouiller l’émulateur ou le téléphone et accepter la fenêtre de débogage USB.

Identifier l’architecture Android
adb shell getprop ro.product.cpu.abi

Exemples possibles :

x86_64
arm64-v8a
armeabi-v7a

Cette information permet de télécharger la bonne version de frida-server.

Installer Frida côté PC
pip install --upgrade frida-tools

Vérifier la version installée :

frida --version

La version de frida-server sur Android doit être identique à la version de Frida installée sur le PC.

Exemple :

Frida PC : 17.8.0
frida-server Android : 17.8.0
Envoyer frida-server sur Android

Après avoir téléchargé et décompressé frida-server, renommer le fichier en :

frida-server

Puis l’envoyer dans /data/local/tmp/ :

adb push frida-server /data/local/tmp/
adb shell chmod 755 /data/local/tmp/frida-server
Lancer frida-server
adb shell "/data/local/tmp/frida-server &"

Si cette commande ne fonctionne pas dans PowerShell, utiliser cette méthode :

adb shell
cd /data/local/tmp
./frida-server

Dans ce cas, il faut garder ce terminal ouvert.

Redirection optionnelle des ports Frida
adb forward tcp:27042 tcp:27042
adb forward tcp:27043 tcp:27043
Vérifier que Frida voit l’appareil
frida-ps -Uai

Cette commande doit afficher la liste des applications installées sur l’appareil Android.



3. Démarrage d’Objection sur l’application cible

<img width="1444" height="378" alt="image" src="https://github.com/user-attachments/assets/a8384e71-95ca-487a-84dc-daefe8261daf" />
