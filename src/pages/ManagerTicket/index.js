import React, { useState, useEffect } from "react";
import "./ticket.scss";
import { Button, Modal } from "antd";
import { useSelector } from "react-redux";

import {
  movie as movieAPI,
  showtime as showtimeAPI,
  ticket as ticketAPI,
  bill as billAPI,
} from "../../API/index";
const ManagerTicket = () => {
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idFilm = urlParams.get("idFilm");
  const [ticket, setTicket] = useState([]);
  const user = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idTicket, setIdTicket] = useState("");
  const [bill, setBill] = useState([]);

  const showModal = (e) => {
    setIdTicket(e);
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    (async () => {
      await getTicket();
    })();
  }, []);
  const getTicket = async () => {
    try {
      const result = await ticketAPI.getTicket({ email: user.email });
      setTicket(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (idTicket) {
      (async () => {
        await getBill();
      })();
    }
  }, [idTicket]);
  const getBill = async () => {
    try {
      const result = await billAPI.getBill({ idTicket });
      setBill(result.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="admin_right">
        <h1>LỊCH SỬ ĐẶT VÉ</h1>
        <table>
          <thead>
            <tr>
              <th>Email</th>
              <th>Rạp Phim</th>
              <th>Phim</th>
              <th>Phòng</th>
              <th>Ngày Chiếu</th>
              <th>Giờ Chiếu</th>
              <th>Ghế</th>
              <th>Tổng Tiền</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {ticket.map((ticket, index) => {
              if (ticket.checkout) {
                return (
                  <tr key={index}>
                    <td>{ticket.email}</td>
                    <td>{ticket.nameTheater}</td>
                    <td>{ticket.nameFilm}</td>
                    <td>{ticket.nameRoom}</td>
                    <td>
                      {ticket.date?.slice(0, 10).split("-").reverse().join("-")}
                    </td>
                    <td>{ticket.timeStart}</td>
                    <td>{ticket.chairs.join(", ")}</td>
                    <td>
                      {ticket.price.toLocaleString("vi", {
                        style: "currency",
                        currency: "VND",
                      })}
                    </td>
                    <td>
                      <Button
                        type="primary"
                        onClick={() => showModal(ticket._id)}
                      >
                        Xuất vé
                      </Button>
                      <Modal
                        title="Vé"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      ></Modal>
                      <Button type="primary" danger>
                        Xóa Vé
                      </Button>
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ManagerTicket;
