import React, { Component } from "react";

import store from "@/redux/store";
import { setUserInfo } from "@/redux/actions";

import axios from "@/axios";

class App extends Component {
  componentDidMount() {
    if (sessionStorage.getItem("userInfo")) {
      axios.post("/api/user/info").then((res) => {
        res = res.data;
        res.token = sessionStorage.getItem("token");
        sessionStorage.setItem("userInfo", JSON.stringify(res));
        store.dispatch(setUserInfo(res));
      });
    }
  }
  render() {
    return <></>;
  }
}

export default App;
