import { FC, ReactElement } from "react";
import { RouteProps } from "react-router";
import PrivateRoute from "./pravateRoute";
import { useIntl } from "react-intl";

export interface WrapperRouteProps extends RouteProps {
  /** document title locale id */
  docTitle?: string;
  /** authorization？ */
  docTheme?: string;
  needLogin?: boolean;
}

const WrapperRouteComponent: FC<WrapperRouteProps> = ({
  docTitle,
  needLogin,
  docTheme,
  ...props
}) => {
  const { formatMessage } = useIntl();

  if (docTitle) {
    document.title = formatMessage({
      id: docTitle,
    });
  }

  if (docTheme) {
    document.body.setAttribute("data-theme", docTheme);
  }else{
    document.body.setAttribute("data-theme", "light");
  }

  return needLogin ? (
    <PrivateRoute {...props} />
  ) : (
    (props.element as ReactElement)
  );
};

export default WrapperRouteComponent;
