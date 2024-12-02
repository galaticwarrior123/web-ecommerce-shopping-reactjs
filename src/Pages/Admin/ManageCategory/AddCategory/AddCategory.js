import './AddCategory.css';
import { useState } from 'react';
import CategoryAPI from '../../../../API/CategoryAPI';
import { toast } from 'react-toastify';
const AddCategory = ({handleCloseAddCategory}) => {
    const [categoryName, setCategoryName] = useState('');
    const [logo, setLogo] = useState(null);

    const handleCreateCategory = (e) => {
        e.preventDefault();
        if (!categoryName) {
            toast.error("Vui lòng nhập đầy đủ thông tin");
            return;
        }
        const data = new FormData();
        data.append('name', categoryName);
        data.append('logo', logo);
        CategoryAPI.createCategory(data)
            .then(response => {
                if (response.status === 200) {
                    toast.success("Thêm danh mục thành công");
                    handleCloseAddCategory();
                } else {
                    toast.error("Thêm danh mục thất bại");
                    
                }
            })
            .catch(error => {
                toast.error("Thêm danh mục thất bại");
            });
    }

    return (
        <div className="position-fixed top-0 left-0 right-0 bottom-0 w-100 ml-n1 d-flex justify-content-center align-items-center" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", zIndex: 10 }}
            onClick={handleCloseAddCategory}>
            <div className="add-category" onClick={(e) => e.stopPropagation()}>
                <h2>Thêm danh mục</h2>
                <form>
                    <div className="mb-3">
                        <label for="categoryName" className="form-label">Tên danh mục</label>
                        <input type="text" className="form-control" id="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label for="categoryDescription" className="form-label">Ảnh logo</label>
                        <input type="file" className="form-control" id="categoryDescription" onChange={(e) => setLogo(e.target.files[0])} />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleCreateCategory}>Thêm danh mục</button>
                </form>
            </div>
        </div>
    )
}

export default AddCategory;