var INSPECTION_MODE = false;
var INSPECTION_AREA = null;

// Inspection
const startInspectionMode = () => {

    if (INSPECTION_AREA != null) {

        INSPECTION_AREA.remove();
    }

    INSPECTION_MODE = true;
    $('#inspection_range').val(100);
    $('#inspection_section').show();
    $('#reset_inspect_section').show();
}

const resetInspectMode = () => {

    if (INSPECTION_AREA != null) {

        INSPECTION_AREA.remove();
    }

    INSPECTION_MODE = false;

    $('#reset_inspect_section').hide();
    $('#inspection_section').hide();
    resetHotelsAndCrimes();
    startMapComponent();
}

const _addInspectionArea = (event) => {

    if (!INSPECTION_MODE) {
        return;
    }

    let radius = $('#inspection_range').val();

    if (radius < 0 || radius == null || radius == "") {
        radius = 100;
        $('#inspection_range').val(radius);
    }

    INSPECTION_AREA = L.circle(event.latlng, {
        color: 'black',
        fillColor: 'black',
        fillOpacity: 0.5,
        radius: radius
    }).addTo(MAP);

    _inspectionMapData(event.latlng.lat, event.latlng.lng, radius);
    _inspectionCrimes(event.latlng.lat, event.latlng.lng, radius);

    INSPECTION_MODE = false;
}

const _inspectionMapData = (latitude, longitude, radius) => {

    let filteredHotels = [];

    for (let i = 0; i < mapState.hotels.length; i++) {


        if (_checkIfInDistance(latitude, longitude, radius, mapState.hotels[i].latitude, mapState.hotels[i].longitude)) {

            filteredHotels.push(mapState.hotels[i]);
        }

    }

    mapState.hotels = filteredHotels;

    _resetHotelsMarker();
    
    _loadHotelsOnMap(mapState.hotels);

    startInspectorDashboard();
}

const _checkIfInDistance = (centerLat, centerLng, radius, elemLat, elemLng) => {

    let distance = getDistanceFromLatLonInKm(centerLat, centerLng, elemLat, elemLng);

    if (distance <= radius / 1000) {
        return true;
    } else {
        return false;
    }

    // return (distance <= radius / 1000) ? true : false;
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {

    let R = 6371; // Radius of the earth in km
    let dLat = deg2rad(lat2 - lat1);  // deg2rad below
    let dLon = deg2rad(lon2 - lon1);
    let a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2)
        ;
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    let d = R * c; // Distance in km
    return d;
}

function deg2rad(deg) {
    return deg * (Math.PI / 180);
}

const _inspectionCrimes = (latitude, longitude, radius) => {

    let filteredCrimes = [];

    for (let i = 0; i < appState.crimes.length; i++) {


        if (_checkIfInDistance(latitude, longitude, radius, appState.crimes[i].latitude, appState.crimes[i].longitude)) {

            filteredCrimes.push(appState.crimes[i]);
        }

    }

    appState.crimes = filteredCrimes;

    _loadHeatMap(appState.crimes);

    startInspectorDashboard();
}
