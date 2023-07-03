import React from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import "./Header.scss";
import userSlice from "../../redux/userSlice";
import { user as userAPI } from "../../API";

function Header() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const result = await userAPI.logout();
      dispatch(userSlice.actions.setUser(null));
    } catch (error) {}
  };

  return (
    <div className="header">
      <div>
        {" "}
        <h1 className="header_menu">
          <Link to="/" className="header_home">
            CINEMA STU
          </Link>
        </h1>
      </div>
      <div className="header_menu_right">
        {user && (
          <>
            <h3 className="header_menu">
              <Link to="/infouser" className="header_home">
                Xin chào: {user.name}
              </Link>
            </h3>
            <Link to="/history" className="header_home">
              <button className="header_menu btn_header">Lịch sử</button>
            </Link>
            <Link to="/admin">
              <button className="header_menu btn_header">Quản lý</button>
            </Link>
          </>
        )}

        {user ? (
          <>
            <button className="header_menu btn_header" onClick={handleLogout}>
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link to={"/login"}>
              <button className="header_menu btn_header">Đăng nhập</button>
            </Link>
            <Link to={"/"}>
              <button className="header_menu btn_header">Trang chủ</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;
