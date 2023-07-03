import React, { useEffect, useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { movie as movieAPI } from "../../API/index";
import "./PageAdmin.scss";
const { TextArea } = Input;
export default function EditFilm() {
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idFilm = urlParams.get("idFilm");
  const [movie, setMovie] = useState({});
  const [api, contextHolder] = notification.useNotification();

  const handleEditMovie = async () => {
    try {
      const result = await movieAPI.editMovie(movie);

      if (result.status === 200) {
        api.open({
          type: "success",
          message: "Edit movie successfully.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Edit movie failure.",
      });
      console.log(error);
    }
  };

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
  return (
    <>
      {contextHolder}
      <div className="admin_right">
        <h1>Thêm phim</h1>
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
            maxWidth: 600,
          }}
        >
          <Form.Item label="Tên phim">
            <Input
              placeholder="Tên phim"
              id="nameFilm"
              name="nameFilm"
              value={movie.nameFilm || ""}
              onChange={(e) =>
                setMovie((pre) => ({ ...pre, nameFilm: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Thể loại">
            <Input
              placeholder="Thể loại"
              id="genres"
              name="genres"
              value={movie.genres || ""}
              onChange={(e) =>
                setMovie((pre) => ({ ...pre, genres: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Tác giả">
            <Input
              placeholder="Tác giả"
              id="directors"
              name="directors"
              value={movie.directors || ""}
              onChange={(e) =>
                setMovie((pre) => ({ ...pre, directors: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Diễn viên">
            <Input
              placeholder="Diễn viên"
              id="actors"
              name="actors"
              value={movie.actors || ""}
              onChange={(e) =>
                setMovie((pre) => ({ ...pre, actors: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Ngày chiếu">
            <input
              type="date"
              id="date"
              name="date"
              value={movie.date?.slice(0, 10).split("-").join("-") || ""}
              onChange={(e) =>
                setMovie((pre) => ({ ...pre, date: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Thời lượng">
            <input
              type="number"
              id="time"
              name="time"
              value={movie.time || ""}
              onChange={(e) =>
                setMovie((pre) => ({ ...pre, time: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Nội dung">
            <TextArea
              rows={4}
              id="content"
              name="content"
              value={movie.content || ""}
              onChange={(e) =>
                setMovie((pre) => ({ ...pre, content: e.target.value }))
              }
            />
          </Form.Item>
          <Form.Item label="Trailer">
            <Input
              placeholder="Trailer"
              id="trailer"
              name="trailer"
              value={movie.trailer || ""}
              onChange={(e) =>
                setMovie((pre) => ({ ...pre, trailer: e.target.value }))
              }
            />
          </Form.Item>
          <input
            type="file"
            id="file"
            name="file"
            onChange={(e) =>
              setMovie((pre) => ({ ...pre, picture: e.target.value }))
            }
          />
          <Form.Item>
            <Button
              className="styles.btn_film"
              type="primary"
              onClick={() => {
                handleEditMovie();
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
