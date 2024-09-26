import './LeftPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

const LeftPage = () => {
    return (

        <div className="col-md-3">
            <div className="categories">
                <button className="btn btn-warning w-100 mb-2">
                    <FontAwesomeIcon icon={faList} /> CATEGORIES
                </button>
                <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action d-flex align-items-center">
                        <div className="icon me-3">
                            <img
                                src="./Images/image1.png"
                                alt="Dâu"
                                className="icon me-3"
                                style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                            />
                        </div>
                        <span className="flex-grow-1">Dâu</span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex align-items-center">
                        <div className="icon me-3">
                            <img
                                src="./Images/image2.png"
                                alt="Cam"
                                className="icon me-3"
                                style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                            />
                        </div>
                        <span className="flex-grow-1">Cam</span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex align-items-center">
                        <div className="icon me-3">
                            <img
                                src="./Images/image3.png"
                                alt="Dưa hấu"
                                className="icon me-3"
                                style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                            />
                        </div>
                        <span className="flex-grow-1">Dưa hấu</span>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex align-items-center">
                        <div className="icon me-3">
                            <img
                                src="./Images/image4.png"
                                alt="Chuối"
                                className="icon me-3"
                                style={{ width: '50px', height: '50px', objectFit: 'contain' }}
                            />
                        </div>
                        <span className="flex-grow-1">Chuối</span>
                    </a>
                </div>
            </div>
        </div>

    )
}

export default LeftPage;