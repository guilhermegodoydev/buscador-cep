import { Map, TileLayer, Marker } from 'https://unpkg.com/leaflet@1.9.4/dist/leaflet-src.esm.js';

export function GerarMapa(lat = -23.55, long = -46.63, z = 13) {
    const map = new Map('map', {
        center: [lat, long],
        zoom: z
    });

    new TileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
    }).addTo(map);

    new Marker([lat, long]).addTo(map).bindPopup('Você está aqui!');
}