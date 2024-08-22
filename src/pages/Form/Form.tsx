import { useTranslation } from "react-i18next";
import "./index.scss";
import FormUser from "./components/FormUser";
import TableUser from "./components/TableUser";
import { useEffect } from "react";
import { useAppDispatch } from "../../store/hooks";
import { loadData } from "../../store/reducer/formSlice";
import { Button, Flex } from "antd";
import { useNavigate } from "react-router-dom";

const TestForm = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadData());
  }, []);

  const back = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <div
        style={{
          padding: "1rem",

          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Flex justify="space-between" align="center">
          <h1>{t("description.form&table")}</h1>
          <Button onClick={back}>{t("home")}</Button>
        </Flex>
        <FormUser />

        <TableUser />
      </div>
    </div>
  );
};

export default TestForm;
