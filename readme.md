# Chicago Hotel Security
Progetto per il corso di **Visualizzazione delle Informazioni (2019-2020)**

## Homepage 

![Qua puoi mettere l'immagine del sito.](/image/")


## Descrizione del progetto
Questo progetto ha come obiettivo quello di soddisfare un utente che vuole prenotare un hotel a Chicago e vuole farlo in sicurezza.\
Si sono analizzati infatti i dati relativi a degli hotel situati nei dintorni 
di Chicago e a dei reati commessi sempre nel territorio di Chicago.\
L'utente può quindi cercare un hotel, visualizzarne la posizione e alcuni 
dati relativi ad esso come stelle e prezzo giornaliero e nello stesso \
tempo visualizzare quali crimini sono stati commessi vicino l'hotel di interesse grazie alla visualizzazione di un heatmap a densità di crimini.
\
Si mostra infatti come pagina iniziale la mappa di Chigaco con le posizioni degli hotel e sulla sinistra una sezione dedicata ai filtri e alle \
operazioni che l'utente può effettuare sugli hotel o sui crimini di interesse.
In particolare, c'e un filtro che effettua una ricerca dell'hotel in \
base al nome e restituisce l'hotel selezionato, un filtro che permette di 
cercare l'hotel in base al numero di stelle e uno in base al range di \
prezzo che si preferisce. Un ulteriore filtro permette di scegliere uno o più crimini e visualizzare la relativa heatmap, permettendo all'utente \
di capire in quale area di Chigaco sono più concentrati.
Infine c'è la funzionalità Ispeziona che permette di mostrare ulteriori informazioni:\
l'utente può selezione un range di metri e visualizzare nell'intorno selezionato gli hotel che ricadono in quella zona e un grafico a barre \
orizzontali che mostra i crimini e il relativo numero solo in quell'area selezionata.


## Struttura del progetto
Il progetto si compone di più cartelle all'interno delle quali si trovano tutte le funzionalità relative allo specifico componente:
* **app** : contiene le funzioni per avviare la mappa e i filtri;
* **filters**: contiene tutte le funzionalità dei filtri per eseguire la selezione per stelle, prezzo, crimini e l'autocomplete sull'hotel.
* **map**: contiene tutte le funzionalità della mappa, la sua creazione, l'heatmap, il caricamento degli hotel. Qui ci sono anche le funzionalità \
del componente che si occupa di effettuare l'ispezione della mappa. 
* **inspectorDashboard**: contiene le funzionalità mostrate quando si è in modalità ispeziona, in particolare il grafico dei crimini.  

Infine ci sono cartelle **lib** che contengono le librerie di supporto che abbiamo usato (**chart.js** e **leaflet-heat.js**) e  **dataset** che contiene i \
dataset su cui abbiamo effettuato tutte le operazioni:  [Dataset Hotel Chicago](https://data.cityofchicago.org/Community-Economic-Development/hotel-in-the-center-of-the-city/vcf9-ubdz/data) e [Dataset Crimini](https://data.cityofchicago.org/Public-Safety/Crimes-2020/qzdf-xmn8).

## Per avviare
Basta posizionarsi nella cartella del progetto e digitale sul prompt dei comandi

```
http-server &
```
e poi digitare nel browser
```
http://localhost:8080/app.html
```
e apparirà l'homepage del progetto.