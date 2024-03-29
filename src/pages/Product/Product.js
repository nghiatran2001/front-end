import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Admin from "../Admin/Admin";
import "./Product.css";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Link, useNavigate } from "react-router-dom";
import DoubleRight from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import DoubleLeft from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import Update from "@mui/icons-material/ConstructionOutlined";
import Delete from "@mui/icons-material/DeleteForeverOutlined";
import Add from "@mui/icons-material/AddOutlined";
import DropDown from "@mui/icons-material/ArrowDropDownOutlined";
import { Popconfirm, notification } from "antd";

import { product as productAPI } from "../../API";

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

export default function Product() {
  const [listProduct, setListProduct] = useState([]);
  const [sortProduct, setSortProduct] = useState("ASC");

  const [keywords, setKeyWords] = useState("");
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 4;
  const lastIndex = currentPage * productPerPage;
  const firstIndex = lastIndex - productPerPage;
  const products = listProduct.slice(firstIndex, lastIndex);
  const pageNumber = Math.ceil(listProduct.length / productPerPage);
  const numbers = [...Array(pageNumber + 1).keys()].slice(1);

  const [api, contextHolder] = notification.useNotification();

  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  const handleDeleteProduct = async (id) => {
    try {
      const result = await productAPI.deleteProduct({
        id,
      });
      if (result.status === 211) {
        await getProductList();
        api.open({
          type: "error",
          message: "Không thể xoá vì hàng đã được đặt",
        });
      }
      if (result.status === 200) {
        await getProductList();
        api.open({
          type: "success",
          message: "Xóa thành công.",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const cancel = (e) => {};

  useEffect(() => {
    (async () => {
      await getProductList();
    })();
  }, []);
  const getProductList = async () => {
    try {
      const result = await productAPI.getProductList();
      setListProduct(result.data);
    } catch (error) {
      console.log(error);
    }
  };

  const prePage = async () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = async () => {
    if (currentPage !== pageNumber) {
      setCurrentPage(currentPage + 1);
    }
  };

  const changePage = async (id) => {
    setCurrentPage(id);
  };

  const sorting = (col) => {
    if (sortProduct === "ASC") {
      const sorted = [...listProduct].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setListProduct(sorted);
      setSortProduct("DSC");
    }
    if (sortProduct === "DSC") {
      const sorted = [...listProduct].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setListProduct(sorted);
      setSortProduct("ASC");
    }
  };

  const sorting2 = (col) => {
    if (sortProduct === "ASC") {
      const sorted = [...listProduct].sort((a, b) =>
        a[col] > b[col] ? 1 : -1
      );
      setListProduct(sorted);
      setSortProduct("DSC");
    }
    if (sortProduct === "DSC") {
      const sorted = [...listProduct].sort((a, b) =>
        a[col] < b[col] ? 1 : -1
      );
      setListProduct(sorted);
      setSortProduct("ASC");
    }
  };

  const handleChangeInput = (e) => {
    let keywords = e.target.value;
    setKeyWords(keywords);
    keywords.length > 0
      ? navigate(`/product?keywords=${keywords.trim()}`)
      : navigate(`/product`);
  };

  return (
    <div>
      {contextHolder}
      <Box
        sx={{
          display: "flex",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 250,
            height: "100%",
          }}
        >
          <Admin></Admin>
        </Box>
        <Box sx={{ marginTop: 5, marginLeft: 5 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="h5" sx={{ marginBottom: 5 }}>
              Danh sách sản phẩm
            </Typography>
            <Typography variant="h5" sx={{ marginBottom: 5 }}>
              <input
                className="search-product"
                type="search"
                placeholder="Nhập cần tìm..."
                onChange={handleChangeInput}
                inputProps={{ "aria-label": "search" }}
              ></input>
            </Typography>
            <Typography variant="h5" sx={{ marginBottom: 5 }}>
              <Link to="/addproduct">
                <Button variant="contained">
                  <Add></Add>
                </Button>
              </Link>
            </Typography>
          </Box>
          <TableContainer component={Paper} sx={{ borderRadius: 5 }}>
            <Table sx={{ maxWidth: 1200 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell
                    sx={{ minWidth: "160px" }}
                    className="product-down"
                    onClick={() => sorting("nameProduct")}
                  >
                    Sản phẩm
                    <p>
                      <DropDown></DropDown>
                    </p>
                  </StyledTableCell>
                  <StyledTableCell>Hình ảnh</StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="product-down"
                    onClick={() => sorting("nameBrand")}
                  >
                    Hãng
                    <p>
                      <DropDown></DropDown>
                    </p>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="product-down"
                    onClick={() => sorting("nameCategory")}
                  >
                    Thể loại
                    <p>
                      <DropDown></DropDown>
                    </p>
                  </StyledTableCell>

                  {/* <StyledTableCell
                    className="product-down"
                    onClick={() => sorting2("originPrice")}
                  >
                    Giá gốc
                    <p>
                      <DropDown></DropDown>
                    </p>
                  </StyledTableCell> */}
                  <StyledTableCell
                    align="center"
                    className="product-down"
                    onClick={() => sorting2("sellPrice")}
                  >
                    Giá bán
                    <p>
                      <DropDown></DropDown>
                    </p>
                  </StyledTableCell>
                  <StyledTableCell
                    align="center"
                    className="product-down"
                    onClick={() => sorting2("quantity")}
                  >
                    Số lượng
                    <p>
                      <DropDown></DropDown>
                    </p>
                  </StyledTableCell>
                  <StyledTableCell
                    className="product-down"
                    onClick={() => sorting("disable")}
                  >
                    Tình trạng
                    <p>
                      <DropDown></DropDown>
                    </p>
                  </StyledTableCell>
                  <StyledTableCell>Thao tác</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product, index) => {
                  return (
                    <StyledTableRow
                      key={index}
                      sx={{ maxWidth: 50, padding: 0 }}
                    >
                      <StyledTableCell sx={{ minWidth: "160px" }}>
                        {product.nameProduct}
                      </StyledTableCell>
                      <StyledTableCell>
                        <img
                          src={product.image}
                          alt=""
                          height="100px"
                          width="100px"
                        ></img>
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ minWidth: "150px" }}
                        align="center"
                      >
                        {product.nameBrand}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ minWidth: "150px" }}
                        align="center"
                      >
                        {product.nameCategory}
                      </StyledTableCell>

                      {/* <StyledTableCell align="center">
                        {VND.format(product.originPrice)}
                      </StyledTableCell> */}
                      <StyledTableCell
                        sx={{ minWidth: "150px" }}
                        align="center"
                      >
                        {VND.format(product.sellPrice)}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ minWidth: "150px" }}
                        align="center"
                      >
                        {product.quantity}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {product.disable}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Link to={`/editproduct?idProduct=${product._id}`}>
                          <Update className="product-delete "></Update>
                        </Link>
                        <Popconfirm
                          title="Xóa"
                          description="Bạn chắc chắn muốn xóa?"
                          onConfirm={() => handleDeleteProduct(product._id)}
                          onCancel={cancel}
                          okText="Có"
                          cancelText="Không"
                        >
                          <Delete className="product-delete "></Delete>
                        </Popconfirm>
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
          <nav>
            <ul className="pagination">
              <li className="page-item ">
                <Link href="#" className="page-link" onClick={prePage}>
                  <DoubleLeft></DoubleLeft>
                </Link>
              </li>
              {numbers.map((n, i) => (
                <li
                  className={`page-item ${
                    currentPage === n ? "page-item red active" : ""
                  }`}
                  key={i}
                >
                  <Link
                    href="#"
                    className="page-link"
                    onClick={() => changePage(n)}
                  >
                    {n}
                  </Link>
                </li>
              ))}
              <li className="page-item">
                <Link href="#" className="page-link" onClick={nextPage}>
                  <DoubleRight></DoubleRight>
                </Link>
              </li>
            </ul>
          </nav>
        </Box>
      </Box>
    </div>
  );
}
