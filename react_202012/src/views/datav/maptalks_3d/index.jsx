import React, { useLayoutEffect, forwardRef } from "react";
import FullContainer from "@/modules/client/react_components/datav/FullContainer";
import PanelContainer from "@/modules/client/react_components/datav/PanelContainer";
import Map from "./Map";
import "@/modules/client/styles/可视化水波扩散效果.css";
const App = () => {
  return (
    <>
      <FullContainer className="dv-full">
        <Map></Map>
        <PanelContainer
          ratioWh={[1366, 768]}
          designWh={[1366, 100]}
          style={{
            zIndex: 200,
          }}
        >
          我是头部
        </PanelContainer>
        <PanelContainer ratioWh={[1366, 700]} designWh={[360, 768]}>
          我是左侧
        </PanelContainer>
        <PanelContainer
          ratioWh={[1366, 700]}
          designWh={[360, 768]}
          style={{
            left: "auto",
            right: "0",
            transformOrigin: "right top",
          }}
        >
          我是右侧
        </PanelContainer>
      </FullContainer>
    </>
  );
};
export default App;
