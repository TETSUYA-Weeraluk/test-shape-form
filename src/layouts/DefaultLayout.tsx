import React, { useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import { Select, Space } from "antd";
import { useTranslation } from "react-i18next";

const DefaultLayout: React.FC = () => {
  const { t, i18n } = useTranslation();

  const [language, setLanguage] = React.useState("EN");

  useEffect(() => {
    const storedLanguage = localStorage.getItem("language");

    if (storedLanguage === null) {
      localStorage.setItem("language", language);
    } else {
      setLanguage(storedLanguage);
      i18n.changeLanguage(storedLanguage);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("language", language);
    i18n.changeLanguage(language);
  }, [language]);

  const options = [
    { value: "TH", label: t("language.th") },
    { value: "EN", label: t("language.en") },
  ];

  const handleChange = (language: string) => {
    setLanguage(language);
    i18n.changeLanguage(language);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <header
        style={{
          display: "flex",
          justifyContent: "end",
        }}
      >
        <Space wrap>
          <Select
            defaultValue={language}
            style={{ width: 120 }}
            onChange={handleChange}
            options={options}
            value={t(language)}
          />
        </Space>
      </header>
      <main className="w-full flex-grow max-w-7xl mx-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default DefaultLayout;
