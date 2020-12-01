
/**
 * This is the entry point for the webapp
 */
const startChicagoHotelSecurityApp = () =>{

    console.log("Sito avviato!");

    call(_printCrimesData);

    // Fetch chicago data
    startFilterComponent();

    // Generate hotel price and stars

    // Start the webapp
    setTimeout(
        () => {
            startMapComponent();
            
        },
        3000,
    )
    

}

const _printCrimesData = (crimesData) => {

    console.log(crimesData);
}