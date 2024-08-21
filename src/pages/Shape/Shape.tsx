import { Col, Divider, Flex, Row } from "antd";
import "./index.scss";
import { useState } from "react";
import { useTranslation } from "react-i18next";

interface Items {
  id: string;
  shape: string;
}

const item: Items[] = [
  {
    id: "square",
    shape: "square",
  },
  {
    id: "circle",
    shape: "circle",
  },
  {
    id: "ellipse",
    shape: "ellipse",
  },
  {
    id: "trapezoid",
    shape: "trapezoid",
  },
  {
    id: "parallelogram",
    shape: "parallelogram",
  },
  {
    id: "square-2",
    shape: "square-2",
  },
];

enum Position {
  BACK = "Back",
  NEXT = "Next",
}

const Shape = () => {
  const [position, setPosition] = useState<boolean>(true);
  const [itemsShape, setItemsShape] = useState(item);

  const { t } = useTranslation();

  const handleMovePosition = () => {
    setPosition((prev) => !prev);
  };

  const movePosition = (position: Position) => {
    if (position === Position.NEXT) {
      setItemsShape((prev) => {
        const last = prev.pop();
        if (last) {
          return [last, ...prev];
        } else {
          return prev;
        }
      });
    } else {
      setItemsShape((prev) => {
        const first = prev.shift();
        if (first) {
          return [...prev, first];
        } else {
          return prev;
        }
      });
    }
  };

  const random = () => {
    setItemsShape((prev) => {
      const newItemsShape = [...prev];
      let currentIndex = newItemsShape.length;

      while (currentIndex != 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        [newItemsShape[currentIndex], newItemsShape[randomIndex]] = [
          newItemsShape[randomIndex],
          newItemsShape[currentIndex],
        ];
      }

      return newItemsShape;
    });
  };

  return (
    <div>
      <h1
        style={{
          height: "40px",
        }}
      >
        {t("description.layout&style")}
      </h1>
      <div className="section-shape">
        <Flex
          vertical
          style={{
            width: "100%",
          }}
        >
          <Flex gap={16}>
            <button
              className="button-shape"
              onClick={() => movePosition(Position.BACK)}
            >
              <div className="shape arrow-left"></div>
              <div className="box-under-button">
                <span className="label">{t("text-button.move-shape")}</span>
              </div>
            </button>
            <Flex
              style={{
                width: "100%",
              }}
            >
              <button className="button-shape" onClick={handleMovePosition}>
                <Flex gap={24}>
                  <div className="shape arrow-top"></div>
                  <div className="shape arrow-bottom"></div>
                </Flex>
                <div className="box-under-button">
                  <span className="label">
                    {t("text-button.move-position")}
                  </span>
                </div>
              </button>
            </Flex>
            <button
              className="button-shape"
              onClick={() => movePosition(Position.NEXT)}
            >
              <div className="shape arrow-right"></div>
              <div className="box-under-button">
                <span className="label">{t("text-button.move-shape")}</span>
              </div>
            </button>
          </Flex>

          <Divider />

          <Flex vertical gap={16}>
            <Row gutter={16} justify={position ? "start" : "end"}>
              {itemsShape.slice(0, 3).map((item) => (
                <Col key={item.id} span={7}>
                  <button className="button-shape" onClick={random}>
                    <div className={`shape ${item.shape}`}> </div>
                  </button>
                </Col>
              ))}
            </Row>
            <Row gutter={16} justify={position ? "end" : "start"}>
              {itemsShape.slice(3).map((item) => (
                <Col key={item.id} span={7}>
                  <button className="button-shape" onClick={random}>
                    <div className={`shape ${item.shape}`}></div>
                  </button>
                </Col>
              ))}
            </Row>
          </Flex>
        </Flex>
      </div>
    </div>
  );
};

export default Shape;
