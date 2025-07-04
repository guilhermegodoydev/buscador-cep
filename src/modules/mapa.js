import { Map, TileLayer, Marker, Rectangle } from 'https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js';

let map = null;
let marker = null;
let rectangle = null;

export function GerarMapa(lat = -23.55, long = -46.63, z = 13) {
    if (map) {
        map.remove();
        map = null;
        marker = null;
        rectangle = null;
    }

    map = new Map('map', {
        center: [lat, long],
        zoom: z
    });

    new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
    }).addTo(map);
}

export function GerarMarcador(lat, long) {
    if (!map) return;
    if (marker) marker.remove();
    marker = new Marker([lat, long]).addTo(map).bindPopup('Localização Aproximada');
}

export function MarcarAreaMapa(lat1, lon1, lat2, lon2) {
    if (!map) return;
    if (rectangle) rectangle.remove();
    const limites = [[lat1, lon1], [lat2, lon2]];
    rectangle = new Rectangle(limites, {color: 'red', weight: 1, fillOpacity: 0.1}).addTo(map);
    map.fitBounds(limites);
}