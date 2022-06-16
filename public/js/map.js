mapboxgl.accessToken =
  'pk.eyJ1IjoiaGVydmliZXN0dCIsImEiOiJjbDRiaHA0aTIwbjhlM2NxcDc1YWwyN2w1In0.pubkMAUMZR9iK0d_q_dj1Q';
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/streets-v11',
  zoom: 17,
  center: [110.371115147936507,-7.764896327114549] // titik pov center awal (saat dibuka)
});

// Fetch stores from API
async function getStores() {
  const res = await fetch('/api/v1/stores');
  const data = await res.json();


  const stores = data.data.map(store => {
    let marker = "zoo"
    if(store.isInside === "true"){
      marker = "dog-park"
    }
    
    return {
      type: 'Feature', 
      geometry: {
        type: 'Point',
        coordinates: [
          
          parseFloat(store.longitude),
          parseFloat(store.latitude)
        ]
      },
      properties: {
        storeId: store.storeId,
        icon: marker 
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
    [110.371469199526473, -7.764518945570386],
    [110.371335089075728, -7.764981370796013],
    [110.371115147936507, -7.764896327114549],
    [110.370734274256392, -7.765156773334677],
    [110.370272934305831, -7.765417219393360],
    [110.370058357584639, -7.765667034848973],
    [110.370058357584639, -7.765948741461157],
    [110.370192468035384, -7.766156034885346],
    [110.370777189600616, -7.766437741169628],
    [110.371141970026642, -7.766474947645888],
    [110.371689140665694, -7.766347382570713],
    [110.372027099001556, -7.766257023952372],
    [110.372188031542450, -7.765571360862242],
    [110.371909081804915, -7.765443795512725],
    [110.371892988550826, -7.765225871284355],
    [110.372123658526107, -7.764992001254990],
    [110.372155845034285, -7.764689033068868],

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
