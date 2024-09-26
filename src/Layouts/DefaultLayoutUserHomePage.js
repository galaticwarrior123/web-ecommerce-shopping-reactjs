import Footer from "../Pages/Common/Footer/Footer";
import Header from "../Pages/Common/Header/Header";
import './DefaultLayoutUserHomePage.css';



const DefaultLayoutUserHomePage = ({ children }) => {
    return (
        <div>
            <Header />
            <div className="col-md-12">
                {children}
            </div>
            <Footer />
        </div>
    )
}

export default DefaultLayoutUserHomePage;