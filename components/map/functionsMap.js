
var mapState = {
    "hotels" : [{
        "name" : "A Chicago hotel",
        "stars" : 5,
        "latitude" : 43.2131231,
        "longitude" : 9.213123123,
    }],
    "crimes" : [],
}

const startMapComponent = () =>{


    // Build html
    _buildMapSection();

    // Take data
    _getMapName();

    // Print data

    console.log("Avvia la mappa");
}

// HTML functions
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

const _buildMapName = (name) => {

    let html = '<h1>'+ name + '</h1>';
    return html;
}

// Print data
const _printMapName = (nameHtml) => {

    $('#map_section').html(nameHtml);
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

