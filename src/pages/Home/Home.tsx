import { Card, Col, Row } from "antd";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

interface ButtonNavigate {
  title: string;
  description: string;
  to: string;
}

const Home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const navigateToTest: ButtonNavigate[] = [
    {
      title: "title.test1",
      description: "description.layout&style",
      to: "shape",
    },
    {
      title: "title.test2",
      description: "description.form&table",
      to: "form",
    },
  ];

  const navigateTo = (to: string) => {
    navigate(to);
  };

  return (
    <div className="section-home">
      <section
        style={{
          width: "100%",
        }}
      >
        <Row gutter={16}>
          {navigateToTest.map((item) => (
            <Col key={t(item.title)} span={12}>
              <Card
                onClick={() => navigateTo(item.to)}
                title={t(item.title)}
                bordered
                style={{
                  cursor: "pointer",
                  height: "100%",
                  width: "100%",
                }}
              >
                {t(item.description)}
              </Card>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default Home;
