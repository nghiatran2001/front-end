import React, { useState, useEffect } from "react";
import "./ticket.scss";
import { Link } from "react-router-dom";
import { Button, Modal } from "antd";
import video from "../../component/image/a.mp4";
import { movie as movieAPI, showtime as showtimeAPI } from "../../API/index";
const Ticket = () => {
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idFilm = urlParams.get("idFilm");
  const [movie, setMovie] = useState({});
  const [film, setFilm] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    (async () => {
      await getMovie();
    })();
  }, []);

  const getMovie = async () => {
    try {
      const result = await movieAPI.getMovie({
        idFilm,
      });
      setMovie(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      await getShowtime();
    })();
  }, []);
  const getShowtime = async () => {
    try {
      const result = await showtimeAPI.getShowtime({ idFilm });
      setFilm(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <div className="ticket_content">
        <div className="ticket_left">
          <div className="ticket_descript1">
            <div>
              <img src={movie.picture} alt="?" />
            </div>
            <div className="ticket_title">
              <h3>{movie.nameFilm}</h3>
              <p>
                <span>Thời gian: </span>
                <span>{movie.time} phút</span>
              </p>
              <p>Đạo diễn: {movie.directors}</p>
              <p>Thể loại: {movie.genres?.join(", ")}</p>
              <p>Diễn viên: {movie.actors}</p>
              <p>
                Ngày công chiếu: {movie.date?.slice(0, 10).split("-").join("-")}
              </p>
              <Button type="primary" onClick={() => setOpen(true)}>
                Xem Trailer
              </Button>
              <Modal
                title="Trailer"
                width={1000}
                centered
                open={open}
                onOk={() => setOpen(false)}
                onCancel={() => setOpen(false)}
              >
                <video width={950} height={500} controls>
                  <source src={video} type="video/mp4" />
                </video>
              </Modal>
            </div>
          </div>
          <div className="ticket_descript2">
            <h4>Nội Dung Phim</h4>
            <p>{movie.content}</p>
          </div>
        </div>
        <div className="ticket_right">
          <h2>LỊCH CHIẾU</h2>

          {film.map((film) => {
            return (
              <div className="ticket_time" key={film._id}>
                <div>
                  <h3>{film.nameTheater}</h3>
                </div>
                <div className="flex_center">
                  <div className="ticket_time_title">
                    <h4>2D</h4>
                  </div>
                  <div className="ticket_time_button">
                    <Link
                      to={`/order?idRoom=${film.idRoom}&idShowTime=${film._id}&idFilm=${film.idFilm}`}
                    >
                      <button className="button_order">{film.timeStart}</button>
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default Ticket;
