var INSPECTION_MODE = false;
var INSPECTION_AREA = null;

// Inspection
const startInspectionMode = () => {

    if (INSPECTION_AREA != null) {

        INSPECTION_AREA.remove();
    }

    INSPECTION_MODE = true;

    console.log(INSPECTION_MODE);
}

const _addInspectionArea = (event) => {

    if (!INSPECTION_MODE) {
        return;
    }

    let radius = 500;

    INSPECTION_AREA = L.circle(event.latlng, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5,
        radius: radius
    }).addTo(MAP);

    _inspectionMapData(event.latlng.lat, event.latlng.lng, radius);

    INSPECTION_MODE = false;
}

//TODO: update crimes with geo filters
const _inspectionMapData = (latitude, longitude, radius) => {

    console.log(latitude, longitude, radius);

    let filteredHotels = [];

    for (let i = 0; i < mapState.hotels.length; i++) {


        if (_checkIfInDistance(latitude, longitude, radius, mapState.hotels[i].latitude, mapState.hotels[i].longitude)) {

            filteredHotels.push(mapState.hotels[i]);
        }

    }

    mapState.hotels = filteredHotels;

    _resetHotelsMarker();
    _loadHotels(mapState.hotels);

    startInspectorDashboard();
}

const _checkIfInDistance = (centerLat, centerLng, radius, elemLat, elemLng) => {

    let distance = getDistanceFromLatLonInKm(centerLat, centerLng, elemLat, elemLng);

    console.log(distance);

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
    
    return deg * (Math.PI / 180)
}