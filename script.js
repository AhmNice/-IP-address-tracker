var ipAddress_Text = document.getElementById('ipAddress');
const searchBtn = document.getElementById('search');
let ipAddress;
let latitude;
let longitude;
let isp;
let city;
let map; 

function welcome(){
    let apiKey = '9168cf031778432f83875fc6281af858'
    fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`)
    .then(response => response.json())
    .then(data =>{
        ipAddress = data.ip;
        latitude = data.latitude;
        longitude = data.longitude;
        isp = data.isp;
        city = data.city;
        ipAddress_Text.value = ipAddress; // Update the input field with the fetched IP address
        callMap(data);
    })
    .catch(error => console.error('Error fetching the IP geolocation data:', error));
}

window.addEventListener('load', ()=>{
    welcome();
});

function callMap(data){
    if (map) {
        map.remove(); // Remove the old map instance
    }
    map = L.map('map').setView([latitude, longitude], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
    }).addTo(map);
    
    var greenIcon = L.icon({
        iconUrl: 'images/icon-location.svg',
        iconSize:     [38, 95], // size of the icon
        iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
    });
    L.marker([latitude, longitude], {icon: greenIcon}).addTo(map);
    var LeafIcon = L.Icon.extend({
        options: {
            iconSize:     [38, 95],
            iconAnchor:   [22, 94],
            shadowAnchor: [4, 62],
            popupAnchor:  [-3, -76]
        }
    });
    var greenIcon = new LeafIcon({iconUrl: 'images/icon-location.svg'})
    L.icon = function (options) {
        return new L.Icon(options);
    };
    // L.marker([latitude, longitude], {icon: greenIcon}).addTo(map).bindPopup("I am here.");

    let ipText = document.getElementById('ipText');
    let locationText = document.getElementById('locationText') 
    let timezoneText = document.getElementById('timezoneText')
    let ispText = document.getElementById('ispText')

    ipText.innerText = data.ip;
    locationText.innerText = data.city;
    timezoneText.innerText = data.time_zone.name;
    ispText.innerText = data.isp;
}

searchBtn.addEventListener('click', ()=>{
    if (ipAddress_Text.value.length > 6) {
        let apiKey = '9168cf031778432f83875fc6281af858';
        ipAddress = ipAddress_Text.value;
        fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}&ip=${ipAddress}`)
        .then(response => response.json())
        .then(data => {
            ipAddress = data.ip;
            latitude = data.latitude;
            longitude = data.longitude;
            isp = data.isp;
            city = data.city;
            callMap(data);
        })
        .catch(error => console.error('Error fetching the IP geolocation data:', error));
    } else {
        console.log('IP address is not valid');
    }
});
