import React, { useEffect, useLayoutEffect, forwardRef } from "react";

import { drawHtmlMarker } from "./mapTools";
const App = () => {
  useEffect(() => {
    var map = new window.maptalks.Map("map", {
      center: [-0.113049, 51.498568],
      zoom: 14,
      pitch: 56,
      baseLayer: new window.maptalks.TileLayer("base", {
        urlTemplate:
          "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png",
        subdomains: ["a", "b", "c", "d"],
        attribution:
          '&copy; <a href="http://osm.org">OpenStreetMap</a> contributors, &copy; <a href="https://carto.com/">CARTO</a>',
      }),
    });
    window.$map = map;
    drawHtmlMarker({
      id: "test",
      point: [-0.113049, 51.498568],
      content: `<div><i></i><ul class="waterCircle"><li></li><li></li><li></li></ul></div>`,
      map: map,
    });
    return () => {
      window.$map = null;
    };
  }, []);
  return (
    <>
      <div id="map" style={{ width: "100%", height: "100%" }}></div>
    </>
  );
};
export default App;
