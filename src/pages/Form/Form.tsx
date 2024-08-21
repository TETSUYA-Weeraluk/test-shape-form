import { useTranslation } from "react-i18next";
import "./index.scss";
import {
  Button,
  Col,
  DatePicker,
  Flex,
  Form,
  Image,
  Input,
  Radio,
  Row,
  Select,
} from "antd";
import { useState } from "react";

import flagTh from "../../assets/th.png";
import flagUsa from "../../assets/usa.jpg";
import flagFr from "../../assets/fr.png";
import { DataUser, FormType } from "./type";
import dayjs from "dayjs";

const optionPhone = [
  {
    flag: flagTh,
    label: "+66",
  },
  {
    flag: flagUsa,
    label: "+1",
  },
  {
    flag: flagFr,
    label: "+33",
  },
];

const TestForm = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("MR");
  const [data, setData] = useState<DataUser[]>([]);
  const [form] = Form.useForm();

  const optionsTitle = [
    {
      value: "MR",
      label: t("optionTitle.MR"),
    },
    {
      value: "MRS",
      label: t("optionTitle.MRS"),
    },
    {
      value: "MS",
      label: t("optionTitle.MS"),
    },
  ];

  const optionNationality = [
    {
      value: "TH",
      label: t("optionNationality.TH"),
    },
    {
      value: "USA",
      label: t("optionNationality.US"),
    },
    {
      value: "FR",
      label: t("optionNationality.FR"),
    },
  ];

  const optionGender = [
    {
      value: "male",
      label: t("optionGender.male"),
    },
    {
      value: "female",
      label: t("optionGender.female"),
    },
    {
      value: "unsex",
      label: t("optionGender.unsex"),
    },
  ];

  const setFill = () => {
    form.setFieldsValue({
      title: "MR",
      firstName: "test",
      lastName: "test",
      birthday: dayjs("2024-07-31T17:00:00.000Z"),
      nationality: "TH",
      citizenId: "1",
      citizenIdPart2: "2345",
      citizenIdPart3: "67890",
      citizenIdPart4: "11",
      citizenIdPart5: "1",
      gender: "male",
      mobile: "+66",
      mobile2: "123456789",
      passport: "1234123412341234",
      expectedSalary: "2323123123",
    });
  };

  const onFinish = (values: FormType) => {
    console.log("Success:", values);
    const citizenId = `${values.citizenId}${values.citizenIdPart2}${values.citizenIdPart3}${values.citizenIdPart4}${values.citizenIdPart5}`;
    const mobileNumber = `${values.mobile}${values.mobile2}`;

    const formatData: DataUser = {
      id: Math.random().toString(),
      title: values.title,
      firstName: values.firstName,
      lastName: values.lastName,
      birthday: values.birthday,
      nationality: values.nationality,
      cityzenId: citizenId,
      gender: values.gender,
      mobileNumber: mobileNumber,
      passport: values.passport,
      expectedSalary: values.expectedSalary,
    };
    setData((prev) => [formatData, ...prev]);

    const newData = [formatData, ...data];

    localStorage.setItem("data", JSON.stringify(newData));
  };

  const reset = () => {
    form.resetFields();
  };

  return (
    <div
      style={{
        width: "100%",
      }}
    >
      <button onClick={setFill}>Test</button>
      <h1>{t("description.form&table")}</h1>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Form
          form={form}
          onFinish={onFinish}
          layout="horizontal"
          style={{
            maxWidth: "1024px",
            border: "1px solid #000",
            padding: "16px",
            borderRadius: "8px",
          }}
        >
          <Row gutter={16}>
            <Col span={5}>
              <Form.Item
                label={t("form.title")}
                layout="horizontal"
                style={{
                  width: "100%",
                }}
                name="title"
                rules={[{ required: true, message: "Please select!" }]}
              >
                <Select
                  placeholder={t("form.title")}
                  options={optionsTitle}
                  value={title}
                  onChange={(e) => setTitle(e)}
                ></Select>
              </Form.Item>
            </Col>
            <Col span={10}>
              <Form.Item
                label={t("form.firstName")}
                name="firstName"
                layout="horizontal"
                style={{
                  width: "100%",
                }}
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={9}>
              <Form.Item
                label={t("form.lastName")}
                name="lastName"
                layout="horizontal"
                style={{
                  width: "100%",
                }}
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={t("form.birthday")}
                name="birthday"
                layout="horizontal"
                style={{
                  width: "100%",
                }}
                rules={[{ required: true, message: "Please input!" }]}
              >
                <DatePicker
                  style={{
                    width: "100%",
                  }}
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label={t("form.nationality")}
                name="nationality"
                layout="horizontal"
                style={{
                  width: "100%",
                }}
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select
                  placeholder="- - Please Select - -"
                  options={optionNationality}
                ></Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={5}>
              <Form.Item
                label={t("form.citizenId")}
                name="citizenId"
                layout="horizontal"
                style={{
                  width: "100%",
                }}
              >
                <Input
                  style={{
                    textAlign: "center",
                  }}
                  maxLength={1}
                />
              </Form.Item>
            </Col>
            -
            <Col span={6}>
              <Form.Item
                name="citizenIdPart2"
                layout="horizontal"
                style={{
                  width: "100%",
                }}
              >
                <Input
                  style={{
                    textAlign: "center",
                  }}
                  maxLength={4}
                />
              </Form.Item>
            </Col>
            -
            <Col span={5}>
              <Form.Item
                name="citizenIdPart3"
                layout="horizontal"
                style={{
                  width: "100%",
                }}
              >
                <Input
                  style={{
                    textAlign: "center",
                  }}
                  maxLength={5}
                />
              </Form.Item>
            </Col>
            -
            <Col span={4}>
              <Form.Item
                name="citizenIdPart4"
                layout="horizontal"
                style={{
                  width: "100%",
                }}
              >
                <Input
                  style={{
                    textAlign: "center",
                  }}
                  maxLength={2}
                />
              </Form.Item>
            </Col>
            -
            <Col span={3}>
              <Form.Item
                name="citizenIdPart5"
                layout="horizontal"
                style={{
                  width: "100%",
                }}
              >
                <Input
                  style={{
                    textAlign: "center",
                  }}
                  maxLength={1}
                />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            name="gender"
            label={t("form.gender")}
            layout="horizontal"
            rules={[{ required: true, message: "Please select!" }]}
          >
            <Radio.Group>
              {optionGender.map((item) => (
                <Radio key={item.value} value={item.value}>
                  {item.label}
                </Radio>
              ))}
            </Radio.Group>
          </Form.Item>

          <Row gutter={16}>
            <Col span={8}>
              <Form.Item
                label={t("form.mobile")}
                name="mobile"
                layout="horizontal"
                style={{
                  width: "100%",
                }}
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Select>
                  {optionPhone.map((item) => (
                    <Select.Option key={item.label} value={item.label}>
                      <Image width={15} height={15} src={item.flag} />
                      {item.label}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>
            -
            <Col span={10}>
              <Form.Item
                name="mobile2"
                layout="horizontal"
                style={{
                  width: "100%",
                }}
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input maxLength={9} />
              </Form.Item>
            </Col>
          </Row>

          <Row>
            <Col span={12}>
              <Form.Item
                label={t("form.passport")}
                name="passport"
                layout="horizontal"
                style={{
                  width: "100%",
                }}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item
                label={t("form.expectedSalary")}
                name="expectedSalary"
                layout="horizontal"
                style={{
                  width: "100%",
                }}
                rules={[{ required: true, message: "Please input!" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Flex gap="middle" justify="end">
                <Button onClick={reset}>Reset</Button>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Flex>
            </Col>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default TestForm;
