import { useState } from "react";
import CategoryAPI from "../../../../API/CategoryAPI";
import { toast } from "react-toastify";
const UpdateCategory = ({ handleCloseUpdateCategory, category }) => {
    const [categoryName, setCategoryName] = useState(category.name);
    const [logo, setLogo] = useState(category.logo);
    const [selectedLogo, setSelectedLogo] = useState(null);

    const handleUpdateCategory = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', categoryName);
        data.append('logo', selectedLogo);

        CategoryAPI.updateCategory(category._id, data)
            .then(response => {
                if (response.status === 200) {
                    toast.success(response.data.DT.message);
                    handleCloseUpdateCategory();
                    
                } else {
                    toast.error(response.data.DT.message);
                }
            })
            .catch(error => {
                toast.error('Cập nhật danh mục thất bại');
            });
    }

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        setLogo(file);

        // Tạo URL cho bản xem trước hình ảnh
        if (file) {
            const logoPreviewURL = URL.createObjectURL(file);
            setLogo(logoPreviewURL);
            setSelectedLogo(file);
        }
    };

    return (
        <div className="position-fixed top-0 left-0 right-0 bottom-0 w-100 ml-n1 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 10 }}
            onClick={handleCloseUpdateCategory}>
            <div className="add-category" onClick={(e) => e.stopPropagation()}>
                <h2>Cập nhật danh mục</h2>
                <form>
                    <div className="mb-3">
                        <label htmlFor="categoryName" className="form-label">Tên danh mục</label>
                        <input type="text" className="form-control" id="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="categoryDescription" className="form-label">Ảnh logo</label>
                        <input type="file" className="form-control" id="categoryDescription" onChange={handleLogoChange} />
                    </div>
                    {logo && (
                        <div className="mb-3">
                            <img src={typeof logo === 'string' ? logo : URL.createObjectURL(logo)} alt="Category Logo" style={{ maxWidth: "100px", maxHeight: "100px" }} />
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary" onClick={handleUpdateCategory}>Cập nhật danh mục</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateCategory;
