import './AddCategory.css';
import { useState } from 'react';
import CategoryAPI from '../../../../API/CategoryAPI';
const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [logo, setLogo] = useState(null);

    const handleCreateCategory = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', categoryName);
        data.append('logo', logo);
        CategoryAPI.createCategory(data)
            .then(response => {
                if (response.status === 200) {
                    alert('Category created successfully');
                } else {
                    alert('Failed to create category');
                }
            })
            .catch(error => {
                console.error('Error creating category:', error);
                alert('Failed to create category');
            });
    }

    return (
        <div className="add-category">
            <h1>Add Category</h1>
            <form>
                <div className="mb-3">
                    <label for="categoryName" className="form-label">Category Name</label>
                    <input type="text" className="form-control" id="categoryName" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
                </div>
                <div className="mb-3">
                    <label for="categoryDescription" className="form-label">Logo</label>
                    <input type="file" className="form-control" id="categoryDescription" onChange={(e) => setLogo(e.target.files[0])} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handleCreateCategory}>Add Category</button>
            </form>
        </div>
    )
}

export default AddCategory;