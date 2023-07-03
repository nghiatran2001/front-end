import React from "react";
import { QRCode, Space } from 'antd';


const PaySuccess = () => {
  const keyValue = window.location.search;
  const urlParams = new URLSearchParams(keyValue);
  const idTicket = urlParams.get("idTicket");
  return <>
    
    <Space>
    <QRCode type="canvas" value={idTicket} />
  </Space>
  THÀNH CÔNG
    
  </>;
};

export default PaySuccess;
