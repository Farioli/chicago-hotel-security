
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


var bronzeIcon;
var silverIcon;
var goldIcon;

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

    for (let i = 0; i < MARKER.length; i++) {

        MARKER[i].remove();
    }

    MARKER = [];
}

// Functionalities
/**
 * This function builds the Leaflet map into the component
 */
const _loadMap = () => {

    // MAP = new L.map('map_placeholder', { minZoom: 11, maxZoom: 16, attribution: 'Map data (c)OpenStreetMap contributors', fadeAnimation: false },).setView([41.85, -87.65], 11);
    // let url = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    // let osm = new L.TileLayer(url);


    // // function init() {
    // //     var map = L.map('map', { fadeAnimation: false }).setView([25, -4], 3);
    // //     L.tileLayer.grayscale('http://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    // //         attribution: 'Map data &copy; <a href="http://openstreetmap.org/">OpenStreetMap</a> contributors',
    // //         maxZoom: 14, minZoom: 2
    // //     }).addTo(map);
    // // }

    // MAP.addLayer(osm);
    // MAP.setMaxBounds(MAP.getBounds());
    // MAP.on('click', _addInspectionArea);

    MAP = new L.Map('map_placeholder');
    let url = 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png'; //'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    let attrib = 'Map data (c)OpenStreetMap contributors';
    let osm = new L.TileLayer(url, { minZoom: 11, maxZoom: 16, attribution: attrib });
    MAP.setView(new L.LatLng(41.85, -87.65), 11);
    MAP.addLayer(osm);
    MAP.setMaxBounds(MAP.getBounds());

    MAP.on('click', _addInspectionArea);
    console.log(MAP.getZoom());

    // Custom leaflet marker

    goldIcon = L.icon({
        iconUrl: './assets/gold_poi.png',

        iconSize: [20, 35], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-10, -86] // point from which the popup should open relative to the iconAnchor
    });

    silverIcon = L.icon({
        iconUrl: './assets/silver_poi.png',

        iconSize: [20, 35], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-10, -86] // point from which the popup should open relative to the iconAnchor
    });

    bronzeIcon = L.icon({
        iconUrl: './assets/bronze_poi.png',

        iconSize: [20, 35], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-10, -86] // point from which the popup should open relative to the iconAnchor
    });
}


const _loadHotels = (hotels) => {

    for (let i = 0; i < hotels.length; i++) {

        let lat = hotels[i].latitude;
        let lon = hotels[i].longitude;
        let name = hotels[i].name;
        let stars = hotels[i].stars;
        let price = hotels[i].price;

        // let icon = { icon: bronzeIcon };
        // console.log(stars)

        // if (stars === "5") {
        //     icon = { icon: goldIcon };
        // }

        // if (stars === "4" || stars === "3") {
        //     icon = { icon: silverIcon };
        // }

        // { icon: icon }

        let newMarker = L.marker([lat, lon],).addTo(MAP).bindPopup(
            '<div style="font-size: 20px"><h6 style="font-weight: bold";>' + name + "</h6>" + "<label>stars</label>: " + stars + '<br><label>price</label>: $' + price + '</div>');
        MARKER.push(newMarker);
    }
}


const _loadHeatMap = (crimes) => {

    let osmLayer = L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}@2x.png', {
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

    heatMapLayer = L.heatLayer(points, { gradient: { 0.4: 'yellow', 0.65: 'orange', 1: 'red' } }).addTo(MAP);
}

const centerChicagoLat = 41.85003;
const centerChicagoLng = -87.65005;

function getRandomStars(lat, lon) {

    distance = getDistanceFromLatLonInKm(lat, lon, centerChicagoLat, centerChicagoLng);

    if (distance < 1) {
        min = 3;
        max = 5;
        return Math.floor(Math.random() * (max - min) + min);
    }

    if (distance < 3) {
        min = 2;
        max = 4;
        return Math.floor(Math.random() * (max - min) + min);
    }

    min = Math.ceil(1);
    max = Math.floor(3);
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

        if (filteredStars != "" && hotelsParsed[i].stars != filteredStars) {

            correct = false;
        }

        if (filterPrice != "" && _rankHotelPrice(hotelsParsed[i].price) != filterPrice) {

            correct = false;
        }

        if (correct) {

            filteredHotels.push(hotelsParsed[i]);
        }

    }

    mapState.hotels = filteredHotels;
    _loadHotels(mapState.hotels);

}

const _filterCrimes = (filterCrimesTypologies) => {

    let filteredCrimes = [];

    if (filterCrimesTypologies.length < 1) {

        filteredCrimes = appState.crimes;
    } else {

        for (let i = 0; i < appState.crimes.length; i++) {

            if (filterCrimesTypologies.includes(appState.crimes[i]._primary_decsription)) {

                filteredCrimes.push(appState.crimes[i]);
            }
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

    if (hotelPrice < 20) {

        rank = 0;
    }

    if (hotelPrice >= 20 && hotelPrice < 50) {

        rank = 1;
    }

    if (hotelPrice >= 50 && hotelPrice < 100) {

        rank = 2;
    }

    if (hotelPrice >= 100) {

        rank = 3;
    }

    return rank;
}

const goToHotels = () => {

    let name = $('#myInput').val();

    let lat = 0;
    let long = 0;

    let found = false;

    for (let i = 0; i < hotelsParsed.length; i++) {

        if (hotelsParsed[i].name === name) {

            found = true;
            lat = hotelsParsed[i].latitude;
            long = hotelsParsed[i].longitude;
            break;
        }
    }

    if (found) {

        MAP.setView([lat, long], 18);
    }
}