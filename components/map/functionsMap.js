
// Map Component State Object
var mapState = {
    "hotels" : [],
    "crimes" : [],
}

var MAP;

/**
 * This starts the map component by building it and taking data for map
 */
const startMapComponent = () =>{


    // Build html
   // _buildMapSection();

    // Load Map

    _loadMap();

    _loadHotels();


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

// Functionalities
/**
 * This function builds the Leaflet map into the component
 */
const _loadMap = () => {

    MAP = new L.Map('map_placeholder');
    let url = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let attrib = 'Map data (c)OpenStreetMap contributors';
    let osm = new L.TileLayer(url, {minZoom: 8, maxZoom: 16, attribution: attrib});
    MAP.setView(new L.LatLng(41.85,-87.65),12);
    MAP.addLayer(osm);

}

const _loadHotels = () => {

    mapState.hotels = [];
    
    // let lati = getLatitude();
    // let longi = getLongitude();
    // let nome = getName();

    for(let i = 0; i < HOTELS.data.length; i++){

        let lat = HOTELS.data[i][36];
        let lon = HOTELS.data[i][37];
        let name = HOTELS.data[i][12];

        let stars = getRandomStars(lat, lon);
        
        if(lat != null && lon != null){

            mapState.hotels.push({
                latitude: lat,
                longitude: lon,
                name: name,
                stars: stars,
            });
            
            L.marker([lat, lon]).addTo(MAP).bindPopup(name + "\n" + "stelle:" + stars);
        }

    }
    
}

function getRandomStars(lat, lon) {
    
    // TODO: generate random values based on distance with center of chicago
    
    min = Math.ceil(1);
    max = Math.floor(5);
    return Math.floor(Math.random() * (max - min) + min);
  }

// const getHotelField = (index) => {
//     let datas=[];
//     let latitudeHotel = [];
//     datas.push(HOTELS.data);
//     for (let i=0; i<datas.length;i++){
//         latitudeHotel.push(datas[index]);
//     }
//     return(latitudeHotel);
//     }

//     const getLongitude=() => {

//     let longitudeHotel = [];
//     for (let i=0; i<datas.length;i++){
//         longitudeHotel.push(datas[39]);
//     }
//     return(longitudeHotel);
//         }

// const getName=() => {

//     let nameHotel = [];
//     for (let i=0; i<datas.length;i++){
//         nameHotel.push(datas[13]);
//     }
//     return(nameHotel);
//         }

