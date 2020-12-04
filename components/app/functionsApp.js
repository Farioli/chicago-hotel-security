
const appState = {
    "crimes" : [],
}

/**
 * This is the entry point for the webapp
 */
const startChicagoHotelSecurityApp = () =>{

    console.log("Sito avviato!");

    call(_setCrimesData);

    // Generate hotel price and stars

    // Start the webapp
    startMapComponent();
    

}

const _setCrimesData = (crimesData) => {

    appState.crimes = crimesData;

    // Fetch chicago data
    startFilterComponent();
}
/** Funzione che filtra i crimini senza duplicati */
const getCrimesTypologies = () => {
    let crimesTypologies = [];
    let mappa = {}
    let crimes = appState.crimes;
    for(let i = 0; i < crimes.length; i++){
        crimesTypologies.push(crimes[i]._primary_decsription);
    } 

    for(let j = 0; j < crimesTypologies.length; j++){
        mappa[crimesTypologies[j]] = crimesTypologies[j];
    } 

    crimes = new Array();
    for ( var key in mappa )
    crimes.push(mappa[key]);
   
  return crimes;

 }


