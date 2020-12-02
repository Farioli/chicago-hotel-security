
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

const getCrimesTypologies = () => {

    let crimesTypologies = [];

    let crimes = appState.crimes;

    for(let i = 0; i < crimes.length; i++){
        
        crimesTypologies.push(crimes[i]._primary_decsription);
    }

    return crimesTypologies;
}