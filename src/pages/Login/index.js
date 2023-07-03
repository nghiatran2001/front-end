import React, { useState } from "react";
import { notification } from "antd";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isEmpty, isEmail } from "validator";

import "./Login.scss";
import { user as userAPI } from "../../API/index";
import userSlice from "../../redux/userSlice";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [api, contextHolder] = notification.useNotification();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [phone, setPhone] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [validation, setValidation] = useState("");

  const [loginInfo, setLoginInfo] = useState({});

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleRetypePasswordChange = (e) => {
    setRetypePassword(e.target.value);
  };
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };
  const handleDateOfBirthChange = (e) => {
    setDateOfBirth(e.target.value);
  };
  function underAgeValidate(birthday){
    // it will accept two types of format yyyy-mm-dd and yyyy/mm/dd
    var optimizedBirthday = birthday.replace(/-/g, "/");
  
    //set date based on birthday at 01:00:00 hours GMT+0100 (CET)
    var myBirthday = new Date(optimizedBirthday);
  
    // set current day on 01:00:00 hours GMT+0100 (CET)
    var currentDate = new Date().toJSON().slice(0,10)+' 01:00:00';
  
    // calculate age comparing current date and borthday
    var myAge = ~~((Date.now(currentDate) - myBirthday) / (31557600000));
    if(myAge < 12) {
             return false;
          }else{
        return true;
    }
  
  } 
  const validateAll = () => {
    const msg = {};
    if (isEmpty(fullName)) {
      msg.fullName = "Vui lòng nhập tên";
    }
    if (isEmpty(email)) {
      msg.email = "Vui lòng nhập email";
    } else if (!isEmail(email)) {
      msg.email = "Email không hợp lệ";
    }
    if (isEmpty(password)) {
      msg.password = "Vui lòng nhập mật khẩu";
    }
    if (isEmpty(retypePassword)) {
      msg.retypePassword = "Vui lòng nhập lại mật khẩu";
    }
    if (isEmpty(phone)) {
      msg.phone = "Vui lòng nhập số điện thoại";
    }
    if (isEmpty(dateOfBirth)) {
      msg.dateOfBirth = "Vui lòng chọn ngày sinh";
    }
    if(!underAgeValidate(dateOfBirth)){
      msg.dateOfBirth = "Bạn chưa đủ tuổi đăng ký";
    }

    setValidation(msg);
    if (Object.keys(msg).length > 0) return false;
    return true;
  };

  
  const register = async (e) => {
    e.preventDefault();

    const isValid = validateAll();
    if (!isValid) return;
    else {
      try {
        const result = await userAPI.register({
          name: fullName,
          email,
          password,
          phone,
          dateOfBirth,
        });
        if (result.status === 200) {
          api.open({
            type: "success",
            message: "Đăng ký thành công.",
          });
          setFullName("");
          setEmail("");
          setPassword("");
          setRetypePassword("");
          setPhone("");
          setDateOfBirth("");
        }
      } catch (error) {
        api.open({
          type: "error",
          message: "Email đã tồn tại.",
        });
      }
    }
  };

  const login = async (e) => {
    e.preventDefault();
    try {
      const result = await userAPI.login(loginInfo);
      dispatch(userSlice.actions.setUser(result.data.user));
      document.cookie = `token=${result.data.refreshToken}`;
      navigate("/");
    } catch (error) {
      api.open({
        type: "error",
        message: "Email hoặc mật khẩu không chính xác.",
      });
    }
  };

  const handleLoginInfoChange = (key, value) => {
    setLoginInfo((pre) => {
      return { ...pre, [key]: value };
    });
  };

  return (
    <>
      {contextHolder}
      <div className="loginPage">
        <div className="loginPage_right">
          <h2>Đăng nhập</h2>
          <div className="form_right">
            <form>
              <div className="formControl">
                <label htmlFor="email">Email(*)</label>
                <input
                  type="text"
                  id="emailLogin"
                  name="email"
                  onChange={(e) => {
                    handleLoginInfoChange("email", e.target.value);
                  }}
                />
              </div>
              <div className="formControl">
                <label htmlFor="password">Mật khẩu(*)</label>
                <input
                  type="password"
                  id="passwordLogin"
                  name="password"
                  onChange={(e) => {
                    e.preventDefault();
                    handleLoginInfoChange("password", e.target.value);
                  }}
                />
              </div>
              <button
                className="btn_log"
                type="submit"
                onClick={login}
              >
                Đăng nhập
              </button>
            </form>
          </div>
        </div>
        <div className="loginPage_left">
          <h2>Đăng Ký</h2>
          <div className="form_left">
            <form>
              <div className="formControl">
                <label htmlFor="username">Họ Tên(*)</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={fullName}
                  onChange={handleFullNameChange}
                />
              </div>
              <p>{validation.fullName}</p>
              <div className="formControl">
                <label htmlFor="email">Email(*)</label>
                <input
                  type="text"
                  id="emailRegister"
                  name="email"
                  value={email}
                  onChange={handleEmailChange}
                />
              </div>
              <p>{validation.email}</p>
              <div className="formControl">
                <label htmlFor="password">Mật khẩu(*)</label>
                <input
                  type="password"
                  id="passwordRegister"
                  name="password"
                  value={password}
                  onChange={handlePasswordChange}
                />
              </div>
              <p>{validation.password}</p>
              <div className="formControl">
                <label htmlFor="confirmPassword">Nhập lại mật khẩu(*)</label>
                <input
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                  value={retypePassword}
                  onChange={handleRetypePasswordChange}
                />
              </div>
              <p>{validation.retypePassword}</p>
              <div className="formControl">
                <label htmlFor="phone">Số điện thoại(*)</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  value={phone}
                  onChange={handlePhoneChange}
                />
              </div>
              <p>{validation.phone}</p>
              <div className="formControl">
                <label htmlFor="birthday">Ngày sinh(*)</label>
                <input
                  type="date"
                  id="birthday"
                  name="birthday"
                  value={dateOfBirth}
                  onChange={handleDateOfBirthChange}
                />
              </div>
              <p>{validation.dateOfBirth}</p>
              <button className="btn_log" onClick={register}>
                Đăng ký
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
