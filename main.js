document.addEventListener("DOMContentLoaded", () => {
    if(document.readyState === "complete" || document.readyState === "interactive") {
        renderMap()
    }
})



const abbreviateState = (state) => {
    let Abbreviations = {
        "Alabama" : "AL",
        "Alaska": "AK",
        "Arizona": "AZ",
        "Arkansas": "AR",
        "California": "CA",
        "Colorado": "CO",
        "Connecticut": "CT",
        "Delaware": "DE",
        "Florida": "FL",
        "Georgia": "GA",
        "Hawaii": "HI",
        "Idaho": "ID",
        "Illinois": "IL",
        "Indiana": "IN",
        "Iowa": "IA",
        "Kansas": "KS",
        "Kentucky": "KY",
        "Louisiana": "LA",
        "Maine": "ME",
        "Maryland": "MD",
        "Massachusetts": "MA",
        "Michigan": "MI",
        "Minnesota": "MN",
        "Mississippi": "MS",
        "Missouri": "MO",
        "Montana": "MT",
        "Nebraska": "NE",
        "Nevada": "NV",
        "New Hampshire": "NH",
        "New Jersey": "NJ",
        "New Mexico": "NM",
        "New York": "NY",
        "North Carolina": "NC",
        "North Dakota": "ND",
        "Ohio": "OH",
        "Oklahoma": "OK",
        "Oregon": "OR",
        "Pennsylvania": "PA",
        "Rhode Island": "RI",
        "South Carolina": "SC",
        "South Dakota": "SD",
        "Tennessee": "TN",
        "Texas": "TX",
        "Utah": "UT",
        "Vermont": "VT",
        "Virginia": "VA",
        "Washington": "WA",
        "West Virginia": "WV",
        "Wisconsin": "WI",
        "Wyoming": "WY"
    }
    return Abbreviations[state];
}


const renderLocationInfo = ({ip, location, isp}) => {
    document.querySelector("#ipAddrText").innerText = ip;
    document.querySelector("#locationText").innerText = `${location.city}, ${abbreviateState(location.region)} ${location.postalCode}`;
    document.querySelector("#timezoneText").innerText = `UTC-${location.timezone}`;
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

const ipAddress = document.querySelector("#ipAddressInput").value;
const btn = document.querySelector("#submitBtn");
btn.addEventListener('click', () => {
    fetch(`https://geo.ipify.org/api/v1?apiKey=${ipToken}&ipAddress=${ipAddress}`)
    .then(data => data.json())
    .then(data => {
        const lngLat = [data.location.lng, data.location.lat];
        renderLocationInfo(data);
        setLngLat(lngLat);
    })
})

