import LeftPage from "../../../Components/LeftPage/LeftPage";
import DefaultLayoutUserHomePage from "../../../Layouts/DefaultLayoutUserHomePage";
import "./ProductPage.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBagShopping, faHeart } from '@fortawesome/free-solid-svg-icons';



const ProductPage = () => {
    return (
        <DefaultLayoutUserHomePage>
            <div className="row mt-5">
                <LeftPage />

                <div className="col-md-7">
                    <div className="row row-cols-1 row-cols-md-2 g-4">
                        <div className="col">
                            <div className="card h-100 shadow-sm d-flex flex-row">
                                <img src="./Images/vegetable.png" className="card-img-left" alt="Product" />
                                <div className="card-body">
                                    <h5 className="card-title">Táo xanh tự nhiên organic được trồng tại đà lạt</h5>
                                    <p className="card-text">Giá bán: 220.000 VNĐ</p>
                                    <div className="d-flex justify-content-start">
                                        <button className="btn btn-light me-2">
                                            <FontAwesomeIcon icon={faBagShopping} />
                                        </button>
                                        <button className="btn btn-light me-2">
                                            <FontAwesomeIcon icon={faHeart} />
                                        </button>
                                        <button className="btn btn-light">
                                            <FontAwesomeIcon icon={faSearch} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </DefaultLayoutUserHomePage>
    )
}

export default ProductPage;