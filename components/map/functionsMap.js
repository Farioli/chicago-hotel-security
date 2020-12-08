
// Map Component State Object
var mapState = {
    "hotels": [],
    "crimes": [],
}

var hotelsParsed = [];
var MAP;
var MARKER = [];
var heatMapLayer;
var HOTELS_NAMES = [];

/**
 * This starts the map component by building it and taking data for map
 */
const startMapComponent = () => {

    _cleanHotelDataset();

    _loadMap();

    _loadHotels(mapState.hotels);
   
    _loadHeatMap(appState.crimes);
  
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

const _resetMap = () => {

    _resetHotelsMarker();

    heatMapLayer.remove();
}

const _resetHotelsMarker = () => {

    for(let i = 0; i < MARKER.length; i++){

        MARKER[i].remove();
    }

    MARKER = [];
}

// Functionalities
/**
 * This function builds the Leaflet map into the component
 */
const _loadMap = () => {

    MAP = new L.Map('map_placeholder');
    let url = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let attrib = 'Map data (c)OpenStreetMap contributors';
    let osm = new L.TileLayer(url, { minZoom: 11, maxZoom: 16, attribution: attrib });
    MAP.setView(new L.LatLng(41.85, -87.65), 11);
    MAP.addLayer(osm);
    MAP.setMaxBounds(MAP.getBounds());
    
    MAP.on('click', _addInspectionArea);
    console.log(MAP.getZoom());
}

const _loadHotels = (hotels) => {

    for (let i = 0; i < hotels.length; i++) {

        let lat = hotels[i].latitude;
        let lon = hotels[i].longitude;
        let name = hotels[i].name;
        let stars = hotels[i].stars;
        let price = hotels[i].price;

        let newMarker = L.marker([lat, lon]).addTo(MAP).bindPopup(name + "\n" + "stars: " + stars + ' | price:'+ price);

        MARKER.push(newMarker);
    }
}

const _loadHeatMap = (crimes) => {

    let osmLayer = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: 'Map data (c)OpenStreetMap contributors'
    }).addTo(MAP);
    
    let points = []
    
    crimes.forEach(d => {
        
        if (isNaN(parseFloat(d.longitude)) || isNaN(parseFloat(d.latitude))) {
            return
        } else {
            points.push([d.latitude, d.longitude, 10]);
        }
    })

    heatMapLayer = L.heatLayer(points,{gradient:{0.4: 'yellow', 0.65: 'orange', 1: 'red'} }).addTo(MAP);
}

const centerChicagoLat = 41.85003;
const centerChicagoLng = -87.65005;

function getRandomStars(lat, lon) {

    // TODO: generate random values based on distance with center of chicago

    min = Math.ceil(1);
    max = Math.floor(5);
    return Math.floor(Math.random() * (max - min) + min);
}

const updateMap = (newFilters) => {

    _resetMap();

    _filterHotels(newFilters.hotelStars, newFilters.hotelPrice);

    _filterCrimes(newFilters.crimesSelected);
    
}

const _filterHotels = (filteredStars, filterPrice) => {

    let filteredHotels = [];

    for (let i = 0; i < hotelsParsed.length; i++) {

        let correct = true;

        if(filteredStars != "" && hotelsParsed[i].stars != filteredStars){

            correct = false;
        }

        if(_rankHotelPrice(hotelsParsed[i].price) != filterPrice){
            
            correct = false;
        }
        
        if(correct){
            
            filteredHotels.push(hotelsParsed[i]);
        }

    }

    mapState.hotels = filteredHotels;
    
    // _loadMap();
    _loadHotels(mapState.hotels);

}

const _filterCrimes = (filterCrimesTypologies) => {

    
    let filteredCrimes = [];

    for (let i = 0; i < appState.crimes.length; i++) {

        if(filterCrimesTypologies.includes(appState.crimes[i]._primary_decsription)){
            
            filteredCrimes.push(appState.crimes[i]);
        }
    }
    
    _loadHeatMap(filteredCrimes);
}

const _cleanHotelDataset = () => {

    mapState.hotels = [];
    HOTELS_NAMES = [];

    for (let i = 0; i < HOTELS.data.length; i++) {

        let lat = HOTELS.data[i][36];
        let lon = HOTELS.data[i][37];
        let name = HOTELS.data[i][12];

        let stars = getRandomStars(lat, lon);
        let price = Math.floor(Math.random() * (120 - 10) + 10);

        if (lat != null && lon != null) {

            HOTELS_NAMES.push(name);

            mapState.hotels.push({
                latitude: lat,
                longitude: lon,
                name: name,
                stars: stars,
                price: price,
            });
        }

    }


    hotelsParsed = mapState.hotels;
    autocomplete(document.getElementById("myInput"), HOTELS_NAMES);
}

// Utility
const _rankHotelPrice = (hotelPrice) => {

    let rank = 0;

    if(hotelPrice < 20){

        rank = 0;
    }

    if(hotelPrice >= 20 && hotelPrice < 50){

        rank = 1;
    }

    if(hotelPrice >= 50 && hotelPrice < 100){

        rank = 2;
    }

    if(hotelPrice >= 100){

        rank = 3;
    }

    return rank;
}

const goToHotels = () => {
    
    let name = $('#myInput').val();

    let lat = 0;
    let long = 0;

    let found = false;

    for(let i = 0; i < hotelsParsed.length; i++){

        if(hotelsParsed[i].name === name){

            found = true;
            lat = hotelsParsed[i].latitude;
            long = hotelsParsed[i].longitude;
            break;
        }
    }

    if(found){
        
        MAP.setView([lat, long], 18);
    }
}
