import React, { useEffect, useState } from "react";
import { Button, CardContent, Typography } from "@mui/material";
import ShoppingCartRounded from "@mui/icons-material/ShoppingCart";
import Box from "@mui/material/Box";
import "./ProductDetail.css";
import { Col, Row, notification } from "antd";

import {
  product as productAPI,
  cart as cartAPI,
  user as userAPI,
} from "../../API";
import { useSelector } from "react-redux";

export default function ProductDetail() {
  const VND = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });
  const [api, contextHolder] = notification.useNotification();
  const user = useSelector((state) => state.auth.login?.currentUser);

  const [userId, setUserId] = useState("");

  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idProduct = urlParams.get("idProduct");
  const [product, setProduct] = useState([]);

  const handleAddCart = async (e) => {
    e.preventDefault();
    try {
      const result = await cartAPI.addCart({
        idProduct,
        email: userId.email,
        quantity: 1,
      });
      if (result.status === 200) {
        api.open({
          type: "success",
          message: "Thêm giỏ hàng thành công.",
        });
      }
    } catch (error) {
      console.log(error);
      api.open({
        type: "error",
        message: "Sản phẩm đã tồn tại trong giỏ hàng",
      });
    }
  };

  useEffect(() => {
    (async () => {
      await getIdProduct();
    })();
  }, []);

  const getIdProduct = async () => {
    try {
      const result = await productAPI.getIdProduct({ id: idProduct });
      setProduct(result.data);
    } catch (error) {
      console.log(error);
    }
  };

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

  return (
    <div>
      {contextHolder}
      <Row className="product-detail-body">
        <Col span={20} offset={2}>
          <Row
            style={{ padding: 20, background: "white", borderRadius: "10px" }}
          >
            <Col
              span={11}
              style={{ borderRight: "1px solid #e5e5e5", paddingRight: 20 }}
            >
              <div className="product_detail">
                <img
                  className="img_product"
                  src={product.image}
                  alt="img-product"
                ></img>
              </div>
            </Col>
            <Col span={13} style={{ paddingLeft: 20 }}>
              <CardContent sx={{ marginBottom: 5 }}>
                <Typography gutterBottom variant="h4">
                  {product.nameProduct}
                </Typography>
                <Box>
                  <Box sx={{ paddingLeft: 3 }}>
                    <Typography
                      gutterBottom
                      className="text"
                      color="text.secondary"
                    >
                      Giá gốc: <span>{VND.format(product.originPrice)}</span>
                    </Typography>
                    <Typography gutterBottom color="red">
                      Giá bán: <span>{VND.format(product.sellPrice)}</span>
                    </Typography>
                    <Typography gutterBottom>
                      Tình trạng: <span>{product.disable}</span>
                    </Typography>
                  </Box>
                </Box>
                <Typography gutterBottom variant="h5">
                  Mô tả sản phẩm
                </Typography>
                <Typography sx={{ paddingLeft: 3 }} gutterBottom>
                  {product.description}
                </Typography>
              </CardContent>
              {user ? (
                <Box
                  sx={{
                    borderRadius: "10px",
                    padding: 2,
                  }}
                >
                  {product.quantity > 0 && product.disable === "Hoạt động" ? (
                    <Button
                      sx={{ fontSize: 15 }}
                      variant="contained"
                      startIcon={<ShoppingCartRounded />}
                      onClick={handleAddCart}
                    >
                      Thêm giỏ hàng
                    </Button>
                  ) : (
                    ""
                  )}
                </Box>
              ) : (
                ""
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
