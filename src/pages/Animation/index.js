import React, { useState, useEffect } from "react";
import { animation as animationAPI } from "../../API";
import { notification, Button, Modal, Form, Input } from "antd";
import { Link } from "react-router-dom";
import animation from "./../../API/animation";

export default function Animation() {
  const [animation, setAnimation] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameAnimation, setNameAnimation] = useState("");
  // OPEN MODAL
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleAddAnimation();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    window.location.reload(true);
  };
  const handleAddAnimation = async () => {
    try {
      const result = await animationAPI.addAnimation({
        nameAnimation,
      });

      if (result.status === 200) {
        api.open({
          type: "success",
          message: "Thêm animation thành công.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Tên animation đã tồn tại.",
      });
    }
  };

  useEffect(() => {
    (async () => {
      await getAnimationList();
    })();
  }, []);
  const getAnimationList = async () => {
    try {
      const result = await animationAPI.getList();
      setAnimation(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteAnimation = async (nameAnimation) => {
    try {
      const result = await animationAPI.deleteAnimation({
        nameAnimation,
      });
      if (result.status === 200) {
        await getAnimationList();
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
        <Link to="/category">
          <Button
            type="primary"
            danger
            htmlType="submit"
            style={{ marginRight: "20px" }}
          >
            Thể Loại
          </Button>
        </Link>
        <Button type="primary" htmlType="submit" onClick={showModal}>
          Thêm Animation
        </Button>

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
            <Form.Item label="Animation">
              <Input
                placeholder="Animation"
                id="animation"
                name="animation"
                value={nameAnimation}
                onChange={(e) => setNameAnimation(e.target.value)}
              />
            </Form.Item>
          </Form>
        </Modal>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên Animation</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {animation.map((animation, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{animation.nameAnimation}</td>
                  <td>
                    <Button
                      type="primary"
                      danger
                      htmlType="submit"
                      onClick={() =>
                        handleDeleteAnimation(animation.nameAnimation)
                      }
                    >
                      Xóa Animation
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
