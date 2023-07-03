import React, { useState, useEffect } from "react";
import { showtime as showtimeAPI, movie as movieAPI } from "../../API";
import { notification, Button } from "antd";
import { Link } from "react-router-dom";

export default function DetailsFilm() {
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idFilm = urlParams.get("idFilm");
  const [film, setFilm] = useState([]);
  const [nameFilm, setNameFilm] = useState("");
  const [api, contextHolder] = notification.useNotification();
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

  useEffect(() => {
    (async () => {
      await getMovie();
    })();
  }, []);
  const getMovie = async () => {
    try {
      const result = await movieAPI.getMovie({ idFilm });
      setNameFilm(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  // const handleDeleteCategory = async (nameCategory) => {
  //   try {
  //     const result = await categoryAPI.deleteCategory({
  //       nameCategory,
  //     });
  //     if (result.status === 200) {
  //       await getCategoryList();
  //       api.open({
  //         type: "success",
  //         message: "Xóa thể loại thành công.",
  //       });
  //     }
  //   } catch (error) {
  //     api.open({
  //       type: "error",
  //       message: "Xóa thể loại thât bại.",
  //     });
  //     console.log(error);
  //   }
  // };
  return (
    <>
      {contextHolder}
      <div className="admin_right">
        <h1>Quản Lý Suất Chiếu</h1>
        <Link to={"/movie"}>
          <Button type="primary" htmlType="submit">
            Phim
          </Button>
        </Link>

        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Giờ Bắt Đầu</th>
              <th>Ngày Chiếu</th>
              <th>Tên Rạp</th>
              <th>Phòng</th>
              <th>Giá Vé</th>
              <th>Tên Phim</th>
              <th>Thể Loại</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {film.map((film, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{film.timeStart}</td>
                  <td>{film.date?.slice(0, 10).split("-").join("-")}</td>
                  <td>{film.nameTheater}</td>
                  <td>{film.nameRoom}</td>
                  <td>{film.price}</td>
                  <td>{nameFilm.nameFilm}</td>
                  <td>{film.idAnimation}</td>
                  <td>
                    <Button type="primary" danger htmlType="submit">
                      Xóa Suất
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
