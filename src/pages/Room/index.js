import React, { useState, useEffect } from "react";
import "./PageAdmin.scss";
import { Link } from "react-router-dom";
import { notification, Button, Modal, Form, Input } from "antd";
import { room as roomAPI } from "../../API";

export default function Room() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [nameRoom, setNameRoom] = useState("");
  const [columns, setColumns] = useState("");
  const [rows, setRows] = useState("");
  const [room, setRoom] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [fistNameRoom,setFirstNameRoom] = useState("")
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idArea = urlParams.get("idArea");
  const idTheater = urlParams.get("idTheater");
  const name = fistNameRoom +" " +nameRoom;
  const addRoom = async () => {
    try {
      const result = await roomAPI.addRoom({
        idTheater,
        columns,
        rows,
        nameRoom:name,
      });
      if (result.status === 200) {
        api.open({
          type: "success",
          message: "Add Room successfully.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Room is exsist.",
      });
    }
  };

  useEffect(() => {
    (async () => {
      await getRoomById();
    })();
  }, []);

  const getRoomById = async () => {
    try {
      const result = await roomAPI.getRoomById({
        idTheater,
      });
      setRoom(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteRoom = async (nameRoom) => {
    try {
      const result = await roomAPI.deleteRoom({
        nameRoom,
      });
      if (result.status === 200) {
        await getRoomById(idTheater);
        api.open({
          type: "success",
          message: "Delete room successfully.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Delete room failure.",
      });
    }
  };

  // OPEN MODAL
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    addRoom();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    window.location.reload(true);
  };
  const handleNameRoom = (e)=>{
    setFirstNameRoom(e.target.value);
  }
  
  return (
    <>
      {contextHolder}
      <div className="admin_right">
        <h1>Quản Lý Phòng</h1>
        <Link to={`/theater?idArea=${idArea}`}>
          <Button type="primary" danger htmlType="submit">
            Rạp
          </Button>
        </Link>
        <Button type="primary" htmlType="submit" onClick={showModal}>
          Thêm Phòng
        </Button>
        <Modal
          title="Thêm Phòng"
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
            <Form.Item label="Tên Phòng" >
            <select onChange={handleNameRoom} value={fistNameRoom}>
              <option> </option>
              <option>Phòng</option>
              <option>CGV</option>
              <option>Rạp</option>
            </select>
              <Input
                placeholder="Tên Phòng"
                id="nameRoom"
                name="nameRoom"
                value={nameRoom}
                onChange={(e) => {
                  setNameRoom(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="Số Cột">
              <Input
                placeholder="Số Cột"
                id="columns"
                name="columns"
                value={columns}
                onChange={(e) => {
                  setColumns(e.target.value);
                }}
              />
            </Form.Item>
            <Form.Item label="Số Hàng">
              <Input
                placeholder="Số Hàng"
                id="rows"
                name="rows"
                value={rows}
                onChange={(e) => {
                  setRows(e.target.value);
                }}
              />
            </Form.Item>
          </Form>
        </Modal>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Tên Phòng</th>
              <th>Số Hàng</th>
              <th>Số Cột</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {room.map((room, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{room.nameRoom}</td>
                  <td>{room.columns}</td>
                  <td>{room.rows}</td>
                  <td>
                    <Button type="primary" htmlType="submit">
                      Sửa Phòng
                    </Button>
                    <Button
                      type="primary"
                      danger
                      htmlType="submit"
                      onClick={() => {
                        handleDeleteRoom(room.nameRoom);
                      }}
                    >
                      Xóa Phòng
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
