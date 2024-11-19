import CategoryAPI from '../../../../API/CategoryAPI';
import ProductAPI from '../../../../API/ProductAPI';
import './UpdateProduct.css';
import { useEffect, useState } from 'react';

const UpdateProduct = ({ product, handleCloseUpdateProduct }) => {
    const [productName, setProductName] = useState(product.productName);
    const [price, setPrice] = useState(product.origin_price);
    const [quantity, setQuantity] = useState(product.quantity);
    const [newImages, setNewImages] = useState([]);
    const [images, setImages] = useState(product.images || []);
    const [category, setCategory] = useState(product.category);
    const [description, setDescription] = useState(product.description);
    const [categories, setCategories] = useState([]);
    const [origin, setOrigin] = useState(product.origin);
    const [supplier, setSupplier] = useState(product.supplier);
    const [national, setNational] = useState([]);
    const [selectedNational, setSelectedNational] = useState(product.origin);

    useEffect(() => {
        const fetchNational = async () => {
            try {
                fetch('https://restcountries.com/v3.1/all')
                    .then(response => response.json())
                    .then(data => {
                        setNational(data);
                    });
            } catch (error) {
                console.log(error);
            }
        }
        fetchNational();
    }, []);


    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await CategoryAPI.getCategories();
                if (response.status === 200) {
                    setCategories(response.data.DT);
                }
            } catch (error) {
                console.log(error);
            }
        }
        fetchCategories();
    }, []);

    const handleUpdateProduct = async (e) => {
        const data = new FormData();
        data.append("productName", productName);
        data.append("origin_price", price);
        data.append("quantity", quantity);
        data.append("category", category);
        data.append("description", description);
        data.append("origin", selectedNational);
        data.append("supplier", supplier);
        for (let i = 0; i < newImages.length; i++) {
            data.append("images", newImages[i]);
        }
        data.append("images", images);
        try {
            const response = await ProductAPI.updateProduct(product._id, data);
            if (response.status === 200) {
                alert("Cập nhật sản phẩm thành công");
                handleCloseUpdateProduct();
            }
            else {
                alert("Cập nhật sản phẩm thất bại");
            }
        } catch (error) {
            alert("Cập nhật sản phẩm thất bại");
        }
    };

    const handleDeleteImage = (index) => {
        const updatedImages = images.filter((_, i) => i !== index);
        setImages(updatedImages);
    };

    const handleNewImageChange = (e) => {
        setNewImages(Array.from(e.target.files));
    };

    return (
        <div className="position-fixed top-0 left-0 right-0 bottom-0 w-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 10 }}
            onClick={handleCloseUpdateProduct}>
            <div className="update-product bg-white d-flex justify-content-center" style={{ maxHeight: "500px", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
                <div className="row p-2 w-100">
                    <div className="col-12">
                        <h1 className="text-center fw-bold fs-3">Cập nhật sản phẩm</h1>
                    </div>
                    <div className="col-12">
                        <form action="" encType="multipart/form-data">
                            <div className="mb-3">
                                <label htmlFor="productName" className="form-label">Tên sản phẩm</label>
                                <input type="text" className="form-control" id="productName" value={productName} onChange={(e) => setProductName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Giá bán</label>
                                <input type="text" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            {/* <div className="mb-3">
                                <label htmlFor="origin" className="form-label">Xuất xứ</label>
                                <input type="text" className="form-control" id="origin" value={origin} onChange={(e) => setOrigin(e.target.value)} />
                            </div> */}
                            <div className="mb-3">
                                <label htmlFor="national" className="form-label">Xuất xứ</label>
                                <select className="form-control" id="national" value={selectedNational} onChange={(e) => setSelectedNational(e.target.value)}>
                                    <option value="">Chọn quốc gia</option>
                                    {national.map((nation, idx) => (
                                        <option key={idx} value={nation.name.common}>{nation.name.common}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="supplier" className="form-label">Nhà cung cấp</label>
                                <input type="text" className="form-control" id="supplier" value={supplier} onChange={(e) => setSupplier(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="quantity" className="form-label">Số lượng</label>
                                <input type="number" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Danh mục</label>
                                <select className="form-control" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    <option value="">Chọn danh mục</option>
                                    {categories.map((category, idx) => (
                                        <option key={idx} value={category._id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Mô tả</label>
                                <textarea className="form-control" id="description" value={description} onChange={(e) => setDescription(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Hình ảnh hiện tại</label>
                                <div className="d-flex flex-wrap">
                                    {images.map((img, index) => (
                                        <div key={index} className="position-relative me-2 mb-2">
                                            <img src={img} alt="Product" className="current-image" />
                                            <button type="button" className="btn btn-danger btn-sm position-absolute top-0 end-0" onClick={() => handleDeleteImage(index)}>X</button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="newImages" className="form-label">Thêm ảnh mới</label>
                                <input type="file" className="form-control" id="newImages" multiple onChange={handleNewImageChange} />
                            </div>
                            <button onClick={handleUpdateProduct} className="btn btn-primary">Cập nhật sản phẩm</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProduct;
