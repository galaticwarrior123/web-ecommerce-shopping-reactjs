import React, { useEffect, useState } from 'react';
import './ManageProduct.css';
import AddProduct from './AddProduct/AddProduct';
import DefaultLayoutAdmin from '../../../Layouts/DefaultLayoutAdmin';
import ProductAPI from '../../../API/ProductAPI';
import ProductCard_2 from '../../../Components/ProductCard/ProductCard_2';
import UpdateProduct from './UpdateProduct/UpdateProduct';

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const [product, setProduct] = useState({});
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);
    const [searchValue, setSearchValue] = useState("");
    const [selectedOption, setSelectedOption] = useState("all");

    const fetchProducts = async () => {
        try {
            const response = await ProductAPI.getAllProducts();
            setProducts(response.data.DT.products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    const handleAddProduct = () => {
        setShowAddProductModal(true);
    };

    const handleClicUpdateProduct = (product) => () => {
        setProduct(product);
        setShowUpdateProductModal(true);
    };

    const handleCloseAddProudct = () => {
        setShowAddProductModal(false);
        fetchProducts();
    };

    const handleCloseUpdateProduct = () => {
        setShowUpdateProductModal(false);
        fetchProducts();
    };

    // Lọc danh sách sản phẩm theo giá trị tìm kiếm
    const filteredProducts = products.filter((product) =>
        product.productName.toLowerCase().includes(searchValue.toLowerCase())

    ).filter((product) => {
        if (selectedOption === "all") {
            return true;
        }
        if (selectedOption === "in-stock") {
            return product.quantity > 0;
        }
        if (selectedOption === "sold-out") {
            return product.quantity === 0;
        }
        if (selectedOption === "near-expired") {
            // lấy những sản phẩm mà hạn sử dụng còn 1 tháng
            const currentDate = new Date();
            const expiredDate = new Date(product.expired);
            const diffTime = Math.abs(expiredDate - currentDate);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays <= 30;
        }
    });

    return (
        <>
            {showAddProductModal && (
                <AddProduct handleCloseAddProduct={handleCloseAddProudct} />
            )}
            {showUpdateProductModal && (
                <UpdateProduct product={product} handleCloseUpdateProduct={handleCloseUpdateProduct} />
            )}
            <DefaultLayoutAdmin>
                <div className="container-body-manage_product">
                    <div className="container-fluid">
                        <div className="row d-flex ">
                            <div className="col-6">
                                <button className="btn btn-primary" onClick={handleAddProduct}>
                                    Thêm sản phẩm
                                </button>
                            </div>

                            {/* Lọc sản phẩm theo mục */}
                            <div className="col-6 d-flex justify-content-end">
                                <select className="form-select" aria-label="Lọc theo danh mục" onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption}>
                                    <option value="sold-out">Hết hàng</option>
                                    <option value="in-stock">Còn hàng</option>
                                    <option value="near-expired">Sắp hết hạn (1 tháng)</option>
                                    <option value="all">Tất cả</option>


                                </select>
                            </div>
                        </div>

                        {/* Tìm kiếm sản phẩm */}
                        <div className="row mt-3">
                            <div className="col-12">
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tìm kiếm sản phẩm"
                                        value={searchValue}
                                        onChange={(e) => setSearchValue(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="wrapper">
                            {filteredProducts.length > 0 ? (
                                
                                    
                                        
                                            filteredProducts.map((product) => (
                                                <div className="item" key={product._id}>
                                                    <ProductCard_2
                                                        product={product}
                                                        onDelete={fetchProducts}
                                                        onClickUpdateProduct={handleClicUpdateProduct(product)}
                                                    />
                                                </div>
                                            ))
                            
                                    
                                
                            ) : (
                                <div className="row">
                                    <div className="col-12">
                                        <h3>Không tìm thấy sản phẩm</h3>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </DefaultLayoutAdmin>
        </>
    );
};

export default ManageProduct;
