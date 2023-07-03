import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Button, Form, Input, notification } from "antd";
import styles from "./InfoUser.scss";
import { user as userAPI } from "../../API/index";
import { isEmail } from "validator";
export default function InfoUser() {
  const user = useSelector((state) => state.user);

  return (
    <>
      <div className="infoUser">
        <h1 style={{ color: "black" }}>THÔNG TIN NGƯỜI DÙNG</h1>
        <Form
          labelCol={{
            span: 3,
          }}
          wrapperCol={{
            span: 12,
          }}
          layout="horizontal"
          style={{
            minWidth: 600,
          }}
        >
          <Form.Item label="Email">
            <Input
              placeholder="Email"
              value={user.email}
              id="email"
              name="email"
              disabled
            />
          </Form.Item>
          <Form.Item label="SĐT">
            <Input
              placeholder="SĐT"
              value={user.phone}
              id="phone"
              name="phone"
            />
          </Form.Item>
          <Form.Item label="Họ Tên">
            <Input
              placeholder="Họ Tên"
              value={user.name}
              id="fullName"
              name="fullName"
            />
          </Form.Item>
          <Form.Item label="Ngày sinh">
            <input type="date" id="birthDay" name="birthDay" />
          </Form.Item>
          <Form.Item label="Giới tính">
            <select>
              <option>Nam</option>
              <option>Nữ</option>
              <option>Không xác định</option>
            </select>
          </Form.Item>
          <div className="button">
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: 20 }}
              >
                Thay Đổi
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Đổi Mật Khẩu
              </Button>
            </Form.Item>
          </div>
        </Form>
      </div>
    </>
  );
}
