import React from "react";
import { Spin } from "antd";

const App: React.FC = () => {

  return (
    <div className="pageLoading" style={{ 
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      position: "fixed",
      left: 0,
      top: 0,
      width: "100%",
      height: "100vh",
      overflow: "hidden",
      zIndex: "1000",
      background:"rgba(255, 255, 255, 1)"
    }}>
      <Spin size="large" />
    </div>
  );
};

export default App;
