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
    );

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
                        <div className="row">
                            <div className="col-12">
                                <button className="btn btn-primary" onClick={handleAddProduct}>
                                    Thêm sản phẩm
                                </button>
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
                            {filteredProducts.map((product) => (
                                <div className="item" key={product._id}>
                                    <ProductCard_2
                                        product={product}
                                        onDelete={fetchProducts}
                                        onClickUpdateProduct={handleClicUpdateProduct(product)}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </DefaultLayoutAdmin>
        </>
    );
};

export default ManageProduct;
