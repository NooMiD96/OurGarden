import React from "react";

import { YMaps, Map, Placemark } from "react-yandex-maps";

const mapData = {
  center: [54.169205, 37.573214],
  zoom: 14
};

const coordinates = [[54.169205, 37.573214]];

export const CompanyMap = () => (
  <div className="company-map">
    <YMaps>
      <Map defaultState={mapData} width="100%" height="100%">
        {coordinates.map(coordinate => (
          <Placemark
            key={`${coordinate[0]}-${coordinate[1]}`}
            geometry={coordinate}
          />
        ))}
      </Map>
    </YMaps>
  </div>
);

export default CompanyMap;
