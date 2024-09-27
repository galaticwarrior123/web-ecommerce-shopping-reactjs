import './LeftPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import CategoryAPI from '../../API/CategoryAPI';

const LeftPage = ({ onSelectCategory }) => {
    const [categories, setCategories] = useState([]);

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

    return (
        <div className="col-md-3">
            <div className="categories">
                <button className="btn btn-warning w-100 mb-2">
                    <FontAwesomeIcon icon={faList} /> Danh mục sản phẩm
                </button>
                <div className="list-group">
                    {Array.isArray(categories) && categories.length > 0 ? (
                        categories.map((category) => (
                            <div
                                key={category.id}
                                className="list-group-item list-group-item-action d-flex align-items-center"
                                onClick={() => onSelectCategory(category.id)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="icon me-3">
                                    <img
                                        src="./Images/image3.png"
                                        alt={category.name}
                                        className="icon me-3"
                                        style={{ width: '50px', height: '50px', objectFit: 'contain' }}
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
