import { Button, Checkbox, Flex, Table } from "antd";
import { useEffect, useState } from "react";
import { DataUser } from "../type";
import { useTranslation } from "react-i18next";
import { CheckboxChangeEvent } from "antd/es/checkbox";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { deleteUser, editUser } from "../../../store/reducer/formSlice";

const TableUser = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.form.user);

  const [data, setData] = useState<DataUser[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  useEffect(() => {
    if (user.length === 0) return;

    const newData = user.map((item: DataUser) => {
      return {
        ...item,
        name: item.firstName + " " + item.lastName,
      };
    });

    setData(newData);
  }, [user]);

  const columns = [
    {
      title: t("form.name"),
      dataIndex: "name",
      sorter: (a: DataUser, b: DataUser) =>
        a.firstName.localeCompare(b.firstName),
    },
    {
      title: t("form.gender"),
      dataIndex: "gender",
      sorter: (a: DataUser, b: DataUser) => a.gender.localeCompare(b.gender),
      render: (text: string) => t(`optionGender.${text}`),
    },
    {
      title: t("form.mobile"),
      dataIndex: "mobileNumber",
      sorter: (a: DataUser, b: DataUser) =>
        a.mobileNumber.localeCompare(b.mobileNumber),
    },
    {
      title: t("form.nationality"),
      dataIndex: "nationality",
      sorter: (a: DataUser, b: DataUser) =>
        a.nationality.localeCompare(b.nationality),
      render: (text: string) => t(`optionNationality.${text}`),
    },
    {
      title: t("form.manage"),
      dataIndex: "",
      key: "manage",
      render: (_, record: DataUser) => (
        <Flex gap={16}>
          <Button onClick={() => selectUser(record)}>{t("edit")}</Button>
          <Button onClick={() => handleRemoveUser(record.id)}>
            {t("delete")}
          </Button>
        </Flex>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  };

  const selectAllData = (e: CheckboxChangeEvent) => {
    if (e.target.checked) {
      setSelectedRowKeys(data.map((item) => item.key));
    } else {
      setSelectedRowKeys([]);
    }
  };

  const selectUser = (user: DataUser) => {
    dispatch(editUser(user));
  };

  const handleRemoveUser = (id: string) => {
    dispatch(deleteUser(id));
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "16px",
      }}
    >
      <Flex gap={16} align="center">
        <Checkbox
          onChange={(e) => selectAllData(e)}
          checked={selectedRowKeys.length === data.length && data.length !== 0}
        >
          {t("selectall")}
        </Checkbox>
        <Button>Delete</Button>
      </Flex>
      <Table
        columns={columns}
        dataSource={data}
        pagination={{
          position: ["topRight"],
          pageSize: 5,
          itemRender: (_, type, originalElement) => {
            if (type === "prev") {
              return <Button type="text">{t("prev")}</Button>;
            }
            if (type === "next") {
              return <Button type="text">{t("next")}</Button>;
            }
            return originalElement;
          },
        }}
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
          selectedRowKeys: selectedRowKeys,
        }}
      />
    </div>
  );
};

export default TableUser;
