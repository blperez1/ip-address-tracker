
const renderIPInfo = ({ip, location, isp}) => {
    document.querySelector("#ipAddrText").innerText = ip;
    document.querySelector("#locationText").innerText = `${location.city}, ${location.region} ${location.postalCode}`;
    document.querySelector("#timezoneText").innerText = location.timezone;
    document.querySelector("#ispText").innerText = isp;
}

const setLngLat = (lngLat) => {
    mapboxgl.accessToken = mapToken;
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v11', // stylesheet location
        center: lngLat, // starting position [lng, lat]
        zoom: 9 // starting zoom
    });

    new mapboxgl.Marker()
        .setLngLat(lngLat)
        .addTo(map);
} 

fetch(`https://geo.ipify.org/api/v1?apiKey=${ipToken}&ipAddress=8.8.8.8`)
    .then(data => data.json())
    .then(data => {
        const lngLat = [data.location.lng, data.location.lat];
        renderIPInfo(data);
        setLngLat(lngLat);
    })