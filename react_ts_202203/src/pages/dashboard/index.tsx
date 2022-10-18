import * as React from "react";
import * as ReactDOM from "react-dom";
import { FC } from "react";
import {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useImperativeHandle,
  forwardRef,
  Suspense,
} from "react";

import {
  ResponsiveContainer,
  AreaChart,
  Tooltip as RTooltip,
  Area,
  XAxis,
  BarChart,
  Bar,
} from "recharts";
import { Row, Col, Card, Tooltip, Progress, Badge } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";

import moment from "moment";
import { useLocale } from "@/locales";
import {addClass, removeClass} from "@/utils/class"

import styles from "./index.module.scss";

const data = new Array(14).fill(null).map((_, index) => ({
  name: moment().add(index, "day").format("YYYY-MM-DD"),
  number: Math.floor(Math.random() * 8 + 1),
}));

const wrapperCol: any = {
  xs: 24,
  sm: 24,
  md: 12,
  lg: 12,
  xl: 12,
  xxl: 6,
};

interface ColCardProps {
  metaName: string;
  metaCount: string;
  body: React.ReactNode;
  footer: React.ReactNode;
  loading: boolean;
}

const ColCard: FC<ColCardProps> = ({
  metaName,
  metaCount,
  body,
  footer,
  loading,
}) => {
  return (
    <Col {...wrapperCol}>
      <Card loading={loading} className="overview" bordered={false}>
        <div className="overview-header">
          <div className="overview-header-meta">{metaName}</div>
          <div className="overview-header-count">{metaCount}</div>
          <Tooltip title="Introduce">
            <InfoCircleOutlined className="overview-header-action" />
          </Tooltip>
        </div>
        <div className="overview-body">{body}</div>
        <div className="overview-footer">{footer}</div>
      </Card>
    </Col>
  );
};

const CustomTooltip: FC<any> = ({ active, payload, label }) =>
  active && (
    <div className="customTooltip">
      <span className="customTooltip-title">
        <Badge color={payload[0].fill} /> {label} : {payload[0].value}
      </span>
    </div>
  );

function App(props: any): JSX.Element {
  const [loading, setLoading] = useState(true);

  const { formatMessage } = useLocale();

  useEffect(() => {

    addClass(document.body, "dashboard-Body")
    const timer = setTimeout(() => {
      setLoading(undefined as any);
    }, 2000);

    return () => {
      removeClass(document.body, "dashboard-Body")
      clearTimeout(timer);
    };
  }, []);

  return (
    <React.Fragment>
      <div>
        <Row gutter={[12, 12]}>
          <Col {...wrapperCol}>
            <Card loading={loading} className="overview" bordered={false}>
              <div className="overview-header">
                <div className="overview-header-meta">{"Total Sales"}</div>
                <div className="overview-header-count">{"¥ 126,560"}</div>
                <Tooltip title="Introduce">
                  <InfoCircleOutlined className="overview-header-action" />
                </Tooltip>
              </div>
              <div className="overview-body">
                <div className="trend">
                  <div className="trend-item">
                    <span className="trend-item-label">周同比</span>
                    <span className="trend-item-text">{"12%"}</span>
                    {/* <CaretUpIcon color="#f5222d" /> */}
                  </div>
                  <div className="trend-item">
                    <span className="trend-item-label">日同比</span>
                    <span className="trend-item-text">{"12%"}</span>
                    {/* <CaretDownIcon color="#52c41a" /> */}
                  </div>
                </div>
              </div>
              <div className="overview-footer">
                <div className="field">
                  <span className="field-label">{"Daily Sales"}</span>
                  <span className="field-number">{"￥12,423"} </span>
                </div>
              </div>
            </Card>
          </Col>
          <Col {...wrapperCol}>
            <Card loading={loading} className="overview" bordered={false}>
              <div className="overview-header">
                <div className="overview-header-meta">{"Visits"}</div>
                <div className="overview-header-count">{"8846"}</div>
                <Tooltip title="Introduce">
                  <InfoCircleOutlined className="overview-header-action" />
                </Tooltip>
              </div>
              <div className="overview-body">
                <ResponsiveContainer>
                  <AreaChart data={data}>
                    <XAxis dataKey="name" hide />
                    <RTooltip content={<CustomTooltip />} />
                    <Area
                      strokeOpacity={0}
                      type="monotone"
                      dataKey="number"
                      fill="#8E65D3"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="overview-footer">
                <div className="field">
                  <span className="field-label">{"Daily Sales"}</span>
                  <span className="field-number">{"1234"} </span>
                </div>
              </div>
            </Card>
          </Col>
          <Col {...wrapperCol}>
            <Card loading={loading} className="overview" bordered={false}>
              <div className="overview-header">
                <div className="overview-header-meta">{"Payments"}</div>
                <div className="overview-header-count">{"6560"}</div>
                <Tooltip title="Introduce">
                  <InfoCircleOutlined className="overview-header-action" />
                </Tooltip>
              </div>
              <div className="overview-body">
                <ResponsiveContainer>
                  <BarChart data={data}>
                    <XAxis dataKey="name" hide />
                    <RTooltip content={<CustomTooltip />} />
                    <Bar
                      strokeOpacity={0}
                      barSize={10}
                      dataKey="number"
                      stroke="#3B80D9"
                      fill="#3B80D9"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="overview-footer">
                <div className="field">
                  <span className="field-label">{"Conversion Rate"}</span>
                  <span className="field-number">{"60%"} </span>
                </div>
              </div>
            </Card>
          </Col>
          <Col {...wrapperCol}>
            <Card loading={loading} className="overview" bordered={false}>
              <div className="overview-header">
                <div className="overview-header-meta">
                  {"Operational Effect"}
                </div>
                <div className="overview-header-count">{"8846"}</div>
                <Tooltip title="Introduce">
                  <InfoCircleOutlined className="overview-header-action" />
                </Tooltip>
              </div>
              <div className="overview-body">
                <Progress strokeColor="#58BFC1" percent={85} />
              </div>
              <div className="overview-footer">
                <div className="field">
                  <span className="field-label">{"WoW Change"}</span>
                  <span className="field-number">{"10%"} </span>
                </div>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </React.Fragment>
  );
}

// const mapStateToProps = (state) => ({
//   global: state.global,
// });
// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators(actions, dispatch);
// };
// export default connect(mapStateToProps, mapDispatchToProps)(App);

export default App;
