import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { notification, Button } from "antd";

import { Link } from "react-router-dom";
import "./PageAdmin.scss";
import { user as userAPI } from "../../API";

export default function User() {
  const [api, contextHolder] = notification.useNotification();
  const user = useSelector((state) => state.user);
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    (async () => {
      await getUserList();
    })();
  }, []);

  const getUserList = async () => {
    try {
      const result = await userAPI.getUserList({ token: user.accessToken });
      setUserList(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteUser = async (email) => {
    try {
      const result = await userAPI.deleteUser({
        email,
        token: user.accessToken,
      });
      if (result.status === 200) {
        await getUserList();
        api.open({
          type: "success",
          message: "Delete user successfully.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Delete user failure.",
      });
      console.log(error);
    }
  };

  return (
    <>
      {contextHolder}
      <div className="admin_right">
        <h1>Quản lý người dùng</h1>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Email</th>
              <th>Họ Tên</th>
              <th>SĐT</th>
              <th>Ngày sinh</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, index) => {
              return (
                <tr key={user.email}>
                  <td>{index + 1}</td>
                  <td>{user.email}</td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>
                    {user.dateOfBirth
                      .slice(0, 10)
                      .split("-")
                      .reverse()
                      .join("-")}
                  </td>
                  <td>
                    <Button
                      type="primary"
                      danger
                      htmlType="submit"
                      onClick={() => {
                        handleDeleteUser(user.email);
                      }}
                    >
                      Xóa
                    </Button>
                    <Link to={`/edituser?idUser=${user._id}`}>
                      <Button type="primary" htmlType="submit">
                        Sửa
                      </Button>
                    </Link>
                    <Link to={`/managerTicket?idUser=${user._id}`}>
                      <Button type="primary" htmlType="submit">
                        Quản lý vé
                      </Button>
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
