import React, { useState, useEffect } from "react";
import { category as categoryAPI } from "../../API";
import { notification, Button, Modal, Form, Input } from "antd";
import { Link } from "react-router-dom";

export default function Category() {
  const [category, setCategory] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameCategory, setNameCategory] = useState("");
  // OPEN MODAL
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleAddCategory();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    window.location.reload(true);
  };
  const handleAddCategory = async () => {
    try {
      const result = await categoryAPI.addCategory({
        nameCategory,
      });

      if (result.status === 200) {
        api.open({
          type: "success",
          message: "Thêm khu vực thành công.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Tên khu vực đã tồn tại.",
      });
    }
  };

  useEffect(() => {
    (async () => {
      await getCategoryList();
    })();
  }, []);
  const getCategoryList = async () => {
    try {
      const result = await categoryAPI.getCategoryList();
      setCategory(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteCategory = async (nameCategory) => {
    try {
      const result = await categoryAPI.deleteCategory({
        nameCategory,
      });
      if (result.status === 200) {
        await getCategoryList();
        api.open({
          type: "success",
          message: "Xóa thể loại thành công.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Xóa thể loại thât bại.",
      });
      console.log(error);
    }
  };
  return (
    <>
      {contextHolder}
      <div className="admin_right">
        <h1>Quản Lý Thể Loại</h1>
        <Button type="primary" htmlType="submit" onClick={showModal}>
          Thêm Thể Loại
        </Button>
        <Link to="/animation">
          <Button
            type="primary"
            danger
            htmlType="submit"
            style={{ marginLeft: "20px" }}
          >
            Animation
          </Button>
        </Link>
        <Modal
          title="Thêm Rạp"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Form
            className="form_addfilm"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 14,
            }}
            layout="horizontal"
            style={{
              minWidth: 600,
            }}
          >
            <Form.Item label="Thể Loại">
              <Input
                placeholder="Thể Loại"
                id="category"
                name="category"
                value={nameCategory}
                onChange={(e) => setNameCategory(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Modal>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên thể loại</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {category.map((category, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{category.nameCategory}</td>
                  <td>
                    <Button
                      type="primary"
                      danger
                      htmlType="submit"
                      onClick={() =>
                        handleDeleteCategory(category.nameCategory)
                      }
                    >
                      Xóa Thể Loại
                    </Button>
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
