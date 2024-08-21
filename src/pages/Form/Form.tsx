import { useTranslation } from "react-i18next";

const Test2 = () => {
  const { t } = useTranslation();
  return (
    <div>
      <h1>{t("description.form&table")}</h1>
    </div>
  );
};

export default Test2;
