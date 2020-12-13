
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


}

const _loadHotels = (hotels) => {

    for (let i = 0; i < hotels.length; i++) {

        let lat = hotels[i].latitude;
        let lon = hotels[i].longitude;
        let name = hotels[i].name;
        let stars = hotels[i].stars;
        let price = hotels[i].price;

        let hotelIcon = { icon: bronzeIcon };
        console.log(stars)

        if (stars === 5) {
            hotelIcon = { icon: goldIcon };
        }

        if (stars === 4 || stars === 3) {
            hotelIcon = { icon: silverIcon };
        }

        // { icon: icon }

        let hotelInfos = `<div class="hotel-popup">
                            <div class="hotel-name">${name}</div>
                            <div>Stars : ${stars}</div>
                            <div>Price : $ ${price}</div>
                        </div>`


        let newMarker = L.marker([lat, lon], hotelIcon).addTo(MAP).bindPopup(hotelInfos);
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

    if (distance < 4) {
        min = 4;
        max = 5;
        return Math.floor(Math.random() * (max - min) + min);
    }

    if (distance < 6) {
        min = 2;
        max = 3;
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

            if (HOTELS_NAMES.filter(el => el === name).length === 0) {

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

// Custom leaflet marker
var HotelIcon = L.Icon.extend({
    options: {

        iconSize: [20, 35], // size of the icon
        shadowSize: [0, 0], // size of the shadow
        iconAnchor: [22, 94], // point of the icon which will correspond to marker's location
        shadowAnchor: [4, 62],  // the same for the shadow
        popupAnchor: [-10, -86] // point from which the popup should open relative to the iconAnchor
    }
});

var goldIcon = new HotelIcon({

    iconUrl: './assets/gold_poi.png',
});

var silverIcon = new HotelIcon({
    iconUrl: './assets/silver_poi.png',
});

var bronzeIcon = new HotelIcon({
    iconUrl: './assets/bronze_poi.png',
});