/* ============================================================================
 * map.js — Leaflet map, markers and marker → selection
 * ----------------------------------------------------------------------------
 * The map is a *view* of the same filtered array the list renders. It never
 * filters anything itself; it only draws what it is handed and reports clicks
 * back through SF.select().
 * ==========================================================================*/

window.SF = window.SF || {};
SF.map = {};

/* Solomon Islands, from Choiseul in the north-west to Temotu in the south-east. */
var SI_BOUNDS = L.latLngBounds([-12.4, 155.2], [-6.2, 167.3]);

var map, markerLayer, userMarker;
var pendingFit = null;      // a fit deferred because the container was hidden
var markers = {};          // school id → L.marker
var lastSignature = null;  // result-set fingerprint, so we only refit on change

SF.map.init = function () {
  map = L.map('map', {
    zoomControl: false,
    attributionControl: true,
    maxBounds: SI_BOUNDS.pad(1.2),
    minZoom: 5,
    maxZoom: 17
  });

  /* Standard OpenStreetMap raster tiles: free, no API key, no sign-up.
   * A slight desaturation (see .map-col in styles.css) keeps the basemap
   * quieter than the school markers sitting on top of it. */
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    maxZoom: 19
  }).addTo(map);

  L.control.zoom({ position: 'topright' }).addTo(map);

  markerLayer = L.layerGroup().addTo(map);
  map.fitBounds(SI_BOUNDS, { padding: [24, 24] });
};

SF.map.render = function (results, state) {
  if (!map) return;

  var signature = results.map(function (s) { return s.id; }).join(',');
  if (signature !== lastSignature) {
    drawMarkers(results);
    lastSignature = signature;
    if (results.length) fitTo(results);
  }

  paintSelection(state.selectedId);
  drawUserLocation(state.userLocation);
};

/** Recentre on the selected school without changing zoom unnecessarily. */
SF.map.focus = function (school) {
  if (!map || !school) return;
  var target = L.latLng(school.latitude, school.longitude);
  if (!map.getBounds().pad(-0.15).contains(target)) {
    map.panTo(target, { animate: true });
  }
};

SF.map.resetView = function () {
  if (map) map.fitBounds(SI_BOUNDS, { padding: [24, 24] });
};

/** True once the map has a real size — used to decide whether a fit can run. */
SF.map.isVisible = function () { return !!map && map.getSize().x > 0; };

/**
 * Call after the map container changes size (panel opens, mobile view switch).
 * If a fit was deferred because the map was display:none — which is how it
 * starts on small screens — carry it out now that the container has a size.
 */
SF.map.refresh = function () {
  if (!map) return;
  map.invalidateSize({ animate: false });
  if (pendingFit && map.getSize().x > 0) {
    var deferred = pendingFit;
    pendingFit = null;
    fitTo(deferred);
  }
};

/* --- internals ----------------------------------------------------------- */

function drawMarkers(results) {
  markerLayer.clearLayers();
  markers = {};

  results.forEach(function (school) {
    var marker = L.marker([school.latitude, school.longitude], {
      icon: pinIcon(school, false),
      title: school.name,
      alt: school.name,
      riseOnHover: true,
      keyboard: true
    });

    marker.on('click', function () { SF.select(school.id); });
    marker.on('keypress', function (e) {
      if (e.originalEvent.key === 'Enter') SF.select(school.id);
    });
    marker.bindTooltip(school.name, { direction: 'top', offset: [0, -14], opacity: 1 });

    marker.addTo(markerLayer);
    markers[school.id] = marker;
  });
}

function pinIcon(school, selected) {
  return L.divIcon({
    className: '',
    html: '<span class="pin' + (selected ? ' pin-selected' : '') +
          '" data-type="' + school.schoolType + '"></span>',
    iconSize: selected ? [26, 26] : [18, 18],
    iconAnchor: selected ? [13, 13] : [9, 9]
  });
}

function paintSelection(selectedId) {
  Object.keys(markers).forEach(function (id) {
    var school = SF.getSchoolById(id);
    markers[id].setIcon(pinIcon(school, id === selectedId));
    if (id === selectedId) markers[id].setZIndexOffset(1000);
    else markers[id].setZIndexOffset(0);
  });
}

function drawUserLocation(loc) {
  if (userMarker) { map.removeLayer(userMarker); userMarker = null; }
  if (!loc) return;

  userMarker = L.marker([loc.lat, loc.lng], {
    icon: L.divIcon({ className: '', html: '<span class="you-are-here"></span>', iconSize: [20, 20], iconAnchor: [10, 10] }),
    interactive: false,
    zIndexOffset: 2000
  }).addTo(map);
}

function fitTo(results) {
  /* A hidden container measures 0×0, and fitting against that gives a nonsense
   * centre. Remember the request and replay it from refresh() instead. */
  if (map.getSize().x === 0) { pendingFit = results; return; }
  var bounds = L.latLngBounds(results.map(function (s) { return [s.latitude, s.longitude]; }));
  map.fitBounds(bounds, { padding: [40, 40], maxZoom: results.length === 1 ? 13 : 15 });
}
