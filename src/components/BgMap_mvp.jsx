import React, { useState } from 'react';
import Map, { Source, Layer, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import AGGREGATED_DATA from '../assets/aggregated_locations.geojson';
import CSV_DATA from '../assets/sample_article_output.csv';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiaGFybGV5emhhbmciLCJhIjoiY2x5ejBmeGwxMHMzNzJpb3JwYjhhYzV2NiJ9.mJ4BLWUqkmS4yyV1pg9H-w';
const MAP_STYLE = 'mapbox://styles/mapbox/light-v11';

const BgMap = ({ showLayer }) => {
  const [hoverInfo, setHoverInfo] = useState(null);

  const onHover = (event) => {
    const { features, point } = event;
    const hoveredFeature = features && features[0];

    if (hoveredFeature) {
      const { properties } = hoveredFeature;
      const center = properties.center;
      console.log(center)

      setHoverInfo({
        coordinates: center,
        properties: properties,
        x: point.x,
        y: point.y,
      });
    } else {
      setHoverInfo(null);
    }
  };

  return (
    <Map
      initialViewState={{
        longitude: -73.971451,
        latitude: 40.758373,
        zoom: 12,
      }}
      style={{ width: '100%', height: '100%' }}
      mapStyle={MAP_STYLE}
      mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
      onMouseMove={onHover}
      interactiveLayerIds={['aggregated-data']}
    >
      {showLayer === 'aggregated-data' && (
        <Source id="aggregated-data" type="geojson" data={AGGREGATED_DATA}>
          <Layer
            id="aggregated-data"
            type="fill"
            paint={{
              'fill-color': 'blue',
              'fill-opacity': 0.5,
            }}
          />
        </Source>
      )}

      {hoverInfo && (
        <Popup
          longitude={hoverInfo.coordinates[0]}
          latitude={hoverInfo.coordinates[1]}
          closeButton={false}
          anchor="bottom-left"
          offset={10}
        >
          <div>{hoverInfo.properties.ZCTA5CE20}</div>
        </Popup>
      )}
    </Map>
  );
};

export default BgMap;
