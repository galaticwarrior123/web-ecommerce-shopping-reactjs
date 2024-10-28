import './AdminHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

const AdminHeader = ({tabName}) => {
    return (
        <div className="admin-header">
            <div className="header-left d-flex align-items-center">
                <h4 className="mb-0">{tabName}</h4>
            </div>

            <div className="header-right d-flex justify-content-end align-items-center">
                <FontAwesomeIcon icon={faBell} className="icon" />
                <FontAwesomeIcon icon={faRightFromBracket} className="icon" />

            </div>
        </div>
    )

}

export default AdminHeader;