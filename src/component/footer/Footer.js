import React from 'react';
import './Footer.scss'

const Footer = () => {
    return (
        <>
                <footer className="footer_width">
                    <div className="footer_content">
                    <div className="footer_intro">
                        <h2>GIỚI THIỆU</h2>
                        <p>* VỀ CHÚNG TÔI</p>
                        <p>* QUY CHẾ HOẠT ĐỘNG</p>
                        <p>* CHÍNH SÁCH BẢO MẬT</p>
                    </div>
                    <div className="footer_cinema">
                        <h2>GÓC ĐIỆN ẢNH</h2>
                        <p>* THỂ LOẠI PHIM</p>
                        <p>* BÌNH LUẬN PHIM</p>
                        <p>* PHIM HAY THÁNG</p>
                    </div>
                    <div className="footer_support">
                        <h2> HỖ TRỢ</h2>
                        <p>* GÓP Ý</p>
                        <p>* RẠP / GIÁ VÉ</p>
                        <p>* TUYỂN DỤNG</p>
                    </div>
                    <div className="footer_connect">
                        <h2>KẾT NỐI VỚI CHÚNG TÔI</h2>
                        <p>* Hotline: +84 933.833.733</p>
                        <p>* Facebook: Family Tech</p>
                        <p>* Mail: family.tech@gmail.com</p>
                    </div>
                    </div>
                </footer>
                <div className="footer">
                    <p>
                        Công Ty Cổ Phần Phim Family Tech, Tầng 5, Toà Nhà Bitexco Nam Long, 63A Võ Văn Tần, P. Võ Thị Sáu, Quận 3, 
                        Tp. Hồ Chí Minh Xem thêm tại: https://www.cinemastu.vn/
                        </p>
                </div>

        </>
    );
};

export default Footer;