import React, { useLayoutEffect, forwardRef } from "react";
import FullContainer from "@/modules/client/react_components/datav/FullContainer";
import PanelContainer from "@/modules/client/react_components/datav/PanelContainer";
import Loading1 from "@/modules/client/react_components/datav/Loading1";

const App = () => {
  return (
    <>
      <FullContainer className="dv-full">
        <Loading1></Loading1>
        <PanelContainer
          ratioWh={[1366, 768]}
          designWh={[1366, 100]}
          style={{
            backgroundColor: "#fff",
            zIndex: 200,
          }}
        >
          我是头部
        </PanelContainer>
        <PanelContainer
          ratioWh={[1366, 700]}
          designWh={[360, 768]}
          style={{ backgroundColor: "#f40" }}
        >
          我是左侧
        </PanelContainer>
        <PanelContainer
          ratioWh={[1366, 700]}
          designWh={[360, 768]}
          style={{
            backgroundColor: "#f40",
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
