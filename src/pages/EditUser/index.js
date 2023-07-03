import React, { useState, useEffect } from "react";
import styles from "./PageAdmin.scss";
import { useSelector } from "react-redux";
import moment from "moment";
import { Button, Input, Form, notification } from "antd";
import { Link } from "react-router-dom";

import { movie, user as userAPI } from "../../API";
export default function EditUser() {
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idUser = urlParams.get("idUser");
  const [flag, setFlag] = useState(false);
  const [user, setUser] = useState("");
  const [userList, setUserList] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const userToken = useSelector((state) => state.user);
  useEffect(() => {
    (async () => {
      await getUser();
    })();
  }, []);
  useEffect(() => {
    (async () => {
      await getUserList();
    })();
  }, []);

  const getUserList = async () => {
    try {
      const result = await userAPI.getUserList({
        token: userToken.accessToken,
      });
      setUserList(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getUser = async () => {
    try {
      const result = await userAPI.getUser({
        idUser,
      });
      setUser(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditUser = async () => {
    try {
      const result = await userAPI.editUser(user);

      if (result.status === 200) {
        api.open({
          type: "success",
          message: "Edit user successfully.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Edit user failure.",
      });
      console.log(error);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="admin_right">
        <h1>SỬA THÔNG TIN KHÁCH HÀNG</h1>
        <Form
          labelCol={{
            span: 2,
          }}
          wrapperCol={{
            span: 20,
          }}
          layout="horizontal"
          style={{
            minWidth: 300,
          }}
        >
          <Form.Item label="Email">
            <Input
              disabled
              placeholder="Email"
              id="email"
              name="email"
              value={user.email || ""}
              onChange={(e) =>
                setUser((pre) => ({ ...pre, email: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="SĐT">
            <Input
              placeholder="SĐT"
              id="phone"
              name="phone"
              value={user.phone || ""}
              onChange={(e) =>
                setUser((pre) => ({ ...pre, phone: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Họ Tên">
            <Input
              placeholder="Họ Tên"
              id="name"
              name="name"
              value={user.name || ""}
              onChange={(e) =>
                setUser((pre) => ({ ...pre, name: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Ngày Sinh">
            <input
              type="date"
              placeholder="Ngày Sinh"
              id="dateOfBirth"
              name="dateOfBirth"
              value={user.dateOfBirth?.slice(0, 10).split("-").join("-") || ""}
              onChange={(e) =>
                setUser((pre) => ({ ...pre, dateOfBirth: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item>
            <Button
              className="styles.btn_film"
              type="primary"
              onClick={() => {
                handleEditUser();
              }}
            >
              Sửa
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
