import { Button, Result } from "antd";
import { useNavigate } from "react-router-dom";
import { FormattedMessage } from "react-intl";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        position: "absolute",
        top: "0",
        left: "0",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Result
        status="404"
        title="404"
        subTitle={<FormattedMessage id="common.tips.notfound" />}
        extra={
          <Button type="primary" onClick={() => navigate("/")}>
            {<FormattedMessage id="common.tips.backHome" />}
          </Button>
        }
      ></Result>
    </div>
  );
};

export default NotFoundPage;
