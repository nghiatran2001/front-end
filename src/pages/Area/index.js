import React, { useState, useEffect } from "react";
import "./PageAdmin.scss";
import { notification, Button, Modal } from "antd";
import { area as areaAPI } from "../../API";
import { Link } from "react-router-dom";
export default function Area() {
  const [area, setArea] = useState([]);
  const [nameArea, setNameArea] = useState("");
  const [listArea, setListArea] = useState([]);
  const [api, contextHolder] = notification.useNotification();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const arr = [];
  for (const key in area) {
    arr.push(area[key]);
  }

  const handleCityChange = (e) => {
    setNameArea(e.target.value);
  };
  // OPEN MODAL
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    handleAddArea();
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    window.location.reload(true);
  };
  // API GETLIST CITY
  useEffect(() => {
    (async () => {
      await getAreaJson();
    })();
  }, []);
  // ADD CITY
  const handleAddArea = async () => {
    try {
      const result = await areaAPI.addArea({
        nameArea,
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

  const getAreaJson = async () => {
    try {
      const result = await areaAPI.getAreaJson();
      setArea(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  //GET
  useEffect(() => {
    (async () => {
      await getAreaList();
    })();
  }, []);
  const getAreaList = async () => {
    try {
      const result = await areaAPI.getAreaList();
      setListArea(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleDeleteArea = async (nameArea) => {
    try {
      const result = await areaAPI.deleteArea({
        nameArea,
      });
      if (result.status === 200) {
        await getAreaList();
        api.open({
          type: "success",
          message: "Delete area successfully.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Delete area failure.",
      });
      console.log(error);
    }
  };
  return (
    <>
      {contextHolder}
      <div className="admin_right">
        <h1>Quản Lý Khu Vực</h1>
        <Button type="primary" onClick={showModal}>
          Thêm Khu Vực
        </Button>
        <Modal
          title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <select onChange={handleCityChange}>
            <option>---SELECT---</option>
            {arr.map((arr) => {
              return (
                <option key={arr.code} value={arr.name}>
                  {arr.name}
                </option>
              );
            })}
          </select>
        </Modal>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Khu vực</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {listArea.map((area, index) => {
              return (
                <tr key={index}>
                  <td>{index}</td>
                  <td>{area.nameArea}</td>
                  <td>
                    <Button
                      type="primary"
                      danger
                      htmlType="submit"
                      onClick={() => {
                        handleDeleteArea(area.nameArea);
                      }}
                    >
                      Xóa Khu Vực
                    </Button>
                    <Link to={`/theater?idArea=${area._id}`}>
                      <Button type="primary" htmlType="submit">
                        Quản Lý Rạp
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
