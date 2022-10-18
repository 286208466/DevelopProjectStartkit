import React, { useEffect, useLayoutEffect, forwardRef } from "react";

const App = () => {
  useEffect(() => {
    window.mapboxgl.accessToken =
      "pk.eyJ1IjoiMjg2MjA4NDY2IiwiYSI6ImNrazdvbXZrdTBkZXAydW1mbWw0aml1eTEifQ.938Xtp4cNcO3zn5MkfImIw";

    var map = new window.mapboxgl.Map({
      container: "map",
      zoom: 11,
      center: [113.91346448688387, 22.557163498100365],
      style: "mapbox://styles/mapbox/dark-v9",
    });
    window.$map = map;
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
