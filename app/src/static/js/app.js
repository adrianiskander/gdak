'use strict';
const linesNight = ['N1','N2','N3','N4','N5','N6','N8','N9','N11','N12','N13'];
const linesTram = [2,3,4,5,6,7,8,9,10,11,12,63];
const config = {
  apiUrl: 'http://127.0.0.1:5000/api'
};


let iconBlack = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-black.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


let iconRed = new L.Icon({
  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});


let markersGroup = L.layerGroup();


let map = L.map('map', {
  center: [54.372158, 18.638306],
  zoom: 13,
  zoomControl: false
});


let controls = L.control.zoom({
  position: 'bottomright'
});


controls.addTo(map);


L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
  maxZoom: 17,
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
    '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
  id: 'mapbox/streets-v11',
}).addTo(map);


let updateMap = function(gpsData) {

  markersGroup.clearLayers();

  for (let i=0; i < gpsData['Vehicles'].length; i++) {

    let vehicle = gpsData['Vehicles'][i];
    let marker = L.marker([vehicle['Lat'], vehicle['Lon']]);
    let tooltipOffset = [0, 0];

    /* Set black marker if night lines exist. */
    for (let i=0; i < linesNight.length; i++) {

      let line = linesNight[i];

      if (line === vehicle['Line']) {
        marker = L.marker([vehicle['Lat'], vehicle['Lon']], { icon: iconBlack });
        tooltipOffset = [0, -28];
        break;
      }
    };

    /* Set red marker if tram lines exist. */
    for (let i=0; i < linesTram.length; i++) {

      let line = linesTram[i];

      if (line === parseInt(vehicle['Line'])) {
        marker = L.marker([vehicle['Lat'], vehicle['Lon']], { icon: iconRed });
        tooltipOffset = [0, -28];
        break;
      }
    };

    /* Add line number label. */
    marker.bindTooltip(vehicle['Line'], {
      direction: 'top',
      permanent: true,
      offset: tooltipOffset
    });

    marker.addTo(markersGroup);
  };

  markersGroup.addTo(map);
};


function getGpsData() {

  let data = null;
  let req = new XMLHttpRequest();

  req.open('GET', `${ config.apiUrl }/gps`);
  req.send(null);
  req.onload = function() {
    if (req.status === 200) {
      data = JSON.parse(req.response);
      updateMap(data);
      updateUI(data);
    }
  }
};


function toggleFront() {

  let front = document.querySelector('.Front');
  let className = 'Front-hidden';

  front.classList.contains(className)
    ? front.classList.remove(className)
    : front.classList.add(className);
};


function updateUI(data) {
  document.getElementById('lastUpdate').innerText = data.LastUpdateData;
}


window.setInterval(getGpsData, 5000);
getGpsData();
