import './AddProduct.css';


const AddProduct = () => {
    return (
        <div className="position-fixed top-0 left-0 right-0 bottom-0 w-100 ml-n1 z-index-1000 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
            <div className="add-product bg-white d-flex justify-content-center" style={{ maxHeight: "500px", overflowY: "auto" }} onClick={(e) => e.stopPropagation()}>
                <div className="row p-2 w-100" >
                    <div className="col-12">
                        <h1 className="text-center fw-bold fs-3">Thêm sản phẩm</h1>
                    </div>
                    <div className="col-12">
                        <form>
                            <div className="mb-3">
                                <label htmlFor="name" className="form-label">Tên sản phẩm</label>
                                <input type="text" className="form-control" id="name" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="price" className="form-label">Giá bán</label>
                                <input type="text" className="form-control" id="price" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="image" className="form-label">Hình ảnh</label>
                                <input type="file" className="form-control" id="image" />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="category" className="form-label">Danh mục</label>
                                <select className="form-select" id="category">
                                    <option value="1">Rau cải</option>
                                    <option value="2">Trái cây</option>
                                    <option value="3">Thịt</option>
                                    <option value="4">Hải sản</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="description" className="form-label">Mô tả</label>
                                <textarea className="form-control" id="description" rows="3"></textarea>
                            </div>
                            <button type="submit" className="btn btn-primary">Thêm</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>


    );
}

export default AddProduct;