import React, { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import "./Follow.css";
import { useSelector } from "react-redux";
import { Modal, Popconfirm } from "antd";
import See from "@mui/icons-material/VisibilityOutlined";
import { notification } from "antd";

import { payment as paymentAPI } from "../../API";
import { cart as cartAPI } from "../../API";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
export default function Follow() {
  const [api, contextHolder] = notification.useNotification();

  const [value, setValue] = React.useState(0);
  const [idOrder, setIdOrder] = React.useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const user = useSelector((state) => state.auth.login?.currentUser);

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const [order, setOrder] = useState([]);
  const [idProduct, setIdProduct] = useState([]);

  useEffect(() => {
    (async () => {
      await getOrders();
    })();
  }, []);

  const getOrders = async () => {
    try {
      const result = await paymentAPI.getList();
      setOrder(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const cancel = (e) => {};

  const handleCancelOrder = async (e) => {
    const result = await paymentAPI.cancelOrder({ id: e });
    let updateKho;
    order.map(async (o) => {
      return o.order.map(async (e) => {
        return (updateKho = await cartAPI.updateKho({ id: e._id }));
      });
    });
    api.open({
      type: "success",
      message: "Huỷ đơn hàng thành công.",
    });

    window.location.reload(true);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = (e) => {
    setIsModalOpen(true);
    setIdOrder(e);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
    window.location.reload(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
    window.location.reload(true);
  };
  useEffect(() => {
    if (idOrder) {
      (async () => {
        await getIdOrder();
      })();
    }
  }, [idOrder]);
  const getIdOrder = async () => {
    try {
      const result = await paymentAPI.getIdOrder({ id: idOrder });
      setIdProduct(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      {contextHolder}
      <Box className="follow">
        <Box sx={{ marginTop: 5, marginLeft: 5 }}>
          <Typography variant="h5" sx={{ marginBottom: 5 }}>
            <h3>Danh sách đơn hàng</h3>
          </Typography>
          <Typography>
            <Tabs value={value} onChange={handleChange} centered>
              <Tab className="follow-tab" label="Tất cả"></Tab>
              <Tab className="follow-tab" label="Đang xử lý"></Tab>
              <Tab className="follow-tab" label="Đã xác nhận"></Tab>
              <Tab className="follow-tab" label="Đang giao"></Tab>
              <Tab className="follow-tab" label="Đã giao"></Tab>
              <Tab className="follow-tab" label="Đã hủy"></Tab>
            </Tabs>
          </Typography>
          <TableContainer component={Paper} className="follow-table">
            <Table sx={{ minWidth: 1100 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>Mã đơn hàng</StyledTableCell>
                  <StyledTableCell>Ngày đặt</StyledTableCell>
                  <StyledTableCell>Họ Tên</StyledTableCell>
                  <StyledTableCell>Email</StyledTableCell>
                  <StyledTableCell>Số Điện Thoại</StyledTableCell>
                  <StyledTableCell>Địa chỉ</StyledTableCell>
                  <StyledTableCell>Trạng thái</StyledTableCell>
                  <StyledTableCell>Tổng tiền</StyledTableCell>
                  <StyledTableCell>Chi tiết sản phẩm</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {order.map((o, i) => {
                  if (o.email === user.email) {
                    if (value === 0) {
                      return (
                        <StyledTableRow key={i}>
                          <StyledTableCell component="th" scope="row">
                            {o._id}
                          </StyledTableCell>
                          <StyledTableCell>{o.createdAt}</StyledTableCell>
                          <StyledTableCell>{o.name}</StyledTableCell>
                          <StyledTableCell>{o.email}</StyledTableCell>
                          <StyledTableCell>0{o.phone}</StyledTableCell>
                          <StyledTableCell>{o.address}</StyledTableCell>
                          <StyledTableCell>{o.status}</StyledTableCell>
                          <StyledTableCell>
                            {VND.format(o.total)}
                          </StyledTableCell>
                          <StyledTableCell align="center">
                            <See
                              className="follow-delete"
                              onClick={(e) => showModal(o._id)}
                            ></See>
                            <Modal
                              width="70%"
                              title="Thông tin sản phẩm"
                              open={isModalOpen}
                              onCancel={handleCancel}
                              onOk={handleOk}
                            >
                              <TableContainer className="follow-bg">
                                <Table
                                  sx={{
                                    maxWidth: "100%",
                                  }}
                                  aria-label="spanning table"
                                >
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>
                                        <h3>Tên sản phẩm</h3>
                                      </TableCell>
                                      <TableCell>
                                        <h3>Hình ảnh</h3>
                                      </TableCell>
                                      <TableCell align="center">
                                        <h3>Số lượng</h3>
                                      </TableCell>
                                      <TableCell align="center">
                                        <h3>Đơn giá</h3>
                                      </TableCell>
                                      <TableCell align="right">
                                        <h3>Thành tiền</h3>
                                      </TableCell>
                                      <TableCell align="right"></TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {idProduct?.order?.map((o) => {
                                      if (o.disable === false) {
                                        return (
                                          <TableRow>
                                            <TableCell>
                                              {o.nameProduct}
                                            </TableCell>
                                            <TableCell>
                                              <img
                                                className="image-cart"
                                                src={o.image}
                                                alt=""
                                                align="center"
                                              ></img>
                                            </TableCell>
                                            <TableCell
                                              align="center"
                                              className="btn"
                                            >
                                              <span className="btn-quantity">
                                                {o.quantity}
                                              </span>
                                            </TableCell>
                                            <TableCell align="center">
                                              {VND.format(o.sellPrice)}
                                            </TableCell>
                                            <TableCell align="right">
                                              {VND.format(
                                                o.quantity * o.sellPrice
                                              )}
                                            </TableCell>
                                          </TableRow>
                                        );
                                      }
                                    })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Modal>
                          </StyledTableCell>
                          <StyledTableCell>
                            {o.status === "Đang xử lý" ||
                            o.status === "Đã xác nhận" ? (
                              <Popconfirm
                                onConfirm={() => handleCancelOrder(o._id)}
                                title="Xóa"
                                description="Bạn chắc chắn muốn huỷ đơn hàng?"
                                onCancel={cancel}
                                okText="Có"
                                cancelText="Không"
                              >
                                <Button
                                  sx={{ marginRight: 2 }}
                                  variant="contained"
                                >
                                  Huỷ đơn
                                </Button>
                              </Popconfirm>
                            ) : (
                              ""
                            )}
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    }
                    if (value === 1 && o.status === "Đang xử lý") {
                      return (
                        <StyledTableRow key={i}>
                          <StyledTableCell component="th" scope="row">
                            {o._id}
                          </StyledTableCell>
                          <StyledTableCell>{o.createdAt}</StyledTableCell>
                          <StyledTableCell>{o.name}</StyledTableCell>
                          <StyledTableCell>{o.email}</StyledTableCell>
                          <StyledTableCell>0{o.phone}</StyledTableCell>
                          <StyledTableCell>{o.address}</StyledTableCell>
                          <StyledTableCell>{o.status}</StyledTableCell>
                          <TableCell align="right">
                            {VND.format(o.total)}
                          </TableCell>
                          <StyledTableCell align="center">
                            <See
                              className="follow-delete"
                              onClick={(e) => showModal(o._id)}
                            ></See>
                            <Modal
                              width="70%"
                              title="Thông tin sản phẩm"
                              open={isModalOpen}
                              onCancel={handleCancel}
                            >
                              <TableContainer className="follow-bg">
                                <Table
                                  sx={{
                                    maxWidth: "100%",
                                  }}
                                  aria-label="spanning table"
                                >
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>
                                        <h3>Tên sản phẩm</h3>
                                      </TableCell>
                                      <TableCell>
                                        <h3>Hình ảnh</h3>
                                      </TableCell>
                                      <TableCell align="center">
                                        <h3>Số lượng</h3>
                                      </TableCell>
                                      <TableCell align="center">
                                        <h3>Đơn giá</h3>
                                      </TableCell>
                                      <TableCell align="right">
                                        <h3>Thành tiền</h3>
                                      </TableCell>
                                      <TableCell align="right"></TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {idProduct?.order?.map((o) => {
                                      if (o.disable === false) {
                                        return (
                                          <TableRow>
                                            <TableCell>
                                              {o.nameProduct}
                                            </TableCell>
                                            <TableCell>
                                              <img
                                                className="image-cart"
                                                src={o.image}
                                                alt=""
                                                align="center"
                                              ></img>
                                            </TableCell>
                                            <TableCell
                                              align="center"
                                              className="btn"
                                            >
                                              <span className="btn-quantity">
                                                {o.quantity}
                                              </span>
                                            </TableCell>
                                            <TableCell align="center">
                                              {VND.format(o.sellPrice)}
                                            </TableCell>
                                            <TableCell align="right">
                                              {VND.format(
                                                o.quantity * o.sellPrice
                                              )}
                                            </TableCell>
                                          </TableRow>
                                        );
                                      }
                                    })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Modal>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Popconfirm
                              onConfirm={() => handleCancelOrder(o._id)}
                              title="Xóa"
                              description="Bạn chắc chắn muốn huỷ đơn hàng?"
                              onCancel={cancel}
                              okText="Có"
                              cancelText="Không"
                            >
                              <Button
                                sx={{ marginRight: 2 }}
                                variant="contained"
                              >
                                Huỷ đơn
                              </Button>
                            </Popconfirm>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    }
                    if (value === 2 && o.status === "Đã xác nhận") {
                      return (
                        <StyledTableRow key={i}>
                          <StyledTableCell component="th" scope="row">
                            {o._id}
                          </StyledTableCell>
                          <StyledTableCell>{o.createdAt}</StyledTableCell>
                          <StyledTableCell>{o.name}</StyledTableCell>
                          <StyledTableCell>{o.email}</StyledTableCell>
                          <StyledTableCell>0{o.phone}</StyledTableCell>
                          <StyledTableCell>{o.address}</StyledTableCell>
                          <StyledTableCell>{o.status}</StyledTableCell>
                          <TableCell align="right">
                            {VND.format(o.total)}
                          </TableCell>
                          <StyledTableCell align="center">
                            <See
                              className="follow-delete"
                              onClick={(e) => showModal(o._id)}
                            ></See>
                            <Modal
                              width="70%"
                              title="Thông tin sản phẩm"
                              open={isModalOpen}
                              onCancel={handleCancel}
                            >
                              <TableContainer className="follow-bg">
                                <Table
                                  sx={{
                                    maxWidth: "100%",
                                  }}
                                  aria-label="spanning table"
                                >
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>
                                        <h3>Tên sản phẩm</h3>
                                      </TableCell>
                                      <TableCell>
                                        <h3>Hình ảnh</h3>
                                      </TableCell>
                                      <TableCell align="center">
                                        <h3>Số lượng</h3>
                                      </TableCell>
                                      <TableCell align="center">
                                        <h3>Đơn giá</h3>
                                      </TableCell>
                                      <TableCell align="right">
                                        <h3>Thành tiền</h3>
                                      </TableCell>
                                      <TableCell align="right"></TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {idProduct?.order?.map((o) => {
                                      if (o.disable === false) {
                                        return (
                                          <TableRow>
                                            <TableCell>
                                              {o.nameProduct}
                                            </TableCell>
                                            <TableCell>
                                              <img
                                                className="image-cart"
                                                src={o.image}
                                                alt=""
                                                align="center"
                                              ></img>
                                            </TableCell>
                                            <TableCell
                                              align="center"
                                              className="btn"
                                            >
                                              <span className="btn-quantity">
                                                {o.quantity}
                                              </span>
                                            </TableCell>
                                            <TableCell align="center">
                                              {VND.format(o.sellPrice)}
                                            </TableCell>
                                            <TableCell align="right">
                                              {VND.format(
                                                o.quantity * o.sellPrice
                                              )}
                                            </TableCell>
                                          </TableRow>
                                        );
                                      }
                                    })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Modal>
                          </StyledTableCell>
                          <StyledTableCell>
                            <Popconfirm
                              onConfirm={() => handleCancelOrder(o._id)}
                              title="Xóa"
                              description="Bạn chắc chắn muốn huỷ đơn hàng?"
                              onCancel={cancel}
                              okText="Có"
                              cancelText="Không"
                            >
                              <Button
                                sx={{ marginRight: 2 }}
                                variant="contained"
                              >
                                Huỷ đơn
                              </Button>
                            </Popconfirm>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    }
                    if (value === 3 && o.status === "Đang giao") {
                      return (
                        <StyledTableRow key={i}>
                          <StyledTableCell component="th" scope="row">
                            {o._id}
                          </StyledTableCell>
                          <StyledTableCell>{o.createdAt}</StyledTableCell>
                          <StyledTableCell>{o.name}</StyledTableCell>
                          <StyledTableCell>{o.email}</StyledTableCell>
                          <StyledTableCell>0{o.phone}</StyledTableCell>
                          <StyledTableCell>{o.address}</StyledTableCell>
                          <StyledTableCell>{o.status}</StyledTableCell>
                          <TableCell align="right">
                            {VND.format(o.total)}
                          </TableCell>
                          <StyledTableCell align="center">
                            <See
                              className="follow-delete"
                              onClick={(e) => showModal(o._id)}
                            ></See>
                            <Modal
                              width="70%"
                              title="Thông tin sản phẩm"
                              open={isModalOpen}
                              onCancel={handleCancel}
                            >
                              <TableContainer className="follow-bg">
                                <Table
                                  sx={{
                                    maxWidth: "100%",
                                  }}
                                  aria-label="spanning table"
                                >
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>
                                        <h3>Tên sản phẩm</h3>
                                      </TableCell>
                                      <TableCell>
                                        <h3>Hình ảnh</h3>
                                      </TableCell>
                                      <TableCell align="center">
                                        <h3>Số lượng</h3>
                                      </TableCell>
                                      <TableCell align="center">
                                        <h3>Đơn giá</h3>
                                      </TableCell>
                                      <TableCell align="right">
                                        <h3>Thành tiền</h3>
                                      </TableCell>
                                      <TableCell align="right"></TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {idProduct?.order?.map((o) => {
                                      if (o.disable === false) {
                                        return (
                                          <TableRow>
                                            <TableCell>
                                              {o.nameProduct}
                                            </TableCell>
                                            <TableCell>
                                              <img
                                                className="image-cart"
                                                src={o.image}
                                                alt=""
                                                align="center"
                                              ></img>
                                            </TableCell>
                                            <TableCell
                                              align="center"
                                              className="btn"
                                            >
                                              <span className="btn-quantity">
                                                {o.quantity}
                                              </span>
                                            </TableCell>
                                            <TableCell align="center">
                                              {VND.format(o.sellPrice)}
                                            </TableCell>
                                            <TableCell align="right">
                                              {VND.format(
                                                o.quantity * o.sellPrice
                                              )}
                                            </TableCell>
                                          </TableRow>
                                        );
                                      }
                                    })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Modal>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    }
                    if (value === 4 && o.status === "Đã giao") {
                      return (
                        <StyledTableRow key={i}>
                          <StyledTableCell component="th" scope="row">
                            {o._id}
                          </StyledTableCell>
                          <StyledTableCell>{o.createdAt}</StyledTableCell>
                          <StyledTableCell>{o.name}</StyledTableCell>
                          <StyledTableCell>{o.email}</StyledTableCell>
                          <StyledTableCell>0{o.phone}</StyledTableCell>
                          <StyledTableCell>{o.address}</StyledTableCell>
                          <StyledTableCell>{o.status}</StyledTableCell>
                          <TableCell align="right">
                            {VND.format(o.total)}
                          </TableCell>
                          <StyledTableCell align="center">
                            <See
                              className="follow-delete"
                              onClick={(e) => showModal(o._id)}
                            ></See>
                            <Modal
                              width="70%"
                              title="Thông tin sản phẩm"
                              open={isModalOpen}
                              onCancel={handleCancel}
                            >
                              <TableContainer className="follow-bg">
                                <Table
                                  sx={{
                                    maxWidth: "100%",
                                  }}
                                  aria-label="spanning table"
                                >
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>
                                        <h3>Tên sản phẩm</h3>
                                      </TableCell>
                                      <TableCell>
                                        <h3>Hình ảnh</h3>
                                      </TableCell>
                                      <TableCell align="center">
                                        <h3>Số lượng</h3>
                                      </TableCell>
                                      <TableCell align="center">
                                        <h3>Đơn giá</h3>
                                      </TableCell>
                                      <TableCell align="right">
                                        <h3>Thành tiền</h3>
                                      </TableCell>
                                      <TableCell align="right"></TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {idProduct?.order?.map((o) => {
                                      if (o.disable === false) {
                                        return (
                                          <TableRow>
                                            <TableCell>
                                              {o.nameProduct}
                                            </TableCell>
                                            <TableCell>
                                              <img
                                                className="image-cart"
                                                src={o.image}
                                                alt=""
                                                align="center"
                                              ></img>
                                            </TableCell>
                                            <TableCell
                                              align="center"
                                              className="btn"
                                            >
                                              <span className="btn-quantity">
                                                {o.quantity}
                                              </span>
                                            </TableCell>
                                            <TableCell align="center">
                                              {VND.format(o.sellPrice)}
                                            </TableCell>
                                            <TableCell align="right">
                                              {VND.format(
                                                o.quantity * o.sellPrice
                                              )}
                                            </TableCell>
                                          </TableRow>
                                        );
                                      }
                                    })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Modal>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    }
                    if (value === 5 && o.status === "Đã huỷ") {
                      return (
                        <StyledTableRow key={i}>
                          <StyledTableCell component="th" scope="row">
                            {o._id}
                          </StyledTableCell>
                          <StyledTableCell>{o.createdAt}</StyledTableCell>
                          <StyledTableCell>{o.name}</StyledTableCell>
                          <StyledTableCell>{o.email}</StyledTableCell>
                          <StyledTableCell>0{o.phone}</StyledTableCell>
                          <StyledTableCell>{o.address}</StyledTableCell>
                          <StyledTableCell>{o.status}</StyledTableCell>
                          <TableCell align="right">
                            {VND.format(o.total)}
                          </TableCell>
                          <StyledTableCell align="center">
                            <See
                              className="follow-delete"
                              onClick={(e) => showModal(o._id)}
                            ></See>
                            <Modal
                              width="70%"
                              title="Thông tin sản phẩm"
                              open={isModalOpen}
                              onCancel={handleCancel}
                            >
                              <TableContainer className="follow-bg">
                                <Table
                                  sx={{
                                    maxWidth: "100%",
                                  }}
                                  aria-label="spanning table"
                                >
                                  <TableHead>
                                    <TableRow>
                                      <TableCell>
                                        <h3>Tên sản phẩm</h3>
                                      </TableCell>
                                      <TableCell>
                                        <h3>Hình ảnh</h3>
                                      </TableCell>
                                      <TableCell align="center">
                                        <h3>Số lượng</h3>
                                      </TableCell>
                                      <TableCell align="center">
                                        <h3>Đơn giá</h3>
                                      </TableCell>
                                      <TableCell align="right">
                                        <h3>Thành tiền</h3>
                                      </TableCell>
                                      <TableCell align="right"></TableCell>
                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {idProduct?.order?.map((o) => {
                                      if (o.disable === false) {
                                        return (
                                          <TableRow>
                                            <TableCell>
                                              {o.nameProduct}
                                            </TableCell>
                                            <TableCell>
                                              <img
                                                className="image-cart"
                                                src={o.image}
                                                alt=""
                                                align="center"
                                              ></img>
                                            </TableCell>
                                            <TableCell
                                              align="center"
                                              className="btn"
                                            >
                                              <span className="btn-quantity">
                                                {o.quantity}
                                              </span>
                                            </TableCell>
                                            <TableCell align="center">
                                              {VND.format(o.sellPrice)}
                                            </TableCell>
                                            <TableCell align="right">
                                              {VND.format(
                                                o.quantity * o.sellPrice
                                              )}
                                            </TableCell>
                                          </TableRow>
                                        );
                                      }
                                    })}
                                  </TableBody>
                                </Table>
                              </TableContainer>
                            </Modal>
                          </StyledTableCell>
                        </StyledTableRow>
                      );
                    }
                  }
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </div>
  );
}
