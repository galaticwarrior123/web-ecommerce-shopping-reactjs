import DefaultLayoutAdmin from '../../../Layouts/DefaultLayoutAdmin';
import AddCategory from './AddCategory/AddCategory';
import './ManageCategory.css';
import CategoryAPI from '../../../API/CategoryAPI';
import { useEffect, useState } from 'react';

const ManageCategory = () => {
    const [categories, setCategories] = useState([]);
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
    const [searchNameCategory, setSearchNameCategory] = useState("");

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

    const handleAddCategory = () => {
        setShowAddCategoryModal(true);
    }

    // Filter categories based on the search input
    const filteredCategories = categories.filter(category =>
        category.name.toLowerCase().includes(searchNameCategory.toLowerCase())
    );

    return (
        <>
            {showAddCategoryModal && (
                <AddCategory handleCloseAddCategory={() => setShowAddCategoryModal(false)} />
            )}
            <DefaultLayoutAdmin>
                <div className="container-body-manage_category">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12">
                                <button className="btn btn-primary" onClick={handleAddCategory}>
                                    Thêm danh mục
                                </button>
                            </div>
                        </div>

                        {/* Search category */}
                        <div className="row mt-3">
                            <div className="col-12">
                                <div className="input-group mb-3">
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Tìm kiếm danh mục"
                                        value={searchNameCategory}
                                        onChange={(e) => setSearchNameCategory(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="wrapper">
                            {filteredCategories.map((category) => (
                                <div className="item" key={category._id}>
                                    <div className="card-manage-product">
                                        <div className="card-body-manage-product">
                                            <img src={category.logo} alt={category.name} />
                                            <h5 className="card-title">{category.name}</h5>
                                        </div>
                                        <div className="card-footer-manage-product">
                                            <button className="btn btn-warning">Sửa</button>
                                            <button className="btn btn-danger">Xóa</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </DefaultLayoutAdmin>
        </>
    );
}

export default ManageCategory;
