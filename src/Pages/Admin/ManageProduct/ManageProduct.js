import React, { useEffect, useState } from 'react';
import './ManageProduct.css';
import AddProduct from './AddProduct/AddProduct';
import DefaultLayoutAdmin from '../../../Layouts/DefaultLayoutAdmin';
import ProductAPI from '../../../API/ProductAPI';
import ProductCard_2 from '../../../Components/ProductCard/ProductCard_2';


const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    const [showAddProductModal, setShowAddProductModal] = useState(false);

    const fetchProducts = async () => {
        try {
            const response = await ProductAPI.getProducts();
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

    return (
        <>
            {showAddProductModal && (
                <AddProduct handleCloseAddProduct={() => setShowAddProductModal(false)} />
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

                        {/* Search product */}
                        <div className="row mt-3">
                            <div className="col-12">
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Tìm kiếm sản phẩm" />
                                </div>
                            </div>
                        </div>

                        <div className="wrapper"> {/* Use the wrapper here */}
                            {products.map((product) => (
                                <div className="item" key={product._id}> {/* Use the item class here */}
                                    <ProductCard_2 product={product} />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </DefaultLayoutAdmin>
        </>

    )
}

export default ManageProduct;