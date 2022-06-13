mapboxgl.accessToken =
  'pk.eyJ1IjoiaGVydmliZXN0dCIsImEiOiJjbDRiaHA0aTIwbjhlM2NxcDc1YWwyN2w1In0.pubkMAUMZR9iK0d_q_dj1Q';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 9,
  center: [139.745438, 	35.658581] // titik pov center awal (saat dibuka)
});

// Fetch stores from API
async function getStores() {
  const res = await fetch('/api/v1/stores');
  const data = await res.json();

  const stores = data.data.map(store => {
    return {
      type: 'Feature', 
      geometry: {
        type: 'Point',
        coordinates: [
          parseFloat(store.latitude),
          parseFloat(store.longitude),
        ]
      },
      properties: {
        storeId: store.storeId,
        icon: 'zoo'
      }
    };
  });
// Load map with stores

map.on('load', function() {
  // Add a data source containing GeoJSON data.
map.addSource('maine', {
'type': 'geojson',
'data': {
'type': 'Feature',
'geometry': {
'type': 'Polygon',
// These coordinates outline Maine.
'coordinates': [
[
  [139.46798405428683,35.50223614827076, ],
  [138.98002490838377,35.7895857759041,],
  [139.07009894945483,35.879461497233635, ],
  [ 139.71216519412445,35.79145922532963,],
  [139.89231328058102,35.78771228300614, ],

  [ 139.9139572399457,35.70130217074246,],
 
  

  [139.73905533838624 ,35.541163052894504],

]
]
}
}
});
 
// Add a new layer to visualize the polygon.
map.addLayer({
'id': 'maine',
'type': 'fill',
'source': 'maine', // reference the data source
'layout': {},
'paint': {
'fill-color': '#0080ff', // blue color fill
'fill-opacity': 0.5
}
});
// Add a black outline around the polygon.
map.addLayer({
'id': 'outline',
'type': 'line',
'source': 'maine',
'layout': {},
'paint': {
'line-color': '#000',
'line-width': 3
}
});
  map.addLayer({
    id: 'points',
    type: 'symbol',
    source: {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: stores
      }
    },
    layout: {
      'icon-image': '{icon}-15',
      'icon-size': 1.5,
      'text-field': '{storeId}',
      'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
      'text-offset': [0, 0.9],
      'text-anchor': 'top'
    }
  });
});
  
}




getStores();
