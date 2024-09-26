import './LeftPage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList } from '@fortawesome/free-solid-svg-icons';

const LeftPage = () => {
    return (

        <div className="col-md-3">
            <div className="categories">
                <button className="btn btn-warning w-100 mb-2">
                    <FontAwesomeIcon icon={faList}/> CATEGORIES
                </button>
                <div className="list-group">
                    <a href="#" className="list-group-item list-group-item-action d-flex align-items-center">
                        <img src="dau-icon.png" alt="Dâu" className="icon me-3" />
                        Dâu
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex align-items-center">
                        <img src="cam-icon.png" alt="Cam" className="icon me-3" />
                        Cam
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex align-items-center">
                        <img src="duahau-icon.png" alt="Dưa hấu" className="icon me-3" />
                        Dưa hấu
                    </a>
                    <a href="#" className="list-group-item list-group-item-action d-flex align-items-center">
                        <img src="chuoi-icon.png" alt="Chuối" className="icon me-3" />
                        Chuối
                    </a>
                </div>
            </div>
        </div>

    )
}

export default LeftPage;