import React, { useEffect, useState } from "react";
import { Button, Form, Input, Select, notification } from "antd";
import {
  movie as movieAPI,
  animation as animationAPI,
  category as categoryAPI,
} from "../../API/index";

import "./PageAdmin.scss";

const { TextArea } = Input;
export default function AddFilm() {
  const [api, contextHolder] = notification.useNotification();

  const [nameFilm, setNameFilm] = useState("");
  const [listGenres, setListGenres] = useState([]);
  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState("");
  const [actors, setActors] = useState("");
  const [time, setTime] = useState("");
  const [date, setDate] = useState("");
  const [content, setContent] = useState("");
  const [picture, setPicture] = useState("");
  const [trailer, setTrailer] = useState("");
  const [listAnimation, setListAnimation] = useState([]);
  const [animation, setAnimation] = useState([]);

  const handlePicture = (e) => {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
      setPicture(reader.result);
    };
    reader.onerror = (error) => {
      console.log("Error", error);
    };
  };
  const handleAddFilm = async (e) => {
    e.preventDefault();

    try {
      const result = await movieAPI.addfilm({
        nameFilm,
        genres,
        directors,
        actors,
        date,
        time,
        animation,
        content,
        picture,
        trailer,
      });

      if (result.status === 200) {
        api.open({
          type: "success",
          message: "Thêm phim thành công.",
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Phim này đã tồn tại.",
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
      setListGenres(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    (async () => {
      await getListAnimation();
    })();
  }, []);

  const getListAnimation = async () => {
    try {
      const result = await animationAPI.getList();
      setListAnimation(result.data);
    } catch (error) {
      console.log(error);
    }
  };
  const optionsAnimation = [];
  for (let i = 0; i < listAnimation.length; i++) {
    optionsAnimation.push({
      label: listAnimation[i].nameAnimation,
      value: listAnimation[i].nameAnimation,
    });
  }

  const optionsCategory = [];
  for (let i = 0; i < listGenres.length; i++) {
    optionsCategory.push({
      label: listGenres[i].nameCategory,
      value: listGenres[i].nameCategory,
    });
  }

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
              value={nameFilm}
              onChange={(e) => setNameFilm(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Thể loại">
            <Select
              mode="multiple"
              allowClear
              onChange={(item) => setGenres(item)}
              style={{ width: "100%" }}
              placeholder="Please select"
              options={optionsCategory}
            />
          </Form.Item>
          <Form.Item label="Tác giả">
            <Input
              placeholder="Tác giả"
              id="directors"
              name="directors"
              value={directors}
              onChange={(e) => setDirectors(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Diễn viên">
            <Input
              placeholder="Diễn viên"
              id="actors"
              name="actors"
              value={actors}
              onChange={(e) => setActors(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Animation">
            <Select
              mode="multiple"
              allowClear
              onChange={(item) => setAnimation(item)}
              style={{ width: "100%" }}
              placeholder="Please select"
              options={optionsAnimation}
            />
          </Form.Item>
          <Form.Item label="Ngày chiếu">
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Thời lượng">
            <input
              type="number"
              id="time"
              name="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Nội dung">
            <TextArea
              rows={4}
              id="content"
              name="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />
          </Form.Item>
          <Form.Item label="Trailer">
            <input type="file" id="file" name="file" onChange={handlePicture} />
          </Form.Item>
          <Form.Item label="Hình ảnh">
            <input type="file" id="file" name="file" onChange={handlePicture} />
          </Form.Item>
          <Form.Item>
            <Button className="btn_film" type="submit" onClick={handleAddFilm}>
              Thêm
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}
