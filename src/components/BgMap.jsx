import React, { useState, useEffect } from 'react';
import Map, { Source, Layer, Popup, NavigationControl, FullscreenControl, ScaleControl, GeolocateControl } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import ZTCA from '../assets/filtered_zcta_2020.json';
import SAMPLE_DATA from '../assets/locations_20240804_213851.geojson';
import CSV_DATA from '../assets/sample_article_output.csv';

const MAPBOX_ACCESS_TOKEN = 'pk.eyJ1IjoiaGFybGV5emhhbmciLCJhIjoiY2x5ejBmeGwxMHMzNzJpb3JwYjhhYzV2NiJ9.mJ4BLWUqkmS4yyV1pg9H-w';
const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/positron-nolabels-gl-style/style.json';

const INITIAL_VIEW_STATE = {
  latitude: 40.697488,
  longitude: -73.979681,
  zoom: 10,
  bearing: 0,
  pitch: 0,
};

const parseCSV = (csvText) => {
  const rows = csvText.split('\n').slice(1); // Skip header row
  return rows.reduce((acc, row) => {
    const [articleID, headline] = row.split(',').map(val => val.trim().replace(/^"|"$/g, ''));
    if (articleID && headline) acc[articleID] = headline;
    return acc;
  }, {});
};

const BgMap = ({ showLayer }) => {
  const [viewport, setViewport] = useState({
    longitude: -70,
    latitude: 40.75,
    zoom: 3.5,
  });
  const [csvData, setCsvData] = useState({});
  const [hoverPopupInfo, setHoverPopupInfo] = useState(null);
  const [clickPopupInfo, setClickPopupInfo] = useState(null);

  useEffect(() => {
    fetch(CSV_DATA)
      .then(response => response.text())
      .then(text => setCsvData(parseCSV(text)))
      .catch(error => console.error('Error loading CSV data:', error));
  }, []);

  const getHeadlines = (articleIDs) => {
    const ids = articleIDs.split(',').map(id => id.trim());
    const headlines = ids.map(id => csvData[id]).filter(headline => headline !== undefined);

    if (headlines.length === 1) {
      return headlines[0];
    } else if (headlines.length > 1) {
      return `${headlines.length} articles`;
    } else {
      return 'No articles available';
    }
  };

  const getClickPopupContent = (articleIDs) => {
    const ids = articleIDs.split(',').map(id => id.trim());
    return ids.map(id => ({
      id,
      headline: csvData[id] || 'No headline available'
    }));
  };

  return (
    <div className="map-container">
      <Map
        initialViewState={INITIAL_VIEW_STATE}
        style={{ width: '100%', height: '100%' }}
        mapStyle={MAP_STYLE}
        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        interactiveLayerIds={['sample-layer']}
        onMouseEnter={(event) => {
          const { features } = event;
          if (features.length > 0) {
            const feature = features[0];
            const coordinates = feature.geometry.coordinates;
            const articleIDs = feature.properties.articleIDs;

            if (clickPopupInfo &&
              clickPopupInfo.coordinates[0] === coordinates[0] &&
              clickPopupInfo.coordinates[1] === coordinates[1]) {
              return; // Do not show hover popup
            }

            const popupContent = getHeadlines(articleIDs);
            setHoverPopupInfo({ coordinates, content: popupContent });
          }
        }}
        onMouseLeave={() => setHoverPopupInfo(null)}
        onClick={(event) => {
          const { features } = event;
          if (features.length > 0) {
            const feature = features[0];
            const coordinates = feature.geometry.coordinates;
            const articleIDs = feature.properties.articleIDs;

            const popupContent = getClickPopupContent(articleIDs);
            setClickPopupInfo({ coordinates, content: popupContent });
          } else {
            setClickPopupInfo(null);
          }
        }}
      >
        <GeolocateControl position="top-right" />
        <FullscreenControl position="top-right" />
        <NavigationControl position="top-right" />
        {showLayer === 'all' && (
          <>
            <Source id="ztca" type="geojson" data={ZTCA}>
              <Layer
                id="ztca-layer"
                type="line"
                paint={{
                  'line-color': '#888888',
                  'line-width': 0.5,
                }}
              />
            </Source>
            <Source id="sample-data" type="geojson" data={SAMPLE_DATA}>
              <Layer
                id="sample-layer"
                type="circle"
                paint={{
                  'circle-radius': 6,
                  'circle-color': '#007cbf',
                }}
              />
            </Source>
          </>
        )}
        {showLayer === 'ztca' && (
          <Source id="ztca" type="geojson" data={ZTCA}>
            <Layer
              id="ztca-layer"
              type="line"
              paint={{
                'line-color': '#888888',
                'line-width': 0.5,
              }}
            />
          </Source>
        )}
        {hoverPopupInfo && (
          <Popup
            latitude={hoverPopupInfo.coordinates[1]}
            longitude={hoverPopupInfo.coordinates[0]}
            closeButton={false}
            anchor="bottom"
          >
            <div>{hoverPopupInfo.content}</div>
          </Popup>
        )}
        {clickPopupInfo && (
          <Popup
            latitude={clickPopupInfo.coordinates[1]}
            longitude={clickPopupInfo.coordinates[0]}
            closeOnClick={false}
            anchor="bottom"
            onClose={() => setClickPopupInfo(null)}
            className="custom-popup" // ***** Add custom class for styling
          >
            <div className="pt-3">
              {clickPopupInfo.content.map((item) => (
                <div key={item.id}>
                  <strong>{item.id}:</strong> {item.headline}
                </div>
              ))}
            </div>
          </Popup>
        )}
      </Map>
    </div>
  );
};

export default BgMap;
