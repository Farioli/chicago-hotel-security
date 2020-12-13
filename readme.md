# Chicago Hotel Security
Progetto per il corso di **Visualizzazione delle Informazioni (2019-2020)**

## Homepage 

![](/assets/screenshot.png "Chicago app security screenshot")


## Descrizione del progetto
Questo progetto ha l'obiettivo di aiutare un utente nella scelta di un hotel a Chicago che sia in una zona sicura.\
Si sono analizzati i dati relativi agli hotel situati nei dintorni di Chicago e dei reati commessi sul territorio della città.

L'utente può quindi cercare un hotel, visualizzarne la posizione dei vari hotels e alcuni dati relativi a loro, come stelle e prezzo giornaliero. Allo stesso tempo è possibile visualizzare quali crimini sono stati commessi vicino l'hotel di interesse grazie alla visualizzazione di una heatmap che rappresenta la densità di crimini commessi nelle varie aree.

L'applicazione mostra la mappa di Chigaco con le informazioni estratte dai dataset e sulla sinistra offre una sezione dedicata ai filtri e alle operazioni che l'utente può effettuare sugli hotel o sui crimini di interesse.

Gli hotel sono rappresentati da marker che seguono la seguente colorazione:
- Oro: 5 stelle
- Argento: 3 e 4 stelle
- Bronzo: 1 e 2 stelle

In particolare sono presenti: 
* un filtro che effettua una ricerca dell'hotel in base al nome e consente di effettuare il focus su questo hotel, 
* un filtro che consente di filtrare gli hotel sulla mappa in base al numero di stelle
* un filtro che filtra gli hotel in base al range di prezzo desiderato. 
* un filtro multiple che consente di scegliere uno o più crimini. Questo comporta l'aggiornamento dell'heatmap in tempo reale, permettendo all'utente di capire in quale area di Chigaco sono più concentrati le tipologie di crimine d'interesse.
* la funzionalità Ispeziona che permette di mostrare informazioni relative ai crimini e specifiche di un'area:  l'utente può selezione un range espresso in metri, cliccare un punto sulla mappa e visualizzare, nel cerchio che si ottiene dal centro selezionato e dal raggio inserito, gli hotel che ricadono in quella zona. Dopo un secondo verrà offerta all'utente la distribuzione delle varie tipologie di crimini nell'area utilizzando la visualizzazione tramite un grafico a barre orizzontali.

E' importante sottolineare che i dati relativi ai prezzi e alle stelle degli hotels sono stati generati in quanto il dataset degli hotel mancava di tali informazioni.


## Struttura del progetto

Questa applicazione è stata strutturata seguendo una logica "a componenti": il sito è suddiviso in componenti, ognuna responsabile di una determinata
funzionalità, che spazia dall'autocomplete offerto per cercare gli hotel nella barra di ricerca alla renderizzazione della map con gli hotel.

Il progetto si compone di più cartelle all'interno delle quali si trovano tutte le funzionalità relative allo specifico componente:
* **app** : contiene le funzioni per avviare l'intero applicativo e caricare il dataset dei crimini attraverso una chiamata remota alla sorgente;
* **network** : piccolo componente incaricato di eseguire la chiamata GET al dataset dei crimini, in modo di averlo continuamente aggiornato.
* **filters**: contiene tutte le funzionalità dei filtri per eseguire la selezione per stelle, prezzo, crimini e l'autocomplete sull'hotel.
* **map**: contiene tutte le funzionalità della mappa: la creazione, l'heatmap, il caricamento degli hotel. Qui ci sono anche le funzionalità \
del componente che si occupa di effettuare l'ispezione della mappa. 
* **inspectorDashboard**: contiene le funzionalità mostrate quando si è in modalità "Ispeziona", in particolare il grafico dei crimini.  

* **lib** contiene le librerie di supporto usate nel progetto (**chart.js**, **leaflet** e **leaflet-heat.js**)
* **dataset**  contiene il dataset degli hotels su cui sono state effettuate tutte le operazioni:  \
[Dataset Hotel Chicago](https://data.cityofchicago.org/Community-Economic-Development/hotel-in-the-center-of-the-city/vcf9-ubdz/data) \
[Dataset Crimini](https://data.cityofchicago.org/Public-Safety/Crimes-2020/qzdf-xmn8).

## Per avviare la webApp
Bisogna posizionarsi nella cartella del progetto e digitale sul prompt dei comandi

```
http-server &
```
e poi si potrà accedere alla home del progetto nel browser all'URL
```
http://localhost:8080/app.html
```