/**
 * MAP.JS — Leaflet/OpenStreetMap initialization
 * ----------------------------------------------
 * Initializes the OSM map on the contact page. Requires:
 *   - Leaflet 1.9.4 CSS+JS loaded externally (see <head> in contact.html)
 *   - An element with id="map" on the page
 */

document.addEventListener('DOMContentLoaded', function () {
  // Restaurant coordinates (Getzville, NY)
  var restaurantCoords = [43.036590, -78.745945];

  // Create the map
  var map = L.map('map').setView(restaurantCoords, 15);

  // Add OpenStreetMap tiles (free, open-source)
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(map);

  // Add a marker for the restaurant
  L.marker(restaurantCoords).addTo(map)
    .bindPopup('<b>Sean Patrick\'s Emerald Isle</b><br>3480 Millersport Highway<br>Getzville, NY 14068')
    .openPopup();
});
