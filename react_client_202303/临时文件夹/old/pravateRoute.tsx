import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Result, Button } from "antd";
import { useLocale } from "@/locales";
import { RouteProps, useLocation } from "react-router";
import { useSelector } from "react-redux";

import Cookies from "js-cookie";

const PrivateRoute: FC<RouteProps> = (props) => {
  const logged = !!Cookies.get("token");
  const navigate = useNavigate();
  const { formatMessage } = useLocale();
  const location = useLocation();

  return logged ? (
    (props.element as React.ReactElement)
  ) : (
    <Result
      status="403"
      title="403"
      subTitle={formatMessage({ id: "common.tips.unauthorized" })}
      extra={
        <Button
          type="primary"
          onClick={() =>
            navigate(
              `/login${"?from=" + encodeURIComponent(location.pathname)}`,
              { replace: true }
            )
          }
        >
          {formatMessage({ id: "common.tips.goToLogin" })}
        </Button>
      }
    />
  );
};

export default PrivateRoute;
