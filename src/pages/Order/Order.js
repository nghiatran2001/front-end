import { Box, Button, OutlinedInput } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Order.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import { Input, Radio, notification } from "antd";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import { user as userAPI } from "../../API";
import { order as orderAPI } from "../../API";
import { payment as paymentAPI } from "../../API";
import { cart as cartAPI } from "../../API";
import TextArea from "antd/es/input/TextArea";

export default function Order() {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();
  const [sdkReady, setSdkReady] = useState(false);
  const [userId, setUserId] = useState("");
  const [order, setOrder] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [content, setContent] = useState("");

  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  useEffect(() => {
    (async () => {
      await getIdUser();
    })();
  }, []);

  const getIdUser = async () => {
    try {
      const result = await userAPI.getIdUser({ id: user._id });
      setUserId(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      await getOrders();
    })();
  }, []);

  const getOrders = async () => {
    try {
      const result = await orderAPI.getEmail({ email: user.email });
      setOrder(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddOrder = async (e) => {
    e.preventDefault();
    try {
      if (name === "" || phone === "" || email === "" || address === "") {
        api.open({
          type: "error",
          message: "Vui lòng nhập đủ thông tin.",
        });
      } else {
        var result;
        order.map(async (e) => {
          if (e.disable === false) {
            result = await paymentAPI.addOrder({
              order: e.orderArray,
              total: e.total,
              name,
              phone,
              email,
              content,
              address,
              dateOrder: new Date(),
            });
          }
        });
        let result1;
        order.map(async (o) => {
          return (result1 = await orderAPI.update({ order: o }));
        });
        let result2;
        order.map(async (o) => {
          return o.orderArray.map(async (e) => {
            return (result2 = await cartAPI.update({ cart: e }));
          });
        });
        let updateAmount;
        order.map(async (o) => {
          return o.orderArray.map(async (e) => {
            if (e.disable === false) {
              return (updateAmount = await cartAPI.updateAmount({ id: e._id }));
            }
          });
        });
        navigate("/payment");
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Thanh toán thất bại.",
      });
      console.log(error);
    }
  };
  const handleAddOrder1 = async (e) => {
    try {
      if (name === "" || phone === "" || email === "" || address === "") {
        api.open({
          type: "error",
          message: "Vui lòng nhập đủ thông tin.",
        });
      } else {
        var result;
        order.map(async (e) => {
          if (e.disable === false) {
            result = await paymentAPI.addOrder({
              order: e.orderArray,
              total: e.total,
              name,
              phone,
              email,
              content,
              address,
              dateOrder: new Date(),
            });
          }
        });
        let result1;
        order.map(async (o) => {
          return (result1 = await orderAPI.update({ order: o }));
        });
        let result2;
        order.map(async (o) => {
          return o.orderArray.map(async (e) => {
            return (result2 = await cartAPI.update({ cart: e }));
          });
        });
        let updateAmount;
        order.map(async (o) => {
          return o.orderArray.map(async (e) => {
            if (e.disable === false) {
              return (updateAmount = await cartAPI.updateAmount({ id: e._id }));
            }
          });
        });
      }
    } catch (error) {
      api.open({
        type: "error",
        message: "Thanh toán thất bại.",
      });
      console.log(error);
    }
  };

  return (
    <div>
      {contextHolder}
      <Box className="order-bg">
        <TableContainer sx={{ display: "flex" }}>
          <Table
            sx={{
              maxWidth: "50%",
              margin: 5,
              background: "white",
              borderRadius: 10,
            }}
            aria-label="spanning table"
          >
            <TableHead>
              <TableRow>
                <TableCell align="center" colSpan={6}>
                  <h1>Thông tin đơn hàng</h1>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <h3>Tên sản phẩm</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>Số lượng</h3>
                </TableCell>
                <TableCell align="right">
                  <h3>Đơn giá</h3>
                </TableCell>
                <TableCell align="center">
                  <h3>Thành tiền</h3>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {order.map((e) => {
                if (!e.disable) {
                  return e.orderArray.map((o, i) => {
                    if (!o.disable) {
                      return (
                        <TableRow key={i}>
                          <TableCell>{o.nameProduct}</TableCell>
                          <TableCell align="center">{o.quantity}</TableCell>
                          <TableCell align="right">
                            {VND.format(o.sellPrice)}
                          </TableCell>
                          <TableCell align="right">
                            {VND.format(o.quantity * o.sellPrice)}
                          </TableCell>
                        </TableRow>
                      );
                    }
                  });
                }
              })}
              {order.map((e) => {
                if (!e.disable) {
                  return (
                    <TableRow>
                      <TableCell></TableCell>
                      <TableCell align="right"></TableCell>
                      <TableCell align="right">
                        <h3>Tổng tiền:</h3>
                      </TableCell>
                      <TableCell align="right">{VND.format(e.total)}</TableCell>
                    </TableRow>
                  );
                }
              })}
            </TableBody>
          </Table>

          <Table
            sx={{
              maxWidth: "50%",
              margin: 5,
              background: "white",
              borderRadius: 10,
            }}
            aria-label="spanning table"
          >
            <TableBody>
              <TableRow>
                <TableCell>Email:</TableCell>
                <TableCell>
                  {/* <OutlinedInput
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    sx={{ width: "100%", height: "40px" }}
                  ></OutlinedInput> */}
                  <Input
                    value={email || ""}
                    onChange={(e) => setEmail(e.target.value)}
                    type="text"
                    sx={{ width: "100%", height: "40px" }}
                  ></Input>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Họ tên:</TableCell>
                <TableCell>
                  {/* <OutlinedInput
                    value={name || ""}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    sx={{ width: "100%", height: "40px" }}
                  ></OutlinedInput> */}
                  <Input
                    value={name || ""}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    sx={{ width: "100%", height: "40px" }}
                  ></Input>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Số điện thoại:</TableCell>
                <TableCell>
                  {/* <OutlinedInput
                    maxLength={10}
                    value={phone || ""}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    sx={{ width: "100%", height: "40px" }}
                  ></OutlinedInput> */}
                  <Input
                    maxLength={10}
                    value={phone || ""}
                    onChange={(e) => setPhone(e.target.value)}
                    type="text"
                    sx={{ width: "100%", height: "40px" }}
                  ></Input>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Địa chỉ:</TableCell>
                <TableCell>
                  {/* <OutlinedInput
                    value={address || ""}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    sx={{ width: "100%", height: "40px" }}
                  ></OutlinedInput> */}
                  <Input
                    value={address || ""}
                    onChange={(e) => setAddress(e.target.value)}
                    type="text"
                    sx={{ width: "100%", height: "40px" }}
                  ></Input>
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Nội dung:</TableCell>
                <TableCell>
                  {/* <OutlinedInput
                    value={content || ""}
                    onChange={(e) => setContent(e.target.value)}
                    type="text"
                    sx={{ width: "100%", height: "40px" }}
                  ></OutlinedInput> */}
                  <TextArea
                    value={content || ""}
                    onChange={(e) => setContent(e.target.value)}
                    type="text"
                    sx={{ width: "100%", height: "40px" }}
                  ></TextArea>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Box className="order-pay">
          <div>
            <Radio.Group onChange={onChange} value={value}>
              <Radio className="order-tt" value="tm">
                Thanh toán tiền mặt
              </Radio>
              <Radio className="order-tt" value="paypal">
                Thanh toán PayPal
              </Radio>
            </Radio.Group>
          </div>
          {value === "paypal" ? (
            <div
              className="final-form"
              style={{ marginLeft: "100px", width: "400px" }}
            >
              <PayPalScriptProvider options={{ clientId: "test" }}>
                <PayPalButtons
                  createOrder={(data, actions) => {
                    return actions.order.create({
                      purchase_units: [
                        {
                          amount: {
                            value: "1.99",
                          },
                        },
                      ],
                    });
                  }}
                  onApprove={(data, actions) => {
                    return actions.order.capture().then((details) => {
                      const name = details.payer.name.given_name;
                      handleAddOrder1();
                      navigate("/payment");
                    });
                  }}
                />
              </PayPalScriptProvider>
            </div>
          ) : (
            <Button variant="contained">
              <Link
                to="/payment"
                className="order-link"
                onClick={handleAddOrder}
              >
                thanh toán
              </Link>
            </Button>
          )}
        </Box>
      </Box>
    </div>
  );
}
