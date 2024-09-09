import React, { useState, useCallback } from 'react';
import Map, { Source, Layer, Popup } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import SAMPLE_DATA from '../assets/sample.geojson';

// ...

const BgMap = ({ showLayer }) => {
    const [hoverPopupInfo, setHoverPopupInfo] = useState(null);

    const handleMouseEnter = useCallback((event) => {
        const { features } = event;
        if (features.length > 0) {
            const feature = features[0];
            const center = feature.properties.center;
            setHoverPopupInfo({ center });
        }
    });

    return (
        <div className="map-container">
            <Map
                // ...
                interactiveLayerIds={['sample-layer']}
                onMouseEnter={handleMouseEnter}
            >
                <Source id="sample-data" type="geojson" data={SAMPLE_DATA}>
                    <Layer
                        id="sample-layer"
                        type="fill"
                        paint={{
                            'fill-color': '#ff5722', // Random color for fill
                            'fill-opacity': 0.6,
                        }}
                    />
                </Source>
                {hoverPopupInfo && (
                    <Popup
                        latitude={hoverPopupInfo.center[1]}
                        longitude={hoverPopupInfo.center[0]}
                        closeButton={false}
                        anchor="bottom"
                    >
                        <div>This is a popup</div>
                    </Popup>
                )}

            </Map>
        </div>
    );
};

export default BgMap;
