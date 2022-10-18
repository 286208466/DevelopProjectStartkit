/**
 * options.map
 * options.id
 * options.content
 * options.point
 *
 *
 */
export function drawHtmlMarker(options) {
  const { id, content, point, rotateWithMap, pitchWithMap, map } = options;
  if (!window.$htmlMarkers) {
    window.$htmlMarkers = {};
  }
  if (window.$htmlMarkers[id]) {
    window.$htmlMarkers[id].remove();
  }
  let marker = new window.maptalks.ui.UIMarker(point, {
    draggable: false,
    single: false,
    content: content,
    pitchWithMap: pitchWithMap ? pitchWithMap : true,
    rotateWithMap: rotateWithMap ? rotateWithMap : false,
  });
  marker.addTo(map).show();
  window.$htmlMarkers[id] = marker;
}

/**
 * id {string}
 *
 */
export function removeHtmlMarkerById(id) {
  if (window.$htmlMarkers && window.$htmlMarkers[id]) {
    window.$htmlMarkers[id].remove();
  }
}

/**
 * options.map
 * options.point
 * options.id
 * options.layerName
 */
export function drawCircle(options) {
  const { point, id, map, layerName } = options;
  let circle = new window.maptalks.Circle(point, 10, {
    id: id,
    symbol: {
      lineColor: "#000",
      lineWidth: 0,
      polygonFill: "#000",
      polygonOpacity: 1,
    },
  });
  map.getLayer(layerName).addGeometry([circle]);
}

export function drawLine(options) {
  const {
    points,
    id,
    map,
    layerName,
    lineColor,
    lineWidth,
    lineOpacity,
    lineDasharray,
    zindex,
  } = options;
  let line = new window.maptalks.LineString(points, {
    id: id,
    arrawStyle: null,
    arrowPlacement: "vertext-last",
    visible: true,
    editable: true,
    cursor: null,
    shadowBlur: 0,
    shadowColor: "black",
    draggable: false,
    dragShadow: false,
    drawOnAxis: null,
    symbol: {
      lineColor: lineColor || "#000",
      lineWidth: lineWidth || 2,
      lineOpacity: lineOpacity || 1,
      lineDasharray: lineDasharray || null,
    },
  });
  line.setZIndex(zindex || 1);
  line.addTo(map.getLayer(layerName));
}

export function drawPolygon(options) {
  const {
    points,
    id,
    map,
    layerName,
    lineColor,
    lineWidth,
    polygonFill,
    polygonOpacity,
    zindex,
  } = options;
  let polygon = new window.maptalks.Polygon([points], {
    id: id,
    visible: true,
    editable: true,
    cursor: "pointer",
    shadowBlur: 0,
    shadowColor: "black",
    draggable: false,
    dragShadow: false,
    drawOnAxis: null,
    symbol: {
      lineColor: lineColor || "#fff",
      lineWidth: lineWidth || 0,
      polygonFill: polygonFill || "#ddd",
      polygonOpacity: polygonOpacity || 1,
    },
  });
  polygon.setZIndex(zindex || 1);
  polygon.addTo(map.getLayer(layerName));
}
