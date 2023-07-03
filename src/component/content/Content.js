import React, { useEffect, useState } from "react";
import "./Content.scss";
import { Col, Anchor, Row, Tabs } from "antd";
import { Link } from "react-router-dom";
import { movie as movieAPI } from "../../API";

const Content = () => {
  const [film, setFilm] = useState([]);

  useEffect(() => {
    (async () => {
      await getMovieList();
    })();
  }, []);

  const getMovieList = async () => {
    try {
      const result = await movieAPI.getMovieList();
      setFilm(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="content_body">
        <div className="content">
          <Tabs
            defaultActiveKey="1"
            style={{ color: "yellow", margin: "20px 0" }}
          >
            <Tabs.TabPane tab="Phim đang chiếu" key="Phim đang chiếu">
              <div className="content_img">
                <Row gutter={[16, 24]}>
                  {film.map((film, index) => {
                    if (film.date !== null) {
                      return (
                        <Col key={index} className="gutter-row" span={4}>
                          <div key={index} className="content_card">
                            <img src={film.picture} alt="" />
                            <p>{film.nameFilm}</p>
                            <Link to={`/ticket?idFilm=${film._id}`}>
                              <button className="btn_header">Mua Vé</button>
                            </Link>
                          </div>
                        </Col>
                      );
                    }
                  })}
                </Row>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Phim sắp chiếu" key="Phim sắp chiếu">
              <div className="content_img">
                <Row gutter={[16, 24]}>
                  {film.map((film, index) => {
                    if (film.date === null) {
                      return (
                        <Col key={index} className="gutter-row" span={4}>
                          <div key={index} className="content_card">
                            <img src={film.picture} alt="" />
                            <p>{film.nameFilm}</p>
                            <Link to={`/ticket?idFilm=${film._id}`}>
                              <button className="btn_header">Mua Vé</button>
                            </Link>
                          </div>
                        </Col>
                      );
                    }
                  })}
                </Row>
              </div>
            </Tabs.TabPane>
          </Tabs>
          {/* <div className="content_img">
            <Row gutter={[16, 24]}>
              {film.map((film, index) => {
                if (film.date !== null) {
                  return (
                    <Col key={index} className="gutter-row" span={4}>
                      <div key={index} className="content_card">
                        <img src={film.picture} alt="" />
                        <p>{film.nameFilm}</p>

                        <button className="btn_header">
                          <Link to={`/ticket?idFilm=${film._id}`}>Mua Vé</Link>
                        </button>
                      </div>
                    </Col>
                  );
                }
              })}
            </Row>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Content;
