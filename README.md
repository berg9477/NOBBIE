# Installatiehandleiding Nobbie React APP

[Omschrijving](#omschrijving)

[API Keys](#api-keys)

[Installatie](#installatie)

[Inloggen](#inloggen)

[NPM Commandos](#npm-commandos)

## Omschrijving

Deze applicatie is gemaakt voor het vinden van een babynaam door middel van een zoekmachine. De applicatie is gekoppeld aan een database met ruim 10.000 namen en gebruikers kunnen een profiel aanmaken om namen die ze leuk vinden op te slaan en te delen met een andere gebruiker. Daarnaast kan er met behulp van de koppeling met behindthename.com ook achtergrond informatie opgevraagd worden over een naam en kunnen gebruikers zien aan welke andere namen een specifieke naam gerelateerd is.

![page](NobbiePage.PNG)

## API Keys

REST API Behindthename - REACT_APP_API_KEY=sa583307807
Firebase REACT_APP_API_KEY_frbs=AIzaSyD_8AQzfoCg84LyqnHywl5QRHolKflfK28
Firebase REACT_APP_API_KEY_messagingSenderId:1021151795976

## Installatie

Kloon de repo in je terminal door de volgende stappen te volgen.

- Typ `git clone https://github.com/berg9477/NOBBIE.git` in je terminal
- Druk op enter.
Hiermee worden alle bestanden van de github naar de locale pc gekopieerd.
- Ga door middel van cd in je terminal naar de map die je zojuist hebt gemaakt.
- Typ `npm install` om alle afhankelijkheden te installeren.
- Typ `npm install react-router-dom –save` om routing in de webapp te installeren.
- Typ `npm install axios` om Rest API toepassing van axios te installeren.

Als laatste, typ `npm start` om de app lokaal uit te voeren.

Om de code te bekijken, open je het project in je favoriete code-editor!

## Inloggen

Maak zelf een nieuw account aan door te klikken Login / Sign up en alle velden onder New at Nobbie in te vullen, of gebruik een van de bestaande test accounts:
- Username: tester
- Password: test

## NPM Commandos

npm start
Draait de app vanuit development modus
Open http://localhost:3000 om het in de browser te bekijken.
