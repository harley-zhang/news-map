import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { Map } from 'react-map-gl';
import ZIP_SHAPEFILES from "../assets/nyc_ztca.json";

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiaGFybGV5emhhbmciLCJhIjoiY2x5ejBmeGwxMHMzNzJpb3JwYjhhYzV2NiJ9.mJ4BLWUqkmS4yyV1pg9H-w";
const MAP_STYLE = "https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json";

const INITIAL_VIEW_STATE = {
  latitude: 40.697488,
  longitude: -73.979681,
  zoom: 10,
  bearing: 0,
  pitch: 0,
};

const BgMap = () => {
  const layers = [
    new GeoJsonLayer({
      id: 'geojson-layer',
      data: ZIP_SHAPEFILES,
      filled: false,
      stroked: true,
      lineWidthMinPixels: 1,
      getLineColor: [112, 112, 112],
      getLineWidth: 2,
    }),
  ];

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller={true}
      layers={layers}
      style={{ position: 'absolute', width: '100%', height: '100%' }}
    >
      <Map 
        mapStyle={MAP_STYLE} 
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN} 
        style={{ position: 'absolute', width: '100%', height: '100%' }}
      />
    </DeckGL>
  );
};

export default BgMap;