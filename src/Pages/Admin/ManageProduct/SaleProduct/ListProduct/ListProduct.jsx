import './ListProduct.css';
import ProductAPI from '../../../../../API/ProductAPI';
import { useEffect, useState } from 'react';


const ListProduct = ({handleCloseAddProductSale, onClickAddPromotion}) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await ProductAPI.findProductsWithoutPromotion();
                if (response.data && response.data.DT.data) {
                    console.log('API Response:', response);
                    setProducts(response.data.DT.data);

                } else {
                    console.error('Không có sản phẩm nào được trả về hoặc cấu trúc dữ liệu không đúng:', response.data);
                }
            } catch (error) {
                console.error('Lỗi khi lấy sản phẩm:', error);
            }
        };
        fetchProducts();
    }, []);

 

    return (
        <div className="position-fixed top-0 left-0 right-0 bottom-0 w-100 ml-n1 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex:10 }}
                        onClick={handleCloseAddProductSale}>

            <div className="list-product bg-white d-flex justify-content-center" style={{ maxHeight: "500px", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
                <div className="row p-2 w-100" >
                    <div className="col-12">
                        <h1 className="text-center fw-bold fs-3">Danh sách sản phẩm Khuyến mãi</h1>
                    </div>
                    <div className="col-12">
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th>STT</th>
                                    <th>Tên sản phẩm</th>
                                    <th>Giá gốc</th>
                                    <th>Đã bán</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {products.map((product, index) => (
                                    <tr key={product._id}>
                                        <td>{index + 1}</td>
                                        <td>{product.productName}</td>
                                        <td>{product.origin_price}</td>
                                        <td>{product.sold_count}</td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => onClickAddPromotion(product)}>Thêm khuyến mãi</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                    </div>
                </div>
            
            </div>

            
            
            
        </div>
    )
}

export default ListProduct;