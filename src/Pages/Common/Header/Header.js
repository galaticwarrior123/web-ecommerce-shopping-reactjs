import './Header.css';

const Header = () => {
    return (
        <header className="header bg-warning ">
            <div className=" d-flex justify-content-between align-items-center">
                <div className="logo d-flex align-items-center flex-column justify-content-center">
                    <img src="./Images/logo.png" alt="Logo" width="80" />
                    <p className="">CLEAN AND FRESH FRUIT</p>
                </div>
                <div className="search-box d-flex flex-start">
                    <input
                        type="text"
                        className="form-control search-input"
                        placeholder="Search something..."
                    />
                    <button className="btn btn-outline-secondary">
                        <i className="bi bi-search"></i>
                    </button>
                </div>
                <div className="user-info d-flex align-items-center">
                    <span>Chào Ngân</span>
                    <i className="bi bi-person-circle mx-3"></i>
                    <i className="bi bi-cart"></i>
                </div>
            </div>
        </header>
    )
}

export default Header;