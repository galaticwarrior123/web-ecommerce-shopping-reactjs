import './AddProduct.css';
import { useState, useEffect } from 'react';
import ProductAPI from '../../../../API/ProductAPI';
import CategoryAPI from '../../../../API/CategoryAPI';
const AddProduct = ({handleCloseAddProduct}) => {
    const [categories, setCategories] = useState([]);
    const [productName, setProductName] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState(0);
    const [image, setImage] = useState([]);
    const [category, setCategory] = useState("");   
    const [description, setDescription] = useState("");

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
    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("productName", productName);
        data.append("origin_price", price);
        data.append("quantity", quantity);
        data.append("category", category);
        data.append("description", description);
        for (let i = 0; i < image.length; i++) {
            console.log(image[i]);
            data.append("images", image[i]);
        }
        try {
            const response = await ProductAPI.createProduct(data);
            if (response.status === 200) {
                alert("Thêm sản phẩm thành công");
                handleCloseAddProduct();
            }
            else {
                alert("Thêm sản phẩm thất bại");
            }
        } catch (error) {
            alert("Thêm sản phẩm thất bại");
        }
    }

    return (
        <div className="position-fixed top-0 left-0 right-0 bottom-0 w-100 ml-n1 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex:10 }}
                        onClick={handleCloseAddProduct}>
            <div className="add-product bg-white d-flex justify-content-center" style={{ maxHeight: "500px", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
                <div className="row p-2 w-100" >
                    <div className="col-12">
                        <h1 className="text-center fw-bold fs-3">Thêm sản phẩm</h1>
                    </div>
                    <div className="col-12">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Tên sản phẩm</label>
                                <input type="text" className="form-control" id="name" value={productName} onChange={(e) => setProductName(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Giá bán</label>
                                <input type="text" className="form-control" id="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Số lượng</label>
                                <input type="number" className="form-control" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Hình ảnh</label>
                                <input type="file" className="form-control" id="image" multiple onChange={(e) => setImage(e.target.files)} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Danh mục</label>
                                <select className="form-select" id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                                    {categories.map((category) => (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Mô tả</label>
                                <textarea className="form-control" id="description" rows="3" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Thêm sản phẩm</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default AddProduct;