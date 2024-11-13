import './LeftPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import CategoryAPI from '../../API/CategoryAPI';

const LeftPage = ({ onSelectCategory, onSearch }) => {
    const [categories, setCategories] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await CategoryAPI.getCategories();
                setCategories(response.data.DT);
            } catch (error) {
                console.error("Lỗi khi lấy danh mục: ", error);
            }
        };
        fetchCategories();
    }, []);

    const handleCategorySelect = (categoryId) => {
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter((id) => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
        onSelectCategory(categoryId, '');
    };

    return (
        <div className="col-md-3">
            <div className="categories">
                <div className="input-group mb-2">
                    <input
                        type="text"
                        className="form-control search-text"
                        id="search"
                        placeholder="Tìm kiếm..."
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <button
                        type="button"
                        id='search-btn'
                        className="btn btn-outline-first bg-white z-index-0"
                        onClick={() => onSearch(searchText)}
                    >
                        <FontAwesomeIcon icon={faMagnifyingGlass} />
                    </button>
                </div>

                <button className="btn btn-warning w-100 mb-2">
                    <FontAwesomeIcon icon={faList} /> Danh mục sản phẩm
                </button>
                <div className="list-group">
                    {Array.isArray(categories) && categories.length > 0 ? (
                        categories.map((category) => (
                            <div
                                id={`category-${category._id}`}
                                key={category._id}
                                className={`list-group-item list-group-item-action d-flex align-items-center ${selectedCategories.includes(category._id) ? 'active' : ''}`}
                                onClick={() => handleCategorySelect(category._id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="icon me-3">
                                    <img
                                        // src="./Images/image3.png"
                                        src={category.logo}
                                        alt={category.name}
                                        className="icon me-3"
                                        style={{ width: '70px', height: '70px', objectFit: 'contain' }}
                                    />
                                </div>
                                <span className="flex-grow-1">{category.name}</span>
                            </div>
                        ))
                    ) : (
                        <p>Không có danh mục nào để hiển thị</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LeftPage;
