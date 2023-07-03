import React, { useEffect, useState } from "react";
import "./History.scss";
import { Button, Modal, QRCode, Space } from "antd";
import { useSelector } from "react-redux";
import { ticket as ticketAPI, bill as billAPI } from "../../API";
export default function History() {
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
      setBill(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="history_content">
        <h1>LỊCH SỬ ĐẶT VÉ</h1>
        <table>
          <thead>
            <tr>
              <th>Tên Rạp</th>
              <th>Phim</th>
              <th>Tên phòng</th>
              <th>Ngày chiếu</th>
              <th>Giờ chiếu</th>
              <th>Ghế</th>
              <th>Giá vé</th>
              <th>Hóa đơn</th>
            </tr>
          </thead>
          <tbody>
            {ticket.map((ticket, index) => {
              if (ticket.checkout) {
                return (
                  <tr key={index}>
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
                        Xem hóa đơn
                      </Button>
                      <Modal
                        title="Hóa đơn"
                        open={isModalOpen}
                        onOk={handleOk}
                        onCancel={handleCancel}
                      >
                        {bill.map((e) => {
                          return (
                            <div key={e.idTicket}>
                              <Space>
                                <QRCode type="canvas" value={e.idTicket} />
                              </Space>
                              <p>Email: {e.email}</p>
                              <p>Ghế: {e.chairs.join(", ")}</p>
                              <p>
                                Ngày:{" "}
                                {e.date
                                  ?.slice(0, 10)
                                  .split("-")
                                  .reverse()
                                  .join("-")}
                              </p>
                              <p>
                                Tên phim: {e.nameFilm} || Xuất chiếu:{" "}
                                {e.timeStart} || Thời lượng: {`${e.time}p`}
                              </p>
                              <p>
                                Tên rạp: {e.nameTheater} || Tên phòng:{" "}
                                {e.nameRoom}
                              </p>
                              <p>
                                Tổng:{" "}
                                {e.price.toLocaleString("vi", {
                                  style: "currency",
                                  currency: "VND",
                                })}{" "}
                              </p>
                            </div>
                          );
                        })}
                      </Modal>
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
}
