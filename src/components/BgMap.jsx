import React, { useState, useEffect } from 'react';
import DeckGL from '@deck.gl/react';
import { GeoJsonLayer } from '@deck.gl/layers';
import { Map } from 'react-map-gl';
import ZIP_SHAPEFILES from "../assets/filtered_zcta_2020.json";
import SAMPLE_DATA from "../assets/locations_20240804_213851.geojson";
import CSV_DATA from "../assets/sample_article_output.csv"; // Adjust the path if necessary

const MAPBOX_ACCESS_TOKEN = "pk.eyJ1IjoiaGFybGV5emhhbmciLCJhIjoiY2x5ejBmeGwxMHMzNzJpb3JwYjhhYzV2NiJ9.mJ4BLWUqkmS4yyV1pg9H-w";
const MAP_STYLE = "mapbox://styles/mapbox/light-v11";

const INITIAL_VIEW_STATE = {
  latitude: 40.697488,
  longitude: -73.979681,
  zoom: 10,
  bearing: 0,
  pitch: 0,
};

const parseCSV = (csv) => {
  // Simple CSV parser to map articleID to headlines
  const rows = csv.split('\n').slice(1); // Skip header row
  const data = rows.reduce((acc, row) => {
    const [articleID, headline] = row.split(',').map(val => val.trim().replace(/^"|"$/g, ''));
    if (articleID && headline) acc[articleID] = headline;
    return acc;
  }, {});
  return data;
};

const BgMap = ({ showLayer }) => {
  const [popupInfo, setPopupInfo] = useState(null);
  const [csvData, setCsvData] = useState({});

  useEffect(() => {
    // Fetch and parse CSV data (replace with actual data loading logic)
    fetch(CSV_DATA)
      .then(response => response.text())
      .then(text => setCsvData(parseCSV(text)));
  }, []);

  const layers = [
    new GeoJsonLayer({
      id: 'ztca',
      data: ZIP_SHAPEFILES,
      filled: false,
      stroked: true,
      lineWidthMinPixels: 1,
      getLineColor: [112, 112, 112],
      getLineWidth: 2,
    }),
    new GeoJsonLayer({
      id: 'sample-data',
      data: SAMPLE_DATA,
      filled: true,
      stroked: true,
      pointRadiusMinPixels: 7,
      pointRadiusScale: 2000,
      getPointRadius: f => 0,
      getFillColor: [80, 139, 250],
      pickable: true,
      autoHighlight: true,
      visible: showLayer === 'tab1',
      onClick: info => {
        if (info.object) {
          const articleIDs = info.object.properties.articleIDs.split(','); // Note the 'articleIDs'
          const headlines = articleIDs.map(id => csvData[id]).filter(Boolean);
          setPopupInfo({ headlines });
        }
      },
    }),
  ];

  return (
    <>
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
      {popupInfo && (
        <div className="fixed right-5 bottom-5 p-4 bg-white shadow-md rounded-lg z-30 w-[300px]">
          <h3 className="text-lg font-semibold mb-2">Headlines</h3>
          <ul>
            {popupInfo.headlines.map((headline, index) => (
              <li key={index} className="mt-4">{headline}</li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default BgMap;
