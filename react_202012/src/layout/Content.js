import React, { Component } from "react";

import { withRouter, Route, Switch } from "react-router-dom";

import routes from "@/router";
import FetchData from "@/layout/FetchData";
import { hasClass, addClass } from "@@/client/utils/class";

class ContentComponent extends Component {
  componentDidMount() {}
  render() {
    return (
      <>
        {sessionStorage.getItem("userInfo") && <FetchData></FetchData>}
        <Switch>
          {routes.map((ele) => {
            return (
              <Route
                key={ele.path}
                path={ele.path}
                exact
                render={(props) => {
                  if (ele.meta && ele.meta.theme) {
                    if (!hasClass(document.body, ele.meta.theme)) {
                      addClass(document.body, ele.meta.theme);
                    }
                  }
                  return <ele.component props={props}></ele.component>;
                }}
              />
            );
          })}
        </Switch>
      </>
    );
  }
}

export default ContentComponent;
