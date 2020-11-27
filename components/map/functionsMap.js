
// Map Component State Object
var mapState = {
    "hotels" : [{
        "name" : "A Chicago hotel",
        "stars" : 5,
        "latitude" : 43.2131231,
        "longitude" : 9.213123123,
    }],
    "crimes" : [],
}

/**
 * This starts the map component by building it and taking data for map
 */
const startMapComponent = () =>{


    // Build html
    _buildMapSection();

    // Load Map

    // Take data
    //_getMapName();

    // Print data

    console.log("Avvia la mappa");
}

// HTML functions
/**
 * Main function to build the map html layout
 * This function takes all the results of the functions that build map piece (es. _buildMapContainer) and then print
 * them in the app.html container "map_placeholder"
 */
const _buildMapSection = () => {

    let mapSection = '';
    mapSection += _buildMapContainer();

    $('#map_placeholder').html(mapSection);
}

const _buildMapContainer = () => {
    let html = '<div id="map_section">';
    html += '   </div>';
    return html;
}

/**
 * 
 * @param {*} name 
 * Function to print dynamically content in the component
 */
const _buildMapName = (name) => {

    let html = '<h1>'+ name + '</h1>';
    return html;
}

/**
 * Prints the data into the map component
 * @param {*} nameHtml 
 */
const _printMapName = (nameHtml) => {

    $('#map_section').html(nameHtml);
}

// Functionalities
/**
 * This function builds the Leaflet map into the component
 */
const _loadMap = () => {

    //
}

// API
const _getMapName = () => {
    setTimeout(
        () => {
            let name = "Map Component";

            let mapName = _buildMapName(name);
            _printMapName(mapName);
        },
        3000,
    )
}

