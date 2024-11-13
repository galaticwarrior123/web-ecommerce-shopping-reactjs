import './Footer.css';


const Footer = () => {
    return (
        <div className="footer">
            <div className="container-footer">
                <div className="row-footer">
                    <div className="col-md-4">
                        <h3>Liên hệ</h3>
                        <p>Địa chỉ: Số 1, Võ Văn Ngân, Thủ Đức, TP.HCM</p>
                        <p>Điện thoại: 0123 456 789</p>
                        <p>Email: fruiteUTE@imail.edu.vn</p>
                    </div>
                    <div className="col-md-4">
                        <h3>Liên kết</h3>
                        <p>Trang chủ</p>
                        <p>Sản phẩm</p>
                        <p>Giới thiệu</p>
                        <p>Liên hệ</p>
                    
                    </div>

                    <div className="col-md-4">
                        <h3>Giới thiệu</h3>
                        <p>Chúng tôi cung cấp các sản phẩm hoa quả tươi sạch, chất lượng cao</p>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default Footer;