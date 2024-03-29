import { Box, Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Admin from "../Admin/Admin";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Popconfirm } from "antd";
import { notification } from "antd";
import "./Category.css";
import { Link } from "react-router-dom";
import DoubleRight from "@mui/icons-material/KeyboardDoubleArrowRightOutlined";
import DoubleLeft from "@mui/icons-material/KeyboardDoubleArrowLeftOutlined";
import Delete from "@mui/icons-material/DeleteForeverOutlined";
import Add from "@mui/icons-material/AddOutlined";
import Update from "@mui/icons-material/ConstructionOutlined";
import DropDown from "@mui/icons-material/ArrowDropDownOutlined";
import { category as categoryAPI } from "../../API";

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

export default function Categories() {
  const [api, contextHolder] = notification.useNotification();

  const [listCategory, setListCategory] = useState([]);
  const [sortCategory, setSortCategory] = useState("ASC");

  const [currentPage, setCurrentPage] = useState(1);
  const catePerPage = 4;
  const lastIndex = currentPage * catePerPage;
  const firstIndex = lastIndex - catePerPage;
  const cates = listCategory.slice(firstIndex, lastIndex);
  const pageNumber = Math.ceil(listCategory.length / catePerPage);
  const numbers = [...Array(pageNumber + 1).keys()].slice(1);

  const handleDeleteCategory = async (id) => {
    try {
      const result = await categoryAPI.deleteCategory({
        id,
      });
      if (result.status === 211) {
        await getCategoryList();
        api.open({
          type: "error",
          message: "Không thể xoá vì tồn tại sản phẩm",
        });
      }
      if (result.status === 200) {
        await getCategoryList();
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
      await getCategoryList();
    })();
  }, []);
  const getCategoryList = async () => {
    try {
      const result = await categoryAPI.getCategoryList();
      setListCategory(result.data);
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
    if (sortCategory === "ASC") {
      const sorted = [...listCategory].sort((a, b) =>
        a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
      );
      setListCategory(sorted);
      setSortCategory("DSC");
    }
    if (sortCategory === "DSC") {
      const sorted = [...listCategory].sort((a, b) =>
        a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
      );
      setListCategory(sorted);
      setSortCategory("ASC");
    }
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
              Danh sách thể loại
            </Typography>
            <Typography variant="h5" sx={{ marginBottom: 5 }}>
              <Link to="/addcategory">
                <Button variant="contained">
                  <Add></Add>
                </Button>
              </Link>
            </Typography>
          </Box>
          <TableContainer component={Paper} sx={{ borderRadius: 5 }}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell align="center">STT</StyledTableCell>
                  <StyledTableCell
                    sx={{ maxWidth: "200px" }}
                    align="center"
                    className="down"
                    onClick={() => sorting("nameCategory")}
                  >
                    Thể loại
                    <DropDown></DropDown>
                  </StyledTableCell>
                  <StyledTableCell align="center" className="down">
                    Tiêu đề
                  </StyledTableCell>
                  <StyledTableCell align="center" className="down">
                    Mô tả
                  </StyledTableCell>
                  <StyledTableCell align="center">Thao tác</StyledTableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {cates.map((category, index) => {
                  return (
                    <StyledTableRow key={index}>
                      <StyledTableCell align="center">
                        {index + 1}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ minWidth: "200px" }}
                        align="center"
                      >
                        {category.nameCategory}
                      </StyledTableCell>
                      <StyledTableCell
                        sx={{ minWidth: "150px" }}
                        align="center"
                      >
                        {category.slug}
                      </StyledTableCell>
                      <StyledTableCell
                        align="center"
                        sx={{ maxWidth: "500px" }}
                      >
                        {category.description}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        <Link to={`/updatecategory?idCategory=${category._id}`}>
                          <Update className="category-delete "></Update>
                        </Link>

                        <Popconfirm
                          title="Xóa"
                          description="Bạn chắc chắn muốn xóa?"
                          onConfirm={() => handleDeleteCategory(category._id)}
                          onCancel={cancel}
                          okText="Có"
                          cancelText="Không"
                        >
                          <Delete className="category-delete"></Delete>
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
              <li className="page-item">
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
